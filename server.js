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
    phoneNumber: "111-222-3333",
    email: "human@hi.com",
    id: "12345A"
}];
var waitList = [{
    name: "waiting human being",
    phoneNumber: "111-222-3333",
    email: "waitinghuman@hi.com",
    id: "12345W"
}];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/resList", function (req, res) {
    res.json(reservationList);
});

app.get("/wait", function (req, res) {
    res.json(waitList);
});


app.get("/reservation", function (req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
})

app.post("/api/new", function (req, res) {
    var newListObj = req.body;

    if (reservationList.length > 5) {
        waitList.push(newListObj);
    } else {
        reservationList.push(newListObj);
    }

    res.json(newListObj);

});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});