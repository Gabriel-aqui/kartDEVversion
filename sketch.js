var canvas;
var backgroundImage;
var bgImg;
var database, gameState;
var form, player;
var playerCount;
var allPlayers, car1, car1Sprite, car2, car2Sprite;
var track
var cars = []

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1 = loadImage("assets/car1.png")
  car2 = loadImage("assets/car2.png")
  track = loadImage("assets/PISTA.png")
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState()
  game.start();
  
}


function draw() {
  background(backgroundImage);
  if(playerCount===2){
    game.update(1)
  }
  if(gameState===1){
    game.play()
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}
