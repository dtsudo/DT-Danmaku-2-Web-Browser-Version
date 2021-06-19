
Danmaku2BridgeDisplayJavascript = ((function () {
	"use strict";
	
	var canvas = null;
	var context = null;
			
	var drawRectangle = function (x, y, width, height, red, green, blue, alpha, fill) {
		if (canvas === null) {
			canvas = document.getElementById("danmaku2Canvas");		
			if (canvas === null)
				return;	
			context = canvas.getContext("2d");
		}
		
		context.fillStyle = "rgba(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ", " + (alpha / 255).toString() + ")";
		context.strokeStyle = "rgba(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ", " + (alpha / 255).toString() + ")";
		
		if (fill)
			context.fillRect(x, y, width, height);
		else
			context.strokeRect(x, y, width, height);
	};
	
	var clearCanvas = function () {
		if (canvas === null) {
			canvas = document.getElementById("danmaku2Canvas");		
			if (canvas === null)
				return;	
			context = canvas.getContext("2d");
		}
		
		context.clearRect(0, 0, canvas.width, canvas.height);
	};
	
	return {
		drawRectangle: drawRectangle,
		clearCanvas: clearCanvas
	};
})());
