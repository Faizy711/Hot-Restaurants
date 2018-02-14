// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Restaurant Objects

var reservationList = [{
    name: "human being",
    email: "111-222-3333",
    phone: "human@hi.com",
    uniqueId: "12345A"
}];
var waitList = [{
    name: "wait list human being",
    email: "111-222-3333",
    phone: "human@hi.com",
    uniqueId: "462849"
}];

// Basic route that sends the user first to the AJAX Page
//HTML Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function (req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
})

// API Routes
app.get("/api/resList", function (req, res) {
    var allReservation = {};
    allReservation.reservationList = reservationList;
    allReservation.waitList = waitList;
    
    res.json(allReservation);
});

app.post("/api/new", function (req, res) {
    var newListObj = req.body;
    var reserved = true;

    if (reservationList.length > 4) {
        waitList.push(newListObj);
        res.json(!reserved);
    } 
    else 
    {
        reservationList.push(newListObj);
        res.json(reserved);
    }
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});