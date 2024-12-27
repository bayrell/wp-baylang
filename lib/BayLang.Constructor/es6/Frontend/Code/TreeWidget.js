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
if (typeof BayLang.Constructor.Frontend.Code == 'undefined') BayLang.Constructor.Frontend.Code = {};
BayLang.Constructor.Frontend.Code.TreeWidget = {
	name: "BayLang.Constructor.Frontend.Code.TreeWidget",
	extends: Runtime.Widget.Tree.TreeWidget,
	methods:
	{
		renderItemContent: function(item, path)
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {"class":this._class_name(["tree_widget__item_icon"])});
			
			if (item.kind == "dir")
			{
				if (!item.is_loaded)
				{
					/* Element 'span' */
					let __v1 = this._e(__v0, "span", {});
					
					/* Raw */
					this._t(__v1, new Runtime.RawString("&#128448;"));
				}
				else if (item.open)
				{
					/* Element 'span' */
					let __v2 = this._e(__v0, "span", {});
					
					/* Raw */
					this._t(__v2, new Runtime.RawString("&#128449;"));
				}
				else
				{
					/* Element 'span' */
					let __v3 = this._e(__v0, "span", {});
					
					/* Raw */
					this._t(__v3, new Runtime.RawString("&#128448;"));
				}
			}
			else
			{
				/* Element 'span' */
				let __v4 = this._e(__v0, "span", {});
				
				/* Raw */
				this._t(__v4, new Runtime.RawString("&#128462;"));
			}
			
			/* Render */
			this._t(__v, this.renderItemLabel(item, path));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(BayLang.Constructor.Frontend.Code.TreeWidget,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Tree.TreeWidget"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".tree_widget__item_icon.h-67f7{display: inline-block;font-family: monospace;text-align: center;cursor: pointer;width: 24px}");
		return res;
	},
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Code";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Code.TreeWidget";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Tree.TreeWidget";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Code.TreeWidget);
window["BayLang.Constructor.Frontend.Code.TreeWidget"] = BayLang.Constructor.Frontend.Code.TreeWidget;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Code.TreeWidget;