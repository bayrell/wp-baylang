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
Runtime.WordPress.Admin.GalleryItem.GalleryItemService = function()
{
	Runtime.Widget.Crud.RelationService.apply(this, arguments);
};
Runtime.WordPress.Admin.GalleryItem.GalleryItemService.prototype = Object.create(Runtime.Widget.Crud.RelationService.prototype);
Runtime.WordPress.Admin.GalleryItem.GalleryItemService.prototype.constructor = Runtime.WordPress.Admin.GalleryItem.GalleryItemService;
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemService.prototype,
{
	/**
	 * Returns relation name
	 */
	getRelationName: function()
	{
		return "Runtime.WordPress.Database.GalleryItem";
	},
	/**
	 * Init rules
	 */
	initRules: function()
	{
		this.rules.addRules(Runtime.Vector.from([new Runtime.WordPress.Admin.Components.ImageRule(Runtime.Map.from({"name":"image","key":"image_id"}))]));
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["name","image_id","pos"]);
	},
	/**
	 * Load gallery
	 */
	loadGallery: async function(gallery_id)
	{
		var service = new Runtime.WordPress.Admin.Gallery.GalleryCrudService();
		await service.loadItem(Runtime.Map.from({"id":gallery_id}));
		this.gallery = service.item;
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
		q.where("gallery_id", "=", this.gallery.get("id"));
		q.orderBy("pos", "desc");
		q.orderBy("id", "desc");
	},
	/**
	 * Save item
	 */
	saveItem: async function()
	{
		this.item.set("gallery_id", this.gallery.get("id"));
		await Runtime.Widget.Crud.RelationService.prototype.saveItem.call(this);
	},
	_init: function()
	{
		Runtime.Widget.Crud.RelationService.prototype._init.call(this);
		this.gallery = null;
	},
});
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemService, Runtime.Widget.Crud.RelationService);
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.GalleryItem";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.GalleryItem.GalleryItemService";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.RelationService";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.GalleryItem.GalleryItemService);
window["Runtime.WordPress.Admin.GalleryItem.GalleryItemService"] = Runtime.WordPress.Admin.GalleryItem.GalleryItemService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.GalleryItem.GalleryItemService;