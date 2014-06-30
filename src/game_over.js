
/* GameOver */
var GameOverScene = cc.Scene.extend({
    _resultado:null,
    init:function (resultado) {
        this._resultado = resultado;
        return true;
    },
    onEnter:function () {
        this._super();

        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(res.EndGame_mp3);
        var layer = cc.Layer.create();
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object

        var bg = null;
        var resultadoLabel = null;
        if (this._resultado.sucesso) {
            bg = cc.Sprite.create(res.vitoria_png);
            resultadoLabel = cc.LabelTTF.create(this._resultado.jogador + ", você venceu!", "Arial", 160);
            layer.addChild(bg, 0);
            var pontuacaoLabel = cc.LabelTTF.create("A sua pontuação é " + this._resultado.pontuacao + ".", "Arial", 70);
            pontuacaoLabel.x = size.width / 2 + 200;
            pontuacaoLabel.y = size.height / 2;
            resultadoLabel.x = size.width / 2;
            resultadoLabel.y = size.height / 2 + 400;
        } else {
            bg = cc.Sprite.create(res.derrota_png);
            resultadoLabel = cc.LabelTTF.create(this._resultado.jogador + ", você perdeu!", "Arial", 160);

            layer.addChild(bg, 0);
            var pontuacaoLabel = cc.LabelTTF.create("A sua pontuação é " + this._resultado.pontuacao + ".", "Arial", 70);
            pontuacaoLabel.x = size.width / 2 - 500;
            pontuacaoLabel.y = size.height / 2;
            resultadoLabel.x = size.width / 2 - 180;
            resultadoLabel.y = size.height / 2 + 400;
        }





        bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });

        layer.addChild(resultadoLabel, 5);
        layer.addChild(pontuacaoLabel, 5);



        this.addChild(layer);
    }
});