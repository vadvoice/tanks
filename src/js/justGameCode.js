
// **************** FRAME FUNCTIOIN

// USER INPUT
// let inputState = {
//   "87": false,
//   "83": false,
//   "65": false,
//   "68": false
// };

// variables
let last = performance.now(),
    step = 1 / 60,
    dt = 0,
    now,
    pos = 100;

// main func
let frame = () => {
  now = performance.now();
  dt = dt + Math.min(1, (now - last) / 1000); // исправление проблемы неактивных вкладок
  while(dt > step) {
    dt = dt - step;
  }
  last = now;
  var start = pos++
  var game = new GameScene();
  requestAnimationFrame(frame);
}

// **************** LERP
let lerp = (start, finish, time) => {
  return start + (finish - start) * time;
};

// **************** RENDER
function render( start, pos, time, player ) {
  let gameTable = new GameScene();
}
function update( player ) {
  player.watchUpdate()
}

// call frame
// requestAnimationFrame(frame);

// **************** BRICK CELL FUNCTION

function brickCell(posX, posY, size) {
  console.time('wall')
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
  for (var i = 0; i < arguments.length; i++) {
    brickCellCoords[i] = arguments[i]
  }
  return brickCellCoords
}

// **************** GAME MAP FUNCTION
function gameMap() {
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
      var cell = brickCell(positionX, positionY, 50);
      brickCellsArr.push(cell);
      // build to half size of map
      if (brickCellsArr.length == 42) {
        counterOdd = 1;
        positionX = 0;
        positionY += 50
        while( counterOdd < 12 ) {
          positionX += 50;
          brickCell( positionX, positionY, 50 );
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

  //
  return brickCellsArr;
};

// **************** PLAYER
var inputState = {
  "87": false,
  "83": false,
  "65": false,
  "68": false
  // ROTATE: false
};

// **************** GAME SCENE

class GameScene {
  constructor() {
    this.map = gameMap();
    this.keys = {
      "87": false,
      "83": false,
      "65": false,
      "68": false
    };
    this.posX = 0;
    this.posY = 0;
    this.initInput();
    this.player = new Player(this.posX, this.posY);
  }
  initInput() {
    document.addEventListener('keydown', e => { this.keys[e.which] = true; this.watchUpdate()});
    document.addEventListener('keyup', e => { this.keys[e.which] = false;});
  }
  watchUpdate() {
  console.log(this.posY, this.posX);

  ctx.clearRect(0,0,canvas.width, canvas.height);
  if (this.keys["87"]) { this.posY-=5 }; // W
  if (this.keys['83']) { this.posY+=5 }; // S
  if (this.keys['65']) { this.posX-=5 }; // A
  if (this.keys['68']) { this.posX+=5 }; // D
  this.player = new Player(this.posX, this.posY);
  this.map = gameMap()
  }
}

class Player {
  constructor(coordX, coordY) {
    this.name = 'user';
    this.posY = coordX;
    this.posX = coordY;
    this.player = createPlayer(coordX, coordY, 50, 50);
  }

}
function createPlayer (posX, posY, width, height) {
  ctx.fillStyle = "black"
  ctx.fillRect(posX, posY, width, height)
  ctx.fill()
}

// var game = new GameScene();

// function watchUpdate(player) {
//   console.log('verification');
//   if (player.keys['87']) player.posY--; // W
//   if (player.keys['83']) player.posY++; // S
//   if (player.keys['65']) player.posX--; // A
//   if (player.keys['68']) player.posX++; // D
// }
