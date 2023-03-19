// alert("Hello");

// $("h1").text("Hello");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

//start the game
var level = 0;

$(document).keypress(function(){
    if(level == 0){
        nextSequence();
    }
});

//user chooses a button
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

//next random generated sequence
function nextSequence(){
    
    userClickedPattern=[];
    level = level+1;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.random();
    randomNumber = randomNumber*4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);

   
    // nextSequence();

}

//check the users answer
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");

        if(currentLevel+1==level){
            setTimeout(function(){nextSequence()}, 1000);
        }

    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//restart the game
function startOver(){
    level = 0;
    gamePattern=[];

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//adding animations

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


