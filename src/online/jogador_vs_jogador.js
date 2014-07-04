var GameSceneJogadorVsJogador = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.playMusic(res.RiversideRide_mp3, true);

    }
});


/* Jogador vs Jogador */
var JogadorVsJogadorScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var scene = new SelecaoModoJogoJogadorVsJogadorLayer();
        scene.setParametros({modo:"jogadorVsJogador"});
        this.addChild(scene);
    }
});
