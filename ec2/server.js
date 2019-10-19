var express = require("express");
var app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

const STATUS_CLOSED = 0
const STATUS_OPEN = 1
const SYATUS_ERROR = 2

var status = STATUS_CLOSED

app.get("/api/mobile/test", function(req, res, next){
    res.json({"Hello": "World"});
});

app.get("/api/mobile/connected", function(req, res, next){
    status = STATUS_OPEN
    res.json({ "status": status });
});

app.get("/api/mobile/alert", function(req, res, next){
  status = STATUS_ERROR
  res.json({ "status": status });
});

app.get("/api/mobile/finished", function(req, res, next){
  status = STATUS_CLOSED
  res.json({ "status": status });
});

app.get("/api/pi/status", function(req, res, next){
    res.json({ "status": status });
});
