/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {
  //$(document).ready(function() {

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
  let createTweetElement = (user) => {
    let $tweet = $('<article>').attr('data-id', user._id).addClass('tweet')
    let $header = $('<header>').addClass('group')
      .append($('<img>').attr('src', user.user.avatars.small))
      .append($('<h2>').text(user.user.name))
      .append($('<span>').attr('id', 'handle').text(user.user.handle))
    let $body = $('<p>').text(user.content.text)
    let $footer = $('<footer>').append($('<p>').text(moment(user.created_at).fromNow()))
      .append($('<a>').addClass('fa fa-flag fa-tweet'))
      .append($('<a>').addClass('fa fa-retweet fa-tweet'))
      .append($('<a>').attr('id', 'like').attr('data-liked', user.liked).addClass('fa fa-heart fa-tweet'))

    $tweet = $tweet.append($header).append($body).append($footer)

    /*Like Function
     ***************
     *On click will add/remove data-liked attr
     *Returns data, sends to ajax request
     *
     */

    $tweet.on('click', '#like', function(event) {
      event.preventDefault();
      if ($(this).attr("data-liked") === 'true') {
        $(this).removeClass('like');
        $(this).attr("data-liked", 'false');
      } else {
        $(this).addClass('like');
        $(this).attr("data-liked", 'true');
      };

      const data = {
        '_id': $tweet.attr('data-id'),
        'liked': $(this).attr('data-liked')
      }
      $.ajax({
        url: 'tweets/',
        method: 'PUT',
        data: data
      });
    });

    return $tweet;
  }

  /*Renders tweets on page
   ****************
   * Takes database
   * appends data to page
   */
  let renderTweets = (users) => {
    let $newTweet;
    for (let user in users) {
      //alert(users);
      $newTweet = createTweetElement(users[user]);
      $('.tweet-content').prepend($newTweet);
      if ($('#like').attr('data-liked') === 'true') {
        $('#like').addClass('like');
      }
    }
  }

  /*Loads DB
   **********
   *Takes check, checks if new tweet or old
   * Adds single tweet to page
   * ||
   * Passes full DB to renderTweets
   */
  let loadTweets = (check) => {
    $.get("/tweets", (data) => {
      if (check) {
        let lastElement = data[data.length - 1];
        let tweet = createTweetElement(lastElement)
        $('.tweet-content').prepend(tweet.slideDown());
      } else {
        renderTweets(data);
      }
    });
  }

  /*Adds tweets on page load
   **************************
   *Passes false to load all tweets
   */
  loadTweets(false);
  /*AJAX Request for New Tweets
   ****************
   *Returns loadTweets with true
   *
   */

$('#submit').on('click', (event) => {
  event.preventDefault();
  if (!$('textarea').val() || $('textarea').val().length > 140) {
    alert('Write something to tweet!');
  } else {
    $.ajax({
      url: 'tweets/',
      method: 'POST',
      data: $("form").serialize(),
      success: (data) => {
        loadTweets(true);
        $('textarea').val("");
      }
    });
  }
});




  /*Add Tweet
   ***********
   *Slides down form
   */
  $('#addTweet').on('click', () => {
    $('#new').slideToggle();
    $('textarea').select()
  })

});