
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