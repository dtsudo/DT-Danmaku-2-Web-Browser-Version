
Danmaku2BridgeImagesJavascript = ((function () {
	"use strict";
	
	var imgDict = {};
	var canvas = null;
	var context = null;
	var radianConversion = -1.0 / 128.0 * (2.0 * Math.PI / 360.0);
	
	var numberOfImagesLoaded = 0;
	
	var loadImages = function (imageNames) {
		var imageNamesArray = imageNames.split(",");
		
		var count = 0;
		
		for (var i = 0; i < imageNamesArray.length; i++) {
			var imageName = imageNamesArray[i];
			
			if (imgDict[imageName])
				continue;
			
			var imgPath = "Data/Images/" + imageName;
			var img = new Image();
			img.addEventListener("load", function () {
				numberOfImagesLoaded++;
			});
			img.src = imgPath;
			imgDict[imageName] = img;
			
			count++;
			if (count === 15) // arbitrary
				return false;
		}
		
		return numberOfImagesLoaded === imageNamesArray.length;
	};
	
	var drawImageRotatedCounterclockwise = function (imageName, x, y, degreesScaled, scalingFactorScaled) {
		if (canvas === null) {
			canvas = document.getElementById("danmaku2Canvas");
			if (canvas !== null)
				context = canvas.getContext("2d");
			else
				return;
		}
		
		var img = imgDict[imageName];
		
		if (degreesScaled === 0 && scalingFactorScaled === 128) {
			context.drawImage(img, x, y);
			return;
		}
		
		var scalingFactor = scalingFactorScaled / 128.0;
		
		context.translate(x, y);
		context.scale(scalingFactor, scalingFactor);
		
		context.translate(img.width / 2, img.height / 2);
		context.rotate(degreesScaled * radianConversion);
		context.translate(-img.width / 2, -img.height / 2);
		
		context.drawImage(img, 0, 0);
					
		context.setTransform(1, 0, 0, 1, 0, 0);
	};
	
	return {
		loadImages: loadImages,
		drawImageRotatedCounterclockwise: drawImageRotatedCounterclockwise
	};
})());
