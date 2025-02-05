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
			let __v = [];
			
			if (this.model.title != "")
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__title"])});
				
				/* Element 'span' */
				let __v1 = this._e(__v0, "span", {"class":this._class_name(["widget_dialog__title__text"])});
				
				/* Render */
				this._t(__v1, this.model.title);
				
				/* Component 'Button' */
				let __v2 = this._c(__v0, "Runtime.Widget.Button", {"onClick":() =>
				{
					this.model.hide();
				},"class":this._class_name(["widget_dialog__title__close"])}, () => {
					let __v = [];
					
					/* Text */
					this._t(__v, "x");
					
					return this._flatten(__v);
				});
			}
			
			return this._flatten(__v);
		},
		renderContent: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.form));
			
			return this._flatten(__v);
		},
		renderButtons: function()
		{
			let __v = [];
			
			return this._flatten(__v);
		},
		/**
 * On shadow click
 */
		onShadowClick: function()
		{
			this.model.hide();
		},
	},
};
Object.assign(Runtime.WordPress.Theme.Components.Form.FormDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog","Runtime.Widget.Button"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog__shadow.h-d2d5{opacity: 0.5}.widget_dialog__title.h-d2d5{display: flex;align-items: center}.widget_dialog__title.h-d2d5 span{flex: 1}.widget_dialog__title.h-d2d5 .widget_button.h-8dd7{display: flex;align-items: center;justify-content: center;width: 42px;height: 34px;font-size: 20px;font-weight: bold;text-transform: uppercase;background-color: #fff;border: 1px #d9d9d9 solid;cursor: pointer;border-radius: 5px}.widget_dialog.h-d2d5 .widget_form__button.h-e7fd .widget_button.h-8dd7{width: 100%}.widget_dialog.h-d2d5 .widget_input.h-60a2,.widget_dialog.h-d2d5 .widget_textarea.h-5654{padding: 10px;font-size: 16px;border-radius: 5px}.widget_dialog.h-d2d5 .widget_textarea.h-5654{min-height: 150px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Form";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Form.FormDialog);
window["Runtime.WordPress.Theme.Components.Form.FormDialog"] = Runtime.WordPress.Theme.Components.Form.FormDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Form.FormDialog;