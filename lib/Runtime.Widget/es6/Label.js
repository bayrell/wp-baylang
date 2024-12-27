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
Runtime.Widget.Label = {
	name: "Runtime.Widget.Label",
	extends: Runtime.Web.Component,
	props: {
		"value": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'span' */
			let __v0 = this._e(__v, "span", {"class":this._class_name(["widget_label"])});
			
			if (Runtime.rtl.isScalarValue(this.value))
			{
				/* Render */
				this._t(__v0, (!Runtime.rtl.isEmpty(this.value)) ? (this.value) : (""));
			}
			else if (Runtime.rtl.is_instanceof(this.value, "Runtime.Collection"))
			{
				for (let i = 0; i < this.value.count(); i++)
				{
					let item = this.value.get(i);
					
					/* Element 'div' */
					let __v1 = this._e(__v0, "div", {});
					
					/* Render */
					this._t(__v1, (!Runtime.rtl.isEmpty(item)) ? (item) : (""));
				}
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Label,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr("");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Label";
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
Runtime.rtl.defClass(Runtime.Widget.Label);
window["Runtime.Widget.Label"] = Runtime.Widget.Label;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Label;