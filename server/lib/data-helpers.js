"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const ObjectID = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {


  return {

    /*Saves tweet to DB
    *******************
    * Returns newTweet or Error
    */
    saveTweet: (newTweet, callback) => {
      db.collection('tweets').insertOne(newTweet, (err, r) => {
        if (err) {
          console.log('error here')
          return callback(err);
        }
        callback(null, newTweet);
      })
    },

    /*Updates tweet
    ***************
    * Only updates liked property currently
    **/
    updateTweet: (tweet, callback) => {
      let myquery = {'_id':tweet._id};
      let newValues = {$set:{'liked': tweet.liked}};
      db.collection('tweets').update({'_id':ObjectID(tweet._id)}, newValues, (err, r) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweet);
      })
    },

    /*Gets tweets
    *************
    * Automatic sorts
    * Returns array
    */
    getTweets: (callback) => {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          console.log('error here')
          return callback(err);
        }
        callback(null, tweets);
      });
    }
  };
}