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
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.DetectLanguage = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
Runtime.Web.Hooks.DetectLanguage.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
Runtime.Web.Hooks.DetectLanguage.prototype.constructor = Runtime.Web.Hooks.DetectLanguage;
Object.assign(Runtime.Web.Hooks.DetectLanguage.prototype,
{
	/**
	 * Setup
	 */
	setup: function(params)
	{
		Runtime.Web.Hooks.AppHook.prototype.setup.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("allowed_languages"))
		{
			this.allowed_languages = params.get("allowed_languages");
		}
		if (params.has("default_language"))
		{
			this.default_language = params.get("default_language");
		}
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CALL_API_BEFORE);
		this.register(this.constructor.MAKE_URL);
	},
	/**
	 * Call api before
	 */
	call_api_before: function(params)
	{
		var api_params = params.get("params");
		var layout = api_params.get("layout");
		/* Get api params */
		var __v0 = new Runtime.Monad(Runtime.rtl.attr(api_params, "service"));
		__v0 = __v0.monad(Runtime.rtl.m_to("string", "app"));
		var service = __v0.value();
		var __v1 = new Runtime.Monad(Runtime.rtl.attr(api_params, "api_name"));
		__v1 = __v1.monad(Runtime.rtl.m_to("string", ""));
		var api_name = __v1.value();
		var __v2 = new Runtime.Monad(Runtime.rtl.attr(api_params, "method_name"));
		__v2 = __v2.monad(Runtime.rtl.m_to("string", ""));
		var method_name = __v2.value();
		/* Build api url */
		var api_url_arr = Runtime.Vector.from([layout.lang,"api",service,api_name,method_name]);
		api_url_arr = api_url_arr.filter((s) =>
		{
			return s != "";
		});
		var api_url = "/" + Runtime.rtl.toStr(api_url_arr.join("/")) + Runtime.rtl.toStr("/");
		/* Set api url */
		params.set("api_url", api_url);
	},
	/**
	 * Make url
	 */
	make_url: function(params)
	{
		var route = params.get("route");
		var layout = params.get("layout");
		var domain = params.get("domain");
		var url = params.get("url");
		var url_params = params.get("url_params");
		var url_lang = (url_params.has("lang")) ? (url_params.get("lang")) : (layout.lang);
		/* Add language */
		if (route.enable_locale)
		{
			url = "/" + Runtime.rtl.toStr(url_lang) + Runtime.rtl.toStr(url);
			params.set("url", url);
			params.set("url_with_domain", url);
		}
		/* Add domain */
		if (domain)
		{
			params.set("url_with_domain", "//" + Runtime.rtl.toStr(domain) + Runtime.rtl.toStr(url));
		}
	},
	_init: function()
	{
		Runtime.Web.Hooks.AppHook.prototype._init.call(this);
		this.default_language = "";
		this.allowed_languages = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Web.Hooks.DetectLanguage, Runtime.Web.Hooks.AppHook);
Object.assign(Runtime.Web.Hooks.DetectLanguage,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.DetectLanguage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.DetectLanguage);
window["Runtime.Web.Hooks.DetectLanguage"] = Runtime.Web.Hooks.DetectLanguage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.DetectLanguage;