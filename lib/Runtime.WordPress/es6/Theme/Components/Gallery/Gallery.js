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
if (typeof Runtime.WordPress.Theme.Components.Gallery == 'undefined') Runtime.WordPress.Theme.Components.Gallery = {};
Runtime.WordPress.Theme.Components.Gallery.Gallery = {
	name: "Runtime.WordPress.Theme.Components.Gallery.Gallery",
	extends: Runtime.Widget.Gallery.Gallery,
	methods:
	{
		renderItem: function(pos)
		{
			let __v = [];
			let item = this.model.getItem(pos);
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"onClick":() =>
			{
				this.onClick(pos);
			},"class":this._class_name(["widget_gallery__item"])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_gallery__item_title"])});
			
			/* Render */
			this._t(__v1, item.get("name"));
			let small_image = Runtime.rtl.attr(item, ["image", "sizes", this.model.small_size]);
			
			if (small_image)
			{
				/* Element 'div' */
				let __v2 = this._e(__v0, "div", {"class":this._class_name(["widget_gallery__item_image"]),"key":"image"});
				
				/* Element 'img' */
				let __v3 = this._e(__v2, "img", {"src":small_image.get("file"),"alt":item.get("name")});
			}
			else
			{
				/* Element 'div' */
				let __v4 = this._e(__v0, "div", {"class":this._class_name(["widget_gallery_item__image"]),"key":"no_image"});
				
				/* Element 'div' */
				let __v5 = this._e(__v4, "div", {"class":this._class_name(["widget_gallery_item__no_image"])});
				
				/* Text */
				this._t(__v5, "No image");
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.WordPress.Theme.Components.Gallery.Gallery,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Gallery.Gallery"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_gallery__item.h-fc5d{display: flex;flex-direction: column;align-items: center}.widget_gallery__item_title.h-fc5d{font-weight: bold;text-align: center;margin-bottom: 10px}.widget_gallery__item_image.h-fc5d{cursor: pointer}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Gallery.Gallery";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Gallery.Gallery";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Gallery.Gallery);
window["Runtime.WordPress.Theme.Components.Gallery.Gallery"] = Runtime.WordPress.Theme.Components.Gallery.Gallery;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Gallery.Gallery;