var window = window || global;
var document = document || (window.document = {});
/***********************************/
/*http://www.layabox.com 2016/05/19*/
/***********************************/
var Laya=window.Laya=(function(window,document){
	var Laya={
		__internals:[],
		__packages:{},
		__classmap:{'Object':Object,'Function':Function,'Array':Array,'String':String},
		__sysClass:{'object':'Object','array':'Array','string':'String','dictionary':'Dictionary'},
		__propun:{writable: true,enumerable: false,configurable: true},
		__presubstr:String.prototype.substr,
		__substr:function(ofs,sz){return arguments.length==1?Laya.__presubstr.call(this,ofs):Laya.__presubstr.call(this,ofs,sz>0?sz:(this.length+sz));},
		__init:function(_classs){_classs.forEach(function(o){o.__init$ && o.__init$();});},
		__isClass:function(o){return o && (o.__isclass || o==Object || o==String || o==Array);},
		__newvec:function(sz,value){
			var d=[];
			d.length=sz;
			for(var i=0;i<sz;i++) d[i]=value;
			return d;
		},
		__extend:function(d,b){
			for (var p in b){
				if (!b.hasOwnProperty(p)) continue;
				var g = Object.getOwnPropertyDescriptor(b, p).get, s = Object.getOwnPropertyDescriptor(b, p).set; 
				if ( g || s ) {
					g && Object.defineProperty(d, p, g);
					s && Object.defineProperty(d, p, s);
				}
				else d[p] = b[p];
			}
			function __() { Laya.un(this,'constructor',d); }__.prototype=b.prototype;d.prototype=new __();Laya.un(d.prototype,'__imps',Laya.__copy({},b.prototype.__imps));
		},
		__copy:function(dec,src){
			if(!src) return null;
			dec=dec||{};
			for(var i in src) dec[i]=src[i];
			return dec;
		},
		__package:function(name,o){
			if(Laya.__packages[name]) return;
			Laya.__packages[name]=true;
			var p=window,strs=name.split('.');
			if(strs.length>1){
				for(var i=0,sz=strs.length-1;i<sz;i++){
					var c=p[strs[i]];
					p=c?c:(p[strs[i]]={});
				}
			}
			p[strs[strs.length-1]] || (p[strs[strs.length-1]]=o||{});
		},
		__hasOwnProperty:function(name,o){
			o=o ||this;
		    function classHas(name,o){
				if(Object.hasOwnProperty.call(o.prototype,name)) return true;
				var s=o.prototype.__super;
				return s==null?null:classHas(name,s);
			}
			return (Object.hasOwnProperty.call(o,name)) || classHas(name,o.__class);
		},
		__typeof:function(o,value){
			if(!o || !value) return false;
			if(value===String) return (typeof o==='string');
			if(value===Number) return (typeof o==='number');
			if(value.__interface__) value=value.__interface__;
			else if(typeof value!='string')  return (o instanceof value);
			return (o.__imps && o.__imps[value]) || (o.__class==value);
		},
		__as:function(value,type){
			return (this.__typeof(value,type))?value:null;
		},		
		interface:function(name,_super){
			Laya.__package(name,{});
			var ins=Laya.__internals;
			var a=ins[name]=ins[name] || {self:name};
			if(_super)
			{
				var supers=_super.split(',');
				a.extend=[];
				for(var i=0;i<supers.length;i++){
					var name=supers[i];
					ins[name]=ins[name] || {self:name};
					a.extend.push(ins[name]);
				}
			}
			var o=window,words=name.split('.');
			for(var i=0;i<words.length-1;i++) o=o[words[i]];o[words[words.length-1]]={__interface__:name};
		},
		class:function(o,fullName,_super,miniName){
			_super && Laya.__extend(o,_super);
			if(fullName){
				Laya.__package(fullName,o);
				Laya.__classmap[fullName]=o;
				if(fullName.indexOf('.')>0){
					if(fullName.indexOf('laya.')==0){
						var paths=fullName.split('.');
						miniName=miniName || paths[paths.length-1];
						if(miniName!="Image")
						{
							if(Laya[miniName]) console.log("Warning!,this class["+miniName+"] already exist:",Laya[miniName]);
							Laya[miniName]=o;
						}
					}
				}
				else {
					if(fullName=="Main")
						window.Main=o;
					else{
						if(Laya[fullName]){
							console.log("Error!,this class["+fullName+"] already exist:",Laya[fullName]);
						}
						Laya[fullName]=o;
					}
				}
			}
			var un=Laya.un,p=o.prototype;
			un(p,'hasOwnProperty',Laya.__hasOwnProperty);
			un(p,'__class',o);
			un(p,'__super',_super);
			un(p,'__className',fullName);
			un(o,'__super',_super);
			un(o,'__className',fullName);
			un(o,'__isclass',true);
			un(o,'super',function(o){this.__super.call(o);});
		},
		imps:function(dec,src){
			if(!src) return null;
			var d=dec.__imps|| Laya.un(dec,'__imps',{});
			function __(name){
				var c,exs;
				if(! (c=Laya.__internals[name]) ) return;
				d[name]=true;
				if(!(exs=c.extend)) return;
				for(var i=0;i<exs.length;i++){
					__(exs[i].self);
				}
			}
			for(var i in src) __(i);
		},
		getset:function(isStatic,o,name,getfn,setfn){
			if(!isStatic){
				getfn && Laya.un(o,'_$get_'+name,getfn);
				setfn && Laya.un(o,'_$set_'+name,setfn);
			}
			else{
				getfn && (o['_$GET_'+name]=getfn);
				setfn && (o['_$SET_'+name]=setfn);
			}
			if(getfn && setfn) 
				Object.defineProperty(o,name,{get:getfn,set:setfn,enumerable:false});
			else{
				getfn && Object.defineProperty(o,name,{get:getfn,enumerable:false});
				setfn && Object.defineProperty(o,name,{set:setfn,enumerable:false});
			}
		},
		static:function(_class,def){
				for(var i=0,sz=def.length;i<sz;i+=2){
					if(def[i]=='length') 
						_class.length=def[i+1].call(_class);
					else{
						function tmp(){
							var name=def[i];
							var getfn=def[i+1];
							Object.defineProperty(_class,name,{
								get:function(){delete this[name];return this[name]=getfn.call(this);},
								set:function(v){delete this[name];this[name]=v;},enumerable: true,configurable: true});
						}
						tmp();
					}
				}
		},		
		un:function(obj,name,value){
			value || (value=obj[name]);
			Laya.__propun.value=value;
			Object.defineProperty(obj, name, Laya.__propun);
			return value;
		},
		uns:function(obj,names){
			names.forEach(function(o){Laya.un(obj,o)});
		}
	};

	window.console=window.console || ({log:function(){}});
	window.trace=window.console.log;
	Error.prototype.throwError=function(){throw arguments;};
	String.prototype.substr=Laya.__substr;
	Object.defineProperty(Array.prototype,'fixed',{enumerable: false});

	return Laya;
})(window,document);

(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

})(window,document,Laya);


(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;

})(window,document,Laya);

(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;
	Laya.interface('laya.ui.IItem');
	Laya.interface('laya.ui.IRender');
	Laya.interface('laya.ui.ISelect');
	Laya.interface('laya.ui.IComponent');
	Laya.interface('laya.runtime.IMarket');
	Laya.interface('laya.filters.IFilter');
	Laya.interface('laya.display.ILayout');
	Laya.interface('laya.resource.IDispose');
	Laya.interface('laya.runtime.IPlatform');
	Laya.interface('laya.runtime.IConchNode');
	Laya.interface('laya.filters.IFilterAction');
	Laya.interface('laya.runtime.ICPlatformClass');
	Laya.interface('laya.ui.IBox','IComponent');
	Laya.interface('laya.runtime.IPlatformClass','laya.runtime.IPlatform');
	/**
	*@private
	*/
	//class laya.utils.RunDriver
	var RunDriver=(function(){
		function RunDriver(){};
		__class(RunDriver,'laya.utils.RunDriver');
		RunDriver.FILTER_ACTIONS=[];
		RunDriver.pixelRatio=-1;
		RunDriver._charSizeTestDiv=null
		RunDriver.now=function(){
			return /*__JS__ */Date.now();
		}

		RunDriver.getWindow=function(){
			return /*__JS__ */window;
		}

		RunDriver.newWebGLContext=function(canvas,webGLName){
			return canvas.getContext(webGLName,{stencil:true,alpha:false,antialias:Config.isAntialias,premultipliedAlpha:false});
		}

		RunDriver.getPixelRatio=function(){
			if (RunDriver.pixelRatio < 0){
				var ctx=Browser.context;
				var backingStore=ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
				RunDriver.pixelRatio=(Browser.window.devicePixelRatio || 1)/ backingStore;
			}
			return RunDriver.pixelRatio;
		}

		RunDriver.getIncludeStr=function(name){
			return null;
		}

		RunDriver.createShaderCondition=function(conditionScript){
			var fn="(function() {return "+conditionScript+";})";
			return Browser.window.eval(fn);
		}

		RunDriver.measureText=function(txt,font){
			if (Render.isConchApp){
				var ctx=/*__JS__ */ConchTextCanvas;
				ctx.font=font;
				return ctx.measureText(txt);
			}
			if (RunDriver._charSizeTestDiv==null){
				RunDriver._charSizeTestDiv=Browser.createElement('div');
				RunDriver._charSizeTestDiv.style.cssText="z-index:10000000;padding:0px;position: absolute;left:0px;visibility:hidden;top:0px;background:white";
				Browser.container.appendChild(RunDriver._charSizeTestDiv);
			}
			RunDriver._charSizeTestDiv.style.font=font;
			RunDriver._charSizeTestDiv.innerText=txt==" " ? "i" :txt;
			return {width:RunDriver._charSizeTestDiv.offsetWidth,height:RunDriver._charSizeTestDiv.offsetHeight};
		}

		RunDriver.beginFlush=function(){
		};

		RunDriver.endFinish=function(){
		};

		RunDriver.addToAtlas=null
		RunDriver.flashFlushImage=function(atlasWebGLCanvas){
		};

		RunDriver.drawToCanvas=function(sprite,_renderType,canvasWidth,canvasHeight,offsetX,offsetY){
			var canvas=HTMLCanvas.create("2D");
			var context=new RenderContext(canvasWidth,canvasHeight,canvas);
			RenderSprite.renders[_renderType]._fun(sprite,context,offsetX,offsetY);
			return canvas;
		}

		RunDriver.createParticleTemplate2D=null
		RunDriver.createGLTextur=null;
		RunDriver.createWebGLContext2D=null;
		RunDriver.changeWebGLSize=function(w,h){
		};

		RunDriver.createRenderSprite=function(type,next){
			return new RenderSprite(type,next);
		}

		RunDriver.createFilterAction=function(type){
			return new ColorFilterAction();
		}

		RunDriver.createGraphics=function(){
			return new Graphics();
		}

		RunDriver.clear=function(value){
			Render._context.ctx.clear();
		}

		RunDriver.clearAtlas=function(value){
		};

		RunDriver.addTextureToAtlas=function(value){
		};

		RunDriver.getTexturePixels=function(value,x,y,width,height){
			return null;
		}

		RunDriver.fillTextureShader=function(value,x,y,width,height){
			return null;
		}

		RunDriver.skinAniSprite=function(){
			return null;
		}

		return RunDriver;
	})()


	/**
	*<code>Laya</code> 是全局对象的引用入口集。
	*/
	//class Laya
	var ___Laya=(function(){
		//function Laya(){};
		/**
		*表示是否捕获全局错误并弹出提示。
		*/
		__getset(1,Laya,'alertGlobalError',null,function(value){
			var erralert=0;
			if (value){
				Browser.window.onerror=function (msg,url,line,column,detail){
					if (erralert++< 5 && detail)
						alert("出错啦，请把此信息截图给研发商\n"+msg+"\n"+detail.stack);
				}
				}else {
				Browser.window.onerror=null;
			}
		});

		Laya.init=function(width,height,__plugins){
			var plugins=[];for(var i=2,sz=arguments.length;i<sz;i++)plugins.push(arguments[i]);
			Browser.__init__();
			Context.__init__();
			Graphics.__init__();
			Laya.timer=new Timer();
			Laya.loader=new LoaderManager();
			for (var i=0,n=plugins.length;i < n;i++){
				if (plugins[i].enable)plugins[i].enable();
			}
			Font.__init__();
			Style.__init__();
			ResourceManager.__init__();
			CacheManger.beginCheck();
			Laya.stageBox=Laya.stage=new Stage();
			Laya.stage.model&&Laya.stage.model.setRootNode();
			var location=Browser.window.location;
			var pathName=location.pathname;
			pathName=pathName.charAt(2)==':' ? pathName.substring(1):pathName;
			URL.rootPath=URL.basePath=URL.getPath(location.protocol=="file:" ? pathName :location.href);
			Laya.render=new Render(50,50);
			Laya.stage.size(width,height);
			RenderSprite.__init__();
			KeyBoardManager.__init__();
			MouseManager.instance.__init__(Laya.stage,Render.canvas);
			Input.__init__();
			SoundManager.autoStopMusic=true;
			LocalStorage.__init__();
			return Render.canvas;
		}

		Laya.stage=null;
		Laya.timer=null;
		Laya.loader=null;
		Laya.render=null
		Laya.version="1.4.0";
		Laya.stageBox=null
		__static(Laya,
		['conchMarket',function(){return this.conchMarket=/*__JS__ */window.conch?conchMarket:null;},'PlatformClass',function(){return this.PlatformClass=/*__JS__ */window.PlatformClass;}
		]);
		return Laya;
	})()


	/**
	*<code>EventDispatcher</code> 类是可调度事件的所有类的基类。
	*/
	//class laya.events.EventDispatcher
	var EventDispatcher=(function(){
		var EventHandler;
		function EventDispatcher(){
			this._events=null;
		}

		__class(EventDispatcher,'laya.events.EventDispatcher');
		var __proto=EventDispatcher.prototype;
		/**
		*检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
		*@param type 事件的类型。
		*@return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
		*/
		__proto.hasListener=function(type){
			var listener=this._events && this._events[type];
			return !!listener;
		}

		/**
		*派发事件。
		*@param type 事件类型。
		*@param data 回调数据。
		*<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
		*@return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
		*/
		__proto.event=function(type,data){
			if (!this._events || !this._events[type])return false;
			var listeners=this._events[type];
			if (listeners.run){
				if (listeners.once)delete this._events[type];
				data !=null ? listeners.runWith(data):listeners.run();
				}else {
				for (var i=0,n=listeners.length;i < n;i++){
					var listener=listeners[i];
					if (listener){
						(data !=null)? listener.runWith(data):listener.run();
					}
					if (!listener || listener.once){
						listeners.splice(i,1);
						i--;
						n--;
					}
				}
				if (listeners.length===0)delete this._events[type];
			}
			return true;
		}

		/**
		*使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
		*@param type 事件的类型。
		*@param caller 事件侦听函数的执行域。
		*@param listener 事件侦听函数。
		*@param args 事件侦听函数的回调参数。
		*@return 此 EventDispatcher 对象。
		*/
		__proto.on=function(type,caller,listener,args){
			return this._createListener(type,caller,listener,args,false);
		}

		/**
		*使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
		*@param type 事件的类型。
		*@param caller 事件侦听函数的执行域。
		*@param listener 事件侦听函数。
		*@param args 事件侦听函数的回调参数。
		*@return 此 EventDispatcher 对象。
		*/
		__proto.once=function(type,caller,listener,args){
			return this._createListener(type,caller,listener,args,true);
		}

		__proto._createListener=function(type,caller,listener,args,once){
			this.off(type,caller,listener,once);
			var handler=EventHandler.create(caller || this,listener,args,once);
			this._events || (this._events={});
			var events=this._events;
			if (!events[type])events[type]=handler;
			else {
				if (!events[type].run)events[type].push(handler);
				else events[type]=[events[type],handler];
			}
			return this;
		}

		/**
		*从 EventDispatcher 对象中删除侦听器。
		*@param type 事件的类型。
		*@param caller 事件侦听函数的执行域。
		*@param listener 事件侦听函数。
		*@param onceOnly 如果值为 true ,则只移除通过 once 方法添加的侦听器。
		*@return 此 EventDispatcher 对象。
		*/
		__proto.off=function(type,caller,listener,onceOnly){
			(onceOnly===void 0)&& (onceOnly=false);
			if (!this._events || !this._events[type])return this;
			var listeners=this._events[type];
			if (listener !=null){
				if (listeners.run){
					if ((!caller || listeners.caller===caller)&& listeners.method===listener && (!onceOnly || listeners.once)){
						delete this._events[type];
						listeners.recover();
					}
					}else {
					var count=0;
					for (var i=0,n=listeners.length;i < n;i++){
						var item=listeners[i];
						if (item && (!caller || item.caller===caller)&& item.method===listener && (!onceOnly || item.once)){
							count++;
							listeners[i]=null;
							item.recover();
						}
					}
					if (count===n)delete this._events[type];
				}
			}
			return this;
		}

		/**
		*从 EventDispatcher 对象中删除指定事件类型的所有侦听器。
		*@param type 事件类型，如果值为 null，则移除本对象所有类型的侦听器。
		*@return 此 EventDispatcher 对象。
		*/
		__proto.offAll=function(type){
			var events=this._events;
			if (!events)return this;
			if (type){
				this._recoverHandlers(events[type]);
				delete events[type];
				}else {
				for (var name in events){
					this._recoverHandlers(events[name]);
				}
				this._events=null;
			}
			return this;
		}

		__proto._recoverHandlers=function(arr){
			if(!arr)return;
			if (arr.run){
				arr.recover();
				}else {
				for (var i=arr.length-1;i >-1;i--){
					if (arr[i]){
						arr[i].recover();
						arr[i]=null;
					}
				}
			}
		}

		/**
		*检测指定事件类型是否是鼠标事件。
		*@param type 事件的类型。
		*@return 如果是鼠标事件，则值为 true;否则，值为 false。
		*/
		__proto.isMouseEvent=function(type){
			return EventDispatcher.MOUSE_EVENTS[type];
		}

		EventDispatcher.MOUSE_EVENTS={"rightmousedown":true,"rightmouseup":true,"rightclick":true,"mousedown":true,"mouseup":true,"mousemove":true,"mouseover":true,"mouseout":true,"click":true,"doubleclick":true};
		EventDispatcher.__init$=function(){
			/**@private */
			//class EventHandler extends laya.utils.Handler
			EventHandler=(function(_super){
				function EventHandler(caller,method,args,once){
					EventHandler.__super.call(this,caller,method,args,once);
				}
				__class(EventHandler,'',_super);
				var __proto=EventHandler.prototype;
				__proto.recover=function(){
					if (this._id > 0){
						this._id=0;
						EventHandler._pool.push(this.clear());
					}
				}
				EventHandler.create=function(caller,method,args,once){
					(once===void 0)&& (once=true);
					if (EventHandler._pool.length)return EventHandler._pool.pop().setTo(caller,method,args,once);
					return new EventHandler(caller,method,args,once);
				}
				EventHandler._pool=[];
				return EventHandler;
			})(Handler)
		}

		return EventDispatcher;
	})()


	/**
	*<p><code>Handler</code> 是事件处理器类。</p>
	*<p>推荐使用 Handler.create()方法从对象池创建，减少对象创建消耗。</p>
	*<p><b>注意：</b>由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。</p>
	*/
	//class laya.utils.Handler
	var Handler=(function(){
		function Handler(caller,method,args,once){
			//this.caller=null;
			//this.method=null;
			//this.args=null;
			this.once=false;
			this._id=0;
			(once===void 0)&& (once=false);
			this.setTo(caller,method,args,once);
		}

		__class(Handler,'laya.utils.Handler');
		var __proto=Handler.prototype;
		/**
		*设置此对象的指定属性值。
		*@param caller 执行域(this)。
		*@param method 回调方法。
		*@param args 携带的参数。
		*@param once 是否只执行一次，如果为true，执行后执行recover()进行回收。
		*@return 返回 handler 本身。
		*/
		__proto.setTo=function(caller,method,args,once){
			this._id=Handler._gid++;
			this.caller=caller;
			this.method=method;
			this.args=args;
			this.once=once;
			return this;
		}

		/**
		*执行处理器。
		*/
		__proto.run=function(){
			if (this.method==null)return null;
			var id=this._id;
			var result=this.method.apply(this.caller,this.args);
			this._id===id && this.once && this.recover();
			return result;
		}

		/**
		*执行处理器，携带额外数据。
		*@param data 附加的回调数据，可以是单数据或者Array(作为多参)。
		*/
		__proto.runWith=function(data){
			if (this.method==null)return null;
			var id=this._id;
			if (data==null)
				var result=this.method.apply(this.caller,this.args);
			else if (!this.args && !data.unshift)result=this.method.call(this.caller,data);
			else if (this.args)result=this.method.apply(this.caller,this.args.concat(data));
			else result=this.method.apply(this.caller,data);
			this._id===id && this.once && this.recover();
			return result;
		}

		/**
		*清理对象引用。
		*/
		__proto.clear=function(){
			this.caller=null;
			this.method=null;
			this.args=null;
			return this;
		}

		/**
		*清理并回收到 Handler 对象池内。
		*/
		__proto.recover=function(){
			if (this._id > 0){
				this._id=0;
				Handler._pool.push(this.clear());
			}
		}

		Handler.create=function(caller,method,args,once){
			(once===void 0)&& (once=true);
			if (Handler._pool.length)return Handler._pool.pop().setTo(caller,method,args,once);
			return new Handler(caller,method,args,once);
		}

		Handler._pool=[];
		Handler._gid=1;
		return Handler;
	})()


	/**
	*...
	*@author ww
	*/
	//class Main
	var Main=(function(){
		/*[COMPILER OPTIONS:normal]*/
		function Main(){}
		__class(Main,'Main');
		return Main;
	})()


	/**
	*Config 用于配置一些全局参数。
	*/
	//class Config
	var Config=(function(){
		function Config(){};
		__class(Config,'Config');
		Config.WebGLTextCacheCount=500;
		Config.atlasEnable=false;
		Config.showCanvasMark=false;
		Config.CPUMemoryLimit=120 *1024 *1024;
		Config.GPUMemoryLimit=160 *1024 *1024;
		Config.animationInterval=30;
		Config.isAntialias=false;
		return Config;
	})()


	/**
	*<code>BitmapFont</code> 是位图字体类，用于定义位图字体信息。
	*/
	//class laya.display.BitmapFont
	var BitmapFont=(function(){
		function BitmapFont(){
			this.fontSize=12;
			this.autoScaleSize=false;
			this._texture=null;
			this._fontCharDic={};
			this._complete=null;
			this._path=null;
			this._maxHeight=0;
			this._maxWidth=0;
			this._spaceWidth=10;
			this._leftPadding=0;
			this._rightPadding=0;
			this._letterSpacing=0;
		}

		__class(BitmapFont,'laya.display.BitmapFont');
		var __proto=BitmapFont.prototype;
		/**
		*通过指定位图字体文件路径，加载位图字体文件。
		*@param path 位图字体文件的路径。
		*@param complete 加载完成的回调，通知上层字体文件已经完成加载并解析。
		*/
		__proto.loadFont=function(path,complete){
			this._path=path;
			this._complete=complete;
			Laya.loader.load([{url:this._path,type:/*laya.net.Loader.XML*/"xml"},{url:this._path.replace(".fnt",".png"),type:/*laya.net.Loader.IMAGE*/"image"}],Handler.create(this,this.onLoaded));
		}

		__proto.onLoaded=function(){
			this.parseFont(Loader.getRes(this._path),Loader.getRes(this._path.replace(".fnt",".png")));
			this._complete && this._complete.run();
		}

		/**
		*解析字体文件。
		*@param xml 字体文件XML。
		*@param texture 字体的纹理。
		*/
		__proto.parseFont=function(xml,texture){
			if (xml==null || texture==null)return;
			this._texture=texture;
			var tX=0;
			var tScale=1;
			var tInfo=xml.getElementsByTagName("info");
			this.fontSize=parseInt(tInfo[0].attributes["size"].nodeValue);
			var tPadding=tInfo[0].attributes["padding"].nodeValue;
			var tPaddingArray=tPadding.split(",");
			var tUpPadding=parseInt(tPaddingArray[0]);
			var tDownPadding=parseInt(tPaddingArray[2]);
			this._leftPadding=parseInt(tPaddingArray[3]);
			this._rightPadding=parseInt(tPaddingArray[1]);
			var chars=xml.getElementsByTagName("char");
			var i=0;
			for (i=0;i < chars.length;i++){
				var tAttribute=chars[i].attributes;
				var tId=parseInt(tAttribute["id"].nodeValue);
				var xOffset=parseInt(tAttribute["xoffset"].nodeValue)/ tScale;
				var yOffset=parseInt(tAttribute["yoffset"].nodeValue)/ tScale;
				var xAdvance=parseInt(tAttribute["xadvance"].nodeValue)/ tScale;
				var region=new Rectangle();
				region.x=parseInt(tAttribute["x"].nodeValue);
				region.y=parseInt(tAttribute["y"].nodeValue);
				region.width=parseInt(tAttribute["width"].nodeValue);
				region.height=parseInt(tAttribute["height"].nodeValue);
				var tTexture=Texture.create(texture,region.x,region.y,region.width,region.height,xOffset,yOffset);
				this._maxHeight=Math.max(this._maxHeight,tUpPadding+tDownPadding+tTexture.height);
				this._maxWidth=Math.max(this._maxWidth,tTexture.width);
				this._fontCharDic[tId]=tTexture;
			}
			if (this.getCharTexture(" "))this.setSpaceWidth(this.getCharWidth(" "));
		}

		/**
		*获取指定字符的字体纹理对象。
		*@param char 字符。
		*@return 指定的字体纹理对象。
		*/
		__proto.getCharTexture=function(char){
			return this._fontCharDic[char.charCodeAt(0)];
		}

		/**
		*销毁位图字体，调用Text.unregisterBitmapFont 时，默认会销毁。
		*/
		__proto.destroy=function(){
			var tTexture=null;
			for (var p in this._fontCharDic){
				tTexture=this._fontCharDic[p];
				if (tTexture)tTexture.destroy();
				delete this._fontCharDic[p];
			}
			this._texture.destroy();
		}

		/**
		*设置空格的宽（如果字体库有空格，这里就可以不用设置了）。
		*@param spaceWidth 宽度，单位为像素。
		*/
		__proto.setSpaceWidth=function(spaceWidth){
			this._spaceWidth=spaceWidth;
		}

		/**
		*获取指定字符的宽度。
		*@param char 字符。
		*@return 宽度。
		*/
		__proto.getCharWidth=function(char){
			if (char==" ")return this._spaceWidth+this._letterSpacing;
			var tTexture=this.getCharTexture(char)
			if (tTexture)return tTexture.width+tTexture.offsetX *2+this._letterSpacing;
			return 0;
		}

		/**
		*获取指定文本内容的宽度。
		*@param text 文本内容。
		*@return 宽度。
		*/
		__proto.getTextWidth=function(text){
			var tWidth=0;
			for (var i=0,n=text.length;i < n;i++){
				tWidth+=this.getCharWidth(text.charAt(i));
			}
			return tWidth;
		}

		/**
		*获取最大字符宽度。
		*/
		__proto.getMaxWidth=function(){
			return this._maxWidth+this._letterSpacing;
		}

		/**
		*获取最大字符高度。
		*/
		__proto.getMaxHeight=function(){
			return this._maxHeight;
		}

		/**
		*@private
		*将指定的文本绘制到指定的显示对象上。
		*/
		__proto.drawText=function(text,sprite,drawX,drawY,align,width){
			var tWidth=0;
			var tTexture;
			for (var i=0,n=text.length;i < n;i++){
				tWidth+=this.getCharWidth(text.charAt(i));
			};
			var dx=this._leftPadding;
			align==="center" && (dx=(width-tWidth)/ 2);
			align==="right" && (dx=(width-tWidth)-this._rightPadding);
			var tX=0;
			for (i=0,n=text.length;i < n;i++){
				tTexture=this.getCharTexture(text.charAt(i));
				if (tTexture)sprite.graphics.drawTexture(tTexture,drawX+tX+dx,drawY,tTexture.width,tTexture.height);
				tX+=this.getCharWidth(text.charAt(i));
			}
		}

		/**
		*设置字符之间的间距（以像素为单位）。
		*/
		/**
		*获取字符之间的间距（以像素为单位）。
		*/
		__getset(0,__proto,'letterSpacing',function(){
			return this._letterSpacing;
			},function(value){
			this._letterSpacing=value;
		});

		return BitmapFont;
	})()


	/**
	*@private
	*<code>Style</code> 类是元素样式定义类。
	*/
	//class laya.display.css.Style
	var Style=(function(){
		function Style(){
			this.alpha=1;
			this.visible=true;
			this.scrollRect=null;
			this.blendMode=null;
			this._type=0;
			this._tf=Style._TF_EMPTY;
		}

		__class(Style,'laya.display.css.Style');
		var __proto=Style.prototype;
		__proto.getTransform=function(){
			return this._tf;
		}

		__proto.setTransform=function(value){
			this._tf=value==='none' || !value ? Style._TF_EMPTY :value;
		}

		__proto.setTranslateX=function(value){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.translateX=value;
		}

		__proto.setTranslateY=function(value){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.translateY=value;
		}

		__proto.setScaleX=function(value){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.scaleX=value;
		}

		__proto.setScaleY=function(value){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.scaleY=value;
		}

		__proto.setRotate=function(value){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.rotate=value;
		}

		__proto.setSkewX=function(value){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.skewX=value;
		}

		__proto.setSkewY=function(value){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.skewY=value;
		}

		/**销毁此对象。*/
		__proto.destroy=function(){
			this.scrollRect=null;
		}

		/**@private */
		__proto.render=function(sprite,context,x,y){}
		/**@private */
		__proto.getCSSStyle=function(){
			return CSSStyle.EMPTY;
		}

		/**@private */
		__proto._enableLayout=function(){
			return false;
		}

		/**X 轴缩放值。*/
		__getset(0,__proto,'scaleX',function(){
			return this._tf.scaleX;
			},function(value){
			this.setScaleX(value);
		});

		/**元素应用的 2D 或 3D 转换的值。该属性允许我们对元素进行旋转、缩放、移动或倾斜。*/
		__getset(0,__proto,'transform',function(){
			return this.getTransform();
			},function(value){
			this.setTransform(value);
		});

		/**定义转换，只是用 X 轴的值。*/
		__getset(0,__proto,'translateX',function(){
			return this._tf.translateX;
			},function(value){
			this.setTranslateX(value);
		});

		/**定义转换，只是用 Y 轴的值。*/
		__getset(0,__proto,'translateY',function(){
			return this._tf.translateY;
			},function(value){
			this.setTranslateY(value);
		});

		/**Y 轴缩放值。*/
		__getset(0,__proto,'scaleY',function(){
			return this._tf.scaleY;
			},function(value){
			this.setScaleY(value);
		});

		/**表示元素是否显示为块级元素。*/
		__getset(0,__proto,'block',function(){
			return (this._type & 0x1)!=0;
		});

		/**定义沿着 Y 轴的 2D 倾斜转换。*/
		__getset(0,__proto,'skewY',function(){
			return this._tf.skewY;
			},function(value){
			this.setSkewY(value);
		});

		/**定义旋转角度。*/
		__getset(0,__proto,'rotate',function(){
			return this._tf.rotate;
			},function(value){
			this.setRotate(value);
		});

		/**定义沿着 X 轴的 2D 倾斜转换。*/
		__getset(0,__proto,'skewX',function(){
			return this._tf.skewX;
			},function(value){
			this.setSkewX(value);
		});

		/**表示元素的左内边距。*/
		__getset(0,__proto,'paddingLeft',function(){
			return 0;
		});

		/**表示元素的上内边距。*/
		__getset(0,__proto,'paddingTop',function(){
			return 0;
		});

		/**是否为绝对定位。*/
		__getset(0,__proto,'absolute',function(){
			return true;
		});

		Style.__init__=function(){
			Style._TF_EMPTY=Style._createTransform();
			Style.EMPTY=new Style();
		}

		Style._createTransform=function(){
			return {translateX:0,translateY:0,scaleX:1,scaleY:1,rotate:0,skewX:0,skewY:0};
		}

		Style.EMPTY=null
		Style._TF_EMPTY=null
		return Style;
	})()


	/**
	*@private
	*<code>Font</code> 类是字体显示定义类。
	*/
	//class laya.display.css.Font
	var Font=(function(){
		function Font(src){
			this._type=0;
			this._weight=0;
			this._decoration=null;
			this._text=null;
			this.indent=0;
			this._color=Color.create(Font.defaultColor);
			this.family=Font.defaultFamily;
			this.stroke=Font._STROKE;
			this.size=Font.defaultSize;
			src && src!==Font.EMPTY && src.copyTo(this);
		}

		__class(Font,'laya.display.css.Font');
		var __proto=Font.prototype;
		/**
		*字体样式字符串。
		*/
		__proto.set=function(value){
			this._text=null;
			var strs=value.split(' ');
			for (var i=0,n=strs.length;i < n;i++){
				var str=strs[i];
				switch (str){
					case 'italic':
						this.italic=true;
						continue ;
					case 'bold':
						this.bold=true;
						continue ;
					}
				if (str.indexOf('px')> 0){
					this.size=parseInt(str);
					this.family=strs[i+1];
					i++;
					continue ;
				}
			}
		}

		/**
		*返回字体样式字符串。
		*@return 字体样式字符串。
		*/
		__proto.toString=function(){
			this._text=""
			this.italic && (this._text+="italic ");
			this.bold && (this._text+="bold ");
			return this._text+=this.size+"px "+this.family;
		}

		/**
		*将当前的属性值复制到传入的 <code>Font</code> 对象。
		*@param dec 一个 Font 对象。
		*/
		__proto.copyTo=function(dec){
			dec._type=this._type;
			dec._text=this._text;
			dec._weight=this._weight;
			dec._color=this._color;
			dec.family=this.family;
			dec.stroke=this.stroke !=Font._STROKE ? this.stroke.slice():Font._STROKE;
			dec.indent=this.indent;
			dec.size=this.size;
		}

		/**
		*表示是否为密码格式。
		*/
		__getset(0,__proto,'password',function(){
			return (this._type & 0x400)!==0;
			},function(value){
			value ? (this._type |=0x400):(this._type &=~0x400);
		});

		/**
		*表示颜色字符串。
		*/
		__getset(0,__proto,'color',function(){
			return this._color.strColor;
			},function(value){
			this._color=Color.create(value);
		});

		/**
		*表示是否为斜体。
		*/
		__getset(0,__proto,'italic',function(){
			return (this._type & 0x200)!==0;
			},function(value){
			value ? (this._type |=0x200):(this._type &=~0x200);
		});

		/**
		*表示是否为粗体。
		*/
		__getset(0,__proto,'bold',function(){
			return (this._type & 0x800)!==0;
			},function(value){
			value ? (this._type |=0x800):(this._type &=~0x800);
		});

		/**
		*文本的粗细。
		*/
		__getset(0,__proto,'weight',function(){
			return ""+this._weight;
			},function(value){
			var weight=0;
			switch (value){
				case 'normal':
					break ;
				case 'bold':
					this.bold=true;
					weight=700;
					break ;
				case 'bolder':
					weight=800;
					break ;
				case 'lighter':
					weight=100;
					break ;
				default :
					weight=parseInt(value);
				}
			this._weight=weight;
			this._text=null;
		});

		/**
		*规定添加到文本的修饰。
		*/
		__getset(0,__proto,'decoration',function(){
			return this._decoration ? this._decoration.value :"none";
			},function(value){
			var strs=value.split(' ');
			this._decoration || (this._decoration={});
			switch (strs[0]){
				case '_':
					this._decoration.type='underline'
					break ;
				case '-':
					this._decoration.type='line-through'
					break ;
				case 'overline':
					this._decoration.type='overline'
					break ;
				default :
					this._decoration.type=strs[0];
				}
			strs[1] && (this._decoration.color=Color.create(strs));
			this._decoration.value=value;
		});

		Font.__init__=function(){
			Font.EMPTY=new Font(null);
		}

		Font.EMPTY=null
		Font.defaultColor="#000000";
		Font.defaultSize=12;
		Font.defaultFamily="Arial";
		Font.defaultFont="12px Arial";
		Font._STROKE=[0,"#000000"];
		Font._ITALIC=0x200;
		Font._PASSWORD=0x400;
		Font._BOLD=0x800;
		return Font;
	})()


	/**
	*<code>Graphics</code> 类用于创建绘图显示对象。
	*@see laya.display.Sprite#graphics
	*/
	//class laya.display.Graphics
	var Graphics=(function(){
		function Graphics(){
			//this._sp=null;
			this._one=null;
			this._cmds=null;
			//this._temp=null;
			//this._bounds=null;
			//this._rstBoundPoints=null;
			//this._vectorgraphArray=null;
			this._render=this._renderEmpty;
			this._render=this._renderEmpty;
			if (Render.isConchNode){
				/*__JS__ */this._nativeObj=new _conchGraphics();;
				/*__JS__ */this.id=this._nativeObj.conchID;;
			}
		}

		__class(Graphics,'laya.display.Graphics');
		var __proto=Graphics.prototype;
		/**
		*<p>销毁此对象。</p>
		*/
		__proto.destroy=function(){
			this.clear();
			this._temp=null;
			this._bounds=null;
			this._rstBoundPoints=null;
			this._sp && (this._sp._renderType=0);
			this._sp=null;
		}

		/**
		*<p>清空绘制命令。</p>
		*/
		__proto.clear=function(){
			this._one=null;
			this._render=this._renderEmpty;
			this._cmds=null;
			this._temp && (this._temp.length=0);
			this._sp && (this._sp._renderType &=~ /*laya.renders.RenderSprite.IMAGE*/0x01);
			this._sp && (this._sp._renderType &=~ /*laya.renders.RenderSprite.GRAPHICS*/0x100);
			this._repaint();
			if (this._vectorgraphArray){
				for (var i=0,n=this._vectorgraphArray.length;i < n;i++){
					VectorGraphManager.getInstance().deleteShape(this._vectorgraphArray[i]);
				}
				this._vectorgraphArray.length=0;
			}
		}

		/**
		*@private
		*重绘此对象。
		*/
		__proto._repaint=function(){
			this._temp && (this._temp.length=0);
			this._sp && this._sp.repaint();
		}

		/**@private */
		__proto._isOnlyOne=function(){
			return !this._cmds || this._cmds.length===0;
		}

		/**
		*获取位置及宽高信息矩阵(比较耗，尽量少用)。
		*@return 位置与宽高组成的 一个 Rectangle 对象。
		*/
		__proto.getBounds=function(){
			if (!this._bounds || !this._temp || this._temp.length < 1){
				this._bounds=Rectangle._getWrapRec(this.getBoundPoints(),this._bounds)
			}
			return this._bounds;
		}

		/**
		*@private
		*获取端点列表。
		*/
		__proto.getBoundPoints=function(){
			if (!this._temp || this._temp.length < 1)
				this._temp=this._getCmdPoints();
			return this._rstBoundPoints=Utils.copyArray(this._rstBoundPoints,this._temp);
		}

		__proto._addCmd=function(a){
			this._cmds=this._cmds || [];
			a.callee=a.shift();
			this._cmds.push(a);
		}

		__proto._getCmdPoints=function(){
			var context=Render._context;
			var cmds=this._cmds;
			var rst;
			rst=this._temp || (this._temp=[]);
			rst.length=0;
			if (!cmds && this._one !=null){
				Graphics._tempCmds.length=0;
				Graphics._tempCmds.push(this._one);
				cmds=Graphics._tempCmds;
			}
			if (!cmds)
				return rst;
			var matrixs;
			matrixs=Graphics._tempMatrixArrays;
			matrixs.length=0;
			var tMatrix=Graphics._initMatrix;
			tMatrix.identity();
			var tempMatrix=Graphics._tempMatrix;
			var cmd;
			for (var i=0,n=cmds.length;i < n;i++){
				cmd=cmds[i];
				switch (cmd.callee){
					case context.save:
					case 7:
						matrixs.push(tMatrix);
						tMatrix=tMatrix.clone();
						break ;
					case context.restore:
					case 8:
						tMatrix=matrixs.pop();
						break ;
					case context._scale:
					case 5:
						tempMatrix.identity();
						tempMatrix.translate(-cmd[2],-cmd[3]);
						tempMatrix.scale(cmd[0],cmd[1]);
						tempMatrix.translate(cmd[2],cmd[3]);
						this._switchMatrix(tMatrix,tempMatrix);
						break ;
					case context._rotate:
					case 3:
						tempMatrix.identity();
						tempMatrix.translate(-cmd[1],-cmd[2]);
						tempMatrix.rotate(cmd[0]);
						tempMatrix.translate(cmd[1],cmd[2]);
						this._switchMatrix(tMatrix,tempMatrix);
						break ;
					case context._translate:
					case 6:
						tempMatrix.identity();
						tempMatrix.translate(cmd[0],cmd[1]);
						this._switchMatrix(tMatrix,tempMatrix);
						break ;
					case context._transform:
					case 4:
						tempMatrix.identity();
						tempMatrix.translate(-cmd[1],-cmd[2]);
						tempMatrix.concat(cmd[0]);
						tempMatrix.translate(cmd[1],cmd[2]);
						this._switchMatrix(tMatrix,tempMatrix);
						break ;
					case 16:
					case 24:
						Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0],cmd[1],cmd[2],cmd[3]),tMatrix);
						break ;
					case 17:
						tMatrix.copyTo(tempMatrix);
						tempMatrix.concat(cmd[4]);
						Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0],cmd[1],cmd[2],cmd[3]),tempMatrix);
						break ;
					case context._drawTexture:
					case context._fillTexture:
						if (cmd[3] && cmd[4]){
							Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],cmd[3],cmd[4]),tMatrix);
							}else {
							var tex=cmd[0];
							Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],tex.width,tex.height),tMatrix);
						}
						break ;
					case context._drawTextureWithTransform:
						tMatrix.copyTo(tempMatrix);
						tempMatrix.concat(cmd[5]);
						if (cmd[3] && cmd[4]){
							Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],cmd[3],cmd[4]),tempMatrix);
							}else {
							tex=cmd[0];
							Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],tex.width,tex.height),tempMatrix);
						}
						break ;
					case context._drawRect:
					case 13:
						Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0],cmd[1],cmd[2],cmd[3]),tMatrix);
						break ;
					case context._drawCircle:
					case context._fillCircle:
					case 14:
						Graphics._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0]-cmd[2],cmd[1]-cmd[2],cmd[2]+cmd[2],cmd[2]+cmd[2]),tMatrix);
						break ;
					case context._drawLine:
					case 20:
						Graphics._tempPoints.length=0;
						var lineWidth=NaN;
						lineWidth=cmd[5] *0.5;
						if (cmd[0]==cmd[2]){
							Graphics._tempPoints.push(cmd[0]+lineWidth,cmd[1],cmd[2]+lineWidth,cmd[3],cmd[0]-lineWidth,cmd[1],cmd[2]-lineWidth,cmd[3]);
							}else if (cmd[1]==cmd[3]){
							Graphics._tempPoints.push(cmd[0],cmd[1]+lineWidth,cmd[2],cmd[3]+lineWidth,cmd[0],cmd[1]-lineWidth,cmd[2],cmd[3]-lineWidth);
							}else {
							Graphics._tempPoints.push(cmd[0],cmd[1],cmd[2],cmd[3]);
						}
						Graphics._addPointArrToRst(rst,Graphics._tempPoints,tMatrix);
						break ;
					case context._drawCurves:
					case 22:
						Graphics._addPointArrToRst(rst,Bezier.I.getBezierPoints(cmd[2]),tMatrix,cmd[0],cmd[1]);
						break ;
					case context._drawPoly:
					case context._drawLines:
					case 18:
						Graphics._addPointArrToRst(rst,cmd[2],tMatrix,cmd[0],cmd[1]);
						break ;
					case context._drawPath:
					case 19:
						Graphics._addPointArrToRst(rst,this._getPathPoints(cmd[2]),tMatrix,cmd[0],cmd[1]);
						break ;
					case context._drawPie:
					case 15:
						Graphics._addPointArrToRst(rst,this._getPiePoints(cmd[0],cmd[1],cmd[2],cmd[3],cmd[4]),tMatrix);
						break ;
					}
			}
			if (rst.length > 200){
				rst=Utils.copyArray(rst,Rectangle._getWrapRec(rst)._getBoundPoints());
			}else if (rst.length > 8)
			rst=GrahamScan.scanPList(rst);
			return rst;
		}

		__proto._switchMatrix=function(tMatix,tempMatrix){
			tempMatrix.concat(tMatix);
			tempMatrix.copyTo(tMatix);
		}

		/**
		*绘制纹理。
		*@param tex 纹理。
		*@param x X 轴偏移量。
		*@param y Y 轴偏移量。
		*@param width 宽度。
		*@param height 高度。
		*@param m 矩阵信息。
		*/
		__proto.drawTexture=function(tex,x,y,width,height,m){
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			if (!tex)return;
			if (!width)width=tex.sourceWidth;
			if (!height)height=tex.sourceHeight;
			width=width-tex.sourceWidth+tex.width;
			height=height-tex.sourceHeight+tex.height;
			if (tex.loaded && (width <=0 || height <=0))return;
			x+=tex.offsetX;
			y+=tex.offsetY;
			this._sp && (this._sp._renderType |=/*laya.renders.RenderSprite.GRAPHICS*/0x100);
			var args=[tex,x,y,width,height,m];
			args.callee=m ? Render._context._drawTextureWithTransform :Render._context._drawTexture;
			if (this._one==null && !m){
				this._one=args;
				this._render=this._renderOneImg;
				}else {
				this._saveToCmd(args.callee,args);
			}
			if (!tex.loaded){
				tex.once(/*laya.events.Event.LOADED*/"loaded",this,this._textureLoaded,[tex,args]);
			}
			this._repaint();
		}

		/**
		*用texture填充
		*@param tex 纹理。
		*@param x X 轴偏移量。
		*@param y Y 轴偏移量。
		*@param width 宽度。
		*@param height 高度。
		*@param type 填充类型 repeat|repeat-x|repeat-y|no-repeat
		*@param offset 贴图纹理偏移
		*
		*/
		__proto.fillTexture=function(tex,x,y,width,height,type,offset){
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			(type===void 0)&& (type="repeat");
			if (!tex)return;
			var args=[tex,x,y,width,height,type,offset];
			if (!tex.loaded){
				tex.once(/*laya.events.Event.LOADED*/"loaded",this,this._textureLoaded,[tex,args]);
			}
			if (Render.isWebGL){
				var tFillTextureSprite=RunDriver.fillTextureShader(tex,x,y,width,height);
				args.push(tFillTextureSprite);
			}
			this._saveToCmd(Render._context._fillTexture,args);
		}

		__proto._textureLoaded=function(tex,param){
			param[3]=param[3] || tex.width;
			param[4]=param[4] || tex.height;
			this._repaint();
		}

		/**
		*@private
		*保存到命令流。
		*/
		__proto._saveToCmd=function(fun,args){
			this._sp && (this._sp._renderType |=/*laya.renders.RenderSprite.GRAPHICS*/0x100);
			if (this._one==null){
				this._one=args;
				this._render=this._renderOne;
				}else {
				this._sp && (this._sp._renderType &=~ /*laya.renders.RenderSprite.IMAGE*/0x01);
				this._render=this._renderAll;
				(this._cmds || (this._cmds=[])).length===0 && this._cmds.push(this._one);
				this._cmds.push(args);
			}
			args.callee=fun;
			this._temp && (this._temp.length=0);
			this._repaint();
			return args;
		}

		/**
		*设置剪裁区域，超出剪裁区域的坐标不显示。
		*@param x X 轴偏移量。
		*@param y Y 轴偏移量。
		*@param width 宽度。
		*@param height 高度。
		*/
		__proto.clipRect=function(x,y,width,height){
			this._saveToCmd(Render._context._clipRect,[x,y,width,height]);
		}

		/**
		*在画布上绘制文本。
		*@param text 在画布上输出的文本。
		*@param x 开始绘制文本的 x 坐标位置（相对于画布）。
		*@param y 开始绘制文本的 y 坐标位置（相对于画布）。
		*@param font 定义字号和字体，比如"20px Arial"。
		*@param color 定义文本颜色，比如"#ff0000"。
		*@param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
		*/
		__proto.fillText=function(text,x,y,font,color,textAlign){
			this._saveToCmd(Render._context._fillText,[text,x,y,font || Font.defaultFont,color,textAlign]);
		}

		/**
		*在画布上绘制“被填充且镶边的”文本。
		*@param text 在画布上输出的文本。
		*@param x 开始绘制文本的 x 坐标位置（相对于画布）。
		*@param y 开始绘制文本的 y 坐标位置（相对于画布）。
		*@param font 定义字体和字号，比如"20px Arial"。
		*@param fillColor 定义文本颜色，比如"#ff0000"。
		*@param borderColor 定义镶边文本颜色。
		*@param lineWidth 镶边线条宽度。
		*@param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
		*/
		__proto.fillBorderText=function(text,x,y,font,fillColor,borderColor,lineWidth,textAlign){
			this._saveToCmd(Render._context._fillBorderText,[text,x,y,font || Font.defaultFont,fillColor,borderColor,lineWidth,textAlign]);
		}

		/**
		*在画布上绘制文本（没有填色）。文本的默认颜色是黑色。
		*@param text 在画布上输出的文本。
		*@param x 开始绘制文本的 x 坐标位置（相对于画布）。
		*@param y 开始绘制文本的 y 坐标位置（相对于画布）。
		*@param font 定义字体和字号，比如"20px Arial"。
		*@param color 定义文本颜色，比如"#ff0000"。
		*@param lineWidth 线条宽度。
		*@param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
		*/
		__proto.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
			this._saveToCmd(Render._context._strokeText,[text,x,y,font || Font.defaultFont,color,lineWidth,textAlign]);
		}

		/**
		*设置透明度。
		*@param value 透明度。
		*/
		__proto.alpha=function(value){
			this._saveToCmd(Render._context._alpha,[value]);
		}

		/**
		*替换绘图的当前转换矩阵。
		*@param mat 矩阵。
		*@param pivotX 水平方向轴心点坐标。
		*@param pivotY 垂直方向轴心点坐标。
		*/
		__proto.transform=function(matrix,pivotX,pivotY){
			(pivotX===void 0)&& (pivotX=0);
			(pivotY===void 0)&& (pivotY=0);
			this._saveToCmd(Render._context._transform,[matrix,pivotX,pivotY]);
		}

		/**
		*旋转当前绘图。
		*@param angle 旋转角度，以弧度计。
		*@param pivotX 水平方向轴心点坐标。
		*@param pivotY 垂直方向轴心点坐标。
		*/
		__proto.rotate=function(angle,pivotX,pivotY){
			(pivotX===void 0)&& (pivotX=0);
			(pivotY===void 0)&& (pivotY=0);
			this._saveToCmd(Render._context._rotate,[angle,pivotX,pivotY]);
		}

		/**
		*缩放当前绘图至更大或更小。
		*@param scaleX 水平方向缩放值。
		*@param scaleY 垂直方向缩放值。
		*@param pivotX 水平方向轴心点坐标。
		*@param pivotY 垂直方向轴心点坐标。
		*/
		__proto.scale=function(scaleX,scaleY,pivotX,pivotY){
			(pivotX===void 0)&& (pivotX=0);
			(pivotY===void 0)&& (pivotY=0);
			this._saveToCmd(Render._context._scale,[scaleX,scaleY,pivotX,pivotY]);
		}

		/**
		*重新映射画布上的 (0,0)位置。
		*@param x 添加到水平坐标（x）上的值。
		*@param y 添加到垂直坐标（y）上的值。
		*/
		__proto.translate=function(x,y){
			this._saveToCmd(Render._context._translate,[x,y]);
		}

		/**
		*保存当前环境的状态。
		*/
		__proto.save=function(){
			this._saveToCmd(Render._context._save,[]);
		}

		/**
		*返回之前保存过的路径状态和属性。
		*/
		__proto.restore=function(){
			this._saveToCmd(Render._context._restore,[]);
		}

		/**
		*@private
		*替换文本内容。
		*@param text 文本内容。
		*@return 替换成功则值为true，否则值为flase。
		*/
		__proto.replaceText=function(text){
			this._repaint();
			var cmds=this._cmds;
			if (!cmds){
				if (this._one && this._isTextCmd(this._one.callee)){
					if (this._one[0].toUpperCase)this._one[0]=text;
					else this._one[0].setText(text);
					return true;
				}
				}else {
				for (var i=cmds.length-1;i >-1;i--){
					if (this._isTextCmd(cmds[i].callee)){
						if (cmds[i][0].toUpperCase)cmds[i][0]=text;
						else cmds[i][0].setText(text);
						return true;
					}
				}
			}
			return false;
		}

		/**@private */
		__proto._isTextCmd=function(fun){
			return fun===Render._context._fillText || fun===Render._context._fillBorderText || fun===Render._context._strokeText;
		}

		/**
		*@private
		*替换文本颜色。
		*@param color 颜色。
		*/
		__proto.replaceTextColor=function(color){
			this._repaint();
			var cmds=this._cmds;
			if (!cmds){
				if (this._one && this._isTextCmd(this._one.callee)){
					this._one[4]=color;
					if (!this._one[0].toUpperCase)this._one[0].changed=true;
				}
				}else {
				for (var i=cmds.length-1;i >-1;i--){
					if (this._isTextCmd(cmds[i].callee)){
						cmds[i][4]=color;
						if (!cmds[i][0].toUpperCase)cmds[i][0].changed=true;
					}
				}
			}
		}

		/**
		*加载并显示一个图片。
		*@param url 图片地址。
		*@param x 显示图片的x位置。
		*@param y 显示图片的y位置。
		*@param width 显示图片的宽度，设置为0表示使用图片默认宽度。
		*@param height 显示图片的高度，设置为0表示使用图片默认高度。
		*@param complete 加载完成回调。
		*/
		__proto.loadImage=function(url,x,y,width,height,complete){
			var _$this=this;
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			var tex=Loader.getRes(url);
			if (tex)onloaded(tex);
			else Laya.loader.load(url,Handler.create(null,onloaded),null,/*laya.net.Loader.IMAGE*/"image");
			function onloaded (tex){
				if (tex){
					_$this.drawTexture(tex,x,y,width,height);
					if (complete !=null)complete.call(_$this._sp,tex);
				}
			}
		}

		/**
		*@private
		*/
		__proto._renderEmpty=function(sprite,context,x,y){}
		/**
		*@private
		*/
		__proto._renderAll=function(sprite,context,x,y){
			var cmds=this._cmds,cmd;
			for (var i=0,n=cmds.length;i < n;i++){
				(cmd=cmds[i]).callee.call(context,x,y,cmd);
			}
		}

		/**
		*@private
		*/
		__proto._renderOne=function(sprite,context,x,y){
			this._one.callee.call(context,x,y,this._one);
		}

		/**
		*@private
		*/
		__proto._renderOneImg=function(sprite,context,x,y){
			this._one.callee.call(context,x,y,this._one);
			if (sprite._renderType!==2305){
				sprite._renderType |=/*laya.renders.RenderSprite.IMAGE*/0x01;
			}
		}

		/**
		*绘制一条线。
		*@param fromX X 轴开始位置。
		*@param fromY Y 轴开始位置。
		*@param toX X 轴结束位置。
		*@param toY Y 轴结束位置。
		*@param lineColor 颜色。
		*@param lineWidth 线条宽度。
		*/
		__proto.drawLine=function(fromX,fromY,toX,toY,lineColor,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var tId=0;
			if (Render.isWebGL){
				tId=VectorGraphManager.getInstance().getId();
				if (this._vectorgraphArray==null)this._vectorgraphArray=[];
				this._vectorgraphArray.push(tId);
			};
			var arr=[fromX+0.5,fromY+0.5,toX+0.5,toY+0.5,lineColor,lineWidth,tId];
			this._saveToCmd(Render._context._drawLine,arr);
		}

		/**
		*绘制一系列线段。
		*@param x 开始绘制的 X 轴位置。
		*@param y 开始绘制的 Y 轴位置。
		*@param points 线段的点集合。格式:[x1,y1,x2,y2,x3,y3...]。
		*@param lineColor 线段颜色，或者填充绘图的渐变对象。
		*@param lineWidth 线段宽度。
		*/
		__proto.drawLines=function(x,y,points,lineColor,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var tId=0;
			if (Render.isWebGL){
				tId=VectorGraphManager.getInstance().getId();
				if (this._vectorgraphArray==null)this._vectorgraphArray=[];
				this._vectorgraphArray.push(tId);
			};
			var arr=[x+0.5,y+0.5,points,lineColor,lineWidth,tId];
			this._saveToCmd(Render._context._drawLines,arr);
		}

		/**
		*绘制一系列曲线。
		*@param x 开始绘制的 X 轴位置。
		*@param y 开始绘制的 Y 轴位置。
		*@param points 线段的点集合，格式[startx,starty,ctrx,ctry,startx,starty...]。
		*@param lineColor 线段颜色，或者填充绘图的渐变对象。
		*@param lineWidth 线段宽度。
		*/
		__proto.drawCurves=function(x,y,points,lineColor,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var arr=[x+0.5,y+0.5,points,lineColor,lineWidth];
			this._saveToCmd(Render._context._drawCurves,arr);
		}

		/**
		*绘制矩形。
		*@param x 开始绘制的 X 轴位置。
		*@param y 开始绘制的 Y 轴位置。
		*@param width 矩形宽度。
		*@param height 矩形高度。
		*@param fillColor 填充颜色，或者填充绘图的渐变对象。
		*@param lineColor 边框颜色，或者填充绘图的渐变对象。
		*@param lineWidth 边框宽度。
		*/
		__proto.drawRect=function(x,y,width,height,fillColor,lineColor,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var offset=lineColor ? 0.5 :0;
			var arr=[x+offset,y+offset,width,height,fillColor,lineColor,lineWidth];
			this._saveToCmd(Render._context._drawRect,arr);
		}

		/**
		*绘制圆形。
		*@param x 圆点X 轴位置。
		*@param y 圆点Y 轴位置。
		*@param radius 半径。
		*@param fillColor 填充颜色，或者填充绘图的渐变对象。
		*@param lineColor 边框颜色，或者填充绘图的渐变对象。
		*@param lineWidth 边框宽度。
		*/
		__proto.drawCircle=function(x,y,radius,fillColor,lineColor,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var offset=lineColor ? 0.5 :0;
			var tId=0;
			if (Render.isWebGL){
				tId=VectorGraphManager.getInstance().getId();
				if (this._vectorgraphArray==null)this._vectorgraphArray=[];
				this._vectorgraphArray.push(tId);
			};
			var arr=[x+offset,y+offset,radius,fillColor,lineColor,lineWidth,tId];
			this._saveToCmd(Render._context._drawCircle,arr);
		}

		/**
		*绘制扇形。
		*@param x 开始绘制的 X 轴位置。
		*@param y 开始绘制的 Y 轴位置。
		*@param radius 扇形半径。
		*@param startAngle 开始角度。
		*@param endAngle 结束角度。
		*@param fillColor 填充颜色，或者填充绘图的渐变对象。
		*@param lineColor 边框颜色，或者填充绘图的渐变对象。
		*@param lineWidth 边框宽度。
		*/
		__proto.drawPie=function(x,y,radius,startAngle,endAngle,fillColor,lineColor,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var offset=lineColor ? 0.5 :0;
			var tId=0;
			if (Render.isWebGL){
				tId=VectorGraphManager.getInstance().getId();
				if (this._vectorgraphArray==null)this._vectorgraphArray=[];
				this._vectorgraphArray.push(tId);
			};
			var arr=[x+offset,y+offset,radius,startAngle,endAngle,fillColor,lineColor,lineWidth,tId];
			arr[3]=Utils.toRadian(startAngle);
			arr[4]=Utils.toRadian(endAngle);
			this._saveToCmd(Render._context._drawPie,arr);
		}

		__proto._getPiePoints=function(x,y,radius,startAngle,endAngle){
			var rst=Graphics._tempPoints;
			Graphics._tempPoints.length=0;
			rst.push(x,y);
			var dP=Math.PI / 10;
			var i=NaN;
			for (i=startAngle;i < endAngle;i+=dP){
				rst.push(x+radius *Math.cos(i),y+radius *Math.sin(i));
			}
			if (endAngle !=i){
				rst.push(x+radius *Math.cos(endAngle),y+radius *Math.sin(endAngle));
			}
			return rst;
		}

		/**
		*绘制多边形。
		*@param x 开始绘制的 X 轴位置。
		*@param y 开始绘制的 Y 轴位置。
		*@param points 多边形的点集合。
		*@param fillColor 填充颜色，或者填充绘图的渐变对象。
		*@param lineColor 边框颜色，或者填充绘图的渐变对象。
		*@param lineWidth 边框宽度。
		*/
		__proto.drawPoly=function(x,y,points,fillColor,lineColor,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var offset=lineColor ? 0.5 :0;
			var tId=0;
			if (Render.isWebGL){
				tId=VectorGraphManager.getInstance().getId();
				if (this._vectorgraphArray==null)this._vectorgraphArray=[];
				this._vectorgraphArray.push(tId);
				var tIsConvexPolygon=false;
				if (points.length > 6){
					tIsConvexPolygon=false;
					}else {
					tIsConvexPolygon=true;
				}
			};
			var arr=[x+offset,y+offset,points,fillColor,lineColor,lineWidth,tId,tIsConvexPolygon];
			this._saveToCmd(Render._context._drawPoly,arr);
		}

		__proto._getPathPoints=function(paths){
			var i=0,len=0;
			var rst=Graphics._tempPoints;
			rst.length=0;
			len=paths.length;
			var tCMD;
			for (i=0;i < len;i++){
				tCMD=paths[i];
				if (tCMD.length > 1){
					rst.push(tCMD[1],tCMD[2]);
					if (tCMD.length > 3){
						rst.push(tCMD[3],tCMD[4]);
					}
				}
			}
			return rst;
		}

		/**
		*绘制路径。
		*@param x 开始绘制的 X 轴位置。
		*@param y 开始绘制的 Y 轴位置。
		*@param paths 路径集合，路径支持以下格式：[["moveTo",x,y],["lineTo",x,y,x,y,x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]。
		*@param brush 刷子定义，支持以下设置{fillStyle}。
		*@param pen 画笔定义，支持以下设置{strokeStyle,lineWidth,lineJoin,lineCap,miterLimit}。
		*/
		__proto.drawPath=function(x,y,paths,brush,pen){
			var arr=[x+0.5,y+0.5,paths,brush,pen];
			this._saveToCmd(Render._context._drawPath,arr);
		}

		/**@private */
		/**
		*@private
		*命令流。
		*/
		__getset(0,__proto,'cmds',function(){
			return this._cmds;
			},function(value){
			this._sp && (this._sp._renderType |=/*laya.renders.RenderSprite.GRAPHICS*/0x100);
			this._cmds=value;
			this._render=this._renderAll;
			this._repaint();
		});

		Graphics.__init__=function(){
			if (Render.isConchNode){
				var from=laya.display.Graphics.prototype;
				var to=/*__JS__ */ConchGraphics.prototype;
				var list=["clear","destroy","alpha","rotate","transform","scale","translate","save","restore","clipRect","blendMode","fillText","fillBorderText","_fands","drawRect","drawCircle","drawPie","drawPoly","drawPath","drawImageM","drawLine","drawLines","_drawPs","drawCurves","replaceText","replaceTextColor","_fillImage","fillTexture"];
				for (var i=0,len=list.length;i <=len;i++){
					var temp=list[i];
					from[temp]=to[temp];
				}
				from._saveToCmd=null;
				from.drawTexture=function (tex,x,y,width,height,m){
					(x===void 0)&& (x=0);
					(y===void 0)&& (y=0);
					(width===void 0)&& (width=0);
					(height===void 0)&& (height=0);
					if (!tex)return;
					if (!(tex.loaded && tex.bitmap && tex.source)){
						return;
					}
					if (!width)width=tex.sourceWidth;
					if (!height)height=tex.sourceHeight;
					width=width-tex.sourceWidth+tex.width;
					height=height-tex.sourceHeight+tex.height;
					if (width <=0 || height <=0)return;
					x+=tex.offsetX;
					y+=tex.offsetY;
					var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
					this.drawImageM(tex.bitmap.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x,y,width,height,m);
				}
				from.fillTexture=function (tex,x,y,width,height,type,offset){
					(width===void 0)&& (width=0);
					(height===void 0)&& (height=0);
					(type===void 0)&& (type="repeat");
					if (!tex)return;
					if (tex.loaded){
						var ctxi=Render._context.ctx;
						var w=tex.bitmap.width,h=tex.bitmap.height,uv=tex.uv;
						var pat;
						if (tex.uv !=Texture.DEF_UV){
							pat=ctxi.createPattern(tex.bitmap.source,type,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h);
							}else {
							pat=ctxi.createPattern(tex.bitmap.source,type);
						};
						var sX=0,sY=0;
						if (offset){
							x+=offset.x % tex.width;
							y+=offset.y % tex.height;
							sX-=offset.x % tex.width;
							sY-=offset.y % tex.height;
						}
						this._fillImage(pat,x,y,sX,sY,width,height);
					}
				}
			}
		}

		Graphics._addPointArrToRst=function(rst,points,matrix,dx,dy){
			(dx===void 0)&& (dx=0);
			(dy===void 0)&& (dy=0);
			var i=0,len=0;
			len=points.length;
			for (i=0;i < len;i+=2){
				Graphics._addPointToRst(rst,points[i]+dx,points[i+1]+dy,matrix);
			}
		}

		Graphics._addPointToRst=function(rst,x,y,matrix){
			var _tempPoint=Point.TEMP;
			_tempPoint.setTo(x ? x :0,y ? y :0);
			matrix.transformPoint(_tempPoint);
			rst.push(_tempPoint.x,_tempPoint.y);
		}

		Graphics._tempPoints=[];
		Graphics._tempMatrixArrays=[];
		Graphics._tempCmds=[];
		__static(Graphics,
		['_tempMatrix',function(){return this._tempMatrix=new Matrix();},'_initMatrix',function(){return this._initMatrix=new Matrix();}
		]);
		return Graphics;
	})()


	/**
	*<code>Event</code> 是事件类型的集合。
	*/
	//class laya.events.Event
	var Event=(function(){
		function Event(){
			//this.type=null;
			//this.nativeEvent=null;
			//this.target=null;
			//this.currentTarget=null;
			//this._stoped=false;
			//this.touchId=0;
			//this.keyCode=0;
		}

		__class(Event,'laya.events.Event');
		var __proto=Event.prototype;
		/**
		*设置事件数据。
		*@param type 事件类型。
		*@param currentTarget 事件目标触发对象。
		*@param target 事件当前冒泡对象。
		*@return 返回当前 Event 对象。
		*/
		__proto.setTo=function(type,currentTarget,target){
			this.type=type;
			this.currentTarget=currentTarget;
			this.target=target;
			return this;
		}

		/**
		*防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。
		*/
		__proto.stopPropagation=function(){
			this._stoped=true;
		}

		/**鼠标在 Stage 上的 Y 轴坐标*/
		__getset(0,__proto,'stageY',function(){
			return Laya.stage.mouseY;
		});

		/**
		*包含按下或释放的键的字符代码值。字符代码值为英文键盘值。
		*/
		__getset(0,__proto,'charCode',function(){
			return this.nativeEvent.charCode;
		});

		/**
		*触摸点列表。
		*/
		__getset(0,__proto,'touches',function(){
			var arr=this.nativeEvent.touches;
			if (arr){
				for (var i=0,n=arr.length;i < n;i++){
					var e=arr[i];
					var point=Point.TEMP;
					point.setTo(e.clientX,e.clientY);
					Laya.stage._canvasTransform.invertTransformPoint(point);
					e.stageX=point.x;
					e.stageY=point.y;
				}
			}
			return arr;
		});

		/**
		*表示键在键盘上的位置。这对于区分在键盘上多次出现的键非常有用。<br>
		*例如，您可以根据此属性的值来区分左 Shift 键和右 Shift 键：左 Shift 键的值为 KeyLocation.LEFT，右 Shift 键的值为 KeyLocation.RIGHT。另一个示例是区分标准键盘 (KeyLocation.STANDARD)与数字键盘 (KeyLocation.NUM_PAD)上按下的数字键。
		*/
		__getset(0,__proto,'keyLocation',function(){
			return this.nativeEvent.keyLocation;
		});

		/**
		*表示 Ctrl 键是处于活动状态 (true)还是非活动状态 (false)。
		*/
		__getset(0,__proto,'ctrlKey',function(){
			return this.nativeEvent.ctrlKey;
		});

		/**
		*表示 Alt 键是处于活动状态 (true)还是非活动状态 (false)。
		*/
		__getset(0,__proto,'altKey',function(){
			return this.nativeEvent.altKey;
		});

		/**
		*表示 Shift 键是处于活动状态 (true)还是非活动状态 (false)。
		*/
		__getset(0,__proto,'shiftKey',function(){
			return this.nativeEvent.shiftKey;
		});

		/**鼠标在 Stage 上的 X 轴坐标*/
		__getset(0,__proto,'stageX',function(){
			return Laya.stage.mouseX;
		});

		Event.EMPTY=new Event();
		Event.MOUSE_DOWN="mousedown";
		Event.MOUSE_UP="mouseup";
		Event.CLICK="click";
		Event.RIGHT_MOUSE_DOWN="rightmousedown";
		Event.RIGHT_MOUSE_UP="rightmouseup";
		Event.RIGHT_CLICK="rightclick";
		Event.MOUSE_MOVE="mousemove";
		Event.MOUSE_OVER="mouseover";
		Event.MOUSE_OUT="mouseout";
		Event.MOUSE_WHEEL="mousewheel";
		Event.ROLL_OVER="mouseover";
		Event.ROLL_OUT="mouseout";
		Event.DOUBLE_CLICK="doubleclick";
		Event.CHANGE="change";
		Event.CHANGED="changed";
		Event.RESIZE="resize";
		Event.ADDED="added";
		Event.REMOVED="removed";
		Event.DISPLAY="display";
		Event.UNDISPLAY="undisplay";
		Event.ERROR="error";
		Event.COMPLETE="complete";
		Event.LOADED="loaded";
		Event.PROGRESS="progress";
		Event.INPUT="input";
		Event.RENDER="render";
		Event.OPEN="open";
		Event.MESSAGE="message";
		Event.CLOSE="close";
		Event.KEY_DOWN="keydown";
		Event.KEY_PRESS="keypress";
		Event.KEY_UP="keyup";
		Event.FRAME="enterframe";
		Event.DRAG_START="dragstart";
		Event.DRAG_MOVE="dragmove";
		Event.DRAG_END="dragend";
		Event.ENTER="enter";
		Event.SELECT="select";
		Event.BLUR="blur";
		Event.FOCUS="focus";
		Event.PLAYED="played";
		Event.PAUSED="paused";
		Event.STOPPED="stopped";
		Event.START="start";
		Event.END="end";
		Event.ENABLED_CHANGED="enabledchanged";
		Event.COMPONENT_ADDED="componentadded";
		Event.COMPONENT_REMOVED="componentremoved";
		Event.ACTIVE_CHANGED="activechanged";
		Event.LAYER_CHANGED="layerchanged";
		Event.HIERARCHY_LOADED="hierarchyloaded";
		Event.RECOVERING="recovering";
		Event.RECOVERED="recovered";
		Event.RELEASED="released";
		Event.LINK="link";
		Event.LABEL="label";
		Event.FULL_SCREEN_CHANGE="fullscreenchange";
		Event.DEVICE_LOST="devicelost";
		Event.MESH_CHANGED="meshchanged";
		Event.MATERIAL_CHANGED="materialchanged";
		Event.RENDERQUEUE_CHANGED="renderqueuechanged";
		Event.WORLDMATRIX_NEEDCHANGE="worldmatrixneedchanged";
		Event.ANIMATION_CHANGED="actionchanged";
		Event.INSTAGE_CHANGED="instagechanged";
		Event.CACHEFRAMEINDEX_CHANGED="cacheframeindexchanged";
		return Event;
	})()


	/**
	*<code>Keyboard</code> 类的属性是一些常数，这些常数表示控制游戏时最常用的键。
	*/
	//class laya.events.Keyboard
	var Keyboard=(function(){
		function Keyboard(){};
		__class(Keyboard,'laya.events.Keyboard');
		Keyboard.NUMBER_0=48;
		Keyboard.NUMBER_1=49;
		Keyboard.NUMBER_2=50;
		Keyboard.NUMBER_3=51;
		Keyboard.NUMBER_4=52;
		Keyboard.NUMBER_5=53;
		Keyboard.NUMBER_6=54;
		Keyboard.NUMBER_7=55;
		Keyboard.NUMBER_8=56;
		Keyboard.NUMBER_9=57;
		Keyboard.A=65;
		Keyboard.B=66;
		Keyboard.C=67;
		Keyboard.D=68;
		Keyboard.E=69;
		Keyboard.F=70;
		Keyboard.G=71;
		Keyboard.H=72;
		Keyboard.I=73;
		Keyboard.J=74;
		Keyboard.K=75;
		Keyboard.L=76;
		Keyboard.M=77;
		Keyboard.N=78;
		Keyboard.O=79;
		Keyboard.P=80;
		Keyboard.Q=81;
		Keyboard.R=82;
		Keyboard.S=83;
		Keyboard.T=84;
		Keyboard.U=85;
		Keyboard.V=86;
		Keyboard.W=87;
		Keyboard.X=88;
		Keyboard.Y=89;
		Keyboard.Z=90;
		Keyboard.F1=112;
		Keyboard.F2=113;
		Keyboard.F3=114;
		Keyboard.F4=115;
		Keyboard.F5=116;
		Keyboard.F6=117;
		Keyboard.F7=118;
		Keyboard.F8=119;
		Keyboard.F9=120;
		Keyboard.F10=121;
		Keyboard.F11=122;
		Keyboard.F12=123;
		Keyboard.F13=124;
		Keyboard.F14=125;
		Keyboard.F15=126;
		Keyboard.NUMPAD=21;
		Keyboard.NUMPAD_0=96;
		Keyboard.NUMPAD_1=97;
		Keyboard.NUMPAD_2=98;
		Keyboard.NUMPAD_3=99;
		Keyboard.NUMPAD_4=100;
		Keyboard.NUMPAD_5=101;
		Keyboard.NUMPAD_6=102;
		Keyboard.NUMPAD_7=103;
		Keyboard.NUMPAD_8=104;
		Keyboard.NUMPAD_9=105;
		Keyboard.NUMPAD_ADD=107;
		Keyboard.NUMPAD_DECIMAL=110;
		Keyboard.NUMPAD_DIVIDE=111;
		Keyboard.NUMPAD_ENTER=108;
		Keyboard.NUMPAD_MULTIPLY=106;
		Keyboard.NUMPAD_SUBTRACT=109;
		Keyboard.SEMICOLON=186;
		Keyboard.EQUAL=187;
		Keyboard.COMMA=188;
		Keyboard.MINUS=189;
		Keyboard.PERIOD=190;
		Keyboard.SLASH=191;
		Keyboard.BACKQUOTE=192;
		Keyboard.LEFTBRACKET=219;
		Keyboard.BACKSLASH=220;
		Keyboard.RIGHTBRACKET=221;
		Keyboard.QUOTE=222;
		Keyboard.ALTERNATE=18;
		Keyboard.BACKSPACE=8;
		Keyboard.CAPS_LOCK=20;
		Keyboard.COMMAND=15;
		Keyboard.CONTROL=17;
		Keyboard.DELETE=46;
		Keyboard.ENTER=13;
		Keyboard.ESCAPE=27;
		Keyboard.PAGE_UP=33;
		Keyboard.PAGE_DOWN=34;
		Keyboard.END=35;
		Keyboard.HOME=36;
		Keyboard.LEFT=37;
		Keyboard.UP=38;
		Keyboard.RIGHT=39;
		Keyboard.DOWN=40;
		Keyboard.SHIFT=16;
		Keyboard.SPACE=32;
		Keyboard.TAB=9;
		Keyboard.INSERT=45;
		return Keyboard;
	})()


	/**
	*<p><code>KeyBoardManager</code> 是键盘事件管理类。</p>
	*<p>该类从浏览器中接收键盘事件，并派发该事件。
	*派发事件时若 Stage.focus 为空则只从 Stage 上派发该事件，否则将从 Stage.focus 对象开始一直冒泡派发该事件。
	*所以在 Laya.stage 上监听键盘事件一定能够收到，如果在其他地方监听，则必须处在Stage.focus的冒泡链上才能收到该事件。</p>
	*<p>用户可以通过代码 Laya.stage.focus=someNode 的方式来设置focus对象。</p>
	*<p>用户可统一的根据事件对象中 e.keyCode 来判断按键类型，该属性兼容了不同浏览器的实现。</p>
	*/
	//class laya.events.KeyBoardManager
	var KeyBoardManager=(function(){
		function KeyBoardManager(){};
		__class(KeyBoardManager,'laya.events.KeyBoardManager');
		KeyBoardManager.__init__=function(){
			KeyBoardManager._addEvent("keydown");
			KeyBoardManager._addEvent("keypress");
			KeyBoardManager._addEvent("keyup");
		}

		KeyBoardManager._addEvent=function(type){
			Browser.document.addEventListener(type,function(e){
				laya.events.KeyBoardManager._dispatch(e,type);
			},true);
		}

		KeyBoardManager._dispatch=function(e,type){
			if (!KeyBoardManager.enabled)return;
			KeyBoardManager._event._stoped=false;
			KeyBoardManager._event.nativeEvent=e;
			KeyBoardManager._event.keyCode=e.keyCode || e.which || e.charCode;
			if (type==="keydown")KeyBoardManager._pressKeys[KeyBoardManager._event.keyCode]=true;
			else if (type==="keyup")KeyBoardManager._pressKeys[KeyBoardManager._event.keyCode]=null;
			var target=(Laya.stage.focus && (Laya.stage.focus.event !=null))? Laya.stage.focus :Laya.stage;
			var ct=target;
			while (ct){
				ct.event(type,KeyBoardManager._event.setTo(type,ct,target));
				ct=ct.parent;
			}
		}

		KeyBoardManager.hasKeyDown=function(key){
			return KeyBoardManager._pressKeys[key];
		}

		KeyBoardManager._pressKeys={};
		KeyBoardManager.enabled=true;
		__static(KeyBoardManager,
		['_event',function(){return this._event=new Event();}
		]);
		return KeyBoardManager;
	})()


	/**
	*<p><code>KeyLocation</code> 类包含表示在键盘或类似键盘的输入设备上按键位置的常量。</p>
	*<p><code>KeyLocation</code> 常数用在键盘事件对象的 <code>keyLocation </code>属性中。</p>
	*/
	//class laya.events.KeyLocation
	var KeyLocation=(function(){
		function KeyLocation(){};
		__class(KeyLocation,'laya.events.KeyLocation');
		KeyLocation.STANDARD=0;
		KeyLocation.LEFT=1;
		KeyLocation.RIGHT=2;
		KeyLocation.NUM_PAD=3;
		return KeyLocation;
	})()


	/**
	*<code>MouseManager</code> 是鼠标、触摸交互管理器。
	*/
	//class laya.events.MouseManager
	var MouseManager=(function(){
		function MouseManager(){
			this.mouseX=0;
			this.mouseY=0;
			this.disableMouseEvent=false;
			this.mouseDownTime=0;
			this._stage=null;
			this._target=null;
			this._lastOvers=[];
			this._currOvers=[];
			this._lastClickTimer=0;
			this._lastMoveTimer=0;
			this._isDoubleClick=false;
			this._isLeftMouse=false;
			this._eventList=[];
			this._event=new Event();
			this._matrix=new Matrix();
			this._point=new Point();
			this._rect=new Rectangle();
		}

		__class(MouseManager,'laya.events.MouseManager');
		var __proto=MouseManager.prototype;
		/**
		*@private
		*初始化。
		*/
		__proto.__init__=function(stage,canvas){
			var _$this=this;
			this._stage=stage;
			var _this=this;
			var list=this._eventList;
			canvas.oncontextmenu=function (e){
				if (MouseManager.enabled)return false;
			}
			canvas.addEventListener('mousedown',function(e){
				if (MouseManager.enabled){
					e.preventDefault();
					list.push(e);
					_this.mouseDownTime=Browser.now();
				}
			});
			canvas.addEventListener('mouseup',function(e){
				if (MouseManager.enabled){
					e.preventDefault();
					list.push(e);
					_this.mouseDownTime=-Browser.now();
				}
			},true);
			canvas.addEventListener('mousemove',function(e){
				if (MouseManager.enabled){
					e.preventDefault();
					var now=Browser.now();
					if (now-_this._lastMoveTimer < 10)return;
					_this._lastMoveTimer=now;
					list.push(e);
				}
			},true);
			canvas.addEventListener("mouseout",function(e){
				if (MouseManager.enabled)list.push(e);
			})
			canvas.addEventListener("mouseover",function(e){
				if (MouseManager.enabled)list.push(e);
			})
			canvas.addEventListener("touchstart",function(e){
				if (MouseManager.enabled){
					list.push(e);
					_$this.runEvent();
					if (!Input.isInputting)e.preventDefault();
					_this.mouseDownTime=Browser.now();
				}
			});
			canvas.addEventListener("touchend",function(e){
				if (MouseManager.enabled){
					if (!Input.isInputting)e.preventDefault();
					list.push(e);
					_this.mouseDownTime=-Browser.now();
				}
			},true);
			canvas.addEventListener("touchmove",function(e){
				if (MouseManager.enabled){
					e.preventDefault();
					list.push(e);
				}
			},true);
			canvas.addEventListener('mousewheel',function(e){
				if (MouseManager.enabled)list.push(e);
			});
			canvas.addEventListener('DOMMouseScroll',function(e){
				if (MouseManager.enabled)list.push(e);
			});
		}

		__proto.initEvent=function(e,nativeEvent){
			var _this=this;
			_this._event._stoped=false;
			_this._event.nativeEvent=nativeEvent || e;
			_this._target=null;
			this._point.setTo(e.clientX,e.clientY);
			this._stage._canvasTransform.invertTransformPoint(this._point);
			_this.mouseX=this._point.x;
			_this.mouseY=this._point.y;
			_this._event.touchId=e.identifier;
		}

		__proto.checkMouseWheel=function(e){
			this._event.delta=e.wheelDelta ? e.wheelDelta *0.025 :-e.detail;
			for (var i=0,n=this._lastOvers.length;i < n;i++){
				var ele=this._lastOvers[i];
				ele.event(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this._event.setTo(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",ele,this._target));
			}
			this._stage.event(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this._event.setTo(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this._stage,this._target));
		}

		__proto.checkMouseOut=function(){
			if (this.disableMouseEvent)return;
			for (var i=0,n=this._lastOvers.length;i < n;i++){
				var ele=this._lastOvers[i];
				if (!ele.destroyed && this._currOvers.indexOf(ele)< 0){
					ele._set$P("$_MOUSEOVER",false);
					ele.event(/*laya.events.Event.MOUSE_OUT*/"mouseout",this._event.setTo(/*laya.events.Event.MOUSE_OUT*/"mouseout",ele,this._target));
				}
			};
			var temp=this._lastOvers;
			this._lastOvers=this._currOvers;
			this._currOvers=temp;
			this._currOvers.length=0;
		}

		__proto.onMouseMove=function(ele){
			this.sendMouseMove(ele);
			this._event._stoped=false;
			this.sendMouseOver(this._target);
		}

		__proto.sendMouseMove=function(ele){
			ele.event(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this._event.setTo(/*laya.events.Event.MOUSE_MOVE*/"mousemove",ele,this._target));
			!this._event._stoped && ele.parent && this.sendMouseMove(ele.parent);
		}

		__proto.sendMouseOver=function(ele){
			if (ele.parent){
				if (!ele._get$P("$_MOUSEOVER")){
					ele._set$P("$_MOUSEOVER",true);
					ele.event(/*laya.events.Event.MOUSE_OVER*/"mouseover",this._event.setTo(/*laya.events.Event.MOUSE_OVER*/"mouseover",ele,this._target));
				}
				this._currOvers.push(ele);
			}
			!this._event._stoped && ele.parent && this.sendMouseOver(ele.parent);
		}

		__proto.onMouseDown=function(ele){
			if (this._isLeftMouse){
				ele._set$P("$_MOUSEDOWN",true);
				ele.event(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this._event.setTo(/*laya.events.Event.MOUSE_DOWN*/"mousedown",ele,this._target));
				}else {
				ele._set$P("$_RIGHTMOUSEDOWN",true);
				ele.event(/*laya.events.Event.RIGHT_MOUSE_DOWN*/"rightmousedown",this._event.setTo(/*laya.events.Event.RIGHT_MOUSE_DOWN*/"rightmousedown",ele,this._target));
			}
			!this._event._stoped && ele.parent && this.onMouseDown(ele.parent);
		}

		__proto.onMouseUp=function(ele){
			var type=this._isLeftMouse ? /*laya.events.Event.MOUSE_UP*/"mouseup" :/*laya.events.Event.RIGHT_MOUSE_UP*/"rightmouseup";
			this.sendMouseUp(ele,type);
			this._event._stoped=false;
			this.sendClick(this._target,type);
		}

		__proto.sendMouseUp=function(ele,type){
			ele.event(type,this._event.setTo(type,ele,this._target));
			!this._event._stoped && ele.parent && this.sendMouseUp(ele.parent,type);
		}

		__proto.sendClick=function(ele,type){
			if (ele.destroyed)return;
			if (type===/*laya.events.Event.MOUSE_UP*/"mouseup" && ele._get$P("$_MOUSEDOWN")){
				ele._set$P("$_MOUSEDOWN",false);
				ele.event(/*laya.events.Event.CLICK*/"click",this._event.setTo(/*laya.events.Event.CLICK*/"click",ele,this._target));
				this._isDoubleClick && ele.event(/*laya.events.Event.DOUBLE_CLICK*/"doubleclick",this._event.setTo(/*laya.events.Event.DOUBLE_CLICK*/"doubleclick",ele,this._target));
				}else if (type===/*laya.events.Event.RIGHT_MOUSE_UP*/"rightmouseup" && ele._get$P("$_RIGHTMOUSEDOWN")){
				ele._set$P("$_RIGHTMOUSEDOWN",false);
				ele.event(/*laya.events.Event.RIGHT_CLICK*/"rightclick",this._event.setTo(/*laya.events.Event.RIGHT_CLICK*/"rightclick",ele,this._target));
			}
			!this._event._stoped && ele.parent && this.sendClick(ele.parent,type);
		}

		__proto.check=function(sp,mouseX,mouseY,callBack){
			var transform=sp.transform || this._matrix;
			var pivotX=sp.pivotX;
			var pivotY=sp.pivotY;
			if (pivotX===0 && pivotY===0){
				transform.setTranslate(sp.x,sp.y);
				}else {
				if (transform===this._matrix){
					transform.setTranslate(sp.x-pivotX,sp.y-pivotY);
					}else {
					var cos=transform.cos;
					var sin=transform.sin;
					transform.setTranslate(sp.x-(pivotX *cos-pivotY *sin)*sp.scaleX,sp.y-(pivotX *sin+pivotY *cos)*sp.scaleY);
				}
			}
			transform.invertTransformPoint(this._point.setTo(mouseX,mouseY));
			transform.setTranslate(0,0);
			mouseX=this._point.x;
			mouseY=this._point.y;
			var scrollRect=sp.scrollRect;
			if (scrollRect){
				this._rect.setTo(0,0,scrollRect.width,scrollRect.height);
				var isHit=this._rect.contains(mouseX,mouseY);
				if (!isHit)return false;
			}
			if (!this.disableMouseEvent){
				var flag=false;
				if (sp.hitTestPrior && !sp.mouseThrough && !this.hitTest(sp,mouseX,mouseY)){
					return false;
				}
				for (var i=sp._childs.length-1;i >-1;i--){
					var child=sp._childs[i];
					if (!child.destroyed && child.mouseEnabled && child.visible){
						flag=this.check(child,mouseX+(scrollRect ? scrollRect.x :0),mouseY+(scrollRect ? scrollRect.y :0),callBack);
						if (flag)return true;
					}
				}
			}
			isHit=this.hitTest(sp,mouseX,mouseY);
			if (isHit){
				this._target=sp;
				callBack.call(this,sp);
				}else if (callBack===this.onMouseUp && sp===this._stage){
				this._target=this._stage;
				callBack.call(this,this._target);
			}
			return isHit;
		}

		__proto.hitTest=function(sp,mouseX,mouseY){
			var isHit=false;
			if ((sp.hitArea instanceof laya.utils.HitArea )){
				return sp.hitArea.isHit(mouseX,mouseY);
			}
			if (sp.width > 0 && sp.height > 0 || sp.mouseThrough || sp.hitArea){
				var hitRect=this._rect;
				if (!sp.mouseThrough){
					if (sp.hitArea)hitRect=sp.hitArea;
					else hitRect.setTo(0,0,sp.width,sp.height);
					isHit=hitRect.contains(mouseX,mouseY);
					}else {
					isHit=sp.getGraphicBounds().contains(mouseX,mouseY);
				}
			}
			return isHit;
		}

		/**
		*执行事件处理。
		*/
		__proto.runEvent=function(){
			var len=this._eventList.length;
			if (!len)return;
			var _this=this;
			var i=0;
			while (i < len){
				var evt=this._eventList[i];
				switch (evt.type){
					case 'mousedown':
						if (!MouseManager._isTouchRespond){
							_this._isLeftMouse=evt.button===0;
							_this.initEvent(evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseDown);
						}else
						MouseManager._isTouchRespond=false;
						break ;
					case 'mouseup':
						_this._isLeftMouse=evt.button===0;
						var now=Browser.now();
						_this._isDoubleClick=(now-_this._lastClickTimer)< 300;
						_this._lastClickTimer=now;
						_this.initEvent(evt);
						_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseUp);
						break ;
					case 'mousemove':
						_this.initEvent(evt);
						_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseMove);
						_this.checkMouseOut();
						break ;
					case "touchstart":
						MouseManager._isTouchRespond=true;
						_this._isLeftMouse=true;
						var touches=evt.changedTouches;
						for (var j=0,n=touches.length;j < n;j++){
							_this.initEvent(touches[j],evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseDown);
						}
						break ;
					case "touchend":
						MouseManager._isTouchRespond=true;
						_this._isLeftMouse=true;
						now=Browser.now();
						_this._isDoubleClick=(now-_this._lastClickTimer)< 300;
						_this._lastClickTimer=now;
						var touchends=evt.changedTouches;
						for (j=0,n=touchends.length;j < n;j++){
							_this.initEvent(touchends[j],evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseUp);
						}
						break ;
					case "touchmove":;
						var touchemoves=evt.changedTouches;
						for (j=0,n=touchemoves.length;j < n;j++){
							_this.initEvent(touchemoves[j],evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseMove);
						}
						_this.checkMouseOut();
						break ;
					case "wheel":
					case "mousewheel":
					case "DOMMouseScroll":
						_this.checkMouseWheel(evt);
						break ;
					case "mouseout":
						_this._stage.event(/*laya.events.Event.MOUSE_OUT*/"mouseout",_this._event.setTo(/*laya.events.Event.MOUSE_OUT*/"mouseout",_this._stage,_this._stage));
						break ;
					case "mouseover":
						_this._stage.event(/*laya.events.Event.MOUSE_OVER*/"mouseover",_this._event.setTo(/*laya.events.Event.MOUSE_OVER*/"mouseover",_this._stage,_this._stage));
						break ;
					}
				i++;
			}
			this._eventList.length=0;
		}

		MouseManager.enabled=true;
		MouseManager._isTouchRespond=false;
		__static(MouseManager,
		['instance',function(){return this.instance=new MouseManager();}
		]);
		return MouseManager;
	})()


	/**
	*<code>Filter</code> 是滤镜基类。
	*/
	//class laya.filters.Filter
	var Filter=(function(){
		function Filter(){
			this._action=null;
		}

		__class(Filter,'laya.filters.Filter');
		var __proto=Filter.prototype;
		Laya.imps(__proto,{"laya.filters.IFilter":true})
		/**@private */
		__proto.callNative=function(sp){}
		/**@private 滤镜类型。*/
		__getset(0,__proto,'type',function(){return-1});
		/**@private 滤镜动作。*/
		__getset(0,__proto,'action',function(){return this._action });
		Filter.BLUR=0x10;
		Filter.COLOR=0x20;
		Filter.GLOW=0x08;
		Filter._filterStart=null
		Filter._filterEnd=null
		Filter._EndTarget=null
		Filter._recycleScope=null
		Filter._filter=null
		Filter._useSrc=null
		Filter._endSrc=null
		Filter._useOut=null
		Filter._endOut=null
		return Filter;
	})()


	/**
	*<code>ColorFilterAction</code> 是一个颜色滤镜应用类。
	*/
	//class laya.filters.ColorFilterAction
	var ColorFilterAction=(function(){
		function ColorFilterAction(){
			this.data=null;
		}

		__class(ColorFilterAction,'laya.filters.ColorFilterAction');
		var __proto=ColorFilterAction.prototype;
		Laya.imps(__proto,{"laya.filters.IFilterAction":true})
		/**
		*给指定的对象应用颜色滤镜。
		*@param srcCanvas 需要应用画布对象。
		*@return 应用了滤镜后的画布对象。
		*/
		__proto.apply=function(srcCanvas){
			var ctx=srcCanvas.ctx.ctx;
			var canvas=srcCanvas.ctx.ctx.canvas;
			if (canvas.width==0 || canvas.height==0)return canvas;
			var imgdata=ctx.getImageData(0,0,canvas.width,canvas.height);
			var data=imgdata.data;
			var nData;
			for (var i=0,n=data.length;i < n;i+=4){
				nData=this.getColor(data[i],data[i+1],data[i+2],data[i+3]);
				if (data[i+3]==0)continue ;
				data[i]=nData[0];
				data[i+1]=nData[1];
				data[i+2]=nData[2];
				data[i+3]=nData[3];
			}
			ctx.putImageData(imgdata,0,0);
			return srcCanvas;
		}

		__proto.getColor=function(red,green,blue,alpha){
			var rst=[];
			if (this.data._mat && this.data._alpha){
				var mat=this.data._mat;
				var tempAlpha=this.data._alpha;
				rst[0]=mat[0] *red+mat[1] *green+mat[2] *blue+mat[3] *alpha+tempAlpha[0];
				rst[1]=mat[4] *red+mat[5] *green+mat[6] *blue+mat[7] *alpha+tempAlpha[1];
				rst[2]=mat[8] *red+mat[9] *green+mat[10] *blue+mat[11] *alpha+tempAlpha[2];
				rst[3]=mat[12] *red+mat[13] *green+mat[14] *blue+mat[15] *alpha+tempAlpha[3];
			}
			return rst;
		}

		return ColorFilterAction;
	})()


	/**
	*@private
	*/
	//class laya.maths.Arith
	var Arith=(function(){
		function Arith(){};
		__class(Arith,'laya.maths.Arith');
		Arith.formatR=function(r){
			if (r > Math.PI)r-=Math.PI *2;
			if (r <-Math.PI)r+=Math.PI *2;
			return r;
		}

		Arith.isPOT=function(w,h){
			return (w > 0 && (w & (w-1))===0 && h > 0 && (h & (h-1))===0);
		}

		Arith.setMatToArray=function(mat,array){
			mat.a,mat.b,0,0,mat.c,mat.d,0,0,0,0,1,0,mat.tx+20,mat.ty+20,0,1
			array[0]=mat.a;
			array[1]=mat.b;
			array[4]=mat.c;
			array[5]=mat.d;
			array[12]=mat.tx;
			array[13]=mat.ty;
		}

		return Arith;
	})()


	/**
	*@private
	*计算贝塞尔曲线的工具类。
	*/
	//class laya.maths.Bezier
	var Bezier=(function(){
		function Bezier(){
			this._controlPoints=[new Point(),new Point(),new Point()];
			this._calFun=this.getPoint2;
		}

		__class(Bezier,'laya.maths.Bezier');
		var __proto=Bezier.prototype;
		/**@private */
		__proto._switchPoint=function(x,y){
			var tPoint=this._controlPoints.shift();
			tPoint.setTo(x,y);
			this._controlPoints.push(tPoint);
		}

		/**
		*计算二次贝塞尔点。
		*@param t
		*@param rst
		*
		*/
		__proto.getPoint2=function(t,rst){
			var p1=this._controlPoints[0];
			var p2=this._controlPoints[1];
			var p3=this._controlPoints[2];
			var lineX=Math.pow((1-t),2)*p1.x+2 *t *(1-t)*p2.x+Math.pow(t,2)*p3.x;
			var lineY=Math.pow((1-t),2)*p1.y+2 *t *(1-t)*p2.y+Math.pow(t,2)*p3.y;
			rst.push(lineX,lineY);
		}

		/**
		*计算三次贝塞尔点
		*@param t
		*@param rst
		*
		*/
		__proto.getPoint3=function(t,rst){
			var p1=this._controlPoints[0];
			var p2=this._controlPoints[1];
			var p3=this._controlPoints[2];
			var p4=this._controlPoints[3];
			var lineX=Math.pow((1-t),3)*p1.x+3 *p2.x *t *(1-t)*(1-t)+3 *p3.x *t *t *(1-t)+p4.x *Math.pow(t,3);
			var lineY=Math.pow((1-t),3)*p1.y+3 *p2.y *t *(1-t)*(1-t)+3 *p3.y *t *t *(1-t)+p4.y *Math.pow(t,3);
			rst.push(lineX,lineY);
		}

		/**
		*计算贝塞尔点序列
		*@param count
		*@param rst
		*
		*/
		__proto.insertPoints=function(count,rst){
			var i=NaN;
			count=count > 0 ? count :5;
			var dLen=NaN;
			dLen=1 / count;
			for (i=0;i <=1;i+=dLen){
				this._calFun(i,rst);
			}
		}

		/**
		*获取贝塞尔曲线上的点。
		*@param pList 控制点[x0,y0,x1,y1...]
		*@param inSertCount 每次曲线的插值数量
		*@return
		*
		*/
		__proto.getBezierPoints=function(pList,inSertCount,count){
			(inSertCount===void 0)&& (inSertCount=5);
			(count===void 0)&& (count=2);
			var i=0,len=0;
			len=pList.length;
			if (len < (count+1)*2)return [];
			var rst;
			rst=[];
			switch (count){
				case 2:
					this._calFun=this.getPoint2;
					break ;
				case 3:
					this._calFun=this.getPoint3;
					break ;
				default :
					return [];
				}
			for (i=0;i < count *2;i+=2){
				this._switchPoint(pList[i],pList[i+1]);
			}
			for (i=count *2;i < len;i+=2){
				this._switchPoint(pList[i],pList[i+1]);
				if ((i / 2)% count==0)
					this.insertPoints(inSertCount,rst);
			}
			return rst;
		}

		__static(Bezier,
		['I',function(){return this.I=new Bezier();}
		]);
		return Bezier;
	})()


	/**
	*@private
	*凸包算法。
	*/
	//class laya.maths.GrahamScan
	var GrahamScan=(function(){
		function GrahamScan(){};
		__class(GrahamScan,'laya.maths.GrahamScan');
		GrahamScan.multiply=function(p1,p2,p0){
			return ((p1.x-p0.x)*(p2.y-p0.y)-(p2.x-p0.x)*(p1.y-p0.y));
		}

		GrahamScan.dis=function(p1,p2){
			return (p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y);
		}

		GrahamScan._getPoints=function(count,tempUse,rst){
			(tempUse===void 0)&& (tempUse=false);
			if (!GrahamScan._mPointList)GrahamScan._mPointList=[];
			while (GrahamScan._mPointList.length < count)GrahamScan._mPointList.push(new Point());
			if (!rst)rst=[];
			rst.length=0;
			if (tempUse){
				GrahamScan.getFrom(rst,GrahamScan._mPointList,count);
				}else {
				GrahamScan.getFromR(rst,GrahamScan._mPointList,count);
			}
			return rst;
		}

		GrahamScan.getFrom=function(rst,src,count){
			var i=0;
			for (i=0;i < count;i++){
				rst.push(src[i]);
			}
			return rst;
		}

		GrahamScan.getFromR=function(rst,src,count){
			var i=0;
			for (i=0;i < count;i++){
				rst.push(src.pop());
			}
			return rst;
		}

		GrahamScan.pListToPointList=function(pList,tempUse){
			(tempUse===void 0)&& (tempUse=false);
			var i=0,len=pList.length / 2,rst=GrahamScan._getPoints(len,tempUse,GrahamScan._tempPointList);
			for (i=0;i < len;i++){
				rst[i].setTo(pList[i+i],pList[i+i+1]);
			}
			return rst;
		}

		GrahamScan.pointListToPlist=function(pointList){
			var i=0,len=pointList.length,rst=GrahamScan._temPList,tPoint;
			rst.length=0;
			for (i=0;i < len;i++){
				tPoint=pointList[i];
				rst.push(tPoint.x,tPoint.y);
			}
			return rst;
		}

		GrahamScan.scanPList=function(pList){
			return Utils.copyArray(pList,GrahamScan.pointListToPlist(GrahamScan.scan(GrahamScan.pListToPointList(pList,true))));
		}

		GrahamScan.scan=function(PointSet){
			var i=0,j=0,k=0,top=2,tmp,n=PointSet.length,ch;
			var _tmpDic={};
			var key;
			ch=GrahamScan._temArr;
			ch.length=0;
			n=PointSet.length;
			for (i=n-1;i >=0;i--){
				tmp=PointSet[i];
				key=tmp.x+"_"+tmp.y;
				if (!_tmpDic.hasOwnProperty(key)){
					_tmpDic[key]=true;
					ch.push(tmp);
				}
			}
			n=ch.length;
			Utils.copyArray(PointSet,ch);
			for (i=1;i < n;i++)
			if ((PointSet[i].y < PointSet[k].y)|| ((PointSet[i].y==PointSet[k].y)&& (PointSet[i].x < PointSet[k].x)))
				k=i;
			tmp=PointSet[0];
			PointSet[0]=PointSet[k];
			PointSet[k]=tmp;
			for (i=1;i < n-1;i++){
				k=i;
				for (j=i+1;j < n;j++)
				if ((GrahamScan.multiply(PointSet[j],PointSet[k],PointSet[0])> 0)|| ((GrahamScan.multiply(PointSet[j],PointSet[k],PointSet[0])==0)&& (GrahamScan.dis(PointSet[0],PointSet[j])< GrahamScan.dis(PointSet[0],PointSet[k]))))
					k=j;
				tmp=PointSet[i];
				PointSet[i]=PointSet[k];
				PointSet[k]=tmp;
			}
			ch=GrahamScan._temArr;
			ch.length=0;
			if (PointSet.length < 3){
				return Utils.copyArray(ch,PointSet);
			}
			ch.push(PointSet[0],PointSet[1],PointSet[2]);
			for (i=3;i < n;i++){
				while (ch.length >=2 && GrahamScan.multiply(PointSet[i],ch[ch.length-1],ch[ch.length-2])>=0)ch.pop();
				PointSet[i] && ch.push(PointSet[i]);
			}
			return ch;
		}

		GrahamScan._mPointList=null
		GrahamScan._tempPointList=[];
		GrahamScan._temPList=[];
		GrahamScan._temArr=[];
		return GrahamScan;
	})()


	/**
	*@private
	*<code>MathUtil</code> 是一个数据处理工具类。
	*/
	//class laya.maths.MathUtil
	var MathUtil=(function(){
		function MathUtil(){};
		__class(MathUtil,'laya.maths.MathUtil');
		MathUtil.subtractVector3=function(l,r,o){
			o[0]=l[0]-r[0];
			o[1]=l[1]-r[1];
			o[2]=l[2]-r[2];
		}

		MathUtil.lerp=function(left,right,amount){
			return left *(1-amount)+right *amount;
		}

		MathUtil.scaleVector3=function(f,b,e){
			e[0]=f[0] *b;
			e[1]=f[1] *b;
			e[2]=f[2] *b;
		}

		MathUtil.lerpVector3=function(l,r,t,o){
			var ax=l[0],ay=l[1],az=l[2];
			o[0]=ax+t *(r[0]-ax);
			o[1]=ay+t *(r[1]-ay);
			o[2]=az+t *(r[2]-az);
		}

		MathUtil.lerpVector4=function(l,r,t,o){
			var ax=l[0],ay=l[1],az=l[2],aw=l[3];
			o[0]=ax+t *(r[0]-ax);
			o[1]=ay+t *(r[1]-ay);
			o[2]=az+t *(r[2]-az);
			o[3]=aw+t *(r[3]-aw);
		}

		MathUtil.slerpQuaternionArray=function(a,Offset1,b,Offset2,t,out,Offset3){
			var ax=a[Offset1+0],ay=a[Offset1+1],az=a[Offset1+2],aw=a[Offset1+3],bx=b[Offset2+0],by=b[Offset2+1],bz=b[Offset2+2],bw=b[Offset2+3];
			var omega,cosom,sinom,scale0,scale1;
			cosom=ax *bx+ay *by+az *bz+aw *bw;
			if (cosom < 0.0){
				cosom=-cosom;
				bx=-bx;
				by=-by;
				bz=-bz;
				bw=-bw;
			}
			if ((1.0-cosom)> 0.000001){
				omega=Math.acos(cosom);
				sinom=Math.sin(omega);
				scale0=Math.sin((1.0-t)*omega)/ sinom;
				scale1=Math.sin(t *omega)/ sinom;
				}else {
				scale0=1.0-t;
				scale1=t;
			}
			out[Offset3+0]=scale0 *ax+scale1 *bx;
			out[Offset3+1]=scale0 *ay+scale1 *by;
			out[Offset3+2]=scale0 *az+scale1 *bz;
			out[Offset3+3]=scale0 *aw+scale1 *bw;
			return out;
		}

		MathUtil.getRotation=function(x0,y0,x1,y1){
			return Math.atan2(y1-y0,x1-x0)/ Math.PI *180;
		}

		MathUtil.sortBigFirst=function(a,b){
			if (a==b)
				return 0;
			return b > a ? 1 :-1;
		}

		MathUtil.sortSmallFirst=function(a,b){
			if (a==b)
				return 0;
			return b > a ?-1 :1;
		}

		MathUtil.sortNumBigFirst=function(a,b){
			return parseFloat(b)-parseFloat(a);
		}

		MathUtil.sortNumSmallFirst=function(a,b){
			return parseFloat(a)-parseFloat(b);
		}

		MathUtil.sortByKey=function(key,bigFirst,forceNum){
			(bigFirst===void 0)&& (bigFirst=false);
			(forceNum===void 0)&& (forceNum=true);
			var _sortFun;
			if (bigFirst){
				_sortFun=forceNum ? MathUtil.sortNumBigFirst :MathUtil.sortBigFirst;
				}else {
				_sortFun=forceNum ? MathUtil.sortNumSmallFirst :MathUtil.sortSmallFirst;
			}
			return function (a,b){
				return _sortFun(a[key],b[key]);
			}
		}

		return MathUtil;
	})()


	/**
	*<code>Matrix</code> 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
	*/
	//class laya.maths.Matrix
	var Matrix=(function(){
		function Matrix(a,b,c,d,tx,ty){
			this.cos=1;
			this.sin=0;
			//this.a=NaN;
			//this.b=NaN;
			//this.c=NaN;
			//this.d=NaN;
			//this.tx=NaN;
			//this.ty=NaN;
			this.inPool=false;
			this.bTransform=false;
			(a===void 0)&& (a=1);
			(b===void 0)&& (b=0);
			(c===void 0)&& (c=0);
			(d===void 0)&& (d=1);
			(tx===void 0)&& (tx=0);
			(ty===void 0)&& (ty=0);
			this.a=a;
			this.b=b;
			this.c=c;
			this.d=d;
			this.tx=tx;
			this.ty=ty;
			this._checkTransform();
		}

		__class(Matrix,'laya.maths.Matrix');
		var __proto=Matrix.prototype;
		/**
		*为每个矩阵属性设置一个值。
		*@return 返回当前矩形。
		*/
		__proto.identity=function(){
			this.a=this.d=1;
			this.b=this.tx=this.ty=this.c=0;
			this.bTransform=false;
			return this;
		}

		/**@private*/
		__proto._checkTransform=function(){
			return this.bTransform=(this.a!==1 || this.b!==0 || this.c!==0 || this.d!==1);
		}

		/**
		*设置沿 x 、y 轴平移每个点的距离。
		*@param x 沿 x 轴平移每个点的距离。
		*@param y 沿 y 轴平移每个点的距离。
		*@return 返回对象本身
		*/
		__proto.setTranslate=function(x,y){
			this.tx=x;
			this.ty=y;
			return this;
		}

		/**
		*沿 x 和 y 轴平移矩阵，由 x 和 y 参数指定。
		*@param x 沿 x 轴向右移动的量（以像素为单位）。
		*@param y 沿 y 轴向下移动的量（以像素为单位）。
		*@return 返回此矩形。
		*/
		__proto.translate=function(x,y){
			this.tx+=x;
			this.ty+=y;
			return this;
		}

		/**
		*对矩阵应用缩放转换。
		*@param x 用于沿 x 轴缩放对象的乘数。
		*@param y 用于沿 y 轴缩放对象的乘数。
		*/
		__proto.scale=function(x,y){
			this.a *=x;
			this.d *=y;
			this.c *=x;
			this.b *=y;
			this.tx *=x;
			this.ty *=y;
			this.bTransform=true;
		}

		/**
		*对 Matrix 对象应用旋转转换。
		*@param angle 以弧度为单位的旋转角度。
		*/
		__proto.rotate=function(angle){
			var cos=this.cos=Math.cos(angle);
			var sin=this.sin=Math.sin(angle);
			var a1=this.a;
			var c1=this.c;
			var tx1=this.tx;
			this.a=a1 *cos-this.b *sin;
			this.b=a1 *sin+this.b *cos;
			this.c=c1 *cos-this.d *sin;
			this.d=c1 *sin+this.d *cos;
			this.tx=tx1 *cos-this.ty *sin;
			this.ty=tx1 *sin+this.ty *cos;
			this.bTransform=true;
		}

		/**
		*对 Matrix 对象应用倾斜转换。
		*@param x 沿着 X 轴的 2D 倾斜弧度。
		*@param y 沿着 Y 轴的 2D 倾斜弧度。
		*@return 当前 Matrix 对象。
		*/
		__proto.skew=function(x,y){
			var tanX=Math.tan(x);
			var tanY=Math.tan(y);
			var a1=this.a;
			var b1=this.b;
			this.a+=tanY *this.c;
			this.b+=tanY *this.d;
			this.c+=tanX *a1;
			this.d+=tanX *b1;
			return this;
		}

		/**
		*对指定的点应用当前矩阵的逆转化并返回此点。
		*@param out 待转化的点 Point 对象。
		*@return 返回out
		*/
		__proto.invertTransformPoint=function(out){
			var a1=this.a;
			var b1=this.b;
			var c1=this.c;
			var d1=this.d;
			var tx1=this.tx;
			var n=a1 *d1-b1 *c1;
			var a2=d1 / n;
			var b2=-b1 / n;
			var c2=-c1 / n;
			var d2=a1 / n;
			var tx2=(c1 *this.ty-d1 *tx1)/ n;
			var ty2=-(a1 *this.ty-b1 *tx1)/ n;
			return out.setTo(a2 *out.x+c2 *out.y+tx2,b2 *out.x+d2 *out.y+ty2);
		}

		/**
		*将 Matrix 对象表示的几何转换应用于指定点。
		*@param out 用来设定输出结果的点。
		*@return 返回out
		*/
		__proto.transformPoint=function(out){
			return out.setTo(this.a *out.x+this.c *out.y+this.tx,this.b *out.x+this.d *out.y+this.ty);
		}

		/**
		*@private
		*将 Matrix 对象表示的几何转换应用于指定点。
		*@param data 点集合。
		*@param out 存储应用转化的点的列表。
		*@return 返回out数组
		*/
		__proto.transformPointArray=function(data,out){
			var len=data.length;
			for (var i=0;i < len;i+=2){
				var x=data[i],y=data[i+1];
				out[i]=this.a *x+this.c *y+this.tx;
				out[i+1]=this.b *x+this.d *y+this.ty;
			}
			return out;
		}

		/**
		*@private
		*将 Matrix 对象表示的几何缩放转换应用于指定点。
		*@param data 点集合。
		*@param out 存储应用转化的点的列表。
		*@return 返回out数组
		*/
		__proto.transformPointArrayScale=function(data,out){
			var len=data.length;
			for (var i=0;i < len;i+=2){
				var x=data[i],y=data[i+1];
				out[i]=this.a *x+this.c *y;
				out[i+1]=this.b *x+this.d *y;
			}
			return out;
		}

		/**
		*获取 X 轴缩放值。
		*@return X 轴缩放值。
		*/
		__proto.getScaleX=function(){
			return this.b===0 ? this.a :Math.sqrt(this.a *this.a+this.b *this.b);
		}

		/**
		*获取 Y 轴缩放值。
		*@return Y 轴缩放值。
		*/
		__proto.getScaleY=function(){
			return this.c===0 ? this.d :Math.sqrt(this.c *this.c+this.d *this.d);
		}

		/**
		*执行原始矩阵的逆转换。
		*@return 当前矩阵对象。
		*/
		__proto.invert=function(){
			var a1=this.a;
			var b1=this.b;
			var c1=this.c;
			var d1=this.d;
			var tx1=this.tx;
			var n=a1 *d1-b1 *c1;
			this.a=d1 / n;
			this.b=-b1 / n;
			this.c=-c1 / n;
			this.d=a1 / n;
			this.tx=(c1 *this.ty-d1 *tx1)/ n;
			this.ty=-(a1 *this.ty-b1 *tx1)/ n;
			return this;
		}

		/**
		*将 Matrix 的成员设置为指定值。
		*@param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
		*@param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
		*@param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
		*@param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
		*@param tx 沿 x 轴平移每个点的距离。
		*@param ty 沿 y 轴平移每个点的距离。
		*@return 当前矩阵对象。
		*/
		__proto.setTo=function(a,b,c,d,tx,ty){
			this.a=a,this.b=b,this.c=c,this.d=d,this.tx=tx,this.ty=ty;
			return this;
		}

		/**
		*将指定矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
		*@param matrix 要连接到源矩阵的矩阵。
		*@return 当前矩阵。
		*/
		__proto.concat=function(matrix){
			var a=this.a;
			var c=this.c;
			var tx=this.tx;
			this.a=a *matrix.a+this.b *matrix.c;
			this.b=a *matrix.b+this.b *matrix.d;
			this.c=c *matrix.a+this.d *matrix.c;
			this.d=c *matrix.b+this.d *matrix.d;
			this.tx=tx *matrix.a+this.ty *matrix.c+matrix.tx;
			this.ty=tx *matrix.b+this.ty *matrix.d+matrix.ty;
			return this;
		}

		/**
		*返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
		*@return 一个 Matrix 对象。
		*/
		__proto.clone=function(){
			var no=Matrix._cache;
			var dec=!no._length ? (new Matrix()):no[--no._length];
			dec.a=this.a;
			dec.b=this.b;
			dec.c=this.c;
			dec.d=this.d;
			dec.tx=this.tx;
			dec.ty=this.ty;
			dec.bTransform=this.bTransform;
			return dec;
		}

		/**
		*将当前 Matrix 对象中的所有矩阵数据复制到指定的 Matrix 对象中。
		*@param dec 要复制当前矩阵数据的 Matrix 对象。
		*@return 已复制当前矩阵数据的 Matrix 对象。
		*/
		__proto.copyTo=function(dec){
			dec.a=this.a;
			dec.b=this.b;
			dec.c=this.c;
			dec.d=this.d;
			dec.tx=this.tx;
			dec.ty=this.ty;
			dec.bTransform=this.bTransform;
			return dec;
		}

		/**
		*返回列出该 Matrix 对象属性的文本值。
		*@return 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
		*/
		__proto.toString=function(){
			return this.a+","+this.b+","+this.c+","+this.d+","+this.tx+","+this.ty;
		}

		/**
		*销毁此对象。
		*/
		__proto.destroy=function(){
			if (this.inPool)return;
			var cache=Matrix._cache;
			this.inPool=true;
			cache._length || (cache._length=0);
			cache[cache._length++]=this;
			this.a=this.d=1;
			this.b=this.c=this.tx=this.ty=0;
			this.bTransform=false;
		}

		Matrix.mul=function(m1,m2,out){
			var aa=m1.a,ab=m1.b,ac=m1.c,ad=m1.d,atx=m1.tx,aty=m1.ty;
			var ba=m2.a,bb=m2.b,bc=m2.c,bd=m2.d,btx=m2.tx,bty=m2.ty;
			if (bb!==0 || bc!==0){
				out.a=aa *ba+ab *bc;
				out.b=aa *bb+ab *bd;
				out.c=ac *ba+ad *bc;
				out.d=ac *bb+ad *bd;
				out.tx=ba *atx+bc *aty+btx;
				out.ty=bb *atx+bd *aty+bty;
				}else {
				out.a=aa *ba;
				out.b=ab *bd;
				out.c=ac *ba;
				out.d=ad *bd;
				out.tx=ba *atx+btx;
				out.ty=bd *aty+bty;
			}
			return out;
		}

		Matrix.mulPre=function(m1,ba,bb,bc,bd,btx,bty,out){
			var aa=m1.a,ab=m1.b,ac=m1.c,ad=m1.d,atx=m1.tx,aty=m1.ty;
			if (bb!==0 || bc!==0){
				out.a=aa *ba+ab *bc;
				out.b=aa *bb+ab *bd;
				out.c=ac *ba+ad *bc;
				out.d=ac *bb+ad *bd;
				out.tx=ba *atx+bc *aty+btx;
				out.ty=bb *atx+bd *aty+bty;
				}else {
				out.a=aa *ba;
				out.b=ab *bd;
				out.c=ac *ba;
				out.d=ad *bd;
				out.tx=ba *atx+btx;
				out.ty=bd *aty+bty;
			}
			return out;
		}

		Matrix.mulPos=function(m1,aa,ab,ac,ad,atx,aty,out){
			var ba=m1.a,bb=m1.b,bc=m1.c,bd=m1.d,btx=m1.tx,bty=m1.ty;
			if (bb!==0 || bc!==0){
				out.a=aa *ba+ab *bc;
				out.b=aa *bb+ab *bd;
				out.c=ac *ba+ad *bc;
				out.d=ac *bb+ad *bd;
				out.tx=ba *atx+bc *aty+btx;
				out.ty=bb *atx+bd *aty+bty;
				}else {
				out.a=aa *ba;
				out.b=ab *bd;
				out.c=ac *ba;
				out.d=ad *bd;
				out.tx=ba *atx+btx;
				out.ty=bd *aty+bty;
			}
			return out;
		}

		Matrix.preMul=function(parent,self,out){
			var pa=parent.a,pb=parent.b,pc=parent.c,pd=parent.d;
			var na=self.a,nb=self.b,nc=self.c,nd=self.d,ntx=self.tx,nty=self.ty;
			out.a=na *pa;
			out.b=out.c=0;
			out.d=nd *pd;
			out.tx=ntx *pa+parent.tx;
			out.ty=nty *pd+parent.ty;
			if (nb!==0 || nc!==0 || pb!==0 || pc!==0){
				out.a+=nb *pc;
				out.d+=nc *pb;
				out.b+=na *pb+nb *pd;
				out.c+=nc *pa+nd *pc;
				out.tx+=nty *pc;
				out.ty+=ntx *pb;
			}
			return out;
		}

		Matrix.preMulXY=function(parent,x,y,out){
			var pa=parent.a,pb=parent.b,pc=parent.c,pd=parent.d;
			out.a=pa;
			out.b=pb;
			out.c=pc;
			out.d=pd;
			out.tx=x *pa+parent.tx+y *pc;
			out.ty=y *pd+parent.ty+x *pb;
			return out;
		}

		Matrix.create=function(){
			var cache=Matrix._cache;
			var mat=!cache._length ? (new Matrix()):cache[--cache._length];
			mat.inPool=false;
			return mat;
		}

		Matrix.EMPTY=new Matrix();
		Matrix.TEMP=new Matrix();
		Matrix._cache=[];
		return Matrix;
	})()


	/**
	*<code>Point</code> 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
	*/
	//class laya.maths.Point
	var Point=(function(){
		function Point(x,y){
			//this.x=NaN;
			//this.y=NaN;
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			this.x=x;
			this.y=y;
		}

		__class(Point,'laya.maths.Point');
		var __proto=Point.prototype;
		/**
		*将 <code>Point</code> 的成员设置为指定值。
		*@param x 水平坐标。
		*@param y 垂直坐标。
		*@return 当前 Point 对象。
		*/
		__proto.setTo=function(x,y){
			this.x=x;
			this.y=y;
			return this;
		}

		/**
		*计算当前点和目标x，y点的距离
		*@param x 水平坐标。
		*@param y 垂直坐标。
		*@return 返回之间的距离
		*/
		__proto.distance=function(x,y){
			return Math.sqrt((this.x-x)*(this.x-x)+(this.y-y)*(this.y-y));
		}

		/**返回包含 x 和 y 坐标的值的字符串。*/
		__proto.toString=function(){
			return this.x+","+this.y;
		}

		/**
		*标准化向量
		*/
		__proto.normalize=function(){
			var d=Math.sqrt(this.x *this.x+this.y *this.y);
			if (d > 0){
				var id=1.0 / d;
				this.x *=id;
				this.y *=id;
			}
		}

		Point.TEMP=new Point();
		Point.EMPTY=new Point();
		return Point;
	})()


	/**
	*<code>Rectangle</code> 对象是按其位置（由它左上角的点 (x,y)确定）以及宽度和高度定义的区域。
	*/
	//class laya.maths.Rectangle
	var Rectangle=(function(){
		function Rectangle(x,y,width,height){
			//this.x=NaN;
			//this.y=NaN;
			//this.width=NaN;
			//this.height=NaN;
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			this.x=x;
			this.y=y;
			this.width=width;
			this.height=height;
		}

		__class(Rectangle,'laya.maths.Rectangle');
		var __proto=Rectangle.prototype;
		/**
		*将 Rectangle 的属性设置为指定值。
		*@param x x 矩形左上角的 X 轴坐标。
		*@param y x 矩形左上角的 Y 轴坐标。
		*@param width 矩形的宽度。
		*@param height 矩形的高。
		*@return 返回属性值修改后的矩形对象本身。
		*/
		__proto.setTo=function(x,y,width,height){
			this.x=x;
			this.y=y;
			this.width=width;
			this.height=height;
			return this;
		}

		/**
		*复制 source 对象的属性值到此矩形对象中。
		*@param sourceRect 源 Rectangle 对象。
		*@return 返回属性值修改后的矩形对象本身。
		*/
		__proto.copyFrom=function(source){
			this.x=source.x;
			this.y=source.y;
			this.width=source.width;
			this.height=source.height;
			return this;
		}

		/**
		*检测此矩形对象是否包含指定的点。
		*@param x 点的 X 轴坐标值（水平位置）。
		*@param y 点的 Y 轴坐标值（垂直位置）。
		*@return 如果 Rectangle 对象包含指定的点，则值为 true；否则为 false。
		*/
		__proto.contains=function(x,y){
			if (this.width <=0 || this.height <=0)return false;
			if (x >=this.x && x < this.right){
				if (y >=this.y && y < this.bottom){
					return true;
				}
			}
			return false;
		}

		/**
		*检测传入的矩形对象是否与此对象相交。
		*@param rect Rectangle 对象。
		*@return 如果传入的矩形对象与此对象相交，则返回 true 值，否则返回 false。
		*/
		__proto.intersects=function(rect){
			return !(rect.x > (this.x+this.width)|| (rect.x+rect.width)< this.x || rect.y > (this.y+this.height)|| (rect.y+rect.height)< this.y);
		}

		/**
		*获取此对象与传入的矩形对象的相交区域。并将相交区域赋值给传入的输出矩形对象。
		*@param rect 待比较的矩形区域。
		*@param out 待输出的矩形区域。建议：尽量用此对象复用对象，减少对象创建消耗。
		*@return 返回相交的矩形区域对象。
		*/
		__proto.intersection=function(rect,out){
			if (!this.intersects(rect))return null;
			out || (out=new Rectangle());
			out.x=Math.max(this.x,rect.x);
			out.y=Math.max(this.y,rect.y);
			out.width=Math.min(this.right,rect.right)-out.x;
			out.height=Math.min(this.bottom,rect.bottom)-out.y;
			return out;
		}

		/**
		*矩形联合，通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。
		*@param 目标矩形对象。
		*@param out 待输出结果的矩形对象。建议：尽量用此对象复用对象，减少对象创建消耗。
		*@return 两个矩形后联合的 Rectangle 对象 out 。
		*/
		__proto.union=function(source,out){
			out || (out=new Rectangle());
			this.clone(out);
			if (source.width <=0 || source.height <=0)return out;
			out.addPoint(source.x,source.y);
			out.addPoint(source.right,source.bottom);
			return this;
		}

		/**
		*返回一个 Rectangle 对象，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
		*@param out 待输出的矩形对象。建议：尽量用此对象复用对象，减少对象创建消耗。
		*@return Rectangle 对象 out ，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
		*/
		__proto.clone=function(out){
			out || (out=new Rectangle());
			out.x=this.x;
			out.y=this.y;
			out.width=this.width;
			out.height=this.height;
			return out;
		}

		/**
		*当前 Rectangle 对象的水平位置 x 和垂直位置 y 以及高度 width 和宽度 height 以逗号连接成的字符串。
		*/
		__proto.toString=function(){
			return this.x+","+this.y+","+this.width+","+this.height;
		}

		/**
		*检测传入的 Rectangle 对象的属性是否与当前 Rectangle 对象的属性 x、y、width、height 属性值都相等。
		*@param rect 待比较的 Rectangle 对象。
		*@return 如果判断的属性都相等，则返回 true ,否则返回 false。
		*/
		__proto.equals=function(rect){
			if (!rect || rect.x!==this.x || rect.y!==this.y || rect.width!==this.width || rect.height!==this.height)return false;
			return true;
		}

		/**
		*在当前矩形区域中加一个点。
		*@param x 点的 X 坐标。
		*@param y 点的 Y 坐标。
		*@return 返回此 Rectangle 对象。
		*/
		__proto.addPoint=function(x,y){
			this.x > x && (this.width+=this.x-x,this.x=x);
			this.y > y && (this.height+=this.y-y,this.y=y);
			if (this.width < x-this.x)this.width=x-this.x;
			if (this.height < y-this.y)this.height=y-this.y;
			return this;
		}

		/**
		*@private
		*返回代表当前矩形的顶点数据。
		*@return 顶点数据。
		*/
		__proto._getBoundPoints=function(){
			var rst=Rectangle._temB;
			rst.length=0;
			if (this.width==0 || this.height==0)return rst;
			rst.push(this.x,this.y,this.x+this.width,this.y,this.x,this.y+this.height,this.x+this.width,this.y+this.height);
			return rst;
		}

		/**确定此 Rectangle 对象是否为空。*/
		__proto.isEmpty=function(){
			if (this.width <=0 || this.height <=0)return true;
			return false;
		}

		/**此矩形的右边距。 x 和 width 属性的和。*/
		__getset(0,__proto,'right',function(){
			return this.x+this.width;
		});

		/**此矩形的底边距。y 和 height 属性的和。*/
		__getset(0,__proto,'bottom',function(){
			return this.y+this.height;
		});

		Rectangle._getBoundPointS=function(x,y,width,height){
			var rst=Rectangle._temA;
			rst.length=0;
			if (width==0 || height==0)return rst;
			rst.push(x,y,x+width,y,x,y+height,x+width,y+height);
			return rst;
		}

		Rectangle._getWrapRec=function(pointList,rst){
			if (!pointList || pointList.length < 1)return rst ? rst.setTo(0,0,0,0):Rectangle.TEMP.setTo(0,0,0,0);
			rst=rst ? rst :new Rectangle();
			var i,len=pointList.length,minX,maxX,minY,maxY,tPoint=Point.TEMP;
			minX=minY=99999;
			maxX=maxY=-minX;
			for (i=0;i < len;i+=2){
				tPoint.x=pointList[i];
				tPoint.y=pointList[i+1];
				minX=minX < tPoint.x ? minX :tPoint.x;
				minY=minY < tPoint.y ? minY :tPoint.y;
				maxX=maxX > tPoint.x ? maxX :tPoint.x;
				maxY=maxY > tPoint.y ? maxY :tPoint.y;
			}
			return rst.setTo(minX,minY,maxX-minX,maxY-minY);
		}

		Rectangle.EMPTY=new Rectangle();
		Rectangle.TEMP=new Rectangle();
		Rectangle._temB=[];
		Rectangle._temA=[];
		return Rectangle;
	})()


	/**
	*<code>SoundManager</code> 是一个声音管理类。
	*/
	//class laya.media.SoundManager
	var SoundManager=(function(){
		function SoundManager(){};
		__class(SoundManager,'laya.media.SoundManager');
		/**
		*设置是否失去焦点后自动停止背景音乐。
		*@param v Boolean 值。
		*
		*/
		/**
		*表示是否失去焦点后自动停止背景音乐。
		*@return
		*/
		__getset(1,SoundManager,'autoStopMusic',function(){
			return SoundManager._autoStopMusic;
			},function(v){
			Laya.stage.off(/*laya.events.Event.BLUR*/"blur",null,SoundManager._stageOnBlur);
			Laya.stage.off(/*laya.events.Event.FOCUS*/"focus",null,SoundManager._stageOnFocus);
			SoundManager._autoStopMusic=v;
			if (v){
				Laya.stage.on(/*laya.events.Event.BLUR*/"blur",null,SoundManager._stageOnBlur);
				Laya.stage.on(/*laya.events.Event.FOCUS*/"focus",null,SoundManager._stageOnFocus);
			}
		});

		/**
		*表示是否静音。
		*/
		__getset(1,SoundManager,'muted',function(){
			return SoundManager._muted;
			},function(value){
			if (value){
				SoundManager.stopAll();
			}
			SoundManager._muted=value;
		});

		/**表示是否使背景音乐静音。*/
		__getset(1,SoundManager,'musicMuted',function(){
			return SoundManager._musicMuted;
			},function(value){
			if (value){
				if (SoundManager._tMusic)
					SoundManager.stopSound(SoundManager._tMusic);
				SoundManager._musicMuted=value;
				}else {
				SoundManager._musicMuted=value;
				if (SoundManager._tMusic){
					SoundManager.playMusic(SoundManager._tMusic);
				}
			}
		});

		/**表示是否使音效静音。*/
		__getset(1,SoundManager,'soundMuted',function(){
			return SoundManager._soundMuted;
			},function(value){
			SoundManager._soundMuted=value;
		});

		SoundManager.addChannel=function(channel){
			if (SoundManager._channels.indexOf(channel)>=0)return;
			SoundManager._channels.push(channel);
		}

		SoundManager.removeChannel=function(channel){
			var i=0;
			for (i=SoundManager._channels.length-1;i >=0;i--){
				if (SoundManager._channels[i]==channel){
					SoundManager._channels.splice(i,1);
				}
			}
		}

		SoundManager._stageOnBlur=function(){
			if (SoundManager._musicChannel){
				if (!SoundManager._musicChannel.isStopped){
					SoundManager._blurPaused=true;
					SoundManager._musicLoops=SoundManager._musicChannel.loops;
					SoundManager._musicCompleteHandler=SoundManager._musicChannel.completeHandler;
					SoundManager._musicPosition=SoundManager._musicChannel.position;
					SoundManager._musicChannel.stop();
				}
			}
		}

		SoundManager._stageOnFocus=function(){
			if (SoundManager._blurPaused){
				SoundManager.playMusic(SoundManager._tMusic,SoundManager._musicLoops,SoundManager._musicCompleteHandler,SoundManager._musicPosition);
				SoundManager._blurPaused=false;
			}
		}

		SoundManager.playSound=function(url,loops,complete,soundClass,startTime){
			(loops===void 0)&& (loops=1);
			(startTime===void 0)&& (startTime=0);
			if (SoundManager._muted)
				return null;
			if (url==SoundManager._tMusic){
				if (SoundManager._musicMuted)return null;
				}else {
				if (SoundManager._soundMuted)return null;
			};
			var tSound=Laya.loader.getRes(url);
			if (!soundClass)soundClass=SoundManager._soundClass;
			if (!tSound){
				tSound=new soundClass();
				tSound.load(url);
				Loader.cacheRes(url,tSound);
			};
			var channel;
			channel=tSound.play(startTime,loops);
			channel.url=url;
			channel.volume=(url==SoundManager._tMusic)? SoundManager.musicVolume :SoundManager.soundVolume;
			channel.completeHandler=complete;
			return channel;
		}

		SoundManager.destroySound=function(url){
			var tSound=Laya.loader.getRes(url);
			if (tSound){
				Loader.clearRes(url);
				tSound.dispose();
			}
		}

		SoundManager.playMusic=function(url,loops,complete,startTime){
			(loops===void 0)&& (loops=0);
			(startTime===void 0)&& (startTime=0);
			SoundManager._tMusic=url;
			if (SoundManager._musicChannel)
				SoundManager._musicChannel.stop();
			return SoundManager._musicChannel=SoundManager.playSound(url,loops,complete,null,startTime);
		}

		SoundManager.stopSound=function(url){
			var i=0;
			var channel;
			for (i=SoundManager._channels.length-1;i >=0;i--){
				channel=SoundManager._channels[i];
				if (channel.url==url){
					channel.stop();
				}
			}
		}

		SoundManager.stopAll=function(){
			var i=0;
			var channel;
			for (i=SoundManager._channels.length-1;i >=0;i--){
				channel=SoundManager._channels[i];
				channel.stop();
			}
		}

		SoundManager.stopMusic=function(){
			if (SoundManager._musicChannel)
				SoundManager._musicChannel.stop();
		}

		SoundManager.setSoundVolume=function(volume,url){
			if (url){
				SoundManager._setVolume(url,volume);
				}else {
				SoundManager.soundVolume=volume;
			}
		}

		SoundManager.setMusicVolume=function(volume){
			SoundManager.musicVolume=volume;
			SoundManager._setVolume(SoundManager._tMusic,volume);
		}

		SoundManager._setVolume=function(url,volume){
			var i=0;
			var channel;
			for (i=SoundManager._channels.length-1;i >=0;i--){
				channel=SoundManager._channels[i];
				if (channel.url==url){
					channel.volume=volume;
				}
			}
		}

		SoundManager.musicVolume=1;
		SoundManager.soundVolume=1;
		SoundManager._muted=false;
		SoundManager._soundMuted=false;
		SoundManager._musicMuted=false;
		SoundManager._tMusic=null;
		SoundManager._musicChannel=null;
		SoundManager._channels=[];
		SoundManager._autoStopMusic=false;
		SoundManager._blurPaused=false;
		SoundManager._musicLoops=0;
		SoundManager._musicPosition=0;
		SoundManager._musicCompleteHandler=null;
		SoundManager._soundClass=null
		return SoundManager;
	})()


	/**
	*<p> <code>LocalStorage</code> 类用于没有时间限制的数据存储。</p>
	*/
	//class laya.net.LocalStorage
	var LocalStorage=(function(){
		var Storage;
		function LocalStorage(){};
		__class(LocalStorage,'laya.net.LocalStorage');
		LocalStorage.__init__=function(){
			if (!LocalStorage._baseClass){
				LocalStorage._baseClass=Storage;
				Storage.init();
			}
			LocalStorage.items=LocalStorage._baseClass.items;
			LocalStorage.support=LocalStorage._baseClass.support;
		}

		LocalStorage.setItem=function(key,value){
			LocalStorage._baseClass.setItem(key,value);
		}

		LocalStorage.getItem=function(key){
			return LocalStorage._baseClass.getItem(key);
		}

		LocalStorage.setJSON=function(key,value){
			LocalStorage._baseClass.setJSON(key,value);
		}

		LocalStorage.getJSON=function(key){
			return LocalStorage._baseClass.getJSON(key);
		}

		LocalStorage.removeItem=function(key){
			LocalStorage._baseClass.removeItem(key);
		}

		LocalStorage.clear=function(){
			LocalStorage._baseClass.clear();
		}

		LocalStorage._baseClass=null
		LocalStorage.items=null
		LocalStorage.support=false;
		LocalStorage.__init$=function(){
			//class Storage
			Storage=(function(){
				function Storage(){};
				__class(Storage,'');
				Storage.init=function(){
					/*__JS__ */if (window.localStorage){Storage.items=window.localStorage;try {Storage.setItem('laya','1');Storage.removeItem('laya');Storage.support=true;}catch (e){}}if (!Storage.support)console.log('LocalStorage is not supprot or browser is private mode.');
				}
				Storage.setItem=function(key,value){
					try {
						Storage.support && Storage.items.setItem(key,value);
						}catch (e){
						console.log("set localStorage failed",e);
					}
				}
				Storage.getItem=function(key){
					return Storage.support ? Storage.items.getItem(key):null;
				}
				Storage.setJSON=function(key,value){
					try {
						Storage.support && Storage.items.setItem(key,JSON.stringify(value));
						}catch (e){
						console.log("set localStorage failed",e);
					}
				}
				Storage.getJSON=function(key){
					return JSON.parse(Storage.support ? Storage.items.getItem(key):null);
				}
				Storage.removeItem=function(key){
					Storage.support && Storage.items.removeItem(key);
				}
				Storage.clear=function(){
					Storage.support && Storage.items.clear();
				}
				Storage.items=null
				Storage.support=false;
				return Storage;
			})()
		}

		return LocalStorage;
	})()


	/**
	*<p> <code>URL</code> 类用于定义地址信息。</p>
	*/
	//class laya.net.URL
	var URL=(function(){
		function URL(url){
			this._url=null;
			this._path=null;
			this._url=URL.formatURL(url);
			this._path=URL.getPath(url);
		}

		__class(URL,'laya.net.URL');
		var __proto=URL.prototype;
		/**地址的路径。*/
		__getset(0,__proto,'path',function(){
			return this._path;
		});

		/**格式化后的地址。*/
		__getset(0,__proto,'url',function(){
			return this._url;
		});

		URL.formatURL=function(url,base){
			if (URL.customFormat !=null)url=URL.customFormat(url,base);
			if (!url)return "null path";
			if (Render.isConchApp==false){
				URL.version[url] && (url+="?v="+URL.version[url]);
			}
			if (url.charAt(0)=='~')return URL.rootPath+url.substring(1);
			if (URL.isAbsolute(url))return url;
			var retVal=(base || URL.basePath)+url;
			return retVal;
		}

		URL.formatRelativePath=function(value){
			if (value.indexOf("../")>-1){
				var parts=value.split("/");
				for (var i=0,len=parts.length;i < len;i++){
					if (parts[i]=='..'){
						parts.splice(i-1,2);
						i-=2;
					}
				}
				return parts.join('/');
			}
			return value;
		}

		URL.isAbsolute=function(url){
			return url.indexOf(":")> 0 || url.charAt(0)=='/';
		}

		URL.getPath=function(url){
			var ofs=url.lastIndexOf('/');
			return ofs > 0 ? url.substr(0,ofs+1):"";
		}

		URL.getFileName=function(url){
			var ofs=url.lastIndexOf('/');
			return ofs > 0 ? url.substr(ofs+1):url;
		}

		URL.version={};
		URL.basePath="";
		URL.rootPath="";
		URL.customFormat=null
		return URL;
	})()


	/**
	*@private
	*<code>Render</code> 是渲染管理类。它是一个单例，可以使用 Laya.render 访问。
	*/
	//class laya.renders.Render
	var Render=(function(){
		/**
		*初始化引擎。
		*@param width 游戏窗口宽度。
		*@param height 游戏窗口高度。
		*/
		function Render(width,height){
			var style=Render._mainCanvas.source.style;
			style.position='absolute';
			style.top=style.left="0px";
			style.background="#000000";
			Render._mainCanvas.source.id=Render._mainCanvas.source.id || "layaCanvas";
			var isWebGl=laya.renders.Render.isWebGL;
			isWebGl && Render.WebGL.init(Render._mainCanvas,width,height);
			if (Render._mainCanvas.source.nodeName||laya.renders.Render.isConchApp){
				Browser.container.appendChild(Render._mainCanvas.source);
			}
			Render._context=new RenderContext(width,height,isWebGl ? null :Render._mainCanvas);
			Render._context.ctx.setIsMainContext();
			Browser.window.requestAnimationFrame(loop);
			function loop (){
				Laya.stage._loop();
				Browser.window.requestAnimationFrame(loop);
			}
		}

		__class(Render,'laya.renders.Render');
		var __proto=Render.prototype;
		/**@private */
		__proto._enterFrame=function(e){
			Laya.stage._loop();
		}

		/**是否是加速器 只读*/
		__getset(1,Render,'isConchApp',function(){
			return /*__JS__ */(window.ConchRenderType & 0x04)==0x04;
		});

		/**目前使用的渲染器。*/
		__getset(1,Render,'context',function(){
			return Render._context;
		});

		/**加速器模式下设置是否是节点模式 如果是否就是非节点模式 默认为canvas模式 如果设置了isConchWebGL则是webGL模式*/
		__getset(1,Render,'isConchNode',function(){
			return /*__JS__ */(window.ConchRenderType & 5)==5;
			},function(b){
			if (b){
				/*__JS__ */window.ConchRenderType |=0x01;
				}else {
				/*__JS__ */window.ConchRenderType &=~ 0x01;
			}
		});

		/**加速器模式下设置是否是WebGL模式*/
		__getset(1,Render,'isConchWebGL',function(){
			return /*__JS__ */window.ConchRenderType==6;
			},function(b){
			if (b){
				Render.isConchNode=false;
				/*__JS__ */window.ConchRenderType |=0x02;
				}else {
				/*__JS__ */window.ConchRenderType &=~ 0x02;
			}
		});

		/**渲染使用的原生画布引用。 */
		__getset(1,Render,'canvas',function(){
			return Render._mainCanvas.source;
		});

		Render._context=null
		Render._mainCanvas=null
		Render.WebGL=null
		Render.NODE=0x01;
		Render.WEBGL=0x02;
		Render.CONCH=0x04;
		Render.isWebGL=false;
		Render.is3DMode=false;
		Render.optimizeTextureMemory=function(url,texture){
			return true;
		}

		Render.__init$=function(){
			/*__JS__ */window.ConchRenderType=window.ConchRenderType||1;;
			/*__JS__ */window.ConchRenderType|=(!window.conch?0:0x04);;
		}

		return Render;
	})()


	/**
	*@private
	*渲染环境
	*/
	//class laya.renders.RenderContext
	var RenderContext=(function(){
		function RenderContext(width,height,canvas){
			this.x=0;
			this.y=0;
			//this.canvas=null;
			//this.ctx=null;
			this._drawTexture=function(x,y,args){
				if (args[0].loaded)this.ctx.drawTexture(args[0],args[1],args[2],args[3],args[4],x,y);
			}
			this._fillTexture=function(x,y,args){
				if (args[0].loaded){
					var texture=args[0];
					var ctxi=this.ctx;
					var pat;
					if (Render.isWebGL){
						var tSprite=args[7];
						if (tSprite){
							if (args[6]){
								tSprite.initTexture(texture,args[1],args[2],args[3],args[4],args[6].x,args[6].y);
								}else {
								tSprite.initTexture(texture,args[1],args[2],args[3],args[4],0,0);
							};
							var ctx=this.ctx;
							tSprite.render(ctx,x,y);
						}
						return;
					}
					if (!Render.isConchApp){
						if (texture.uv !=Texture.DEF_UV){
							var canvas=new HTMLCanvas("2D");
							canvas.getContext('2d');
							canvas.size(texture.width,texture.height);
							canvas.context.drawTexture(texture,0,0,texture.width,texture.height,0,0);
							args[0]=texture=new Texture(canvas);
						}
						pat=args[7] ? args[7] :args[7]=ctxi.createPattern(texture.bitmap.source,args[5]);
						}else {
						if (texture.uv !=Texture.DEF_UV){
							var w=texture.bitmap.width,h=texture.bitmap.height,uv=texture.uv;
							pat=args[7] ? args[7] :args[7]=ctxi.createPattern(texture.bitmap.source,args[5],uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h);
							}else {
							pat=args[7] ? args[7] :args[7]=ctxi.createPattern(texture.bitmap.source,args[5]);
						}
					};
					var oX=x+args[1],oY=y+args[2];
					var sX=0,sY=0;
					if (args[6]){
						oX+=args[6].x % texture.width;
						oY+=args[6].y % texture.height;
						sX-=args[6].x % texture.width;
						sY-=args[6].y % texture.height;
					}
					ctxi.translate(oX,oY);
					ctxi.fillStyle=pat;
					ctxi.fillRect(sX,sY,args[3],args[4]);
					ctxi.translate(-oX,-oY);
				}else {}
			}
			this._drawTextureWithTransform=function(x,y,args){
				if (args[0].loaded)this.ctx.drawTextureWithTransform(args[0],args[1],args[2],args[3],args[4],args[5],x,y);
			}
			this._fillQuadrangle=function(x,y,args){
				this.ctx.fillQuadrangle(args[0],args[1],args[2],args[3],args[4]);
			}
			this._drawRect=function(x,y,args){
				var ctx=this.ctx;
				if (args[4] !=null){
					ctx.fillStyle=args[4];
					ctx.fillRect(x+args[0],y+args[1],args[2],args[3],null);
				}
				if (args[5] !=null){
					ctx.strokeStyle=args[5];
					ctx.lineWidth=args[6];
					ctx.strokeRect(x+args[0],y+args[1],args[2],args[3],args[6]);
				}
			}
			this._drawPie=function(x,y,args){
				var ctx=this.ctx;
				Render.isWebGL && ctx.setPathId(args[8]);
				ctx.beginPath();
				if (Render.isWebGL){
					ctx.movePath(args[0]+x,args[1]+y);
					ctx.moveTo(0,0);
					}else {
					ctx.moveTo(x+args[0],y+args[1]);
				}
				ctx.arc(x+args[0],y+args[1],args[2],args[3],args[4]);
				ctx.closePath();
				this._fillAndStroke(args[5],args[6],args[7],true);
			}
			this._clipRect=function(x,y,args){
				this.ctx.clipRect(x+args[0],y+args[1],args[2],args[3]);
			}
			this._fillRect=function(x,y,args){
				this.ctx.fillRect(x+args[0],y+args[1],args[2],args[3],args[4]);
			}
			this._drawCircle=function(x,y,args){
				var ctx=this.ctx;
				Render.isWebGL && ctx.setPathId(args[6]);
				Stat.drawCall++;
				ctx.beginPath();
				Render.isWebGL && ctx.movePath(args[0]+x,args[1]+y);
				ctx.arc(args[0]+x,args[1]+y,args[2],0,RenderContext.PI2);
				ctx.closePath();
				this._fillAndStroke(args[3],args[4],args[5],true);
			}
			this._fillCircle=function(x,y,args){
				Stat.drawCall++;
				var ctx=this.ctx;
				ctx.beginPath();
				ctx.fillStyle=args[3];
				ctx.arc(args[0]+x,args[1]+y,args[2],0,RenderContext.PI2);
				ctx.fill();
			}
			this._setShader=function(x,y,args){
				this.ctx.setShader(args[0]);
			}
			this._drawLine=function(x,y,args){
				var ctx=this.ctx;
				Render.isWebGL && ctx.setPathId(args[6]);
				ctx.beginPath();
				ctx.strokeStyle=args[4];
				ctx.lineWidth=args[5];
				if (Render.isWebGL){
					ctx.movePath(x,y);
					ctx.moveTo(args[0],args[1]);
					ctx.lineTo(args[2],args[3]);
					}else {
					ctx.moveTo(x+args[0],y+args[1]);
					ctx.lineTo(x+args[2],y+args[3]);
				}
				ctx.stroke();
			}
			this._drawLines=function(x,y,args){
				var ctx=this.ctx;
				Render.isWebGL && ctx.setPathId(args[5]);
				ctx.beginPath();
				x+=args[0],y+=args[1];
				Render.isWebGL && ctx.movePath(x,y);
				ctx.strokeStyle=args[3];
				ctx.lineWidth=args[4];
				var points=args[2];
				var i=2,n=points.length;
				if (Render.isWebGL){
					ctx.moveTo(points[0],points[1]);
					while (i < n){
						ctx.lineTo(points[i++],points[i++]);
					}
					}else {
					ctx.moveTo(x+points[0],y+points[1]);
					while (i < n){
						ctx.lineTo(x+points[i++],y+points[i++]);
					}
				}
				ctx.stroke();
			}
			this._drawLinesWebGL=function(x,y,args){
				this.ctx.drawLines(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4]);
			}
			this._drawCurves=function(x,y,args){
				var ctx=this.ctx;
				Render.isWebGL && ctx.setPathId(-1);
				ctx.beginPath();
				ctx.strokeStyle=args[3];
				ctx.lineWidth=args[4];
				var points=args[2];
				x+=args[0],y+=args[1];
				ctx.moveTo(x+points[0],y+points[1]);
				var i=2,n=points.length;
				while (i < n){
					ctx.quadraticCurveTo(x+points[i++],y+points[i++],x+points[i++],y+points[i++]);
				}
				ctx.stroke();
			}
			this._draw=function(x,y,args){
				args[0].call(null,this,x,y);
			}
			this._transformByMatrix=function(x,y,args){
				this.ctx.transformByMatrix(args[0]);
			}
			this._setTransform=function(x,y,args){
				this.ctx.setTransform(args[0],args[1],args[2],args[3],args[4],args[5]);
			}
			this._setTransformByMatrix=function(x,y,args){
				this.ctx.setTransformByMatrix(args[0]);
			}
			this._save=function(x,y,args){
				this.ctx.save();
			}
			this._restore=function(x,y,args){
				this.ctx.restore();
			}
			this._translate=function(x,y,args){
				this.ctx.translate(args[0],args[1]);
			}
			this._transform=function(x,y,args){
				this.ctx.translate(args[1]+x,args[2]+y);
				var mat=args[0];
				this.ctx.transform(mat.a,mat.b,mat.c,mat.d,mat.tx,mat.ty);
				this.ctx.translate(-x-args[1],-y-args[2]);
			}
			this._rotate=function(x,y,args){
				this.ctx.translate(args[1]+x,args[2]+y);
				this.ctx.rotate(args[0]);
				this.ctx.translate(-x-args[1],-y-args[2]);
			}
			this._scale=function(x,y,args){
				this.ctx.translate(args[2]+x,args[3]+y);
				this.ctx.scale(args[0],args[1]);
				this.ctx.translate(-x-args[2],-y-args[3]);
			}
			this._alpha=function(x,y,args){
				this.ctx.globalAlpha *=args[0];
			}
			this._setAlpha=function(x,y,args){
				this.ctx.globalAlpha=args[0];
			}
			this._fillText=function(x,y,args){
				this.ctx.fillText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5]);
			}
			this._strokeText=function(x,y,args){
				this.ctx.strokeText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5],args[6]);
			}
			this._fillBorderText=function(x,y,args){
				this.ctx.fillBorderText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5],args[6],args[7]);
			}
			this._blendMode=function(x,y,args){
				this.ctx.globalCompositeOperation=args[0];
			}
			this._beginClip=function(x,y,args){
				this.ctx.beginClip && this.ctx.beginClip(x+args[0],y+args[1],args[2],args[3]);
			}
			this._setIBVB=function(x,y,args){
				this.ctx.setIBVB(args[0]+x,args[1]+y,args[2],args[3],args[4],args[5],args[6],args[7]);
			}
			this._fillTrangles=function(x,y,args){
				this.ctx.fillTrangles(args[0],args[1]+x,args[2]+y,args[3],args[4]);
			}
			this._drawPath=function(x,y,args){
				var ctx=this.ctx;
				Render.isWebGL && ctx.setPathId(-1);
				ctx.beginPath();
				x+=args[0],y+=args[1];
				var paths=args[2];
				for (var i=0,n=paths.length;i < n;i++){
					var path=paths[i];
					switch (path[0]){
						case "moveTo":
							ctx.moveTo(x+path[1],y+path[2]);
							break ;
						case "lineTo":
							ctx.lineTo(x+path[1],y+path[2]);
							break ;
						case "arcTo":
							ctx.arcTo(x+path[1],y+path[2],x+path[3],y+path[4],path[5]);
							break ;
						case "closePath":
							ctx.closePath();
							break ;
						}
				};
				var brush=args[3];
				if (brush !=null){
					ctx.fillStyle=brush.fillStyle;
					ctx.fill();
				};
				var pen=args[4];
				if (pen !=null){
					ctx.strokeStyle=pen.strokeStyle;
					ctx.lineWidth=pen.lineWidth || 1;
					ctx.lineJoin=pen.lineJoin;
					ctx.lineCap=pen.lineCap;
					ctx.miterLimit=pen.miterLimit;
					ctx.stroke();
				}
			}
			this.drawPoly=function(x,y,args){
				this.ctx.drawPoly(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4],args[5],args[6]);
			}
			this._drawPoly=function(x,y,args){
				var ctx=this.ctx;
				var points=args[2];
				var i=2,n=points.length;
				if (Render.isWebGL){
					ctx.setPathId(args[6]);
					ctx.beginPath();
					x+=args[0],y+=args[1];
					ctx.movePath(x,y);
					ctx.moveTo(points[0],points[1]);
					while (i < n){
						ctx.lineTo(points[i++],points[i++]);
					}
					}else {
					ctx.beginPath();
					x+=args[0],y+=args[1];
					ctx.moveTo(x+points[0],y+points[1]);
					while (i < n){
						ctx.lineTo(x+points[i++],y+points[i++]);
					}
				}
				ctx.closePath();
				this._fillAndStroke(args[3],args[4],args[5],args[7]);
			}
			this._drawSkin=function(x,y,args){
				var tSprite=args[0];
				if (tSprite){
					var ctx=this.ctx;
					tSprite.render(ctx,x,y);
				}
			}
			this._drawParticle=function(x,y,args){
				this.ctx.drawParticle(x+this.x,y+this.y,args[0]);
			}
			if (canvas){
				this.ctx=canvas.getContext('2d');
				}else {
				canvas=HTMLCanvas.create("3D");
				this.ctx=RunDriver.createWebGLContext2D(canvas);
				canvas._setContext(this.ctx);
			}
			canvas.size(width,height);
			this.canvas=canvas;
		}

		__class(RenderContext,'laya.renders.RenderContext');
		var __proto=RenderContext.prototype;
		/**销毁当前渲染环境*/
		__proto.destroy=function(){
			if (this.canvas){
				this.canvas.destroy();
				this.canvas=null;
			}
			if (this.ctx){
				this.ctx.destroy();
				this.ctx=null;
			}
		}

		__proto.drawTexture=function(tex,x,y,width,height){
			if (tex.loaded)this.ctx.drawTexture(tex,x,y,width,height,this.x,this.y);
		}

		__proto.drawTextureWithTransform=function(tex,x,y,width,height,m){
			if (tex.loaded)this.ctx.drawTextureWithTransform(tex,x,y,width,height,m,this.x,this.y);
		}

		__proto.fillQuadrangle=function(tex,x,y,point4,m){
			this.ctx.fillQuadrangle(tex,x,y,point4,m);
		}

		__proto.drawCanvas=function(canvas,x,y,width,height){
			this.ctx.drawCanvas(canvas,x+this.x,y+this.y,width,height);
		}

		__proto.drawRect=function(x,y,width,height,color,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var ctx=this.ctx;
			ctx.strokeStyle=color;
			ctx.lineWidth=lineWidth;
			ctx.strokeRect(x+this.x,y+this.y,width,height,lineWidth);
		}

		__proto._fillAndStroke=function(fillColor,strokeColor,lineWidth,isConvexPolygon){
			(isConvexPolygon===void 0)&& (isConvexPolygon=false);
			var ctx=this.ctx;
			if (fillColor !=null){
				ctx.fillStyle=fillColor;
				if (Render.isWebGL){
					ctx.fill(isConvexPolygon);
					}else {
					ctx.fill();
				}
			}
			if (strokeColor !=null && lineWidth > 0){
				ctx.strokeStyle=strokeColor;
				ctx.lineWidth=lineWidth;
				ctx.stroke();
			}
		}

		//ctx.translate(-x-args[0],-y-args[1]);
		__proto.clipRect=function(x,y,width,height){
			this.ctx.clipRect(x+this.x,y+this.y,width,height);
		}

		__proto.fillRect=function(x,y,width,height,fillStyle){
			this.ctx.fillRect(x+this.x,y+this.y,width,height,fillStyle);
		}

		__proto.drawCircle=function(x,y,radius,color,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			Stat.drawCall++;
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.strokeStyle=color;
			ctx.lineWidth=lineWidth;
			ctx.arc(x+this.x,y+this.y,radius,0,RenderContext.PI2);
			ctx.stroke();
		}

		__proto.fillCircle=function(x,y,radius,color){
			Stat.drawCall++;
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.fillStyle=color;
			ctx.arc(x+this.x,y+this.y,radius,0,RenderContext.PI2);
			ctx.fill();
		}

		__proto.setShader=function(shader){
			this.ctx.setShader(shader);
		}

		__proto.drawLine=function(fromX,fromY,toX,toY,color,lineWidth){
			(lineWidth===void 0)&& (lineWidth=1);
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.strokeStyle=color;
			ctx.lineWidth=lineWidth;
			ctx.moveTo(this.x+fromX,this.y+fromY);
			ctx.lineTo(this.x+toX,this.y+toY);
			ctx.stroke();
		}

		__proto.clear=function(){
			this.ctx.clear();
		}

		__proto.transformByMatrix=function(value){
			this.ctx.transformByMatrix(value);
		}

		__proto.setTransform=function(a,b,c,d,tx,ty){
			this.ctx.setTransform(a,b,c,d,tx,ty);
		}

		__proto.setTransformByMatrix=function(value){
			this.ctx.setTransformByMatrix(value);
		}

		__proto.save=function(){
			this.ctx.save();
		}

		__proto.restore=function(){
			this.ctx.restore();
		}

		__proto.translate=function(x,y){
			this.ctx.translate(x,y);
		}

		__proto.transform=function(a,b,c,d,tx,ty){
			this.ctx.transform(a,b,c,d,tx,ty);
		}

		__proto.rotate=function(angle){
			this.ctx.rotate(angle);
		}

		__proto.scale=function(scaleX,scaleY){
			this.ctx.scale(scaleX,scaleY);
		}

		__proto.alpha=function(value){
			this.ctx.globalAlpha *=value;
		}

		__proto.setAlpha=function(value){
			this.ctx.globalAlpha=value;
		}

		__proto.fillWords=function(words,x,y,font,color){
			this.ctx.fillWords(words,x,y,font,color);
		}

		__proto.fillText=function(text,x,y,font,color,textAlign){
			this.ctx.fillText(text,x+this.x,y+this.y,font,color,textAlign);
		}

		__proto.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
			this.ctx.strokeText(text,x+this.x,y+this.y,font,color,lineWidth,textAlign);
		}

		__proto.blendMode=function(type){
			this.ctx.globalCompositeOperation=type;
		}

		__proto.flush=function(){
			this.ctx.flush && this.ctx.flush();
		}

		__proto.addRenderObject=function(o){
			this.ctx.addRenderObject(o);
		}

		__proto.beginClip=function(x,y,w,h){
			this.ctx.beginClip && this.ctx.beginClip(x,y,w,h);
		}

		__proto.endClip=function(){
			this.ctx.endClip && this.ctx.endClip();
		}

		__proto.fillTrangles=function(x,y,args){
			this.ctx.fillTrangles(args[0],args[1],args[2],args[3],args.length > 4 ? args[4] :null);
		}

		RenderContext.PI2=2 *Math.PI;
		return RenderContext;
	})()


	/**
	*@private
	*精灵渲染器
	*/
	//class laya.renders.RenderSprite
	var RenderSprite=(function(){
		function RenderSprite(type,next){
			//this._next=null;
			//this._fun=null;
			this._next=next || RenderSprite.NORENDER;
			switch (type){
				case 0:
					this._fun=this._no;
					return;
				case 0x01:
					this._fun=this._image;
					return;
				case 0x02:
					this._fun=this._alpha;
					return;
				case 0x04:
					this._fun=this._transform;
					return;
				case 0x20:
					this._fun=this._blend;
					return;
				case 0x08:
					this._fun=this._canvas;
					return;
				case 0x40:
					this._fun=this._clip;
					return;
				case 0x80:
					this._fun=this._style;
					return;
				case 0x100:
					this._fun=this._graphics;
					return;
				case 0x800:
					this._fun=this._childs;
					return;
				case 0x200:
					this._fun=this._custom;
					return;
				case 0x01 | 0x100:
					this._fun=this._image2;
					return;
				case 0x01 | 0x04 | 0x100:
					this._fun=this._image2;
					return;
				case 0x10:
					this._fun=Filter._filter;
					return;
				case 0x11111:
					this._fun=RenderSprite._initRenderFun;
					return;
				}
			this.onCreate(type);
		}

		__class(RenderSprite,'laya.renders.RenderSprite');
		var __proto=RenderSprite.prototype;
		__proto.onCreate=function(type){}
		__proto._style=function(sprite,context,x,y){
			sprite._style.render(sprite,context,x,y);
			var next=this._next;
			next._fun.call(next,sprite,context,x,y);
		}

		__proto._no=function(sprite,context,x,y){}
		__proto._custom=function(sprite,context,x,y){
			sprite.customRender(context,x,y);
			var tf=sprite._style._tf;
			this._next._fun.call(this._next,sprite,context,x-tf.translateX,y-tf.translateY);
		}

		__proto._clip=function(sprite,context,x,y){
			var next=this._next;
			if (next==RenderSprite.NORENDER)return;
			var r=sprite._style.scrollRect;
			context.ctx.save();
			context.ctx.clipRect(x,y,r.width,r.height);
			next._fun.call(next,sprite,context,x-r.x,y-r.y);
			context.ctx.restore();
		}

		__proto._blend=function(sprite,context,x,y){
			var style=sprite._style;
			if (style.blendMode){
				context.ctx.globalCompositeOperation=style.blendMode;
			};
			var next=this._next;
			next._fun.call(next,sprite,context,x,y);
			var mask=sprite.mask;
			if (mask){
				context.ctx.globalCompositeOperation="destination-in";
				if (mask.numChildren > 0 || !mask.graphics._isOnlyOne()){
					mask.cacheAsBitmap=true;
				}
				mask.render(context,x,y);
			}
			context.ctx.globalCompositeOperation="source-over";
		}

		__proto._graphics=function(sprite,context,x,y){
			var tf=sprite._style._tf;
			sprite._graphics && sprite._graphics._render(sprite,context,x-tf.translateX,y-tf.translateY);
			var next=this._next;
			next._fun.call(next,sprite,context,x,y);
		}

		__proto._image=function(sprite,context,x,y){
			var style=sprite._style;
			context.ctx.drawTexture2(x,y,style._tf.translateX,style._tf.translateY,sprite.transform,style.alpha,style.blendMode,sprite._graphics._one);
		}

		__proto._image2=function(sprite,context,x,y){
			var tf=sprite._style._tf;
			context.ctx.drawTexture2(x,y,tf.translateX,tf.translateY,sprite.transform,1,null,sprite._graphics._one);
		}

		__proto._alpha=function(sprite,context,x,y){
			var style=sprite._style;
			var alpha;
			if ((alpha=style.alpha)> 0.01){
				var temp=context.ctx.globalAlpha;
				context.ctx.globalAlpha *=alpha;
				var next=this._next;
				next._fun.call(next,sprite,context,x,y);
				context.ctx.globalAlpha=temp;
			}
		}

		__proto._transform=function(sprite,context,x,y){
			var transform=sprite.transform,_next=this._next;
			if (transform && _next !=RenderSprite.NORENDER){
				context.save();
				context.transform(transform.a,transform.b,transform.c,transform.d,transform.tx+x,transform.ty+y);
				_next._fun.call(_next,sprite,context,0,0);
				context.restore();
			}else
			_next._fun.call(_next,sprite,context,x,y);
		}

		__proto._childs=function(sprite,context,x,y){
			var style=sprite._style;
			x+=-style._tf.translateX+style.paddingLeft;
			y+=-style._tf.translateY+style.paddingTop;
			var words=sprite._getWords();
			words && context.fillWords(words,x,y,(style).font,(style).color);
			var childs=sprite._childs,n=childs.length,ele;
			if (!sprite.optimizeScrollRect || sprite.scrollRect==null){
				for (var i=0;i < n;++i)
				(ele=(childs [i])).visible && ele.render(context,x,y);
				}else {
				var rect=sprite.scrollRect;
				for (i=0;i < n;++i){
					ele=childs [i];
					if (ele.visible && (!ele.width || rect.intersects(Rectangle.TEMP.setTo(ele.x,ele.y,ele.width,ele.height))))
						ele.render(context,x,y);
				}
			}
		}

		__proto._canvas=function(sprite,context,x,y){
			var _cacheCanvas=sprite._$P.cacheCanvas;
			var _next=this._next;
			if (!_cacheCanvas){
				_next._fun.call(_next,sprite,tx,x,y);
				return;
			};
			var tx=_cacheCanvas.ctx;
			var _repaint=sprite._needRepaint()|| (!tx);
			var canvas;
			var left;
			var top;
			var tRec;
			_cacheCanvas.type==='bitmap' ? (Stat.canvasBitmap++):(Stat.canvasNormal++);
			if (_repaint){
				if (!_cacheCanvas._cacheRec)
					_cacheCanvas._cacheRec=new Rectangle();
				var w,h;
				tRec=sprite.getSelfBounds();
				if (Render.isWebGL && _cacheCanvas.type==='bitmap' && (tRec.width > 2048 || tRec.height > 2048)){
					console.log("cache bitmap size larger than 2048,cache ignored");
					_next._fun.call(_next,sprite,tx,x,y);
					return;
				}
				tRec.x-=sprite.pivotX;
				tRec.y-=sprite.pivotY;
				tRec.x-=10;
				tRec.y-=10;
				tRec.width+=20;
				tRec.height+=20;
				tRec.x=Math.floor(tRec.x+x)-x;
				tRec.y=Math.floor(tRec.y+y)-y;
				tRec.width=Math.floor(tRec.width);
				tRec.height=Math.floor(tRec.height);
				_cacheCanvas._cacheRec.copyFrom(tRec);
				tRec=_cacheCanvas._cacheRec;
				var scaleX=Render.isWebGL?1:Browser.pixelRatio *Laya.stage.clientScaleX;
				var scaleY=Render.isWebGL?1:Browser.pixelRatio *Laya.stage.clientScaleY;
				if (!Render.isWebGL){
					var chainScaleX=1;
					var chainScaleY=1;
					var tar;
					tar=sprite;
					while (tar && tar !=Laya.stage){
						chainScaleX *=tar.scaleX;
						chainScaleY *=tar.scaleY;
						tar=tar.parent;
					}
					if (chainScaleX > 1)scaleX *=chainScaleX;
					if (chainScaleY > 1)scaleY *=chainScaleY;
				}
				w=tRec.width *scaleX;
				h=tRec.height *scaleY;
				left=tRec.x;
				top=tRec.y;
				if (!tx){
					tx=_cacheCanvas.ctx=Pool.getItem("RenderContext")||new RenderContext(w,h,HTMLCanvas.create(/*laya.resource.HTMLCanvas.TYPEAUTO*/"AUTO"));
					tx.ctx.sprite=sprite;
				}
				canvas=tx.canvas;
				if (_cacheCanvas.type==='bitmap')canvas.context.asBitmap=true;
				canvas.clear();
				(canvas.width !=w || canvas.height !=h)&& canvas.size(w,h);
				var t;
				if (scaleX!=1||scaleY!=1){
					var ctx=(tx).ctx;
					ctx.save();
					ctx.scale(scaleX,scaleY);
					if (!Render.isConchWebGL&&Render.isConchApp){
						t=sprite._$P.cf;
						t&&ctx.setFilterMatrix&&ctx.setFilterMatrix(t._mat,t._alpha);
					}
					_next._fun.call(_next,sprite,tx,-left,-top);
					ctx.restore();
					if(!Render.isConchApp||Render.isConchWebGL)sprite._applyFilters();
					}else {
					ctx=(tx).ctx;
					if (!Render.isConchWebGL&&Render.isConchApp){
						t=sprite._$P.cf;
						t&&ctx.setFilterMatrix&&ctx.setFilterMatrix(t._mat,t._alpha);
					}
					_next._fun.call(_next,sprite,tx,-left,-top);
					if(!Render.isConchApp||Render.isConchWebGL)sprite._applyFilters();
				}
				if (sprite._$P.staticCache)_cacheCanvas.reCache=false;
				Stat.canvasReCache++;
				}else {
				tRec=_cacheCanvas._cacheRec;
				left=tRec.x;
				top=tRec.y;
				canvas=tx.canvas;
			}
			context.drawCanvas(canvas,x+left,y+top,tRec.width,tRec.height);
		}

		RenderSprite.__init__=function(){
			var i=0,len=0;
			var initRender;
			initRender=RunDriver.createRenderSprite(0x11111,null);
			len=RenderSprite.renders.length=0x800 *2;
			for (i=0;i < len;i++)
			RenderSprite.renders[i]=initRender;
			RenderSprite.renders[0]=RunDriver.createRenderSprite(0,null);
			function _initSame (value,o){
				var n=0;
				for (var i=0;i < value.length;i++){
					n |=value[i];
					RenderSprite.renders[n]=o;
				}
			}
			_initSame([0x01,0x100,0x04,0x02],new RenderSprite(0x01,null));
			RenderSprite.renders[0x01 | 0x100]=RunDriver.createRenderSprite(0x01 | 0x100,null);
			RenderSprite.renders[0x01 | 0x04 | 0x100]=new RenderSprite(0x01 | 0x04 | 0x100,null);
		}

		RenderSprite._initRenderFun=function(sprite,context,x,y){
			var type=sprite._renderType;
			var r=RenderSprite.renders[type]=RenderSprite._getTypeRender(type);
			r._fun(sprite,context,x,y);
		}

		RenderSprite._getTypeRender=function(type){
			var rst=null;
			var tType=0x800;
			while (tType > 1){
				if (tType & type)
					rst=RunDriver.createRenderSprite(tType,rst);
				tType=tType >> 1;
			}
			return rst;
		}

		RenderSprite.IMAGE=0x01;
		RenderSprite.ALPHA=0x02;
		RenderSprite.TRANSFORM=0x04;
		RenderSprite.CANVAS=0x08;
		RenderSprite.FILTERS=0x10;
		RenderSprite.BLEND=0x20;
		RenderSprite.CLIP=0x40;
		RenderSprite.STYLE=0x80;
		RenderSprite.GRAPHICS=0x100;
		RenderSprite.CUSTOM=0x200;
		RenderSprite.CHILDS=0x800;
		RenderSprite.INIT=0x11111;
		RenderSprite.renders=[];
		RenderSprite.NORENDER=new RenderSprite(0,null);
		return RenderSprite;
	})()


	/**
	*@private
	*Context扩展类
	*/
	//class laya.resource.Context
	var Context=(function(){
		function Context(){
			//this._canvas=null;
			this._repaint=false;
		}

		__class(Context,'laya.resource.Context');
		var __proto=Context.prototype;
		__proto.setIsMainContext=function(){}
		/***@private */
		__proto.drawCanvas=function(canvas,x,y,width,height){
			Stat.drawCall++;
			this.drawImage(canvas.source,x,y,width,height);
		}

		/***@private */
		__proto.fillRect=function(x,y,width,height,style){
			Stat.drawCall++;
			style && (this.fillStyle=style);
			/*__JS__ */this.__fillRect(x,y,width,height);
		}

		/***@private */
		__proto.fillText=function(text,x,y,font,color,textAlign){
			Stat.drawCall++;
			if (arguments.length > 3 && font !=null){
				this.font=font;
				this.fillStyle=color;
				/*__JS__ */this.textAlign=textAlign;
				this.textBaseline="top";
			}
			/*__JS__ */this.__fillText(text,x,y);
		}

		/***@private */
		__proto.fillBorderText=function(text,x,y,font,fillColor,borderColor,lineWidth,textAlign){
			Stat.drawCall++;
			this.font=font;
			this.fillStyle=fillColor;
			this.textBaseline="top";
			/*__JS__ */this.strokeStyle=borderColor;
			/*__JS__ */this.lineWidth=lineWidth;
			/*__JS__ */this.textAlign=textAlign;
			/*__JS__ */this.__strokeText(text,x,y);
			/*__JS__ */this.__fillText(text,x,y);
		}

		/***@private */
		__proto.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
			Stat.drawCall++;
			if (arguments.length > 3 && font !=null){
				this.font=font;
				/*__JS__ */this.strokeStyle=color;
				/*__JS__ */this.lineWidth=lineWidth;
				/*__JS__ */this.textAlign=textAlign;
				this.textBaseline="top";
			}
			/*__JS__ */this.__strokeText(text,x,y);
		}

		/***@private */
		__proto.transformByMatrix=function(value){
			this.transform(value.a,value.b,value.c,value.d,value.tx,value.ty);
		}

		/***@private */
		__proto.setTransformByMatrix=function(value){
			this.setTransform(value.a,value.b,value.c,value.d,value.tx,value.ty);
		}

		/***@private */
		__proto.clipRect=function(x,y,width,height){
			Stat.drawCall++;
			this.beginPath();
			this.rect(x,y,width,height);
			this.clip();
		}

		/***@private */
		__proto.drawTexture=function(tex,x,y,width,height,tx,ty){
			Stat.drawCall++;
			var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
			this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x+tx,y+ty,width,height);
		}

		/***@private */
		__proto.drawTextureWithTransform=function(tex,x,y,width,height,m,tx,ty){
			Stat.drawCall++;
			var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
			this.save();
			this.transform(m.a,m.b,m.c,m.d,m.tx+tx,m.ty+ty);
			this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x ,y,width,height);
			this.restore();
		}

		/***@private */
		__proto.drawTexture2=function(x,y,pivotX,pivotY,m,alpha,blendMode,args2){
			'use strict';
			var tex=args2[0];
			if (!(tex.loaded && tex.bitmap && tex.source)){
				return;
			}
			Stat.drawCall++;
			var alphaChanged=alpha!==1;
			if (alphaChanged){
				var temp=this.globalAlpha;
				this.globalAlpha *=alpha;
			};
			var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
			if (m){
				this.save();
				this.transform(m.a,m.b,m.c,m.d,m.tx+x,m.ty+y);
				this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,args2[1]-pivotX ,args2[2]-pivotY,args2[3],args2[4]);
				this.restore();
				}else {
				this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,args2[1]-pivotX+x ,args2[2]-pivotY+y,args2[3],args2[4]);
			}
			if (alphaChanged)this.globalAlpha=temp;
		}

		/***@private */
		__proto.flush=function(){
			return 0;
		}

		/***@private */
		__proto.fillWords=function(words,x,y,font,color){
			font && (this.font=font);
			color && (this.fillStyle=color);
			var _this=this;
			this.textBaseline="top";
			/*__JS__ */this.textAlign='left';
			for (var i=0,n=words.length;i < n;i++){
				var a=words[i];
				/*__JS__ */this.__fillText(a.char,a.x+x,a.y+y);
			}
		}

		/***@private */
		__proto.destroy=function(){
			/*__JS__ */this.canvas.width=this.canvas.height=0;
		}

		/***@private */
		__proto.clear=function(){
			this.clearRect(0,0,this._canvas.width,this._canvas.height);
			this._repaint=false;
		}

		Context.__init__=function(to){
			var from=laya.resource.Context.prototype;
			to=to || /*__JS__ */CanvasRenderingContext2D.prototype;
			to.__fillText=to.fillText;
			to.__fillRect=to.fillRect;
			to.__strokeText=to.strokeText;
			var funs=['fillWords','setIsMainContext','fillRect','strokeText','fillText','transformByMatrix','setTransformByMatrix','clipRect','drawTexture','drawTexture2','drawTextureWithTransform','flush','clear','destroy','drawCanvas','fillBorderText'];
			funs.forEach(function(i){
				to[i]=from[i] || to[i];
			});
		}

		Context._default=new Context();
		return Context;
	})()


	/**
	*<code>ResourceManager</code> 是资源管理类。它用于资源的载入、获取、销毁。
	*/
	//class laya.resource.ResourceManager
	var ResourceManager=(function(){
		function ResourceManager(){
			this._id=0;
			this._name=null;
			this._resources=null;
			this._memorySize=0;
			this._garbageCollectionRate=NaN;
			this._isOverflow=false;
			this.autoRelease=false;
			this.autoReleaseMaxSize=0;
			this._id=++ResourceManager._uniqueIDCounter;
			this._name="Content Manager";
			ResourceManager._isResourceManagersSorted=false;
			this._memorySize=0;
			this._isOverflow=false;
			this.autoRelease=false;
			this.autoReleaseMaxSize=1024 *1024 *512;
			this._garbageCollectionRate=0.2;
			ResourceManager._resourceManagers.push(this);
			this._resources=[];
		}

		__class(ResourceManager,'laya.resource.ResourceManager');
		var __proto=ResourceManager.prototype;
		Laya.imps(__proto,{"laya.resource.IDispose":true})
		/**
		*获取指定索引的资源 Resource 对象。
		*@param 索引。
		*@return 资源 Resource 对象。
		*/
		__proto.getResourceByIndex=function(index){
			return this._resources[index];
		}

		/**
		*获取此管理器所管理的资源个数。
		*@return 资源个数。
		*/
		__proto.getResourcesLength=function(){
			return this._resources.length;
		}

		/**
		*添加指定资源。
		*@param resource 需要添加的资源 Resource 对象。
		*@return 是否添加成功。
		*/
		__proto.addResource=function(resource){
			if (resource.resourceManager)
				resource.resourceManager.removeResource(resource);
			var index=this._resources.indexOf(resource);
			if (index===-1){
				resource._resourceManager=this;
				this._resources.push(resource);
				this.addSize(resource.memorySize);
				return true;
			}
			return false;
		}

		/**
		*移除指定资源。
		*@param resource 需要移除的资源 Resource 对象
		*@return 是否移除成功。
		*/
		__proto.removeResource=function(resource){
			var index=this._resources.indexOf(resource);
			if (index!==-1){
				this._resources.splice(index,1);
				resource._resourceManager=null;
				this._memorySize-=resource.memorySize;
				return true;
			}
			return false;
		}

		/**
		*卸载此资源管理器载入的资源。
		*/
		__proto.unload=function(){
			var tempResources=this._resources.slice(0,this._resources.length);
			for (var i=0;i < tempResources.length;i++){
				var resource=tempResources[i];
				resource.dispose();
			}
			tempResources.length=0;
		}

		/**
		*设置唯一名字。
		*@param newName 名字，如果名字重复则自动加上“-copy”。
		*/
		__proto.setUniqueName=function(newName){
			var isUnique=true;
			for (var i=0;i < ResourceManager._resourceManagers.length;i++){
				if (ResourceManager._resourceManagers[i]._name!==newName || ResourceManager._resourceManagers[i]===this)
					continue ;
				isUnique=false;
				return;
			}
			if (isUnique){
				if (this.name !=newName){
					this.name=newName;
					ResourceManager._isResourceManagersSorted=false;
				}
				}else{
				this.setUniqueName(newName.concat("-copy"));
			}
		}

		/**释放资源。*/
		__proto.dispose=function(){
			if (this===ResourceManager._systemResourceManager)
				throw new Error("systemResourceManager不能被释放！");
			ResourceManager._resourceManagers.splice(ResourceManager._resourceManagers.indexOf(this),1);
			ResourceManager._isResourceManagersSorted=false;
			var tempResources=this._resources.slice(0,this._resources.length);
			for (var i=0;i < tempResources.length;i++){
				var resource=tempResources[i];
				resource.resourceManager.removeResource(resource);
				resource.dispose();
			}
			tempResources.length=0;
		}

		/**
		*增加内存。
		*@param add 需要增加的内存大小。
		*/
		__proto.addSize=function(add){
			if (add){
				if (this.autoRelease && add > 0)
					((this._memorySize+add)> this.autoReleaseMaxSize)&& (this.garbageCollection((1-this._garbageCollectionRate)*this.autoReleaseMaxSize));
				this._memorySize+=add;
			}
		}

		/**
		*垃圾回收。
		*@param reserveSize 保留尺寸。
		*/
		__proto.garbageCollection=function(reserveSize){
			var all=this._resources;
			all=all.slice();
			all.sort(function(a,b){
				if (!a || !b)
					throw new Error("a或b不能为空！");
				if (a.released && b.released)
					return 0;
				else if (a.released)
				return 1;
				else if (b.released)
				return-1;
				return a.lastUseFrameCount-b.lastUseFrameCount;
			});
			var currentFrameCount=Stat.loopCount;
			for (var i=0,n=all.length;i < n;i++){
				var resou=all[i];
				if (currentFrameCount-resou.lastUseFrameCount > 1){
					resou.releaseResource();
					}else {
					if (this._memorySize >=reserveSize)
						this._isOverflow=true;
					return;
				}
				if (this._memorySize < reserveSize){
					this._isOverflow=false;
					return;
				}
			}
		}

		/**
		*唯一标识 ID 。
		*/
		__getset(0,__proto,'id',function(){
			return this._id;
		});

		/**
		*名字。
		*/
		__getset(0,__proto,'name',function(){
			return this._name;
			},function(value){
			if ((value || value!=="")&& this._name!==value){
				this._name=value;
				ResourceManager._isResourceManagersSorted=false;
			}
		});

		/**
		*此管理器所管理资源的累计内存，以字节为单位。
		*/
		__getset(0,__proto,'memorySize',function(){
			return this._memorySize;
		});

		/**
		*系统资源管理器。
		*/
		__getset(1,ResourceManager,'systemResourceManager',function(){
			(ResourceManager._systemResourceManager===null)&& (ResourceManager._systemResourceManager=new ResourceManager(),ResourceManager._systemResourceManager._name="System Resource Manager");
			return ResourceManager._systemResourceManager;
		});

		/**
		*排序后的资源管理器列表。
		*/
		__getset(1,ResourceManager,'sortedResourceManagersByName',function(){
			if (!ResourceManager._isResourceManagersSorted){
				ResourceManager._isResourceManagersSorted=true;
				ResourceManager._resourceManagers.sort(ResourceManager.compareResourceManagersByName);
			}
			return ResourceManager._resourceManagers;
		});

		ResourceManager.__init__=function(){
			ResourceManager.currentResourceManager=ResourceManager.systemResourceManager;
		}

		ResourceManager.getLoadedResourceManagerByIndex=function(index){
			return ResourceManager._resourceManagers[index];
		}

		ResourceManager.getLoadedResourceManagersCount=function(){
			return ResourceManager._resourceManagers.length;
		}

		ResourceManager.recreateContentManagers=function(force){
			(force===void 0)&& (force=false);
			var temp=ResourceManager.currentResourceManager;
			for (var i=0;i < ResourceManager._resourceManagers.length;i++){
				ResourceManager.currentResourceManager=ResourceManager._resourceManagers[i];
				for (var j=0;j < ResourceManager.currentResourceManager._resources.length;j++){
					ResourceManager.currentResourceManager._resources[j].releaseResource(force);
					ResourceManager.currentResourceManager._resources[j].activeResource(force);
				}
			}
			ResourceManager.currentResourceManager=temp;
		}

		ResourceManager.releaseContentManagers=function(force){
			(force===void 0)&& (force=false);
			var temp=ResourceManager.currentResourceManager;
			for (var i=0;i < ResourceManager._resourceManagers.length;i++){
				ResourceManager.currentResourceManager=ResourceManager._resourceManagers[i];
				for (var j=0;j < ResourceManager.currentResourceManager._resources.length;j++){
					var resource=ResourceManager.currentResourceManager._resources[j];
					(!resource.released)&& (resource.releaseResource(force));
				}
			}
			ResourceManager.currentResourceManager=temp;
		}

		ResourceManager.compareResourceManagersByName=function(left,right){
			if (left==right)
				return 0;
			var x=left._name;
			var y=right._name;
			if (x==null){
				if (y==null)
					return 0;
				else
				return-1;
				}else {
				if (y==null)
					return 1;
				else {
					var retval=x.localeCompare(y);
					if (retval !=0)
						return retval;
					else {
						right.setUniqueName(y);
						y=right._name;
						return x.localeCompare(y);
					}
				}
			}
		}

		ResourceManager._uniqueIDCounter=0;
		ResourceManager._systemResourceManager=null
		ResourceManager._isResourceManagersSorted=false;
		ResourceManager._resourceManagers=[];
		ResourceManager.currentResourceManager=null
		return ResourceManager;
	})()


	/**
	*@private
	*/
	//class laya.resource.WXCanvas
	var WXCanvas=(function(){
		function WXCanvas(id){
			this._ctx=null;
			this._id=null;
			this.style={};
			this._id=id;
		}

		__class(WXCanvas,'laya.resource.WXCanvas');
		var __proto=WXCanvas.prototype;
		__proto.getContext=function(){
			var wx=laya.resource.WXCanvas.wx;
			var ctx=wx.createContext();
			ctx.id=this._id;
			ctx.fillRect=function (x,y,w,h){
				this.rect(x,y,w,h);
				this.fill();
			}
			ctx.strokeRect=function (x,y,w,h){
				this.rect(x,y,w,h);
				this.stroke();
			}
			ctx.___drawImage=ctx.drawImage;
			ctx.drawImage=function (){
				var img=arguments[0].tempFilePath;
				if (img==null)return;
				switch(arguments.length){
					case 3:
						this.___drawImage(img,arguments[1],arguments[2],arguments[0].width,arguments[0].height);
						return;
					case 5:
						this.___drawImage(img,arguments[1],arguments[2],arguments[3],arguments[4]);
						return;
					case 9:
						this.___drawImage(img,arguments[5],arguments[6],arguments[7],arguments[8]);
						return;
					}
			}
			Object.defineProperty(ctx,"strokeStyle",{set:function (value){this.setStrokeStyle(value)},enumerable:false });
			Object.defineProperty(ctx,"fillStyle",{set:function (value){this.setFillStyle(value)},enumerable:false });
			Object.defineProperty(ctx,"fontSize",{set:function (value){this.setFontSize(value)},enumerable:false });
			Object.defineProperty(ctx,"lineWidth",{set:function (value){this.setLineWidth(value)},enumerable:false });
			Context.__init__(ctx);
			ctx.flush=function (){
				wx.drawCanvas({canvasId:this.id,actions:this.getActions()});
			}
			return ctx;
		}

		__proto.oncontextmenu=function(e){}
		__proto.addEventListener=function(){}
		__getset(0,__proto,'id',function(){
			return this._id;
			},function(value){
			this._id=value;
		});

		WXCanvas.wx=null;
		return WXCanvas;
	})()


	/**
	*@private
	*/
	//class laya.system.System
	var System=(function(){
		function System(){};
		__class(System,'laya.system.System');
		System.changeDefinition=function(name,classObj){
			Laya[name]=classObj;
			var str=name+"=classObj";
			/*__JS__ */eval(str);
		}

		System.__init__=function(){
			if (Render.isConchApp){
				/*__JS__ */conch.disableConchResManager();
				/*__JS__ */conch.disableConchAutoRestoreLostedDevice();
			}
		}

		return System;
	})()


	SoundManager;
	/**
	*<code>Browser</code> 是浏览器代理类。封装浏览器及原生 js 提供的一些功能。
	*/
	//class laya.utils.Browser
	var Browser=(function(){
		function Browser(){};
		__class(Browser,'laya.utils.Browser');
		/**设备像素比。*/
		__getset(1,Browser,'pixelRatio',function(){
			Browser.__init__();
			return RunDriver.getPixelRatio();
		});

		/**浏览器物理高度。*/
		__getset(1,Browser,'height',function(){
			Browser.__init__();
			return ((Laya.stage && Laya.stage.canvasRotation)? Browser.clientWidth :Browser.clientHeight)*Browser.pixelRatio;
		});

		/**浏览器可视宽度。*/
		__getset(1,Browser,'clientWidth',function(){
			Browser.__init__();
			return Browser.window.innerWidth || Browser.document.body.clientWidth;
		});

		/**浏览器原生 window 对象的引用。*/
		__getset(1,Browser,'window',function(){
			Browser.__init__();
			return Browser._window;
		});

		/**浏览器可视高度。*/
		__getset(1,Browser,'clientHeight',function(){
			Browser.__init__();
			return Browser.window.innerHeight || Browser.document.body.clientHeight || Browser.document.documentElement.clientHeight;
		});

		/**浏览器物理宽度，。*/
		__getset(1,Browser,'width',function(){
			Browser.__init__();
			return ((Laya.stage && Laya.stage.canvasRotation)? Browser.clientHeight :Browser.clientWidth)*Browser.pixelRatio;
		});

		/**画布容器，用来盛放画布的容器。方便对画布进行控制*/
		__getset(1,Browser,'container',function(){
			Browser.__init__();
			if (!Browser._container){
				Browser._container=Browser.createElement("div");
				Browser._container.id="layaContainer";
				Browser._container.style.cssText="width:100%;height:100%";
				Browser.document.body.appendChild(Browser._container);
			}
			return Browser._container;
			},function(value){
			Browser._container=value;
		});

		/**浏览器原生 document 对象的引用。*/
		__getset(1,Browser,'document',function(){
			Browser.__init__();
			return Browser._document;
		});

		Browser.__init__=function(){
			SoundManager;
			if (Browser._window)return;
			Browser._window=RunDriver.getWindow();
			Browser._document=Browser.window.document;
			/*__JS__ */Browser.document.__createElement=Browser.document.createElement;
			/*__JS__ */window.requestAnimationFrame=(function(){return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||function (c){return window.setTimeout(c,1000 / 60);};})();
			/*__JS__ */var $BS=window.document.body.style;$BS.margin=0;$BS.overflow='hidden';;
			/*__JS__ */var metas=window.document.getElementsByTagName('meta');;
			/*__JS__ */var i=0,flag=false,content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no';;
			/*__JS__ */while(i<metas.length){var meta=metas[i];if(meta.name=='viewport'){meta.content=content;flag=true;break;}i++;};
			/*__JS__ */if(!flag){meta=document.createElement('meta');meta.name='viewport',meta.content=content;document.getElementsByTagName('head')[0].appendChild(meta);};
			Browser.userAgent=/*[SAFE]*/ Browser.window.navigator.userAgent;
			Browser.u=/*[SAFE]*/ Browser.userAgent;
			Browser.onIOS=/*[SAFE]*/ !!Browser.u.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/);
			Browser.onMobile=/*[SAFE]*/ Browser.u.indexOf("Mobile")>-1;
			Browser.onIPhone=/*[SAFE]*/ Browser.u.indexOf("iPhone")>-1;
			Browser.onIPad=/*[SAFE]*/ Browser.u.indexOf("iPad")>-1;
			Browser.onAndriod=/*[SAFE]*/ Browser.u.indexOf('Android')>-1 || Browser.u.indexOf('Adr')>-1;
			Browser.onWP=/*[SAFE]*/ Browser.u.indexOf("Windows Phone")>-1;
			Browser.onQQBrowser=/*[SAFE]*/ Browser.u.indexOf("QQBrowser")>-1;
			Browser.onMQQBrowser=/*[SAFE]*/ Browser.u.indexOf("MQQBrowser")>-1;
			Browser.onWeiXin=/*[SAFE]*/ Browser.u.indexOf('MicroMessenger')>-1;
			Browser.onPC=/*[SAFE]*/ !Browser.onMobile;
			Browser.onSafari=/*[SAFE]*/ !!Browser.u.match(/Version\/\d\.\d\x20Mobile\/\S+\x20Safari/);
			Browser.httpProtocol=/*[SAFE]*/ Browser.window.location.protocol=="http:";
			Browser.webAudioEnabled=/*[SAFE]*/ Browser.window["AudioContext"] || Browser.window["webkitAudioContext"] || Browser.window["mozAudioContext"] ? true :false;
			Browser.soundType=/*[SAFE]*/ Browser.webAudioEnabled ? "WEBAUDIOSOUND" :"AUDIOSOUND";
			/*__JS__ */Sound=Browser.webAudioEnabled?WebAudioSound:AudioSound;;
			/*__JS__ */if (Browser.webAudioEnabled)WebAudioSound.initWebAudio();;
			/*__JS__ */Browser.enableTouch=(('ontouchstart' in window)|| window.DocumentTouch && document instanceof DocumentTouch);
			/*__JS__ */window.focus();
			/*__JS__ */SoundManager._soundClass=Sound;;
			var MainCanvas=null;
			if (Browser.window.MainCanvasID){
				var _wx=/*__JS__ */wx;
				if (_wx && !_wx.createContext)_wx=null;
				if ((WXCanvas.wx=_wx)!=null){
					MainCanvas=new WXCanvas(Browser.window.MainCanvasID);
					var from=Context.prototype;
					from.flush=null;
					Browser.window.Image=function (){
						this.setSrc=function (url){
							this.__src=url;
							var _this=this;
							this.success();
						}
						this.success=function (res){
							this.width=200;
							this.height=200;
							this.tempFilePath=res ? res.tempFilePath :this.__src;
							this.onload && this.onload();
						}
						this.getSrc=function (){
							return this.__src;
						}
						Object.defineProperty(this,"src",{get:this.getSrc,set:this.setSrc,enumerable:false });
					}
					}else {
					MainCanvas=Browser.document.getElementById(Browser.window.MainCanvasID);
				}
			}
			Render._mainCanvas=Render._mainCanvas || HTMLCanvas.create('2D',MainCanvas);
			if (Browser.canvas)return;
			Browser.canvas=HTMLCanvas.create('2D');
			Browser.context=Browser.canvas.getContext('2d');
		}

		Browser.createElement=function(type){
			Browser.__init__();
			return Browser.document.__createElement(type);
		}

		Browser.getElementById=function(type){
			Browser.__init__();
			return Browser.document.getElementById(type);
		}

		Browser.removeElement=function(ele){
			if (ele && ele.parentNode)ele.parentNode.removeChild(ele);
		}

		Browser.now=function(){
			return RunDriver.now();
		}

		Browser._window=null
		Browser._document=null
		Browser._container=null
		Browser.userAgent=null
		Browser.u=null
		Browser.onIOS=false;
		Browser.onMobile=false;
		Browser.onIPhone=false;
		Browser.onIPad=false;
		Browser.onAndriod=false;
		Browser.onWP=false;
		Browser.onQQBrowser=false;
		Browser.onMQQBrowser=false;
		Browser.onSafari=false;
		Browser.onWeiXin=false;
		Browser.onPC=false;
		Browser.httpProtocol=false;
		Browser.webAudioEnabled=false;
		Browser.soundType=null
		Browser.enableTouch=false;
		Browser.canvas=null
		Browser.context=null
		Browser.__init$=function(){
			AudioSound;
			WebAudioSound;
		}

		return Browser;
	})()


	/**
	*
	*<code>Byte</code> 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
	*/
	//class laya.utils.Byte
	var Byte=(function(){
		function Byte(data){
			this._xd_=true;
			this._allocated_=8;
			//this._d_=null;
			//this._u8d_=null;
			this._pos_=0;
			this._length=0;
			if (data){
				this._u8d_=new Uint8Array(data);
				this._d_=new DataView(this._u8d_.buffer);
				this._length=this._d_.byteLength;
				}else {
				this.___resizeBuffer(this._allocated_);
			}
		}

		__class(Byte,'laya.utils.Byte');
		var __proto=Byte.prototype;
		/**@private */
		__proto.___resizeBuffer=function(len){
			try {
				var newByteView=new Uint8Array(len);
				if (this._u8d_ !=null){
					if (this._u8d_.length <=len)newByteView.set(this._u8d_);
					else newByteView.set(this._u8d_.subarray(0,len));
				}
				this._u8d_=newByteView;
				this._d_=new DataView(newByteView.buffer);
				}catch (err){
				throw "___resizeBuffer err:"+len;
			}
		}

		/**
		*读取字符型值。
		*@return
		*/
		__proto.getString=function(){
			return this.rUTF(this.getUint16());
		}

		/**
		*从指定的位置读取指定长度的数据用于创建一个 Float32Array 对象并返回此对象。
		*@param start 开始位置。
		*@param len 需要读取的字节长度。
		*@return 读出的 Float32Array 对象。
		*/
		__proto.getFloat32Array=function(start,len){
			var v=new Float32Array(this._d_.buffer.slice(start,start+len));
			this._pos_+=len;
			return v;
		}

		/**
		*从指定的位置读取指定长度的数据用于创建一个 Uint8Array 对象并返回此对象。
		*@param start 开始位置。
		*@param len 需要读取的字节长度。
		*@return 读出的 Uint8Array 对象。
		*/
		__proto.getUint8Array=function(start,len){
			var v=new Uint8Array(this._d_.buffer.slice(start,start+len));
			this._pos_+=len;
			return v;
		}

		/**
		*从指定的位置读取指定长度的数据用于创建一个 Int16Array 对象并返回此对象。
		*@param start 开始位置。
		*@param len 需要读取的字节长度。
		*@return 读出的 Uint8Array 对象。
		*/
		__proto.getInt16Array=function(start,len){
			var v=new Int16Array(this._d_.buffer.slice(start,start+len));
			this._pos_+=len;
			return v;
		}

		/**
		*在指定字节偏移量位置处读取 Float32 值。
		*@return Float32 值。
		*/
		__proto.getFloat32=function(){
			var v=this._d_.getFloat32(this._pos_,this._xd_);
			this._pos_+=4;
			return v;
		}

		/**
		*在当前字节偏移量位置处写入 Float32 值。
		*@param value 需要写入的 Float32 值。
		*/
		__proto.writeFloat32=function(value){
			this.ensureWrite(this._pos_+4);
			this._d_.setFloat32(this._pos_,value,this._xd_);
			this._pos_+=4;
		}

		/**
		*在当前字节偏移量位置处读取 Int32 值。
		*@return Int32 值。
		*/
		__proto.getInt32=function(){
			var float=this._d_.getInt32(this._pos_,this._xd_);
			this._pos_+=4;
			return float;
		}

		/**
		*在当前字节偏移量位置处读取 Uint32 值。
		*@return Uint32 值。
		*/
		__proto.getUint32=function(){
			var v=this._d_.getUint32(this._pos_,this._xd_);
			this._pos_+=4;
			return v;
		}

		/**
		*在当前字节偏移量位置处写入 Int32 值。
		*@param value 需要写入的 Int32 值。
		*/
		__proto.writeInt32=function(value){
			this.ensureWrite(this._pos_+4);
			this._d_.setInt32(this._pos_,value,this._xd_);
			this._pos_+=4;
		}

		/**
		*在当前字节偏移量位置处写入 Uint32 值。
		*@param value 需要写入的 Uint32 值。
		*/
		__proto.writeUint32=function(value){
			this.ensureWrite(this._pos_+4);
			this._d_.setUint32(this._pos_,value,this._xd_);
			this._pos_+=4;
		}

		/**
		*在当前字节偏移量位置处读取 Int16 值。
		*@return Int16 值。
		*/
		__proto.getInt16=function(){
			var us=this._d_.getInt16(this._pos_,this._xd_);
			this._pos_+=2;
			return us;
		}

		/**
		*在当前字节偏移量位置处读取 Uint16 值。
		*@return Uint16 值。
		*/
		__proto.getUint16=function(){
			var us=this._d_.getUint16(this._pos_,this._xd_);
			this._pos_+=2;
			return us;
		}

		/**
		*在当前字节偏移量位置处写入 Uint16 值。
		*@param value 需要写入的Uint16 值。
		*/
		__proto.writeUint16=function(value){
			this.ensureWrite(this._pos_+2);
			this._d_.setUint16(this._pos_,value,this._xd_);
			this._pos_+=2;
		}

		/**
		*在当前字节偏移量位置处写入 Int16 值。
		*@param value 需要写入的 Int16 值。
		*/
		__proto.writeInt16=function(value){
			this.ensureWrite(this._pos_+2);
			this._d_.setInt16(this._pos_,value,this._xd_);
			this._pos_+=2;
		}

		/**
		*在当前字节偏移量位置处读取 Uint8 值。
		*@return Uint8 值。
		*/
		__proto.getUint8=function(){
			return this._d_.getUint8(this._pos_++);
		}

		/**
		*在当前字节偏移量位置处写入 Uint8 值。
		*@param value 需要写入的 Uint8 值。
		*/
		__proto.writeUint8=function(value){
			this.ensureWrite(this._pos_+1);
			this._d_.setUint8(this._pos_,value,this._xd_);
			this._pos_++;
		}

		/**
		*@private
		*在指定位置处读取 Uint8 值。
		*@param pos 字节读取位置。
		*@return Uint8 值。
		*/
		__proto._getUInt8=function(pos){
			return this._d_.getUint8(pos);
		}

		/**
		*@private
		*在指定位置处读取 Uint16 值。
		*@param pos 字节读取位置。
		*@return Uint16 值。
		*/
		__proto._getUint16=function(pos){
			return this._d_.getUint16(pos,this._xd_);
		}

		/**
		*@private
		*使用 getFloat32()读取6个值，用于创建并返回一个 Matrix 对象。
		*@return Matrix 对象。
		*/
		__proto._getMatrix=function(){
			var rst=new Matrix(this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32());
			return rst;
		}

		/**
		*@private
		*读取指定长度的 UTF 型字符串。
		*@param len 需要读取的长度。
		*@return 读出的字符串。
		*/
		__proto.rUTF=function(len){
			var v="",max=this._pos_+len,c=0,c2=0,c3=0,f=String.fromCharCode;
			var u=this._u8d_,i=0;
			while (this._pos_ < max){
				c=u[this._pos_++];
				if (c < 0x80){
					if (c !=0){
						v+=f(c);
					}
					}else if (c < 0xE0){
					v+=f(((c & 0x3F)<< 6)| (u[this._pos_++] & 0x7F));
					}else if (c < 0xF0){
					c2=u[this._pos_++];
					v+=f(((c & 0x1F)<< 12)| ((c2 & 0x7F)<< 6)| (u[this._pos_++] & 0x7F));
					}else {
					c2=u[this._pos_++];
					c3=u[this._pos_++];
					v+=f(((c & 0x0F)<< 18)| ((c2 & 0x7F)<< 12)| ((c3 << 6)& 0x7F)| (u[this._pos_++] & 0x7F));
				}
				i++;
			}
			return v;
		}

		/**
		*字符串读取。
		*@param len
		*@return
		*/
		__proto.getCustomString=function(len){
			var v="",ulen=0,c=0,c2=0,f=String.fromCharCode;
			var u=this._u8d_,i=0;
			while (len > 0){
				c=u[this._pos_];
				if (c < 0x80){
					v+=f(c);
					this._pos_++;
					len--;
					}else {
					ulen=c-0x80;
					this._pos_++;
					len-=ulen;
					while (ulen > 0){
						c=u[this._pos_++];
						c2=u[this._pos_++];
						v+=f((c2 << 8)| c);
						ulen--;
					}
				}
			}
			return v;
		}

		/**
		*清除数据。
		*/
		__proto.clear=function(){
			this._pos_=0;
			this.length=0;
		}

		/**
		*@private
		*获取此对象的 ArrayBuffer 引用。
		*@return
		*/
		__proto.__getBuffer=function(){
			return this._d_.buffer;
		}

		/**
		*写入字符串，该方法写的字符串要使用 readUTFBytes 方法读取。
		*@param value 要写入的字符串。
		*/
		__proto.writeUTFBytes=function(value){
			value=value+"";
			for (var i=0,sz=value.length;i < sz;i++){
				var c=value.charCodeAt(i);
				if (c <=0x7F){
					this.writeByte(c);
					}else if (c <=0x7FF){
					this.writeByte(0xC0 | (c >> 6));
					this.writeByte(0x80 | (c & 63));
					}else if (c <=0xFFFF){
					this.writeByte(0xE0 | (c >> 12));
					this.writeByte(0x80 | ((c >> 6)& 63));
					this.writeByte(0x80 | (c & 63));
					}else {
					this.writeByte(0xF0 | (c >> 18));
					this.writeByte(0x80 | ((c >> 12)& 63));
					this.writeByte(0x80 | ((c >> 6)& 63));
					this.writeByte(0x80 | (c & 63));
				}
			}
		}

		/**
		*将 UTF-8 字符串写入字节流。
		*@param value 要写入的字符串值。
		*/
		__proto.writeUTFString=function(value){
			var tPos=0;
			tPos=this.pos;
			this.writeUint16(1);
			this.writeUTFBytes(value);
			var dPos=0;
			dPos=this.pos-tPos-2;
			this._d_.setUint16(tPos,dPos,this._xd_);
		}

		/**
		*@private
		*读取 UTF-8 字符串。
		*@return 读出的字符串。
		*/
		__proto.readUTFString=function(){
			var tPos=0;
			tPos=this.pos;
			var len=0;
			len=this.getUint16();
			return this.readUTFBytes(len);
		}

		/**
		*读取 UTF-8 字符串。
		*@return 读出的字符串。
		*/
		__proto.getUTFString=function(){
			return this.readUTFString();
		}

		/**
		*@private
		*读字符串，必须是 writeUTFBytes 方法写入的字符串。
		*@param len 要读的buffer长度,默认将读取缓冲区全部数据。
		*@return 读取的字符串。
		*/
		__proto.readUTFBytes=function(len){
			(len===void 0)&& (len=-1);
			if(len==0)return "";
			len=len > 0 ? len :this.bytesAvailable;
			return this.rUTF(len);
		}

		/**
		*读字符串，必须是 writeUTFBytes 方法写入的字符串。
		*@param len 要读的buffer长度,默认将读取缓冲区全部数据。
		*@return 读取的字符串。
		*/
		__proto.getUTFBytes=function(len){
			(len===void 0)&& (len=-1);
			return this.readUTFBytes(len);
		}

		/**
		*在字节流中写入一个字节。
		*@param value
		*/
		__proto.writeByte=function(value){
			this.ensureWrite(this._pos_+1);
			this._d_.setInt8(this._pos_,value);
			this._pos_+=1;
		}

		/**
		*@private
		*在字节流中读一个字节。
		*/
		__proto.readByte=function(){
			return this._d_.getInt8(this._pos_++);
		}

		/**
		*在字节流中读一个字节。
		*/
		__proto.getByte=function(){
			return this.readByte();
		}

		/**
		*指定该字节流的长度。
		*@param lengthToEnsure 指定的长度。
		*/
		__proto.ensureWrite=function(lengthToEnsure){
			if (this._length < lengthToEnsure)this._length=lengthToEnsure;
			if (this._allocated_ < lengthToEnsure)this.length=lengthToEnsure;
		}

		/**
		*写入指定的 Arraybuffer 对象。
		*@param arraybuffer 需要写入的 Arraybuffer 对象。
		*@param offset 偏移量（以字节为单位）
		*@param length 长度（以字节为单位）
		*/
		__proto.writeArrayBuffer=function(arraybuffer,offset,length){
			(offset===void 0)&& (offset=0);
			(length===void 0)&& (length=0);
			if (offset < 0 || length < 0)throw "writeArrayBuffer error - Out of bounds";
			if (length==0)length=arraybuffer.byteLength-offset;
			this.ensureWrite(this._pos_+length);
			var uint8array=new Uint8Array(arraybuffer);
			this._u8d_.set(uint8array.subarray(offset,offset+length),this._pos_);
			this._pos_+=length;
		}

		/**
		*获取此对象的 ArrayBuffer数据,数据只包含有效数据部分 。
		*/
		__getset(0,__proto,'buffer',function(){
			var rstBuffer=this._d_.buffer;
			if (rstBuffer.byteLength==this.length)return rstBuffer;
			return rstBuffer.slice(0,this.length);
		});

		/**
		*字节顺序。
		*/
		__getset(0,__proto,'endian',function(){
			return this._xd_ ? "littleEndian" :"bigEndian";
			},function(endianStr){
			this._xd_=(endianStr=="littleEndian");
		});

		/**
		*字节长度。
		*/
		__getset(0,__proto,'length',function(){
			return this._length;
			},function(value){
			if (this._allocated_ < value)
				this.___resizeBuffer(this._allocated_=Math.floor(Math.max(value,this._allocated_ *2)));
			else if (this._allocated_ > value)
			this.___resizeBuffer(this._allocated_=value);
			this._length=value;
		});

		/**
		*当前读取到的位置。
		*/
		__getset(0,__proto,'pos',function(){
			return this._pos_;
			},function(value){
			this._pos_=value;
			this._d_.byteOffset=value;
		});

		/**
		*可从字节流的当前位置到末尾读取的数据的字节数。
		*/
		__getset(0,__proto,'bytesAvailable',function(){
			return this.length-this._pos_;
		});

		Byte.getSystemEndian=function(){
			if (!Byte._sysEndian){
				var buffer=new ArrayBuffer(2);
				new DataView(buffer).setInt16(0,256,true);
				Byte._sysEndian=(new Int16Array(buffer))[0]===256 ? /*CLASS CONST:laya.utils.Byte.LITTLE_ENDIAN*/"littleEndian" :/*CLASS CONST:laya.utils.Byte.BIG_ENDIAN*/"bigEndian";
			}
			return Byte._sysEndian;
		}

		Byte.BIG_ENDIAN="bigEndian";
		Byte.LITTLE_ENDIAN="littleEndian";
		Byte._sysEndian=null;
		return Byte;
	})()


	/**
	*对象缓存统一管理类
	*/
	//class laya.utils.CacheManger
	var CacheManger=(function(){
		function CacheManger(){}
		__class(CacheManger,'laya.utils.CacheManger');
		CacheManger.regCacheByFunction=function(disposeFunction,getCacheListFunction){
			CacheManger.unRegCacheByFunction(disposeFunction,getCacheListFunction);
			var cache;
			cache={
				tryDispose:disposeFunction,
				getCacheList:getCacheListFunction
			};
			CacheManger._cacheList.push(cache);
		}

		CacheManger.unRegCacheByFunction=function(disposeFunction,getCacheListFunction){
			var i=0,len=0;
			len=CacheManger._cacheList.length;
			for (i=0;i < len;i++){
				if (CacheManger._cacheList[i].tryDispose==disposeFunction && CacheManger._cacheList[i].getCacheList==getCacheListFunction){
					CacheManger._cacheList.splice(i,1);
					return;
				}
			}
		}

		CacheManger.forceDispose=function(){
			var i=0,len=CacheManger._cacheList.length;
			for(i=0;i<len;i++){
				CacheManger._cacheList[i].tryDispose(true);
			}
		}

		CacheManger.beginCheck=function(waitTime){
			(waitTime===void 0)&& (waitTime=15000);
			Laya.timer.loop(waitTime,null,CacheManger._checkLoop);
		}

		CacheManger.stopCheck=function(){
			Laya.timer.clear(null,CacheManger._checkLoop);
		}

		CacheManger._checkLoop=function(){
			var cacheList=CacheManger._cacheList;
			if (cacheList.length < 1)return;
			var tTime=Browser.now();
			var count=0;
			var len=0;
			len=count=cacheList.length;
			while (count > 0){
				CacheManger._index++;
				CacheManger._index=CacheManger._index % len;
				cacheList[CacheManger._index].tryDispose(false);
				if (Browser.now()-tTime > CacheManger.loopTimeLimit)break ;
				count--;
			}
		}

		CacheManger.loopTimeLimit=2;
		CacheManger._cacheList=[];
		CacheManger._index=0;
		return CacheManger;
	})()


	/**
	*<code>ClassUtils</code> 是一个类工具类。
	*/
	//class laya.utils.ClassUtils
	var ClassUtils=(function(){
		function ClassUtils(){};
		__class(ClassUtils,'laya.utils.ClassUtils');
		ClassUtils.regClass=function(className,classDef){
			ClassUtils._classMap[className]=classDef;
		}

		ClassUtils.getRegClass=function(className){
			return ClassUtils._classMap[className];
		}

		ClassUtils.getInstance=function(className){
			var compClass=ClassUtils.getClass(className);
			if (compClass)
				return new compClass();
			else
			console.log("[error] Undefined class:",className);
			return null;
		}

		ClassUtils.createByJson=function(json,node,root,customHandler,instanceHandler){
			if ((typeof json=='string'))
				json=JSON.parse(json);
			var props=json.props;
			if (!node){
				node=instanceHandler ? instanceHandler.runWith(json.instanceParams):ClassUtils.getInstance(props.runtime || json.type);
				if (!node)
					return null;
			};
			var child=json.child;
			if (child){
				for (var i=0,n=child.length;i < n;i++){
					var data=child[i];
					if ((data.props.name==="render" || data.props.renderType==="render")&& node["_$set_itemRender"])
						node.itemRender=data;
					else {
						if (data.type=="Graphic"){
							ClassUtils.addGraphicsToSprite(data,node);
							}else if (ClassUtils.isDrawType(data.type)){
							ClassUtils.addGraphicToSprite(data,node,true);
							}else {
							var tChild=ClassUtils.createByJson(data,null,root,customHandler,instanceHandler)
							if (data.type=="Script"){
								tChild["owner"]=node;
								}else if (data.props.renderType=="mask"){
								node.mask=tChild;
								}else {
								node.addChild(tChild);
							}
						}
					}
				}
			}
			if (props){
				for (var prop in props){
					var value=props[prop];
					if (prop==="var" && root){
						root[value]=node;
						}else if ((value instanceof Array)&& (typeof (node[prop])=='function')){
						node[prop].apply(node,value);
						}else {
						node[prop]=value;
					}
				}
			};
			var customProps=json.customProps;
			if (customHandler && customProps){
				for (prop in customProps){
					value=customProps[prop];
					customHandler.runWith([node,prop,value]);
				}
			}
			if (node["created"])
				node.created();
			return node;
		}

		ClassUtils.addGraphicsToSprite=function(graphicO,sprite){
			var graphics;
			graphics=graphicO.child;
			if (!graphics || graphics.length < 1)
				return;
			var g;
			g=ClassUtils._getGraphicsFromSprite(graphicO,sprite);
			var ox=0;
			var oy=0;
			if (graphicO.props){
				ox=ClassUtils._getObjVar(graphicO.props,"x",0);
				oy=ClassUtils._getObjVar(graphicO.props,"y",0);
			}
			if (ox !=0 && oy !=0){
				g.translate(ox,oy);
			};
			var i=0,len=0;
			len=graphics.length;
			for (i=0;i < len;i++){
				ClassUtils._addGraphicToGraphics(graphics[i],g);
			}
			if (ox !=0 && oy !=0){
				g.translate(-ox,-oy);
			}
		}

		ClassUtils.addGraphicToSprite=function(graphicO,sprite,isChild){
			(isChild===void 0)&& (isChild=false);
			var g;
			g=isChild ? ClassUtils._getGraphicsFromSprite(graphicO,sprite):sprite.graphics;
			ClassUtils._addGraphicToGraphics(graphicO,g);
		}

		ClassUtils._getGraphicsFromSprite=function(dataO,sprite){
			var g;
			if (!dataO || !dataO.props)
				return sprite.graphics;
			var propsName;
			propsName=dataO.props.renderType;
			switch (propsName){
				case "hit":
				case "unHit":;
					var hitArea;
					if (!sprite.hitArea){
						sprite.hitArea=new HitArea();
					}
					hitArea=sprite.hitArea;
					if (!hitArea[propsName]){
						hitArea[propsName]=new Graphics();
					}
					g=hitArea[propsName];
					break ;
				default :
				}
			if (!g)
				g=sprite.graphics;
			return g;
		}

		ClassUtils._getTransformData=function(propsO){
			var m;
			if (propsO.hasOwnProperty("pivotX")|| propsO.hasOwnProperty("pivotY")){
				m=m || new Matrix();
				m.translate(-ClassUtils._getObjVar(propsO,"pivotX",0),-ClassUtils._getObjVar(propsO,"pivotY",0));
			};
			var sx=ClassUtils._getObjVar(propsO,"scaleX",1),sy=ClassUtils._getObjVar(propsO,"scaleY",1);
			var rotate=ClassUtils._getObjVar(propsO,"rotation",0);
			var skewX=ClassUtils._getObjVar(propsO,"skewX",0);
			var skewY=ClassUtils._getObjVar(propsO,"skewY",0);
			if (sx !=1 || sy !=1 || rotate !=0){
				m=m || new Matrix();
				m.scale(sx,sy);
				m.rotate(rotate *0.0174532922222222);
			}
			return m;
		}

		ClassUtils._addGraphicToGraphics=function(graphicO,graphic){
			var propsO;
			propsO=graphicO.props;
			if (!propsO)
				return;
			var drawConfig;
			drawConfig=ClassUtils.DrawTypeDic[graphicO.type];
			if (!drawConfig)
				return;
			var g;
			g=graphic;
			var m;
			var params=ClassUtils._getParams(propsO,drawConfig[1],drawConfig[2],drawConfig[3]);
			m=ClassUtils._tM;
			if (m){
				g.save();
				g.transform(m);
			}
			g[drawConfig[0]].apply(g,params);
			if (m){
				g.restore();
			}
		}

		ClassUtils._adptLineData=function(params){
			params[2]=parseFloat(params[0])+parseFloat(params[2]);
			params[3]=parseFloat(params[1])+parseFloat(params[3]);
			return params;
		}

		ClassUtils._adptTextureData=function(params){
			params[0]=Loader.getRes(params[0]);
			return params;
		}

		ClassUtils._adptLinesData=function(params){
			params[2]=ClassUtils._getPointListByStr(params[2]);
			return params;
		}

		ClassUtils.isDrawType=function(type){
			if (type=="Image")
				return false;
			return ClassUtils.DrawTypeDic.hasOwnProperty(type);
		}

		ClassUtils._getParams=function(obj,params,xPos,adptFun){
			(xPos===void 0)&& (xPos=0);
			var rst;
			rst=ClassUtils._temParam;
			rst.length=params.length;
			var i=0,len=0;
			len=params.length;
			for (i=0;i < len;i++){
				rst[i]=ClassUtils._getObjVar(obj,params[i][0],params[i][1]);
			};
			var m;
			m=ClassUtils._getTransformData(obj);
			if (m){
				if (!xPos)xPos=0;
				m.translate(rst[xPos],rst[xPos+1]);
				rst[xPos]=rst[xPos+1]=0;
				ClassUtils._tM=m;
				}else {
				ClassUtils._tM=null;
			}
			if (adptFun && ClassUtils[adptFun]){
				rst=ClassUtils[adptFun](rst);
			}
			return rst;
		}

		ClassUtils._getPointListByStr=function(str){
			var pointArr;
			pointArr=str.split(",");
			var i=0,len=0;
			len=pointArr.length;
			for (i=0;i < len;i++){
				pointArr[i]=parseFloat(pointArr[i]);
			}
			return pointArr;
		}

		ClassUtils._getObjVar=function(obj,key,noValue){
			if (obj.hasOwnProperty(key)){
				return obj[key];
			}
			return noValue;
		}

		ClassUtils._temParam=[];
		ClassUtils._classMap={'Sprite':'laya.display.Sprite','Text':'laya.display.Text','Animation':'laya.display.Animation','Skeleton':'laya.ani.bone.Skeleton','Particle2D':'laya.particle.Particle2D','div':'laya.html.dom.HTMLDivElement','img':'laya.html.dom.HTMLImageElement','span':'laya.html.dom.HTMLElement','br':'laya.html.dom.HTMLBrElement','style':'laya.html.dom.HTMLStyleElement','font':'laya.html.dom.HTMLElement','a':'laya.html.dom.HTMLElement','#text':'laya.html.dom.HTMLElement'};
		ClassUtils.getClass=function(className){
			var classObject=ClassUtils._classMap[className] || className;
			if ((typeof classObject=='string'))
				return Laya["__classmap"][classObject];
			return classObject;
		}

		ClassUtils._tM=null
		__static(ClassUtils,
		['DrawTypeDic',function(){return this.DrawTypeDic={"Rect":["drawRect",[["x",0],["y",0],["width",0],["height",0],["fillColor",null],["lineColor",null],["lineWidth",1]]],"Circle":["drawCircle",[["x",0],["y",0],["radius",0],["fillColor",null],["lineColor",null],["lineWidth",1]]],"Pie":["drawPie",[["x",0],["y",0],["radius",0],["startAngle",0],["endAngle",0],["fillColor",null],["lineColor",null],["lineWidth",1]]],"Image":["drawTexture",[["x",0],["y",0],["width",0],["height",0]]],"Texture":["drawTexture",[["skin",null],["x",0],["y",0],["width",0],["height",0]],1,"_adptTextureData"],"FillTexture":["fillTexture",[["skin",null],["x",0],["y",0],["width",0],["height",0],["repeat",null]],1,"_adptTextureData"],"FillText":["fillText",[["text",""],["x",0],["y",0],["font",null],["color",null],["textAlign",null]],1],"Line":["drawLine",[["x",0],["y",0],["toX",0],["toY",0],["lineColor",null],["lineWidth",0]],0,"_adptLineData"],"Lines":["drawLines",[["x",0],["y",0],["points",""],["lineColor",null],["lineWidth",0]],0,"_adptLinesData"],"Curves":["drawCurves",[["x",0],["y",0],["points",""],["lineColor",null],["lineWidth",0]],0,"_adptLinesData"],"Poly":["drawPoly",[["x",0],["y",0],["points",""],["fillColor",null],["lineColor",null],["lineWidth",1]],0,"_adptLinesData"]};}
		]);
		return ClassUtils;
	})()


	/**
	*<code>Color</code> 是一个颜色值处理类。
	*/
	//class laya.utils.Color
	var Color=(function(){
		function Color(str){
			this._color=[];
			//this.strColor=null;
			//this.numColor=0;
			//this._drawStyle=null;
			if ((typeof str=='string')){
				this.strColor=str;
				if (str===null)str="#000000";
				str.charAt(0)=='#' && (str=str.substr(1));
				var color=this.numColor=parseInt(str,16);
				var flag=(str.length==8);
				if (flag){
					this._color=[parseInt(str.substr(0,2),16)/ 255,((0x00FF0000 & color)>> 16)/ 255,((0x0000FF00 & color)>> 8)/ 255,(0x000000FF & color)/ 255];
					return;
				}
				}else {
				color=this.numColor=str;
				this.strColor=Utils.toHexColor(color);
			}
			this._color=[((0xFF0000 & color)>> 16)/ 255,((0xFF00 & color)>> 8)/ 255,(0xFF & color)/ 255,1];
			(this._color).__id=++Color._COLODID;
		}

		__class(Color,'laya.utils.Color');
		Color._initDefault=function(){
			Color._DEFAULT={};
			for (var i in Color._COLOR_MAP)Color._SAVE[i]=Color._DEFAULT[i]=new Color(Color._COLOR_MAP[i]);
			return Color._DEFAULT;
		}

		Color._initSaveMap=function(){
			Color._SAVE_SIZE=0;
			Color._SAVE={};
			for (var i in Color._DEFAULT)Color._SAVE[i]=Color._DEFAULT[i];
		}

		Color.create=function(str){
			var color=Color._SAVE[str+""];
			if (color !=null)return color;
			(Color._SAVE_SIZE < 1000)|| Color._initSaveMap();
			return Color._SAVE[str+""]=new Color(str);
		}

		Color._SAVE={};
		Color._SAVE_SIZE=0;
		Color._COLOR_MAP={"white":'#FFFFFF',"red":'#FF0000',"green":'#00FF00',"blue":'#0000FF',"black":'#000000',"yellow":'#FFFF00','gray':'#AAAAAA'};
		Color._DEFAULT=Color._initDefault();
		Color._COLODID=1;
		return Color;
	})()


	/**
	*<code>Dictionary</code> 是一个字典型的数据存取类。
	*/
	//class laya.utils.Dictionary
	var Dictionary=(function(){
		function Dictionary(){
			this._values=[];
			this._keys=[];
		}

		__class(Dictionary,'laya.utils.Dictionary');
		var __proto=Dictionary.prototype;
		/**
		*给指定的键名设置值。
		*@param key 键名。
		*@param value 值。
		*/
		__proto.set=function(key,value){
			var index=this.indexOf(key);
			if (index >=0){
				this._values[index]=value;
				return;
			}
			this._keys.push(key);
			this._values.push(value);
		}

		/**
		*获取指定对象的键名索引。
		*@param key 键名对象。
		*@return 键名索引。
		*/
		__proto.indexOf=function(key){
			var index=this._keys.indexOf(key);
			if (index >=0)return index;
			key=((typeof key=='string'))? Number(key):(((typeof key=='number'))? key.toString():key);
			return this._keys.indexOf(key);
		}

		/**
		*返回指定键名的值。
		*@param key 键名对象。
		*@return 指定键名的值。
		*/
		__proto.get=function(key){
			var index=this.indexOf(key);
			return index < 0 ? null :this._values[index];
		}

		/**
		*移除指定键名的值。
		*@param key 键名对象。
		*@return 是否成功移除。
		*/
		__proto.remove=function(key){
			var index=this.indexOf(key);
			if (index >=0){
				this._keys.splice(index,1);
				this._values.splice(index,1);
				return true;
			}
			return false;
		}

		/**
		*清除此对象的键名列表和键值列表。
		*/
		__proto.clear=function(){
			this._values.length=0;
			this._keys.length=0;
		}

		/**
		*获取所有的子元素列表。
		*/
		__getset(0,__proto,'values',function(){
			return this._values;
		});

		/**
		*获取所有的子元素键名列表。
		*/
		__getset(0,__proto,'keys',function(){
			return this._keys;
		});

		return Dictionary;
	})()


	/**
	*<code>Dragging</code> 类是触摸滑动控件。
	*/
	//class laya.utils.Dragging
	var Dragging=(function(){
		function Dragging(){
			//this.target=null;
			this.ratio=0.92;
			this.maxOffset=60;
			//this.area=null;
			//this.hasInertia=false;
			//this.elasticDistance=NaN;
			//this.elasticBackTime=NaN;
			//this.data=null;
			this._dragging=false;
			this._clickOnly=true;
			//this._elasticRateX=NaN;
			//this._elasticRateY=NaN;
			//this._lastX=NaN;
			//this._lastY=NaN;
			//this._offsetX=NaN;
			//this._offsetY=NaN;
			//this._offsets=null;
			//this._disableMouseEvent=false;
			//this._tween=null;
			//this._parent=null;
		}

		__class(Dragging,'laya.utils.Dragging');
		var __proto=Dragging.prototype;
		/**
		*开始拖拽。
		*@param target 待拖拽的 <code>Sprite</code> 对象。
		*@param area 滑动范围。
		*@param hasInertia 拖动是否有惯性。
		*@param elasticDistance 橡皮筋最大值。
		*@param elasticBackTime 橡皮筋回弹时间，单位为毫秒。
		*@param data 事件携带数据。
		*@param disableMouseEvent 鼠标事件是否有效。
		*/
		__proto.start=function(target,area,hasInertia,elasticDistance,elasticBackTime,data,disableMouseEvent){
			this.clearTimer();
			this.target=target;
			this.area=area;
			this.hasInertia=hasInertia;
			this.elasticDistance=elasticDistance;
			this.elasticBackTime=elasticBackTime;
			this.data=data;
			this._disableMouseEvent=disableMouseEvent;
			if (target.globalScaleX !=1 || target.globalScaleY !=1){
				this._parent=target.parent;
				}else {
				this._parent=Laya.stage;
			}
			this._clickOnly=true;
			this._dragging=true;
			this._elasticRateX=this._elasticRateY=1;
			this._lastX=this._parent.mouseX;
			this._lastY=this._parent.mouseY;
			Laya.stage.on(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp);
			Laya.stage.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp);
			Laya.timer.frameLoop(1,this,this.loop);
		}

		/**
		*清除计时器。
		*/
		__proto.clearTimer=function(){
			Laya.timer.clear(this,this.loop);
			Laya.timer.clear(this,this.tweenMove);
			if (this._tween){
				this._tween.recover();
				this._tween=null;
			}
		}

		/**
		*停止拖拽。
		*/
		__proto.stop=function(){
			if (this._dragging){
				MouseManager.instance.disableMouseEvent=false;
				Laya.stage.off(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp);
				Laya.stage.off(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp);
				this._dragging=false;
				this.target && this.area && this.backToArea();
				this.clear();
			}
		}

		/**
		*拖拽的循环处理函数。
		*/
		__proto.loop=function(){
			var point=this._parent.getMousePoint();
			var mouseX=point.x;
			var mouseY=point.y;
			var offsetX=mouseX-this._lastX;
			var offsetY=mouseY-this._lastY;
			if (this._clickOnly){
				if (Math.abs(offsetX *Laya.stage._canvasTransform.getScaleX())> 1 || Math.abs(offsetY *Laya.stage._canvasTransform.getScaleY())> 1){
					this._clickOnly=false;
					this._offsets || (this._offsets=[]);
					this._offsets.length=0;
					this.target.event(/*laya.events.Event.DRAG_START*/"dragstart",this.data);
					MouseManager.instance.disableMouseEvent=this._disableMouseEvent;
					this.target._set$P("$_MOUSEDOWN",false);
				}else return;
				}else {
				this._offsets.push(offsetX,offsetY);
			}
			if (offsetX===0 && offsetY===0)return;
			this._lastX=mouseX;
			this._lastY=mouseY;
			this.target.x+=offsetX *this._elasticRateX;
			this.target.y+=offsetY *this._elasticRateY;
			this.area && this.checkArea();
			this.target.event(/*laya.events.Event.DRAG_MOVE*/"dragmove",this.data);
		}

		/**
		*拖拽区域检测。
		*/
		__proto.checkArea=function(){
			if (this.elasticDistance <=0){
				this.backToArea();
				}else {
				if (this.target.x < this.area.x){
					var offsetX=this.area.x-this.target.x;
					}else if (this.target.x > this.area.x+this.area.width){
					offsetX=this.target.x-this.area.x-this.area.width;
					}else {
					offsetX=0;
				}
				this._elasticRateX=Math.max(0,1-(offsetX / this.elasticDistance));
				if (this.target.y < this.area.y){
					var offsetY=this.area.y-this.target.y;
					}else if (this.target.y > this.area.y+this.area.height){
					offsetY=this.target.y-this.area.y-this.area.height;
					}else {
					offsetY=0;
				}
				this._elasticRateY=Math.max(0,1-(offsetY / this.elasticDistance));
			}
		}

		/**
		*移动至设定的拖拽区域。
		*/
		__proto.backToArea=function(){
			this.target.x=Math.min(Math.max(this.target.x,this.area.x),this.area.x+this.area.width);
			this.target.y=Math.min(Math.max(this.target.y,this.area.y),this.area.y+this.area.height);
		}

		/**
		*舞台的抬起事件侦听函数。
		*@param e Event 对象。
		*/
		__proto.onStageMouseUp=function(e){
			MouseManager.instance.disableMouseEvent=false;
			Laya.stage.off(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp);
			Laya.stage.off(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp);
			Laya.timer.clear(this,this.loop);
			if (this._clickOnly || !this.target)return;
			if (this.hasInertia){
				if (this._offsets.length < 1){
					this._offsets.push(this._parent.mouseX-this._lastX,this._parent.mouseY-this._lastY);
				}
				this._offsetX=this._offsetY=0;
				var len=this._offsets.length;
				var n=Math.min(len,6);
				var m=this._offsets.length-n;
				for (var i=len-1;i > m;i--){
					this._offsetY+=this._offsets[i--];
					this._offsetX+=this._offsets[i];
				}
				this._offsetX=this._offsetX / n *2;
				this._offsetY=this._offsetY / n *2;
				if (Math.abs(this._offsetX)> this.maxOffset)this._offsetX=this._offsetX > 0 ? this.maxOffset :-this.maxOffset;
				if (Math.abs(this._offsetY)> this.maxOffset)this._offsetY=this._offsetY > 0 ? this.maxOffset :-this.maxOffset;
				Laya.timer.frameLoop(1,this,this.tweenMove);
				}else if (this.elasticDistance > 0){
				this.checkElastic();
				}else {
				this.clear();
			}
		}

		/**
		*橡皮筋效果检测。
		*/
		__proto.checkElastic=function(){
			var tx=NaN;
			var ty=NaN;
			if (this.target.x < this.area.x)tx=this.area.x;
			else if (this.target.x > this.area.x+this.area.width)tx=this.area.x+this.area.width;
			if (this.target.y < this.area.y)ty=this.area.y;
			else if (this.target.y > this.area.y+this.area.height)ty=this.area.y+this.area.height;
			if (!isNaN(tx)|| !isNaN(ty)){
				var obj={};
				if (!isNaN(tx))obj.x=tx;
				if (!isNaN(ty))obj.y=ty;
				this._tween=Tween.to(this.target,obj,this.elasticBackTime,Ease.sineOut,Handler.create(this,this.clear),0,false,false);
				}else {
				this.clear();
			}
		}

		/**
		*移动。
		*/
		__proto.tweenMove=function(){
			this._offsetX *=this.ratio *this._elasticRateX;
			this._offsetY *=this.ratio *this._elasticRateY;
			this.target.x+=this._offsetX;
			this.target.y+=this._offsetY;
			this.area && this.checkArea();
			this.target.event(/*laya.events.Event.DRAG_MOVE*/"dragmove",this.data);
			if ((Math.abs(this._offsetX)< 1 && Math.abs(this._offsetY)< 1)|| this._elasticRateX < 0.5 || this._elasticRateY < 0.5){
				Laya.timer.clear(this,this.tweenMove);
				if (this.elasticDistance > 0)this.checkElastic();
				else this.clear();
			}
		}

		/**
		*结束拖拽。
		*/
		__proto.clear=function(){
			if (this.target){
				this.clearTimer();
				var sp=this.target;
				this.target=null;
				this._parent=null;
				sp.event(/*laya.events.Event.DRAG_END*/"dragend",this.data);
			}
		}

		return Dragging;
	})()


	/**
	*<code>Ease</code> 类定义了缓动函数，以便实现 <code>Tween</code> 动画的缓动效果。
	*/
	//class laya.utils.Ease
	var Ease=(function(){
		function Ease(){};
		__class(Ease,'laya.utils.Ease');
		Ease.linearNone=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.linearIn=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.linearInOut=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.linearOut=function(t,b,c,d){
			return c *t / d+b;
		}

		Ease.bounceIn=function(t,b,c,d){
			return c-Ease.bounceOut(d-t,0,c,d)+b;
		}

		Ease.bounceInOut=function(t,b,c,d){
			if (t < d *0.5)return Ease.bounceIn(t *2,0,c,d)*.5+b;
			else return Ease.bounceOut(t *2-d,0,c,d)*.5+c *.5+b;
		}

		Ease.bounceOut=function(t,b,c,d){
			if ((t /=d)< (1 / 2.75))return c *(7.5625 *t *t)+b;
			else if (t < (2 / 2.75))return c *(7.5625 *(t-=(1.5 / 2.75))*t+.75)+b;
			else if (t < (2.5 / 2.75))return c *(7.5625 *(t-=(2.25 / 2.75))*t+.9375)+b;
			else return c *(7.5625 *(t-=(2.625 / 2.75))*t+.984375)+b;
		}

		Ease.backIn=function(t,b,c,d,s){
			(s===void 0)&& (s=1.70158);
			return c *(t /=d)*t *((s+1)*t-s)+b;
		}

		Ease.backInOut=function(t,b,c,d,s){
			(s===void 0)&& (s=1.70158);
			if ((t /=d *0.5)< 1)return c *0.5 *(t *t *(((s *=(1.525))+1)*t-s))+b;
			return c / 2 *((t-=2)*t *(((s *=(1.525))+1)*t+s)+2)+b;
		}

		Ease.backOut=function(t,b,c,d,s){
			(s===void 0)&& (s=1.70158);
			return c *((t=t / d-1)*t *((s+1)*t+s)+1)+b;
		}

		Ease.elasticIn=function(t,b,c,d,a,p){
			(a===void 0)&& (a=0);
			(p===void 0)&& (p=0);
			var s;
			if (t==0)return b;
			if ((t /=d)==1)return b+c;
			if (!p)p=d *.3;
			if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
				a=c;
				s=p / 4;
			}else s=p / Ease.PI2 *Math.asin(c / a);
			return-(a *Math.pow(2,10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p))+b;
		}

		Ease.elasticInOut=function(t,b,c,d,a,p){
			(a===void 0)&& (a=0);
			(p===void 0)&& (p=0);
			var s;
			if (t==0)return b;
			if ((t /=d *0.5)==2)return b+c;
			if (!p)p=d *(.3 *1.5);
			if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
				a=c;
				s=p / 4;
			}else s=p / Ease.PI2 *Math.asin(c / a);
			if (t < 1)return-.5 *(a *Math.pow(2,10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p))+b;
			return a *Math.pow(2,-10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p)*.5+c+b;
		}

		Ease.elasticOut=function(t,b,c,d,a,p){
			(a===void 0)&& (a=0);
			(p===void 0)&& (p=0);
			var s;
			if (t==0)return b;
			if ((t /=d)==1)return b+c;
			if (!p)p=d *.3;
			if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
				a=c;
				s=p / 4;
			}else s=p / Ease.PI2 *Math.asin(c / a);
			return (a *Math.pow(2,-10 *t)*Math.sin((t *d-s)*Ease.PI2 / p)+c+b);
		}

		Ease.strongIn=function(t,b,c,d){
			return c *(t /=d)*t *t *t *t+b;
		}

		Ease.strongInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t *t+b;
			return c *0.5 *((t-=2)*t *t *t *t+2)+b;
		}

		Ease.strongOut=function(t,b,c,d){
			return c *((t=t / d-1)*t *t *t *t+1)+b;
		}

		Ease.sineInOut=function(t,b,c,d){
			return-c *0.5 *(Math.cos(Math.PI *t / d)-1)+b;
		}

		Ease.sineIn=function(t,b,c,d){
			return-c *Math.cos(t / d *Ease.HALF_PI)+c+b;
		}

		Ease.sineOut=function(t,b,c,d){
			return c *Math.sin(t / d *Ease.HALF_PI)+b;
		}

		Ease.quintIn=function(t,b,c,d){
			return c *(t /=d)*t *t *t *t+b;
		}

		Ease.quintInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t *t+b;
			return c *0.5 *((t-=2)*t *t *t *t+2)+b;
		}

		Ease.quintOut=function(t,b,c,d){
			return c *((t=t / d-1)*t *t *t *t+1)+b;
		}

		Ease.quartIn=function(t,b,c,d){
			return c *(t /=d)*t *t *t+b;
		}

		Ease.quartInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t+b;
			return-c *0.5 *((t-=2)*t *t *t-2)+b;
		}

		Ease.quartOut=function(t,b,c,d){
			return-c *((t=t / d-1)*t *t *t-1)+b;
		}

		Ease.cubicIn=function(t,b,c,d){
			return c *(t /=d)*t *t+b;
		}

		Ease.cubicInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t *t+b;
			return c *0.5 *((t-=2)*t *t+2)+b;
		}

		Ease.cubicOut=function(t,b,c,d){
			return c *((t=t / d-1)*t *t+1)+b;
		}

		Ease.quadIn=function(t,b,c,d){
			return c *(t /=d)*t+b;
		}

		Ease.quadInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return c *0.5 *t *t+b;
			return-c *0.5 *((--t)*(t-2)-1)+b;
		}

		Ease.quadOut=function(t,b,c,d){
			return-c *(t /=d)*(t-2)+b;
		}

		Ease.expoIn=function(t,b,c,d){
			return (t==0)? b :c *Math.pow(2,10 *(t / d-1))+b-c *0.001;
		}

		Ease.expoInOut=function(t,b,c,d){
			if (t==0)return b;
			if (t==d)return b+c;
			if ((t /=d *0.5)< 1)return c *0.5 *Math.pow(2,10 *(t-1))+b;
			return c *0.5 *(-Math.pow(2,-10 *--t)+2)+b;
		}

		Ease.expoOut=function(t,b,c,d){
			return (t==d)? b+c :c *(-Math.pow(2,-10 *t / d)+1)+b;
		}

		Ease.circIn=function(t,b,c,d){
			return-c *(Math.sqrt(1-(t /=d)*t)-1)+b;
		}

		Ease.circInOut=function(t,b,c,d){
			if ((t /=d *0.5)< 1)return-c *0.5 *(Math.sqrt(1-t *t)-1)+b;
			return c *0.5 *(Math.sqrt(1-(t-=2)*t)+1)+b;
		}

		Ease.circOut=function(t,b,c,d){
			return c *Math.sqrt(1-(t=t / d-1)*t)+b;
		}

		Ease.HALF_PI=Math.PI *0.5;
		Ease.PI2=Math.PI *2;
		return Ease;
	})()


	/**
	*鼠标点击区域类
	*/
	//class laya.utils.HitArea
	var HitArea=(function(){
		function HitArea(){
			this.hit=null;
			this.unHit=null;
		}

		__class(HitArea,'laya.utils.HitArea');
		var __proto=HitArea.prototype;
		/**
		*是否包含某个点
		*@param x
		*@param y
		*@return
		*
		*/
		__proto.isHit=function(x,y){
			if (!HitArea.isHitGraphic(x,y,this.hit))return false;
			return !HitArea.isHitGraphic(x,y,this.unHit);
		}

		HitArea.isHitGraphic=function(x,y,graphic){
			if (!graphic)return false;
			var cmds;
			cmds=graphic.cmds;
			if (!cmds&&graphic._one){
				cmds=HitArea._tCmds;
				cmds.length=1;
				cmds[0]=graphic._one;
			}
			if (!cmds)return false;
			var i=0,len=0;
			len=cmds.length;
			var cmd;
			for (i=0;i < len;i++){
				cmd=cmds[i];
				if (!cmd)continue ;
				var context=Render._context;
				switch (cmd.callee){
					case context._translate:
					case 6:
						x-=cmd[0];
						y-=cmd[1];
					default :
					}
				if (HitArea.isHitCmd(x,y,cmd))return true;
			}
			return false;
		}

		HitArea.isHitCmd=function(x,y,cmd){
			if (!cmd)return false;
			var context=Render._context;
			var rst=false;
			switch (cmd["callee"]){
				case context._drawRect:
				case 13:
					HitArea._rec.setTo(cmd[0],cmd[1],cmd[2],cmd[3]);
					rst=HitArea._rec.contains(x,y);
					break ;
				case context._drawCircle:
				case context._fillCircle:
				case 14:;
					var d=NaN;
					x-=cmd[0];
					y-=cmd[1];
					d=x *x+y *y;
					rst=d < cmd[2] *cmd[2];
					break ;
				case context._drawPoly:
				case 18:
					x-=cmd[0];
					y-=cmd[1];
					rst=HitArea.ptInPolygon(x,y,cmd[2]);
					break ;
				default :
				}
			return rst;
		}

		HitArea.ptInPolygon=function(x,y,areaPoints){
			var p;
			p=HitArea._ptPoint;
			p.setTo(x,y);
			var nCross=0;
			var p1x=NaN,p1y=NaN,p2x=NaN,p2y=NaN;
			var len=0;
			len=areaPoints.length;
			for (var i=0;i < len;i+=2){
				p1x=areaPoints[i];
				p1y=areaPoints[i+1];
				p2x=areaPoints[(i+2)% len];
				p2y=areaPoints[(i+3)% len];
				var p1=areaPoints[i];
				var p2=areaPoints[(i+1)% areaPoints.length];
				if (p1y==p2y)
					continue ;
				if (p.y < Math.min(p1y,p2y))
					continue ;
				if (p.y >=Math.max(p1y,p2y))
					continue ;
				var tx=(p.y-p1y)*(p2x-p1x)/ (p2y-p1y)+p1x;
				if (tx > p.x){
					nCross++;
				}
			}
			return (nCross % 2==1);
		}

		HitArea._tCmds=[];
		__static(HitArea,
		['_rec',function(){return this._rec=new Rectangle();},'_ptPoint',function(){return this._ptPoint=new Point();}
		]);
		return HitArea;
	})()


	/**
	*<code>HTMLChar</code> 是一个 HTML 字符类。
	*/
	//class laya.utils.HTMLChar
	var HTMLChar=(function(){
		function HTMLChar(char,w,h,style){
			//this._sprite=null;
			//this._x=NaN;
			//this._y=NaN;
			//this._w=NaN;
			//this._h=NaN;
			//this.isWord=false;
			//this.char=null;
			//this.charNum=NaN;
			//this.style=null;
			this.char=char;
			this.charNum=char.charCodeAt(0);
			this._x=this._y=0;
			this.width=w;
			this.height=h;
			this.style=style;
			this.isWord=!HTMLChar._isWordRegExp.test(char);
		}

		__class(HTMLChar,'laya.utils.HTMLChar');
		var __proto=HTMLChar.prototype;
		Laya.imps(__proto,{"laya.display.ILayout":true})
		/**
		*设置与此对象绑定的显示对象 <code>Sprite</code> 。
		*@param sprite 显示对象 <code>Sprite</code> 。
		*/
		__proto.setSprite=function(sprite){
			this._sprite=sprite;
		}

		/**
		*获取与此对象绑定的显示对象 <code>Sprite</code>。
		*@return
		*/
		__proto.getSprite=function(){
			return this._sprite;
		}

		/**@private */
		__proto._isChar=function(){
			return true;
		}

		/**@private */
		__proto._getCSSStyle=function(){
			return this.style;
		}

		/**
		*宽度。
		*/
		__getset(0,__proto,'width',function(){
			return this._w;
			},function(value){
			this._w=value;
		});

		/**
		*此对象存储的 X 轴坐标值。
		*当设置此值时，如果此对象有绑定的 Sprite 对象，则改变 Sprite 对象的属性 x 的值。
		*/
		__getset(0,__proto,'x',function(){
			return this._x;
			},function(value){
			if (this._sprite){
				this._sprite.x=value;
			}
			this._x=value;
		});

		/**
		*此对象存储的 Y 轴坐标值。
		*当设置此值时，如果此对象有绑定的 Sprite 对象，则改变 Sprite 对象的属性 y 的值。
		*/
		__getset(0,__proto,'y',function(){
			return this._y;
			},function(value){
			if (this._sprite){
				this._sprite.y=value;
			}
			this._y=value;
		});

		/**
		*高度。
		*/
		__getset(0,__proto,'height',function(){
			return this._h;
			},function(value){
			this._h=value;
		});

		HTMLChar._isWordRegExp=new RegExp("[\\w\.]","");
		return HTMLChar;
	})()


	/**
	*<code>Log</code> 类用于在界面内显示日志记录信息。
	*/
	//class laya.utils.Log
	var Log=(function(){
		function Log(){};
		__class(Log,'laya.utils.Log');
		Log.enable=function(){
			if (!Log._logdiv){
				Log._logdiv=Browser.window.document.createElement('div');
				Browser.window.document.body.appendChild(Log._logdiv);
				Log._logdiv.style.cssText="pointer-events:none;border:white;overflow:hidden;z-index:1000000;background:rgba(100,100,100,0.6);color:white;position: absolute;left:0px;top:0px;width:50%;height:50%;";
			}
		}

		Log.toggle=function(){
			var style=Log._logdiv.style;
			if (style.width=="1px"){
				style.width=style.height="50%";
				}else {
				style.width=style.height="1px";
			}
		}

		Log.print=function(value){
			if (Log._logdiv){
				if (Log._count >=Log.maxCount)Log.clear();
				Log._count++;
				Log._logdiv.innerText+=value+"\n";
				Log._logdiv.scrollTop=Log._logdiv.scrollHeight;
			}
		}

		Log.clear=function(){
			Log._logdiv.innerText="";
			Log._count=0;
		}

		Log._logdiv=null
		Log._count=0;
		Log.maxCount=20;
		return Log;
	})()


	/**
	*<code>Mouse</code> 类用于控制鼠标光标。
	*/
	//class laya.utils.Mouse
	var Mouse=(function(){
		function Mouse(){}
		__class(Mouse,'laya.utils.Mouse');
		/**
		*设置鼠标样式
		*@param cursorStr
		*例如auto move no-drop col-resize
		*all-scroll pointer not-allowed row-resize
		*crosshair progress e-resize ne-resize
		*default text n-resize nw-resize
		*help vertical-text s-resize se-resize
		*inherit wait w-resize sw-resize
		*
		*/
		__getset(1,Mouse,'cursor',function(){
			return Mouse._style.cursor;
			},function(cursorStr){
			Mouse._style.cursor=cursorStr;
		});

		Mouse.hide=function(){
			if (Mouse.cursor !="none"){
				Mouse._preCursor=Mouse.cursor;
				Mouse.cursor="none";
			}
		}

		Mouse.show=function(){
			if (Mouse.cursor=="none"){
				if (Mouse._preCursor){
					Mouse.cursor=Mouse._preCursor;
					}else{
					Mouse.cursor="auto";
				}
			}
		}

		Mouse._preCursor=null
		__static(Mouse,
		['_style',function(){return this._style=Browser.document.body.style;}
		]);
		return Mouse;
	})()


	/**
	*<code>Pool</code> 是对象池类，用于对象的存贮、重复使用。
	*/
	//class laya.utils.Pool
	var Pool=(function(){
		function Pool(){};
		__class(Pool,'laya.utils.Pool');
		Pool.getPoolBySign=function(sign){
			return Pool._poolDic[sign] || (Pool._poolDic[sign]=[]);
		}

		Pool.clearBySign=function(sign){
			if (Pool._poolDic[sign])Pool._poolDic[sign].length=0;
		}

		Pool.recover=function(sign,item){
			if (item["__InPool"])return;
			item["__InPool"]=true;
			Pool.getPoolBySign(sign).push(item);
		}

		Pool.getItemByClass=function(sign,cls){
			var pool=Pool.getPoolBySign(sign);
			var rst=pool.length ? pool.pop():new cls();
			rst["__InPool"]=false;
			return rst;
		}

		Pool.getItemByCreateFun=function(sign,createFun){
			var pool=Pool.getPoolBySign(sign);
			var rst=pool.length ? pool.pop():createFun();
			rst["__InPool"]=false;
			return rst;
		}

		Pool.getItem=function(sign){
			var pool=Pool.getPoolBySign(sign);
			var rst=pool.length ? pool.pop():null;
			if (rst){
				rst["__InPool"]=false;
			}
			return rst;
		}

		Pool._poolDic={};
		Pool.InPoolSign="__InPool";
		return Pool;
	})()


	/**
	*基于个数的对象缓存管理器
	*/
	//class laya.utils.PoolCache
	var PoolCache=(function(){
		function PoolCache(){
			this.sign=null;
			this.maxCount=1000;
		}

		__class(PoolCache,'laya.utils.PoolCache');
		var __proto=PoolCache.prototype;
		/**
		*获取缓存的对象列表
		*@return
		*
		*/
		__proto.getCacheList=function(){
			return Pool.getPoolBySign(this.sign);
		}

		/**
		*尝试清理缓存
		*@param force 是否强制清理
		*
		*/
		__proto.tryDispose=function(force){
			var list;
			list=Pool.getPoolBySign(this.sign);
			if (list.length > this.maxCount){
				list.splice(this.maxCount,list.length-this.maxCount);
			}
		}

		PoolCache.addPoolCacheManager=function(sign,maxCount){
			(maxCount===void 0)&& (maxCount=100);
			var cache;
			cache=new PoolCache();
			cache.sign=sign;
			cache.maxCount=maxCount;
			CacheManger.regCacheByFunction(Utils.bind(cache.tryDispose,cache),Utils.bind(cache.getCacheList,cache));
		}

		return PoolCache;
	})()


	/**
	*<code>Stat</code> 用于显示帧率统计信息。
	*/
	//class laya.utils.Stat
	var Stat=(function(){
		function Stat(){};
		__class(Stat,'laya.utils.Stat');
		/**
		*点击帧频显示区域的处理函数。
		*/
		__getset(1,Stat,'onclick',null,function(fn){
			Stat._canvas.source.onclick=fn;
			Stat._canvas.source.style.pointerEvents='';
		});

		Stat.show=function(x,y){
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			if (Render.isConchApp){
				/*__JS__ */conch.showFPS&&conch.showFPS(x,y);
				return;
			};
			var pixel=Browser.pixelRatio;
			Stat._width=pixel *120;
			Stat._vx=pixel *70;
			Stat._view[0]={title:"FPS(Canvas)",value:"_fpsStr",color:"yellow",units:"int"};
			Stat._view[1]={title:"Sprite",value:"spriteCount",color:"white",units:"int"};
			Stat._view[2]={title:"DrawCall",value:"drawCall",color:"white",units:"int"};
			Stat._view[3]={title:"CurMem",value:"currentMemorySize",color:"yellow",units:"M"};
			if (Render.isWebGL){
				Stat._view[4]={title:"Shader",value:"shaderCall",color:"white",units:"int"};
				if (!Render.is3DMode){
					Stat._view[0].title="FPS(WebGL)";
					Stat._view[5]={title:"Canvas",value:"_canvasStr",color:"white",units:"int"};
					}else {
					Stat._view[0].title="FPS(3D)";
					Stat._view[5]={title:"TriFaces",value:"trianglesFaces",color:"white",units:"int"};
				}
				}else {
				Stat._view[4]={title:"Canvas",value:"_canvasStr",color:"white",units:"int"};
			}
			Stat._fontSize=12 *pixel;
			for (var i=0;i < Stat._view.length;i++){
				Stat._view[i].x=4;
				Stat._view[i].y=i *Stat._fontSize+2 *pixel;
			}
			Stat._height=pixel *(Stat._view.length *12+3 *pixel);
			if (!Stat._canvas){
				Stat._canvas=new HTMLCanvas('2D');
				Stat._canvas.size(Stat._width,Stat._height);
				Stat._ctx=Stat._canvas.getContext('2d');
				Stat._ctx.textBaseline="top";
				Stat._ctx.font=Stat._fontSize+"px Sans-serif";
				Stat._canvas.source.style.cssText="pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;left:"+x+"px;top:"+y+"px;width:"+(Stat._width / pixel)+"px;height:"+(Stat._height / pixel)+"px;";
			}
			Stat._first=true;
			Stat.loop();
			Stat._first=false;
			Browser.container.appendChild(Stat._canvas.source);
			Stat.enable();
		}

		Stat.enable=function(){
			Laya.timer.frameLoop(1,Stat,Stat.loop);
		}

		Stat.hide=function(){
			Browser.removeElement(Stat._canvas.source);
			Laya.timer.clear(Stat,Stat.loop);
		}

		Stat.clear=function(){
			Stat.trianglesFaces=Stat.drawCall=Stat.shaderCall=Stat.spriteCount=Stat.canvasNormal=Stat.canvasBitmap=Stat.canvasReCache=0;
		}

		Stat.loop=function(){
			Stat._count++;
			var timer=Browser.now();
			if (timer-Stat._timer < 1000)return;
			var count=Stat._count;
			Stat.FPS=Math.round((count *1000)/ (timer-Stat._timer));
			if (Stat._canvas){
				Stat.trianglesFaces=Math.round(Stat.trianglesFaces / count);
				Stat.drawCall=Math.round(Stat.drawCall / count)-2;
				Stat.shaderCall=Math.round(Stat.shaderCall / count);
				Stat.spriteCount=Math.round(Stat.spriteCount / count)-1;
				Stat.canvasNormal=Math.round(Stat.canvasNormal / count);
				Stat.canvasBitmap=Math.round(Stat.canvasBitmap / count);
				Stat.canvasReCache=Math.ceil(Stat.canvasReCache / count);
				Stat._fpsStr=Stat.FPS+(Stat.renderSlow ? " slow" :"");
				Stat._canvasStr=Stat.canvasReCache+"/"+Stat.canvasNormal+"/"+Stat.canvasBitmap;
				Stat.currentMemorySize=ResourceManager.systemResourceManager.memorySize;
				var ctx=Stat._ctx;
				ctx.clearRect(Stat._first ? 0 :Stat._vx,0,Stat._width,Stat._height);
				for (var i=0;i < Stat._view.length;i++){
					var one=Stat._view[i];
					if (Stat._first){
						ctx.fillStyle="white";
						ctx.fillText(one.title,one.x,one.y,null,null,null);
					}
					ctx.fillStyle=one.color;
					var value=Stat[one.value];
					(one.units=="M")&& (value=Math.floor(value / (1024 *1024)*100)/ 100+" M");
					ctx.fillText(value+"",one.x+Stat._vx,one.y,null,null,null);
				}
				Stat.clear();
			}
			Stat._count=0;
			Stat._timer=timer;
		}

		Stat.loopCount=0;
		Stat.shaderCall=0;
		Stat.drawCall=0;
		Stat.trianglesFaces=0;
		Stat.spriteCount=0;
		Stat.FPS=0;
		Stat.canvasNormal=0;
		Stat.canvasBitmap=0;
		Stat.canvasReCache=0;
		Stat.renderSlow=false;
		Stat.currentMemorySize=0;
		Stat._fpsStr=null
		Stat._canvasStr=null
		Stat._canvas=null
		Stat._ctx=null
		Stat._timer=0;
		Stat._count=0;
		Stat._width=120;
		Stat._height=100;
		Stat._view=[];
		Stat._fontSize=12;
		Stat._first=false;
		Stat._vx=NaN
		return Stat;
	})()


	/**
	*<code>StringKey</code> 类用于存取字符串对应的数字。
	*/
	//class laya.utils.StringKey
	var StringKey=(function(){
		function StringKey(){
			this._strs={};
			this._length=0;
		}

		__class(StringKey,'laya.utils.StringKey');
		var __proto=StringKey.prototype;
		/**
		*添加一个字符。
		*@param str 字符，将作为key 存储相应生成的数字。
		*@return 此字符对应的数字。
		*/
		__proto.add=function(str){
			var index=this._strs[str];
			if (index !=null)return index;
			return this._strs[str]=this._length++;
		}

		/**
		*获取指定字符对应的数字。
		*@param str key 字符。
		*@return 此字符对应的数字。
		*/
		__proto.get=function(str){
			var index=this._strs[str];
			return index==null ?-1 :index;
		}

		return StringKey;
	})()


	/**
	*<code>Timer</code> 是时钟管理类。它是一个单例，可以通过 Laya.timer 访问。
	*/
	//class laya.utils.Timer
	var Timer=(function(){
		var TimerHandler;
		function Timer(){
			this._delta=0;
			this.scale=1;
			this.currFrame=0;
			this._mid=1;
			this._map=[];
			this._laters=[];
			this._handlers=[];
			this._temp=[];
			this._count=0;
			this.currTimer=Browser.now();
			this._lastTimer=Browser.now();
			Laya.timer && Laya.timer.frameLoop(1,this,this._update);
		}

		__class(Timer,'laya.utils.Timer');
		var __proto=Timer.prototype;
		/**
		*@private
		*帧循环处理函数。
		*/
		__proto._update=function(){
			if (this.scale <=0){
				this._lastTimer=Browser.now();
				return;
			};
			var frame=this.currFrame=this.currFrame+this.scale;
			var now=Browser.now();
			this._delta=(now-this._lastTimer)*this.scale;
			var timer=this.currTimer=this.currTimer+this._delta;
			this._lastTimer=now;
			var handlers=this._handlers;
			this._count=0;
			for (i=0,n=handlers.length;i < n;i++){
				handler=handlers[i];
				if (handler.method!==null){
					var t=handler.userFrame ? frame :timer;
					if (t >=handler.exeTime){
						if (handler.repeat){
							if (t > handler.exeTime){
								handler.exeTime+=handler.delay;
								handler.run(false);
								if (t > handler.exeTime){
									handler.exeTime+=Math.ceil((t-handler.exeTime)/ handler.delay)*handler.delay;
								}
							}
							}else {
							handler.run(true);
						}
					}
					}else {
					this._count++;
				}
			}
			if (this._count > 30 || frame % 200===0)this._clearHandlers();
			var laters=this._laters;
			for (var i=0,n=laters.length-1;i <=n;i++){
				var handler=laters[i];
				handler.method!==null && handler.run(false);
				this._recoverHandler(handler);
				i===n && (n=laters.length-1);
			}
			laters.length=0;
		}

		/**@private */
		__proto._clearHandlers=function(){
			var handlers=this._handlers;
			for (var i=0,n=handlers.length;i < n;i++){
				var handler=handlers[i];
				if (handler.method!==null)this._temp.push(handler);
				else this._recoverHandler(handler);
			}
			this._handlers=this._temp;
			this._temp=handlers;
			this._temp.length=0;
		}

		/**@private */
		__proto._recoverHandler=function(handler){
			this._map[handler.key]=null;
			handler.clear();
			Timer._pool.push(handler);
		}

		/**@private */
		__proto._create=function(useFrame,repeat,delay,caller,method,args,coverBefore){
			if (!delay){
				method.apply(caller,args);
				return;
			}
			if (coverBefore){
				var handler=this._getHandler(caller,method);
				if (handler){
					handler.repeat=repeat;
					handler.userFrame=useFrame;
					handler.delay=delay;
					handler.caller=caller;
					handler.method=method;
					handler.args=args;
					handler.exeTime=delay+(useFrame ? this.currFrame :this.currTimer);
					return;
				}
			}
			handler=Timer._pool.length > 0 ? Timer._pool.pop():new TimerHandler();
			handler.repeat=repeat;
			handler.userFrame=useFrame;
			handler.delay=delay;
			handler.caller=caller;
			handler.method=method;
			handler.args=args;
			handler.exeTime=delay+(useFrame ? this.currFrame :this.currTimer);
			this._indexHandler(handler);
			this._handlers.push(handler);
		}

		/**@private */
		__proto._indexHandler=function(handler){
			var caller=handler.caller;
			var method=handler.method;
			var cid=caller ? caller.$_GID || (caller.$_GID=Utils.getGID()):0;
			var mid=method.$_TID || (method.$_TID=(this._mid++)*100000);
			handler.key=cid+mid;
			this._map[handler.key]=handler;
		}

		/**
		*定时执行一次。
		*@param delay 延迟时间(单位为毫秒)。
		*@param caller 执行域(this)。
		*@param method 定时器回调函数。
		*@param args 回调参数。
		*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		*/
		__proto.once=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this._create(false,false,delay,caller,method,args,coverBefore);
		}

		/**
		*定时重复执行。
		*@param delay 间隔时间(单位毫秒)。
		*@param caller 执行域(this)。
		*@param method 定时器回调函数。
		*@param args 回调参数。
		*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		*/
		__proto.loop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this._create(false,true,delay,caller,method,args,coverBefore);
		}

		/**
		*定时执行一次(基于帧率)。
		*@param delay 延迟几帧(单位为帧)。
		*@param caller 执行域(this)。
		*@param method 定时器回调函数。
		*@param args 回调参数。
		*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		*/
		__proto.frameOnce=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this._create(true,false,delay,caller,method,args,coverBefore);
		}

		/**
		*定时重复执行(基于帧率)。
		*@param delay 间隔几帧(单位为帧)。
		*@param caller 执行域(this)。
		*@param method 定时器回调函数。
		*@param args 回调参数。
		*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
		*/
		__proto.frameLoop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this._create(true,true,delay,caller,method,args,coverBefore);
		}

		/**返回统计信息。*/
		__proto.toString=function(){
			return "callLater:"+this._laters.length+" handlers:"+this._handlers.length+" pool:"+Timer._pool.length;
		}

		/**
		*清理定时器。
		*@param caller 执行域(this)。
		*@param method 定时器回调函数。
		*/
		__proto.clear=function(caller,method){
			var handler=this._getHandler(caller,method);
			if (handler){
				this._map[handler.key]=null;handler.key=0;
				handler.clear();
			}
		}

		/**
		*清理对象身上的所有定时器。
		*@param caller 执行域(this)。
		*/
		__proto.clearAll=function(caller){
			for (var i=0,n=this._handlers.length;i < n;i++){
				var handler=this._handlers[i];
				if (handler.caller===caller){
					this._map[handler.key]=null;handler.key=0;
					handler.clear();
				}
			}
		}

		/**@private */
		__proto._getHandler=function(caller,method){
			var cid=caller ? caller.$_GID || (caller.$_GID=Utils.getGID()):0;
			var mid=method.$_TID || (method.$_TID=(this._mid++)*100000);
			return this._map[cid+mid];
		}

		/**
		*延迟执行。
		*@param caller 执行域(this)。
		*@param method 定时器回调函数。
		*@param args 回调参数。
		*/
		__proto.callLater=function(caller,method,args){
			if (this._getHandler(caller,method)==null){
				if (Timer._pool.length)
					var handler=Timer._pool.pop();
				else handler=new TimerHandler();
				handler.caller=caller;
				handler.method=method;
				handler.args=args;
				this._indexHandler(handler);
				this._laters.push(handler);
			}
		}

		/**
		*立即执行 callLater 。
		*@param caller 执行域(this)。
		*@param method 定时器回调函数。
		*/
		__proto.runCallLater=function(caller,method){
			var handler=this._getHandler(caller,method);
			if (handler && handler.method !=null){
				this._map[handler.key]=null;
				handler.run(true);
			}
		}

		/**
		*两帧之间的时间间隔,单位毫秒。
		*/
		__getset(0,__proto,'delta',function(){
			return this._delta;
		});

		Timer._pool=[];
		Timer.__init$=function(){
			/**@private */
			//class TimerHandler
			TimerHandler=(function(){
				function TimerHandler(){
					this.key=0;
					this.repeat=false;
					this.delay=0;
					this.userFrame=false;
					this.exeTime=0;
					this.caller=null;
					this.method=null;
					this.args=null;
				}
				__class(TimerHandler,'');
				var __proto=TimerHandler.prototype;
				__proto.clear=function(){
					this.caller=null;
					this.method=null;
					this.args=null;
				}
				__proto.run=function(widthClear){
					var caller=this.caller;
					if (caller && caller.destroyed)return this.clear();
					var method=this.method;
					var args=this.args;
					widthClear && this.clear();
					if (method==null)return;
					args ? method.apply(caller,args):method.call(caller);
				}
				return TimerHandler;
			})()
		}

		return Timer;
	})()


	/**
	*<code>Tween</code> 是一个缓动类。使用实现目标对象属性的渐变。
	*/
	//class laya.utils.Tween
	var Tween=(function(){
		function Tween(){
			//this._complete=null;
			//this._target=null;
			//this._ease=null;
			//this._props=null;
			//this._duration=0;
			//this._delay=0;
			//this._startTimer=0;
			//this._usedTimer=0;
			//this._usedPool=false;
			this.gid=0;
			//this.update=null;
		}

		__class(Tween,'laya.utils.Tween');
		var __proto=Tween.prototype;
		/**
		*缓动对象的props属性到目标值。
		*@param target 目标对象(即将更改属性值的对象)。
		*@param props 变化的属性列表，比如{x:100,y:20}。
		*@param duration 花费的时间，单位毫秒。
		*@param ease 缓动类型，默认为匀速运动。
		*@param complete 结束回调函数。
		*@param delay 延迟执行时间。
		*@param coverBefore 是否覆盖之前的缓动。
		*@return 返回Tween对象。
		*/
		__proto.to=function(target,props,duration,ease,complete,delay,coverBefore){
			(delay===void 0)&& (delay=0);
			(coverBefore===void 0)&& (coverBefore=false);
			return this._create(target,props,duration,ease,complete,delay,coverBefore,true,false,true);
		}

		/**
		*从props属性，缓动到当前状态。
		*@param target 目标对象(即将更改属性值的对象)。
		*@param props 变化的属性列表，比如{x:100,y:20}。
		*@param duration 花费的时间，单位毫秒。
		*@param ease 缓动类型，默认为匀速运动。
		*@param complete 结束回调函数。
		*@param delay 延迟执行时间。
		*@param coverBefore 是否覆盖之前的缓动。
		*@return 返回Tween对象。
		*/
		__proto.from=function(target,props,duration,ease,complete,delay,coverBefore){
			(delay===void 0)&& (delay=0);
			(coverBefore===void 0)&& (coverBefore=false);
			return this._create(target,props,duration,ease,complete,delay,coverBefore,false,false,true);
		}

		/**@private */
		__proto._create=function(target,props,duration,ease,complete,delay,coverBefore,isTo,usePool,runNow){
			if (!target)throw new Error("Tween:target is null");
			this._target=target;
			this._duration=duration||props.duration||0;
			this._ease=ease || props.ease || Tween.easeNone;
			this._complete=complete || props.complete;
			this._delay=delay;
			this._props=[];
			this._usedTimer=0;
			this._startTimer=Browser.now();
			this._usedPool=usePool;
			this.update=props.update;
			var gid=(target.$_GID || (target.$_GID=Utils.getGID()));
			if (!Tween.tweenMap[gid]){
				Tween.tweenMap[gid]=[this];
				}else {
				if (coverBefore)Tween.clearTween(target);
				Tween.tweenMap[gid].push(this);
			}
			if (runNow){
				if (delay <=0)this.firstStart(target,props,isTo);
				else Laya.timer.once(delay,this,this.firstStart,[target,props,isTo]);
				}else {
				this._initProps(target,props,isTo);
			}
			return this;
		}

		__proto.firstStart=function(target,props,isTo){
			this._initProps(target,props,isTo);
			this._beginLoop();
		}

		__proto._initProps=function(target,props,isTo){
			for (var p in props){
				if ((typeof (target[p])=='number')){
					var start=isTo ? target[p] :props[p];
					var end=isTo ? props[p] :target[p];
					this._props.push([p,start,end-start]);
				}
			}
		}

		__proto._beginLoop=function(){
			Laya.timer.frameLoop(1,this,this._doEase);
		}

		/**执行缓动**/
		__proto._doEase=function(){
			this._updateEase(Browser.now());
		}

		/**@private */
		__proto._updateEase=function(time){
			var target=this._target;
			if (target.destroyed)return Tween.clearTween(target);
			var usedTimer=this._usedTimer=time-this._startTimer-this._delay;
			if (usedTimer < 0)return;
			if (usedTimer >=this._duration)return this.complete();
			var ratio=usedTimer > 0 ? this._ease(usedTimer,0,1,this._duration):0;
			var props=this._props;
			for (var i=0,n=props.length;i < n;i++){
				var prop=props[i];
				target[prop[0]]=prop[1]+(ratio *prop[2]);
			}
			if (this.update)this.update.run();
		}

		/**
		*立即结束缓动并到终点。
		*/
		__proto.complete=function(){
			if (!this._target)return;
			var target=this._target;
			var props=this._props;
			var handler=this._complete;
			for (var i=0,n=props.length;i < n;i++){
				var prop=props[i];
				target[prop[0]]=prop[1]+prop[2];
			}
			if (this.update)this.update.run();
			this.clear();
			handler && handler.run();
		}

		/**
		*暂停缓动，可以通过resume或restart重新开始。
		*/
		__proto.pause=function(){
			Laya.timer.clear(this,this._beginLoop);
			Laya.timer.clear(this,this._doEase);
		}

		/**
		*设置开始时间。
		*@param startTime 开始时间。
		*/
		__proto.setStartTime=function(startTime){
			this._startTimer=startTime;
		}

		/**
		*停止并清理当前缓动。
		*/
		__proto.clear=function(){
			if (this._target){
				this._remove();
				this._clear();
			}
		}

		/**
		*@private
		*/
		__proto._clear=function(){
			this.pause();
			Laya.timer.clear(this,this.firstStart);
			this._complete=null;
			this._target=null;
			this._ease=null;
			this._props=null;
			if (this._usedPool){
				this.update=null;
				Pool.recover("tween",this);
			}
		}

		/**回收到对象池。*/
		__proto.recover=function(){
			this._usedPool=true;
			this._clear();
		}

		__proto._remove=function(){
			var tweens=Tween.tweenMap[this._target.$_GID];
			if (tweens){
				for (var i=0,n=tweens.length;i < n;i++){
					if (tweens[i]===this){
						tweens.splice(i,1);
						break ;
					}
				}
			}
		}

		/**
		*重新开始暂停的缓动。
		*/
		__proto.restart=function(){
			this.pause();
			this._usedTimer=0;
			this._startTimer=Browser.now();
			var props=this._props;
			for (var i=0,n=props.length;i < n;i++){
				var prop=props[i];
				this._target[prop[0]]=prop[1];
			}
			Laya.timer.once(this._delay,this,this._beginLoop);
		}

		/**
		*恢复暂停的缓动。
		*/
		__proto.resume=function(){
			if (this._usedTimer >=this._duration)return;
			this._startTimer=Browser.now()-this._usedTimer-this._delay;
			this._beginLoop();
		}

		/**设置当前执行比例**/
		__getset(0,__proto,'progress',null,function(v){
			var uTime=v*this._duration;
			this._startTimer=Browser.now()-this._delay-uTime;
		});

		Tween.to=function(target,props,duration,ease,complete,delay,coverBefore,autoRecover){
			(delay===void 0)&& (delay=0);
			(coverBefore===void 0)&& (coverBefore=false);
			(autoRecover===void 0)&& (autoRecover=true);
			return Pool.getItemByClass("tween",Tween)._create(target,props,duration,ease,complete,delay,coverBefore,true,autoRecover,true);
		}

		Tween.from=function(target,props,duration,ease,complete,delay,coverBefore,autoRecover){
			(delay===void 0)&& (delay=0);
			(coverBefore===void 0)&& (coverBefore=false);
			(autoRecover===void 0)&& (autoRecover=true);
			return Pool.getItemByClass("tween",Tween)._create(target,props,duration,ease,complete,delay,coverBefore,false,autoRecover,true);
		}

		Tween.clearAll=function(target){
			if (!target || !target.$_GID)return;
			var tweens=Tween.tweenMap[target.$_GID];
			if (tweens){
				for (var i=0,n=tweens.length;i < n;i++){
					tweens[i]._clear();
				}
				tweens.length=0;
			}
		}

		Tween.clear=function(tween){
			tween.clear();
		}

		Tween.clearTween=function(target){
			Tween.clearAll(target);
		}

		Tween.easeNone=function(t,b,c,d){
			return c *t / d+b;
		}

		Tween.tweenMap={};
		return Tween;
	})()


	/**
	*<code>Utils</code> 是工具类。
	*/
	//class laya.utils.Utils
	var Utils=(function(){
		function Utils(){};
		__class(Utils,'laya.utils.Utils');
		Utils.toRadian=function(angle){
			return angle *Utils._pi2;
		}

		Utils.toAngle=function(radian){
			return radian *Utils._pi;
		}

		Utils.toHexColor=function(color){
			if (color < 0 || isNaN(color))return null;
			var str=color.toString(16);
			while (str.length < 6)str="0"+str;
			return "#"+str;
		}

		Utils.getGID=function(){
			return Utils._gid++;
		}

		Utils.concatArray=function(source,array){
			if (!array)return source;
			if (!source)return array;
			var i=0,len=array.length;
			for (i=0;i < len;i++){
				source.push(array[i]);
			}
			return source;
		}

		Utils.clearArray=function(array){
			if (!array)return array;
			array.length=0;
			return array;
		}

		Utils.copyArray=function(source,array){
			source || (source=[]);
			if (!array)return source;
			source.length=array.length;
			var i=0,len=array.length;
			for (i=0;i < len;i++){
				source[i]=array[i];
			}
			return source;
		}

		Utils.getGlobalRecByPoints=function(sprite,x0,y0,x1,y1){
			var newLTPoint;
			newLTPoint=new Point(x0,y0);
			newLTPoint=sprite.localToGlobal(newLTPoint);
			var newRBPoint;
			newRBPoint=new Point(x1,y1);
			newRBPoint=sprite.localToGlobal(newRBPoint);
			return Rectangle._getWrapRec([newLTPoint.x,newLTPoint.y,newRBPoint.x,newRBPoint.y]);
		}

		Utils.getGlobalPosAndScale=function(sprite){
			return Utils.getGlobalRecByPoints(sprite,0,0,1,1);
		}

		Utils.bind=function(fun,scope){
			var rst=fun;
			/*__JS__ */rst=fun.bind(scope);;
			return rst;
		}

		Utils.measureText=function(txt,font){
			return RunDriver.measureText(txt,font);
		}

		Utils.updateOrder=function(childs){
			if ((!childs)|| childs.length < 2)return false;
			var c=childs[0];
			var i=1,sz=childs.length;
			var z=c._zOrder,low=NaN,high=NaN,mid=NaN,zz=NaN;
			var repaint=false;
			for (i=1;i < sz;i++){
				c=childs [i];
				if (!c)continue ;
				if ((z=c._zOrder)< 0)z=c._zOrder;
				if (z < childs[i-1]._zOrder){
					mid=low=0;
					high=i-1;
					while (low <=high){
						mid=(low+high)>>> 1;
						if (!childs[mid])break ;
						zz=childs[mid]._zOrder;
						if (zz < 0)zz=childs[mid]._zOrder;
						if (zz < z)
							low=mid+1;
						else if (zz > z)
						high=mid-1;
						else break ;
					}
					if (z > childs[mid]._zOrder)mid++;
					var f=c.parent;
					childs.splice(i,1);
					childs.splice(mid,0,c);
					if (f && f.model){
						f.model&&f.model.removeChild(c.model);
						f.model && f.model.addChildAt(c.model,mid);
					}
					repaint=true;
				}
			}
			return repaint;
		}

		Utils.transPointList=function(points,x,y){
			var i=0,len=points.length;
			for (i=0;i < len;i+=2){
				points[i]+=x;
				points[i+1]+=y;
			}
		}

		Utils.parseInt=function(str,radix){
			(radix===void 0)&& (radix=0);
			var result=Browser.window.parseInt(str,radix);
			if (isNaN(result))return 0;
			return result;
		}

		Utils._gid=1;
		Utils._pi=180 / Math.PI;
		Utils._pi2=Math.PI / 180;
		Utils.parseXMLFromString=function(value){
			var rst;
			value=value.replace(/>\s+</g,'><');
			/*__JS__ */rst=(new DOMParser()).parseFromString(value,'text/xml');
			if (rst.firstChild.textContent.indexOf("This page contains the following errors")>-1){
				throw new Error(rst.firstChild.firstChild.textContent);
			}
			return rst;
		}

		return Utils;
	})()


	/**
	*@private
	*/
	//class laya.utils.VectorGraphManager
	var VectorGraphManager=(function(){
		function VectorGraphManager(){
			this.useDic={};
			this.shapeDic={};
			this.shapeLineDic={};
			this._id=0;
			this._checkKey=false;
			this._freeIdArray=[];
			if (Render.isWebGL){
				CacheManger.regCacheByFunction(Utils.bind(this.startDispose,this),Utils.bind(this.getCacheList,this));
			}
		}

		__class(VectorGraphManager,'laya.utils.VectorGraphManager');
		var __proto=VectorGraphManager.prototype;
		/**
		*得到个空闲的ID
		*@return
		*/
		__proto.getId=function(){
			return this._id++;
		}

		/**
		*添加一个图形到列表中
		*@param id
		*@param shape
		*/
		__proto.addShape=function(id,shape){
			this.shapeDic[id]=shape;
			if (!this.useDic[id]){
				this.useDic[id]=true;
			}
		}

		/**
		*添加一个线图形到列表中
		*@param id
		*@param Line
		*/
		__proto.addLine=function(id,Line){
			this.shapeLineDic[id]=Line;
			if (!this.shapeLineDic[id]){
				this.shapeLineDic[id]=true;
			}
		}

		/**
		*检测一个对象是否在使用中
		*@param id
		*/
		__proto.getShape=function(id){
			if (this._checkKey){
				if (this.useDic[id] !=null){
					this.useDic[id]=true;
				}
			}
		}

		/**
		*删除一个图形对象
		*@param id
		*/
		__proto.deleteShape=function(id){
			if (this.shapeDic[id]){
				this.shapeDic[id]=null;
				delete this.shapeDic[id];
			}
			if (this.shapeLineDic[id]){
				this.shapeLineDic[id]=null;
				delete this.shapeLineDic[id];
			}
			if (this.useDic[id] !=null){
				delete this.useDic[id];
			}
		}

		/**
		*得到缓存列表
		*@return
		*/
		__proto.getCacheList=function(){
			var str;
			var list=[];
			for (str in this.shapeDic){
				list.push(this.shapeDic[str]);
			}
			for (str in this.shapeLineDic){
				list.push(this.shapeLineDic[str]);
			}
			return list;
		}

		/**
		*开始清理状态，准备销毁
		*/
		__proto.startDispose=function(key){
			var str;
			for (str in this.useDic){
				this.useDic[str]=false;
			}
			this._checkKey=true;
		}

		/**
		*确认销毁
		*/
		__proto.endDispose=function(){
			if (this._checkKey){
				var str;
				for (str in this.useDic){
					if (!this.useDic[str]){
						this.deleteShape(str);
					}
				}
				this._checkKey=false;
			}
		}

		VectorGraphManager.getInstance=function(){
			return VectorGraphManager.instance=VectorGraphManager.instance|| new VectorGraphManager();
		}

		VectorGraphManager.instance=null
		return VectorGraphManager;
	})()


	/**
	*@private
	*/
	//class laya.utils.WordText
	var WordText=(function(){
		function WordText(){
			this.id=NaN;
			this.save=[];
			this.toUpperCase=null;
			this.changed=false;
			this._text=null;
		}

		__class(WordText,'laya.utils.WordText');
		var __proto=WordText.prototype;
		__proto.setText=function(txt){
			this.changed=true;
			this._text=txt;
		}

		__proto.toString=function(){
			return this._text;
		}

		__proto.charCodeAt=function(i){
			return this._text ? this._text.charCodeAt(i):NaN;
		}

		__proto.charAt=function(i){
			return this._text ? this._text.charAt(i):null;
		}

		__getset(0,__proto,'length',function(){
			return this._text ? this._text.length :0;
		});

		return WordText;
	})()


	/**
	*<code>LayoutStyle</code> 是一个布局样式类。
	*/
	//class laya.ui.LayoutStyle
	var LayoutStyle=(function(){
		function LayoutStyle(){
			this.enable=false;
			this.top=NaN;
			this.bottom=NaN;
			this.left=NaN;
			this.right=NaN;
			this.centerX=NaN;
			this.centerY=NaN;
			this.anchorX=NaN;
			this.anchorY=NaN;
		}

		__class(LayoutStyle,'laya.ui.LayoutStyle');
		__static(LayoutStyle,
		['EMPTY',function(){return this.EMPTY=new LayoutStyle();}
		]);
		return LayoutStyle;
	})()


	/**
	*<code>Styles</code> 定义了组件常用的样式属性。
	*/
	//class laya.ui.Styles
	var Styles=(function(){
		function Styles(){};
		__class(Styles,'laya.ui.Styles');
		Styles.labelColor="#000000";
		Styles.buttonStateNum=3;
		Styles.scrollBarMinNum=15;
		Styles.scrollBarDelayTime=500;
		__static(Styles,
		['defaultSizeGrid',function(){return this.defaultSizeGrid=[4,4,4,4,0];},'labelPadding',function(){return this.labelPadding=[2,2,2,2];},'inputLabelPadding',function(){return this.inputLabelPadding=[1,1,1,3];},'buttonLabelColors',function(){return this.buttonLabelColors=["#32556b","#32cc6b","#ff0000","#C0C0C0"];},'comboBoxItemColors',function(){return this.comboBoxItemColors=["#5e95b6","#ffffff","#000000","#8fa4b1","#ffffff"];}
		]);
		return Styles;
	})()


	/**
	*<code>UIUtils</code> 是文本工具集。
	*/
	//class laya.ui.UIUtils
	var UIUtils=(function(){
		function UIUtils(){};
		__class(UIUtils,'laya.ui.UIUtils');
		UIUtils.fillArray=function(arr,str,type){
			var temp=arr.concat();
			if (str){
				var a=str.split(",");
				for (var i=0,n=Math.min(temp.length,a.length);i < n;i++){
					var value=a[i];
					temp[i]=(value=="true" ? true :(value=="false" ? false :value));
					if (type !=null)temp[i]=type(value);
				}
			}
			return temp;
		}

		UIUtils.toColor=function(color){
			var str=color.toString("16");
			while (str.length < 6)str="0"+str;
			return "#"+str;
		}

		UIUtils.gray=function(traget,isGray){
			(isGray===void 0)&& (isGray=true);
			if (isGray){
				UIUtils.addFilter(traget,UIUtils.grayFilter);
				}else {
				UIUtils.clearFilter(traget,ColorFilter);
			}
		}

		UIUtils.addFilter=function(target,filter){
			var filters=target.filters || [];
			filters.push(filter);
			target.filters=filters;
		}

		UIUtils.clearFilter=function(target,filterType){
			var filters=target.filters;
			if (filters !=null && filters.length > 0){
				for (var i=filters.length-1;i >-1;i--){
					var filter=filters[i];
					if (Laya.__typeof(filter,filterType))filters.splice(i,1);
				}
				target.filters=filters;
			}
		}

		__static(UIUtils,
		['grayFilter',function(){return this.grayFilter=new ColorFilter([0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0,0,0,1,0]);}
		]);
		return UIUtils;
	})()


	/**全局配置*/
	//class UIConfig
	var UIConfig=(function(){
		function UIConfig(){};
		__class(UIConfig,'UIConfig');
		UIConfig.touchScrollEnable=true;
		UIConfig.mouseWheelEnable=true;
		UIConfig.showButtons=true;
		UIConfig.popupBgColor="#000000";
		UIConfig.popupBgAlpha=0.5;
		return UIConfig;
	})()


	/**
	*IDE事件类
	*使用方式：Notice.notify(IDEEvent.ADD_PAGE);
	*/
	//class laya.ide.event.IDEEvent
	var IDEEvent=(function(){
		function IDEEvent(){};
		__class(IDEEvent,'laya.ide.event.IDEEvent');
		IDEEvent.OPEN_ADDPARTICLE="";
		IDEEvent.ADD_PARTICLE="";
		IDEEvent.OPEN_ADDPAGE="";
		IDEEvent.ADD_PAGE="";
		IDEEvent.ADD_SCRIPT="";
		IDEEvent.OPEN_ADD_TIMELINE_ANIMATION="";
		IDEEvent.ADD_TIMELINE_ANIMATION="";
		IDEEvent.CLOSE_PAGE="";
		IDEEvent.OPEN_PAGE="";
		IDEEvent.FOCUS_DESIGN="";
		IDEEvent.FRESH_RES="";
		IDEEvent.FRESH_PAGE="";
		IDEEvent.FRESH_CURVIEW="";
		IDEEvent.OPEN_ADDDIR="";
		IDEEvent.ADD_DIR="";
		IDEEvent.OPEN_MOVEPAGE="";
		IDEEvent.OPEN_BASICSPANEL="";
		IDEEvent.MOVE_PAGE="";
		IDEEvent.OPEN_RENAME="";
		IDEEvent.RENAME_PAGE="";
		IDEEvent.OPEN_SETPAGEPROP="";
		IDEEvent.PROPPANEL_SETBYOBJ="";
		IDEEvent.PROP_CHANGE="";
		IDEEvent.PROP_CHANGED="";
		IDEEvent.CUTOFF_PREFAB="";
		IDEEvent.DROP_RENDER="";
		IDEEvent.PAGE_CHANGED="";
		IDEEvent.RESFILE_CHANGE="";
		IDEEvent.DISPLAY_SELECTED="";
		IDEEvent.DISPLAY_MULTISELECTED="";
		IDEEvent.SELECT_CHANGED="";
		IDEEvent.DISPLAY_ENTER="";
		IDEEvent.DELETE_SELECTED="";
		IDEEvent.ADD_NODE="";
		IDEEvent.DISPLAY_TREE_CHANGE="";
		IDEEvent.TIMELINE_FRAME_SELECTED="";
		IDEEvent.CLEAR_DESIGN_SELECT="";
		IDEEvent.TIMELINE_CHANGED="";
		IDEEvent.FRESH_ANIMATIONDATA="";
		IDEEvent.ADD_ANIMATIONNODE="";
		IDEEvent.PLAYCONTROL_TOBEGINPOS="";
		IDEEvent.PLAYCONTROL_PRE="";
		IDEEvent.PLAYCONTROL_PLAY="";
		IDEEvent.PLAYCONTROL_NEXT="";
		IDEEvent.PLAYCONTROL_TOENDPOS="";
		IDEEvent.PLAYCONTROL_STOP="";
		IDEEvent.PLAYCONTROL_SWITCHPLAY="";
		IDEEvent.FRESH_COMPPANEL="";
		IDEEvent.SHOW_RULE_RANGE="";
		IDEEvent.CLEAR_RULE_RANGE="";
		IDEEvent.RULE_SHOW_CHANGE="";
		IDEEvent.OPEN_LANGPANEL="";
		IDEEvent.OPEN_IDESETTING="";
		IDEEvent.SELECT_RES_FILE="";
		return IDEEvent;
	})()


	/**
	*文件管理类
	*/
	//class laya.ide.managers.FileManager
	var FileManager=(function(){
		function FileManager(){};
		__class(FileManager,'laya.ide.managers.FileManager');
		FileManager.getPath=function(basePath,relativePath){
			return "";
		}

		FileManager.getRelativePath=function(basePath,targetPath){
			return "";
		}

		FileManager.createDirectory=function(path){}
		FileManager.createTxtFile=function(path,value){}
		FileManager.createJSONFile=function(path,value){}
		FileManager.removeFile=function(path){}
		FileManager.copyFile=function(from,to){}
		FileManager.readTxtFile=function(path,errorAlert){
			(errorAlert===void 0)&& (errorAlert=true);
			return null;
		}

		FileManager.readJSONFile=function(path,errorAlert){
			(errorAlert===void 0)&& (errorAlert=true);
			return null;
		}

		FileManager.getFileList=function(path){
			return null
		}

		FileManager.exists=function(path){
			return false;
		}

		return FileManager;
	})()


	/**
	*IDE API函数
	*/
	//class laya.ide.managers.IDEAPIS
	var IDEAPIS=(function(){
		function IDEAPIS(){};
		__class(IDEAPIS,'laya.ide.managers.IDEAPIS');
		/**
		*资源文件存放的目录
		*/
		__getset(1,IDEAPIS,'assetsPath',function(){
			return null;
		});

		/**
		*当前工作目录
		*/
		__getset(1,IDEAPIS,'workPath',function(){
			return null;
		});

		/**
		*导出图集资源的目录
		*/
		__getset(1,IDEAPIS,'resExportPath',function(){
			return null;
		});

		/**
		*页面文件存放目录
		*/
		__getset(1,IDEAPIS,'pagesPath',function(){
			return null;
		});

		/**
		*导出代码的目录
		*/
		__getset(1,IDEAPIS,'codeExportPath',function(){
			return null;
		});

		/**
		*导出非图集资源的目录
		*/
		__getset(1,IDEAPIS,'asynResExportPath',function(){
			return null;
		});

		IDEAPIS.nodeChange=function(nodeData,changeProps,refresh){
			(refresh===void 0)&& (refresh=false);
		}

		IDEAPIS.getSelectComps=function(){
			return null;
		}

		IDEAPIS.getCurPagePath=function(){
			return null;
		}

		IDEAPIS.getCurPageType=function(){
			return null;
		}

		IDEAPIS.getDesignData=function(){
			return null;
		}

		return IDEAPIS;
	})()


	/**
	*编辑器资源管理器，用来替换实际组件的资源管理
	*/
	//class laya.ide.managers.ResFileManager
	var ResFileManager=(function(){
		function ResFileManager(){};
		__class(ResFileManager,'laya.ide.managers.ResFileManager');
		ResFileManager.clearRes=function(url){}
		ResFileManager.getRes=function(url){
			return null;
		}

		ResFileManager.hasRes=function(url){
			return false;
		}

		ResFileManager.cacheRes=function(url,data){}
		ResFileManager.adptToCommonUrl=function(url){
			return "";
		}

		ResFileManager.getIDEResPath=function(url){
			return "";
		}

		ResFileManager.getIDEPagePath=function(url){
			return "";
		}

		ResFileManager.getIDECompIconPath=function(iconSign){
			return "";
		}

		ResFileManager.basePath="";
		return ResFileManager;
	})()


	/**
	*<code>Node</code> 类用于创建节点对象，节点是最基本的元素。
	*/
	//class laya.display.Node extends laya.events.EventDispatcher
	var Node=(function(_super){
		function Node(){
			this.name="";
			this.destroyed=false;
			this._displayedInStage=false;
			this._parent=null;
			this.model=null;
			Node.__super.call(this);
			this._childs=Node.ARRAY_EMPTY;
			this.timer=Laya.timer;
			this._$P=Node.PROP_EMPTY;
			this.model=Render.isConchNode ? /*__JS__ */new ConchNode():null;
		}

		__class(Node,'laya.display.Node',_super);
		var __proto=Node.prototype;
		/**
		*<p>销毁此对象。</p>
		*@param destroyChild 是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
		*/
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			this.destroyed=true;
			this._parent && this._parent.removeChild(this);
			if (this._childs){
				if (destroyChild)this.destroyChildren();
				else this.removeChildren();
			}
			this._childs=null;
			this._$P=null;
			this.offAll();
		}

		/**
		*销毁所有子对象，不销毁自己本身。
		*/
		__proto.destroyChildren=function(){
			if (this._childs){
				for (var i=this._childs.length-1;i >-1;i--){
					this._childs[i].destroy(true);
				}
			}
		}

		/**
		*添加子节点。
		*@param node 节点对象
		*@return 返回添加的节点
		*/
		__proto.addChild=function(node){
			if (node===this)return node;
			if (node._parent===this){
				this._childs.splice(this.getChildIndex(node),1);
				this._childs.push(node);
				if (this.model){
					this.model.removeChild(node.model);
					this.model.addChildAt(node.model,this._childs.length-1);
				}
				this._childChanged();
				}else {
				node.parent && node.parent.removeChild(node);
				this._childs===Node.ARRAY_EMPTY && (this._childs=[]);
				this._childs.push(node);
				this.model && this.model.addChildAt(node.model,this._childs.length-1);
				node.parent=this;
			}
			return node;
		}

		/**
		*批量增加子节点
		*@param ...args 无数子节点。
		*/
		__proto.addChildren=function(__args){
			var args=arguments;
			var i=0,n=args.length;
			while (i < n){
				this.addChild(args[i++]);
			}
		}

		/**
		*添加子节点到指定的索引位置。
		*@param node 节点对象。
		*@param index 索引位置。
		*@return 返回添加的节点。
		*/
		__proto.addChildAt=function(node,index){
			if (node===this)return node;
			if (index >=0 && index <=this._childs.length){
				if (node._parent===this){
					var oldIndex=this.getChildIndex(node);
					this._childs.splice(oldIndex,1);
					this._childs.splice(index,0,node);
					if (this.model){
						this.model.removeChild(node.model);
						this.model.addChildAt(node.model,index);
					}
					this._childChanged();
					}else {
					node.parent && node.parent.removeChild(node);
					this._childs===Node.ARRAY_EMPTY && (this._childs=[]);
					this._childs.splice(index,0,node);
					this.model && this.model.addChildAt(node.model,index);
					node.parent=this;
				}
				return node;
				}else {
				throw new Error("appendChildAt:The index is out of bounds");
			}
		}

		/**
		*根据子节点对象，获取子节点的索引位置。
		*@param node 子节点。
		*@return 子节点所在的索引位置。
		*/
		__proto.getChildIndex=function(node){
			return this._childs.indexOf(node);
		}

		/**
		*根据子节点的名字，获取子节点对象。
		*@param name 子节点的名字。
		*@return 节点对象。
		*/
		__proto.getChildByName=function(name){
			var nodes=this._childs;
			for (var i=0,n=nodes.length;i < n;i++){
				var node=nodes[i];
				if (node.name===name)return node;
			}
			return null;
		}

		/**@private */
		__proto._get$P=function(key){
			return this._$P[key];
		}

		/**@private */
		__proto._set$P=function(key,value){
			this._$P===Node.PROP_EMPTY && (this._$P={});
			this._$P[key]=value;
			return value;
		}

		/**
		*根据子节点的索引位置，获取子节点对象。
		*@param index 索引位置
		*@return 子节点
		*/
		__proto.getChildAt=function(index){
			return this._childs[index];
		}

		/**
		*设置子节点的索引位置。
		*@param node 子节点。
		*@param index 新的索引。
		*@return 返回子节点本身。
		*/
		__proto.setChildIndex=function(node,index){
			var childs=this._childs;
			if (index < 0 || index >=childs.length){
				throw new Error("setChildIndex:The index is out of bounds.");
			};
			var oldIndex=this.getChildIndex(node);
			if (oldIndex < 0)throw new Error("setChildIndex:node is must child of this object.");
			childs.splice(oldIndex,1);
			childs.splice(index,0,node);
			if (this.model){
				this.model.removeChild(node.model);
				this.model.addChildAt(node.model,index);
			}
			this._childChanged();
			return node;
		}

		/**
		*@private
		*子节点发生改变。
		*@param child 子节点。
		*/
		__proto._childChanged=function(child){}
		/**
		*删除子节点。
		*@param node 子节点
		*@return 被删除的节点
		*/
		__proto.removeChild=function(node){
			if (!this._childs)return node;
			var index=this._childs.indexOf(node);
			return this.removeChildAt(index);
		}

		/**
		*从父容器删除自己，如已经被删除不会抛出异常。
		*@return 当前节点（ Node ）对象。
		*/
		__proto.removeSelf=function(){
			this._parent && this._parent.removeChild(this);
			return this;
		}

		/**
		*根据子节点名字删除对应的子节点对象，如果找不到不会抛出异常。
		*@param name 对象名字。
		*@return 查找到的节点（ Node ）对象。
		*/
		__proto.removeChildByName=function(name){
			var node=this.getChildByName(name);
			node && this.removeChild(node);
			return node;
		}

		/**
		*根据子节点索引位置，删除对应的子节点对象。
		*@param index 节点索引位置。
		*@return 被删除的节点。
		*/
		__proto.removeChildAt=function(index){
			var node=this.getChildAt(index);
			if (node){
				this._childs.splice(index,1);
				this.model && this.model.removeChild(node.model);
				node.parent=null;
			}
			return node;
		}

		/**
		*删除指定索引区间的所有子对象。
		*@param beginIndex 开始索引。
		*@param endIndex 结束索引。
		*@return 当前节点对象。
		*/
		__proto.removeChildren=function(beginIndex,endIndex){
			(beginIndex===void 0)&& (beginIndex=0);
			(endIndex===void 0)&& (endIndex=0x7fffffff);
			if (this._childs.length > 0){
				var childs=this._childs;
				if (beginIndex===0 && endIndex >=n){
					var arr=childs;
					this._childs=Node.ARRAY_EMPTY;
					}else {
					arr=childs.splice(beginIndex,endIndex-beginIndex);
				}
				for (var i=0,n=arr.length;i < n;i++){
					arr[i].parent=null;
					this.model && this.model.removeChild(arr[i].model);
				}
			}
			return this;
		}

		/**
		*替换子节点。
		*@internal 将传入的新节点对象替换到已有子节点索引位置处。
		*@param newNode 新节点。
		*@param oldNode 老节点。
		*@return 返回新节点。
		*/
		__proto.replaceChild=function(newNode,oldNode){
			var index=this._childs.indexOf(oldNode);
			if (index >-1){
				this._childs.splice(index,1,newNode);
				if (this.model){
					this.model.removeChild(oldNode.model);
					this.model.addChildAt(newNode.model,index);
				}
				oldNode.parent=null;
				newNode.parent=this;
				return newNode;
			}
			return null;
		}

		/**@private */
		__proto._setDisplay=function(value){
			if (this._displayedInStage!==value){
				this._displayedInStage=value;
				if (value)this.event(/*laya.events.Event.DISPLAY*/"display");
				else this.event(/*laya.events.Event.UNDISPLAY*/"undisplay");
			}
		}

		/**
		*@private
		*设置指定节点对象是否可见(是否在渲染列表中)。
		*@param node 节点。
		*@param display 是否可见。
		*/
		__proto._displayChild=function(node,display){
			var childs=node._childs;
			if (childs){
				for (var i=childs.length-1;i >-1;i--){
					var child=childs[i];
					child._setDisplay(display);
					child._childs.length && this._displayChild(child,display);
				}
			}
			node._setDisplay(display);
		}

		/**
		*当前容器是否包含 <code>node</code> 节点。
		*@param node 某一个节点 <code>Node</code>。
		*@return 一个布尔值表示是否包含<code>node</code>节点。
		*/
		__proto.contains=function(node){
			if (node===this)return true;
			while (node){
				if (node.parent===this)return true;
				node=node.parent;
			}
			return false;
		}

		/**
		*定时重复执行某函数。
		*@param delay 间隔时间(单位毫秒)。
		*@param caller 执行域(this)。
		*@param method 结束时的回调方法。
		*@param args 回调参数。
		*@param coverBefore 是否覆盖之前的延迟执行，默认为true。
		*/
		__proto.timerLoop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this.timer._create(false,true,delay,caller,method,args,coverBefore);
		}

		/**
		*定时执行某函数一次。
		*@param delay 延迟时间(单位毫秒)。
		*@param caller 执行域(this)。
		*@param method 结束时的回调方法。
		*@param args 回调参数。
		*@param coverBefore 是否覆盖之前的延迟执行，默认为true。
		*/
		__proto.timerOnce=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this.timer._create(false,false,delay,caller,method,args,coverBefore);
		}

		/**
		*定时重复执行某函数(基于帧率)。
		*@param delay 间隔几帧(单位为帧)。
		*@param caller 执行域(this)。
		*@param method 结束时的回调方法。
		*@param args 回调参数。
		*@param coverBefore 是否覆盖之前的延迟执行，默认为true。
		*/
		__proto.frameLoop=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this.timer._create(true,true,delay,caller,method,args,coverBefore);
		}

		/**
		*定时执行一次某函数(基于帧率)。
		*@param delay 延迟几帧(单位为帧)。
		*@param caller 执行域(this)
		*@param method 结束时的回调方法
		*@param args 回调参数
		*@param coverBefore 是否覆盖之前的延迟执行，默认为true
		*/
		__proto.frameOnce=function(delay,caller,method,args,coverBefore){
			(coverBefore===void 0)&& (coverBefore=true);
			this.timer._create(true,false,delay,caller,method,args,coverBefore);
		}

		/**
		*清理定时器。
		*@param caller 执行域(this)。
		*@param method 结束时的回调方法。
		*/
		__proto.clearTimer=function(caller,method){
			this.timer.clear(caller,method);
		}

		/**
		*子对象数量。
		*/
		__getset(0,__proto,'numChildren',function(){
			return this._childs.length;
		});

		/**父节点。*/
		__getset(0,__proto,'parent',function(){
			return this._parent;
			},function(value){
			if (this._parent!==value){
				if (value){
					this._parent=value;
					this.event(/*laya.events.Event.ADDED*/"added");
					value.displayedInStage && this._displayChild(this,true);
					value._childChanged(this);
					}else {
					this.event(/*laya.events.Event.REMOVED*/"removed");
					this._parent._childChanged();
					this._displayChild(this,false);
					this._parent=value;
				}
			}
		});

		/**表示是否在显示列表中显示。是否在显示渲染列表中。*/
		__getset(0,__proto,'displayedInStage',function(){
			return this._displayedInStage;
		});

		Node.ARRAY_EMPTY=[];
		Node.PROP_EMPTY={};
		return Node;
	})(EventDispatcher)


	/**
	*@private
	*<code>CSSStyle</code> 类是元素CSS样式定义类。
	*/
	//class laya.display.css.CSSStyle extends laya.display.css.Style
	var CSSStyle=(function(_super){
		function CSSStyle(ower){
			this._bgground=null;
			this._border=null;
			//this._ower=null;
			this._rect=null;
			this.lineHeight=0;
			CSSStyle.__super.call(this);
			this._padding=CSSStyle._PADDING;
			this._spacing=CSSStyle._SPACING;
			this._aligns=CSSStyle._ALIGNS;
			this._font=Font.EMPTY;
			this._ower=ower;
		}

		__class(CSSStyle,'laya.display.css.CSSStyle',_super);
		var __proto=CSSStyle.prototype;
		/**@inheritDoc */
		__proto.destroy=function(){
			this._ower=null;
			this._font=null;
			this._rect=null;
		}

		/**
		*复制传入的 CSSStyle 属性值。
		*@param src 待复制的 CSSStyle 对象。
		*/
		__proto.inherit=function(src){
			this._font=src._font;
			this._spacing=src._spacing===CSSStyle._SPACING ? CSSStyle._SPACING :src._spacing.slice();
			this.lineHeight=src.lineHeight;
		}

		/**@private */
		__proto._widthAuto=function(){
			return (this._type & 0x40000)!==0;
		}

		/**@inheritDoc */
		__proto.widthed=function(sprite){
			return (this._type & 0x8)!=0;
		}

		__proto._calculation=function(type,value){
			if (value.indexOf('%')< 0)return false;
			var ower=this._ower;
			var parent=ower.parent;
			var rect=this._rect;
			function getValue (pw,w,nums){
				return (pw *nums[0]+w *nums[1]+nums[2]);
			}
			function onParentResize (type){
				var pw=parent.width,w=ower.width;
				rect.width && (ower.width=getValue(pw,w,rect.width));
				rect.height && (ower.height=getValue(pw,w,rect.height));
				rect.left && (ower.x=getValue(pw,w,rect.left));
				rect.top && (ower.y=getValue(pw,w,rect.top));
			}
			if (rect===null){
				parent._getCSSStyle()._type |=0x80000;
				parent.on(/*laya.events.Event.RESIZE*/"resize",this,onParentResize);
				this._rect=rect={input:{}};
			};
			var nums=value.split(' ');
			nums[0]=parseFloat(nums[0])/ 100;
			if (nums.length==1)
				nums[1]=nums[2]=0;
			else {
				nums[1]=parseFloat(nums[1])/ 100;
				nums[2]=parseFloat(nums[2]);
			}
			rect[type]=nums;
			rect.input[type]=value;
			onParentResize(type);
			return true;
		}

		/**
		*是否已设置高度。
		*@param sprite 显示对象 Sprite。
		*@return 一个Boolean 表示是否已设置高度。
		*/
		__proto.heighted=function(sprite){
			return (this._type & 0x2000)!=0;
		}

		/**
		*设置宽高。
		*@param w 宽度。
		*@param h 高度。
		*/
		__proto.size=function(w,h){
			var ower=this._ower;
			var resize=false;
			if (w!==-1 && w !=this._ower.width){
				this._type |=0x8;
				this._ower.width=w;
				resize=true;
			}
			if (h!==-1 && h !=this._ower.height){
				this._type |=0x2000;
				this._ower.height=h;
				resize=true;
			}
			if (resize){
				ower._layoutLater();
				(this._type & 0x80000)&& ower.event(/*laya.events.Event.RESIZE*/"resize",this);
			}
		}

		/**@private */
		__proto._getAlign=function(){
			return this._aligns[0];
		}

		/**@private */
		__proto._getValign=function(){
			return this._aligns[1];
		}

		/**@private */
		__proto._getCssFloat=function(){
			return (this._type & 0x8000)!=0 ? 0x8000 :0;
		}

		__proto._createFont=function(){
			return (this._type & 0x1000)? this._font :(this._type |=0x1000,this._font=new Font(this._font));
		}

		/**@inheritDoc */
		__proto.render=function(sprite,context,x,y){
			var w=sprite.width;
			var h=sprite.height;
			x-=sprite.pivotX;
			y-=sprite.pivotY;
			this._bgground && this._bgground.color !=null && context.ctx.fillRect(x,y,w,h,this._bgground.color);
			this._border && this._border.color && context.drawRect(x,y,w,h,this._border.color.strColor,this._border.size);
		}

		/**@inheritDoc */
		__proto.getCSSStyle=function(){
			return this;
		}

		/**
		*设置 CSS 样式字符串。
		*@param text CSS样式字符串。
		*/
		__proto.cssText=function(text){
			this.attrs(CSSStyle.parseOneCSS(text,';'));
		}

		/**
		*根据传入的属性名、属性值列表，设置此对象的属性值。
		*@param attrs 属性名与属性值列表。
		*/
		__proto.attrs=function(attrs){
			if (attrs){
				for (var i=0,n=attrs.length;i < n;i++){
					var attr=attrs[i];
					this[attr[0]]=attr[1];
				}
			}
		}

		/**@inheritDoc */
		__proto.setTransform=function(value){
			(value==='none')? (this._tf=Style._TF_EMPTY):this.attrs(CSSStyle.parseOneCSS(value,','));
		}

		/**
		*定义 X 轴、Y 轴移动转换。
		*@param x X 轴平移量。
		*@param y Y 轴平移量。
		*/
		__proto.translate=function(x,y){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.translateX=x;
			this._tf.translateY=y;
		}

		/**
		*定义 缩放转换。
		*@param x X 轴缩放值。
		*@param y Y 轴缩放值。
		*/
		__proto.scale=function(x,y){
			this._tf===Style._TF_EMPTY && (this._tf=Style._createTransform());
			this._tf.scaleX=x;
			this._tf.scaleY=y;
		}

		/**@private */
		__proto._enableLayout=function(){
			return (this._type & 0x2)===0 && (this._type & 0x4)===0;
		}

		/**
		*是否显示为块级元素。
		*/
		__getset(0,__proto,'block',_super.prototype._$get_block,function(value){
			value ? (this._type |=0x1):(this._type &=(~0x1));
		});

		/**
		*垂直对齐方式。
		*/
		__getset(0,__proto,'valign',function(){
			return CSSStyle._valigndef[this._aligns[1]];
			},function(value){
			this._aligns===CSSStyle._ALIGNS && (this._aligns=[0,0,0]);
			this._aligns[1]=CSSStyle._valigndef[value];
		});

		/**
		*高度。
		*/
		__getset(0,__proto,'height',null,function(h){
			this._type |=0x2000;
			if ((typeof h=='string')){
				if (this._calculation("height",h))return;
				h=parseInt(h);
			}
			this.size(-1,h);
		});

		/**
		*宽度。
		*/
		__getset(0,__proto,'width',null,function(w){
			this._type |=0x8;
			if ((typeof w=='string')){
				var offset=w.indexOf('auto');
				if (offset >=0){
					this._type |=0x40000;
					w=w.substr(0,offset);
				}
				if (this._calculation("width",w))return;
				w=parseInt(w);
			}
			this.size(w,-1);
		});

		/**
		*字体粗细。
		*/
		__getset(0,__proto,'fontWeight',function(){
			return this._font.weight;
			},function(value){
			this._createFont().weight=value;
		});

		/**
		*表示左边距。
		*/
		__getset(0,__proto,'left',null,function(value){
			var ower=this._ower;
			if (((typeof value=='string'))){
				if (value==="center")
					value="50% -50% 0";
				else if (value==="right")
				value="100% -100% 0";
				if (this._calculation("left",value))return;
				value=parseInt(value);
			}
			ower.x=value;
		});

		__getset(0,__proto,'_translate',null,function(value){
			this.translate(value[0],value[1]);
		});

		/**@inheritDoc */
		__getset(0,__proto,'absolute',function(){
			return (this._type & 0x4)!==0;
		});

		/**
		*表示上边距。
		*/
		__getset(0,__proto,'top',null,function(value){
			var ower=this._ower;
			if (((typeof value=='string'))){
				if (value==="middle")
					value="50% -50% 0";
				else if (value==="bottom")
				value="100% -100% 0";
				if (this._calculation("top",value))return;
				value=parseInt(value);
			}
			ower.y=value;
		});

		/**
		*水平对齐方式。
		*/
		__getset(0,__proto,'align',function(){
			return CSSStyle._aligndef[this._aligns[0]];
			},function(value){
			this._aligns===CSSStyle._ALIGNS && (this._aligns=[0,0,0]);
			this._aligns[0]=CSSStyle._aligndef[value];
		});

		/**
		*表示是否加粗。
		*/
		__getset(0,__proto,'bold',function(){
			return this._font.bold;
			},function(value){
			this._createFont().bold=value;
		});

		/**
		*边距信息。
		*/
		__getset(0,__proto,'padding',function(){
			return this._padding;
			},function(value){
			this._padding=value;
		});

		/**
		*行间距。
		*/
		__getset(0,__proto,'leading',function(){
			return this._spacing[1];
			},function(d){
			((typeof d=='string'))&& (d=parseInt(d+""));
			this._spacing===CSSStyle._SPACING && (this._spacing=[0,0]);
			this._spacing[1]=d;
		});

		/**
		*是否是行元素。
		*/
		__getset(0,__proto,'lineElement',function(){
			return (this._type & 0x10000)!=0;
			},function(value){
			value ? (this._type |=0x10000):(this._type &=(~0x10000));
		});

		/**
		*浮动方向。
		*/
		__getset(0,__proto,'cssFloat',function(){
			return (this._type & 0x8000)!=0 ? "right" :"left";
			},function(value){
			this.lineElement=false;
			value==="right" ? (this._type |=0x8000):(this._type &=(~0x8000));
		});

		/**
		*添加到文本的修饰。
		*/
		__getset(0,__proto,'textDecoration',function(){
			return this._font.decoration;
			},function(value){
			this._createFont().decoration=value;
		});

		/**
		*设置如何处理元素内的空白。
		*/
		__getset(0,__proto,'whiteSpace',function(){
			return (this._type & 0x20000)? "nowrap" :"";
			},function(type){
			type==="nowrap" && (this._type |=0x20000);
			type==="none" && (this._type &=~0x20000);
		});

		__getset(0,__proto,'background',null,function(value){
			if (!value){
				this._bgground=null;
				return;
			}
			this._bgground || (this._bgground={});
			this._bgground.color=value;
			this._ower.model && this._ower.model.bgColor(value);
			this._type |=0x4000;
			this._ower._renderType |=/*laya.renders.RenderSprite.STYLE*/0x80;
		});

		/**
		*表示是否换行。
		*/
		__getset(0,__proto,'wordWrap',function(){
			return (this._type & 0x20000)===0;
			},function(value){
			value ? (this._type &=~0x20000):(this._type |=0x20000);
		});

		/**
		*字体颜色。
		*/
		__getset(0,__proto,'color',function(){
			return this._font.color;
			},function(value){
			this._createFont().color=value;
		});

		/**
		*<p>指定文本字段是否是密码文本字段。</p>
		*如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
		*/
		__getset(0,__proto,'password',function(){
			return this._font.password;
			},function(value){
			this._createFont().password=value;
		});

		/**
		*背景颜色。
		*/
		__getset(0,__proto,'backgroundColor',function(){
			return this._bgground ? this._bgground.color :null;
			},function(value){
			if (value==='none')this._bgground=null;
			else (this._bgground || (this._bgground={}),this._bgground.color=value);
			this._ower.model && this._ower.model.bgColor(value);
			this._ower._renderType |=/*laya.renders.RenderSprite.STYLE*/0x80;
		});

		/**
		*字体信息。
		*/
		__getset(0,__proto,'font',function(){
			return this._font.toString();
			},function(value){
			this._createFont().set(value);
		});

		/**
		*文本的粗细。
		*/
		__getset(0,__proto,'weight',null,function(value){
			this._createFont().weight=value;
		});

		/**
		*间距。
		*/
		__getset(0,__proto,'letterSpacing',function(){
			return this._spacing[0];
			},function(d){
			((typeof d=='string'))&& (d=parseInt(d+""));
			this._spacing===CSSStyle._SPACING && (this._spacing=[0,0]);
			this._spacing[0]=d;
		});

		/**
		*字体大小。
		*/
		__getset(0,__proto,'fontSize',function(){
			return this._font.size;
			},function(value){
			this._createFont().size=value;
		});

		/**
		*表示是否为斜体。
		*/
		__getset(0,__proto,'italic',function(){
			return this._font.italic;
			},function(value){
			this._createFont().italic=value;
		});

		/**
		*字体系列。
		*/
		__getset(0,__proto,'fontFamily',function(){
			return this._font.family;
			},function(value){
			this._createFont().family=value;
		});

		/**
		*<p>描边宽度（以像素为单位）。</p>
		*默认值0，表示不描边。
		*@default 0
		*/
		__getset(0,__proto,'stroke',function(){
			return this._font.stroke[0];
			},function(value){
			if (this._createFont().stroke===Font._STROKE)this._font.stroke=[0,"#000000"];
			this._font.stroke[0]=value;
		});

		/**
		*<p>描边颜色，以字符串表示。</p>
		*@default "#000000";
		*/
		__getset(0,__proto,'strokeColor',function(){
			return this._font.stroke[1];
			},function(value){
			if (this._createFont().stroke===Font._STROKE)this._font.stroke=[0,"#000000"];
			this._font.stroke[1]=value;
		});

		/**
		*边框属性。
		*/
		__getset(0,__proto,'border',function(){
			return this._border ? this._border.value :"";
			},function(value){
			if (value=='none'){
				this._border=null;
				return;
			}
			this._border || (this._border={});
			this._border.value=value;
			var values=value.split(' ');
			this._border.color=Color.create(values[values.length-1]);
			if (values.length==1){
				this._border.size=1;
				this._border.type='solid';
				return;
			};
			var i=0;
			if (values[0].indexOf('px')> 0){
				this._border.size=parseInt(values[0]);
				i++;
			}else this._border.size=1;
			this._border.type=values[i];
			this._ower._renderType |=/*laya.renders.RenderSprite.STYLE*/0x80;
		});

		/**
		*边框的颜色。
		*/
		__getset(0,__proto,'borderColor',function(){
			return (this._border && this._border.color)? this._border.color.strColor :null;
			},function(value){
			if (!value){
				this._border=null;
				return;
			}
			this._border || (this._border={size:1,type:'solid'});
			this._border.color=(value==null)? null :Color.create(value);
			this._ower.model && this._ower.model.border(this._border.color.strColor);
			this._ower._renderType |=/*laya.renders.RenderSprite.STYLE*/0x80;
		});

		/**
		*元素的定位类型。
		*/
		__getset(0,__proto,'position',function(){
			return (this._type & 0x4)? "absolute" :"";
			},function(value){
			value=="absolute" ? (this._type |=0x4):(this._type &=~0x4);
		});

		/**
		*规定元素应该生成的框的类型。
		*/
		__getset(0,__proto,'display',null,function(value){
			switch (value){
				case '':
					this._type &=~0x2;
					this.visible=true;
					break ;
				case 'none':
					this._type |=0x2;
					this.visible=false;
					this._ower._layoutLater();
					break ;
				}
		});

		/**@inheritDoc */
		__getset(0,__proto,'paddingLeft',function(){
			return this.padding[3];
		});

		/**@inheritDoc */
		__getset(0,__proto,'paddingTop',function(){
			return this.padding[0];
		});

		__getset(0,__proto,'_scale',null,function(value){
			this._ower.scale(value[0],value[1]);
		});

		__getset(0,__proto,'_rotate',null,function(value){
			this._ower.rotation=value;
		});

		CSSStyle.parseOneCSS=function(text,clipWord){
			var out=[];
			var attrs=text.split(clipWord);
			var valueArray;
			for (var i=0,n=attrs.length;i < n;i++){
				var attr=attrs[i];
				var ofs=attr.indexOf(':');
				var name=attr.substr(0,ofs).replace(/^\s+|\s+$/g,'');
				if (name.length==0)
					continue ;
				var value=attr.substr(ofs+1).replace(/^\s+|\s+$/g,'');
				var one=[name,value];
				switch (name){
					case 'italic':
					case 'bold':
						one[1]=value=="true";
						break ;
					case 'line-height':
						one[0]='lineHeight';
						one[1]=parseInt(value);
						break ;
					case 'font-size':
						one[0]='fontSize';
						one[1]=parseInt(value);
						break ;
					case 'padding':
						valueArray=value.split(' ');
						valueArray.length > 1 || (valueArray[1]=valueArray[2]=valueArray[3]=valueArray[0]);
						one[1]=[parseInt(valueArray[0]),parseInt(valueArray[1]),parseInt(valueArray[2]),parseInt(valueArray[3])];
						break ;
					case 'rotate':
						one[0]="_rotate";
						one[1]=parseFloat(value);
						break ;
					case 'scale':
						valueArray=value.split(' ');
						one[0]="_scale";
						one[1]=[parseFloat(valueArray[0]),parseFloat(valueArray[1])];
						break ;
					case 'translate':
						valueArray=value.split(' ');
						one[0]="_translate";
						one[1]=[parseInt(valueArray[0]),parseInt(valueArray[1])];
						break ;
					default :
						(one[0]=CSSStyle._CSSTOVALUE[name])|| (one[0]=name);
					}
				out.push(one);
			}
			return out;
		}

		CSSStyle.parseCSS=function(text,uri){
			var one;
			while ((one=CSSStyle._parseCSSRegExp.exec(text))!=null){
				CSSStyle.styleSheets[one[1]]=CSSStyle.parseOneCSS(one[2],';');
			}
		}

		CSSStyle.EMPTY=new CSSStyle(null);
		CSSStyle._CSSTOVALUE={'letter-spacing':'letterSpacing','line-spacing':'lineSpacing','white-space':'whiteSpace','line-height':'lineHeight','scale-x':'scaleX','scale-y':'scaleY','translate-x':'translateX','translate-y':'translateY','font-family':'fontFamily','font-weight':'fontWeight','vertical-align':'valign','text-decoration':'textDecoration','background-color':'backgroundColor','border-color':'borderColor','float':'cssFloat'};
		CSSStyle._parseCSSRegExp=new RegExp("([\.\#]\\w+)\\s*{([\\s\\S]*?)}","g");
		CSSStyle._aligndef={'left':0,'center':1,'right':2,0:'left',1:'center',2:'right'};
		CSSStyle._valigndef={'top':0,'middle':1,'bottom':2,0:'top',1:'middle',2:'bottom'};
		CSSStyle.styleSheets={};
		CSSStyle.ALIGN_CENTER=1;
		CSSStyle.ALIGN_RIGHT=2;
		CSSStyle.VALIGN_MIDDLE=1;
		CSSStyle.VALIGN_BOTTOM=2;
		CSSStyle._CSS_BLOCK=0x1;
		CSSStyle._DISPLAY_NONE=0x2;
		CSSStyle._ABSOLUTE=0x4;
		CSSStyle._WIDTH_SET=0x8;
		CSSStyle._PADDING=[0,0,0,0];
		CSSStyle._RECT=[-1,-1,-1,-1];
		CSSStyle._SPACING=[0,0];
		CSSStyle._ALIGNS=[0,0,0];
		CSSStyle.ADDLAYOUTED=0x200;
		CSSStyle._NEWFONT=0x1000;
		CSSStyle._HEIGHT_SET=0x2000;
		CSSStyle._BACKGROUND_SET=0x4000;
		CSSStyle._FLOAT_RIGHT=0x8000;
		CSSStyle._LINE_ELEMENT=0x10000;
		CSSStyle._NOWARP=0x20000;
		CSSStyle._WIDTHAUTO=0x40000;
		CSSStyle._LISTERRESZIE=0x80000;
		return CSSStyle;
	})(Style)


	/**
	*@private
	*使用Audio标签播放声音
	*/
	//class laya.media.h5audio.AudioSound extends laya.events.EventDispatcher
	var AudioSound=(function(_super){
		function AudioSound(){
			this.url=null;
			this.audio=null;
			this.loaded=false;
			AudioSound.__super.call(this);
		}

		__class(AudioSound,'laya.media.h5audio.AudioSound',_super);
		var __proto=AudioSound.prototype;
		/**
		*释放声音
		*
		*/
		__proto.dispose=function(){
			var ad=AudioSound._audioCache[this.url];
			if (ad){
				ad.src="";
				delete AudioSound._audioCache[this.url];
			}
		}

		/**
		*加载声音
		*@param url
		*
		*/
		__proto.load=function(url){
			this.url=url;
			var ad=AudioSound._audioCache[url];
			if (ad && ad.readyState >=2){
				this.event(/*laya.events.Event.COMPLETE*/"complete");
				return;
			}
			if (!ad){
				ad=Browser.createElement("audio");
				ad.src=url;
				AudioSound._audioCache[url]=ad;
			}
			ad.addEventListener("canplaythrough",onLoaded);
			ad.addEventListener("error",onErr);
			var me=this;
			function onLoaded (){
				offs();
				me.loaded=true;
				me.event(/*laya.events.Event.COMPLETE*/"complete");
			}
			function onErr (){
				offs();
				me.event(/*laya.events.Event.ERROR*/"error");
			}
			function offs (){
				ad.removeEventListener("canplaythrough",onLoaded);
				ad.removeEventListener("error",onErr);
			}
			this.audio=ad;
			ad.load();
		}

		/**
		*播放声音
		*@param startTime 起始时间
		*@param loops 循环次数
		*@return
		*
		*/
		__proto.play=function(startTime,loops){
			(startTime===void 0)&& (startTime=0);
			(loops===void 0)&& (loops=0);
			if (!this.url)return null;
			var ad;
			ad=AudioSound._audioCache[this.url];
			if (!ad)return null;
			var tAd;
			tAd=Pool.getItem("audio:"+this.url);
			tAd=tAd?tAd:ad.cloneNode(true);
			var channel=new AudioSoundChannel(tAd);
			channel.url=this.url;
			channel.loops=loops;
			channel.startTime=startTime;
			channel.play();
			SoundManager.addChannel(channel);
			return channel;
		}

		AudioSound._audioCache={};
		return AudioSound;
	})(EventDispatcher)


	/**
	*<code>SoundChannel</code> 用来控制程序中的声音。
	*/
	//class laya.media.SoundChannel extends laya.events.EventDispatcher
	var SoundChannel=(function(_super){
		function SoundChannel(){
			this.url=null;
			this.loops=0;
			this.startTime=NaN;
			this.isStopped=false;
			this.completeHandler=null;
			SoundChannel.__super.call(this);
		}

		__class(SoundChannel,'laya.media.SoundChannel',_super);
		var __proto=SoundChannel.prototype;
		/**
		*播放。
		*/
		__proto.play=function(){}
		/**
		*停止。
		*/
		__proto.stop=function(){}
		/**
		*private
		*/
		__proto.__runComplete=function(handler){
			if (handler){
				handler.run();
			}
		}

		/**
		*音量。
		*/
		__getset(0,__proto,'volume',function(){
			return 1;
			},function(v){
		});

		/**
		*获取当前播放时间。
		*/
		__getset(0,__proto,'position',function(){
			return 0;
		});

		return SoundChannel;
	})(EventDispatcher)


	/**
	*<code>Sound</code> 类是用来播放控制声音的类。
	*/
	//class laya.media.Sound extends laya.events.EventDispatcher
	var Sound=(function(_super){
		function Sound(){Sound.__super.call(this);;
		};

		__class(Sound,'laya.media.Sound',_super);
		var __proto=Sound.prototype;
		/**
		*加载声音。
		*@param url 地址。
		*
		*/
		__proto.load=function(url){}
		/**
		*播放声音。
		*@param startTime 开始时间,单位秒
		*@param loops 循环次数,0表示一直循环
		*@return 声道 SoundChannel 对象。
		*
		*/
		__proto.play=function(startTime,loops){
			(startTime===void 0)&& (startTime=0);
			(loops===void 0)&& (loops=0);
			return null;
		}

		/**
		*释放声音资源。
		*
		*/
		__proto.dispose=function(){}
		return Sound;
	})(EventDispatcher)


	/**
	*@private
	*web audio api方式播放声音
	*/
	//class laya.media.webaudio.WebAudioSound extends laya.events.EventDispatcher
	var WebAudioSound=(function(_super){
		function WebAudioSound(){
			this.url=null;
			this.loaded=false;
			this.data=null;
			this.audioBuffer=null;
			this.__toPlays=null;
			WebAudioSound.__super.call(this);
		}

		__class(WebAudioSound,'laya.media.webaudio.WebAudioSound',_super);
		var __proto=WebAudioSound.prototype;
		/**
		*加载声音
		*@param url
		*
		*/
		__proto.load=function(url){
			var me=this;
			this.url=url;
			this.audioBuffer=WebAudioSound._dataCache[url];
			if (this.audioBuffer){
				this._loaded(this.audioBuffer);
				return;
			}
			WebAudioSound.e.on("loaded:"+url,this,this._loaded);
			WebAudioSound.e.on("err:"+url,this,this._err);
			if (WebAudioSound.__loadingSound[url]){
				return;
			}
			WebAudioSound.__loadingSound[url]=true;
			var request=new Browser.window.XMLHttpRequest();
			request.open("GET",url,true);
			request.responseType="arraybuffer";
			request.onload=function (){
				me.data=request.response;
				WebAudioSound.buffs.push({"buffer":me.data,"url":me.url});
				WebAudioSound.decode();
			};
			request.onerror=function (e){
				me._err();
			}
			request.send();
		}

		__proto._err=function(){
			this._removeLoadEvents();
			WebAudioSound.__loadingSound[this.url]=false;
			this.event(/*laya.events.Event.ERROR*/"error");
		}

		__proto._loaded=function(audioBuffer){
			this._removeLoadEvents();
			this.audioBuffer=audioBuffer;
			WebAudioSound._dataCache[this.url]=this.audioBuffer;
			this.loaded=true;
			this.event(/*laya.events.Event.COMPLETE*/"complete");
		}

		__proto._removeLoadEvents=function(){
			WebAudioSound.e.off("loaded:"+this.url,this,this._loaded);
			WebAudioSound.e.off("err:"+this.url,this,this._err);
		}

		__proto.__playAfterLoaded=function(){
			if (!this.__toPlays)return;
			var i=0,len=0;
			var toPlays;
			toPlays=this.__toPlays;
			len=toPlays.length;
			var tParams;
			for (i=0;i < len;i++){
				tParams=toPlays[i];
				if(tParams[2]&&!(tParams [2]).isStopped){
					this.play(tParams[0],tParams[1],tParams[2]);
				}
			}
			this.__toPlays.length=0;
		}

		/**
		*播放声音
		*@param startTime 起始时间
		*@param loops 循环次数
		*@return
		*
		*/
		__proto.play=function(startTime,loops,channel){
			(startTime===void 0)&& (startTime=0);
			(loops===void 0)&& (loops=0);
			channel=channel ? channel :new WebAudioSoundChannel();
			if (!this.audioBuffer){
				if (this.url){
					if (!this.__toPlays)this.__toPlays=[];
					this.__toPlays.push([startTime,loops,channel]);
					this.once(/*laya.events.Event.COMPLETE*/"complete",this,this.__playAfterLoaded);
					this.load(this.url);
				}
			}
			channel.url=this.url;
			channel.loops=loops;
			channel["audioBuffer"]=this.audioBuffer;
			channel.startTime=startTime;
			channel.play();
			SoundManager.addChannel(channel);
			return channel;
		}

		__proto.dispose=function(){
			delete WebAudioSound._dataCache[this.url];
			delete WebAudioSound.__loadingSound[this.url];
		}

		WebAudioSound.decode=function(){
			if (WebAudioSound.buffs.length <=0 || WebAudioSound.isDecoding){
				return;
			}
			WebAudioSound.isDecoding=true;
			WebAudioSound.tInfo=WebAudioSound.buffs.shift();
			WebAudioSound.ctx.decodeAudioData(WebAudioSound.tInfo["buffer"],WebAudioSound._done,WebAudioSound._fail);
		}

		WebAudioSound._done=function(audioBuffer){
			WebAudioSound.e.event("loaded:"+WebAudioSound.tInfo.url,audioBuffer);
			WebAudioSound.isDecoding=false;
			WebAudioSound.decode();
		}

		WebAudioSound._fail=function(){
			WebAudioSound.e.event("err:"+WebAudioSound.tInfo.url,null);
			WebAudioSound.isDecoding=false;
			WebAudioSound.decode();
		}

		WebAudioSound._playEmptySound=function(){
			if (WebAudioSound.ctx==null){return;};
			var source=WebAudioSound.ctx.createBufferSource();
			source.buffer=WebAudioSound._miniBuffer;
			source.connect(WebAudioSound.ctx.destination);
			source.start(0,0,0);
		}

		WebAudioSound._unlock=function(){
			if (WebAudioSound._unlocked){return;}
				WebAudioSound._playEmptySound();
			if (WebAudioSound.ctx.state=="running"){
				Browser.document.removeEventListener("mousedown",WebAudioSound._unlock,true);
				Browser.document.removeEventListener("touchend",WebAudioSound._unlock,true);
				WebAudioSound._unlocked=true;
			}
		}

		WebAudioSound.initWebAudio=function(){
			if (WebAudioSound.ctx.state !="running"){
				WebAudioSound._unlock();
				Browser.document.addEventListener("mousedown",WebAudioSound._unlock,true);
				Browser.document.addEventListener("touchend",WebAudioSound._unlock,true);
			}
		}

		WebAudioSound._dataCache={};
		WebAudioSound.buffs=[];
		WebAudioSound.isDecoding=false;
		WebAudioSound._unlocked=false;
		WebAudioSound.tInfo=null
		WebAudioSound.__loadingSound={};
		__static(WebAudioSound,
		['window',function(){return this.window=Browser.window;},'webAudioEnabled',function(){return this.webAudioEnabled=WebAudioSound.window["AudioContext"] || WebAudioSound.window["webkitAudioContext"] || WebAudioSound.window["mozAudioContext"];},'ctx',function(){return this.ctx=WebAudioSound.webAudioEnabled ? new (WebAudioSound.window["AudioContext"] || WebAudioSound.window["webkitAudioContext"] || WebAudioSound.window["mozAudioContext"])():undefined;},'_miniBuffer',function(){return this._miniBuffer=WebAudioSound.ctx.createBuffer(1,1,22050);},'e',function(){return this.e=new EventDispatcher();}
		]);
		return WebAudioSound;
	})(EventDispatcher)


	/**
	*<code>HttpRequest</code> 通过 HTTP 协议传送或接收 XML 及其他数据。
	*/
	//class laya.net.HttpRequest extends laya.events.EventDispatcher
	var HttpRequest=(function(_super){
		function HttpRequest(){
			this._responseType=null;
			this._data=null;
			HttpRequest.__super.call(this);
			this._http=new Browser.window.XMLHttpRequest();
		}

		__class(HttpRequest,'laya.net.HttpRequest',_super);
		var __proto=HttpRequest.prototype;
		/**
		*发送请求。
		*@param url 请求的地址。
		*@param data 发送的数据，可选。
		*@param method 发送数据方式，值为“get”或“post”，默认为 “get”方式。
		*@param responseType 返回消息类型，可设置为"text"，"json"，"xml","arraybuffer"。
		*@param headers 头信息，key value数组，比如["Content-Type","application/json"]。
		*/
		__proto.send=function(url,data,method,responseType,headers){
			(method===void 0)&& (method="get");
			(responseType===void 0)&& (responseType="text");
			this._responseType=responseType;
			this._data=null;
			var _this=this;
			var http=this._http;
			http.open(method,url,true);
			if (headers){
				for (var i=0;i < headers.length;i++){
					http.setRequestHeader(headers[i++],headers[i]);
				}
				}else {
				if (!data || (typeof data=='string'))http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				else http.setRequestHeader("Content-Type","application/json");
			}
			http.responseType=responseType!=="arraybuffer" ? "text" :"arraybuffer";
			http.onerror=function (e){
				_this._onError(e);
			}
			http.onabort=function (e){
				_this._onAbort(e);
			}
			http.onprogress=function (e){
				_this._onProgress(e);
			}
			http.onload=function (e){
				_this._onLoad(e);
			}
			http.send(data);
		}

		/**
		*@private
		*请求进度的侦听处理函数。
		*@param e 事件对象。
		*/
		__proto._onProgress=function(e){
			if (e && e.lengthComputable)this.event(/*laya.events.Event.PROGRESS*/"progress",e.loaded / e.total);
		}

		/**
		*@private
		*请求中断的侦听处理函数。
		*@param e 事件对象。
		*/
		__proto._onAbort=function(e){
			this.error("Request was aborted by user");
		}

		/**
		*@private
		*请求出错侦的听处理函数。
		*@param e 事件对象。
		*/
		__proto._onError=function(e){
			this.error("Request failed Status:"+this._http.status+" text:"+this._http.statusText);
		}

		/**
		*@private
		*请求消息返回的侦听处理函数。
		*@param e 事件对象。
		*/
		__proto._onLoad=function(e){
			var http=this._http;
			var status=http.status!==undefined ? http.status :200;
			if (status===200 || status===204 || status===0){
				this.complete();
				}else {
				this.error("["+http.status+"]"+http.statusText+":"+http.responseURL);
			}
		}

		/**
		*@private
		*请求错误的处理函数。
		*@param message 错误信息。
		*/
		__proto.error=function(message){
			this.clear();
			this.event(/*laya.events.Event.ERROR*/"error",message);
		}

		/**
		*@private
		*请求成功完成的处理函数。
		*/
		__proto.complete=function(){
			this.clear();
			try {
				if (this._responseType==="json"){
					this._data=JSON.parse(this._http.responseText);
					}else if (this._responseType==="xml"){
					this._data=Utils.parseXMLFromString(this._http.responseText);
					}else {
					this._data=this._http.response || this._http.responseText;
				}
				this.event(/*laya.events.Event.COMPLETE*/"complete",(this._data instanceof Array)? [this._data] :this._data);
				}catch (e){
				this.error(e.message);
			}
		}

		/**
		*@private
		*清除当前请求。
		*/
		__proto.clear=function(){
			var http=this._http;
			http.onerror=http.onabort=http.onprogress=http.onload=null;
		}

		/**请求的地址。*/
		__getset(0,__proto,'url',function(){
			return this._http.responseURL;
		});

		/**返回的数据。*/
		__getset(0,__proto,'data',function(){
			return this._data;
		});

		return HttpRequest;
	})(EventDispatcher)


	/**
	*<code>Loader</code> 类可用来加载文本、JSON、XML、二进制、图像等资源。
	*/
	//class laya.net.Loader extends laya.events.EventDispatcher
	var Loader=(function(_super){
		function Loader(){
			this._data=null;
			this._url=null;
			this._type=null;
			this._cache=false;
			this._http=null;
			Loader.__super.call(this);
		}

		__class(Loader,'laya.net.Loader',_super);
		var __proto=Loader.prototype;
		/**
		*加载资源。
		*@param url 地址
		*@param type 类型，如果为null，则根据文件后缀，自动分析类型。
		*@param cache 是否缓存数据。
		*/
		__proto.load=function(url,type,cache){
			(cache===void 0)&& (cache=true);
			url=Loader._parseURL(url);
			this._url=url;
			this._type=type || (type=this.getTypeFromUrl(url));
			this._cache=cache;
			this._data=null;
			if (Loader.loadedMap[url]){
				this._data=Loader.loadedMap[url];
				this.event(/*laya.events.Event.PROGRESS*/"progress",1);
				this.event(/*laya.events.Event.COMPLETE*/"complete",this._data);
				return;
			}
			if (Loader.parserMap[type] !=null){
				if (((Loader.parserMap[type])instanceof laya.utils.Handler ))Loader.parserMap[type].runWith(this);
				else Loader.parserMap[type].call(null,this);
				return;
			}
			if (type==="image" || type==="htmlimage" || type==="nativeimage")return this._loadImage(url);
			if (type==="sound")return this._loadSound(url);
			if (!this._http){
				this._http=new HttpRequest();
				this._http.on(/*laya.events.Event.PROGRESS*/"progress",this,this.onProgress);
				this._http.on(/*laya.events.Event.ERROR*/"error",this,this.onError);
				this._http.on(/*laya.events.Event.COMPLETE*/"complete",this,this.onLoaded);
			}
			this._http.send(url,null,"get",type!=="atlas" ? type :"json");
		}

		/**
		*获取指定资源地址的数据类型。
		*@param url 资源地址。
		*@return 数据类型。
		*/
		__proto.getTypeFromUrl=function(url){
			Loader._extReg.lastIndex=url.lastIndexOf(".");
			var result=Loader._extReg.exec(url);
			if (result && result.length > 1){
				return Loader.typeMap[result[1].toLowerCase()];
			}
			console.log("Not recognize the resources suffix",url);
			return "text";
		}

		/**
		*@private
		*加载图片资源。
		*@param url 资源地址。
		*/
		__proto._loadImage=function(url){
			var _this=this;
			var image;
			function clear (){
				image.onload=null;
				image.onerror=null;
			};
			var onload=function (){
				clear();
				_this.onLoaded(image);
			};
			var onerror=function (){
				clear();
				_this.event(/*laya.events.Event.ERROR*/"error","Load image filed");
			}
			if (this._type==="nativeimage"){
				image=new Browser.window.Image();
				image.crossOrigin="";
				image.onload=onload;
				image.onerror=onerror;
				image.src=url;
				}else {
				new HTMLImage.create(url,{onload:onload,onerror:onerror,onCreate:function (img){
						image=img;
				}});
			}
		}

		/**
		*@private
		*加载声音资源。
		*@param url 资源地址。
		*/
		__proto._loadSound=function(url){
			var sound=(new SoundManager._soundClass());
			var _this=this;
			sound.on(/*laya.events.Event.COMPLETE*/"complete",this,soundOnload);
			sound.on(/*laya.events.Event.ERROR*/"error",this,soundOnErr);
			sound.load(url);
			function soundOnload (){
				clear();
				_this.onLoaded(sound);
			}
			function soundOnErr (){
				clear();
				_this.event(/*laya.events.Event.ERROR*/"error","Load sound filed");
			}
			function clear (){
				sound.offAll();
			}
		}

		/**@private */
		__proto.onProgress=function(value){
			if (this._type==="atlas")this.event(/*laya.events.Event.PROGRESS*/"progress",value *0.3);
			else this.event(/*laya.events.Event.PROGRESS*/"progress",value);
		}

		/**@private */
		__proto.onError=function(message){
			this.event(/*laya.events.Event.ERROR*/"error",message);
		}

		/**
		*资源加载完成的处理函数。
		*@param data 数据。
		*/
		__proto.onLoaded=function(data){
			var type=this._type;
			if (type==="image"){
				var tex=new Texture(data);
				tex.url=this._url;
				this.complete(tex);
				}else if (type==="sound" || type==="htmlimage" || type==="nativeimage"){
				this.complete(data);
				}else if (type==="atlas"){
				if (!data.src){
					if (!this._data){
						this._data=data;
						if (data.meta && data.meta.image){
							var toloadPics=data.meta.image.split(",");
							var split=this._url.indexOf("/")>=0 ? "/" :"\\";
							var idx=this._url.lastIndexOf(split);
							var folderPath=idx >=0 ? this._url.substr(0,idx+1):"";
							idx=this._url.indexOf("?");
							var ver;
							ver=idx >=0 ? this._url.substr(idx):"";
							for (var i=0,len=toloadPics.length;i < len;i++){
								toloadPics[i]=folderPath+toloadPics[i]+ver;
							}
							}else {
							toloadPics=[this._url.replace(".json",".png")];
						}
						toloadPics.reverse();
						data.toLoads=toloadPics;
						data.pics=[];
					}
					this.event(/*laya.events.Event.PROGRESS*/"progress",0.3+1 / toloadPics.length *0.6);
					return this._loadImage(URL.formatURL(toloadPics.pop()));
					}else {
					this._data.pics.push(data);
					if (this._data.toLoads.length > 0){
						this.event(/*laya.events.Event.PROGRESS*/"progress",0.3+1 / this._data.toLoads.length *0.6);
						return this._loadImage(URL.formatURL(this._data.toLoads.pop()));
					};
					var frames=this._data.frames;
					var directory=(this._data.meta && this._data.meta.prefix)? URL.basePath+this._data.meta.prefix :this._url.substring(0,this._url.lastIndexOf("."))+"/";
					var pics=this._data.pics;
					var map=Loader.atlasMap[this._url] || (Loader.atlasMap[this._url]=[]);
					map.dir=directory;
					for (var name in frames){
						var obj=frames[name];
						var tPic=pics[obj.frame.idx ? obj.frame.idx :0];
						var url=directory+name;
						Loader.loadedMap[url]=Texture.create(tPic,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y,obj.sourceSize.w,obj.sourceSize.h);
						Loader.loadedMap[url].url=url;
						map.push(url);
					}
					this.complete(this._data);
				}
				}else {
				this.complete(data);
			}
		}

		/**
		*加载完成。
		*@param data 加载的数据。
		*/
		__proto.complete=function(data){
			this._data=data;
			Loader._loaders.push(this);
			if (!Loader._isWorking)Loader.checkNext();
		}

		/**
		*结束加载，处理是否缓存及派发完成事件 <code>Event.COMPLETE</code> 。
		*@param content 加载后的数据
		*/
		__proto.endLoad=function(content){
			content && (this._data=content);
			if (this._cache)Loader.loadedMap[this._url]=this._data;
			this.event(/*laya.events.Event.PROGRESS*/"progress",1);
			this.event(/*laya.events.Event.COMPLETE*/"complete",(this.data instanceof Array)? [this.data] :this.data);
		}

		/**加载地址。*/
		__getset(0,__proto,'url',function(){
			return this._url;
		});

		/**返回的数据。*/
		__getset(0,__proto,'data',function(){
			return this._data;
		});

		/**是否缓存。*/
		__getset(0,__proto,'cache',function(){
			return this._cache;
		});

		/**加载类型。*/
		__getset(0,__proto,'type',function(){
			return this._type;
		});

		Loader.checkNext=function(){
			Loader._isWorking=true;
			var startTimer=Browser.now();
			var thisTimer=startTimer;
			while (Loader._startIndex < Loader._loaders.length){
				thisTimer=Browser.now();
				Loader._loaders[Loader._startIndex].endLoad();
				Loader._startIndex++;
				if (Browser.now()-startTimer > Loader.maxTimeOut){
					console.log("loader callback cost a long time:"+(Browser.now()-startTimer)+" url="+Loader._loaders[Loader._startIndex-1].url);
					Laya.timer.frameOnce(1,null,Loader.checkNext);
					return;
				}
			}
			Loader._loaders.length=0;
			Loader._startIndex=0;
			Loader._isWorking=false;
		}

		Loader._parseURL=function(url){
			if (!url)return url;
			if (url.indexOf("data:image")==0)return url;
			if (url.indexOf(",")< 0){
				url=URL.formatURL(url);
				}else {
				var arr=url.split(",");
				for (var i=arr.length-1;i >-1;i--)
				arr[i]=URL.formatURL(arr[i]);
				url=arr.join(",");
			}
			return url
		}

		Loader.clearRes=function(url){
			url=URL.formatURL(url);
			var arr=Loader.atlasMap[url];
			if (arr){
				for (var i=0,n=arr.length;i < n;i++){
					var resUrl=arr[i];
					var tex=Loader.getRes(resUrl);
					if (tex)tex.destroy();
					delete Loader.loadedMap[resUrl];
				}
				arr.length=0;
				delete Loader.atlasMap[url];
				delete Loader.loadedMap[url];
				}else {
				var res=Loader.loadedMap[url];
				if (res){
					if ((res instanceof laya.resource.Texture )&& res.bitmap)(res).destroy();
					delete Loader.loadedMap[url];
				}
			}
		}

		Loader.getRes=function(url){
			return Loader.loadedMap[Loader._parseURL(url)];
		}

		Loader.getAtlas=function(url){
			return Loader.atlasMap[URL.formatURL(url)];
		}

		Loader.cacheRes=function(url,data){
			Loader.loadedMap[URL.formatURL(url)]=data;
		}

		Loader.TEXT="text";
		Loader.JSON="json";
		Loader.XML="xml";
		Loader.BUFFER="arraybuffer";
		Loader.IMAGE="image";
		Loader.SOUND="sound";
		Loader.ATLAS="atlas";
		Loader.TEXTURE2D="texture2d";
		Loader.TEXTURECUBE="texturecube";
		Loader.typeMap={"png":"image","jpg":"image","jpeg":"image","txt":"text","json":"json","xml":"xml","als":"atlas","mp3":"sound","ogg":"sound","wav":"sound","part":"json"};
		Loader.parserMap={};
		Loader.loadedMap={};
		Loader.maxTimeOut=100;
		Loader.atlasMap={};
		Loader._loaders=[];
		Loader._isWorking=false;
		Loader._startIndex=0;
		Loader._extReg=/\.(\w+)\??/g;
		return Loader;
	})(EventDispatcher)


	/**
	*<p> <code>LoaderManager</code> 类用于用于批量加载资源、数据。</p>
	*<p>批量加载器，单例，可以通过Laya.loader访问。</p>
	*多线程(默认5个线程)，5个优先级(0最快，4最慢,默认为1)
	*某个资源加载失败后，会按照最低优先级重试加载(属性retryNum决定重试几次)，如果重试后失败，则调用complete函数，并返回null
	*/
	//class laya.net.LoaderManager extends laya.events.EventDispatcher
	var LoaderManager=(function(_super){
		var ResInfo;
		function LoaderManager(){
			this.retryNum=1;
			this.maxLoader=5;
			this._loaders=[];
			this._loaderCount=0;
			this._resInfos=[];
			this._resMap={};
			this._infoPool=[];
			this._maxPriority=5;
			this._failRes={};
			LoaderManager.__super.call(this);
			for (var i=0;i < this._maxPriority;i++)this._resInfos[i]=[];
		}

		__class(LoaderManager,'laya.net.LoaderManager',_super);
		var __proto=LoaderManager.prototype;
		/**
		*加载资源。
		*@param url 地址，或者资源对象数组(简单数组：["a.png","b.png"]，复杂数组[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSON,size:50,priority:1}])。
		*@param complete 结束回调，如果加载失败，则返回 null 。
		*@param progress 进度回调，回调参数为当前文件加载的进度信息(0-1)。
		*@param type 资源类型。
		*@param priority 优先级，0-4，五个优先级，0优先级最高，默认为1。
		*@param cache 是否缓存加载结果。
		*@return 此 LoaderManager 对象。
		*/
		__proto.load=function(url,complete,progress,type,priority,cache){
			(priority===void 0)&& (priority=1);
			(cache===void 0)&& (cache=true);
			if ((url instanceof Array))return this._loadAssets(url,complete,progress,type,priority,cache);
			url=Loader._parseURL(url);
			var content=Loader.getRes(url);
			if (content !=null){
				complete && complete.runWith(content);
				this._loaderCount || this.event(/*laya.events.Event.COMPLETE*/"complete");
				}else {
				var info=this._resMap[url];
				if (!info){
					info=this._infoPool.length ? this._infoPool.pop():new ResInfo();
					info.url=url;
					info.type=type;
					info.cache=cache;
					complete && info.on(/*laya.events.Event.COMPLETE*/"complete",complete.caller,complete.method,complete.args);
					progress && info.on(/*laya.events.Event.PROGRESS*/"progress",progress.caller,progress.method,progress.args);
					this._resMap[url]=info;
					priority=priority < this._maxPriority ? priority :this._maxPriority-1;
					this._resInfos[priority].push(info);
					this._next();
					}else {
					complete && info.on(/*laya.events.Event.COMPLETE*/"complete",complete.caller,complete.method,complete.args);
					progress && info.on(/*laya.events.Event.PROGRESS*/"progress",progress.caller,progress.method,progress.args);
				}
			}
			return this;
		}

		__proto._next=function(){
			if (this._loaderCount >=this.maxLoader)return;
			for (var i=0;i < this._maxPriority;i++){
				var infos=this._resInfos[i];
				if (infos.length > 0){
					var info=infos.shift();
					if (info)return this._doLoad(info);
				}
			}
			this._loaderCount || this.event(/*laya.events.Event.COMPLETE*/"complete");
		}

		__proto._doLoad=function(resInfo){
			this._loaderCount++;
			var loader=this._loaders.length ? this._loaders.pop():new Loader();
			loader.on(/*laya.events.Event.COMPLETE*/"complete",null,onLoaded);
			loader.on(/*laya.events.Event.PROGRESS*/"progress",null,function(num){
				resInfo.event(/*laya.events.Event.PROGRESS*/"progress",num);
			});
			loader.on(/*laya.events.Event.ERROR*/"error",null,function(msg){
				onLoaded(null);
			});
			var _this=this;
			function onLoaded (data){
				loader.offAll();
				loader._data=null;
				_this._loaders.push(loader);
				_this._endLoad(resInfo,data);
				_this._loaderCount--;
				_this._next();
			}
			loader.load(resInfo.url,resInfo.type,resInfo.cache);
		}

		__proto._endLoad=function(resInfo,content){
			if (content===null){
				var errorCount=this._failRes[resInfo.url] || 0;
				if (errorCount < this.retryNum){
					console.log("[warn]Retry to load:",resInfo.url);
					this._failRes[resInfo.url]=errorCount+1;
					this._resInfos[this._maxPriority-1].push(resInfo);
					return;
					}else {
					console.log("[error]Failed to load:",resInfo.url);
					this.event(/*laya.events.Event.ERROR*/"error",resInfo.url);
				}
			}
			delete this._resMap[resInfo.url];
			resInfo.event(/*laya.events.Event.COMPLETE*/"complete",content);
			resInfo.offAll();
			this._infoPool.push(resInfo);
		}

		/**
		*清理指定资源地址缓存。
		*@param url 资源地址。
		*/
		__proto.clearRes=function(url){
			Loader.clearRes(url);
		}

		/**
		*获取指定资源地址的资源。
		*@param url 资源地址。
		*@return 返回资源。
		*/
		__proto.getRes=function(url){
			return Loader.getRes(url);
		}

		/**清理当前未完成的加载，所有未加载的内容全部停止加载。*/
		__proto.clearUnLoaded=function(){
			for (var i=0;i < this._maxPriority;i++){
				var infos=this._resInfos[i];
				for (var j=infos.length-1;j >-1;j--){
					var info=infos[j];
					if (info){
						info.offAll();
						this._infoPool.push(info);
					}
				}
				infos.length=0;
			}
			this._loaderCount=0;
			this._resMap={};
		}

		/**
		*根据地址集合清理掉未加载的内容
		*@param urls 资源地址集合
		*/
		__proto.cancelLoadByUrls=function(urls){
			if (!urls)return;
			for (var i=0,n=urls.length;i < n;i++){
				this.cancelLoadByUrl(urls[i]);
			}
		}

		/**
		*根据地址清理掉未加载的内容
		*@param url 资源地址
		*/
		__proto.cancelLoadByUrl=function(url){
			url=URL.formatURL(url);
			for (var i=0;i < this._maxPriority;i++){
				var infos=this._resInfos[i];
				for (var j=infos.length-1;j >-1;j--){
					var info=infos[j];
					if (info && info.url===url){
						infos[j]=null;
						info.offAll();
						this._infoPool.push(info);
					}
				}
			}
			if (this._resMap[url])delete this._resMap[url];
		}

		/**
		*@private
		*加载数组里面的资源。
		*@param arr 简单：["a.png","b.png"]，复杂[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSON,size:50,priority:1}]*/
		__proto._loadAssets=function(arr,complete,progress,type,priority,cache){
			(priority===void 0)&& (priority=1);
			(cache===void 0)&& (cache=true);
			var itemCount=arr.length;
			var loadedSize=0;
			var totalSize=0;
			var items=[];
			var defaultType=type || /*laya.net.Loader.IMAGE*/"image";
			for (var i=0;i < itemCount;i++){
				var item=arr[i];
				if ((typeof item=='string'))item={url:item,type:defaultType,size:1,priority:priority};
				if (!item.size)item.size=1;
				item.progress=0;
				totalSize+=item.size;
				items.push(item);
				var progressHandler=progress ? Handler.create(this,loadProgress,[item],false):null;
				this.load(item.url,Handler.create(item,loadComplete,[item]),progressHandler,item.type,item.priority || 1,cache);
			}
			function loadComplete (item,content){
				loadedSize++;
				item.progress=1;
				if (loadedSize===itemCount && complete){
					complete.run();
				}
			}
			function loadProgress (item,value){
				if (progress !=null){
					item.progress=value;
					var num=0;
					var count=items.length;
					for (var j=0;j < count;j++){
						var item1=items[j];
						num+=item1.size *item1.progress;
					};
					var v=num / totalSize;
					progress.runWith(v);
				}
			}
			return this;
		}

		LoaderManager.cacheRes=function(url,data){
			Loader.cacheRes(url,data);
		}

		LoaderManager.__init$=function(){
			//class ResInfo extends laya.events.EventDispatcher
			ResInfo=(function(_super){
				function ResInfo(){
					this.url=null;
					this.type=null;
					this.cache=false;
					ResInfo.__super.call(this);
				}
				__class(ResInfo,'',_super);
				return ResInfo;
			})(EventDispatcher)
		}

		return LoaderManager;
	})(EventDispatcher)


	/**
	*<code>Socket</code> 是一种双向通信协议，在建立连接后，服务器和 Browser/Client Agent 都能主动的向对方发送或接收数据。
	*/
	//class laya.net.Socket extends laya.events.EventDispatcher
	var Socket=(function(_super){
		function Socket(host,port,byteClass){
			this._endian=null;
			this._stamp=NaN;
			this._socket=null;
			this._connected=false;
			this._addInputPosition=0;
			this._input=null;
			this._output=null;
			this.timeout=0;
			this.objectEncoding=0;
			this.disableInput=false;
			this._byteClass=null;
			(port===void 0)&& (port=0);
			Socket.__super.call(this);
			this._byteClass=byteClass;
			this._byteClass=this._byteClass ? this._byteClass :Byte;
			this.endian="bigEndian";
			this.timeout=20000;
			this._addInputPosition=0;
			if (host&&port > 0 && port < 65535)
				this.connect(host,port);
		}

		__class(Socket,'laya.net.Socket',_super);
		var __proto=Socket.prototype;
		/**
		*连接到指定的主机和端口。
		*@param host 服务器地址。
		*@param port 服务器端口。
		*/
		__proto.connect=function(host,port){
			var url="ws://"+host+":"+port;
			this.connectByUrl(url);
		}

		/**
		*连接到指定的url
		*@param url 连接目标
		*/
		__proto.connectByUrl=function(url){
			var _$this=this;
			if (this._socket !=null)
				this.close();
			this._socket && this._cleanSocket();
			this._socket=new Browser.window.WebSocket(url);
			this._socket.binaryType="arraybuffer";
			this._output=new this._byteClass();
			this._output.endian=this.endian;
			this._input=new this._byteClass();
			this._input.endian=this.endian;
			this._addInputPosition=0;
			this._socket.onopen=function (e){
				_$this._onOpen(e);
			};
			this._socket.onmessage=function (msg){
				_$this._onMessage(msg);
			};
			this._socket.onclose=function (e){
				_$this._onClose(e);
			};
			this._socket.onerror=function (e){
				_$this._onError(e);
			};
		}

		__proto._cleanSocket=function(){
			try {
				this._socket.close();
			}catch (e){}
			this._connected=false;
			this._socket.onopen=null;
			this._socket.onmessage=null;
			this._socket.onclose=null;
			this._socket.onerror=null;
			this._socket=null;
		}

		/**
		*关闭连接。
		*/
		__proto.close=function(){
			if (this._socket !=null){
				this._cleanSocket();
			}
		}

		/**
		*@private
		*连接建立成功 。
		*/
		__proto._onOpen=function(e){
			this._connected=true;
			this.event(/*laya.events.Event.OPEN*/"open",e);
		}

		/**
		*@private
		*接收到数据处理方法。
		*@param msg 数据。
		*/
		__proto._onMessage=function(msg){
			if (!msg || !msg.data)return;
			var data=msg.data;
			if(this.disableInput&&data){
				this.event(/*laya.events.Event.MESSAGE*/"message",data);
				return;
			}
			if (this._input.length > 0 && this._input.bytesAvailable < 1){
				this._input.clear();
				this._addInputPosition=0;
			};
			var pre=this._input.pos;
			!this._addInputPosition && (this._addInputPosition=0);
			this._input.pos=this._addInputPosition;
			if (data){
				if ((typeof data=='string')){
					this._input.writeUTFBytes(data);
					}else {
					this._input.writeArrayBuffer(data);
				}
				this._addInputPosition=this._input.pos;
				this._input.pos=pre;
			}
			this.event(/*laya.events.Event.MESSAGE*/"message",data);
		}

		/**
		*@private
		*连接被关闭处理方法。
		*/
		__proto._onClose=function(e){
			this._connected=false;
			this.event(/*laya.events.Event.CLOSE*/"close",e)
		}

		/**
		*@private
		*出现异常处理方法。
		*/
		__proto._onError=function(e){
			this.event(/*laya.events.Event.ERROR*/"error",e)
		}

		/**
		*发送数据到服务器。
		*@param data 需要发送的数据，可以是String或者ArrayBuffer。
		*/
		__proto.send=function(data){
			this._socket.send(data);
		}

		/**
		*发送缓冲区中的数据到服务器。
		*/
		__proto.flush=function(){
			if (this._output && this._output.length > 0){
				try {
					this._socket && this._socket.send(this._output.__getBuffer().slice(0,this._output.length));
					this._output.endian=this.endian;
					this._output.clear();
					}catch (e){
					this.event(/*laya.events.Event.ERROR*/"error",e);
				}
			}
		}

		/**
		*表示服务端发来的数据。
		*/
		__getset(0,__proto,'input',function(){
			return this._input;
		});

		/**
		*表示需要发送至服务端的缓冲区中的数据。
		*/
		__getset(0,__proto,'output',function(){
			return this._output;
		});

		/**
		*表示此 Socket 对象目前是否已连接。
		*/
		__getset(0,__proto,'connected',function(){
			return this._connected;
		});

		/**
		*表示数据的字节顺序。
		*/
		__getset(0,__proto,'endian',function(){
			return this._endian;
			},function(value){
			this._endian=value;
			if (this._input !=null)this._input.endian=value;
			if (this._output !=null)this._output.endian=value;
		});

		Socket.LITTLE_ENDIAN="littleEndian";
		Socket.BIG_ENDIAN="bigEndian";
		return Socket;
	})(EventDispatcher)


	/**
	*<p><code>ColorFilter</code> 是颜色滤镜。</p>
	*/
	//class laya.filters.ColorFilter extends laya.filters.Filter
	var ColorFilter=(function(_super){
		function ColorFilter(mat){
			//this._mat=null;
			//this._alpha=null;
			ColorFilter.__super.call(this);
			if (!mat){
				mat=[0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0,0,0,1,0];
			}
			this._mat=new Float32Array(16);
			this._alpha=new Float32Array(4);
			var j=0;
			var z=0;
			for (var i=0;i < 20;i++){
				if (i % 5 !=4){
					this._mat[j++]=mat[i];
					}else {
					this._alpha[z++]=mat[i];
				}
			}
			this._action=RunDriver.createFilterAction(0x20);
			this._action.data=this;
		}

		__class(ColorFilter,'laya.filters.ColorFilter',_super);
		var __proto=ColorFilter.prototype;
		Laya.imps(__proto,{"laya.filters.IFilter":true})
		/**
		*@private 通知微端
		*/
		__proto.callNative=function(sp){
			var t=sp._$P.cf=this;
			sp.model && sp.model.setFilterMatrix&&sp.model.setFilterMatrix(this._mat,this._alpha);
		}

		/**@private */
		__getset(0,__proto,'type',function(){
			return 0x20;
		});

		/**@private */
		__getset(0,__proto,'action',function(){
			return this._action;
		});

		__getset(1,ColorFilter,'DEFAULT',function(){
			if (!ColorFilter._DEFAULT){
				ColorFilter._DEFAULT=new ColorFilter([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]);
			}
			return ColorFilter._DEFAULT;
		},laya.filters.Filter._$SET_DEFAULT);

		__getset(1,ColorFilter,'GRAY',function(){
			if (!ColorFilter._GRAY){
				ColorFilter._GRAY=new ColorFilter([0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0,0,0,1,0]);
			}
			return ColorFilter._GRAY;
		},laya.filters.Filter._$SET_GRAY);

		ColorFilter._DEFAULT=null
		ColorFilter._GRAY=null
		return ColorFilter;
	})(Filter)


	/**
	*<code>Resource</code> 资源存取类。
	*/
	//class laya.resource.Resource extends laya.events.EventDispatcher
	var Resource=(function(_super){
		function Resource(){
			this._id=0;
			this._lastUseFrameCount=0;
			this._memorySize=0;
			this._name=null;
			this._released=false;
			this._resourceManager=null;
			this.lock=false;
			Resource.__super.call(this);
			this._id=++Resource._uniqueIDCounter;
			Resource._loadedResources.push(this);
			Resource._isLoadedResourcesSorted=false;
			this._released=true;
			this.lock=false;
			this._memorySize=0;
			this._lastUseFrameCount=-1;
			(ResourceManager.currentResourceManager)&& (ResourceManager.currentResourceManager.addResource(this));
		}

		__class(Resource,'laya.resource.Resource',_super);
		var __proto=Resource.prototype;
		Laya.imps(__proto,{"laya.resource.IDispose":true})
		/**重新创建资源。override it，同时修改memorySize属性、处理startCreate()和compoleteCreate()方法。*/
		__proto.recreateResource=function(){
			this.startCreate();
			this.completeCreate();
		}

		/**销毁资源，override it,同时修改memorySize属性。*/
		__proto.detoryResource=function(){}
		/**
		*激活资源，使用资源前应先调用此函数激活。
		*@param force 是否强制创建。
		*/
		__proto.activeResource=function(force){
			(force===void 0)&& (force=false);
			this._lastUseFrameCount=Stat.loopCount;
			if (this._released || force){
				this.recreateResource();
			}
		}

		/**
		*释放资源。
		*@param force 是否强制释放。
		*@return 是否成功释放。
		*/
		__proto.releaseResource=function(force){
			(force===void 0)&& (force=false);
			if (!force && this.lock)
				return false;
			if (!this._released || force){
				this.detoryResource();
				this._released=true;
				this._lastUseFrameCount=-1;
				this.event(/*laya.events.Event.RELEASED*/"released",this);
				return true;
				}else {
				return false;
			}
		}

		/**
		*设置唯一名字,如果名字重复则自动加上“-copy”。
		*@param newName 名字。
		*/
		__proto.setUniqueName=function(newName){
			var isUnique=true;
			for (var i=0;i < Resource._loadedResources.length;i++){
				if (Resource._loadedResources[i]._name!==newName || Resource._loadedResources[i]===this)
					continue ;
				isUnique=false;
				return;
			}
			if (isUnique){
				if (this.name !=newName){
					this.name=newName;
					Resource._isLoadedResourcesSorted=false;
				}
				}else{
				this.setUniqueName(newName.concat("-copy"));
			}
		}

		/**
		*<p>彻底清理资源。</p>
		*<p><b>注意：</b>会强制解锁清理。</p>
		*/
		__proto.dispose=function(){
			if (this._resourceManager!==null)
				throw new Error("附属于resourceManager的资源不能独立释放！");
			this.lock=false;
			this.releaseResource();
			var index=Resource._loadedResources.indexOf(this);
			if (index!==-1){
				Resource._loadedResources.splice(index,1);
				Resource._isLoadedResourcesSorted=false;
			}
		}

		/**开始资源激活。*/
		__proto.startCreate=function(){
			this.event(/*laya.events.Event.RECOVERING*/"recovering",this);
		}

		/**完成资源激活。*/
		__proto.completeCreate=function(){
			this._released=false;
			this.event(/*laya.events.Event.RECOVERED*/"recovered",this);
		}

		/**
		*获取唯一标识ID(通常用于优化或识别)。
		*/
		__getset(0,__proto,'id',function(){
			return this._id;
		});

		/**
		*是否已释放。
		*/
		__getset(0,__proto,'released',function(){
			return this._released;
		});

		/**
		*设置名字
		*/
		/**
		*获取名字。
		*/
		__getset(0,__proto,'name',function(){
			return this._name;
			},function(value){
			if ((value || value!=="")&& this.name!==value){
				this._name=value;
				Resource._isLoadedResourcesSorted=false;
			}
		});

		/**
		*距离上次使用帧率。
		*/
		__getset(0,__proto,'lastUseFrameCount',function(){
			return this._lastUseFrameCount;
		});

		/**
		*资源管理员。
		*/
		__getset(0,__proto,'resourceManager',function(){
			return this._resourceManager;
		});

		/**
		*占用内存尺寸。
		*/
		__getset(0,__proto,'memorySize',function(){
			return this._memorySize;
			},function(value){
			var offsetValue=value-this._memorySize;
			this._memorySize=value;
			this.resourceManager && this.resourceManager.addSize(offsetValue);
		});

		/**
		*本类型排序后的已载入资源。
		*/
		__getset(1,Resource,'sortedLoadedResourcesByName',function(){
			if (!Resource._isLoadedResourcesSorted){
				Resource._isLoadedResourcesSorted=true;
				Resource._loadedResources.sort(Resource.compareResourcesByName);
			}
			return Resource._loadedResources;
		},laya.events.EventDispatcher._$SET_sortedLoadedResourcesByName);

		Resource.getLoadedResourceByIndex=function(index){
			return Resource._loadedResources[index];
		}

		Resource.getLoadedResourcesCount=function(){
			return Resource._loadedResources.length;
		}

		Resource.compareResourcesByName=function(left,right){
			if (left===right)
				return 0;
			var x=left.name;
			var y=right.name;
			if (x===null){
				if (y===null)
					return 0;
				else
				return-1;
				}else {
				if (y==null)
					return 1;
				else {
					var retval=x.localeCompare(y);
					if (retval !=0)
						return retval;
					else {
						right.setUniqueName(y);
						y=right.name;
						return x.localeCompare(y);
					}
				}
			}
		}

		Resource.animationCache={};
		Resource.meshCache={};
		Resource.materialCache={};
		Resource._uniqueIDCounter=0;
		Resource._loadedResources=[];
		Resource._isLoadedResourcesSorted=false;
		return Resource;
	})(EventDispatcher)


	/**
	*<code>Texture</code> 是一个纹理处理类。
	*/
	//class laya.resource.Texture extends laya.events.EventDispatcher
	var Texture=(function(_super){
		function Texture(bitmap,uv){
			//this.bitmap=null;
			//this.uv=null;
			this.offsetX=0;
			this.offsetY=0;
			this.sourceWidth=0;
			this.sourceHeight=0;
			//this._loaded=false;
			this._w=0;
			this._h=0;
			//this.$_GID=NaN;
			//this.url=null;
			this._uvID=0;
			Texture.__super.call(this);
			if (bitmap){
				bitmap.useNum++;
			}
			this.setTo(bitmap,uv);
		}

		__class(Texture,'laya.resource.Texture',_super);
		var __proto=Texture.prototype;
		/**
		*设置此对象的位图资源、UV数据信息。
		*@param bitmap 位图资源
		*@param uv UV数据信息
		*/
		__proto.setTo=function(bitmap,uv){
			this.bitmap=bitmap;
			this.uv=uv || Texture.DEF_UV;
			if (bitmap){
				this._w=bitmap.width;
				this._h=bitmap.height;
				this.sourceWidth=this.sourceWidth || this._w;
				this.sourceHeight=this.sourceHeight || this._h
				this._loaded=this._w > 0;
				var _this=this;
				if (this._loaded){
					RunDriver.addToAtlas && RunDriver.addToAtlas(_this);
					}else {
					var bm=bitmap;
					if ((bm instanceof laya.resource.HTMLImage )&& bm.image)
						bm.image.addEventListener('load',function(e){
						RunDriver.addToAtlas && RunDriver.addToAtlas(_this);
					},false);
				}
			}
		}

		/**@private 激活资源。*/
		__proto.active=function(){
			this.bitmap.activeResource();
		}

		/**
		*销毁纹理（分直接销毁，跟计数销毁两种）
		*@param foreDiposeTexture true为强制销毁主纹理，false是通过计数销毁纹理
		*/
		__proto.destroy=function(foreDiposeTexture){
			(foreDiposeTexture===void 0)&& (foreDiposeTexture=false);
			if (this.bitmap && (this.bitmap).useNum > 0){
				if (foreDiposeTexture){
					this.bitmap.dispose();
					(this.bitmap).useNum=0;
					}else {
					(this.bitmap).useNum--;
					if ((this.bitmap).useNum==0){
						this.bitmap.dispose();
					}
				}
				this.bitmap=null;
				if (this.url && this===Laya.loader.getRes(this.url))Laya.loader.clearRes(this.url);
				this._loaded=false;
			}
		}

		/**
		*加载指定地址的图片。
		*@param url 图片地址。
		*/
		__proto.load=function(url){
			var _$this=this;
			this._loaded=false;
			var fileBitmap=(this.bitmap || (this.bitmap=HTMLImage.create(URL.formatURL(url))));
			if (fileBitmap){
				fileBitmap.useNum++;
			};
			var _this=this;
			fileBitmap.onload=function (){
				fileBitmap.onload=null;
				_this._loaded=true;
				_$this.sourceWidth=_$this._w=fileBitmap.width;
				_$this.sourceHeight=_$this._h=fileBitmap.height;
				_this.event(/*laya.events.Event.LOADED*/"loaded",this);
				(RunDriver.addToAtlas)&& (RunDriver.addToAtlas(_this));
			};
		}

		/**@private */
		__proto.addTextureToAtlas=function(e){
			RunDriver.addTextureToAtlas(this);
		}

		/**
		*获取Texture上的某个区域的像素点
		*@param x
		*@param y
		*@param width
		*@param height
		*@return 返回像素点集合
		*/
		__proto.getPixels=function(x,y,width,height){
			if (Render.isWebGL){
				return RunDriver.getTexturePixels(this,x,y,width,height);
				}else {
				Browser.canvas.size(x+width,y+height);
				Browser.context.drawImage(this.bitmap.source,0,0);
				var info=Browser.context.getImageData(x,y,width,height);
			}
			return info.data;
		}

		/**激活并获取资源。*/
		__getset(0,__proto,'source',function(){
			this.bitmap.activeResource();
			return this.bitmap.source;
		});

		/**
		*表示是否加载成功，只能表示初次载入成功（通常包含下载和载入）,并不能完全表示资源是否可立即使用（资源管理机制释放影响等）。
		*/
		__getset(0,__proto,'loaded',function(){
			return this._loaded;
		});

		/**
		*表示资源是否已释放。
		*/
		__getset(0,__proto,'released',function(){
			return this.bitmap.released;
		});

		/**实际宽度。*/
		__getset(0,__proto,'width',function(){
			if (this._w)return this._w;
			return (this.uv && this.uv!==Texture.DEF_UV)? (this.uv[2]-this.uv[0])*this.bitmap.width :this.bitmap.width;
			},function(value){
			this._w=value;
			this.sourceWidth || (this.sourceWidth=value);
		});

		/**
		*通过外部设置是否启用纹理平铺(后面要改成在着色器里计算)
		*/
		/**
		*获取当前纹理是否启用了纹理平铺
		*/
		__getset(0,__proto,'repeat',function(){
			if (Render.isWebGL && this.bitmap){
				return this.bitmap.repeat;
			}
			return true;
			},function(value){
			if (value){
				if (Render.isWebGL && this.bitmap){
					this.bitmap.repeat=value;
					if (value){
						this.bitmap.enableMerageInAtlas=false;
					}
				}
			}
		});

		/**实际高度。*/
		__getset(0,__proto,'height',function(){
			if (this._h)return this._h;
			return (this.uv && this.uv!==Texture.DEF_UV)? (this.uv[5]-this.uv[1])*this.bitmap.height :this.bitmap.height;
			},function(value){
			this._h=value;
			this.sourceHeight || (this.sourceHeight=value);
		});

		/**
		*设置线性采样的状态（目前只能第一次绘制前设置false生效,来关闭线性采样）
		*/
		/**
		*获取当前纹理是否启用了线性采样
		*/
		__getset(0,__proto,'isLinearSampling',function(){
			return Render.isWebGL ? (this.bitmap.minFifter !=0x2600):true;
			},function(value){
			if (!value && Render.isWebGL){
				if (!value && (this.bitmap.minFifter==-1)&& (this.bitmap.magFifter==-1)){
					this.bitmap.minFifter=0x2600;
					this.bitmap.magFifter=0x2600;
					this.bitmap.enableMerageInAtlas=false;
				}
			}
		});

		Texture.moveUV=function(offsetX,offsetY,uv){
			for (var i=0;i < 8;i+=2){
				uv[i]+=offsetX;
				uv[i+1]+=offsetY;
			}
			return uv;
		}

		Texture.create=function(source,x,y,width,height,offsetX,offsetY,sourceWidth,sourceHeight){
			(offsetX===void 0)&& (offsetX=0);
			(offsetY===void 0)&& (offsetY=0);
			(sourceWidth===void 0)&& (sourceWidth=0);
			(sourceHeight===void 0)&& (sourceHeight=0);
			var btex=(source instanceof laya.resource.Texture );
			var uv=btex ? source.uv :Texture.DEF_UV;
			var bitmap=btex ? source.bitmap :source;
			var tex=new Texture(bitmap,null);
			tex.width=width;
			tex.height=height;
			tex.offsetX=offsetX;
			tex.offsetY=offsetY;
			tex.sourceWidth=sourceWidth || width;
			tex.sourceHeight=sourceHeight || height;
			var dwidth=1 / bitmap.width;
			var dheight=1 / bitmap.height;
			x *=dwidth;
			y *=dheight;
			width *=dwidth;
			height *=dheight;
			var u1=tex.uv[0],v1=tex.uv[1],u2=tex.uv[4],v2=tex.uv[5];
			var inAltasUVWidth=(u2-u1),inAltasUVHeight=(v2-v1);
			var oriUV=Texture.moveUV(uv[0],uv[1],[x,y,x+width,y,x+width,y+height,x,y+height]);
			tex.uv=[u1+oriUV[0] *inAltasUVWidth,v1+oriUV[1] *inAltasUVHeight,u2-(1-oriUV[2])*inAltasUVWidth,v1+oriUV[3] *inAltasUVHeight,u2-(1-oriUV[4])*inAltasUVWidth,v2-(1-oriUV[5])*inAltasUVHeight,u1+oriUV[6] *inAltasUVWidth,v2-(1-oriUV[7])*inAltasUVHeight];
			return tex;
		}

		Texture.createFromTexture=function(texture,x,y,width,height){
			var rect=Rectangle.TEMP.setTo(x-texture.offsetX,y-texture.offsetY,width,height);
			var result=rect.intersection(Texture._rect1.setTo(0,0,texture.width,texture.height),Texture._rect2);
			if (result)
				var tex=Texture.create(texture,result.x,result.y,result.width,result.height,result.x-rect.x,result.y-rect.y,width,height);
			else return null;
			tex.bitmap.useNum--;
			return tex;
		}

		Texture.DEF_UV=[0,0,1.0,0,1.0,1.0,0,1.0];
		Texture.INV_UV=[0,1,1.0,1,1.0,0.0,0,0.0];
		Texture._rect1=new Rectangle();
		Texture._rect2=new Rectangle();
		return Texture;
	})(EventDispatcher)


	/**
	*<code>TimeLine</code> 是一个用来创建时间轴动画的类。
	*/
	//class laya.utils.TimeLine extends laya.events.EventDispatcher
	var TimeLine=(function(_super){
		var tweenData;
		function TimeLine(){
			this._labelDic=null;
			this._tweenDic={};
			this._tweenDataList=[];
			this._endTweenDataList=null;
			this._currTime=0;
			this._lastTime=0;
			this._startTime=0;
			this._index=0;
			this._gidIndex=0;
			this._firstTweenDic={};
			this._startTimeSort=false;
			this._endTimeSort=false;
			this._loopKey=false;
			this.scale=1;
			this._frameRate=60;
			this._frameIndex=0;
			this._total=0;
			TimeLine.__super.call(this);
		}

		__class(TimeLine,'laya.utils.TimeLine',_super);
		var __proto=TimeLine.prototype;
		/**
		*控制一个对象，从当前点移动到目标点。
		*@param target 要控制的对象。
		*@param props 要控制对象的属性。
		*@param duration 对象TWEEN的时间。
		*@param ease 缓动类型
		*@param offset 相对于上一个对象，偏移多长时间（单位：毫秒）。
		*/
		__proto.to=function(target,props,duration,ease,offset){
			(offset===void 0)&& (offset=0);
			return this._create(target,props,duration,ease,offset,true);
		}

		/**
		*从 props 属性，缓动到当前状态。
		*@param target target 目标对象(即将更改属性值的对象)
		*@param props 要控制对象的属性
		*@param duration 对象TWEEN的时间
		*@param ease 缓动类型
		*@param offset 相对于上一个对象，偏移多长时间（单位：毫秒）
		*/
		__proto.from=function(target,props,duration,ease,offset){
			(offset===void 0)&& (offset=0);
			return this._create(target,props,duration,ease,offset,false);
		}

		/**@private */
		__proto._create=function(target,props,duration,ease,offset,isTo){
			var tTweenData=new tweenData();
			tTweenData.isTo=isTo;
			tTweenData.type=0;
			tTweenData.target=target;
			tTweenData.duration=duration;
			tTweenData.data=props;
			tTweenData.startTime=this._startTime+offset;
			tTweenData.endTime=tTweenData.startTime+tTweenData.duration;
			tTweenData.ease=ease;
			this._startTime=Math.max(tTweenData.endTime,this._startTime);
			this._tweenDataList.push(tTweenData);
			this._startTimeSort=true;
			this._endTimeSort=true;
			return this;
		}

		/**
		*在时间队列中加入一个标签。
		*@param label 标签名称。
		*@param offset 标签相对于上个动画的偏移时间(单位：毫秒)。
		*/
		__proto.addLabel=function(label,offset){
			var tTweenData=new tweenData();
			tTweenData.type=1;
			tTweenData.data=label;
			tTweenData.endTime=tTweenData.startTime=this._startTime+offset;
			this._labelDic || (this._labelDic={});
			this._labelDic[label]=tTweenData;
			this._tweenDataList.push(tTweenData);
			return this;
		}

		/**
		*移除指定的标签
		*@param label
		*/
		__proto.removeLabel=function(label){
			if (this._labelDic && this._labelDic[label]){
				var tTweenData=this._labelDic[label];
				if (tTweenData){
					var tIndex=this._tweenDataList.indexOf(tTweenData);
					if (tIndex >-1){
						this._tweenDataList.splice(tIndex,1);
					}
				}
				delete this._labelDic[label];
			}
		}

		/**
		*动画从整个动画的某一时间开始。
		*@param time(单位：毫秒)。
		*/
		__proto.gotoTime=function(time){
			if (this._tweenDataList==null || this._tweenDataList.length==0)return;
			var tTween;
			var tObject;
			for (var p in this._firstTweenDic){
				tObject=this._firstTweenDic[p];
				if (tObject){
					for (var tDataP in tObject){
						if (tObject.diyTarget.hasOwnProperty(tDataP)){
							tObject.diyTarget[tDataP]=tObject[tDataP];
						}
					}
				}
			}
			for (p in this._tweenDic){
				tTween=this._tweenDic[p];
				tTween.clear();
				delete this._tweenDic[p];
			}
			this._index=0;
			this._gidIndex=0;
			this._currTime=time;
			this._lastTime=Browser.now();
			var tTweenDataCopyList;
			if (this._endTweenDataList==null || this._endTimeSort){
				this._endTimeSort=false;
				this._endTweenDataList=tTweenDataCopyList=this._tweenDataList.concat();
				function Compare (paraA,paraB){
					if (paraA.endTime > paraB.endTime){
						return 1;
						}else if (paraA.endTime < paraB.endTime){
						return-1;
						}else {
						return 0;
					}
				}
				tTweenDataCopyList.sort(Compare);
				}else {
				tTweenDataCopyList=this._endTweenDataList
			};
			var tTweenData;
			for (var i=0,n=tTweenDataCopyList.length;i < n;i++){
				tTweenData=tTweenDataCopyList[i];
				if (tTweenData.type==0){
					if (time >=tTweenData.endTime){
						this._index=Math.max(this._index,i+1);
						var props=tTweenData.data;
						for (var tP in props){
							if (tTweenData.isTo){
								tTweenData.target[tP]=props[tP];
							}
						}
						}else {
						break ;
					}
				}
			}
			for (i=0,n=this._tweenDataList.length;i < n;i++){
				tTweenData=this._tweenDataList[i];
				if (tTweenData.type==0){
					if (time >=tTweenData.startTime && time < tTweenData.endTime){
						this._index=Math.max(this._index,i+1);
						this._gidIndex++;
						tTween=Pool.getItemByClass("tween",Tween);
						tTween._create(tTweenData.target,tTweenData.data,tTweenData.duration,tTweenData.ease,Handler.create(this,this._animComplete,[this._gidIndex]),0,false,tTweenData.isTo,true,false);
						tTween.setStartTime(this._currTime-(time-tTweenData.startTime));
						tTween._updateEase(this._currTime);
						tTween.gid=this._gidIndex;
						this._tweenDic[this._gidIndex]=tTween;
					}
				}
			}
		}

		/**
		*从指定的标签开始播。
		*@param Label 标签名。
		*/
		__proto.gotoLabel=function(Label){
			if (this._labelDic==null)return;
			var tLabelData=this._labelDic[Label];
			if (tLabelData)this.gotoTime(tLabelData.startTime);
		}

		/**
		*暂停整个动画。
		*/
		__proto.pause=function(){
			Laya.timer.clear(this,this._update);
		}

		/**
		*恢复暂停动画的播放。
		*/
		__proto.resume=function(){
			this.play(this._currTime,this._loopKey);
		}

		/**
		*播放动画。
		*@param timeOrLabel 开启播放的时间点或标签名。
		*@param loop 是否循环播放。
		*/
		__proto.play=function(timeOrLabel,loop){
			(timeOrLabel===void 0)&& (timeOrLabel=0);
			(loop===void 0)&& (loop=false);
			if (this._startTimeSort){
				this._startTimeSort=false;
				function Compare (paraA,paraB){
					if (paraA.startTime > paraB.startTime){
						return 1;
						}else if (paraA.startTime < paraB.startTime){
						return-1;
						}else {
						return 0;
					}
				}
				this._tweenDataList.sort(Compare);
				for (var i=0,n=this._tweenDataList.length;i < n;i++){
					var tTweenData=this._tweenDataList[i];
					if (tTweenData !=null && tTweenData.type==0){
						var tTarget=tTweenData.target;
						var gid=(tTarget.$_GID || (tTarget.$_GID=Utils.getGID()));
						var tSrcData=null;
						if (this._firstTweenDic[gid]==null){
							tSrcData={};
							tSrcData.diyTarget=tTarget;
							this._firstTweenDic[gid]=tSrcData;
							}else {
							tSrcData=this._firstTweenDic[gid];
						}
						for (var p in tTweenData.data){
							if (tSrcData[p]==null){
								tSrcData[p]=tTarget[p];
							}
						}
					}
				}
			}
			if ((typeof timeOrLabel=='string')){
				this.gotoLabel(timeOrLabel);
				}else {
				this.gotoTime(timeOrLabel);
			}
			this._loopKey=loop;
			this._lastTime=Browser.now();
			Laya.timer.frameLoop(1,this,this._update);
		}

		/**
		*更新当前动画。
		*/
		__proto._update=function(){
			if (this._currTime >=this._startTime){
				if (this._loopKey){
					this._complete();
					this.gotoTime(0);
					}else {
					this._complete();
					this.pause();
					return;
				}
			};
			var tNow=Browser.now();
			var tFrameTime=tNow-this._lastTime;
			var tCurrTime=this._currTime+=tFrameTime *this.scale;
			this._lastTime=tNow;
			var tTween;
			if (this._tweenDataList.length !=0 && this._index < this._tweenDataList.length){
				var tTweenData=this._tweenDataList[this._index];
				if (tCurrTime >=tTweenData.startTime){
					this._index++;
					if (tTweenData.type==0){
						this._gidIndex++;
						tTween=Pool.getItemByClass("tween",Tween);
						tTween._create(tTweenData.target,tTweenData.data,tTweenData.duration,tTweenData.ease,new Handler(this,this._animComplete,[this._gidIndex]),0,false,tTweenData.isTo,true,false);
						tTween.setStartTime(tCurrTime);
						tTween.gid=this._gidIndex;
						this._tweenDic[this._gidIndex]=tTween;
						}else {
						this.event(/*laya.events.Event.LABEL*/"label",tTweenData.data);
					}
				}
			}
			for (var p in this._tweenDic){
				tTween=this._tweenDic[p];
				tTween._updateEase(tCurrTime);
			}
		}

		/**
		*指定的动画索引处的动画播放完成后，把此动画从列表中删除。
		*@param index
		*/
		__proto._animComplete=function(index){
			var tTween=this._tweenDic[index];
			if (tTween)delete this._tweenDic[index];
		}

		/**@private */
		__proto._complete=function(){
			this.event(/*laya.events.Event.COMPLETE*/"complete");
		}

		/**
		*重置所有对象，复用对象的时候使用。
		*/
		__proto.reset=function(){
			var p;
			if (this._labelDic){
				for (p in this._labelDic){
					delete this._labelDic[p];
				}
			};
			var tTween;
			for (p in this._tweenDic){
				tTween=this._tweenDic[p];
				tTween.clear();
				delete this._tweenDic[p];
			}
			for (p in this._firstTweenDic){
				delete this._firstTweenDic[p];
			}
			this._endTweenDataList=null;
			this._tweenDataList.length=0;
			this._currTime=0;
			this._lastTime=0;
			this._startTime=0;
			this._index=0;
			this._gidIndex=0;
			this.scale=1;
			Laya.timer.clear(this,this._update);
		}

		/**
		*彻底销毁此对象。
		*/
		__proto.destroy=function(){
			this.reset();
			this._labelDic=null;
			this._tweenDic=null;
			this._tweenDataList=null;
			this._firstTweenDic=null;
		}

		/**
		*@private
		*设置帧索引
		*/
		/**
		*@private
		*得到帧索引
		*/
		__getset(0,__proto,'index',function(){
			return this._frameIndex;
			},function(value){
			this._frameIndex=value;
			this.gotoTime(this._frameIndex / this._frameRate *1000);
		});

		/**
		*得到总帧数据
		*/
		__getset(0,__proto,'total',function(){
			this._total=Math.floor(this._startTime / 1000 *this._frameRate);
			return this._total;
		});

		TimeLine.to=function(target,props,duration,ease,offset){
			(offset===void 0)&& (offset=0);
			return (new TimeLine()).to(target,props,duration,ease,offset);
		}

		TimeLine.from=function(target,props,duration,ease,offset){
			(offset===void 0)&& (offset=0);
			return (new TimeLine()).from(target,props,duration,ease,offset);
		}

		TimeLine.__init$=function(){
			//class tweenData
			tweenData=(function(){
				function tweenData(){
					this.type=0;
					this.isTo=true;
					this.startTime=NaN;
					this.endTime=NaN;
					this.target=null;
					this.duration=NaN;
					this.ease=null;
					this.data=null;
				}
				__class(tweenData,'');
				return tweenData;
			})()
		}

		return TimeLine;
	})(EventDispatcher)


	/**
	*<code>AutoBitmap</code> 类是用于表示位图图像或绘制图形的显示对象。
	*<p>封装了位置，宽高及九宫格的处理，供UI组件使用。</p>
	*/
	//class laya.ui.AutoBitmap extends laya.display.Graphics
	var AutoBitmap=(function(_super){
		function AutoBitmap(){
			this.autoCacheCmd=true;
			this._width=0;
			this._height=0;
			this._source=null;
			this._sizeGrid=null;
			this._isChanged=false;
			this._offset=null;
			AutoBitmap.__super.call(this);
		}

		__class(AutoBitmap,'laya.ui.AutoBitmap',_super);
		var __proto=AutoBitmap.prototype;
		/**@inheritDoc */
		__proto.destroy=function(){
			_super.prototype.destroy.call(this);
			this._source=null;
			this._sizeGrid=null;
			this._offset=null;
		}

		/**@private */
		__proto._setChanged=function(){
			if (!this._isChanged){
				this._isChanged=true;
				Laya.timer.callLater(this,this.changeSource);
			}
		}

		/**
		*@private
		*修改纹理资源。
		*/
		__proto.changeSource=function(){
			if (AutoBitmap.cacheCount++> 50)AutoBitmap.clearCache();
			this._isChanged=false;
			var source=this._source;
			if (!source || !source.bitmap)return;
			var width=this.width;
			var height=this.height;
			var sizeGrid=this._sizeGrid;
			var sw=source.sourceWidth;
			var sh=source.sourceHeight;
			if (!sizeGrid || (sw===width && sh===height)){
				this.clear();
				this.drawTexture(source,this._offset ? this._offset[0] :0,this._offset ? this._offset[1] :0,width,height);
				}else {
				source.$_GID || (source.$_GID=Utils.getGID());
				var key=source.$_GID+"."+width+"."+height+"."+sizeGrid.join(".");
				if (AutoBitmap.cmdCaches[key]){
					this.cmds=AutoBitmap.cmdCaches[key];
					return;
				}
				this.clear();
				var top=sizeGrid[0];
				var right=sizeGrid[1];
				var bottom=sizeGrid[2];
				var left=sizeGrid[3];
				var repeat=sizeGrid[4];
				if (left+right > width){
					right=0;
				}
				left && top && this.drawTexture(AutoBitmap.getTexture(source,0,0,left,top),0,0,left,top);
				right && top && this.drawTexture(AutoBitmap.getTexture(source,sw-right,0,right,top),width-right,0,right,top);
				left && bottom && this.drawTexture(AutoBitmap.getTexture(source,0,sh-bottom,left,bottom),0,height-bottom,left,bottom);
				right && bottom && this.drawTexture(AutoBitmap.getTexture(source,sw-right,sh-bottom,right,bottom),width-right,height-bottom,right,bottom);
				top && this.drawBitmap(repeat,AutoBitmap.getTexture(source,left,0,sw-left-right,top),left,0,width-left-right,top);
				bottom && this.drawBitmap(repeat,AutoBitmap.getTexture(source,left,sh-bottom,sw-left-right,bottom),left,height-bottom,width-left-right,bottom);
				left && this.drawBitmap(repeat,AutoBitmap.getTexture(source,0,top,left,sh-top-bottom),0,top,left,height-top-bottom);
				right && this.drawBitmap(repeat,AutoBitmap.getTexture(source,sw-right,top,right,sh-top-bottom),width-right,top,right,height-top-bottom);
				this.drawBitmap(repeat,AutoBitmap.getTexture(source,left,top,sw-left-right,sh-top-bottom),left,top,width-left-right,height-top-bottom);
				if (this.autoCacheCmd && !Render.isConchApp)AutoBitmap.cmdCaches[key]=this.cmds;
			}
			this._repaint();
		}

		__proto.drawBitmap=function(repeat,tex,x,y,width,height){
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			if (repeat)this.fillTexture(tex,x,y,width,height);
			else this.drawTexture(tex,x,y,width,height);
		}

		/**
		*当前实例的有效缩放网格数据。
		*<p>如果设置为null,则在应用任何缩放转换时，将正常缩放整个显示对象。</p>
		*<p>数据格式：[上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)]。
		*<ul><li>例如：[4,4,4,4,1]</li></ul></p>
		*<p> <code>sizeGrid</code> 的值如下所示：
		*<ol>
		*<li>上边距</li>
		*<li>右边距</li>
		*<li>下边距</li>
		*<li>左边距</li>
		*<li>是否重复填充(值为0：不重复填充，1：重复填充)</li>
		*</ol></p>
		*<p>当定义 <code>sizeGrid</code> 属性时，该显示对象被分割到以 <code>sizeGrid</code> 数据中的"上边距,右边距,下边距,左边距" 组成的矩形为基础的具有九个区域的网格中，该矩形定义网格的中心区域。网格的其它八个区域如下所示：
		*<ul>
		*<li>矩形上方的区域</li>
		*<li>矩形外的右上角</li>
		*<li>矩形左侧的区域</li>
		*<li>矩形右侧的区域</li>
		*<li>矩形外的左下角</li>
		*<li>矩形下方的区域</li>
		*<li>矩形外的右下角</li>
		*<li>矩形外的左上角</li>
		*</ul>
		*同时也支持3宫格，比如0,4,0,4,1为水平3宫格，4,0,4,0,1为垂直3宫格，3宫格性能比9宫格高。
		*</p>
		*/
		__getset(0,__proto,'sizeGrid',function(){
			return this._sizeGrid;
			},function(value){
			this._sizeGrid=value;
			this._setChanged();
		});

		/**
		*表示显示对象的宽度，以像素为单位。
		*/
		__getset(0,__proto,'width',function(){
			if (this._width)return this._width;
			if (this._source)return this._source.sourceWidth;
			return 0;
			},function(value){
			if (this._width !=value){
				this._width=value;
				this._setChanged();
			}
		});

		/**
		*表示显示对象的高度，以像素为单位。
		*/
		__getset(0,__proto,'height',function(){
			if (this._height)return this._height;
			if (this._source)return this._source.sourceHeight;
			return 0;
			},function(value){
			if (this._height !=value){
				this._height=value;
				this._setChanged();
			}
		});

		/**
		*对象的纹理资源。
		*@see laya.resource.Texture
		*/
		__getset(0,__proto,'source',function(){
			return this._source;
			},function(value){
			if (value){
				this._source=value
				this._setChanged();
				}else {
				this._source=null;
				this.clear();
			}
		});

		AutoBitmap.getTexture=function(tex,x,y,width,height){
			if (width <=0)width=1;
			if (height <=0)height=1;
			tex.$_GID || (tex.$_GID=Utils.getGID())
			var key=tex.$_GID+"."+x+"."+y+"."+width+"."+height;
			var texture=AutoBitmap.textureCache[key];
			if (!texture){
				texture=AutoBitmap.textureCache[key]=Texture.createFromTexture(tex,x,y,width,height);
			}
			return texture;
		}

		AutoBitmap.clearCache=function(){
			AutoBitmap.cacheCount=0;
			AutoBitmap.cmdCaches={};
			AutoBitmap.textureCache={};
		}

		AutoBitmap.setCache=function(key,value){
			AutoBitmap.cacheCount++;
			AutoBitmap.textureCache[key]=value;
		}

		AutoBitmap.getCache=function(key){
			return AutoBitmap.textureCache[key];
		}

		AutoBitmap.cmdCaches={};
		AutoBitmap.cacheCount=0;
		AutoBitmap.textureCache={};
		return AutoBitmap;
	})(Graphics)


	/**
	*消息中心，用来发送IDEEvent类定义的事件，调用IDE内部功能
	*/
	//class ide.managers.Notice extends laya.events.EventDispatcher
	var Notice=(function(_super){
		function Notice(){Notice.__super.call(this);;
		};

		__class(Notice,'ide.managers.Notice',_super);
		Notice.notify=function(type,data){}
		Notice.listen=function(type,caller,fun,args,cancelBefore){
			(cancelBefore===void 0)&& (cancelBefore=false);
		}

		Notice.cancel=function(type,caller,fun){}
		return Notice;
	})(EventDispatcher)


	/**
	*<code>UIEvent</code> 类用来定义UI组件类的事件类型。
	*/
	//class laya.ui.UIEvent extends laya.events.Event
	var UIEvent=(function(_super){
		function UIEvent(){UIEvent.__super.call(this);;
		};

		__class(UIEvent,'laya.ui.UIEvent',_super);
		UIEvent.SHOW_TIP="showtip";
		UIEvent.HIDE_TIP="hidetip";
		return UIEvent;
	})(Event)


	/**
	*<p> <code>Sprite</code> 类是基本显示列表构造块：一个可显示图形并且也可包含子项的显示列表节点。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Text</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.display.Sprite;
		*import laya.events.Event;
		*
		*public class Sprite_Example
		*{
			*private var sprite:Sprite;
			*private var shape:Sprite
			*public function Sprite_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*private function onInit():void
			*{
				*sprite=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
				*sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
				*sprite.x=200;//设置 sprite 对象相对于父容器的水平方向坐标值。
				*sprite.y=200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
				*sprite.pivotX=0;//设置 sprite 对象的水平方法轴心点坐标。
				*sprite.pivotY=0;//设置 sprite 对象的垂直方法轴心点坐标。
				*Laya.stage.addChild(sprite);//将此 sprite 对象添加到显示列表。
				*sprite.on(Event.CLICK,this,onClickSprite);//给 sprite 对象添加点击事件侦听。
				*shape=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
				*shape.graphics.drawRect(0,0,100,100,"#ccff00","#ff0000",2);//绘制一个有边框的填充矩形。
				*shape.x=400;//设置 shape 对象相对于父容器的水平方向坐标值。
				*shape.y=200;//设置 shape 对象相对于父容器的垂直方向坐标值。
				*shape.width=100;//设置 shape 对象的宽度。
				*shape.height=100;//设置 shape 对象的高度。
				*shape.pivotX=50;//设置 shape 对象的水平方法轴心点坐标。
				*shape.pivotY=50;//设置 shape 对象的垂直方法轴心点坐标。
				*Laya.stage.addChild(shape);//将此 shape 对象添加到显示列表。
				*shape.on(Event.CLICK,this,onClickShape);//给 shape 对象添加点击事件侦听。
				*}
			*private function onClickSprite():void
			*{
				*trace("点击 sprite 对象。");
				*sprite.rotation+=5;//旋转 sprite 对象。
				*}
			*private function onClickShape():void
			*{
				*trace("点击 shape 对象。");
				*shape.rotation+=5;//旋转 shape 对象。
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*var sprite;
	*var shape;
	*Sprite_Example();
	*function Sprite_Example()
	*{
		*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
		*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
		*onInit();
		*}
	*function onInit()
	*{
		*sprite=new laya.display.Sprite();//创建一个 Sprite 类的实例对象 sprite 。
		*sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
		*sprite.x=200;//设置 sprite 对象相对于父容器的水平方向坐标值。
		*sprite.y=200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
		*sprite.pivotX=0;//设置 sprite 对象的水平方法轴心点坐标。
		*sprite.pivotY=0;//设置 sprite 对象的垂直方法轴心点坐标。
		*Laya.stage.addChild(sprite);//将此 sprite 对象添加到显示列表。
		*sprite.on(Event.CLICK,this,onClickSprite);//给 sprite 对象添加点击事件侦听。
		*shape=new laya.display.Sprite();//创建一个 Sprite 类的实例对象 sprite 。
		*shape.graphics.drawRect(0,0,100,100,"#ccff00","#ff0000",2);//绘制一个有边框的填充矩形。
		*shape.x=400;//设置 shape 对象相对于父容器的水平方向坐标值。
		*shape.y=200;//设置 shape 对象相对于父容器的垂直方向坐标值。
		*shape.width=100;//设置 shape 对象的宽度。
		*shape.height=100;//设置 shape 对象的高度。
		*shape.pivotX=50;//设置 shape 对象的水平方法轴心点坐标。
		*shape.pivotY=50;//设置 shape 对象的垂直方法轴心点坐标。
		*Laya.stage.addChild(shape);//将此 shape 对象添加到显示列表。
		*shape.on(laya.events.Event.CLICK,this,onClickShape);//给 shape 对象添加点击事件侦听。
		*}
	*function onClickSprite()
	*{
		*console.log("点击 sprite 对象。");
		*sprite.rotation+=5;//旋转 sprite 对象。
		*}
	*function onClickShape()
	*{
		*console.log("点击 shape 对象。");
		*shape.rotation+=5;//旋转 shape 对象。
		*}
	*</listing>
	*<listing version="3.0">
	*import Sprite=laya.display.Sprite;
	*class Sprite_Example {
		*private sprite:Sprite;
		*private shape:Sprite
		*public Sprite_Example(){
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*this.onInit();
			*}
		*private onInit():void {
			*this.sprite=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
			*this.sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
			*this.sprite.x=200;//设置 sprite 对象相对于父容器的水平方向坐标值。
			*this.sprite.y=200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
			*this.sprite.pivotX=0;//设置 sprite 对象的水平方法轴心点坐标。
			*this.sprite.pivotY=0;//设置 sprite 对象的垂直方法轴心点坐标。
			*Laya.stage.addChild(this.sprite);//将此 sprite 对象添加到显示列表。
			*this.sprite.on(laya.events.Event.CLICK,this,this.onClickSprite);//给 sprite 对象添加点击事件侦听。
			*this.shape=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
			*this.shape.graphics.drawRect(0,0,100,100,"#ccff00","#ff0000",2);//绘制一个有边框的填充矩形。
			*this.shape.x=400;//设置 shape 对象相对于父容器的水平方向坐标值。
			*this.shape.y=200;//设置 shape 对象相对于父容器的垂直方向坐标值。
			*this.shape.width=100;//设置 shape 对象的宽度。
			*this.shape.height=100;//设置 shape 对象的高度。
			*this.shape.pivotX=50;//设置 shape 对象的水平方法轴心点坐标。
			*this.shape.pivotY=50;//设置 shape 对象的垂直方法轴心点坐标。
			*Laya.stage.addChild(this.shape);//将此 shape 对象添加到显示列表。
			*this.shape.on(laya.events.Event.CLICK,this,this.onClickShape);//给 shape 对象添加点击事件侦听。
			*}
		*private onClickSprite():void {
			*console.log("点击 sprite 对象。");
			*this.sprite.rotation+=5;//旋转 sprite 对象。
			*}
		*private onClickShape():void {
			*console.log("点击 shape 对象。");
			*this.shape.rotation+=5;//旋转 shape 对象。
			*}
		*}
	*</listing>
	*/
	//class laya.display.Sprite extends laya.display.Node
	var Sprite=(function(_super){
		function Sprite(){
			this.mouseThrough=false;
			this._transform=null;
			this._tfChanged=false;
			this._x=0;
			this._y=0;
			this._width=0;
			this._height=0;
			this._repaint=1;
			this._mouseEnableState=0;
			this._zOrder=0;
			this._graphics=null;
			this._renderType=0;
			this.autoSize=false;
			this.hitTestPrior=false;
			this._optimizeScrollRect=false;
			Sprite.__super.call(this);
			this._style=Style.EMPTY;
		}

		__class(Sprite,'laya.display.Sprite',_super);
		var __proto=Sprite.prototype;
		Laya.imps(__proto,{"laya.display.ILayout":true})
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._style && this._style.destroy();
			this._transform=null;
			this._style=null;
			this._graphics=null;
		}

		/**根据zOrder进行重新排序。*/
		__proto.updateZOrder=function(){
			Utils.updateOrder(this._childs)&& this.repaint();
		}

		/**在设置cacheAs或staticCache=true的情况下，调用此方法会重新刷新缓存。*/
		__proto.reCache=function(){
			if (this._$P.cacheCanvas)this._$P.cacheCanvas.reCache=true;
		}

		/**
		*设置bounds大小，如果有设置，则不再通过getBounds计算
		*@param bound bounds矩形区域
		*/
		__proto.setBounds=function(bound){
			this._set$P("uBounds",bound);
		}

		/**
		*获取本对象在父容器坐标系的矩形显示区域。
		*<p><b>注意：</b>计算量较大，尽量少用。</p>
		*@return 矩形区域。
		*/
		__proto.getBounds=function(){
			if (!this._$P.mBounds)this._set$P("mBounds",new Rectangle());
			return Rectangle._getWrapRec(this._boundPointsToParent(),this._$P.mBounds);
		}

		/**
		*获取本对象在自己坐标系的矩形显示区域。
		*<p><b>注意：</b>计算量较大，尽量少用。</p>
		*@return 矩形区域。
		*/
		__proto.getSelfBounds=function(){
			if (!this._$P.mBounds)this._set$P("mBounds",new Rectangle());
			return Rectangle._getWrapRec(this._getBoundPointsM(false),this._$P.mBounds);
		}

		/**
		*@private
		*获取本对象在父容器坐标系的显示区域多边形顶点列表。
		*当显示对象链中有旋转时，返回多边形顶点列表，无旋转时返回矩形的四个顶点。
		*@param ifRotate 之前的对象链中是否有旋转。
		*@return 顶点列表。结构：[x1,y1,x2,y2,x3,y3,...]。
		*/
		__proto._boundPointsToParent=function(ifRotate){
			(ifRotate===void 0)&& (ifRotate=false);
			var pX=0,pY=0;
			if (this._style){
				pX=this._style._tf.translateX;
				pY=this._style._tf.translateY;
				ifRotate=ifRotate || (this._style._tf.rotate!==0);
				if (this._style.scrollRect){
					pX+=this._style.scrollRect.x;
					pY+=this._style.scrollRect.y;
				}
			};
			var pList=this._getBoundPointsM(ifRotate);
			if (!pList || pList.length < 1)return pList;
			if (pList.length !=8){
				pList=ifRotate ? GrahamScan.scanPList(pList):Rectangle._getWrapRec(pList,Rectangle.TEMP)._getBoundPoints();
			}
			if (!this.transform){
				Utils.transPointList(pList,this.x-pX,this.y-pY);
				return pList;
			};
			var tPoint=Point.TEMP;
			var i=0,len=pList.length;
			for (i=0;i < len;i+=2){
				tPoint.x=pList[i];
				tPoint.y=pList[i+1];
				this.toParentPoint(tPoint);
				pList[i]=tPoint.x;
				pList[i+1]=tPoint.y;
			}
			return pList;
		}

		/**
		*返回此实例中的绘图对象（ <code>Graphics</code> ）的显示区域。
		*@return 一个 Rectangle 对象，表示获取到的显示区域。
		*/
		__proto.getGraphicBounds=function(){
			if (!this._graphics)return Rectangle.TEMP.setTo(0,0,0,0);
			return this._graphics.getBounds();
		}

		/**
		*@private
		*获取自己坐标系的显示区域多边形顶点列表
		*@param ifRotate 当前的显示对象链是否由旋转
		*@return 顶点列表。结构：[x1,y1,x2,y2,x3,y3,...]。
		*/
		__proto._getBoundPointsM=function(ifRotate){
			(ifRotate===void 0)&& (ifRotate=false);
			if (this._$P.uBounds)return this._$P.uBounds._getBoundPoints();
			if (!this._$P.temBM)this._set$P("temBM",[]);
			if (this.scrollRect){
				var rst=Utils.clearArray(this._$P.temBM);
				var rec=Rectangle.TEMP;
				rec.copyFrom(this.scrollRect);
				Utils.concatArray(rst,rec._getBoundPoints());
				return rst;
			};
			var pList=this._graphics ? this._graphics.getBoundPoints():Utils.clearArray(this._$P.temBM);
			var child;
			var cList;
			var __childs;
			__childs=this._childs;
			for (var i=0,n=__childs.length;i < n;i++){
				child=__childs [i];
				if ((child instanceof laya.display.Sprite )&& child.visible==true){
					cList=child._boundPointsToParent(ifRotate);
					if (cList)
						pList=pList ? Utils.concatArray(pList,cList):cList;
				}
			}
			return pList;
		}

		/**
		*@private
		*获取样式。
		*@return 样式 Style 。
		*/
		__proto.getStyle=function(){
			this._style===Style.EMPTY && (this._style=new Style());
			return this._style;
		}

		/**
		*@private
		*设置样式。
		*@param value 样式。
		*/
		__proto.setStyle=function(value){
			this._style=value;
		}

		/**@private */
		__proto._adjustTransform=function(){
			'use strict';
			this._tfChanged=false;
			var style=this._style;
			var tf=style._tf;
			var sx=tf.scaleX,sy=tf.scaleY;
			var m;
			if (tf.rotate || sx!==1 || sy!==1 || tf.skewX || tf.skewY){
				m=this._transform || (this._transform=Matrix.create());
				m.bTransform=true;
				if (tf.rotate){
					var angle=tf.rotate *0.0174532922222222;
					var cos=m.cos=Math.cos(angle);
					var sin=m.sin=Math.sin(angle);
					m.a=sx *cos;
					m.b=sx *sin;
					m.c=-sy *sin;
					m.d=sy *cos;
					m.tx=m.ty=0;
					return m;
					}else {
					m.a=sx;
					m.d=sy;
					m.c=m.b=m.tx=m.ty=0;
					if (tf.skewX || tf.skewY){
						return m.skew(tf.skewX *0.0174532922222222,tf.skewY *0.0174532922222222);
					}
					return m;
				}
				}else {
				this._transform && this._transform.destroy();
				this._transform=null;
				this._renderType &=~ /*laya.renders.RenderSprite.TRANSFORM*/0x04;
			}
			return m;
		}

		/**
		*设置坐标位置。
		*@param x X 轴坐标。
		*@param y Y 轴坐标。
		*@return 返回对象本身。
		*/
		__proto.pos=function(x,y){
			if (this._x!==x || this._y!==y){
				this.x=x;
				this.y=y;
			}
			return this;
		}

		/**
		*设置轴心点。
		*@param x X轴心点。
		*@param y Y轴心点。
		*@return 返回对象本身。
		*/
		__proto.pivot=function(x,y){
			this.pivotX=x;
			this.pivotY=y;
			return this;
		}

		/**
		*设置宽高。
		*@param width 宽度。
		*@param hegiht 高度。
		*@return 返回对象本身。
		*/
		__proto.size=function(width,height){
			this.width=width;
			this.height=height;
			return this;
		}

		/**
		*设置缩放。
		*@param scaleX X轴缩放比例。
		*@param scaleY Y轴缩放比例。
		*@return 返回对象本身。
		*/
		__proto.scale=function(scaleX,scaleY){
			this.scaleX=scaleX;
			this.scaleY=scaleY;
			return this;
		}

		/**
		*设置倾斜角度。
		*@param skewX 水平倾斜角度。
		*@param skewY 垂直倾斜角度。
		*@return 返回对象本身
		*/
		__proto.skew=function(skewX,skewY){
			this.skewX=skewX;
			this.skewY=skewY;
			return this;
		}

		/**
		*更新、呈现显示对象。
		*@param context 渲染的上下文引用。
		*@param x X轴坐标。
		*@param y Y轴坐标。
		*/
		__proto.render=function(context,x,y){
			Stat.spriteCount++;
			RenderSprite.renders[this._renderType]._fun(this,context,x+this._x,y+this._y);
			this._repaint=0;
		}

		/**
		*绘制 <code>Sprite</code> 到 <code>canvas</code> 上。
		*@param canvasWidth 画布宽度。
		*@param canvasHeight 画布高度。
		*@param x 绘制的 X 轴偏移量。
		*@param y 绘制的 Y 轴偏移量。
		*@return HTMLCanvas 对象。
		*/
		__proto.drawToCanvas=function(canvasWidth,canvasHeight,offsetX,offsetY){
			return RunDriver.drawToCanvas(this,this._renderType,canvasWidth,canvasHeight,offsetX,offsetY);
		}

		/**
		*自定义更新、呈现显示对象。
		*<p><b>注意</b>不要在此函数内增加或删除树节点，否则会树节点遍历照成影响。</p>
		*@param context 渲染的上下文引用。
		*@param x X轴坐标。
		*@param y Y轴坐标。
		*/
		__proto.customRender=function(context,x,y){
			this._renderType |=/*laya.renders.RenderSprite.CUSTOM*/0x200;
		}

		/**
		*@private
		*应用滤镜。
		*/
		__proto._applyFilters=function(){
			if (Render.isWebGL)return;
			var _filters;
			_filters=this._$P.filters;
			if (!_filters || _filters.length < 1)return;
			for (var i=0,n=_filters.length;i < n;i++){
				_filters[i].action.apply(this._$P.cacheCanvas);
			}
		}

		/**
		*@private
		*查看当前原件中是否包含发光滤镜。
		*@return 一个 Boolean 值，表示当前原件中是否包含发光滤镜。
		*/
		__proto._isHaveGlowFilter=function(){
			var i=0,len=0;
			if (this.filters){
				for (i=0;i < this.filters.length;i++){
					if (this.filters[i].type==/*laya.filters.Filter.GLOW*/0x08){
						return true;
					}
				}
			}
			for (i=0,len=this._childs.length;i < len;i++){
				if (this._childs[i]._isHaveGlowFilter()){
					return true;
				}
			}
			return false;
		}

		/**
		*本地坐标转全局坐标。
		*@param point 本地坐标点。
		*@param createNewPoint 用于存储转换后的坐标的点。
		*@return 转换后的坐标的点。
		*/
		__proto.localToGlobal=function(point,createNewPoint){
			(createNewPoint===void 0)&& (createNewPoint=false);
			if (!this._displayedInStage || !point)return point;
			if (createNewPoint===true){
				point=new Point(point.x,point.y);
			};
			var ele=this;
			while (ele){
				if (ele==Laya.stage)break ;
				point=ele.toParentPoint(point);
				ele=ele.parent;
			}
			return point;
		}

		/**
		*全局坐标转本地坐标。
		*@param point 全局坐标点。
		*@param createNewPoint 用于存储转换后的坐标的点。
		*@return 转换后的坐标的点。
		*/
		__proto.globalToLocal=function(point,createNewPoint){
			(createNewPoint===void 0)&& (createNewPoint=false);
			if (!this._displayedInStage || !point)return point;
			if (createNewPoint===true){
				point=new Point(point.x,point.y);
			};
			var ele=this;
			var list=[];
			while (ele){
				if (ele==Laya.stage)break ;
				list.push(ele);
				ele=ele.parent;
			};
			var i=list.length-1;
			while (i >=0){
				ele=list[i];
				point=ele.fromParentPoint(point);
				i--;
			}
			return point;
		}

		/**
		*将本地坐标系坐标转换到父容器坐标系。
		*@param point 本地坐标点。
		*@return 转换后的点。
		*/
		__proto.toParentPoint=function(point){
			if (!point)return point;
			point.x-=this.pivotX;
			point.y-=this.pivotY;
			if (this.transform){
				this._transform.transformPoint(point);
			}
			point.x+=this._x;
			point.y+=this._y;
			var scroll=this._style.scrollRect;
			if (scroll){
				point.x-=scroll.x;
				point.y-=scroll.y;
			}
			return point;
		}

		/**
		*将父容器坐标系坐标转换到本地坐标系。
		*@param point 父容器坐标点。
		*@return 转换后的点。
		*/
		__proto.fromParentPoint=function(point){
			if (!point)return point;
			point.x-=this._x;
			point.y-=this._y;
			var scroll=this._style.scrollRect;
			if (scroll){
				point.x+=scroll.x;
				point.y+=scroll.y;
			}
			if (this.transform){
				this._transform.invertTransformPoint(point);
			}
			point.x+=this.pivotX;
			point.y+=this.pivotY;
			return point;
		}

		/**
		*使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
		*如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnable 的值为 true。
		*@param type 事件的类型。
		*@param caller 事件侦听函数的执行域。
		*@param listener 事件侦听函数。
		*@param args 事件侦听函数的回调参数。
		*@return 此 EventDispatcher 对象。
		*/
		__proto.on=function(type,caller,listener,args){
			if (this._mouseEnableState!==1 && this.isMouseEvent(type)){
				if (this._displayedInStage)this._$2__onDisplay();
				else laya.events.EventDispatcher.prototype.once.call(this,/*laya.events.Event.DISPLAY*/"display",this,this._$2__onDisplay);
			}
			return laya.events.EventDispatcher.prototype.on.call(this,type,caller,listener,args);
		}

		/**
		*使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
		*如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。
		*@param type 事件的类型。
		*@param caller 事件侦听函数的执行域。
		*@param listener 事件侦听函数。
		*@param args 事件侦听函数的回调参数。
		*@return 此 EventDispatcher 对象。
		*/
		__proto.once=function(type,caller,listener,args){
			if (this._mouseEnableState!==1 && this.isMouseEvent(type)){
				if (this._displayedInStage)this._$2__onDisplay();
				else laya.events.EventDispatcher.prototype.once.call(this,/*laya.events.Event.DISPLAY*/"display",this,this._$2__onDisplay);
			}
			return laya.events.EventDispatcher.prototype.once.call(this,type,caller,listener,args);
		}

		/**@private */
		__proto._$2__onDisplay=function(){
			if (this._mouseEnableState!==1){
				var ele=this;
				while (ele && ele._mouseEnableState!==1){
					ele.mouseEnabled=true;
					ele=ele.parent;
				}
			}
		}

		/**
		*加载并显示一个图片。功能等同于Graphics.loadImage
		*@param url 图片地址。
		*@param x 显示图片的x位置
		*@param y 显示图片的y位置
		*@param width 显示图片的宽度，设置为0表示使用图片默认宽度
		*@param height 显示图片的高度，设置为0表示使用图片默认高度
		*@param complete 加载完成回调
		*@return 返回精灵对象本身
		*/
		__proto.loadImage=function(url,x,y,width,height,complete){
			var _$this=this;
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			(width===void 0)&& (width=0);
			(height===void 0)&& (height=0);
			function loaded (tex){
				if (!_$this.destroyed){
					_$this.size(x+(width || tex.width),y+(height || tex.height));
					_$this.repaint();
					complete && complete.runWith(tex);
				}
			}
			this.graphics.loadImage(url,x,y,width,height,loaded);
			return this;
		}

		/**cacheAs后，设置自己和父对象缓存失效。*/
		__proto.repaint=function(){
			this.model&&this.model.repaint&&this.model.repaint();
			(this._repaint===0)&& (this._repaint=1,this.parentRepaint());
			if (this._$P && this._$P.maskParent){
				this._$P.maskParent.repaint();
			}
		}

		/**
		*@private
		*获取是否重新缓存。
		*@return 如果重新缓存值为 true，否则值为 false。
		*/
		__proto._needRepaint=function(){
			return (this._repaint!==0)&& this._$P.cacheCanvas && this._$P.cacheCanvas.reCache;
		}

		/**@inheritDoc */
		__proto._childChanged=function(child){
			if (this._childs.length)this._renderType |=/*laya.renders.RenderSprite.CHILDS*/0x800;
			else this._renderType &=~ /*laya.renders.RenderSprite.CHILDS*/0x800;
			if (child && (child).zOrder)Laya.timer.callLater(this,this.updateZOrder);
			this.repaint();
		}

		/**cacheAs时，设置所有父对象缓存失效。 */
		__proto.parentRepaint=function(){
			var p=this._parent;
			p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
		}

		/**
		*开始拖动此对象。
		*@param area 拖动区域，此区域为当前对象注册点活动区域（不包括对象宽高），可选。
		*@param hasInertia 鼠标松开后，是否还惯性滑动，默认为false，可选。
		*@param elasticDistance 橡皮筋效果的距离值，0为无橡皮筋效果，默认为0，可选。
		*@param elasticBackTime 橡皮筋回弹时间，单位为毫秒，默认为300毫秒，可选。
		*@param data 拖动事件携带的数据，可选。
		*@param disableMouseEvent 禁用其他对象的鼠标检测，默认为false，设置为true能提高性能
		*/
		__proto.startDrag=function(area,hasInertia,elasticDistance,elasticBackTime,data,disableMouseEvent){
			(hasInertia===void 0)&& (hasInertia=false);
			(elasticDistance===void 0)&& (elasticDistance=0);
			(elasticBackTime===void 0)&& (elasticBackTime=300);
			(disableMouseEvent===void 0)&& (disableMouseEvent=false);
			this._$P.dragging || (this._set$P("dragging",new Dragging()));
			this._$P.dragging.start(this,area,hasInertia,elasticDistance,elasticBackTime,data,disableMouseEvent);
		}

		/**停止拖动此对象。*/
		__proto.stopDrag=function(){
			this._$P.dragging && this._$P.dragging.stop();
		}

		/**@private */
		__proto._setDisplay=function(value){
			if (!value && this._$P.cacheCanvas && this._$P.cacheCanvas.ctx){
				Pool.recover("RenderContext",this._$P.cacheCanvas.ctx);
				this._$P.cacheCanvas.ctx=null;
			}
			if (!value){
				var fc=this._$P._filterCache;
				if (fc){
					fc.destroy();
					fc.recycle();
					this._set$P('_filterCache',null);
				}
				this._$P._isHaveGlowFilter && this._set$P('_isHaveGlowFilter',false);
			}
			_super.prototype._setDisplay.call(this,value);
		}

		/**
		*检测某个点是否在此对象内。
		*@param x 全局x坐标。
		*@param y 全局y坐标。
		*@return 表示是否在对象内。
		*/
		__proto.hitTestPoint=function(x,y){
			var point=this.globalToLocal(Point.TEMP.setTo(x,y));
			var rect=this._$P.hitArea ? this._$P.hitArea :Rectangle.EMPTY.setTo(0,0,this._width,this._height);
			return rect.contains(point.x,point.y);
		}

		/**获得相对于本对象上的鼠标坐标信息。*/
		__proto.getMousePoint=function(){
			return this.globalToLocal(Point.TEMP.setTo(Laya.stage.mouseX,Laya.stage.mouseY));
		}

		/**@private */
		__proto._getWords=function(){
			return null;
		}

		/**@private */
		__proto._addChildsToLayout=function(out){
			var words=this._getWords();
			if (words==null && this._childs.length==0)return false;
			if (words){
				for (var i=0,n=words.length;i < n;i++){
					out.push(words[i]);
				}
			}
			this._childs.forEach(function(o,index,array){
				o._style._enableLayout()&& o._addToLayout(out);
			});
			return true;
		}

		/**@private */
		__proto._addToLayout=function(out){
			if (this._style.absolute)return;
			this._style.block ? out.push(this):(this._addChildsToLayout(out)&& (this.x=this.y=0));
		}

		/**@private */
		__proto._isChar=function(){
			return false;
		}

		/**@private */
		__proto._getCSSStyle=function(){
			return this._style.getCSSStyle();
		}

		/**
		*@private
		*设置指定属性名的属性值。
		*@param name 属性名。
		*@param value 属性值。
		*/
		__proto._setAttributes=function(name,value){
			switch (name){
				case 'x':
					this.x=parseFloat(value);
					break ;
				case 'y':
					this.y=parseFloat(value);
					break ;
				case 'width':
					this.width=parseFloat(value);
					break ;
				case 'height':
					this.height=parseFloat(value);
					break ;
				default :
					this[name]=value;
				}
		}

		/**
		*@private
		*/
		__proto._layoutLater=function(){
			this.parent && (this.parent)._layoutLater();
		}

		/**
		*<p>指定是否对使用了 scrollRect 的显示对象进行优化处理。</p>
		*<p>默认为false(不优化)。</p>
		*<p>当值为ture时：将对此对象使用了scrollRect 设定的显示区域以外的显示内容不进行渲染，以提高性能。</p>
		*/
		__getset(0,__proto,'optimizeScrollRect',function(){
			return this._optimizeScrollRect;
			},function(b){
			if (this._optimizeScrollRect !=b){
				this._optimizeScrollRect=b;
				this.model && this.model.optimizeScrollRect(b);
			}
		});

		/**
		*开启自定义渲染，只有开启自定义渲染，才能使用customRender函数渲染
		*/
		__getset(0,__proto,'customRenderEnable',null,function(b){
			if (b){
				this._renderType |=/*laya.renders.RenderSprite.CUSTOM*/0x200;
				if (Render.isConchNode){
					laya.display.Sprite.CustomList.push(this);
					var canvas=new HTMLCanvas("2d");
					canvas._setContext(/*__JS__ */new CanvasRenderingContext2D());
					/*__JS__ */this.customContext=new RenderContext(0,0,canvas);
					canvas.context.setCanvasType && canvas.context.setCanvasType(2);
					this.model.custom(canvas.context);
				}
			}
		});

		/**
		*指定显示对象是否缓存为静态图像。功能同cacheAs的normal模式。
		*/
		__getset(0,__proto,'cacheAsBitmap',function(){
			return this.cacheAs!=="none";
			},function(value){
			this.cacheAs=value ? (this._$P["hasFilter"] ? "none" :"normal"):"none";
		});

		/**
		*<p>指定显示对象是否缓存为静态图像，cacheAs时，子对象发生变化，会自动重新缓存，同时也可以手动调用reCache方法更新缓存。</p>
		*建议把不经常变化的复杂内容缓存为静态图像，能极大提高渲染性能，有"none"，"normal"和"bitmap"三个值可选。
		*<li>默认为"none"，不做任何缓存。</li>
		*<li>当值为"normal"时，canvas下进行画布缓存，webgl模式下进行命令缓存。</li>
		*<li>当值为"bitmap"时，canvas下进行依然是画布缓存，webgl模式下使用renderTarget缓存。</li>
		*webgl下renderTarget缓存模式有最大2048大小限制，会额外增加内存开销，不断重绘时开销比较大，但是会减少drawcall，渲染性能最高。
		*webgl下命令缓存模式只会减少节点遍历及命令组织，不会减少drawcall，性能中等。
		*/
		__getset(0,__proto,'cacheAs',function(){
			return this._$P.cacheCanvas==null ? "none" :this._$P.cacheCanvas.type;
			},function(value){
			var cacheCanvas=this._$P.cacheCanvas;
			if (value===(cacheCanvas ? cacheCanvas.type :"none"))return;
			if (value!=="none"){
				cacheCanvas || (cacheCanvas=this._set$P("cacheCanvas",Pool.getItemByClass("cacheCanvas",Object)));
				cacheCanvas.type=value;
				cacheCanvas.reCache=true;
				this._renderType |=/*laya.renders.RenderSprite.CANVAS*/0x08;
				if (value=="bitmap")this.model && this.model.cacheAs(1);
				this._set$P("cacheForFilters",false);
				}else {
				if (this._$P["hasFilter"]){
					this._set$P("cacheForFilters",true);
					}else {
					if (cacheCanvas)Pool.recover("cacheCanvas",cacheCanvas);
					this._$P.cacheCanvas=null;
					this._renderType &=~ /*laya.renders.RenderSprite.CANVAS*/0x08;
					this.model && this.model.cacheAs(0);
				}
			}
			this.repaint();
		});

		/**z排序，更改此值，按照值的大小进行显示层级排序。*/
		__getset(0,__proto,'zOrder',function(){
			return this._zOrder;
			},function(value){
			if (this._zOrder !=value){
				this._zOrder=value;
				this._parent && Laya.timer.callLater(this._parent,this.updateZOrder);
			}
		});

		/**旋转角度，默认值为0。*/
		__getset(0,__proto,'rotation',function(){
			return this._style._tf.rotate;
			},function(value){
			var style=this.getStyle();
			if (style._tf.rotate!==value){
				style.setRotate(value);
				this._tfChanged=true;
				this.model && this.model.rotate(value);
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x04;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		/**
		*表示显示对象的宽度，以像素为单位。
		*/
		__getset(0,__proto,'width',function(){
			if (!this.autoSize)return this._width;
			return this.getSelfBounds().width;
			},function(value){
			this._width!==value && (this._width=value,this.model && this.model.size(value,this._height),this.repaint());
		});

		/**表示显示对象相对于父容器的水平方向坐标值。*/
		__getset(0,__proto,'x',function(){
			return this._x;
			},function(value){
			if (this.destroyed)return;
			var p=this._parent;
			this._x!==value && (this._x=value,this.model && this.model.pos(value,this._y),p && p._repaint===0 && (p._repaint=1,p.parentRepaint()),this._$P.maskParent && this._$P.maskParent._repaint===0 && (this._$P.maskParent._repaint=1,this._$P.maskParent.parentRepaint()));
		});

		/**
		*获得全局Y轴缩放值
		*/
		__getset(0,__proto,'globalScaleY',function(){
			var scale=1;
			var ele=this;
			while (ele){
				if (ele===Laya.stage)break ;
				scale *=ele.scaleX;
				ele=ele.parent;
			}
			return scale;
		});

		/**手动设置的可点击区域，或者一个HitArea区域。*/
		__getset(0,__proto,'hitArea',function(){
			return this._$P.hitArea;
			},function(value){
			this._set$P("hitArea",value);
		});

		/**设置cacheAs为非空时此值才有效，staticCache=true时，子对象变化时不会自动更新缓存，只能通过调用reCache方法手动刷新。*/
		__getset(0,__proto,'staticCache',function(){
			return this._$P.staticCache;
			},function(value){
			this._set$P("staticCache",value);
			if (!value && this._$P.cacheCanvas){
				this._$P.cacheCanvas.reCache=true;
			}
		});

		/**表示显示对象相对于父容器的垂直方向坐标值。*/
		__getset(0,__proto,'y',function(){
			return this._y;
			},function(value){
			if (this.destroyed)return;
			var p=this._parent;
			this._y!==value && (this._y=value,this.model && this.model.pos(this._x,value),p && p._repaint===0 && (p._repaint=1,p.parentRepaint()),this._$P.maskParent && this._$P.maskParent._repaint===0 && (this._$P.maskParent._repaint=1,this._$P.maskParent.parentRepaint()));
		});

		/**
		*表示显示对象的高度，以像素为单位。
		*/
		__getset(0,__proto,'height',function(){
			if (!this.autoSize)return this._height;
			return this.getSelfBounds().height;
			},function(value){
			this._height!==value && (this._height=value,this.model && this.model.size(this._width,value),this.repaint());
		});

		/**指定要使用的混合模式。*/
		__getset(0,__proto,'blendMode',function(){
			return this._style.blendMode;
			},function(value){
			this.getStyle().blendMode=value;
			this.model && this.model.blendMode(value);
			if (value && value !="source-over")this._renderType |=/*laya.renders.RenderSprite.BLEND*/0x20;
			else this._renderType &=~ /*laya.renders.RenderSprite.BLEND*/0x20;
			this.parentRepaint();
		});

		/**X轴缩放值，默认值为1。*/
		__getset(0,__proto,'scaleX',function(){
			return this._style._tf.scaleX;
			},function(value){
			var style=this.getStyle();
			if (style._tf.scaleX!==value){
				style.setScaleX(value);
				this._tfChanged=true;
				this.model && this.model.scale(value,style._tf.scaleY);
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x04;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		/**Y轴缩放值，默认值为1。*/
		__getset(0,__proto,'scaleY',function(){
			return this._style._tf.scaleY;
			},function(value){
			var style=this.getStyle();
			if (style._tf.scaleY!==value){
				style.setScaleY(value);
				this._tfChanged=true;
				this.model && this.model.scale(style._tf.scaleX,value);
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x04;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		/**对舞台 <code>stage</code> 的引用。*/
		__getset(0,__proto,'stage',function(){
			return Laya.stage;
		});

		/**水平倾斜角度，默认值为0。*/
		__getset(0,__proto,'skewX',function(){
			return this._style._tf.skewX;
			},function(value){
			var style=this.getStyle();
			if (style._tf.skewX!==value){
				style.setSkewX(value);
				this._tfChanged=true;
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x04;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		/**显示对象的滚动矩形范围。*/
		__getset(0,__proto,'scrollRect',function(){
			return this._style.scrollRect;
			},function(value){
			this.getStyle().scrollRect=value;
			this.repaint();
			if (value){
				this._renderType |=/*laya.renders.RenderSprite.CLIP*/0x40;
				this.model && this.model.scrollRect(value.x,value.y,value.width,value.height);
				}else {
				this._renderType &=~ /*laya.renders.RenderSprite.CLIP*/0x40;
				this.model && this.model.removeType(/*laya.renders.RenderSprite.CLIP*/0x40);
			}
		});

		/**垂直倾斜角度，默认值为0。*/
		__getset(0,__proto,'skewY',function(){
			return this._style._tf.skewY;
			},function(value){
			var style=this.getStyle();
			if (style._tf.skewY!==value){
				style.setSkewY(value);
				this._tfChanged=true;
				this.model && this.model.skew(style._tf.skewX,value);
				this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x04;
				var p=this._parent;
				p && p._repaint===0 && (p._repaint=1,p.parentRepaint());
			}
		});

		/**
		*对象的矩阵信息。
		*/
		__getset(0,__proto,'transform',function(){
			return this._tfChanged ? this._adjustTransform():this._transform;
			},function(value){
			this._tfChanged=false;
			this._transform=value;
			if (value){
				this._x=value.tx;
				this._y=value.ty;
				value.tx=value.ty=0;
				this.model && this.model.transform(value.a,value.b,value.c,value.d,this._x,this._y);
			}
			if (value)this._renderType |=/*laya.renders.RenderSprite.TRANSFORM*/0x04;
			else {
				this._renderType &=~ /*laya.renders.RenderSprite.TRANSFORM*/0x04;
				this.model && this.model.removeType(/*laya.renders.RenderSprite.TRANSFORM*/0x04);
			}
			this.parentRepaint();
		});

		/**X轴 轴心点的位置，单位为像素，默认为0，轴心点会影响对象位置，缩放，旋转。*/
		__getset(0,__proto,'pivotX',function(){
			return this._style._tf.translateX;
			},function(value){
			this.getStyle().setTranslateX(value);
			this.model && this.model.pivot(value,this._style._tf.translateY);
			this.repaint();
		});

		/**Y轴 轴心点的位置，单位为像素，默认为0，轴心点会影响对象位置，缩放，旋转。*/
		__getset(0,__proto,'pivotY',function(){
			return this._style._tf.translateY;
			},function(value){
			this.getStyle().setTranslateY(value);
			this.model && this.model.pivot(this._style._tf.translateX,value);
			this.repaint();
		});

		/**透明度，值为0-1，默认值为1，表示不透明。*/
		__getset(0,__proto,'alpha',function(){
			return this._style.alpha;
			},function(value){
			if (this._style && this._style.alpha!==value){
				value=value < 0 ? 0 :(value > 1 ? 1 :value);
				this.getStyle().alpha=value;
				this.model && this.model.alpha(value);
				if (value!==1)this._renderType |=/*laya.renders.RenderSprite.ALPHA*/0x02;
				else this._renderType &=~ /*laya.renders.RenderSprite.ALPHA*/0x02;
				this.parentRepaint();
			}
		});

		/**表示是否可见，默认为true。*/
		__getset(0,__proto,'visible',function(){
			return this._style.visible;
			},function(value){
			if (this._style && this._style.visible!==value){
				this.getStyle().visible=value;
				this.model && this.model.visible(value);
				this.parentRepaint();
			}
		});

		/**绘图对象。*/
		__getset(0,__proto,'graphics',function(){
			return this._graphics || (this.graphics=RunDriver.createGraphics());
			},function(value){
			if (this._graphics)this._graphics._sp=null;
			this._graphics=value;
			if (value){
				this._renderType &=~ /*laya.renders.RenderSprite.IMAGE*/0x01;
				this._renderType |=/*laya.renders.RenderSprite.GRAPHICS*/0x100;
				value._sp=this;
				this.model && this.model.graphics(this._graphics);
				}else {
				this._renderType &=~ /*laya.renders.RenderSprite.GRAPHICS*/0x100;
				this._renderType &=~ /*laya.renders.RenderSprite.IMAGE*/0x01;
				this.model && this.model.removeType(/*laya.renders.RenderSprite.GRAPHICS*/0x100);
			}
			this.repaint();
		});

		/**滤镜集合。*/
		__getset(0,__proto,'filters',function(){
			return this._$P.filters;
			},function(value){
			value && value.length===0 && (value=null);
			if (this._$P.filters==value)return;
			this._set$P("filters",value ? value.slice():null);
			if (Render.isConchApp){
				this.model && this.model.removeType(0x10);
				if (this._$P.filters && this._$P.filters.length==1){
					this._$P.filters[0].callNative(this);
				}
			}
			if (Render.isWebGL){
				if (value && value.length){
					this._renderType |=/*laya.renders.RenderSprite.FILTERS*/0x10;
					}else {
					this._renderType &=~ /*laya.renders.RenderSprite.FILTERS*/0x10;
				}
			}
			if (value && value.length > 0){
				if (!(Render.isWebGL && value.length==1 && (((value[0])instanceof laya.filters.ColorFilter )))){
					if (this.cacheAs !="bitmap"){
						if (!Render.isConchNode)this.cacheAs="bitmap";
						this._set$P("cacheForFilters",true);
					}
					this._set$P("hasFilter",true);
				}
				}else {
				this._set$P("hasFilter",false);
				if (this._$P["cacheForFilters"] && this.cacheAs=="bitmap"){
					this.cacheAs="none";
				}
			}
			this.repaint();
		});

		/**遮罩，可以设置一个对象或者图片，根据对象形状进行遮罩显示。
		*【注意】遮罩对象坐标系是相对遮罩对象本身的，这个和flash机制不同*/
		__getset(0,__proto,'mask',function(){
			return this._$P._mask;
			},function(value){
			if (value && this.mask && this.mask._$P.maskParent)return;
			if (value){
				this.cacheAs="bitmap";
				this._set$P("_mask",value);
				value._set$P("maskParent",this);
				}else {
				this.cacheAs="none";
				this.mask && this.mask._set$P("maskParent",null);
				this._set$P("_mask",value);
			}
			this.model && this.model.mask(value ? value.model :null);
			this._renderType |=/*laya.renders.RenderSprite.BLEND*/0x20;
			this.parentRepaint();
		});

		/**
		*是否接受鼠标事件。
		*默认为false，如果监听鼠标事件，则会自动设置本对象及父节点的属性 mouseEnable 的值都为 true（如果父节点手动设置为false，则不会更改）。
		**/
		__getset(0,__proto,'mouseEnabled',function(){
			return this._mouseEnableState > 1;
			},function(value){
			this._mouseEnableState=value ? 2 :1;
		});

		/**
		*获得全局X轴缩放值
		*/
		__getset(0,__proto,'globalScaleX',function(){
			var scale=1;
			var ele=this;
			while (ele){
				if (ele===Laya.stage)break ;
				scale *=ele.scaleX;
				ele=ele.parent;
			}
			return scale;
		});

		/**
		*表示鼠标在此对象上的 X 轴坐标信息。
		*/
		__getset(0,__proto,'mouseX',function(){
			return this.getMousePoint().x;
		});

		/**
		*表示鼠标在此对象上的 Y 轴坐标信息。
		*/
		__getset(0,__proto,'mouseY',function(){
			return this.getMousePoint().y;
		});

		Sprite.fromImage=function(url){
			return new Sprite().loadImage(url);
		}

		Sprite.CustomList=[];
		return Sprite;
	})(Node)


	/**
	*@private
	*audio标签播放声音的音轨控制
	*/
	//class laya.media.h5audio.AudioSoundChannel extends laya.media.SoundChannel
	var AudioSoundChannel=(function(_super){
		function AudioSoundChannel(audio){
			this._audio=null;
			this._onEnd=null;
			this._resumePlay=null;
			AudioSoundChannel.__super.call(this);
			this._onEnd=Utils.bind(this.__onEnd,this);
			this._resumePlay=Utils.bind(this.__resumePlay,this);
			audio.addEventListener("ended",this._onEnd);
			this._audio=audio;
		}

		__class(AudioSoundChannel,'laya.media.h5audio.AudioSoundChannel',_super);
		var __proto=AudioSoundChannel.prototype;
		__proto.__onEnd=function(){
			if (this.loops==1){
				if (this.completeHandler){
					Laya.timer.once(10,this,this.__runComplete,[this.completeHandler],false);
					this.completeHandler=null;
				}
				this.stop();
				this.event(/*laya.events.Event.COMPLETE*/"complete");
				return;
			}
			if (this.loops > 0){
				this.loops--;
			}
			this.play();
		}

		__proto.__resumePlay=function(){
			try {
				this._audio.removeEventListener("canplay",this._resumePlay);
				this._audio.currentTime=this.startTime;
				Browser.container.appendChild(this._audio);
				this._audio.play();
				}catch (e){
				this.event(/*laya.events.Event.ERROR*/"error");
			}
		}

		/**
		*播放
		*/
		__proto.play=function(){
			try {
				this._audio.currentTime=this.startTime;
				}catch (e){
				this._audio.addEventListener("canplay",this._resumePlay);
				return;
			}
			Browser.container.appendChild(this._audio);
			this._audio.play();
		}

		/**
		*停止播放
		*
		*/
		__proto.stop=function(){
			this.isStopped=true;
			SoundManager.removeChannel(this);
			this.completeHandler=null;
			if (!this._audio)
				return;
			this._audio.pause();
			this._audio.removeEventListener("ended",this._onEnd);
			this._audio.removeEventListener("canplay",this._resumePlay);
			Pool.recover("audio:"+this.url,this._audio);
			Browser.removeElement(this._audio);
			this._audio=null;
		}

		/**
		*当前播放到的位置
		*@return
		*
		*/
		__getset(0,__proto,'position',function(){
			if (!this._audio)
				return 0;
			return this._audio.currentTime;
		});

		/**
		*设置音量
		*@param v
		*
		*/
		/**
		*获取音量
		*@return
		*
		*/
		__getset(0,__proto,'volume',function(){
			if (!this._audio)return 1;
			return this._audio.volume;
			},function(v){
			if (!this._audio)return;
			this._audio.volume=v;
		});

		return AudioSoundChannel;
	})(SoundChannel)


	/**
	*@private
	*web audio api方式播放声音的音轨控制
	*/
	//class laya.media.webaudio.WebAudioSoundChannel extends laya.media.SoundChannel
	var WebAudioSoundChannel=(function(_super){
		function WebAudioSoundChannel(){
			this.audioBuffer=null;
			this.gain=null;
			this.bufferSource=null;
			this._currentTime=0;
			this._volume=1;
			this._startTime=0;
			this._onPlayEnd=null;
			this.context=WebAudioSound.ctx;
			WebAudioSoundChannel.__super.call(this);
			this._onPlayEnd=Utils.bind(this.__onPlayEnd,this);
			if (this.context["createGain"]){
				this.gain=this.context["createGain"]();
				}else {
				this.gain=this.context["createGainNode"]();
			}
		}

		__class(WebAudioSoundChannel,'laya.media.webaudio.WebAudioSoundChannel',_super);
		var __proto=WebAudioSoundChannel.prototype;
		/**
		*播放声音
		*/
		__proto.play=function(){
			this._clearBufferSource();
			if (!this.audioBuffer)return;
			var context=this.context;
			var gain=this.gain;
			var bufferSource=context.createBufferSource();
			this.bufferSource=bufferSource;
			bufferSource.buffer=this.audioBuffer;
			bufferSource.connect(gain);
			if (gain)
				gain.disconnect();
			gain.connect(context.destination);
			bufferSource.onended=this._onPlayEnd;
			this._startTime=Browser.now();
			this.gain.gain.value=this._volume;
			if (this.loops==0){
				bufferSource.loop=true;
			}
			bufferSource.start(0,this.startTime);
			this._currentTime=0;
		}

		__proto.__onPlayEnd=function(){
			if (this.loops==1){
				if (this.completeHandler){
					Laya.timer.once(10,this,this.__runComplete,[this.completeHandler],false);
					this.completeHandler=null;
				}
				this.stop();
				this.event(/*laya.events.Event.COMPLETE*/"complete");
				return;
			}
			if (this.loops > 0){
				this.loops--;
			}
			this.play();
		}

		__proto._clearBufferSource=function(){
			if (this.bufferSource){
				var sourceNode=this.bufferSource;
				if (sourceNode.stop){
					sourceNode.stop(0);
					}else {
					sourceNode.noteOff(0);
				}
				sourceNode.disconnect(0);
				sourceNode.onended=null;
				if (!WebAudioSoundChannel._tryCleanFailed)this._tryClearBuffer(sourceNode);
				this.bufferSource=null;
			}
		}

		__proto._tryClearBuffer=function(sourceNode){
			try {sourceNode.buffer=WebAudioSound._miniBuffer;}catch (e){WebAudioSoundChannel._tryCleanFailed=true;}
		}

		/**
		*停止播放
		*/
		__proto.stop=function(){
			this._clearBufferSource();
			this.audioBuffer=null;
			if (this.gain)
				this.gain.disconnect();
			this.isStopped=true;
			SoundManager.removeChannel(this);
			this.completeHandler=null;
		}

		/**
		*获取当前播放位置
		*/
		__getset(0,__proto,'position',function(){
			if (this.bufferSource){
				return (Browser.now()-this._startTime)/ 1000+this.startTime;
			}
			return 0;
		});

		/**
		*设置音量
		*/
		/**
		*获取音量
		*/
		__getset(0,__proto,'volume',function(){
			return this._volume;
			},function(v){
			if (this.isStopped){
				return;
			}
			this._volume=v;
			this.gain.gain.value=v;
		});

		WebAudioSoundChannel._tryCleanFailed=false;
		return WebAudioSoundChannel;
	})(SoundChannel)


	/**
	*@private
	*<code>Bitmap</code> 是图片资源类。
	*/
	//class laya.resource.Bitmap extends laya.resource.Resource
	var Bitmap=(function(_super){
		function Bitmap(){
			//this._source=null;
			//this._w=NaN;
			//this._h=NaN;
			this.useNum=0;
			Bitmap.__super.call(this);
			this._w=0;
			this._h=0;
		}

		__class(Bitmap,'laya.resource.Bitmap',_super);
		var __proto=Bitmap.prototype;
		/**
		*彻底清理资源。
		*/
		__proto.dispose=function(){
			this._resourceManager.removeResource(this);
			_super.prototype.dispose.call(this);
		}

		/***
		*宽度。
		*/
		__getset(0,__proto,'width',function(){
			return this._w;
		});

		/***
		*高度。
		*/
		__getset(0,__proto,'height',function(){
			return this._h;
		});

		/***
		*HTML Image 或 HTML Canvas 或 WebGL Texture 。
		*/
		__getset(0,__proto,'source',function(){
			return this._source;
		});

		return Bitmap;
	})(Resource)


	/**
	*<code>Component</code> 是ui控件类的基类。
	*<p>生命周期：preinitialize > createChildren > initialize > 组件构造函数</p>
	*/
	//class laya.ui.Component extends laya.display.Sprite
	var Component=(function(_super){
		function Component(){
			this._comXml=null;
			this._dataSource=null;
			this._toolTip=null;
			this._tag=null;
			this._disabled=false;
			this._gray=false;
			Component.__super.call(this);
			this._layout=LayoutStyle.EMPTY;
			this.preinitialize();
			this.createChildren();
			this.initialize();
		}

		__class(Component,'laya.ui.Component',_super);
		var __proto=Component.prototype;
		Laya.imps(__proto,{"laya.ui.IComponent":true})
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._dataSource=this._layout=null;
			this._tag=null;
			this._toolTip=null;
		}

		/**
		*<p>预初始化。</p>
		*@internal 子类可在此函数内设置、修改属性默认值
		*/
		__proto.preinitialize=function(){}
		/**
		*<p>创建并添加控件子节点。</p>
		*@internal 子类可在此函数内创建并添加子节点。
		*/
		__proto.createChildren=function(){}
		/**
		*<p>控件初始化。</p>
		*@internal 在此子对象已被创建，可以对子对象进行修改。
		*/
		__proto.initialize=function(){}
		/**
		*<p>延迟运行指定的函数。</p>
		*<p>在控件被显示在屏幕之前调用，一般用于延迟计算数据。</p>
		*@param method 要执行的函数的名称。例如，functionName。
		*@param args 传递给 <code>method</code> 函数的可选参数列表。
		*
		*@see #runCallLater()
		*/
		__proto.callLater=function(method,args){
			Laya.timer.callLater(this,method,args);
		}

		/**
		*<p>如果有需要延迟调用的函数（通过 <code>callLater</code> 函数设置），则立即执行延迟调用函数。</p>
		*@param method 要执行的函数名称。例如，functionName。
		*@see #callLater()
		*/
		__proto.runCallLater=function(method){
			Laya.timer.runCallLater(this,method);
		}

		/**
		*<p>立即执行影响宽高度量的延迟调用函数。</p>
		*@internal <p>使用 <code>runCallLater</code> 函数，立即执行影响宽高度量的延迟运行函数(使用 <code>callLater</code> 设置延迟执行函数)。</p>
		*@see #callLater()
		*@see #runCallLater()
		*/
		__proto.commitMeasure=function(){}
		/**
		*<p>重新调整对象的大小。</p>
		*/
		__proto.changeSize=function(){
			this.event(/*laya.events.Event.RESIZE*/"resize");
		}

		/**
		*@private
		*<p>获取对象的布局样式。</p>
		*/
		__proto.getLayout=function(){
			this._layout===LayoutStyle.EMPTY && (this._layout=new LayoutStyle());
			return this._layout;
		}

		/**
		*对象从显示列表移除的事件侦听处理函数。
		*/
		__proto.onRemoved=function(){
			this.parent.off(/*laya.events.Event.RESIZE*/"resize",this,this.onCompResize);
		}

		/**
		*对象被添加到显示列表的事件侦听处理函数。
		*/
		__proto.onAdded=function(){
			this.parent.on(/*laya.events.Event.RESIZE*/"resize",this,this.onCompResize);
			this.resetLayoutX();
			this.resetLayoutY();
		}

		/**
		*父容器的 <code>Event.RESIZE</code> 事件侦听处理函数。
		*/
		__proto.onCompResize=function(){
			if (this._layout && this._layout.enable){
				this.resetLayoutX();
				this.resetLayoutY();
			}
		}

		/**
		*<p>重置对象的 <code>X</code> 轴（水平方向）布局。</p>
		*/
		__proto.resetLayoutX=function(){
			var parent=this.parent;
			if (parent){
				var layout=this._layout;
				if (!isNaN(layout.anchorX))this.pivotX=layout.anchorX *this.width;
				if (!isNaN(layout.centerX)){
					this.x=(parent.width-this.displayWidth)*0.5+layout.centerX+this.pivotX;
					}else if (!isNaN(layout.left)){
					this.x=layout.left+this.pivotX;
					if (!isNaN(layout.right)){
						this.width=(parent._width-layout.left-layout.right)/ this.scaleX;
					}
					}else if (!isNaN(layout.right)){
					this.x=parent.width-this.displayWidth-layout.right+this.pivotX;
				}
			}
		}

		/**
		*<p>重置对象的 <code>Y</code> 轴（垂直方向）布局。</p>
		*/
		__proto.resetLayoutY=function(){
			var parent=this.parent;
			if (parent){
				var layout=this._layout;
				if (!isNaN(layout.anchorY))this.pivotY=layout.anchorY *this.height;
				if (!isNaN(layout.centerY)){
					this.y=(parent.height-this.displayHeight)*0.5+layout.centerY+this.pivotY;
					}else if (!isNaN(layout.top)){
					this.y=layout.top+this.pivotY;
					if (!isNaN(layout.bottom)){
						this.height=(parent._height-layout.top-layout.bottom)/ this.scaleY;
					}
					}else if (!isNaN(layout.bottom)){
					this.y=parent.height-this.displayHeight-layout.bottom+this.pivotY;
				}
			}
		}

		/**
		*对象的 <code>Event.MOUSE_OVER</code> 事件侦听处理函数。
		*/
		__proto.onMouseOver=function(e){
			Laya.stage.event(/*laya.ui.UIEvent.SHOW_TIP*/"showtip",this._toolTip);
		}

		/**
		*对象的 <code>Event.MOUSE_OUT</code> 事件侦听处理函数。
		*/
		__proto.onMouseOut=function(e){
			Laya.stage.event(/*laya.ui.UIEvent.HIDE_TIP*/"hidetip",this._toolTip);
		}

		/**
		*<p>对象的显示宽度（以像素为单位）。</p>
		*/
		__getset(0,__proto,'displayWidth',function(){
			return this.width *this.scaleX;
		});

		/**
		*<p>表示显示对象的宽度，以像素为单位。</p>
		*<p><b>注：</b>当值为0时，宽度为自适应大小。</p>
		*/
		__getset(0,__proto,'width',function(){
			if (this._width)return this._width;
			return this.measureWidth;
			},function(value){
			if (this._width !=value){
				this._width=value;
				this.model && this.model.size(this._width,this._height);
				this.callLater(this.changeSize);
				if (this._layout.enable && (!isNaN(this._layout.centerX)|| !isNaN(this._layout.right)|| !isNaN(this._layout.anchorX)))this.resetLayoutX();
			}
		});

		/**
		*<p>显示对象的实际显示区域宽度（以像素为单位）。</p>
		*/
		__getset(0,__proto,'measureWidth',function(){
			var max=0;
			this.commitMeasure();
			for (var i=this.numChildren-1;i >-1;i--){
				var comp=this.getChildAt(i);
				if (comp.visible){
					max=Math.max(comp.x+comp.width *comp.scaleX,max);
				}
			}
			return max;
		});

		/**
		*@private
		*<p>指定对象是否可使用布局。</p>
		*<p>如果值为true,则此对象可以使用布局样式，否则不使用布局样式。</p>
		*@param value 一个 Boolean 值，指定对象是否可使用布局。
		*/
		__getset(0,__proto,'layOutEabled',null,function(value){
			if (this._layout && this._layout.enable !=value){
				this._layout.enable=value;
				if (this.parent){
					this.onAdded();
					}else {
					this.on(/*laya.events.Event.ADDED*/"added",this,this.onAdded);
					this.on(/*laya.events.Event.REMOVED*/"removed",this,this.onRemoved);
				}
			}
		});

		/**
		*<p>对象的显示高度（以像素为单位）。</p>
		*/
		__getset(0,__proto,'displayHeight',function(){
			return this.height *this.scaleY;
		});

		/**
		*<p>表示显示对象的高度，以像素为单位。</p>
		*<p><b>注：</b>当值为0时，高度为自适应大小。</p>
		*@return
		*/
		__getset(0,__proto,'height',function(){
			if (this._height)return this._height;
			return this.measureHeight;
			},function(value){
			if (this._height !=value){
				this._height=value;
				this.model && this.model.size(this._width,this._height);
				this.callLater(this.changeSize);
				if (this._layout.enable && (!isNaN(this._layout.centerY)|| !isNaN(this._layout.bottom)|| !isNaN(this._layout.anchorY)))this.resetLayoutY();
			}
		});

		/**
		*<p>数据赋值，通过对UI赋值来控制UI显示逻辑。</p>
		*<p>简单赋值会更改组件的默认属性，使用大括号可以指定组件的任意属性进行赋值。</p>
		*@example 以下示例中， <code>label1、checkbox1</code> 分别为示例的name属性值。
		<listing version="3.0">
		//默认属性赋值
		dataSource={label1:"改变了label",checkbox1:true};//(更改了label1的text属性值，更改checkbox1的selected属性)。
		//任意属性赋值
		dataSource={label2:{text:"改变了label",size:14},checkbox2:{selected:true,x:10}};
		</listing>
		*@return
		*/
		__getset(0,__proto,'dataSource',function(){
			return this._dataSource;
			},function(value){
			this._dataSource=value;
			for (var prop in this._dataSource){
				if (this.hasOwnProperty(prop)){
					this[prop]=this._dataSource[prop];
				}
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'scaleY',_super.prototype._$get_scaleY,function(value){
			if (_super.prototype._$get_scaleY.call(this)!=value){
				_super.prototype._$set_scaleY.call(this,value);
				this.callLater(this.changeSize);
				this._layout.enable && this.resetLayoutY();
			}
		});

		/**
		*<p>显示对象的实际显示区域高度（以像素为单位）。</p>
		*/
		__getset(0,__proto,'measureHeight',function(){
			var max=0;
			this.commitMeasure();
			for (var i=this.numChildren-1;i >-1;i--){
				var comp=this.getChildAt(i);
				if (comp.visible){
					max=Math.max(comp.y+comp.height *comp.scaleY,max);
				}
			}
			return max;
		});

		/**@inheritDoc */
		__getset(0,__proto,'scaleX',_super.prototype._$get_scaleX,function(value){
			if (_super.prototype._$get_scaleX.call(this)!=value){
				_super.prototype._$set_scaleX.call(this,value);
				this.callLater(this.changeSize);
				this._layout.enable && this.resetLayoutX();
			}
		});

		/**
		*<p>从组件顶边到其内容区域顶边之间的垂直距离（以像素为单位）。</p>
		*/
		__getset(0,__proto,'top',function(){
			return this._layout.top;
			},function(value){
			this.getLayout().top=value;
			this.layOutEabled=true;
			this.resetLayoutY();
		});

		/**
		*<p>从组件底边到其内容区域底边之间的垂直距离（以像素为单位）。</p>
		*/
		__getset(0,__proto,'bottom',function(){
			return this._layout.bottom;
			},function(value){
			this.getLayout().bottom=value;
			this.layOutEabled=true;
			this.resetLayoutY();
		});

		/**
		*<p>从组件左边到其内容区域左边之间的水平距离（以像素为单位）。</p>
		*/
		__getset(0,__proto,'left',function(){
			return this._layout.left;
			},function(value){
			this.getLayout().left=value;
			this.layOutEabled=true;
			this.resetLayoutX();
		});

		/**
		*<p>从组件右边到其内容区域右边之间的水平距离（以像素为单位）。</p>
		*/
		__getset(0,__proto,'right',function(){
			return this._layout.right;
			},function(value){
			this.getLayout().right=value;
			this.layOutEabled=true;
			this.resetLayoutX();
		});

		/**
		*<p>在父容器中，此对象的水平方向中轴线与父容器的水平方向中心线的距离（以像素为单位）。</p>
		*/
		__getset(0,__proto,'centerX',function(){
			return this._layout.centerX;
			},function(value){
			this.getLayout().centerX=value;
			this.layOutEabled=true;
			this.resetLayoutX();
		});

		/**
		*<p>在父容器中，此对象的垂直方向中轴线与父容器的垂直方向中心线的距离（以像素为单位）。</p>
		*/
		__getset(0,__proto,'centerY',function(){
			return this._layout.centerY;
			},function(value){
			this.getLayout().centerY=value;
			this.layOutEabled=true;
			this.resetLayoutY();
		});

		/**X轴锚点，值为0-1*/
		__getset(0,__proto,'anchorX',function(){
			return this._layout.anchorX;
			},function(value){
			this.getLayout().anchorX=value;
			this.layOutEabled=true;
			this.resetLayoutX();
		});

		/**Y轴锚点，值为0-1*/
		__getset(0,__proto,'anchorY',function(){
			return this._layout.anchorY;
			},function(value){
			this.getLayout().anchorY=value;
			this.layOutEabled=true;
			this.resetLayoutY();
		});

		/**
		*<p>对象的标签。</p>
		*@internal 冗余字段，可以用来储存数据。
		*/
		__getset(0,__proto,'tag',function(){
			return this._tag;
			},function(value){
			this._tag=value;
		});

		/**
		*<p>鼠标悬停提示。</p>
		*<p>可以赋值为文本 <code>String</code> 或函数 <code>Handler</code> ，用来实现自定义样式的鼠标提示和参数携带等。</p>
		*@example 以下例子展示了三种鼠标提示：
		<listing version="3.0">
		private var _testTips:TestTipsUI=new TestTipsUI();
		private function testTips():void {
			//简单鼠标提示
			btn2.toolTip="这里是鼠标提示&lt;b&gt;粗体&lt;/b&gt;&lt;br&gt;换行";
			//自定义的鼠标提示
			btn1.toolTip=showTips1;
			//带参数的自定义鼠标提示
			clip.toolTip=new Handler(this,showTips2,["clip"]);
		}

		private function showTips1():void {
			_testTips.label.text="这里是按钮["+btn1.label+"]";
			tip.addChild(_testTips);
		}

		private function showTips2(name:String):void {
			_testTips.label.text="这里是"+name;
			tip.addChild(_testTips);
		}

		</listing>
		*/
		__getset(0,__proto,'toolTip',function(){
			return this._toolTip;
			},function(value){
			if (this._toolTip !=value){
				this._toolTip=value;
				if (value !=null){
					this.on(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onMouseOver);
					this.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onMouseOut);
					}else {
					this.off(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onMouseOver);
					this.off(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onMouseOut);
				}
			}
		});

		/**
		*XML 数据。
		*/
		__getset(0,__proto,'comXml',function(){
			return this._comXml;
			},function(value){
			this._comXml=value;
		});

		/**是否变灰。*/
		__getset(0,__proto,'gray',function(){
			return this._disabled;
			},function(value){
			if (value!==this._gray){
				this._gray=value;
				UIUtils.gray(this,value);
			}
		});

		/**是否禁用页面，设置为true后，会变灰并且禁用鼠标。*/
		__getset(0,__proto,'disabled',function(){
			return this._disabled;
			},function(value){
			if (value!==this._disabled){
				this.gray=this._disabled=value;
				this.mouseEnabled=!value;
			}
		});

		return Component;
	})(Sprite)


	/**
	*动画播放控制器
	*/
	//class laya.display.AnimationPlayerBase extends laya.display.Sprite
	var AnimationPlayerBase=(function(_super){
		function AnimationPlayerBase(){
			this.loop=false;
			this._index=0;
			this._count=0;
			this._isPlaying=false;
			this._labels=null;
			this._controlNode=null;
			AnimationPlayerBase.__super.call(this);
			this._interval=Config.animationInterval;
		}

		__class(AnimationPlayerBase,'laya.display.AnimationPlayerBase',_super);
		var __proto=AnimationPlayerBase.prototype;
		/**
		*播放动画。
		*@param start 开始播放的动画索引或label。
		*@param loop 是否循环。
		*@param name 如果name为空(可选)，则播放当前动画，如果不为空，则播放全局缓存动画（如果有）
		*/
		__proto.play=function(start,loop,name){
			(start===void 0)&& (start=0);
			(loop===void 0)&& (loop=true);
			(name===void 0)&& (name="");
			this._isPlaying=true;
			this.index=((typeof start=='string'))?this._getFrameByLabel(start):start;
			this.loop=loop;
			if (this.interval > 0){
				this.timerLoop(this.interval,this,this._frameLoop,null,true);
			}
		}

		/**@private */
		__proto._getFrameByLabel=function(label){
			var i=0;
			for (i=0;i < this._count;i++){
				if (this._labels[i]==label)return i;
			}
			return 0;
		}

		/**@private */
		__proto._frameLoop=function(){
			this._index++;
			if (this._index >=this._count){
				if (this.loop){
					this._index=0;
					this.event(/*laya.events.Event.COMPLETE*/"complete");
					}else {
					this._index--;
					this.stop();
					this.event(/*laya.events.Event.COMPLETE*/"complete");
					return;
				}
			}
			this.index=this._index;
		}

		/**@private */
		__proto._setControlNode=function(node){
			if (this._controlNode){
				this._controlNode.off(/*laya.events.Event.DISPLAY*/"display",this,this._$3__onDisplay);
				this._controlNode.off(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this._$3__onDisplay);
			}
			this._controlNode=node;
			if (node&&node!=this){
				node.on(/*laya.events.Event.DISPLAY*/"display",this,this._$3__onDisplay);
				node.on(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this._$3__onDisplay);
			}
		}

		/**@private */
		__proto._setDisplay=function(value){
			_super.prototype._setDisplay.call(this,value);
			this._$3__onDisplay();
		}

		/**@private */
		__proto._$3__onDisplay=function(){
			if (this._isPlaying){
				if (this._controlNode.displayedInStage)this.play(this._index,this.loop);
				else this.clearTimer(this,this._frameLoop);
			}
		}

		/**
		*停止播放。
		*/
		__proto.stop=function(){
			this._isPlaying=false;
			this.clearTimer(this,this._frameLoop);
		}

		/**
		*增加一个标签到index帧上，播放到此index后会派发label事件
		*@param label 标签名称
		*@param index 索引位置
		*/
		__proto.addLabel=function(label,index){
			if (!this._labels)this._labels={};
			this._labels[index]=label;
		}

		/**
		*删除某个标签
		*@param label 标签名字，如果label为空，则删除所有Label
		*/
		__proto.removeLabel=function(label){
			if (!label)this._labels=null;
			else if (this._labels){
				for (var name in this._labels){
					if (this._labels[name]===label){
						delete this._labels[name];
						break ;
					}
				}
			}
		}

		/**
		*切换到某帧并停止
		*@param position 帧索引或label
		*/
		__proto.gotoAndStop=function(position){
			this.index=((typeof position=='string'))?this._getFrameByLabel(position):position;
			this.stop();
		}

		/**
		*@private
		*显示到某帧
		*@param value 帧索引
		*
		*/
		__proto._displayToIndex=function(value){}
		/**清理。方便对象复用。*/
		__proto.clear=function(){
			this.stop();
			this._labels=null;
		}

		/**播放间隔(单位：毫秒)。*/
		/**播放间隔(单位：毫秒)。*/
		__getset(0,__proto,'interval',function(){
			return this._interval;
			},function(v){
			this._interval=v;
			if (this._isPlaying && v > 0){
				this.timerLoop(v,this,this._frameLoop,null,true);
			}
		});

		/**
		*是否在播放中
		*/
		__getset(0,__proto,'isPlaying',function(){
			return this._isPlaying;
		});

		/**当前播放索引。*/
		__getset(0,__proto,'index',function(){
			return this._index;
			},function(value){
			this._index=value;
			this._displayToIndex(value);
			if (this._labels && this._labels[value])this.event(/*laya.events.Event.LABEL*/"label",this._labels[value]);
		});

		/**动画长度。*/
		__getset(0,__proto,'count',function(){
			return this._count;
		});

		return AnimationPlayerBase;
	})(Sprite)


	/**
	*<p> <code>Text</code> 类用于创建显示对象以显示文本。</p>
	*@example 以下示例代码，创建了一个 <code>Text</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.display.Text;
		*public class Text_Example
		*{
			*public function Text_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*private function onInit():void
			*{
				*var text:Text=new Text();//创建一个 Text 类的实例对象 text 。
				*text.text="这个是一个 Text 文本示例。";
				*text.color="#008fff";//设置 text 的文本颜色。
				*text.font="Arial";//设置 text 的文本字体。
				*text.bold=true;//设置 text 的文本显示为粗体。
				*text.fontSize=30;//设置 text 的字体大小。
				*text.wordWrap=true;//设置 text 的文本自动换行。
				*text.x=100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
				*text.y=100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
				*text.width=300;//设置 text 的宽度。
				*text.height=200;//设置 text 的高度。
				*text.italic=true;//设置 text 的文本显示为斜体。
				*text.borderColor="#fff000";//设置 text 的文本边框颜色。
				*Laya.stage.addChild(text);//将 text 添加到显示列表。
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Text_Example();
	*function Text_Example()
	*{
		*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
		*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
		*onInit();
		*}
	*function onInit()
	*{
		*var text=new laya.display.Text();//创建一个 Text 类的实例对象 text 。
		*text.text="这个是一个 Text 文本示例。";
		*text.color="#008fff";//设置 text 的文本颜色。
		*text.font="Arial";//设置 text 的文本字体。
		*text.bold=true;//设置 text 的文本显示为粗体。
		*text.fontSize=30;//设置 text 的字体大小。
		*text.wordWrap=true;//设置 text 的文本自动换行。
		*text.x=100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
		*text.y=100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
		*text.width=300;//设置 text 的宽度。
		*text.height=200;//设置 text 的高度。
		*text.italic=true;//设置 text 的文本显示为斜体。
		*text.borderColor="#fff000";//设置 text 的文本边框颜色。
		*Laya.stage.addChild(text);//将 text 添加到显示列表。
		*}
	*</listing>
	*<listing version="3.0">
	*class Text_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*this.onInit();
			*}
		*private onInit():void {
			*var text:laya.display.Text=new laya.display.Text();//创建一个 Text 类的实例对象 text 。
			*text.text="这个是一个 Text 文本示例。";
			*text.color="#008fff";//设置 text 的文本颜色。
			*text.font="Arial";//设置 text 的文本字体。
			*text.bold=true;//设置 text 的文本显示为粗体。
			*text.fontSize=30;//设置 text 的字体大小。
			*text.wordWrap=true;//设置 text 的文本自动换行。
			*text.x=100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
			*text.y=100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
			*text.width=300;//设置 text 的宽度。
			*text.height=200;//设置 text 的高度。
			*text.italic=true;//设置 text 的文本显示为斜体。
			*text.borderColor="#fff000";//设置 text 的文本边框颜色。
			*Laya.stage.addChild(text);//将 text 添加到显示列表。
			*}
		*}
	*</listing>
	*/
	//class laya.display.Text extends laya.display.Sprite
	var Text=(function(_super){
		function Text(){
			this._clipPoint=null;
			this._currBitmapFont=null;
			this._text=null;
			this._isChanged=false;
			this._textWidth=0;
			this._textHeight=0;
			this._lines=[];
			this._lineWidths=[];
			this._startX=NaN;
			this._startY=NaN;
			this._lastVisibleLineIndex=-1;
			this._words=null;
			this._charSize={};
			this.underline=false;
			this._underlineColor=null;
			Text.__super.call(this);
			this.overflow=Text.VISIBLE;
			this._style=new CSSStyle(this);
			(this._style).wordWrap=false;
		}

		__class(Text,'laya.display.Text',_super);
		var __proto=Text.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._lines=null;
			if (this._words){
				this._words.length=0;
				this._words=null;
			}
		}

		/**
		*@private
		*@inheritDoc
		*/
		__proto._getBoundPointsM=function(ifRotate){
			(ifRotate===void 0)&& (ifRotate=false);
			var rec=Rectangle.TEMP;
			rec.setTo(0,0,this.width,this.height);
			return rec._getBoundPoints();
		}

		/**
		*@inheritDoc
		*/
		__proto.getGraphicBounds=function(){
			var rec=Rectangle.TEMP;
			rec.setTo(0,0,this.width,this.height);
			return rec;
		}

		/**
		*@private
		*@inheritDoc
		*/
		__proto._getCSSStyle=function(){
			return this._style;
		}

		/**
		*<p>根据指定的文本，从语言包中取当前语言的文本内容。并对此文本中的{i}文本进行替换。</p>
		*<p>例如：
		*<li>（1）text 的值为“我的名字”，先取到这个文本对应的当前语言版本里的值“My name”，将“My name”设置为当前文本的内容。</li>
		*<li>（2）text 的值为“恭喜你赢得{0}个钻石，{1}经验。”，arg1 的值为100，arg2 的值为200。
		*则先取到这个文本对应的当前语言版本里的值“Congratulations on your winning {0}diamonds,{1}experience.”，
		*然后将文本里的{0}、{1}，依据括号里的数字从0开始替换为 arg1、arg2 的值。
		*将替换处理后的文本“Congratulations on your winning 100 diamonds,200 experience.”设置为当前文本的内容。
		*</li>
		*</p>
		*@param text 文本内容。
		*@param ...args 文本替换参数。
		*/
		__proto.lang=function(text,arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10){
			text=Text.langPacks && Text.langPacks[text] ? Text.langPacks[text] :text;
			if (arguments.length < 2){
				this._text=text;
				}else {
				for (var i=0,n=arguments.length;i < n;i++){
					text=text.replace("{"+i+"}",arguments[i+1]);
				}
				this._text=text;
			}
		}

		/**
		*渲染文字。
		*@param begin 开始渲染的行索引。
		*@param visibleLineCount 渲染的行数。
		*/
		__proto.renderText=function(begin,visibleLineCount){
			var graphics=this.graphics;
			graphics.clear();
			var ctxFont=(this.italic ? "italic " :"")+(this.bold ? "bold " :"")+this.fontSize+"px "+this.font;
			Browser.context.font=ctxFont;
			var padding=this.padding;
			var startX=padding[3];
			var textAlgin="left";
			var lines=this._lines;
			var lineHeight=this.leading+this._charSize.height;
			var tCurrBitmapFont=this._currBitmapFont;
			if (tCurrBitmapFont){
				lineHeight=this.leading+tCurrBitmapFont.getMaxHeight();
			};
			var startY=padding[0];
			if ((!tCurrBitmapFont)&& this._width > 0 && this._textWidth <=this._width){
				if (this.align=="right"){
					textAlgin="right";
					startX=this._width-padding[1];
					}else if (this.align=="center"){
					textAlgin="center";
					startX=this._width *0.5+padding[3]-padding[1];
				}
			}
			if (this._height > 0){
				var tempVAlign=(this._textHeight > this._height)? "top" :this.valign;
				if (tempVAlign==="middle")
					startY=(this._height-visibleLineCount *lineHeight)*0.5+padding[0]-padding[2];
				else if (tempVAlign==="bottom")
				startY=this._height-visibleLineCount *lineHeight-padding[2];
			};
			var style=this._style;
			if (tCurrBitmapFont && tCurrBitmapFont.autoScaleSize){
				var bitmapScale=tCurrBitmapFont.fontSize / this.fontSize;
			}
			if (this._clipPoint){
				graphics.save();
				if (tCurrBitmapFont && tCurrBitmapFont.autoScaleSize){
					var tClipWidth=0;
					var tClipHeight=0;
					this._width ? tClipWidth=(this._width-padding[3]-padding[1]):tClipWidth=this._textWidth;
					this._height ? tClipHeight=(this._height-padding[0]-padding[2]):tClipHeight=this._textHeight;
					tClipWidth *=bitmapScale;
					tClipHeight *=bitmapScale;
					graphics.clipRect(padding[3],padding[0],tClipWidth,tClipHeight);
					}else {
					graphics.clipRect(padding[3],padding[0],this._width ? (this._width-padding[3]-padding[1]):this._textWidth,this._height ? (this._height-padding[0]-padding[2]):this._textHeight);
				}
			};
			var password=style.password;
			if (("prompt" in this)&& this['prompt']==this._text)
				password=false;
			var x=0,y=0;
			var end=Math.min(this._lines.length,visibleLineCount+begin)|| 1;
			for (var i=begin;i < end;i++){
				var word=lines[i];
				var _word;
				if (password){
					var len=word.length;
					word="";
					for (var j=len;j > 0;j--){
						word+="●";
					}
				}
				x=startX-(this._clipPoint ? this._clipPoint.x :0);
				y=startY+lineHeight *i-(this._clipPoint ? this._clipPoint.y :0);
				this.underline && this.drawUnderline(textAlgin,x,y,i);
				if (tCurrBitmapFont){
					var tWidth=this.width;
					if (tCurrBitmapFont.autoScaleSize){
						tWidth=this.width *bitmapScale;
					}
					tCurrBitmapFont.drawText(word,this,x,y,this.align,tWidth);
					}else {
					if (Render.isWebGL){
						this._words || (this._words=[]);
						_word=this._words.length > (i-begin)? this._words[i-begin] :new WordText();
						_word.setText(word);
						}else {
						_word=word;
					}
					style.stroke ? graphics.fillBorderText(_word,x,y,ctxFont,this.color,style.strokeColor,style.stroke,textAlgin):graphics.fillText(_word,x,y,ctxFont,this.color,textAlgin);
				}
			}
			if (tCurrBitmapFont && tCurrBitmapFont.autoScaleSize){
				var tScale=1 / bitmapScale;
				this.scale(tScale,tScale);
			}
			if (this._clipPoint)
				graphics.restore();
			this._startX=startX;
			this._startY=startY;
		}

		/**
		*绘制下划线
		*@param x 本行坐标
		*@param y 本行坐标
		*@param lineIndex 本行索引
		*/
		__proto.drawUnderline=function(align,x,y,lineIndex){
			var lineWidth=this._lineWidths[lineIndex];
			switch (align){
				case 'center':
					x-=lineWidth / 2;
					break ;
				case 'right':
					x-=lineWidth;
					break ;
				case 'left':
				default :
					break ;
				}
			y+=this._charSize.height;
			this._graphics.drawLine(x,y,x+lineWidth,y,this.underlineColor || this.color,1);
		}

		/**
		*<p>排版文本。</p>
		*<p>进行宽高计算，渲染、重绘文本。</p>
		*/
		__proto.typeset=function(){
			this._isChanged=false;
			if (!this._text){
				this._clipPoint=null;
				this._textWidth=this._textHeight=0;
				this.graphics.clear();
				return;
			}
			Browser.context.font=this._getCSSStyle().font;
			this._lines.length=0;
			this._lineWidths.length=0;
			this.parseLines(this._text);
			this.evalTextSize();
			if (this.checkEnabledViewportOrNot())
				this._clipPoint || (this._clipPoint=new Point(0,0));
			else
			this._clipPoint=null;
			var lineCount=this._lines.length;
			if (this.overflow !=Text.VISIBLE){
				var func=this.overflow==Text.HIDDEN ? Math.floor :Math.ceil;
				lineCount=Math.min(lineCount,func((this.height-this.padding[0]-this.padding[2])/ (this.leading+this._charSize.height)));
			};
			var startLine=this.scrollY / (this._charSize.height+this.leading)| 0;
			this.renderText(startLine,lineCount);
			this.repaint();
		}

		__proto.evalTextSize=function(){
			var nw=NaN,nh=NaN;
			nw=Math.max.apply(this,this._lineWidths);
			if (this._currBitmapFont)
				nh=this._lines.length *(this._currBitmapFont.getMaxHeight()+this.leading)+this.padding[0]+this.padding[2];
			else
			nh=this._lines.length *(this._charSize.height+this.leading)+this.padding[0]+this.padding[2];
			if (nw !=this._textWidth || nh !=this._textHeight){
				this._textWidth=nw;
				this._textHeight=nh;
				if(!this._width||!this._height)
					this.model&&this.model.size(this._width||this._textWidth,this._height||this._textHeight);
			}
		}

		__proto.checkEnabledViewportOrNot=function(){
			return this.overflow==Text.SCROLL && ((this._width > 0 && this._textWidth > this._width)|| (this._height > 0 && this._textHeight > this._height));
		}

		/**
		*快速更改显示文本。不进行排版计算，效率较高。
		*<p>如果只更改文字内容，不更改文字样式，建议使用此接口，能提高效率。</p>
		*@param text 文本内容。
		*/
		__proto.changeText=function(text){
			if (this._text!==text){
				this.lang(text+"");
				if (this._graphics && this._graphics.replaceText(this._text)){
					}else {
					this.typeset();
				}
			}
		}

		/**
		*@private
		*分析文本换行。
		*/
		__proto.parseLines=function(text){
			var needWordWrapOrTruncate=this.wordWrap || this.overflow==Text.HIDDEN;
			if (needWordWrapOrTruncate){
				var wordWrapWidth=this.getWordWrapWidth();
			};
			var measureResult=Browser.context.measureText("阳");
			this._charSize.width=measureResult.width;
			this._charSize.height=(measureResult.height || this.fontSize);
			var lines=text.replace(/\r\n/g,"\n").split("\n");
			for (var i=0,n=lines.length;i < n;i++){
				if (i < n-1)
					lines[i]+="\n";
				var line=lines[i];
				if (needWordWrapOrTruncate)
					this.parseLine(line,wordWrapWidth);
				else {
					this._lineWidths.push(this.getTextWidth(line));
					this._lines.push(line);
				}
			}
		}

		/**
		*@private
		*解析行文本。
		*@param line 某行的文本。
		*@param wordWrapWidth 文本的显示宽度。
		*/
		__proto.parseLine=function(line,wordWrapWidth){
			var ctx=Browser.context;
			var lines=this._lines;
			var maybeIndex=0;
			var execResult;
			var charsWidth=NaN;
			var wordWidth=NaN;
			var startIndex=0;
			charsWidth=this.getTextWidth(line);
			if (charsWidth <=wordWrapWidth){
				lines.push(line);
				this._lineWidths.push(charsWidth);
				return;
			}
			charsWidth=this._currBitmapFont ? this._currBitmapFont.getMaxWidth():this._charSize.width;
			maybeIndex=Math.floor(wordWrapWidth / charsWidth);
			(maybeIndex==0)&& (maybeIndex=1);
			charsWidth=this.getTextWidth(line.substring(0,maybeIndex));
			wordWidth=charsWidth;
			for (var j=maybeIndex,m=line.length;j < m;j++){
				charsWidth=this.getTextWidth(line.charAt(j));
				wordWidth+=charsWidth;
				if (wordWidth > wordWrapWidth){
					if (this.wordWrap){
						var newLine=line.substring(startIndex,j);
						if (newLine.charCodeAt(newLine.length-1)< 255){
							execResult=/[^\x20-]+$/.exec(newLine);
							if (execResult){
								j=execResult.index+startIndex;
								if (execResult.index==0)
									j+=newLine.length;
								else
								newLine=line.substring(startIndex,j);
							}
						}
						lines.push(newLine);
						this._lineWidths.push(wordWidth-charsWidth);
						startIndex=j;
						if (j+maybeIndex < m){
							j+=maybeIndex;
							charsWidth=this.getTextWidth(line.substring(startIndex,j));
							wordWidth=charsWidth;
							j--;
							}else {
							lines.push(line.substring(startIndex,m));
							this._lineWidths.push(this.getTextWidth(lines[lines.length-1]));
							startIndex=-1;
							break ;
						}
						}else if (this.overflow==Text.HIDDEN){
						lines.push(line.substring(0,j));
						this._lineWidths.push(this.getTextWidth(lines[lines.length-1]));
						return;
					}
				}
			}
			if (this.wordWrap && startIndex !=-1){
				lines.push(line.substring(startIndex,m));
				this._lineWidths.push(this.getTextWidth(lines[lines.length-1]));
			}
		}

		__proto.getTextWidth=function(text){
			if (this._currBitmapFont)
				return this._currBitmapFont.getTextWidth(text);
			else
			return Browser.context.measureText(text).width;
		}

		/**
		*获取换行所需的宽度。
		*/
		__proto.getWordWrapWidth=function(){
			var p=this.padding;
			var w=NaN;
			if (this._currBitmapFont && this._currBitmapFont.autoScaleSize)
				w=this._width *(this._currBitmapFont.fontSize / this.fontSize);
			else
			w=this._width;
			if (w <=0){
				w=this.wordWrap ? 100 :Browser.width;
			}
			w <=0 && (w=100);
			return w-p[3]-p[1];
		}

		/**
		*返回字符的位置信息。
		*@param charIndex 索引位置。
		*@param out 输出的Point引用。
		*@return 返回Point位置信息。
		*/
		__proto.getCharPoint=function(charIndex,out){
			this._isChanged && Laya.timer.runCallLater(this,this.typeset);
			var len=0,lines=this._lines,startIndex=0;
			for (var i=0,n=lines.length;i < n;i++){
				len+=lines[i].length;
				if (charIndex < len){
					var line=i;
					break ;
				}
				startIndex=len;
			};
			var ctxFont=(this.italic ? "italic " :"")+(this.bold ? "bold " :"")+this.fontSize+"px "+this.font;
			Browser.context.font=ctxFont;
			var width=this.getTextWidth(this._text.substring(startIndex,charIndex));
			var point=out || new Point();
			return point.setTo(this._startX+width-(this._clipPoint ? this._clipPoint.x :0),this._startY+line *(this._charSize.height+this.leading)-(this._clipPoint ? this._clipPoint.y :0));
		}

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'width',function(){
			if (this._width)
				return this._width;
			return this.textWidth+this.padding[1]+this.padding[3];
			},function(value){
			if (value !=this._width){
				_super.prototype._$set_width.call(this,value);
				this.isChanged=true;
			}
		});

		/**
		*表示文本的宽度，以像素为单位。
		*/
		__getset(0,__proto,'textWidth',function(){
			this._isChanged && Laya.timer.runCallLater(this,this.typeset);
			return this._textWidth;
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'height',function(){
			if (this._height)return this._height;
			return this.textHeight+this.padding[0]+this.padding[2];
			},function(value){
			if (value !=this._height){
				_super.prototype._$set_height.call(this,value);
				this.isChanged=true;
			}
		});

		/**
		*表示文本的高度，以像素为单位。
		*/
		__getset(0,__proto,'textHeight',function(){
			this._isChanged && Laya.timer.runCallLater(this,this.typeset);
			return this._textHeight;
		});

		/**
		*边距信息。
		*<p>数据格式：[上边距，右边距，下边距，左边距]（边距以像素为单位）。</p>
		*/
		__getset(0,__proto,'padding',function(){
			return this._getCSSStyle().padding;
			},function(value){
			this._getCSSStyle().padding=value;
			this.isChanged=true;
		});

		/**
		*指定文本是否为粗体字。
		*<p>默认值为 false，这意味着不使用粗体字。如果值为 true，则文本为粗体字。</p>
		*/
		__getset(0,__proto,'bold',function(){
			return this._getCSSStyle().bold;
			},function(value){
			this._getCSSStyle().bold=value;
			this.isChanged=true;
		});

		/**当前文本的内容字符串。*/
		__getset(0,__proto,'text',function(){
			return this._text || "";
			},function(value){
			if (this._text!==value){
				this.lang(value+"");
				this.isChanged=true;
				this.event(/*laya.events.Event.CHANGE*/"change");
			}
		});

		/**
		*表示文本的颜色值。可以通过 <code>Text.defaultColor</code> 设置默认颜色。
		*<p>默认值为黑色。</p>
		*/
		__getset(0,__proto,'color',function(){
			return this._getCSSStyle().color;
			},function(value){
			if (this._getCSSStyle().color !=value){
				this._getCSSStyle().color=value;
				if (!this._isChanged && this._graphics){
					this._graphics.replaceTextColor(this.color)
					}else {
					this.isChanged=true;
				}
			}
		});

		/**
		*文本的字体名称，以字符串形式表示。
		*<p>默认值为："Arial"，可以通过Text.defaultFont设置默认字体。</p> *
		*@see laya.display.css.Font#defaultFamily
		*/
		__getset(0,__proto,'font',function(){
			return this._getCSSStyle().fontFamily;
			},function(value){
			if (this._currBitmapFont){
				this._currBitmapFont=null;
				this.scale(1,1);
			}
			if (Text._bitmapFonts && Text._bitmapFonts[value]){
				this._currBitmapFont=Text._bitmapFonts[value];
			}
			this._getCSSStyle().fontFamily=value;
			this.isChanged=true;
		});

		/**
		*指定文本的字体大小（以像素为单位）。
		*<p>默认为20像素，可以通过 <code>Text.defaultSize</code> 设置默认大小。</p>
		*/
		__getset(0,__proto,'fontSize',function(){
			return this._getCSSStyle().fontSize;
			},function(value){
			this._getCSSStyle().fontSize=value;
			this.isChanged=true;
		});

		/**
		*表示使用此文本格式的文本是否为斜体。
		*<p>默认值为 false，这意味着不使用斜体。如果值为 true，则文本为斜体。</p>
		*/
		__getset(0,__proto,'italic',function(){
			return this._getCSSStyle().italic;
			},function(value){
			this._getCSSStyle().italic=value;
			this.isChanged=true;
		});

		/**
		*表示文本的水平显示方式。
		*<p><b>取值：</b>
		*<li>"left"： 居左对齐显示。</li>
		*<li>"center"： 居中对齐显示。</li>
		*<li>"right"： 居右对齐显示。</li>
		*</p>
		*/
		__getset(0,__proto,'align',function(){
			return this._getCSSStyle().align;
			},function(value){
			this._getCSSStyle().align=value;
			this.isChanged=true;
		});

		/**
		*表示文本的垂直显示方式。
		*<p><b>取值：</b>
		*<li>"top"： 居顶部对齐显示。</li>
		*<li>"middle"： 居中对齐显示。</li>
		*<li>"bottom"： 居底部对齐显示。</li>
		*</p>
		*/
		__getset(0,__proto,'valign',function(){
			return this._getCSSStyle().valign;
			},function(value){
			this._getCSSStyle().valign=value;
			this.isChanged=true;
		});

		/**
		*表示文本是否自动换行，默认为false。
		*<p>若值为true，则自动换行；否则不自动换行。</p>
		*/
		__getset(0,__proto,'wordWrap',function(){
			return this._getCSSStyle().wordWrap;
			},function(value){
			this._getCSSStyle().wordWrap=value;
			this.isChanged=true;
		});

		/**
		*垂直行间距（以像素为单位）。
		*/
		__getset(0,__proto,'leading',function(){
			return this._getCSSStyle().leading;
			},function(value){
			this._getCSSStyle().leading=value;
			this.isChanged=true;
		});

		/**
		*文本背景颜色，以字符串表示。
		*/
		__getset(0,__proto,'bgColor',function(){
			return this._getCSSStyle().backgroundColor;
			},function(value){
			this._getCSSStyle().backgroundColor=value;
			this.isChanged=true;
		});

		/**
		*文本边框背景颜色，以字符串表示。
		*/
		__getset(0,__proto,'borderColor',function(){
			return this._getCSSStyle().borderColor;
			},function(value){
			this._getCSSStyle().borderColor=value;
			this.isChanged=true;
		});

		/**
		*<p>描边宽度（以像素为单位）。</p>
		*默认值0，表示不描边。
		*/
		__getset(0,__proto,'stroke',function(){
			return this._getCSSStyle().stroke;
			},function(value){
			this._getCSSStyle().stroke=value;
			this.isChanged=true;
		});

		/**
		*<p>描边颜色，以字符串表示。</p>
		*默认值为 "#000000"（黑色）;
		*/
		__getset(0,__proto,'strokeColor',function(){
			return this._getCSSStyle().strokeColor;
			},function(value){
			this._getCSSStyle().strokeColor=value;
			this.isChanged=true;
		});

		/**
		*一个布尔值，表示文本的属性是否有改变。若为true表示有改变。
		*/
		__getset(0,__proto,'isChanged',null,function(value){
			if (this._isChanged!==value){
				this._isChanged=value;
				value && Laya.timer.callLater(this,this.typeset);
			}
		});

		/**
		*设置横向滚动量。
		*<p>即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。</p>
		*/
		/**
		*获取横向滚动量。
		*/
		__getset(0,__proto,'scrollX',function(){
			if (!this._clipPoint)
				return 0;
			return this._clipPoint.x;
			},function(value){
			if (this.overflow !=Text.SCROLL || (this.textWidth < this._width || !this._clipPoint))
				return;
			value=value < this.padding[3] ? this.padding[3] :value;
			var maxScrollX=this._textWidth-this._width;
			value=value > maxScrollX ? maxScrollX :value;
			var visibleLineCount=this._height / (this._charSize.height+this.leading)| 0+1;
			this._clipPoint.x=value;
			this.renderText(this._lastVisibleLineIndex,visibleLineCount);
		});

		/**
		*设置纵向滚动量（px)。即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。
		*/
		/**
		*获取纵向滚动量。
		*/
		__getset(0,__proto,'scrollY',function(){
			if (!this._clipPoint)
				return 0;
			return this._clipPoint.y;
			},function(value){
			if (this.overflow !=Text.SCROLL || (this.textHeight < this._height || !this._clipPoint))
				return;
			value=value < this.padding[0] ? this.padding[0] :value;
			var maxScrollY=this._textHeight-this._height;
			value=value > maxScrollY ? maxScrollY :value;
			var startLine=value / (this._charSize.height+this.leading)| 0;
			this._lastVisibleLineIndex=startLine;
			var visibleLineCount=(this._height / (this._charSize.height+this.leading)| 0)+1;
			this._clipPoint.y=value;
			this.renderText(startLine,visibleLineCount);
		});

		/**
		*获取横向可滚动最大值。
		*/
		__getset(0,__proto,'maxScrollX',function(){
			return (this.textWidth < this._width)? 0 :this._textWidth-this._width;
		});

		/**
		*获取纵向可滚动最大值。
		*/
		__getset(0,__proto,'maxScrollY',function(){
			return (this.textHeight < this._height)? 0 :this._textHeight-this._height;
		});

		__getset(0,__proto,'lines',function(){
			return this._lines;
		});

		__getset(0,__proto,'underlineColor',function(){
			return this._underlineColor;
			},function(value){
			this._underlineColor=value;
			this._isChanged=true;
			this.typeset();
		});

		Text.registerBitmapFont=function(name,bitmapFont){
			Text._bitmapFonts || (Text._bitmapFonts={});
			Text._bitmapFonts[name]=bitmapFont;
		}

		Text.unregisterBitmapFont=function(name,destroy){
			(destroy===void 0)&& (destroy=true);
			if (Text._bitmapFonts && Text._bitmapFonts[name]){
				var tBitmapFont=Text._bitmapFonts[name];
				if (destroy){
					tBitmapFont.destroy();
				}
				delete Text._bitmapFonts[name];
			}
		}

		Text.langPacks=null
		Text.VISIBLE="visible";
		Text.SCROLL="scroll";
		Text.HIDDEN="hidden";
		Text._bitmapFonts=null
		return Text;
	})(Sprite)


	/**
	*<p> <code>Stage</code> 类是显示对象的根节点。</p>
	*可以通过 Laya.stage 访问。
	*/
	//class laya.display.Stage extends laya.display.Sprite
	var Stage=(function(_super){
		function Stage(){
			this.focus=null;
			this._offset=null;
			this.frameRate="fast";
			this.desginWidth=0;
			this.desginHeight=0;
			this.canvasRotation=false;
			this.canvasDegree=0;
			this.renderingEnabled=true;
			this._screenMode="none";
			this._scaleMode="noscale";
			this._alignV="top";
			this._alignH="left";
			this._bgColor="black";
			this._mouseMoveTime=0;
			this._renderCount=0;
			this._safariOffsetY=0;
			Stage.__super.call(this);
			this.offset=new Point();
			this._canvasTransform=new Matrix();
			this.mouseEnabled=true;
			this.hitTestPrior=true;
			this._displayedInStage=true;
			var _this=this;
			var window=Browser.window;
			window.addEventListener("focus",function(){
				_this.event(/*laya.events.Event.FOCUS*/"focus");
			});
			window.addEventListener("blur",function(){
				_this.event(/*laya.events.Event.BLUR*/"blur");
				if (_this._isInputting())Input["inputElement"].target.focus=false;
			});
			var hidden="hidden",state="visibilityState",visibilityChange="visibilitychange";
			var document=window.document;
			if (typeof document.hidden!=="undefined"){
				visibilityChange="visibilitychange";
				state="visibilityState";
				}else if (typeof document.mozHidden!=="undefined"){
				visibilityChange="mozvisibilitychange";
				state="mozVisibilityState";
				}else if (typeof document.msHidden!=="undefined"){
				visibilityChange="msvisibilitychange";
				state="msVisibilityState";
				}else if (typeof document.webkitHidden!=="undefined"){
				visibilityChange="webkitvisibilitychange";
				state="webkitVisibilityState";
			}
			window.document.addEventListener(visibilityChange,visibleChangeFun);
			function visibleChangeFun (){
				if (Browser.document[state]=="hidden"){
					_this.event(/*laya.events.Event.BLUR*/"blur");
					if (_this._isInputting())Input["inputElement"].target.focus=false;
					}else {
					_this.event(/*laya.events.Event.FOCUS*/"focus");
				}
			}
			window.addEventListener("resize",function(){
				if (_this._isInputting())return;
				if (Browser.onSafari)
					_this._safariOffsetY=(Browser.document.body.clientHeight || Browser.document.documentElement.clientHeight)-Browser.window.innerHeight;
				_this._resetCanvas();
			});
			window.addEventListener("orientationchange",function(e){
				if (_this._isInputting())Input["inputElement"].target.focus=false;
				_this._resetCanvas();
			});
			this.on(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this._onmouseMove);
			if(Browser.onMobile)this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._onmouseMove);
		}

		__class(Stage,'laya.display.Stage',_super);
		var __proto=Stage.prototype;
		/**
		*在移动端输入时，输入法弹出期间不进行画布尺寸重置。
		*/
		__proto._isInputting=function(){
			return (Browser.onMobile && Input.isInputting);
		}

		/**@private */
		__proto._changeCanvasSize=function(){
			this.setScreenSize(Browser.clientWidth *Browser.pixelRatio,Browser.clientHeight *Browser.pixelRatio);
		}

		/**@private */
		__proto._resetCanvas=function(){
			var canvas=Render._mainCanvas;
			var canvasStyle=canvas.source.style;
			canvas.size(1,1);
			canvasStyle.transform=canvasStyle.webkitTransform=canvasStyle.msTransform=canvasStyle.mozTransform=canvasStyle.oTransform="";
			this.renderingEnabled=false;
			Laya.timer.once(100,this,this._changeCanvasSize);
		}

		/**
		*设置屏幕大小，场景会根据屏幕大小进行适配。
		*@param screenWidth 屏幕宽度。
		*@param screenHeight 屏幕高度。
		*/
		__proto.setScreenSize=function(screenWidth,screenHeight){
			var rotation=false;
			if (this._screenMode!=="none"){
				var screenType=screenWidth / screenHeight < 1 ? "vertical" :"horizontal";
				rotation=screenType!==this._screenMode;
				if (rotation){
					var temp=screenHeight;
					screenHeight=screenWidth;
					screenWidth=temp;
				}
			}
			this.canvasRotation=rotation;
			var canvas=Render._mainCanvas;
			var canvasStyle=canvas.source.style;
			var mat=this._canvasTransform.identity();
			var scaleMode=this._scaleMode;
			var scaleX=screenWidth / this.desginWidth;
			var scaleY=screenHeight / this.desginHeight;
			var canvasWidth=this.desginWidth;
			var canvasHeight=this.desginHeight;
			var realWidth=screenWidth;
			var realHeight=screenHeight;
			var pixelRatio=Browser.pixelRatio;
			this._width=this.desginWidth;
			this._height=this.desginHeight;
			switch (scaleMode){
				case "noscale":
					scaleX=scaleY=1;
					realWidth=this.desginWidth;
					realHeight=this.desginHeight;
					break ;
				case "showall":
					scaleX=scaleY=Math.min(scaleX,scaleY);
					canvasWidth=realWidth=Math.round(this.desginWidth *scaleX);
					canvasHeight=realHeight=Math.round(this.desginHeight *scaleY);
					break ;
				case "noborder":
					scaleX=scaleY=Math.max(scaleX,scaleY);
					realWidth=Math.round(this.desginWidth *scaleX);
					realHeight=Math.round(this.desginHeight *scaleY);
					break ;
				case "full":
					scaleX=scaleY=1;
					this._width=canvasWidth=screenWidth;
					this._height=canvasHeight=screenHeight;
					break ;
				case "fixedwidth":
					scaleY=scaleX;
					this._height=screenHeight / scaleX;
					canvasHeight=Math.round(screenHeight / scaleX);
					break ;
				case "fixedheight":
					scaleX=scaleY;
					this._width=screenWidth / scaleY;
					canvasWidth=Math.round(screenWidth / scaleY);
					break ;
				}
			scaleX *=this.scaleX;
			scaleY *=this.scaleY;
			if (scaleX===1 && scaleY===1){
				this.transform && this.transform.identity();
				}else {
				this.transform || (this.transform=new Matrix());
				this.transform.a=scaleX / (realWidth / canvasWidth);
				this.transform.d=scaleY / (realHeight / canvasHeight);
				this.model && this.model.scale(this.transform.a,this.transform.d);
			}
			canvas.size(canvasWidth,canvasHeight);
			RunDriver.changeWebGLSize(canvasWidth,canvasHeight);
			mat.scale(realWidth / canvasWidth / pixelRatio,realHeight / canvasHeight / pixelRatio);
			if (this._alignH==="left")this.offset.x=0;
			else if (this._alignH==="right")this.offset.x=screenWidth-realWidth;
			else this.offset.x=(screenWidth-realWidth)*0.5 / pixelRatio;
			if (this._alignV==="top")this.offset.y=0;
			else if (this._alignV==="bottom")this.offset.y=screenHeight-realHeight;
			else this.offset.y=(screenHeight-realHeight)*0.5 / pixelRatio;
			if (!this._offset){
				this._offset=new Point(parseInt(canvasStyle.left)|| 0,parseInt(canvasStyle.top)|| 0);
				canvasStyle.left=canvasStyle.top="0px";
			}
			this.offset.x+=this._offset.x;
			this.offset.y+=this._offset.y;
			this.offset.x=Math.round(this.offset.x);
			this.offset.y=Math.round(this.offset.y);
			canvasStyle.top=this._safariOffsetY+"px";
			mat.translate(this.offset.x,this.offset.y);
			this.canvasDegree=0;
			if (rotation){
				if (this._screenMode==="horizontal"){
					mat.rotate(Math.PI / 2);
					mat.translate(screenHeight / pixelRatio,0);
					this.canvasDegree=90;
					}else {
					mat.rotate(-Math.PI / 2);
					mat.translate(0,screenWidth / pixelRatio);
					this.canvasDegree=-90;
				}
			}
			if (mat.a < 0.00000000000001)mat.a=mat.d=0;
			if (mat.tx < 0.00000000000001)mat.tx=0;
			if (mat.ty < 0.00000000000001)mat.ty=0;
			canvasStyle.transformOrigin=canvasStyle.webkitTransformOrigin=canvasStyle.msTransformOrigin=canvasStyle.mozTransformOrigin=canvasStyle.oTransformOrigin="0px 0px 0px";
			canvasStyle.transform=canvasStyle.webkitTransform=canvasStyle.msTransform=canvasStyle.mozTransform=canvasStyle.oTransform="matrix("+mat.toString()+")";
			this.renderingEnabled=true;
			this._repaint=1;
			this.event(/*laya.events.Event.RESIZE*/"resize");
		}

		/**@inheritDoc */
		__proto.getMousePoint=function(){
			return Point.TEMP.setTo(this.mouseX,this.mouseY);
		}

		/**@inheritDoc */
		__proto.repaint=function(){
			this._repaint=1;
		}

		/**@inheritDoc */
		__proto.parentRepaint=function(){}
		/**@private */
		__proto._loop=function(){
			this.render(Render.context,0,0);
			return true;
		}

		/**@private */
		__proto._onmouseMove=function(e){
			this._mouseMoveTime=Browser.now();
		}

		/**@inheritDoc */
		__proto.render=function(context,x,y){
			Render.isFlash && this.repaint();
			this._renderCount++;
			var frameMode=this.frameRate==="mouse" ? (((Browser.now()-this._mouseMoveTime)< 2000)? "fast" :"slow"):this.frameRate;
			var isFastMode=(frameMode!=="slow");
			var isDoubleLoop=(this._renderCount % 2===0);
			var ctx=context;
			Stat.renderSlow=!isFastMode;
			if (isFastMode || isDoubleLoop){
				Stat.loopCount++;
				MouseManager.instance.runEvent();
				Laya.timer._update();
				if (Render.isConchNode){
					var customList=Sprite.CustomList;
					for (var i=0,n=customList.length;i < n;i++){
						customList[i].customRender(customList[i].customContext,0,0);
					}
					return;
				}
				if (this.renderingEnabled){
					Render.isWebGL ? ctx.clear():RunDriver.clear(this._bgColor);
					_super.prototype.render.call(this,context,x,y);
				}
			}
			if (Render.isConchNode)return;
			if (this.renderingEnabled && (isFastMode || !isDoubleLoop)){
				Render.isWebGL && RunDriver.clear(this._bgColor);
				RunDriver.beginFlush();
				context.flush();
				RunDriver.endFinish();
			}
			VectorGraphManager.instance && VectorGraphManager.getInstance().endDispose();
		}

		/**@private */
		__proto._requestFullscreen=function(){
			var element=Browser.document.documentElement;
			if (element.requestFullscreen){
				element.requestFullscreen();
				}else if (element.mozRequestFullScreen){
				element.mozRequestFullScreen();
				}else if (element.webkitRequestFullscreen){
				element.webkitRequestFullscreen();
				}else if (element.msRequestFullscreen){
				element.msRequestFullscreen();
			}
		}

		/**@private */
		__proto._fullScreenChanged=function(){
			Laya.stage.event(/*laya.events.Event.FULL_SCREEN_CHANGE*/"fullscreenchange");
		}

		/**退出全屏*/
		__proto.exitFullscreen=function(){
			var document=Browser.document;
			if (document.exitFullscreen){
				document.exitFullscreen();
				}else if (document.mozCancelFullScreen){
				document.mozCancelFullScreen();
				}else if (document.webkitExitFullscreen){
				document.webkitExitFullscreen();
			}
		}

		/**鼠标在 Stage 上的 Y 轴坐标。*/
		__getset(0,__proto,'mouseY',function(){
			return Math.round(MouseManager.instance.mouseY / this.clientScaleY);
		});

		/**当前视窗由缩放模式导致的 Y 轴缩放系数。*/
		__getset(0,__proto,'clientScaleY',function(){
			return this._transform ? this._transform.getScaleY():1;
		});

		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			this.desginWidth=value;
			_super.prototype._$set_width.call(this,value);
			Laya.timer.callLater(this,this._changeCanvasSize);
		});

		/**
		*水平对齐方式。
		*<p><ul>取值范围：
		*<li>"left" ：居左对齐；</li>
		*<li>"center" ：居中对齐；</li>
		*<li>"right" ：居右对齐；</li>
		*</ul></p>
		*默认值为"left"。
		*/
		__getset(0,__proto,'alignH',function(){
			return this._alignH;
			},function(value){
			this._alignH=value;
			Laya.timer.callLater(this,this._changeCanvasSize);
		});

		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			this.desginHeight=value;
			_super.prototype._$set_height.call(this,value);
			Laya.timer.callLater(this,this._changeCanvasSize);
		});

		/**
		*<p>缩放模式。</p>
		*<p><ul>取值范围：
		*<li>"noscale" ：不缩放；</li>
		*<li>"exactfit" ：全屏不等比缩放；</li>
		*<li>"showall" ：最小比例缩放；</li>
		*<li>"noborder" ：最大比例缩放；</li>
		*<li>"full" ：不缩放，stage的宽高等于屏幕宽高；</li>
		*<li>"fixedwidth" ：宽度不变，高度根据屏幕比缩放；</li>
		*<li>"fixedheight" ：高度不变，宽度根据屏幕比缩放；</li>
		*</ul></p>
		*默认值为 "noscale"。
		*/
		__getset(0,__proto,'scaleMode',function(){
			return this._scaleMode;
			},function(value){
			this._scaleMode=value;
			Laya.timer.callLater(this,this._changeCanvasSize);
		});

		/**
		*垂直对齐方式。
		*<p><ul>取值范围：
		*<li>"top" ：居顶部对齐；</li>
		*<li>"middle" ：居中对齐；</li>
		*<li>"bottom" ：居底部对齐；</li>
		*</ul></p>
		*/
		__getset(0,__proto,'alignV',function(){
			return this._alignV;
			},function(value){
			this._alignV=value;
			Laya.timer.callLater(this,this._changeCanvasSize);
		});

		/**舞台的背景颜色，默认为黑色，null为透明。*/
		__getset(0,__proto,'bgColor',function(){
			return this._bgColor;
			},function(value){
			this._bgColor=value;
			this.model && this.model.bgColor(value);
			if (value){
				Render.canvas.style.background=value;
				}else {
				Render.canvas.style.background="none";
			}
		});

		/**当前视窗由缩放模式导致的 X 轴缩放系数。*/
		__getset(0,__proto,'clientScaleX',function(){
			return this._transform ? this._transform.getScaleX():1;
		});

		/**鼠标在 Stage 上的 X 轴坐标。*/
		__getset(0,__proto,'mouseX',function(){
			return Math.round(MouseManager.instance.mouseX / this.clientScaleX);
		});

		/**
		*场景布局类型。
		*<p><ul>取值范围：
		*<li>"none" ：不更改屏幕</li>
		*<li>"horizontal" ：自动横屏</li>
		*<li>"vertical" ：自动竖屏</li>
		*</ul></p>
		*/
		__getset(0,__proto,'screenMode',function(){
			return this._screenMode;
			},function(value){
			this._screenMode=value;
		});

		/**是否开启全屏，用户点击后进入全屏*/
		__getset(0,__proto,'fullScreenEnabled',null,function(value){
			var document=Browser.document;
			var canvas=Render.canvas;
			if (value){
				canvas.addEventListener('mousedown',this._requestFullscreen);
				canvas.addEventListener('touchstart',this._requestFullscreen);
				document.addEventListener("fullscreenchange",this._fullScreenChanged);
				document.addEventListener("mozfullscreenchange",this._fullScreenChanged);
				document.addEventListener("webkitfullscreenchange",this._fullScreenChanged);
				document.addEventListener("msfullscreenchange",this._fullScreenChanged);
				}else {
				canvas.removeEventListener('mousedown',this._requestFullscreen);
				canvas.removeEventListener('touchstart',this._requestFullscreen);
				document.removeEventListener("fullscreenchange",this._fullScreenChanged);
				document.removeEventListener("mozfullscreenchange",this._fullScreenChanged);
				document.removeEventListener("webkitfullscreenchange",this._fullScreenChanged);
				document.removeEventListener("msfullscreenchange",this._fullScreenChanged);
			}
		});

		Stage.SCALE_NOSCALE="noscale";
		Stage.SCALE_EXACTFIT="exactfit";
		Stage.SCALE_SHOWALL="showall";
		Stage.SCALE_NOBORDER="noborder";
		Stage.SCALE_FULL="full";
		Stage.SCALE_FIXED_WIDTH="fixedwidth";
		Stage.SCALE_FIXED_HEIGHT="fixedheight";
		Stage.ALIGN_LEFT="left";
		Stage.ALIGN_RIGHT="right";
		Stage.ALIGN_CENTER="center";
		Stage.ALIGN_TOP="top";
		Stage.ALIGN_MIDDLE="middle";
		Stage.ALIGN_BOTTOM="bottom";
		Stage.SCREEN_NONE="none";
		Stage.SCREEN_HORIZONTAL="horizontal";
		Stage.SCREEN_VERTICAL="vertical";
		Stage.FRAME_FAST="fast";
		Stage.FRAME_SLOW="slow";
		Stage.FRAME_MOUSE="mouse";
		return Stage;
	})(Sprite)


	//class laya.media.SoundNode extends laya.display.Sprite
	var SoundNode=(function(_super){
		function SoundNode(){
			this.url=null;
			this._channel=null;
			this._tar=null;
			this._playEvents=null;
			this._stopEvents=null;
			SoundNode.__super.call(this);
			this.visible=false;
			this.on(/*laya.events.Event.ADDED*/"added",this,this._onParentChange);
			this.on(/*laya.events.Event.REMOVED*/"removed",this,this._onParentChange);
		}

		__class(SoundNode,'laya.media.SoundNode',_super);
		var __proto=SoundNode.prototype;
		/**@private */
		__proto._onParentChange=function(){
			this.target=this.parent;
		}

		/**
		*播放
		*@param loops 循环次数
		*@param complete 完成回调
		*
		*/
		__proto.play=function(loops,complete){
			(loops===void 0)&& (loops=1);
			if (isNaN(loops)){
				loops=1;
			}
			if (!this.url)return;
			this.stop();
			this._channel=SoundManager.playSound(this.url,loops,complete);
		}

		/**
		*停止播放
		*
		*/
		__proto.stop=function(){
			if (this._channel && !this._channel.isStopped){
				this._channel.stop();
			}
			this._channel=null;
		}

		/**@private */
		__proto._setPlayAction=function(tar,event,action,add){
			(add===void 0)&& (add=true);
			if (!this[action])return;
			if (!tar)return;
			if (add){
				tar.on(event,this,this[action]);
				}else {
				tar.off(event,this,this[action]);
			}
		}

		/**@private */
		__proto._setPlayActions=function(tar,events,action,add){
			(add===void 0)&& (add=true);
			if (!tar)return;
			if (!events)return;
			var eventArr=events.split(",");
			var i=0,len=0;
			len=eventArr.length;
			for (i=0;i < len;i++){
				this._setPlayAction(tar,eventArr[i],action,add);
			}
		}

		/**
		*设置触发播放的事件
		*@param events
		*
		*/
		__getset(0,__proto,'playEvent',null,function(events){
			this._playEvents=events;
			if (!events)return;
			if (this._tar){
				this._setPlayActions(this._tar,events,"play");
			}
		});

		/**
		*设置控制播放的对象
		*@param tar
		*
		*/
		__getset(0,__proto,'target',null,function(tar){
			if (this._tar){
				this._setPlayActions(this._tar,this._playEvents,"play",false);
				this._setPlayActions(this._tar,this._stopEvents,"stop",false);
			}
			this._tar=tar;
			if (this._tar){
				this._setPlayActions(this._tar,this._playEvents,"play",true);
				this._setPlayActions(this._tar,this._stopEvents,"stop",true);
			}
		});

		/**
		*设置触发停止的事件
		*@param events
		*
		*/
		__getset(0,__proto,'stopEvent',null,function(events){
			this._stopEvents=events;
			if (!events)return;
			if (this._tar){
				this._setPlayActions(this._tar,events,"stop");
			}
		});

		return SoundNode;
	})(Sprite)


	//class laya.scene.Scene2D extends laya.display.Sprite
	var Scene2D=(function(_super){
		function Scene2D(){
			Scene2D.__super.call(this);
			this.createChildren();
		}

		__class(Scene2D,'laya.scene.Scene2D',_super);
		var __proto=Scene2D.prototype;
		/**
		*<p>创建并添加控件子节点。</p>
		*@internal 子类可在此函数内创建并添加子节点。
		*/
		__proto.createChildren=function(){}
		__proto.createView=function(sceneData){
			ClassUtils.createByJson(sceneData,this,this);
		}

		return Scene2D;
	})(Sprite)


	/**
	*@private
	*<code>FileBitmap</code> 是图片文件资源类。
	*/
	//class laya.resource.FileBitmap extends laya.resource.Bitmap
	var FileBitmap=(function(_super){
		function FileBitmap(){
			this._src=null;
			this._onload=null;
			this._onerror=null;
			FileBitmap.__super.call(this);
		}

		__class(FileBitmap,'laya.resource.FileBitmap',_super);
		var __proto=FileBitmap.prototype;
		/**
		*文件路径全名。
		*/
		__getset(0,__proto,'src',function(){
			return this._src;
			},function(value){
			this._src=value;
		});

		/**
		*载入完成处理函数。
		*/
		__getset(0,__proto,'onload',null,function(value){
		});

		/**
		*错误处理函数。
		*/
		__getset(0,__proto,'onerror',null,function(value){
		});

		return FileBitmap;
	})(Bitmap)


	/**
	*<code>HTMLCanvas</code> 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
	*/
	//class laya.resource.HTMLCanvas extends laya.resource.Bitmap
	var HTMLCanvas=(function(_super){
		function HTMLCanvas(type,canvas){
			//this._ctx=null;
			this._is2D=false;
			HTMLCanvas.__super.call(this);
			var _$this=this;
			this._source=this;
			if (type==="2D" || (type==="AUTO" && !Render.isWebGL)){
				this._is2D=true;
				this._source=canvas || Browser.createElement("canvas");
				var o=this;
				o.getContext=function (contextID,other){
					if (_$this._ctx)return _$this._ctx;
					var ctx=_$this._ctx=_$this._source.getContext(contextID,other);
					if (ctx){
						ctx._canvas=o;
						if(!Render.isFlash)ctx.size=function (w,h){
						};
					}
					return ctx;
				}
			}
			else this._source={};
		}

		__class(HTMLCanvas,'laya.resource.HTMLCanvas',_super);
		var __proto=HTMLCanvas.prototype;
		/**
		*清空画布内容。
		*/
		__proto.clear=function(){
			this._ctx && this._ctx.clear();
		}

		/**
		*销毁。
		*/
		__proto.destroy=function(){
			this._ctx && this._ctx.destroy();
			this._ctx=null;
		}

		/**
		*释放。
		*/
		__proto.release=function(){}
		/**
		*@private
		*设置 Canvas 渲染上下文。
		*@param context Canvas 渲染上下文。
		*/
		__proto._setContext=function(context){
			this._ctx=context;
		}

		/**
		*获取 Canvas 渲染上下文。
		*@param contextID 上下文ID.
		*@param other
		*@return Canvas 渲染上下文 Context 对象。
		*/
		__proto.getContext=function(contextID,other){
			return this._ctx ? this._ctx :(this._ctx=HTMLCanvas._createContext(this));
		}

		/**
		*获取内存大小。
		*@return 内存大小。
		*/
		__proto.getMemSize=function(){
			return 0;
		}

		/**
		*设置宽高。
		*@param w 宽度。
		*@param h 高度。
		*/
		__proto.size=function(w,h){
			if (this._w !=w || this._h !=h){
				this._w=w;
				this._h=h;
				this._ctx && this._ctx.size(w,h);
				this._source && (this._source.height=h,this._source.width=w);
			}
		}

		/**
		*Canvas 渲染上下文。
		*/
		__getset(0,__proto,'context',function(){
			return this._ctx;
		});

		/**
		*是否当作 Bitmap 对象。
		*/
		__getset(0,__proto,'asBitmap',null,function(value){
		});

		HTMLCanvas.create=function(type,canvas){
			return new HTMLCanvas(type,canvas);
		}

		HTMLCanvas.TYPE2D="2D";
		HTMLCanvas.TYPE3D="3D";
		HTMLCanvas.TYPEAUTO="AUTO";
		HTMLCanvas._createContext=null
		return HTMLCanvas;
	})(Bitmap)


	/**
	*@private
	*/
	//class laya.resource.HTMLSubImage extends laya.resource.Bitmap
	var HTMLSubImage=(function(_super){
		//请不要直接使用new HTMLSubImage
		function HTMLSubImage(canvas,offsetX,offsetY,width,height,atlasImage,src,allowMerageInAtlas){
			HTMLSubImage.__super.call(this);
			throw new Error("不允许new！");
		}

		__class(HTMLSubImage,'laya.resource.HTMLSubImage',_super);
		HTMLSubImage.create=function(canvas,offsetX,offsetY,width,height,atlasImage,src,allowMerageInAtlas){
			(allowMerageInAtlas===void 0)&& (allowMerageInAtlas=false);
			return new HTMLSubImage(canvas,offsetX,offsetY,width,height,atlasImage,src,allowMerageInAtlas);
		}

		return HTMLSubImage;
	})(Bitmap)


	/**
	*<code>Box</code> 类是一个控件容器类。
	*/
	//class laya.ui.Box extends laya.ui.Component
	var Box=(function(_super){
		function Box(){Box.__super.call(this);;
		};

		__class(Box,'laya.ui.Box',_super);
		var __proto=Box.prototype;
		Laya.imps(__proto,{"laya.ui.IBox":true})
		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			for (var name in value){
				var comp=this.getChildByName(name);
				if (comp)comp.dataSource=value[name];
				else if (this.hasOwnProperty(name))this[name]=value[name];
			}
		});

		return Box;
	})(Component)


	/**
	*<p> <code>Animation</code> 类是位图动画,用于创建位图动画。</p>
	*<p> <code>Animation</code> 类可以加载并显示一组位图图片，并组成动画进行播放。</p>
	*@example 以下示例代码，创建了一个 <code>Text</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.display.Animation;
		*import laya.net.Loader;
		*import laya.utils.Handler;
		*public class Animation_Example
		*{
			*public function Animation_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*init();//初始化
				*}
			*private function init():void
			*{
				*var animation:Animation=new Animation();//创建一个 Animation 类的实例对象 animation 。
				*animation.loadAtlas("resource/ani/fighter.json");//加载图集并播放
				*animation.x=200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
				*animation.y=200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
				*animation.interval=30;//设置 animation 对象的动画播放间隔时间，单位：毫秒。
				*animation.play();//播放动画。
				*Laya.stage.addChild(animation);//将 animation 对象添加到显示列表。
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Animation_Example();
	*function Animation_Example(){
		*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
		*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
		*init();//初始化
		*}
	*function init()
	*{
		*var animation=new Laya.Animation();//创建一个 Animation 类的实例对象 animation 。
		*animation.loadAtlas("resource/ani/fighter.json");//加载图集并播放
		*animation.x=200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
		*animation.y=200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
		*animation.interval=30;//设置 animation 对象的动画播放间隔时间，单位：毫秒。
		*animation.play();//播放动画。
		*Laya.stage.addChild(animation);//将 animation 对象添加到显示列表。
		*}
	*</listing>
	*<listing version="3.0">
	*import Animation=laya.display.Animation;
	*class Animation_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*this.init();
			*}
		*private init():void {
			*var animation:Animation=new Laya.Animation();//创建一个 Animation 类的实例对象 animation 。
			*animation.loadAtlas("resource/ani/fighter.json");//加载图集并播放
			*animation.x=200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
			*animation.y=200;//设置 animation 对象的属性 x 的值，用于控制 animation 对象的显示位置。
			*animation.interval=30;//设置 animation 对象的动画播放间隔时间，单位：毫秒。
			*animation.play();//播放动画。
			*Laya.stage.addChild(animation);//将 animation 对象添加到显示列表。
			*}
		*}
	*new Animation_Example();
	*</listing>
	*/
	//class laya.display.Animation extends laya.display.AnimationPlayerBase
	var Animation=(function(_super){
		function Animation(){
			this._frames=null;
			this._url=null;
			this._actionName=null;
			Animation.__super.call(this);
			this._setControlNode(this);
		}

		__class(Animation,'laya.display.Animation',_super);
		var __proto=Animation.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			this.stop();
			laya.display.Sprite.prototype.destroy.call(this,destroyChild);
			this._frames=null;
			this._labels=null;
		}

		/**
		*播放动画。
		*@param start 开始播放的动画索引或label。
		*@param loop 是否循环。
		*@param name 如果name为空(可选)，则播放当前动画，如果不为空，则播放全局缓存动画（如果有）
		*/
		__proto.play=function(start,loop,name){
			(start===void 0)&& (start=0);
			(loop===void 0)&& (loop=true);
			(name===void 0)&& (name="");
			if (name)this._setFramesFromCache(name);
			this._isPlaying=true;
			this.index=((typeof start=='string'))? this._getFrameByLabel(start):start;
			this.loop=loop;
			this._actionName=name;
			if (this._frames && this._frames.length > 1 && this.interval > 0){
				this.timerLoop(this.interval,this,this._frameLoop,null,true);
			}
		}

		__proto._setFramesFromCache=function(name){
			if (this._url)name=this._url+"#"+name;
			if (name && Animation.framesMap[name]){
				this._frames=Animation.framesMap[name];
				this._count=this._frames.length;
				return true;
			}
			return false;
		}

		__proto._frameLoop=function(){
			if (this._style.visible && this._style.alpha > 0.01){
				_super.prototype._frameLoop.call(this);
			}
		}

		__proto._displayToIndex=function(value){
			if (this._frames)this.graphics=this._frames[value];
		}

		/**清理。方便对象复用。*/
		__proto.clear=function(){
			this.stop();
			this.graphics=null;
			this._frames=null;
			this._labels=null;
		}

		/**
		*加载图片集合，组成动画。
		*@param urls 图片地址集合。如：[url1,url2,url3,...]。
		*@param cacheName 缓存为模板的名称，下次可以直接使用play调用，无需重新创建动画模板，设置为空则不缓存
		*@return 返回动画本身。
		*/
		__proto.loadImages=function(urls,cacheName){
			(cacheName===void 0)&& (cacheName="");
			this._url="";
			if (!Animation.framesMap[cacheName]){
				this.frames=Animation.framesMap[cacheName] ? Animation.framesMap[cacheName] :Animation.createFrames(urls,cacheName);
			}
			return this;
		}

		/**
		*加载并播放一个图集。
		*@param url 图集地址。
		*@param loaded 加载完毕回调
		*@param cacheName 缓存为模板的名称，下次可以直接使用play调用，无需重新创建动画模板，设置为空则不缓存
		*@return 返回动画本身。
		*/
		__proto.loadAtlas=function(url,loaded,cacheName){
			(cacheName===void 0)&& (cacheName="");
			this._url="";
			var _this=this;
			if (!Animation.framesMap[cacheName]){
				function onLoaded (loadUrl){
					if (url===loadUrl){
						_this.frames=Animation.framesMap[cacheName] ? Animation.framesMap[cacheName] :Animation.createFrames(url,cacheName);
						if (loaded)loaded.run();
					}
				}
				if (Loader.getAtlas(url))onLoaded(url);
				else Laya.loader.load(url,Handler.create(null,onLoaded,[url]),null,/*laya.net.Loader.ATLAS*/"atlas");
			}
			return this;
		}

		/**
		*加载并播放一个由IDE制作的动画。
		*@param url 动画地址。
		*@param loaded 加载完毕回调
		*@return 返回动画本身。
		*/
		__proto.loadAnimation=function(url,loaded){
			this._url=url;
			var _this=this;
			if (!Animation.framesMap[url]){
				function onLoaded (loadUrl){
					if (url===loadUrl){
						if (!Animation.framesMap[url]){
							var aniData=_this._parseGraphicAnimation(Loader.getRes(url));
							if (!aniData)return;
							var obj=aniData.animationDic;
							var flag=true;
							for (var name in obj){
								var arr=obj[name];
								if (arr.length){
									Animation.framesMap[url+"#"+name]=arr;
									}else {
									flag=false;
								}
							}
							_this.frames=aniData.animationList[0];
							if (flag)Animation.framesMap[url]=_this.frames;
							}else {
							_this.frames=Animation.framesMap[url];
						}
						if (loaded)loaded.run();
					}
				}
				if (Loader.getRes(url))onLoaded(url);
				else Laya.loader.load(url,Handler.create(null,onLoaded,[url]),null,/*laya.net.Loader.JSON*/"json");
				Loader.clearRes(url);
			}
			return this;
		}

		/**@private */
		__proto._parseGraphicAnimation=function(animationData){
			return GraphicAnimation.parseAnimationData(animationData)
		}

		/**Graphics集合*/
		__getset(0,__proto,'frames',function(){
			return this._frames;
			},function(value){
			this._frames=value;
			if (value){
				this._count=value.length;
				if (this._isPlaying)this.play(this._index,this.loop,this._actionName);
				else this.index=this._index;
			}
		});

		/**是否自动播放*/
		__getset(0,__proto,'autoPlay',null,function(value){
			if (value)this.play();
			else this.stop();
		});

		/**图集地址或者图片集合*/
		__getset(0,__proto,'source',null,function(value){
			if (value.indexOf(".ani")>-1)this.loadAnimation(value);
			else if (value.indexOf(".json")>-1 || value.indexOf("als")>-1)this.loadAtlas(value);
			else this.loadImages(value.split(","));
		});

		Animation.createFrames=function(url,name){
			var arr;
			if ((typeof url=='string')){
				var atlas=Loader.getAtlas(url);
				if (atlas && atlas.length){
					arr=[];
					for (var i=0,n=atlas.length;i < n;i++){
						var g=new Graphics();
						g.drawTexture(Loader.getRes(atlas[i]),0,0);
						arr.push(g);
					}
				}
				}else if ((url instanceof Array)){
				arr=[];
				for (i=0,n=url.length;i < n;i++){
					g=new Graphics();
					g.loadImage(url[i],0,0);
					arr.push(g);
				}
			}
			if (name)Animation.framesMap[name]=arr;
			return arr;
		}

		Animation.clearCache=function(url){
			var cache=Animation.framesMap;
			var key;
			for (key in cache){
				if (key===url || key.indexOf(url+"#")==0){
					delete Animation.framesMap[key];
				}
			}
		}

		Animation.framesMap={};
		return Animation;
	})(AnimationPlayerBase)


	/**
	*关键帧动画播放类
	*
	*/
	//class laya.display.FrameAnimation extends laya.display.AnimationPlayerBase
	var FrameAnimation=(function(_super){
		function FrameAnimation(){
			this._targetDic=null;
			this._animationData=null;
			FrameAnimation.__super.call(this);
			if(FrameAnimation._sortIndexFun==null){
				FrameAnimation._sortIndexFun=MathUtil.sortByKey("index",false,true);
			}
		}

		__class(FrameAnimation,'laya.display.FrameAnimation',_super);
		var __proto=FrameAnimation.prototype;
		/**
		*@private
		*初始化动画数据
		*@param targetDic 对象表
		*@param animationData 动画数据
		*
		*/
		__proto._setUp=function(targetDic,animationData){
			this._labels=null;
			this._targetDic=targetDic;
			this._animationData=animationData;
			this.interval=1000 / animationData.frameRate;
			this._calculateDatas();
		}

		/**@inheritDoc */
		__proto.clear=function(){
			_super.prototype.clear.call(this);
			this._targetDic=null;
			this._animationData=null;
		}

		/**@inheritDoc */
		__proto._displayToIndex=function(value){
			if(!this._animationData)return;
			if(value<0)value=0;
			if(value>this._count)value=this._count;
			var nodes=this._animationData.nodes,i=0,len=nodes.length;
			for(i=0;i<len;i++){
				this._displayNodeToFrame(nodes[i],value);
			}
		}

		/**
		*@private
		*将节点设置到某一帧的状态
		*@param node 节点ID
		*@param frame
		*@param targetDic 节点表
		*
		*/
		__proto._displayNodeToFrame=function(node,frame,targetDic){
			if(!targetDic)targetDic=this._targetDic;
			var target=targetDic[node.target];
			if(!target){
				return;
			};
			var frames=node.frames,key,propFrames,value;
			var keys=node.keys,i=0,len=keys.length;
			for(i=0;i<len;i++){
				key=keys[i];
				propFrames=frames[key];
				if(propFrames.length>frame){
					value=propFrames[frame];
					}else{
					value=propFrames[propFrames.length-1];
				}
				target[key]=value;
			}
		}

		/**
		*@private
		*计算帧数据
		*
		*/
		__proto._calculateDatas=function(){
			if(!this._animationData)return;
			var nodes=this._animationData.nodes,i=0,len=nodes.length,tNode;
			this._count=0;
			for(i=0;i<len;i++){
				tNode=nodes[i];
				this._calculateNodeKeyFrames(tNode);
			}
			this._count+=1;
		}

		/**
		*@private
		*计算某个节点的帧数据
		*@param node
		*
		*/
		__proto._calculateNodeKeyFrames=function(node){
			var keyFrames=node.keyframes,key,tKeyFrames,target=node.target;
			if(!node.frames){
				node.frames={};
			}
			if(!node.keys){
				node.keys=[];
				}else{
				node.keys.length=0;
			}
			for(key in keyFrames){
				tKeyFrames=keyFrames[key];
				if(!node.frames[key]){
					node.frames[key]=[];
				}
				tKeyFrames.sort(FrameAnimation._sortIndexFun);
				node.keys.push(key);
				this._calculateNodePropFrames(tKeyFrames,node.frames[key],key,target);
			}
		}

		/**
		*@private
		*计算节点某个属性的帧数据
		*@param keyframes
		*@param frames
		*@param key
		*@param target
		*
		*/
		__proto._calculateNodePropFrames=function(keyframes,frames,key,target){
			var i=0,len=keyframes.length-1;
			frames.length=keyframes[len].index+1;
			for(i=0;i<len;i++){
				this._dealKeyFrame(keyframes[i]);
				this._calculateFrameValues(keyframes[i],keyframes[i+1],frames);
			}
			if(len==0){
				frames[0]=keyframes[0].value;
			}
			this._dealKeyFrame(keyframes[i]);
		}

		/**
		*@private
		*
		*/
		__proto._dealKeyFrame=function(keyFrame){
			if (keyFrame.label&&keyFrame.label !="")this.addLabel(keyFrame.label,keyFrame.index);
		}

		/**
		*@private
		*计算两个关键帧直接的帧数据
		*@param startFrame
		*@param endFrame
		*@param result
		*
		*/
		__proto._calculateFrameValues=function(startFrame,endFrame,result){
			var i=0,easeFun;
			var start=startFrame.index,end=endFrame.index;
			var startValue=startFrame.value;
			var dValue=endFrame.value-startFrame.value;
			var dLen=end-start;
			if(end>this._count)this._count=end;
			if(startFrame.tween){
				easeFun=Ease[startFrame.tweenMethod];
				if(easeFun==null){
					easeFun=Ease.linearNone;
				}
				for(i=start;i<end;i++){
					result[i]=easeFun(i-start,startValue,dValue,dLen);
				}
				}else{
				for(i=start;i<end;i++){
					result[i]=startValue;
				}
			}
			result[endFrame.index]=endFrame.value;
		}

		FrameAnimation._sortIndexFun=null
		return FrameAnimation;
	})(AnimationPlayerBase)


	/**
	*<p><code>Input</code> 类用于创建显示对象以显示和输入文本。</p>
	*/
	//class laya.display.Input extends laya.display.Text
	var Input=(function(_super){
		function Input(){
			this._focus=false;
			this._multiline=false;
			this._editable=true;
			this._restrictPattern=null;
			this._type="text";
			this._prompt='';
			this._promptColor="#A9A9A9";
			this._originColor="#000000";
			this._content='';
			Input.__super.call(this);
			this._maxChars=1E5;
			this._width=100;
			this._height=20;
			this.multiline=false;
			this.overflow=Text.SCROLL;
			this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._onMouseDown);
			this.on(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this._onUnDisplay);
		}

		__class(Input,'laya.display.Input',_super);
		var __proto=Input.prototype;
		/**
		*设置光标位置和选取字符。
		*@param startIndex 光标起始位置。
		*@param endIndex 光标结束位置。
		*/
		__proto.setSelection=function(startIndex,endIndex){
			laya.display.Input.inputElement.selectionStart=startIndex;
			laya.display.Input.inputElement.selectionEnd=endIndex;
		}

		/**@private */
		__proto._onUnDisplay=function(e){
			this.focus=false;
		}

		/**@private */
		__proto._onMouseDown=function(e){
			this.focus=true;
			Laya.stage.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._checkBlur);
		}

		/**@private */
		__proto._checkBlur=function(e){
			if (e.nativeEvent.target !=laya.display.Input.input && e.nativeEvent.target !=laya.display.Input.area && e.target !=this)
				this.focus=false;
		}

		/**@inheritDoc*/
		__proto.render=function(context,x,y){
			laya.display.Sprite.prototype.render.call(this,context,x,y);
		}

		/**
		*在输入期间，如果 Input 实例的位置改变，调用该方法同步输入框的位置。
		*/
		__proto._syncInputTransform=function(){
			var style=this.nativeInput.style;
			var stage=Laya.stage;
			var rec;
			rec=Utils.getGlobalPosAndScale(this);
			var m=stage._canvasTransform.clone();
			var tm=m.clone();
			tm.rotate(-Math.PI / 180 *Laya.stage.canvasDegree);
			tm.scale(Laya.stage.clientScaleX,Laya.stage.clientScaleY);
			var perpendicular=(Laya.stage.canvasDegree % 180 !=0);
			var sx=perpendicular ? tm.d :tm.a;
			var sy=perpendicular ? tm.a :tm.d;
			tm.destroy();
			var tx=this.padding[3];
			var ty=this.padding[0];
			if (Laya.stage.canvasDegree==0){
				tx+=rec.x;
				ty+=rec.y;
				tx *=sx;
				ty *=sy;
				tx+=m.tx;
				ty+=m.ty;
				}else if (Laya.stage.canvasDegree==90){
				tx+=rec.y;
				ty+=rec.x;
				tx *=sx;
				ty *=sy;
				tx=m.tx-tx;
				ty+=m.ty;
				}else{
				tx+=rec.y;
				ty+=rec.x;
				tx *=sx;
				ty *=sy;
				tx+=m.tx;
				ty=m.ty-ty;
			}
			sx *=(perpendicular ? rec.height :rec.width);
			sy *=(perpendicular ? rec.width :rec.height);
			m.tx=0;
			m.ty=0;
			Input.inputContainer.style.transform="scale("+sx+","+sy+") rotate("+Laya.stage.canvasDegree+"deg)";
			Input.inputContainer.setPos(tx,ty);
			m.destroy();
			var inputWid=this._width-this.padding[1]-this.padding[3];
			var inputHei=this._height-this.padding[0]-this.padding[2];
			this.nativeInput.setSize(inputWid,inputHei);
			if (!this._getVisible())this.focus=false;
			if (Render.isConchApp){
				this.nativeInput.setPos(tx,ty);
				this.nativeInput.setScale(sx,sy);
			}
		}

		/**@private */
		__proto._getVisible=function(){
			var target=this;
			while (target){
				if (target.visible===false)return false;
				target=target.parent;
			}
			return true;
		}

		/**选中所有文本。*/
		__proto.select=function(){
			this.nativeInput.select();
		}

		/**@private 设置输入法（textarea或input）*/
		__proto._setInputMethod=function(){
			Input.input.parentElement && (Input.inputContainer.removeChild(Input.input));
			Input.area.parentElement && (Input.inputContainer.removeChild(Input.area));
			Input.inputElement=(this._multiline ? Input.area :Input.input);
			Input.inputContainer.appendChild(Input.inputElement);
		}

		/**@private */
		__proto._focusIn=function(){
			laya.display.Input.isInputting=true;
			var input=this.nativeInput;
			this._focus=true;
			var cssStyle=input.style;
			cssStyle.whiteSpace=(this.wordWrap ? "pre-wrap" :"nowrap");
			this._setPromptColor();
			input.readOnly=!this._editable;
			input.maxLength=this._maxChars;
			var padding=this.padding;
			input.type=this._type;
			input.value=this._content;
			input.placeholder=this._prompt;
			Laya.stage.off(/*laya.events.Event.KEY_DOWN*/"keydown",this,this._onKeyDown);
			Laya.stage.on(/*laya.events.Event.KEY_DOWN*/"keydown",this,this._onKeyDown);
			Laya.stage.focus=this;
			this.event(/*laya.events.Event.FOCUS*/"focus");
			if (Browser.onPC)input.focus();
			var temp=this._text;
			this._text=null;
			this.typeset();
			input.setColor(this._originColor);
			input.setFontSize(this.fontSize);
			input.setFontFace(this.font);
			if (Render.isConchApp){
				input.setMultiAble && input.setMultiAble(this._multiline);
			}
			cssStyle.lineHeight=(this.leading+this.fontSize)+"px";
			cssStyle.fontStyle=(this.italic ? "italic" :"normal");
			cssStyle.fontWeight=(this.bold ? "bold" :"normal");
			cssStyle.textAlign=this.align;
			cssStyle.padding="0 0";
			this._syncInputTransform();
			if (!Render.isConchApp && Browser.onPC)
				Laya.timer.frameLoop(1,this,this._syncInputTransform);
		}

		// 设置DOM输入框提示符颜色。
		__proto._setPromptColor=function(){
			Input.promptStyleDOM=Browser.getElementById("promptStyle");
			if (!Input.promptStyleDOM){
				Input.promptStyleDOM=Browser.createElement("style");
				Browser.document.head.appendChild(Input.promptStyleDOM);
			}
			Input.promptStyleDOM.innerText="input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {"+"color:"+this._promptColor+"}"+"input:-moz-placeholder, textarea:-moz-placeholder {"+"color:"+this._promptColor+"}"+"input::-moz-placeholder, textarea::-moz-placeholder {"+"color:"+this._promptColor+"}"+"input:-ms-input-placeholder, textarea:-ms-input-placeholder {"+"color:"+this._promptColor+"}";
		}

		/**@private */
		__proto._focusOut=function(){
			laya.display.Input.isInputting=false;
			this._focus=false;
			this._text=null;
			this._content=this.nativeInput.value;
			if (!this._content){
				_super.prototype._$set_text.call(this,this._prompt);
				_super.prototype._$set_color.call(this,this._promptColor);
				}else {
				_super.prototype._$set_text.call(this,this._content);
				_super.prototype._$set_color.call(this,this._originColor);
			}
			Laya.stage.off(/*laya.events.Event.KEY_DOWN*/"keydown",this,this._onKeyDown);
			Laya.stage.focus=null;
			this.event(/*laya.events.Event.BLUR*/"blur");
			if (Render.isConchApp)this.nativeInput.blur();
			Browser.onPC && Laya.timer.clear(this,this._syncInputTransform);
			Laya.stage.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._checkBlur);
		}

		/**@private */
		__proto._onKeyDown=function(e){
			if (e.keyCode===13){
				if (Browser.onMobile && !this._multiline)
					this.focus=false;
				this.event(/*laya.events.Event.ENTER*/"enter");
			}
		}

		__proto.changeText=function(text){
			this._content=text;
			if (this._focus){
				this.nativeInput.value=text || '';
				this.event(/*laya.events.Event.CHANGE*/"change");
			}else
			_super.prototype.changeText.call(this,text);
		}

		/**@inheritDoc */
		__getset(0,__proto,'color',_super.prototype._$get_color,function(value){
			if (this._focus)
				this.nativeInput.setColor(value);
			_super.prototype._$set_color.call(this,this._content?value:this._promptColor);
			this._originColor=value;
		});

		//[Deprecated]
		__getset(0,__proto,'inputElementYAdjuster',function(){
			console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementYAdjuster已弃用。");
			return 0;
			},function(value){
			console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementYAdjuster已弃用。");
		});

		/**表示是否是多行输入框。*/
		__getset(0,__proto,'multiline',function(){
			return this._multiline;
			},function(value){
			this._multiline=value;
			this.valign=value ? "top" :"middle";
		});

		/**
		*字符数量限制，默认为10000。
		*设置字符数量限制时，小于等于0的值将会限制字符数量为10000。
		*/
		__getset(0,__proto,'maxChars',function(){
			return this._maxChars;
			},function(value){
			if (value <=0)
				value=1E5;
			this._maxChars=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'text',function(){
			if (this._focus)
				return this.nativeInput.value;
			else
			return this._content || "";
			},function(value){
			_super.prototype._$set_color.call(this,this._originColor);
			value+='';
			if (this._focus){
				this.nativeInput.value=value || '';
				this.event(/*laya.events.Event.CHANGE*/"change");
				}else {
				if (!this._multiline)
					value=value.replace(/\r?\n/g,'');
				this._content=value;
				if (value)
					_super.prototype._$set_text.call(this,value);
				else {
					_super.prototype._$set_text.call(this,this._prompt);
					_super.prototype._$set_color.call(this,this.promptColor);
				}
			}
		});

		/**
		*获取对输入框的引用实例。
		*/
		__getset(0,__proto,'nativeInput',function(){
			return this._multiline ? Input.area :Input.input;
		});

		/**
		*设置输入提示符。
		*/
		__getset(0,__proto,'prompt',function(){
			return this._prompt;
			},function(value){
			if (!this._text && value)
				_super.prototype._$set_color.call(this,this._promptColor);
			this.promptColor=this._promptColor;
			if (this._text)
				_super.prototype._$set_text.call(this,(this._text==this._prompt)?value:this._text);
			else
			_super.prototype._$set_text.call(this,value);
			this._prompt=value;
		});

		// 因此 调用focus接口是无法都在移动平台立刻弹出键盘的
		/**
		*表示焦点是否在显示对象上。
		*/
		__getset(0,__proto,'focus',function(){
			return this._focus;
			},function(value){
			var input=this.nativeInput;
			if (this._focus!==value){
				if (value){
					input.target && (input.target.focus=false);
					input.target=this;
					this._setInputMethod();
					this._focusIn();
					}else {
					input.target=null;
					this._focusOut();
					if (Render.isConchApp){
						input.setPos(-10000,-10000);
					}else if (Input.inputContainer.contains(input))
					Input.inputContainer.removeChild(input);
				}
			}
		});

		/**限制输入的字符。*/
		__getset(0,__proto,'restrict',function(){
			if (this._restrictPattern){
				return this._restrictPattern.source;
			}
			return "";
			},function(pattern){
			if (pattern){
				pattern="[^"+pattern+"]";
				if (pattern.indexOf("^^")>-1)
					pattern=pattern.replace("^^","");
				this._restrictPattern=new RegExp(pattern,"g");
			}else
			this._restrictPattern=null;
		});

		/**
		*是否可编辑。
		*/
		__getset(0,__proto,'editable',function(){
			return this._editable;
			},function(value){
			this._editable=value;
		});

		/**
		*设置输入提示符颜色。
		*/
		__getset(0,__proto,'promptColor',function(){
			return this._promptColor;
			},function(value){
			this._promptColor=value;
			if (!this._content)_super.prototype._$set_color.call(this,value);
		});

		/**
		*输入框类型为Input静态常量之一。
		*平台兼容性参见http://www.w3school.com.cn/html5/html_5_form_input_types.asp。
		*/
		__getset(0,__proto,'type',function(){
			return this._type;
			},function(value){
			if (value=="password")
				this._getCSSStyle().password=true;
			else
			this._getCSSStyle().password=false;
			this._type=value;
		});

		//[Deprecated]
		__getset(0,__proto,'inputElementXAdjuster',function(){
			console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementXAdjuster已弃用。");
			return 0;
			},function(value){
			console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementXAdjuster已弃用。");
		});

		//[Deprecated(replacement="Input.type")]
		__getset(0,__proto,'asPassword',function(){
			return this._getCSSStyle().password;
			},function(value){
			this._getCSSStyle().password=value;
			this._type=/*CLASS CONST:laya.display.Input.TYPE_PASSWORD*/"password";
			console.warn("deprecated: 使用type=\"password\"替代设置asPassword, asPassword将在下次重大更新时删去");
			this.isChanged=true;
		});

		Input.__init__=function(){
			Input._createInputElement();
			if (Browser.onMobile)
				Render.canvas.addEventListener(Input.IOS_IFRAME ? "click" :"touchend",Input._popupInputMethod);
		}

		Input._popupInputMethod=function(e){
			if (!laya.display.Input.isInputting)return;
			var input=laya.display.Input.inputElement;
			input.focus();
		}

		Input._createInputElement=function(){
			Input._initInput(Input.area=Browser.createElement("textarea"));
			Input._initInput(Input.input=Browser.createElement("input"));
			Input.inputContainer=Browser.createElement("div");
			Input.inputContainer.style.position="absolute";
			Input.inputContainer.style.zIndex=1E5;
			Browser.container.appendChild(Input.inputContainer);
			Input.inputContainer.setPos=function (x,y){Input.inputContainer.style.left=x+'px';Input.inputContainer.style.top=y+'px';};
		}

		Input._initInput=function(input){
			var style=input.style;
			style.cssText="position:absolute;overflow:hidden;resize:none;transform-origin:0 0;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;";
			style.resize='none';
			style.backgroundColor='transparent';
			style.border='none';
			style.outline='none';
			input.addEventListener('input',Input._processInputting);
			input.addEventListener('mousemove',Input._stopEvent);
			input.addEventListener('mousedown',Input._stopEvent);
			input.addEventListener('touchmove',Input._stopEvent);
			if(!Render.isConchApp){
				input.setColor=function (color){input.style.color=color;};
				input.setFontSize=function (fontSize){input.style.fontSize=fontSize+'px';};
				input.setSize=function (w,h){input.style.width=w+'px';input.style.height=h+'px';};
			}
			input.setFontFace=function (fontFace){input.style.fontFamily=fontFace;};
		}

		Input._processInputting=function(e){
			var input=laya.display.Input.inputElement.target;
			var value=laya.display.Input.inputElement.value;
			if (input._restrictPattern){
				value=value.replace(/\u2006|\x27/g,"");
				if (input._restrictPattern.test(value)){
					value=value.replace(input._restrictPattern,"");
					laya.display.Input.inputElement.value=value;
				}
			}
			input._text=value;
			input.event(/*laya.events.Event.INPUT*/"input");
		}

		Input._stopEvent=function(e){
			if (e.type=='touchmove')
				e.preventDefault();
			e.stopPropagation && e.stopPropagation();
		}

		Input.TYPE_TEXT="text";
		Input.TYPE_PASSWORD="password";
		Input.TYPE_EMAIL="email";
		Input.TYPE_URL="url";
		Input.TYPE_NUMBER="number";
		Input.TYPE_RANGE="range";
		Input.TYPE_DATE="date";
		Input.TYPE_MONTH="month";
		Input.TYPE_WEEK="week";
		Input.TYPE_TIME="time";
		Input.TYPE_DATE_TIME="datetime";
		Input.TYPE_DATE_TIME_LOCAL="datetime-local";
		Input.TYPE_SEARCH="search";
		Input.input=null
		Input.area=null
		Input.inputElement=null
		Input.inputContainer=null
		Input.confirmButton=null
		Input.promptStyleDOM=null
		Input.inputHeight=45;
		Input.isInputting=false;
		__static(Input,
		['IOS_IFRAME',function(){return this.IOS_IFRAME=(Browser.onIOS && Browser.window.top !=Browser.window.self);}
		]);
		return Input;
	})(Text)


	/**
	*<code>Button</code> 组件用来表示常用的多态按钮。 <code>Button</code> 组件可显示文本标签、图标或同时显示两者。 *
	*<p>可以是单态，两态和三态，默认三态(up,over,down)。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Button</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Button;
		*import laya.utils.Handler;
		*public class Button_Example
		*{
			*public function Button_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/button.png",Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var button:Button=new Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,并传入它的皮肤。
				*button.x=100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
				*button.y=100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
				*button.clickHandler=new Handler(this,onClickButton,[button]);//设置 button 的点击事件处理器。
				*Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
				*}
			*private function onClickButton(button:Button):void
			*{
				*trace("按钮button被点击了！");
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
	*Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete()
	*{
		*console.log("资源加载完成！");
		*var button=new laya.ui.Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,传入它的皮肤skin和标签label。
		*button.x=100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
		*button.y=100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
		*button.clickHandler=laya.utils.Handler.create(this,onClickButton,[button],false);//设置 button 的点击事件处理函数。
		*Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
		*}
	*function onClickButton(button)
	*{
		*console.log("按钮被点击了。",button);
		*}
	*</listing>
	*<listing version="3.0">
	*import Button=laya.ui.Button;
	*import Handler=laya.utils.Handler;
	*class Button_Example{
		*constructor()
		*{
			*Laya.init(640,800);
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete()
		*{
			*var button:Button=new Button("resource/ui/button.png","label");//创建一个 Button 类的实例对象 button ,并传入它的皮肤。
			*button.x=100;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
			*button.y=100;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
			*button.clickHandler=new Handler(this,this.onClickButton,[button]);//设置 button 的点击事件处理器。
			*Laya.stage.addChild(button);//将此 button 对象添加到显示列表。
			*}
		*private onClickButton(button:Button):void
		*{
			*console.log("按钮button被点击了！")
			*}
		*}
	*</listing>
	*/
	//class laya.ui.Button extends laya.ui.Component
	var Button=(function(_super){
		function Button(skin,label){
			this.toggle=false;
			this._bitmap=null;
			this._text=null;
			this._strokeColors=null;
			this._state=0;
			this._selected=false;
			this._skin=null;
			this._autoSize=true;
			this._sources=null;
			this._clickHandler=null;
			this._stateChanged=false;
			Button.__super.call(this);
			this._labelColors=Styles.buttonLabelColors;
			this._stateNum=Styles.buttonStateNum;
			(label===void 0)&& (label="");
			this.skin=skin;
			this.label=label;
		}

		__class(Button,'laya.ui.Button',_super);
		var __proto=Button.prototype;
		Laya.imps(__proto,{"laya.ui.ISelect":true})
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bitmap && this._bitmap.destroy();
			this._text && this._text.destroy(destroyChild);
			this._bitmap=null;
			this._text=null;
			this._clickHandler=null;
			this._labelColors=this._sources=this._strokeColors=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.graphics=this._bitmap=new AutoBitmap();
		}

		/**@private */
		__proto.createText=function(){
			if (!this._text){
				this._text=new Text();
				this._text.overflow=Text.HIDDEN;
				this._text.align="center";
				this._text.valign="middle";
			}
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			this.on(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onMouse);
			this.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onMouse);
			this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouse);
			this.on(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onMouse);
			this.on(/*laya.events.Event.CLICK*/"click",this,this.onMouse);
		}

		/**
		*对象的 <code>Event.MOUSE_OVER、Event.MOUSE_OUT、Event.MOUSE_DOWN、Event.MOUSE_UP、Event.CLICK</code> 事件侦听处理函数。
		*@param e Event 对象。
		*/
		__proto.onMouse=function(e){
			if (this.toggle===false && this._selected)return;
			if (e.type===/*laya.events.Event.CLICK*/"click"){
				this.toggle && (this.selected=!this._selected);
				this._clickHandler && this._clickHandler.run();
				return;
			}
			!this._selected && (this.state=Button.stateMap[e.type]);
		}

		/**
		*@private
		*对象的资源切片发生改变。
		*/
		__proto.changeClips=function(){
			var img=Loader.getRes(this._skin);
			if (!img){
				console.log("lose skin",this._skin);
				return;
			};
			var width=img.sourceWidth;
			var height=img.sourceHeight / this._stateNum;
			var key=this._skin+this._stateNum;
			var clips=AutoBitmap.getCache(key);
			if (clips)this._sources=clips;
			else {
				this._sources=[];
				if (this._stateNum===1){
					this._sources.push(img);
					}else {
					for (var i=0;i < this._stateNum;i++){
						this._sources.push(Texture.createFromTexture(img,0,height *i,width,height));
					}
				}
				AutoBitmap.setCache(key,this._sources);
			}
			if (this._autoSize){
				this._bitmap.width=this._width || width;
				this._bitmap.height=this._height || height;
				if (this._text){
					this._text.width=this._bitmap.width;
					this._text.height=this._bitmap.height;
				}
				}else {
				this._text && (this._text.x=width);
			}
		}

		/**
		*@private
		*改变对象的状态。
		*/
		__proto.changeState=function(){
			this._stateChanged=false;
			this.runCallLater(this.changeClips);
			var index=this._state < this._stateNum ? this._state :this._stateNum-1;
			this._sources && (this._bitmap.source=this._sources[index]);
			if (this.label){
				this._text.color=this._labelColors[index];
				if (this._strokeColors)this._text.strokeColor=this._strokeColors[index];
			}
		}

		/**@private */
		__proto._setStateChanged=function(){
			if (!this._stateChanged){
				this._stateChanged=true;
				this.callLater(this.changeState);
			}
		}

		/**
		*<p>描边颜色，以字符串表示。</p>
		*默认值为 "#000000"（黑色）;
		*@see laya.display.Text.strokeColor()
		*/
		__getset(0,__proto,'labelStrokeColor',function(){
			this.createText();
			return this._text.strokeColor;
			},function(value){
			this.createText();
			this._text.strokeColor=value
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'measureHeight',function(){
			this.runCallLater(this.changeClips);
			return this._text ? Math.max(this._bitmap.height,this._text.height):this._bitmap.height;
		});

		/**
		*<p>对象的皮肤资源地址。</p>
		*支持单态，两态和三态，用 <code>stateNum</code> 属性设置
		*<p>对象的皮肤地址，以字符串表示。</p>
		*@see #stateNum
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this.callLater(this.changeClips);
				this._setStateChanged();
			}
		});

		/**
		*对象的状态值。
		*@see #stateMap
		*/
		__getset(0,__proto,'state',function(){
			return this._state;
			},function(value){
			if (this._state !=value){
				this._state=value;
				this._setStateChanged();
			}
		});

		/**
		*按钮文本标签 <code>Text</code> 控件。
		*/
		__getset(0,__proto,'text',function(){
			this.createText();
			return this._text;
		});

		/**
		*<p>指定对象的状态值，以数字表示。</p>
		*<p>默认值为3。此值决定皮肤资源图片的切割方式。</p>
		*<p><b>取值：</b>
		*<li>1：单态。图片不做切割，按钮的皮肤状态只有一种。</li>
		*<li>2：两态。图片将以竖直方向被等比切割为2部分，从上向下，依次为
		*弹起状态皮肤、
		*按下和经过及选中状态皮肤。</li>
		*<li>3：三态。图片将以竖直方向被等比切割为2部分，从上向下，依次为
		*弹起状态皮肤、
		*经过状态皮肤、
		*按下和选中状态皮肤</li>
		*</p>
		*/
		__getset(0,__proto,'stateNum',function(){
			return this._stateNum;
			},function(value){
			if (this._stateNum !=value){
				this._stateNum=value < 1 ? 1 :value > 3 ? 3 :value;
				this.callLater(this.changeClips);
			}
		});

		/**
		*表示按钮各个状态下的描边颜色。
		*<p><b>格式:</b> "upColor,overColor,downColor,disableColor"。</p>
		*/
		__getset(0,__proto,'strokeColors',function(){
			return this._strokeColors ? this._strokeColors.join(","):"";
			},function(value){
			this._strokeColors=UIUtils.fillArray(Styles.buttonLabelColors,value,String);
			this._setStateChanged();
		});

		/**
		*表示按钮各个状态下的文本颜色。
		*<p><b>格式:</b> "upColor,overColor,downColor,disableColor"。</p>
		*/
		__getset(0,__proto,'labelColors',function(){
			return this._labelColors.join(",");
			},function(value){
			this._labelColors=UIUtils.fillArray(Styles.buttonLabelColors,value,String);
			this._setStateChanged();
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'measureWidth',function(){
			this.runCallLater(this.changeClips);
			if (this._autoSize)return this._bitmap.width;
			this.runCallLater(this.changeState);
			return this._bitmap.width+(this._text ? this._text.width :0);
		});

		/**
		*按钮的文本内容。
		*/
		__getset(0,__proto,'label',function(){
			return this._text ? this._text.text :null;
			},function(value){
			if (!this._text && !value)return;
			this.createText();
			if (this._text.text !=value){
				value && !this._text.displayedInStage && this.addChild(this._text);
				this._text.text=(value+"").replace(/\\n/g,"\n");
				this._setStateChanged();
			}
		});

		/**
		*表示按钮的选中状态。
		*<p>如果值为true，表示该对象处于选中状态。否则该对象处于未选中状态。</p>
		*/
		__getset(0,__proto,'selected',function(){
			return this._selected;
			},function(value){
			if (this._selected !=value){
				this._selected=value;
				this.state=this._selected ? 2 :0;
				this.event(/*laya.events.Event.CHANGE*/"change");
			}
		});

		/**
		*表示按钮文本标签的边距。
		*<p><b>格式：</b>"上边距,右边距,下边距,左边距"。</p>
		*/
		__getset(0,__proto,'labelPadding',function(){
			this.createText();
			return this._text.padding.join(",");
			},function(value){
			this.createText();
			this._text.padding=UIUtils.fillArray(Styles.labelPadding,value,Number);
		});

		/**
		*表示按钮文本标签的字体大小。
		*@see laya.display.Text.fontSize()
		*/
		__getset(0,__proto,'labelSize',function(){
			this.createText();
			return this._text.fontSize;
			},function(value){
			this.createText();
			this._text.fontSize=value
		});

		/**
		*<p>描边宽度（以像素为单位）。</p>
		*默认值0，表示不描边。
		*@see laya.display.Text.stroke()
		*/
		__getset(0,__proto,'labelStroke',function(){
			this.createText();
			return this._text.stroke;
			},function(value){
			this.createText();
			this._text.stroke=value
		});

		/**
		*表示按钮文本标签是否为粗体字。
		*@see laya.display.Text.bold()
		*/
		__getset(0,__proto,'labelBold',function(){
			this.createText();
			return this._text.bold;
			},function(value){
			this.createText();
			this._text.bold=value;
		});

		/**
		*表示按钮文本标签的字体名称，以字符串形式表示。
		*@see laya.display.Text.font()
		*/
		__getset(0,__proto,'labelFont',function(){
			this.createText();
			return this._text.font;
			},function(value){
			this.createText();
			this._text.font=value;
		});

		/**标签对齐模式，默认为居中对齐。*/
		__getset(0,__proto,'labelAlign',function(){
			this.createText()
			return this._text.align;
			},function(value){
			this.createText()
			this._text.align=value;
		});

		/**
		*对象的点击事件处理器函数（无默认参数）。
		*/
		__getset(0,__proto,'clickHandler',function(){
			return this._clickHandler;
			},function(value){
			this._clickHandler=value;
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		__getset(0,__proto,'sizeGrid',function(){
			if (this._bitmap.sizeGrid)return this._bitmap.sizeGrid.join(",");
			return null;
			},function(value){
			this._bitmap.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		/**@inheritDoc */
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			if (this._autoSize){
				this._bitmap.width=value;
				this._text && (this._text.width=value);
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			if (this._autoSize){
				this._bitmap.height=value;
				this._text && (this._text.height=value);
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.label=value+"";
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**图标x,y偏移，格式：100,100*/
		__getset(0,__proto,'iconOffset',function(){
			return this._bitmap._offset ? null :this._bitmap._offset.join(",");
			},function(value){
			if (value)this._bitmap._offset=UIUtils.fillArray([1,1],value,Number);
			else this._bitmap._offset=[];
		});

		__static(Button,
		['stateMap',function(){return this.stateMap={"mouseup":0,"mouseover":1,"mousedown":2,"mouseout":0};}
		]);
		return Button;
	})(Component)


	/**
	*<p> <code>Clip</code> 类是位图切片动画。</p>
	*<p> <code>Clip</code> 可将一张图片，按横向分割数量 <code>clipX</code> 、竖向分割数量 <code>clipY</code> ，
	*或横向分割每个切片的宽度 <code>clipWidth</code> 、竖向分割每个切片的高度 <code>clipHeight</code> ，
	*从左向右，从上到下，分割组合为一个切片动画。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Clip</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Clip;
		*public class Clip_Example
		*{
			*private var clip:Clip;
			*public function Clip_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*private function onInit():void
			*{
				*clip=new Clip("resource/ui/clip_num.png",10,1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
				*clip.autoPlay=true;//设置 clip 动画自动播放。
				*clip.interval=100;//设置 clip 动画的播放时间间隔。
				*clip.x=100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
				*clip.y=100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
				*clip.on(Event.CLICK,this,onClick);//给 clip 添加点击事件函数侦听。
				*Laya.stage.addChild(clip);//将此 clip 对象添加到显示列表。
				*}
			*private function onClick():void
			*{
				*trace("clip 的点击事件侦听处理函数。clip.total="+clip.total);
				*if (clip.isPlaying==true)
				*{
					*clip.stop();//停止动画。
					*}else {
					*clip.play();//播放动画。
					*}
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var clip;
	*Laya.loader.load("resource/ui/clip_num.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete(){
		*console.log("资源加载完成！");
		*clip=new laya.ui.Clip("resource/ui/clip_num.png",10,1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
		*clip.autoPlay=true;//设置 clip 动画自动播放。
		*clip.interval=100;//设置 clip 动画的播放时间间隔。
		*clip.x=100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
		*clip.y=100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
		*clip.on(Event.CLICK,this,onClick);//给 clip 添加点击事件函数侦听。
		*Laya.stage.addChild(clip);//将此 clip 对象添加到显示列表。
		*}
	*function onClick()
	*{
		*console.log("clip 的点击事件侦听处理函数。");
		*if(clip.isPlaying==true)
		*{
			*clip.stop();
			*}else {
			*clip.play();
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*import Clip=laya.ui.Clip;
	*import Handler=laya.utils.Handler;
	*class Clip_Example {
		*private clip:Clip;
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*this.onInit();
			*}
		*private onInit():void {
			*this.clip=new Clip("resource/ui/clip_num.png",10,1);//创建一个 Clip 类的实例对象 clip ,传入它的皮肤skin和横向分割数量、竖向分割数量。
			*this.clip.autoPlay=true;//设置 clip 动画自动播放。
			*this.clip.interval=100;//设置 clip 动画的播放时间间隔。
			*this.clip.x=100;//设置 clip 对象的属性 x 的值，用于控制 clip 对象的显示位置。
			*this.clip.y=100;//设置 clip 对象的属性 y 的值，用于控制 clip 对象的显示位置。
			*this.clip.on(laya.events.Event.CLICK,this,this.onClick);//给 clip 添加点击事件函数侦听。
			*Laya.stage.addChild(this.clip);//将此 clip 对象添加到显示列表。
			*}
		*private onClick():void {
			*console.log("clip 的点击事件侦听处理函数。clip.total="+this.clip.total);
			*if (this.clip.isPlaying==true){
				*this.clip.stop();//停止动画。
				*}else {
				*this.clip.play();//播放动画。
				*}
			*}
		*}
	*
	*</listing>
	*/
	//class laya.ui.Clip extends laya.ui.Component
	var Clip=(function(_super){
		function Clip(url,clipX,clipY){
			this._sources=null;
			this._bitmap=null;
			this._skin=null;
			this._clipX=1;
			this._clipY=1;
			this._clipWidth=0;
			this._clipHeight=0;
			this._autoPlay=false;
			this._interval=50;
			this._complete=null;
			this._isPlaying=false;
			this._index=0;
			this._clipChanged=false;
			Clip.__super.call(this);
			(clipX===void 0)&& (clipX=1);
			(clipY===void 0)&& (clipY=1);
			this._clipX=clipX;
			this._clipY=clipY;
			this.skin=url;
		}

		__class(Clip,'laya.ui.Clip',_super);
		var __proto=Clip.prototype;
		/**@inheritDoc */
		__proto.destroy=function(clearFromCache){
			(clearFromCache===void 0)&& (clearFromCache=false);
			_super.prototype.destroy.call(this,true);
			this._bitmap && this._bitmap.destroy();
			this._bitmap=null;
			this._sources=null;
		}

		/**
		*销毁对象并释放加载的皮肤资源。
		*/
		__proto.dispose=function(){
			this.destroy(true);
			Laya.loader.clearRes(this._skin);
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.graphics=this._bitmap=new AutoBitmap();
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			this.on(/*laya.events.Event.DISPLAY*/"display",this,this._onDisplay);
			this.on(/*laya.events.Event.UNDISPLAY*/"undisplay",this,this._onDisplay);
		}

		/**@private */
		__proto._onDisplay=function(e){
			if (this._isPlaying){
				if (this._displayedInStage)this.play();
				else this.stop();
				}else if (this._autoPlay && this._displayedInStage){
				this.play();
			}
		}

		/**
		*@private
		*改变切片的资源、切片的大小。
		*/
		__proto.changeClip=function(){
			this._clipChanged=false;
			if (!this._skin)return;
			var img=Loader.getRes(this._skin);
			if (img){
				this.loadComplete(this._skin,img);
				}else {
				Laya.loader.load(this._skin,Handler.create(this,this.loadComplete,[this._skin]));
			}
		}

		/**
		*@private
		*加载切片图片资源完成函数。
		*@param url 资源地址。
		*@param img 纹理。
		*/
		__proto.loadComplete=function(url,img){
			if (url===this._skin && img){
				this._clipWidth || (this._clipWidth=Math.ceil(img.sourceWidth / this._clipX));
				this._clipHeight || (this._clipHeight=Math.ceil(img.sourceHeight / this._clipY));
				var key=this._skin+this._clipWidth+this._clipHeight;
				var clips=AutoBitmap.getCache(key);
				if (clips)this._sources=clips;
				else {
					this._sources=[];
					for (var i=0;i < this._clipY;i++){
						for (var j=0;j < this._clipX;j++){
							this._sources.push(Texture.createFromTexture(img,this._clipWidth *j,this._clipHeight *i,this._clipWidth,this._clipHeight));
						}
					}
					AutoBitmap.setCache(key,this._sources);
				}
				this.index=this._index;
				this.event(/*laya.events.Event.LOADED*/"loaded");
				this.onCompResize();
			}
		}

		/**
		*播放动画。
		*/
		__proto.play=function(){
			this._isPlaying=true;
			this.index=0;
			this._index++;
			Laya.timer.loop(this.interval,this,this._loop);
		}

		/**
		*@private
		*/
		__proto._loop=function(){
			if (this._style.visible && this._sources){
				this.index=this._index,this._index++;
				this._index >=this._sources.length && (this._index=0);
			}
		}

		/**
		*停止动画。
		*/
		__proto.stop=function(){
			this._isPlaying=false;
			Laya.timer.clear(this,this._loop);
		}

		/**@private */
		__proto._setClipChanged=function(){
			if (!this._clipChanged){
				this._clipChanged=true;
				this.callLater(this.changeClip);
			}
		}

		/**
		*表示动画播放间隔时间(以毫秒为单位)。
		*/
		__getset(0,__proto,'interval',function(){
			return this._interval;
			},function(value){
			if (this._interval !=value){
				this._interval=value;
				if (this._isPlaying)this.play();
			}
		});

		/**
		*@copy laya.ui.Image#skin
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				if (value){
					this._setClipChanged()
					}else {
					this._bitmap.source=null;
				}
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureWidth',function(){
			this.runCallLater(this.changeClip);
			return this._bitmap.width;
		});

		/**
		*源数据。
		*/
		__getset(0,__proto,'sources',function(){
			return this._sources;
			},function(value){
			this._sources=value;
			this.index=this._index;
			this.event(/*laya.events.Event.LOADED*/"loaded");
		});

		/**X轴（横向）切片数量。*/
		__getset(0,__proto,'clipX',function(){
			return this._clipX;
			},function(value){
			this._clipX=value;
			this._setClipChanged()
		});

		/**Y轴(竖向)切片数量。*/
		__getset(0,__proto,'clipY',function(){
			return this._clipY;
			},function(value){
			this._clipY=value;
			this._setClipChanged()
		});

		/**
		*切片动画的总帧数。
		*/
		__getset(0,__proto,'total',function(){
			this.runCallLater(this.changeClip);
			return this._sources ? this._sources.length :0;
		});

		/**
		*横向分割时每个切片的宽度，与 <code>clipX</code> 同时设置时优先级高于 <code>clipX</code> 。
		*/
		__getset(0,__proto,'clipWidth',function(){
			return this._clipWidth;
			},function(value){
			this._clipWidth=value;
			this._setClipChanged()
		});

		/**
		*竖向分割时每个切片的高度，与 <code>clipY</code> 同时设置时优先级高于 <code>clipY</code> 。
		*/
		__getset(0,__proto,'clipHeight',function(){
			return this._clipHeight;
			},function(value){
			this._clipHeight=value;
			this._setClipChanged()
		});

		/**@inheritDoc */
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bitmap.width=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bitmap.height=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureHeight',function(){
			this.runCallLater(this.changeClip);
			return this._bitmap.height;
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		__getset(0,__proto,'sizeGrid',function(){
			if (this._bitmap.sizeGrid)return this._bitmap.sizeGrid.join(",");
			return null;
			},function(value){
			this._bitmap.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		/**
		*当前帧索引。
		*/
		__getset(0,__proto,'index',function(){
			return this._index;
			},function(value){
			this._index=value;
			this._bitmap && this._sources && (this._bitmap.source=this._sources[value]);
			this.event(/*laya.events.Event.CHANGE*/"change");
		});

		/**
		*表示是否自动播放动画，若自动播放值为true,否则值为false;
		*<p>可控制切片动画的播放、停止。</p>
		*/
		__getset(0,__proto,'autoPlay',function(){
			return this._autoPlay;
			},function(value){
			if (this._autoPlay !=value){
				this._autoPlay=value;
				value ? this.play():this.stop();
			}
		});

		/**
		*表示动画的当前播放状态。
		*如果动画正在播放中，则为true，否则为flash。
		*/
		__getset(0,__proto,'isPlaying',function(){
			return this._isPlaying;
			},function(value){
			this._isPlaying=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.index=parseInt(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*<code>AutoBitmap</code> 位图实例。
		*/
		__getset(0,__proto,'bitmap',function(){
			return this._bitmap;
		});

		return Clip;
	})(Component)


	/**
	*<code>ColorPicker</code> 组件将显示包含多个颜色样本的列表，用户可以从中选择颜色。
	*
	*@example 以下示例代码，创建了一个 <code>ColorPicker</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.ColorPicker;
		*import laya.utils.Handler;
		*public class ColorPicker_Example
		*{
			*public function ColorPicker_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/color.png",Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var colorPicket:ColorPicker=new ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
				*colorPicket.skin="resource/ui/color.png";//设置 colorPicket 的皮肤。
				*colorPicket.x=100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
				*colorPicket.y=100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
				*colorPicket.changeHandler=new Handler(this,onChangeColor,[colorPicket]);//设置 colorPicket 的颜色改变回调函数。
				*Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
				*}
			*private function onChangeColor(colorPicket:ColorPicker):void
			*{
				*trace("当前选择的颜色： "+colorPicket.selectedColor);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load("resource/ui/color.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete()
	*{
		*console.log("资源加载完成！");
		*var colorPicket=new laya.ui.ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
		*colorPicket.skin="resource/ui/color.png";//设置 colorPicket 的皮肤。
		*colorPicket.x=100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
		*colorPicket.y=100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
		*colorPicket.changeHandler=laya.utils.Handler.create(this,onChangeColor,[colorPicket],false);//设置 colorPicket 的颜色改变回调函数。
		*Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
		*}
	*function onChangeColor(colorPicket)
	*{
		*console.log("当前选择的颜色： "+colorPicket.selectedColor);
		*}
	*</listing>
	*<listing version="3.0">
	*import ColorPicker=laya.ui.ColorPicker;
	*import Handler=laya.utils.Handler;
	*class ColorPicker_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load("resource/ui/color.png",Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*console.log("资源加载完成！");
			*var colorPicket:ColorPicker=new ColorPicker();//创建一个 ColorPicker 类的实例对象 colorPicket 。
			*colorPicket.skin="resource/ui/color.png";//设置 colorPicket 的皮肤。
			*colorPicket.x=100;//设置 colorPicket 对象的属性 x 的值，用于控制 colorPicket 对象的显示位置。
			*colorPicket.y=100;//设置 colorPicket 对象的属性 y 的值，用于控制 colorPicket 对象的显示位置。
			*colorPicket.changeHandler=new Handler(this,this.onChangeColor,[colorPicket]);//设置 colorPicket 的颜色改变回调函数。
			*Laya.stage.addChild(colorPicket);//将此 colorPicket 对象添加到显示列表。
			*}
		*private onChangeColor(colorPicket:ColorPicker):void {
			*console.log("当前选择的颜色： "+colorPicket.selectedColor);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.ColorPicker extends laya.ui.Component
	var ColorPicker=(function(_super){
		function ColorPicker(){
			this.changeHandler=null;
			this._gridSize=11;
			this._bgColor="#ffffff";
			this._borderColor="#000000";
			this._inputColor="#000000";
			this._inputBgColor="#efefef";
			this._colorPanel=null;
			this._colorTiles=null;
			this._colorBlock=null;
			this._colorInput=null;
			this._colorButton=null;
			this._colors=[];
			this._selectedColor="#000000";
			this._panelChanged=false;
			ColorPicker.__super.call(this);
		}

		__class(ColorPicker,'laya.ui.ColorPicker',_super);
		var __proto=ColorPicker.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._colorPanel && this._colorPanel.destroy(destroyChild);
			this._colorButton && this._colorButton.destroy(destroyChild);
			this._colorPanel=null;
			this._colorTiles=null;
			this._colorBlock=null;
			this._colorInput=null;
			this._colorButton=null;
			this._colors=null;
			this.changeHandler=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._colorButton=new Button());
			this._colorPanel=new Box();
			this._colorPanel.size(230,166);
			this._colorPanel.addChild(this._colorTiles=new Sprite());
			this._colorPanel.addChild(this._colorBlock=new Sprite());
			this._colorPanel.addChild(this._colorInput=new Input());
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			this._colorButton.on(/*laya.events.Event.CLICK*/"click",this,this.onColorButtonClick);
			this._colorBlock.pos(5,5);
			this._colorInput.pos(60,5);
			this._colorInput.size(60,20);
			this._colorInput.on(/*laya.events.Event.CHANGE*/"change",this,this.onColorInputChange);
			this._colorInput.on(/*laya.events.Event.KEY_DOWN*/"keydown",this,this.onColorFieldKeyDown);
			this._colorTiles.pos(5,30);
			this._colorTiles.on(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this.onColorTilesMouseMove);
			this._colorTiles.on(/*laya.events.Event.CLICK*/"click",this,this.onColorTilesClick);
			this._colorTiles.size(20 *this._gridSize,12 *this._gridSize);
			this._colorPanel.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onPanelMouseDown);
			this.bgColor=this._bgColor;
		}

		__proto.onPanelMouseDown=function(e){
			e.stopPropagation();
		}

		/**
		*改变颜色样本列表面板。
		*/
		__proto.changePanel=function(){
			this._panelChanged=false;
			var g=this._colorPanel.graphics;
			g.clear();
			g.drawRect(0,0,230,166,this._bgColor,this._borderColor);
			this.drawBlock(this._selectedColor);
			this._colorInput.borderColor=this._borderColor;
			this._colorInput.bgColor=this._inputBgColor;
			this._colorInput.color=this._inputColor;
			g=this._colorTiles.graphics;
			g.clear();
			var mainColors=[0x000000,0x333333,0x666666,0x999999,0xCCCCCC,0xFFFFFF,0xFF0000,0x00FF00,0x0000FF,0xFFFF00,0x00FFFF,0xFF00FF];
			for (var i=0;i < 12;i++){
				for (var j=0;j < 20;j++){
					var color=0;
					if (j===0)color=mainColors[i];
					else if (j===1)color=0x000000;
					else color=(((i *3+j / 6)% 3 << 0)+((i / 6)<< 0)*3)*0x33 << 16 | j % 6 *0x33 << 8 | (i << 0)% 6 *0x33;
					var strColor=UIUtils.toColor(color);
					this._colors.push(strColor);
					var x=j *this._gridSize;
					var y=i *this._gridSize;
					g.drawRect(x,y,this._gridSize,this._gridSize,strColor,"#000000");
				}
			}
		}

		/**
		*颜色样本列表面板的显示按钮的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto.onColorButtonClick=function(e){
			if (this._colorPanel.parent)this.close();
			else this.open();
		}

		/**
		*打开颜色样本列表面板。
		*/
		__proto.open=function(){
			var p=this.localToGlobal(new Point());
			var px=p.x+this._colorPanel.width <=Laya.stage.width ? p.x :Laya.stage.width-this._colorPanel.width;
			var py=p.y+this._colorButton.height;
			py=py+this._colorPanel.height <=Laya.stage.height ? py :p.y-this._colorPanel.height;
			this._colorPanel.pos(px,py);
			Laya.stageBox.addChild(this._colorPanel);
			Laya.stage.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.removeColorBox);
		}

		/**
		*关闭颜色样本列表面板。
		*/
		__proto.close=function(){
			Laya.stage.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.removeColorBox);
			this._colorPanel.removeSelf();
		}

		/**
		*舞台的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto.removeColorBox=function(e){
			this.close();
		}

		/**
		*小格子色块的 <code>Event.KEY_DOWN</code> 事件侦听处理函数。
		*/
		__proto.onColorFieldKeyDown=function(e){
			if (e.keyCode==13){
				if (this._colorInput.text)this.selectedColor=this._colorInput.text;
				else this.selectedColor=null;
				this.close();
				e.stopPropagation();
			}
		}

		/**
		*颜色值输入框 <code>Event.CHANGE</code> 事件侦听处理函数。
		*/
		__proto.onColorInputChange=function(e){
			if (this._colorInput.text)this.drawBlock(this._colorInput.text);
			else this.drawBlock("#FFFFFF");
		}

		/**
		*小格子色块的 <code>Event.CLICK</code> 事件侦听处理函数。
		*/
		__proto.onColorTilesClick=function(e){
			this.selectedColor=this.getColorByMouse();
			this.close();
		}

		/**
		*@private
		*小格子色块的 <code>Event.MOUSE_MOVE</code> 事件侦听处理函数。
		*/
		__proto.onColorTilesMouseMove=function(e){
			this._colorInput.focus=false;
			var color=this.getColorByMouse();
			this._colorInput.text=color;
			this.drawBlock(color);
		}

		/**
		*通过鼠标位置取对应的颜色块的颜色值。
		*/
		__proto.getColorByMouse=function(){
			var point=this._colorTiles.getMousePoint();
			var x=Math.floor(point.x / this._gridSize);
			var y=Math.floor(point.y / this._gridSize);
			return this._colors[y *20+x];
		}

		/**
		*绘制颜色块。
		*@param color 需要绘制的颜色块的颜色值。
		*/
		__proto.drawBlock=function(color){
			var g=this._colorBlock.graphics;
			g.clear();
			var showColor=color ? color :"#ffffff";
			g.drawRect(0,0,50,20,showColor,this._borderColor);
			color || g.drawLine(0,0,50,20,"#ff0000");
		}

		/**
		*改变颜色。
		*/
		__proto.changeColor=function(){
			var g=this.graphics;
			g.clear();
			var showColor=this._selectedColor || "#000000";
			g.drawRect(0,0,this._colorButton.width,this._colorButton.height,showColor);
		}

		/**@private */
		__proto._setPanelChanged=function(){
			if (!this._panelChanged){
				this._panelChanged=true;
				this.callLater(this.changePanel);
			}
		}

		/**
		*表示颜色输入框的背景颜色值。
		*/
		__getset(0,__proto,'inputBgColor',function(){
			return this._inputBgColor;
			},function(value){
			this._inputBgColor=value;
			this._setPanelChanged();
		});

		/**
		*表示选择的颜色值。
		*/
		__getset(0,__proto,'selectedColor',function(){
			return this._selectedColor;
			},function(value){
			if (this._selectedColor !=value){
				this._selectedColor=this._colorInput.text=value;
				this.drawBlock(value);
				this.changeColor();
				this.changeHandler && this.changeHandler.runWith(this._selectedColor);
				this.event(/*laya.events.Event.CHANGE*/"change",Event.EMPTY.setTo(/*laya.events.Event.CHANGE*/"change",this,this));
			}
		});

		/**
		*@copy laya.ui.Button#skin
		*/
		__getset(0,__proto,'skin',function(){
			return this._colorButton.skin;
			},function(value){
			this._colorButton.skin=value;
			this.changeColor();
		});

		/**
		*表示颜色样本列表面板的背景颜色值。
		*/
		__getset(0,__proto,'bgColor',function(){
			return this._bgColor;
			},function(value){
			this._bgColor=value;
			this._setPanelChanged();
		});

		/**
		*表示颜色样本列表面板的边框颜色值。
		*/
		__getset(0,__proto,'borderColor',function(){
			return this._borderColor;
			},function(value){
			this._borderColor=value;
			this._setPanelChanged();
		});

		/**
		*表示颜色样本列表面板选择或输入的颜色值。
		*/
		__getset(0,__proto,'inputColor',function(){
			return this._inputColor;
			},function(value){
			this._inputColor=value;
			this._setPanelChanged();
		});

		return ColorPicker;
	})(Component)


	/**
	*<code>ComboBox</code> 组件包含一个下拉列表，用户可以从该列表中选择单个值。
	*
	*@example 以下示例代码，创建了一个 <code>ComboBox</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.ComboBox;
		*import laya.utils.Handler;
		*public class ComboBox_Example
		*{
			*public function ComboBox_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/button.png",Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var comboBox:ComboBox=new ComboBox("resource/ui/button.png","item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
				*comboBox.x=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
				*comboBox.y=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
				*comboBox.selectHandler=new Handler(this,onSelect);//设置 comboBox 选择项改变时执行的处理器。
				*Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
				*}
			*private function onSelect(index:int):void
			*{
				*trace("当前选中的项对象索引： ",index);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高。
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
	*Laya.loader.load("resource/ui/button.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete(){
		*console.log("资源加载完成！");
		*var comboBox=new laya.ui.ComboBox("resource/ui/button.png","item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
		*comboBox.x=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
		*comboBox.y=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
		*comboBox.selectHandler=new laya.utils.Handler(this,onSelect);//设置 comboBox 选择项改变时执行的处理器。
		*Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
		*}
	*function onSelect(index)
	*{
		*console.log("当前选中的项对象索引： ",index);
		*}
	*</listing>
	*<listing version="3.0">
	*import ComboBox=laya.ui.ComboBox;
	*import Handler=laya.utils.Handler;
	*class ComboBox_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load("resource/ui/button.png",Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*console.log("资源加载完成！");
			*var comboBox:ComboBox=new ComboBox("resource/ui/button.png","item0,item1,item2,item3,item4,item5");//创建一个 ComboBox 类的实例对象 comboBox ,传入它的皮肤和标签集。
			*comboBox.x=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
			*comboBox.y=100;//设置 comboBox 对象的属性 x 的值，用于控制 comboBox 对象的显示位置。
			*comboBox.selectHandler=new Handler(this,this.onSelect);//设置 comboBox 选择项改变时执行的处理器。
			*Laya.stage.addChild(comboBox);//将此 comboBox 对象添加到显示列表。
			*}
		*private onSelect(index:number):void {
			*console.log("当前选中的项对象索引： ",index);
			*}
		*}
	*
	*</listing>
	*/
	//class laya.ui.ComboBox extends laya.ui.Component
	var ComboBox=(function(_super){
		function ComboBox(skin,labels){
			this._visibleNum=6;
			this._button=null;
			this._list=null;
			this._isOpen=false;
			this._scrollBar=null;
			this._itemSize=12;
			this._labels=[];
			this._selectedIndex=-1;
			this._selectHandler=null;
			this._itemHeight=NaN;
			this._listHeight=NaN;
			this._listChanged=false;
			this._itemChanged=false;
			this._scrollBarSkin=null;
			ComboBox.__super.call(this);
			this._itemColors=Styles.comboBoxItemColors;
			this.skin=skin;
			this.labels=labels;
		}

		__class(ComboBox,'laya.ui.ComboBox',_super);
		var __proto=ComboBox.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._button && this._button.destroy(destroyChild);
			this._list && this._list.destroy(destroyChild);
			this._scrollBar && this._scrollBar.destroy(destroyChild);
			this._button=null;
			this._list=null;
			this._scrollBar=null;
			this._itemColors=null;
			this._labels=null;
			this._selectHandler=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._button=new Button());
			this._button.text.align="left";
			this._button.labelPadding="0,0,0,5";
			this._button.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onButtonMouseDown);
		}

		__proto._createList=function(){
			this._list=new List();
			this._list.selectEnable=true;
			this._list.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onListDown);
			this._list.mouseHandler=Handler.create(this,this.onlistItemMouse,null,false);
			if (this._scrollBarSkin){
				this._list.addChild(this._scrollBar=new VScrollBar());
				this._scrollBar.skin=this._scrollBarSkin;
				this._scrollBar.name="scrollBar";
				this._scrollBar.y=1;
				this._scrollBar.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onScrollBarDown);
			}
		}

		/**
		*@private
		*/
		__proto.onListDown=function(e){
			e.stopPropagation();
		}

		__proto.onScrollBarDown=function(e){
			e.stopPropagation();
		}

		__proto.onButtonMouseDown=function(e){
			this.callLater(this.switchTo,[!this._isOpen]);
		}

		/**
		*@private
		*/
		__proto.changeList=function(){
			this._listChanged=false;
			var labelWidth=this.width-2;
			var labelColor=this._itemColors[2];
			this._itemHeight=this._itemSize+6;
			this._list.itemRender={type:"Box",child:[{type:"Label",props:{name:"label",x:1,padding:"3,3,3,3",width:labelWidth,height:this._itemHeight,fontSize:this._itemSize,color:labelColor}}]};
			this._list.repeatY=this._visibleNum;
			if (this._scrollBar)this._scrollBar.x=this.width-this._scrollBar.width-1;
			this._list.refresh();
		}

		/**
		*@private
		*下拉列表的鼠标事件响应函数。
		*/
		__proto.onlistItemMouse=function(e,index){
			var type=e.type;
			if (type===/*laya.events.Event.MOUSE_OVER*/"mouseover" || type===/*laya.events.Event.MOUSE_OUT*/"mouseout"){
				var box=this._list.getCell(index);
				if (!box)return;
				var label=box.getChildByName("label");
				if (type===/*laya.events.Event.ROLL_OVER*/"mouseover"){
					label.bgColor=this._itemColors[0];
					label.color=this._itemColors[1];
					}else {
					label.bgColor=null;
					label.color=this._itemColors[2];
				}
				}else if (type===/*laya.events.Event.CLICK*/"click"){
				this.selectedIndex=index;
				this.isOpen=false;
			}
		}

		/**
		*@private
		*/
		__proto.switchTo=function(value){
			this.isOpen=value;
		}

		/**
		*更改下拉列表的打开状态。
		*/
		__proto.changeOpen=function(){
			this.isOpen=!this._isOpen;
		}

		/**
		*更改下拉列表。
		*/
		__proto.changeItem=function(){
			this._itemChanged=false;
			this.runCallLater(this.changeList);
			this._listHeight=this._labels.length > 0 ? Math.min(this._visibleNum,this._labels.length)*this._itemHeight :this._itemHeight;
			if (this._scrollBar)this._scrollBar.height=this._listHeight-2;
			var g=this._list.graphics;
			g.clear();
			g.drawRect(0,0,this.width-1,this._listHeight,this._itemColors[4],this._itemColors[3]);
			var a=this._list.array || [];
			a.length=0;
			for (var i=0,n=this._labels.length;i < n;i++){
				a.push({label:this._labels[i]});
			}
			this._list.array=a;
			if (this._visibleNum > a.length){
				this._list.height=this._listHeight;
				}else {
				this._list.height=0;
			}
		}

		__proto.changeSelected=function(){
			this._button.label=this.selectedLabel;
		}

		/**
		*关闭下拉列表。
		*/
		__proto.removeList=function(e){
			this.isOpen=false;
		}

		/**
		*表示选择的下拉列表项的索引。
		*/
		__getset(0,__proto,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this._selectedIndex=value;
				if (this._labels.length > 0)this.changeSelected();
				else this.callLater(this.changeSelected);
				this.event(/*laya.events.Event.CHANGE*/"change",[Event.EMPTY.setTo(/*laya.events.Event.CHANGE*/"change",this,this)]);
				this._selectHandler && this._selectHandler.runWith(this._selectedIndex);
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureHeight',function(){
			return this._button.height;
		});

		/**
		*@copy laya.ui.Button#skin
		*/
		__getset(0,__proto,'skin',function(){
			return this._button.skin;
			},function(value){
			if (this._button.skin !=value){
				this._button.skin=value;
				this._listChanged=true;
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureWidth',function(){
			return this._button.width;
		});

		/**@inheritDoc */
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._button.width=this._width;
			this._itemChanged=true;
			this._listChanged=true;
		});

		/**
		*表示选择的下拉列表项的的标签。
		*/
		__getset(0,__proto,'selectedLabel',function(){
			return this._selectedIndex >-1 && this._selectedIndex < this._labels.length ? this._labels[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._labels.indexOf(value);
		});

		/**
		*标签集合字符串。
		*/
		__getset(0,__proto,'labels',function(){
			return this._labels.join(",");
			},function(value){
			if (this._labels.length > 0)this.selectedIndex=-1;
			if (value)this._labels=value.split(",");
			else this._labels.length=0;
			this._itemChanged=true;
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._button.height=this._height;
		});

		/**
		*改变下拉列表的选择项时执行的处理器(默认返回参数index:int)。
		*/
		__getset(0,__proto,'selectHandler',function(){
			return this._selectHandler;
			},function(value){
			this._selectHandler=value;
		});

		/**
		*获取或设置没有滚动条的下拉列表中可显示的最大行数。
		*/
		__getset(0,__proto,'visibleNum',function(){
			return this._visibleNum;
			},function(value){
			this._visibleNum=value;
			this._listChanged=true;
		});

		/**
		*表示按钮文本标签是否为粗体字。
		*@see laya.display.Text#bold
		*/
		__getset(0,__proto,'labelBold',function(){
			return this._button.text.bold;
			},function(value){
			this._button.text.bold=value
		});

		/**
		*下拉列表项颜色。
		*<p><b>格式：</b>"悬停或被选中时背景颜色,悬停或被选中时标签颜色,标签颜色,边框颜色,背景颜色"</p>
		*/
		__getset(0,__proto,'itemColors',function(){
			return String(this._itemColors)
			},function(value){
			this._itemColors=UIUtils.fillArray(this._itemColors,value,String);
			this._listChanged=true;
		});

		/**
		*下拉列表项标签的字体大小。
		*/
		__getset(0,__proto,'itemSize',function(){
			return this._itemSize;
			},function(value){
			this._itemSize=value;
			this._listChanged=true;
		});

		/**
		*获取对 <code>ComboBox</code> 组件所包含的 <code>VScrollBar</code> 滚动条组件的引用。
		*/
		__getset(0,__proto,'scrollBar',function(){
			return this._scrollBar;
		});

		/**
		*表示下拉列表的打开状态。
		*/
		__getset(0,__proto,'isOpen',function(){
			return this._isOpen;
			},function(value){
			if (this._isOpen !=value){
				this._isOpen=value;
				this._button.selected=this._isOpen;
				if (this._isOpen){
					this._list || this._createList();
					this._listChanged && this.changeList();
					this._itemChanged && this.changeItem();
					Point.EMPTY.setTo(0,0);
					var p=this.localToGlobal(Point.EMPTY);
					var py=p.y+this._button.height;
					py=py+this._listHeight <=Laya.stage.height ? py :p.y-this._listHeight;
					this._list.pos(p.x,py);
					Laya.stageBox.addChild(this._list);
					Laya.stage.once(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.removeList);
					this._list.selectedIndex=this._selectedIndex;
					}else {
					this._list && this._list.removeSelf();
				}
			}
		});

		/**
		*滚动条皮肤。
		*/
		__getset(0,__proto,'scrollBarSkin',function(){
			return this._scrollBarSkin;
			},function(value){
			this._scrollBarSkin=value;
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		__getset(0,__proto,'sizeGrid',function(){
			return this._button.sizeGrid;
			},function(value){
			this._button.sizeGrid=value;
		});

		/**
		*获取对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的引用。
		*/
		__getset(0,__proto,'button',function(){
			return this._button;
		});

		/**
		*获取对 <code>ComboBox</code> 组件所包含的 <code>List</code> 列表组件的引用。
		*/
		__getset(0,__proto,'list',function(){
			return this._list;
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.selectedIndex=parseInt(value);
			else if ((value instanceof Array))this.labels=(value).join(",");
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的文本标签颜色。
		*<p><b>格式：</b>upColor,overColor,downColor,disableColor</p>
		*/
		__getset(0,__proto,'labelColors',function(){
			return this._button.labelColors;
			},function(value){
			if (this._button.labelColors !=value){
				this._button.labelColors=value;
			}
		});

		/**
		*获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的文本边距。
		*<p><b>格式：</b>上边距,右边距,下边距,左边距</p>
		*/
		__getset(0,__proto,'labelPadding',function(){
			return this._button.text.padding.join(",");
			},function(value){
			this._button.text.padding=UIUtils.fillArray(Styles.labelPadding,value,Number);
		});

		/**
		*获取或设置对 <code>ComboBox</code> 组件所包含的 <code>Button</code> 组件的标签字体大小。
		*/
		__getset(0,__proto,'labelSize',function(){
			return this._button.text.fontSize;
			},function(value){
			this._button.text.fontSize=value
		});

		/**
		*表示按钮文本标签的字体名称，以字符串形式表示。
		*@see laya.display.Text#font
		*/
		__getset(0,__proto,'labelFont',function(){
			return this._button.text.font;
			},function(value){
			this._button.text.font=value
		});

		/**
		*表示按钮的状态值。
		*@see laya.ui.Button#stateNum
		*/
		__getset(0,__proto,'stateNum',function(){
			return this._button.stateNum;
			},function(value){
			this._button.stateNum=value
		});

		return ComboBox;
	})(Component)


	/**
	*<code>ScrollBar</code> 组件是一个滚动条组件。
	*<p>当数据太多以至于显示区域无法容纳时，最终用户可以使用 <code>ScrollBar</code> 组件控制所显示的数据部分。</p>
	*<p> 滚动条由四部分组成：两个箭头按钮、一个轨道和一个滑块。 </p> *
	*
	*@see laya.ui.VScrollBar
	*@see laya.ui.HScrollBar
	*/
	//class laya.ui.ScrollBar extends laya.ui.Component
	var ScrollBar=(function(_super){
		function ScrollBar(skin){
			this.changeHandler=null;
			this.scaleBar=true;
			this.autoHide=false;
			this.elasticDistance=0;
			this.elasticBackTime=500;
			this.upButton=null;
			this.downButton=null;
			this.slider=null;
			this._scrollSize=1;
			this._skin=null;
			this._thumbPercent=1;
			this._target=null;
			this._lastPoint=null;
			this._lastOffset=0;
			this._checkElastic=false;
			this._isElastic=false;
			this._value=NaN;
			this._hide=false;
			this._clickOnly=true;
			this._offsets=null;
			ScrollBar.__super.call(this);
			this._showButtons=UIConfig.showButtons;
			this._touchScrollEnable=UIConfig.touchScrollEnable;
			this._mouseWheelEnable=UIConfig.mouseWheelEnable;
			this.skin=skin;
			this.max=1;
		}

		__class(ScrollBar,'laya.ui.ScrollBar',_super);
		var __proto=ScrollBar.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this.upButton && this.upButton.destroy(destroyChild);
			this.downButton && this.downButton.destroy(destroyChild);
			this.slider && this.slider.destroy(destroyChild);
			this.upButton=this.downButton=null;
			this.slider=null;
			this.changeHandler=null;
			this._offsets=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this.slider=new Slider());
			this.addChild(this.upButton=new Button());
			this.addChild(this.downButton=new Button());
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			this.slider.showLabel=false;
			this.slider.on(/*laya.events.Event.CHANGE*/"change",this,this.onSliderChange);
			this.slider.setSlider(0,0,0);
			this.upButton.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onButtonMouseDown);
			this.downButton.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onButtonMouseDown);
		}

		/**
		*@private
		*滑块位置发生改变的处理函数。
		*/
		__proto.onSliderChange=function(){
			this.value=this.slider.value;
		}

		/**
		*@private
		*向上和向下按钮的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto.onButtonMouseDown=function(e){
			var isUp=e.currentTarget===this.upButton;
			this.slide(isUp);
			Laya.timer.once(Styles.scrollBarDelayTime,this,this.startLoop,[isUp]);
			Laya.stage.once(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp);
		}

		/**@private */
		__proto.startLoop=function(isUp){
			Laya.timer.frameLoop(1,this,this.slide,[isUp]);
		}

		/**@private */
		__proto.slide=function(isUp){
			if (isUp)this.value-=this._scrollSize;
			else this.value+=this._scrollSize;
		}

		/**
		*@private
		*舞台的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto.onStageMouseUp=function(e){
			Laya.timer.clear(this,this.startLoop);
			Laya.timer.clear(this,this.slide);
		}

		/**
		*@private
		*更改对象的皮肤及位置。
		*/
		__proto.changeScrollBar=function(){
			this.upButton.visible=this._showButtons;
			this.downButton.visible=this._showButtons;
			if (this._showButtons){
				this.upButton.skin=this._skin.replace(".png","$up.png");
				this.downButton.skin=this._skin.replace(".png","$down.png");
			}
			if (this.slider.isVertical)this.slider.y=this._showButtons ? this.upButton.height :0;
			else this.slider.x=this._showButtons ? this.upButton.width :0;
			this.resetPositions();
		}

		/**@inheritDoc */
		__proto.changeSize=function(){
			_super.prototype.changeSize.call(this);
			this.resetPositions();
			this.event(/*laya.events.Event.CHANGE*/"change");
			this.changeHandler && this.changeHandler.runWith(this.value);
		}

		/**@private */
		__proto.resetPositions=function(){
			if (this.slider.isVertical)this.slider.height=this.height-(this._showButtons ? (this.upButton.height+this.downButton.height):0);
			else this.slider.width=this.width-(this._showButtons ? (this.upButton.width+this.downButton.width):0);
			this.resetButtonPosition();
		}

		/**@private */
		__proto.resetButtonPosition=function(){
			if (this.slider.isVertical)this.downButton.y=this.slider.y+this.slider.height;
			else this.downButton.x=this.slider.x+this.slider.width;
		}

		/**
		*设置滚动条信息。
		*@param min 滚动条最小位置值。
		*@param max 滚动条最大位置值。
		*@param value 滚动条当前位置值。
		*/
		__proto.setScroll=function(min,max,value){
			this.runCallLater(this.changeSize);
			this.slider.setSlider(min,max,value);
			this.slider.bar.visible=max > 0;
			if (!this._hide && this.autoHide)this.visible=false;
		}

		/**@private */
		__proto.onTargetMouseWheel=function(e){
			this.value-=e.delta *this._scrollSize;
			this.target=this._target;
		}

		/**@private */
		__proto.onTargetMouseDown=function(e){
			this._clickOnly=true;
			this._lastOffset=0;
			this._checkElastic=false;
			this._lastPoint || (this._lastPoint=new Point());
			this._lastPoint.setTo(Laya.stage.mouseX,Laya.stage.mouseY);
			Laya.timer.clear(this,this.tweenMove);
			Tween.clearTween(this);
			Laya.stage.once(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp2);
			Laya.stage.once(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp2);
			Laya.timer.frameLoop(1,this,this.loop);
		}

		/**@private */
		__proto.loop=function(){
			var mouseY=Laya.stage.mouseY;
			var mouseX=Laya.stage.mouseX;
			this._lastOffset=this.isVertical ? (mouseY-this._lastPoint.y):(mouseX-this._lastPoint.x);
			if (this._clickOnly){
				if (Math.abs(this._lastOffset *(this.isVertical ? Laya.stage._canvasTransform.getScaleY():Laya.stage._canvasTransform.getScaleX()))> 1){
					this._clickOnly=false;
					this._offsets || (this._offsets=[]);
					this._offsets.length=0;
					this._target.mouseEnabled=false;
					if (!this.hide && this.autoHide){
						this.alpha=1;
						this.visible=true;
					}
					this.event(/*laya.events.Event.START*/"start");
				}else return;
			}
			this._offsets.push(this._lastOffset);
			this._lastPoint.x=mouseX;
			this._lastPoint.y=mouseY;
			if (this._lastOffset===0)return;
			if (!this._checkElastic){
				if (this.elasticDistance > 0){
					if (!this._checkElastic && this._lastOffset !=0){
						this._checkElastic=true;
						if ((this._lastOffset > 0 && this._value <=this.min)|| (this._lastOffset < 0 && this._value >=this.max)){
							this._isElastic=true;
							}else {
							this._isElastic=false;
						}
					}
					}else {
					this._checkElastic=true;
				}
			}
			if (this._checkElastic){
				if (this._isElastic){
					if (this._value <=this.min){
						this.value-=this._lastOffset *Math.max(0,(1-((this.min-this._value)/ this.elasticDistance)));
						}else if (this._value >=this.max){
						this.value-=this._lastOffset *Math.max(0,(1-((this._value-this.max)/ this.elasticDistance)));
					}
					}else {
					this.value-=this._lastOffset;
				}
			}
		}

		/**@private */
		__proto.onStageMouseUp2=function(e){
			Laya.stage.off(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onStageMouseUp2);
			Laya.stage.off(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onStageMouseUp2);
			Laya.timer.clear(this,this.loop);
			if (this._clickOnly)return;
			this._target.mouseEnabled=true;
			if (this._isElastic){
				if (this._value < this.min){
					Tween.to(this,{value:this.min},this.elasticBackTime,Ease.sineOut,Handler.create(this,this.elasticOver));
					}else if (this._value > this.max){
					Tween.to(this,{value:this.max},this.elasticBackTime,Ease.sineOut,Handler.create(this,this.elasticOver));
				}
				}else {
				if (this._offsets.length < 1){
					this._offsets[0]=this.isVertical ? Laya.stage.mouseY-this._lastPoint.y :Laya.stage.mouseX-this._lastPoint.x;
				};
				var offset=0;
				var n=Math.min(this._offsets.length,3);
				for (var i=0;i < n;i++){
					offset+=this._offsets[this._offsets.length-1-i];
				}
				this._lastOffset=offset / n;
				offset=Math.abs(this._lastOffset);
				if (offset < 2){
					this.event(/*laya.events.Event.END*/"end");
					return;
				}
				if (offset > 60)this._lastOffset=this._lastOffset > 0 ? 60 :-60;
				Laya.timer.frameLoop(1,this,this.tweenMove);
			}
		}

		/**@private */
		__proto.elasticOver=function(){
			this._isElastic=false;
			if (!this.hide && this.autoHide){
				Tween.to(this,{alpha:0},500);
			}
			this.event(/*laya.events.Event.END*/"end");
		}

		/**@private */
		__proto.tweenMove=function(){
			this._lastOffset *=0.95;
			this.value-=this._lastOffset;
			if (Math.abs(this._lastOffset)< 1 || this.value==this.max || this.value==this.min){
				Laya.timer.clear(this,this.tweenMove);
				this.event(/*laya.events.Event.END*/"end");
				if (!this.hide && this.autoHide){
					Tween.to(this,{alpha:0},500);
				}
			}
		}

		/**
		*停止滑动。
		*/
		__proto.stopScroll=function(){
			this.onStageMouseUp2(null);
			Laya.timer.clear(this,this.tweenMove);
			Tween.clearTween(this);
		}

		/**@inheritDoc */
		__getset(0,__proto,'measureHeight',function(){
			if (this.slider.isVertical)return 100;
			return this.slider.height;
		});

		/**
		*@copy laya.ui.Image#skin
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this.slider.skin=this._skin;
				this.callLater(this.changeScrollBar);
			}
		});

		/**
		*获取或设置表示最高滚动位置的数字。
		*/
		__getset(0,__proto,'max',function(){
			return this.slider.max;
			},function(value){
			this.slider.max=value;
		});

		/**一个布尔值，指定是否显示向上、向下按钮，默认值为true。*/
		__getset(0,__proto,'showButtons',function(){
			return this._showButtons;
			},function(value){
			this._showButtons=value;
			this.callLater(this.changeScrollBar);
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureWidth',function(){
			if (this.slider.isVertical)return this.slider.width;
			return 100;
		});

		/**
		*获取或设置表示最低滚动位置的数字。
		*/
		__getset(0,__proto,'min',function(){
			return this.slider.min;
			},function(value){
			this.slider.min=value;
		});

		/**
		*获取或设置表示当前滚动位置的数字。
		*/
		__getset(0,__proto,'value',function(){
			return this._value;
			},function(v){
			if (v!==this._value){
				if (this._isElastic)this._value=v;
				else {
					this.slider.value=v;
					this._value=this.slider.value;
				}
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.changeHandler && this.changeHandler.runWith(this.value);
			}
		});

		/**
		*一个布尔值，指示滚动条是否为垂直滚动。如果值为true，则为垂直滚动，否则为水平滚动。
		*<p>默认值为：true。</p>
		*/
		__getset(0,__proto,'isVertical',function(){
			return this.slider.isVertical;
			},function(value){
			this.slider.isVertical=value;
		});

		/**
		*<p>当前实例的 <code>Slider</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		__getset(0,__proto,'sizeGrid',function(){
			return this.slider.sizeGrid;
			},function(value){
			this.slider.sizeGrid=value;
		});

		/**获取或设置一个值，该值表示按下滚动条轨道时页面滚动的增量。 */
		__getset(0,__proto,'scrollSize',function(){
			return this._scrollSize;
			},function(value){
			this._scrollSize=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.value=Number(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**获取或设置一个值，该值表示滑条长度比例，值为：（0-1）。 */
		__getset(0,__proto,'thumbPercent',function(){
			return this._thumbPercent;
			},function(value){
			this.runCallLater(this.changeScrollBar);
			this.runCallLater(this.changeSize);
			value=value >=1 ? 0.99 :value;
			this._thumbPercent=value;
			if (this.scaleBar){
				if (this.slider.isVertical)this.slider.bar.height=Math.max(this.slider.height *value,Styles.scrollBarMinNum);
				else this.slider.bar.width=Math.max(this.slider.width *value,Styles.scrollBarMinNum);
			}
		});

		/**
		*设置滚动对象。
		*@see laya.ui.TouchScroll#target
		*/
		__getset(0,__proto,'target',function(){
			return this._target;
			},function(value){
			if (this._target){
				this._target.off(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this,this.onTargetMouseWheel);
				this._target.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onTargetMouseDown);
			}
			this._target=value;
			if (value){
				this._mouseWheelEnable && this._target.on(/*laya.events.Event.MOUSE_WHEEL*/"mousewheel",this,this.onTargetMouseWheel);
				this._touchScrollEnable && this._target.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onTargetMouseDown);
			}
		});

		/**是否隐藏滚动条，不显示滚动条，但是可以正常滚动，默认为false。*/
		__getset(0,__proto,'hide',function(){
			return this._hide;
			},function(value){
			this._hide=value;
			this.visible=!value;
		});

		/**一个布尔值，指定是否开启触摸，默认值为true。*/
		__getset(0,__proto,'touchScrollEnable',function(){
			return this._touchScrollEnable;
			},function(value){
			this._touchScrollEnable=value;
			this.target=this._target;
		});

		/**一个布尔值，指定是否滑轮滚动，默认值为true。*/
		__getset(0,__proto,'mouseWheelEnable',function(){
			return this._mouseWheelEnable;
			},function(value){
			this._mouseWheelEnable=value;
		});

		return ScrollBar;
	})(Component)


	/**
	*使用 <code>Slider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	*<p>滑块的当前值由滑块端点（对应于滑块的最小值和最大值）之间滑块的相对位置确定。</p>
	*<p>滑块允许最小值和最大值之间特定间隔内的值。滑块还可以使用数据提示显示其当前值。</p>
	*
	*@see laya.ui.HSlider
	*@see laya.ui.VSlider
	*/
	//class laya.ui.Slider extends laya.ui.Component
	var Slider=(function(_super){
		function Slider(skin){
			this.changeHandler=null;
			this.isVertical=true;
			this.showLabel=true;
			this._allowClickBack=false;
			this._max=100;
			this._min=0;
			this._tick=1;
			this._value=0;
			this._skin=null;
			this._bg=null;
			this._bar=null;
			this._tx=NaN;
			this._ty=NaN;
			this._maxMove=NaN;
			this._globalSacle=null;
			Slider.__super.call(this);
			this.skin=skin;
		}

		__class(Slider,'laya.ui.Slider',_super);
		var __proto=Slider.prototype;
		/**
		*@inheritDoc
		*/
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bg && this._bg.destroy(destroyChild);
			this._bar && this._bar.destroy(destroyChild);
			this._bg=null;
			this._bar=null;
			this.changeHandler=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._bg=new Image());
			this.addChild(this._bar=new Button());
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			this._bar.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onBarMouseDown);
			this._bg.sizeGrid=this._bar.sizeGrid="4,4,4,4,0";
			this.allowClickBack=true;
		}

		/**
		*@private
		*滑块的的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*@param e
		*/
		__proto.onBarMouseDown=function(e){
			this._globalSacle || (this._globalSacle=new Point());
			this._globalSacle.setTo(this.globalScaleX,this.globalScaleY);
			this._maxMove=this.isVertical ? (this.height-this._bar.height):(this.width-this._bar.width);
			this._tx=Laya.stage.mouseX;
			this._ty=Laya.stage.mouseY;
			Laya.stage.on(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this.mouseMove);
			Laya.stage.once(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.mouseUp);
			this.showValueText();
		}

		/**
		*@private
		*显示标签。
		*/
		__proto.showValueText=function(){
			if (this.showLabel){
				var label=laya.ui.Slider.label;
				this.addChild(label);
				label.textField.changeText(this._value+"");
				if (this.isVertical){
					label.x=this._bar.x+20;
					label.y=(this._bar.height-label.height)*0.5+this._bar.y;
					}else {
					label.y=this._bar.y-20;
					label.x=(this._bar.width-label.width)*0.5+this._bar.x;
				}
			}
		}

		/**
		*@private
		*隐藏标签。
		*/
		__proto.hideValueText=function(){
			laya.ui.Slider.label && laya.ui.Slider.label.removeSelf();
		}

		/**
		*@private
		*@param e
		*/
		__proto.mouseUp=function(e){
			Laya.stage.off(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this.mouseMove);
			this.sendChangeEvent(/*laya.events.Event.CHANGED*/"changed");
			this.hideValueText();
		}

		/**
		*@private
		*@param e
		*/
		__proto.mouseMove=function(e){
			var oldValue=this._value;
			if (this.isVertical){
				this._bar.y+=(Laya.stage.mouseY-this._ty)/ this._globalSacle.y;
				if (this._bar.y > this._maxMove)this._bar.y=this._maxMove;
				else if (this._bar.y < 0)this._bar.y=0;
				this._value=this._bar.y / this._maxMove *(this._max-this._min)+this._min;
				}else {
				this._bar.x+=(Laya.stage.mouseX-this._tx)/ this._globalSacle.x;
				if (this._bar.x > this._maxMove)this._bar.x=this._maxMove;
				else if (this._bar.x < 0)this._bar.x=0;
				this._value=this._bar.x / this._maxMove *(this._max-this._min)+this._min;
			}
			this._tx=Laya.stage.mouseX;
			this._ty=Laya.stage.mouseY;
			var pow=Math.pow(10,(this._tick+"").length-1);
			this._value=Math.round(Math.round(this._value / this._tick)*this._tick *pow)/ pow;
			if (this._value !=oldValue){
				this.sendChangeEvent();
			}
			this.showValueText();
		}

		/**
		*@private
		*@param type
		*/
		__proto.sendChangeEvent=function(type){
			(type===void 0)&& (type=/*laya.events.Event.CHANGE*/"change");
			this.event(type);
			this.changeHandler && this.changeHandler.runWith(this._value);
		}

		/**
		*@private
		*设置滑块的位置信息。
		*/
		__proto.setBarPoint=function(){
			if (this.isVertical)this._bar.x=(this._bg.width-this._bar.width)*0.5;
			else this._bar.y=(this._bg.height-this._bar.height)*0.5;
		}

		/**@inheritDoc */
		__proto.changeSize=function(){
			_super.prototype.changeSize.call(this);
			if (this.isVertical)this._bg.height=this.height;
			else this._bg.width=this.width;
			this.setBarPoint();
			this.changeValue();
		}

		/**
		*设置滑动条的信息。
		*@param min 滑块的最小值。
		*@param max 滑块的最小值。
		*@param value 滑块的当前值。
		*/
		__proto.setSlider=function(min,max,value){
			this._value=-1;
			this._min=min;
			this._max=max > min ? max :min;
			this.value=value < min ? min :value > max ? max :value;
		}

		/**
		*@private
		*改变滑块的位置值。
		*/
		__proto.changeValue=function(){
			var pow=Math.pow(10,(this._tick+"").length-1);
			this._value=Math.round(Math.round(this._value / this._tick)*this._tick *pow)/ pow;
			this._value=this._value > this._max ? this._max :this._value < this._min ? this._min :this._value;
			if (this.isVertical)this._bar.y=(this._value-this._min)/ (this._max-this._min)*(this.height-this._bar.height);
			else this._bar.x=(this._value-this._min)/ (this._max-this._min)*(this.width-this._bar.width);
		}

		/**
		*@private
		*滑动条的 <code>Event.MOUSE_DOWN</code> 事件侦听处理函数。
		*/
		__proto.onBgMouseDown=function(e){
			var point=this._bg.getMousePoint();
			if (this.isVertical)this.value=point.y / (this.height-this._bar.height)*(this._max-this._min)+this._min;
			else this.value=point.x / (this.width-this._bar.width)*(this._max-this._min)+this._min;
		}

		/**@inheritDoc */
		__getset(0,__proto,'measureHeight',function(){
			return Math.max(this._bg.height,this._bar.height);
		});

		/**
		*@copy laya.ui.Image#skin
		*@return
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._bg.skin=this._skin;
				this._bar.skin=this._skin.replace(".png","$bar.png");
				this.setBarPoint();
			}
		});

		/**
		*一个布尔值，指定是否允许通过点击滑动条改变 <code>Slider</code> 的 <code>value</code> 属性值。
		*/
		__getset(0,__proto,'allowClickBack',function(){
			return this._allowClickBack;
			},function(value){
			if (this._allowClickBack !=value){
				this._allowClickBack=value;
				if (value)this._bg.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onBgMouseDown);
				else this._bg.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onBgMouseDown);
			}
		});

		/**
		*获取或设置表示最高位置的数字。 默认值为100。
		*/
		__getset(0,__proto,'max',function(){
			return this._max;
			},function(value){
			if (this._max !=value){
				this._max=value;
				this.callLater(this.changeValue);
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureWidth',function(){
			return Math.max(this._bg.width,this._bar.width);
		});

		/**
		*表示当前的刻度值。默认值为1。
		*@return
		*/
		__getset(0,__proto,'tick',function(){
			return this._tick;
			},function(value){
			if (this._tick !=value){
				this._tick=value;
				this.callLater(this.changeValue);
			}
		});

		/**
		*<p>当前实例的背景图（ <code>Image</code> ）和滑块按钮（ <code>Button</code> ）实例的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*@return
		*/
		__getset(0,__proto,'sizeGrid',function(){
			return this._bg.sizeGrid;
			},function(value){
			this._bg.sizeGrid=value;
			this._bar.sizeGrid=value;
		});

		/**
		*获取或设置表示最低位置的数字。 默认值为0。
		*/
		__getset(0,__proto,'min',function(){
			return this._min;
			},function(value){
			if (this._min !=value){
				this._min=value;
				this.callLater(this.changeValue);
			}
		});

		/**
		*获取或设置表示当前滑块位置的数字。
		*/
		__getset(0,__proto,'value',function(){
			return this._value;
			},function(num){
			if (this._value !=num){
				var oldValue=this._value;
				this._value=num;
				this.changeValue();
				if (this._value !=oldValue){
					this.sendChangeEvent();
				}
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.value=Number(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*表示滑块按钮的引用。
		*/
		__getset(0,__proto,'bar',function(){
			return this._bar;
		});

		__static(Slider,
		['label',function(){return this.label=new Label();}
		]);
		return Slider;
	})(Component)


	/**
	*<code>Image</code> 类是用于表示位图图像或绘制图形的显示对象。
	*@example 以下示例代码，创建了一个新的 <code>Image</code> 实例，设置了它的皮肤、位置信息，并添加到舞台上。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Image;
		*public class Image_Example
		*{
			*public function Image_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*private function onInit():void
			*{
				*var bg:Image=new Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
				*bg.x=100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
				*bg.y=100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
				*bg.sizeGrid="40,10,5,10";//设置 bg 对象的网格信息。
				*bg.width=150;//设置 bg 对象的宽度。
				*bg.height=250;//设置 bg 对象的高度。
				*Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
				*var image:Image=new Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
				*image.x=100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
				*image.y=100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
				*Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*onInit();
	*function onInit(){
		*var bg=new laya.ui.Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
		*bg.x=100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
		*bg.y=100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
		*bg.sizeGrid="40,10,5,10";//设置 bg 对象的网格信息。
		*bg.width=150;//设置 bg 对象的宽度。
		*bg.height=250;//设置 bg 对象的高度。
		*Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
		*var image=new laya.ui.Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
		*image.x=100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
		*image.y=100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
		*Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
		*}
	*</listing>
	*<listing version="3.0">
	*class Image_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*this.onInit();
			*}
		*private onInit():void {
			*var bg:laya.ui.Image=new laya.ui.Image("resource/ui/bg.png");//创建一个 Image 类的实例对象 bg ,并传入它的皮肤。
			*bg.x=100;//设置 bg 对象的属性 x 的值，用于控制 bg 对象的显示位置。
			*bg.y=100;//设置 bg 对象的属性 y 的值，用于控制 bg 对象的显示位置。
			*bg.sizeGrid="40,10,5,10";//设置 bg 对象的网格信息。
			*bg.width=150;//设置 bg 对象的宽度。
			*bg.height=250;//设置 bg 对象的高度。
			*Laya.stage.addChild(bg);//将此 bg 对象添加到显示列表。
			*var image:laya.ui.Image=new laya.ui.Image("resource/ui/image.png");//创建一个 Image 类的实例对象 image ,并传入它的皮肤。
			*image.x=100;//设置 image 对象的属性 x 的值，用于控制 image 对象的显示位置。
			*image.y=100;//设置 image 对象的属性 y 的值，用于控制 image 对象的显示位置。
			*Laya.stage.addChild(image);//将此 image 对象添加到显示列表。
			*}
		*}
	*</listing>
	*@see laya.ui.AutoBitmap
	*/
	//class laya.ui.Image extends laya.ui.Component
	var Image=(function(_super){
		function Image(skin){
			this._bitmap=null;
			this._skin=null;
			Image.__super.call(this);
			this.skin=skin;
		}

		__class(Image,'laya.ui.Image',_super);
		var __proto=Image.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,true);
			this._bitmap && this._bitmap.destroy();
			this._bitmap=null;
		}

		/**
		*销毁对象并释放加载的皮肤资源。
		*/
		__proto.dispose=function(){
			this.destroy(true);
			Laya.loader.clearRes(this._skin);
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.graphics=this._bitmap=new AutoBitmap();
			this._bitmap.autoCacheCmd=false;
		}

		/**
		*@private
		*设置皮肤资源。
		*/
		__proto.setSource=function(url,value){
			url===this._skin && (this.source=value);
			this.onCompResize();
		}

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='string'))this.skin=value;
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureHeight',function(){
			return this._bitmap.height;
		});

		/**
		*@copy laya.ui.AutoBitmap#source
		*/
		__getset(0,__proto,'source',function(){
			return this._bitmap.source;
			},function(value){
			if (!this._bitmap)return;
			this._bitmap.source=value;
			this.event(/*laya.events.Event.LOADED*/"loaded");
			this.repaint();
		});

		/**
		*<p>对象的皮肤地址，以字符串表示。</p>
		*<p>如果资源未加载，则先加载资源，加载完成后应用于此对象。</p>
		*<b>注意：</b>资源加载完成后，会自动缓存至资源库中。
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				if (value){
					var source=Loader.getRes(value);
					if (source){
						this.source=source;
						this.onCompResize();
					}else Laya.loader.load(this._skin,Handler.create(this,this.setSource,[this._skin]),null,/*laya.net.Loader.IMAGE*/"image");
					}else {
					this.source=null;
				}
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureWidth',function(){
			return this._bitmap.width;
		});

		/**@inheritDoc */
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bitmap.width=value==0 ? 0.0000001 :value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bitmap.height=value==0 ? 0.0000001 :value;
		});

		/**
		*<p>当前实例的位图 <code>AutoImage</code> 实例的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"。</li></ul></p>
		*@see laya.ui.AutoBitmap#sizeGrid
		*/
		__getset(0,__proto,'sizeGrid',function(){
			if (this._bitmap.sizeGrid)return this._bitmap.sizeGrid.join(",");
			return null;
			},function(value){
			this._bitmap.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		return Image;
	})(Component)


	/**
	*<p> <code>Label</code> 类用于创建显示对象以显示文本。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Label</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Label;
		*public class Label_Example
		*{
			*public function Label_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*onInit();
				*}
			*private function onInit():void
			*{
				*var label:Label=new Label();//创建一个 Label 类的实例对象 label 。
				*label.font="Arial";//设置 label 的字体。
				*label.bold=true;//设置 label 显示为粗体。
				*label.leading=4;//设置 label 的行间距。
				*label.wordWrap=true;//设置 label 自动换行。
				*label.padding="10,10,10,10";//设置 label 的边距。
				*label.color="#ff00ff";//设置 label 的颜色。
				*label.text="Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
				*label.x=100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
				*label.y=100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
				*label.width=300;//设置 label 的宽度。
				*label.height=200;//设置 label 的高度。
				*Laya.stage.addChild(label);//将 label 添加到显示列表。
				*var passwordLabel:Label=new Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
				*passwordLabel.asPassword=true;//设置 passwordLabel 的显示反式为密码显示。
				*passwordLabel.x=100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
				*passwordLabel.y=350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
				*passwordLabel.width=300;//设置 passwordLabel 的宽度。
				*passwordLabel.color="#000000";//设置 passwordLabel 的文本颜色。
				*passwordLabel.bgColor="#ccffff";//设置 passwordLabel 的背景颜色。
				*passwordLabel.fontSize=20;//设置 passwordLabel 的文本字体大小。
				*Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*onInit();
	*function onInit(){
		*var label=new laya.ui.Label();//创建一个 Label 类的实例对象 label 。
		*label.font="Arial";//设置 label 的字体。
		*label.bold=true;//设置 label 显示为粗体。
		*label.leading=4;//设置 label 的行间距。
		*label.wordWrap=true;//设置 label 自动换行。
		*label.padding="10,10,10,10";//设置 label 的边距。
		*label.color="#ff00ff";//设置 label 的颜色。
		*label.text="Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
		*label.x=100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
		*label.y=100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
		*label.width=300;//设置 label 的宽度。
		*label.height=200;//设置 label 的高度。
		*Laya.stage.addChild(label);//将 label 添加到显示列表。
		*var passwordLabel=new laya.ui.Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
		*passwordLabel.asPassword=true;//设置 passwordLabel 的显示反式为密码显示。
		*passwordLabel.x=100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
		*passwordLabel.y=350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
		*passwordLabel.width=300;//设置 passwordLabel 的宽度。
		*passwordLabel.color="#000000";//设置 passwordLabel 的文本颜色。
		*passwordLabel.bgColor="#ccffff";//设置 passwordLabel 的背景颜色。
		*passwordLabel.fontSize=20;//设置 passwordLabel 的文本字体大小。
		*Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
		*}
	*</listing>
	*<listing version="3.0">
	*import Label=laya.ui.Label;
	*class Label_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*this.onInit();
			*}
		*private onInit():void {
			*var label:Label=new Label();//创建一个 Label 类的实例对象 label 。
			*label.font="Arial";//设置 label 的字体。
			*label.bold=true;//设置 label 显示为粗体。
			*label.leading=4;//设置 label 的行间距。
			*label.wordWrap=true;//设置 label 自动换行。
			*label.padding="10,10,10,10";//设置 label 的边距。
			*label.color="#ff00ff";//设置 label 的颜色。
			*label.text="Hello everyone,我是一个可爱的文本！";//设置 label 的文本内容。
			*label.x=100;//设置 label 对象的属性 x 的值，用于控制 label 对象的显示位置。
			*label.y=100;//设置 label 对象的属性 y 的值，用于控制 label 对象的显示位置。
			*label.width=300;//设置 label 的宽度。
			*label.height=200;//设置 label 的高度。
			*Laya.stage.addChild(label);//将 label 添加到显示列表。
			*var passwordLabel:Label=new Label("请原谅我，我不想被人看到我心里话。");//创建一个 Label 类的实例对象 passwordLabel 。
			*passwordLabel.asPassword=true;//设置 passwordLabel 的显示反式为密码显示。
			*passwordLabel.x=100;//设置 passwordLabel 对象的属性 x 的值，用于控制 passwordLabel 对象的显示位置。
			*passwordLabel.y=350;//设置 passwordLabel 对象的属性 y 的值，用于控制 passwordLabel 对象的显示位置。
			*passwordLabel.width=300;//设置 passwordLabel 的宽度。
			*passwordLabel.color="#000000";//设置 passwordLabel 的文本颜色。
			*passwordLabel.bgColor="#ccffff";//设置 passwordLabel 的背景颜色。
			*passwordLabel.fontSize=20;//设置 passwordLabel 的文本字体大小。
			*Laya.stage.addChild(passwordLabel);//将 passwordLabel 添加到显示列表。
			*}
		*}
	*</listing>
	*@see laya.display.Text
	*/
	//class laya.ui.Label extends laya.ui.Component
	var Label=(function(_super){
		function Label(text){
			this._tf=null;
			Label.__super.call(this);
			(text===void 0)&& (text="");
			Font.defaultColor=Styles.labelColor;
			this.text=text;
		}

		__class(Label,'laya.ui.Label',_super);
		var __proto=Label.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._tf=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._tf=new Text());
		}

		/**@copy laya.display.Text#changeText()
		**/
		__proto.changeText=function(text){
			this._tf.changeText(text);
		}

		/**
		*<p>边距信息</p>
		*<p>"上边距，右边距，下边距 , 左边距（边距以像素为单位）"</p>
		*@see laya.display.Text.padding
		*/
		__getset(0,__proto,'padding',function(){
			return this._tf.padding.join(",");
			},function(value){
			this._tf.padding=UIUtils.fillArray(Styles.labelPadding,value,Number);
		});

		/**
		*@copy laya.display.Text#bold
		*/
		__getset(0,__proto,'bold',function(){
			return this._tf.bold;
			},function(value){
			this._tf.bold=value;
		});

		/**
		*@copy laya.display.Text#align
		*/
		__getset(0,__proto,'align',function(){
			return this._tf.align;
			},function(value){
			this._tf.align=value;
		});

		/**
		*当前文本内容字符串。
		*@see laya.display.Text.text
		*/
		__getset(0,__proto,'text',function(){
			return this._tf.text;
			},function(value){
			if (this._tf.text !=value){
				if(value)
					value=(value+"").replace(Label._textReg,"\n");
				this._tf.text=value;
				this.event(/*laya.events.Event.CHANGE*/"change");
			}
		});

		/**
		*@copy laya.display.Text#italic
		*/
		__getset(0,__proto,'italic',function(){
			return this._tf.italic;
			},function(value){
			this._tf.italic=value;
		});

		/**
		*@copy laya.display.Text#wordWrap
		*/
		/**
		*@copy laya.display.Text#wordWrap
		*/
		__getset(0,__proto,'wordWrap',function(){
			return this._tf.wordWrap;
			},function(value){
			this._tf.wordWrap=value;
		});

		/**
		*@copy laya.display.Text#font
		*/
		__getset(0,__proto,'font',function(){
			return this._tf.font;
			},function(value){
			this._tf.font=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.text=value+"";
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*@copy laya.display.Text#color
		*/
		__getset(0,__proto,'color',function(){
			return this._tf.color;
			},function(value){
			this._tf.color=value;
		});

		/**
		*@copy laya.display.Text#valign
		*/
		__getset(0,__proto,'valign',function(){
			return this._tf.valign;
			},function(value){
			this._tf.valign=value;
		});

		/**
		*@copy laya.display.Text#leading
		*/
		__getset(0,__proto,'leading',function(){
			return this._tf.leading;
			},function(value){
			this._tf.leading=value;
		});

		/**
		*@copy laya.display.Text#fontSize
		*/
		__getset(0,__proto,'fontSize',function(){
			return this._tf.fontSize;
			},function(value){
			this._tf.fontSize=value;
		});

		/**
		*@copy laya.display.Text#bgColor
		*/
		__getset(0,__proto,'bgColor',function(){
			return this._tf.bgColor
			},function(value){
			this._tf.bgColor=value;
		});

		/**
		*@copy laya.display.Text#borderColor
		*/
		__getset(0,__proto,'borderColor',function(){
			return this._tf.borderColor
			},function(value){
			this._tf.borderColor=value;
		});

		/**
		*@copy laya.display.Text#stroke
		*/
		__getset(0,__proto,'stroke',function(){
			return this._tf.stroke;
			},function(value){
			this._tf.stroke=value;
		});

		/**
		*@copy laya.display.Text#strokeColor
		*/
		__getset(0,__proto,'strokeColor',function(){
			return this._tf.strokeColor;
			},function(value){
			this._tf.strokeColor=value;
		});

		/**
		*文本控件实体 <code>Text</code> 实例。
		*/
		__getset(0,__proto,'textField',function(){
			return this._tf;
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'measureWidth',function(){
			return this._tf.width;
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'measureHeight',function(){
			return this._tf.height;
		});

		/**
		*@inheritDoc
		*/
		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'width',function(){
			if (this._width || this._tf.text)return _super.prototype._$get_width.call(this);
			return 0;
			},function(value){
			_super.prototype._$set_width.call(this,value);
			this._tf.width=value;
		});

		/**
		*@inheritDoc
		*/
		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'height',function(){
			if (this._height || this._tf.text)return _super.prototype._$get_height.call(this);
			return 0;
			},function(value){
			_super.prototype._$set_height.call(this,value);
			this._tf.height=value;
		});

		/**
		*@copy laya.display.Text#overflow
		*/
		/**
		*@copy laya.display.Text#overflow
		*/
		__getset(0,__proto,'overflow',function(){
			return this._tf.overflow;
			},function(value){
			this._tf.overflow=value;
		});

		/**
		*@copy laya.display.Text#underline
		*/
		/**
		*@copy laya.display.Text#underline
		*/
		__getset(0,__proto,'underline',function(){
			return this._tf.underline;
			},function(value){
			this._tf.underline=value;
		});

		/**
		*@copy laya.display.Text#underlineColor
		*/
		/**
		*@copy laya.display.Text#underlineColor
		*/
		__getset(0,__proto,'underlineColor',function(){
			return this._tf.underlineColor;
			},function(value){
			this._tf.underlineColor=value;
		});

		__static(Label,
		['_textReg',function(){return this._textReg=new RegExp("\\\\n","g");}
		]);
		return Label;
	})(Component)


	/**
	*<code>ProgressBar</code> 组件显示内容的加载进度。
	*@example 以下示例代码，创建了一个新的 <code>ProgressBar</code> 实例，设置了它的皮肤、位置、宽高、网格等信息，并添加到舞台上。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.ProgressBar;
		*import laya.utils.Handler;
		*public class ProgressBar_Example
		*{
			*private var progressBar:ProgressBar;
			*public function ProgressBar_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/progress.png","resource/ui/progress$bar.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*progressBar=new ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
				*progressBar.x=100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
				*progressBar.y=100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
				*progressBar.value=0.3;//设置 progressBar 的进度值。
				*progressBar.width=200;//设置 progressBar 的宽度。
				*progressBar.height=50;//设置 progressBar 的高度。
				*progressBar.sizeGrid="5,10,5,10";//设置 progressBar 的网格信息。
				*progressBar.changeHandler=new Handler(this,onChange);//设置 progressBar 的value值改变时执行的处理器。
				*Laya.stage.addChild(progressBar);//将 progressBar 添加到显示列表。
				*Laya.timer.once(3000,this,changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
				*}
			*private function changeValue():void
			*{
				*trace("改变进度条的进度值。");
				*progressBar.value=0.6;
				*}
			*private function onChange(value:Number):void
			*{
				*trace("进度发生改变： value=" ,value);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var res=["resource/ui/progress.png","resource/ui/progress$bar.png"];
	*Laya.loader.load(res,laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*function onLoadComplete()
	*{
		*progressBar=new laya.ui.ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
		*progressBar.x=100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
		*progressBar.y=100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
		*progressBar.value=0.3;//设置 progressBar 的进度值。
		*progressBar.width=200;//设置 progressBar 的宽度。
		*progressBar.height=50;//设置 progressBar 的高度。
		*progressBar.sizeGrid="10,5,10,5";//设置 progressBar 的网格信息。
		*progressBar.changeHandler=new laya.utils.Handler(this,onChange);//设置 progressBar 的value值改变时执行的处理器。
		*Laya.stage.addChild(progressBar);//将 progressBar 添加到显示列表。
		*Laya.timer.once(3000,this,changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
		*}
	*function changeValue()
	*{
		*console.log("改变进度条的进度值。");
		*progressBar.value=0.6;
		*}
	*function onChange(value)
	*{
		*console.log("进度发生改变： value=" ,value);
		*}
	*</listing>
	*<listing version="3.0">
	*import ProgressBar=laya.ui.ProgressBar;
	*import Handler=laya.utils.Handler;
	*class ProgressBar_Example {
		*private progressBar:ProgressBar;
		*public ProgressBar_Example(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/progress.png","resource/ui/progress$bar.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*this.progressBar=new ProgressBar("resource/ui/progress.png");//创建一个 ProgressBar 类的实例对象 progressBar 。
			*this.progressBar.x=100;//设置 progressBar 对象的属性 x 的值，用于控制 progressBar 对象的显示位置。
			*this.progressBar.y=100;//设置 progressBar 对象的属性 y 的值，用于控制 progressBar 对象的显示位置。
			*this.progressBar.value=0.3;//设置 progressBar 的进度值。
			*this.progressBar.width=200;//设置 progressBar 的宽度。
			*this.progressBar.height=50;//设置 progressBar 的高度。
			*this.progressBar.sizeGrid="5,10,5,10";//设置 progressBar 的网格信息。
			*this.progressBar.changeHandler=new Handler(this,this.onChange);//设置 progressBar 的value值改变时执行的处理器。
			*Laya.stage.addChild(this.progressBar);//将 progressBar 添加到显示列表。
			*Laya.timer.once(3000,this,this.changeValue);//设定 3000ms（毫秒）后，执行函数changeValue。
			*}
		*private changeValue():void {
			*console.log("改变进度条的进度值。");
			*this.progressBar.value=0.6;
			*}
		*private onChange(value:number):void {
			*console.log("进度发生改变： value=",value);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.ProgressBar extends laya.ui.Component
	var ProgressBar=(function(_super){
		function ProgressBar(skin){
			this.changeHandler=null;
			this._bg=null;
			this._bar=null;
			this._skin=null;
			this._value=0.5;
			ProgressBar.__super.call(this);
			this.skin=skin;
		}

		__class(ProgressBar,'laya.ui.ProgressBar',_super);
		var __proto=ProgressBar.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bg && this._bg.destroy(destroyChild);
			this._bar && this._bar.destroy(destroyChild);
			this._bg=this._bar=null;
			this.changeHandler=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._bg=new Image());
			this.addChild(this._bar=new Image());
			this._bar._bitmap.autoCacheCmd=false;
		}

		/**
		*@private
		*更改进度值的显示。
		*/
		__proto.changeValue=function(){
			if (this.sizeGrid){
				var grid=this.sizeGrid.split(",");
				var left=Number(grid[3]);
				var right=Number(grid[1]);
				var max=this.width-left-right;
				var sw=max *this._value;
				this._bar.width=left+right+sw;
				this._bar.visible=this._bar.width > left+right;
				}else {
				this._bar.width=this.width *this._value;
			}
		}

		/**@inheritDoc */
		__getset(0,__proto,'measureHeight',function(){
			return this._bg.height;
		});

		/**
		*@copy laya.ui.Image#skin
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._bg.skin=this._skin;
				this._bar.skin=this._skin.replace(".png","$bar.png");
				this.callLater(this.changeValue);
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'measureWidth',function(){
			return this._bg.width;
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bg.height=this._height;
			this._bar.height=this._height;
		});

		/**
		*获取进度条对象。
		*/
		__getset(0,__proto,'bar',function(){
			return this._bar;
		});

		/**
		*当前的进度量。
		*<p><b>取值：</b>介于0和1之间。</p>
		*/
		__getset(0,__proto,'value',function(){
			return this._value;
			},function(num){
			if (this._value !=num){
				num=num > 1 ? 1 :num < 0 ? 0 :num;
				this._value=num;
				this.callLater(this.changeValue);
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.changeHandler && this.changeHandler.runWith(num);
			}
		});

		/**
		*获取背景条对象。
		*/
		__getset(0,__proto,'bg',function(){
			return this._bg;
		});

		/**
		*<p>当前 <code>ProgressBar</code> 实例的进度条背景位图（ <code>Image</code> 实例）的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		__getset(0,__proto,'sizeGrid',function(){
			return this._bg.sizeGrid;
			},function(value){
			this._bg.sizeGrid=this._bar.sizeGrid=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bg.width=this._width;
			this.callLater(this.changeValue);
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='number')|| (typeof value=='string'))this.value=Number(value);
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return ProgressBar;
	})(Component)


	/**鼠标提示管理类*/
	//class laya.ui.TipManager extends laya.ui.Component
	var TipManager=(function(_super){
		function TipManager(){
			this._tipBox=null;
			this._tipText=null;
			this._defaultTipHandler=null;
			TipManager.__super.call(this);
			this._tipBox=new Component();
			this._tipBox.addChild(this._tipText=new Text());
			this._tipText.x=this._tipText.y=5;
			this._tipText.color=TipManager.tipTextColor;
			this._defaultTipHandler=this._showDefaultTip;
			Laya.stage.on(/*laya.ui.UIEvent.SHOW_TIP*/"showtip",this,this._onStageShowTip);
			Laya.stage.on(/*laya.ui.UIEvent.HIDE_TIP*/"hidetip",this,this._onStageHideTip);
		}

		__class(TipManager,'laya.ui.TipManager',_super);
		var __proto=TipManager.prototype;
		/**
		*@private
		*/
		__proto._onStageHideTip=function(e){
			Laya.timer.clear(this,this._showTip);
			this.closeAll();
			this.removeSelf();
		}

		/**
		*@private
		*/
		__proto._onStageShowTip=function(data){
			Laya.timer.once(TipManager.tipDelay,this,this._showTip,[data],true);
		}

		/**
		*@private
		*/
		__proto._showTip=function(tip){
			if ((typeof tip=='string')){
				var text=String(tip);
				if (Boolean(text)){
					this._defaultTipHandler(text);
				}
				}else if ((tip instanceof laya.utils.Handler )){
				(tip).run();
				}else if ((typeof tip=='function')){
				(tip).apply();
			}
			if (true){
				Laya.stage.on(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this._onStageMouseMove);
				Laya.stage.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._onStageMouseDown);
			}
			this._onStageMouseMove(null);
		}

		/**
		*@private
		*/
		__proto._onStageMouseDown=function(e){
			this.closeAll();
		}

		/**
		*@private
		*/
		__proto._onStageMouseMove=function(e){
			this._showToStage(this,TipManager.offsetX,TipManager.offsetY);
		}

		/**
		*@private
		*/
		__proto._showToStage=function(dis,offX,offY){
			(offX===void 0)&& (offX=0);
			(offY===void 0)&& (offY=0);
			var rec=dis.getBounds();
			dis.x=Laya.stage.mouseX+offX;
			dis.y=Laya.stage.mouseY+offY;
			if (dis.x+rec.width > Laya.stage.width){
				dis.x-=rec.width+offX;
			}
			if (dis.y+rec.height > Laya.stage.height){
				dis.y-=rec.height+offY;
			}
		}

		/**关闭所有鼠标提示*/
		__proto.closeAll=function(){
			Laya.timer.clear(this,this._showTip);
			Laya.stage.off(/*laya.events.Event.MOUSE_MOVE*/"mousemove",this,this._onStageMouseMove);
			Laya.stage.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._onStageMouseDown);
			this.removeChildren();
		}

		/**
		*显示显示对象类型的tip
		*/
		__proto.showDislayTip=function(tip){
			this.addChild(tip);
			this._showToStage(this);
			Laya.stageBox.addChild(this);
		}

		/**
		*@private
		*/
		__proto._showDefaultTip=function(text){
			this._tipText.text=text;
			var g=this._tipBox.graphics;
			g.clear();
			g.drawRect(0,0,this._tipText.width+10,this._tipText.height+10,TipManager.tipBackColor);
			this.addChild(this._tipBox);
			this._showToStage(this);
			Laya.stageBox.addChild(this);
		}

		/**默认鼠标提示函数*/
		__getset(0,__proto,'defaultTipHandler',function(){
			return this._defaultTipHandler;
			},function(value){
			this._defaultTipHandler=value;
		});

		TipManager.offsetX=10;
		TipManager.offsetY=15;
		TipManager.tipTextColor="#ffffff";
		TipManager.tipBackColor="#111111";
		TipManager.tipDelay=200;
		return TipManager;
	})(Component)


	/**
	*<code>HTMLImage</code> 用于创建 HTML Image 元素。
	*@private
	*/
	//class laya.resource.HTMLImage extends laya.resource.FileBitmap
	var HTMLImage=(function(_super){
		function HTMLImage(src,def){
			this._recreateLock=false;
			this._needReleaseAgain=false;
			HTMLImage.__super.call(this);
			this._init_(src,def);
		}

		__class(HTMLImage,'laya.resource.HTMLImage',_super);
		var __proto=HTMLImage.prototype;
		__proto._init_=function(src,def){
			this._src=src;
			this._source=new Browser.window.Image();
			if (def){
				def.onload && (this.onload=def.onload);
				def.onerror && (this.onerror=def.onerror);
				def.onCreate && def.onCreate(this);
			}
			if (src.indexOf("data:image")!=0)this._source.crossOrigin="";
			(src)&& (this._source.src=src);
		}

		/**
		*@inheritDoc
		*/
		__proto.recreateResource=function(){
			var _$this=this;
			if (this._src==="")
				throw new Error("src no null！");
			this._needReleaseAgain=false;
			if (!this._source){
				this._recreateLock=true;
				this.startCreate();
				var _this=this;
				this._source=new Browser.window.Image();
				this._source.crossOrigin="";
				this._source.onload=function (){
					if (_this._needReleaseAgain){
						_this._needReleaseAgain=false;
						_this._source.onload=null;
						_this._source=null;
						return;
					}
					_this._source.onload=null;
					_this.memorySize=_$this._w *_$this._h *4;
					_this._recreateLock=false;
					_this.completeCreate();
				};
				this._source.src=this._src;
				}else {
				if (this._recreateLock)
					return;
				this.startCreate();
				this.memorySize=this._w *this._h *4;
				this._recreateLock=false;
				this.completeCreate();
			}
		}

		/**
		*@inheritDoc
		*/
		__proto.detoryResource=function(){
			if (this._recreateLock)
				this._needReleaseAgain=true;
			(this._source)&& (this._source=null,this.memorySize=0);
		}

		/***调整尺寸。*/
		__proto.onresize=function(){
			this._w=this._source.width;
			this._h=this._source.height;
		}

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'onload',null,function(value){
			var _$this=this;
			this._onload=value;
			this._source && (this._source.onload=this._onload !=null ? (function(){
				_$this.onresize();
				_$this._onload();
			}):null);
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'onerror',null,function(value){
			var _$this=this;
			this._onerror=value;
			this._source && (this._source.onerror=this._onerror !=null ? (function(){
				_$this._onerror()
			}):null);
		});

		HTMLImage.create=function(src,def){
			return new HTMLImage(src,def);
		}

		return HTMLImage;
	})(FileBitmap)


	/**
	*IDE浮动面板扩展基类，实现类似属性面板的扩展，请继承此类
	*/
	//class laya.ide.plugin.PluginPanel extends laya.ui.Box
	var PluginPanel=(function(_super){
		function PluginPanel(){PluginPanel.__super.call(this);;
		};

		__class(PluginPanel,'laya.ide.plugin.PluginPanel',_super);
		var __proto=PluginPanel.prototype;
		/**
		*在IDE内显示
		*/
		__proto.show=function(){}
		/**
		*在IDE内关闭
		*/
		__proto.close=function(){}
		return PluginPanel;
	})(Box)


	/**
	*<code>View</code> 是一个视图类。
	*@internal <p><code>View</code></p>
	*/
	//class laya.ui.View extends laya.ui.Box
	var View=(function(_super){
		function View(){
			this._idMap=null;
			this._aniList=null;
			View.__super.call(this);
			if (this._width > 0 && !this.mouseThrough)this.hitTestPrior=true;
		}

		__class(View,'laya.ui.View',_super);
		var __proto=View.prototype;
		/**
		*@private
		*通过视图数据创建视图。
		*@param uiView 视图数据信息。
		*/
		__proto.createView=function(uiView){
			if (uiView.animations && !this._idMap)this._idMap={};
			View.createComp(uiView,this,this);
			if (uiView.animations){
				var anilist=[];
				var animations=uiView.animations;
				var i=0,len=animations.length;
				var tAni;
				var tAniO;
				for (i=0;i < len;i++){
					tAni=new FrameClip();
					tAniO=animations[i];
					tAni._setUp(this._idMap,tAniO);
					this[tAniO.name]=tAni;
					tAni._setControlNode(this);
					switch (tAniO.action){
						case 1:
							tAni.play(0,false);
							break ;
						case 2:
							tAni.play(0,true);
							break ;
						}
					anilist.push(tAni);
				}
				this._aniList=anilist;
			}
		}

		/**
		*@private
		*装载UI视图。用于加载模式。
		*@param path UI资源地址。
		*/
		__proto.loadUI=function(path){
			var uiView=View.uiMap[path];
			uiView && this.createView(uiView);
		}

		View._regs=function(){
			var key;
			for (key in View.uiClassMap){
				ClassUtils.regClass(key,View.uiClassMap[key]);
			}
		}

		View.createComp=function(uiView,comp,view){
			comp=comp || View.getCompInstance(uiView);
			if (!comp){
				console.log("can not create:"+uiView.type);
				return null;
			};
			var child=uiView.child;
			if (child){
				for (var i=0,n=child.length;i < n;i++){
					var node=child[i];
					if (comp.hasOwnProperty("itemRender")&& (node.props.name=="render" || node.props.renderType==="render")){
						(comp).itemRender=node;
						}else if (node.type=="Graphic"){
						ClassUtils.addGraphicsToSprite(node,comp);
						}else if (ClassUtils.isDrawType(node.type)){
						ClassUtils.addGraphicToSprite(node,comp,true);
						}else {
						var tChild=View.createComp(node,null,view);
						if (node.type=="Script"){
							tChild["owner"]=comp;
							}else if (node.props.renderType=="mask" || node.props.name=="mask"){
							comp.mask=tChild;
							}else {(
							tChild instanceof laya.display.Sprite )&& comp.addChild(tChild);
						}
					}
				}
			};
			var props=uiView.props;
			for (var prop in props){
				var value=props[prop];
				View.setCompValue(comp,prop,value,view);
			}
			if (Laya.__typeof(comp,'laya.ui.IItem'))(comp).initItems();
			if (uiView.compId && view && view._idMap){
				view._idMap[uiView.compId]=comp;
			}
			return comp;
		}

		View.setCompValue=function(comp,prop,value,view){
			if (prop==="var" && view){
				view[value]=comp;
			}
			else if (prop==="x" || prop==="y" || prop==="width" || prop==="height" || (typeof (comp[prop])=='number')){
				comp[prop]=parseFloat(value);
			}
			else {
				comp[prop]=(value==="true" ? true :(value==="false" ? false :value))
			}
		}

		View.getCompInstance=function(json){
			var runtime=json.props ? json.props.runtime :"";
			var compClass;
			compClass=runtime ? (View.viewClassMap[runtime] || View.uiClassMap[runtime]|| Laya["__classmap"][runtime]):View.uiClassMap[json.type];
			return compClass ? new compClass():null;
		}

		View.regComponent=function(key,compClass){
			View.uiClassMap[key]=compClass;
			ClassUtils.regClass(key,compClass);
		}

		View.regViewRuntime=function(key,compClass){
			View.viewClassMap[key]=compClass;
		}

		View.uiMap={};
		View.viewClassMap={};
		__static(View,
		['uiClassMap',function(){return this.uiClassMap={"ViewStack":ViewStack,"LinkButton":Button,"TextArea":TextArea,"ColorPicker":ColorPicker,"Box":Box,"Button":Button,"CheckBox":CheckBox,"Clip":Clip,"ComboBox":ComboBox,"Component":Component,"HScrollBar":HScrollBar,"HSlider":HSlider,"Image":Image,"Label":Label,"List":List,"Panel":Panel,"ProgressBar":ProgressBar,"Radio":Radio,"RadioGroup":RadioGroup,"ScrollBar":ScrollBar,"Slider":Slider,"Tab":Tab,"TextInput":TextInput,"View":View,"VScrollBar":VScrollBar,"VSlider":VSlider,"Tree":Tree,"HBox":HBox,"VBox":VBox,"Sprite":Sprite,"Animation":Animation,"Text":Text};}
		]);
		View.__init$=function(){
			View._regs();
		}

		return View;
	})(Box)


	/**
	*@private
	*/
	//class laya.display.GraphicAnimation extends laya.display.FrameAnimation
	var GraphicAnimation=(function(_super){
		function GraphicAnimation(){
			this.animationList=null;
			this.animationDic=null;
			this._nodeList=null;
			this._nodeDefaultProps=null;
			this._gList=null;
			this._nodeIDAniDic={};
			GraphicAnimation.__super.call(this);
		}

		__class(GraphicAnimation,'laya.display.GraphicAnimation',_super);
		var __proto=GraphicAnimation.prototype;
		/**
		*@private
		*/
		__proto._parseNodeList=function(uiView){
			if (!this._nodeList){
				this._nodeList=[];
			}
			this._nodeDefaultProps[uiView.compId]=uiView.props;
			if (uiView.compId)
				this._nodeList.push(uiView.compId);
			var childs=uiView.child;
			if (childs){
				var i=0,len=childs.length;
				for (i=0;i < len;i++){
					this._parseNodeList(childs[i]);
				}
			}
		}

		/**
		*@private
		*/
		__proto._calGraphicData=function(aniData){
			this._setUp(null,aniData);
			this._createGraphicData();
		}

		/**
		*@private
		*/
		__proto._createGraphicData=function(){
			var gList=[];
			var i=0,len=this.count;
			for (i=0;i < len;i++){
				gList.push(this._createFrameGraphic(i));
			}
			this._gList=gList;
		}

		/**
		*@private
		*/
		__proto._createFrameGraphic=function(frame){
			var g=new Graphics();
			var i=0,len=this._nodeList.length;
			var tNode=0;
			for (i=0;i < len;i++){
				tNode=this._nodeList[i];
				this._addNodeGraphic(tNode,g,frame);
			}
			return g;
		}

		/**
		*@private
		*/
		__proto._calculateNodeKeyFrames=function(node){
			_super.prototype._calculateNodeKeyFrames.call(this,node);
			this._nodeIDAniDic[node.target]=node;
		}

		/**
		*@private
		*/
		__proto.getNodeDataByID=function(nodeID){
			return this._nodeIDAniDic[nodeID];
		}

		/**
		*@private
		*/
		__proto._getParams=function(obj,params,frame,obj2){
			var rst=GraphicAnimation._temParam;
			rst.length=params.length;
			var i=0,len=params.length;
			for (i=0;i < len;i++){
				rst[i]=this._getObjVar(obj,params[i][0],frame,params[i][1],obj2);
			}
			return rst;
		}

		/**
		*@private
		*/
		__proto._getObjVar=function(obj,key,frame,noValue,obj2){
			if (obj.hasOwnProperty(key)){
				var vArr=obj[key];
				if (frame >=vArr.length)
					frame=vArr.length-1;
				return obj[key][frame];
			}
			if (obj2.hasOwnProperty(key)){
				return obj2[key];
			}
			return noValue;
		}

		/**
		*@private
		*/
		__proto._addNodeGraphic=function(nodeID,g,frame){
			var node=this.getNodeDataByID(nodeID);
			if (!node)
				return;
			var frameData=node.frames;
			var params=this._getParams(frameData,GraphicAnimation._drawTextureCmd,frame,this._nodeDefaultProps[nodeID]);
			var url=params[0];
			if (!url)return;
			params[0]=this._getTextureByUrl(url);
			if (!params[0]){
				console.log("lost:",url);
				throw new Error("texture not loaded:"+url);
				return;
			};
			var m;
			var px=params[5],py=params[6];
			if (px !=0 || py !=0){
				m=m || new Matrix();
				m.translate(-px,-py);
			};
			var sx=params[7],sy=params[8];
			var rotate=params[9];
			if (sx !=1 || sy !=1 || rotate !=0){
				m=m || new Matrix();
				m.scale(sx,sy);
				m.rotate(rotate *0.0174532922222222);
			}
			if (m){
				m.translate(params[1],params[2]);
				params[1]=params[2]=0;
			}
			g.drawTexture(params[0],params[1],params[2],params[3],params[4],m);
		}

		/**
		*@private
		*/
		__proto._getTextureByUrl=function(url){
			return Loader.getRes(url);
		}

		/**
		*@private
		*/
		__proto.setAniData=function(uiView){
			if (uiView.animations){
				this._nodeDefaultProps={};
				if (this._nodeList)this._nodeList.length=0;
				this._parseNodeList(uiView);
				var aniDic={};
				var anilist=[];
				var animations=uiView.animations;
				var i=0,len=animations.length;
				var tAniO;
				for (i=0;i < len;i++){
					tAniO=animations[i];
					try{
						this._calGraphicData(tAniO);
						}catch (e){
						console.log("parse animation fail:"+tAniO.name+",empty animation created");
						this._gList=[];
					}
					anilist.push(this._gList);
					aniDic[tAniO.name]=this._gList;
				}
				this.animationList=anilist;
				this.animationDic=aniDic;
			}
			GraphicAnimation._temParam.length=0;
		}

		/**
		*@private
		*/
		__proto._clear=function(){
			this.animationList=null;
			this.animationDic=null;
			this._gList=null;
		}

		GraphicAnimation.parseAnimationData=function(aniData){
			if (!GraphicAnimation._I)
				GraphicAnimation._I=new GraphicAnimation();
			GraphicAnimation._I.setAniData(aniData);
			var rst;
			rst={};
			rst.animationList=GraphicAnimation._I.animationList;
			rst.animationDic=GraphicAnimation._I.animationDic;
			GraphicAnimation._I._clear();
			return rst;
		}

		GraphicAnimation._temParam=[];
		GraphicAnimation._I=null
		__static(GraphicAnimation,
		['_drawTextureCmd',function(){return this._drawTextureCmd=[["skin",null],["x",0],["y",0],["width",0],["height",0],["pivotX",0],["pivotY",0],["scaleX",1],["scaleY",1],["rotation",0]];}
		]);
		return GraphicAnimation;
	})(FrameAnimation)


	/**
	*<code>Group</code> 是一个可以自动布局的项集合控件。
	*<p> <code>Group</code> 的默认项对象为 <code>Button</code> 类实例。
	*<code>Group</code> 是 <code>Tab</code> 和 <code>RadioGroup</code> 的基类。</p>
	*/
	//class laya.ui.Group extends laya.ui.Box
	var Group=(function(_super){
		function Group(labels,skin){
			this.selectHandler=null;
			this._items=null;
			this._selectedIndex=-1;
			this._skin=null;
			this._direction="horizontal";
			this._space=0;
			this._labels=null;
			this._labelColors=null;
			this._labelStrokeColor=null;
			this._strokeColors=null;
			this._labelStroke=NaN;
			this._labelSize=0;
			this._labelBold=false;
			this._labelPadding=null;
			this._labelAlign=null;
			this._stateNum=0;
			this._labelChanged=false;
			Group.__super.call(this);
			this.skin=skin;
			this.labels=labels;
		}

		__class(Group,'laya.ui.Group',_super);
		var __proto=Group.prototype;
		Laya.imps(__proto,{"laya.ui.IItem":true})
		/**@inheritDoc */
		__proto.preinitialize=function(){
			this.mouseEnabled=true;
		}

		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._items && (this._items.length=0);
			this._items=null;
			this.selectHandler=null;
		}

		/**
		*添加一个项对象，返回此项对象的索引id。
		*
		*@param item 需要添加的项对象。
		*@param autoLayOut 是否自动布局，如果为true，会根据 <code>direction</code> 和 <code>space</code> 属性计算item的位置。
		*@return
		*/
		__proto.addItem=function(item,autoLayOut){
			(autoLayOut===void 0)&& (autoLayOut=true);
			var display=item;
			var index=this._items.length;
			display.name="item"+index;
			this.addChild(display);
			this.initItems();
			if (autoLayOut && index > 0){
				var preItem=this._items [index-1];
				if (this._direction=="horizontal"){
					display.x=preItem.x+preItem.width+this._space;
					}else {
					display.y=preItem.y+preItem.height+this._space;
				}
				}else {
				if (autoLayOut){
					display.x=0;
					display.y=0;
				}
			}
			return index;
		}

		/**
		*删除一个项对象。
		*@param item 需要删除的项对象。
		*@param autoLayOut 是否自动布局，如果为true，会根据 <code>direction</code> 和 <code>space</code> 属性计算item的位置。
		*/
		__proto.delItem=function(item,autoLayOut){
			(autoLayOut===void 0)&& (autoLayOut=true);
			var index=this._items.indexOf(item);
			if (index !=-1){
				var display=item;
				this.removeChild(display);
				for (var i=index+1,n=this._items.length;i < n;i++){
					var child=this._items [i];
					child.name="item"+(i-1);
					if (autoLayOut){
						if (this._direction=="horizontal"){
							child.x-=display.width+this._space;
							}else {
							child.y-=display.height+this._space;
						}
					}
				}
				this.initItems();
				if (this._selectedIndex >-1){
					var newIndex=0;
					newIndex=this._selectedIndex < this._items.length ? this._selectedIndex :(this._selectedIndex-1);
					this._selectedIndex=-1;
					this.selectedIndex=newIndex;
				}
			}
		}

		/**
		*初始化项对象们。
		*/
		__proto.initItems=function(){
			this._items || (this._items=[]);
			this._items.length=0;
			for (var i=0;i < 10000;i++){
				var item=this.getChildByName("item"+i);
				if (item==null)break ;
				this._items.push(item);
				item.selected=(i===this._selectedIndex);
				item.clickHandler=Handler.create(this,this.itemClick,[i],false);
			}
		}

		/**
		*@private
		*项对象的点击事件侦听处理函数。
		*@param index 项索引。
		*/
		__proto.itemClick=function(index){
			this.selectedIndex=index;
		}

		/**
		*@private
		*通过对象的索引设置项对象的 <code>selected</code> 属性值。
		*@param index 需要设置的项对象的索引。
		*@param selected 表示项对象的选中状态。
		*/
		__proto.setSelect=function(index,selected){
			if (this._items && index >-1 && index < this._items.length)this._items[index].selected=selected;
		}

		/**
		*@private
		*创建一个项显示对象。
		*@param skin 项对象的皮肤。
		*@param label 项对象标签。
		*/
		__proto.createItem=function(skin,label){
			return null;
		}

		/**
		*@private
		*更改项对象的属性值。
		*/
		__proto.changeLabels=function(){
			this._labelChanged=false;
			if (this._items){
				var left=0
				for (var i=0,n=this._items.length;i < n;i++){
					var btn=this._items [i];
					this._skin && (btn.skin=this._skin);
					this._labelColors && (btn.labelColors=this._labelColors);
					this._labelSize && (btn.labelSize=this._labelSize);
					this._labelStroke && (btn.labelStroke=this._labelStroke);
					this._labelStrokeColor && (btn.labelStrokeColor=this._labelStrokeColor);
					this._strokeColors && (btn.strokeColors=this._strokeColors);
					this._labelBold && (btn.labelBold=this._labelBold);
					this._labelPadding && (btn.labelPadding=this._labelPadding);
					this._labelAlign && (btn.labelAlign=this._labelAlign);
					this._stateNum && (btn.stateNum=this._stateNum);
					if (this._direction==="horizontal"){
						btn.y=0;
						btn.x=left;
						left+=btn.width+this._space;
						}else {
						btn.x=0;
						btn.y=left;
						left+=btn.height+this._space;
					}
				}
			}
			this.changeSize();
		}

		/**@inheritDoc */
		__proto.commitMeasure=function(){
			this.runCallLater(this.changeLabels);
		}

		/**@private */
		__proto._setLabelChanged=function(){
			if (!this._labelChanged){
				this._labelChanged=true;
				this.callLater(this.changeLabels);
			}
		}

		/**
		*<p>描边颜色，以字符串表示。</p>
		*默认值为 "#000000"（黑色）;
		*@see laya.display.Text.strokeColor()
		*/
		__getset(0,__proto,'labelStrokeColor',function(){
			return this._labelStrokeColor;
			},function(value){
			if (this._labelStrokeColor !=value){
				this._labelStrokeColor=value;
				this._setLabelChanged();
			}
		});

		/**
		*@copy laya.ui.Image#skin
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._setLabelChanged();
			}
		});

		/**
		*表示当前选择的项索引。默认值为-1。
		*/
		__getset(0,__proto,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this.setSelect(this._selectedIndex,false);
				this._selectedIndex=value;
				this.setSelect(value,true);
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.selectHandler && this.selectHandler.runWith(this._selectedIndex);
			}
		});

		/**
		*标签集合字符串。以逗号做分割，如"item0,item1,item2,item3,item4,item5"。
		*/
		__getset(0,__proto,'labels',function(){
			return this._labels;
			},function(value){
			if (this._labels !=value){
				this._labels=value;
				this.removeChildren();
				this._setLabelChanged();
				if (this._labels){
					var a=this._labels.split(",");
					for (var i=0,n=a.length;i < n;i++){
						var item=this.createItem(this._skin,a[i]);
						item.name="item"+i;
						this.addChild(item);
					}
				}
				this.initItems();
			}
		});

		/**
		*<p>表示各个状态下的描边颜色。</p>
		*@see laya.display.Text.strokeColor()
		*/
		__getset(0,__proto,'strokeColors',function(){
			return this._strokeColors;
			},function(value){
			if (this._strokeColors !=value){
				this._strokeColors=value;
				this._setLabelChanged();
			}
		});

		/**
		*@copy laya.ui.Button#labelColors()
		*/
		__getset(0,__proto,'labelColors',function(){
			return this._labelColors;
			},function(value){
			if (this._labelColors !=value){
				this._labelColors=value;
				this._setLabelChanged();
			}
		});

		/**
		*<p>描边宽度（以像素为单位）。</p>
		*默认值0，表示不描边。
		*@see laya.display.Text.stroke()
		*/
		__getset(0,__proto,'labelStroke',function(){
			return this._labelStroke;
			},function(value){
			if (this._labelStroke !=value){
				this._labelStroke=value;
				this._setLabelChanged();
			}
		});

		/**
		*表示按钮文本标签的字体大小。
		*/
		__getset(0,__proto,'labelSize',function(){
			return this._labelSize;
			},function(value){
			if (this._labelSize !=value){
				this._labelSize=value;
				this._setLabelChanged();
			}
		});

		/**
		*表示按钮文本标签的字体大小。
		*/
		__getset(0,__proto,'stateNum',function(){
			return this._stateNum;
			},function(value){
			if (this._stateNum !=value){
				this._stateNum=value;
				this._setLabelChanged();
			}
		});

		/**
		*表示按钮文本标签是否为粗体字。
		*/
		__getset(0,__proto,'labelBold',function(){
			return this._labelBold;
			},function(value){
			if (this._labelBold !=value){
				this._labelBold=value;
				this._setLabelChanged();
			}
		});

		/**
		*表示按钮文本标签的边距。
		*<p><b>格式：</b>"上边距,右边距,下边距,左边距"。</p>
		*/
		__getset(0,__proto,'labelPadding',function(){
			return this._labelPadding;
			},function(value){
			if (this._labelPadding !=value){
				this._labelPadding=value;
				this._setLabelChanged();
			}
		});

		/**
		*布局方向。
		*<p>默认值为"horizontal"。</p>
		*<p><b>取值：</b>
		*<li>"horizontal"：表示水平布局。</li>
		*<li>"vertical"：表示垂直布局。</li>
		*</p>
		*/
		__getset(0,__proto,'direction',function(){
			return this._direction;
			},function(value){
			this._direction=value;
			this._setLabelChanged();
		});

		/**
		*项对象们之间的间隔（以像素为单位）。
		*/
		__getset(0,__proto,'space',function(){
			return this._space;
			},function(value){
			this._space=value;
			this._setLabelChanged();
		});

		/**
		*项对象们的存放数组。
		*/
		__getset(0,__proto,'items',function(){
			return this._items;
		});

		/**
		*获取或设置当前选择的项对象。
		*/
		__getset(0,__proto,'selection',function(){
			return this._selectedIndex >-1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._items.indexOf(value);
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.selectedIndex=parseInt(value);
			else if ((value instanceof Array))this.labels=(value).join(",");
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return Group;
	})(Box)


	/**
	*<code>LayoutBox</code> 是一个布局容器类。
	*/
	//class laya.ui.LayoutBox extends laya.ui.Box
	var LayoutBox=(function(_super){
		function LayoutBox(){
			this._space=0;
			this._align="none";
			this._itemChanged=false;
			LayoutBox.__super.call(this);
		}

		__class(LayoutBox,'laya.ui.LayoutBox',_super);
		var __proto=LayoutBox.prototype;
		/**@inheritDoc */
		__proto.addChild=function(child){
			child.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setItemChanged();
			return laya.display.Node.prototype.addChild.call(this,child);
		}

		__proto.onResize=function(e){
			this._setItemChanged();
		}

		/**@inheritDoc */
		__proto.addChildAt=function(child,index){
			child.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setItemChanged();
			return laya.display.Node.prototype.addChildAt.call(this,child,index);
		}

		/**@inheritDoc */
		__proto.removeChild=function(child){
			child.off(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setItemChanged();
			return laya.display.Node.prototype.removeChild.call(this,child);
		}

		/**@inheritDoc */
		__proto.removeChildAt=function(index){
			this.getChildAt(index).off(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setItemChanged();
			return laya.display.Node.prototype.removeChildAt.call(this,index);
		}

		/**刷新。*/
		__proto.refresh=function(){
			this._setItemChanged();
		}

		/**
		*改变子对象的布局。
		*/
		__proto.changeItems=function(){
			this._itemChanged=false;
		}

		/**
		*排序项目列表。可通过重写改变默认排序规则。
		*@param items 项目列表。
		*/
		__proto.sortItem=function(items){
			if (items)items.sort(function(a,b){return a.y > b.y ? 1 :-1
			});
		}

		__proto._setItemChanged=function(){
			if (!this._itemChanged){
				this._itemChanged=true;
				this.callLater(this.changeItems);
			}
		}

		/**子对象的间隔。*/
		__getset(0,__proto,'space',function(){
			return this._space;
			},function(value){
			this._space=value;
			this._setItemChanged();
		});

		/**子对象对齐方式。*/
		__getset(0,__proto,'align',function(){
			return this._align;
			},function(value){
			this._align=value;
			this._setItemChanged();
		});

		return LayoutBox;
	})(Box)


	/**
	*<code>List</code> 控件可显示项目列表。默认为垂直方向列表。可通过UI编辑器自定义列表。
	*
	*@example 以下示例代码，创建了一个 <code>List</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.List;
		*import laya.utils.Handler;
		*public class List_Example
		*{
			*public function List_Example()
			*{
				*Laya.init(640,800,"false");//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"],Handler.create(this,onLoadComplete));
				*}
			*private function onLoadComplete():void
			*{
				*var arr:Array=[];//创建一个数组，用于存贮列表的数据信息。
				*for (var i:int=0;i &lt;20;i++)
				*{
					*arr.push({label:"item"+i});
					*}
				*var list:List=new List();//创建一个 List 类的实例对象 list 。
				*list.itemRender=Item;//设置 list 的单元格渲染器。
				*list.repeatX=1;//设置 list 的水平方向单元格数量。
				*list.repeatY=10;//设置 list 的垂直方向单元格数量。
				*list.vScrollBarSkin="resource/ui/vscroll.png";//设置 list 的垂直方向滚动条皮肤。
				*list.array=arr;//设置 list 的列表数据源。
				*list.pos(100,100);//设置 list 的位置。
				*list.selectEnable=true;//设置 list 可选。
				*list.selectHandler=new Handler(this,onSelect);//设置 list 改变选择项执行的处理器。
				*Laya.stage.addChild(list);//将 list 添加到显示列表。
				*}
			*private function onSelect(index:int):void
			*{
				*trace("当前选择的项目索引： index= ",index);
				*}
			*}
		*}
	*import laya.ui.Box;
	*import laya.ui.Label;
	*class Item extends Box
	*{
		*public function Item()
		*{
			*graphics.drawRect(0,0,100,20,null,"#ff0000");
			*var label:Label=new Label();
			*label.text="100000";
			*label.name="label";//设置 label 的name属性值。
			*label.size(100,20);
			*addChild(label);
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*(function (_super){
		*function Item(){
			*Item.__super.call(this);//初始化父类
			*this.graphics.drawRect(0,0,100,20,"#ff0000");
			*var label=new laya.ui.Label();//创建一个 Label 类的实例对象 label 。
			*label.text="100000";//设置 label 的文本内容。
			*label.name="label";//设置 label 的name属性值。
			*label.size(100,20);//设置 label 的宽度、高度。
			*this.addChild(label);//将 label 添加到显示列表。
			*};
		*Laya.class(Item,"mypackage.listExample.Item",_super);//注册类 Item 。
		*})(laya.ui.Box);
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
	*var res=["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"];
	*Laya.loader.load(res,new laya.utils.Handler(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*var arr=[];//创建一个数组，用于存贮列表的数据信息。
		*for (var i=0;i &lt;20;i++){
			*arr.push({label:"item"+i});
			*}
		*var list=new laya.ui.List();//创建一个 List 类的实例对象 list 。
		*list.itemRender=mypackage.listExample.Item;//设置 list 的单元格渲染器。
		*list.repeatX=1;//设置 list 的水平方向单元格数量。
		*list.repeatY=10;//设置 list 的垂直方向单元格数量。
		*list.vScrollBarSkin="resource/ui/vscroll.png";//设置 list 的垂直方向滚动条皮肤。
		*list.array=arr;//设置 list 的列表数据源。
		*list.pos(100,100);//设置 list 的位置。
		*list.selectEnable=true;//设置 list 可选。
		*list.selectHandler=new laya.utils.Handler(this,onSelect);//设置 list 改变选择项执行的处理器。
		*Laya.stage.addChild(list);//将 list 添加到显示列表。
		*}
	*function onSelect(index)
	*{
		*console.log("当前选择的项目索引： index= ",index);
		*}
	*
	*</listing>
	*<listing version="3.0">
	*import List=laya.ui.List;
	*import Handler=laya.utils.Handler;
	*public class List_Example {
		*public List_Example(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"],Handler.create(this,this.onLoadComplete));
			*}
		*private onLoadComplete():void {
			*var arr=[];//创建一个数组，用于存贮列表的数据信息。
			*for (var i:number=0;i &lt;20;i++)
			*{
				*arr.push({label:"item"+i });
				*}
			*var list:List=new List();//创建一个 List 类的实例对象 list 。
			*list.itemRender=Item;//设置 list 的单元格渲染器。
			*list.repeatX=1;//设置 list 的水平方向单元格数量。
			*list.repeatY=10;//设置 list 的垂直方向单元格数量。
			*list.vScrollBarSkin="resource/ui/vscroll.png";//设置 list 的垂直方向滚动条皮肤。
			*list.array=arr;//设置 list 的列表数据源。
			*list.pos(100,100);//设置 list 的位置。
			*list.selectEnable=true;//设置 list 可选。
			*list.selectHandler=new Handler(this,this.onSelect);//设置 list 改变选择项执行的处理器。
			*Laya.stage.addChild(list);//将 list 添加到显示列表。
			*}
		*private onSelect(index:number):void {
			*console.log("当前选择的项目索引： index= ",index);
			*}
		*}
	*import Box=laya.ui.Box;
	*import Label=laya.ui.Label;
	*class Item extends Box {
		*constructor(){
			*this.graphics.drawRect(0,0,100,20,null,"#ff0000");
			*var label:Label=new Label();
			*label.text="100000";
			*label.name="label";//设置 label 的name属性值。
			*label.size(100,20);
			*this.addChild(label);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.List extends laya.ui.Box
	var List=(function(_super){
		function List(){
			this.selectHandler=null;
			this.renderHandler=null;
			this.mouseHandler=null;
			this.selectEnable=false;
			this.totalPage=0;
			this._content=null;
			this._scrollBar=null;
			this._itemRender=null;
			this._repeatX=0;
			this._repeatY=0;
			this._repeatX2=0;
			this._repeatY2=0;
			this._spaceX=0;
			this._spaceY=0;
			this._array=null;
			this._startIndex=0;
			this._selectedIndex=-1;
			this._page=0;
			this._isVertical=true;
			this._cellSize=20;
			this._cellOffset=0;
			this._isMoved=false;
			this.cacheContent=false;
			this._createdLine=0;
			this._cellChanged=false;
			List.__super.call(this);
			this._cells=[];
		}

		__class(List,'laya.ui.List',_super);
		var __proto=List.prototype;
		Laya.imps(__proto,{"laya.ui.IRender":true,"laya.ui.IItem":true})
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._content && this._content.destroy(destroyChild);
			this._scrollBar && this._scrollBar.destroy(destroyChild);
			this._content=null;
			this._scrollBar=null;
			this._itemRender=null;
			this._cells=null;
			this._array=null;
			this.selectHandler=this.renderHandler=this.mouseHandler=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._content=new Box());
		}

		__proto.onScrollStart=function(){
			this._$P.cacheAs || (this._$P.cacheAs=_super.prototype._$get_cacheAs.call(this));
			_super.prototype._$set_cacheAs.call(this,"none");
			this._scrollBar.once(/*laya.events.Event.END*/"end",this,this.onScrollEnd);
		}

		__proto.onScrollEnd=function(){
			_super.prototype._$set_cacheAs.call(this,this._$P.cacheAs);
		}

		/**
		*@private
		*更改单元格的信息。
		*@internal 在此销毁、创建单元格，并设置单元格的位置等属性。相当于此列表内容发送改变时调用此函数。
		*/
		__proto.changeCells=function(){
			this._cellChanged=false;
			if (this._itemRender){
				for (var i=this._cells.length-1;i >-1;i--){
					this._cells[i].destroy();
				}
				this._cells.length=0;
				this.scrollBar=this.getChildByName("scrollBar");
				var cell=this.createItem();
				var cellWidth=(cell.width+this._spaceX)|| 1;
				var cellHeight=(cell.height+this._spaceY)|| 1;
				if (this._width > 0)this._repeatX2=this._isVertical ? Math.round(this._width / cellWidth):Math.ceil(this._width / cellWidth);
				if (this._height > 0)this._repeatY2=this._isVertical ? Math.ceil(this._height / cellHeight):Math.round(this._height / cellHeight);
				var listWidth=this._width ? this._width :(cellWidth *this.repeatX-this._spaceX);
				var listHeight=this._height ? this._height :(cellHeight *this.repeatY-this._spaceY);
				this._cellSize=this._isVertical ? cellHeight :cellWidth;
				this._cellOffset=this._isVertical ? (cellHeight *Math.max(this._repeatY2,this._repeatY)-listHeight-this._spaceY):(cellWidth *Math.max(this._repeatX2,this._repeatX)-listWidth-this._spaceX);
				if (this._isVertical && this._scrollBar)this._scrollBar.height=listHeight;
				else if (!this._isVertical && this._scrollBar)this._scrollBar.width=listWidth;
				this.setContentSize(listWidth,listHeight);
				var numX=this._isVertical ? this.repeatX :this.repeatY;
				var numY=(this._isVertical ? this.repeatY :this.repeatX)+(this._scrollBar ? 1 :0);
				this._createItems(0,numX,numY);
				this._createdLine=numY;
				if (this._array){
					this.array=this._array;
					this.runCallLater(this.renderItems);
				}
			}
		}

		__proto._createItems=function(startY,numX,numY){
			var box=this._content;
			var cell=this.createItem();
			var cellWidth=cell.width+this._spaceX;
			var cellHeight=cell.height+this._spaceY;
			if (this.cacheContent){
				var cacheBox=new Box();
				cacheBox.cacheAsBitmap=true;
				cacheBox.pos((this._isVertical ? 0 :startY)*cellWidth,(this._isVertical ? startY :0)*cellHeight);
				this._content.addChild(cacheBox);
				this._content.optimizeScrollRect=true;
				box=cacheBox;
			}
			for (var k=startY;k < numY;k++){
				for (var l=0;l < numX;l++){
					cell=this.createItem();
					cell.x=(this._isVertical ? l :k)*cellWidth-box.x;
					cell.y=(this._isVertical ? k :l)*cellHeight-box.y;
					cell.name="item"+(k *numX+l);
					box.addChild(cell);
					this.addCell(cell);
				}
			}
		}

		__proto.createItem=function(){
			return (typeof this._itemRender=='function')? new this._itemRender():View.createComp(this._itemRender);
		}

		/**
		*@private
		*添加单元格。
		*@param cell 需要添加的单元格对象。
		*/
		__proto.addCell=function(cell){
			cell.on(/*laya.events.Event.CLICK*/"click",this,this.onCellMouse);
			cell.on(/*laya.events.Event.RIGHT_CLICK*/"rightclick",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_OVER*/"mouseover",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_OUT*/"mouseout",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onCellMouse);
			cell.on(/*laya.events.Event.MOUSE_UP*/"mouseup",this,this.onCellMouse);
			this._cells.push(cell);
		}

		/**
		*初始化单元格信息。
		*/
		__proto.initItems=function(){
			if (!this._itemRender && this.getChildByName("item0")!=null){
				this.repeatX=1;
				var count=0;
				count=0;
				for (var i=0;i < 10000;i++){
					var cell=this.getChildByName("item"+i);
					if (cell){
						this.addCell(cell);
						count++;
						continue ;
					}
					break ;
				}
				this.repeatY=count;
			}
		}

		/**
		*设置可视区域大小。
		*<p>以（0，0，width参数，height参数）组成的矩形区域为可视区域。</p>
		*@param width 可视区域宽度。
		*@param height 可视区域高度。
		*/
		__proto.setContentSize=function(width,height){
			this._content.width=width;
			this._content.height=height;
			if (this._scrollBar){
				this._content.scrollRect || (this._content.scrollRect=new Rectangle());
				this._content.scrollRect.setTo(0,0,width,height);
				this._content.model && this._content.model.scrollRect(0,0,width,height);
				this.event(/*laya.events.Event.RESIZE*/"resize");
			}
		}

		/**
		*@private
		*单元格的鼠标事件侦听处理函数。
		*/
		__proto.onCellMouse=function(e){
			if (e.type===/*laya.events.Event.MOUSE_DOWN*/"mousedown")this._isMoved=false;
			var cell=e.currentTarget;
			var index=this._startIndex+this._cells.indexOf(cell);
			if (index < 0)return;
			if (e.type===/*laya.events.Event.CLICK*/"click" || e.type===/*laya.events.Event.RIGHT_CLICK*/"rightclick"){
				if (this.selectEnable && !this._isMoved)this.selectedIndex=index;
				else this.changeCellState(cell,true,0);
				}else if ((e.type===/*laya.events.Event.MOUSE_OVER*/"mouseover" || e.type===/*laya.events.Event.MOUSE_OUT*/"mouseout")&& this._selectedIndex!==index){
				this.changeCellState(cell,e.type===/*laya.events.Event.MOUSE_OVER*/"mouseover",0);
			}
			this.mouseHandler && this.mouseHandler.runWith([e,index]);
		}

		/**
		*@private
		*改变单元格的可视状态。
		*@param cell 单元格对象。
		*@param visable 是否显示。
		*@param index 单元格的属性 <code>index</code> 值。
		*/
		__proto.changeCellState=function(cell,visable,index){
			var selectBox=cell.getChildByName("selectBox");
			if (selectBox){
				this.selectEnable=true;
				selectBox.visible=visable;
				selectBox.index=index;
			}
		}

		/**@inheritDoc */
		__proto.changeSize=function(){
			laya.ui.Component.prototype.changeSize.call(this);
			this.setContentSize(this.width,this.height);
			if (this._scrollBar)
				Laya.timer.once(10,this,this.onScrollBarChange);
		}

		/**
		*@private
		*滚动条的 <code>Event.CHANGE</code> 事件侦听处理函数。
		*/
		__proto.onScrollBarChange=function(e){
			this.runCallLater(this.changeCells);
			var scrollValue=this._scrollBar.value;
			var lineX=(this._isVertical ? this.repeatX :this.repeatY);
			var lineY=(this._isVertical ? this.repeatY :this.repeatX);
			var scrollLine=Math.floor(scrollValue / this._cellSize);
			if (!this.cacheContent){
				var index=scrollLine *lineX;
				if (index > this._startIndex){
					var num=index-this._startIndex;
					var down=true;
					var toIndex=this._startIndex+lineX *(lineY+1);
					this._isMoved=true;
					}else if (index < this._startIndex){
					num=this._startIndex-index;
					down=false;
					toIndex=this._startIndex-1;
					this._isMoved=true;
				}
				for (var i=0;i < num;i++){
					if (down){
						var cell=this._cells.shift();
						this._cells[this._cells.length]=cell;
						var cellIndex=toIndex+i;
						}else {
						cell=this._cells.pop();
						this._cells.unshift(cell);
						cellIndex=toIndex-i;
					};
					var pos=Math.floor(cellIndex / lineX)*this._cellSize;
					this._isVertical ? cell.y=pos :cell.x=pos;
					this.renderItem(cell,cellIndex);
				}
				this._startIndex=index;
				this.changeSelectStatus();
				}else {
				num=(lineY+1);
				if (this._createdLine-scrollLine < num){
					this._createItems(this._createdLine,lineX,this._createdLine+num);
					this._createdLine+=num;
					this.renderItems(this._createdLine *lineX,0);
				}
			};
			var r=this._content.scrollRect;
			if (this._isVertical){
				r.y=scrollValue;
				}else {
				r.x=scrollValue;
			}
			this._content.model && this._content.model.scrollRect(r.x,r.y,r.width,r.height);
			this.repaint();
		}

		__proto.posCell=function(cell,cellIndex){
			if (!this._scrollBar)return;
			var lineX=(this._isVertical ? this.repeatX :this.repeatY);
			var lineY=(this._isVertical ? this.repeatY :this.repeatX);
			var pos=Math.floor(cellIndex / lineX)*this._cellSize;
			this._isVertical ? cell.y=pos :cell.x=pos;
		}

		/**
		*@private
		*改变单元格的选择状态。
		*/
		__proto.changeSelectStatus=function(){
			for (var i=0,n=this._cells.length;i < n;i++){
				this.changeCellState(this._cells[i],this._selectedIndex===this._startIndex+i,1);
			}
		}

		/**
		*@private
		*渲染单元格列表。
		*/
		__proto.renderItems=function(from,to){
			(from===void 0)&& (from=0);
			(to===void 0)&& (to=0);
			for (var i=0,n=to || this._cells.length;i < n;i++){
				this.renderItem(this._cells[i],this._startIndex+i);
			}
			this.changeSelectStatus();
		}

		/**
		*渲染一个单元格。
		*@param cell 需要渲染的单元格对象。
		*@param index 单元格索引。
		*/
		__proto.renderItem=function(cell,index){
			if (index >=0 && index < this._array.length){
				cell.visible=true;
				cell.dataSource=this._array[index];
				if (!this.cacheContent){
					this.posCell(cell,index);
				}
				}else {
				cell.visible=false;
				cell.dataSource=null;
			}
			if (this.hasListener(/*laya.events.Event.RENDER*/"render"))this.event(/*laya.events.Event.RENDER*/"render",[cell,index]);
			if (this.renderHandler)this.renderHandler.runWith([cell,index]);
		}

		/**
		*刷新列表数据源。
		*/
		__proto.refresh=function(){
			this.array=this._array;
		}

		/**
		*获取单元格数据源。
		*@param index 单元格索引。
		*/
		__proto.getItem=function(index){
			if (index >-1 && index < this._array.length){
				return this._array[index];
			}
			return null;
		}

		/**
		*修改单元格数据源。
		*@param index 单元格索引。
		*@param source 单元格数据源。
		*/
		__proto.changeItem=function(index,source){
			if (index >-1 && index < this._array.length){
				this._array[index]=source;
				if (index >=this._startIndex && index < this._startIndex+this._cells.length){
					this.renderItem(this.getCell(index),index);
				}
			}
		}

		/**
		*设置单元格数据源。
		*@param index 单元格索引。
		*@param source 单元格数据源。
		*/
		__proto.setItem=function(index,source){
			this.changeItem(index,source);
		}

		/**
		*添加单元格数据源。
		*@param souce 数据源。
		*/
		__proto.addItem=function(souce){
			this._array.push(souce);
			this.array=this._array;
		}

		/**
		*添加单元格数据源到对应的数据索引处。
		*@param souce 单元格数据源。
		*@param index 索引。
		*/
		__proto.addItemAt=function(souce,index){
			this._array.splice(index,0,souce);
			this.array=this._array;
		}

		/**
		*通过数据源索引删除单元格数据源。
		*@param index 需要删除的数据源索引值。
		*/
		__proto.deleteItem=function(index){
			this._array.splice(index,1);
			this.array=this._array;
		}

		/**
		*通过可视单元格索引，获取单元格。
		*@param index 可视单元格索引。
		*@return 单元格对象。
		*/
		__proto.getCell=function(index){
			this.runCallLater(this.changeCells);
			if (index >-1 && this._cells){
				return this._cells[(index-this._startIndex)% this._cells.length];
			}
			return null;
		}

		/**
		*<p>滚动列表，以设定的数据索引对应的单元格为当前可视列表的第一项。</p>
		*@param index 单元格在数据列表中的索引。
		*/
		__proto.scrollTo=function(index){
			if (this._scrollBar){
				var numX=this._isVertical ? this.repeatX :this.repeatY;
				this._scrollBar.value=Math.floor(index / numX)*this._cellSize;
				}else {
				this.startIndex=index;
			}
		}

		/**
		*<p>缓动滚动列表，以设定的数据索引对应的单元格为当前可视列表的第一项。</p>
		*@param index 单元格在数据列表中的索引。
		*@param time 缓动时间。
		*@param complete 缓动结束回掉
		*/
		__proto.tweenTo=function(index,time,complete){
			(time===void 0)&& (time=200);
			if (this._scrollBar){
				var numX=this._isVertical ? this.repeatX :this.repeatY;
				Tween.to(this._scrollBar,{value:Math.floor(index / numX)*this._cellSize},time,null,complete,0,true);
				}else {
				this.startIndex=index;
				if (complete)complete.run();
			}
		}

		/**@private */
		__proto._setCellChanged=function(){
			if (!this._cellChanged){
				this._cellChanged=true;
				this.callLater(this.changeCells);
			}
		}

		/**@inheritDoc */
		__getset(0,__proto,'cacheAs',_super.prototype._$get_cacheAs,function(value){
			_super.prototype._$set_cacheAs.call(this,value);
			if (this._scrollBar){
				this._$P.cacheAs=null;
				if (value!=="none")this._scrollBar.on(/*laya.events.Event.START*/"start",this,this.onScrollStart);
				else this._scrollBar.off(/*laya.events.Event.START*/"start",this,this.onScrollStart);
			}
		});

		/**
		*获取对 <code>List</code> 组件所包含的内容容器 <code>Box</code> 组件的引用。
		*/
		__getset(0,__proto,'content',function(){
			return this._content;
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._setCellChanged();
		});

		/**
		*单元格渲染器。
		*<p><b>取值：</b>
		*<ol>
		*<li>单元格类对象。</li>
		*<li> UI 的 JSON 描述。</li>
		*</ol></p>
		*/
		__getset(0,__proto,'itemRender',function(){
			return this._itemRender;
			},function(value){
			this._itemRender=value;
			this._setCellChanged();
		});

		/**
		*垂直方向滚动条皮肤。
		*/
		__getset(0,__proto,'vScrollBarSkin',function(){
			return this._scrollBar ? this._scrollBar.skin :null;
			},function(value){
			this.removeChildByName("scrollBar");
			var scrollBar=new VScrollBar();
			scrollBar.name="scrollBar";
			scrollBar.right=0;
			scrollBar.skin=value;
			this.scrollBar=scrollBar;
			this.addChild(scrollBar);
			this._setCellChanged();
		});

		/**
		*列表的当前页码。
		*/
		__getset(0,__proto,'page',function(){
			return this._page;
			},function(value){
			this._page=value
			if (this._array){
				this._page=value > 0 ? value :0;
				this._page=this._page < this.totalPage ? this._page :this.totalPage-1;
				this.startIndex=this._page *this.repeatX *this.repeatY;
			}
		});

		/**
		*水平方向滚动条皮肤。
		*/
		__getset(0,__proto,'hScrollBarSkin',function(){
			return this._scrollBar ? this._scrollBar.skin :null;
			},function(value){
			this.removeChildByName("scrollBar");
			var scrollBar=new HScrollBar();
			scrollBar.name="scrollBar";
			scrollBar.bottom=0;
			scrollBar.skin=value;
			this.scrollBar=scrollBar;
			this.addChild(scrollBar);
			this._setCellChanged();
		});

		/**
		*水平方向显示的单元格数量。
		*/
		__getset(0,__proto,'repeatX',function(){
			return this._repeatX > 0 ? this._repeatX :this._repeatX2 > 0 ? this._repeatX2 :1;
			},function(value){
			this._repeatX=value;
			this._setCellChanged();
		});

		/**
		*获取对 <code>List</code> 组件所包含的滚动条 <code>ScrollBar</code> 组件的引用。
		*/
		__getset(0,__proto,'scrollBar',function(){
			return this._scrollBar;
			},function(value){
			if (this._scrollBar !=value){
				this._scrollBar=value;
				if (value){
					this.addChild(this._scrollBar);
					this._scrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onScrollBarChange);
					this._isVertical=this._scrollBar.isVertical;
				}
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._setCellChanged();
		});

		/**
		*垂直方向显示的单元格数量。
		*/
		__getset(0,__proto,'repeatY',function(){
			return this._repeatY > 0 ? this._repeatY :this._repeatY2 > 0 ? this._repeatY2 :1;
			},function(value){
			this._repeatY=value;
			this._setCellChanged();
		});

		/**
		*水平方向显示的单元格之间的间距（以像素为单位）。
		*/
		__getset(0,__proto,'spaceX',function(){
			return this._spaceX;
			},function(value){
			this._spaceX=value;
			this._setCellChanged();
		});

		/**
		*垂直方向显示的单元格之间的间距（以像素为单位）。
		*/
		__getset(0,__proto,'spaceY',function(){
			return this._spaceY;
			},function(value){
			this._spaceY=value;
			this._setCellChanged();
		});

		/**
		*表示当前选择的项索引。
		*/
		__getset(0,__proto,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this._selectedIndex=value;
				this.changeSelectStatus();
				this.event(/*laya.events.Event.CHANGE*/"change");
				this.selectHandler && this.selectHandler.runWith(value);
			}
		});

		/**
		*当前选中的单元格数据源。
		*/
		__getset(0,__proto,'selectedItem',function(){
			return this._selectedIndex !=-1 ? this._array[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._array.indexOf(value);
		});

		/**
		*列表的数据总个数。
		*/
		__getset(0,__proto,'length',function(){
			return this._array.length;
		});

		/**
		*获取或设置当前选择的单元格对象。
		*/
		__getset(0,__proto,'selection',function(){
			return this.getCell(this._selectedIndex);
			},function(value){
			this.selectedIndex=this._startIndex+this._cells.indexOf(value);
		});

		/**
		*当前显示的单元格列表的开始索引。
		*/
		__getset(0,__proto,'startIndex',function(){
			return this._startIndex;
			},function(value){
			this._startIndex=value > 0 ? value :0;
			this.callLater(this.renderItems);
		});

		/**
		*列表数据源。
		*/
		__getset(0,__proto,'array',function(){
			return this._array;
			},function(value){
			this.runCallLater(this.changeCells);
			this._array=value || [];
			var length=this._array.length;
			this.totalPage=Math.ceil(length / (this.repeatX *this.repeatY));
			this._selectedIndex=this._selectedIndex < length ? this._selectedIndex :length-1;
			this.startIndex=this._startIndex;
			if (this._scrollBar){
				var numX=this._isVertical ? this.repeatX :this.repeatY;
				var numY=this._isVertical ? this.repeatY :this.repeatX;
				var lineCount=Math.ceil(length / numX);
				var total=this._cellOffset > 0 ? this.totalPage+1 :this.totalPage;
				if (total > 1){
					this._scrollBar.scrollSize=this._cellSize;
					this._scrollBar.thumbPercent=numY / lineCount;
					this._scrollBar.setScroll(0,(lineCount-numY)*this._cellSize+this._cellOffset,this._isVertical ? this._content.scrollRect.y :this._content.scrollRect.x);
					this._scrollBar.target=this._content;
					}else {
					this._scrollBar.setScroll(0,0,0);
					this._scrollBar.target=this._content;
				}
			}
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string'))this.selectedIndex=parseInt(value);
			else if ((value instanceof Array))this.array=value
			else _super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*单元格集合。
		*/
		__getset(0,__proto,'cells',function(){
			this.runCallLater(this.changeCells);
			return this._cells;
		});

		return List;
	})(Box)


	/**
	*<code>Panel</code> 是一个面板容器类。
	*/
	//class laya.ui.Panel extends laya.ui.Box
	var Panel=(function(_super){
		function Panel(){
			this._content=null;
			this._vScrollBar=null;
			this._hScrollBar=null;
			this._scrollChanged=false;
			Panel.__super.call(this);
			this.width=this.height=100;
			this._content.optimizeScrollRect=true;
		}

		__class(Panel,'laya.ui.Panel',_super);
		var __proto=Panel.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._content && this._content.destroy(destroyChild);
			this._vScrollBar && this._vScrollBar.destroy(destroyChild);
			this._hScrollBar && this._hScrollBar.destroy(destroyChild);
			this._vScrollBar=null;
			this._hScrollBar=null;
			this._content=null;
		}

		/**@inheritDoc */
		__proto.destroyChildren=function(){
			this._content.destroyChildren();
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			laya.display.Node.prototype.addChild.call(this,this._content=new Box());
		}

		/**@inheritDoc */
		__proto.addChild=function(child){
			child.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setScrollChanged();
			return this._content.addChild(child);
		}

		/**
		*@private
		*子对象的 <code>Event.RESIZE</code> 事件侦听处理函数。
		*/
		__proto.onResize=function(){
			this._setScrollChanged();
		}

		/**@inheritDoc */
		__proto.addChildAt=function(child,index){
			child.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setScrollChanged();
			return this._content.addChildAt(child,index);
		}

		/**@inheritDoc */
		__proto.removeChild=function(child){
			child.off(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setScrollChanged();
			return this._content.removeChild(child);
		}

		/**@inheritDoc */
		__proto.removeChildAt=function(index){
			this.getChildAt(index).off(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
			this._setScrollChanged();
			return this._content.removeChildAt(index);
		}

		/**@inheritDoc */
		__proto.removeChildren=function(beginIndex,endIndex){
			(beginIndex===void 0)&& (beginIndex=0);
			(endIndex===void 0)&& (endIndex=0x7fffffff);
			for (var i=this._content.numChildren-1;i >-1;i--){
				this._content.removeChildAt(i);
			}
			this._setScrollChanged();
			return this;
		}

		/**@inheritDoc */
		__proto.getChildAt=function(index){
			return this._content.getChildAt(index);
		}

		/**@inheritDoc */
		__proto.getChildByName=function(name){
			return this._content.getChildByName(name);
		}

		/**@inheritDoc */
		__proto.getChildIndex=function(child){
			return this._content.getChildIndex(child);
		}

		/**@private */
		__proto.changeScroll=function(){
			this._scrollChanged=false;
			var contentW=this.contentWidth;
			var contentH=this.contentHeight;
			var vscroll=this._vScrollBar;
			var hscroll=this._hScrollBar;
			var vShow=vscroll && contentH > this._height;
			var hShow=hscroll && contentW > this._width;
			var showWidth=vShow ? this._width-vscroll.width :this._width;
			var showHeight=hShow ? this._height-hscroll.height :this._height;
			if (vscroll){
				vscroll.x=this._width-vscroll.width;
				vscroll.y=0;
				vscroll.height=this._height-(hShow ? hscroll.height :0);
				vscroll.scrollSize=Math.max(this._height *0.033,1);
				vscroll.thumbPercent=showHeight / contentH;
				vscroll.setScroll(0,contentH-showHeight,vscroll.value);
			}
			if (hscroll){
				hscroll.x=0;
				hscroll.y=this._height-hscroll.height;
				hscroll.width=this._width-(vShow ? vscroll.width :0);
				hscroll.scrollSize=Math.max(this._width *0.033,1);
				hscroll.thumbPercent=showWidth / contentW;
				hscroll.setScroll(0,contentW-showWidth,hscroll.value);
			}
		}

		/**@inheritDoc */
		__proto.changeSize=function(){
			laya.ui.Component.prototype.changeSize.call(this);
			this.setContentSize(this._width,this._height);
		}

		/**
		*@private
		*设置内容的宽度、高度（以像素为单位）。
		*@param width 宽度。
		*@param height 高度。
		*/
		__proto.setContentSize=function(width,height){
			var content=this._content;
			content.width=width;
			content.height=height;
			content.scrollRect || (content.scrollRect=new Rectangle());
			content.scrollRect.setTo(0,0,width,height);
			content.model&&content.model.scrollRect(0,0,width,height);
		}

		/**
		*@private
		*滚动条的<code><code>Event.MOUSE_DOWN</code>事件侦听处理函数。</code>事件侦听处理函数。
		*@param scrollBar 滚动条对象。
		*@param e Event 对象。
		*/
		__proto.onScrollBarChange=function(scrollBar){
			var rect=this._content.scrollRect;
			if (rect){
				var start=Math.round(scrollBar.value);
				scrollBar.isVertical ? rect.y=start :rect.x=start;
				this._content.model&&this._content.model.scrollRect(rect.x,rect.y,rect.width,rect.height);
			}
		}

		/**
		*<p>滚动内容容器至设定的垂直、水平方向滚动条位置。</p>
		*@param x 水平方向滚动条属性value值。滚动条位置数字。
		*@param y 垂直方向滚动条属性value值。滚动条位置数字。
		*/
		__proto.scrollTo=function(x,y){
			(x===void 0)&& (x=0);
			(y===void 0)&& (y=0);
			if (this.vScrollBar)this.vScrollBar.value=y;
			if (this.hScrollBar)this.hScrollBar.value=x;
		}

		/**
		*刷新滚动内容。
		*/
		__proto.refresh=function(){
			this.changeScroll();
		}

		__proto.onScrollStart=function(){
			this._$P.cacheAs || (this._$P.cacheAs=_super.prototype._$get_cacheAs.call(this));
			_super.prototype._$set_cacheAs.call(this,"none");
			this._hScrollBar && this._hScrollBar.once(/*laya.events.Event.END*/"end",this,this.onScrollEnd);
			this._vScrollBar && this._vScrollBar.once(/*laya.events.Event.END*/"end",this,this.onScrollEnd);
		}

		__proto.onScrollEnd=function(){
			_super.prototype._$set_cacheAs.call(this,this._$P.cacheAs);
		}

		/**@private */
		__proto._setScrollChanged=function(){
			if (!this._scrollChanged){
				this._scrollChanged=true;
				this.callLater(this.changeScroll);
			}
		}

		/**@inheritDoc */
		__getset(0,__proto,'numChildren',function(){
			return this._content.numChildren;
		});

		/**
		*水平方向滚动条皮肤。
		*/
		__getset(0,__proto,'hScrollBarSkin',function(){
			return this._hScrollBar ? this._hScrollBar.skin :null;
			},function(value){
			if (this._hScrollBar==null){
				laya.display.Node.prototype.addChild.call(this,this._hScrollBar=new HScrollBar());
				this._hScrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onScrollBarChange,[this._hScrollBar]);
				this._hScrollBar.target=this._content;
				this._setScrollChanged();
			}
			this._hScrollBar.skin=value;
		});

		/**
		*@private
		*获取内容宽度（以像素为单位）。
		*/
		__getset(0,__proto,'contentWidth',function(){
			var max=0;
			for (var i=this._content.numChildren-1;i >-1;i--){
				var comp=this._content.getChildAt(i);
				max=Math.max(comp.x+comp.width *comp.scaleX,max);
			}
			return max;
		});

		/**
		*@private
		*获取内容高度（以像素为单位）。
		*/
		__getset(0,__proto,'contentHeight',function(){
			var max=0;
			for (var i=this._content.numChildren-1;i >-1;i--){
				var comp=this._content.getChildAt(i);
				max=Math.max(comp.y+comp.height *comp.scaleY,max);
			}
			return max;
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._setScrollChanged();
		});

		/**
		*水平方向滚动条对象。
		*/
		__getset(0,__proto,'hScrollBar',function(){
			return this._hScrollBar;
		});

		/**
		*获取内容容器对象。
		*/
		__getset(0,__proto,'content',function(){
			return this._content;
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._setScrollChanged();
		});

		/**
		*垂直方向滚动条皮肤。
		*/
		__getset(0,__proto,'vScrollBarSkin',function(){
			return this._vScrollBar ? this._vScrollBar.skin :null;
			},function(value){
			if (this._vScrollBar==null){
				laya.display.Node.prototype.addChild.call(this,this._vScrollBar=new VScrollBar());
				this._vScrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onScrollBarChange,[this._vScrollBar]);
				this._vScrollBar.target=this._content;
				this._setScrollChanged();
			}
			this._vScrollBar.skin=value;
		});

		/**
		*垂直方向滚动条对象。
		*/
		__getset(0,__proto,'vScrollBar',function(){
			return this._vScrollBar;
		});

		/**@inheritDoc */
		__getset(0,__proto,'cacheAs',_super.prototype._$get_cacheAs,function(value){
			_super.prototype._$set_cacheAs.call(this,value);
			this._$P.cacheAs=null;
			if (value!=="none"){
				this._hScrollBar && this._hScrollBar.on(/*laya.events.Event.START*/"start",this,this.onScrollStart);
				this._vScrollBar && this._vScrollBar.on(/*laya.events.Event.START*/"start",this,this.onScrollStart);
				}else {
				this._hScrollBar && this._hScrollBar.off(/*laya.events.Event.START*/"start",this,this.onScrollStart);
				this._vScrollBar && this._vScrollBar.off(/*laya.events.Event.START*/"start",this,this.onScrollStart);
			}
		});

		return Panel;
	})(Box)


	/**
	*<code>Tree</code> 控件使用户可以查看排列为可扩展树的层次结构数据。
	*
	*@example 以下示例代码，创建了一个 <code>Tree</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Tree;
		*import laya.utils.Browser;
		*import laya.utils.Handler;
		*public class Tree_Example
		*{
			*public function Tree_Example()
			*{
				*Laya.init(640,800);
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png","resource/ui/clip_selectBox.png","resource/ui/clip_tree_folder.png","resource/ui/clip_tree_arrow.png"],Handler.create(this,onLoadComplete));
				*}
			*private function onLoadComplete():void
			*{
				*var xmlString:String;//创建一个xml字符串，用于存储树结构数据。
				*xmlString="&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
				*var domParser:*=new Browser.window.DOMParser();//创建一个DOMParser实例domParser。
				*var xml:*=domParser.parseFromString(xmlString,"text/xml");//解析xml字符。
				*var tree:Tree=new Tree();//创建一个 Tree 类的实例对象 tree 。
				*tree.scrollBarSkin="resource/ui/vscroll.png";//设置 tree 的皮肤。
				*tree.itemRender=Item;//设置 tree 的项渲染器。
				*tree.xml=xml;//设置 tree 的树结构数据。
				*tree.x=100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
				*tree.y=100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
				*tree.width=200;//设置 tree 的宽度。
				*tree.height=100;//设置 tree 的高度。
				*Laya.stage.addChild(tree);//将 tree 添加到显示列表。
				*}
			*}
		*}
	*import laya.ui.Box;
	*import laya.ui.Clip;
	*import laya.ui.Label;
	*class Item extends Box
	*{
		*public function Item()
		*{
			*this.name="render";
			*this.right=0;
			*this.left=0;
			*var selectBox:Clip=new Clip("resource/ui/clip_selectBox.png",1,2);
			*selectBox.name="selectBox";
			*selectBox.height=24;
			*selectBox.x=13;
			*selectBox.y=0;
			*selectBox.left=12;
			*addChild(selectBox);
			*var folder:Clip=new Clip("resource/ui/clip_tree_folder.png",1,3);
			*folder.name="folder";
			*folder.x=14;
			*folder.y=4;
			*addChild(folder);
			*var label:Label=new Label("treeItem");
			*label.name="label";
			*label.color="#ffff00";
			*label.width=150;
			*label.height=22;
			*label.x=33;
			*label.y=1;
			*label.left=33;
			*label.right=0;
			*addChild(label);
			*var arrow:Clip=new Clip("resource/ui/clip_tree_arrow.png",1,2);
			*arrow.name="arrow";
			*arrow.x=0;
			*arrow.y=5;
			*addChild(arrow);
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var res=["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png","resource/ui/clip_selectBox.png","resource/ui/clip_tree_folder.png","resource/ui/clip_tree_arrow.png"];
	*Laya.loader.load(res,new laya.utils.Handler(this,onLoadComplete));
	*function onLoadComplete(){
		*var xmlString;//创建一个xml字符串，用于存储树结构数据。
		*xmlString="&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
		*var domParser=new laya.utils.Browser.window.DOMParser();//创建一个DOMParser实例domParser。
		*var xml=domParser.parseFromString(xmlString,"text/xml");//解析xml字符。
		*var tree=new laya.ui.Tree();//创建一个 Tree 类的实例对象 tree 。
		*tree.scrollBarSkin="resource/ui/vscroll.png";//设置 tree 的皮肤。
		*tree.itemRender=mypackage.treeExample.Item;//设置 tree 的项渲染器。
		*tree.xml=xml;//设置 tree 的树结构数据。
		*tree.x=100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
		*tree.y=100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
		*tree.width=200;//设置 tree 的宽度。
		*tree.height=100;//设置 tree 的高度。
		*Laya.stage.addChild(tree);//将 tree 添加到显示列表。
		*}
	*(function (_super){
		*function Item(){
			*Item.__super.call(this);//初始化父类。
			*this.right=0;
			*this.left=0;
			*var selectBox=new laya.ui.Clip("resource/ui/clip_selectBox.png",1,2);
			*selectBox.name="selectBox";//设置 selectBox 的name 为“selectBox”时，将被识别为树结构的项的背景。2帧：悬停时背景、选中时背景。
			*selectBox.height=24;
			*selectBox.x=13;
			*selectBox.y=0;
			*selectBox.left=12;
			*this.addChild(selectBox);//需要使用this.访问父类的属性或方法。
			*var folder=new laya.ui.Clip("resource/ui/clip_tree_folder.png",1,3);
			*folder.name="folder";//设置 folder 的name 为“folder”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
			*folder.x=14;
			*folder.y=4;
			*this.addChild(folder);
			*var label=new laya.ui.Label("treeItem");
			*label.name="label";//设置 label 的name 为“label”时，此值将用于树结构数据赋值。
			*label.color="#ffff00";
			*label.width=150;
			*label.height=22;
			*label.x=33;
			*label.y=1;
			*label.left=33;
			*label.right=0;
			*this.addChild(label);
			*var arrow=new laya.ui.Clip("resource/ui/clip_tree_arrow.png",1,2);
			*arrow.name="arrow";//设置 arrow 的name 为“arrow”时，将被识别为树结构的文件夹开启状态图表。2帧：折叠状态、打开状态。
			*arrow.x=0;
			*arrow.y=5;
			*this.addChild(arrow);
			*};
		*Laya.class(Item,"mypackage.treeExample.Item",_super);//注册类 Item 。
		*})(laya.ui.Box);
	*</listing>
	*<listing version="3.0">
	*import Tree=laya.ui.Tree;
	*import Browser=laya.utils.Browser;
	*import Handler=laya.utils.Handler;
	*class Tree_Example {
		*constructor(){
			*Laya.init(640,800);
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png","resource/ui/vscroll$up.png","resource/ui/clip_selectBox.png","resource/ui/clip_tree_folder * . * png","resource/ui/clip_tree_arrow.png"],Handler.create(this,this.onLoadComplete));
			*}
		*private onLoadComplete():void {
			*var xmlString:String;//创建一个xml字符串，用于存储树结构数据。
			*xmlString="&lt;root&gt;&lt;item label='box1'&gt;&lt;abc label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;abc label='child5'/&gt;&lt;/item&gt;&lt;item label='box2'&gt;&lt;abc  * label='child1'/&gt;&lt;abc label='child2'/&gt;&lt;abc label='child3'/&gt;&lt;abc label='child4'/&gt;&lt;/item&gt;&lt;/root&gt;";
			*var domParser:any=new Browser.window.DOMParser();//创建一个DOMParser实例domParser。
			*var xml:any=domParser.parseFromString(xmlString,"text/xml");//解析xml字符。
			*var tree:Tree=new Tree();//创建一个 Tree 类的实例对象 tree 。
			*tree.scrollBarSkin="resource/ui/vscroll.png";//设置 tree 的皮肤。
			*tree.itemRender=Item;//设置 tree 的项渲染器。
			*tree.xml=xml;//设置 tree 的树结构数据。
			*tree.x=100;//设置 tree 对象的属性 x 的值，用于控制 tree 对象的显示位置。
			*tree.y=100;//设置 tree 对象的属性 y 的值，用于控制 tree 对象的显示位置。
			*tree.width=200;//设置 tree 的宽度。
			*tree.height=100;//设置 tree 的高度。
			*Laya.stage.addChild(tree);//将 tree 添加到显示列表。
			*}
		*}
	*import Box=laya.ui.Box;
	*import Clip=laya.ui.Clip;
	*import Label=laya.ui.Label;
	*class Item extends Box {
		*constructor(){
			*super();
			*this.name="render";
			*this.right=0;
			*this.left=0;
			*var selectBox:Clip=new Clip("resource/ui/clip_selectBox.png",1,2);
			*selectBox.name="selectBox";
			*selectBox.height=24;
			*selectBox.x=13;
			*selectBox.y=0;
			*selectBox.left=12;
			*this.addChild(selectBox);
			*var folder:Clip=new Clip("resource/ui/clip_tree_folder.png",1,3);
			*folder.name="folder";
			*folder.x=14;
			*folder.y=4;
			*this.addChild(folder);
			*var label:Label=new Label("treeItem");
			*label.name="label";
			*label.color="#ffff00";
			*label.width=150;
			*label.height=22;
			*label.x=33;
			*label.y=1;
			*label.left=33;
			*label.right=0;
			*this.addChild(label);
			*var arrow:Clip=new Clip("resource/ui/clip_tree_arrow.png",1,2);
			*arrow.name="arrow";
			*arrow.x=0;
			*arrow.y=5;
			*this.addChild(arrow);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.Tree extends laya.ui.Box
	var Tree=(function(_super){
		function Tree(){
			this._list=null;
			this._source=null;
			this._renderHandler=null;
			this._spaceLeft=10;
			this._spaceBottom=0;
			this._keepStatus=true;
			Tree.__super.call(this);
			this.width=this.height=200;
		}

		__class(Tree,'laya.ui.Tree',_super);
		var __proto=Tree.prototype;
		Laya.imps(__proto,{"laya.ui.IRender":true})
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			laya.ui.Component.prototype.destroy.call(this,destroyChild);
			this._list && this._list.destroy(destroyChild);
			this._list=null;
			this._source=null;
			this._renderHandler=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._list=new List());
			this._list.renderHandler=Handler.create(this,this.renderItem,null,false);
			this._list.repeatX=1;
			this._list.on(/*laya.events.Event.CHANGE*/"change",this,this.onListChange);
		}

		/**
		*@private
		*此对象包含的<code>List</code>实例的<code>Event.CHANGE</code>事件侦听处理函数。
		*/
		__proto.onListChange=function(e){
			this.event(/*laya.events.Event.CHANGE*/"change");
		}

		/**
		*@private
		*获取数据源集合。
		*/
		__proto.getArray=function(){
			var arr=[];
			var item;
			/*for each*/for(var $each_item in this._source){
				item=this._source[$each_item];
				if (this.getParentOpenStatus(item)){
					item.x=this._spaceLeft *this.getDepth(item);
					arr.push(item);
				}
			}
			return arr;
		}

		/**
		*@private
		*获取项对象的深度。
		*/
		__proto.getDepth=function(item,num){
			(num===void 0)&& (num=0);
			if (item.nodeParent==null)return num;
			else return this.getDepth(item.nodeParent,num+1);
		}

		/**
		*@private
		*获取项对象的上一级的打开状态。
		*/
		__proto.getParentOpenStatus=function(item){
			var parent=item.nodeParent;
			if (parent==null){
				return true;
				}else {
				if (parent.isOpen){
					if (parent.nodeParent !=null)return this.getParentOpenStatus(parent);
					else return true;
					}else {
					return false;
				}
			}
		}

		/**
		*@private
		*渲染一个项对象。
		*@param cell 一个项对象。
		*@param index 项的索引。
		*/
		__proto.renderItem=function(cell,index){
			var item=cell.dataSource;
			if (item){
				cell.left=item.x;
				var arrow=cell.getChildByName("arrow");
				if (arrow){
					if (item.hasChild){
						arrow.visible=true;
						arrow.index=item.isOpen ? 1 :0;
						arrow.tag=index;
						arrow.off(/*laya.events.Event.CLICK*/"click",this,this.onArrowClick);
						arrow.on(/*laya.events.Event.CLICK*/"click",this,this.onArrowClick);
						}else {
						arrow.visible=false;
					}
				};
				var folder=cell.getChildByName("folder");
				if (folder){
					if (folder.clipY==2){
						folder.index=item.isDirectory ? 0 :1;
						}else {
						folder.index=item.isDirectory ? item.isOpen ? 1 :0 :2;
					}
				}
				this._renderHandler && this._renderHandler.runWith([cell,index]);
			}
		}

		/**
		*@private
		*/
		__proto.onArrowClick=function(e){
			var arrow=e.currentTarget;
			var index=arrow.tag;
			this._list.array[index].isOpen=!this._list.array[index].isOpen;
			this._list.array=this.getArray();
		}

		/**
		*设置指定项索引的项对象的打开状态。
		*@param index 项索引。
		*@param isOpen 是否处于打开状态。
		*/
		__proto.setItemState=function(index,isOpen){
			if (!this._list.array[index])return;
			this._list.array[index].isOpen=isOpen;
			this._list.array=this.getArray();
		}

		/**
		*刷新项列表。
		*/
		__proto.fresh=function(){
			this._list.array=this.getArray();
			this.repaint();
		}

		/**
		*@private
		*解析并处理XML类型的数据源。
		*/
		__proto.parseXml=function(xml,source,nodeParent,isRoot){
			var obj;
			var list=xml.childNodes;
			var childCount=list.length;
			if (!isRoot){
				obj={};
				var list2=xml.attributes;
				var attrs;
				/*for each*/for(var $each_attrs in list2){
					attrs=list2[$each_attrs];
					var prop=attrs.nodeName;
					var value=attrs.nodeValue;
					obj[prop]=value=="true" ? true :value=="false" ? false :value;
				}
				obj.nodeParent=nodeParent;
				if (childCount > 0)obj.isDirectory=true;
				obj.hasChild=childCount > 0;
				source.push(obj);
			}
			for (var i=0;i < childCount;i++){
				var node=list[i];
				this.parseXml(node,source,obj,false);
			}
		}

		/**
		*@private
		*处理数据项的打开状态。
		*/
		__proto.parseOpenStatus=function(oldSource,newSource){
			for (var i=0,n=newSource.length;i < n;i++){
				var newItem=newSource[i];
				if (newItem.isDirectory){
					for (var j=0,m=oldSource.length;j < m;j++){
						var oldItem=oldSource[j];
						if (oldItem.isDirectory && this.isSameParent(oldItem,newItem)&& newItem.label==oldItem.label){
							newItem.isOpen=oldItem.isOpen;
							break ;
						}
					}
				}
			}
		}

		/**
		*@private
		*判断两个项对象在树结构中的父节点是否相同。
		*@param item1 项对象。
		*@param item2 项对象。
		*@return 如果父节点相同值为true，否则值为false。
		*/
		__proto.isSameParent=function(item1,item2){
			if (item1.nodeParent==null && item2.nodeParent==null)return true;
			else if (item1.nodeParent==null || item2.nodeParent==null)return false
			else {
				if (item1.nodeParent.label==item2.nodeParent.label)return this.isSameParent(item1.nodeParent,item2.nodeParent);
				else return false;
			}
		}

		/**
		*更新项列表，显示指定键名的数据项。
		*@param key 键名。
		*/
		__proto.filter=function(key){
			if (Boolean(key)){
				var result=[];
				this.getFilterSource(this._source,result,key);
				this._list.array=result;
				}else {
				this._list.array=this.getArray();
			}
		}

		/**
		*@private
		*获取数据源中指定键名的值。
		*/
		__proto.getFilterSource=function(array,result,key){
			key=key.toLocaleLowerCase();
			var item;
			/*for each*/for(var $each_item in array){
				item=array[$each_item];
				if (!item.isDirectory && String(item.label).toLowerCase().indexOf(key)>-1){
					item.x=0;
					result.push(item);
				}
				if (item.child && item.child.length > 0){
					this.getFilterSource(item.child,result,key);
				}
			}
		}

		/**
		*每一项之间的间隔距离（以像素为单位）。
		*/
		__getset(0,__proto,'spaceBottom',function(){
			return this._list.spaceY;
			},function(value){
			this._list.spaceY=value;
		});

		/**
		*数据源发生变化后，是否保持之前打开状态，默认为true。
		*<p><b>取值：</b>
		*<li>true：保持之前打开状态。</li>
		*<li>false：不保持之前打开状态。</li>
		*</p>
		*/
		__getset(0,__proto,'keepStatus',function(){
			return this._keepStatus;
			},function(value){
			this._keepStatus=value;
		});

		/**
		*此对象包含的<code>List</code>实例的单元格渲染器。
		*<p><b>取值：</b>
		*<ol>
		*<li>单元格类对象。</li>
		*<li> UI 的 JSON 描述。</li>
		*</ol></p>
		*/
		__getset(0,__proto,'itemRender',function(){
			return this._list.itemRender;
			},function(value){
			this._list.itemRender=value;
		});

		/**
		*列表数据源，只包含当前可视节点数据。
		*/
		__getset(0,__proto,'array',function(){
			return this._list.array;
			},function(value){
			if (this._keepStatus && this._list.array && value){
				this.parseOpenStatus(this._list.array,value);
			}
			this._source=value;
			this._list.array=this.getArray();
		});

		/**
		*单元格鼠标事件处理器。
		*<p>默认返回参数（e:Event,index:int）。</p>
		*/
		__getset(0,__proto,'mouseHandler',function(){
			return this._list.mouseHandler;
			},function(value){
			this._list.mouseHandler=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			_super.prototype._$set_dataSource.call(this,value);
		});

		/**
		*数据源，全部节点数据。
		*/
		__getset(0,__proto,'source',function(){
			return this._source;
		});

		/**滚动条*/
		__getset(0,__proto,'scrollBar',function(){
			return this._list.scrollBar;
		});

		/**
		*此对象包含的<code>List</code>实例对象。
		*/
		__getset(0,__proto,'list',function(){
			return this._list;
		});

		/**
		*滚动条皮肤。
		*/
		__getset(0,__proto,'scrollBarSkin',function(){
			return this._list.vScrollBarSkin;
			},function(value){
			this._list.vScrollBarSkin=value;
		});

		/**
		*<code>Tree</code> 实例的渲染处理器。
		*/
		__getset(0,__proto,'renderHandler',function(){
			return this._renderHandler;
			},function(value){
			this._renderHandler=value;
		});

		/**
		*表示当前选择的项索引。
		*/
		__getset(0,__proto,'selectedIndex',function(){
			return this._list.selectedIndex;
			},function(value){
			this._list.selectedIndex=value;
		});

		/**
		*左侧缩进距离（以像素为单位）。
		*/
		__getset(0,__proto,'spaceLeft',function(){
			return this._spaceLeft;
			},function(value){
			this._spaceLeft=value;
		});

		/**
		*当前选中的项对象的数据源。
		*/
		__getset(0,__proto,'selectedItem',function(){
			return this._list.selectedItem;
			},function(value){
			this._list.selectedItem=value;
		});

		/**
		*@inheritDoc
		*/
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._list.width=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._list.height=value;
		});

		/**
		*xml结构的数据源。
		*/
		__getset(0,__proto,'xml',null,function(value){
			var arr=[];
			this.parseXml(value.childNodes[0],arr,null,true);
			this.array=arr;
		});

		/**
		*表示选择的树节点项的<code>path</code>属性值。
		*/
		__getset(0,__proto,'selectedPath',function(){
			if (this._list.selectedItem){
				return this._list.selectedItem.path;
			}
			return null;
		});

		return Tree;
	})(Box)


	/**
	*<code>ViewStack</code> 类用于视图堆栈类，用于视图的显示等设置处理。
	*/
	//class laya.ui.ViewStack extends laya.ui.Box
	var ViewStack=(function(_super){
		function ViewStack(){
			this._items=null;
			this._selectedIndex=0;
			ViewStack.__super.call(this);
			this._setIndexHandler=Handler.create(this,this.setIndex,null,false);
		}

		__class(ViewStack,'laya.ui.ViewStack',_super);
		var __proto=ViewStack.prototype;
		Laya.imps(__proto,{"laya.ui.IItem":true})
		/**
		*批量设置视图对象。
		*@param views 视图对象数组。
		*/
		__proto.setItems=function(views){
			this.removeChildren();
			var index=0;
			for (var i=0,n=views.length;i < n;i++){
				var item=views[i];
				if (item){
					item.name="item"+index;
					this.addChild(item);
					index++;
				}
			}
			this.initItems();
		}

		/**
		*添加视图。
		*@internal 添加视图对象，并设置此视图对象的<code>name</code> 属性。
		*@param view 需要添加的视图对象。
		*/
		__proto.addItem=function(view){
			view.name="item"+this._items.length;
			this.addChild(view);
			this.initItems();
		}

		/**
		*初始化视图对象集合。
		*/
		__proto.initItems=function(){
			this._items=[];
			for (var i=0;i < 10000;i++){
				var item=this.getChildByName("item"+i);
				if (item==null){
					break ;
				}
				this._items.push(item);
				item.visible=(i==this._selectedIndex);
			}
		}

		/**
		*@private
		*通过对象的索引设置项对象的 <code>selected</code> 属性值。
		*@param index 需要设置的对象的索引。
		*@param selected 表示对象的选中状态。
		*/
		__proto.setSelect=function(index,selected){
			if (this._items && index >-1 && index < this._items.length){
				this._items[index].visible=selected;
			}
		}

		/**
		*@private
		*设置属性<code>selectedIndex</code>的值。
		*@param index 选中项索引值。
		*/
		__proto.setIndex=function(index){
			this.selectedIndex=index;
		}

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if (((typeof value=='number')&& Math.floor(value)==value)|| (typeof value=='string')){
				this.selectedIndex=parseInt(value);
				}else {
				for (var prop in this._dataSource){
					if (this.hasOwnProperty(prop)){
						this[prop]=this._dataSource[prop];
					}
				}
			}
		});

		/**
		*表示当前视图索引。
		*/
		__getset(0,__proto,'selectedIndex',function(){
			return this._selectedIndex;
			},function(value){
			if (this._selectedIndex !=value){
				this.setSelect(this._selectedIndex,false);
				this._selectedIndex=value;
				this.setSelect(this._selectedIndex,true);
			}
		});

		/**
		*获取或设置当前选择的项对象。
		*/
		__getset(0,__proto,'selection',function(){
			return this._selectedIndex >-1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] :null;
			},function(value){
			this.selectedIndex=this._items.indexOf(value);
		});

		/**
		*视图集合数组。
		*/
		__getset(0,__proto,'items',function(){
			return this._items;
		});

		/**
		*索引设置处理器。
		*<p>默认回调参数：index:int</p>
		*/
		__getset(0,__proto,'setIndexHandler',function(){
			return this._setIndexHandler;
			},function(value){
			this._setIndexHandler=value;
		});

		return ViewStack;
	})(Box)


	/**
	*关键帧动画播放类
	*
	*/
	//class laya.ui.FrameClip extends laya.display.FrameAnimation
	var FrameClip=(function(_super){
		/**
		*创建一个 <code>FrameClip</code> 实例。
		*/
		function FrameClip(){
			FrameClip.__super.call(this);
		}

		__class(FrameClip,'laya.ui.FrameClip',_super);
		return FrameClip;
	})(FrameAnimation)


	/**
	*<code>CheckBox</code> 组件显示一个小方框，该方框内可以有选中标记。
	*<code>CheckBox</code> 组件还可以显示可选的文本标签，默认该标签位于 CheckBox 右侧。
	*<p><code>CheckBox</code> 使用 <code>dataSource</code>赋值时的的默认属性是：<code>selected</code>。</p>
	*
	*@example 以下示例代码，创建了一个 <code>CheckBox</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.CheckBox;
		*import laya.utils.Handler;
		*public class CheckBox_Example
		*{
			*public function CheckBox_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/check.png",Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*trace("资源加载完成！");
				*var checkBox:CheckBox=new CheckBox("resource/ui/check.png","这个是一个CheckBox组件。");//创建一个 CheckBox 类的实例对象 checkBox ,传入它的皮肤skin和标签label。
				*checkBox.x=100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
				*checkBox.y=100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
				*checkBox.clickHandler=new Handler(this,onClick,[checkBox]);//设置 checkBox 的点击事件处理器。
				*Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
				*}
			*private function onClick(checkBox:CheckBox):void
			*{
				*trace("输出选中状态: checkBox.selected = "+checkBox.selected);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load("resource/ui/check.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*function loadComplete()
	*{
		*console.log("资源加载完成！");
		*var checkBox:laya.ui.CheckBox=new laya.ui.CheckBox("resource/ui/check.png","这个是一个CheckBox组件。");//创建一个 CheckBox 类的类的实例对象 checkBox ,传入它的皮肤skin和标签label。
		*checkBox.x=100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
		*checkBox.y=100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
		*checkBox.clickHandler=new laya.utils.Handler(this,this.onClick,[checkBox],false);//设置 checkBox 的点击事件处理器。
		*Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
		*}
	*function onClick(checkBox)
	*{
		*console.log("checkBox.selected = ",checkBox.selected);
		*}
	*</listing>
	*<listing version="3.0">
	*import CheckBox=laya.ui.CheckBox;
	*import Handler=laya.utils.Handler;
	*class CheckBox_Example{
		*constructor()
		*{
			*Laya.init(640,800);
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load("resource/ui/check.png",Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete()
		*{
			*var checkBox:CheckBox=new CheckBox("resource/ui/check.png","这个是一个CheckBox组件。");//创建一个 CheckBox 类的实例对象 checkBox ,传入它的皮肤skin和标签label。
			*checkBox.x=100;//设置 checkBox 对象的属性 x 的值，用于控制 checkBox 对象的显示位置。
			*checkBox.y=100;//设置 checkBox 对象的属性 y 的值，用于控制 checkBox 对象的显示位置。
			*checkBox.clickHandler=new Handler(this,this.onClick,[checkBox]);//设置 checkBox 的点击事件处理器。
			*Laya.stage.addChild(checkBox);//将此 checkBox 对象添加到显示列表。
			*}
		*private onClick(checkBox:CheckBox):void
		*{
			*console.log("输出选中状态: checkBox.selected = "+checkBox.selected);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.CheckBox extends laya.ui.Button
	var CheckBox=(function(_super){
		/**
		*创建一个新的 <code>CheckBox</code> 组件实例。
		*@param skin 皮肤资源地址。
		*@param label 文本标签的内容。
		*/
		function CheckBox(skin,label){
			(label===void 0)&& (label="");
			CheckBox.__super.call(this,skin,label);
		}

		__class(CheckBox,'laya.ui.CheckBox',_super);
		var __proto=CheckBox.prototype;
		/**@inheritDoc */
		__proto.preinitialize=function(){
			laya.ui.Component.prototype.preinitialize.call(this);
			this.toggle=true;
			this._autoSize=false;
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			_super.prototype.initialize.call(this);
			this.createText();
			this._text.align="left";
			this._text.valign="top";
			this._text.width=0;
		}

		/**@inheritDoc */
		__getset(0,__proto,'dataSource',_super.prototype._$get_dataSource,function(value){
			this._dataSource=value;
			if ((typeof value=='boolean'))this.selected=value;
			else if ((typeof value=='string'))this.selected=value==="true";
			else _super.prototype._$set_dataSource.call(this,value);
		});

		return CheckBox;
	})(Button)


	/**
	*使用 <code>HScrollBar</code> （水平 <code>ScrollBar</code> ）控件，可以在因数据太多而不能在显示区域完全显示时控制显示的数据部分。
	*@example 以下示例代码，创建了一个 <code>HScrollBar</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.HScrollBar;
		*import laya.utils.Handler;
		*public class HScrollBar_Example
		*{
			*private var hScrollBar:HScrollBar;
			*public function HScrollBar_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/hscroll.png","resource/ui/hscroll$bar.png","resource/ui/hscroll$down.png","resource/ui/hscroll$up.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*hScrollBar=new HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
				*hScrollBar.skin="resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
				*hScrollBar.x=100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
				*hScrollBar.y=100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
				*hScrollBar.changeHandler=new Handler(this,onChange);//设置 hScrollBar 的滚动变化处理器。
				*Laya.stage.addChild(hScrollBar);//将此 hScrollBar 对象添加到显示列表。
				*}
			*private function onChange(value:Number):void
			*{
				*trace("滚动条的位置： value="+value);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var hScrollBar;
	*var res=["resource/ui/hscroll.png","resource/ui/hscroll$bar.png","resource/ui/hscroll$down.png","resource/ui/hscroll$up.png"];
	*Laya.loader.load(res,laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*console.log("资源加载完成！");
		*hScrollBar=new laya.ui.HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
		*hScrollBar.skin="resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
		*hScrollBar.x=100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
		*hScrollBar.y=100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
		*hScrollBar.changeHandler=new laya.utils.Handler(this,onChange);//设置 hScrollBar 的滚动变化处理器。
		*Laya.stage.addChild(hScrollBar);//将此 hScrollBar 对象添加到显示列表。
		*}
	*function onChange(value)
	*{
		*console.log("滚动条的位置： value="+value);
		*}
	*</listing>
	*<listing version="3.0">
	*import HScrollBar=laya.ui.HScrollBar;
	*import Handler=laya.utils.Handler;
	*class HScrollBar_Example {
		*private hScrollBar:HScrollBar;
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/hscroll.png","resource/ui/hscroll$bar.png","resource/ui/hscroll$down.png","resource/ui/hscroll$up.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*this.hScrollBar=new HScrollBar();//创建一个 HScrollBar 类的实例对象 hScrollBar 。
			*this.hScrollBar.skin="resource/ui/hscroll.png";//设置 hScrollBar 的皮肤。
			*this.hScrollBar.x=100;//设置 hScrollBar 对象的属性 x 的值，用于控制 hScrollBar 对象的显示位置。
			*this.hScrollBar.y=100;//设置 hScrollBar 对象的属性 y 的值，用于控制 hScrollBar 对象的显示位置。
			*this.hScrollBar.changeHandler=new Handler(this,this.onChange);//设置 hScrollBar 的滚动变化处理器。
			*Laya.stage.addChild(this.hScrollBar);//将此 hScrollBar 对象添加到显示列表。
			*}
		*private onChange(value:number):void {
			*console.log("滚动条的位置： value="+value);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.HScrollBar extends laya.ui.ScrollBar
	var HScrollBar=(function(_super){
		function HScrollBar(){HScrollBar.__super.call(this);;
		};

		__class(HScrollBar,'laya.ui.HScrollBar',_super);
		var __proto=HScrollBar.prototype;
		/**@inheritDoc */
		__proto.initialize=function(){
			_super.prototype.initialize.call(this);
			this.slider.isVertical=false;
		}

		return HScrollBar;
	})(ScrollBar)


	/**
	*使用 <code>HSlider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	*<p> <code>HSlider</code> 控件采用水平方向。滑块轨道从左向右扩展，而标签位于轨道的顶部或底部。</p>
	*
	*@example 以下示例代码，创建了一个 <code>HSlider</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.HSlider;
		*import laya.utils.Handler;
		*public class HSlider_Example
		*{
			*private var hSlider:HSlider;
			*public function HSlider_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/hslider.png","resource/ui/hslider$bar.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*hSlider=new HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
				*hSlider.skin="resource/ui/hslider.png";//设置 hSlider 的皮肤。
				*hSlider.min=0;//设置 hSlider 最低位置值。
				*hSlider.max=10;//设置 hSlider 最高位置值。
				*hSlider.value=2;//设置 hSlider 当前位置值。
				*hSlider.tick=1;//设置 hSlider 刻度值。
				*hSlider.x=100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
				*hSlider.y=100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
				*hSlider.changeHandler=new Handler(this,onChange);//设置 hSlider 位置变化处理器。
				*Laya.stage.addChild(hSlider);//把 hSlider 添加到显示列表。
				*}
			*private function onChange(value:Number):void
			*{
				*trace("滑块的位置： value="+value);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800,"canvas");//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var hSlider;
	*var res=["resource/ui/hslider.png","resource/ui/hslider$bar.png"];
	*Laya.loader.load(res,laya.utils.Handler.create(this,onLoadComplete));
	*function onLoadComplete(){
		*console.log("资源加载完成！");
		*hSlider=new laya.ui.HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
		*hSlider.skin="resource/ui/hslider.png";//设置 hSlider 的皮肤。
		*hSlider.min=0;//设置 hSlider 最低位置值。
		*hSlider.max=10;//设置 hSlider 最高位置值。
		*hSlider.value=2;//设置 hSlider 当前位置值。
		*hSlider.tick=1;//设置 hSlider 刻度值。
		*hSlider.x=100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
		*hSlider.y=100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
		*hSlider.changeHandler=new laya.utils.Handler(this,onChange);//设置 hSlider 位置变化处理器。
		*Laya.stage.addChild(hSlider);//把 hSlider 添加到显示列表。
		*}
	*function onChange(value)
	*{
		*console.log("滑块的位置： value="+value);
		*}
	*</listing>
	*<listing version="3.0">
	*import Handler=laya.utils.Handler;
	*import HSlider=laya.ui.HSlider;
	*class HSlider_Example {
		*private hSlider:HSlider;
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/hslider.png","resource/ui/hslider$bar.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*this.hSlider=new HSlider();//创建一个 HSlider 类的实例对象 hSlider 。
			*this.hSlider.skin="resource/ui/hslider.png";//设置 hSlider 的皮肤。
			*this.hSlider.min=0;//设置 hSlider 最低位置值。
			*this.hSlider.max=10;//设置 hSlider 最高位置值。
			*this.hSlider.value=2;//设置 hSlider 当前位置值。
			*this.hSlider.tick=1;//设置 hSlider 刻度值。
			*this.hSlider.x=100;//设置 hSlider 对象的属性 x 的值，用于控制 hSlider 对象的显示位置。
			*this.hSlider.y=100;//设置 hSlider 对象的属性 y 的值，用于控制 hSlider 对象的显示位置。
			*this.hSlider.changeHandler=new Handler(this,this.onChange);//设置 hSlider 位置变化处理器。
			*Laya.stage.addChild(this.hSlider);//把 hSlider 添加到显示列表。
			*}
		*private onChange(value:number):void {
			*console.log("滑块的位置： value="+value);
			*}
		*}
	*</listing>
	*
	*@see laya.ui.Slider
	*/
	//class laya.ui.HSlider extends laya.ui.Slider
	var HSlider=(function(_super){
		/**
		*创建一个 <code>HSlider</code> 类实例。
		*@param skin 皮肤。
		*/
		function HSlider(skin){
			HSlider.__super.call(this,skin);
			this.isVertical=false;
		}

		__class(HSlider,'laya.ui.HSlider',_super);
		return HSlider;
	})(Slider)


	/**
	*<code>Radio</code> 控件使用户可在一组互相排斥的选择中做出一种选择。
	*用户一次只能选择 <code>Radio</code> 组中的一个成员。选择未选中的组成员将取消选择该组中当前所选的 <code>Radio</code> 控件。
	*@see laya.ui.RadioGroup
	*/
	//class laya.ui.Radio extends laya.ui.Button
	var Radio=(function(_super){
		function Radio(skin,label){
			this._value=null;
			(label===void 0)&& (label="");
			Radio.__super.call(this,skin,label);
		}

		__class(Radio,'laya.ui.Radio',_super);
		var __proto=Radio.prototype;
		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._value=null;
		}

		/**@inheritDoc */
		__proto.preinitialize=function(){
			laya.ui.Component.prototype.preinitialize.call(this);
			this.toggle=false;
			this._autoSize=false;
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			_super.prototype.initialize.call(this);
			this.createText();
			this._text.align="left";
			this._text.valign="top";
			this._text.width=0;
			this.on(/*laya.events.Event.CLICK*/"click",this,this.onClick);
		}

		/**
		*@private
		*对象的<code>Event.CLICK</code>事件侦听处理函数。
		*/
		__proto.onClick=function(e){
			this.selected=true;
		}

		/**
		*获取或设置 <code>Radio</code> 关联的可选用户定义值。
		*/
		__getset(0,__proto,'value',function(){
			return this._value !=null ? this._value :this.label;
			},function(obj){
			this._value=obj;
		});

		return Radio;
	})(Button)


	/**
	*
	*使用 <code>VScrollBar</code> （垂直 <code>ScrollBar</code> ）控件，可以在因数据太多而不能在显示区域完全显示时控制显示的数据部分。
	*
	*@example 以下示例代码，创建了一个 <code>VScrollBar</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.vScrollBar;
		*import laya.ui.VScrollBar;
		*import laya.utils.Handler;
		*public class VScrollBar_Example
		*{
			*private var vScrollBar:VScrollBar;
			*public function VScrollBar_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"],Handler.create(this,onLoadComplete));
				*}
			*private function onLoadComplete():void
			*{
				*vScrollBar=new VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
				*vScrollBar.skin="resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
				*vScrollBar.x=100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
				*vScrollBar.y=100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
				*vScrollBar.changeHandler=new Handler(this,onChange);//设置 vScrollBar 的滚动变化处理器。
				*Laya.stage.addChild(vScrollBar);//将此 vScrollBar 对象添加到显示列表。
				*}
			*private function onChange(value:Number):void
			*{
				*trace("滚动条的位置： value="+value);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var vScrollBar;
	*var res=["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"];
	*Laya.loader.load(res,laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*vScrollBar=new laya.ui.VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
		*vScrollBar.skin="resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
		*vScrollBar.x=100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
		*vScrollBar.y=100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
		*vScrollBar.changeHandler=new laya.utils.Handler(this,onChange);//设置 vScrollBar 的滚动变化处理器。
		*Laya.stage.addChild(vScrollBar);//将此 vScrollBar 对象添加到显示列表。
		*}
	*function onChange(value){
		*console.log("滚动条的位置： value="+value);
		*}
	*</listing>
	*<listing version="3.0">
	*import VScrollBar=laya.ui.VScrollBar;
	*import Handler=laya.utils.Handler;
	*class VScrollBar_Example {
		*private vScrollBar:VScrollBar;
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/vscroll.png","resource/ui/vscroll$bar.png","resource/ui/vscroll$down.png","resource/ui/vscroll$up.png"],Handler.create(this,this.onLoadComplete));
			*}
		*private onLoadComplete():void {
			*this.vScrollBar=new VScrollBar();//创建一个 vScrollBar 类的实例对象 hScrollBar 。
			*this.vScrollBar.skin="resource/ui/vscroll.png";//设置 vScrollBar 的皮肤。
			*this.vScrollBar.x=100;//设置 vScrollBar 对象的属性 x 的值，用于控制 vScrollBar 对象的显示位置。
			*this.vScrollBar.y=100;//设置 vScrollBar 对象的属性 y 的值，用于控制 vScrollBar 对象的显示位置。
			*this.vScrollBar.changeHandler=new Handler(this,this.onChange);//设置 vScrollBar 的滚动变化处理器。
			*Laya.stage.addChild(this.vScrollBar);//将此 vScrollBar 对象添加到显示列表。
			*}
		*private onChange(value:number):void {
			*console.log("滚动条的位置： value="+value);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.VScrollBar extends laya.ui.ScrollBar
	var VScrollBar=(function(_super){
		function VScrollBar(){VScrollBar.__super.call(this);;
		};

		__class(VScrollBar,'laya.ui.VScrollBar',_super);
		return VScrollBar;
	})(ScrollBar)


	/**
	*<code>TextInput</code> 类用于创建显示对象以显示和输入文本。
	*
	*@example 以下示例代码，创建了一个 <code>TextInput</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.display.Stage;
		*import laya.ui.TextInput;
		*import laya.utils.Handler;
		*public class TextInput_Example
		*{
			*public function TextInput_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/input.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*var textInput:TextInput=new TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
				*textInput.skin="resource/ui/input.png";//设置 textInput 的皮肤。
				*textInput.sizeGrid="4,4,4,4";//设置 textInput 的网格信息。
				*textInput.color="#008fff";//设置 textInput 的文本颜色。
				*textInput.font="Arial";//设置 textInput 的文本字体。
				*textInput.bold=true;//设置 textInput 的文本显示为粗体。
				*textInput.fontSize=30;//设置 textInput 的字体大小。
				*textInput.wordWrap=true;//设置 textInput 的文本自动换行。
				*textInput.x=100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
				*textInput.y=100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
				*textInput.width=300;//设置 textInput 的宽度。
				*textInput.height=200;//设置 textInput 的高度。
				*Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load(["resource/ui/input.png"],laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*var textInput=new laya.ui.TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
		*textInput.skin="resource/ui/input.png";//设置 textInput 的皮肤。
		*textInput.sizeGrid="4,4,4,4";//设置 textInput 的网格信息。
		*textInput.color="#008fff";//设置 textInput 的文本颜色。
		*textInput.font="Arial";//设置 textInput 的文本字体。
		*textInput.bold=true;//设置 textInput 的文本显示为粗体。
		*textInput.fontSize=30;//设置 textInput 的字体大小。
		*textInput.wordWrap=true;//设置 textInput 的文本自动换行。
		*textInput.x=100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
		*textInput.y=100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
		*textInput.width=300;//设置 textInput 的宽度。
		*textInput.height=200;//设置 textInput 的高度。
		*Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
		*}
	*</listing>
	*<listing version="3.0">
	*import Stage=laya.display.Stage;
	*import TextInput=laya.ui.TextInput;
	*import Handler=laya.utils.Handler;
	*class TextInput_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/input.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*var textInput:TextInput=new TextInput("这是一个TextInput实例。");//创建一个 TextInput 类的实例对象 textInput 。
			*textInput.skin="resource/ui/input.png";//设置 textInput 的皮肤。
			*textInput.sizeGrid="4,4,4,4";//设置 textInput 的网格信息。
			*textInput.color="#008fff";//设置 textInput 的文本颜色。
			*textInput.font="Arial";//设置 textInput 的文本字体。
			*textInput.bold=true;//设置 textInput 的文本显示为粗体。
			*textInput.fontSize=30;//设置 textInput 的字体大小。
			*textInput.wordWrap=true;//设置 textInput 的文本自动换行。
			*textInput.x=100;//设置 textInput 对象的属性 x 的值，用于控制 textInput 对象的显示位置。
			*textInput.y=100;//设置 textInput 对象的属性 y 的值，用于控制 textInput 对象的显示位置。
			*textInput.width=300;//设置 textInput 的宽度。
			*textInput.height=200;//设置 textInput 的高度。
			*Laya.stage.addChild(textInput);//将 textInput 添加到显示列表。
			*}
		*}
	*</listing>
	*/
	//class laya.ui.TextInput extends laya.ui.Label
	var TextInput=(function(_super){
		function TextInput(text){
			this._bg=null;
			this._skin=null;
			TextInput.__super.call(this);
			(text===void 0)&& (text="");
			this.text=text;
			this.skin=this.skin;
		}

		__class(TextInput,'laya.ui.TextInput',_super);
		var __proto=TextInput.prototype;
		/**@inheritDoc */
		__proto.preinitialize=function(){
			this.mouseEnabled=true;
		}

		/**@inheritDoc */
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._bg && this._bg.destroy();
			this._bg=null;
		}

		/**@inheritDoc */
		__proto.createChildren=function(){
			this.addChild(this._tf=new Input());
			this._tf.padding=Styles.inputLabelPadding;
			this._tf.on(/*laya.events.Event.INPUT*/"input",this,this.onInput);
			this._tf.on(/*laya.events.Event.ENTER*/"enter",this,this.onEnter);
			this._tf.on(/*laya.events.Event.BLUR*/"blur",this,this.onBlur);
			this._tf.on(/*laya.events.Event.FOCUS*/"focus",this,this.onFocus);
		}

		/**
		*@private
		*/
		__proto.onFocus=function(e){
			this.event(/*laya.events.Event.FOCUS*/"focus",this);
		}

		/**
		*@private
		*/
		__proto.onBlur=function(e){
			this.event(/*laya.events.Event.BLUR*/"blur",this);
		}

		/**
		*@private
		*/
		__proto.onInput=function(e){
			this.event(/*laya.events.Event.INPUT*/"input",this);
		}

		/**
		*@private
		*/
		__proto.onEnter=function(e){
			this.event(/*laya.events.Event.ENTER*/"enter",this);
		}

		/**@inheritDoc */
		__proto.initialize=function(){
			this.width=128;
			this.height=22;
		}

		/**选中输入框内的文本。*/
		__proto.select=function(){
			(this._tf).select();
		}

		/**
		*表示此对象包含的文本背景 <code>AutoBitmap</code> 组件实例。
		*/
		__getset(0,__proto,'bg',function(){
			return this._bg;
			},function(value){
			this.graphics=this._bg=value;
		});

		/**
		*<p>指示当前是否是文本域。</p>
		*值为true表示当前是文本域，否则不是文本域。
		*/
		__getset(0,__proto,'multiline',function(){
			return (this._tf).multiline;
			},function(value){
			(this._tf).multiline=value;
		});

		/**
		*设置原生input输入框的y坐标偏移。
		*/
		__getset(0,__proto,'inputElementYAdjuster',function(){
			return (this._tf).inputElementYAdjuster;
			},function(value){
			(this._tf).inputElementYAdjuster=value;
		});

		/**
		*@copy laya.ui.Image#skin
		*/
		__getset(0,__proto,'skin',function(){
			return this._skin;
			},function(value){
			if (this._skin !=value){
				this._skin=value;
				this._bg || (this.graphics=this._bg=new AutoBitmap());
				this._bg.source=Loader.getRes(this._skin);
				this._width && (this._bg.width=this._width);
				this._height && (this._bg.height=this._height);
			}
		});

		/**
		*<p>当前实例的背景图（ <code>AutoBitmap</code> ）实例的有效缩放网格数据。</p>
		*<p>数据格式："上边距,右边距,下边距,左边距,是否重复填充(值为0：不重复填充，1：重复填充)"，以逗号分隔。
		*<ul><li>例如："4,4,4,4,1"</li></ul></p>
		*@see laya.ui.AutoBitmap.sizeGrid
		*/
		__getset(0,__proto,'sizeGrid',function(){
			return this._bg && this._bg.sizeGrid ? this._bg.sizeGrid.join(","):null;
			},function(value){
			this._bg || (this.graphics=this._bg=new AutoBitmap());
			this._bg.sizeGrid=UIUtils.fillArray(Styles.defaultSizeGrid,value,Number);
		});

		/**
		*设置原生input输入框的x坐标偏移。
		*/
		__getset(0,__proto,'inputElementXAdjuster',function(){
			return (this._tf).inputElementXAdjuster;
			},function(value){
			(this._tf).inputElementXAdjuster=value;
		});

		/**@inheritDoc */
		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this._bg && (this._bg.width=value);
		});

		/**@inheritDoc */
		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this._bg && (this._bg.height=value);
		});

		/**
		*设置可编辑状态。
		*/
		__getset(0,__proto,'editable',function(){
			return (this._tf).editable;
			},function(value){
			(this._tf).editable=value;
		});

		/**限制输入的字符。*/
		__getset(0,__proto,'restrict',function(){
			return (this._tf).restrict;
			},function(pattern){
			(this._tf).restrict=pattern;
		});

		/**
		*@copy laya.display.Input#prompt
		*/
		__getset(0,__proto,'prompt',function(){
			return (this._tf).prompt;
			},function(value){
			(this._tf).prompt=value;
		});

		/**
		*@copy laya.display.Input#promptColor
		*/
		__getset(0,__proto,'promptColor',function(){
			return (this._tf).promptColor;
			},function(value){
			(this._tf).promptColor=value;
		});

		/**
		*@copy laya.display.Input#maxChars
		*/
		__getset(0,__proto,'maxChars',function(){
			return (this._tf).maxChars;
			},function(value){
			(this._tf).maxChars=value;
		});

		/**
		*@copy laya.display.Input#focus
		*/
		__getset(0,__proto,'focus',function(){
			return (this._tf).focus;
			},function(value){
			(this._tf).focus=value;
		});

		/**
		*@copy laya.display.Input#type
		*/
		__getset(0,__proto,'type',function(){
			return (this._tf).type;
			},function(value){
			(this._tf).type=value;
		});

		return TextInput;
	})(Label)


	/**
	*使用 <code>VSlider</code> 控件，用户可以通过在滑块轨道的终点之间移动滑块来选择值。
	*<p> <code>VSlider</code> 控件采用垂直方向。滑块轨道从下往上扩展，而标签位于轨道的左右两侧。</p>
	*
	*@example 以下示例代码，创建了一个 <code>VSlider</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.HSlider;
		*import laya.ui.VSlider;
		*import laya.utils.Handler;
		*public class VSlider_Example
		*{
			*private var vSlider:VSlider;
			*public function VSlider_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/vslider.png","resource/ui/vslider$bar.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*vSlider=new VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
				*vSlider.skin="resource/ui/vslider.png";//设置 vSlider 的皮肤。
				*vSlider.min=0;//设置 vSlider 最低位置值。
				*vSlider.max=10;//设置 vSlider 最高位置值。
				*vSlider.value=2;//设置 vSlider 当前位置值。
				*vSlider.tick=1;//设置 vSlider 刻度值。
				*vSlider.x=100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
				*vSlider.y=100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
				*vSlider.changeHandler=new Handler(this,onChange);//设置 vSlider 位置变化处理器。
				*Laya.stage.addChild(vSlider);//把 vSlider 添加到显示列表。
				*}
			*private function onChange(value:Number):void
			*{
				*trace("滑块的位置： value="+value);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var vSlider;
	*Laya.loader.load(["resource/ui/vslider.png","resource/ui/vslider$bar.png"],laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*vSlider=new laya.ui.VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
		*vSlider.skin="resource/ui/vslider.png";//设置 vSlider 的皮肤。
		*vSlider.min=0;//设置 vSlider 最低位置值。
		*vSlider.max=10;//设置 vSlider 最高位置值。
		*vSlider.value=2;//设置 vSlider 当前位置值。
		*vSlider.tick=1;//设置 vSlider 刻度值。
		*vSlider.x=100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
		*vSlider.y=100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
		*vSlider.changeHandler=new laya.utils.Handler(this,onChange);//设置 vSlider 位置变化处理器。
		*Laya.stage.addChild(vSlider);//把 vSlider 添加到显示列表。
		*}
	*function onChange(value){
		*console.log("滑块的位置： value="+value);
		*}
	*</listing>
	*<listing version="3.0">
	*import HSlider=laya.ui.HSlider;
	*import VSlider=laya.ui.VSlider;
	*import Handler=laya.utils.Handler;
	*class VSlider_Example {
		*private vSlider:VSlider;
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/vslider.png","resource/ui/vslider$bar.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*this.vSlider=new VSlider();//创建一个 VSlider 类的实例对象 vSlider 。
			*this.vSlider.skin="resource/ui/vslider.png";//设置 vSlider 的皮肤。
			*this.vSlider.min=0;//设置 vSlider 最低位置值。
			*this.vSlider.max=10;//设置 vSlider 最高位置值。
			*this.vSlider.value=2;//设置 vSlider 当前位置值。
			*this.vSlider.tick=1;//设置 vSlider 刻度值。
			*this.vSlider.x=100;//设置 vSlider 对象的属性 x 的值，用于控制 vSlider 对象的显示位置。
			*this.vSlider.y=100;//设置 vSlider 对象的属性 y 的值，用于控制 vSlider 对象的显示位置。
			*this.vSlider.changeHandler=new Handler(this,this.onChange);//设置 vSlider 位置变化处理器。
			*Laya.stage.addChild(this.vSlider);//把 vSlider 添加到显示列表。
			*}
		*private onChange(value:number):void {
			*console.log("滑块的位置： value="+value);
			*}
		*}
	*</listing>
	*@see laya.ui.Slider
	*/
	//class laya.ui.VSlider extends laya.ui.Slider
	var VSlider=(function(_super){
		function VSlider(){VSlider.__super.call(this);;
		};

		__class(VSlider,'laya.ui.VSlider',_super);
		return VSlider;
	})(Slider)


	/**
	*<code>Dialog</code> 组件是一个弹出对话框。
	*
	*@example 以下示例代码，创建了一个 <code>Dialog</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Dialog;
		*import laya.utils.Handler;
		*public class Dialog_Example
		*{
			*private var dialog:Dialog_Instance;
			*public function Dialog_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load("resource/ui/btn_close.png",Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*dialog=new Dialog_Instance();//创建一个 Dialog_Instance 类的实例对象 dialog。
				*dialog.dragArea="0,0,150,50";//设置 dialog 的拖拽区域。
				*dialog.show();//显示 dialog。
				*dialog.closeHandler=new Handler(this,onClose);//设置 dialog 的关闭函数处理器。
				*}
			*private function onClose(name:String):void
			*{
				*if (name==Dialog.CLOSE)
				*{
					*trace("通过点击 name 为"+name+"的组件，关闭了dialog。");
					*}
				*}
			*}
		*}
	*import laya.ui.Button;
	*import laya.ui.Dialog;
	*import laya.ui.Image;
	*class Dialog_Instance extends Dialog
	*{
		*function Dialog_Instance():void
		*{
			*var bg:Image=new Image("resource/ui/bg.png");
			*bg.sizeGrid="40,10,5,10";
			*bg.width=150;
			*bg.height=250;
			*addChild(bg);
			*var image:Image=new Image("resource/ui/image.png");
			*addChild(image);
			*var button:Button=new Button("resource/ui/btn_close.png");
			*button.name=Dialog.CLOSE;//设置button的name属性值。
			*button.x=0;
			*button.y=0;
			*addChild(button);
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*var dialog;
	*Laya.loader.load("resource/ui/btn_close.png",laya.utils.Handler.create(this,loadComplete));//加载资源
	*(function (_super){//新建一个类Dialog_Instance继承自laya.ui.Dialog。
		*function Dialog_Instance(){
			*Dialog_Instance.__super.call(this);//初始化父类
			*var bg=new laya.ui.Image("resource/ui/bg.png");//新建一个 Image 类的实例 bg 。
			*bg.sizeGrid="10,40,10,5";//设置 bg 的网格信息。
			*bg.width=150;//设置 bg 的宽度。
			*bg.height=250;//设置 bg 的高度。
			*this.addChild(bg);//将 bg 添加到显示列表。
			*var image=new laya.ui.Image("resource/ui/image.png");//新建一个 Image 类的实例 image 。
			*this.addChild(image);//将 image 添加到显示列表。
			*var button=new laya.ui.Button("resource/ui/btn_close.png");//新建一个 Button 类的实例 bg 。
			*button.name=laya.ui.Dialog.CLOSE;//设置 button 的 name 属性值。
			*button.x=0;//设置 button 对象的属性 x 的值，用于控制 button 对象的显示位置。
			*button.y=0;//设置 button 对象的属性 y 的值，用于控制 button 对象的显示位置。
			*this.addChild(button);//将 button 添加到显示列表。
			*};
		*Laya.class(Dialog_Instance,"mypackage.dialogExample.Dialog_Instance",_super);//注册类Dialog_Instance。
		*})(laya.ui.Dialog);
	*function loadComplete(){
		*console.log("资源加载完成！");
		*dialog=new mypackage.dialogExample.Dialog_Instance();//创建一个 Dialog_Instance 类的实例对象 dialog。
		*dialog.dragArea="0,0,150,50";//设置 dialog 的拖拽区域。
		*dialog.show();//显示 dialog。
		*dialog.closeHandler=new laya.utils.Handler(this,onClose);//设置 dialog 的关闭函数处理器。
		*}
	*function onClose(name){
		*if (name==laya.ui.Dialog.CLOSE){
			*console.log("通过点击 name 为"+name+"的组件，关闭了dialog。");
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*import Dialog=laya.ui.Dialog;
	*import Handler=laya.utils.Handler;
	*class Dialog_Example {
		*private dialog:Dialog_Instance;
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load("resource/ui/btn_close.png",Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*this.dialog=new Dialog_Instance();//创建一个 Dialog_Instance 类的实例对象 dialog。
			*this.dialog.dragArea="0,0,150,50";//设置 dialog 的拖拽区域。
			*this.dialog.show();//显示 dialog。
			*this.dialog.closeHandler=new Handler(this,this.onClose);//设置 dialog 的关闭函数处理器。
			*}
		*private onClose(name:string):void {
			*if (name==Dialog.CLOSE){
				*console.log("通过点击 name 为"+name+"的组件，关闭了dialog。");
				*}
			*}
		*}
	*import Button=laya.ui.Button;
	*class Dialog_Instance extends Dialog {
		*Dialog_Instance():void {
			*var bg:laya.ui.Image=new laya.ui.Image("resource/ui/bg.png");
			*bg.sizeGrid="40,10,5,10";
			*bg.width=150;
			*bg.height=250;
			*this.addChild(bg);
			*var image:laya.ui.Image=new laya.ui.Image("resource/ui/image.png");
			*this.addChild(image);
			*var button:Button=new Button("resource/ui/btn_close.png");
			*button.name=Dialog.CLOSE;//设置button的name属性值。
			*button.x=0;
			*button.y=0;
			*this.addChild(button);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.Dialog extends laya.ui.View
	var Dialog=(function(_super){
		var DialogManager;
		function Dialog(){
			this.popupCenter=true;
			this.closeHandler=null;
			this._dragArea=null;
			Dialog.__super.call(this);
		}

		__class(Dialog,'laya.ui.Dialog',_super);
		var __proto=Dialog.prototype;
		/**@inheritDoc */
		__proto.initialize=function(){
			var dragTarget=this.getChildByName("drag");
			if (dragTarget){
				this.dragArea=dragTarget.x+","+dragTarget.y+","+dragTarget.width+","+dragTarget.height;
				dragTarget.removeSelf();
			}
			this.on(/*laya.events.Event.CLICK*/"click",this,this.onClick);
		}

		/**
		*@private (protected)
		*对象的 <code>Event.CLICK</code> 点击事件侦听处理函数。
		*/
		__proto.onClick=function(e){
			var btn=e.target;
			if (btn){
				switch (btn.name){
					case "close":
					case "cancel":
					case "sure":
					case "no":
					case "ok":
					case "yes":
						this.close(btn.name);
						break ;
					}
			}
		}

		/**
		*显示对话框（以非模式窗口方式显示）。
		*@param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
		*/
		__proto.show=function(closeOther){
			(closeOther===void 0)&& (closeOther=false);
			Dialog.manager.show(this,closeOther);
		}

		/**
		*显示对话框（以模式窗口方式显示）。
		*@param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
		*/
		__proto.popup=function(closeOther){
			(closeOther===void 0)&& (closeOther=false);
			Dialog.manager.popup(this,closeOther);
		}

		/**
		*关闭对话框。
		*@param type 如果是点击默认关闭按钮触发，则传入关闭按钮的名字(name)，否则为null。
		*/
		__proto.close=function(type){
			Dialog.manager.close(this);
			this.closeHandler && this.closeHandler.runWith(type);
		}

		/**
		*@private
		*/
		__proto.onMouseDown=function(e){
			var point=this.getMousePoint();
			if (this._dragArea.contains(point.x,point.y))this.startDrag();
			else this.stopDrag();
		}

		/**
		*用来指定对话框的拖拽区域。默认值为"0,0,0,0"。
		*<p><b>格式：</b>构成一个矩形所需的 x,y,width,heith 值，用逗号连接为字符串。
		*例如："0,0,100,200"。
		*</p>
		*
		*@see #includeExamplesSummary 请参考示例
		*@return
		*/
		__getset(0,__proto,'dragArea',function(){
			if (this._dragArea)return this._dragArea.toString();
			return null;
			},function(value){
			if (value){
				var a=UIUtils.fillArray([0,0,0,0],value,Number);
				this._dragArea=new Rectangle(a[0],a[1],a[2],a[3]);
				this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouseDown);
				}else {
				this._dragArea=null;
				this.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this.onMouseDown);
			}
		});

		/**
		*弹出框的显示状态；如果弹框处于显示中，则为true，否则为false;
		*@return
		*/
		__getset(0,__proto,'isPopup',function(){
			return this.parent !=null;
		});

		/**@private 获取对话框管理器。*/
		__getset(1,Dialog,'manager',function(){
			return Dialog._manager || (Dialog._manager=new DialogManager());
		},laya.ui.View._$SET_manager);

		Dialog.closeAll=function(){
			Dialog.manager.closeAll();
		}

		Dialog.CLOSE="close";
		Dialog.CANCEL="cancel";
		Dialog.SURE="sure";
		Dialog.NO="no";
		Dialog.OK="ok";
		Dialog.YES="yes";
		Dialog._manager=null
		Dialog.__init$=function(){
			/**
			*<code>DialogManager</code> 类用来管理对话框。
			*/
			//class DialogManager extends laya.display.Sprite
			DialogManager=(function(_super){
				function DialogManager(){
					this._stage=null;
					DialogManager.__super.call(this);
					this.dialogLayer=new Sprite();
					this.modalLayer=new Sprite();
					this.maskLayer=new Sprite();
					this.mouseEnabled=this.dialogLayer.mouseEnabled=this.modalLayer.mouseEnabled=this.maskLayer.mouseEnabled=true;
					this.addChild(this.dialogLayer);
					this.addChild(this.modalLayer);
					this._stage=Laya.stage;
					this._stage.addChild(this);
					this._stage.on(/*laya.events.Event.RESIZE*/"resize",this,this.onResize);
					this.onResize(null);
				}
				__class(DialogManager,'',_super);
				var __proto=DialogManager.prototype;
				/**
				*@private
				*舞台的 <code>Event.RESIZE</code> 事件侦听处理函数。
				*@param e
				*/
				__proto.onResize=function(e){
					var width=this.maskLayer.width=this._stage.width;
					var height=this.maskLayer.height=this._stage.height;
					this.maskLayer.graphics.clear();
					this.maskLayer.graphics.drawRect(0,0,width,height,UIConfig.popupBgColor);
					this.maskLayer.alpha=UIConfig.popupBgAlpha;
					for (var i=this.dialogLayer.numChildren-1;i >-1;i--){
						var item=this.dialogLayer.getChildAt(i);
						if (item.popupCenter)this._centerDialog(item);
					}
					for (i=this.modalLayer.numChildren-1;i >-1;i--){
						item=this.modalLayer.getChildAt(i);
						if (item.isPopup){
							if (item.popupCenter)this._centerDialog(item);
						}
					}
				}
				__proto._centerDialog=function(dialog){
					dialog.x=Math.round(((this._stage.width-dialog.width)>> 1)+dialog.pivotX);
					dialog.y=Math.round(((this._stage.height-dialog.height)>> 1)+dialog.pivotY);
				}
				/**
				*显示对话框(非模式窗口类型)。
				*@param dialog 需要显示的对象框 <code>Dialog</code> 实例。
				*@param closeOther 是否关闭其它对话框，若值为ture，则关闭其它的对话框。
				*/
				__proto.show=function(dialog,closeOther){
					(closeOther===void 0)&& (closeOther=false);
					if (closeOther)this.dialogLayer.removeChildren();
					if (dialog.popupCenter)this._centerDialog(dialog);
					this.dialogLayer.addChild(dialog);
					this.event(/*laya.events.Event.OPEN*/"open");
				}
				/**
				*显示对话框(模式窗口类型)。
				*@param dialog 需要显示的对象框 <code>Dialog</code> 实例。
				*@param closeOther 是否关闭其它对话框，若值为ture，则关闭其它的对话框。
				*/
				__proto.popup=function(dialog,closeOther){
					(closeOther===void 0)&& (closeOther=false);
					if (closeOther)this.modalLayer.removeChildren();
					if (dialog.popupCenter)this._centerDialog(dialog);
					this.modalLayer.addChild(this.maskLayer);
					this.modalLayer.addChild(dialog);
					this.event(/*laya.events.Event.OPEN*/"open");
				}
				/**
				*关闭对话框。
				*@param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
				*/
				__proto.close=function(dialog){
					dialog.removeSelf();
					if (this.modalLayer.numChildren < 2){
						this.maskLayer.removeSelf();
						}else {
						this.modalLayer.setChildIndex(this.maskLayer,this.modalLayer.numChildren-2);
					}
					this.event(/*laya.events.Event.CLOSE*/"close");
				}
				/**
				*关闭所有的对话框。
				*/
				__proto.closeAll=function(){
					this.dialogLayer.removeChildren();
					this.modalLayer.removeChildren();
					this.maskLayer.removeSelf();
					this.event(/*laya.events.Event.CLOSE*/"close");
				}
				return DialogManager;
			})(Sprite)
		}

		return Dialog;
	})(View)


	/**
	*<code>VBox</code> 是一个垂直布局容器类。
	*/
	//class laya.ui.HBox extends laya.ui.LayoutBox
	var HBox=(function(_super){
		/**
		*创建一个新的 <code>HBox</code> 类实例。
		*/
		function HBox(){
			HBox.__super.call(this);
		}

		__class(HBox,'laya.ui.HBox',_super);
		var __proto=HBox.prototype;
		/**@inheritDoc */
		__proto.sortItem=function(items){
			if (items)items.sort(function(a,b){return a.x > b.x ? 1 :-1
			});
		}

		/**@inheritDoc */
		__proto.changeItems=function(){
			this._itemChanged=false;
			var items=[];
			var maxHeight=0;
			for (var i=0,n=this.numChildren;i < n;i++){
				var item=this.getChildAt(i);
				if (item){
					items.push(item);
					maxHeight=Math.max(maxHeight,item.displayHeight);
				}
			}
			this.sortItem(items);
			var left=0;
			var $each_item;
			/*for each*/for($each_item in items){
				item=items[$each_item];
				item.x=left;
				left+=item.displayWidth+this._space;
				if (this._align=="top"){
					item.y=0;
					}else if (this._align=="middle"){
					item.y=(maxHeight-item.displayHeight)*0.5;
					}else if (this._align=="bottom"){
					item.y=maxHeight-item.displayHeight;
				}
			}
			this.changeSize();
		}

		HBox.NONE="none";
		HBox.TOP="top";
		HBox.MIDDLE="middle";
		HBox.BOTTOM="bottom";
		return HBox;
	})(LayoutBox)


	/**
	*<code>RadioGroup</code> 控件定义一组 <code>Radio</code> 控件，这些控件相互排斥；
	*因此，用户每次只能选择一个 <code>Radio</code> 控件。
	*
	*@example 以下示例代码，创建了一个 <code>RadioGroup</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Radio;
		*import laya.ui.RadioGroup;
		*import laya.utils.Handler;
		*public class RadioGroup_Example
		*{
			*public function RadioGroup_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/radio.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*var radioGroup:RadioGroup=new RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
				*radioGroup.pos(100,100);//设置 radioGroup 的位置信息。
				*radioGroup.labels="item0,item1,item2";//设置 radioGroup 的标签集。
				*radioGroup.skin="resource/ui/radio.png";//设置 radioGroup 的皮肤。
				*radioGroup.space=10;//设置 radioGroup 的项间隔距离。
				*radioGroup.selectHandler=new Handler(this,onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
				*Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
				*}
			*private function onSelect(index:int):void
			*{
				*trace("当前选择的单选按钮索引: index= ",index);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load(["resource/ui/radio.png"],laya.utils.Handler.create(this,onLoadComplete));
	*function onLoadComplete(){
		*var radioGroup=new laya.ui.RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
		*radioGroup.pos(100,100);//设置 radioGroup 的位置信息。
		*radioGroup.labels="item0,item1,item2";//设置 radioGroup 的标签集。
		*radioGroup.skin="resource/ui/radio.png";//设置 radioGroup 的皮肤。
		*radioGroup.space=10;//设置 radioGroup 的项间隔距离。
		*radioGroup.selectHandler=new laya.utils.Handler(this,onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
		*Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
		*}
	*function onSelect(index){
		*console.log("当前选择的单选按钮索引: index= ",index);
		*}
	*</listing>
	*<listing version="3.0">
	*import Radio=laya.ui.Radio;
	*import RadioGroup=laya.ui.RadioGroup;
	*import Handler=laya.utils.Handler;
	*class RadioGroup_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/radio.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*var radioGroup:RadioGroup=new RadioGroup();//创建一个 RadioGroup 类的实例对象 radioGroup 。
			*radioGroup.pos(100,100);//设置 radioGroup 的位置信息。
			*radioGroup.labels="item0,item1,item2";//设置 radioGroup 的标签集。
			*radioGroup.skin="resource/ui/radio.png";//设置 radioGroup 的皮肤。
			*radioGroup.space=10;//设置 radioGroup 的项间隔距离。
			*radioGroup.selectHandler=new Handler(this,this.onSelect);//设置 radioGroup 的选择项发生改变时执行的处理器。
			*Laya.stage.addChild(radioGroup);//将 radioGroup 添加到显示列表。
			*}
		*private onSelect(index:number):void {
			*console.log("当前选择的单选按钮索引: index= ",index);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.RadioGroup extends laya.ui.Group
	var RadioGroup=(function(_super){
		function RadioGroup(){RadioGroup.__super.call(this);;
		};

		__class(RadioGroup,'laya.ui.RadioGroup',_super);
		var __proto=RadioGroup.prototype;
		/**@inheritDoc */
		__proto.createItem=function(skin,label){
			return new Radio(skin,label);
		}

		return RadioGroup;
	})(Group)


	/**
	*<code>Tab</code> 组件用来定义选项卡按钮组。 *
	*@internal <p>属性：<code>selectedIndex</code> 的默认值为-1。</p>
	*
	*@example 以下示例代码，创建了一个 <code>Tab</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.Tab;
		*import laya.utils.Handler;
		*public class Tab_Example
		*{
			*public function Tab_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/tab.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*var tab:Tab=new Tab();//创建一个 Tab 类的实例对象 tab 。
				*tab.skin="resource/ui/tab.png";//设置 tab 的皮肤。
				*tab.labels="item0,item1,item2";//设置 tab 的标签集。
				*tab.x=100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
				*tab.y=100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
				*tab.selectHandler=new Handler(this,onSelect);//设置 tab 的选择项发生改变时执行的处理器。
				*Laya.stage.addChild(tab);//将 tab 添到显示列表。
				*}
			*private function onSelect(index:int):void
			*{
				*trace("当前选择的表情页索引: index= ",index);
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load(["resource/ui/tab.png"],laya.utils.Handler.create(this,onLoadComplete));
	*function onLoadComplete(){
		*var tab=new laya.ui.Tab();//创建一个 Tab 类的实例对象 tab 。
		*tab.skin="resource/ui/tab.png";//设置 tab 的皮肤。
		*tab.labels="item0,item1,item2";//设置 tab 的标签集。
		*tab.x=100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
		*tab.y=100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
		*tab.selectHandler=new laya.utils.Handler(this,onSelect);//设置 tab 的选择项发生改变时执行的处理器。
		*Laya.stage.addChild(tab);//将 tab 添到显示列表。
		*}
	*function onSelect(index){
		*console.log("当前选择的标签页索引: index= ",index);
		*}
	*</listing>
	*<listing version="3.0">
	*import Tab=laya.ui.Tab;
	*import Handler=laya.utils.Handler;
	*class Tab_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/tab.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*var tab:Tab=new Tab();//创建一个 Tab 类的实例对象 tab 。
			*tab.skin="resource/ui/tab.png";//设置 tab 的皮肤。
			*tab.labels="item0,item1,item2";//设置 tab 的标签集。
			*tab.x=100;//设置 tab 对象的属性 x 的值，用于控制 tab 对象的显示位置。
			*tab.y=100;//设置 tab 对象的属性 y 的值，用于控制 tab 对象的显示位置。
			*tab.selectHandler=new Handler(this,this.onSelect);//设置 tab 的选择项发生改变时执行的处理器。
			*Laya.stage.addChild(tab);//将 tab 添到显示列表。
			*}
		*private onSelect(index:number):void {
			*console.log("当前选择的表情页索引: index= ",index);
			*}
		*}
	*</listing>
	*/
	//class laya.ui.Tab extends laya.ui.Group
	var Tab=(function(_super){
		function Tab(){Tab.__super.call(this);;
		};

		__class(Tab,'laya.ui.Tab',_super);
		var __proto=Tab.prototype;
		/**
		*@private
		*@inheritDoc
		*/
		__proto.createItem=function(skin,label){
			return new Button(skin,label);
		}

		return Tab;
	})(Group)


	/**
	*<code>VBox</code> 是一个垂直布局容器类。
	*/
	//class laya.ui.VBox extends laya.ui.LayoutBox
	var VBox=(function(_super){
		/**
		*创建一个新的 <code>VBox</code> 类实例。
		*/
		function VBox(){
			VBox.__super.call(this);
		}

		__class(VBox,'laya.ui.VBox',_super);
		var __proto=VBox.prototype;
		/**@inheritDoc */
		__proto.changeItems=function(){
			this._itemChanged=false;
			var items=[];
			var maxWidth=0;
			for (var i=0,n=this.numChildren;i < n;i++){
				var item=this.getChildAt(i);
				if (item){
					items.push(item);
					maxWidth=Math.max(maxWidth,item.displayWidth);
				}
			}
			this.sortItem(items);
			var top=0;
			var $each_item;
			/*for each*/for($each_item in items){
				item=items[$each_item];
				item.y=top;
				top+=item.displayHeight+this._space;
				if (this._align=="left"){
					item.x=0;
					}else if (this._align=="center"){
					item.x=(maxWidth-item.displayWidth)*0.5;
					}else if (this._align=="right"){
					item.x=maxWidth-item.displayWidth;
				}
			}
			this.changeSize();
		}

		VBox.NONE="none";
		VBox.LEFT="left";
		VBox.CENTER="center";
		VBox.RIGHT="right";
		return VBox;
	})(LayoutBox)


	/**
	*<code>TextArea</code> 类用于创建显示对象以显示和输入文本。
	*@example 以下示例代码，创建了一个 <code>TextArea</code> 实例。
	*<listing version="3.0">
	*package
	*{
		*import laya.ui.TextArea;
		*import laya.utils.Handler;
		*public class TextArea_Example
		*{
			*public function TextArea_Example()
			*{
				*Laya.init(640,800);//设置游戏画布宽高。
				*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
				*Laya.loader.load(["resource/ui/input.png"],Handler.create(this,onLoadComplete));//加载资源。
				*}
			*private function onLoadComplete():void
			*{
				*var textArea:TextArea=new TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
				*textArea.skin="resource/ui/input.png";//设置 textArea 的皮肤。
				*textArea.sizeGrid="4,4,4,4";//设置 textArea 的网格信息。
				*textArea.color="#008fff";//设置 textArea 的文本颜色。
				*textArea.font="Arial";//设置 textArea 的字体。
				*textArea.bold=true;//设置 textArea 的文本显示为粗体。
				*textArea.fontSize=20;//设置 textArea 的文本字体大小。
				*textArea.wordWrap=true;//设置 textArea 的文本自动换行。
				*textArea.x=100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
				*textArea.y=100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
				*textArea.width=300;//设置 textArea 的宽度。
				*textArea.height=200;//设置 textArea 的高度。
				*Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
				*}
			*}
		*}
	*</listing>
	*<listing version="3.0">
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色
	*Laya.loader.load(["resource/ui/input.png"],laya.utils.Handler.create(this,onLoadComplete));//加载资源。
	*function onLoadComplete(){
		*var textArea=new laya.ui.TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
		*textArea.skin="resource/ui/input.png";//设置 textArea 的皮肤。
		*textArea.sizeGrid="4,4,4,4";//设置 textArea 的网格信息。
		*textArea.color="#008fff";//设置 textArea 的文本颜色。
		*textArea.font="Arial";//设置 textArea 的字体。
		*textArea.bold=true;//设置 textArea 的文本显示为粗体。
		*textArea.fontSize=20;//设置 textArea 的文本字体大小。
		*textArea.wordWrap=true;//设置 textArea 的文本自动换行。
		*textArea.x=100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
		*textArea.y=100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
		*textArea.width=300;//设置 textArea 的宽度。
		*textArea.height=200;//设置 textArea 的高度。
		*Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
		*}
	*</listing>
	*<listing version="3.0">
	*import TextArea=laya.ui.TextArea;
	*import Handler=laya.utils.Handler;
	*class TextArea_Example {
		*constructor(){
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*Laya.loader.load(["resource/ui/input.png"],Handler.create(this,this.onLoadComplete));//加载资源。
			*}
		*private onLoadComplete():void {
			*var textArea:TextArea=new TextArea("这个一个TextArea实例。");//创建一个 TextArea 类的实例对象 textArea 。
			*textArea.skin="resource/ui/input.png";//设置 textArea 的皮肤。
			*textArea.sizeGrid="4,4,4,4";//设置 textArea 的网格信息。
			*textArea.color="#008fff";//设置 textArea 的文本颜色。
			*textArea.font="Arial";//设置 textArea 的字体。
			*textArea.bold=true;//设置 textArea 的文本显示为粗体。
			*textArea.fontSize=20;//设置 textArea 的文本字体大小。
			*textArea.wordWrap=true;//设置 textArea 的文本自动换行。
			*textArea.x=100;//设置 textArea 对象的属性 x 的值，用于控制 textArea 对象的显示位置。
			*textArea.y=100;//设置 textArea 对象的属性 y 的值，用于控制 textArea 对象的显示位置。
			*textArea.width=300;//设置 textArea 的宽度。
			*textArea.height=200;//设置 textArea 的高度。
			*Laya.stage.addChild(textArea);//将 textArea 添加到显示列表。
			*}
		*}
	*</listing>
	*/
	//class laya.ui.TextArea extends laya.ui.TextInput
	var TextArea=(function(_super){
		function TextArea(text){
			this._vScrollBar=null;
			this._hScrollBar=null;
			(text===void 0)&& (text="");
			TextArea.__super.call(this,text);
		}

		__class(TextArea,'laya.ui.TextArea',_super);
		var __proto=TextArea.prototype;
		__proto.destroy=function(destroyChild){
			(destroyChild===void 0)&& (destroyChild=true);
			_super.prototype.destroy.call(this,destroyChild);
			this._vScrollBar && this._vScrollBar.destroy();
			this._hScrollBar && this._hScrollBar.destroy();
			this._vScrollBar=null;
			this._hScrollBar=null;
		}

		__proto.initialize=function(){
			this.width=180;
			this.height=150;
			this._tf.wordWrap=true;
			this.multiline=true;
		}

		__proto.onVBarChanged=function(e){
			if (this._tf.scrollY !=this._vScrollBar.value){
				this._tf.scrollY=this._vScrollBar.value;
			}
		}

		__proto.onHBarChanged=function(e){
			if (this._tf.scrollX !=this._hScrollBar.value){
				this._tf.scrollX=this._hScrollBar.value;
			}
		}

		__proto.changeScroll=function(){
			var vShow=this._vScrollBar && this._tf.maxScrollY > 0;
			var hShow=this._hScrollBar && this._tf.maxScrollX > 0;
			var showWidth=vShow ? this._width-this._vScrollBar.width :this._width;
			var showHeight=hShow ? this._height-this._hScrollBar.height :this._height;
			var padding=this._tf.padding || Styles.labelPadding;
			this._tf.width=showWidth;
			this._tf.height=showHeight;
			if (this._vScrollBar){
				this._vScrollBar.x=this._width-this._vScrollBar.width-padding[2];
				this._vScrollBar.y=padding[1];
				this._vScrollBar.height=this._height-(hShow ? this._hScrollBar.height :0)-padding[1]-padding[3];
				this._vScrollBar.scrollSize=1;
				this._vScrollBar.thumbPercent=showHeight / Math.max(this._tf.textHeight,showHeight);
				this._vScrollBar.setScroll(1,this._tf.maxScrollY,this._tf.scrollY);
				this._vScrollBar.visible=vShow;
			}
			if (this._hScrollBar){
				this._hScrollBar.x=padding[0];
				this._hScrollBar.y=this._height-this._hScrollBar.height-padding[3];
				this._hScrollBar.width=this._width-(vShow ? this._vScrollBar.width :0)-padding[0]-padding[2];
				this._hScrollBar.scrollSize=Math.max(showWidth *0.033,1);
				this._hScrollBar.thumbPercent=showWidth / Math.max(this._tf.textWidth,showWidth);
				this._hScrollBar.setScroll(0,this.maxScrollX,this.scrollX);
				this._hScrollBar.visible=hShow;
			}
		}

		/**滚动到某个位置*/
		__proto.scrollTo=function(y){
			this.commitMeasure();
			this._tf.scrollY=y;
		}

		/**垂直滚动值*/
		__getset(0,__proto,'scrollY',function(){
			return this._tf.scrollY;
		});

		__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
			_super.prototype._$set_width.call(this,value);
			this.callLater(this.changeScroll);
		});

		/**水平滚动条实体*/
		__getset(0,__proto,'hScrollBar',function(){
			return this._hScrollBar;
		});

		__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
			_super.prototype._$set_height.call(this,value);
			this.callLater(this.changeScroll);
		});

		/**水平滚动最大值*/
		__getset(0,__proto,'maxScrollX',function(){
			return this._tf.maxScrollX;
		});

		/**垂直滚动条皮肤*/
		__getset(0,__proto,'vScrollBarSkin',function(){
			return this._vScrollBar ? this._vScrollBar.skin :null;
			},function(value){
			if (this._vScrollBar==null){
				this.addChild(this._vScrollBar=new VScrollBar());
				this._vScrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onVBarChanged);
				this._vScrollBar.target=this._tf;
				this.callLater(this.changeScroll);
			}
			this._vScrollBar.skin=value;
		});

		/**水平滚动条皮肤*/
		__getset(0,__proto,'hScrollBarSkin',function(){
			return this._hScrollBar ? this._hScrollBar.skin :null;
			},function(value){
			if (this._hScrollBar==null){
				this.addChild(this._hScrollBar=new HScrollBar());
				this._hScrollBar.on(/*laya.events.Event.CHANGE*/"change",this,this.onHBarChanged);
				this._hScrollBar.mouseWheelEnable=false;
				this._hScrollBar.target=this._tf;
				this.callLater(this.changeScroll);
			}
			this._hScrollBar.skin=value;
		});

		/**垂直滚动条实体*/
		__getset(0,__proto,'vScrollBar',function(){
			return this._vScrollBar;
		});

		/**垂直滚动最大值*/
		__getset(0,__proto,'maxScrollY',function(){
			return this._tf.maxScrollY;
		});

		/**水平滚动值*/
		__getset(0,__proto,'scrollX',function(){
			return this._tf.scrollX;
		});

		return TextArea;
	})(TextInput)


	/**
	*IDE插件对话框基类，用as3扩展IDE插件对话框，请继承此类
	*/
	//class laya.ide.plugin.PluginDialog extends laya.ui.Dialog
	var PluginDialog=(function(_super){
		function PluginDialog(){PluginDialog.__super.call(this);;
		};

		__class(PluginDialog,'laya.ide.plugin.PluginDialog',_super);
		var __proto=PluginDialog.prototype;
		/**
		*设置对话框的UI对象
		*@param content UI对象
		*/
		__proto.setContent=function(content){}
		return PluginDialog;
	})(Dialog)


	Laya.__init([EventDispatcher,Render,Browser,Timer,LoaderManager,LocalStorage,TimeLine,Dialog,View]);
	new Main();

})(window,document,Laya);
