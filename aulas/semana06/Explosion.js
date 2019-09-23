function Explosion(params = {}) {
    exm = {
        x: 0,
        y: 0,
        w: 32,
        h: 32,
        frame: 0,
    }
    Object.assign(this, exm, params);
}

Explosion.prototype = new Explosion();

Explosion.prototype.mover = function() {
    this.frame+=dt*25;
    if(Math.floor(this.frame) > 16) {
        this.frame = 0;
    }
}

Explosion.prototype.desenhar = function(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeRect(-this.w/2, -this.h/2, this.w, this.h);
    var f = Math.floor(this.frame);
    ctx.drawImage(
        this.scene.assets.img("explosion"),
        64*(f%4),
        64*(Math.floor(f/4)),
        64,
        64,
        -this.w/2,
        -this.h/2,
        this.w,
        this.h 
    );
    
    ctx.restore();
}

Explosion.prototype.colidiuCom = function() {
    return false;
}