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
Runtime.Widget.TextImage = {
	name: "Runtime.Widget.TextImage",
	extends: Runtime.Web.Component,
	props: {
		"kind": {
			default: "text_right",
		},
		"image": {
			default: "",
		},
		"content": {
			default: "",
		},
	},
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			let content = Runtime.rs.split("\n", this.content);
			
			if (content.count() == 1)
			{
				/* Render */
				this._t(__v, content.get(0));
			}
			else
			{
				for (let i = 0; i < content.count(); i++)
				{
					let item = content.get(i);
					
					/* Element 'div' */
					let __v0 = this._e(__v, "div", {});
					
					/* Render */
					this._t(__v0, (!Runtime.rtl.isEmpty(item)) ? (item) : (""));
				}
			}
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_text_image", this.getClass(), this.class])});
			
			if (this.kind == "text_bottom" || this.kind == "text_right")
			{
				/* Element 'div' */
				let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__image"])});
				
				/* Component 'Image' */
				let __v2 = this._c(__v1, "Runtime.Widget.Image", {"src":this.image});
				
				/* Element 'div' */
				let __v3 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__text"])});
				
				/* Render */
				this._t(__v3, this.renderContent(this.content));
			}
			else if (this.kind == "text_top" || this.kind == "text_left")
			{
				/* Element 'div' */
				let __v4 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__text"])});
				
				/* Render */
				this._t(__v4, this.renderContent(this.content));
				
				/* Element 'div' */
				let __v5 = this._e(__v0, "div", {"class":this._class_name(["widget_text_image__image"])});
				
				/* Component 'Image' */
				let __v6 = this._c(__v5, "Runtime.Widget.Image", {"src":this.image});
			}
			
			return this._flatten(__v);
		},
		/**
 * Returns class
 */
		getClass: function()
		{
			var styles = Runtime.Vector.from([]);
			styles.push("widget_text_image--" + Runtime.rtl.toStr(this.kind));
			return Runtime.rs.join(" ", styles);
		},
	},
};
Object.assign(Runtime.Widget.TextImage,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Image"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_text_image--text_left.h-e2c7,.widget_text_image--text_right.h-e2c7{display: flex;align-items: center;justify-content: space-between}.widget_text_image--text_top.h-e2c7,.widget_text_image--text_bottom.h-e2c7{text-align: center}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.TextImage";
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
Runtime.rtl.defClass(Runtime.Widget.TextImage);
window["Runtime.Widget.TextImage"] = Runtime.Widget.TextImage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.TextImage;