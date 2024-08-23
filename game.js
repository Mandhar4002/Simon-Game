let level = 0;
let started = false;
let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];

$(document).keydown(function () {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }

})

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    let randomNumber = Math.round(3 * Math.random());
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
            nextSequence();
            }, 1200);
        }
    }
    else {
        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        console.log("Failure");

        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


