var CardManager = cc.Class.extend({
	_role : null,
	_gameScene : null,
	
	_roleMain : null,//主角，即我
	_roleBefore : null,//上家
	_roleAfter : null,//下家
	
	_roleList : null,//角色列表，0=>_roleMain,1=>_roleAfter,2=>_roleBefore
	
	
	_lastThreeCard : [],//3张底牌
	
	_sendCardIndex : 0,//当前出牌角色
	_cardLoop : 0,//上手牌的角色
	
	_sendCardList : [],
	_sendCardType : 0,
	
	ctor : function(gameScene){
		this._gameScene = gameScene;
		
		this._role = initArrayWithDefault(3,17,null);
		this.dealCard(this,0);
//		console.log("分配角色");
		
		this.init();
	},
	
	/*分发鼠标点击事件给角色*/
	giveTouchEvent : function(x,y){
		this._roleMain.selectCard(x,y);
	},
	
	/*初始化*/
	init : function(){
		var label = cc.LabelTTF.create("出牌","Aria",32);
		var item_label = new cc.MenuItemLabel(label,this.giveSendCardEvent,this);
		item_label.x = PUBLIC.SCREEN_WIDTH / 2;
		item_label.y = PUBLIC.CARD_HEIGHT + 150;
		
		var label1 = cc.LabelTTF.create("不出","Aria",32);
		var item_label1 = new cc.MenuItemLabel(label1,this.giveNotSendCardEvent,this);
		item_label1.x = PUBLIC.SCREEN_WIDTH / 2 - 100;
		item_label1.y = PUBLIC.CARD_HEIGHT + 150;
		
		var menu = new cc.Menu(item_label,item_label1);
		menu.x = menu.y = 0;
		this._gameScene.addChild(menu);
		
		this.initLastThreeCard();
	},
	
	/*初始化底牌显示
	 *@param tag 设置的话表示，要分配底牌给地主了
	 */
	initLastThreeCard : function(tag){
		var config = {//底牌显示的默认配置
			x : PUBLIC.SCREEN_WIDTH / 2,
			y : PUBLIC.SCREEN_HEIGHT,
			anchorY : 1
		};
		
		var rect = cc.rect(
					PUBLIC.CARD_WIDTH * 2,
					PUBLIC.CARD_HEIGHT * 4,
					PUBLIC.CARD_WIDTH,
					PUBLIC.CARD_HEIGHT
			);
		
		/*
		 * 创建三张底牌
		 */
		var sp1 = new cc.Sprite(res.Poker_png);
		var sp2 = new cc.Sprite(res.Poker_png);
		var sp3 = new cc.Sprite(res.Poker_png);
		
		/*地主未知
		 *显示背面
		 */
		sp1.setTextureRect(rect);
		sp2.setTextureRect(rect);
		sp3.setTextureRect(rect);
		
		if(tag){//要分配给地主底牌了
			/*重新创建三张底牌*/
			sp1 = new CardSprite(allCard[0]);
			sp2 = new CardSprite(allCard[1]);
			sp3 = new CardSprite(allCard[2]);
			
			/*将底牌存储起来*/
			this._lastThreeCard.push(allCard[0]);
			this._lastThreeCard.push(allCard[1]);
			this._lastThreeCard.push(allCard[2]);
		}
		
		
		sp1.attr(config);
		this._gameScene.addChild(sp1,1);
		
		sp2.attr(config);
		sp2.x -= PUBLIC.CARD_WIDTH;
		this._gameScene.addChild(sp2,1);
		
		sp3.attr(config);
		sp3.x += PUBLIC.CARD_WIDTH;
		this._gameScene.addChild(sp3,1);
	},
	
	/*分发出牌事件
	 *出牌情况：
	 * 1.出第一手牌
	 * 	1.1获取选择的牌
	 * 2.准备要上家牌
	 */
	giveSendCardEvent : function(){
		if(gameState != GAME.GAME_STATUS_START)
			return ;
			
		if(this._sendCardIndex != 0){
			alert("未到您出牌！");
			return ;
		}
		
		var select = this._roleMain.getSelectCard();
		var type = checkCardType(select);
//		console.log(type);
		
		if(type > 0){//是正确的牌型
			if(this._cardLoop == 3 || this._cardLoop == 0){//我先出牌
				this._roleMain.clearCardFromDesket(this._gameScene,select);
				
				this._sendCardList = select;
				this._sendCardType = type;
				
				this._sendCardIndex = 1;
				this._cardLoop = 1;
				this._roleMain.sendCard();
			}else{//要上手的牌
				if(compareCard(select,this._sendCardList,this._sendCardType,type)){//大于上手牌
					this._roleMain.clearCardFromDesket(this._gameScene,select);
					
					this._sendCardList = select;
					this._sendCardType = type;
					
					this._sendCardIndex = 1;
					this._cardLoop = 1;
					this._roleMain.sendCard();
				}else{
					alert("您选择的牌型小于上手牌！");
				}
				
			}
			
		}
		
	},
	
	/*分发主角不出牌事件*/
	giveNotSendCardEvent : function(){
		if(gameState != GAME.GAME_STATUS_START)
			return ;
			
		if(this._sendCardIndex == 0 && this._cardLoop != 3 && this._cardLoop != 0){
			this._roleMain.clearCardFromDesket(this._gameScene);
			
			this._cardLoop ++;
			this._sendCardIndex = 1;
		}else{
			alert("未到您出牌的顺序！");
		}
	},
	
	/*分发机器人出牌事件*/
	giveAISendCardEvent : function(){
		if(this._sendCardIndex == 0)
			return ;
			
		if(this._sendCardIndex != 1 && this._sendCardIndex != 2)
			return ;
			
		console.log("轮到" + this._sendCardIndex+ "机器人出牌了！");
		
		if(this._cardLoop == 3 || this._cardLoop == 0){//我先出牌
			var select = this._roleList[this._sendCardIndex % 3]._ai.mmgGetCardFirst();
			var type = checkCardType(select);
			
			this._roleList[this._sendCardIndex].clearCardFromDesket(this._gameScene,select);
			this._sendCardList = select;
			this._sendCardType = type;
			
			this._roleList[this._sendCardIndex]._ai.mmSendCardFirst();
			this._sendCardIndex = (this._sendCardIndex + 1) % 3;
			this._cardLoop = 1;
		}else{//要上手的牌
			var select = this._roleList[this._sendCardIndex].getMinBigCardList(this._sendCardList,this._sendCardType);
			if(select){//大于上手牌
				console.log(select);	
				
				this._roleList[this._sendCardIndex]._arraySelect = select;
				this._roleList[this._sendCardIndex]._ai.mmSendCardFirst();
				
				this._roleList[this._sendCardIndex].clearCardFromDesket(this._gameScene,select);
				this._sendCardList = select;
				
				var type = checkCardType(select);
				this._sendCardType = type;
				
				this._roleList[this._sendCardIndex % 3]._ai.mmSendCardFirst();
				this._sendCardIndex = (this._sendCardIndex + 1) % 3;
				this._cardLoop = 1;
			}else{
				this.giveNotAISendCardEvent();
			}
		}
		
	},
	
	/*分发机器人不出牌事件*/
	giveNotAISendCardEvent : function(){
		if(this._sendCardIndex == 0)
			return ;
		console.log(this._sendCardIndex + "机器人不要");	
		this._roleList[this._sendCardIndex].clearCardFromDesket(this._gameScene);
		this._roleList[this._sendCardIndex]._ai.mmNoCardBig();
		
		this._cardLoop ++;
		this._sendCardIndex = (this._sendCardIndex + 1) % 3;
		
		
	},
	
	/**
	 * 显示地主标示
	 */
	showMajorSign : function(idx){
		var _addLabel = cc.LabelTTF.create("地主","Aria",16);
		var len = 17 + 3;
		var x = PUBLIC.CARD_WIDTH * 2 ;
		var y = PUBLIC.CARD_HEIGHT / 2;
		if(idx == 1){
			x = PUBLIC.CARD_WIDTH / 2;
			y = PUBLIC.SCREEN_HEIGHT - 20;
		}else if(idx == 2){
			x = PUBLIC.SCREEN_WIDTH - PUBLIC.CARD_WIDTH / 2;
			y = PUBLIC.SCREEN_HEIGHT - 20;
		}
		_addLabel.x = x;
		_addLabel.y = y;
		
		this._gameScene.addChild(_addLabel);
	},
	
	/*
	 * 游戏要开始了
	 * 分发发牌动画结束事件
	 * 进行游戏角色分配
	 */
	giveGameStartEvent : function(){
		var index = Math.floor(Math.random() * 3);//随机地主
//		index = 0;
		this._sendCardIndex = index;//设置地主先出牌
		this.showMajorSign(index);
		
		console.log("地主idx=" + index);
		
		/*创建3张底牌，分配到角色手中*/
		var sp1 = new CardSprite(allCard[0]);
		var sp2 = new CardSprite(allCard[1]);
		var sp3 = new CardSprite(allCard[2]);

		this._gameScene.addChild(sp1);
		this._gameScene.addChild(sp2);
		this._gameScene.addChild(sp3);

		this._role[index].push(sp1);
		this._role[index].push(sp2);
		this._role[index].push(sp3);
		
		/*初始化角色类*/
		this._roleMain = new Role(this._role[0]);//主角
		this._roleBefore = new Role(this._role[1]);//下家
		this._roleAfter = new Role(this._role[2]);//上家
		
		/*初始化角色AI管理器，并分配AI策略*/
		var beforeAI = new AIRole(this._roleBefore,1);
		var afterAI = new AIRole(this._roleAfter,2);
		this._roleBefore._ai = beforeAI;
		this._roleAfter._ai = afterAI;
		
		this._gameScene.addChild(beforeAI._addLabel);
		this._gameScene.addChild(afterAI._addLabel);
		
		this._roleList = [this._roleMain,this._roleBefore,this._roleAfter];
		
		this._roleMain.arrangeCard();//主角整理手中的牌
		this._roleBefore._ai.mmArrangeCard();
		this._roleAfter._ai.mmArrangeCard();
		
		this._gameScene.beginGame();		
	},
	
	/*发牌动画*/
	dealCard : function (self,idx){
		if(idx >= 54 - 3){
			
			this.initLastThreeCard(true);
			this.giveGameStartEvent();
			return ;
		}
		
		var winSize = cc.winSize;//获取屏幕设计尺寸
		
		var index = Math.floor(Math.random() * allCard.length);//随机牌的序列
		var result = allCard[index];//取出随机牌的属性
		
		var card = new CardSprite(result);
		card.x = winSize.width / 2;
		card.y = winSize.height / 2;
		
		this._role[idx % 3][Math.floor(idx / 3)] = card;
		allCard.splice(index,1);//剔除使用的牌
		
		this._gameScene.addChild(card);
		
		if(idx % 3 == 0 ){
			var startPos = (PUBLIC.SCREEN_WIDTH - 17 * PUBLIC.CARD_SHOW_SPACE) / 2;
			var position = cc.p(startPos + PUBLIC.CARD_SHOW_SPACE * Math.floor(idx / 3),PUBLIC.CARD_HEIGHT / 2);
		}else if( idx % 3 == 1){
			var startPos = PUBLIC.SCREEN_HEIGHT - (PUBLIC.SCREEN_HEIGHT - 17 * PUBLIC.CARD_SHOW_SPACE) / 2;
			var position = cc.p(PUBLIC.CARD_WIDTH / 2 , startPos - PUBLIC.CARD_SHOW_SPACE * Math.floor(idx / 3));
		}else if(idx % 3 == 2){
			var startPos = PUBLIC.SCREEN_HEIGHT - (PUBLIC.SCREEN_HEIGHT - 17 * PUBLIC.CARD_SHOW_SPACE) / 2;
			var position = cc.p(PUBLIC.SCREEN_WIDTH - PUBLIC.CARD_WIDTH / 2 , startPos - PUBLIC.CARD_SHOW_SPACE * Math.floor(idx / 3));
		}
		
		card.runAction(cc.sequence(
			cc.moveTo(0.05,position),
			cc.callFunc(this.dealCard,this,idx + 1)
		));
	}
	
});