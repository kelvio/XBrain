/**
 * Created by kelvio on 07/07/14.
 */



/* SelecaoOponenteScene */
var SelecaoOponenteScene = cc.Scene.extend({

    infoLayer:null,
    socket:null,

    operacao:null,

    opcao:null,

    nomeJogador:null,

    labelTopo:null,

    interativo:false,
    labelAguardandoJogadores: null,

    jogadores: [],
    labelsJogadores: [],
    atualizarListaJogadoresTela: function() {

        for (var i = 0; i < this.labelsJogadores.length; i++) {
            this.removeChild(this.labelsJogadores[i]);
        }

        this.labelsJogadores = [];


        outer = this;
        var size = cc.director.getWinSize();
        for (var i = 0; i < this.jogadores.length; i++) {
            var jogador = this.jogadores[i];
            if (jogador.nome) {
                var label = cc.LabelTTF.create(jogador.nome, "Arial", 80);
                this.labelsJogadores.push(label);
                var listener1 = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function (touch, event) {

                        var target = event.getCurrentTarget();

                        //Get the position of the current point relative to the button
                        var locationInNode = target.convertToNodeSpace(touch.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);

                        //Check the click area
                        if (cc.rectContainsPoint(rect, locationInNode)) {

                            //Desafia oponente
                            cc.audioEngine.playEffect(res.effect_buttonClick_mp3);

                            var layer = cc.Layer.create();
                            //BG
                            var bgSprite = cc.Sprite.create(res.GameBackground_png);
                            bgSprite.attr({
                                x: size.width / 2,
                                y: size.height / 2,
                                scale: 0.7
                            });
                            layer.addChild(bgSprite);
                            var label = cc.LabelTTF.create("Aguardando oponente...", "Arial", 60);
                            label.x = size.width / 2;
                            label.y = size.height / 2;
                            label.setColor(cc.color(0, 0, 0));
                            layer.addChild(label);

                            outer.addChild(layer);

                            outer.removeChild(outer.infoLayer);
                            outer.infoLayer = layer;
                            outer.socket.emit('challenge', { id: jogador.id });

                            return true;
                        }
                        return false;
                    }
                });
                cc.eventManager.addListener(listener1, label);
            }
        }


        //Define localização dos jogadores
        var index = 0;
        out:
        for (var linha = 0; linha < 3; linha++) {

            for (var coluna = 0; coluna < 4; coluna++) {

                if (this.labelsJogadores.length > index) {
                    var label = this.labelsJogadores[index];
                    label.x = size.width / 2 - 600 + (140 * coluna);
                    label.y = size.height / 2 + 200 - (100 * linha);

                    index++;

                    this.addChild(label);
                } else {
                    break out;
                }


            }

        }

    },
    atualizarLabelTopo:function(texto) {
        var size = cc.director.getWinSize();
        this.removeChild(this.labelTopo);
        this.labelTopo = cc.LabelTTF.create(texto, "Arial", 110);
        this.labelTopo.x = size.width / 2;
        this.labelTopo.y = size.height / 2 + 450;
        this.addChild(this.labelTopo);
    },
    mostrarLabelAguardandoOutrosJogadores: function() {
        var size = cc.director.getWinSize();
        this.labelAguardandoJogadores = cc.LabelTTF.create("Aguardando outros jogadores...", "Arial", 80);
        this.labelAguardandoJogadores.x = size.width / 2;
        this.labelAguardandoJogadores.y = size.height / 2 + 150;
        this.addChild(this.labelAguardandoJogadores);
    },
    removerLabelAguardandoOutrosJogadores: function() {
      this.removeChild(this.labelAguardandoJogadores);
    },
    onEnter:function () {
        this._super();

        var outer = this;
        var size = cc.director.getWinSize();

        var id = null;
        //this.socket = io.connect('http://177.67.83.46:8080');
        this.socket = io.connect('http://127.0.0.1:8080');
        this.socket.on('welcome', function (data) {

            id = data.id;

            if(data.message) {
                outer.atualizarLabelTopo(data.message);
            }


        });


        this.socket.emit('data', { nome: this.nomeJogador, operacao: this.operacao, opcao: this.opcao, interativo: this.interativo });

        this.socket.on('challenge-rejected', function() {
            try {
                outer.removeChild(outer.infoLayer);
            } catch (e) {
                alert(e);
            }

        });

        this.socket.on('challenge', function(data) {

            var layer = cc.Layer.create();
            //BG
            var bgSprite = cc.Sprite.create(res.GameBackground_png);
            bgSprite.attr({
                x: size.width / 2,
                y: size.height / 2,
                scale: 0.7
            });
            layer.addChild(bgSprite);
            var label = cc.LabelTTF.create(data.nome + " está te desafiando. \nVocê aceita o desafio?", "Arial", 60);
            label.x = size.width / 2;
            label.y = size.height / 2 + 200;
            label.setColor(cc.color(0, 0, 0));
            layer.addChild(label);

            var sim = cc.Sprite.create(res.sim_png);
            sim.attr({
                x: size.width / 2 + 200,
                y: size.height / 2 - 200,
                scale: 1.0
            });

            var l1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {

                    var target = event.getCurrentTarget();

                    //Get the position of the current point relative to the button
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    //Check the click area
                    if (cc.rectContainsPoint(rect, locationInNode)) {

                        //Desafia oponente
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);

                        var layer = cc.Layer.create();
                        //BG
                        var bgSprite = cc.Sprite.create(res.GameBackground_png);
                        bgSprite.attr({
                            x: size.width / 2,
                            y: size.height / 2,
                            scale: 0.7
                        });
                        layer.addChild(bgSprite);
                        var label = cc.LabelTTF.create("Aguardando servidor...", "Arial", 60);
                        label.x = size.width / 2;
                        label.y = size.height / 2;
                        label.setColor(cc.color(0, 0, 0));
                        layer.addChild(label);

                        outer.addChild(layer);

                        outer.socket.emit('challenge-accepted', { id: data.id });
                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(l1, sim);

            var nao = cc.Sprite.create(res.nao_png);
            nao.attr({
                x: size.width / 2 - 200,
                y: size.height / 2 - 200,
                scale: 1.0
            });

            var l2 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {

                    var target = event.getCurrentTarget();

                    //Get the position of the current point relative to the button
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    //Check the click area
                    if (cc.rectContainsPoint(rect, locationInNode)) {

                        //Desafia oponente
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);

                        outer.removeChild(layer);

                        outer.socket.emit('challenge-rejected', { id: data.id });
                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(l2, nao);

            layer.addChild(sim);
            layer.addChild(nao);
            outer.addChild(layer);

        });

        this.socket.on('new-player', function(data) {
            if (data.id == id) {
                return;
            } else {
                outer.removerLabelAguardandoOutrosJogadores();
                outer.jogadores.push(data);
                outer.atualizarListaJogadoresTela();
            }
        });

        this.socket.on('players', function(data) {


            if (data.players.length == 0) {
                outer.mostrarLabelAguardandoOutrosJogadores();

            } else {
                outer.removerLabelAguardandoOutrosJogadores();
                //outer.jogadores = outer.jogadores.join(data);
                for (var i = 0; i < data.players.length; i++) {
                    outer.jogadores.push(data.players[i]);
                }
                outer.atualizarListaJogadoresTela();
            }

        });
        this.socket.on('challenge-accepted', function(data) {

            var gameScene = new GameSceneJogadorVsJogador();
            gameScene.serverId = data.id
            gameScene.nome = outer.nomeJogador;
            gameScene.nomeOponente = data.nomeOponente;
            gameScene.pontuacao = 0;
            gameScene.pontuacaoOponente = 0;
            gameScene.pedras = data.pedras;
            gameScene.desafiado = !(data.desafiante);
            gameScene.socket = outer.socket;
            cc.director.runScene(cc.TransitionFade.create(0.5, gameScene));

        });



        var layer = cc.Layer.create();

        this.labelTopo = cc.LabelTTF.create("Conectando com o servidor...", "Arial", 110);
        this.labelTopo.x = size.width / 2;
        this.labelTopo.y = size.height / 2 + 450;

        // add a "close" icon to exit the progress. it's an autorelease object

        var bg = cc.Sprite.create(res.fundo_azul_png);

        bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });

        layer.addChild(bg, 5);


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


                var target = event.getCurrentTarget();

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    outer.socket.disconnect();
                    cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                    cc.director.runScene(cc.TransitionFade.create(0.5, new TitleScene()));
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(l, voltar);

        this.addChild(layer);
        this.addChild(voltar);
        this.addChild(this.labelTopo);

    }
});
