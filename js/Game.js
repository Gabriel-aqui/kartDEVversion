class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount()
    car1Sprite = createSprite(width / 2 - 100, height - 200)
    car1Sprite.addImage("carro1", car1)
    car1Sprite.scale = 0.05
    car2Sprite = createSprite(width / 2 + 100, height - 200)
    car2Sprite.addImage("carro2", car2)
    car2Sprite.scale = 0.05
    cars = [car1Sprite, car2Sprite]
    fuel = new Group()
    coin = new Group()
    obstacles = new Group()
    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];
    this.addSprites(fuel, 5, fuelImg, 0.02)
    this.addSprites(coin, 30, coinImg, 0.08)
    this.addSprites(obstacles, obstaclesPositions.length,obstacle1Image, 0.05, obstaclesPositions)
  }
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //Se a matriz NÃO  estiver vazia
      // adicionar as posições da matriz à x e y
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;

      } else {

        //aleatório para as metades da tela em x e y
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      }

      //criar sprite nas posições aleatórias
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);

    }
  }  
  getState() {
    var gameStateRef = database.ref("gameState")
    gameStateRef.on("value", function (data) {
      gameState = data.val()
    })
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    })
  }

  handleElements() {
    form.hide()
    form.titleImg.position(40, 45)
    form.titleImg.class("gameTitleAfterEffect")
    this.resetTitle.html("Reinicar Jogo");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Placar");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }
  play() {
    this.handleElements()
    this.handleResetButton()
    Player.getPlayerInfo()
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6)
      this.showLeaderboard()
      var index = 0
      for (var plr in allPlayers) {
        index += 1
        var x = allPlayers[plr].positionX
        var y = height - allPlayers[plr].positionY
        cars[index - 1].position.x = x
        cars[index - 1].position.y = y
        if (index === player.index) {
          stroke("#bd93f9")
          fill("#282a36")
          ellipse(x, y, 60, 60)
          camera.position.y = cars[index - 1].position.y
          this.handleFuel(index)
          this.handlePowerCoins(index)
        }
      }
      this.handlePlayerControl()
      drawSprites()
    }
  }
  handlePlayerControl() {
    if (keyDown(UP_ARROW)) {
      player.positionY += 10
      player.update()
    }
    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5
      player.update()
    }
    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5
      player.update()
    }

  }
  showLeaderboard() {
    var leader1, leader2;
    //retorna matriz de valores enumeraveis dos objetos
    var players = Object.values(allPlayers);
    //verifica se o jogador 1 está no rank 1
    if ((players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      //exibe o texto na tela por ordem de jogador
      leader1 = players[0].rank +
        "&emsp;" + players[0].name +
        "&emsp;" + players[0].score;

      leader2 = players[1].rank +
        "&emsp;" + players[1].name +
        "&emsp;" + players[1].score;
    }

    //verifica se o jogador 2 está no rank 1
    if (players[1].rank === 1) {
      leader1 = players[1].rank +
        "&emsp;" + players[1].name +
        "&emsp;" + players[1].score;

      leader2 = players[0].rank +
        "&emsp;" + players[0].name +
        "&emsp;" + players[0].score;
    }

    //passar lideres como elementos html
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }
  handleFuel(index) {
    //adicionando combustível
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();
    });

    // reduz combustível
    /*if (player.fuel > 0 && !this.playerMoving) {
      player.fuel -= 0.3;
    }

    //perde por falta combustivel
    if (player.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }*/
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function(collector, collected) {
      player.score += 1;
      player.update();
      //o sprite é coletado no grupo de colecionáveis que desencadeou
      //o evento
      collected.remove();
    });
  }
}