var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;


$(document).keypress(function(e) {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence() {
  //Empties array
  userClickedPattern = [];

  //Increases Level
  level++;
  $("#level-title").text("Level " + level);

  //Chooses random color
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Flashes button
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //Plays Audio
  playSound(randomChosenColor);
}


$(".btn").click(function() {
  //Listens for Press
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  //Button animations
  playSound(userChosenColor);
  animatePress(userChosenColor);

  //Checks Answer
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(
        function() {
          nextSequence();
        }, 1000);
    }
  } else {
    console.log("wrong");

    //Plays wrong audio
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    //Flashes screen red
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    //Changes title
    $("h1").text("Game over, Press Any Key to Restart");
    //Start over
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}


function playSound(name) {
  //Plays Audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}