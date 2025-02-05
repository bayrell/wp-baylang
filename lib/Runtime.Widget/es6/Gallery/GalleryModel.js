"use strict;"
/*!
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
Runtime.Widget.Gallery.GalleryModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Gallery.GalleryModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Gallery.GalleryModel.prototype.constructor = Runtime.Widget.Gallery.GalleryModel;
Object.assign(Runtime.Widget.Gallery.GalleryModel.prototype,
{
	/**
	 * Returns items
	 */
	getItems: function()
	{
		return this.items;
	},
	/**
	 * Returns item
	 */
	getItem: function(pos)
	{
		return this.items.get(pos);
	},
	/**
	 * Returns small image
	 */
	getSmallImage: function(pos)
	{
		return this.getItem(pos);
	},
	/**
	 * Returns big image
	 */
	getBigImage: function(pos)
	{
		return this.getItem(pos);
	},
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("dialog_image_contains"))
		{
			this.dialog_image_contains = params.get("dialog_image_contains");
		}
		if (params.has("items"))
		{
			this.items = params.get("items");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BaseModel.prototype.initWidget.call(this, params);
		/* Add dialog */
		this.dialog = this.addWidget("Runtime.Widget.Gallery.GalleryDialogModel", Runtime.Map.from({"modal":false}));
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Gallery.Gallery";
		this.widget_name = "gallery";
		this.dialog_image_contains = false;
		this.items = Runtime.Vector.from([]);
		this.dialog = null;
	},
});
Object.assign(Runtime.Widget.Gallery.GalleryModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Gallery.GalleryModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Gallery.GalleryModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Widget.Gallery.GalleryModel);
window["Runtime.Widget.Gallery.GalleryModel"] = Runtime.Widget.Gallery.GalleryModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Gallery.GalleryModel;