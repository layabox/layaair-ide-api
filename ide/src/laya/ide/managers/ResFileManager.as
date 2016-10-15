package laya.ide.managers {
	
	/**
	 * 编辑器资源管理器，用来替换实际组件的资源管理
	 */
	public class ResFileManager {
		
		/**
		 * 资源根目录
		 */
		public static var basePath:String = "";
		
		/**
		 * 清理缓存
		 * @param	url 地址
		 */
		public static function clearRes(url:String):void {
		}
		
		/**
		 * 获取已加载资源(如有缓存)
		 * @param	url 地址
		 * @return	返回资源
		 */
		public static function getRes(url:String):* {
			return null;
		}
		
		/**
		 * 是否有资源
		 * @param url 资源地址
		 * @return 是否有这个资源
		 */
		public static function hasRes(url:String):Boolean {
			return false;
		}
		
		/**
		 * 缓存资源
		 * @param	url 资源地址
		 * @param	data 要缓存的内容
		 */
		public static function cacheRes(url:String, data:*):void {
		}
		
		/**
		 * 将路径转换为统一的格式
		 * @param url 资源地址
		 * @return 格式化地址
		 */
		public static function adptToCommonUrl(url:String):String {
			return "";
		}
		
		/**
		 * 获取ide中的资源路径
		 * @param url 资源相对地址
		 * @return 返回IDE绝对地址
		 */
		public static function getIDEResPath(url:String):String {
			return "";
		}
		
		/**
		 * 获取ide中的页面路径
		 * @param url 页面相对地址
		 * @return 返回页面绝对地址
		 */
		public static function getIDEPagePath(url:String):String {
			return "";
		}
		
		/**
		 * 获取 laya/icons/components/ 下的图片资源路径
		 * @param iconSign 图片名
		 * @return 返回icon地址
		 */
		public static function getIDECompIconPath(iconSign:String):String {
			return "";
		}
	}
}