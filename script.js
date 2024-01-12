import context from "../../scripts/context.js";
import * as Utils from "../../scripts/utils.js";

/* Start met je naam in te vullen
// NAAM VOORNAAM
*/
let width = context.canvas.width;
let height = context.canvas.height;

let lives = 3;
let score = 0;
let gameOver = false;

//apple
let appleSize = 20;
let stemWidth = 10;
//voeg zelf extra globale variabelen toe:
//..

//basket
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


function setup() {}

function draw() {

}