const SQUARE_SIZE = 20;
const ROW = 20;
const COLUMN = 20;
const VACANT = 'white';

let boardMatrix = [];

let square = new Square(SQUARE_SIZE);
let board = new Board('tetris', boardMatrix, ROW, COLUMN, VACANT, square);

board.createBoard();
board.drawBoard();
board.drawTetromino(Z[0], 'orange');
