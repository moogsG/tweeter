"use strict";

// Basic express setup:
const PORT = process.env.PORT || 8080;
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sassMiddleware = require('node-sass-middleware');
app.use(bodyParser.urlencoded({
  extended: true
}));

/*Sass Middleware
****************
* Compiles Sass
 */
app.use('/styles', sassMiddleware({
  src: 'public/styles/sass/',
  dest: 'public/styles',
  debug: true
}));

app.use(express.static("public"));

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
  console.log("Tweeter app listening on port " + PORT);

});

/*DB close
***********
* Closes DB on exit
*/
process.on('exit', function() {
  console.log('this runs')
  db.close();
});