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
Runtime.Widget.Section = {
	name: "Runtime.Widget.Section",
	extends: Runtime.Web.Component,
	props: {
		"wrap": {
			default: "true",
		},
		"flex": {
			default: "false",
		},
		"align_items": {
			default: "",
		},
		"justify_content": {
			default: "",
		},
		"flex_wrap": {
			default: "",
		},
		"height": {
			default: "",
		},
		"min_height": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"style":this.getStyle(),"class":this._class_name(["widget_section", this.class])});
			
			if (this.wrap == "true")
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"style":this.getWrapStyle(),"class":this._class_name(["widget_section__wrap"])});
				
				/* Render */
				this._t(__v1, this.renderSlot("default"));
			}
			else
			{
				/* Render */
				this._t(__v0, this.renderSlot("default"));
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns styles
 */
		getStyle: function()
		{
			var res = Runtime.Vector.from([]);
			if (!this.wrap)
			{
				res.push(this.getWrapStyle());
			}
			return Runtime.rs.join(";", res);
		},
		/**
 * Returns wrap style
 */
		getWrapStyle: function()
		{
			var res = Runtime.Vector.from([]);
			if (this.flex == "true")
			{
				res.push("display: flex;");
				if (this.align_items)
				{
					res.push("align-items: " + Runtime.rtl.toStr(this.align_items));
				}
				if (this.justify_content)
				{
					res.push("justify-content: " + Runtime.rtl.toStr(this.justify_content));
				}
				if (this.flex_wrap)
				{
					res.push("flex-wrap: " + Runtime.rtl.toStr(this.flex_wrap));
				}
			}
			if (this.height)
			{
				res.push("height: " + Runtime.rtl.toStr(this.height));
			}
			if (this.min_height)
			{
				res.push("min-height: " + Runtime.rtl.toStr(this.min_height));
			}
			return Runtime.rs.join(";", res);
		},
	},
};
Object.assign(Runtime.Widget.Section,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_section__wrap.h-c82b{max-width: 1200px;margin-left: auto;margin-right: auto;padding: 0px 0px;padding-left: 10px;padding-right: 10px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Section";
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
Runtime.rtl.defClass(Runtime.Widget.Section);
window["Runtime.Widget.Section"] = Runtime.Widget.Section;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Section;