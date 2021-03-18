const path = require("path");
const process = require("../controller/index");
 
exports.setRouters = function (app, csrfProtection){
    app.get("/api/video/getVideoList" , process.getVideoList);
    app.get("/api/user/logout",process.logout);
    app.get("/api/user/isLogin", process.isLogin);
    app.get("/api/video/accessvideo", process.authenticateToken, process.accessVideo);
    app.post("/api/user/newAccount", process.newAccount);
    app.post("/api/video/newvideo", csrfProtection, process.authenticateToken, process.newVideo);
    app.post("/api/user/login", process.login);
    app.get('/csrf-token', csrfProtection, (req, res) => {
        res.json({ csrfToken: req.csrfToken() });
    });
    app.get('/*', (req,res) =>{
        res.sendFile(path.join(__dirname, '../', 'view', 'index.html'));
    });
}
