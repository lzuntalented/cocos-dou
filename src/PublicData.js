//var pModel=[0,1,2,3,4,5,6,7,8,9,10,11];//单张，对子，三不带，三带一，三带一对，顺子，连对，飞机不带，飞机带单张，飞机带对子，炸弹
var pModel = {
	SINGLE : 1,//单张类型
	DOUBLE : 2,//对子类型
	THREE : 3,//三不带类型
	THREE_ONE : 6,//三带一类型
	THREE_TWO : 7,//三带二类型
	ORDER : 5,//顺子类型
	FOUR : 4,//炸弹类型
}
var allCard = [];//一副扑克


function createOneStyle(str,value){
	
	var obj1 = {
		faceVal:str,
		val:value,
		color:0
	};
	var obj2 = {
		faceVal:str,
		val:value,
		color:1
	};
	var obj3 = {
		faceVal:str,
		val:value,
		color:2
	};
	var obj4 = {
		faceVal:str,
		val:value,
		color:3
	};
	
	allCard.push(obj1);
	allCard.push(obj2);
	allCard.push(obj3);
	allCard.push(obj4);
}

createOneStyle('3',1);
createOneStyle('4',2);
createOneStyle('5',3);
createOneStyle('6',4);
createOneStyle('7',5);
createOneStyle('8',6);
createOneStyle('9',7);
createOneStyle('10',8);
createOneStyle('J',9);
createOneStyle('Q',10);
createOneStyle('K',11);
createOneStyle('A',12);
createOneStyle('2',13);

allCard.push(
	{
		faceVal:'X',
		val:14,
		color:0
	}
);
allCard.push(
	{
		faceVal:'D',
		val:15,
		color:0
	}
);

function initArrayWithDefault(row,col,def){
	var arr = [];
	for (var i = 0; i < row; i++) {
		arr[i] = [];
		for (var j = 0; j < col; j++) {
			arr[i][j] = def;
		}
	}
	
	return arr;
}

function sortCard(arr){
	for(var i =0 ; i< arr.length; ++i) {  
        for(var j = 0; j < arr.length-1; ++j) {
        	var now = arr[j]._cardPropect.val;
        	var next = arr[j+1]._cardPropect.val;
        	
        	
            if(now > next)  
            {  
                var tmp = arr[j] ; 
                arr[j] = arr[j+1] ;  
                arr[j+1] = tmp;
            }  
        }  
    }
	return arr;
}

function sortCard(arr){
	for(var i =0 ; i< arr.length; ++i) {  
        for(var j = 0; j < arr.length-1; ++j) {
        	var now = arr[j]._cardPropect.val;
        	var next = arr[j+1]._cardPropect.val;
        	
        	
            if(now > next)  
            {  
                var tmp = arr[j] ; 
                arr[j] = arr[j+1] ;  
                arr[j+1] = tmp;
            }  
        }  
    }
	return arr;
}
//function isChup(arr){
//	if(arr.lenght==1)
//		return true;
//	if(arr.lenght==2 || arr[0] == arr[1])
//		return true;
//		
//	var len=arr.lenght;
//	switch (len){
//		case 1:
//			return true;
//			break;
//			
//		case 2:
//			if(arr[0] == arr[1])
//				return true;
//			
//			if(arr[0].val == 'X' && arr[1].val == 'D' || arr[1].val == 'X' && arr[0].val == 'D')
//				return true;
//				
//			break;
//			
//		case 3:
//			if(isThreeSame(arr)){
////				三不带
//				return true;
//			}
//				
//			break;
//			
//		case 4:
//			if(isThreeSame(arr)){
////				炸弹
//				return true;
//			}
//			
//			if(isThreeSame(arr)){
////				炸弹
//				return true;
//			}	
//			
//			break;
//			
//			case 5:
//			break;
//			case 6:
//			break;
//			case 7:
//			break;
//			case 8:
//			break;
//			case 9:
//			break;
//			case 10:
//			break;
//			case 11:
//			break;
//			case 12:
//			break;
//			case 13:
//			break;
//			case 14:
//			break;
//			case 15:
//			break;
//			case 16:
//			break;
//			case 17:
//			break;
//	}
//}
//
//function log(arr){
//	var str="";
//	for (var i = 0; i < arr.length; i++) {
//		str += arr[i].faceVal + "-";
//	}
//	cc.log(str);
//}
//
///**
// * 判断是否连张一样
// */
//function isThreeSame(param){
//	var p=param[0];
//	for (var i = 1; i < param.length; i++) {
//		if(param[i] != p)
//			return false;
//	}
//	return true;
//}
//
///**
// * 判断是否三带一
// */
//function isThreeSameWithOne(param){
//	if(param.length!=4)
//		return false;
//		
//	var notSame=[];
//	var sameCount=[];
//	
//	for (var i = 0; i < param.length; i++) {
//		var tag=false;
//		
//		for (var j = 0; j < notSame.length; j++) {
//			if(param[i] == notSame[j]){
//				sameCount[j]++;
//				tag=true;
//				break;
//			}
//		}
//		
//		if(!tag)
//			notSame.push(param[i]);
//	}
//	
//	if(notSame.length == 2 && (sameCount[0] == 3 || sameCount[1] ==3))
//		return true;
//	else
//		return false;
//}
//
///**
// * 判断是否三带一对
// */
//function isThreeSameWithTwo(param){
//	if(param.length!=5)
//		return false;
//	
//	var sort=param.sort();
//	
//	var s=sort[0];
//	var notSameCount=0;
//	var sameCount=[];
//	
//	for (var i = 1; i < sort.length; i++) {
//		if(s != sort[i]){
//			notSameCount++;
//			s=sort[i];
//		}else{
//			sameCount[notSameCount]++;
//		}
//	}
//	
//	if(sameCount.length == 2 && (sameCount[0] == 3 || sameCount[1] ==3))
//		return true;
//	else
//		return false;
//}
//
///**
// * 判断是否飞机不带
// */
//function isPlane(param){
//	var sort=param.sort();
//	var str=[];
//	
//	var base=param[0];
//	var count=0;
//	for (var i = 0; i < sort.length; i++) {
//		if(base != param[i]){
//			base=param[i];
//			count++;
//		}
//		str[count]=param[i];
//	}
//	
//	if(str.length < 2){
//		return false;
//	}
//	
//	for(var i=0;i<str.length;i++){
//		if(str[i].length!=3){
//			return false;
//		}
//	}
//	
//	return true;
//}
//
///**
// * 判断是否飞机不带
// */
//function isPlaneWithSingle(param){
//	var sort=param.sort();
//	var str=[];
//	
//	var base=param[0];
//	var count=0;
//	for (var i = 0; i < sort.length; i++) {
//		if(base != param[i]){
//			base=param[i];
//			count++;
//		}
//		str[count]=param[i];
//	}
//	
//	if(str.length < 4){
//		return false;
//	}
//	
//	for(var i=0;i<str.length;i++){
//		if(str[i].length!=3){
//			return false;
//		}
//	}
//	
//	return true;
//}


//====================================常量表=================================
var PUBLIC = {
	SCREEN_WIDTH : 800,//屏幕宽度
	SCREEN_HEIGHT : 600,//屏幕高度
	
	CARD_WIDTH : 71,//牌宽度
	CARD_HEIGHT : 96,//牌高度
	
	CARD_COUNT :54,//牌总数
	CARD_EACH : 17,//每人应发牌数
	CARD_DOWN : 3,//底牌个数
	
	CARD_SHOW_SPACE : 20,//显示牌的尺寸
	CARD_SELECT_SPACE : 50,//选中牌抽出的尺寸
	
	ROLE_TYPE_BOOR : 0,//农民角色
	ROLE_TYPE_HOST : 1,//地主角色
};

var GAME = {
	GAME_STATUS_DEFAULT : 0,//游戏未开始
	GAME_STATUS_START : 1,//游戏开始
}
var gameState = GAME.GAME_STATUS_DEFAULT;
