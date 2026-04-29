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
if (typeof Runtime.WordPress.Theme.Components.Button == 'undefined') Runtime.WordPress.Theme.Components.Button = {};
Runtime.WordPress.Theme.Components.Button.ButtonForm = {
	name: "Runtime.WordPress.Theme.Components.Button.ButtonForm",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_button__wrap", this.class, this.renderListClass(), componentHash])}));
			
			/* Element Runtime.Widget.Button */
			let __v1 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"styles": this.model.styles, "onClick": this.hash(0) ? this.hash(0) : this.hash(0, () =>
			{
				this.model.onClick();
			})}));
			
			/* Content */
			__v1.slot("default", () =>
			{
				const rs = use("Runtime.rs");
				const componentHash = rs.getComponentHash(this.getClassName());
				let __v = new Runtime.VirtualDom(this);
				
				if (this.model.content)
				{
					__v.push(this.model.content);
				}
				else
				{
					__v.push(this.renderSlot("default"));
				}
				
				return __v;
			});
			__v.push(this.renderWidget(this.model.dialog));
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Theme.Components.Button.ButtonForm"; },
	},
	getComponentStyle: function(){ return ""; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.Dialog.Dialog"); },
};
window["Runtime.WordPress.Theme.Components.Button.ButtonForm"] = Runtime.WordPress.Theme.Components.Button.ButtonForm;