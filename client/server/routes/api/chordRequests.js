const express = require('express');
const bodyParser = require('body-parser');
const scraperUG = require('ultimate-guitar-scraper');
const transposer = require('chord-transposer');
const fs = require('fs');
const htmlPdf = require('html-pdf');
var DomParser = require('dom-parser');
var xml = require('xmlserializer');
const tmp = require('tmp');
const path = require('path');
var parser = new DomParser();

const router = express.Router();
var cChords;
var filePath;



router.post('/chords', (req, res) => {
    // console.log(req.body.link);
    var fileName = null;
    console.log(req.body.link);

    scraperUG.get(req.body.link, (error, chords) => {
        if(error)
            console.log(error);
        else {
             cChords = chords;              
             text = processText(cChords, {transposed: false});
             options = {};

     
            result = htmlPdf.create(text, options).toStream(function(err, stream) {
                if (err) {
                    console.log(err)
                } else {
                    res.setHeader('Content-type', 'application/pdf');
                    stream.pipe(res)
                }
            });

            console.log("Result");
        }
    });

    console.log("Finished");
});

router.post('/chords_raw', (req,res) => {
    scraperUG.get(req.body.link, (error, chords) => {
        if(error)
            console.log(error);
        else {
            console.log("Link: " + req.body.link)

            res.artist = chords.artist
            res.name = chords.name
            res.text = chords.chordPage.text
        }
    });
})

router.get('/downloadChords/:id', (req,res) => {
    console.log("download" + req.body.fileName);
    res.download(req.body.fileName.toString(), 'chords.pdf');
}); 

function processText (chordPage, options){
    //console.log(chordPage.content.text);

    var text = "<div id='song'>" + chordPage.content.text + "</div>";

    //text = replaceAll(text, "[ch]" , '<span class="chord">')
    //text = replaceAll(text, "[/ch]" , '</span>')
    //text = replaceAll(text, "[", '<span class="song_part">')
    //text = replaceAll(text, "]" , '</span>')

    text = `<!DOCTYPE html><html><head><meta charset="utf-8" /><link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> </head><body><h1 id='headline'> ${chordPage.name} - ${chordPage.artist}</h1> ${text}`;
    text += `<div id="rightside_bar"> </div>`;
    text += `<div id="leftside_bar"> </div>`;
    text += '</body><style>#song,#headline{margin-left:10%;} #leftside_bar{position: absolute; margin-right:5%; left:0px; top: 0px; width: 3%; height: 100%; background: coral; float: left;}#rightside_bar{position: absolute; right: 0px; top: 0px; width: 20%; height: 100%; background: coral; float: right;} .chord{color: coral;font-weight:bold;} .song_part{font-weight: bold; font-size:1em;} body{height: 100%; font-family: "Nunito", sans-serif; white-space: pre; font-size: 0.8em; } html{height:100%;}</style>'
    text += '</html>';

    console.log(text);

    /*if(options.transposed){
        var dom = parser.parseFromString(text);
        var allChords = dom.getElementsByClassName("chord");

        for (let i = 0; i < allChords.length; i++) {
            allChords[i].innerHtml = chordMagic.transpose(chordMagic.parse(allChords[i].innerHTML), chordPage.capo);
        }

        console.log(dom);
        
    
        //text = dom.getElementsByTagName('html')[0].innerHTML

        // console.log(chordPage.tonality);
        
        // var otherKey = transposer.transpose(chordPage.tonality).down(chordPage.capo);
        // text = transposer.transpose(text).fromKey(otherKey + "").up(chordPage.capo) + "";
        // console.log(text);
    }*/

    return text;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


module.exports = router;