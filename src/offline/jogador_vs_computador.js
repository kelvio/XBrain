/* Jogador vs Computador */
var JogadorVsComputadorScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var scene = new SelecaoModoJogoJogadorVsComputadorLayer();
        scene.setParametros({modo:"jogadorVsComputador"});
        this.addChild(scene);

    }
});



/* Game */
var GameSceneJogadorVsComputador = cc.Scene.extend({
    modo:null,
    operacao:null,
    opcao:null,
    jogador:null,
    tabuleiro:null,
    labelJogador:null,
    labelComputador:null,
    nivel:"facil",
    dJogo:null,
    atualizarPontuacao:function() {
        this.removeChild(this.labelJogador);
        this.removeChild(this.labelComputador);

        var size = cc.director.getWinSize();
        this.labelJogador = cc.LabelTTF.create(this.dJogo.nomeJogador+ "\n" + this.dJogo.pontuacaoJogador, "Arial", 100);

        this.labelJogador.x = size.width / 2 - 400;
        this.labelJogador.y = size.height - 130;
        this.labelJogador.setColor(cc.color(245, 183, 22));
        this.labelJogador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.labelComputador = cc.LabelTTF.create(this.dJogo.nomeOponente + "\n" + this.dJogo.pontuacaoOponente, "Arial", 100);
        this.labelComputador.x = size.width / 2 + 400;
        this.labelComputador.y = size.height - 130;
        this.labelComputador.setColor(cc.color(240, 85, 66));
        this.labelComputador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addChild(this.labelJogador);
        this.addChild(this.labelComputador);

    },
    onEnter:function () {
        this._super();
        this.dJogo = {
            nomeJogador: this.nomeJogador,
            pontuacaoJogador:0,
            nomeOponente: window.s.current.computador,
            pontuacaoOponente: 0
        };
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.playMusic(res.RiversideRide_mp3, true);

        var size = cc.director.getWinSize();
        this.tabuleiro = new TabuleiroOffline();
        this.tabuleiro.init();
        this.tabuleiro.attr({
            x: size.width / 2 - ((size.width / 2) / 2),
            y: 0,
            scale: 0.8
        });
        this.tabuleiro.nivel = this.nivel;


        var bg = cc.Sprite.create(res.GameBackground_png);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bg, 0);
        var layer = cc.Layer.create();
        layer.addChild(this.tabuleiro, 0);
        this.addChild(layer);
        //var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(1, 0.8, 0.8);

        this.tabuleiro.runAction(cc.Sequence.create(scaleToA));

        this.atualizarPontuacao();




        //Ações
        var sair = cc.Sprite.create(res.sair_png);
        sair.attr({
            x: size.width / 2 + 700,
            y: size.height / 2 - 200,
            scale: 1.0
        });
        var l = cc.LabelTTF.create(s.current.sair, "Arial", 40);
        l.x = sair.width / 2;
        l.y = sair.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        l.setColor(cc.color(112, 112, 112));

        sair.addChild(l);
        this.addChild(sair, 0);
        var recomecar = cc.Sprite.create(res.recomecar_png);
        recomecar.attr({
            x: size.width / 2 + 700,
            y: size.height / 2 ,
            scale: 1.0
        });
        this.addChild(recomecar, 0);

        var listener1 = cc.EventListener.create({
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

                    cc.director.runScene(new TitleScene());
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(listener1, sair);


        var outer = this;
        var listener2 = cc.EventListener.create({
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

                    var scene = new GameSceneJogadorVsComputador();
                    scene.opcao = outer.opcao;
                    scene.modo = outer.modo;
                    scene.operacao = outer.operacao;
                    scene.nomeJogador = outer.nomeJogador;
                    cc.director.runScene(cc.TransitionFade.create(0.5, scene));
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(listener2, recomecar);

    }
});