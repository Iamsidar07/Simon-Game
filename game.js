let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let isStarted = false;
let level = 0;
$(document).keydown(function (e) {
    if (!isStarted) {
        nextSequence();
        isStarted = true;
    }
})

$(".btn").on("click", function () {
    console.log(this.id);
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(this.id);
    playSound(this.id);
    console.log(userClickedPattern)
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        console.log('wrong');
        //reset level
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 2000)
        startOver();

    }
    console.log({ gamePattern })
    console.log({ userClickedPattern })
}

function startOver() {
    level = 0;
    gamePattern = [];
    isStarted = false;
}

function nextSequence() {
    console.log("running")
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio(`sounds/${randomChosenColour}.mp3`);
    audio.play();
    level++;
    animatePress(randomChosenColour);
    $("h1").text("Level " + level);

}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}