"use strict;"
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
	extends: Runtime.Component,
	methods:
	{
		renderItem: function(item)
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["context_menu__item", item.get("hidden") == true ? "hidden" : "", componentHash]), "key": item.get("key"), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
			{
				event.stopPropagation();
				this.onClickItem(item);
			})}));
			__v0.push(item.get("label"));
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let props = this.getProps();
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["context_menu", this.model.is_open ? "context_menu--open" : "context_menu--hide", componentHash]), "@ref": "widget"}).concat(props));
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				let item = this.model.items.get(i);
				__v0.push(this.renderItem(item));
			}
			
			return __v;
		},
		/**
		 * Returns props
		 */
		getProps: function()
		{
			let styles = Runtime.Vector.create([]);
			if (this.model.width != "")
			{
				styles.push("max-width: " + String(this.model.width));
			}
			styles.push("left: " + String(this.model.x) + String("px;"));
			styles.push("top: " + String(this.model.y) + String("px;"));
			return Runtime.Map.create({
				"style": Runtime.rs.join(";", styles),
			});
		},
		/**
		 * Click item
		 */
		onClickItem: function(item)
		{
			this.model.onClickItem(item);
		},
		getClassName: function(){ return "Runtime.Widget.ContextMenu.ContextMenu"; },
	},
	getComponentStyle: function(){ return ".context_menu.h-eb02{display: none;position: absolute;z-index: 99;background-color: var(--color-background);border: var(--border-width) var(--color-border) solid;border-bottom-width: 0}.context_menu--open.h-eb02{display: block}.context_menu__item.h-eb02{padding: calc(var(--space) * 0.75) var(--space);border-bottom: var(--border-width) var(--color-border) solid;cursor: pointer;user-select: none}.context_menu__item.h-eb02:hover{background-color: var(--color-hover)}.context_menu__item.hidden.h-eb02{display: none}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.ContextMenu.ContextMenu"] = Runtime.Widget.ContextMenu.ContextMenu;