var axios = require("axios");
var express = require("express");
require("dotenv").config();
var fs = require("fs");

var textToSpeech = require('@google-cloud/text-to-speech');

var app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

const STATUS_CLOSED = 0
const STATUS_OPEN = 1

const ALERT_NONE = 0
const ALERT_BUZZ = 1

var status = STATUS_CLOSED
var alert = ALERT_NONE

app.get("/api/test", function(req, res, next){
    console.log("/api/test")
    res.json({"Hello": "World"});
});

app.get("/api/key/open", function(req, res, next){
    console.log("/api/key/open")
    status = STATUS_OPEN
    res.json({ "status": status, "alert": alert });
});

app.get("/api/key/close", function(req, res, next){
  console.log("/api/key/close")
  status = STATUS_CLOSED
  res.json({ "status": status, "alert": alert });
});

app.get("/api/alert/start", function(req, res, next){
  console.log("/api/alert/start")
  alert = ALERT_BUZZ
  res.json({ "status": status, "alert": alert });
});

app.get("/api/alert/stop", function(req, res, next){
  console.log("/api/alert/stop")
  alert = ALERT_NONE
  res.json({ "status": status, "alert": alert });
});

app.get("/api/status", function(req, res, next){
    console.log("/api/status")
    res.json({ "status": status, "alert": alert });
});

app.get("/api/route", function(req, res, next){
    console.log("/api/route")
    var origin = req.query.origin
    var destination = req.query.destination
    if (!(origin && destination))
        return res.status(400).end();
    axios.get("https://maps.googleapis.com/maps/api/directions/json?mode=walking&language=ja&origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination)+"&key="+process.env.GOOGLE_MAP_API_KEY).then((resp)=>{
        if (resp.data && resp.data.routes && resp.data.routes[0] && resp.data.routes[0].legs && resp.data.routes[0].legs[0] && resp.data.routes[0].legs[0].steps) {
            res.json(resp.data.routes[0].legs[0].steps.map(function (step){
                return {
                    lat: step.start_location.lat,
                    lng: step.start_location.lng,
                    instructions: step.html_instructions.replace(/\<.+?\>/g, "").replace(/\s/g, "、").replace(/\&.+?\;/g, "")
                }
            }))
        } else {
            res.status(404).end();
        }
    }).catch((error)=>{
        res.status(500).end();
    })
})

app.get("/api/voice", function(req, res, next){
    console.log("/api/voice")
    var text = req.query.text
    if (!text)
        return res.status(400).end();

    var client = new textToSpeech.TextToSpeechClient();
    client.synthesizeSpeech({
      input: {text: text},
      voice: {languageCode: 'ja-JP', ssmlGender: 'NEUTRAL'},
      audioConfig: {audioEncoding: 'MP3'},
    }).then(([response])=>{
      var id = Math.floor(Math.random() * 65536)
      fs.writeFileSync('./temp/output_'+id+'.mp3', response.audioContent, 'binary');
      res.sendFile('./temp/output_'+id+'.mp3', { root : __dirname});
    }).catch((error)=>{
        console.log(error)
        res.status(500).end();
    })
})
