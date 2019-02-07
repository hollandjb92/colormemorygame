//empty pattern to keep track of colors
var gamePattern = [];
var userClickedPattern = [];
//button colors as an array
var buttonColors = ["red", "blue", "green", "yellow"];

var gameStart = false;

//initialize level and only start the game on the first key press
var level = 0;
$(document).keydown(function() {
  if (!gameStart) {
    //change title
    $("h1").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

function nextSequence() {
  //empty user array for the next level
  userClickedPattern = [];
  //choose a random number between 0-3 and assign it to one of the buttonColors
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  //add color to the end of the gamePattern array
  gamePattern.push(randomChosenColor);
  //make button flash
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  //increase level and update the H1 everytime sequence is called
  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //play sound and animate button user clicks on
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //pass current level into check answer function
  checkAnswer(userClickedPattern.length - 1);
});

//play sound when user clicks on button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//add and remove pressed class to buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

//checking user's answer
function checkAnswer(currentLevel) {
  //check to make sure user has same pattern as game
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //check to make sure user has same length of pattern as game
    if (userClickedPattern.length === gamePattern.length) {
      //start the next sequence after delay
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } // what to do if the user is incorrect
    else {
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over! Press Any Key to Restart");

      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
