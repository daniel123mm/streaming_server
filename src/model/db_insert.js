const SQL = require("./sql");
const bcrypt = require("bcryptjs");
var accountModel = require("./schema/account_model.js");

exports.newAccount = async function (data) {
    var database = new SQL();
    database.connect();
    data.password = bcrypt.hashSync(data.password, 10);
    var collection = new accountModel(data);
    var success = await database.insert(collection);
    return success;
}


