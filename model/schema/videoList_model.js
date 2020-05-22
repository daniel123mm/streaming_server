var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;

var videoListSchema = new Schema({
    name        : { type : String },
    coverImage  : { type : String },
    dash        : { type : String },
    describe    : { type : String}
});

module.exports = mongoose.model("videoList", videoListSchema, 'video');