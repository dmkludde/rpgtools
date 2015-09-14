var mongoose = require('mongoose');
var db = require('./databaseConnection.js')({instancetype : "local"});

mongoose.connect(db.url); // connect to our database

var schemas = require('./schemas.js');

schemas.player.find({}, 
	function(err, res) {
		console.log(err);
		console.log(res);
	});
schemas.character.find({}, 
	function(err, res) {
		console.log(err);
		console.log(res);
	});
