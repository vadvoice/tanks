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
    this.posX = this.cellSize + 4.5 * this.cellSize; // Don't use pixels in game logic! This is only for example
    this.posY = this.cellSize + 12 * this.cellSize;
  }
  update(dt) {
    let n = 1;
    if (this.game.keys['87']) { this.getCoord( this.posX, this.posY-=n, 87, n ); } // W
    else if (this.game.keys['83']) {this.getCoord( this.posX, this.posY+=n, 83, n ); } // S
    else if (this.game.keys['65']) {this.getCoord( this.posX-=n, this.posY, 65, n ); } // A
    else if (this.game.keys['68']) {this.getCoord( this.posX+=n, this.posY, 68, n ); } // D
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu
  }

  render(dt, game, kode, n) {
    this.gameMap();
    // X verification
    if ( this.posX < 44 ) {
      this.posX = 44;
    }
    if (this.posX > game.canvas.width - 88) {
      this.posX = game.canvas.width - 88
    }
    // Y verification
    if (this.posY < 44 ) {
      this.posY = 44
    }
    if (this.posY > game.canvas.height - 88) {
      this.posY = game.canvas.height - 88
    }

    // draw player
    this.player = new Player(this.posX, this.posY, this.game)
  }

  getCoord( posX, posY, keyCode, n ) {
    // bottom
    // -2 for acces in array becouse map rect start from cellSize
    let rowTop = Math.ceil( (posY)/(this.cellSize/2) ) - 2;
    let cellTop = Math.ceil( (posX)/(this.cellSize/2) ) - 2;

    // corect coords becouse map drowing from coords(44,44)
    posX += this.cellSize/2;
    posY += this.cellSize/2;
    // top
    let rowBottom = Math.ceil( posY/(this.cellSize/2) ) - 2; // row array map []
    let cellBottom = Math.ceil( posX/(this.cellSize/2) ) - 2; // position in array [i]

    console.log(`top coords(x,y) : ${rowTop},${cellTop}. Bottom coords(x,y) : ${rowBottom},${cellBottom}` );
    console.log(this.game.map[rowTop][cellTop], this.game.map[rowBottom][cellBottom]);

    // [ c1, c2,
    //   c3, c4 ]
    let c1 = this.game.map[rowTop][cellTop];
    let c2 = this.game.map[rowTop][cellTop + 1];
    let c3 = this.game.map[rowBottom][cellBottom -1];
    let c4 = this.game.map[rowBottom][cellBottom];
    console.log(`${c1}  ${c2}
${c3}  ${c4}`);
// debugger

    let envArr = [c1,c2,c3,c4];
    for (var i = 0; i < envArr.length; i++) {
      if( envArr[i] != 0 ) {
        if( keyCode == 87 ) {
          this.posY+=n;
          return
        }
        if( keyCode == 83 ) {
          this.posY-=n;
          return
        }
        if( keyCode == 65 ) {
          this.posX+=n;
          return
        }
        if( keyCode == 68 ) {
          this.posX-=n;
          return
        }
      }
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
  constructor(coordX, coordY, game) {
    this.game = game;
    this.name = 'tank1';
    this.x = coordX;
    this.y = coordY;
    this.createPlayer(coordX, coordY, 44);
  }

  createPlayer (posX, posY, size) {
    console.log(posX, posY);
    const sizeRect = size;
    this.size = size;
    ctx.beginPath();
    ctx.restore();
    ctx.fillRect(posX, posY, sizeRect, sizeRect);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  // createPlayer (posX, posY, size) {
  //
  //   for (var j = 0; j < 26; j++) {
  //   for (var i = 0; i < 26; i++) {
  //     switch (this.game.map[j][i]) {
  //       case 3:
  //         // static player
  //         this.addTankModel(i * size / 2 + size, j * size / 2 + size, size/2);
  //         break;
  //     }
  //   } //  second loop
  // } // first loop
  // }
  // addTankModel ( posX, posY, size ) {
  //   ctx.beginPath();
  //   ctx.restore();
  //   ctx.fillRect(posX, posY, size, size);
  //   ctx.fillStyle = "red";
  //   ctx.fill();
  // }
}

// var game = new Game();
