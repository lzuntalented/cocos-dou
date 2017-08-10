
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

var GameLayer = cc.Layer.extend({
	
	_cardManager : null,
	
	onEnter:function () {
        this._super();
        
		_self=this;
		var size=cc.director.getWinSize();
		
		this._cardManager = new CardManager(this);
		var self = this;
		cc.eventManager.addListener({
        	event:cc.EventListener.TOUCH_ONE_BY_ONE,
        	swallowTouches: true,
        	onTouchBegan:  function(touch, event){
        		if(gameState != GAME.GAME_STATUS_START)
        			return false;
	            var endTouch  = touch.getLocation();
//	            console.log(endTouch.x + " =" + endTouch.y);
	            self._cardManager.giveTouchEvent(endTouch.x,endTouch.y);
//      		role.selectCard(endTouch.x,endTouch.y);
	        	return true;
	    	}
        },this);
        
	},
	
	update : function(dt){
		if(gameState == GAME.GAME_STATUS_START){
			var list = this._cardManager._roleList;
			for (var i = 0; i < list.length; i++) {
				if(list[i]._arrayCard.length ==0){
					gameState = GAME.GAME_STATUS_DEFAULT;
					if(i == 0)
						alert("恭喜，您赢了！可以刷新再战哟！");
					else
						alert("很遗憾，您输了！请刷新重玩吧！");
				}
			}
			
			this._cardManager.giveAISendCardEvent();
		}
			
	},
	
	beginGame : function(){
		gameState = GAME.GAME_STATUS_START;
		this.scheduleUpdate();
	},
	
	
	_initArrayWithDefault:function(arr,def){
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				arr[i][j]=def;
			}
		}
	},
	
	
});
