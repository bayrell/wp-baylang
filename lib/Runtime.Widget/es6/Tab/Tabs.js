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
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.Tabs = {
	name: "Runtime.Widget.Tab.Tabs",
	extends: Runtime.Web.Component,
	methods:
	{
		renderHeader: function()
		{
			let __v = [];
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				let tab = this.model.items.get(i);
				let tab_key = Runtime.rtl.attr(tab, "key");
				let tab_label = Runtime.rtl.attr(tab, "label");
				let tab_href = Runtime.rtl.attr(tab, "href");
				let is_active = this.model.isActive(tab_key);
				
				if (tab_href == null)
				{
					/* Element 'div' */
					let __v0 = this._e(__v, "div", {"data-tab":tab_key,"onClick":this.onClick,"class":this._class_name(["tabs__header_item", ((is_active) ? ("tabs__header_item--active") : (""))])});
					
					/* Render */
					this._t(__v0, tab_label);
				}
				else
				{
					/* Element 'a' */
					let __v1 = this._e(__v, "a", {"data-tab":tab_key,"href":tab_href,"class":this._class_name(["tabs__header_item", ((is_active) ? ("tabs__header_item--active") : (""))])});
					
					/* Render */
					this._t(__v1, tab_label);
				}
			}
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			
			if (this.model.render)
			{
				for (let i = 0; i < this.model.items.count(); i++)
				{
					let tab = this.model.items.get(i);
					let tab_key = tab.get("key");
					
					if (this.model.canShow(tab_key))
					{
						/* Element 'div' */
						let __v0 = this._e(__v, "div", {"data-tab":tab_key,"class":this._class_name(["tabs__item", ((this.model.isActive(tab_key)) ? ("tabs__item--active") : (""))])});
						
						/* Render */
						this._t(__v0, this.renderSlot(tab_key));
					}
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["tabs", this.class])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["tabs__header"])});
			
			/* Render */
			this._t(__v1, this.renderHeader());
			
			/* Element 'div' */
			let __v2 = this._e(__v0, "div", {"class":this._class_name(["tabs__content"])});
			
			/* Render */
			this._t(__v2, this.renderSlot("default"));
			
			/* Render */
			this._t(__v2, this.renderContent());
			
			return this._flatten(__v);
		},
		onClick: function(e)
		{
			var tab_key = e.target.getAttribute("data-tab");
			this.model.setActive(tab_key);
			this.emit("select", tab_key);
		},
	},
};
Object.assign(Runtime.Widget.Tab.Tabs,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Tab.Tab"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".tabs.h-020a{position: relative}.tabs__header.h-020a{display: flex;position: relative;border-bottom-width: var(--widget-border-width);border-bottom-color: var(--widget-color-border);border-bottom-style: solid}.tabs__header_item.h-020a{position: relative;padding: calc(1.5 * var(--widget-space));border-color: transparent;border-width: var(--widget-border-width);border-style: solid;border-bottom-width: 0px;text-decoration: none;color: inherit;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;-ms-user-select: none;top: var(--widget-border-width)}.tabs__header_item.h-020a:hover,.tabs__header_item.h-020a:visited,.tabs__header_item.h-020a:visited:hover,.tabs__header_item.h-020a:focus{text-decoration: none;color: inherit;box-shadow: none;outline: transparent}.tabs__header_item--active.h-020a{background-color: var(--widget-color-table-background);border-color: var(--widget-color-border)}.tabs__content.h-020a{margin-top: calc(2 * var(--widget-space))}.tabs__item.h-020a{position: relative;display: none}.tabs__item--active.h-020a{display: block}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Tab";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Tab.Tabs";
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
Runtime.rtl.defClass(Runtime.Widget.Tab.Tabs);
window["Runtime.Widget.Tab.Tabs"] = Runtime.Widget.Tab.Tabs;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Tab.Tabs;