// JavaScript Document

var docunentWidth=window.screen.availWidth;
var gridWidth=0.92*docunentWidth;
var cellSideLength=0.18*docunentWidth;
var cellSpace=0.04*docunentWidth;

function getPosTop(i){
	return cellSpace + i * (cellSpace + cellSideLength);
}

function getPosLeft(j){
	return cellSpace + j * (cellSpace + cellSideLength);
}

function viewText(number){
	switch(number){
		case 2:return "相遇";break;
		case 4:return "相识";break;
		case 8:return "相知";break;
		case 16:return "相恋";break;
		case 32:return "相爱";break;
		case 64:return "相守";break;
		case 128:return "订婚";break;
		case 256:return "结婚";break;
		case 512:return "生子";break;
		case 1024:return "家庭";break;
		case 2048:return "皆老";break;
		default: return "爱情路";break;
	}
}

function getNumberBgColor(number){
	switch(number){
		case 2:return "#EEE4DA";break;
		case 4:return "#EDE0C8";break;
		case 8:return "#F2B179";break;
		case 16:return "#F59563";break;
		case 32:return "#F67C5F";break;
		case 64:return "#F65E3B";break;
		case 128:return "#EDCF72";break;
		case 256:return "#EDCC61";break;
		case 512:return "#9C0";break;
		case 1024:return "#33B5E5";break;
		case 2048:return "#09C";break;
		case 4096:return "#A6C";break;
		case 8192:return "#93C";break;
	}
	
	return "black";
}

function getNumberColor(number){
	if(number <= 4)
		return "#776c65";
	
	return "white";
}

function noSpace(board){
	for(var i=0; i<4; i++)
		for(var j=0; j<4; j++)
			if(board[i][j] == 0)
				return false;
				
	return true;	
}

function canMoveLeft(board){
	for(var i=0; i<4; i++)
		for(var j=1; j<4; j++)
			if(board[i][j] != 0)
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j])
					return true;
					
	return false;
}

function canMoveUp(board){
	for(var i=1; i<4; i++)
		for(var j=0; j<4; j++)
			if(board[i][j] != 0)
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
					return true;
					
	return false;
}

function canMoveRight(board){
	for(var i=0; i<4; i++)
		for(var j=0; j<3; j++)
			if(board[i][j] != 0)
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
					return true;
					
	return false;
}

function canMoveDown(board){
	for(var i=0; i<3; i++)
		for(var j=0; j<4; j++)
			if(board[i][j] != 0)
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true;
					
	return false;
}

function noBlockHorizontal(row, col1, col2, board){
	for(var i = col1 + 1; i < col2; i++)
		if(board[row][i] != 0)
			return false;
			
	return true;
}

function noBlockVertical(col, row1, row2, board){
	for(var i = row1 + 1; i < row2; i++)
		if(board[i][col] != 0)
			return false;
			
	return true;
}

function noMove(board){
	return !canMoveLeft(board) && !canMoveUp(board) && !canMoveRight(board) && !canMoveDown(board);
}