let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// Main Game Class #########################################################################
window.Game = class {
  constructor() {
    this.map = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        [2, 2, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 2, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setScene(MenuScene);
    this.initInput();
    this.start();
  }
  initInput() {
    // save keys state
    this.keys = {};
    document.addEventListener('keydown', e => { this.keys[e.which] = true; this.lastKeyDown = e.which });
    document.addEventListener('keyup', e => { this.keys[e.which] = false; this.lastKeyUp = e.which });
  }
  checkKeyPress(keyCode) {
    // handle key press + release
    let isKeyPressed = !!this.keys[keyCode];
    this.lastKeyState = this.lastKeyState || {};

    // disallow key event from previous scene
    if (typeof this.lastKeyState[keyCode] === 'undefined') {
      this.lastKeyState[keyCode] = isKeyPressed;
      return false;
    }

    // allow press only when state was changed
    if (this.lastKeyState[keyCode] !== isKeyPressed) {
      this.lastKeyState[keyCode] = isKeyPressed;
      return isKeyPressed;
    } else {
      return false;
    }
  }
  setScene(Scene) {
    this.activeScene = new Scene(this);
  }
  update(dt) {
    this.activeScene.update(dt);
  }
  render(dt, game) {
    this.ctx.save();
    this.activeScene.render(dt, this.ctx, this.canvas);
    this.ctx.restore();
  }
  start() {
    let last = performance.now(),
        dt = 0,
        step = 1 / 30,
        now;

    let frame = () => {
      now = performance.now();
      dt = dt + (now - last) / 1000;
      while(dt > step) {
        dt = dt - step;
        this.update(step);
      }
      last = now;

      this.render(dt);
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }
}

// Menu scene
window.MenuScene = class {
  constructor(game) {
    // set default values
    this.game = game;
    this.opacityDirection = 1;
    this.menuActiveOpacity = 0;
    this.menuIndex = 0;
    this.menuTitle = 'Game Menu';
    this.menuItems = [
      'Start',
      'About project',
      'Exit'
    ];
  }
  update(dt) {
    // calculate active menu item opacity
    let opacityValue = this.menuActiveOpacity + dt * this.opacityDirection;
    if (opacityValue > 1 || opacityValue < 0) this.opacityDirection *= -1;
    this.menuActiveOpacity += dt * this.opacityDirection;

    // menu navigation
    if (this.game.checkKeyPress(83)) { // DOWN arrow
      this.menuIndex++;
      this.menuIndex %= this.menuItems.length;
    } else if (this.game.checkKeyPress(87)) { // UP arrow
      this.menuIndex--;
      if (this.menuIndex < 0) this.menuIndex = this.menuItems.length -1;
    }

    // menu item selected
    if (this.game.checkKeyPress(13)) {
      switch (this.menuIndex) {
        case 0: this.game.setScene(GameScene); break;
        case 1: this.game.setScene(IntroScene); break;
        case 2: this.game.setScene(ExitScene); break;
      }
    }
  }
  render(dt, ctx, canvas) {
    // fill menu background
    ctx.fillStyle = '#212121';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw menu title
    ctx.font = '60px Helvetica';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#80DEEA';
    ctx.fillText(this.menuTitle, (canvas.width - ctx.measureText(this.menuTitle).width) / 2, 20);

    // draw menu items
    const itemHeight = 50, fontSize = 30;
    ctx.font = fontSize + 'px Helvetica';
    for (const [index, item] of this.menuItems.entries()) {
      if (index === this.menuIndex) {
        ctx.globalAlpha = this.menuActiveOpacity;
        ctx.fillStyle = '#089cd3';
        ctx.fillRect(0, canvas.height / 2 + index * itemHeight, canvas.width, itemHeight);
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff';
      ctx.fillText(item, (canvas.width - ctx.measureText(item).width) / 2, canvas.height / 2 + index * itemHeight + (itemHeight - fontSize) / 2);
    }
  }
}

// Exit scene
window.ExitScene = class {
  update(dt) {
    // nothing to do here
  }
  render(dt, ctx, canvas) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // display "game over" text
    const gameOverText = 'Game Over';
    ctx.textBaseline = 'top';
    ctx.font = '100px Helvetica';
    ctx.fillStyle = '#ee4024';
    ctx.fillText(gameOverText, (canvas.width - ctx.measureText(gameOverText).width) / 2, canvas.height / 2 - 50);
  }
}

// Intro scene
window.IntroScene = class {
  constructor(game) {
    this.logoRevealTime = 2;
    this.textTypingTime = 2;
    this.sceneDisplayTime = 6;

    this.elapsedTime = 0;
    this.bigText = 'game of the year';
    this.infoText = 'but in 1990...=)';
    this.game = game;
  }
  update(dt) {
    this.elapsedTime += dt;

    // switch to next scene (by timer or if user want to skip it)
    if (this.elapsedTime >= this.sceneDisplayTime || this.game.checkKeyPress(13)) {
      this.game.setScene(MenuScene);
    }
  }
  render(dt, ctx, canvas) {
    // fill background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw big logo text
    ctx.globalAlpha = Math.min(1, this.elapsedTime / this.logoRevealTime);
    ctx.font = '80px Helvetica';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.bigText, (canvas.width - ctx.measureText(this.bigText).width) / 2, canvas.height / 2);

    // draw typing text
    if (this.elapsedTime >= this.logoRevealTime) {
      let textProgress = Math.min(1, (this.elapsedTime - this.logoRevealTime) / this.textTypingTime);
      ctx.font = '20px Helvetica';
      ctx.fillStyle = '#bbb';
      ctx.fillText(this.infoText.substr(0, Math.floor(this.infoText.length * textProgress)), (canvas.width - ctx.measureText(this.infoText).width) / 2, canvas.height / 2 + 80);
    }
  }
}

// Main game scene
window.GameScene = class {
  constructor(game) {
    this.game = game;
    this.gameMap();
    //
    this.posX = this.cellSize + 4.5 * this.cellSize; // Don't use pixels in game logic! This is only for example
    this.posY = this.cellSize + 12 * this.cellSize;
    this.ballX = 0;
    this.ballY = 0;

    //
    this.posX2 = this.cellSize + 7.5 * this.cellSize; // Don't use pixels in game logic! This is only for example
    this.posY2 = this.cellSize + 12 * this.cellSize;
    this.ballX2 = 0;
    this.ballY2 = 0;
  }
  update(dt) {
    // listener for first player
    let n = 5;
    if (this.game.keys['87']) { this.moveTop( n, this.player ); } // W
    if (this.game.keys['83']) { this.moveBottom( n, this.player ); } // S
    if (this.game.keys['65']) { this.moveLeft( n, this.player ); } // A
    if (this.game.keys['68']) { this.moveRight( n, this.player ); } // D
    if (this.game.keys['71']) { this.initFire( this.player ) } // fire SPACE

    // listener for second player
    if (this.game.keys['38']) { this.moveTop( n, this.player2 ); } // UP
    if (this.game.keys['40']) { this.moveBottom( n, this.player2 ); } // DOWN
    if (this.game.keys['37']) { this.moveLeft( n, this.player2 ); } // LEFT
    if (this.game.keys['39']) { this.moveRight( n, this.player2 ); } // D
    if (this.game.keys['76']) { this.initFire( this.player2 ) } // fire 0
    // go to menu scene
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu
  }

  render(dt, game, kode, n) {
    // draw map
    this.gameMap();

    // draw emblem
    var img=document.getElementById("emblem");
    ctx.drawImage(img,this.cellSize + 6 * this.cellSize, this.cellSize + 12 * this.cellSize, this.cellSize, this.cellSize );

    // draw player
    this.player =  new Player(this);

    // drew second player
    this.player2 = new Player2(this);

    if (this.fire) {
      this.cannonball = new Cannonball(this, this.player);
    }
    if (this.fire2) {
      this.cannonball2 = new Cannonball(this, this.player2);
    }
  }

  // move functions _____________________________________________________________________
  // UP || W
  moveTop( step, player ) {
    let gameScene = player.game;
    if (player.name == "tank1") {
      var gameX = "posX";
      var gameY = "posY";
      player.fire = 'top';
      player.game.directionFire = 'fireToTop'
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
    }
    let y = gameScene[gameY] - step;
    //
    let row = Math.floor( y / (gameScene.cellSize/2) ) - 2;
    if ( row < 0 ) {
      gameScene[gameY] = gameScene.cellSize;
      return;
    }
    let pos = Math.floor( gameScene[gameX] / (gameScene.cellSize/2) ) - 2;

    // obstacles
    let place1 = gameScene.game.map[row][pos];
    let place2 = gameScene.game.map[row][pos+1];
    let place3 = 0

    // verification
    if ( place1 == 0 && place2 == 0 && gameScene[gameX]%(gameScene.cellSize/2) == 0 ) {
      place3 = 0;
    } else {
      place3 = gameScene.game.map[row][pos+2]
    }
    if ( place1 == 0 && place2 == 0 && place3 == 0) {
      gameScene[gameY] = y;
    } else {
      gameScene[gameY] = (row+3) * (gameScene.cellSize/2);
    }
  }

  // DOWN || S
  moveBottom ( n, player ) {
    let gameScene = player.game;
    if (player.name == "tank1") {
      var gameX = "posX";
      var gameY = "posY";
      player.game.imgBottom = true;
      player.game.directionFire = 'fireToDown';
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
    }
    let y = gameScene[gameY] + gameScene.cellSize + n;
    //
    let row = Math.floor( y / (gameScene.cellSize/2) ) - 2;
    let pos = Math.floor( gameScene[gameX] / (gameScene.cellSize/2) ) - 2;

    // verification
    if ( row > 25 ) {
      gameScene[gameY] = gameScene.game.canvas.height - gameScene.cellSize*2;
      return
    }

    // obstacles
    let place1 = gameScene.game.map[row][pos];
    let place2 = gameScene.game.map[row][pos+1];
    let place3 = 0

    if ( place1 == 0 && place2 == 0 && gameScene[gameX]%(gameScene.cellSize/2) == 0) {
      place3 = 0;
    } else {
      place3 = this.game.map[row][pos+2]
    }

    if ( place1 == 0 && place2 == 0 && place3 == 0) {
      gameScene[gameY] = y - gameScene.cellSize;
    } else {
      gameScene[gameY] = row * gameScene.cellSize/2;
    }
  }

  // LEFT || A
  moveLeft ( n, player ) {
    let gameScene = player.game;
    if (player.name == "tank1") {
      var gameX = "posX";
      var gameY = "posY";
      player.game.imgLeft = true;
      player.game.directionFire = 'fireToLeft';
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
    }
    // new coords
    let x = gameScene[gameX] - n;

    //
    let row = Math.floor( gameScene[gameY] / (gameScene.cellSize/2) ) - 2;
    let pos = Math.floor( x / (gameScene.cellSize/2) ) - 2;

    // obstacles
    let place1 = gameScene.game.map[row][pos];
    let place2 = gameScene.game.map[row+1][pos];
    let place3 = 0;

    // @TODO wrong verification
    if ( place1 == 0 && place2 == 0 && row < 25 ) {
      if ( gameScene[gameY]%(gameScene.cellSize/2) == 0 ) {
          place3 = 0
        } else {
          place3 = gameScene.game.map[row+2][pos];
        }
    }

    //
    if ( place1 == 0 && place2 == 0 && place3 == 0 ) {
      gameScene[gameX] = x;
    } else {
      gameScene[gameX] = (pos+3)*(gameScene.cellSize/2)
    }
  }
  // RIGHT || D
  moveRight ( n, player ) {
    let gameScene = player.game;
    if (player.name == "tank1") {
      var gameX = "posX";
      var gameY = "posY";
      player.game.imgRight = true;
      player.game.directionFire = 'fireToRight';
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
    }
    // new coords
    let x = gameScene[gameX] + n;

    //
    let row = Math.floor( gameScene[gameY] / (gameScene.cellSize/2 ) ) - 2;
    let pos = Math.floor( (x + gameScene.cellSize) / (gameScene.cellSize/2) ) - 2;

    // obstacles
    let place1 = gameScene.game.map[row][pos];
    let place2 = gameScene.game.map[row+1][pos];
    let place3 = 0;


    if ( place1 == 0 && place2 == 0 && row < 25) {
      if ( gameScene[gameY]%(gameScene.cellSize/2) == 0 ) {
        place3 = 0
      } else {
        place3 = gameScene.game.map[row+2][pos];
      }
    }

    if ( place1 == 0 && place2 == 0 && place3 == 0 ) {
      gameScene[gameX] = x;
    } else {
      gameScene[gameX] = (pos)*(gameScene.cellSize/2)
    }
  }
  // end move functions _____________________________________________________________________

  // fire
  initFire ( player ) {
    let gameScene = player.game;
    if (player.name == "tank1") {
      gameScene.fire = true;
    }
    if (player.name == "tank2") {
      gameScene.fire2 = true;
    }
  }
  // **************** GAME MAP FUNCTION
  gameMap() {
    this.map = this.game.map;
    let cellSize = 40;
    this.cellSize = cellSize;
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(cellSize, cellSize, 13 * cellSize, 13 * cellSize);

    for (var j = 0; j < 26; j++)
    for (var i = 0; i < 26; i++) {
      switch (this.map[j][i]) {
          case 1:
              this.drawBrick(i * cellSize / 2 + cellSize, j * cellSize / 2 + cellSize, cellSize);
              break;
          case 2:
              this.drawHardBrick(i * cellSize / 2 + cellSize, j * cellSize / 2 + cellSize, cellSize);
              break;
      }
    }
  }

  // draw brick cell
  drawBrick(x, y, cellSize) {
    // drawing main background brick
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(x, y, cellSize / 2, cellSize / 2);
    // drawing shadows
    ctx.fillStyle = '#CD8500';
    ctx.fillRect(x, y, cellSize / 2, cellSize / 16);
    ctx.fillRect(x, y + cellSize / 4, cellSize / 2, cellSize / 16);
    ctx.fillRect(x + cellSize / 4, y, cellSize / 16, cellSize / 4);
    ctx.fillRect(x + cellSize / 16, y + cellSize / 4, cellSize / 16, cellSize / 4);
    // drawing separator between bricks
    ctx.fillStyle = '#D3D3D3';
    ctx.fillRect(x, y + cellSize / 4 - cellSize / 16, cellSize / 2, cellSize / 16);
    ctx.fillRect(x, y + cellSize / 2 - cellSize / 16, cellSize / 2, cellSize / 16);
    ctx.fillRect(x + cellSize / 4 - cellSize / 16, y, cellSize / 16, cellSize / 4);
    ctx.fillRect(x, y + cellSize / 4 - cellSize / 16, cellSize / 16, cellSize / 4);
  }
  // draw concrit cell
  drawHardBrick(x, y,cellSize) {
    // drawing main background
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(x, y, cellSize / 2, cellSize / 2);
    // drawing shadows
    ctx.fillStyle = '#909090';
    ctx.beginPath();
    ctx.moveTo(x, y + cellSize / 2);
    ctx.lineTo(x + cellSize / 2, y + cellSize / 2);
    ctx.lineTo(x + cellSize / 2, y);
    ctx.fill();
    // drawing white rectangle on the top
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(x + cellSize / 8, y + cellSize / 8, cellSize / 4, cellSize / 4);
  }
}

// class Player
class Player {
  constructor( game ) {
    this.name = 'tank1';
    this.mainGame = game.game;
    this.game = game;
    this.createPlayer(game.posX, game.posY, game.cellSize);
  }

  createPlayer (x, y, size) {
    const SIZE = size;
    // this.size = size;
    // ctx.beginPath();
    // ctx.restore();
    // ctx.fillRect(x, y, SIZE, SIZE);
    // ctx.fillStyle = "red";
    // ctx.fill();
    var img = new Image();
    img.src = './images/tank_model.jpg';
    if ( this.game.imgLeft && this.mainGame.lastKeyDown == 65 ) {
      img.src = './images/tank_model_left.jpg';
    } else if ( this.game.imgRight && this.mainGame.lastKeyDown == 68 ) {
      img.src = './images/right.jpg';
    }else if ( this.game.imgBottom && this.mainGame.lastKeyDown == 83 ) {
      img.src = './images/bottom.jpg';
    } else if ( this.game.imgBottom && this.mainGame.lastKeyDown == 87 ) {
      img.src = './images/tank_model.jpg';
    }
    //
    ctx.drawImage(img, x, y, size, size );
  }
}

// class Player2
class Player2 {
  constructor( game ) {
    this.name = 'tank2';
    this.game = game;
    this.createPlayer(  game.posX2, game.posY2, game.cellSize );
  }
  createPlayer (x, y, size) {
    const SIZE = size;
    this.size = size;
    ctx.beginPath();
    ctx.restore();
    ctx.fillRect(x, y, SIZE, SIZE);
    ctx.fillStyle = "green";
    ctx.fill();

    // image
    // ctx.beginPath();
    // ctx.restore();
    // var img=document.getElementById("tank2");
    // ctx.drawImage(img, x, y, size, size );
  }
}

// class Cannonball
class Cannonball {
  constructor( Scene, player ) {
    this.game = Scene.game;
    this.gameScene = Scene;
    this.createCannonball( player );
  }
  // fire
  createCannonball( player ) {
    let options = {}
    var x, y, cx, cy, fire;
    if ( player.name == 'tank1' ) {
      options.x = 'posX';
      options.y = 'posY';
      // cx = 'ballX';
      // cy = 'ballY';
      options.ballX = 'ballX';
      options.ballY = 'ballY';
      options.fire = 'fire'
    }
    if ( player.name == 'tank2' ) {
      options.x = 'posX2';
      options.y = 'posY2';
      // cx = 'ballX2';
      // cy = 'ballY2';
      options.ballX = 'ballX2';
      options.ballY = 'ballY2';
      options.fire = 'fire2'
    }

    // size
    options.sizeBall = 3;
    // speed
    options.speed = 5;
    // fire to bottom
    var fireToDown = ( gameScene, player, options ) => {
      if ( !gameScene[options.fire] ) {return}
      x = gameScene[options.x] + gameScene.cellSize/2;
      y = gameScene[options.y] + gameScene.cellSize;
      //
      if ( gameScene[options.ballY] == 0 ) {
        gameScene[options.ballX] = x;
        gameScene[options.ballY] = y;
      }
      // draw
      ctx.beginPath();
      ctx.arc(gameScene[options.ballX], gameScene[options.ballY], options.sizeBall, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();
      // speed ball
      gameScene[options.ballY] += options.speed;

      if ( gameScene[options.ballY] > (gameScene.game.canvas.height - gameScene.cellSize) ) {
        gameScene[options.ballY] = 0;
        gameScene[options.fire] = false;
        return
      } else {
        // serach row
        let row = Math.floor( (gameScene[options.ballY] - gameScene.cellSize) / (gameScene.cellSize/2) ) - 1;
        let pos = Math.floor( (gameScene[options.ballX] - gameScene.cellSize) / (gameScene.cellSize/2) );
        if ( gameScene.game.map[row][pos] == 2 ) {
          gameScene[options.ballX] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.fire] = false;
        }
        if ( gameScene.game.map[row][pos] == 1 ) {
          gameScene.game.map[row][pos] = 0;
          gameScene[options.ballX] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.fire] = false;
        }
      }
    }
    // fire to top
    var fireToTop = ( gameScene, player, options ) => {
      if ( !gameScene[options.fire] ) {return}
      x = gameScene[options.x] + gameScene.cellSize/2;
      y = gameScene[options.y];
      //
      if ( gameScene[options.ballY] == 0 ) {
        gameScene[options.ballX] = x;
        gameScene[options.ballY] = y;
      }
      // draw
      ctx.beginPath();
      ctx.arc(gameScene[options.ballX], gameScene[options.ballY], options.sizeBall, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();
      // speed ball
      gameScene[options.ballY] -= options.speed;
      //
      if ( gameScene[options.ballY] < (gameScene.cellSize) ) {
        gameScene[options.ballX] = 0;
        gameScene[options.ballY] = 0;
        gameScene[options.fire] = false;
        return
      } else {
        // serach row
        let row = Math.floor( (gameScene[options.ballY] - gameScene.cellSize) / (gameScene.cellSize/2) );
        let pos = Math.floor( (gameScene[options.ballX] - gameScene.cellSize) / (gameScene.cellSize/2) );
        if ( gameScene.game.map[row][pos] == 2 ) {
          gameScene[options.ballX] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.fire] = false;
          return
        }
        if ( gameScene.game.map[row][pos] == 1 ) {
          gameScene.game.map[row][pos] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.ballX] = 0;
          gameScene[options.fire] = false;
          return
        }
      }
    }
    // fire to left
    var fireToLeft = ( gameScene, player, options ) => {
      if ( !gameScene[options.fire] ) {return}
      x = gameScene[options.x];
      y = gameScene[options.y] + gameScene.cellSize/2;
      //
      if ( gameScene[options.ballX] == 0 ) {
        gameScene[options.ballX] = x;
        gameScene[options.ballY] = y;
      }
      // draw
      ctx.beginPath();
      ctx.arc(gameScene[options.ballX], gameScene[options.ballY], options.sizeBall, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();
      // speed ball
      gameScene[options.ballX] -= options.speed;
      //
      if ( gameScene[options.ballX] < (gameScene.cellSize) ) {
        gameScene[options.ballX] = 0;
        gameScene[options.ballY] = 0;
        gameScene[options.fire] = false;
        return
      } else {
        // serach row
        let row = Math.floor( (gameScene[options.ballY] - gameScene.cellSize) / (gameScene.cellSize/2) );
        let pos = Math.floor( (gameScene[options.ballX] - gameScene.cellSize) / (gameScene.cellSize/2) );
        if ( gameScene.game.map[row][pos] == 2 ) {
          gameScene[options.ballX] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.fire] = false;
          return
        }
        if ( gameScene.game.map[row][pos] == 1 ) {
          gameScene.game.map[row][pos] = 0;
          gameScene[options.ballX] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.fire] = false;
          return
        }
      }
    }
    // fire to right
    var fireToRight = ( gameScene, player, options ) => {
      if ( !gameScene[options.fire] ) {return}
      x = gameScene[options.x] + gameScene.cellSize;
      y = gameScene[options.y] + gameScene.cellSize/2;
      //
      if ( gameScene[options.ballX] == 0 ) {
        gameScene[options.ballX] = x;
        gameScene[options.ballY] = y;
      }
      // draw
      ctx.beginPath();
      ctx.arc(gameScene[options.ballX], gameScene[options.ballY], options.sizeBall, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();
      // speed ball
      gameScene[options.ballX] += options.speed;
      //
      if ( gameScene[options.ballX] > (gameScene.game.canvas.width - gameScene.cellSize) ) {
        gameScene[options.ballX] = 0;
        gameScene[options.ballY] = 0;
        gameScene[options.fire] = false;
        return
      } else {
        // serach row
        let row = Math.floor( (gameScene[options.ballY] - gameScene.cellSize) / (gameScene.cellSize/2) );
        let pos = Math.floor( (gameScene[options.ballX] - gameScene.cellSize) / (gameScene.cellSize/2) );
        if ( gameScene.game.map[row][pos] == 2 ) {
          gameScene[options.ballX] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.fire] = false;
          return
        }
        if ( gameScene.game.map[row][pos] == 1 ) {
          gameScene.game.map[row][pos] = 0;
          gameScene[options.ballX] = 0;
          gameScene[options.ballY] = 0;
          gameScene[options.fire] = false;
          return
        }
      }
    }
    // cases
    switch ( player.game.directionFire ) {
      case 'fireToDown':
        fireToDown( this.gameScene, player, options )
        break;
      case 'fireToTop':
        fireToTop( this.gameScene, player, options )
        break;
      case 'fireToLeft':
        fireToLeft( this.gameScene, player, options )
        break;
      case 'fireToRight':
        fireToRight( this.gameScene, player, options )
        break;
      default:
        return
    }

  } // create cannonball

}

var game = new Game();
