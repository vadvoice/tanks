gameMap() {
  // variables for grid
  var gameRectSize = canvas.width;
  let counterOdd = 1;
  let positionX = 0;
  let positionY = 50;
  let step = 50;
  var brickCellsArr = [];

  // part of map level #1
  for (let i = 50; i < gameRectSize; i += 50) {
    counterOdd++
    // fill only odd cell
    if ( counterOdd%2 == 0 ) {
      positionX = i;
      var cell = this.brickCell(positionX, positionY, 50);
      brickCellsArr.push(cell);
      // build to half size of map
      if (brickCellsArr.length == 42) {
        counterOdd = 1;
        positionX = 0;
        positionY += 50
        while( counterOdd < 12 ) {
          positionX += 50;
          this.brickCell( positionX, positionY, 50 );
          counterOdd++;
        }
        break;
      }
    }
    // next row
    if (i == (gameRectSize - 50 )) {
      i = 0;
      counterOdd = 1;
      positionY += 50;
    }
  }
  // create emblem
  var img = document.getElementById('img');
  ctx.drawImage(img,300, gameRectSize-50, 50, 50);
  brickCellsArr.push({
    0: 300,
    1: gameRectSize-50
  })
  //
  return this.map = brickCellsArr;
};

brickCell(posX, posY, size) {
  // colors
  ctx.fillStyle = '#9F5718'
  ctx.strokeStyle = '#82807D'
  // wall
  ctx.beginPath()
  // shape for wall
  ctx.beginPath()
  ctx.fillRect(posX,posY,size,size)

  // metric variables & data
  let thirdPart = size/3
  ctx.lineWidth = 5;

  // horizontal lines
  // 1
  ctx.beginPath();
  ctx.moveTo(posX, posY + thirdPart);
  ctx.lineTo(posX + size, posY + thirdPart);
  ctx.stroke();
  // 2
  ctx.beginPath();
  ctx.moveTo(posX,posY + thirdPart*2);
  ctx.lineTo(posX + size, posY + thirdPart*2);
  ctx.stroke();
  // vertical lines
  // 1
  ctx.beginPath();
  ctx.moveTo(posX + thirdPart,posY);
  ctx.lineTo(posX + thirdPart,posY + thirdPart);
  ctx.stroke();
  // 2
  ctx.beginPath();
  ctx.moveTo(posX + size/2, posY + thirdPart);
  ctx.lineTo(posX + size/2,posY + thirdPart*2);
  ctx.stroke();
  // 3
  ctx.beginPath();
  ctx.moveTo(posX + thirdPart,posY + thirdPart*2);
  ctx.lineTo(posX + thirdPart,posY + size);
  ctx.stroke();
  var brickCellCoords = {}
  for (var i = 0; i < 2; i++) {
    brickCellCoords[i] = arguments[i]
  }
  return brickCellCoords
}


createPlayer (posX, posY, size) {
  const sizeRect = size;
  this.size = size;
  ctx.beginPath();
  ctx.restore();
  ctx.fillRect(posX, posY, sizeRect, sizeRect);
  ctx.fillStyle = "red";
  ctx.fill();
}


// ************************************************8

    // Main Game Class
    window.Game = class {
      constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setScene(IntroScene);
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
      render(dt) {
        this.ctx.save();
        this.activeScene.render(dt, this.ctx, this.canvas);
        this.ctx.restore();
      }
      start() {
        let last = performance.now(),
            step = 1 / 30,
            dt = 0,
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

    // Intro scene
    window.IntroScene = class {
      constructor(game) {
        this.logoRevealTime = 2;
        this.textTypingTime = 2;
        this.sceneDisplayTime = 6;

        this.elapsedTime = 0;
        this.bigText = 'Intro';
        this.infoText = 'This is intro scene example...';
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
        ctx.fillStyle = '#007';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw menu title
        ctx.font = '60px Helvetica';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#fff';
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
        this.angle = 0;
        this.posX = game.canvas.width / 2; // Don't use pixels in game logic! This is only for example
        this.posY = game.canvas.height / 2;
      }
      update(dt) {
        if (this.game.keys['87']) this.posY--; // W
        if (this.game.keys['83']) this.posY++; // S
        if (this.game.keys['65']) this.posX--; // A
        if (this.game.keys['68']) this.posX++; // D
        if (this.game.keys['82']) this.angle++; // R
        if (this.game.keys['27']) this.game.setScene(MenuScene); // Back to menu
      }
      render(dt, ctx, canvas) {
        const rectSize = 150;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(this.posX, this.posY);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(-rectSize / 2, -rectSize / 2);
        ctx.fillStyle = '#0d0';
        ctx.fillRect(0, 0, rectSize, rectSize);
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

    // launch game
    var game = new Game();





    // game move logic
    getCoord( posX, posY, keyCode, n ) {
      // top
      // -2 for acces in array becouse map rect start from cellSize
      let rowTop = Math.ceil( (posY)/(this.cellSize/2) ) - 2;
      let cellTop = Math.ceil( (posX)/(this.cellSize/2) ) - 2;

      // rectangle coords
      // [ c1, c2,
      //   c3, c4 ]
      let c1 = this.game.map[rowTop][cellTop];
      let c2 = this.game.map[rowTop][cellTop + 1];
      let c3 = this.game.map[rowTop+1][cellTop];
      let c4 = this.game.map[rowTop+1][cellTop+1];
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
