var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash");




app.get("/", function(req, res){
  res.redirect("/index");
});
