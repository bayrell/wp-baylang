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
Runtime.Web.BaseLayoutModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Web.BaseLayoutModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Web.BaseLayoutModel.prototype.constructor = Runtime.Web.BaseLayoutModel;
Object.assign(Runtime.Web.BaseLayoutModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		this.layout = this;
		if (params == null)
		{
			return ;
		}
		if (params.has("backend_storage"))
		{
			this.backend_storage = params.get("backend_storage");
		}
		if (params.has("route"))
		{
			this.route = params.get("route");
		}
	},
	/**
	 * Route before
	 */
	onActionBefore: async function(container)
	{
	},
	/**
	 * Route after
	 */
	onActionAfter: async function(container)
	{
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "components", data);
		serializer.process(this, "current_page_class", data);
		serializer.process(this, "current_page_model", data);
		serializer.process(this, "content_type", data);
		serializer.process(this, "f_inc", data);
		serializer.process(this, "locale", data);
		serializer.process(this, "layout_name", data);
		serializer.process(this, "request_full_uri", data);
		serializer.process(this, "request_host", data);
		serializer.process(this, "request_https", data);
		serializer.process(this, "request_query", data);
		serializer.process(this, "request_uri", data);
		serializer.process(this, "route", data);
		serializer.process(this, "routes", data);
		serializer.process(this, "title", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Returns page model
	 */
	getPageModel: function()
	{
		return this.widgets.get(this.current_page_model);
	},
	/**
	 * Returns page class name
	 */
	getPageClassName: function()
	{
		return this.current_page_class;
	},
	/**
	 * Set current page model
	 */
	setPageModel: function(class_name)
	{
		var page_model = this.getWidget(class_name);
		/* Create page model */
		if (page_model == null)
		{
			page_model = this.addWidget(class_name, Runtime.Map.from({"widget_name":class_name}));
		}
		/* Change current page model */
		this.current_page_model = class_name;
		return page_model;
	},
	/**
	 * Set layout name
	 */
	setLayoutName: function(layout_name)
	{
		this.layout_name = layout_name;
	},
	/**
	 * Set page title
	 */
	setPageTitle: function(title)
	{
		this.title = title;
	},
	/**
	 * Returns full page title
	 */
	getFullTitle: function()
	{
		return this.title;
	},
	/**
	 * Returns locale
	 */
	getLocale: function()
	{
		return this.locale;
	},
	/**
	 * Returns site name
	 */
	getSiteName: function()
	{
		return "";
	},
	/**
	 * Returns layout component name
	 */
	getLayoutComponentName: function()
	{
		var class_name = this.component;
		var params = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.LAYOUT_COMPONENT_NAME, Runtime.Map.from({"layout":this,"layout_name":this.layout_name,"class_name":class_name}));
		return Runtime.rtl.attr(params, "class_name");
	},
	/**
	 * Returns Core UI
	 */
	getCoreUI: function()
	{
		return "Runtime.Web.CoreUI";
	},
	/**
	 * Call Api
	 */
	callApi: async function(params)
	{
		/* Returns bus */
		var bus = Runtime.Web.Bus.getApi(params.get("service", "app"));
		var api = await bus.send(params);
		return Promise.resolve(api);
	},
	/**
	 * Returns header components
	 */
	getHeaderComponents: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns body components
	 */
	getBodyComponents: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns footer components
	 */
	getFooterComponents: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Add component
	 */
	addComponent: function(class_name)
	{
		if (this.components.indexOf(class_name) == -1)
		{
			this.components.push(class_name);
		}
	},
	/**
	 * Returns all components
	 * @return Collection<string>
	 */
	getComponents: function(components)
	{
		if (components == undefined) components = null;
		if (components == null)
		{
			components = Runtime.Vector.from([]);
		}
		var res = new Runtime.Vector();
		var cache = new Runtime.Map();
		components = components.concat(this.components);
		components.push(this.getLayoutComponentName());
		/* Call hook */
		var d = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.COMPONENTS, Runtime.Map.from({"layout":this,"components":components}));
		/* Get new components */
		components = d.get("components");
		/* Extends components */
		this.constructor._getRequiredComponents(res, cache, components);
		return res.removeDuplicates();
	},
	/**
	 * Returns assets
	 */
	assets: function(path)
	{
		return Runtime.Web.Component.assets(path);
	},
	/**
	 * Returns url
	 */
	url: function(route_name, route_params, url_params)
	{
		if (route_params == undefined) route_params = null;
		if (url_params == undefined) url_params = null;
		if (!this.routes.has(route_name))
		{
			return null;
		}
		var route = this.routes.get(route_name);
		var domain = route.get("domain");
		var url = route.get("uri");
		if (route_params != null && url != null)
		{
			route_params.each((value, key) =>
			{
				var pos = Runtime.rs.indexOf(url, "{" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("}"));
				if (pos >= 0)
				{
					url = Runtime.rs.replace("{" + Runtime.rtl.toStr(key) + Runtime.rtl.toStr("}"), value, url);
				}
				else
				{
					url = Runtime.rs.url_get_add(url, key, value);
				}
			});
		}
		/* Set url */
		if (url == null)
		{
			url = "";
		}
		/* Add domain */
		var url_with_domain = url;
		if (domain)
		{
			url_with_domain = "//" + Runtime.rtl.toStr(domain) + Runtime.rtl.toStr(url);
		}
		/* Make url */
		var res = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.MAKE_URL, Runtime.Map.from({"domain":domain,"layout":this,"route":route,"route_name":route_name,"route_params":route_params,"url":url,"url_with_domain":url_with_domain,"url_params":(url_params) ? (url_params) : (Runtime.Map.from({}))}));
		var is_domain = (url_params) ? (url_params.get("domain", true)) : (true);
		return (is_domain) ? (res.get("url_with_domain")) : (res.get("url"));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Web.DefaultLayout";
		this.title = "";
		this.locale = Runtime.rtl.getContext().env("LOCALE");
		this.layout_name = "default";
		this.current_page_class = "";
		this.current_page_model = "";
		this.content_type = "UTF-8";
		this.route = null;
		this.request_full_uri = "";
		this.request_host = "";
		this.request_https = "";
		this.request_uri = "";
		this.request_query = null;
		this.components = Runtime.Vector.from([]);
		this.routes = Runtime.Map.from({});
		this.f_inc = "1";
	},
});
Object.assign(Runtime.Web.BaseLayoutModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Web.BaseLayoutModel,
{
	/**
	 * Returns required modules
	 * @param string class_name
	 * @return Collection<string>
	 */
	_getRequiredComponents: function(res, cache, components)
	{
		if (components == null)
		{
			return ;
		}
		for (var i = 0; i < components.count(); i++)
		{
			var class_name = components.item(i);
			if (class_name == "")
			{
				continue;
			}
			if (!cache.has(class_name))
			{
				cache.set(class_name, true);
				var f = new Runtime.Callback(class_name, "components");
				if (f.exists())
				{
					var sub_components = Runtime.rtl.apply(f);
					this._getRequiredComponents(res, cache, sub_components);
				}
				res.push(class_name);
			}
		}
	},
	/**
	 * Returns css
	 */
	getCss: function(components, css_vars)
	{
		if (css_vars == undefined) css_vars = null;
		if (css_vars == null)
		{
			css_vars = Runtime.rtl.getContext().callHook(Runtime.Web.Hooks.AppHook.CSS_VARS, css_vars);
		}
		var css = components.map((component_name) =>
		{
			if (component_name == "")
			{
				return "";
			}
			var f = new Runtime.Callback(component_name, "css");
			if (!f.exists())
			{
				return "";
			}
			var css = Runtime.rtl.apply(f, Runtime.Vector.from([css_vars]));
			return css;
		});
		css = css.map((s) =>
		{
			return Runtime.rs.trim(s);
		}).filter((s) =>
		{
			return s != "";
		});
		return Runtime.rs.trim(Runtime.rs.join("\n", css));
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseLayoutModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Web.BaseLayoutModel);
window["Runtime.Web.BaseLayoutModel"] = Runtime.Web.BaseLayoutModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseLayoutModel;