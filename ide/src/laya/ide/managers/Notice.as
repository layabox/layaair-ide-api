package ide.managers {
	import laya.events.EventDispatcher;
	
	/**
	 * 消息中心，用来发送IDEEvent类定义的事件，调用IDE内部功能
	 */
	public class Notice extends EventDispatcher {
		
		/**
		 * 发送一个消息
		 * @param type 消息类型，IDEEvent内定义的事件类型
		 * @param data 消息携带的数据，多参数使用数组
		 */
		public static function notify(type:String, data:Object = null):void {
		}
		
		/**
		 * 监听一个消息
		 * @param type 消息类型，IDEEvent内定义的事件类型
		 * @param caller 事件侦听函数的执行域
		 * @param fun 事件侦听函数。
		 * @param args 事件侦听函数的回调参数
		 */
		public static function listen(type:String, caller:*, fun:Function, args:Array = null, cancelBefore:Boolean = false):void {
		}
		
		/**
		 * 取消监听消息
		 * @param type 消息类型，IDEEvent内定义的事件类型
		 * @param caller 事件侦听函数的执行域
		 * @param fun 事件侦听函数。
		 */
		public static function cancel(type:String, caller:*, fun:Function):void {
		}
	}

}