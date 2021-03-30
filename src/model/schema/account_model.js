var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    name: { type: String },
    account: { type: String },
    password: { type: String },
    email: { type: String }
});

module.exports = mongoose.model("accountModel", accountSchema, 'account');