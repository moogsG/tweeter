/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {


  /*Creates tweet
   **************
   *Returns array of HTML
   *
   *
   */
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
  /**/
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

  $('#addTweet').on('click', function() {
    $('#new').slideToggle();
    $('textarea').select()
  })
});