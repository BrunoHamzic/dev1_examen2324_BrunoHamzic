import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

// HAMZIC BRUNO

let width = context.canvas.width;
let height = context.canvas.height;

let lives = 3;
let score = 0;
let gameOver = false;
let frameCount = 0;

// Apples
let apples = [];
let amountOfApples = 1;
let appleSize = 20;
let stemWidth = 10;

// Basket
let basketWidth = 100;
let basketHeight = 75;
let heightOffset = 150;
let basketXPosition = width / 2;

let basketHitboxPos = {
	leftX: basketXPosition - 10,
	middleX: basketXPosition + basketWidth / 2,
	rightX: basketXPosition + basketWidth + 10,
	hitY: height - heightOffset,
};

setup();
draw();

window.onkeydown = function (eventData) {
	if (eventData.key == "Enter") {
		resetGame();
	} else {
		moveBasket(eventData);
	}
};

function setup() {
	// Initial apple list
	for (let i = 0; i < amountOfApples; i++) {
		let apple = {
			x: Utils.randomNumber(appleSize, width - appleSize),
			y: 100,
			speed: Math.round(Utils.randomNumber(2, 5)),
			iterator: 0,
		};

		apple.appleHitboxPos = {
			leftX: apple.x - appleSize * 1.5,
			middleX: apple.x,
			rightX: apple.x + appleSize * 1.5,
			hitY: apple.y + apple.speed * 0 + appleSize,
		};
		apples.push(apple);
	}
}

function draw() {
	context.clearRect(0, 0, width, height);

	// Background
	context.beginPath();
	context.fillStyle = "lightblue";
	context.fillRect(0, 0, width, height);
	context.closePath();

	drawApple();
	drawBasket(basketXPosition);

	apples.forEach((apple) => {
		if (
			((apple.appleHitboxPos.leftX <= basketHitboxPos.rightX && apple.appleHitboxPos.leftX >= basketHitboxPos.leftX) ||
			(apple.appleHitboxPos.rightX >= basketHitboxPos.leftX && apple.appleHitboxPos.rightX <= basketHitboxPos.rightX)) &&
			(apple.appleHitboxPos.hitY <= basketHitboxPos.hitY + 1 && apple.appleHitboxPos.hitY >= basketHitboxPos.hitY - 1)
		) {
			console.log("Caught");
			score++;
			(score % 5) ? null : lives++;

			resetApple(apple);
			amountOfApples++;
			createApple();
		} else if (apple.appleHitboxPos.hitY >= height - basketHeight) {
			console.log("Dropped");
			lives--;

			resetApple(apple);
			amountOfApples++;
			createApple();
		}
		apple.appleHitboxPos.hitY = apple.y + apple.speed * apple.iterator + appleSize;
	});

	if (lives != 0) {
		drawText();
		frameCount++;
		requestAnimationFrame(draw);
	} else {
		gameOver = true;
		drawText("GAME OVER");
	}
}

function createApple() {
	let apple = {
		x: Utils.randomNumber(appleSize, width - appleSize),
		y: 100,
		speed: Math.round(Utils.randomNumber(2, 5)),
		iterator: 0,
	};

	apple.appleHitboxPos = {
		leftX: apple.x - appleSize * 1.5,
		middleX: apple.x,
		rightX: apple.x + appleSize * 1.5,
		hitY: apple.y + apple.speed * 0 + appleSize,
	};

	apples.push(apple);
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

function drawApple() {
	apples.forEach((apple) => {
		context.beginPath();

		context.lineWidth = stemWidth;
		context.strokeStyle = "green";
		apple.iterator++;
		Utils.drawLine(apple.x, apple.y + apple.speed * apple.iterator, apple.x, apple.y + apple.speed * apple.iterator - 30);

		context.fillStyle = "red";
		Utils.fillCircle(apple.x - 10, apple.y + apple.speed * apple.iterator, appleSize);
		Utils.fillCircle(apple.x + 10, apple.y + apple.speed * apple.iterator, appleSize);

		context.closePath();
	});
}

function resetApple(givenApple) {
	givenApple.x = Utils.randomNumber(appleSize, width - appleSize);
	givenApple.y = 100;
	givenApple.speed = Math.round(Utils.randomNumber(2, 5));
	givenApple.iterator = 0;

	givenApple.appleHitboxPos = {
		leftX: givenApple.x - appleSize * 1.5,
		middleX: givenApple.x,
		rightX: givenApple.x + appleSize * 1.5,
		hitY: givenApple.y + givenApple.speed * 0 + appleSize,
	};
}

function drawBasket(x) {
	basketHitboxPos = {
		leftX: basketXPosition - 10,
		middleX: basketXPosition + basketWidth / 2,
		rightX: basketXPosition + basketWidth + 10,
		hitY: height - heightOffset,
	};

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
	location.reload();
}