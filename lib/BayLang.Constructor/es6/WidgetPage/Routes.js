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
BayLang.Constructor.WidgetPage.Routes = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
BayLang.Constructor.WidgetPage.Routes.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
BayLang.Constructor.WidgetPage.Routes.prototype.constructor = BayLang.Constructor.WidgetPage.Routes;
Object.assign(BayLang.Constructor.WidgetPage.Routes.prototype,
{
});
Object.assign(BayLang.Constructor.WidgetPage.Routes, Runtime.Web.BaseRoute);
Object.assign(BayLang.Constructor.WidgetPage.Routes,
{
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		return "clear";
	},
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return Runtime.Vector.from([new Runtime.Web.RouteModel(Runtime.Map.from({"uri":"/open/widget","name":"baylang:widget:debug","model":"BayLang.Constructor.WidgetPage.WidgetPageModel"}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.WidgetPage";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.WidgetPage.Routes";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseRoute";
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
Runtime.rtl.defClass(BayLang.Constructor.WidgetPage.Routes);
window["BayLang.Constructor.WidgetPage.Routes"] = BayLang.Constructor.WidgetPage.Routes;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.WidgetPage.Routes;