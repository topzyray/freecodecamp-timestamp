// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// Requiring environmental variables
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(express.json());
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:timestamp", (req, res) => {
  const utc = new Date(+req.params.timestamp).toUTCString();
  res.json({
    unix: req.params.timestamp,
    utc: utc,
  });
});

app.get("/api/:date?", (req, res) => {
  console.log(req.query.date);
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
