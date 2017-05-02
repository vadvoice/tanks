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
