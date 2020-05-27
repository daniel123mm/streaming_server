exports.setRouters = function (app){
    var process = require("../controller/index")

    app.get("/" , process.getIndex);
    app.get("/streaming", process.getStreaming);
    app.get("/register", process.getRegister);
    app.get("/getVideoList" , process.getVideoList);
    app.post("/register", process.newAccount);
    app.post("/login", process.login);
}
