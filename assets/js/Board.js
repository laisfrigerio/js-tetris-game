function Board(canvas, board, square) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.boardMatrix = board;
    this.ROW = ROW;
    this.COLUMN = COLUMN;
    this.VACANT = VACANT;
    this.square = square;
}

Board.prototype.createBoard = function () {
    for(let r=0; r<this.ROW; r++) {
        boardMatrix[r] = [];

        for(let c=0; c<this.COLUMN; c++) {
            this.boardMatrix[r][c] = this.VACANT;
        }
    }
};

Board.prototype.drawBoard = function () {
    for(let r=0; r<this.ROW; r++) {
        for (let c = 0; c < this.COLUMN; c++) {
            this.square.drawSquare(this.ctx, c, r, this.boardMatrix[r][c])
        }
    }
};
