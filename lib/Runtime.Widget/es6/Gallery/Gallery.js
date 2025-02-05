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
if (typeof Runtime.Widget.Gallery == 'undefined') Runtime.Widget.Gallery = {};
Runtime.Widget.Gallery.Gallery = {
	name: "Runtime.Widget.Gallery.Gallery",
	extends: Runtime.Web.Component,
	methods:
	{
		renderItem: function(pos)
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderSlot("default", Runtime.Map.from({"pos":pos,"item":this.model.items.get(pos),"onClick":() =>
			{
				this.onClick(pos);
			}})));
			
			return this._flatten(__v);
		},
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["widget_gallery", this.class])});
			
			/* Element 'div' */
			let __v1 = this._e(__v0, "div", {"class":this._class_name(["widget_gallery__items"])});
			
			for (let i = 0; i < this.model.items.count(); i++)
			{
				/* Render */
				this._t(__v1, this.renderItem(i));
			}
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.dialog));
			
			return this._flatten(__v);
		},
		/**
 * On click
 */
		onClick: function(pos)
		{
			this.model.dialog.select(pos);
			this.model.dialog.show();
		},
	},
};
Object.assign(Runtime.Widget.Gallery.Gallery,
{
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_gallery__items.h-9a68{display: flex;align-items: center;justify-content: space-around;flex-wrap: wrap}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Gallery.Gallery";
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
Runtime.rtl.defClass(Runtime.Widget.Gallery.Gallery);
window["Runtime.Widget.Gallery.Gallery"] = Runtime.Widget.Gallery.Gallery;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Gallery.Gallery;