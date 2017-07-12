var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 5;

// text boxes
var xVelText = document.getElementById("myXVelocity");
var yVelText = document.getElementById("myYVelocity");
var chatAreaText = document.getElementById("chat-area");
var inputBox = document.getElementById("text-input");

// position variables
var x = 200; //600;
var y = 200; //400;

// velocity variables
var xvel = 0;
var yvel = 0;

// multiplier
var mult = 0.5;
var frame_rate = 25;

// updates x and y velocity text box
function updateVelText()
{
	xtext = "X-velocity: "+xvel;
	xVelText.innerHTML = xtext;
	
	ytext = "Y-velocity: "+yvel;
	yVelText.innerHTML = ytext;
}

// updates x and y velocities
function updateVel() {
	x = x + xvel*mult;
	y = y + yvel*mult;
}

// corrects x and y values if they cross the borders
function maintainBounds() {
	if (x <= 5)
	{
		x = 5;
		xvel = 0;
	}
	if (x >= c.width-5)
	{
		x = c.width - 5;
		xvel = 0;
	}
	if (y <= 5)
	{
		y = 5;
		yvel = 0;
	}
	if (y >= c.height-5)
	{
		y = c.height - 5;
		yvel = 0;
	}
}

function draw()
{
	// position cursor
	ctx.moveTo(x,y);
	
	// update x, y values
	updateVel();
	
	// maintain borders
	maintainBounds();
	
	// update x and y vel text
	updateVelText();
	
	// draw line
	ctx.lineTo(x,y);
	ctx.stroke();
	
	// refresh the frame
	setTimeout(draw, frame_rate);
}

function moveLeft() {
	xvel--;
}

function moveRight() {
	xvel++;
}

function moveUp() {
	yvel--;
}

function moveDown() {
	yvel++;
}

function changeColor(color) {
	ctx.beginPath();
	ctx.strokeStyle = color;
}

function runCommand(s) {
	var command = s.toLowerCase();
	
	if (command === "left") {
		moveLeft();
	} else if (command === "right") {
		moveRight();
	} else if (command === "up") {
		moveUp();
	} else if (command === "down") {
		moveDown();
	} else if (command === "red") {
		changeColor("Red");
	} else if (command === "blue") {
		changeColor("Blue");
	} else if (command === "black") {
		changeColor("Black");
	} else if (command === "green") {
		changeColor("Green");
	} else if (command === "yellow") {
		changeColor("Gold");
	}
}

// invoked on an enter press
// updates the text area, clears the input box
// and runs the command
function submitText() {	
	// update the text area
	command = inputBox.value;
	chatAreaText.innerHTML = chatAreaText.innerHTML + command + "\n";
	
	// clear the input box
	inputBox.value = "";
	
	// run the command
	runCommand(command);
}

// handles key presses
// to be replaced with server calls
document.onkeydown = function(e) {
    switch (e.keyCode) {
		case 13: // enter
			submitText();
			break;
    }
};

// initial call to kick off the loop
draw();