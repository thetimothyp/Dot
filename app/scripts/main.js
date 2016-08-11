var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var left = false;
var right = false;
var up = false;
var down = false;
var xPos = 300;
var yPos = 200;
var xVel = 0;
var yVel = 0;
var xDir, yDir;
ctx.fillStyle = "#E82368"

setInterval('draw()', 25);
setInterval('setXVelocity(0.4)', 25);
setInterval('setYVelocity(0.4)', 25);

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function setYVelocity(weight) {
	if (up) {
		yVel -= weight;
	} else if (down) {
		yVel += weight;
	} else {
		if (yVel > -0.5 && yVel < 0.5) {
			yVel = 0;
		} else if (yVel > 0) {
			yVel -= weight / 2;
		} else if (yVel < 0) {
			yVel += weight / 2;
		}
	}

	if (yVel >= 8) {
		yVel = 8;
	}
	if (yVel <= -8) {
		yVel = -8;
	}
}

function setXVelocity(weight) {
	if (right) {
		xVel += weight;
	} else if (left) {
		xVel -= weight;
	} else {
		if (xVel > -0.5 && xVel < 0.5) {
			xVel = 0;
		} else if (xVel > 0) {
			xVel -= weight / 2;
		} else if (xVel < 0) {
			xVel += weight / 2;
		}
	}

	if (xVel >= 8) {
		xVel = 8;
	}
	if (xVel <= -8) {
		xVel = -8;
	}
}

function drawDot(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2, true);
	ctx.fill();
}

function draw() {
	ctx.clearRect(0,0,600,400);
	if (xVel > 0) {
		xDir = 'right';
	} else if (xVel < 0) {
		xDir = 'left';
	}
	xPos += xVel;

	if (yVel > 0) {
		yDir = 'down';
	} else if (xVel < 0) {
		yDir = 'up';
	}
	yPos += yVel;

	if (xPos <= 0) { 
		xPos = 0; 
		xVel = 0;
	}
	if (xPos >= 600) { 
		xPos = 600; 
		xVel = 0;
	}
	if (yPos <= 0) { 
		yPos = 0; 
		yVel = 0;
	}
	if (yPos >= 400) { 
		yPos = 400; 
		yVel = 0;
	}
	drawDot(xPos, yPos);
}

function onKeyDown(e) {
	if (e.keyCode == 39 || e.keyCode == 68) { 
		right = true; 
	}
	else if (e.keyCode == 37 || e.keyCode == 65) { 
		left = true; 
	}
	if (e.keyCode == 38 || e.keyCode == 87) { 
		up = true;
	}
	else if (e.keyCode == 40 || e.keyCode == 83) { 
		down = true; 
	}
}

function onKeyUp(e) {
	if (e.keyCode == 39 || e.keyCode == 68) { right = false; }
	else if (e.keyCode == 37 || e.keyCode == 65) { left = false; }
	if (e.keyCode == 38 || e.keyCode == 87) { up = false; }
	else if (e.keyCode == 40 || e.keyCode == 83) { down = false; }
}