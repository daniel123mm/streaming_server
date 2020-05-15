const DataBase = require('../model/db_query')
var fs = require('fs')
var path = require('path')
var util = require('util')
var parser = require("binary-parser");

exports.getIndex = async function(req, res)
{
    res.render("index");
}

exports.getStreaming = function(req, res){
    res.render("streaming");
}

exports.getVideoList = async function(req, res){
    var data = await DataBase.getVideoList(); 
    res.send(data);
}




