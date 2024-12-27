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
if (typeof Runtime.Widget.ContextMenu == 'undefined') Runtime.Widget.ContextMenu = {};
Runtime.Widget.ContextMenu.ContextMenu = {
	name: "Runtime.Widget.ContextMenu.ContextMenu",
	extends: Runtime.Web.Component,
	methods:
	{
		renderItem: function(item)
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":() =>
			{
				this.model.onClickItem(item);
				this.emit("clickItem", Runtime.Vector.from([item]));
			},"class":this._class_name(["widget_context_menu__item", ((item.get("hidden") == true) ? ("hidden") : (""))]),"key":item.get("key")});
			
			/* Render */
			this._t(__v0, item.get("label"));
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			let props = this.getProps();
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", this._merge_attrs({"ref":"widget","class":this._class_name(["widget_context_menu", ((this.model.is_open) ? ("widget_context_menu--open") : ("widget_context_menu--hide"))])}, props));
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				let item = this.model.items.get(i);
				
				/* Render */
				this._t(__v0, this.renderItem(item));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns props
 */
		getProps: function()
		{
			var styles = Runtime.Vector.from([]);
			if (this.model.width != "")
			{
				styles.push("max-width: " + Runtime.rtl.toStr(this.model.width));
			}
			styles.push("left: " + Runtime.rtl.toStr(this.model.x) + Runtime.rtl.toStr("px;"));
			styles.push("top: " + Runtime.rtl.toStr(this.model.y) + Runtime.rtl.toStr("px;"));
			return Runtime.Map.from({"style":styles.join(";")});
		},
	},
};
Object.assign(Runtime.Widget.ContextMenu.ContextMenu,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_context_menu.h-eb03{display: none;position: absolute;z-index: 99;background-color: var(--widget-color-default);border: var(--widget-border-width) var(--widget-color-border) solid;border-bottom-width: 0}.widget_context_menu--open.h-eb03{display: block}.widget_context_menu__item.h-eb03{padding: var(--widget-button-padding-y) var(--widget-button-padding-y);border-bottom: var(--widget-border-width) var(--widget-color-border) solid;cursor: pointer;user-select: none}.widget_context_menu__item.hidden.h-eb03{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.ContextMenu";
	},
	getClassName: function()
	{
		return "Runtime.Widget.ContextMenu.ContextMenu";
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
Runtime.rtl.defClass(Runtime.Widget.ContextMenu.ContextMenu);
window["Runtime.Widget.ContextMenu.ContextMenu"] = Runtime.Widget.ContextMenu.ContextMenu;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.ContextMenu.ContextMenu;