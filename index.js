// index.js
// Where your Node.js app starts

// Init project
var express = require("express");
var cors = require("cors");

var app = express();

// Enable CORS so that the API is remotely testable
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Default route: Serve the index.html page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Test API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  let { date } = req.params;

  // If no date is provided, return the current timestamp
  if (!date) {
    let now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Handle UNIX timestamps correctly (must be treated as a number)
  if (/^\d+$/.test(date)) {
    date = parseInt(date);
  }

  let parsedDate = new Date(date);

  // Check if the parsed date is valid
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the correct timestamp response
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
