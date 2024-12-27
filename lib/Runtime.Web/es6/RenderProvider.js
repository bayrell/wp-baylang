"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.RenderProvider = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseProvider.call(this, params);
	if (params)
	{
		if (params.has("element"))
		{
			this.element = params.get("element");
		}
		if (params.has("layout"))
		{
			this.layout = params.get("layout");
		}
		if (params.has("layout_data"))
		{
			this.layout_data = params.get("layout_data");
		}
		if (params.has("layout_name"))
		{
			this.layout_name = params.get("layout_name");
		}
		if (params.has("selector"))
		{
			this.selector = params.get("selector");
		}
		if (params.has("enable_ssr"))
		{
			this.enable_ssr = params.get("enable_ssr");
		}
		if (params.has("break_start"))
		{
			this.break_start = params.get("break_start");
		}
	}
};
Runtime.Web.RenderProvider.prototype = Object.create(Runtime.BaseProvider.prototype);
Runtime.Web.RenderProvider.prototype.constructor = Runtime.Web.RenderProvider;
Object.assign(Runtime.Web.RenderProvider.prototype,
{
	/**
	 * Returns root element
	 */
	getRootElement: function()
	{
		return (this.element) ? (this.element) : (document.querySelector("." + Runtime.rtl.toStr(this.selector)));
	},
	/**
	 * Init provider
	 */
	init: async function()
	{
		await Runtime.BaseProvider.prototype.init.bind(this)();
		/* Create render container */
		var app = Runtime.rtl.getContext().getApp();
		this.container = app.createRenderContainer();
	},
	/**
	 * Returns app data
	 */
	getAppData: function()
	{
		var app_data = Runtime.rtl.attr(window, this.layout_data);
		if (!Runtime.rtl.exists(app_data))
		{
			throw new Runtime.Exceptions.ItemNotFound(this.layout_data, "App data")
		}
		/* Convert native to primitive */
		var serializer = new Runtime.SerializerNative();
		app_data = serializer.decode(app_data);
		return app_data;
	},
	/**
	 * Load layout
	 */
	loadLayout: function()
	{
		if (this.layout != null)
		{
			return ;
		}
		var Vue = Runtime.rtl.attr(window, "Vue");
		/* Get data */
		var app_data = this.getAppData();
		/* Import data */
		this.container.importData(app_data);
		/* Create layout */
		this.layout = Vue.reactive(this.container.layout);
		if (window) window[this.layout_name] = this.layout;
	},
	/**
	 * Start App
	 */
	startApp: function(options)
	{
		var vue_app = null;
		var Vue = Runtime.rtl.attr(window, "Vue");
		var registerLayout = null;
		registerLayout = (layout) =>
		{
			return {
				install: () => {
					vue_app.config.globalProperties.$layout = layout;
				},
			};
		};
		/* Get props */
		var component = Runtime.rtl.find_class(options.get("component"));
		var props = options.get("props");
		/* Create vue app */
		var enable_ssr = options.get("enable_ssr", false);
		if (enable_ssr)
		{
			vue_app = Vue.createSSRApp(component, props.toObject());
		}
		else
		{
			vue_app = Vue.createApp(component, props.toObject());
		}
		/* Register layout  */
		vue_app.use(registerLayout(this.layout));
		/* Register other modules */
		Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.VUE_MODULES, Runtime.Map.from({"render_provider":this,"vue":vue_app}));
		/* Mount app */
		vue_app.mount(options.get("element"), true);
		return vue_app;
	},
	/**
	 * Start provider
	 */
	start: async function()
	{
		await Runtime.BaseProvider.prototype.start.bind(this)();
		/* Load layout */
		this.loadLayout();
		if (this.break_start)
		{
			return Promise.resolve();
		}
		/* Start App */
		this.vue = this.startApp(Runtime.Map.from({"element":this.getRootElement(),"component":"Runtime.Web.AppComponent","enable_ssr":this.enable_ssr,"props":Runtime.Map.from({"key":"root","model":this.layout})}));
	},
	_init: function()
	{
		Runtime.BaseProvider.prototype._init.call(this);
		this.vue = null;
		this.layout = null;
		this.element = null;
		this.layout_data = "app_data";
		this.layout_name = "app_layout";
		this.selector = "core_ui_root";
		this.break_start = false;
		this.enable_ssr = true;
		this.events = new Runtime.Web.Events();
	},
});
Object.assign(Runtime.Web.RenderProvider, Runtime.BaseProvider);
Object.assign(Runtime.Web.RenderProvider,
{
	/**
	 * Returns instance
	 */
	instance: function()
	{
		return Runtime.rtl.getContext().provider("Runtime.Web.RenderProvider");
	},
	/**
	 * Next tick
	 */
	nextTick: async function(f)
	{
		var Vue = Runtime.rtl.attr(window, "Vue");
		await Vue.nextTick(f);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderProvider";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseProvider";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.Web.RenderProvider);
window["Runtime.Web.RenderProvider"] = Runtime.Web.RenderProvider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderProvider;
Runtime.Web.Component.render = function ()
{
	return this.render();
}
Runtime.Web.Component.computed = {
	layout: function (){
		return this.$layout;
	}
}
Runtime.Web.Component.beforeCreate = function ()
{
	return this.$options.onBeforeCreate();
}
Runtime.Web.Component.created = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onCreatedBefore", [this]);
	this.initWidget();
	this.onCreated();
	provider.events.emit("onCreated", [this]);
}
Runtime.Web.Component.beforeMount = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onBeforeMountBefore", [this]);
	this.onBeforeMount();
	provider.events.emit("onBeforeMount", [this]);
}
Runtime.Web.Component.mounted = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onMountedBefore", [this]);
	this.onMounted();
	provider.events.emit("onMounted", [this]);
}
Runtime.Web.Component.beforeUpdate = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onBeforeUpdateBefore", [this]);
	this.onBeforeUpdate();
	provider.events.emit("onBeforeUpdate", [this]);
}
Runtime.Web.Component.updated = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onUpdatedBefore", [this]);
	this.onUpdated();
	provider.events.emit("onUpdated", [this]);
}
Runtime.Web.Component.beforeUnmount = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onBeforeUnmountBefore", [this]);
	this.onBeforeUnmount();
	provider.events.emit("onBeforeUnmount", [this]);
}
Runtime.Web.Component.unmounted = function ()
{
	var provider = global_context.provider("Runtime.Web.RenderProvider");
	provider.events.emit("onUnmountBefore", [this]);
	this.onUnmount();
	provider.events.emit("onUnmount", [this]);
}