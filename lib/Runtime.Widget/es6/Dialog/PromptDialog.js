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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.PromptDialog = {
	name: "Runtime.Widget.Dialog.PromptDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			
			if (this.model.content)
			{
				/* Element 'div' */
				let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__content"])});
				
				/* Render */
				this._t(__v0, this.model.content);
			}
			
			/* Element 'div' */
			let __v1 = this._e(__v, "div", {"class":this._class_name(["widget_dialog__input"])});
			
			/* Component 'Input' */
			let __v2 = this._c(__v1, "Runtime.Widget.Input", {"value":this.model.value,"onValueChange":(message) =>
			{
				this.model.setValue(message.value);
			}});
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Dialog.PromptDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog","Runtime.Widget.Input"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr("");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.PromptDialog";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.PromptDialog);
window["Runtime.Widget.Dialog.PromptDialog"] = Runtime.Widget.Dialog.PromptDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.PromptDialog;