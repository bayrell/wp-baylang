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
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Robots == 'undefined') Runtime.WordPress.Admin.Robots = {};
Runtime.WordPress.Admin.Robots.RobotsPage = {
	name: "Runtime.WordPress.Admin.Robots.RobotsPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["form_settings_page", componentHash])}));
			
			/* Element Runtime.Widget.Form.Form */
			let __v1 = __v0.element("Runtime.Widget.Form.Form", new Runtime.Map({"model": this.model.form}));
			
			/* Content */
			__v1.slot("default", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				/* Element Runtime.Widget.Form.FormRow */
				let __v0 = __v.element("Runtime.Widget.Form.FormRow", new Runtime.Map({"label": "Robots"}));
				
				/* Content */
				__v0.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					/* Element Runtime.Widget.TextArea */
					__v.element("Runtime.Widget.TextArea", new Runtime.Map({"value": this.model.form.item.get("content"), "onValueChange": this.hash(0) ? this.hash(0) : this.hash(0, (event) =>
					{
						this.model.form.item.set("content", event.value);
					})}));
					
					return __v;
				});
				__v.push(this.renderWidget(this.model.form.result, Runtime.Map.create({
					"class": "result--form",
				})));
				
				/* Element Runtime.Widget.RowButtons */
				let __v1 = __v.element("Runtime.Widget.RowButtons");
				
				/* Content */
				__v1.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					
					/* Element Runtime.Widget.Button */
					let __v0 = __v.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["button--primary button--large", componentHash]), "onClick": this.hash(1) ? this.hash(1) : this.hash(1, (event) =>
					{
						this.model.onSave();
					})}));
					
					/* Content */
					__v0.slot("default", () =>
					{
						const rs = use("Runtime.rs");
						const componentHash = rs.getComponentHash(this.getClassName());
						let __v = new Runtime.VirtualDom(this);
						__v.push("Save");
						return __v;
					});
					
					return __v;
				});
				
				return __v;
			});
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.Robots.RobotsPage"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.TextArea", "Runtime.Widget.Form.Form", "Runtime.Widget.Form.FormRow"); },
};
window["Runtime.WordPress.Admin.Robots.RobotsPage"] = Runtime.WordPress.Admin.Robots.RobotsPage;