let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// Main Game Class #########################################################################
window.Game = class {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setScene(MenuScene);
    this.initInput();
    this.start();
  }
  initInput() {
    // save keys state
    this.keys = {};
    document.addEventListener('keydown', e => { this.keys[e.which] = true; });
    document.addEventListener('keyup', e => { this.keys[e.which] = false; });
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
    this.infoText = 'but 1990...=)';
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
    let n = 8;
    // if (this.game.keys['87']) { this.moveTop( n ); } // W
    if (this.game.keys['87']) { this.moveTop( n, this.player ); } // W
    if (this.game.keys['83']) { this.moveBottom( n ); } // S
    if (this.game.keys['65']) { this.moveLeft( n ); } // A
    if (this.game.keys['68']) { this.moveRight( n ); } // D
    if (this.game.keys['32']) { this.initFire() } // fire SPACE

    // listener for second player
    if (this.game.keys['38']) { this.moveTop2( n ); } // UP
    if (this.game.keys['40']) { this.moveBottom2( n ); } // DOWN
    if (this.game.keys['37']) { this.moveLeft2( n ); } // LEFT
    if (this.game.keys['39']) { this.moveRight2( n ); } // D
    if (this.game.keys['96']) { this.initFire2() } // fire 0
    // go to menu scene
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu
  }

  render(dt, game, kode, n) {
    // draw map
    this.gameMap();

    // draw player
    this.player =  new Player(this);

    // drew second player
    this.player2 = new SecondPlayer(this);

    if (this.fire) {
      let cannonball = new Cannonball(this);
    }

  }

  // -------------------------------------------------------------------------
  // experement with move second player TODO repeat code
  // UP
  initFire2 () {
    this.fire = true
  }

  moveTop2( n, player ) {
  let y = this.posY2 - n;

    //
    let row = Math.floor( y / (this.cellSize/2) ) - 2;
    if ( row < 0 ) {
      this.posY2 = this.cellSize
      return;
    }
    let pos = Math.floor( this.posX2 / (this.cellSize/2) ) - 2;

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row][pos+1];
    let place3 = 0

    // verification
    if ( row < 0 ) {
      if ( place1 == 0 && place2 == 0 ) {
        place3 = this.game.map[row][pos+2]
      } else {
        place3 = 0;
      }
    }
    console.log(place1, place2, place3);
    if ( place1 == 0 && place2 == 0 && place3 == 0) {
      this.posY2 = y;
    } else {
      this.posY2 = (row+3) * (this.cellSize/2);
    }
  }

  // DOWN
  moveBottom2 ( n ) {
    let y = this.posY2 + this.cellSize + n;
    //
    let row = Math.floor( y / (this.cellSize/2) ) - 2;
    let pos = Math.floor( this.posX2 / (this.cellSize/2) ) - 2;

    // verification
    if ( row > 25 ) {
      this.posY2 = this.game.canvas.height - this.cellSize*2;
      return
    }

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row][pos+1];
    let place3 = 0

    if ( place1 == 0 && place2 == 0 ) {
      if (this.posX2%(this.cellSize == 0)) {
        place3 = this.game.map[row][pos+2]
      } else {
        place3 = 0;
      }
    }

    console.log(place1, place2, place3);
    if ( place1 == 0 && place2 == 0 && place3 == 0) {
      this.posY2 = y - this.cellSize;
    } else {
      this.posY2 = row * this.cellSize/2;
    }
  }

  // LEFT
  moveLeft2(n) {
    // new coords
    let x = this.posX2 - n;

    //
    let row = Math.floor( this.posY2 / (this.cellSize/2) ) - 2;
    let pos = Math.floor( x / (this.cellSize/2) ) - 2;

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row+1][pos];
    let place3 = 0;

    // @TODO wrong verification
    if ( place1 == 0 && place2 == 0 && row < 25 ) {
      if ( this.posY2%(this.cellSize/2) == 0 ) {
          place3 = 0
        } else {
          place3 = this.game.map[row+2][pos];
        }
    }

    console.log(place1, place2, place3);
    //
    if ( place1 == 0 && place2 == 0 && place3 == 0 ) {
      this.posX2 = x;
    } else {
      this.posX2 = (pos+3)*(this.cellSize/2)
    }
  }
  // RIGHT
  moveRight2( n ) {
    // new coords
    let x = this.posX2 + n;

    //
    let row = Math.floor( this.posY2 / (this.cellSize/2 ) ) - 2;
    let pos = Math.floor( (x + this.cellSize) / (this.cellSize/2) ) - 2;

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row+1][pos];
    let place3 = 0;


    if ( place1 == 0 && place2 == 0 && row < 25) {
      if ( this.posY2%(this.cellSize/2) == 0 ) {
        place3 = 0
      } else {
        place3 = this.game.map[row+2][pos];
      }
    }
    console.log(place1, place2, place3);

    if ( place1 == 0 && place2 == 0 && place3 == 0 ) {
      this.posX2 = x;
    } else {
      this.posX2 = (pos)*(this.cellSize/2)
    }
  }
  // -------------------------------------------------------------------------

  initFire () {
    this.fire = true
  }

  // A
  moveLeft(n) {
    // new coords
    let x = this.posX - n;

    //
    let row = Math.floor( this.posY / (this.cellSize/2) ) - 2;
    let pos = Math.floor( x / (this.cellSize/2) ) - 2;

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row+1][pos];
    let place3 = 0;

    // @TODO wrong verification
    if ( place1 == 0 && place2 == 0 && row < 25 ) {
      if ( this.posY%(this.cellSize/2) == 0 ) {
          place3 = 0
        } else {
          place3 = this.game.map[row+2][pos];
        }
    }

    console.log(place1, place2, place3);
    //
    if ( place1 == 0 && place2 == 0 && place3 == 0 ) {
      this.posX = x;
    } else {
      this.posX = (pos+3)*(this.cellSize/2)
    }
  }
  // D
  moveRight( n ) {
    // new coords
    let x = this.posX + n;

    //
    let row = Math.floor( this.posY / (this.cellSize/2 ) ) - 2;
    let pos = Math.floor( (x + this.cellSize) / (this.cellSize/2) ) - 2;

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row+1][pos];
    let place3 = 0;


    if ( place1 == 0 && place2 == 0 && row < 25) {
      if ( this.posY%(this.cellSize/2) == 0 ) {
        place3 = 0
      } else {
        place3 = this.game.map[row+2][pos];
      }
    }
    console.log(place1, place2, place3);

    if ( place1 == 0 && place2 == 0 && place3 == 0 ) {
      this.posX = x;
    } else {
      this.posX = (pos)*(this.cellSize/2)
    }
  }
  // W
  moveTop( n, player ) {
  let y = this.posY - n;

    //
    let row = Math.floor( y / (this.cellSize/2) ) - 2;
    if ( row < 0 ) {
      this.posY = this.cellSize
      return;
    }
    let pos = Math.floor( this.posX / (this.cellSize/2) ) - 2;

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row][pos+1];
    let place3 = 0

    // verification
    if ( row < 0 ) {
      if ( place1 == 0 && place2 == 0 ) {
        place3 = this.game.map[row][pos+2]
      } else {
        place3 = 0;
      }
    }
    console.log(place1, place2, place3);
    if ( place1 == 0 && place2 == 0 && place3 == 0) {
      this.posY = y;
    } else {
      this.posY = (row+3) * (this.cellSize/2);
    }
  }

  // S
  moveBottom ( n ) {
    let y = this.posY + this.cellSize + n;
    //
    let row = Math.floor( y / (this.cellSize/2) ) - 2;
    let pos = Math.floor( this.posX / (this.cellSize/2) ) - 2;

    // verification
    if ( row > 25 ) {
      this.posY = this.game.canvas.height - this.cellSize*2;
      return
    }

    // obstacles
    let place1 = this.game.map[row][pos];
    let place2 = this.game.map[row][pos+1];
    let place3 = 0

    if ( place1 == 0 && place2 == 0 ) {
      if (this.posX%(this.cellSize == 0)) {
        place3 = this.game.map[row][pos+2]
      } else {
        place3 = 0;
      }
    }

    console.log(place1, place2, place3);
    if ( place1 == 0 && place2 == 0 && place3 == 0) {
      this.posY = y - this.cellSize;
    } else {
      this.posY = row * this.cellSize/2;
    }
  }

  // **************** GAME MAP FUNCTION
  gameMap() {
    let map = [
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
    this.game.map = map;
    let cellSize = 44;
    this.cellSize = cellSize;
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(cellSize, cellSize, 13 * cellSize, 13 * cellSize);

    for (var j = 0; j < 26; j++)
    for (var i = 0; i < 26; i++) {
      switch (map[j][i]) {
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
    this.game = game;
    this.name = 'tank1';
    this.x = game.posX;
    this.y = game.posY;
    this.createPlayer(this.x, this.y, game.cellSize);
  }

  createPlayer (x, y, size) {
    console.log(x, y);
    const SIZE = size;
    this.size = size;
    ctx.beginPath();
    ctx.restore();
    ctx.fillRect(x, y, SIZE, SIZE);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
// cannonball first player
class Cannonball {

  constructor( game ) {
    this.game = game;
    this.x = this.game.posX;
    this.y = this.game.posY;
    this.createCannonball();
  }

  // fire
  createCannonball() {
    this.ballX = this.game.posX + (this.game.cellSize/2);
    this.ballY = this.game.posY + (this.game.cellSize/2);
    //
    ctx.beginPath();
    ctx.arc(this.game.ballX, this.game.ballY, 5, 0, Math.PI*2);
    ctx.restore();
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    this.game.ballY -=5
    // console.log('here');
    if (this.game.ballY - this.game.cellSize < 0) {
      this.game.ballY = this.game.posY ;
      this.game.ballX = this.game.posX + (this.game.cellSize/2);
      this.game.fire = false;
    }
  }
}

// class SecondPlayer
// class Player
class SecondPlayer {
  constructor( game ) {
    this.game = game;
    this.name = 'tank2';
    this.x = game.posX2;
    this.y = game.posY2;
    this.createPlayer(this.x, this.y, game.cellSize);
  }

  createPlayer (x, y, size) {
    console.log(x, y);
    const SIZE = size;
    this.size = size;
    ctx.beginPath();
    ctx.restore();
    ctx.fillRect(x, y, SIZE, SIZE);
    ctx.fillStyle = "green";
    ctx.fill();
  }
  // @TODO try to add move function in player class
  // moveTop( step, player ) {
  //   let gameScene = player.game;
  //   let y = player.y - step;
  //   //
  //   let row = Math.floor( y / (gameScene.cellSize/2) ) - 2;
  //   if ( row < 0 ) {
  //     player.y = gameScene.cellSize
  //     return;
  //   }
  //   let pos = Math.floor( player.x / (gameScene.cellSize/2) ) - 2;
  //
  //   // obstacles
  //   let place1 = gameScene.game.map[row][pos];
  //   let place2 = gameScene.game.map[row][pos+1];
  //   let place3 = 0
  //
  //   // verification
  //   if ( row < 0 ) {
  //     if ( place1 == 0 && place2 == 0 ) {
  //       place3 = gameScene.game.map[row][pos+2]
  //     } else {
  //       place3 = 0;
  //     }
  //   }
  //   console.log(place1, place2, place3);
  //   if ( place1 == 0 && place2 == 0 && place3 == 0) {
  //     player.y = y;
  //   } else {
  //     player.y = (row+3) * (gameScene.cellSize/2);
  //   }
  // }
}

var game = new Game();
