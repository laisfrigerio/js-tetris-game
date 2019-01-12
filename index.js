const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const SQUARE_SIZE = 20;
const ROW = 20;
const COLUMN = 20;
const VACANT = 'white';

let boardMatrix = [],  r = 0, c = 0

// let 3_Square = new 3_Square(SQUARE_SIZE);
// let Board = new Board('tetris', boardMatrix, ROW, COLUMN, VACANT, 3_Square);
// Board.createBoard();
// Board.drawBoard();
// Board.drawTetromino(Z, 'orange');

createBoard();
drawBoard();
drawTetrominoes(Z, 'orange');

function createBoard() {
    for(r=0; r<ROW; r++) {
        boardMatrix[r] = [];

        for(c=0; c<COLUMN; c++) {
            boardMatrix[r][c] = VACANT;
        }
    }
}

function drawBoard() {
    for(r=0; r<ROW; r++) {
        for (c = 0; c < COLUMN; c++) {
            drawSquare(c, r, boardMatrix[r][c])
        }
    }
}

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQUARE_SIZE,y*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x*SQUARE_SIZE,y*SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
}

function drawTetrominoes(piece, pieceColor) {
    for(r=0; r<piece.length; r++) {
        for(c=0; c<piece.length; c++) {
            if (piece[r][c]) {
                drawSquare(c,r, pieceColor);
            }
        }
    }
}
