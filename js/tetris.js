let GAME_OVER = false;
let SCORE = 0;
let DROP_START = Date.now();

let boardMatrix = [];

let square = new Square(SQUARE_SIZE);
let board = new Board('tetris', boardMatrix, square);
let piece = randomNextPiece();

board.createBoard();
board.drawBoard();
// boardMatrix.drawTetromino(Z[0], 'orange');
piece.draw(board.ctx);

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
        piece.down();
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

    if (!GAME_OVER) {
        requestAnimationFrame(drop);
    }
}

drop();
