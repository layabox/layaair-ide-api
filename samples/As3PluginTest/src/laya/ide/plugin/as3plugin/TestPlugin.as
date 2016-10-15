package laya.ide.plugin.as3plugin
{
	import ide.managers.Notice;
	import laya.display.Sprite;
	import laya.display.Text;
	import laya.ide.event.IDEEvent;
	import laya.ide.plugin.PluginPanel;
	import laya.ui.Box;
	import laya.ui.Label;
	
	/**
	 * 面板式插件Demo
	 * 本demo演示如何像属性面板一样显示编辑器当前选中对象的数据信息
	 */
	public class TestPlugin extends PluginPanel
	{
		
		public function TestPlugin()
		{
			creatUI();
			init();
		}
		public var text:Label;
		/**
		 * 创建UI
		 */
		private function creatUI():void
		{
			text = new Label();
			text.color = "#ff0000";
			addChild(text);
			text.top = text.bottom = text.left = text.right = 0;
		}
		/**
		 * 初始化时创建消息监听
		 */
		public function init():void
		{
			//监听设置属性面板数据的消息
			Notice.listen(IDEEvent.PROPPANEL_SETBYOBJ, this, initByObj);
			
			//监听注册的菜单消息
			Notice.listen("openas3plugin", this, this.show);
			Notice.listen("closeas3plugin", this, this.close);
		}
		/**
		 * 显示数据
		 */
		public function initByObj(data:Object, name:String, id:int):void
		{
			var tKey:String;
			var tStr:String = "";
			var lines:Array = [];
			for (tKey in data)
			{
				lines.push(tKey + ":" + data[tKey]);
			}
			tStr = lines.join("\n");
			this.text.text= tStr;
		}
	}

}