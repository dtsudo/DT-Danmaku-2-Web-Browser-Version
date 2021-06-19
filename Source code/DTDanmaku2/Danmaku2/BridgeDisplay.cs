
namespace Danmaku2
{
	using Danmaku2Lib;
	using System;
	using System.Collections.Generic;
	using Bridge;
	
	public abstract class BridgeDisplay<T> : IDisplay<T> where T : class, IAssets
	{
		public BridgeDisplay()
		{
		}

		public void DrawRectangle(int x, int y, int width, int height, DTColor color, bool fill)
		{
			int red = color.R;
			int green = color.G;
			int blue = color.B;
			int alpha = color.Alpha;
					
			Script.Call("Danmaku2BridgeDisplayJavascript.drawRectangle", x, y, width, height, red, green, blue, alpha, fill);
		}
		
		public void DebugPrint(int x, int y, string debugText)
		{
		}
		
		public abstract T GetAssets();
	}

	public class Danmaku2BridgeDisplay : BridgeDisplay<Danmaku2Assets>
	{
		private Danmaku2Assets assets;

		private class BridgeDanmaku2Assets : Danmaku2Assets
		{
			public override void DrawInitialLoadingScreen()
			{
			}
			
			public override bool LoadImages()
			{
				string imageNames = "";
				bool isFirst = true;
				foreach (KeyValuePair<Danmaku2Image, ImageInfo> kvp in this.imageDictionary)
				{
					if (isFirst)
						isFirst = false;
					else
						imageNames = imageNames + ",";
					imageNames = imageNames + kvp.Value.ImageName;
				}
				bool result = Script.Eval<bool>("Danmaku2BridgeImagesJavascript.loadImages('" + imageNames + "')");
												
				return result;
			}
			
			public override void DisposeImages()
			{
			}
			
			public override void DrawImageRotatedCounterclockwise(Danmaku2Image image, int x, int y, int degreesScaled, int scalingFactorScaled)
			{
				Script.Call("Danmaku2BridgeImagesJavascript.drawImageRotatedCounterclockwise", this.imageDictionary[image].ImageName, x, y, degreesScaled, scalingFactorScaled);
			}
					
			public override bool LoadSounds()
			{
				if (this.soundDictionary.Count == 0)
					return true;
				
				string soundNames = "";
				bool isFirst = true;
				foreach (KeyValuePair<Danmaku2Sound, SoundInfo> kvp in this.soundDictionary)
				{
					if (isFirst)
						isFirst = false;
					else
						soundNames = soundNames + ",";
					soundNames = soundNames + kvp.Value.SoundName;
				}
				bool result = Script.Eval<bool>("Danmaku2BridgeSoundsJavascript.loadSounds('" + soundNames + "')");
				
				return result;
			}
			
			public override void PlaySound(Danmaku2Sound sound, int volume)
			{
				double finalVolume = (this.soundDictionary[sound].Volume / 100.0) * (volume / 100.0);
				if (finalVolume > 1.0)
					finalVolume = 1.0;
				if (finalVolume < 0.0)
					finalVolume = 0.0;
				
				if (finalVolume > 0.0)
					Script.Call("Danmaku2BridgeSoundsJavascript.playSound", this.soundDictionary[sound].SoundName, finalVolume);
			}
			
			public override void DisposeSounds()
			{
			}
			
			public override bool LoadMusic()
			{
				if (this.musicDictionary.Count == 0)
					return true;
				
				string musicNames = "";
				bool isFirst = true;
				foreach (KeyValuePair<Danmaku2Music, MusicInfo> kvp in this.musicDictionary)
				{
					if (isFirst)
						isFirst = false;
					else
						musicNames = musicNames + ",";
					musicNames = musicNames + kvp.Value.MusicName;
				}
				bool result = Script.Eval<bool>("Danmaku2BridgeMusicJavascript.loadMusic('" + musicNames + "')");
				
				return result;
			}
			
			public override void PlayMusic(Danmaku2Music music, int volume)
			{
				double finalVolume = (this.musicDictionary[music].Volume / 100.0) * (volume / 100.0);
				if (finalVolume > 1.0)
					finalVolume = 1.0;
				if (finalVolume < 0.0)
					finalVolume = 0.0;
				
				Script.Call("Danmaku2BridgeMusicJavascript.playMusic", this.musicDictionary[music].MusicName, finalVolume);
			}
			
			public override void StopMusic()
			{
				Script.Call("Danmaku2BridgeMusicJavascript.stopMusic");
			}
			
			public override void DisposeMusic()
			{
			}
		}

		public Danmaku2BridgeDisplay()
		{
			this.assets = new BridgeDanmaku2Assets();
		}

		public override Danmaku2Assets GetAssets()
		{
			return this.assets;
		}
	}
}
