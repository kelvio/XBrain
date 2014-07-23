
var TabuleiroOnline = cc.Sprite.extend({
    _pedras: null,
    aguardarOponente:false,
    pedraSelecionada:null,
    desafiado:false,
    serverId:null,
    socket:null,
    checarFimDeJogo: function checarFimDeJogo() {



        var pedras = this.getPedras();
        numeroPedrasOponente = 0;
        numeroPedrasJogador = 0;
        var minhaCor = this.desafiado ? "laranja" : "azul";
        for (i = 0; i < pedras.length; i++) {
            for (j = 0; j < pedras[i].length; j++) {

                var pedra = pedras[i][j];
                if (pedra == null) {
                    continue;
                }

                if (pedra.getCor() == minhaCor) {
                    numeroPedrasJogador++;
                } else {
                    numeroPedrasOponente++;
                }
            }
        }


        if (numeroPedrasOponente == 0 || numeroPedrasJogador == 0) {
            try {
                outer.socket.disconnect();
                //Fim de jogo
                var gameOverScene = new GameOverScene();
                gameOverScene.init({ jogador: outer.getParent().getParent().nome, sucesso: (outer.getParent().getParent().pontuacao > outer.getParent().getParent().pontuacaoOponente), pontuacao: outer.getParent().getParent().pontuacaoJogador});
                cc.director.runScene(cc.TransitionFade.create(0.5, gameOverScene));
                return true;
            } catch (e) {

            }
        }


        return false;

    },
    getPedras:function() {
        return this._pedras;
    },
    redefinirPedras:function() {

        if (this._pedras != null) {
            for (var i = 0; i < this._pedras.length; i++) {
                for (var j = 0; j < this._pedras[i].length; j++) {
                    var pedra = this._pedras[i][j];
                    if (pedra != null) {
                        this.removeChild(pedra);

                    }
                }
            }
        }



        //Example, including customisable intervals [lower_bound, upper_bound)
        var limit = 10,
            amount = 11,
            lower_bound = 0,
            upper_bound = 10,
            nl = [],
            na = [];

        if (amount > limit) limit = amount; //Infinite loop if you want more unique
        //Natural numbers than existemt in a
        // given range
        while (nl.length < limit) {
            var random_number = Math.round(Math.random()*(upper_bound - lower_bound) + lower_bound);
            if (nl.indexOf(random_number) == -1) {
                // Yay! new random number
                nl.push( random_number );

            }
        }

        while (na.length < limit) {
            var random_number = Math.round(Math.random()*(upper_bound - lower_bound) + lower_bound);
            if (na.indexOf(random_number) == -1) {
                // Yay! new random number
                na.push( random_number );

            }
        }

        this._pedras = null;
        p = new PedraOnline();

        if (this.desafiado) {
            this._pedras = [
                [null, p.azul(na[0], 0, 1), null, p.azul(na[1], 0, 3), null, p.azul(na[2], 0, 5), null, p.azul(na[3], 0, 7), null, p.azul(na[4], 0, 9), null],
                [p.azul(na[5], 1, 0), null, p.azul(na[6], 1, 2), null, p.azul(na[7], 1, 4), null, p.azul(na[8], 1, 6), null, p.azul(na[9], 1, 8), null, p.azul(na[10], 1, 10)]
                    [null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null],
                [null, p.laranja(nl[6], 6, 1), null, p.laranja(nl[7], 6, 3), null, p.laranja(nl[8], 6, 5), null, p.laranja(nl[9], 6, 7), null, p.laranja(nl[10], 6, 9), null],
                [p.laranja(nl[0], 7, 0), null, p.laranja(nl[1], 7, 2), null, p.laranja(nl[2], 7, 4), null, p.laranja(nl[3], 7, 6), null, p.laranja(nl[4], 7, 8), null, p.laranja(nl[5], 7, 10)]
            ];
        } else {
            this._pedras = [
                [p.laranja(nl[0], 0, 0), null, p.laranja(nl[1], 0, 2), null, p.laranja(nl[2], 0, 4), null, p.laranja(nl[3], 0, 6), null, p.laranja(nl[4], 0, 8), null, p.laranja(nl[5], 0, 10)],
                [null, p.laranja(nl[6], 1, 1), null, p.laranja(nl[7], 1, 3), null, p.laranja(nl[8], 1, 5), null, p.laranja(nl[9], 1, 7), null, p.laranja(nl[10], 1, 9), null],
                [null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null],
                [p.azul(na[5], 6, 0), null, p.azul(na[6], 6, 2), null, p.azul(na[7], 6, 4), null, p.azul(na[8], 6, 6), null, p.azul(na[9], 6, 8), null, p.azul(na[10], 6, 10)],
                [null, p.azul(na[0], 7, 1), null, p.azul(na[1], 7, 3), null, p.azul(na[2], 7, 5), null, p.azul(na[3], 7, 7), null, p.azul(na[4], 7, 9), null]
            ];
        }

        for (var i = 0; i < this._pedras.length; i++) {
            for (var j = 0; j < this._pedras[i].length; j++) {
                var pedra = this._pedras[i][j];
                if (pedra != null) {
                    this.addChild(pedra);

                }
            }
        }

        this.atualizarTabuleiro();
    },
    atualizarTabuleiro:function() {
        if (this._pedras != null) {
            for (var i = 0; i < this._pedras.length; i++) {
                for (var j = 0; j < this._pedras[i].length; j++) {
                    var pedra = this._pedras[i][j];
                    if (pedra != null) {
                        pedra.setPosition((120 * j), (120 * Math.abs((i - 8))));
                    }
                }
            }
        }
    },
    init:function(pedras, desafiado) {

        var outer = this;

        this.socket.on('oponent-quit', function(data) {


            //Fim de jogo
            var gameOverScene = new GameOverScene();
            var pontuacao = outer.getParent().getParent().pontuacaoJogador;
            if (pontuacao == undefined) {
                pontuacao = 0;
            }
            gameOverScene.init({ jogador: outer.getParent().getParent().nome, sucesso: true, pontuacao: pontuacao});
            cc.director.runScene(cc.TransitionFade.create(0.5, gameOverScene));

        });

        this.socket.on('score', function(data) {

            var jogo = outer.getParent().getParent();
            jogo.pontuacao = data.pontuacao;
            jogo.pontuacaoOponente = data.pontuacaoOponente;
            jogo.nomeOponente = data.nomeOponente;
            jogo.nome = data.nome;
            outer.getParent().getParent().atualizarPontuacao();

        });

        this.socket.on('prompt', function(data) {



            var size = cc.director.getWinSize();

            //Mostra diálogo de seleção de opções
            var layer = cc.Layer.create();

            //BG
            var bgSprite = cc.Sprite.create(res.GameBackground_png);
            bgSprite.attr({
                x: size.width / 2,
                y: size.height / 2,
                scale: 0.2
            });
            var scaleToA = cc.ScaleTo.create(0.5, 0.5, 0.5);
            bgSprite.runAction(cc.Sequence.create(scaleToA));
            layer.addChild(bgSprite);
            outer.getParent().addChild(layer);

            pergunta = cc.LabelTTF.create(data.questao, "Arial", 130);
            pergunta.x = bgSprite.width / 2;
            pergunta.y = bgSprite.height - 200;
            pergunta.setColor(cc.color(59, 196, 243));
            bgSprite.addChild(pergunta);


            opcaoA = cc.LabelTTF.create(data.alternativaA, "Arial", 130);
            opcaoA.x = bgSprite.width / 2 - 400;
            opcaoA.y = bgSprite.height - 400;
            opcaoA.setColor(cc.color(22, 22, 22));


            opcaoB = cc.LabelTTF.create(data.alternativaB, "Arial", 130);
            opcaoB.x = bgSprite.width / 2 + 400;
            opcaoB.y = bgSprite.height - 400;
            opcaoB.setColor(cc.color(22, 22, 22));

            opcaoC = cc.LabelTTF.create(data.alternativaC, "Arial", 130);
            opcaoC.x = bgSprite.width / 2 - 400;
            opcaoC.y = bgSprite.height - 800;
            opcaoC.setColor(cc.color(22, 22, 22));

            opcaoD = cc.LabelTTF.create(data.alternativaD, "Arial", 130);
            opcaoD.x = bgSprite.width / 2 + 400;
            opcaoD.y = bgSprite.height - 800;
            opcaoD.setColor(cc.color(22, 22, 22));

            var l1 = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {

                    var target = event.getCurrentTarget();

                    //Get the position of the current point relative to the button
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);


                    //Se acertar você ganha pontos. Se você errar o adversário ganha pontos.


                    //Check the click area
                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        outer.getParent().removeChild(layer);
                        //atualizarPlacar(0, outer);
                        //checarFimDeJogo(outer);


                        outer.socket.emit('answer', {serverId: outer.serverId, cor: (outer.desafiado ? "laranja" : "azul"), a: data.a, b: data.b, operador: data.operador, alternativaA: data.alternativaA, alternativaB: data.alternativaB, alternativaC: data.alternativaC, alternativaD: data.alternativaD, opcaoSelecionada: "a"});
                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(l1, opcaoA);

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
                        outer.getParent().removeChild(layer);
                        outer.socket.emit('answer', {serverId: outer.serverId, cor: (outer.desafiado ? "laranja" : "azul"), a: data.a, b: data.b, operador: data.operador, alternativaA: data.alternativaA, alternativaB: data.alternativaB, alternativaC: data.alternativaC, alternativaD: data.alternativaD, opcaoSelecionada: "b"});
                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(l2, opcaoB);

            var l3 = cc.EventListener.create({
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
                        outer.getParent().removeChild(layer);
                        outer.socket.emit('answer', {serverId: outer.serverId, cor: (outer.desafiado ? "laranja" : "azul"),  a: data.a, b: data.b, operador: data.operador, alternativaA: data.alternativaA, alternativaB: data.alternativaB, alternativaC: data.alternativaC, alternativaD: data.alternativaD, opcaoSelecionada: "c"});
                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(l3, opcaoC);

            var l4 = cc.EventListener.create({
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
                        outer.getParent().removeChild(layer);
                        outer.socket.emit('answer', {serverId: outer.serverId, cor: (outer.desafiado ? "laranja" : "azul"),  a: data.a, b: data.b, operador: data.operador, alternativaA: data.alternativaA, alternativaB: data.alternativaB, alternativaC: data.alternativaC, alternativaD: data.alternativaD, opcaoSelecionada: "d"});
                        return true;
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(l4, opcaoD);


            bgSprite.addChild(opcaoA);
            bgSprite.addChild(opcaoB);
            bgSprite.addChild(opcaoC);
            bgSprite.addChild(opcaoD);

            layer.addChild(bgSprite);

        });

        this.socket.on('move', function(data) {

            outer.aguardarOponente = false;

            var dirX = data.dirX;
            var dirY = data.dirY;

            out:
                for (var linha = 0; linha < outer._pedras.length; linha++) {

                    for (var coluna = 0; coluna < outer._pedras[linha].length; coluna++) {

                        var pedra = outer._pedras[linha][coluna];
                        if (pedra != null && pedra.getNumero() == data.numero && pedra.getCor() == data.cor) { //Move pedra

                            var novaColuna = dirX < 0 ? pedra.coluna - 1: pedra.coluna + 1;
                            var novaLinha = null;

                            /*if (pedra.getCor() == "azul") { //Gato...

                             novaLinha = dirY > 0 ? pedra.linha + 1 : pedra.linha - 1;
                             } else {*/
                            novaLinha = dirY > 0 ? pedra.linha - 1 : pedra.linha + 1;
                            //}

                            //alert(pedra.getCor() + " - " + pedra.getNumero() + " movendo de " + pedra.linha + ":" + pedra.coluna + " para " + novaLinha + ":" + novaColuna);



                            var newPxt = novaColuna;
                            var newPyt = novaLinha;


                            outer._pedras[linha][coluna] = null;
                            pedra.linha = novaLinha;
                            pedra.coluna = novaColuna;


                            try {

                                //Infelizmente, outro gato...
                                out2:
                                    for (var i = 0; i < outer._pedras.length; i++) {
                                        for (var j = 0; j < outer._pedras[i].length; j++) {
                                            var p = outer._pedras[i][j];
                                            if (p != null && p.getCor() != pedra.getCor() && p.linha == pedra.linha && p.coluna == pedra.coluna) {

                                                outer._pedras[i][j] = null;
                                                outer.removeChild(p);
                                                break out2;

                                            }
                                        }
                                    }

                                outer._pedras[novaLinha][novaColuna] = pedra;
                            } catch (e) {
                                //alert(pedra.getNumero() + ":" + pedra.linha + "," + pedra.coluna);
                            }

                            //alert("valor da casa antiga :" + outer._pedras[linha][coluna] + ", valor da nova casa:" + outer._pedras[novaLinha][novaColuna]);
                            pedra.runAction(cc.Spawn.create(cc.MoveBy.create(0.5, dirX, dirY)));

                            break out;
                        }

                    }

                }

            outer.checarFimDeJogo();
        });

        this.desafiado = desafiado;

        var branca = function(dir) {
            var branca = bg = cc.Sprite.create(dir == undefined ? res.pedra_branca_png : dir == 0 ? res.pedra_branca_le_png : dir == 1 ? res.pedra_branca_ls_png : dir == 2 ? res.pedra_branca_ld_png : res.pedra_branca_li_png);
            branca.attr({
                width: 120,
                height: 120,
                scale:1.0
            });
            return branca;
        }

        var cinza = function() {
            var cinza = bg = cc.Sprite.create(res.pedra_cinza_png);
            cinza.attr({
                width: 120,
                height: 120,
                scale:1.0
            });
            return cinza;
        }

        var casas = null;



        if (this.desafiado) {
            //casas = casas.reverse();
            this.aguardarOponente = true;

            casas = [

                [cinza(), branca(1), cinza(), branca(1), cinza(), branca(1), cinza(), branca(1), cinza(), branca(1), cinza()],
                [branca(0), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(2)],
                [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
                [branca(0), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(2)],
                [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
                [branca(0), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(2)],
                [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
                [branca(3), cinza(), branca(3), cinza(), branca(3), cinza(), branca(3), cinza(), branca(3), cinza(), branca(2)]
            ];

        } else {
            casas = [
                [branca(0), cinza(), branca(1), cinza(), branca(1), cinza(), branca(1), cinza(), branca(1), cinza(), branca(1)],
                [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
                [branca(0), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(2)],
                [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
                [branca(0), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(2)],
                [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
                [branca(0), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(2)],
                [cinza(), branca(3), cinza(), branca(3), cinza(), branca(3), cinza(), branca(3), cinza(), branca(3), cinza()]
            ];
        }


        for (var i = 0; i < casas.length; i++) {
            for (var j = 0; j < casas[i].length; j++) {
                var casa = casas[i][j];

                casa.setPosition(120 * j, (120 * Math.abs((i - 8))));

                this.addChild(casa);

                if (j + 1 % 2 != 0) {

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

                                if (outer.aguardarOponente) {
                                    return false;
                                }


                                var newPxt = 0;
                                var newPyt = 0;
                                out2:
                                    for (i = 0; i < casas.length; i++) {
                                        for (j = 0; j < casas[i].length; j++) {
                                            var casa = casas[i][j];
                                            if (casa != null) {
                                                if (casa == target) {
                                                    newPxt = j;

                                                    /* if (outer.pedraSelecionada != null && outer.pedraSelecionada.getCor() == "laranja") {

                                                     if (i == 7) {
                                                     newPyt = 0;
                                                     } else if (i == 6) {
                                                     newPyt = 1;
                                                     } else if (i == 5) {
                                                     newPyt = 2;
                                                     } else if (i == 4) {
                                                     newPyt = 3;
                                                     } else if (i == 3) {
                                                     newPyt = 4;
                                                     } else if (i == 2) {
                                                     newPyt = 5;
                                                     } else if (i == 1) {
                                                     newPyt = 6;
                                                     } else if (i == 0) {
                                                     newPyt
                                                     }

                                                     } else {


                                                     }*/

                                                    newPyt = i;



                                                    break out2;
                                                }

                                            }
                                        }
                                    }


                                if (outer.pedraSelecionada == null) {
                                    return false;
                                }


                                if (!((outer.pedraSelecionada.linha + 1 == newPyt || outer.pedraSelecionada.linha - 1 == newPyt) && (outer.pedraSelecionada.coluna + 1 == newPxt || outer.pedraSelecionada.coluna - 1 == newPxt))) {
                                    return false;
                                }



                                if (outer.desafiado) {
                                    if (outer.pedraSelecionada.getCor() == "azul") {
                                        return false;
                                    }
                                }

                                var dirX = outer.pedraSelecionada.coluna < newPxt ? 120 : -120;

                                var dirY = null;


                                //if (outer.pedraSelecionada.getCor() == "laranja" && (newPyt == 5 || newPyt == 6)) { //Infelizmente, gato
                                //    dirY = outer.pedraSelecionada.linha < newPyt ? 120 : -120;
                                //} else {
                                dirY = outer.pedraSelecionada.linha < newPyt ? -120 : 120;
                                //}


                                /*if (outer.desafiado) {
                                 if (newPyt < outer.pedraSelecionada.linha) {
                                 return false;
                                 }
                                 } else {
                                 if (newPyt > outer.pedraSelecionada.linha) {
                                 return false;
                                 }
                                 }*/


                                var pedraAlvo = outer.getPedras()[newPyt][newPxt];
                                if (pedraAlvo != null) {

                                    if (outer.pedraSelecionada.linha + 1 != pedraAlvo.linha && outer.pedraSelecionada.linha - 1 != pedraAlvo.linha) {
                                        return false;
                                    }

                                    if (pedraAlvo.getCor() == outer.pedraSelecionada.getCor()) {
                                        return true;
                                    }
                                } else {
                                    if (outer.pedraSelecionada.linha < newPyt) {
                                        return false;
                                    }
                                }

                                outer.removeChild(outer.getPedras()[newPyt][newPxt]);
                                outer.getPedras()[newPyt][newPxt] = outer.pedraSelecionada;
                                outer.getPedras()[outer.pedraSelecionada.linha][outer.pedraSelecionada.coluna] = null;

                                if (pedraAlvo != null) {


                                    cc.audioEngine.playEffect(res.effect_buttonClick_mp3);

                                    operacao = outer.getParent().getParent().operacao;
                                    numeroPedraJogador = outer.pedraSelecionada.getNumero();
                                    numeroPedraOponente = pedraAlvo.getNumero();
                                    alternativas = [];
                                    if (outer.getParent().getParent().modo == "interativo") {


                                        if (operacao == "+") {

                                            alternativas.push(numeroPedraJogador + numeroPedraOponente);
                                            while (alternativas.length < 4) {
                                                var n = numeroPedraJogador + Math.floor(Math.random() * 10);
                                                if (alternativas.indexOf(n) != -1) {
                                                    continue;
                                                } else {
                                                    alternativas.push(n);
                                                }
                                            }
                                            alternativas = shuffle(alternativas);
                                        }

                                        if (operacao == "-") {
                                            alternativas = [];
                                            alternativas.push(numeroPedraJogador - numeroPedraOponente);
                                            while (alternativas.length < 4) {
                                                var n = numeroPedraJogador - Math.floor(Math.random() * 10);
                                                if (alternativas.indexOf(n) != -1) {
                                                    continue;
                                                } else {
                                                    alternativas.push(n);
                                                }
                                            }
                                            alternativas = shuffle(alternativas);
                                        }

                                        if (operacao == "x") {
                                            alternativas = [];
                                            alternativas.push(numeroPedraJogador * numeroPedraOponente);
                                            while (alternativas.length < 4) {
                                                var n = numeroPedraJogador * Math.floor(Math.random() * 10);
                                                if (alternativas.indexOf(n) != -1) {
                                                    continue;
                                                } else {
                                                    alternativas.push(n);
                                                }
                                            }
                                            alternativas = shuffle(alternativas);
                                        }

                                        if (operacao == "/") {
                                            alternativas = [];

                                            if (outer.getParent().getParent().opcao == "decimal") {
                                                alternativas.push(numeroPedraJogador / numeroPedraOponente);
                                                while (alternativas.length < 4) {
                                                    var n = numeroPedraJogador / Math.floor(Math.random() * 10);
                                                    if (alternativas.indexOf(n) != -1) {
                                                        continue;
                                                    } else {
                                                        alternativas.push(n);
                                                    }
                                                }
                                                alternativas = shuffle(alternativas);
                                            } else {

                                                alternativas.push(numeroPedraJogador + "/" + numeroPedraOponente);
                                                while (alternativas.length < 4) {
                                                    var n = numeroPedraJogador + "/" + Math.floor(Math.random() * 10);
                                                    if (alternativas.indexOf(n) != -1) {
                                                        continue;
                                                    } else {
                                                        alternativas.push(n);
                                                    }
                                                }
                                                alternativas = shuffle(alternativas);

                                            }


                                        }


                                        var size = cc.director.getWinSize();
                                        //Mostra diálogo de seleção de opções
                                        var layer = cc.Layer.create();
                                        //BG
                                        var bgSprite = cc.Sprite.create(res.GameBackground_png);
                                        bgSprite.attr({
                                            x: size.width / 2,
                                            y: size.height / 2,
                                            scale: 0.2
                                        });
                                        var scaleToA = cc.ScaleTo.create(0.5, 0.5, 0.5);
                                        bgSprite.runAction(cc.Sequence.create(scaleToA));
                                        layer.addChild(bgSprite);
                                        outer.getParent().addChild(layer);

                                        pergunta = cc.LabelTTF.create(numeroPedraJogador + " " + operacao + " " + numeroPedraOponente + " = ?", "Arial", 130);
                                        pergunta.x = bgSprite.width / 2;
                                        pergunta.y = bgSprite.height - 200;
                                        pergunta.setColor(cc.color(59, 196, 243));
                                        bgSprite.addChild(pergunta);


                                        opcaoA = cc.LabelTTF.create(alternativas[0] + "", "Arial", 130);
                                        opcaoA.x = bgSprite.width / 2 - 400;
                                        opcaoA.y = bgSprite.height - 400;
                                        opcaoA.setColor(cc.color(22, 22, 22));


                                        opcaoB = cc.LabelTTF.create(alternativas[1] + "", "Arial", 130);
                                        opcaoB.x = bgSprite.width / 2 + 400;
                                        opcaoB.y = bgSprite.height - 400;
                                        opcaoB.setColor(cc.color(22, 22, 22));

                                        opcaoC = cc.LabelTTF.create(alternativas[2] + "", "Arial", 130);
                                        opcaoC.x = bgSprite.width / 2 - 400;
                                        opcaoC.y = bgSprite.height - 800;
                                        opcaoC.setColor(cc.color(22, 22, 22));

                                        opcaoD = cc.LabelTTF.create(alternativas[3] + "", "Arial", 130);
                                        opcaoD.x = bgSprite.width / 2 + 400;
                                        opcaoD.y = bgSprite.height - 800;
                                        opcaoD.setColor(cc.color(22, 22, 22));

                                        var l1 = cc.EventListener.create({
                                            event: cc.EventListener.TOUCH_ONE_BY_ONE,
                                            swallowTouches: true,
                                            onTouchBegan: function (touch, event) {

                                                var target = event.getCurrentTarget();

                                                //Get the position of the current point relative to the button
                                                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                                                var s = target.getContentSize();
                                                var rect = cc.rect(0, 0, s.width, s.height);


                                                //Se acertar você ganha pontos. Se você errar o adversário ganha pontos.


                                                //Check the click area
                                                if (cc.rectContainsPoint(rect, locationInNode)) {
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(0, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l1, opcaoA);

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
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(1, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l2, opcaoB);

                                        var l3 = cc.EventListener.create({
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
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(2, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l3, opcaoC);

                                        var l4 = cc.EventListener.create({
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
                                                    outer.getParent().removeChild(layer);
                                                    atualizarPlacar(3, outer);
                                                    checarFimDeJogo(outer);
                                                    return true;
                                                }
                                                return false;
                                            }
                                        });
                                        cc.eventManager.addListener(l4, opcaoD);


                                        bgSprite.addChild(opcaoA);
                                        bgSprite.addChild(opcaoB);
                                        bgSprite.addChild(opcaoC);
                                        bgSprite.addChild(opcaoD);

                                        layer.addChild(bgSprite);
                                    } else {
                                        var r = null;
                                        if (operacao == "+") {

                                            r = numeroPedraJogador + numeroPedraOponente;

                                        } else if (operacao == "-") {

                                            r = numeroPedraJogador - numeroPedraOponente;

                                        } else if (operacao == "x") {

                                            r = numeroPedraJogador * numeroPedraOponente;

                                        } else if (operacao == "/") {

                                            r = numeroPedraJogador / numeroPedraOponente;

                                        }

                                        alternativas.push(r);
                                        //atualizarPlacar(0, outer)
                                    }

                                    outer.getPedras()[pedraAlvo.linha][pedraAlvo.coluna] = null;
                                    outer.removeChild(pedraAlvo);

                                }

                                var pedra = outer.pedraSelecionada;
                                //alert(pedra.getCor() + " - " + pedra.getNumero() + " movendo de " + pedra.linha + ":" + pedra.coluna + " para " + newPyt + ":" + newPxt);

                                outer.pedraSelecionada.coluna = newPxt;
                                outer.pedraSelecionada.linha = newPyt;



                                //alert("valor da nova casa:" + outer._pedras[newPyt][newPxt]);

                                //Envia dados para o servidor
                                outer.socket.emit('move', {
                                    serverId: outer.serverId,
                                    cor: outer.pedraSelecionada.getCor(),
                                    numero:outer.pedraSelecionada.getNumero(),
                                    dirX:dirX,
                                    dirY:dirY
                                });

                                outer.pedraSelecionada.runAction(cc.Spawn.create(cc.MoveBy.create(0.5, dirX, dirY)));

                                outer.pedraSelecionada.getChildren()[0].opacity = 255;

                                outer.aguardarOponente = true;
                                outer.pedraSelecionada = null;

                                outer.checarFimDeJogo();
                                return true;
                            }
                            return false;
                        },
                        onTouchEnded: function (touch, event) {
                        }
                    });
                    cc.eventManager.addListener(listener1, casa);

                }

            }
        }

        for (var i = 0; i < casas.length; i++) {
            for (var j = 0; j < casas[i].length; j++) {
                var casa = casas[i][j];
            }
        }
        this._pedras = [
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null]
        ];

        var f = new PedraOnline();
        for (var linha = 0; linha < pedras.length; linha++) {

            for (var coluna = 0; coluna < pedras[linha].length; coluna++) {

                var pedra = pedras[linha][coluna];

                if (pedra != null) {

                    var p = null;

                    if (pedra.cor == "laranja") {
                        p = f.laranja(pedra.numero, pedra.linha, pedra.coluna);
                    } else if (pedra.cor == "azul") {
                        p = f.azul(pedra.numero, pedra.linha, pedra.coluna);
                    }


                    this._pedras[linha][coluna] = p;
                    this.addChild(p);

                }

            }

        }

        this.atualizarTabuleiro();

    }
});
