var mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URL || 'mongodb://localhost:27017/streamingDB';

var SQL = function (){
    this.connect = function (){
        //Set up default mongoose connection
        mongoose.connect(mongoDB,{useUnifiedTopology: true,useNewUrlParser: true});
        // Get Mongoose to use the global promise library
        mongoose.Promise = global.Promise;
        //Get the default connection
        this.db = mongoose.connection;
        //Bind connection to error event (to get notification of connection errors)
        this.db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        this.db.once('open', function callback () {
            //console.log("DataBase is connect...");
        });
        this.db.once('close' , function callback() {
            //console.log("DataBase is close...");
        });
    }
};

SQL.prototype.close = function()
{
    this.db.close();
}

SQL.prototype.insert = async function (model){  
    return new Promise((resolve,reject)=>{
        model.save(function(err , doc){
            if (err)throw err;
            resolve(1);
        });
    });     
}

SQL.prototype.query = async function (model , obj)
{
    return new Promise((resolve , reject) =>{
        model.find(obj).exec(function (err , result){
            if (err) throw err;            
            var reobj = { length : result.length , data: result};
            resolve(reobj);
        });
    });    
}

SQL.prototype.limit = async function(model , obj , number)
{
    return new Promise((resolve , reject) =>{
        model.find(obj).limit(number).exec(function (err , result){
            if (err) throw err;
            var reobj = { length : result.length , data : result};
            resolve(reobj);
        });
    });
}

SQL.prototype.update = async function (model , obj , newobj)
{
    return new Promise((resolve , reject)=>{
        model.update(obj , newobj , function(err , docs){
            if (err) console.log(err);
            resolve(1);
        })
    });
}

SQL.prototype.remove = async function (model , obj)
{
    return new Promise((resolve , reject) =>{
        model.remove(obj).exec(function (err , result){
            if (err) throw err;
            resolve(result);
        });
    });
}

module.exports = SQL;
