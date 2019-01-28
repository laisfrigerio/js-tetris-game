let GAME_OVER = false;
let PAUSE = false;
let RESTART = false;
let SCORE = 0;
let DROP_START = Date.now();

let boardMatrix = [];

let square = new Square(SQUARE_SIZE);
let board = new Board('tetris', boardMatrix, square);
let piece = null;
let nextPiece = null;

start();

window.addEventListener('keydown', CONTROL);

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

document.querySelector('#restart').addEventListener('click', function() {
    RESTART = true;
    PAUSE = false;
    SCORE = 0;
    GAME_OVER = false;
    setScore();
    clearTimer();
    start();
});

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

function start() {
  piece = randomNextPiece();
  nextPiece = randomNextPiece();
  board.createBoard();
  board.drawBoard();
  piece.draw(board.ctx);
  fillNextPiece(nextPiece);
  startTimer();
  drop();
}

function setScore() {
  document.getElementById('score-span').innerText = '' + SCORE;
}

/**
 * TODO Refactor this fill piece
 * @param piece
 * @param color
 */
function fillNextPiece(piece, color = piece.color) {
    const canvas = document.getElementById('next-piece');
    const ctx = canvas.getContext('2d');
    for(let r=0; r<piece.activeTetromino.length; r++) {
        for(let c=0; c<piece.activeTetromino.length; c++) {
            if (piece.activeTetromino[r][c]) {
                ctx.fillStyle = color;
                ctx.fillRect(c*SQUARE_SIZE,r*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(c*SQUARE_SIZE,r*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
            }
        }
    }
}