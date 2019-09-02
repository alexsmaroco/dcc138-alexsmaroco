function Scene(params) {
    var exm = {
        sprites: [],
        toRemove: [],
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
        if(this.sprites[i].isTiro &&
            (this.sprites[i].x < 0 || this.sprites[i].x > this.w || this.sprites[i].y < 0 || this.sprites[i].y > this.h)) {
            this.sprites[i] = this.sprites[this.sprites.length-1];
            this.sprites.pop();
        }
    }
}

Scene.prototype.limpar = function() {
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0,0,this.w, this.h);
}

Scene.prototype.adicionar = function(sprite) {
    sprite.scene = this;
    this.sprites.push(sprite);
}

Scene.prototype.acao = function() {
    for(var i = 0; i < this.sprites.length; i++) {
        if(this.sprites[i].comportamento) {
            this.sprites[i].comportamento();
        }
        
    }
}

Scene.prototype.checaColisao = function() {
    for(var i = 0; i < this.sprites.length-1; i++) {
        for(var j = i+1; j < this.sprites.length; j++) {
            if(this.sprites[i].colidiuCom(this.sprites[j])) {
                if(this.sprites[i].props.tipo === "pc" && this.sprites[j].props.tipo === "npc") {
                    this.toRemove.push(this.sprites[j]);
                }
                else if(this.sprites[i].props.tipo === "npc" && this.sprites[j].props.tipo === "tiro") {
                    this.toRemove.push(this.sprites[i]);
                    this.toRemove.push(this.sprites[j]);
                }
            }
        }
    }
}

Scene.prototype.removerSprites = function() {
    for(var i = 0; i < this.toRemove.length; i++) {
        var index = this.sprites.indexOf(this.toRemove[i]);
        this.sprites.splice(index, 1);
    }
    this.toRemove = [];
}

Scene.prototype.passo = function(dt) {
    this.limpar();
    this.acao();
    this.mover(dt);
    this.checaColisao();
    this.removerSprites();
    this.desenhar();
}
