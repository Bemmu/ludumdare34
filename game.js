function l(str) {
	if (console && console.log) {
		console.log(str);
	}
}

var state = "loading";
var level = 0;
var name = "the level";
var mouse = {
	'down' : false,
	'x' : 0,
	'y' : 0
};

var resizes = 0;
var textColor = "#BF2C49";
var backgroundColor = "#E4712E";
var someColor = "#0199A4";

function drawStuff() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	c.fillStyle = backgroundColor;  
	c.fillRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = textColor;  

	if (state == "loading") {
		c.font = "20px Arial"; 
		c.textAlign = "center";

		c.fillText("Loading", canvas.width / 2, canvas.height / 2);

		c.font = "50px Arial"; 
		var dots = "";
		for (var i = 0; i < ((Date.now()/100)%4); i++) {
			dots += ".";
		}
		c.fillText(dots, canvas.width / 2, canvas.height * 0.5 + 20);

		c.font = "30px Arial"; 
		c.fillText("This game relies on audio. ", canvas.width / 2, canvas.height * 0.5 + 20 + 50, canvas.width);
		c.fillText("Make sure you have your volume turned up.", canvas.width / 2, canvas.height * 0.5 + 20 + 50 + 30, canvas.width);
		
	}
	if (state == "loaded") {
		c.font = "25px Arial"; 
		c.textAlign = "center";
		c.fillText("Click or tap anywhere to start " + name + ".", canvas.width / 2, canvas.height / 2, canvas.width);
//		c.font = "15px Arial"; 
		c.font = "30px Arial"; 
		c.fillText("This game relies on audio. ", canvas.width / 2, canvas.height * 0.5 + 20 + 50, canvas.width);
		c.fillText("Make sure you have your volume turned up.", canvas.width / 2, canvas.height * 0.5 + 20 + 50 + 30, canvas.width);
	}
	if (state == "clicked") {
		c.font = "20px Arial"; 
		c.textAlign = "center";
		c.fillText("Wow you are really good at clicking! " + mouse.x + " " + mouse.y, canvas.width / 2, canvas.height / 2);
	}
	if (state == "error") {
		c.font = "20px Arial"; 
		c.textAlign = "center";
		c.fillText("Sorry, error loading sounds! :-(", canvas.width / 2, canvas.height / 2);

	}

	requestAnimationFrame(drawStuff);
}

$(function () {
//	resizeCanvas();
//	window.addEventListener('resize', resizeCanvas, false);
	T("sin").play();
	level0();
	initMouse();
	drawStuff();
});

