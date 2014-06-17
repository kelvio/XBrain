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

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

/* Title */
var TitleBgLayer = cc.Layer.extend({
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

        //BG
        this.sprite = cc.Sprite.create(res.XBrainLogoTitle_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);
        return true;
    }
});

var TitleMenuLayer = cc.Scene.extend({
    onEnter: function() {

        var size = cc.director.getWinSize();

        //MENU
        //var jogadorVsComputadorSprite = cc.Sprite.create(res.jogador_x_computador_png);
        /*var jogadorVsJogadorSprite = cc.Sprite.create(res.jogador_x_jogador_png);
         var comoJogarSprite = cc.Sprite.create(res.como_jogar_png);
         var opcoesSprite = cc.Sprite.create(res.opcoes_png);
         var sobreOJogoSprite = cc.Sprite.create(res.sobre_o_jogo_png);


        */
        //var gameSettings = cc.MenuItemSprite.create(gameSettingsNormal, gameSettingsSelected, gameSettingsDisabled, this.onSettings, this);
        //var about = cc.MenuItemSprite.create(aboutNormal, aboutSelected, aboutDisabled, this.onAbout, this);

        //var jogadorVsComputadorMIS = cc.MenuItemSprite.create(jogadorVsComputadorSprite, jogadorVsComputadorSprite, jogadorVsComputadorSprite, function () {});

        this.sprite = cc.Sprite.create  (res.jogador_x_computador_png);
        this.sprite.attr({
            x: size.width / 2,
            y: (size.height / 2) + 160,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);

        this.sprite = cc.Sprite.create(res.jogador_x_jogador_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2 + 50,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);

        this.sprite = cc.Sprite.create(res.como_jogar_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2 - 120,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);

        this.sprite = cc.Sprite.create(res.opcoes_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2  - 240,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);

        this.sprite = cc.Sprite.create(res.sobre_o_jogo_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2 - 360,
            scale: 1.0
        });
        this.addChild(this.sprite, 0);


        /* var menu = cc.Menu.create(jogadorVsComputadorMIS, jogadorVsComputadorMIS, jogadorVsComputadorMIS);
         menu.alignItemsVerticallyWithPadding(10);
         this.addChild(menu, 1, 2);

         menu.x = size.width / 2;
         menu.y = size.height / 2; */

    }
});

var TitleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var bgLayer = new TitleBgLayer();
        var menuLayer = new TitleMenuLayer();

        this.addChild(bgLayer);
        this.addChild(menuLayer);
    }
});


/* GameOver */
var GameOverScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
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
        cc.audioEngine.playMusic(res.TheBrotherINeverHad_mp3, true);
        setTimeout(function() {
            //Director::getInstance()->replaceScene(CCTransitionFade::create(0.5,newScene));
            //cc.director.replaceScene(cc.TransitionFade.create(0.5, new TitleScene()));
            cc.director.runScene(cc.TransitionFade.create(0.5, new TitleScene()));
        }, 2000);

    }
});