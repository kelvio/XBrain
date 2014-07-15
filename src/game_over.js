
/* GameOver */
var GameOverScene = cc.Scene.extend({
    _resultado:null,
    operacao:null,
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

        var nivel = 'Júnior';

        this.operacao = this._resultado.operacao;
        var p = this._resultado.pontuacao;

        if (this.operacao == "soma") {

            if (p < 20) {

                nivel = 'Júnior'

            } else if (p < 4) {

                nivel = 'Pleno';

            } else {

                nivel = 'Sênior';

            }


        } else if (this.operacao == "subtracao") {


            if (p < 10) {

                nivel = 'Júnior'

            } else if (p < 35) {

                nivel = 'Pleno';

            } else {

                nivel = 'Sênior';

            }

        } else if (this.operacao == "multiplicacao") {


            if (p < 100) {

                nivel = 'Júnior'

            } else if (p < 3) {

                nivel = 'Pleno';

            } else {

                nivel = 'Sênior';

            }

        } else if (this.operacao == "divisao") {

            if (p < 10) {

                nivel = 'Júnior'

            } else if (p < 20) {

                nivel = 'Pleno';

            } else {

                nivel = 'Sênior';

            }


        }


        var bg = null;
        var resultadoLabel = null;
        if (this._resultado.sucesso) {
            bg = cc.Sprite.create(res.vitoria_png);
            resultadoLabel = cc.LabelTTF.create(this._resultado.jogador + ", você venceu!", "Arial", 160);
            layer.addChild(bg, 0);
            var pontuacaoLabel = cc.LabelTTF.create("A sua pontuação é " + this._resultado.pontuacao + "\nSeu nível é " + nivel, "Arial", 70);
            pontuacaoLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            pontuacaoLabel.x = size.width / 2 + 200;
            pontuacaoLabel.y = size.height / 2;
            resultadoLabel.x = size.width / 2;
            resultadoLabel.y = size.height / 2 + 400;
        } else {
            bg = cc.Sprite.create(res.derrota_png);
            resultadoLabel = cc.LabelTTF.create(this._resultado.jogador + ", você perdeu!" , "Arial", 160);

            layer.addChild(bg, 0);
            var pontuacaoLabel = cc.LabelTTF.create("A sua pontuação é " + this._resultado.pontuacao + ""  + "\nSeu nível é " + nivel, "Arial", 70);
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


        var voltar = cc.Sprite.create(res.voltar_branco_png);
        voltar.attr({
            x: size.width / 2,
            y: size.height / 2 - 300,
            scale: 0.5
        });


        var l = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {

                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    cc.director.runScene(cc.TransitionFade.create(0.5, new TitleScene()));
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(l, voltar);

        this.addChild(layer);
        this.addChild(voltar);
    }
});