pdf = require('./pdfmanip.js');

testchron = { 
    "S02E21": {
	"imagename" : "images/S02E21.png",
	"playerpos" : 	[  35, 130, 100], 
	"characterpos" : 	[ 170, 130, 110],  
	"numberpos" : 	[ 290, 130,  60], 
	"charnumpos" : 	[ 363, 130,  35], 
	"facpos" : 		[ 413, 130,  60],
	"tiergoldboxes" :     [ [545, 78, 40, 15], [545, 105, 40,15], [545, 130, 40, 15] ], 
	"eventname" :         [45, 740, 70],
	"eventcode":          [135, 740, 75],
	"date"  :              [230, 740, 78],
	"gmsig" :              [322, 740, 132],
	"gmpfs" :             [472, 740, 106],
	"xpbox" : false, 
	"ppbox" : [505, 333, 40],
	"gpbox" : [505, 460, 40],
	"djbox" : [505, 493, 40],
	"djannotation" : [55, 605, 130],
	"crossouts" : [[40,210, 430, 100], [40, 320, 430 ,75], [40, 405, 430,140]] 
    }
};

testevent = {
    "eventData" : {
	"eventname" : "PbP GD2",
	"scenario" : "S05E08",
	"eventcode" : "41401",
	"date" : "18/6/2014",
	"gmsig" : "AGF",
	"gmpfs" : "108716-7"
    },
    "playerData" : [
	{   
    	    "player" : "Zizazat",
    	    "charname" : "Gert",
    	    "number" : "9783",
    	    "charnumber" : "9",
    	    "faction" : "GL",
    	    "tier" : 0,
	    "pp" : "2",
	    "gp" : "430",
	    "dj" : "0",
	    "crossouts" : "[]"
	},
	{   
    	    "player" : "Derek Well",
    	    "charname" : "Wulfren",
    	    "number" : "85794",
    	    "charnumber" : "11",
    	    "faction" : "A",
    	    "tier" : 0,
	    "pp" : "2",
	    "gp" : "430",
	    "dj" : "0",
	    "crossouts" : "[]"
	},
	{   
    	    "player" : "Cyril Corbaz",
    	    "charname" : "Veviane",
    	    "number" : "76446",
    	    "charnumber" : "10",
    	    "faction" : "GL",
    	    "tier" : 0,
	    "pp" : "2",
	    "gp" : "430",
	    "dj" : "0",
	    "crossouts" : "[]"
	},
	{   
    	    "player" : "Anon A Mouse",
    	    "charname" : "Liam Quinn Faolan",
    	    "number" : "129459",
    	    "charnumber" : "2",
    	    "faction" : "V",
    	    "tier" : 0,
	    "pp" : "2",
	    "gp" : "430",
	    "dj" : "50",
	    "crossouts" : "[]"
	},
	{   
    	    "player" : "Pedwiddle",
    	    "charname" : "Anaristiel",
    	    "number" : "70085",
    	    "charnumber" : "9",
    	    "faction" : "V",
    	    "tier" : 0,
	    "pp" : "2",
	    "gp" : "430",
	    "dj" : "0",
	    "crossouts" : "[]"
	},
	{   
    	    "player" : "Broken Prince",
    	    "charname" : "Arcad",
    	    "number" : "113331",
    	    "charnumber" : "13",
    	    "faction" : "V",
    	    "tier" : 0,
	    "pp" : "2",
	    "gp" : "430",
	    "dj" : "0",
	    "crossouts" : "[]"
	}               
               
               
    ]
};

pdf(testevent, testchron.S02E21);
