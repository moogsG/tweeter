"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const ObjectID = require('mongodb').ObjectID;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {


  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet, function(err, r) {
        if (err) {
          console.log('error here')
          return callback(err);
        }
        callback(null, newTweet);
      })
    },

    updateTweet: function(tweet, callback) {
      let myquery = {'_id':tweet._id};
      let newValues = {$set:{'liked': tweet.liked}};
      db.collection('tweets').update({'_id':ObjectID(tweet._id)}, newValues, function(err, r) {
        if (err) {
          return callback(err);
        }
        callback(null, tweet);
      })
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
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