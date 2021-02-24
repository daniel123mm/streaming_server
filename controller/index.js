const bcrypt = require("bcryptjs");
const query = require('../model/db_query');
var insert = require('../model/db_insert');

exports.getIndex = async function(req, res)
{
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
    var user = await query.login({account:data.account});
    if(!user){
        await insert.newAccount(data);
        res.status(200).send({name:data.name, message:"register succees", success: true});
    }else{
        res.status(400).send({message:"the account is exist", success: false});
    }
}

exports.login = async function(req, res){
    var data = req.body;
    var user = await query.login({account:data.account});
    if(!user)
        res.status(400).send({ message: "The username does not exist" })
    else{
        if(!bcrypt.compareSync(data.password, user.password))
            res.status(400).send({ message: "The password is invalid" });
        else{
            req.session.user =  {account:user.account, name:user.name};
            res.status(200).send({name:user.name, message:"login succees", success:true});

        }
    }
}

exports.logout = function(req,res){
    delete req.session.user;
    res.status(200).send({message:"logout succees", success:true});
}

exports.isLogin = function(req, res){
    if(!req.session.user)
        res.send({message:"you are not login", success:false});
    else
        res.send({name:req.session.user.name ,message:"login success!", success:true});
}




