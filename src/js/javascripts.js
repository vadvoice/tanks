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
      'Intro',
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

// Main game scene
window.GameScene = class {
  constructor(game) {
    this.game = game;
    this.gameMap();
    this.posX = game.canvas.width / 2 - 88; // Don't use pixels in game logic! This is only for example
    this.posY = game.canvas.height - 50;
    this.coords = {
      0: this.posX,
      1: this.posY
    }
  }
  update(dt) {
    if (this.game.keys['87']) this.posY-=2; // W
    if (this.game.keys['83']) this.posY+=2; // S
    if (this.game.keys['65']) this.posX-=2; // A
    if (this.game.keys['68']) this.posX+=2; // D
    if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu
  }
  render(dt, game) {
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

  // check obstacles
  checkObstacles ( Scene ) {
    let obj = {
      0: this.posX,
      1: this.posY
    }
    let currentX;
    for (var i = 0; i < Scene.map.length; i++) {
      var cellMap = Scene.map[i];
      // #1 wrong method
      // let keys = Scene.game.keys;
      // if ( !((playerX + 50) < wallX && playerX > (wallX + 50)) || !( (playerY < (wallY+50)) && ((playerY+50) < wallY) ) ) {
      //   debugger
      //   //
      //   if( Scene.game.keys[65] ) { // A
      //     Scene.posX = wallX + 50;
      //   }
      //   if( Scene.game.keys[68] ) { // D
      //     Scene.posX = wallX - 50;
      //   }
      //
      //   if( Scene.game.keys[87] ) { // W
      //     Scene.posY = wallY + 50;
      //   }
      //   if( Scene.game.keys[83] ) { // S
      //     Scene.posY = wallY - 50;
      //   }
      // }

      // #2 wrong method (((((
      // if ( JSON.stringify( cellMap ) == JSON.stringify(obj) ) {
      //   console.log('ups');
      //   this.posX = cellMap[0] + 50;
      //   this.posY = cellMap[1] + 50;
      // }

      // #3 bad
      // let keys = Scene.game.keys;
      // if (keys[65]) {
      //   if ( obj[0] == (cellMap[0] + 50) ) {
      //     currentX = cellMap[0];
      //     this.catchPos( currentX )
      //   }
      // }
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.game.map = map;
    let cellSize = 44;
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
  // draw static player
  createPlayer (x, y, cellSize) {
    // drawing main background
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, cellSize / 2, cellSize / 2);
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
    const sizeRect = size;
    // this.size = size;
    // ctx.beginPath();
    // ctx.restore();
    // ctx.fillRect(posX, posY, sizeRect, sizeRect);
    // ctx.fillStyle = "red";
    // ctx.fill();

    for (var j = 0; j < 26; j++) {
    for (var i = 0; i < 26; i++) {
      switch (this.game.map[j][i]) {
        case 3:
          // static player
          this.fillCell(i * size / 2 + size, j * size / 2 + size, size);
          break;
      }
    } //  second loop
  } // first loop
  }
  fillCell ( posX, posY, size ) {

    ctx.beginPath();
    ctx.restore();
    ctx.fillRect(posX, posY, size/2, size/2);
    ctx.fillStyle = "red";
    ctx.fill();
  }

}

var game = new Game();
