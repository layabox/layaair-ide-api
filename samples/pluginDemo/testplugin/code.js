function Plugin() {
	var ui;
	var panel;
	this.setUI = function (panel) {
		console.log("setUI", panel)
		this.panel = panel;
		this.ui = panel.div;
		this.txt = this.ui.getElementsByClassName("content")[0]
		console.log("setUI", this.ui, this.txt)
	}

	this.init = function () {
		console.log("init", laya.ide.event.IDEEvent.PROPPANEL_SETBYOBJ, this, this.initByObj)
		debugger;
		ide.managers.Notice.listen(laya.ide.event.IDEEvent.PROPPANEL_SETBYOBJ, this, this.initByObj);
		ide.managers.Notice.listen("openJSplugin", this, this.open);
		ide.managers.Notice.listen("closeJSplugin", this, this.close);
	}
	this.open = function () {
		if (this.panel) this.panel.show();
	}
	this.close = function () {
		if (this.panel) this.panel.close();
	}
	this.initByObj = function (data, type, id) {
		console.log("initByObj:", data, type, id)
		var tKey;
		var tStr = "";
		var lines = []
		for (tKey in data) {
			lines.push(tKey + ":" + data[tKey])
		}
		tStr = lines.join("\n");
		this.txt.innerText = tStr;
	}
	this.init();
}

function JSPluginDialog() {
	var ui;
	var panel;
	this.setUI = function (panel) {
		console.log("setUI", panel)
		this.panel = panel;
		this.ui = panel.div;
		this.txt = this.ui.getElementsByClassName("content")[0]
		console.log("setUI", this.ui, this.txt)
	}

	this.init = function () {
		this.width = 300;
		this.height = 200;
		ide.managers.Notice.listen("openJSDialog", this, this.open);
		ide.managers.Notice.listen("closeJSDialog", this, this.close);
	}
	this.open = function () {
		if (this.panel) this.panel.popup();
	}
	this.close = function () {
		if (this.panel) this.panel.close();
	}
	this.init();
}
plugin = {}
plugin.Plugin = Plugin;
plugin.PluginDialog = JSPluginDialog;