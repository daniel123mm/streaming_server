var express = require('express'),
	app = express(),
	Server = require('http').createServer(app),
	path = require('path'),
	Router = require('./router/router'),
	bodyParser = require("body-parser"),
	helmet = require('helmet');
	compress = require('compression'); //gzip file

var WEB_PORT = 3000;

//static file setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: '50mb' }));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json());
//app.use(multer());
app.set("port" , process.argv[2] || process.env.PORT || WEB_PORT );

//security
app.use(helmet());

//reduce the file size
app.use(compress());

//view engine setup
app.set("views" , path.join(__dirname, "view"));
app.set('view engine', 'ejs');

//to avoid cross origin requests errors
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
	next();
  });

Router.setRouters(app,process.argv[2] || process.env.PORT || WEB_PORT);

Server.setMaxListeners(0);

//** open start */
Server.listen(app.get('port'),'127.0.0.1',function(){
	console.log('http server listen on port ' + app.get('port'));
});

