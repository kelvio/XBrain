var GameSceneJogadorVsJogador = cc.Scene.extend({
    serverId:null,
    socket:null,
    pedras:null,
    nomeOponente:null,
    nome:null,
    pontuacao:null,
    desafiado:false,
    pontuacaoOponente:null,
    labelJogador:null,
    labelComputador:null,
    atualizarPontuacao:function() {

        var size = cc.director.getWinSize();
        this.removeChild(this.labelJogador);
        this.removeChild(this.labelComputador);

        this.labelJogador = cc.LabelTTF.create(this.nome + "\n" + this.pontuacao, "Arial", 100);
        this.labelJogador.x = size.width / 2 - 400;
        this.labelJogador.y = size.height - 130;

        if (this.desafiado) {
            this.labelJogador.setColor(cc.color(244, 130, 48));
        } else {
            this.labelJogador.setColor(cc.color(59, 196, 243));
        }

        this.labelJogador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.labelJogador);


        this.labelComputador = cc.LabelTTF.create(this.nomeOponente + "\n" + this.pontuacaoOponente, "Arial", 100);
        this.labelComputador.x = size.width / 2 + 400;
        this.labelComputador.y = size.height - 130;

        if (this.desafiado) {
            this.labelComputador.setColor(cc.color(59, 196, 243));
        } else {

            this.labelComputador.setColor(cc.color(244, 130, 48));

        }

        this.labelComputador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.labelComputador);




        /*this.labelJogador = cc.LabelTTF.create(this.nome+ "\n" + this.pontuacaoJogador, "Arial", 100);

        this.labelJogador.x = size.width / 2 - 400;
        this.labelJogador.y = size.height - 130;
        this.labelJogador.setColor(cc.color(59, 196, 243));
        this.labelJogador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.labelOponente = cc.LabelTTF.create(this.dJogo.nomeOponente + "\n" + this.pontuacaoOponente, "Arial", 100);
        this.labelOponente.x = size.width / 2 + 400;
        this.labelOponente.y = size.height - 130;
        this.labelOponente.setColor(cc.color(244, 130, 48));
        this.labelOponente.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addChild(this.labelJogador);
        this.addChild(this.labelComputador);*/

    },
    onEnter:function () {
        this._super();
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.playMusic(res.RiversideRide_mp3, true);

        var size = cc.director.getWinSize();



        this.tabuleiro = new TabuleiroOnline();
        this.tabuleiro.socket = this.socket;
        this.tabuleiro.serverId = this.serverId;
        this.tabuleiro.init(this.pedras, this.desafiado);
        this.tabuleiro.attr({
            x: size.width / 2 - ((size.width / 2) / 2),
            y: 0,
            scale: 0.8
        });


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
            y: size.height / 2 - 100,
            scale: 1.0
        });
        this.addChild(sair, 0);
        /*var recomecar = cc.Sprite.create(res.recomecar_png);
        recomecar.attr({
            x: size.width / 2 + 700,
            y: size.height / 2 ,
            scale: 1.0
        });
        this.addChild(recomecar, 0);*/

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
        /*var listener2 = cc.EventListener.create({
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
        });*/
        //cc.eventManager.addListener(listener2, recomecar);

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
