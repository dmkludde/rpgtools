//mongodb model for Chronicle Data
var mongoose = require('mongoose');



//Schema for a player with PFS id
//Contains static to quickly update player name
var playerSchema = mongoose.Schema({
	_id : Number,
	name : String
});
playerSchema.statics.updatePlayer = function(update, cb) {
	this.findByIdAndUpdate(update._id, update, {upsert : true, new: true}, function (err, obj) {
		if (err) console.log(err);
			cb(obj);
	}	)
}

//Schema for character of a player
var characterSchema = mongoose.Schema({
	name : String,
	player : {type : Number, ref : 'Player'},
	ext : Number,
	faction : String
});
characterSchema.statics.updateCharacter = function(update, cb) {
	console.log(update)
	var deepthis = this;
	this.findOne({player : update.player, ext: update.ext}, function(err,obj) {
		if (err){
			console.log(err)
		}
		else {
			if (!obj){
				deepthis.create(update, function(err, obj1){
					if (err) console.log(err);
					cb(obj1);
				})
			} 
			else {
				console.log(obj);
				deepthis.findByIdAndUpdate(obj._id, update, {upsert : true, new :true}, function (err, obj1) {
					if (err) console.log(err);
					cb(obj1);
				})
			}
		}
	})
}

//Schema for an event

var eventSchema = mongoose.Schema({
	_id : Number,
	name : String
	
});

var gameSchema = mongoose.Schema({
	scenario : {type : String, ref : 'Scenario'},
	event : {type : Number, ref : 'Event'},
	gm : {type : Number, ref : 'Player'},
	date :  { type: Date, default: Date.now }
})

var chronicleSchema = mongoose.Schema({
	game : {type : Schema.Types.ObjectId, ref : 'Game'},
	character : {type : Schema.Types.ObjectId, ref : 'Character'}
	tier : Number,
	dayjob : Number,
	goldmod : {type : Number, default : 0},
	xpmod : {type : Number, default : 0},
	ppmod : {type : Number, default : 0},
	crossouts : [Number]
})

var chronicleSheetSchema = mongoose.Schema({
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
	player    : mongoose.model('Player', playerSchema),
	character : mongoose.model('Character', characterSchema),
	eventdata : mongoose.model('Event', eventSchema),
	season    : mongoose.model('Season', playerSchema),
	chronicle : mongoose.model('Chronicle', chronicleSchema)
};
	
	
mongoose.connect('localhost');	
player = module.exports.player;
character = module.exports.character;

player.updatePlayer({_id: 108716, name: 'Kludde'}, function (obj) {
	console.log(obj);
	character.updateCharacter({player : obj._id, ext : 1, name : 'Fenchil', faction : 'LbEd'}, function(obj){
		console.log(obj);
	}
	)
});

character.updateCharacter({player : 108716, ext : 2, name : 'Fissan Fuihlah', faction : 'GL'}, function(obj){
	console.log(obj);
})
character.updateCharacter({player : 108716, ext : 5, name : 'Uncle T', faction : 'SiCR'}, function(obj){
	console.log(obj);
})

character.find({player : 108716}).sort( {ext : 1}).populate('player').select('name player ext').exec(function(err, doc){console.log(doc)});

