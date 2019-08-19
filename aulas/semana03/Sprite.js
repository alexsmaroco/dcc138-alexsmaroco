function Sprite() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.w = 20;
    this.h = 20;
}

Sprite.prototype = new Sprite();
Sprite.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx) {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
}