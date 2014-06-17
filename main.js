cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(1920, 1080, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(cc.TransitionFade.create(0.5, new IntroScene()));
    }, this);

};
cc.game.run();