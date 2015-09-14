pdf = require('./pdfmanip.js');
evedata = require('./eventdata.js');
chrondata = require('./chrondata.js');
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
	"gminitial" : [[565, 333, 20], [565, 460, 20],[565, 493, 20]],
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
	    "crossouts" : "[0,1,2]"
	}      
               
    ]
};


evdat = evedata.S06E22II;
cdat = chrondata.S06E22;
for (key in cdat) {
	console.log(key);
		
}
pdf.createPDFs(evdat, cdat);
//evdat = evedata.S06E23;
//cdat = chrondata.S06E23;
//pdf.createPDFs(evdat, cdat);
