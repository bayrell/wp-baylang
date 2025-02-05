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
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_button__wrap", this.class, this.renderListClass()])});
			
			/* Component 'Button' */
			let __v1 = this._c(__v0, "Runtime.Widget.Button", {"styles":this.model.styles,"onClick":() =>
			{
				this.model.onClick();
			}}, () => {
				let __v = [];
				
				if (this.model.content)
				{
					/* Render */
					this._t(__v, this.model.content);
				}
				else
				{
					/* Render */
					this._t(__v, this.renderSlot("default"));
				}
				
				return this._flatten(__v);
			});
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.dialog));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.WordPress.Theme.Components.Button.ButtonForm,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.Dialog.Dialog"]);
	},
	css: function(vars)
	{
		var res = "";
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Button";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Button.ButtonForm";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Button.ButtonForm);
window["Runtime.WordPress.Theme.Components.Button.ButtonForm"] = Runtime.WordPress.Theme.Components.Button.ButtonForm;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Button.ButtonForm;