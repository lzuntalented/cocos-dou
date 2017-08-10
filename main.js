cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
    	var size = cc.director.getWinSize();
		PUBLIC.SCREEN_WIDTH = size.width;
		PUBLIC.SCREEN_HEIGHT = size.height;
		
        cc.director.runScene(new HelloWorldScene());
    }, this);
};
cc.game.run();