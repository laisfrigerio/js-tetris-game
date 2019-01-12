let GAME_OVER = false;
let PAUSE = false;
let RESTART = false;
let SCORE = 0;
let DROP_START = Date.now();

let boardMatrix = [];

let square = new Square(SQUARE_SIZE);
let board = new 4('tetris', boardMatrix, square);
let piece = null;

start();

function CONTROL(event) {
    const key = event.which;
    if (key === 37) {
        piece.moveLeft();
        DROP_START = Date.now();
    } else if (key === 38) {
        piece.rotate();
        DROP_START = Date.now();
    } else if (key === 39) {
        piece.moveRight();
        DROP_START = Date.now();
    } else if (key === 40) {
        piece.down('down');
        DROP_START = Date.now();
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