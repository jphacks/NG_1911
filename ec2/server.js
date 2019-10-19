var axios = require("axios");
var express = require("express");
require("dotenv").config();

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
    res.json({"Hello": "World"});
});

app.get("/api/key/open", function(req, res, next){
    status = STATUS_OPEN
    res.json({ "status": status, "alert": alert });
});

app.get("/api/key/close", function(req, res, next){
  status = STATUS_CLOSED
  res.json({ "status": status, "alert": alert });
});

app.get("/api/alert/start", function(req, res, next){
  alert = ALERT_BUZZ
  res.json({ "status": status, "alert": alert });
});

app.get("/api/alert/stop", function(req, res, next){
  alert = ALERT_NONE
  res.json({ "status": status, "alert": alert });
});

app.get("/api/status", function(req, res, next){o
    res.json({ "status": status, "alert": alert });
});

app.get("/api/route", function(req, res, next){
    var origin = req.query.origin
    var destination = req.query.destination
    if (!(origin && destination))
        return res.status(400).end();
    axios.get("https://maps.googleapis.com/maps/api/directions/json?mode=walking&language=ja&origin="+encodeURIComponent(origin)+"&destination="+encodeURIComponent(destination)+"&key="+process.env.GOOGLE_MAP_API_KEY).then((resp)=>{
        if (resp.data && resp.data.routes && resp.data.routes[0] && resp.data.routes[0].legs && resp.data.routes[0].legs[0] && resp.data.routes[0].legs[0].steps) {
            res.json(resp.data.routes[0].legs[0].steps.map(function (step){
                return Object.assign(step, {
                    instructions: step.html_instructions.replace(/\<.+?\>/g, "").replace(/\s/g, "、").replace(/\&.+?\;/g, "")
                })
            }))
        } else {
            res.status(404).end();
        }
    }).catch((error)=>{
        res.status(500).end();
    })
})
