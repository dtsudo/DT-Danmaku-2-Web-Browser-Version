
Danmaku2BridgeSoundsJavascript = ((function () {
	"use strict";
		
	var soundDictionary = {};
	
	var numberOfAudioObjectsLoaded = 0;
	
	var loadSounds = function (soundNames) {
		var soundNamesArray = soundNames.split(",");
		
		var numberOfAudioObjects = soundNamesArray.length * 10;
		
		for (var i = 0; i < soundNamesArray.length; i++) {
			var soundName = soundNamesArray[i];
			
			if (soundDictionary[soundName])
				continue;
			
			soundDictionary[soundName] = [];
			
			var soundPath = "Data/Audio/" + soundName;
			for (var j = 0; j < 10; j++) {
				var audio = new Audio(soundPath);
				audio.addEventListener("canplaythrough", function () {
					numberOfAudioObjectsLoaded++;
				});
				
				soundDictionary[soundName].push(audio);
			}
		}
		
		return numberOfAudioObjects === numberOfAudioObjectsLoaded;
	};
	
	var playSound = function (soundName, volume) {
		var sound = soundDictionary[soundName];
		
		if (volume > 1.0)
			volume = 1.0;
		if (volume < 0.0)
			volume = 0.0;
		
		var audio = sound[0];
		
		for (var i = 0; i < sound.length; i++) {
			if (i === sound.length - 1)
				sound[i] = audio;
			else
				sound[i] = sound[i+1];
		}
		
		audio.volume = volume;
		audio.play();
	};
	
	return {
		loadSounds: loadSounds,
		playSound: playSound
	};
})());
