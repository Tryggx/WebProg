"use strict";
var synth = new Tone.PolySynth().toDestination();
const songs = []
const rec = []
const newsong = []
var rectime = 0
window.addEventListener('load',getTunes());

var key = document.getElementById("keyboardDiv");
['click','keydown'].forEach( function(operation) {
key.addEventListener(operation, function(event) {
        event.preventDefault();
        if (operation == 'keydown') {
            target(event.key)
        };
        if (operation == 'click') { 
            playtone(event.target['id'])
            //console.log((document.getElementById(event.target['id']).getProp('button')))
        };
})});


function keypress(key) {
    var pre = document.getElementById(key.toLowerCase());
    pre.style = 'background-color: rgb(152, 152, 152)';
    document.addEventListener('keyup', function(){
        //event.preventDefault();
        pre.style.backgroundColor = ''
    });
    };


function getTunes() {
    //The URL to which we will send the request
    var url = 'https://veff2022-h1.herokuapp.com/api/v1/tunes'//'https://veff2022-hmv-aku.herokuapp.com/api/v1/tunes';
    //Perform a GET request to the url
    var songlist = document.getElementById("tunesDrop");
    var child

    axios.get(url)

        .then(function (response) {
            //When successful, print the received data
            console.log("Success: ", response.data);

            //response.data is an array if the request was successful, so you could iterate through it using a for loop.
            for (var i=0;i<response.data.length;i++) {
                songs.push(response.data[i])
                child = document.createElement('option')
                child.text = response.data[i].name
                songlist.appendChild(child);
            }
        })
        .catch(function (error) {
            //When unsuccessful, print the error.
            console.log(error);
        })
        .then(function () {
            // This code is always executed, independent of whether the request succeeds or fails.
        });
}


function target(keyName) {
    if (keyName == 'a'){
        playtone('c4')
        keypress('c4');
    };
    if (keyName == 'w'){
        playtone('c#4')
        keypress('c#4');
    };
    if (keyName == 's'){
        playtone('d4')
        keypress('d4');
    };
    if (keyName == 'e'){
        playtone('d#4')
        keypress('d#4');
    };
    if (keyName == 'd'){
        playtone('e4')
        keypress('e4');
    };
    if (keyName == 'f'){
        playtone('f4')
        keypress('f4');
    };
    if (keyName == 't'){
        playtone('f#4')
        keypress('f#4');
    };
    if (keyName == 'g'){
        playtone('g4')
        keypress('g4');
    };
    if (keyName == 'y'){
        playtone('g#4')
        keypress('g#4');
    };
    if (keyName == 'h'){
        playtone('a4')
        keypress('a4');
    };
    if (keyName == 'u'){
        playtone('bb4')
        keypress('bb4');
    };
    if (keyName == 'j'){
        playtone('b4')
        keypress('b4');
    };
    if (keyName == 'k'){
        playtone('c5')
        keypress('c5');
    };
    if (keyName == 'o'){
        playtone('c#5')
        keypress('c#5');
    };
    if (keyName == 'l'){
        playtone('d5')
        keypress('d5');
    };
    if (keyName == 'p'){
        playtone('d#5')
        keypress('d#5');
    };
    if (keyName == ';'){
        playtone('e5')
        keypress('e5');
    };
};

function recordSong(){
    rectime = Tone.now();
    document.getElementById('recordbtn').disabled = true;
    document.getElementById('stopbtn').disabled = false;
}

function playtone (tone) { 
    var time = Tone.now();
    synth.triggerAttackRelease(tone,"8n");
    if (document.getElementById('recordbtn').disabled == true) {
        rec.push({'note':tone,'duration':'8n','timing':parseFloat((time-rectime).toFixed(2))})
    }
}
    
function playSong(){
    Tone.start()
    var selectedSong = document.getElementById('tunesDrop')
    console.log('Playing: ' + selectedSong[selectedSong.selectedIndex].text)
    var notes = songs[selectedSong.selectedIndex].tune
    for(var i=0;i<notes.length;i++) {
        synth.triggerAttackRelease(notes[i].note,notes[i].duration,notes[i].timing + Tone.now())
    }
};


function pushSong() {
    var recname = document.getElementById('recordName').value
    document.getElementById('recordbtn').disabled = false
    document.getElementById('stopbtn').disabled = true
    if (recname == ''){
        recname = 'Unnamed Tune'
    };
    if (rec.length != 0){
        newsong.push({'name':recname,'tune':rec})
        axios.post('https://veff2022-h1.herokuapp.com/api/v1/tunes', {
        'name':recname,'tune':rec
        })
        .then(function (response) {
            console.log(response);
    })}
};