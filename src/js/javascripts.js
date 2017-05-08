let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

// levels
var simpleMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var globalIT = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
    [2, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var battle = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 1, 1],
    [2, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 0, 0, 2, 2],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
// Main Game Class #########################################################################
window.Game = class {
  constructor() {
    this.map = simpleMap;

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
    ctx.font = '40px Helvetica';
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
  constructor (game) {
    this.game = game;
  }
  update(dt) {
    if ( this.game.keys[32] || this.game.keys[27] ) {
      this.game.setScene(MenuScene);
    }
    if ( this.game.keys[49] ) {
      this.game.map = simpleMap;
      this.game.setScene(MenuScene);
    }
    if ( this.game.keys[50] ) {
      this.game.map = globalIT;
      this.game.setScene(MenuScene);
    }
    if ( this.game.keys[51] ) {
      this.game.map = battle;
      this.game.setScene(MenuScene);
    }
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

    ctx.fillStyle = "#22313F"

    let selectMap = 'push button for select map:';
    ctx.beginPath();
    ctx.font = '22px Helvetica';
    ctx.fillText(selectMap, (canvas.width - ctx.measureText(selectMap).width) / 2, canvas.height / 2 + 70);

    ctx.font = '14px Helvetica';

    let first = "1"
    ctx.beginPath();
    ctx.fillText(first, (canvas.width - ctx.measureText(first).width) / 2, canvas.height / 2 + 120);

    let second = "2"
    ctx.beginPath();
    ctx.fillText(second, (canvas.width - ctx.measureText(second).width) / 2, canvas.height / 2 + 150);

    let third = "3"
    ctx.beginPath();
    ctx.fillText(third, (canvas.width - ctx.measureText(third).width) / 2, canvas.height / 2 + 180);
  }
}

// Intro scene
window.IntroScene = class {
  constructor(game) {
    this.logoRevealTime = 2;
    this.textTypingTime = 2;
    this.sceneDisplayTime = 6;

    this.elapsedTime = 0;
    this.bigText = 'Game of the year';
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
    ctx.font = '60px Helvetica';
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
    this.posY = this.cellSize + 0 * this.cellSize;
    this.ballX = 0;
    this.ballY = 0;
    this.speed = 0;
    this.killed = 0;

    //
    this.posX2 = this.cellSize + 7.5 * this.cellSize; // Don't use pixels in game logic! This is only for example
    this.posY2 = this.cellSize + 12 * this.cellSize;
    this.ballX2 = 0;
    this.ballY2 = 0;
    this.speed2 = 0;
    this.killed2 = 0;
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
    // var img=document.getElementById("emblem");
    // ctx.drawImage(img,this.cellSize + 6 * this.cellSize, this.cellSize + 12 * this.cellSize, this.cellSize, this.cellSize );

    // draw player
    this.player =  new Player(this);

    // drew second player
    this.player2 = new Player2(this);

    ctx.font = "20px Arial";
    ctx.fillStyle = 'orange';
    ctx.fillText("player points: " + this.killed  , 40, 25);


    ctx.font = "20px Arial";
    ctx.fillStyle = 'green';
    ctx.fillText("player points: " + this.killed2 , 420, 585);
  }

  // move functions _____________________________________________________________________
  // UP || W
  moveTop( step, player ) {
    let gameScene = player.game;
    if (player.name == "tank1") {
      var gameX = "posX";
      var gameY = "posY";
      player.game.directionMove = 'top';
      player.game.directionFire = 'fireToTop';
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
      player.game.directionMove2 = 'top';
      player.game.directionFire2 = 'fireToTop';
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
      player.game.directionMove = 'down';
      player.game.directionFire = 'fireToDown';
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
      player.game.directionMove2 = 'down';
      player.game.directionFire2 = 'fireToDown';
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
      player.game.directionMove = 'left';
      player.game.directionFire = 'fireToLeft';
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
      player.game.directionMove2 = 'left';
      player.game.directionFire2 = 'fireToLeft';
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
      player.game.directionMove = 'right';
      player.game.directionFire = 'fireToRight';
    } else {
      var gameX = "posX2";
      var gameY = "posY2";
      player.game.imgRight2 = true;
      player.game.directionMove2 = 'right';
      player.game.directionFire2 = 'fireToRight';
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
    this.game.canvas.width = this.game.map.length * 20 + (cellSize*2);
    this.game.canvas.height = this.game.map.length * 20 + (cellSize*2);
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
          case 3:
              this.drawEmblem(i * cellSize / 2 + cellSize, j * cellSize / 2 + cellSize, cellSize);
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
  // draw armour cell
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
  // draw emblem
  drawEmblem(x, y,cellSize) {
    // drawing main background
    ctx.fillStyle = '#cccccc';
    ctx.fillRect(x, y, cellSize / 2, cellSize / 2);
    // drawing shadows
    ctx.fillStyle = '#6C7A89';
    ctx.beginPath();
    ctx.moveTo(x, y + cellSize / 2);
    ctx.lineTo(x + cellSize / 2, y + cellSize / 2);
    ctx.lineTo(x + cellSize / 2, y);
    ctx.fill();
  }
}

// class Player
class Player {
  constructor( game ) {
    this.name = 'tank1';
    this.mainGame = game.game;
    this.game = game;
    this.createPlayer(game.posX, game.posY, game.cellSize);
    this.cannonball = new Bullet( this )
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
    img.src = './images/tank1_d.png';
    if ( this.game.directionMove == 'left' ) {
      img.src = './images/tank1_l.png';
    } else if ( this.game.directionMove == 'right' ) {
      img.src = './images/tank1_r.png';
    }else if ( this.game.directionMove == 'down' ) {
      img.src = './images/tank1_d.png';
    } else if ( this.game.directionMove == 'top' ) {
      img.src = './images/tank1_t.png';
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
    this.cannonball = new Bullet( this )
  }
  createPlayer (x, y, size) {
    const SIZE = size;
    // this.size = size;
    // ctx.beginPath();
    // ctx.restore();
    // ctx.fillRect(x, y, SIZE, SIZE);
    // ctx.fillStyle = "green";
    // ctx.fill();

    // image
    var img = new Image();
    img.src = './images/tank2_t.png';

    if ( this.game.directionMove2 == 'left' ) {
      img.src = './images/tank2_l.png';
    } else if ( this.game.directionMove2 == "right" ) {
      img.src = './images/tank2_r.png';
    } else if ( this.game.directionMove2 == "down" ) {
      img.src = './images/tank2_d.png';
    } else if ( this.game.directionMove2 == 'top' ) {
      img.src = './images/tank2_t.png';
    }
    //
    ctx.drawImage(img, x, y, size, size );
  }
}

class Bullet {
  constructor( player ) {
    this.player = player;
    this.game = player.game;
    this.renderBullet( this.player )
  }
  renderBullet(player) {
    let gameScene = player.game;
    let options = {}
    if ( player.name == 'tank1' ) {
      options.x = 'posX';
      options.y = 'posY';
      options.ballX = 'ballX';
      options.ballY = 'ballY';
      options.fire = 'fire';
      options.directionFire = 'directionFire';
      options.speed = 'speed'
      options.axis = 'axis'
    }
    if ( player.name == 'tank2' ) {
      options.x = 'posX2';
      options.y = 'posY2';
      options.ballX = 'ballX2';
      options.ballY = 'ballY2';
      options.fire = 'fire2';
      options.directionFire = 'directionFire2';
      options.speed = 'speed2';
      options.axis = 'axis2'
    }
    if ( !player.game[options.fire] ) {return}
    var x, y, fire, value;
    // size
    options.sizeBall = 3;
    //
    if ( gameScene[options.ballY] == 0 && gameScene[options.ballX] == 0 ) {

      if ( gameScene[options.directionFire] == "fireToDown" ) {
        gameScene[options.axis] = "y";
        // fire to bottom
        gameScene[options.ballX] = gameScene[options.x] + gameScene.cellSize/2;
        gameScene[options.ballY] = gameScene[options.y] + gameScene.cellSize;
        //
        gameScene[options.speed] = 5;
      }
      if ( gameScene[options.directionFire] == "fireToTop" ) {
        gameScene[options.axis] = "y";
        // fire to bottom
        gameScene[options.ballX] = gameScene[options.x] + gameScene.cellSize/2;
        gameScene[options.ballY] = gameScene[options.y];
        //
        gameScene[options.speed] = -5;
      }
      if ( gameScene[options.directionFire] == "fireToLeft" ) {
        gameScene[options.axis] = "x";
        // fire to bottom
        gameScene[options.ballX] = gameScene[options.x];
        gameScene[options.ballY] = gameScene[options.y] + gameScene.cellSize/2;
        //
        gameScene[options.speed] = -5;
      }
      if ( gameScene[options.directionFire] == "fireToRight" ) {
      gameScene[options.axis] = "x";
        // fire to bottom
        gameScene[options.ballX] = gameScene[options.x] + gameScene.cellSize;
        gameScene[options.ballY] = gameScene[options.y] + gameScene.cellSize/2;
        //
        gameScene[options.speed] = 5;
      }
    }
    if ( gameScene[options.axis] == "y") {
      gameScene[options.ballY] += gameScene[options.speed];
    }
    if ( gameScene[options.axis] == "x") {
      gameScene[options.ballX] += gameScene[options.speed];
    }

    // draw
    ctx.beginPath();
    ctx.arc(gameScene[options.ballX], gameScene[options.ballY], options.sizeBall, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();

    // player 1 killed
    if (  ( ( gameScene[options.ballX] > gameScene.posX2 ) && (gameScene[options.ballX] < (gameScene.posX2 + gameScene.cellSize)) ) && ( gameScene[options.ballY] > gameScene.posY2 && gameScene[options.ballY] < (gameScene.posY2 + gameScene.cellSize) ) ) {
      gameScene.posX2 = gameScene.cellSize + 7.5 * gameScene.cellSize;
      gameScene.posY2 = gameScene.cellSize + 12 * gameScene.cellSize;
      gameScene[options.ballX] = 0;
      gameScene[options.ballY] = 0;
      gameScene[options.fire] = false;
      gameScene.killed++
    }

    // player 2 killed
    if (  ( ( gameScene[options.ballX] > gameScene.posX ) && (gameScene[options.ballX] < (gameScene.posX + gameScene.cellSize)) ) && ( gameScene[options.ballY] > gameScene.posY && gameScene[options.ballY] < (gameScene.posY + gameScene.cellSize) ) ) {
      gameScene.posX = gameScene.cellSize + 4.5 * gameScene.cellSize;
      gameScene.posY = gameScene.cellSize + 0 * gameScene.cellSize;
      gameScene[options.ballX] = 0;
      gameScene[options.ballY] = 0;
      gameScene[options.fire] = false;
      gameScene.killed2++
    }

    if ( gameScene.killed > 5 || gameScene.killed2 > 5 ) {
      alert('win');
      gameScene.game.setScene(ExitScene);
    }

    // obstacles
    if ( gameScene[options.ballY] > (gameScene.game.canvas.height - gameScene.cellSize) || gameScene[options.ballY] < gameScene.cellSize ||  gameScene[options.ballX] < gameScene.cellSize || gameScene[options.ballX] > (gameScene.game.canvas.width - gameScene.cellSize) ) {
      gameScene[options.ballX] = 0;
      gameScene[options.ballY] = 0;
      gameScene[options.fire] = false;
    } else {
      // serach row
      let row = Math.floor( (gameScene[options.ballY] - gameScene.cellSize) / (gameScene.cellSize/2) ) || 0;
      if (row > 25) {row = 25}
      let pos = Math.floor( (gameScene[options.ballX] - gameScene.cellSize) / (gameScene.cellSize/2) );
      if ( gameScene.game.map[row][pos] == 2 ) {
        gameScene[options.ballX] = 0;
        gameScene[options.ballY] = 0;
        gameScene[options.fire] = false;
      }
      if ( gameScene.game.map[row][pos] == 1 || gameScene.game.map[row][pos] == 3 ) {
        gameScene.game.map[row][pos] = 0;
        gameScene[options.ballX] = 0;
        gameScene[options.ballY] = 0;
        gameScene[options.fire] = false;
      }
    }
  } // create
}

var game = new Game();
