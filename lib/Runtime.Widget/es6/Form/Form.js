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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.Form = {
	name: "Runtime.Widget.Form.Form",
	extends: Runtime.Component,
	props: {
		fields: {default: Runtime.Vector.create([])},
	},
	methods:
	{
		renderTitle: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.slot("title"))
			{
				__v.push(this.renderSlot("title"));
			}
			
			return __v;
		},
		renderContent: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.slot("default") && this.fields.count() == 0)
			{
				__v.push(this.renderSlot("default"));
			}
			else
			{
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["form_fields", componentHash])}));
				
				for (let i = 0; i < this.fields.count(); i++)
				{
					let field = this.fields.get(i);
					let name = field.get("name");
					
					/* Element Runtime.Widget.Form.FormRow */
					let __v1 = __v0.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": field.get("label"), "key": name, "name": name, "field": field, "result": this.model.getResult(name)}));
					
					/* Slot default */
					__v1.slot("default", (name, field) =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						
						let component = field.get("component");
						let props = field.get("props");
						if (!props)
						{
							props = new Runtime.Map();
						}
						
						/* Element component */
						__v.element(component, new Runtime.Map({"name": name, "value": this.getValue(field), "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
						{
							this.setValue(field, event.value);
						})}).concat(props));
						
						return __v;
					});
				}
			}
			
			return __v;
		},
		renderResult: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.slot("result"))
			{
				__v.push(this.renderSlot("result"));
			}
			else
			{
				__v.push(this.renderWidget(this.model.result, Runtime.Map.create({
					"class": "result--form",
				})));
			}
			
			return __v;
		},
		renderButtons: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.slot("buttons"))
			{
				__v.push(this.renderSlot("buttons"));
			}
			
			return __v;
		},
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element form */
			let __v0 = __v.element("form", new Runtime.Map({"class": rs.className(["form", componentHash])}));
			__v0.push(this.renderTitle());
			__v0.push(this.renderContent());
			__v0.push(this.renderButtons());
			__v0.push(this.renderResult());
			
			return __v;
		},
		/**
		 * Returns value
		 */
		getValue: function(field)
		{
			if (field.has("value"))
			{
				let value = field.get("value");
				return value(this.model.item);
			}
			let name = field.get("name");
			return this.model.item ? this.model.item.get(name) : "";
		},
		/**
		 * Set value
		 */
		setValue: function(field, value)
		{
			if (field.has("setValue"))
			{
				let setValue = field.get("setValue");
				setValue(this.model.item, value);
			}
			else
			{
				let name = field.get("name");
				this.model.setValue(name, value);
			}
		},
		getClassName: function(){ return "Runtime.Widget.Form.Form"; },
	},
	getComponentStyle: function(){ return ".form.h-b6a7 textarea{min-height: 300px}.form.h-b6a7 .row_buttons{justify-content: center}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Form.FormRow"); },
};
window["Runtime.Widget.Form.Form"] = Runtime.Widget.Form.Form;