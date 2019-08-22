function Sprite(params = {}) {
    var {
        x = 0,
        y = 0,
        vx = 0,
        vy = 0,
        w = 20,
        h = 20,
        color = "blue",
        imune = 0
    } = params;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.w = w;
    this.h = h;
    this.color = color;
    this.imune = imune;
}

Sprite.prototype = new Sprite({});
Sprite.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx) {
    if(this.imune > 0) {
        ctx.globalAlpha = 0.5*(Math.cos(60*this.imune));
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.globalAlpha = 1.0;
}

Sprite.prototype.mover = function(dt) {
    if(this.imune > 0)
        this.imune-=dt;
    if(this.atirando > 0)
        this.atirando-=dt;
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
}

Sprite.prototype.perseguir = function(opcoes) {
    this.vx = 30*Math.sign(opcoes.alvo.x - this.x);
    this.vy = 30*Math.sign(opcoes.alvo.y - this.y);
}

Sprite.prototype.colidiuCom = function(alvo) {
    if(alvo.x + alvo.w < this.x) return false;
    if(alvo.x > this.x + this.w) return false;
    if(alvo.y + alvo.h < this.y) return false;
    if(alvo.y > this.y + this.h) return false;
    return true;
}

Sprite.prototype.controlePorTeclas = function(opcoes) {
    if(opcoes.teclas.esquerda) { this.vx = -70; }
    else if(opcoes.teclas.direita) { this.vx = 70; } else { this.vx = 0; }
    // if(!opcoes.teclas.esquerda && !opcoes.teclas.direita) {this.vx=0;}
    if(opcoes.teclas.cima) { this.vy = -70; }
    else if(opcoes.teclas.baixo) { this.vy = 70; } else { this.vy = 0; }
    // if(!opcoes.teclas.cima && !opcoes.teclas.baixo) {this.vy=0;}
}

