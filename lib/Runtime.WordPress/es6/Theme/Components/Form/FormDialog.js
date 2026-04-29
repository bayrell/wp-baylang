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
Runtime.WordPress.Theme.Components.Form.FormDialog = {
	name: "Runtime.WordPress.Theme.Components.Form.FormDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderTitle: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			if (this.model.title != "")
			{
				/* Element div */
				let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["widget_dialog__title", componentHash])}));
				
				/* Element span */
				let __v1 = __v0.element("span", new Runtime.Map({"class": rs.className(["widget_dialog__title__text", componentHash])}));
				__v1.push(this.model.title);
				
				/* Element Runtime.Widget.Button */
				let __v2 = __v0.element("Runtime.Widget.Button", new Runtime.Map({"class": rs.className(["widget_dialog__title__close", componentHash]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, () =>
				{
					this.model.hide();
				})}));
				
				/* Content */
				__v2.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("x");
					return __v;
				});
			}
			
			return __v;
		},
		renderContent: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			__v.push(this.renderWidget(this.model.form));
			
			return __v;
		},
		renderButtons: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			return __v;
		},
		/**
		 * On shadow click
		 */
		onShadowClick: function()
		{
			this.model.hide();
		},
		getClassName: function(){ return "Runtime.WordPress.Theme.Components.Form.FormDialog"; },
	},
	getComponentStyle: function(){ return ".widget_dialog__shadow.h-d2d4{opacity: 0.5}.widget_dialog__title.h-d2d4{display: flex;align-items: center}.widget_dialog__title.h-d2d4 span{flex: 1}.widget_dialog__title.h-d2d4 %(Button)widget_button{display: flex;align-items: center;justify-content: center;width: 42px;height: 34px;font-size: 20px;font-weight: bold;text-transform: uppercase;background-color: #fff;border: 1px #d9d9d9 solid;cursor: pointer;border-radius: 5px}.widget_dialog.h-d2d4 %(Form)widget_form__button %(Button)widget_button{width: 100%}.widget_dialog.h-d2d4 %(Input)widget_input, .widget_dialog.h-d2d4 %(TextArea)widget_textarea{padding: 10px;font-size: 16px;border-radius: 5px}.widget_dialog.h-d2d4 %(TextArea)widget_textarea{min-height: 150px}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button"); },
};
window["Runtime.WordPress.Theme.Components.Form.FormDialog"] = Runtime.WordPress.Theme.Components.Form.FormDialog;