var canvas;
var backgroundImage;
var bgImg;
var database, gameState;
var form, player;
var playerCount;
var allPlayers, car1, car1Sprite, car2, car2Sprite;
var track
var cars = []
var obstacle1Image, obstacle2Image
var obstacles
var fuel, fuelImg
var coin, coinImg
var lifeImage
var blast

function preload() {
  backgroundImage = loadImage("assets/planodefundo.png");
  car1 = loadImage("assets/car1.png")
  car2 = loadImage("assets/car2.png")
  track = loadImage("assets/PISTA.png")
  obstacle1Image = loadImage("assets/obstacle1.png")
  obstacle2Image = loadImage("assets/obstacle2.png")
  fuelImg = loadImage("assets/fuel.png")
  coinImg = loadImage("assets/goldCoin.png")
  lifeImage = loadImage("assets/life.png")
  blast = loadImage("assets/blast.png")
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
  if(gameState === 2) {
     game.showLeaderBoard()
     game.end()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}
