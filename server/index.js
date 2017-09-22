"use strict";

// Basic express setup:
require('dotenv').config();
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const sass          = require("node-sass");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
sass.render({
  file: '/public/styles/sass/stylesheet.scss',
  outFile: '/to/my/output.css'
}, function(err, result) { /*...*/ });


/*MongoDB
*********
*/
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
  console.log("Example app listening on port " + PORT);

});
process.on('exit', function(){
  console.log('this runs')
  db.close();
});