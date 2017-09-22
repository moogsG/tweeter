"use strict";

// Basic express setup:
require('dotenv').config();
const PORT          = 3000;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const sass          = require("node-sass");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*MongoDB
*********
*/

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

const {MongoClient} = require("mongodb");
const MONGODB_URI = process.env.MONGODB_URI;

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  /*DataHelpers
  *************
  *Sends db to datahelpers
  */
  const DataHelpers = require("./lib/data-helpers.js")(db);
  /*Tweet Routes
  **************
  *Sends /tweets to the tweet router
  *Sends dataHelpers as well.
  */
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  app.use("/tweets", tweetsRoutes);

   });

app.listen(PORT, () => {
  console.log("Tweeter app listening on port " + PORT);

});
process.on('exit', function(){
  console.log('this runs')
  db.close();
});