package laya.ide.plugin.as3plugin {
	import ide.managers.Notice;
	import laya.events.Event;
	import laya.ide.plugin.PluginDialog;
	import laya.ui.Box;
	import laya.ui.Button;
	import laya.ui.Label;
	
	/**
	 * 弹出框式插件Demo
	 * 本demo演示如何创建一个自己的对话框
	 */
	public class TestPluginDialog extends PluginDialog {
		public var text:Label;
		
		public function TestPluginDialog() {
			creatUI();
			init();
		}
		
		/**
		 * 创建UI
		 */
		private function creatUI():void {
			var box:Box;
			box = new Box();
			text = new Label();
			text.color = "#ff0000";
			box.addChild(text);
			box.size(300, 300);
			text.top = text.bottom = text.left = text.right = 0;
			text.text = "hello plugin Dialog";
			var btn:Button;
			btn = new Button();
			btn.skin = "comp/button.png";
			box.addChild(btn);
			btn.right = 20;
			btn.bottom = 5;
			btn.label = "OK";
			btn.on(Event.MOUSE_DOWN, this, btnClick);
			setContent(box);
		}
		
		/**
		 * 点击关闭
		 */
		private function btnClick():void {
			this.close();
		}
		
		/**
		 * 初始化时创建消息监听
		 */
		public function init():void {
			//监听注册的菜单消息
			Notice.listen("openas3Dialog", this, this.popup);
			Notice.listen("closeas3Dialog", this, this.close);
		}
	}
}