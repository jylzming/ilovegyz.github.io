// JavaScript Document

function showNumberWithAnimation(i, j, randNumber){
	var divNumberCell=$("#divNumberCell-" + i + "-" + j);
	
	divNumberCell.css("background-color", getNumberBgColor(randNumber));
	divNumberCell.css("color", getNumberColor(randNumber));
	//divNumberCell.text(randNumber);
	divNumberCell.text(viewText(randNumber));
	
	divNumberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPosTop(i),
		left: getPosLeft(j)
	}, 50);
}

function showMoveAnimation(x1, y1, x2, y2){
	var divNumberCell=$("#divNumberCell-" + x1 + "-" + y1);
	
	divNumberCell.animate({
		top: getPosTop(x2),
		left: getPosLeft(y2)
	}, 200);
}

function updateScore(score){
	$("#spScore").text(score);
}