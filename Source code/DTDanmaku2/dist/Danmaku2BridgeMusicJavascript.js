
Danmaku2BridgeMusicJavascript = ((function () {
	"use strict";
		
	var musicDictionary = {};
	
	var numberOfAudioObjectsLoaded = 0;
	
	var loadMusic = function (musicNames) {
		var musicNamesArray = musicNames.split(",");
		
		var numberOfAudioObjects = musicNamesArray.length;
		
		for (var i = 0; i < musicNamesArray.length; i++) {
			var musicName = musicNamesArray[i];
			
			if (musicDictionary[musicName])
				continue;
						
			var musicPath = "Data/Audio/" + musicName;
			
			var audio = new Audio(musicPath);
			audio.addEventListener("canplaythrough", function () {
				numberOfAudioObjectsLoaded++;
			});
			audio.loop = true;
			
			musicDictionary[musicName] = audio;
		}
		
		return numberOfAudioObjects === numberOfAudioObjectsLoaded;
	};
	
	var playMusic = function (musicName, volume) {
		var music = musicDictionary[musicName];
		
		if (volume > 1.0)
			volume = 1.0;
		if (volume < 0.0)
			volume = 0.0;
						
		for (var m in musicDictionary) {
			var audio = musicDictionary[m];
			
			if (audio === music) {
				audio.volume = volume;
				var audioPromise = audio.play();
				if (audioPromise) {
					audioPromise.then(function () {}, function () {});
				}
			} else {
				audio.pause();
				audio.currentTime = 0;
			}
		}
	};
	
	var stopMusic = function () {
		for (var musicName in musicDictionary) {
			var audio = musicDictionary[musicName];
			audio.pause();
			audio.currentTime = 0;
		}
	};
	
	return {
		loadMusic: loadMusic,
		playMusic: playMusic,
		stopMusic: stopMusic
	};
})());
