const SQUARE_SIZE = 20;
const ROW = 20;
const COLUMN = 20;
const VACANT = 'white';

let boardMatrix = [];

let square = new Square(SQUARE_SIZE);
let board = new Board('tetris', boardMatrix, square);
let piece = new Piece(Z, 'red', board);

board.createBoard();
board.drawBoard();
// boardMatrix.drawTetromino(Z[0], 'orange');
piece.draw(board.ctx);

document.body.addEventListener('keyboard', function(event) {
    console.log('teste');
    if (event.keyCode === 37) {
        piece.moveLeft();
    } else if (event.keyCode === 38) {
        piece.rotate();
    } else if (event.keyCode === 39) {
        piece.moveRight();
    } else if (event.keyCode === 40) {
        piece.down();
    }
});
