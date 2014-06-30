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