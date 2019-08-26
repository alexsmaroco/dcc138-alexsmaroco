function Scene(params) {
    var exm = {
        sprites: [],
        ctx: null,
        w: 400,
        h: 400,
    }
    Object.assign(this, exm, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.desenhar = function() {
    for(var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].desenhar(this.ctx);
    }
}

Scene.prototype.mover = function(dt) {
    for(var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].mover(dt);
    }
}

Scene.prototype.limpar = function() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0,0,this.w, this.h);
}

Scene.prototype.adicionar = function(sprite) {
    this.sprites.push(sprite);
}

Scene.prototype.acao = function() {
    for(var i = 0; i < this.sprites.length; i++) {
        if(this.sprites[i].comportamento) {
            this.sprites[i].comportamento();
        }
        
    }
}

Scene.prototype.passo = function(dt) {
    this.limpar();
    this.acao();
    this.mover(dt);
    this.desenhar();
}
