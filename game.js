
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Prvni spusteni
var started = false;
$(document).keypress(function(){
    if (!started){
        $("h1").text("Level "+ level);
        nextSequence();
        started = true;
    }
    
})


// Uzivatel klikne na tlacitko 
$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})


// Samotna hra
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succes");

        if (userClickedPattern.length === gamePattern.length){
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass('game-over');
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        started = false;
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
    }
}


// Pocitac klika random 
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("h1").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
    
    playSound(randomChosenColour);
    
}



// Audio
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// Animace pri stisknuti tlacitka uzivatelem
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}









