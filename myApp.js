var express = require("express");
var moment = require('moment-timezone');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here
app.use(myMiddlewareFunc);

// --> 11)  Mount the body-parser middleware  here

app.use(bodyParser.urlencoded({extended: false}))
let  bodyParserMiddleware = bodyParser.urlencoded({extended: false});
/** 1) Meet the node console. */
//console.log("Hello World");

/** 2) A first working Express Server */
/* app.get("/", function(req, res){
   res.send("Hello Express");
  }); */

/** 3) Serve an HTML file */
app.get("/", function(req, res) {
  let abs_path = __dirname + "/views/index.html";

  res.sendFile(abs_path);
});

/** 4) Serve static assets  */
let assets_path = __dirname + "/public";
app.use(express.static(assets_path));

/** 5) serve JSON on a specific route */
app.get("/json", function(req, res) {
  let message;
  /** 6) Use the .env file to configure the app */

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = "Hello json".toUpperCase();
  } else {
    message = "Hello json";
  }

  res.json({ message: message });
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
function myMiddlewareFunc (req, res, next) {
  
  console.log( req.method + " " + req.path + " - " + req.ip);
  next();
}




/** 8) Chaining middleware. A Time server */

app.get("/now", function ( req, res, next){
  
  //let mDate = moment.utc().tz("Europe/Madrid").format();
  
  req.time = new Date().toString();
  next();
  
}, function (req, res) {
  
  res.json({ time: req.time });
  
})


/** 9)  Get input from client - Route parameters */


app.get("/:word/echo", function(req, res){
  
  res.json({echo: req.params.word});
  
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.route("/name").get(function(req, res){
  
  let q = req.query;
  res.json({name: q.first + " " + q.last})
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
let body = null;
app.route("/name").post( function (req, res, next){
    body = req.body;
    next();
}, function(req, res){
  res.json({name: body.first + " " + body.last})
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
