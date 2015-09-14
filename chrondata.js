s2topline = 130;
s2botline = 740;
s6topline = 115;
s6botline = 770;
s6east2=514;
s6east3=548;
s6eastcol = 35;
s6xpline = 350;
s6ppline = 460;
s6gpline = 605;
s6djline = 640;
s6lowenough = 690;
s6box1 = 110;
s6box2 = 150;
s6box3 = 190;
s6boxheight = 30;
 




col1 = 40;
twocol = 430;
onecol = 215;
col2 = col1 + onecol;

chrondata = {
	"S02E21" : { 
		"name" : "S02E21",
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
	},
	"S06E22" : { 
		"name" : "S06E22",
		"imagename" : "images/S06E22.png",
		"playerpos" : 	[  35, s6topline, 100], 
		"characterpos" : 	[ 170, s6topline, 110],  
		"numberpos" : 	[ 290, s6topline,  60], 
		"charnumpos" : 	[ 363, s6topline,  35], 
		"facpos" : 		[ 413, s6topline,  60],
		"tiergoldboxes" :     [ 
							[s6east3, s6box1, s6eastcol, s6boxheight], 
							[s6east3, s6box2, s6eastcol, s6boxheight], 
							[s6east3, s6box3, s6eastcol, s6boxheight] 
						], 
		"eventname" :         [45, s6botline, 70],
		"eventcode":          [135, s6botline, 75],
		"date"  :             [230, s6botline, 78],
		"gmsig" :             [322, s6botline, 132],
		"gmpfs" :             [472, s6botline, 106],
		"xpbox" : [s6east2, s6xpline, s6eastcol],
		"ppbox" : [s6east2, s6ppline, s6eastcol],
		"gpbox" : [s6east2, s6gpline, s6eastcol],
		"djbox" : [s6east2, s6djline, s6eastcol],
		"gminitial" : [
						[s6east3, s6xpline, s6eastcol], 
						[s6east3, s6ppline, s6eastcol], 
						[s6east3, s6gpline, s6eastcol], 
						[s6east3, s6djline, s6eastcol]
					],						
		"djannotation" : [col2, s6lowenough, onecol],
		"crossouts" : [ [col1, 190, twocol, 73], //0: DkAr
						[col1, 265, twocol , 48], //1: LbEd
						[col1, 313, twocol, 60], //2: LbEd
						[col1, 374, twocol, 50], //3: Barterer
						[col2, 440, onecol, 110] ] //4: High tier
	},
	
	"S06E23" : { 
		"name" : "S06E23",
		"imagename" : "images/S06E23.png",
		"playerpos" : 	[  35, s6topline, 100], 
		"characterpos" : 	[ 170, s6topline, 110],  
		"numberpos" : 	[ 290, s6topline,  60], 
		"charnumpos" : 	[ 363, s6topline,  35], 
		"facpos" : 		[ 413, s6topline,  60],
		"tiergoldboxes" :     [ 
							[s6east3, s6box1, s6eastcol, s6boxheight], 
							[s6east3, s6box2, s6eastcol, s6boxheight], 
							[s6east3, s6box3, s6eastcol, s6boxheight] 
						], 
		"eventname" :         [45, s6botline, 70],
		"eventcode":          [135, s6botline, 75],
		"date"  :             [230, s6botline, 78],
		"gmsig" :             [322, s6botline, 132],
		"gmpfs" :             [472, s6botline, 106],
		"xpbox" : [s6east2, s6xpline, s6eastcol],
		"ppbox" : [s6east2, s6ppline, s6eastcol],
		"gpbox" : [s6east2, s6gpline, s6eastcol],
		"djbox" : [s6east2, s6djline, s6eastcol],
		"gminitial" : [
						[s6east3, s6xpline, s6eastcol], 
						[s6east3, s6ppline, s6eastcol], 
						[s6east3, s6gpline, s6eastcol], 
						[s6east3, s6djline, s6eastcol]
					],						
		"djannotation" : [col2, s6lowenough, onecol],
		"crossouts" : [ [col1, 185, twocol, 78], //0: Hero
						[col1, 265, twocol , 60], //1: ScSg
						[col1, 325, twocol, 85], //2: SvCt
						[col1, 410, twocol, 50], //3: Grandmere toil
						[col2, 505, onecol, 110] ] //4: High tier
	},
	
	"S06E98" : { 
		"name" : "S06E98",
		"imagename" : "images/S06E98.png",
		"playerpos" : 	[  35, s6topline, 100], 
		"characterpos" : 	[ 170, s6topline, 110],  
		"numberpos" : 	[ 290, s6topline,  60], 
		"charnumpos" : 	[ 363, s6topline,  35], 
		"facpos" : 		[ 413, s6topline,  60],
		"tiergoldboxes" :     [ 
							[s6east3, s6box1, s6eastcol, s6boxheight], 
							[s6east3, s6box2, s6eastcol, s6boxheight], 
							[s6east3, s6box3, s6eastcol, s6boxheight] 
						], 
		"eventname" :         [45, s6botline, 70],
		"eventcode":          [135, s6botline, 75],
		"date"  :             [230, s6botline, 78],
		"gmsig" :             [322, s6botline, 132],
		"gmpfs" :             [472, s6botline, 106],
		"xpbox" : [s6east2, s6xpline, s6eastcol],
		"ppbox" : [s6east2, s6ppline, s6eastcol],
		"gpbox" : [s6east2, s6gpline, s6eastcol],
		"djbox" : [s6east2, s6djline, s6eastcol],
		"gminitial" : [
						[s6east3, s6xpline, s6eastcol], 
						[s6east3, s6ppline, s6eastcol], 
						[s6east3, s6gpline, s6eastcol], 
						[s6east3, s6djline, s6eastcol]
					],						
		"djannotation" : [col2, s6lowenough, onecol],
		"crossouts" : [ [col1, 187, twocol, 35], //0: Exp
						[col1, 225, twocol , 35], //1: Art
						[col1, 263, twocol, 35], //2: Vng
						[col1, 298, twocol, 35], //3: Lea
						[col1, 336, twocol, 35], //4: Pro
						[col1, 373, twocol, 35], //5: Amb
						[col1, 410, twocol, 185]] //6: Grandmere toil
							}
};

module.exports = chrondata;