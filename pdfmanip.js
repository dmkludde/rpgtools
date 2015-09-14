/**
 * Code that takes care of creating annotated chronicle. It reads two json files to generate a chronicle.
 Usage:
    nodejs pdfmanip
 Prereqisuites: 
    nodejs: get it at nodejs.org
    pdfkit: can be installed with 'npm install pdfkit'
    chronicle image: simply save the chronicle page to a .png into the 'image/' subfolder
 Setup:
    the program requires an 'image/' and 'out/' subfolder, and doesn't check for them, so you'll have to ensure they're there
 Output:
    Chronicles for ever player entered into eventdata.json
    A file called raster.pdf, which helps check the position of boxes
 */
 
PDFDocument = require('pdfkit'); //Code depends on the PDFKit package: npm install pdfkit
var fs = require('fs');
var request = require('request');

var pagewidth = 620; //That's how big a page seems to be

var outputdir = 'out/';
var rastername = 'raster.pdf';
var verbose = true;

function namedFSpipe(evdat, pdat) {
	if( pdat.charname){
		filename = evdat.eventname + '-' + evdat.scenario + '-' + pdat.charname + '.pdf';
	}
	else {
		filename = rastername;
	}
	if(verbose){
		console.log('Creating ' + filename);
	}
	return fs.createWriteStream(outputdir + filename);
};

//Function that gets exported
function createPDFs(eventAndPlayerData, chronicleData){
	if(verbose){
		console.log(eventAndPlayerData);
		console.log(chronicleData);
	}
	if(eventAndPlayerData.scenario != chronicleData.name){
		if(verbose){
			console.log("Chronicledata does not match event, aborting PDF creation");
			console.log(eventAndPlayerData.scenario);
			console.log(chronicleData.name);
		}
		
	}
	else {	
		var eventData = eventAndPlayerData;//.eventData;
		var playerData = eventAndPlayerData.playerData;

		//console.log('Creating raster.pdf');
		var pipe = namedFSpipe(eventData, {})
		createRasterPDF(chronicleData, eventData, {}, pipe);

		for (var i=0; i< playerData.length; ++i){
			if(playerData[i].charname){
				var pipe = namedFSpipe(eventData, playerData[i])
				createPDF(chronicleData, eventData, playerData[i], pipe);
			}
		}
	}
}

function createRasterPDF(cdat, evdat, pdat, thepipe) {
	createPDFByLine(cdat, evdat, pdat, thepipe, true);
}

function createPDF(cdat, evdat, pdat, thepipe) {
	createPDFByLine(cdat, evdat, pdat, thepipe, false);
}

function createPDFByLine(cdat, evdat, pdat, thepipe, isRaster){
    // Create a document
    //doc = new PDFDocument({margin:[0,0,0,0]});
    doc = new PDFDocument({margins: {top:0, bottom:0}});
    doc.pipe(thepipe);
    
	//Add background image
	doc.image(cdat.imagename, 0, 0, {width : pagewidth})
	.save()
	
	//Draw raster lines 
	if(isRaster){
		drawRasterLines(doc);
	}
	
	//Does not stop if no pdat is provided, since charname is not equal to ""
	if(pdat.charname === ""){
        console.log('Player is empty')
    }
    
	else {
        for (var i=0; i<cdat.tiergoldboxes.length; ++i){
			if(isRaster || ( !(pdat.tier ==="") && pdat.tier == i ) ){
				drawBox(doc, cdat.tiergoldboxes[i], isRaster);
			}
		}
		writeLine(doc, evdat.eventname, cdat.eventname,		isRaster);
        writeLine(doc, evdat.eventcode, cdat.eventcode,		isRaster);
        writeLine(doc, evdat.date, 		cdat.date,			isRaster);
        writeLine(doc, evdat.gmsig, 	cdat.gmsig, 		isRaster);
        writeLine(doc, evdat.gmpfs, 	cdat.gmpfs,			isRaster);
		
		writeLine(doc, pdat.player, 	cdat.playerpos, 	isRaster);
		writeLine(doc, pdat.charname, 	cdat.characterpos, 	isRaster);
		writeLine(doc, pdat.number, 	cdat.numberpos, 	isRaster);
		writeLine(doc, pdat.charnumber, cdat.charnumpos, 	isRaster);
		writeLine(doc, pdat.faction, 	cdat.facpos, 		isRaster);
    	
        
        
        if( cdat.xpbox &&  (!(pdat.xp==="") || isRaster) ){ 
			writeLine(doc, pdat.xp, cdat.xpbox, isRaster);
        }
		
		if (cdat.commentbox) {
			if(pdat.comment || isRaster) {
                writeLine(doc, pdat.comment, cdat.commentbox, isRaster);
            }
        }
        
        writeLine(doc, pdat.pp, cdat.ppbox, isRaster);
        writeLine(doc, pdat.gp, cdat.gpbox, isRaster);

        if(!(pdat.dj==="") || isRaster) {
            writeLine(doc, pdat.dj, cdat.djbox, isRaster)
            if(pdat.dj > 0 || isRaster){
                writeLine(doc, pdat.dj + ' GP from day job', cdat.djannotation, isRaster);
            }
        } 
       
        doc.fontSize(8);
        if (cdat.gminitial) {
            for (var i=0; i<cdat.gminitial.length; ++i){
                    writeLine(doc, evdat.gmsig, cdat.gminitial[i], isRaster);
            }
        }
		
        if(pdat.crossouts){
			if(verbose){
				console.log(pdat);
			}
			pdat.crossouts = JSON.parse(pdat.crossouts);

        }
		
		if(isRaster){
			for (var i=0; i< cdat.crossouts.length; ++i){
				drawFillBox(doc, cdat.crossouts[i], isRaster);
			}
		}
		else {
			if(pdat.crossouts){
			//console.log(pdat);
			//console.log(pdat.crossouts);
			//console.log(cdat.crossouts);
				for (var i=0; i< pdat.crossouts.length; ++i){
					if(cdat.crossouts.length < pdat.crossouts[i]){
						console.log('Crossout number ' + pdat.crossouts[i] + ' is not defined');
					}
					else {
						if(verbose){
							console.log('Drawing crossout ' + pdat.crossouts[i]);
						}
						drawFillBox(doc, cdat.crossouts[pdat.crossouts[i]], isRaster);
					}
				}
			}
		}
		
    }
    // Finalize PDF file
    doc.end();
}

function drawRasterLines(doc){
	doc.lineJoin('round')
	.fontSize(2)	
	.lineWidth(.1)
    .strokeColor('blue');
	
    for (var i=0; i<780; i+=5){//
		doc
		.moveTo(50, i)
		.lineTo(600,i)
		.stroke()
    //Create line position indicators
		for (var j=50; j<620; j+=50){
			doc.text(i, j, i, {lineBreak:false})
		}
    }
    //Repeat for vertical lines
    for (var i=0; i<620; i+=5){
		doc.moveTo(i, 50)
			.lineTo(i, 780)
		.stroke()
		for (var j=50; j<780; j+=50){
			doc.text(i, i, j, {lineBreak:false})
		}
    }
}

function writeLine(doc, text, posvec, isRaster){
	if (verbose){				
		console.log(" txt " + text + " pv " + posvec + " ? " + isRaster);
	}
    if(isRaster){
		doc.lineJoin('round')
		.lineWidth(2)
		.strokeColor('red');
		doc.rect(posvec[0], posvec[1], posvec[2], 10 ).stroke();
	}
	else {
		doc.fontSize(10);
		doc.text(
			text, posvec[0], posvec[1], 
			{align: 'center', width: posvec[2], lineBreak:false, margin :[0,0,0,0]}
		);    
	}
}

function drawBox(doc, boxvec, isRaster){
	if (verbose){					
		console.log(" bv " + boxvec + " ? " + isRaster);
	}
	doc.lineJoin('round')
		.lineWidth(2)
		.strokeColor('red');
	doc.rect(boxvec[0], boxvec[1], boxvec[2], boxvec[3]).stroke();
}

function drawFillBox(doc, boxvec, isRaster){
	if (verbose){					
		console.log(" bv " + boxvec + " ? " + isRaster);
	}
    if(isRaster){
		doc.lineJoin('round')
		.lineWidth(2)
		.strokeColor('red');
		doc.rect(boxvec[0], boxvec[1], boxvec[2], boxvec[3]).stroke();
	}
	else {
		doc.lineJoin('round')
		.lineWidth(2)
		.strokeColor('red');
		//doc.rect(boxvec[0], boxvec[1], boxvec[2], boxvec[3]).stroke();
		doc.rect(boxvec[0], boxvec[1], boxvec[2], boxvec[3]).fillOpacity(0.5).fillAndStroke("red", "red");
	}
}

module.exports = { createPDFs: createPDFs, createPDF : createPDF, createRasterPDF : createRasterPDF };
