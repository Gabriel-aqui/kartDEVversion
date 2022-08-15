class Player {
  constructor() {
    this.name = null
    this.index = null
    this.positionX = 0
    this.positionY = 0
  }
  getCount(){
    var playerCountRef = database.ref("playerCount")
    playerCountRef.on("value", data =>{
      playerCount = data.val()
    })
  }
  updateCount(count){
    database.ref("/").update({playerCount:count})
  }
  static getPlayerInfo() {
    var playerInfoRef = database.ref("players")
    playersInfoRef.on("value", data =>{
      allPlayers = data.val()
    })
  }
  addPlayer() {
    var playerIndex = "players/player" + this.index
    if(this.index === 1) {
    this.positionX = width/2 - 100
    } else {
      this.positionX = width/2 + 100
    }
    database.ref(playerIndex).set({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY
    })
  }
  update(){
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).update({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY
    })
  }
}
