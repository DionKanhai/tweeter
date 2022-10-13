/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/* purpose of this function is to prevent users from entering malicious javascript on webpage */
// function that takes in a string as a parameter and returns a string
const escapeMalicious = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// this function takes an object as a tweet paramter and returns a tweet <article> element
const createTweetElement = function (tweet) {
  const $tweet = $(`
    <article class="article-tweet">
    <header class="username-and-tweeterAt">
      <span class="image-username">
        <img class="image-for-user" src=${tweet.user.avatars}>
        <text>${tweet.user.name}</text>
      </span>
      <text>${tweet.user.handle}</text>
    </header>
    <text class="display-tweet">${escapeMalicious(tweet.content.text)}</text>
    <footer class="date-stamp-and-flag">${timeago.format(tweet.created_at)}
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  `);
  return $tweet;
};


// Function responsible for taking in an array of tweet objects 
// and then appending each one to the #tweets-container
const renderTweets = function (tweets) {
  //loops through the tweets objects
  tweets.forEach(tweet => {
    //calls createTweetElement on each tweet object
    const tweetObj = createTweetElement(tweet);
    //add the returned value to the end of the selected element using its ID
    $('#tweets-container').prepend(tweetObj);
  });
};


// allow document to load before content
$(document).ready(function () {

  //function that is responsible for fetching tweets
  // from http://localhost:8080/tweets page
  const loadTweets = function () {
    $.ajax({
      datatype: "json",
      type: "GET",
      url: "http://localhost:8080/tweets",
      success: (data) => {
        $("#tweet-text").val('');
        //reset the counter value to 140 after a tweet submission
        $(".counter").val(140);
        //empty any previous tweets in the tweets container before renderings the tweets
        $("#tweets-container").empty();
        // pass the JSON data (tweets) to renderTweets function
        renderTweets(data);
      }
    });
  };

  // search for tweet button that is linked to submit event
  const formForTweet = $("#form-for-button");
  // add an event listener to the form on submit
  formForTweet.submit(function (event) {

    //prevent the normal page refresh on submit behaviour
    event.preventDefault();
    // serialize the form data to query string
    const serializedData = $("#form-for-button").serialize();

    const textArea = $("#tweet-text").val();
    // validation for user input
    if (textArea.length > 140 || textArea.length <= 0) {
      $(".error-message").slideDown(500);
      return;
    }
    $(".error-message").slideUp(500);

    // pass the serialized data to the specific post route
    // ajax post that sends the form data to the server
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: serializedData,
      success: () => {
        loadTweets()
      }
    });
  })
  loadTweets();
});









