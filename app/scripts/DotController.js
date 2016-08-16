var xPos = 400;
var yPos = 250;
var xVel = 0;
var yVel = 0;
var xDir, yDir;
var positions = [];

function setSpeed(maxSpeed) {
	setInterval('setXVelocity(0.6, ' + maxSpeed + ')', 30);
	setInterval('setYVelocity(0.6, ' + maxSpeed + ')', 30);
	setInterval('limitSpeed(' + maxSpeed + ')', 30);
}

function limitSpeed(maxSpeed) {
	var speed = getSpeed();
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

function getSpeed() {
	return Math.sqrt(Math.pow(Math.abs(xVel), 2) + Math.pow(Math.abs(yVel), 2));
}

function setYVelocity(weight, maxSpeed) {
	if (up) {
		yVel -= weight;
	} else if (down) {
		yVel += weight;
	} else {
		if (yVel > -0.3 && yVel < 0.3) {
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
		if (xVel > -0.3 && xVel < 0.3) {
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

function getPos() {
	positions.unshift({ x : xPos, y : yPos });
	if (positions.length > 15) {
		positions.pop();
	}
}