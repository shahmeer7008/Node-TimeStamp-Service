// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get('/api', function (req, res) {
  const date = new Date();
  
  // Return the current date in the required format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

app.get('/api/:date_string', function (req, res) {
  const dateString = req.params.date_string;
  let date;

  // Check if the date string is a valid ISO format
  if (!isNaN(Date.parse(dateString))) {
    date = new Date(dateString);
  } else {
    console.log('Not a valid ISO date format:', dateString);
    // If not, try to parse it as a Unix timestamp
    const timestamp = parseInt(dateString, 10);
    if (!isNaN(timestamp)) {
      date = new Date(timestamp);
    } else {
      return res.json({ error: 'Invalid Date' });
    }
  }

  // Return the date in the required format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
