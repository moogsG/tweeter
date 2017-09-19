"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/*MongoDB
*********
*/
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

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
