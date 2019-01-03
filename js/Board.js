function Board(canvas, board, ROW, COLUMN, VACANT, square) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.board = board;
    this.ROW = ROW;
    this.COLUMN = COLUMN;
    this.VACANT = VACANT;
    this.square = square;
}

Board.prototype.createBoard = function () {
    for(let r=0; r<this.ROW; r++) {
        boardMatrix[r] = [];

        for(let c=0; c<this.COLUMN; c++) {
            this.board[r][c] = this.VACANT;
        }
    }
};

Board.prototype.drawBoard = function () {
    for(let r=0; r<this.ROW; r++) {
        for (let c = 0; c < this.COLUMN; c++) {
            this.square.drawSquare(this.ctx, c, r, this.board[r][c])
        }
    }
};

Board.prototype.drawTetromino = function (piece, color) {
    for(let r=0; r<piece.length; r++) {
        for(let c=0; c<piece.length; c++) {
            if (piece[r][c]) {
                this.square.drawSquare(this.ctx, c,r, color);
            }
        }
    }
};