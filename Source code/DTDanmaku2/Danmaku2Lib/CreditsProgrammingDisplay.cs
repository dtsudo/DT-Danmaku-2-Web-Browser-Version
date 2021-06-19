﻿
namespace Danmaku2Lib
{
	public class CreditsProgrammingDisplay
	{
		public static void Render(
			int x,
			int y,
			bool isWebBrowserVersion,
			IDisplay<Danmaku2Assets> display)
		{
			if (isWebBrowserVersion)
			{
				Danmaku2Image image = Danmaku2Image.CreditsProgrammingWebBrowserVersion;

				display.GetAssets().DrawImage(
					image: image,
					x: x + 5,
					y: y + 5);
			}
		}
	}
}
