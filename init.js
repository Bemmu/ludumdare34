var canvas = document.getElementsByClassName('canvas')[0];
var c = canvas.getContext('2d');

// Find vendor-specific way to do smooth animation
if (!window.requestAnimationFrame && window.webkitRequestAnimationFrame) {
	window.requestAnimationFrame = window.webkitRequestAnimationFrame;
}
if (!window.requestAnimationFrame && window.mozRequestAnimationFrame) {
	window.requestAnimationFrame = window.mozRequestAnimationFrame;
}

function clicked() {
	mouse.down = true;
	if (state == "loaded") {
		state = "clicked";
		start();
	}
}

function initMouse() {
	$("canvas").mousedown(function () {
		clicked();
	});

	$("canvas").mouseup(function () {
		mouse.up = true;
	});

	$("canvas").mousemove(function (x) {
		mouse.x = x.clientX;
		mouse.y = x.clientY;
	});

	document.ontouchstart = function(e){ 
		clicked();
		mouse.x = e.changedTouches[0].clientX;
		mouse.y = e.changedTouches[0].clientY;
	    e.preventDefault(); 
	}
	document.ontouchmove = function(e){ 
		mouse.x = e.changedTouches[0].clientX;
		mouse.y = e.changedTouches[0].clientY;
	    e.preventDefault(); 
	}
}



