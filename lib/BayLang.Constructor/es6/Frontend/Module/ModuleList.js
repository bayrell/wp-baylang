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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Module == 'undefined') BayLang.Constructor.Frontend.Module = {};
BayLang.Constructor.Frontend.Module.ModuleList = {
	name: "BayLang.Constructor.Frontend.Module.ModuleList",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["modules_list"])});
			
			/* Component 'Table' */
			let __v1 = this._c(__v0, "Runtime.Widget.Table.Table", {"model":this._model(this.model.table),"class":this._class_name(["modules_table"])});
			
			return this._flatten(__v);
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Module.ModuleList,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.RowButtons","Runtime.Widget.Table.Table"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".top_buttons.h-e97b{margin-bottom: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Module";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Module.ModuleList";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Module.ModuleList);
window["BayLang.Constructor.Frontend.Module.ModuleList"] = BayLang.Constructor.Frontend.Module.ModuleList;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Module.ModuleList;