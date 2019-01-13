let GAME_OVER = false;
let PAUSE = false;
let RESTART = false;
let SCORE = 0;
let DROP_START = Date.now();

let boardMatrix = [];

let square = new Square(SQUARE_SIZE);
let board = new Board('tetris', boardMatrix, square);
let piece = null;

start();

function CONTROL(event) {
    const key = event.which;
    checkKey(key);
}

function checkKey(key) {
  if(!PAUSE) {
    if (key === KEY_LEFT) {
      piece.moveLeft();
      DROP_START = Date.now();
    } else if (key === KEY_UP) {
      piece.rotate();
      DROP_START = Date.now();
    } else if (key === KEY_RIGHT) {
      piece.moveRight();
      DROP_START = Date.now();
    } else if (key === KEY_DOWN) {
      piece.down('down');
      DROP_START = Date.now();
    }
  }
}

window.addEventListener('keydown', CONTROL);

function randomNextPiece() {
    let random = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[random][0], PIECES[random][1], board);
}

function drop() {
    let now = Date.now();
    let delta = now - DROP_START;

    if (delta > 1000) {
        piece.down();
        DROP_START = Date.now();
    }

    if (!GAME_OVER && !PAUSE) {
        requestAnimationFrame(drop);
    }
}

document.querySelector('#pause').addEventListener('click', function() {
    if (PAUSE) {
      requestAnimationFrame(drop);
    }
    PAUSE = !PAUSE;
});

document.querySelector('#left').addEventListener('click', function() {
  checkKey(KEY_LEFT);
});

document.querySelector('#right').addEventListener('click', function() {
  checkKey(KEY_RIGHT);
});

document.querySelector('#down').addEventListener('click', function() {
  checkKey(KEY_DOWN);
});

document.querySelector('#up').addEventListener('click', function() {
  checkKey(KEY_UP);
});

function start() {
  piece = randomNextPiece();
  board.createBoard();
  board.drawBoard();
  piece.draw(board.ctx);
  drop();
}

function setScore() {
  document.getElementById('score-span').innerText = '' + SCORE;
}

document.querySelector('#restart').addEventListener('click', function() {
  RESTART = true;
  PAUSE = false;
  SCORE = 0;
  setScore();
  start();
});