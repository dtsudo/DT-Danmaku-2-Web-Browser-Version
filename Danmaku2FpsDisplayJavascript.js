
Danmaku2FpsDisplayJavascript = ((function () {
	"use strict";
	
	var numberOfFrames = 0;
	var hasAddedFpsLabel = false;
	var startTimeMillis = Date.now();
	var fpsNode = null;
	
	var frameComputedAndRendered = function () {
		numberOfFrames++;
	};
	
	var displayFps = function () {
		if (!hasAddedFpsLabel) {
			var fpsLabelNode = document.getElementById("danmaku2FpsLabel");
			if (fpsLabelNode !== null) {
				fpsLabelNode.textContent = "FPS: ";
				hasAddedFpsLabel = true;
			}
		}
		
		var currentTimeMillis = Date.now();
		if (currentTimeMillis - startTimeMillis > 2000) {
			var actualFps = numberOfFrames / 2;
			
			if (fpsNode === null)
				fpsNode = document.getElementById("danmaku2Fps");
			
			if (fpsNode !== null)
				fpsNode.textContent = actualFps.toString();
			
			numberOfFrames = 0;
			startTimeMillis = currentTimeMillis;
		}
	};
	
	return {
		frameComputedAndRendered: frameComputedAndRendered,
		displayFps: displayFps
	};
})());
