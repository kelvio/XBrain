
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