
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