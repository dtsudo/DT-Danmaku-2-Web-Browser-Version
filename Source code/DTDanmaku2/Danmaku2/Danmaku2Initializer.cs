
namespace Danmaku2
{
	using Danmaku2Lib;
	using Bridge;

	public class Danmaku2Initializer
	{
		private static IKeyboard bridgeKeyboard;
		private static IMouse bridgeMouse;
		private static IKeyboard previousKeyboard;
		private static IMouse previousMouse;
		
		private static IDisplay<Danmaku2Assets> display;
		
		private static IFrame<Danmaku2Assets> frame;
		
		private static void ClearCanvas()
		{
			Script.Write("Danmaku2BridgeDisplayJavascript.clearCanvas()");
		}
		
		public static void Start(
			int fps, 
			bool debugMode, 
			int? initialPlayerBulletSpreadLevel,
			int? initialPlayerBulletStrength,
			int? initialNumLives,
			bool isDemo)
		{
			PlayerBulletSpreadLevel? initialPlayerBulletSpreadLevelEnum = null;
			
			if (initialPlayerBulletSpreadLevel.HasValue && initialPlayerBulletSpreadLevel.Value == 1)
				initialPlayerBulletSpreadLevelEnum = PlayerBulletSpreadLevel.ThreeBullets;
			if (initialPlayerBulletSpreadLevel.HasValue && initialPlayerBulletSpreadLevel.Value == 2)
				initialPlayerBulletSpreadLevelEnum = PlayerBulletSpreadLevel.FiveBullets;
			if (initialPlayerBulletSpreadLevel.HasValue && initialPlayerBulletSpreadLevel.Value >= 3)
				initialPlayerBulletSpreadLevelEnum = PlayerBulletSpreadLevel.SevenBullets;
			
			PlayerBulletStrength? initialPlayerBulletStrengthEnum = null;
			
			if (initialPlayerBulletStrength.HasValue && initialPlayerBulletStrength.Value == 1)
				initialPlayerBulletStrengthEnum = PlayerBulletStrength.Level1;
			if (initialPlayerBulletStrength.HasValue && initialPlayerBulletStrength.Value == 2)
				initialPlayerBulletStrengthEnum = PlayerBulletStrength.Level2;
			if (initialPlayerBulletStrength.HasValue && initialPlayerBulletStrength.Value >= 3)
				initialPlayerBulletStrengthEnum = PlayerBulletStrength.Level3;
			
			frame = Danmaku2.GetFirstFrame(
				globalState: new GlobalState(
					fps: fps,
					nonGameLogicRng: new DTRandom(),
					guidGenerator: new GuidGenerator(guidString: "347354247161643025"),
					isWebBrowserVersion: true,
					initialPlayerBulletSpreadLevel: initialPlayerBulletSpreadLevelEnum,
					initialPlayerBulletStrength: initialPlayerBulletStrengthEnum,
					initialNumLives: initialNumLives,
					debugMode: debugMode,
					initialSoundVolume: null,
					initialMusicVolume: null),
				skipToLevel1HardDifficulty: false,
				isDemo: isDemo);

			bridgeKeyboard = new BridgeKeyboard();
			bridgeMouse = new BridgeMouse();
						
			display = new Danmaku2BridgeDisplay();
			
			previousKeyboard = new EmptyKeyboard();
			previousMouse = new EmptyMouse();
			
			ClearCanvas();
			frame.Render(display);
		}
		
		public static void ComputeAndRenderNextFrame()
		{
			IKeyboard currentKeyboard = new CopiedKeyboard(bridgeKeyboard);
			IMouse currentMouse = new CopiedMouse(bridgeMouse);
			
			frame = frame.GetNextFrame(currentKeyboard, currentMouse, previousKeyboard, previousMouse, display);
			frame.ProcessMusic();
			ClearCanvas();
			frame.Render(display);
			frame.RenderMusic(display);
			
			previousKeyboard = new CopiedKeyboard(currentKeyboard);
			previousMouse = new CopiedMouse(currentMouse);
		}
	}
}
