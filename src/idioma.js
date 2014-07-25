
/* Sobre o jogo */
var IdiomaLayer = cc.LayerColor.extend({
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

        var titulo = cc.LabelTTF.create(s.current.idioma, "Arial", 55);
        titulo.setColor(cc.color(119, 110, 101));
        titulo.x = size.width / 2;
        titulo.y = size.height / 2 + 490;
        titulo.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        // add the label as a child to this layer
        this.addChild(titulo, 6);


        var itemPortugues = cc.MenuItemImage.create(
            res.jogador_x_computador_png,
            res.jogador_x_computador_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                s.current = s.pt;
                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemPortugues.attr({
            x: size.width / 2,
            y: (size.height / 2) + 110,
            scale: 1.0
        });

        var l = cc.LabelTTF.create("Português", "Arial", 40);
        l.x = itemPortugues.width / 2;
        l.y = itemPortugues.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        itemPortugues.addChild(l);



        var itemIngles = cc.MenuItemImage.create(
            res.jogador_x_jogador_png,
            res.jogador_x_jogador_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                s.current = s.en;
                var scene = new TitleScene();
                scene.setQuiet(true);
                cc.director.runScene(cc.TransitionFade.create(0.5, scene));
            },
            this
        );
        itemIngles.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });

        var l = cc.LabelTTF.create("English", "Arial", 40);
        l.x = itemIngles.width / 2;
        l.y = itemIngles.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        itemIngles.addChild(l);



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


        var menu = cc.Menu.create(itemPortugues, itemIngles, itemVoltar);
        menu.setPosition(0,0);
        this.addChild(menu, 10);

        return true;
    }
});

var IdiomaScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new IdiomaLayer());
    }
});
