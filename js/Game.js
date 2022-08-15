class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount()
    car1Sprite = createSprite(width/2 -100, height - 100)
    car1Sprite.addImage("carro1", car1)
    car1Sprite.scale = 0.05
    car2Sprite = createSprite(width/2 +100, height - 100)
    car2Sprite.addImage("carro2", car2)
    car2Sprite.scale = 0.05
    cars = [car1Sprite, car2Sprite]
  }
  getState(){
    var gameStateRef = database.ref("gameState")
    gameStateRef.on("value", function(data){
      gameState = data.val()
    })
  }
  update(state){
    database.ref("/").update({gameState:state})
  }

  handleElements(){
    form.hide()
    form.titleImg.position(40, 45)
    form.titleImg.class("gameTitleAfterEffect")
  }
  play() {
    this.handleElements()
    Player.getPlayerInfo()
    if (allPlayers !== undefined) {
    image(track, 0, -height * 5, width, height * 6)
    var index = 0
    for(var plr in allPlayers){
      index += 1
      var x = allPlayers[plr].positionX
      var y = height - allPlayers[plr].positionY
      cars[index - 1].position.x = x
      cars[index - 1].position.y = y
      if(index === player.index) {
        stroke("#bd93f9")
        fill("#282a36")
        ellipse(x, y, 60, 60)
      }
    }
    this.handlePlayerControl()
    drawSprites()
    }
  }
  handlePlayerControl(){
    if(keyDown(UP_ARROW)) {
      player.positionY += 10
      player.update() 
    }
  }
}
