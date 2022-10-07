/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// this function takes an object as a tweet paramter and returns a tweet <article> element
const createTweetElement = function (tweet) {
  let $tweet = $(`
    <article class="article-tweet">
    <header class="username-and-tweeterAt">
      <span class="image-username">
        <img class="image-for-user" src=${tweet.user.avatars}>
        <text>${tweet.user.name}</text>
      </span>
      <text>${tweet.user.handle}</text>
    </header>
    <text class="display-tweet">${tweet.content.text}</text>
    <footer class="date-stamp-and-flag">${tweet.created_at}
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

// STEP 2

// Function responsible for taking in an array of tweet objects 
// and then appending each one to the #tweets-container
const renderTweets = function (tweets) {
  //loops through the tweets objects
  tweets.forEach(tweet => {
    //calls createTweetElement on each tweet object
    const tweetObj = createTweetElement(tweet);
    //add the returned value to the end of the selected element using its ID
    $('#tweets-container').append(tweetObj);
  });
};

//make sure page loads before content, then call function
$(document).ready(function () {
  renderTweets(data);
});












