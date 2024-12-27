"use strict;"
/*
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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
Runtime.WordPress.Admin.CSS = {
	name: "Runtime.WordPress.Admin.CSS",
	extends: Runtime.Web.Component,
	methods:
	{
	},
};
Object.assign(Runtime.WordPress.Admin.CSS,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.RowButtons","Runtime.Widget.Select","Runtime.Widget.TextArea","Runtime.Widget.Dialog.Dialog","Runtime.Widget.Table.Table"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(":root{--widget-font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif}#core_ui_root{margin-top: 20px}.widget_table.h-6434 .widget_table__top_buttons.h-a598{margin-bottom: calc(var(--widget-space) * 2)}.widget_table.h-6434 .widget_table__table{border: 1px solid #ccc;border-radius: 4px}.widget_table.h-6434 .widget_table__th{text-align: left}.widget_table.h-6434 .widget_table__th,.widget_table.h-6434 .widget_table__td{border-bottom: 1px solid #ccc;padding: 10px}.widget_table.h-6434 .widget_table__tr:nth-child(odd){background-color: white}.widget_table.h-6434 .widget_table__tr:nth-child(even){background-color: #f0f0f0}.widget_select.h-d72d{max-width: 100%}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.CSS";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.CSS);
window["Runtime.WordPress.Admin.CSS"] = Runtime.WordPress.Admin.CSS;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.CSS;