var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = cc.LabelTTF.create("2014, Brasarti", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);

        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
        helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        return true;
    }
});


/* Title */
var TitleLayer = cc.Layer.extend({
    _quiet:false,
    setQuiet:function(quiet) {
        this._quiet = quiet;
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();






        return true;
    }
});

var TitleScene = cc.Scene.extend({
    _quiet:false,
    setQuiet:function(quiet) {
      this._quiet = quiet;

    },
    onEnter:function () {
        this._super();


        cc.audioEngine.stopMusic();
        cc.audioEngine.playMusic(res.ThisIsNotaDrill_mp3, true);
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        //BG
        var bgSprite = cc.Sprite.create(res.GameBackground_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bgSprite);

        var logoSprite = cc.Sprite.create(res.XBrainLogo_png);

        //this.addChild(bgSprite);
        this.addChild(logoSprite);
        if (!this._quiet) {
            logoSprite.attr({
                x: size.width / 2,
                y: size.height / 2,
                scale:0.32
            });
            setTimeout(function() {
                logoSprite.runAction(cc.MoveBy.create(1.0, cc.p(0, size.height / 2 - 200)));
            }, 2500);
        } else {
            logoSprite.attr({
                x: size.width / 2,
                y: size.height / 2 + 340,
                scale:0.32
            });
        }



        var itemJogadorVsComputador = cc.MenuItemImage.create(
            res.jogador_x_computador_png,
            res.jogador_x_computador_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(new JogadorVsComputadorScene());
            },
            this
        );
        itemJogadorVsComputador.attr({
            x: size.width / 2,
            y: (size.height / 2) + 160,
            scale: 1.0
        });

        var itemJogadorVsJogador = cc.MenuItemImage.create(
            res.jogador_x_jogador_png,
            res.jogador_x_jogador_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene( new JogadorVsJogadorScene());
            },
            this
        );
        itemJogadorVsJogador.attr({
            x: size.width / 2,
            y: size.height / 2 + 50,
            scale: 1.0
        });

        var itemComoJogar = cc.MenuItemImage.create(
            res.como_jogar_png,
            res.como_jogar_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new ComoJogarScene()));
            },
            this
        );
        itemComoJogar.attr({
            x: size.width / 2,
            y: size.height / 2 - 120,
            scale: 1.0
        });

        var itemOpcoes = cc.MenuItemImage.create(
            res.opcoes_png,
            res.opcoes_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new OpcoesScene()));
            },
            this
        );
        itemOpcoes.attr({
            x: size.width / 2,
            y: size.height / 2  - 240,
            scale: 1.0
        });

        var itemSobreOJogo = cc.MenuItemImage.create(
            res.sobre_o_jogo_png,
            res.sobre_o_jogo_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new SobreOJogoScene()));
            },
            this
        );
        itemSobreOJogo.attr({
            x: size.width / 2,
            y: size.height / 2 - 360,
            scale: 1.0
        });

        var outer = this;



        if (!this._quiet) {
            setTimeout(function() {
                var menu = cc.Menu.create(itemJogadorVsComputador, itemJogadorVsJogador, itemComoJogar, itemOpcoes, itemSobreOJogo);
                menu.setPosition(0,0);
                //menu.setVisible(false);
                outer.addChild(menu);
            }, 4000);
        } else {
            var menu = cc.Menu.create(itemJogadorVsComputador, itemJogadorVsJogador, itemComoJogar, itemOpcoes, itemSobreOJogo);
            menu.setPosition(0,0);
            this.addChild(menu);
        }


    }
});

/* Jogador vs Computador */
var JogadorVsComputadorScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var scene = new SelecaoModoJogoJogadorVsComputadorLayer();
        scene.setParametros({modo:"jogadorVsComputador"});
        this.addChild(scene);

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

/* Como jogar */
var ComoJogarLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();
        this.sprite = cc.Sprite.create(res.XBrainLogo_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var ComoJogarScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new ComoJogarLayer());
    }
});


var SelecaoModoJogoJogadorVsComputadorLayer = cc.LayerColor.extend({
    _parametros:null,
    setParametros:function(parametros) {
        this._parametros = parametros;
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();
        //BG
        var bgSprite = cc.Sprite.create(res.GameBackground_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bgSprite);

        var logoSprite = cc.Sprite.create(res.XBrainLogo_png);
        logoSprite.attr({
            x: size.width / 2,
            y: size.height / 2 + 340,
            scale:0.32
        });
        this.addChild(logoSprite);

        var itemSoma = cc.MenuItemImage.create(
            res.selecao_jogo_soma_png,
            res.selecao_jogo_soma_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var scene = new EntradaNomeVsComputadorScene();
                scene.setOperacao("soma");
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemSoma.attr({
            x: size.width / 2 - 95,
            y: size.height / 2 + 50,
            scale: 0.5
        });

        var itemSubtracao = cc.MenuItemImage.create(
            res.selecao_jogo_subtracao_png,
            res.selecao_jogo_subtracao_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var scene = new EntradaNomeVsComputadorScene();
                scene.setOperacao("subtracao");
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemSubtracao.attr({
            x: size.width / 2 + 95,
            y: size.height / 2  + 50,
            scale: 0.5
        });

        var itemMultiplicacao = cc.MenuItemImage.create(
            res.selecao_jogo_multiplicacao_png,
            res.selecao_jogo_multiplicacao_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var scene = new EntradaNomeVsComputadorScene();
                scene.setOperacao("multiplicacao");
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemMultiplicacao.attr({
            x: size.width / 2 - 95,
            y: size.height / 2 - 140,
            scale: 0.5
        });

        var outer = this;

        var itemDivisao = cc.MenuItemImage.create(
            res.selecao_jogo_divisao_png,
            res.selecao_jogo_divisao_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var scene = new EntradaNomeVsComputadorScene();
                scene.setOperacao("divisao");

                var layer = cc.Layer.create();
                //BG
                var bgSprite = cc.Sprite.create(res.GameBackground_png);
                bgSprite.attr({
                    x: size.width / 2,
                    y: size.height / 2 - 200,
                    scale: 0.7
                });

                var itemFracao = cc.MenuItemImage.create(
                    res.fracao_png,
                    res.fracao_png,
                    function() {
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                        var scene = new EntradaNomeVsComputadorScene();
                        scene.setOperacao("divisao");
                        scene.setOpcao("fracao");
                        cc.director.runScene(cc.TransitionFade.create(0.5, scene));
                    },
                    this
                );
                itemFracao.attr({
                    x: size.width / 2,
                    y: size.height / 2 + 100,
                    scale: 1.0
                });

                var itemDecimal = cc.MenuItemImage.create(
                    res.decimal_png,
                    res.decimal_png,
                    function() {
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                        var scene = new EntradaNomeVsComputadorScene();
                        scene.setOperacao("divisao");
                        scene.setOpcao("decimal");
                        cc.director.runScene(cc.TransitionFade.create(0.5, scene));
                    },
                    this
                );
                itemDecimal.attr({
                    x: size.width / 2,
                    y: size.height / 2 - 100,
                    scale: 1.0
                });


                var itemVoltar = cc.MenuItemImage.create(
                    res.selecao_jogo_voltar_png,
                    res.selecao_jogo_voltar_png,
                    function() {
                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                        //var scene = new TitleScene();
                        //scene.setQuiet(true);
                        //cc.director.runScene(scene);
                        outer.removeChild(layer);
                    },
                    this
                );
                itemVoltar.attr({
                    x: size.width / 2,
                    y: size.height / 2 - 300,
                    scale: 0.8
                });



                var menu = cc.Menu.create(itemFracao, itemDecimal, itemVoltar);
                menu.setPosition(0,0);


                layer.addChild(bgSprite);
                layer.addChild(menu);
                outer.addChild(layer);

                //cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemDivisao.attr({
            x: size.width / 2 + 95,
            y: size.height / 2 - 140,
            scale: 0.5
        });



        var itemVoltar = cc.MenuItemImage.create(
            res.selecao_jogo_voltar_png,
            res.selecao_jogo_voltar_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.director.runScene(scene);
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: size.height / 2 - 345,
            scale: 0.5
        });


        var menu = cc.Menu.create(itemSoma, itemSubtracao, itemMultiplicacao, itemDivisao, itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu);

        return true;
    }
});


var SelecaoModoJogoJogadorVsJogadorLayer = cc.LayerColor.extend({
    _parametros:null,
    setParametros:function(parametros) {
        this._parametros = parametros;
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();
        //BG
        var bgSprite = cc.Sprite.create(res.GameBackground_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bgSprite);

        var logoSprite = cc.Sprite.create(res.XBrainLogo_png);
        logoSprite.attr({
            x: size.width / 2,
            y: size.height / 2 + 340,
            scale:0.32
        });
        this.addChild(logoSprite);

        var itemSoma = cc.MenuItemImage.create(
            res.selecao_jogo_soma_png,
            res.selecao_jogo_soma_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new EntradaNomeVsJogadorScene()));
            },
            this
        );
        itemSoma.attr({
            x: size.width / 2 - 95,
            y: size.height / 2 + 50,
            scale: 0.5
        });

        var itemSubtracao = cc.MenuItemImage.create(
            res.selecao_jogo_subtracao_png,
            res.selecao_jogo_subtracao_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new EntradaNomeVsJogadorScene()));
            },
            this
        );
        itemSubtracao.attr({
            x: size.width / 2 + 95,
            y: size.height / 2  + 50,
            scale: 0.5
        });

        var itemMultiplicacao = cc.MenuItemImage.create(
            res.selecao_jogo_multiplicacao_png,
            res.selecao_jogo_multiplicacao_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new EntradaNomeVsJogadorScene()));
            },
            this
        );
        itemMultiplicacao.attr({
            x: size.width / 2 - 95,
            y: size.height / 2 - 140,
            scale: 0.5
        });

        var itemDivisaoDecimal = cc.MenuItemImage.create(
            res.selecao_jogo_divisao_png,
            res.selecao_jogo_divisao_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new EntradaNomeVsJogadorScene()));
            },
            this
        );
        itemDivisaoDecimal.attr({
            x: size.width / 2 + 95,
            y: size.height / 2 - 140,
            scale: 0.5
        });



        var itemVoltar = cc.MenuItemImage.create(
            res.selecao_jogo_voltar_png,
            res.selecao_jogo_voltar_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.director.runScene(scene);
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: size.height / 2 - 345,
            scale: 0.5
        });


        var menu = cc.Menu.create(itemSoma, itemSubtracao, itemMultiplicacao, itemDivisaoDecimal, itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu);

        return true;
    }
});

/* Opções */
var OpcoesLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();
        this.sprite = cc.Sprite.create(res.XBrainLogo_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var OpcoesScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new OpcoesLayer());
    }
});

/* Sobre o jogo */
var SobreOJogoLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();
        this.sprite = cc.Sprite.create(res.XBrainLogo_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        //this.addChild(this.sprite, 0);

        var texto = "O jogo X-BRAIN construído pela EASY LEARNING ENTERTAINMENT é\n \
        uma verdadeira obra para aprender e se divertir com a matemática\n \
        fundamental. Trata-se de um jogo que articula com perfeição e precisão os\n \
        princípios atuais e mais adequados acerca da aprendizagem e\n \
        desenvolvimento dos conceitos de quantificação, valores e equivalências\n \
        das operações: adição, subtração, multiplicação e divisão. Tenho o privilégio de\n \
        apresentar este jogo, como um material de primeira qualidade que consegue\n \
        articular com leveza e profundidade: teoria e prática.\n \
        O conhecimento se constrói num processo...\n \
        O desafio presente neste jogo está em favorecer ao maior número de pessoas\n \
        a oportunidade de conhecer a matemática numa linguagem ainda mais interessante:\n \
        a da inclusão digital.\n \
        Divertir e aprender com X-Brain é entrar em contato com a nova visão \n \
        paradigmática da sociedade pós-moderna: Isento de tensões, porém pleno de \n \
        desafios e reinvenção de conceitos.\n \
        Adélia Marise Ferreira Monti\n \
        Pedagoga - Especialista em Piscologia da Aprendizagem e do Desenvolvimento Humano\n \
        Educação Especial Psicopedagogia\n \
        Mestre em Psicologia pela Universidade Católica de Brasília / Pesquisadora da Educação \n \
        Superior - CAPES / Ministério da Educação - Brazil.\n \
        Brasilia-DF – Brasil";

        var sobreLabel = cc.LabelTTF.create(texto, "Arial", 38);
        //sobreLabel.setColor(cc.color3(255,0,0));
        sobreLabel.x = size.width / 2;
        sobreLabel.y = size.height / 2;
        // add the label as a child to this layer
        this.addChild(sobreLabel, 5);

        return true;
    }
});

var SobreOJogoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new SobreOJogoLayer());
    }
});


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

/* Intro */
var IntroLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();
        this.sprite = cc.Sprite.create(res.XBrainLogo_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var IntroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new IntroLayer();
        this.addChild(layer);
        cc.audioEngine.playMusic(res.ThisIsNotaDrill_mp3, true);
        setTimeout(function() {
            //Director::getInstance()->replaceScene(CCTransitionFade::create(0.5,newScene));
            //cc.director.replaceScene(cc.TransitionFade.create(0.5, new TitleScene()));
            cc.director.runScene(cc.TransitionFade.create(0.5, new TitleScene()));
        }, 2000);

    }
});


/* Game */
var GameLayer = cc.LayerColor.extend({
    tabuleiro:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();



        var size = cc.director.getWinSize();
        this.tabuleiro = new Tabuleiro();
        this.tabuleiro.init();
        this.tabuleiro.attr({
            x: size.width / 2,
            y: size.height / 2 - 100,
            scale: 0.1
        });

        var bg = cc.Sprite.create(res.GameBackground_png);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });

        this.addChild(bg, 0);
        this.addChild(this.tabuleiro, 0);

        //var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(1, 0.7, 0.7);

        this.tabuleiro.runAction(cc.Sequence.create(scaleToA));

        return true;
    }
});

var GameSceneJogadorVsComputador = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.playMusic(res.WhoLeftTheMilkOut_mp3, true);
    }
});

var Pedra = cc.Sprite.extend({
    _numero:null,
    _cor:null,
    setNumero:function(numero) {
        this._numero = numero;
    },
    getNumero:function() {
      return this._numero;
    },
    setCor:function(cor) {
        this._cor = cor;
    },
    getCor:function() {
        return this._cor;
    },
    azul:function(numero) {
        pedra =  new Pedra();
        pedra.setNumero(numero);
        pedra.setCor("azul");
        bg = cc.Sprite.create(res.pedra_azul_png);
        bg.attr({
            width: 120,
            height: 120,
            scale:1.0
        });
        pedra.addChild(bg);
        return pedra;
    },
    laranja:function(numero) {
        pedra =  new Pedra();
        pedra.setNumero(numero);
        pedra.setCor("laranja");
        bg = cc.Sprite.create(res.pedra_laranja_png);
        bg.attr({
            width: 120,
            height: 120,
            scale:1.0
        });
        pedra.addChild(bg);
        return pedra;
    }
});

var Tabuleiro = cc.Sprite.extend({
    _pedras: null,
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

        this._pedras = null;
        p = new Pedra();
        this._pedras = [
            [null, p.laranja(0), null, p.laranja(1), null, p.laranja(2), null, p.laranja(3), null, p.laranja(4), null],
            [p.laranja(5), null, p.laranja(6), null, p.laranja(7), null, p.laranja(8), null, p.laranja(9), null, p.laranja(10)],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [p.azul(5), null, p.azul(6), null, p.azul(7), null, p.azul(8), null, p.azul(9), null, p.azul(10)],
            [null, p.azul(0), null, p.azul(1), null, p.azul(2), null, p.azul(3), null, p.azul(4), null]
        ];
        for (var i = 0; i < this._pedras.length; i++) {
            for (var j = 0; j < this._pedras[i].length; j++) {
                var pedra = this._pedras[i][j];
                if (pedra != null) {
                    //this.addChild(pedra);

                }
            }
        }

        //this.atualizarTabuleiro();
    },
    atualizarTabuleiro:function() {
        if (this._pedras != null) {
            for (var i = 0; i < this._pedras.length; i++) {
                for (var j = 0; j < this._pedras[i].length; j++) {
                    var pedra = this._pedras[i][j];
                    if (pedra != null) {
                        pedra.attr({
                            x: 120 * j - 800,
                            y: 120 * i - 600,
                            scale:1.4
                        });

                    }
                }
            }
        }
    },
    init:function() {
        var bg = cc.Sprite.create(res.tabuleiro_png);

        this.addChild(bg);
        this.redefinirPedras();
    }
});

var GameSceneJogadorVsJogador = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.playMusic(res.WhoLeftTheMilkOut_mp3, true);
    }
});

var EntradaNomeVsComputadorScene = cc.Scene.extend({
    _operacao:null,
    _opcao:null,
    setOpcao:function(opcao) {
      this._opcao = opcao;
    },
    setOperacao:function(operacao) {
        this._operacao = operacao;
    },
    onEnter:function () {
        this._super();
        var size = cc.director.getWinSize();

        var bg = cc.Sprite.create(res.fundo_laranja_png);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale:1.0
        });
        this.addChild(bg);

        var itemVoltar = cc.MenuItemImage.create(
            res.voltar_branco_png,
            res.voltar_branco_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new JogadorVsComputadorScene()));
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: size.height / 2 - 345,
            scale: 0.5
        });


        var itemOk = cc.MenuItemImage.create(
            res.voltar_branco_png,
            res.voltar_branco_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);

                cc.director.runScene(cc.TransitionFade.create(0.5, new GameSceneJogadorVsComputador()));
            },
            this
        );

        itemOk.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5
        });

        var menu = cc.Menu.create(itemOk, itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu);

        var labelTopo = cc.LabelTTF.create("Qual o seu nome?", "Arial", 110);
        labelTopo.x = size.width / 2;
        labelTopo.y = size.height / 2 + 400;




        this.addChild(labelTopo);

    }
});

var EntradaNomeVsJogadorScene = cc.Scene.extend({
    _operacao:null,
    setOperacao:function(operacao) {
        this._operacao = operacao;
    },
    onEnter:function () {
        this._super();
        var size = cc.director.getWinSize();

        var bg = cc.Sprite.create(res.fundo_azul_png);
        bg.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale:1.0
        });
        this.addChild(bg);

        var itemOk = cc.MenuItemImage.create(
            res.voltar_branco_png,
            res.voltar_branco_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new GameSceneJogadorVsJogador()));
            },
            this
        );

        itemOk.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5
        });

        var itemVoltar = cc.MenuItemImage.create(
            res.voltar_branco_png,
            res.voltar_branco_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new JogadorVsJogadorScene()));

            },
            this
        );

        itemVoltar.attr({
            x: size.width / 2,
            y: size.height / 2 - 345,
            scale: 0.5
        });


        var menu = cc.Menu.create(itemOk, itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu);

        var labelTopo = cc.LabelTTF.create("Qual o seu nome?", "Arial", 110);
        labelTopo.x = size.width / 2;
        labelTopo.y = size.height / 2 + 400;

        this.addChild(labelTopo);

    }
});