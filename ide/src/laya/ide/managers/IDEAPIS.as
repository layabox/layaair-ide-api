package laya.ide.managers {
	
	/**
	 * IDE API函数
	 */
	public class IDEAPIS {
		
		/**
		 * 通知节点变化
		 * @param nodeData 当前节点数据
		 * @param changeProps 改变的属性列表，比如["x","width","scaleX"]
		 * @param refresh 是否重新刷新整个视图
		 */
		public static function nodeChange(nodeData:Object, changeProps:Array, refresh:Boolean = false):void {
		}
		
		/**
		 * 获取当前编辑器选中对象列表
		 * @return 选中对象列表
		 */
		public static function getSelectComps():Array {
			return null;
		}
		
		/**
		 * 获取当前编辑区编辑的页面路径
		 * @return 返回页面的绝对路径
		 */
		public static function getCurPagePath():String {
			return null;
		}
		
		/**
		 * 获取当前编辑区编辑的页面类型
		 * @return 返回页面类型，比如page,particle等
		 */
		public static function getCurPageType():String {
			return null;
		}
		
		/**
		 * 获取当前编辑页面的数据
		 */
		public static function getDesignData():Object {
			return null;
		}
		
		/**
		 * 当前工作目录
		 */
		public static function get workPath():String {
			return null;
		}
		
		/**
		 * 页面文件存放目录
		 */
		public static function get pagesPath():String {
			return null;
		}
		
		/**
		 * 资源文件存放的目录
		 */
		public static function get assetsPath():String {
			return null;
		}
		
		/**
		 * 导出代码的目录
		 */
		public static function get codeExportPath():String {
			return null;
		}
		
		/**
		 * 导出图集资源的目录
		 */
		public static function get resExportPath():String {
			return null;
		}
		
		/**
		 * 导出非图集资源的目录
		 */
		public static function get asynResExportPath():String {
			return null;
		}
	}

}