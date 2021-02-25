require('dotenv').config()
const 	express = require('express')
const	app = express()
const	Server = require('http').createServer(app)
const	path = require('path')
const	Router = require('./router/router')
const	bodyParser = require("body-parser")
const	helmet = require('helmet')
const	compress = require('compression') //gzip file
const	session = require('express-session')
const	redis = require('redis')
const	RedisStore = require('connect-redis')(session)

//var WEB_PORT = 8080;

//reduce the file size
app.use(compress());

//security
app.use(helmet());

//static file setup
app.use(express.static(path.join(__dirname, 'public')));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//to avoid cross origin requests errors
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
	next();
  });

// 建立 session 中介軟體
let redisClient = redis.createClient(process.env.REDIS_URL || "redis://127.0.0.1");//需要先啟動 command: redis-server
redisClient.on("error", function (err) {
    console.log("Error " + err);
});

const sessionMiddleware = session({ 
    store: new RedisStore({ client: redisClient }),
    secret: 'recommand 128 bytes random string', //加密key 可以隨意書寫
	cookie: { maxAge: 6000000 },//兩次請求的時間差 即超過這個時間再去訪問 session就會失效
	resave: false,
	saveUninitialized: true
});
app.use(sessionMiddleware);
 
Router.setRouters(app);

//** open start */
Server.listen(process.env.PORT,'0.0.0.0',function(){
	console.log('http server listen on port ' + process.env.PORT + ` (${process.env.NODE_ENV})`);
});

