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
Runtime.Web.RenderContainer = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.RenderContainer.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.RenderContainer.prototype.constructor = Runtime.Web.RenderContainer;
Object.assign(Runtime.Web.RenderContainer.prototype,
{
	/**
	 * Create layout
	 */
	createLayout: function(layout_name)
	{
		/* Get layout class name */
		var params = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.LAYOUT_MODEL_NAME, Runtime.Map.from({"class_name":"Runtime.Web.BaseLayoutModel","layout_name":layout_name}));
		/* Create layout */
		this.layout = Runtime.rtl.newInstance(params.get("class_name"));
		this.layout.setLayoutName(layout_name);
		/* Call create layout */
		Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.CREATE_LAYOUT, Runtime.Map.from({"container":this}));
	},
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		var layout_name = "default";
		if (this.route == null)
		{
			return layout_name;
		}
		/* Set layout name from route */
		if (this.route.layout)
		{
			layout_name = this.route.layout;
		}
		else if (this.route.route_class)
		{
			var getLayoutName = new Runtime.Callback(this.route.route_class, "getLayoutName");
			if (getLayoutName.exists())
			{
				layout_name = getLayoutName.apply();
			}
		}
		/* Set layout name */
		return layout_name;
	},
	/**
	 * Resolve container
	 */
	resolve: async function()
	{
		/* Resolve request */
		await this.resolveRequest();
		/* Resolve route */
		await this.resolveRoute();
	},
	/**
	 * Resolve request and find route
	 */
	resolveRequest: async function()
	{
		/* Call hook find route */
		await Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.FIND_ROUTE_BEFORE, Runtime.Map.from({"container":this}));
		/* Exit if route find */
		if (this.route != null)
		{
			return Promise.resolve();
		}
		if (this.response != null)
		{
			return Promise.resolve();
		}
		/* Find route */
		var routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteList");
		this.route = routes.findRoute(this);
		/* Call hook found route */
		await Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.FIND_ROUTE_AFTER, Runtime.Map.from({"container":this}));
		/* Call middleware */
		await this.callRouteMiddleware(this);
	},
	/**
	 * Resolve route
	 */
	resolveRoute: async function()
	{
		if (this.response)
		{
			return Promise.resolve();
		}
		/* Create layout */
		var layout_name = this.getLayoutName();
		this.createLayout(layout_name);
		/* Set layout params */
		this.layout.backend_storage = this.backend_storage;
		this.layout.route = this.route;
		/* Call route before */
		await Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.ROUTE_BEFORE, Runtime.Map.from({"container":this}));
		/* Call layout route before */
		await this.layout.onActionBefore(this);
		/* Load layout data */
		await this.layout.loadData(this);
		/* Render route */
		if (this.route != null)
		{
			await this.route.render(this);
		}
		/* Call layout route after */
		await this.layout.onActionAfter(this);
		/* Call route after */
		await Runtime.rtl.getContext().callHookAsync(Runtime.Web.Hooks.AppHook.ROUTE_AFTER, Runtime.Map.from({"container":this}));
	},
	/**
	 * Call route middleware
	 */
	callRouteMiddleware: async function()
	{
		if (this.route && this.route.middleware)
		{
			for (var i = 0; i < this.route.middleware.count(); i++)
			{
				var middleware = this.route.middleware.get(i);
				await Runtime.rtl.apply(middleware, Runtime.Vector.from([this]));
			}
		}
		/* Call hook middleware */
		await Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.ROUTE_MIDDLEWARE, Runtime.Map.from({"container":this}));
	},
	/**
	 * Set response
	 */
	setResponse: function(response)
	{
		this.response = response;
	},
	/**
	 * Render page model
	 */
	renderPageModel: async function(model_name)
	{
		this.layout.setPageModel(model_name);
		var page_model = this.layout.getPageModel();
		if (page_model)
		{
			await page_model.actionIndex(this);
		}
	},
	/**
	 * Render page and setup response
	 */
	renderPage: function(page_class_name)
	{
		if (page_class_name == undefined) page_class_name = "";
		this.response = new Runtime.Web.RenderResponse();
		this.layout.current_page_class = page_class_name;
		if (page_class_name != "")
		{
			this.layout.addComponent(page_class_name);
		}
	},
	/**
	 * Cancel route
	 */
	cancelRoute: function()
	{
		if (this.base_route)
		{
			this.base_route.cancelRoute();
		}
	},
	/**
	 * Add cookie
	 */
	addCookie: function(cookie)
	{
		this.cookies.set(cookie.name, cookie);
	},
	/**
	 * Returns frontend environments
	 */
	getFrontendEnvironments: function()
	{
		var environments = Runtime.Map.from({});
		/* Setup environments */
		var arr = Runtime.Vector.from(["CLOUD_ENV","DEBUG","LOCALE","TZ","TZ_OFFSET","ROUTE_PREFIX"]);
		/* Call hook */
		var params = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.ENVIRONMENTS, Runtime.Map.from({"arr":arr,"environments":environments}));
		/* Get result */
		arr = params.get("arr");
		environments = params.get("environments");
		/* Copy environments */
		for (var i = 0; i < arr.count(); i++)
		{
			var name = arr.get(i);
			environments.set(name, Runtime.rtl.getContext().env(name));
		}
		return environments;
	},
	/**
	 * Export data
	 */
	exportData: function()
	{
		var data = Runtime.Map.from({"entry_point":Runtime.rtl.getContext().entry_point,"modules":Runtime.rtl.getContext().start_modules,"environments":this.getFrontendEnvironments()});
		/* Create serializer */
		var serializer = new Runtime.Serializer();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		serializer.setFlag(Runtime.Serializer.ENCODE);
		/* Export data */
		serializer.process(this, "layout", data);
		/* Call hook */
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.EXPORT_CONTAINER_DATA, Runtime.Map.from({"container":this,"data":data}));
		return data;
	},
	/**
	 * Import data
	 */
	importData: function(data)
	{
		/* Call hook */
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.IMPORT_CONTAINER_DATA_BEFORE, Runtime.Map.from({"container":this,"data":data}));
		/* Create serializer */
		var serializer = new Runtime.SerializerNative();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		/* Create layout */
		var layout_name = data.get("layout").get("layout_name");
		this.createLayout(layout_name);
		/* Load data */
		serializer.setFlag(Runtime.Serializer.DECODE);
		this.layout.serialize(serializer, data.get("layout"));
		/* Call hook */
		Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.IMPORT_CONTAINER_DATA_AFTER, Runtime.Map.from({"container":this,"data":data}));
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.base_route = null;
		this.request = null;
		this.response = null;
		this.route = null;
		this.layout = null;
		this.cookies = Runtime.Map.from({});
		this.backend_storage = Runtime.Map.from({});
	},
});
Object.assign(Runtime.Web.RenderContainer, Runtime.BaseObject);
Object.assign(Runtime.Web.RenderContainer,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RenderContainer";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.Web.RenderContainer);
window["Runtime.Web.RenderContainer"] = Runtime.Web.RenderContainer;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RenderContainer;