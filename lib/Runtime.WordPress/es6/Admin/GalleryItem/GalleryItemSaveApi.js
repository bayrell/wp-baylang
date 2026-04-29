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
Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi = class extends Runtime.Widget.Api.SaveApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "admin.wordpress.gallery.item"; }
	
	
	/**
	 * Returns record name
	 */
	static getRecordName(){ return "Runtime.WordPress.Database.GalleryItem"; }
	
	
	/**
	 * Returns middleware
	 */
	getMiddleware()
	{
		return Runtime.Vector.create([
			new Runtime.WordPress.Admin.AdminMiddleware(),
		]);
	}
	
	
	/**
	 * Returns data rules
	 */
	getDataRules(rules)
	{
		rules.addType("foreign_key", new Runtime.Serializer.Required());
		rules.addType("foreign_key", new Runtime.Serializer.MapType(Runtime.Map.create({
			"item_id": new Runtime.Serializer.IntegerType(),
		})));
	}
	
	
	/**
	 * Returns item rules
	 */
	getItemRules(rules)
	{
		rules.addType("name", new Runtime.Serializer.StringType());
		rules.addType("image", new Runtime.Serializer.ObjectType(Runtime.Map.create({"class_name": "Runtime.WordPress.Theme.Components.ImageType"})));
		rules.addType("pos", new Runtime.Serializer.IntegerType());
	}
	
	
	/**
	 * Returns rules
	 */
	rules()
	{
		return Runtime.Vector.create([
			new Runtime.WordPress.Admin.Components.ImageRule(Runtime.Map.create({"name": "image", "key": "image_id"})),
		]);
	}
	
	
	/**
	 * Returns item fields
	 */
	getItemFields(action)
	{
		return Runtime.Vector.create([
			"id",
			"name",
			"image",
			"image_id",
			"pos",
		]);
	}
	
	
	/**
	 * Returns save fields
	 */
	getSaveFields()
	{
		return Runtime.Vector.create([
			"name",
			"pos",
		]);
	}
	
	
	/**
	 * Build query
	 */
	async buildQuery(q)
	{
		q.where("gallery_id", "=", this.foreign_key.get("item_id"));
	}
	
	
	/**
	 * Before save
	 */
	async onSaveBefore()
	{
		this.item.gallery_id = this.foreign_key.get("item_id");
	}
	
	
	/**
	 * Action save
	 */
	async actionSave()
	{
		await super.actionSave();
	}
	
	
	/**
	 * Action delete
	 */
	async actionDelete()
	{
		await super.actionDelete();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionSave", "actionDelete");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionSave") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "save"}))
		);
		if (field_name == "actionDelete") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "delete"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi"] = Runtime.WordPress.Admin.GalleryItem.GalleryItemSaveApi;