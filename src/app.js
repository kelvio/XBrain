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

        /*var itemOpcoes = cc.MenuItemImage.create(
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
        });*/

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
            y: size.height / 2  - 240,
            scale: 1.0
        });

        var outer = this;



        if (!this._quiet) {
            setTimeout(function() {
                var menu = cc.Menu.create(itemJogadorVsComputador, itemJogadorVsJogador, itemComoJogar, itemSobreOJogo);
                menu.setPosition(0,0);
                //menu.setVisible(false);
                outer.addChild(menu);
            }, 4000);
        } else {
            var menu = cc.Menu.create(itemJogadorVsComputador, itemJogadorVsJogador, itemComoJogar, itemSobreOJogo);
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

        //BG
        var bgSprite = cc.Sprite.create(res.GameBackground_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bgSprite);

        var itemVoltar = cc.MenuItemImage.create(
            res.selecao_jogo_voltar_png,
            res.selecao_jogo_voltar_png,
            function() {

                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: 100,
            scale: 0.5
        });


        var menu = cc.Menu.create(itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu, 10);

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

        //BG
        var bgSprite = cc.Sprite.create(res.GameBackground_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bgSprite);

        var itemVoltar = cc.MenuItemImage.create(
            res.selecao_jogo_voltar_png,
            res.selecao_jogo_voltar_png,
            function() {

                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: 100,
            scale: 0.5
        });


        var menu = cc.Menu.create(itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu, 10);
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
        //BG
        var bgSprite = cc.Sprite.create(res.GameBackground_png);
        bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(bgSprite);


        var texto = "          \"O XBrain é uma verdadeira obra para aprender e se divertir com a matemática.\n \
        Trata-se de um jogo que articula com perfeição e precisão os\n \
        princípios atuais e mais adequados acerca da aprendizagem e\n \
        desenvolvimento dos conceitos de quantificação, valores e equivalências\n \
        das operações: adição, subtração, multiplicação e divisão. \n\n\
        Tenho o privilégio de apresentar este jogo, como um material de primeira qualidade \n\
        que consegue articular com leveza e profundidade: teoria e prática.\n\n \
        O conhecimento se constrói num processo...\n \
        O desafio presente neste jogo está em favorecer ao maior número de pessoas\n \
        a oportunidade de conhecer a matemática numa linguagem ainda mais interessante:\n \
        a da inclusão digital.\n \
        Divertir e aprender com X-Brain é entrar em contato com a nova visão \n \
        paradigmática da sociedade pós-moderna: Isento de tensões, porém pleno de \n \
        desafios e reinvenção de conceitos.\"\n\n \
        Adélia Marise Ferreira Monti\n \
        Pedagoga - Especialista em Piscologia da Aprendizagem e do Desenvolvimento Humano\n \
        Educação Especial Psicopedagogia\n \
        Mestre em Psicologia pela Universidade Católica de Brasília / Pesquisadora da Educação \n \
        Superior - CAPES / Ministério da Educação - Brazil.\n\n \
        Brasilia-DF – Brasil";

        var sobreLabel = cc.LabelTTF.create(texto, "Arial", 30);
        sobreLabel.setColor(cc.color(59, 196, 243));
        //sobreLabel.setColor(cc.color3(255,0,0));
        sobreLabel.x = size.width / 2;
        sobreLabel.y = size.height / 2 + 50;
        sobreLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        // add the label as a child to this layer
        this.addChild(sobreLabel, 5);

        var itemVoltar = cc.MenuItemImage.create(
            res.selecao_jogo_voltar_png,
            res.selecao_jogo_voltar_png,
            function() {

                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: 100,
            scale: 0.5
        });


        var menu = cc.Menu.create(itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu, 10);

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
var GameSceneJogadorVsComputador = cc.Scene.extend({
    operacao:null,
    opcao:null,
    tabuleiro:null,
    labelJogador:null,
    labelComputador:null,
    dJogo:null,
    atualizarPontuacao:function() {
        this.removeChild(this.labelJogador);
        this.removeChild(this.labelComputador);

        var size = cc.director.getWinSize();
        this.labelJogador = cc.LabelTTF.create(this.dJogo.nomeJogador+ "\n" + this.dJogo.pontuacaoJogador, "Arial", 100);

        this.labelJogador.x = size.width / 2 - 400;
        this.labelJogador.y = size.height - 130;
        this.labelJogador.setColor(cc.color(59, 196, 243));
        this.labelJogador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.labelComputador = cc.LabelTTF.create(this.dJogo.nomeOponente + "\n" + this.dJogo.pontuacaoOponente, "Arial", 100);
        this.labelComputador.x = size.width / 2 + 400;
        this.labelComputador.y = size.height - 130;
        this.labelComputador.setColor(cc.color(244, 130, 48));
        this.labelComputador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

        this.addChild(this.labelJogador);
        this.addChild(this.labelComputador);

    },
    onEnter:function () {
        this._super();
       this.dJogo = {
            nomeJogador: "Kelvio",
            pontuacaoJogador:0,
            nomeOponente: "Computador",
            pontuacaoOponente: 0
        };
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.playMusic(res.RiversideRide_mp3, true);

        var size = cc.director.getWinSize();
        this.tabuleiro = new Tabuleiro();
        this.tabuleiro.init();
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

        this.labelJogador = cc.LabelTTF.create(this.dJogo.nomeJogador+ "\n" + this.dJogo.pontuacaoJogador, "Arial", 100);
        this.labelJogador.x = size.width / 2 - 400;
        this.labelJogador.y = size.height - 130;
        this.labelJogador.setColor(cc.color(59, 196, 243));
        this.labelJogador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.labelJogador);


        this.labelComputador = cc.LabelTTF.create(this.dJogo.nomeOponente + "\n" + this.dJogo.pontuacaoJogador, "Arial", 100);
        this.labelComputador.x = size.width / 2 + 400;
        this.labelComputador.y = size.height - 130;
        this.labelComputador.setColor(cc.color(244, 130, 48));
        this.labelComputador.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.labelComputador);

    }
});

var Pedra = cc.Sprite.extend({
    _numero:null,
    _cor:null,
    tabuleiro:null,
    linha:null,
    coluna:null,
    getLinha: function() {

        return this.linha;
    },
    getColuna: function() {
        return this.coluna;
    },
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
    azul:function(numero, linha, coluna) {
        pedra =  new Pedra();
        pedra.setNumero(numero);
        pedra.setCor("azul");

        pedra.linha = linha;
        pedra.coluna = coluna;
        bg = cc.Sprite.create(res.pedra_azul_png);
        bg.attr({
            width: 120,
            height: 120,
            scale:1.0
        });
        pedra.addChild(bg);


        labelNumero = cc.LabelTTF.create(numero + "", "Arial", 60);
        labelNumero.x = 60;
        labelNumero.y = 60;
        bg.addChild(labelNumero);

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {


                var target = event.getCurrentTarget();
                if (target.getParent().getParent().aguardarComputador) {
                    return false;
                }

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {

                    var pedras = target.getParent().getParent().getPedras();


                    for (i = 0; i < pedras.length; i++) {
                        for (j = 0; j < pedras[i].length; j++) {
                            var pedra = pedras[i][j];
                            if (pedra != null) {
                                pedra.getChildren()[0].opacity = 255;

                            }
                        }
                    }
                    target.opacity = 120;
                    target.getParent().getParent().pedraSelecionada = target.getParent();
                    return true;
                }
                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {


            },
            onTouchEnded: function (touch, event) {

            }
        });
        cc.eventManager.addListener(listener1, bg);

        return pedra;
    },
    laranja:function(numero, linha, coluna) {
        pedra =  new Pedra();
        pedra.setNumero(numero);
        pedra.setCor("laranja");
        pedra.linha = linha;
        pedra.coluna = coluna;
        bg = cc.Sprite.create(res.pedra_laranja_png);
        bg.attr({
            width: 120,
            height: 120,
            scale:1.0
        });
        pedra.addChild(bg);

        labelNumero = cc.LabelTTF.create(numero + "", "Arial", 60);
        labelNumero.x = 60;
        labelNumero.y = 60;
        bg.addChild(labelNumero);

        return pedra;
    }
});

var Tabuleiro = cc.Sprite.extend({
    _pedras: null,
    aguardarComputador:false,
    pedraSelecionada:null,
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
        p = new Pedra();
        this._pedras = [
            [p.laranja(nl[0], 0, 0), null, p.laranja(nl[1], 0, 2), null, p.laranja(nl[2], 0, 4), null, p.laranja(nl[3], 0, 6), null, p.laranja(nl[4], 0, 7), null, p.laranja(nl[5], 0, 9)],
            [null, p.laranja(nl[6], 1, 1), null, p.laranja(nl[7], 1, 3), null, p.laranja(nl[8], 1, 5), null, p.laranja(nl[9], 1, 7), null, p.laranja(nl[10], 1, 9), null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null, null],
            [p.azul(na[5], 6, 0), null, p.azul(na[6], 6, 2), null, p.azul(na[7], 6, 4), null, p.azul(na[8], 6, 6), null, p.azul(na[9], 6, 8), null, p.azul(na[10], 6, 10)],
            [null, p.azul(na[0], 7, 1), null, p.azul(na[1], 7, 3), null, p.azul(na[2], 7, 5), null, p.azul(na[3], 7, 7), null, p.azul(na[4], 7, 9), null]
        ];
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
    init:function() {
        //var bg = cc.Sprite.create(res.tabuleiro_png);




        var branca = function() {
            var branca = bg = cc.Sprite.create(res.pedra_branca_png);
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

        var casas = [
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()],
            [branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca()],
            [cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza(), branca(), cinza()]
        ];

        var outer = this;
        for (var i = 0; i < casas.length; i++) {
            for (var j = 0; j < casas[i].length; j++) {
                var pedra = casas[i][j];

                pedra.setPosition(120 * j, (120 * Math.abs((i - 8))));
                /*pedra.attr({
                    x: (120 * j - 600),
                    y: (120 * Math.abs((i - 8)) - 580),
                    scale:1.0
                });*/
                this.addChild(pedra);

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




                                var newPxt = 0;
                                var newPyt = 0;
                                out2:
                                    for (i = 0; i < casas.length; i++) {
                                        for (j = 0; j < casas[i].length; j++) {
                                            var casa = casas[i][j];
                                            if (casa != null) {
                                                if (casa == target) {
                                                    newPxt = j;
                                                    newPyt = i;
                                                    break out2;
                                                }

                                            }
                                        }
                                    }


                                if (outer.pedraSelecionada == null) {
                                    return false;
                                }

                                function checarFimDeJogo() {

                                    var pedras = outer.getPedras();
                                    numeroPedrasOponente = 0;
                                    numeroPedrasJogador = 0;
                                    for (i = 0; i < pedras.length; i++) {
                                        for (j = 0; j < pedras[i].length; j++) {

                                            var pedra = pedras[i][j];
                                            if (pedra == null) {
                                                continue;
                                            }
                                            if (pedra.getCor() == "azul") {
                                                numeroPedrasJogador++;
                                            } else {
                                                numeroPedrasOponente++;
                                            }


                                        }
                                    }



                                    if (numeroPedrasOponente == 0) {
                                        //Fim de jogo
                                        var gameOverScene = new GameOverScene();
                                        gameOverScene.init({ jogador:outer.getParent().getParent().dJogo.nomeJogador, sucesso:true, pontuacao:outer.getParent().getParent().dJogo.pontuacaoJogador});
                                        cc.director.runScene(cc.TransitionFade.create(0.5, gameOverScene));
                                        return true;
                                    }

                                    if (numeroPedrasJogador == 0) {
                                        //Fim de jogo
                                        var gameOverScene = new GameOverScene();
                                        gameOverScene.init({ jogador:outer.getParent().getParent().dJogo.nomeJogador, sucesso:false, pontuacao:outer.getParent().getParent().dJogo.pontuacaoJogador});
                                        cc.director.runScene(cc.TransitionFade.create(0.5, gameOverScene));
                                        return true;
                                    }

                                    return false;

                                }



                                var dirX = outer.pedraSelecionada.coluna < newPxt ? 120 : -120;
                                var dirY = outer.pedraSelecionada.linha < newPyt ? -120 : 120;


                                if (outer.pedraSelecionada.getColuna() == 0  && dirX < 0 || outer.pedraSelecionada.getLinha() == 7 && dirX < 0) {
                                    return;
                                }

                                var pedraAlvo = outer.getPedras()[newPyt][newPxt];
                                if (pedraAlvo != null) {

                                    if (pedraAlvo.getCor() == "azul") {
                                        return true;
                                    }
                                }

                                //alert(outer.pedraSelecionada.getNumero());
                                outer.removeChild(outer.getPedras()[newPyt][newPxt]);
                                outer.getPedras()[newPyt][newPxt] = outer.pedraSelecionada;
                                outer.getPedras()[outer.pedraSelecionada.linha][outer.pedraSelecionada.coluna] = null;

                                if (pedraAlvo != null) {


                                        cc.audioEngine.playEffect(res.effect_buttonClick_mp3);


                                        operacao = outer.getParent().getParent().operacao;
                                        numeroPedraJogador = outer.pedraSelecionada.getNumero();
                                        numeroPedraOponente = pedraAlvo.getNumero();


                                        function shuffle(o){ //v1.0
                                            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                                            return o;
                                        };

                                        if (operacao == "+") {
                                            alternativas = [];
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

                                        function obterMaiorPedra(pedras) {
                                            var maiorPedra = null;
                                            for (i = 0; i < pedras.length; i++) {
                                                if (maiorPedra == null) {
                                                    maiorPedra = pedras[i];
                                                    continue;
                                                } else {
                                                    var pedra = pedras[i];
                                                    if (pedra.getNumero() > maiorPedra.getNumero()) {
                                                        maiorPedra = pedra;
                                                        continue;
                                                    }
                                                }
                                            }
                                            return maiorPedra;
                                        }


                                        function obterMenorPedra(pedras) {
                                            var maiorPedra = null;
                                            for (i = 0; i < pedras.length; i++) {
                                                if (maiorPedra == null) {
                                                    maiorPedra = pedras[i];
                                                    continue;
                                                } else {
                                                    var pedra = pedras[i];
                                                    if (pedra.getNumero() < maiorPedra.getNumero()) {
                                                        maiorPedra = pedra;
                                                        continue;
                                                    }
                                                }
                                            }
                                            return maiorPedra;
                                        }

                                        function obterDirecaoX(pedraComputador, pedraOponente) {
                                            if (pedraOponente.getColuna() >= pedraComputador.getColuna()) {
                                                if (pedraComputador.getColuna() == 10) {
                                                    return -1;
                                                }
                                                return 1;
                                            } else {
                                                if (pedraComputador.getColuna() == 0) {
                                                    return 1;
                                                }
                                                return -1;
                                            }
                                        }

                                        function obterDirecaoY(pedraComputador, pedraOponente) {
                                            if (pedraOponente.getLinha() >= pedraComputador.getLinha()) {
                                                if (pedraComputador.getLinha() == 7) {
                                                    return 1;
                                                }
                                                return -1;
                                            } else {
                                                if (pedraComputador.getLinha() == 0) {
                                                    return -1;
                                                }
                                                return 1;
                                            }
                                        }

                                        function fazerMovimentoComputador() {
                                            outer.aguardarComputador = true;
                                            setTimeout(function() {


                                               var pedras = outer.getPedras();
                                               var pedrasComputador = [];
                                               var pedrasJogador = [];
                                               for (i = 0; i < pedras.length; i++) {
                                                   for (j = 0; j < pedras[i].length; j++) {

                                                       var pedra = pedras[i][j];
                                                       if (pedra == null) {
                                                           continue;
                                                       }
                                                       if (pedra.getCor() == "laranja") {
                                                           pedrasComputador.push(pedra);
                                                       } else {
                                                           pedrasJogador.push(pedra);
                                                       }
                                                   }
                                               }

                                                var maiorPedraComputador = null;

                                                var menorPedraJogador = obterMenorPedra(pedrasJogador);


                                                var dirX = null;
                                                var dirY = null;

                                                    var done = false;

                                                    var maiorPedra = true;

                                                    while (!done) {
                                                        if (maiorPedra) {
                                                            maiorPedraComputador = obterMaiorPedra(pedrasComputador);
                                                        } else {
                                                            var index = Math.floor(Math.random() * pedrasComputador.length);

                                                            maiorPedraComputador = pedrasComputador[index]
                                                        }

                                                        dirX = 120 * obterDirecaoX(maiorPedraComputador, menorPedraJogador);;
                                                        dirY = 120 * obterDirecaoY(maiorPedraComputador, menorPedraJogador);

                                                        var coluna = maiorPedraComputador.coluna;
                                                        var linha = maiorPedraComputador.linha;
                                                        if (dirX < 0) {
                                                            coluna--;
                                                        } else {
                                                            coluna++;
                                                        }

                                                        if (dirY < 0) {
                                                            linha++;
                                                        } else {
                                                            linha--;
                                                        }

                                                        var pedraAlvo = outer.getPedras()[linha][coluna];
                                                        if (pedraAlvo == null) {
                                                            done = true;
                                                        } else {

                                                            if (pedraAlvo.getCor() == "laranja") {
                                                                //alert(maiorPedraComputador.getNumero() + " colide com " + pedraAlvo.getNumero());
                                                                maiorPedra = false;
                                                                continue;
                                                            } else {
                                                                done = true;
                                                            }
                                                        }

                                                    }


                                                var coluna = maiorPedraComputador.coluna;
                                                var linha = maiorPedraComputador.linha;


                                                //Move da casa anterior
                                                outer.getPedras()[maiorPedraComputador.linha][maiorPedraComputador.coluna] = null;

                                                //Obtém nova casa
                                                if (dirX < 0) {
                                                    coluna--;
                                                } else {
                                                    coluna++;
                                                }

                                                if (dirY < 0) {
                                                    linha++;
                                                } else {
                                                    linha--;
                                                }

                                                //Checa se casa está vazia
                                                var pedraAlvo = outer.getPedras()[linha][coluna];

                                                //Move para a próxima casa
                                                maiorPedraComputador.coluna = coluna;
                                                maiorPedraComputador.linha = linha;
                                                outer.getPedras()[linha][coluna] = maiorPedraComputador;
                                                maiorPedraComputador.runAction(cc.Spawn.create(cc.MoveBy.create(0.5, dirX, dirY)));


                                                outer.removeChild(pedraAlvo);

                                                if (pedraAlvo != null) {



                                                    numeroPedraJogador = pedraAlvo.getNumero();
                                                    numeroPedraComputador = maiorPedraComputador.getNumero();

                                                    cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                                                    outer.removeChild(pedraAlvo);

                                                    var operacao = outer.getParent().getParent().operacao;

                                                    var resultado = 0;

                                                    if (operacao == "+") {
                                                        resultado =  numeroPedraComputador + numeroPedraJogador;
                                                    } else if (operacao == "-") {
                                                        resultado =  numeroPedraComputador - numeroPedraJogador;
                                                    } else if (operacao == "x") {
                                                        resultado = numeroPedraComputador * numeroPedraJogador;
                                                    } else if (operacao == "/") {
                                                        resultado =  numeroPedraJogador == 0 ? 0 : numeroPedraComputador / numeroPedraJogador;
                                                    }

                                                    outer.getParent().getParent().dJogo.pontuacaoOponente += resultado;


                                                    outer.getParent().getParent().atualizarPontuacao();



                                                }

                                                checarFimDeJogo();

                                                setTimeout(function() {
                                                    outer.aguardarComputador = false;
                                                }, 400);

                                            }, 500);
                                        };

                                        function atualizarPlacar(opcaoSelecionada) {

                                            var resultado = null;
                                            if (operacao == "+") {

                                                 resultado = numeroPedraJogador + numeroPedraOponente;


                                            } else if (operacao == "-") {

                                                resultado = numeroPedraJogador - numeroPedraOponente;

                                            } else if (operacao == "x") {

                                                resultado = numeroPedraJogador * numeroPedraOponente;

                                            } else if (operacao == "/") {

                                                resultado = numeroPedraJogador / numeroPedraOponente;

                                            }

                                            if (alternativas.indexOf(resultado) != opcaoSelecionada) {

                                                if (operacao == "-") {
                                                    outer.getParent().getParent().dJogo.pontuacaoJogador += resultado;
                                                } else {
                                                    outer.getParent().getParent().dJogo.pontuacaoOponente += resultado;
                                                }

                                            } else {
                                                outer.getParent().getParent().dJogo.pontuacaoJogador += resultado;
                                            }

                                            outer.getParent().getParent().atualizarPontuacao();
                                            fazerMovimentoComputador();

                                        }

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
                                                    atualizarPlacar(0);
                                                    checarFimDeJogo();
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
                                                    atualizarPlacar(1);
                                                    checarFimDeJogo();
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
                                                    atualizarPlacar(2);
                                                    checarFimDeJogo();
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
                                                    atualizarPlacar(3);
                                                    checarFimDeJogo();
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
                                    fazerMovimentoComputador();
                                }

                                outer.pedraSelecionada.coluna = newPxt;
                                outer.pedraSelecionada.linha = newPyt;

                                outer.pedraSelecionada.runAction(cc.Spawn.create(cc.MoveBy.create(0.5, dirX, dirY)));

                                outer.pedraSelecionada.getChildren()[0].opacity = 255;
                                //outer._pedras[oldPyt][oldPxt] = null;
                                //outer._pedras[newPyt][newPxt] = outer.pedraSelecionada;
                                outer.pedraSelecionada = null;





                                //outer.atualizarTabuleiro();
                                return true;
                            }
                            return false;
                        },
                        onTouchEnded: function (touch, event) {
                        }
                    });
                    cc.eventManager.addListener(listener1, pedra);
                }

            }
        }



        this.redefinirPedras();
    }
});

var GameSceneJogadorVsJogador = cc.Scene.extend({
    onEnter:function () {
        this._super();
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic(true);
        cc.audioEngine.playMusic(res.RiversideRide_mp3, true);

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

                cc.director.runScene(cc.TransitionFade.create(0.5, new TitleScene()));
            },
            this
        );
        itemVoltar.attr({
            x: size.width / 2,
            y: size.height / 2 - 345,
            scale: 0.5
        });


        var itemOk = cc.MenuItemImage.create(
            res.comecar_branco_png,
            res.comecar_branco_png,
            function() {


                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                var scene = new GameSceneJogadorVsComputador();
                if (this._operacao == "soma") {
                    scene.operacao = "+";
                } else if (this._operacao == "subtracao") {
                    scene.operacao = "-";
                } else if (this._operacao == "multiplicacao") {
                    scene.operacao = "x";
                } else if (this._operacao == "divisao") {
                    scene.operacao = "/";
                    scene.opcao = this._opcao;
                }
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
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