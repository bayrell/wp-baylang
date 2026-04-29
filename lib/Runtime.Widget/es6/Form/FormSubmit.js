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
Runtime.Widget.Form.FormSubmit = {
	name: "Runtime.Widget.Form.FormSubmit",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["form_submit", componentHash])}));
			
			/* Element Runtime.Widget.Form.Form */
			let __v1 = __v0.element("Runtime.Widget.Form.Form", new Runtime.Map({"fields": this.model.fields, "model": this.model}));
			
			/* Slot buttons */
			__v1.slot("buttons", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["row_buttons", componentHash])}));
				
				/* Element Runtime.Widget.Button */
				let __v1 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"styles": this.buttonStyles, "onClick": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
				{
					this.model.submit();
				})}));
				
				/* Content */
				__v1.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					__v.push(this.buttonText);
					
					return __v;
				});
				
				return __v;
			});
			
			return __v;
		},
		getClassName: function(){ return "Runtime.Widget.Form.FormSubmit"; },
	},
	computed:
	{
		/**
		 * Returns button styles
		 */
		buttonStyles: function()
		{
			if (!this.model.submit_button) return Runtime.Vector.create([]);
			let styles = this.model.submit_button.get("styles");
			return styles ? styles : Runtime.Vector.create([]);
		},
		/**
		 * Returns button text
		 */
		buttonText: function()
		{
			if (!this.model.submit_button) return "";
			let text = this.model.submit_button.get("text");
			return text ? text : "";
		},
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Form.Form", "Runtime.Widget.Button"); },
};
window["Runtime.Widget.Form.FormSubmit"] = Runtime.Widget.Form.FormSubmit;