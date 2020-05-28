const bcrypt = require("bcryptjs");
const query = require('../model/db_query');
var insert = require('../model/db_insert');

exports.getIndex = async function(req, res)
{
    if(req.session.user!== null){
        req.user=req.session.user;
    }   
    console.log(req.user)
    res.render("index");
}

exports.getStreaming = function(req, res){
    res.render("streaming");
}

exports.getRegister = function(req, res){
    res.render("register");
}

exports.getVideoList = async function(req, res){
    var data = await query.getVideoList(); 
    res.send(data);
}

exports.newAccount = async function(req, res){
    var data = req.body;
    var success = insert.newAccount(data);
    if(success){
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
}

exports.login = async function(req, res){
    var data = req.body;
    var user = await query.login({account:data.account});
    //console.log(user);
    if(!user)
        res.status(400).send({ message: "The username does not exist" })
    else{
        if(!bcrypt.compareSync(data.password, user.password))
            res.status(400).send({ message: "The password is invalid" });
        else{
            req.session.user =  {account:user.account,password:user.password,name:user.name};
            //res.redirect('index'); 
            res.send({ message: "登入成功" });
        }
    }
}

exports.logout = function(req,res){
    delete req.session.user;
    res.send('index'); 
}




