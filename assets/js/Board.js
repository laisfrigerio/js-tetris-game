function Board(canvas, board, square) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext('2d');
    this.boardMatrix = board;
    this.square = square;
}

Board.prototype.createBoard = function () {
    for(let r=0; r<ROW; r++) {
        this.boardMatrix[r] = [];

        for(let c=0; c<COLUMN; c++) {
            this.boardMatrix[r][c] = VACANT;
        }
    }
};

Board.prototype.drawBoard = function () {
    for(let r=0; r<ROW; r++) {
        for (let c = 0; c < COLUMN; c++) {
            this.square.drawSquare(this.ctx, c, r, this.boardMatrix[r][c])
        }
    }
};
