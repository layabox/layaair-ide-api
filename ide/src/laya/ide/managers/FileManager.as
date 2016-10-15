package laya.ide.managers {
	
	/**
	 * 文件管理类
	 */
	public class FileManager {
		
		/**
		 * 获得绝对路径
		 * @param basePath 根路径
		 * @param relativePath 相对路径
		 * @return 绝对路径
		 */
		public static function getPath(basePath:String, relativePath:String):String {
			return "";
		}
		
		/**
		 * 获得相对路径
		 * @param basePath 根路径
		 * @param targetPath 绝对路径
		 * @return 相对路径
		 */
		public static function getRelativePath(basePath:String, targetPath:String):String {
			return "";
		}
		
		/**
		 * 创建目录
		 * @param path 目录路径
		 */
		public static function createDirectory(path:String):void {
		}
		
		/**
		 * 创建文本文件
		 * @param path 文件路径
		 * @param value 文件内容
		 */
		public static function createTxtFile(path:String, value:String):void {
		}
		
		/**
		 * 创建json文件
		 * @param path 文件路径
		 * @param value json对象
		 */
		public static function createJSONFile(path:String, value:Object):void {
		}
		
		/**
		 * 删除文件(到回收站)
		 * @param path 文件路径
		 */
		public static function removeFile(path:String):void {
		}
		
		/**
		 * 复制文件
		 * @param from 源文件
		 * @param to 目标路径
		 */
		public static function copyFile(from:String, to:String):void {
		}
		
		/**
		 * 读取文本文件
		 * @param path 文件路径
		 * @param errorAlert 出错是否弹出提示
		 * @return 文件内容
		 */
		public static function readTxtFile(path:String, errorAlert:Boolean = true):String {
			return null;
		}
		
		/**
		 * 读取JSON文件
		 * @param path 文件路径
		 * @param errorAlert 出错是否弹出提示
		 * @return json对象
		 */
		public static function readJSONFile(path:String, errorAlert:Boolean = true):Object {
			return null;
		}
		
		/**
		 * 获取文件夹下的文件列表
		 * @param path 文件夹路径
		 * @return 文件列表
		 */
		public static function getFileList(path:String):Array {
			return null
		}
		
		/**
		 * 判断文件是否存在
		 * @param path 文件路径
		 * @return 是否存在
		 */
		public static function exists(path:String):Boolean {
			return false;
		}
	}
}