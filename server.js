var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
var logger = require("morgan");
var cheerio = require("cheerio");


var path = require("path");
var app = express();
var PORT = process.env.PORT || 4000;

// Parse application/x-www-form-urlencoded
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));


//--------Database connection with mongoose-----------
mongoose.Promise = Promise;

var databaseUrl = 'mongodb://localhost/ElijahScraper';

// ------------------------------------------------------
 

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
} else {
    mongoose.connect(databaseUrl);
}

var db = mongoose.connection;

db.on('error',function(err){
    console.log('Mongoose Error',err);
});

db.once('open', function(){
    console.log("Mongoose connection is successful");
});

// ---------------------End of Connection--------------------------

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));

app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

require("./routes/scrape")(app);
require("./routes/html.js")(app);



app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "views/index.html"));
});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

