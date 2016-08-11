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
var speed = 0;
ctx.fillStyle = "#E82368"

setInterval('draw()', 30);
setInterval('setXVelocity(0.6)', 30);
setInterval('setYVelocity(0.6)', 30);
setInterval('getSpeed()', 30);
setInterval('limitSpeed()', 30);

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function getSpeed() {
	speed = Math.sqrt(Math.pow(Math.abs(xVel), 2) + Math.pow(Math.abs(yVel), 2));
	console.log(speed);
}

function limitSpeed() {
	if (speed > 8) {
		if (xVel >= 5.66 && yVel >= 5.66) {
			xVel = 5.66;
			yVel = 5.66;
		} else if (xVel <= -5.66 && yVel <= -5.66) {
			xVel = -5.66;
			yVel = -5.66
		} else if (xVel <= -5.66 && yVel >= 5.66) {
			xVel = -5.66;
			yVel = 5.66
		} else if (xVel >= 5.66 && yVel <= -5.66) {
			xVel = 5.66;
			yVel = -5.66
		}
	}
}

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
	ctx.fillStyle = "#13CAD4"
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2, true);
	ctx.fill();
	ctx.closePath();
}

function drawTail(x, y) {
	ctx.fillStyle = "#BFF9FF";
	for (var i = 1; i < 20; i++) {
		ctx.beginPath();
		ctx.arc(x - xVel*(0.3 + i/6), y - yVel*(0.3 + i/6), 20 - i, 0, Math.PI*2, true);
		ctx.fill();
		ctx.closePath();
	}
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
	drawTail(xPos, yPos);
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