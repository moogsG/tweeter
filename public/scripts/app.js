/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  /*$header = $("<header>")
          .append($("<img>").addClass("user-avatar").attr("src", tweetData.user.avatars.small))
          .append($("<h2>").addClass("user-name").text(tweetData.user.name))
          .append($("<small>").addClass("user-handle").text(tweetData.user.handle))*/

  /*Creates tweet
   **************
   *Returns array of HTML
   *Did a few ways, started with clone and a template
   *because I am very lazy
   *
   *Then did array because it was easy
   *
   *Then was told to show that I can do it in jquery.
   *
   */
  function createTweetElement(user) {
    var $tweet = $('<article>').attr('data-id', user._id).addClass('tweet')
    var $header = $('<header>').addClass('group')
      .append($('<img>').attr('src', user.user.avatars.small))
      .append($('<h2>').text(user.user.name))
      .append($('<span>').attr('id', 'handle').text(user.user.handle))
    var $body = $('<p>').text(user.content.text)
    var $footer = $('<footer>').append($('<p>').text(user.created_at))
      .append($('<a>').addClass('fa fa-flag'))
      .append($('<a>').addClass('fa fa-retweet'))
      .append($('<a>').attr('id', 'like').attr('data-liked', user.liked).addClass('fa fa-heart'))

    $tweet = $tweet.append($header).append($body).append($footer)
    if ($('#like').attr('data-liked') === 'true') {
      $('#like').addClass('like');
    }

    /* var $tweet = $([
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
     $tweet.find('#date').text(user.created_at);*/
    return $tweet;

  }

  loadTweets(false);
  /*Renders tweets on page
   ****************
   * Takes database
   * appends data to page
   */
  function renderTweets(users) {
    var $newTweet;
    for (var user in users) {
      //alert(users);
      $newTweet = createTweetElement(users[user]);
      $('.tweet-content').prepend($newTweet);
    }
  }

  /*Loads DB
   **********
   *Takes check, checks if new tweet or old
   * Adds single tweet to page
   * ||
   * Passes full DB to renderTweets
   */
  function loadTweets(check) {
    var url = "/tweets";
    var feed = $.get(url, function(data) {
      if (check) {
        var lastElement = data[data.length - 1];
        let tweet = createTweetElement(lastElement)
        $('.tweet-content').prepend(tweet.slideDown());
        return;
      } else {
        renderTweets(data);
      }
    });
  }
  /*AJAX Request for New Tweets
   ****************
   *Returns loadTweets with true
   *
   */
  $(function() {
    var result = [];
    var $button = $('#submit');
    $button.on('click', function() {
      event.preventDefault();
      if (!$('textarea').val() || $('textarea').val().length > 140) {
        alert('Write something to tweet!');
        return;
      } else {
        $.ajax({
          url: 'tweets/',
          method: 'post',
          data: $(".tweet").serialize(),
          success: function(data) {
            loadTweets(true);
          }
        });
      }
    });
  });

  $('div').on('click', '#like', function() {
    event.preventDefault();
    $(this).attr("data-liked", function(i, val) {
      //console.log(this)
      $(this).addClass('like');
      if (val === 'true') {
        $(this).removeClass('like');
        return 'false';
      } else if (val === 'false') {
        $(this).addClass('like');
        return 'true';
      }
    })

    const data = {
      '_id': $(this).closest("[data-id").attr('data-id'),
      'liked': $(this).attr('data-liked')
    }

    $.ajax({
      url: 'tweets/',
      method: 'PUT',
      data: data,
      success: function(data) {
      }
    });
    // do something with the results of the AJAX call

    //$.put('tweets/', data);

  });
  /*Add Tweet
   ***********
   *Slides down form
   */
  $('#addTweet').on('click', function() {
    $('#new').slideToggle();
    $('textarea').select()
  })


});