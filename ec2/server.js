var express = require("express");
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

app.get("/api/status", function(req, res, next){
    res.json({ "status": status, "alert": alert });
});
