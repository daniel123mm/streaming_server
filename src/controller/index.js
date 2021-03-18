const bcrypt = require("bcryptjs");
const query = require('../model/db_query');
const jwt = require('jsonwebtoken');
const insert = require('../model/db_insert');


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
            let token = await generateToken(user);
            res.cookie('x-access-token', token, {
                expires: 0,
                secure: false, // set to true if your using https
                httpOnly: true
              });
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

exports.accessVideo = function(req, res){
    res.send({name:req.user.name ,message:"access video", success:true});
}

exports.newVideo = function(req, res){
    res.send({name:req.user.name ,message:"new video", success:true});
}

exports.authenticateToken = async function(req, res, next) {
    // Gather the jwt access token from the request header
    const token = req.cookies['x-access-token'];
    if (token == null) return res.sendStatus(401); // if there isn't any token
    jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, async(err, user) => {
      if (err) return res.status(403).send({ success: false, message: "Failed to authenticate token."});
      req.user = user;
      next() // pass the execution off to whatever request the client intended
    });
}

function generateToken(user){
    let token = jwt.sign({account: user.account, name:user.name}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: 30000 });
    return token
}



