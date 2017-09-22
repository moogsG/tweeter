"use strict";

const userHelper = require("../lib/util/user-helper");
const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {

  /*GET
  *****
  *Returns tweets as a json feed
  */
  tweetsRoutes.get("/", (req, res) => {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.json(tweets);
      }
    });
  });

  /*PUT
  *****
  * Updates DB
  * Sends to updateTweet
  */
  tweetsRoutes.put("/", (req, res) => {
    const tweet = req.body;
    DataHelpers.updateTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.status(201).send();
      }
    });
  });

  /*POST
  ******
  * Creates new tweet
  * Creates User
  */
  tweetsRoutes.post("/", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({
        error: 'invalid request: no data in POST body'
      });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      liked: '0'
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}