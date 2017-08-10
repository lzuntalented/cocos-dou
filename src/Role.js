/*用户角色*/
var Role = cc.Class.extend({
	_arrayCard : null,//手中牌数组 &一维数组
	_arraySelect : [],//选择牌型数组 &一维数组
	
	_ai : null,
	
	_lastCard : [],//上一手牌 &一维数组
	
	/*初始化过程
	 *arrayCard 一维数组
	 */
	ctor : function(arrayCard){
		this._arrayCard = arrayCard;
	},
	
	/*根据坐标点执行选中牌型动作*/
	selectCard : function(x,y){
		for (var i = 0; i < this._arrayCard.length; i++) {
			/*最后一张选牌响应整个牌的点击*/
			if(i == this._arrayCard.length - 1 
				&& Math.abs(x - (this._arrayCard[i].x - PUBLIC.CARD_WIDTH /  2)) < PUBLIC.CARD_WIDTH
				&& Math.abs(this._arrayCard[i].y - y) < PUBLIC.CARD_HEIGHT / 2){
				
				if(this._arrayCard[i].select == 1){
					this._arrayCard[i].y -= PUBLIC.CARD_SELECT_SPACE;
					this._arrayCard[i].select = 0;
				}else{
					this._arrayCard[i].y += PUBLIC.CARD_SELECT_SPACE;
					this._arrayCard[i].select = 1;
				}
				
				break;
			}
			if(Math.abs(x - (this._arrayCard[i].x - PUBLIC.CARD_WIDTH /  2)) < PUBLIC.CARD_SHOW_SPACE
				&& Math.abs(this._arrayCard[i].y - y) < PUBLIC.CARD_HEIGHT / 2){
				
				if(this._arrayCard[i].select == 1){
					this._arrayCard[i].y -= PUBLIC.CARD_SELECT_SPACE;
					this._arrayCard[i].select = 0;
				}else{
					this._arrayCard[i].y += PUBLIC.CARD_SELECT_SPACE;
					this._arrayCard[i].select = 1;
				}
				
				break;
			}
		}
	},
	
	/*获取选中牌数组*/
	getSelectCard : function(){
		var result = [];
		for (var i = 0; i < this._arrayCard.length; i++) {
			if(this._arrayCard[i].select == 1){
				result.push(this._arrayCard[i]);
			}
		}
		
		return result;
	},
	
	/*出牌动作*/
	sendCard : function(){
		var list = this.getSelectCard();
		for (var i = 0; i < list.length; i++) {
			list[i].y = PUBLIC.CARD_HEIGHT + PUBLIC.CARD_SELECT_SPACE;
			list[i].zIndex = -1;
			
			for (var j = 0; j < this._arrayCard.length; j++) {
				if(list[i] === this._arrayCard[j]){
					this._arrayCard.splice(j,1);
					break;
				}
			}
		}
		
		this._arraySelect = [];
		this.arrangeCard();
	},
	
	/*整理手中的牌*/
	arrangeCard : function(){
		sortCard(this._arrayCard);
		for (var i = 0; i < this._arrayCard.length; i++) {
			this._arrayCard[i].x = PUBLIC.CARD_SHOW_SPACE * i + (PUBLIC.SCREEN_WIDTH - this._arrayCard.length * PUBLIC.CARD_SHOW_SPACE) / 2;
			this._arrayCard[i].y = PUBLIC.CARD_HEIGHT / 2;
			this._arrayCard[i].zIndex = i + 1;
		}
	},
	
	/*从桌面清理掉上手牌*/
	clearCardFromDesket : function(scene,list){
		for(var i = 0;i < this._lastCard.length ;i++){
			scene.removeChild(this._lastCard[i]);
		}
		this._lastCard = list || [];
	},
	
	/*获取可以大于上家的最小牌型
	 *@param list 上手牌
	 *@param type 上手牌型
	 */
	getMinBigCardList : function(list,type){
//		var list = getAllot(this._arrayCard);
		var ptype = type % (list.length * 10);
		switch (ptype){
			case pModel.SINGLE:
				sortCard(this._arrayCard);
				for (var i = 0; i < this._arrayCard.length; i++) {
					if(this._arrayCard[i]._cardPropect.val > list[0]._cardPropect.val){
						this._arraySelect.push(this._arrayCard[i]);
						return this._arraySelect;
					}
				}
				break;
			case pModel.DOUBLE:
				tmp = hasTwoKing(this._arrayCard);
				if(tmp){
					return hasTwoKing(this._arrayCard);
				}
				
				tmp = hasFourSame(this._arrayCard);
				if(tmp){
					return tmp;
				}
				
				var count = list.length;
				var len = Math.floor(count / 2);
				
				sortCard(this._arrayCard);
				arr = getAllot(this._arrayCard);
				
				var idx = 0;
				var temp = [];
				for(var i = 0;i < arr.length ; i ++){
					if (idx == len){
						return changeMinBigCardTo1(temp);
					}
					
					if(arr[i].length == 2){
						if(idx == 0 && arr[i][0]._cardPropect.val > list[0]._cardPropect.val ){
							temp = [];
							idx = 1;
							temp.push(arr[i]);
							continue;
						}else if(idx > 0 && idx < len){
							++idx;
							temp.push(arr[i]);
							continue;
						}
					}
					
					idx = 0;
				}
				break;
			case pModel.THREE:
				tmp = hasTwoKing(this._arrayCard);
				if(tmp){
					return hasTwoKing(this._arrayCard);
				}
				
				tmp = hasFourSame(this._arrayCard);
				if(tmp){
					return tmp;
				}
				
				var count = list.length;
				var len = Math.floor(count / 3);
				
				sortCard(this._arrayCard);
				arr = getAllot(this._arrayCard);
				
				var idx = 0;
				var temp = [];
				for(var i = 0;i < arr.length ; i ++){
					if (idx == len){
						return changeMinBigCardTo1(temp);
					}
					
					if(arr[i].length == 3){
						if(idx == 0 && arr[i][0]._cardPropect.val > list[0]._cardPropect.val ){
							temp = [];
							idx = 1;
							temp.push(arr[i]);
							continue;
						}else if(idx > 0 && idx < len){
							++idx;
							temp.push(arr[i]);
							continue;
						}
					}
					
					idx = 0;
				}
				break;
			case pModel.FOUR:
				tmp = hasTwoKing(this._arrayCard);
				if(tmp){
					return hasTwoKing(this._arrayCard);
				}
				
				/*整理牌型序列*/
				sortCard(this._arrayCard);
				arr = getAllot(this._arrayCard);
				
				for(var i = 0;i < arr.length ; i ++){
					if(arr[i].length == 4){
						if(arr[i][0]._cardPropect.val > list[0]._cardPropect.val ){
							return arr[i];
						}
					}
				}
				break;
			case pModel.ORDER:
				tmp = hasTwoKing(this._arrayCard);
				if(tmp){
					return hasTwoKing(this._arrayCard);
				}
				
				tmp = hasFourSame(this._arrayCard);
				if(tmp){
					return tmp;
				}
				
				if(list.length > this._arrayCard){//手中牌数少于上手牌
					return false;	
				}
				
				var idx = 0;
				
				for(var i = 0;i < arr.length ; i ++){
					if (idx == len){
						return changeMinBigCardTo1(temp);
					}
					
					if(arr[i][0]._cardPropect.val < 13){
						if(idx == 0 && arr[i][0]._cardPropect.val > list[0]._cardPropect.val ){
							temp = [];
							idx = 1;
							temp.push(arr[i]);
							continue;
						}else if(idx > 0 && idx < len){
							++idx;
							temp.push(arr[i]);
							continue;
						}
					}
					
					idx = 0;
				}
				break;
			case pModel.THREE_ONE:
				tmp = hasTwoKing(this._arrayCard);
				if(tmp){
					return hasTwoKing(this._arrayCard);
				}
				
				tmp = hasFourSame(this._arrayCard);
				if(tmp){
					return tmp;
				}
				
				if(list.length > this._arrayCard){//手中牌数少于上手牌
					return false;	
				}
				
				var count = list.length;//上手牌数量
				var len = Math.floor(count / 4);//三个数
				
				sortCard(this._arrayCard);//按大小对牌进行牌型
				arr = getAllot(this._arrayCard);
				
				var idx = 0;
				var temp = [];
				
				var withCount = 0;
				var withTemp = [];
				for(var i = 0;i < arr.length ; i ++){
					if (idx != len){
//						return changeMinBigCardTo1(temp);
						if(arr[i].length == 3){
							if(idx == 0 && arr[i][0]._cardPropect.val > list[0]._cardPropect.val ){
								temp = [];
								idx = 1;
								temp.push(arr[i]);
								continue;
							}else if(idx > 0 && idx < len){
								++idx;
								temp.push(arr[i]);
								continue;
							}
						}
						
						idx = 0;
					}else if(withCount == len){
						temp.push(withTemp);
						return changeMinBigCardTo1(temp);
					}
					
					if(withCount + arr[i].length > len){
						for (var j = 0; j < arr[i].length; j++) {
							if(withCount > len)
								break;
								
							withTemp.push(arr[i][j]);
							withCount ++;
						}
					}
					
					for (var j = 0; j < arr[i].length; j++) {
						withTemp.push(arr[i][j]);
						withCount ++;
					}
				}
				
				break;
			case pModel.THREE_TWO:
				tmp = hasTwoKing(this._arrayCard);
				if(tmp){
					return hasTwoKing(this._arrayCard);
				}
				
				tmp = hasFourSame(this._arrayCard);
				if(tmp){
					return tmp;
				}
				
				if(list.length > this._arrayCard){//手中牌数少于上手牌
					return false;	
				}
				
				var count = list.length;//上手牌数量
				var len = Math.floor(count / 5);//三个数
				
				sortCard(this._arrayCard);//按大小对牌进行牌型
				arr = getAllot(this._arrayCard);
				
				var idx = 0;
				var temp = [];
				
				var withCount = 0;
				var withTemp = [];
				for(var i = 0;i < arr.length ; i ++){
					if (idx != len){
//						return changeMinBigCardTo1(temp);
						if(arr[i].length == 3){
							if(idx == 0 && arr[i][0]._cardPropect.val > list[0]._cardPropect.val ){
								temp = [];
								idx = 1;
								temp.push(arr[i]);
								continue;
							}else if(idx > 0 && idx < len){
								++idx;
								temp.push(arr[i]);
								continue;
							}
						}
						
						idx = 0;
					}else if(withCount == len){
						for (var i = 0; i < withTemp.length; i++) {
							temp.push(withTemp[i]);
						}
						return changeMinBigCardTo1(temp);
					}
					
					if(arr[i].length == 2 && withCount < len){
						withTemp.push(arr[i]);
						withCount ++;
					}
					
				}
				break;
			default:
				break;
		}
	}
});

//=============================角色类使用的函数库=============================
function hasTwoKing(list){
	if(list.length >= 2){
		sortCard(list);
		if(list[list.length - 1] == 15 && list[list.length - 2] == 14)
			return [list[list.length - 1],list[list.length - 2]];
	}
	return false;
}

function hasFourSame(list){
	sortCard(list);
	var arr = getAllot(list);
	for(var i = arr.length - 1;i >= 0 ; i --){
		if(arr[i].length == 4){
			return arr[i];
		}
	}
	
	return false;
}

function changeMinBigCardTo1(temp){
	var result = [];
	for (var i = 0; i < temp.length; i++) {
		for (var j = 0; j < temp[i].length; j++) {
			result.push(temp[i][j]);
		}
	}
	return result;
}
