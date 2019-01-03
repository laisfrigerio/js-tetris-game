function Piece(tetromino, color, board) {
    this.tetromino = tetromino[0];
    this.index = 0;
    this.activeTetromino = this.tetromino[this.index];
    this.color = color;
    this.board = board;
    this.x = 3;
    this.y = -2;
}

Piece.prototype.draw = function (ctx, color = this.color) {
    const fs = ctx.fillStyle;
    ctx.fillStyle = this.color;
    for(let r=0; r<this.activeTetromino.length; r++) {
        for(let c=0; c<this.activeTetromino.length; c++) {
            if (this.tetromino[r][c]) {
                this.board.square.drawSquare(ctx, this.x + c, this.y + r, color);
            }
        }
    }
    ctx.fillStyle = fs;
};

Piece.prototype.unDraw = function () {
    this.draw(this.board.ctx, VACANT);
};

Piece.prototype.down = function () {
    this.unDraw();
    this.y++;
    this.draw(this.board.ctx);
};

Piece.prototype.moveRight = function () {
    this.unDraw();
    this.x++;
    this.draw(this.board.ctx);
};

Piece.prototype.moveLeft = function () {
    this.unDraw();
    this.x--;
    this.draw(this.board.ctx);
};

Piece.prototype.rotate = function () {

};