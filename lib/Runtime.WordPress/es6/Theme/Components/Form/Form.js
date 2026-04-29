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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Form == 'undefined') Runtime.WordPress.Theme.Components.Form = {};
Runtime.WordPress.Theme.Components.Form.Form = {
	name: "Runtime.WordPress.Theme.Components.Form.Form",
	extends: Runtime.Component,
	data: function()
	{
		return {
			is_show: false,
		};
	},
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["wordpress_form", this.class, componentHash])}));
			
			/* Element Runtime.Widget.Form.Form */
			let __v1 = __v0.element("Runtime.Widget.Form.Form", new Runtime.Map({"fields": this.fields, "model": this.model}));
			
			/* Slot title */
			__v1.slot("title", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				__v.push(this.renderSlot("title"));
				
				return __v;
			});
			
			/* Slot buttons */
			__v1.slot("buttons", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				__v.push(this.renderSlot("buttons"));
				
				return __v;
			});
			
			return __v;
		},
		/**
		 * Returns component name
		 */
		getFieldComponent: function(name)
		{
			if (name == "textarea") return "Runtime.Widget.TextArea";
			return "Runtime.Widget.Input";
		},
		getClassName: function(){ return "Runtime.WordPress.Theme.Components.Form.Form"; },
	},
	computed:
	{
		/**
		 * Returns fields
		 */
		fields: function()
		{
			return this.model.fields.map((item) =>
			{
				return Runtime.Map.create({
					"name": item.get("name"),
					"component": this.getFieldComponent(item.get("type")),
					"label": item.get("title"),
					"props": Runtime.Map.create({
						"placeholder": item.get("placeholder"),
					}),
				});
			});
		},
	},
	/**
	 * Mounted component
	 */
	mounted: function()
	{
		this.nextTick(() =>
		{
			this.is_show = true;
		});
		let item = new Runtime.Map();
		for (let i = 0; i < this.model.fields.count(); i++)
		{
			let field = this.model.fields.get(i);
			item.set(field.get("name"), "");
		}
		this.model.setItem(item);
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Input", "Runtime.Widget.TextArea"); },
};
window["Runtime.WordPress.Theme.Components.Form.Form"] = Runtime.WordPress.Theme.Components.Form.Form;