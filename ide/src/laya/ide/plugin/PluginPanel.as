package laya.ide.plugin {
	import laya.ui.Box;
	
	/**
	 * IDE浮动面板扩展基类，实现类似属性面板的扩展，请继承此类
	 */
	public class PluginPanel extends Box {
		
		/**
		 * 在IDE内显示
		 */
		public function show():void {
		}
		
		/**
		 * 在IDE内关闭
		 */
		public function close():void {
		}
	}

}