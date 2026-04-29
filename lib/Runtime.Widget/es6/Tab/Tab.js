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
if (typeof Runtime.Widget.Tab == 'undefined') Runtime.Widget.Tab = {};
Runtime.Widget.Tab.Tab = {
	name: "Runtime.Widget.Tab.Tab",
	extends: Runtime.Component,
	props: {
		name: {default: ""},
		title: {default: ""},
		href: {default: ""},
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			let model = this.getParent().model;
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["tabs__item", model.isActive(this.name) ? "tabs__item--active" : "", componentHash]), "data-tab": this.name}));
			
			if (this.canShow)
			{
				__v0.push(this.renderSlot("default"));
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Tab.Tab"; },
	},
	computed:
	{
		/**
		 * Returns true if tab can show
		 */
		canShow: function()
		{
			if (this.href == "") return true;
			let model = this.getParent().model;
			if (model.isActive(this.name)) return true;
			return false;
		},
	},
	getComponentStyle: function(){ return ".tabs__item.h-8789{position: relative;display: none}.tabs__item--active.h-8789{display: block}"; },
	getRequiredComponents: function(){ return new Runtime.Vector(); },
};
window["Runtime.Widget.Tab.Tab"] = Runtime.Widget.Tab.Tab;