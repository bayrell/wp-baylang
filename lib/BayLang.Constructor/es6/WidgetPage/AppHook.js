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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.WidgetPage == 'undefined') BayLang.Constructor.WidgetPage = {};
BayLang.Constructor.WidgetPage.AppHook = function()
{
	Runtime.Web.Hooks.AppHook.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.AppHook.prototype = Object.create(Runtime.Web.Hooks.AppHook.prototype);
BayLang.Constructor.WidgetPage.AppHook.prototype.constructor = BayLang.Constructor.WidgetPage.AppHook;
Object.assign(BayLang.Constructor.WidgetPage.AppHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.CALL_API_BEFORE);
		this.register(this.constructor.VUE_MODULES);
	},
	/**
	 * Call api before
	 */
	call_api_before: function(params)
	{
		var post_data = params.get("post_data");
		var service = post_data.get("service");
		var api_name = post_data.get("api_name");
		var method_name = post_data.get("method_name");
		if (service != "constructor")
		{
			return ;
		}
		var api_url_arr = Runtime.Vector.from(["api","app",api_name,method_name]);
		api_url_arr = api_url_arr.filter((s) =>
		{
			return s != "";
		});
		var api_url = "/" + Runtime.rtl.toStr(api_url_arr.join("/")) + Runtime.rtl.toStr("/");
		params.set("api_url", api_url);
	},
	/**
	 * Init vue app
	 */
	vue_modules: function(params)
	{
		var registerComponent = null;
		registerComponent = () => {
			const mixin =
			{
				mounted: function () {
					this.$el.__component__ = this;
				},
				updated: function () {
					this.$el.__component__ = this;
				}
			};
			return {
				install: () => {
					vue_app.mixin(mixin);
				},
			};
		};
		var vue_app = params.get("vue");
		vue_app.use(registerComponent());
	},
});
Object.assign(BayLang.Constructor.WidgetPage.AppHook, Runtime.Web.Hooks.AppHook);
Object.assign(BayLang.Constructor.WidgetPage.AppHook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.AppHook";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.AppHook);
window["BayLang.Constructor.WidgetPage.AppHook"] = BayLang.Constructor.WidgetPage.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.AppHook;