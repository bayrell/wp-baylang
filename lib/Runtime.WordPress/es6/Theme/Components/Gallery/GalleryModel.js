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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Gallery == 'undefined') Runtime.WordPress.Theme.Components.Gallery = {};
Runtime.WordPress.Theme.Components.Gallery.GalleryModel = function()
{
	Runtime.Widget.Gallery.GalleryModel.apply(this, arguments);
};
Runtime.WordPress.Theme.Components.Gallery.GalleryModel.prototype = Object.create(Runtime.Widget.Gallery.GalleryModel.prototype);
Runtime.WordPress.Theme.Components.Gallery.GalleryModel.prototype.constructor = Runtime.WordPress.Theme.Components.Gallery.GalleryModel;
Object.assign(Runtime.WordPress.Theme.Components.Gallery.GalleryModel.prototype,
{
	/**
	 * Returns small image
	 */
	getSmallImage: function(pos)
	{
		var item = this.getItem(pos);
		if (!item)
		{
			return "";
		}
		var image = Runtime.rtl.attr(item, ["image", "sizes", this.small_size]);
		if (!image)
		{
			return "";
		}
		return image.get("file");
	},
	/**
	 * Returns big image
	 */
	getBigImage: function(pos)
	{
		var item = this.getItem(pos);
		if (!item)
		{
			return "";
		}
		var image = Runtime.rtl.attr(item, ["image", "sizes", this.big_size]);
		if (!image)
		{
			return "";
		}
		return image.get("file");
	},
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.Gallery.GalleryModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("api_name"))
		{
			this.api_name = params.get("api_name");
		}
		if (params.has("big_size"))
		{
			this.big_size = params.get("big_size");
		}
		if (params.has("small_size"))
		{
			this.small_size = params.get("small_size");
		}
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Gallery.GalleryModel.prototype.initWidget.call(this, params);
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "items", data);
		Runtime.Widget.Gallery.GalleryModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Load items
	 */
	loadItems: async function()
	{
		var result = await this.layout.callApi(Runtime.Map.from({"api_name":"runtime.wordpress.gallery","method_name":"actionSearch","data":Runtime.Map.from({"api_name":this.api_name})}));
		if (result.isSuccess())
		{
			this.items = result.data.get("items");
		}
	},
	/**
	 * Load data
	 */
	loadData: async function(container)
	{
		await Runtime.Widget.Gallery.GalleryModel.prototype.loadData.call(this, container);
		await this.loadItems();
	},
	_init: function()
	{
		Runtime.Widget.Gallery.GalleryModel.prototype._init.call(this);
		this.api_name = "";
		this.big_size = "medium_large";
		this.small_size = "medium";
	},
});
Object.assign(Runtime.WordPress.Theme.Components.Gallery.GalleryModel, Runtime.Widget.Gallery.GalleryModel);
Object.assign(Runtime.WordPress.Theme.Components.Gallery.GalleryModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme.Components.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Gallery.GalleryModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Theme.Components.Gallery.GalleryModel);
window["Runtime.WordPress.Theme.Components.Gallery.GalleryModel"] = Runtime.WordPress.Theme.Components.Gallery.GalleryModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.Components.Gallery.GalleryModel;