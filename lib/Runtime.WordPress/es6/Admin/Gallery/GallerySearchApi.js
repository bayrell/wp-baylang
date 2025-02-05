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
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Gallery == 'undefined') Runtime.WordPress.Admin.Gallery = {};
Runtime.WordPress.Admin.Gallery.GallerySearchApi = function()
{
	Runtime.Widget.Crud.SearchApi.apply(this, arguments);
};
Runtime.WordPress.Admin.Gallery.GallerySearchApi.prototype = Object.create(Runtime.Widget.Crud.SearchApi.prototype);
Runtime.WordPress.Admin.Gallery.GallerySearchApi.prototype.constructor = Runtime.WordPress.Admin.Gallery.GallerySearchApi;
Object.assign(Runtime.WordPress.Admin.Gallery.GallerySearchApi.prototype,
{
	/**
	 * Returns service
	 */
	createService: function()
	{
		return new Runtime.WordPress.Admin.Gallery.GalleryCrudService();
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","api_name"]);
	},
	/**
	 * Returns image sizes
	 */
	actionImageSizes: async function()
	{
		var image_sizes;
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"items":image_sizes})}));
	},
	/**
	 * Action search
	 */
	actionSearch: async function()
	{
		await Runtime.Widget.Crud.SearchApi.prototype.actionSearch.call(this);
	},
});
Object.assign(Runtime.WordPress.Admin.Gallery.GallerySearchApi, Runtime.Widget.Crud.SearchApi);
Object.assign(Runtime.WordPress.Admin.Gallery.GallerySearchApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.gallery.search";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Gallery.GallerySearchApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SearchApi";
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
			"actionImageSizes",
			"actionSearch",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionImageSizes")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		if (field_name == "actionSearch")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Admin.Gallery.GallerySearchApi);
window["Runtime.WordPress.Admin.Gallery.GallerySearchApi"] = Runtime.WordPress.Admin.Gallery.GallerySearchApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Gallery.GallerySearchApi;