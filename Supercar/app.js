var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static(__dirname+'/public'));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.render("index");
});

app.get("/Bugatti", function (request, response) {
  response.render("Bugatti");
});

app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

app.get("/home", function (request, response) {
  response.render("home");
});

app.get("/Maserati", function (request, response) {
  response.render("Maserati");
});

app.get("/McLaren", function (request, response) {
  response.render("McLaren");
});

app.post("/new-entry", function (request, response) {
  if ( !request.body.age|| !request.body.username||!request.body.email|| !request.body.exampleFormControlTextarea1|| !request.body.country|| !request.body.state) {
    response.status(400)
      .send("Entries must have a title and a body.");
    return;
  }

  entries.push({
    content: "User name:"+" "+request.body.username+" "+"/"+" "+request.body.exampleFormControlSelect1+" "+"/"+" "+request.body.age+"age",
    em: request.body.email,
    test: request.body.country+"/"+request.body.state,
    title: request.body.exampleFormControlTextarea1,
    published: new Date()
  });

  response.redirect("/");
});

app.use(function (request, response) {
  response.status(404).render("404");
});

http.createServer(app).listen(3000, function () {
  console.log("Guestbook app started on port 3000.");
});
