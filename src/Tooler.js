var CARD_TYPE = {
	SINGLE : 1,//单张
	
	TWO_SAME : 2,// 对子
	TWO_KING : 29,//王炸 =====================大牌
	
	THREE_SAME : 3,//三不带
	
	FOUR_SAME : 4,//炸弹 =====================大牌
	FOUT_THREE_WITH_ONE : 46,//三带一
	
	FIVE_ORDER : 5,//5顺子
	FIVE_THREE_WITH_TWO : 57,//三带一对
	
	SIX_ORDER : 65,//6顺子
	SIX_TWO_SERIES_THREE : 62,//3连对
	SIX_TWO_THREE_SAME : 63,//飞机-两个三张不带
	
	SEVEN_ORDER : 75,//7顺子
	
	EIGHT_ORDER: 85,//8顺子
	EIGHT_TWO_SERIES_FOUR : 82,//4连对
	EIGHT_TWO_THREE_SAME_WITH_ONE : 87,//飞机带单张-两飞机
	
	NINE_ORDER : 95,//9顺子
	NINE_THREE_THREE_SAME : 93,//飞机-三个三张不带
	
	TEN_ORDER : 105,//10顺子
	TEN_TWO_SERIES_FIVE : 102,//5连对
	TEN_TWO_THREE_SAME_WITH_TWO : 107,//飞机带对子-俩飞机带对子
	
	ELEVEN_ORDER : 115,//11顺子
	
	TWELVE_ORDER : 125,//12顺子
	TWELVE_TWO_SERIES_SIX : 122,//6连对
	TWELVE_FOUR_THREE_SAME : 123,//飞机不带-4飞机
	TWELVE_THREE_THREE_SAME_WITH_ONE : 126,//飞机带单张-3飞机
	
	FOURTEEN_TWO_SERIES : 142,//7连对
	
	FIFTEEN_THREE_THREE_SAME_WITH_TWO : 157,//飞机带对子-3飞机带队子
	FIFTEEN_FIVE_THREE_SAME : 153,//飞机不带-5飞机
	
	SIXTEEN_TWO_SERIES_EIGHT : 162,//8连对
	SIXTEEN_FOUR_THREE_SAME_WITH_ONE : 166,//飞机带单张-4飞机带单张
	
	EIGHTEEN_TWO_SERIES_NINE : 182,//9连对
	EIGHTEEN_SIX_THREE_SAME : 183,//6飞机不带
	
	TWENTY_FIVE_THREE_SAME_WITH_ONE : 206,//5飞机带单张
	TWENTY_FOUR_THREE_SAME_WITH_TWO : 207,//4飞机带队子
	TWENTY_TWO_SERIES_TEN : 202,//10连对
}

/*是否三带单张*/
function isThreeWithOne(list){
	if(list.length != 4)
		return false;
		
	var arr = getAllot(list);
	if(arr.length == 2){
		if((arr[0].length == 3 && arr[1].length == 1) 
			|| (arr[0].length == 1 && arr[1].length == 3) ){
				return true;
			}
	}
	
	return false;
}

/*是否三带对子*/
function isThreeWithTwo(list){
	if(list.length != 5)
		return false;
		
	var arr = getAllot(list);
	if(arr.length == 2){
		if((arr[0].length == 3 && arr[1].length == 2) 
			|| (arr[0].length == 2 && arr[1].length == 3) ){
				return true;
			}
	}
	
	return false;
}

/*判断顺子*/
function isOrderly(list){
	if(list.length < 5 || list.length > 12){//大于5张，小于12张才能是顺子
		return false;
	}
	
	sortCard(list);
	
	if(list[0]._cardPropect.val < 1 || list[list.length - 1]._cardPropect.val > 12){//大于A的不能组成顺子
		return false;
	}
	
	for (var i = 1; i < list.length; i++) {
		if(list[i]._cardPropect.val - list[i-1]._cardPropect.val != 1){
			return false;
		}
	}
	
	return true;
}

/*判断连对*/
function isTwoSeries(list){
	if(list.length < 6 || list.length > 20 || list.length % 2 != 0){//大于5张，小于12张才能是顺子
		return false;
	}
	
	sortCard(list);
	
	if(list[0]._cardPropect.val < 1 || list[list.length - 1]._cardPropect.val > 12){//大于A的不能组成顺子
		return false;
	}
	
	list = getAllot(list);
	for (var i = 1; i < list.length; i++) {
		if(list[i].length != 2){
			return false;
		}
		
		if(list[i][0]._cardPropect.val - list[i-1][0]._cardPropect.val != 1){
			return false;
		}
	}
	
	return true;	
}

/*判断飞机不带*/
function isThreeSame(list){
	if(list.length < 6 || list.length > 18 || list.length % 3 != 0){//大于5张，小于12张才能是顺子
		return false;
	}
	
	sortCard(list);
	
	if(list[0]._cardPropect.val < 1 || list[list.length - 1]._cardPropect.val > 12){//大于A的不能组成顺子
		return false;
	}
	list = getAllot(list);
	for (var i = 1; i < list.length; i++) {
		if(list[i].length != 3){
			return false;
		}
		
		if(list[i][0]._cardPropect.val - list[i-1][0]._cardPropect.val != 1){
			return false;
		}
	}
	
	return true;	
}

/*判断飞机带单张*/
function isThreeSameWithOne(list){
	if(list.length != 8 && list.length != 12 && list.length != 16 && list.length != 20){//大于5张，小于12张才能是顺子
		return false;
	}
	
	var listLength = list.length;
	sortCard(list);
	list = getAllot(list);
	
	var temp_three = 0;
	var start_idx = 0;
	for (var i = 0; i < list.length; i++) {
		if(list[i].length == 3){
			if(temp_three == 0){
				start_idx = i;	
			}
			temp_three ++;
		}
	}
	
	if(temp_three * 3 + temp_three != listLength){
		return false;
	}
	
	if(list[start_idx][0]._cardPropect.val < 1 || list[start_idx + temp_three - 1][0]._cardPropect.val > 12){//大于A的不能组成顺子
		return false;
	}
	
	for (var i = start_idx + 1; i < list.length && --temp_three > 0; i++) {
		if(list[i][0]._cardPropect.val - list[i-1][0]._cardPropect.val != 1){
			return false;
		}
	}
	
	return true;	
}

/*判断飞机带对子*/
function isThreeSameWithTwo(list){
	if(list.length != 10 && list.length != 15 && list.length != 20){//大于5张，小于12张才能是顺子
		return false;
	}
	
	sortCard(list);
	
	if(list[0]._cardPropect.val < 1 || list[list.length - 1]._cardPropect.val > 12){//大于A的不能组成顺子
		return false;
	}
	
	list = getAllot(list);
	
	var temp_three = 0;
	var temp_two = 0;
	var start_idx = 0;
	for (var i = 0; i < list.length; i++) {
		if(list[i].length == 1)
			return false;
			
		if(list[i].length == 3){
			if(temp_three == 0){
				start_idx = i;	
			}
			temp_three ++;
		}else if(list[i].length == 2){
			temp_two++;
		}
	}
	
	if(temp_three != temp_two){
		return false;
	}
	
	if(list[start_idx][0]._cardPropect.val < 1 || list[start_idx + temp_three - 1][0]._cardPropect.val > 12){//大于A的不能组成顺子
		return false;
	}
	
	for (var i = start_idx + 1; i < list.length; i++) {
		if(list[i][0]._cardPropect.val - list[i-1][0]._cardPropect.val != 1){
			return false;
		}
	}
	
	return true;	
}

/*分派牌型数组
 *返回值
 * array(){
 * 	array()相同值为一行
 * }
 */
function getAllot(list){
	var result = [];
	
	for (var i = 0; i < list.length; i++) {
		if(result.length == 0){
			result.push([list[i]]);
		}else{
			var tag = false;
			for(var j = 0 ; j < result.length; ++j){
				if(result[j][0]._cardPropect.val == list[i]._cardPropect.val){
					result[j].push(list[i]);
					tag = true;
					break;
				}
			}
			
			if(!tag){
				result.push([list[i]]);
			}
		}
	}
	
	return result;
}

/*检测牌型
 *card_list 待检测牌的列表&一维数组
 */
function checkCardType(card_list){
	var result = 0;
	switch (card_list.length){
		case 0:
			break;
		case 1:
			result = CARD_TYPE.SINGLE;
			break;
		case 2:
			if(card_list[0]._cardPropect.faceVal == card_list[1]._cardPropect.faceVal)
				result = CARD_TYPE.TWO_SAME;
			else{
				if((card_list[0]._cardPropect.val == 14 && card_list[1]._cardPropect.val == 15)
					|| (card_list[0]._cardPropect.val == 15 && card_list[1]._cardPropect.val == 14)){
					result = CARD_TYPE.TWO_KING;		
				}
			}
			break;
		case 3:
			if(card_list[0]._cardPropect.faceVal == card_list[1]._cardPropect.faceVal && card_list[1]._cardPropect.faceVal == card_list[2]._cardPropect.faceVal)
				result = CARD_TYPE.THREE_SAME;
			break;
		case 4:
			if(card_list[0]._cardPropect.faceVal == card_list[1]._cardPropect.faceVal && card_list[1]._cardPropect.faceVal == card_list[2]._cardPropect.faceVal && card_list[2]._cardPropect.faceVal == card_list[3]._cardPropect.faceVal)
				result = CARD_TYPE.FOUR_SAME;
			else if(isThreeWithOne(card_list)){//三带一
				result = CARD_TYPE.FOUT_THREE_WITH_ONE;
			}
			break;
		case 5:
			if(isOrderly(card_list)){
				return CARD_TYPE.FIVE_ORDER;
			}else if(isThreeWithTwo(card_list)){
				return CARD_TYPE.FIVE_THREE_WITH_TWO;
			}
			break;
		case 6:
			if(isOrderly(card_list)){
				return CARD_TYPE.SIX_ORDER;
			}else if(isTwoSeries(card_list)){
				return CARD_TYPE.SIX_TWO_SERIES_THREE;
			}else if(isThreeSame(card_list)){
				return CARD_TYPE.SIX_TWO_THREE_SAME;
			}
			break;
		case 7:
			if(isOrderly(card_list)){
				return CARD_TYPE.SEVEN_ORDER;
			}
			break;
		case 8:
			if(isOrderly(card_list)){
				return CARD_TYPE.EIGHT_ORDER;
			}else if(isTwoSeries(card_list)){
				return CARD_TYPE.EIGHT_TWO_SERIES_FOUR;
			}else if(isThreeSameWithOne(card_list)){
				return CARD_TYPE.EIGHT_TWO_THREE_SAME_WITH_ONE;
			}
			break;
		case 9:
			if(isOrderly(card_list)){
				return CARD_TYPE.NINE_ORDER;
			}else if(isThreeSame(card_list)){
				return CARD_TYPE.NINE_THREE_THREE_SAME;
			}
			break;
		case 10:
			if(isOrderly(card_list)){
				return CARD_TYPE.TEN_ORDER;
			}else if(isTwoSeries(card_list)){
				return CARD_TYPE.TEN_TWO_SERIES_FIVE;
			}else if(isThreeSameWithTwo(card_list)){
				return CARD_TYPE.TEN_TWO_THREE_SAME_WITH_TWO;
			}
			break;
		case 11:
			if(isOrderly(card_list)){
				return CARD_TYPE.ELEVEN_ORDER;
			}
			break;
		case 12:
			if(isOrderly(card_list)){
				return CARD_TYPE.TWELVE_ORDER;
			}else if(isTwoSeries(card_list)){
				return CARD_TYPE.TWELVE_TWO_SERIES_SIX;
			}else if(isThreeSame(card_list)){
				return CARD_TYPE.TWELVE_FOUR_THREE_SAME;
			}else if(isThreeSameWithOne(card_list)){
				return CARD_TYPE.TWELVE_THREE_THREE_SAME_WITH_ONE;
			}
			break;
		case 14:
			if(isTwoSeries(card_list)){
				return CARD_TYPE.FOURTEEN_TWO_SERIES;
			}
			break;
		case 15:
			if(isThreeSame(card_list)){
				return CARD_TYPE.FIFTEEN_FIVE_THREE_SAME;
			}else if(isThreeSameWithTwo(card_list)){
				return CARD_TYPE.FIFTEEN_THREE_THREE_SAME_WITH_TWO;
			}
			break;
		case 16:
			if(isTwoSeries(card_list)){
				return CARD_TYPE.SIXTEEN_TWO_SERIES_EIGHT;
			}else if(isThreeSameWithOne(card_list)){
				return CARD_TYPE.SIXTEEN_FOUR_THREE_SAME_WITH_ONE;
			}
			break;
		case 18:
			if(isTwoSeries(card_list)){
				return CARD_TYPE.EIGHTEEN_TWO_SERIES_NINE;
			}else if(isThreeSame(card_list)){
				return CARD_TYPE.EIGHTEEN_SIX_THREE_SAME;
			}
			break;
		case 20:
			if(isTwoSeries(card_list)){
				return CARD_TYPE.TWENTY_TWO_SERIES_TEN;
			}else if(isThreeSameWithTwo(card_list)){
				return CARD_TYPE.TWENTY_FOUR_THREE_SAME_WITH_TWO;
			}else if(isThreeSameWithOne(card_list)){
				return CARD_TYPE.TWENTY_FIVE_THREE_SAME_WITH_ONE;
			}
			break;
	}
	
	return result;
}

/*
 * 比较两手牌
 * 只有牌型相同的才可以进行比较
 * 含有炸弹的不同牌型不在这里处理
 * @param card1 需要比较的牌 &一维数组
 * @param card2 上手牌列表 &一维数组
 * @param type 上手牌型
 * @param type1 当前牌型
 * 返回值：card1 > card2 返回true
 * */
function compareCard(card1,card2,type,type1){
	if(type == CARD_TYPE.TWO_KING){
		return false;
	}
	
	if(type1 == CARD_TYPE.TWO_KING){
		return true;
	}
	
	if(type != type1){
		if(type == CARD_TYPE.FOUR_SAME){
			return false;
		}
		
		if(type1 == CARD_TYPE.FOUR_SAME){
			return true;
		}
		
		return false;
	}
	
	var ptype = type % (card1.length * 10);
	switch (ptype){
		case pModel.SINGLE:
			return card1[0]._cardPropect.val > card2[0]._cardPropect.val;
			break;
		case pModel.DOUBLE:
			list1 = getAllot(sortCard(card1));
			list2 = getAllot(sortCard(card2));
			return list1[0][1]._cardPropect.val > list2[0][1]._cardPropect.val;
		case pModel.THREE:
			list1 = getAllot(sortCard(card1));
			list2 = getAllot(sortCard(card2));
			return list1[0][1]._cardPropect.val > list2[0][1]._cardPropect.val;
		case pModel.FOUR:
			list1 = getAllot(sortCard(card1));
			list2 = getAllot(sortCard(card2));
			return list1[0][1]._cardPropect.val > list2[0][1]._cardPropect.val;
		case pModel.ORDER:
			list1 = sortCard(card1);
			list2 = sortCard(card2);
			return list1[0][1]._cardPropect.val > list2[0][1]._cardPropect.val;
		case pModel.THREE_ONE:
			return getThreeWithFirstValue(card1) > getThreeWithFirstValue(card2);
			break;
		case pModel.THREE_TWO:
			return getThreeWithFirstValue(card1) > getThreeWithFirstValue(card2);
			break;
		default:
			break;
	}
	
	return false;
}

/*获取三带类型的第一个三带值*/
function getThreeWithFirstValue(list){
	sortCard(list);
	var temp = getAllot(list);
	
	for (var i = 0; i < temp.length; i++) {
		if(temp[i].length == 3){
			return temp[i][0]._cardPropect.val;
		}
	}
	
	return 0 ;
}
