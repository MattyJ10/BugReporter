var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require('mongoose'); 
var path = require('path');
var cors = require('cors'); 
var ObjectID = mongodb.ObjectID;


var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());
app.use(cors()); 
app.use(express.static(__dirname + '/dist/Coen174Frontend'));
require('./api/routes/routes')(app, express); 

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var mongoDB = 'mongodb://127.0.0.1/Coen174'; 
mongoose.connect(process.env.MONGODB_URI || mongoDB); 
mongoose.Promise = global.Promise; 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error'));
app.route('/*', function(req,res) {
  res.redirect(__dirname + '/dist/Coen174Frontend/index.html')
}) 

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 5200, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

