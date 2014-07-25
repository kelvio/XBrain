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
            //setTimeout(function() {
                logoSprite.runAction(cc.MoveBy.create(1.0, cc.p(0, size.height / 2 - 200)));
            //}, 2500);
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
            y: (size.height / 2) + 110,
            scale: 1.0
        });

        var l = cc.LabelTTF.create(s.current.jogador_vs_computador, "Arial", 40);
        l.x = itemJogadorVsComputador.width / 2;
        l.y = itemJogadorVsComputador.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        itemJogadorVsComputador.addChild(l);



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
            y: size.height / 2,
            scale: 1.0
        });

        var l = cc.LabelTTF.create(s.current.jogador_vs_jogador, "Arial", 40);
        l.x = itemJogadorVsJogador.width / 2;
        l.y = itemJogadorVsJogador.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        itemJogadorVsJogador.addChild(l);

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
            y: size.height / 2 - 130,
            scale: 1.0
        });

        var l = cc.LabelTTF.create(s.current.como_jogar, "Arial", 40);
        l.x = itemComoJogar.width / 2;
        l.y = itemComoJogar.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        itemComoJogar.addChild(l);



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

        var l = cc.LabelTTF.create(s.current.sobre_o_jogo, "Arial", 40);
        l.x = itemSobreOJogo.width / 2;
        l.y = itemSobreOJogo.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        itemSobreOJogo.addChild(l);

        var itemIdioma = cc.MenuItemImage.create(
            res.sobre_o_jogo_png,
            res.sobre_o_jogo_png,
            function() {
                cc.audioEngine.playEffect(res.effect_buttonClick_mp3);
                cc.director.runScene(cc.TransitionFade.create(0.5, new IdiomaScene()));
            },
            this
        );
        itemIdioma.attr({
            x: size.width / 2,
            y: size.height / 2  - 350,
            scale: 1.0
        });

        var l = cc.LabelTTF.create(s.current.idioma, "Arial", 40);
        l.x = itemIdioma.width / 2;
        l.y = itemIdioma.height / 2;
        l.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        itemIdioma.addChild(l);

        var outer = this;

        if (!this._quiet) {
            //setTimeout(function() {
                var menu = cc.Menu.create(itemJogadorVsComputador, itemJogadorVsJogador, itemComoJogar, itemSobreOJogo, itemIdioma);
                menu.setPosition(0,0);
                //menu.setVisible(false);
                outer.addChild(menu);
            //}, 4000);
        } else {
            var menu = cc.Menu.create(itemJogadorVsComputador, itemJogadorVsJogador, itemComoJogar, itemSobreOJogo, itemIdioma);
            menu.setPosition(0,0);
            this.addChild(menu);
        }
    }
});
