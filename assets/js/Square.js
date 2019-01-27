function Square(SQUARE_SIZE) {
    this.SQUARE_SIZE = SQUARE_SIZE;
}

Square.prototype.drawSquare = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*this.SQUARE_SIZE,y*this.SQUARE_SIZE, this.SQUARE_SIZE, this.SQUARE_SIZE);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x*this.SQUARE_SIZE,y*this.SQUARE_SIZE, this.SQUARE_SIZE, this.SQUARE_SIZE);  
};
