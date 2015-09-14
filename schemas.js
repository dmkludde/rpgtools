//mongodb model for Chronicle Data
var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
	name : String,
	pfs : Number
});

var characterSchema = mongoose.Schema({
	name : String,
	pfs : Number,
	ext : Number,
	faction : String
});

var chronicleSchema = mongoose.Schema({
	imagename : 		String,
	name:				String,
	playerpos : 		[Number], 
	characterpos : 		[Number],  
	numberpos : 		[Number], 
	charnumpos : 		[Number], 
	facpos : 			[Number],
	tiergoldboxes :     [ [Number] ], 
	eventname :         [Number],
	eventcode:          [Number],
	date  :             [Number],
	gmsig :             [Number],
	gmpfs :             [Number],
	xpbox : 			[Number], 
	ppbox : 			[Number],
	gpbox : 			[Number],
	djbox : 			[Number],
	gminitial : 		[[Number]],
	djannotation : 		[Number],
	crossouts : 		[[Number]], 
	commentbox : 		[Number]
});
// create the model for users and expose it to our app
module.exports = {
	player : mongoose.model('players', playerSchema),
	character : mongoose.model('characters', characterSchema),
	chronicle : mongoose.model('Chronicle', chronicleSchema)
};
	
