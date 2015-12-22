// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8081;

var mongoose        = require('mongoose');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');

//Should probably move this to relevant routes section
var pdfmanip        = require('./pdfmanip.js');

var config          = require('./config/config.js');

var configDB        = require('./config/database.js')(config);

var routes   = require('./app/routes.js');
var security = require('./config/passport'); // pass passport for configuration

// configuration ===============================================================

console.log(configDB.url)


    

mongoose.connect(configDB.url); // connect to our database

security.init(app, passport, session);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

app.use('/static', express.static(__dirname + '/static'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

routes(app, passport);




// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
