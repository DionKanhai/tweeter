$(document).ready(function() {

  //this refers to the textarea input
  $("#tweet-text").on('input', function() {
    // counts the individual num of chars entered in textarea
    let charLength = $(this).val().length
    // grab the counter using the textarea position in the DOM
  const counter = $(this).next().children()[1];
  //set value of counter
  counter.innerHTML = 140 - charLength;
  // apply red color if value in textarea exceeds 140 limit
  if (140 - charLength < 0) {
    $("output").addClass("when-negative");
  }
  else {
    $("output").removeClass("when-negative");
  }
  });
});