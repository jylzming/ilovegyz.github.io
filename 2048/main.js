// JavaScript Document

var board=new Array();
var score=0;
var hasConflicted=new Array();

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function() {
	prepareForMobile();
    newGame();
});

function prepareForMobile(){
	if(docunentWidth > 500){
		gridWidth = 500;
		cellSideLength = 100;
		cellSpace = 20;
	}
	
	$("#divGrid").css("width", gridWidth-2*cellSpace);
	$("#divGrid").css("height", gridWidth-2*cellSpace);
	$("#divGrid").css("padding", cellSpace);
	$("#divGrid").css("border-radius", 0.02*gridWidth);
	
	$(".divCell").css("width", cellSideLength);
	$(".divCell").css("height", cellSideLength);
	$(".divCell").css("border-radius", 0.02*cellSideLength);
}

function newGame(){
	init();
	generateOneNumber();
	generateOneNumber();
}

function init(){
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++){
			var gridCell=$("#divCell-" + i + "-" + j);
			gridCell.css("top", getPosTop(i));
			gridCell.css("left", getPosLeft(j));
		}
		
	for(var i=0; i<4; i++){
		board[i]=new Array();
		hasConflicted[i]=new Array();
		
		for(var j=0; j<4; j++){
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	
	updateBoardView();	
	score=0;
	updateScore(score);
}

function updateBoardView(){
	$(".divNumberCell").remove();
	var divNumberCell=null;
	
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			$("#divGrid").append("<div id='divNumberCell-" + i + "-" + j + "' class='divNumberCell'></div>");
			divNumberCell=$("#divNumberCell-" + i + "-" + j);
			
			if(board[i][j] == 0){
				divNumberCell.css("width", "0px");
				divNumberCell.css("height", "0px");
				divNumberCell.css("top", getPosTop(i) + cellSideLength/2);
				divNumberCell.css("left", getPosLeft(j) + cellSideLength/2);
			}else{
				divNumberCell.css("width", cellSideLength);
				divNumberCell.css("height", cellSideLength);
				divNumberCell.css("top", getPosTop(i));
				divNumberCell.css("left", getPosLeft(j));
				divNumberCell.css("background-color", getNumberBgColor(board[i][j]));
				divNumberCell.css("color", getNumberColor(board[i][j]));
				//divNumberCell.text(board[i][j]);
				divNumberCell.text(viewText(board[i][j]));
			}
			
			hasConflicted[i][j]=false;
		}
		
		$(".divNumberCell").css("line-height", cellSideLength + "px");
		$(".divNumberCell").css("font-size", (0.3*cellSideLength) + "px");
	}
}

function generateOneNumber(){
	if(noSpace(board))
		return false;
	
	// 生成随机位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));
	var times=0;
	
	while(times<50){
		if(board[randx][randy] == 0)
			break;
			
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
		
		times++;
	}
	
	if(times == 50){
		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				if(board[i][j] == 0){
					randx=i;
					randy=j;
				}
			}
		}
	}
	
	// 生一个随机数
	var randNumber = Math.random() < 0.75 ? 2 : 4;
	
	//在随机位置显示随机数
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	
	return true;
}

$(document).keydown(function(e) {	
    switch(e.keyCode){
		case 37://left
			e.preventDefault();
			
			if(moveLeft()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
			break;
		case 38://up
			e.preventDefault();
			
			if(moveUp()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
			break;
		case 39://right
			e.preventDefault();
			
			if(moveRight()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
			break;
		case 40://down
			e.preventDefault();
			
			if(moveDown()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
			break;
		default://default
			break;
	}
});

document.addEventListener("touchstart",function(e){
	startx = e.touches[0].pageX;
	starty = e.touches[0].pageY;
});

document.addEventListener("touchmove",function(e){
	e.preventDefault();	
});

document.addEventListener("touchend",function(e){
	endx = e.changedTouches[0].pageX;
	endy = e.changedTouches[0].pageY;
	
	var deltax = endx-startx;
	var deltay = endy-starty;
	
	if(Math.abs(deltax) < 0.1 * docunentWidth && Math.abs(deltay) < 0.1 * docunentWidth)
		return;
	
	//x
	if(Math.abs(deltax) > Math.abs(deltay)){
		//right
		if(deltax > 0){
			if(moveRight()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
		}
		//left
		else{
			if(moveLeft()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
		}
	}
	//y
	else{
		//down
		if(deltay > 0){
			if(moveDown()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
		}
		//up
		else{
			if(moveUp()){
				window.setTimeout(generateOneNumber, 210);
				window.setTimeout(isGameOver, 300);
			}
		}
	}
});

function isGameOver(){
	if(noSpace(board) && noMove(board))
		gameOver();
}

function gameOver(){
	alert("游戏结束！");
}

function moveLeft(){
	if(!canMoveLeft(board))
		return false;
	
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if(board[i][j] != 0){
				for(var k=0; k<j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i, j, i, k);
						
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						 
						//score
						score+=board[i][k];
						updateScore(score);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	
	//updateBoardView();
	window.setTimeout(updateBoardView, 200);
	return true;
}

function moveUp(){
	if(!canMoveUp(board))
		return false;
	
	for(var i=1; i<4; i++){
		for(var j=0; j<4; j++){
			if(board[i][j] != 0){
				for(var k=0; k<i; k++){
					if(board[k][j] == 0 && noBlockVertical(j, k, i, board)){
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i, j, k, j);
						
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						 
						//score
						score+=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
		
	window.setTimeout(updateBoardView, 200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board))
		return false;
	
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			if(board[i][j] != 0){
				for(var k=3; k>j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i, j, i, k);
						
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						 
						//score
						score+=board[i][k];
						updateScore(score);
						
						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}
		
	window.setTimeout(updateBoardView, 200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board))
		return false;
	
	for(var i=2; i>=0; i--){
		for(var j=0; j<4; j++){
			if(board[i][j] != 0){
				for(var k=3; k>i; k--){
					if(board[k][j] == 0 && noBlockVertical(j, i, k, board)){
						//move
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i, j, k, j);
						
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						 
						//score
						score+=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}
		
	window.setTimeout(updateBoardView, 200);
	return true;
}