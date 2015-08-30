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

//Define two json files that contain information on chronicles (where to fill out boxes), and event info
//var cfile = './chronicleData.json';


if(process && process.argv && process.argv.length >2){
    var evfile = './eventData/' + process.argv[2] + '.json';
    eventFromFile(evfile, createPDFs);
}



function namedpipe(evdat, pdat) {
    filename = evdat.eventname + '-' + evdat.scenario + '-' + pdat.charname + '.pdf';
    console.log('Creating ' + filename);
    return fs.createWriteStream('out/' + filename);
};

function eventFromFile(evfile, callback){
    fs.readFile(evfile, 'utf8', function (err, data) { //Then read the event file
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        var eventAndPlayerData =JSON.parse(data);          //And parse
        callback(eventAndPlayerData);
    });
}

function createPDFs(eventAndPlayerData){
    //fs.readFile(cfile, 'utf8', function (err, data) {   //First read the chronicle file
        //if (err) {
        //	console.log('Error: ' + err);
        //	return;
        //}
        chronicleName = eventAndPlayerData.scenario;
        theurl = 'http://localhost:5984/chronicledata/_design/byname/_view/ChronicleByName?key="';
        theurl = theurl + chronicleName + '"';
        request(theurl, function(err, res, body){
            data = JSON.parse(body);
            console.log(body);
            if(data.rows.length==0){
                console.log(chronicleName + ' Not found in database');
            }
            chronicleData = data.rows[0].value;
            //var chronicleData =JSON.parse(data);             //And parse the data
        
            var eventData = eventAndPlayerData;
            var playerData = eventAndPlayerData.playerData;

            console.log('Creating raster.pdf');
            var rasterpipe = fs.createWriteStream('out/raster.pdf');
            createRasterPDF(chronicleData, eventData, playerData, rasterpipe);

            for (var i=0; i< playerData.length; ++i){
                var pipe = namedpipe(eventData, playerData[i])
                createPDF(chronicleData, eventData, playerData[i], pipe);
            }


        });
    //});        
}


function createRasterPDF(cdat, evdat, pdat, thepipe) {
    // Create a document
    doc = new PDFDocument({margin:[0,0,0,0]});
    // Pipe it's output somewhere, like to a file or HTTP response
    doc.pipe(thepipe);
    //doc.addPage({margin:[0,0,0,0]});

    //Create a raster of blue lines
    doc.image(cdat.imagename, 0, 0, {width : pagewidth})
	.save()
	.fontSize(2)	
	.lineWidth(.1)
    .strokeColor('blue');
    for (var i=0; i<780; i+=5){//
	doc.moveTo(50, i)
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
    doc.lineWidth(2)
	.strokeColor('red');
    //Write boxes for event text positions, etc.
    writeLineBox(doc, pdat.player, cdat.playerpos);
    writeLineBox(doc, pdat.charname, cdat.characterpos);
    writeLineBox(doc, pdat.number, cdat.numberpos);
    writeLineBox(doc, pdat.charnumber, cdat.charnumpos);
    writeLineBox(doc, pdat.faction, cdat.facpos);
	
    writeLineBox(doc, evdat.eventname, cdat.eventname)
    writeLineBox(doc, evdat.eventcode, cdat.eventcode)
    writeLineBox(doc, evdat.date, cdat.date)
    writeLineBox(doc, evdat.gmsig, cdat.gmsig)
    writeLineBox(doc, evdat.gmpfs, cdat.gmpfs)
    

    for (var i=0; i< cdat.tiergoldboxes.length; i++){
        var gpboxes = cdat.tiergoldboxes[i];
        drawBox(doc, gpboxes)
    }
    if (cdat.gminitial) {
        for (var i=0; i<cdat.gminitial.length; ++i){
                writeLineBox(doc, evdat.gmsig, cdat.gminitial[i]);
        }
    }

   
    if(cdat.xpbox) { writeLine(doc, '1', cdat.xpbox) }
    writeLineBox(doc, pdat.pp, cdat.ppbox)
    writeLineBox(doc, pdat.gp, cdat.gpbox)
    writeLineBox(doc, pdat.dj, cdat.djbox)
    writeLineBox(doc, pdat.dj + ' GP from day job', cdat.djannotation);
    // Finalize PDF file
    doc.end();
}


function createPDF(cdat, evdat, pdat, thepipe){
    // Create a document
    doc = new PDFDocument({margins: {top:0, bottom:0}});
    // Pipe it's output somewhere, like to a file or HTTP response
    doc.pipe(thepipe);
    //doc.addPage({margins: {top:0, bottom:0}});
    doc.lineJoin('round')
	.lineWidth(2)
	.strokeColor('red')
    doc.image(cdat.imagename,0,0, {width : pagewidth})
	.fontSize(10)

    if(pdat.charname === ""){
        console.log('Player is empty')
    }
    else {
        if(pdat.tier < cdat.tiergoldboxes.length && !(pdat.tier==="") ){
            var gpboxes = cdat.tiergoldboxes[pdat.tier];
            drawBox(doc, gpboxes);
        }
        writeLine(doc, pdat.player, cdat.playerpos);
        writeLine(doc, pdat.charname, cdat.characterpos);
        writeLine(doc, pdat.number, cdat.numberpos);
        writeLine(doc, pdat.charnumber, cdat.charnumpos);
        writeLine(doc, pdat.faction, cdat.facpos);
    	
        writeLine(doc, evdat.eventname, cdat.eventname)
        writeLine(doc, evdat.eventcode, cdat.eventcode)
        writeLine(doc, evdat.date, cdat.date)
        writeLine(doc, evdat.gmsig, cdat.gmsig)
        writeLine(doc, evdat.gmpfs, cdat.gmpfs)
        
        if(cdat.xpbox) { 
            if(!(pdat.xp==="") ){
                writeLine(doc, pdat.xp, cdat.xpbox)
            }
            //else {
            //    writeLine(doc, '1', cdat.xpbox) 
            //}
        }
        if(pdat.comment) {
            if (cdat.commentbox) {
                writeLine(doc, pdat.comment, cdat.commentbox)
            }
        
        }
        
        

        writeLine(doc, pdat.pp, cdat.ppbox)
        writeLine(doc, pdat.gp, cdat.gpbox)
        if(!(pdat.dj==="") ) {
            writeLine(doc, pdat.dj, cdat.djbox)
            if(pdat.dj > 0){
                writeLine(doc, pdat.dj + ' GP from day job', cdat.djannotation);
            }
        } 
        //else {
        //    writeLine(doc, "0", cdat.djbox)
        //}
        doc.fontSize(8);
        if (cdat.gminitial) {
            for (var i=0; i<cdat.gminitial.length; ++i){
                    writeLine(doc, evdat.gmsig, cdat.gminitial[i]);
            }
        }
        if(pdat.crossouts){
            pdat.crossouts = JSON.parse(pdat.crossouts);
        }
        for (var i=0; i< pdat.crossouts.length; ++i){
            if(cdat.crossouts.length < pdat.crossouts[i]){
                console.log('Crossout number ' + pdat.crossouts[i] + ' is not defined');
            }
            else{
                drawFillBox(doc, cdat.crossouts[pdat.crossouts[i]]);
            }
        }
    }

    // Finalize PDF file
    doc.end();
}

function writeLine(doc, text, posvec){
    doc.text(text, posvec[0], posvec[1], {align: 'center', width: posvec[2], lineBreak:false, margin :[0,0,0,0]});    
}

function writeLineBox(doc, text, posvec){
    doc.rect(posvec[0], posvec[1], posvec[2], 10 ).stroke();
}

function drawBox(doc, boxvec){
    doc.rect(boxvec[0], boxvec[1], boxvec[2], boxvec[3]).stroke();
}

function drawFillBox(doc, boxvec){
    doc.rect(boxvec[0], boxvec[1], boxvec[2], boxvec[3]).fillOpacity(0.5).fillAndStroke("red", "red");
}

module.exports = createPDFs;
