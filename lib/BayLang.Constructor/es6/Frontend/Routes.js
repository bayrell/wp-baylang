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
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
BayLang.Constructor.Frontend.Routes = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
BayLang.Constructor.Frontend.Routes.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
BayLang.Constructor.Frontend.Routes.prototype.constructor = BayLang.Constructor.Frontend.Routes;
Object.assign(BayLang.Constructor.Frontend.Routes.prototype,
{
});
Object.assign(BayLang.Constructor.Frontend.Routes, Runtime.Web.BaseRoute);
Object.assign(BayLang.Constructor.Frontend.Routes,
{
	/**
	 * Returns layout name
	 */
	getLayoutName: function()
	{
		return "admin";
	},
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return Runtime.Vector.from([new Runtime.Web.RouteModel(Runtime.Map.from({"uri":"/","name":"baylang:project:list","model":"BayLang.Constructor.Frontend.Project.ProjectListModel"})),new Runtime.Web.RouteModel(Runtime.Map.from({"uri":"/project/{project_id}/settings","name":"baylang:project:settings","model":"BayLang.Constructor.Frontend.Settings.SettingsModel","layout":"project"})),new Runtime.Web.RouteModel(Runtime.Map.from({"uri":"/project/{project_id}/modules","name":"baylang:project:modules","model":"BayLang.Constructor.Frontend.Module.ModuleListModel","layout":"project"})),new Runtime.Web.RouteModel(Runtime.Map.from({"uri":"/project/{project_id}/widgets","name":"baylang:project:widgets","model":"BayLang.Constructor.Frontend.Widget.WidgetListModel","layout":"project"})),new Runtime.Web.RouteModel(Runtime.Map.from({"uri":"/project/{project_id}/widgets/{widget_name}","name":"baylang:project:widget:edit","model":"BayLang.Constructor.Frontend.Editor.WidgetEditPageModel","layout":"clear"})),new Runtime.Web.RouteModel(Runtime.Map.from({"uri":"/project/{project_id}/code","name":"baylang:project:code:editor","model":"BayLang.Constructor.Frontend.Code.CodeEditorModel","layout":"clear"}))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Routes";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Routes);
window["BayLang.Constructor.Frontend.Routes"] = BayLang.Constructor.Frontend.Routes;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Routes;