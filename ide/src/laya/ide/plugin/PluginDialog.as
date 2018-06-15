package laya.ide.plugin {
	import laya.ui.Box;
	import laya.ui.Dialog;
	
	/**
	 * IDE插件对话框基类，用as3扩展IDE插件对话框，请继承此类
	 */
	public class PluginDialog extends Dialog {
		
		/**
		 * 设置对话框的UI对象
		 * @param	content UI对象
		 */
		public function setContent(content:Box):void {	
		}
	}
}