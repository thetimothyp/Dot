var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var left = false;
var right = false;
var up = false;
var down = false;
var xPos = 400;
var yPos = 250;
var xVel = 0;
var yVel = 0;
var xDir, yDir;
var speed = 0;
var positions = [];
ctx.fillStyle = "#E82368"

setInterval('draw()', 30);
setSpeed(8);
setInterval('getPos()', 10);

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function setSpeed(maxSpeed) {
	setInterval('setXVelocity(0.6, ' + maxSpeed + ')', 30);
	setInterval('setYVelocity(0.6, ' + maxSpeed + ')', 30);
	setInterval('getSpeed()', 30);
	setInterval('limitSpeed(' + maxSpeed + ')', 30);
}

function getSpeed() {
	speed = Math.sqrt(Math.pow(Math.abs(xVel), 2) + Math.pow(Math.abs(yVel), 2));
}

function limitSpeed(maxSpeed) {
	var limit = maxSpeed / Math.sqrt(2);
	if (speed > maxSpeed) {
		if (xVel >= limit && yVel >= limit) {
			xVel = limit;
			yVel = limit;
		} else if (xVel <= (-1 * limit) && yVel <= (-1 * limit)) {
			xVel = (-1 * limit);
			yVel = (-1 * limit);
		} else if (xVel <= (-1 * limit) && yVel >= limit) {
			xVel = (-1 * limit);
			yVel = limit;
		} else if (xVel >= limit && yVel <= (-1 * limit)) {
			xVel = limit;
			yVel = (-1 * limit);
		}
	}
}

function setYVelocity(weight, maxSpeed) {
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

	if (yVel >= maxSpeed) {
		yVel = maxSpeed;
	}
	if (yVel <= (-1 * maxSpeed)) {
		yVel = (-1 * maxSpeed);
	}
}

function setXVelocity(weight, maxSpeed) {
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

	if (xVel >= maxSpeed) {
		xVel = maxSpeed;
	}
	if (xVel <= (-1 * maxSpeed)) {
		xVel = (-1 * maxSpeed);
	}
}

function drawDot(x, y) {
	ctx.fillStyle = "#00C4CF"
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2, true);
	ctx.fill();
	ctx.closePath();
}

function getPos() {
	positions.unshift({ x : xPos, y : yPos });
	if (positions.length > 15) {
		positions.pop();
	}
}

function drawTail(x, y) {
	ctx.fillStyle = "#92EEF7";
	for (var i = 0; i < 15; i++) {
		ctx.beginPath();
		ctx.arc(positions[i].x, positions[i].y, 23 - i*1.5, 0, Math.PI*2, true);
		ctx.fill();
		ctx.closePath();
	}
}

function draw() {
	ctx.clearRect(0,0,800,500);
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
	if (xPos >= 800) { 
		xPos = 800; 
		xVel = 0;
	}
	if (yPos <= 0) { 
		yPos = 0; 
		yVel = 0;
	}
	if (yPos >= 500) { 
		yPos = 500; 
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