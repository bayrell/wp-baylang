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
Runtime.WordPress.Admin.Gallery.GallerySaveApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
Runtime.WordPress.Admin.Gallery.GallerySaveApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
Runtime.WordPress.Admin.Gallery.GallerySaveApi.prototype.constructor = Runtime.WordPress.Admin.Gallery.GallerySaveApi;
Object.assign(Runtime.WordPress.Admin.Gallery.GallerySaveApi.prototype,
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
	 * Action save
	 */
	actionSave: async function()
	{
		await Runtime.Widget.Crud.SaveApi.prototype.actionSave.call(this);
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		await Runtime.Widget.Crud.SaveApi.prototype.actionDelete.call(this);
	},
});
Object.assign(Runtime.WordPress.Admin.Gallery.GallerySaveApi, Runtime.Widget.Crud.SaveApi);
Object.assign(Runtime.WordPress.Admin.Gallery.GallerySaveApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.wordpress.gallery.save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Gallery.GallerySaveApi";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Gallery.GallerySaveApi);
window["Runtime.WordPress.Admin.Gallery.GallerySaveApi"] = Runtime.WordPress.Admin.Gallery.GallerySaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Gallery.GallerySaveApi;