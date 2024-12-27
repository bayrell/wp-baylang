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
Runtime.Widget.Image = {
	name: "Runtime.Widget.Image",
	extends: Runtime.Web.Component,
	props: {
		"src": {
			default: "",
		},
	},
	methods:
	{
		render: function()
		{
			let __v = [];
			
			if (this.src)
			{
				/* Element 'img' */
				let __v0 = this._e(__v, "img", {"src":this.layout.assets(this.src),"class":this._class_name(["widget_image", this.class]),"key":"image"});
			}
			else
			{
				/* Element 'div' */
				let __v1 = this._e(__v, "div", {"class":this._class_name(["widget_image", this.class]),"key":"no_image"});
				
				/* Element 'div' */
				let __v2 = this._e(__v1, "div", {"class":this._class_name(["widget_image__no_image"])});
				
				/* Text */
				this._t(__v2, "No image");
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Image,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_image.h-3405{display: inline-block}.widget_image__no_image.h-3405{display: flex;align-items: center;justify-content: center;font-size: 20px;text-transform: uppercase;width: 270px;height: 70px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Image";
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
Runtime.rtl.defClass(Runtime.Widget.Image);
window["Runtime.Widget.Image"] = Runtime.Widget.Image;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Image;