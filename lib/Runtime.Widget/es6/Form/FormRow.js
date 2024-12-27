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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormRow = {
	name: "Runtime.Widget.Form.FormRow",
	extends: Runtime.Web.Component,
	props: {
		"styles": {
			default: Runtime.Vector.from([]),
		},
		"error": {
			default: Runtime.Vector.from([]),
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["form_row", this.class, this.$options.getStyles("form_row", this.styles)])});
			
			if (this.checkSlot("label"))
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["form_row__label"]),"key":"label"});
				
				/* Render */
				this._t(__v1, this.renderSlot("label"));
			}
			
			if (this.checkSlot("content"))
			{
				/* Element 'div' */
				let __v2 = this._e(__v0, "div", {"class":this._class_name(["form_row__content"]),"key":"content"});
				
				/* Render */
				this._t(__v2, this.renderSlot("content"));
			}
			
			if (this.checkSlot("result"))
			{
				/* Element 'div' */
				let __v3 = this._e(__v0, "div", {"class":this._class_name(["form_row__result"]),"key":"result"});
				
				/* Render */
				this._t(__v3, this.renderSlot("result"));
			}
			
			if (this.error.count() > 0)
			{
				/* Element 'div' */
				let __v4 = this._e(__v0, "div", {"class":this._class_name(["form_row__error"]),"key":"error"});
				
				for (let i = 0; i < this.error.count(); i++)
				{
					/* Element 'div' */
					let __v5 = this._e(__v4, "div", {});
					
					/* Render */
					this._t(__v5, this.error.get(i));
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Form.FormRow,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".form_row.h-df7b{margin-bottom: 10px}.form_row:last-child.h-df7b{margin-bottom: 0px}.form_row__label.h-df7b{margin-bottom: 5px}.form_row--flex.h-df7b{display: flex;align-items: center}.form_row--flex__label.h-df7b,.form_row--flex__content.h-df7b{width: 50%}.form_row__error.h-df7b{color: var(--widget-color-danger);margin-top: var(--widget-space)}.form_row__error--hide.h-df7b{display: none}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Form";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Form.FormRow";
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
Runtime.rtl.defClass(Runtime.Widget.Form.FormRow);
window["Runtime.Widget.Form.FormRow"] = Runtime.Widget.Form.FormRow;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Form.FormRow;