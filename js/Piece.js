function Piece(tetromino, color, board) {
    this.tetromino = tetromino[0];
    this.index = 0;
    this.activeTetromino = this.tetromino[this.index];
    this.color = color;
    this.board = board;
    this.x = 3;
    this.y = 0;
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
    if (this.collision(0, 1)) {
        this.unDraw();
        this.y++;
        this.draw(this.board.ctx);
    }
};

Piece.prototype.moveRight = function () {
    if (this.collision(1, 0)) {
        this.unDraw();
        this.x++;
        this.draw(this.board.ctx);
    }
};

Piece.prototype.moveLeft = function () {
    if (this.collision(-1, 0)) {
        this.unDraw();
        this.x--;
        this.draw(this.board.ctx);
    }
};

Piece.prototype.rotate = function () {

};

Piece.prototype.collision = function (x, y) {
    for(let r=0; r<this.ROW; r++) {
        for (let c = 0; c < this.COLUMN; c++) {
            if (!this.tetromino[r][c]) continue;
            if (this.x < 0 || this.x >= COLUMN || this.y >= ROW ) return true;
            if (this.board.boardMatrix[this.x][this.y]) return true;
        }
    }
    return false;
};