
namespace Danmaku2
{
	using Danmaku2Lib;
	using Bridge;
	
	public class BridgeMouse : IMouse
	{
		public BridgeMouse()
		{
		}
		
		public int GetX()
		{
			return Script.Write<int>("Danmaku2BridgeMouseJavascript.getMouseX()");
		}

		public int GetY()
		{
			return Script.Write<int>("Danmaku2BridgeMouseJavascript.getMouseY()");
		}

		public bool IsLeftMouseButtonPressed()
		{
			return Script.Write<bool>("Danmaku2BridgeMouseJavascript.isLeftMouseButtonPressed()");
		}

		public bool IsRightMouseButtonPressed()
		{
			return Script.Write<bool>("Danmaku2BridgeMouseJavascript.isRightMouseButtonPressed()");
		}
	}
}
