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
if (typeof Runtime.WordPress.Admin.GalleryItem == 'undefined') Runtime.WordPress.Admin.GalleryItem = {};
Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi.prototype.constructor = Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi;
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi.prototype,
{
	/**
	 * Returns service
	 */
	createService: function()
	{
		return new Runtime.WordPress.Admin.GalleryItem.GalleryItemService();
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","name","image","image_id","pos"]);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Foreign key */
		await service.loadGallery(Runtime.rtl.attr(this.post_data, ["foreign_key", "gallery_id"]));
		/* Load item */
		await service.loadItem(this.post_data.get("pk"), true);
		/* Save item */
		await service.save(this.post_data.get("item"));
		/* Build result */
		this.buildResult(service);
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		/* Create service */
		var service = this.createService();
		/* Foreign key */
		await service.loadGallery(Runtime.rtl.attr(this.post_data, ["foreign_key", "gallery_id"]));
		/* Load item */
		await service.loadItem(this.post_data.get("pk"));
		/* Delete item */
		await service.delete();
		/* Build result */
		this.buildResult(service);
	},
});
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi, Runtime.Widget.Crud.SaveApi);
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.gallery.item.save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.GalleryItem";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SaveApi";
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
			"actionSave",
			"actionDelete",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionSave")
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
		if (field_name == "actionDelete")
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi);
window["Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi"] = Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi;