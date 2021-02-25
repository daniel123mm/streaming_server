const path = require("path");
const process = require("../controller/index")


exports.setRouters = function (app){
    app.get("/api/video/getVideoList" , process.getVideoList);
    app.get("/api/user/logout",process.logout);
    app.get("/api/user/isLogin", process.isLogin);
    app.post("/api/user/newAccount", process.newAccount);
    app.post("/api/user/login", process.login);
    app.get('/*', (req,res) =>{
        res.sendFile(path.join(__dirname, '../', 'view', 'index.html'));
    });
}
