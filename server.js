// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var pdfmanip = require('./pdfmanip.js');
//var mongoose = require('mongoose');
//var passport = require('passport');
//var flash    = require('connect-flash');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

//var config = require('./config/config.js');
//console.log(config);

//var configDB = require('./config/database.js')(config);

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database

//require('./config/passport')(passport); // pass passport for configuration

//app.configure(function() {

	// set up our express application
//	app.use(express.logger('dev')); // log every request to the console
	app.use(cookieParser()); // read cookies (needed for auth)
	//app.use(express.bodyParser()); // get information from html forms
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    })); 
//    app.use(express.json());       // to support JSON-encoded bodies
//    app.use(express.urlencoded()); // to support URL-encoded bodies
    app.use('/static', express.static(__dirname + '/static'));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use(morgan('combined'));  // log every request to the console

//	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
//	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
//	app.use(passport.initialize());
//	app.use(passport.session()); // persistent login sessions
//	app.use(flash()); // use connect-flash for flash messages stored in session

//});

app.get('/', function(req, res){
    res.redirect('/static/index.html');
});

// routes ======================================================================
app.post('/pdfs', function(req,res){
    evdata = req.body;
    pdfmanip(req.body);
    res.send(req.body);
});


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
