function Sprite(params) {
    var {
        x = 0,
        y = 0,
        vx = 0,
        vy = 0,
        w = 20,
        h = 20
    } = params;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
}

Sprite.prototype = new Sprite({});
Sprite.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx) {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Sprite.prototype.mover = function(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
}

Sprite.prototype.perseguir = function(alvo) {
    this.vx = 50*Math.sign(alvo.x - this.x);
    this.vy = 50*Math.sign(alvo.y - this.y);
}

Sprite.prototype.colidiuCom = function(alvo) {
    if(alvo.x + alvo.w < this.x) return false;
    if(alvo.x > this.x + this.w) return false;
    if(alvo.y + alvo.h < this.y) return false;
    if(alvo.y > this.y + this.h) return false;
    return true;
}