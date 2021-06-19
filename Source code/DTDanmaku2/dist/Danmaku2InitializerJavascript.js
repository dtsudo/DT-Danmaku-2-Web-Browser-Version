
((function () {
	"use strict";
	
	var urlParams = (new URL(document.location)).searchParams;
	
	var showFps = urlParams.get("showfps") !== null
		? (urlParams.get("showfps") === "true")
		: false;
	var fps = urlParams.get("fps") !== null
		? parseInt(urlParams.get("fps"), 10)
		: 60;
	var debugMode = urlParams.get("debugmode") !== null
		? (urlParams.get("debugmode") === "true")
		: false;
	
	var initialPlayerBulletSpreadLevel = urlParams.get("playerbulletspread") !== null
		? parseInt(urlParams.get("playerbulletspread"), 10)
		: null;
	var initialPlayerBulletStrength = urlParams.get("playerbulletstrength") !== null
		? parseInt(urlParams.get("playerbulletstrength"), 10)
		: null;
	var initialNumLives = urlParams.get("numlives") !== null
		? parseInt(urlParams.get("numlives"), 10)
		: null;
	
	var isDemo = urlParams.get("demo") !== null
		? (urlParams.get("demo") === "true")
		: false;
	
	Danmaku2.Danmaku2Initializer.Start(fps, debugMode, initialPlayerBulletSpreadLevel, initialPlayerBulletStrength, initialNumLives, isDemo);
	
	var computeAndRenderNextFrame;
	
	var nextTimeToAct = Date.now() + (1000.0 / fps);
	
	computeAndRenderNextFrame = function () {
		var now = Date.now();
		
		if (nextTimeToAct > now)
			return;
		
		if (nextTimeToAct < now - 5.0*(1000.0 / fps))
			nextTimeToAct = now - 5.0*(1000.0 / fps);
		
		nextTimeToAct = nextTimeToAct + (1000.0 / fps);
		
		Danmaku2.Danmaku2Initializer.ComputeAndRenderNextFrame();
		Danmaku2FpsDisplayJavascript.frameComputedAndRendered();
		
		if (showFps) {
			Danmaku2FpsDisplayJavascript.displayFps();
		}
	};
	
	setInterval(computeAndRenderNextFrame, 10);
})());
