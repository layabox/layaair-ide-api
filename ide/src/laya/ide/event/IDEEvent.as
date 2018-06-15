package laya.ide.event {
	
	/**
	 * IDE事件类
	 * 使用方式：Notice.notify(IDEEvent.ADD_PAGE);
	 */
	public class IDEEvent {
		
		/**
		 * 打开添加粒子页面的面板
		 */
		public static var OPEN_ADDPARTICLE:String = "";
		
		/**
		 * 添加粒子 [type:String, name:String]
		 */
		public static var ADD_PARTICLE:String = "";
		
		/**
		 * 打开添加面板页面的面板
		 */
		public static var OPEN_ADDPAGE:String = "";
		
		/**
		 * 添加面板 [type:String, name:String, imgPath:String, width:int, height:int, bgColor:int, isSceneWidth:Boolean, isSceneHeight:Boolean]
		 */
		public static var ADD_PAGE:String = "";
		
		/**
		 * 添加脚本 [type:int, name:String, className:String]
		 */
		public static var ADD_SCRIPT:String = "";
		
		/**
		 * 打开添加时间轴动画的面板
		 */
		public static var OPEN_ADD_TIMELINE_ANIMATION:String = "";
		
		/**
		 * 添加时间轴动画	[type:String, name:String, imgPath:String, width:int, height:int, bgColor:int, isSceneWidth:Boolean, isSceneHeight:Boolean]
		 */
		public static var ADD_TIMELINE_ANIMATION:String = "";
		
		/**
		 * 关闭标签页 [pagePath:String]
		 */
		public static var CLOSE_PAGE:String = "";
		
		/**
		 * 打开标签页 [pagePath:String]
		 */
		public static var OPEN_PAGE:String = "";
		
		/**
		 * 将design面板设为焦点
		 */
		public static var FOCUS_DESIGN:String = "";
		
		/**
		 * 刷新资源面板
		 */
		public static var FRESH_RES:String = "";
		/**
		 * 刷新页面面板
		 */
		public static var FRESH_PAGE:String = "";
		
		/**
		 * 刷新当前当前页面视图
		 */
		public static var FRESH_CURVIEW:String = "";
		
		/**
		 * 打开添加文件夹面板
		 */
		public static var OPEN_ADDDIR:String = "";
		
		/**
		 * 添加文件夹操作 [name:String]
		 */
		public static var ADD_DIR:String = "";
		
		///**
		//* 打开添加场景面板
		//*/
		//public static var OPEN_ADDSCENE:String = "";
		//
		///**
		//* 添加场景操作
		//*/
		//public static var ADD_SCENE:String = "";
		
		/**
		 * 打开移动文件面板
		 */
		public static var OPEN_MOVEPAGE:String = "";
		
		/**
		 * 打开组件面板
		 */
		public static var OPEN_BASICSPANEL:String = "";
		
		/**
		 * 移动文件操作 [oldPath,newPath,ifUpdate]
		 */
		public static var MOVE_PAGE:String = "";
		
		/**
		 * 打开改名面板
		 */
		public static var OPEN_RENAME:String = "";
		
		/**
		 * 改名操作 [newName:String, isUpdate:Boolean]
		 */
		public static var RENAME_PAGE:String = "";
		
		/**
		 * 打开设置页面属性面板  [fileRelativePath]
		 */
		public static var OPEN_SETPAGEPROP:String = "";
		
		/**
		 * 使用obj设置属性面板的值 [data:Object,name:String,id:int,node:Object=null]
		 */
		public static var PROPPANEL_SETBYOBJ:String = "";
		
		/**
		 * 属性面板有属性值变化 [proName:String,pro:*,targetID:int=-1,cache:Boolean=true,ifRefreshComp:Boolean=true]
		 */
		public static var PROP_CHANGE:String = "";
		
		/**
		 * 通知当前页面有属性变化
		 */
		public static var PROP_CHANGED:String = "";
		
		/**
		 * 切断节点预设 [nodeID:int]
		 */
		public static var CUTOFF_PREFAB:String = "";
		
		/**
		 * 拖动东西到渲染器
		 */
		public static var DROP_RENDER:String = "";
		
		/**
		 * 渲染器数据改变
		 */
		public static var PAGE_CHANGED:String = "";
		
		/**
		 * 资源文件变化 [file:String]
		 */
		public static var RESFILE_CHANGE:String = "";
		
		/**
		 * 显示对象被选中 [compId:int,ignoreLock:Boolean=false,ignoreHide:Boolean=false]
		 */
		public static var DISPLAY_SELECTED:String = "";
		
		/**
		 * 多个对象被选中 [compIdList:Array]
		 */
		public static var DISPLAY_MULTISELECTED:String = "";
		
		/**
		 * 对象节点选择发生变化时派发
		 */
		public static var SELECT_CHANGED:String = "";
		
		/**
		 * 进入对象 [compId:int]
		 */
		public static var DISPLAY_ENTER:String = "";
		
		/**
		 * 删除当前选中的对象
		 */
		public static var DELETE_SELECTED:String = "";
		
		/**
		 * 添加节点 [nodetype,x,y,parentID]
		 */
		public static var ADD_NODE:String = "";
		
		/**
		 * 节点树改变 通知渲染区重绘
		 */
		public static var DISPLAY_TREE_CHANGE:String = "";
		
		/**
		 * 通知时间轴面板选中帧 [frame]
		 */
		public static var TIMELINE_FRAME_SELECTED:String = "";
		
		/**
		 * 取消编辑区的选中
		 */
		public static var CLEAR_DESIGN_SELECT:String = "";
		
		/**
		 * 时间轴上的数据有变化
		 */
		public static var TIMELINE_CHANGED:String = "";
		
		/**
		 * 刷新动画数据
		 */
		public static var FRESH_ANIMATIONDATA:String = "";
		
		/**
		 * 添加动画节点 [nodeId:int]
		 */
		public static var ADD_ANIMATIONNODE:String = "";
		
		/**
		 * 动画控制 跳到第一帧
		 */
		public static var PLAYCONTROL_TOBEGINPOS:String = "";
		
		/**
		 * 动画控制 跳到前一帧
		 */
		public static var PLAYCONTROL_PRE:String = "";
		
		/**
		 * 动画控制 播放
		 */
		public static var PLAYCONTROL_PLAY:String = "";
		
		/**
		 * 动画控制 跳到下一帧
		 */
		public static var PLAYCONTROL_NEXT:String = "";
		
		/**
		 * 动画控制 跳到最后一帧
		 */
		public static var PLAYCONTROL_TOENDPOS:String = "";
		
		/**
		 * 动画控制 暂停
		 */
		public static var PLAYCONTROL_STOP:String = "";
		
		/**
		 * 动画控制 SwitchPlay
		 */
		public static var PLAYCONTROL_SWITCHPLAY:String = "";
		
		/**
		 * 刷新模板管理面板
		 */
		public static var FRESH_COMPPANEL:String = "";
		
		/**
		 * 显示标尺[ltPoint左上角坐标值,rbPoint右上角坐标值]
		 */
		public static var SHOW_RULE_RANGE:String = "";
		
		/**
		 * 关闭标尺
		 */
		public static var CLEAR_RULE_RANGE:String = "";
		
		/**
		 * 标尺显示变化
		 */
		public static var RULE_SHOW_CHANGE:String = "";
		
		/**
		 * 打开提取语言包面板
		 */
		public static var OPEN_LANGPANEL:String = "";
		
		/**
		 * 打开ide设置面板
		 */
		public static var OPEN_IDESETTING:String = "";
		
		/**
		 * 在资源面板选择资源 [file:String 资源相对地址]
		 */
		public static var SELECT_RES_FILE:String = "";
	}

}