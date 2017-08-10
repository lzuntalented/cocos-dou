var CardSprite = cc.Sprite.extend({
	_cardPropect : null,
	
	ctor : function(pro){
		this._super(res.Poker_png);
		this._cardPropect = pro;
		
		var x = PUBLIC.CARD_WIDTH * (pro.val - 1);
		var y = PUBLIC.CARD_HEIGHT * (pro.color);
		
		if(pro.val == 14){
			x = 0 ;
			y = PUBLIC.CARD_HEIGHT * 4;
		}
		
		if(pro.val == 15){
			x = PUBLIC.CARD_WIDTH ;
			y = PUBLIC.CARD_HEIGHT * 4;
		} 
		
		this.setTextureRect(
				cc.rect(
					x,
					y,
					PUBLIC.CARD_WIDTH,
					PUBLIC.CARD_HEIGHT
				)
			);
	}
});

