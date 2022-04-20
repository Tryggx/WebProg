//Sample for Assignment 3
const express = require('express');

//Import a body parser module to be able to access the request body as json
const bodyParser = require('body-parser');

//Use cors to avoid issues with testing on localhost
const cors = require('cors');

const app = express();

//Port environment variable already set up to run on Heroku
let port = process.env.PORT || 3000;

//Tell express to use the body parser module
app.use(bodyParser.json());

//Tell express to use cors -- enables CORS for this backend
app.use(cors()); 

//Set Cors-related headers to prevent blocking of local requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//The following is an example of an array of two tunes.  Compared to assignment 2, I have shortened the content to make it readable
var tunes = [
    { id: '0', name: "Für Elise", genreId: '1', content: [{note: "E5", duration: "8n", timing: 0},{ note: "D#5", duration: "8n", timing: 0.25},{ note: "E5", duration: "8n", timing: 0.5},{ note: "D#5", duration: "8n", timing: 0.75},
    { note: "E5", duration: "8n", timing: 1}, { note: "B4", duration: "8n", timing: 1.25}, { note: "D5", duration: "8n", timing: 1.5}, { note: "C5", duration: "8n", timing: 1.75},
    { note: "A4", duration: "4n", timing: 2}] },

    { id: '3', name: "Seven Nation Army", genreId: '0', 
    content: [{note: "E5", duration: "4n", timing: 0}, {note: "E5", duration: "8n", timing: 0.5}, {note: "G5", duration: "4n", timing: 0.75}, {note: "E5", duration: "8n", timing: 1.25}, {note: "E5", duration: "8n", timing: 1.75}, {note: "G5", duration: "4n", timing: 1.75}, {note: "F#5", duration: "4n", timing: 2.25}] }
];

let genres = [
    { id: '0', genreName: "Rock"},
    { id: '1', genreName: "Classic"}
];

//Your endpoints go here

//Start the server
app.listen(port, () => {
    console.log('Tune app listening on port + ' + port);
});

app.get('/api/v1/tunes/', (req, res) => { // Sækir öll tunes
	res.status(200).json(tunes)
});

app.get('/api/v1/genres/', (req, res) => { // sækir öll genres
	res.status(200).json(genres)
});

app.get('/api/v1/genres/:genreid/tunes', (req, res) => { //Sækir öll tunes utfrá genre id 
    for (let i=0;i<tunes.length;i++) {
        if (tunes[i].genreId == req.params.genreid) {
            res.status(200).json(tunes[i]);
            return;
        }
    }
    res.status(404).json({'message': "Genre with id " + req.params.genreid + " does not exist."});
});

app.get('/api/v1/genres/:genreid/tunes/:tuneid', (req, res) => { // Sækir tune utrfá tune id og genre id 
    for (let i=0;i<tunes.length;i++) {
        if (req.params.tuneid == tunes[i].id) {
            if (req.params.genreid == tunes[i].genreId) {
                res.status(200).json(tunes[i])
                return;
            }
        }
    }    
        res.status(404).json({'message': "Tune with genre id " + req.params.genreid + " and Tune id "  + req.params.tuneid +  " does not exist."});
    });


let nextTuneId = 2;
let nextGenreId = 2;
app.post('/api/v1/genres/', (req, res) => {
    genreNames = GetGenreNames()
    if (req.body === undefined || req.body.genreName === undefined) {
        return res.status(400).json({'message': "Genre name is "+ req.body +" required in the request body."});

    }
    else {
        if (genreNames.indexOf(req.body.genreName) != -1) {
            return res.status(400).json({'message': "Genre name already exists."});
        }
        else {
            let newGenre = {genreName: req.body.genreName, id: nextGenreId};
            genres.push(newGenre);
            nextGenreId++;
            res.status(201).json(newGenre);
        }
    }
});

app.post('/api/v1/genres/:genreId/tunes', (req, res) => { // sendir inn nýtt tune og býr til nýtt tune id
    if (req.body === undefined || req.body.name === undefined || req.body.content === undefined) {
        res.status(400).json({'message': "name and content fields are required in the request body"});
    } else {
        for (let i=0;i<tunes.length;i++) {
            if (genres[i].id == req.params.genreId) {
                let newTune = {id:nextTuneId, name: req.body.recordName, genreId: req.body.genreId, content: req.body.recording};
                tunes.push(newTune);
                nextTuneId++;
                res.status(201).json(newTune);
                return;
            }
        }
        res.status(404).json({'message': "Genre with id " + req.params.genreId + " does not exist"});
    }
});


function GetTunes () {
    var TuneInfo = []
    for (let i=0;i<tunes.length;i++) {
       TuneInfo.push(tunes[i].id,tunes[i].name,tunes[i].genreId)
    }    
    return TuneInfo;
}

function GetGenreNames () {
    var genreNames = []
    for (let i=0;i<genres.length;i++) {
        genreNames.push(genres[i].name)
    }    
    return genreNames;
}

app.use('*', (req, res) => {
    res.status(405).send('Operation not supported.');
});