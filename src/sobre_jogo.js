
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

        var titulo = cc.LabelTTF.create(s.current.sobre_o_jogo, "Arial", 55);
        titulo.setColor(cc.color(119, 110, 101));
        titulo.x = size.width / 2;
        titulo.y = size.height / 2 + 490;
        titulo.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        // add the label as a child to this layer
        this.addChild(titulo, 6);


        var texto = s.current.texto_sobre_jogo;

        var sobreLabel = cc.LabelTTF.create(texto, "Arial", 30);
        sobreLabel.setColor(cc.color(119, 110, 101));
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
