var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var mongoose = require("mongoose");
// var Note = require("./models/Note.js");
// var Article = require("./models/Article.js");
// var Save = require("./models/Save.js");
var logger = require("morgan");
var cheerio = require("cheerio");
var app = express();
var PORT = process.env.PORT || 4000;


app.use(logger('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));


require("./routes/scrape.js")(app);


//--------Database config with mongoose-----------

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

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});