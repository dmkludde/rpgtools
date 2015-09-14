inputdata = {
	"name" : "S06E23",
	"season" : 6,
	
}

encodedData = 
[0,0,0,0,0,0, 	//For every season, including 0
	{ 	"topx" : [35, 170, 290, 363, 413],	//Season 6
		"topy"  : 130,
		"topw" : [100, 110, 60, 35, 60],
		"eastx" : [514, 548],
		"eastw" : [35],
		"easty" : [350, 460, 605, 640], //xp,pp,gp,dj
		"goldboxy" : [110, 150, 190],
		"goldboxh" : 30,
		"mainx" : [40, 255],
		"mainw" : [215, 430],
		"bottomx" : [45, 135, 230, 322, 472],
		"bottomy" : 770,
		"bottomw" : [70, 75, 78, 132, 106],
		"low" : 690
	}];
	
specExample = {
	"name" : "S06E23",
	"crossouts" : [
		{"column" : 0, "width" : 2, "starty" : 50, "endy" : 110, "descr": "LbEd Boon"}]
}

	
	
function chronicle(generalData, specificData) {
	var spec = specificData;
	var base = generalData[spec.season];
	basechron = {
		"name" : spec.name,
		"imagename" : "images/" + spec.name,

		"playerpos" : 		[ base.topx[0], base.topy, base.topw[0]], 
		"characterpos" : 	[ base.topx[1], base.topy, base.topw[1]],  
		"numberpos" : 		[ base.topx[2], base.topy, base.topw[2]], 
		"charnumpos" : 		[ base.topx[3], base.topy, base.topw[3]], 
		"facpos" : 			[ base.topx[4], base.topy, base.topw[4]],
		"tiergoldboxes" :   [	[ base.eastx[1], base.goldboxy[0], base.eastw, base.goldboxh ], 
								[ base.eastx[1], base.goldboxy[1], base.eastw, base.goldboxh ], 
								[ base.eastx[1], base.goldboxy[2], base.eastw, base.goldboxh ] 
							], 
		"eventname" :		[ base.bottomx[0], base.bottomy, base.bottomw[0] ],
		"eventcode":        [ base.bottomx[1], base.bottomy, base.bottomw[1] ],
		"date"  :           [ base.bottomx[2], base.bottomy, base.bottomw[2] ],
		"gmsig" :           [ base.bottomx[3], base.bottomy, base.bottomw[3] ],
		"gmpfs" :           [ base.bottomx[4], base.bottomy, base.bottomw[4] ],
		"xpbox" : 			[ base.eastx[0], base.easty[0], base.eastw],
		"ppbox" : 			[ base.eastx[0], base.easty[1], base.eastw],
		"gpbox" : 			[ base.eastx[0], base.easty[2], base.eastw],
		"djbox" : 			[ base.eastx[0], base.easty[3], base.eastw],
		"gminitial" : 		[	[ base.eastx[1], base.easty[0], base.eastw], 
								[ base.eastx[1], base.easty[1], base.eastw], 
								[ base.eastx[1], base.easty[2], base.eastw], 
								[ base.eastx[1], base.easty[3], base.eastw] 
							],						
		"djannotation" : 	[ base.mainx[1], base.low, base.mainw[0] ],
		"crossouts" : [ ] 
	}
	
	crossouts = basechron.crossouts;
	for (var i=0; i < spec.crossouts.length) {
		xout = spec.crossout[i];
		element = [base.eastx[xout.column], xout.startx, base.eastw[xout.width-1], xout.endx-xout.startx, xout.descr];
		crossouts.push(element);
	}
	basechron.crossouts = crossouts;
	
}