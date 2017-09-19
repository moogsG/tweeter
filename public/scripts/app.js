/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function createTweetElement(user) {
    var $tweet = $([
      '<div class="tweets">',
      '<article class="tweet">',
      '<header class="group">',
      '<img id="avatar" src=""></img>',
      '<h2 id="name"></h2>',
      '<span id="handle"></span>',
      '</header>',
      '<p id="message"></p>',
      '<footer>',
      '<p id="date"></p>',
      '<a href="#" class="fa fa-flag"></a>',
      '<a href="#" class="fa fa-retweet"></a>',
      '<a href="#" class="fa fa-heart"></a>',
      '</footer>',
      '</article>',
      '</div>'
    ].join("\n"));
    $tweet.find('#name').text(user.user.name);
    $tweet.find('#avatar').attr("src", user.user.avatars.small);
    $tweet.find('#handle').text(user.user.handle);
    $tweet.find('#message').text(user.content.text);
    $tweet.find('#date').text(user.created_at);
    return $tweet;
  }



  var data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }, {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }, {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }];
  getData(false);
  function renderTweets(users) {
    var $newTweet;
    for (var user in users) {
      //alert(users);
      $newTweet = createTweetElement(users[user]);
      $('.tweet-content').append($newTweet);
    }
  }


  function getData(check) {
    var url = "/tweets";
    var feed = $.get(url, function (data) {
      if(check){
      var lastElement = data[data.length-1];
      $('.tweet-content').prepend(createTweetElement(lastElement));
      return;
    } else {
      renderTweets(data);
    }
    });
  }

  $(function() {
    var result = [];
    var $button = $('#submit');
    $button.on('click', function() {
      event.preventDefault();
      $.ajax({
        url: 'tweets/',
        method: 'post',
        data: $(".tweet").serialize(),
        success: function(data) {
        getData(true);
        }
      });
    });
  });
});