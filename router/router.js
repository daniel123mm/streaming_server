exports.setRouters = function (app){
    var process = require("../controller/index")

    app.get("/" , process.getIndex);
    app.get("/streaming", process.getStreaming);
    app.get('/getVideoList' , process.getVideoList);
    //app.get('getUser', process.getUser);
    //app.post('/upload' , process.upLoad);
}
