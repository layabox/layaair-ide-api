package laya.ide.event {
	
	/**
	 * IDE事件类
	 * 使用方式：Notice.notify(IDEEvent.ADD_PAGE);
	 */
	public class IDEEvent {
		
		/**
		 * 打开添加粒子页面的面板
		 */
		public static const OPEN_ADDPARTICLE:String = "";
		
		/**
		 * 添加粒子 [type:String, name:String]
		 */
		public static const ADD_PARTICLE:String = "";
		
		/**
		 * 打开添加面板页面的面板
		 */
		public static const OPEN_ADDPAGE:String = "";
		
		/**
		 * 添加面板 [type:String, name:String, imgPath:String, width:int, height:int, bgColor:int, isSceneWidth:Boolean, isSceneHeight:Boolean]
		 */
		public static const ADD_PAGE:String = "";
		
		/**
		 * 添加脚本 [type:int, name:String, className:String]
		 */
		public static const ADD_SCRIPT:String = "";
		
		/**
		 * 打开添加时间轴动画的面板
		 */
		public static const OPEN_ADD_TIMELINE_ANIMATION:String = "";
		
		/**
		 * 添加时间轴动画	[type:String, name:String, imgPath:String, width:int, height:int, bgColor:int, isSceneWidth:Boolean, isSceneHeight:Boolean]
		 */
		public static const ADD_TIMELINE_ANIMATION:String = "";
		
		/**
		 * 关闭标签页 [pagePath:String]
		 */
		public static const CLOSE_PAGE:String = "";
		
		/**
		 * 打开标签页 [pagePath:String]
		 */
		public static const OPEN_PAGE:String = "";
		
		/**
		 * 将design面板设为焦点
		 */
		public static const FOCUS_DESIGN:String = "";
		
		/**
		 * 刷新资源面板
		 */
		public static const FRESH_RES:String = "";
		/**
		 * 刷新页面面板
		 */
		public static const FRESH_PAGE:String = "";
		
		/**
		 * 刷新当前当前页面视图
		 */
		public static const FRESH_CURVIEW:String = "";
		
		/**
		 * 打开添加文件夹面板
		 */
		public static const OPEN_ADDDIR:String = "";
		
		/**
		 * 添加文件夹操作 [name:String]
		 */
		public static const ADD_DIR:String = "";
		
		///**
		//* 打开添加场景面板
		//*/
		//public static const OPEN_ADDSCENE:String = "";
		//
		///**
		//* 添加场景操作
		//*/
		//public static const ADD_SCENE:String = "";
		
		/**
		 * 打开移动文件面板
		 */
		public static const OPEN_MOVEPAGE:String = "";
		
		/**
		 * 打开组件面板
		 */
		public static const OPEN_BASICSPANEL:String = "";
		
		/**
		 * 移动文件操作 [oldPath,newPath,ifUpdate]
		 */
		public static const MOVE_PAGE:String = "";
		
		/**
		 * 打开改名面板
		 */
		public static const OPEN_RENAME:String = "";
		
		/**
		 * 改名操作 [newName:String, isUpdate:Boolean]
		 */
		public static const RENAME_PAGE:String = "";
		
		/**
		 * 打开设置页面属性面板  [fileRelativePath]
		 */
		public static const OPEN_SETPAGEPROP:String = "";
		
		/**
		 * 使用obj设置属性面板的值 [data:Object,name:String,id:int,node:Object=null]
		 */
		public static const PROPPANEL_SETBYOBJ:String = "";
		
		/**
		 * 属性面板有属性值变化 [proName:String,pro:*,targetID:int=-1,cache:Boolean=true,ifRefreshComp:Boolean=true]
		 */
		public static const PROP_CHANGE:String = "";
		
		/**
		 * 通知当前页面有属性变化
		 */
		public static const PROP_CHANGED:String = "";
		
		/**
		 * 切断节点预设 [nodeID:int]
		 */
		public static const CUTOFF_PREFAB:String = "";
		
		/**
		 * 拖动东西到渲染器
		 */
		public static const DROP_RENDER:String = "";
		
		/**
		 * 渲染器数据改变
		 */
		public static const PAGE_CHANGED:String = "";
		
		/**
		 * 资源文件变化 [file:String]
		 */
		public static const RESFILE_CHANGE:String = "";
		
		/**
		 * 显示对象被选中 [compId:int,ignoreLock:Boolean=false,ignoreHide:Boolean=false]
		 */
		public static const DISPLAY_SELECTED:String = "";
		
		/**
		 * 多个对象被选中 [compIdList:Array]
		 */
		public static const DISPLAY_MULTISELECTED:String = "";
		
		/**
		 * 对象节点选择发生变化时派发
		 */
		public static const SELECT_CHANGED:String = "";
		
		/**
		 * 进入对象 [compId:int]
		 */
		public static const DISPLAY_ENTER:String = "";
		
		/**
		 * 删除当前选中的对象
		 */
		public static const DELETE_SELECTED:String = "";
		
		/**
		 * 添加节点 [nodetype,x,y,parentID]
		 */
		public static const ADD_NODE:String = "";
		
		/**
		 * 节点树改变 通知渲染区重绘
		 */
		public static const DISPLAY_TREE_CHANGE:String = "";
		
		/**
		 * 通知时间轴面板选中帧 [frame]
		 */
		public static const TIMELINE_FRAME_SELECTED:String = "";
		
		/**
		 * 取消编辑区的选中
		 */
		public static const CLEAR_DESIGN_SELECT:String = "";
		
		/**
		 * 时间轴上的数据有变化
		 */
		public static const TIMELINE_CHANGED:String = "";
		
		/**
		 * 刷新动画数据
		 */
		public static const FRESH_ANIMATIONDATA:String = "";
		
		/**
		 * 添加动画节点 [nodeId:int]
		 */
		public static const ADD_ANIMATIONNODE:String = "";
		
		/**
		 * 动画控制 跳到第一帧
		 */
		public static const PLAYCONTROL_TOBEGINPOS:String = "";
		
		/**
		 * 动画控制 跳到前一帧
		 */
		public static const PLAYCONTROL_PRE:String = "";
		
		/**
		 * 动画控制 播放
		 */
		public static const PLAYCONTROL_PLAY:String = "";
		
		/**
		 * 动画控制 跳到下一帧
		 */
		public static const PLAYCONTROL_NEXT:String = "";
		
		/**
		 * 动画控制 跳到最后一帧
		 */
		public static const PLAYCONTROL_TOENDPOS:String = "";
		
		/**
		 * 动画控制 暂停
		 */
		public static const PLAYCONTROL_STOP:String = "";
		
		/**
		 * 动画控制 SwitchPlay
		 */
		public static const PLAYCONTROL_SWITCHPLAY:String = "";
		
		/**
		 * 刷新模板管理面板
		 */
		public static const FRESH_COMPPANEL:String = "";
		
		/**
		 * 显示标尺[ltPoint左上角坐标值,rbPoint右上角坐标值]
		 */
		public static const SHOW_RULE_RANGE:String = "";
		
		/**
		 * 关闭标尺
		 */
		public static const CLEAR_RULE_RANGE:String = "";
		
		/**
		 * 标尺显示变化
		 */
		public static const RULE_SHOW_CHANGE:String = "";
		
		/**
		 * 打开提取语言包面板
		 */
		public static const OPEN_LANGPANEL:String = "";
		
		/**
		 * 打开ide设置面板
		 */
		public static const OPEN_IDESETTING:String = "";
		
		/**
		 * 在资源面板选择资源 [file:String 资源相对地址]
		 */
		public static const SELECT_RES_FILE:String = "";
	}

}