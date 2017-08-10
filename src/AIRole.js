var AIRole = cc.Class.extend({
	_role : null,
	_type : 1,
	_addLabel : false,
	
	ctor : function(role,type){
		this._role = role;
		this._type = type;
		
		this.initAddLabel();
	},
	
	initAddLabel : function(){
		this._addLabel = cc.LabelTTF.create("不出","Aria",32);
		this._addLabel.y = PUBLIC.SCREEN_HEIGHT / 2;
		if(this._type == 1){
			this._addLabel.x = PUBLIC.CARD_WIDTH * 2;
		}else{
			this._addLabel.x = PUBLIC.SCREEN_WIDTH - PUBLIC.CARD_WIDTH * 2;
		}
		this._addLabel.runAction(cc.hide());
	},
	
	/*模拟出牌动作*/
	mmSendCardFirst : function(){
		var list = this._role._arraySelect;
		for (var i = 0; i < list.length; i++) {
			list[i].zIndex = -1;
			if(this._type == 1)
				list[i].x = PUBLIC.CARD_WIDTH * 2;
			else
				list[i].x = PUBLIC.SCREEN_WIDTH - PUBLIC.CARD_WIDTH * 2;
				
			for (var j = 0; j < this._role._arrayCard.length; j++) {
				if(list[i] === this._role._arrayCard[j]){
					this._role._arrayCard.splice(j,1);
					break;
				}
			}
		}
		
		this._role._arraySelect = [];
		this.mmArrangeCard();
		
	},
	
	/*模拟选牌动作
	 *最为一手出牌
	 */
	mmgGetCardFirst : function(){
		sortCard(this._role._arrayCard);
		var list = getAllot(this._role._arrayCard);
		this._role._arraySelect = list[0];
		return this._role._arraySelect;
	},
	
	mmArrangeCard : function(){
		this._addLabel.runAction(cc.hide());
		sortCard(this._role._arrayCard);
		for (var i = 0; i < this._role._arrayCard.length; i++) {
			var item = this._role._arrayCard[i];
			
			if(this._type == 1){
				item.x = PUBLIC.CARD_WIDTH / 2;
			}else{
				item.x = PUBLIC.SCREEN_WIDTH - PUBLIC.CARD_WIDTH / 2;
			}
			
			item.y = PUBLIC.SCREEN_HEIGHT - (PUBLIC.SCREEN_HEIGHT - this._role._arrayCard.length * PUBLIC.CARD_SHOW_SPACE)/2 - i * PUBLIC.CARD_SHOW_SPACE;
			item.zIndex = i + 1;
		}
	},
	
	mmNoCardBig : function(){
		this._addLabel.runAction(cc.show());
	}
});