// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = 8000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api/:dateString", function (req, res) {

  const dateString = req.params.dateString;
  let response;

  if (isNaN(dateString)) {
    response = {
      unix: new Date(dateString).getTime(),
      utc: new Date(dateString).toUTCString()
    }
  }
  else {
    response = {
      unix: new Date(dateString * 1).getTime(),
      utc: new Date(dateString * 1).toUTCString()
    }
  }

  if (response.unix == null || response.utc == "Invalid Date")
    res.json({ error: "Invalid Date" });
  else
    res.json(response);
})


// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
