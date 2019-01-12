function Piece(tetromino, color, board) {
    this.tetromino = tetromino;
    this.index = 0;
    this.activeTetromino = this.tetromino[this.index];
    this.color = color;
    this.board = board;
    this.x = 3;
    this.y = -1;
}

Piece.prototype.fill = function( color) {
    for(let r=0; r<this.activeTetromino.length; r++) {
        for(let c=0; c<this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                this.board.square.drawSquare(this.board.ctx, this.x + c, this.y + r, color);
            }
        }
    }
};

Piece.prototype.draw = function () {
    this.fill(this.color);
};

Piece.prototype.unDraw = function () {
    this.fill(VACANT);
};

Piece.prototype.down = function (type = 'right') {
    if (!this.collision(0, 1, type)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        this.lock();
        piece = randomNextPiece();
    }
};

Piece.prototype.moveRight = function () {
    if (!this.collision(1, 0)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};

Piece.prototype.moveLeft = function () {
    if (!this.collision(-1, 0)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

Piece.prototype.rotate = function () {
    const nextPattern = this.tetromino[(this.index+1)% this.tetromino.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COLUMN/2) kick = -1;
        else kick = 1;
    }


    if (!this.collision(kick, 0, nextPattern)) {
        this.unDraw();
        this.x += kick;
        this.index = (this.index+1)% this.tetromino.length;
        this.activeTetromino = this.tetromino[(this.index+1)% this.tetromino.length];
        this.draw();
    }
};

Piece.prototype.collision = function (x, y, type) {
    for(let r=0; r<this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) continue; // Is not a blank space
          
            const newX = this.x + x + c;
            const newY = this.y + y + r;

            if (newX < 0 || newX >= COLUMN || newY >= ROW ) return true; // beyond the boundaries
            if (newY < 0) continue;
            if (this.board.boardMatrix[newY][newX] !== VACANT) return true; // is occupied
            if (type === 'down') {
                console.log(newY);
                console.log(this.board.boardMatrix[newY][newX]);
            }
        }
    }
    return false;
};

Piece.prototype.lock = function () {
    for(let r=0; r<this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) continue;
            if (this.y+r < 0) {
                GAME_OVER = true;
                alert('Game over');
                break;
            }
            this.board.boardMatrix[this.y+r][this.x+c] = this.color;
        }
    }

    for(let r=0; r<ROW; r++) {
        let isFullRow = true;
        for(let c=0; c<COLUMN; c++) {
            isFullRow = isFullRow && this.board.boardMatrix[r][c] !== VACANT;
        }
        
        console.log('completed = ' + isFullRow);

        if (isFullRow) {
            for(let y=r; y>1; y--) {
                for(let c=0; c<COLUMN; c++) {
                    this.board.boardMatrix[y][c] = this.board.boardMatrix[y-1][c];
                }
                this.board.boardMatrix[8][10] = this.board.boardMatrix[7][10];
                for(let c=0; c<COLUMN; c++) {
                    this.board.boardMatrix[0][c] = VACANT;
                }
            }
          SCORE += 10;
          setScore();
        }
    }

    this.board.drawBoard();
};
