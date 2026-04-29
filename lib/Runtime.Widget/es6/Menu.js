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
Runtime.Widget.Menu = {
	name: "Runtime.Widget.Menu",
	extends: Runtime.Component,
	props: {
		items: {default: Runtime.Vector.create([])},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["menu", this.class, componentHash])}));
			
			for (let i = 0; i < this.items.count(); i++)
			{
				let item = this.items.get(i);
				
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["menu__item", this.menuActive(item.get("name")) ? "active" : "", componentHash])}));
				
				/* Element a */
				let __v2 = __v1.element("a", new Runtime.Map({"href": item.get("href"), "class": rs.className(["nolink", componentHash])}));
				__v2.push(item.get("label"));
			}
			
			return __v;
		},
		/**
		 * Returns true if menu is active
		 */
		menuActive: function(route_name)
		{
			if (this.layout.route == null) return false;
			if (this.layout.route.name != route_name) return false;
			return true;
		},
		getClassName: function(){ return "Runtime.Widget.Menu"; },
	},
	getComponentStyle: function(){ return ".menu__item.h-35e a{display: block;padding: var(--space);border-bottom: 1px solid var(--color-border)}.menu__item.h-35e a:hover{background-color: var(--color-hover)}.menu__item.active.h-35e a, .menu__item.active.h-35e a.nolink, .menu__item.active.h-35e a.nolink:visited{background-color: var(--color-selected);border-color: var(--color-selected);color: var(--color-selected-text)}.menu__item.h-35e:last-child a{border-bottom-width: 0px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Menu"] = Runtime.Widget.Menu;