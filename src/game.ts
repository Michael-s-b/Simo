let buttonColours: string[] = ["red", "blue", "green", "yellow"];

let userClickedPattern: string[] = [];

let gamePattern: string[] = [];

let gameIsStarted: boolean = false;

let actualLevel: number = 0;

let gameIsOver: boolean = false;

startGame();

//functions
function playSound(name: string): void {
	let sound: HTMLAudioElement = new Audio("sounds/" + name + ".mp3");
	sound.play();
}

function startGame(): void {
	if (gameIsStarted === false) {
		$(document).on("keydown", () => {
			$(document).off("keydown");
			$("h1").text("Level " + actualLevel);
			gameIsStarted = true;
			nextSequence();
			$(".btn").on("click", (event: JQuery.ClickEvent) => {
				let userChoosenColour: string = event.target.id;
				userClickedPattern.push(userChoosenColour);
				playSound(event.target.id);
				animatePress(event.target.id);
				checkAnswer(userClickedPattern.length - 1);
			});
		});
	}
}

function nextSequence(): void {
	userClickedPattern = [];
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour: string = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	actualLevel++;
	playSound(randomChosenColour);
	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	$("h1").text("Level " + actualLevel);
}

function gameOver(): void {
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
	//restarting game
	setTimeout(() => {
		startGame;
		$("h1").text("Press A Key to restart the game");
	}, 2000);
}

function animatePress(currentColour: string): void {
	$("#" + currentColour).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel: number): void {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		gameOver();
		return;
	}
}
