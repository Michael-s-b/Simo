"use strict";
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let gameIsStarted = false;
let actualLevel = 0;
let gameIsOver = false;
startGame();
function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}
function startGame() {
    if (gameIsStarted === false) {
        $(document).on("keydown", () => {
            $(document).off("keydown");
            $("h1").text("Level " + actualLevel);
            gameIsStarted = true;
            nextSequence();
            $(".btn").on("click", (event) => {
                let userChoosenColour = event.target.id;
                userClickedPattern.push(userChoosenColour);
                playSound(event.target.id);
                animatePress(event.target.id);
                checkAnswer(userClickedPattern.length - 1);
            });
        });
    }
}
function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    actualLevel++;
    playSound(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    $("h1").text("Level " + actualLevel);
}
function gameOver() {
    gameIsOver = true;
    actualLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameIsStarted = false;
    $("h1").text("GameOver!");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 2000);
    $(".btn").off("click");
    $("h1").text("Game Over!");
    setTimeout(() => {
        startGame;
        $("h1").text("Press A Key to restart the game");
    }, 2000);
}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        gameOver();
        return;
    }
}
