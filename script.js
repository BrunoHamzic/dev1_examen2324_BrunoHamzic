import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

/* Start met je naam in te vullen
// HAMZIC BRUNO
*/
let width = context.canvas.width;
let height = context.canvas.height;

let lives = 3;
let score = 0;
let gameOver = false;
let frameCount = 0;

// Apple
let appleSize = 20;
let stemWidth = 10;
let appleX = Utils.randomNumber(appleSize, width - appleSize);
let appleY = 100;
let appelSpeed = Math.round(Utils.randomNumber(2, 5));

// Basket
let basketWidth = 100;
let basketHeight = 75;
let heightOffset = 150;
let basketXPosition = width / 2;

// Extra variabelen voor stap 10
/*
let amountOfApples = 1;
let applesX = [];
let applesY = [];
let applesSize = [];
*/

setup();
draw();

window.onkeydown = function (eventData) {
    if (eventData.key == "Enter") {
        resetGame();
    } else {
        moveBasket(eventData);
    }
};

function setup() {}

function draw() {
	context.clearRect(0, 0, width, height);

	// Background
	context.beginPath();
	context.fillStyle = "lightblue";
	context.fillRect(0, 0, width, height);
	context.closePath();

	drawApple(appleX, appleY + appelSpeed * frameCount);
	drawBasket(basketXPosition);

	let appleHitKeyPos = {
		leftX: appleX - appleSize * 1.5,
		middleX: appleX,
		rightX: appleX + appleSize * 1.5,
		y: appleY + appelSpeed * frameCount + appleSize,
	};
	let basketHitKeyPos = {
		leftX: basketXPosition - 10,
		middleX: basketXPosition + basketWidth / 2,
		rightX: basketXPosition + basketWidth + 10,
		y: height - heightOffset,
	};

	if (
		((appleHitKeyPos.leftX <= basketHitKeyPos.rightX && appleHitKeyPos.leftX >= basketHitKeyPos.leftX) || (appleHitKeyPos.rightX >= basketHitKeyPos.leftX && appleHitKeyPos.rightX <= basketHitKeyPos.rightX)) &&
		appleHitKeyPos.y == basketHitKeyPos.y
	) {
		console.log("Caught");
		score++;
		frameCount = 0;
		resetApple();
	} else if (appleHitKeyPos.y >= height - basketHeight) {
		console.log("Hit");
		lives--;
		frameCount = 0;
		resetApple();
	}

	if (lives != 0) {
		drawText();
		frameCount++;
		requestAnimationFrame(draw);
	} else {
		gameOver = true;
		drawText("GAME OVER");
	}
}

function drawText(gameEndText) {
	context.beginPath();
	context.fillStyle = "black";
	context.font = "30px Arial";
	context.fillText("Lives: " + lives, 10, 50);
	context.fillText("score: " + score, 10, 100);
	if (gameEndText == "GAME OVER") {
		context.fillStyle = "Red";
		context.font = "50px Arial";
		context.fillText(gameEndText, width / 2 - 100, height / 2);
	}
}

function drawApple(x, y) {
	context.beginPath();

	context.lineWidth = stemWidth;
	context.strokeStyle = "green";
	Utils.drawLine(x, y, x, y - 30);

	context.fillStyle = "red";
	Utils.fillCircle(x - 10, y, appleSize);
	Utils.fillCircle(x + 10, y, appleSize);

	context.closePath();
}

function resetApple() {
	appleX = Utils.randomNumber(appleSize, width - appleSize);
	appleY = 100;
	appelSpeed = Math.round(Utils.randomNumber(2, 5));
}

function drawBasket(x) {
	context.beginPath();

	// The "box"
	context.fillStyle = "orange";
	context.fillRect(x, height - heightOffset, basketWidth, basketHeight);

	// The "lid"
	context.fillStyle = "darkorange";
	context.fillRect(x - 10, height - heightOffset, basketWidth + 20, basketHeight / 5);

	context.closePath();
}

function moveBasket(eventData) {
	switch (eventData.key) {
		case "ArrowLeft":
			basketXPosition -= 30;
			break;
		case "ArrowRight":
			basketXPosition += 30;
			break;
	}
}

function resetGame() {
    lives = 3;
    score = 0;
    gameOver = false;
    frameCount = 0;
    basketXPosition = width / 2;
    resetApple();
}