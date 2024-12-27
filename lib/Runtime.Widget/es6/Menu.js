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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.Menu = {
	name: "Runtime.Widget.Menu",
	extends: Runtime.Web.Component,
	props: {
		"items": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["menu", this.class])});
			
			for (let i = 0; i < this.items.count(); i++)
			{
				let item = this.items.get(i);
				
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["menu__item", ((this.menuActive(item.get("name"))) ? ("active") : (""))])});
				
				/* Element 'a' */
				let __v2 = this._e(__v1, "a", {"href":item.get("href"),"class":this._class_name(["nolink"])});
				
				/* Render */
				this._t(__v2, item.get("label"));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns true if menu is active
 */
		menuActive: function(route_name)
		{
			if (this.layout.route == null)
			{
				return false;
			}
			if (this.layout.route.name != route_name)
			{
				return false;
			}
			return true;
		},
	},
};
Object.assign(Runtime.Widget.Menu,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".menu__item.h-035f a{display: block;padding: 10px;border-bottom: 1px solid var(--widget-color-border)}.menu__item.h-035f a:hover{background-color: var(--widget-color-hover)}.menu__item.active.h-035f a,.menu__item.active.h-035f a.nolink,.menu__item.active.h-035f a.nolink:visited{background-color: var(--widget-color-selected);border-color: var(--widget-color-selected);color: var(--widget-color-selected-text)}.menu__item.h-035f:last-child a{border-bottom-width: 0px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Menu";
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
Runtime.rtl.defClass(Runtime.Widget.Menu);
window["Runtime.Widget.Menu"] = Runtime.Widget.Menu;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Menu;