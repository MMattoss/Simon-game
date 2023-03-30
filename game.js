
var buttonColors = ["green", "red", "blue", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 1;
var start = false;



$(document).keydown(function keypress()	{
	if (start == false) {
		nextSequence();
		start = true;
		console.log("working");
	}
})




$(".btn").click(
	function() {
		var userChosenColor = this.id;
		userPattern.push(userChosenColor);

		animation(userChosenColor);
		playSound(userChosenColor);
		checkAnswer(userPattern.length-1);
	}
)


function checkAnswer(currentLevel) {

	if (gamePattern[currentLevel] === userPattern[currentLevel]) {

		console.log("Success");

		if (gamePattern.length === userPattern.length ) {

			setTimeout(function() {
				nextSequence();
			}, 1000)
		}
	}

	else{

		console.log("wrong");
		$("#level-title").text("Game over, press any key to play again");

		gameOverSound();
		gameOver();
		gameOver();
		restart();
	}
}

function nextSequence() {
	userPattern = [];

	var randomNumber = Math.floor( (Math.random() * 4) );
	var chosenButton = buttonColors[randomNumber];
	gamePattern.push( chosenButton );

	$("#level-title").text("Level " + level);
	level++;
	$("#" + chosenButton).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(chosenButton);
}


function animation(name) {
	$("#"+ name).addClass("pressed");
	setTimeout(function () {
		$("#"+ name).removeClass("pressed");
	}, 100);	
}

function playSound(sound){
	var audio = new Audio("sounds/" + sound + ".mp3");
	audio.play();
}


function gameOver() {
	$("body").addClass("game-over");
	setTimeout(function(){
		$("body").removeClass("game-over");
	},200);
}

function gameOverSound(){
	var sound = new Audio("sounds/wrong.mp3");
	sound.play();
}

function restart() {
	start = false;
	gamePattern = [];
	level = 1;
}