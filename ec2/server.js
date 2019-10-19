var express = require("express");
var app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/api/mobile/test", function(req, res, next){
    res.json({"Hello": "World"});
});

app.get("/api/mobile/connected", function(req, res, next){
    res.json({"Hello": "World"});
});

app.get("/api/mobile/alert", function(req, res, next){
    res.json({"Hello": "World"});
});

app.get("/api/mobile/finished", function(req, res, next){
    res.json({"Hello": "World"});
});

app.get("/api/pi/status", function(req, res, next){
    res.json({"Hello": "World"});
});
