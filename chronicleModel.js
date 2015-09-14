//mongodb model for Chronicle Data
var mongoose = require('mongoose');

var callingSchema = mongoose.Schema({
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
	crossouts : 		[[Number]] 
	commentbox : 		[Number]
});
// create the model for users and expose it to our app
module.exports = mongoose.model('Call', callingSchema);
