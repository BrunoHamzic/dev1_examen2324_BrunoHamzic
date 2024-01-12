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
	moveBasket(eventData);
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

	drawText();

	if (lives != 0) {
		frameCount++;
		requestAnimationFrame(draw);
	}
}

function drawText() {
	context.beginPath();
	context.fillStyle = "black";
	context.font = "30px Arial";
	context.fillText("Lives: " + lives, 10, 50);
	context.fillText("score: " + score, 10, 100);
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

/** Debug help:
 * 
    let speedArr = [];
    for (let i = 0; i < 100; i++) {
        speedArr.push(Math.round(Utils.randomNumber(1,5)));
    }
    console.table(speedArr);

    // Draws "points" showing where the "hit" areas are
    context.beginPath();
    context.fillStyle = "black";
    Utils.fillCircle(basketXPosition - 10, height - heightOffset, 3);                               // Left
    Utils.fillCircle(basketXPosition + basketWidth / 2, height - heightOffset, 3);                  // Middle
    Utils.fillCircle(basketXPosition + basketWidth + 10, height - heightOffset, 3);                 // Right
    Utils.fillCircle(appleX - appleSize * 1.5, appleY + appelSpeed * frameCount + appleSize, 3);    // Left
    Utils.fillCircle(appleX, appleY + appelSpeed * frameCount + appleSize, 3);                      // Middle
    Utils.fillCircle(appleX + appleSize * 1.5, appleY + appelSpeed * frameCount + appleSize, 3);    // Right

	// LEFTS
	let lefts = Utils.calculateDistance(appleHitKeyPos.leftX, appleHitKeyPos.y, basketHitKeyPos.leftX, basketHitKeyPos.y);

	// MIDDLES
	let middles = Utils.calculateDistance(appleHitKeyPos.middleX, appleHitKeyPos.y, basketHitKeyPos.middleX, basketHitKeyPos.y);

	// RIGHTS
	let rights = Utils.calculateDistance(appleHitKeyPos.leftX, appleHitKeyPos.y, basketHitKeyPos.leftX, basketHitKeyPos.y);

	// TOTAL HIT WIDTH APPLE
	let widthApple = Utils.calculateDistance(appleHitKeyPos.leftX, appleHitKeyPos.y, appleHitKeyPos.rightX, appleHitKeyPos.y);

	// TOTAL HIT WIDTH BASKET
	let widthBasket = Utils.calculateDistance(basketHitKeyPos.leftX, basketHitKeyPos.y, basketHitKeyPos.rightX, basketHitKeyPos.y);
 */
