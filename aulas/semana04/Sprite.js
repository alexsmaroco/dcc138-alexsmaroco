function Sprite(params = {}) {
    var exm = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        w: 20,
        h: 20,
        color: "blue",
        imune: 0,
        atirando: 0,
        comportamento: undefined,
        ang: 0,
        vang: 0,
        v: 0,
        scene: undefined,
    }
    Object.assign(this, exm, params);
}

Sprite.prototype = new Sprite({});
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx) {
    ctx.save();
    
    ctx.translate(this.x, this.y);
    ctx.rotate(this.ang);
    if(this.imune > 0) {
        ctx.globalAlpha = 0.5*(Math.cos(60*this.imune));
    }
    ctx.fillStyle = this.color;
    ctx.strokeStyle = "black";
    ctx.beginPath();    
    ctx.lineTo(-this.w/2, -this.h/2);
    ctx.lineTo(-this.w/2, this.h/2);
    ctx.lineTo(this.w/2, 0);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    // ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.globalAlpha = 1.0;

    ctx.restore();
}

Sprite.prototype.atualizaCooldown = function(dt) {
    if(this.imune > 0)
        this.imune-=dt;
    if(this.atirando > 0)
        this.atirando-=dt;
}

Sprite.prototype.mover = function(dt) {
    this.atualizaCooldown(dt);
    this.ang += this.vang*dt;
    this.vx = this.v*Math.cos(this.ang);
    this.vy = this.v*Math.sin(this.ang);
    this.x += this.vx * dt;
    this.y += this.vy * dt;
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

