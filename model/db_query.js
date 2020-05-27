const SQL = require("./sql");
const videoListModel = require("./schema/videoList_model.js");
const accountModel = require("./schema/account_model.js");

exports.getVideoList = async function(){
    var database = new SQL();
    database.connect();
    var collections = videoListModel;
    var list = [];
    await database.query(collections, {}).then(async(result)=>{
        //console.log(result.data);
        for(var i = 0;i < result.length;i++)
            list.push(result.data[i]);
    });
    //console.log(list);
    database.close();
    return list;
}

exports.login = async function(account){
    var database = new SQL();
    database.connect();
    var collections = accountModel;
    var user = null;
    await database.query(collections, account).then(async(result)=>{
        console.log(result.data);
        user = result.data[0];
    });
    database.close();
    return user;
}

