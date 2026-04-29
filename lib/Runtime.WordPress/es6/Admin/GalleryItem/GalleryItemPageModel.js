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
Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("manager", new Runtime.Serializer.ObjectType());
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.manager = this.createWidget("Runtime.Widget.Table.TableManager", Runtime.Map.create({
			"autoload": true,
			"api_name": "admin.wordpress.gallery.item",
			"page_name": "p",
			"title": new Runtime.Method(this, "getItemTitle"),
			"primary_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			})),
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"name": new Runtime.Serializer.StringType(),
				"image": new Runtime.Serializer.ObjectType(Runtime.Map.create({
					"class_name": "Runtime.WordPress.Theme.Components.ImageType",
				})),
				"pos": new Runtime.Serializer.IntegerType(),
			})),
			"foreign_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"item_id": new Runtime.Serializer.IntegerType(),
			})),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "image",
					"label": "Image",
					"component": "Runtime.WordPress.Admin.Components.Image",
					"props": Runtime.Map.create({
						"upload": true,
					}),
				}),
				Runtime.Map.create({
					"name": "pos",
					"label": "Pos",
					"component": "Runtime.Widget.Input",
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
				}),
				Runtime.Map.create({
					"name": "image",
					"label": "Image",
					"component": "Runtime.WordPress.Admin.Components.Image",
				}),
				Runtime.Map.create({
					"name": "pos",
					"label": "pos",
				}),
				Runtime.Map.create({
					"name": "buttons",
					"slot": "row_buttons",
				}),
			]),
		}));
	}
	
	
	/**
	 * Returns item title
	 */
	getItemTitle(action, item)
	{
		if (action == "add") return "Add item";
		else if (action == "edit") return "Edit item";
		else if (action == "delete") return "Delete item";
		else if (action == "delete_message") return "Delete item";
		return "";
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		this.manager.setForeignKey(Runtime.Map.create({
			"item_id": container.request.query.get("id"),
		}));
		await super.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Gallery items");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.GalleryItem.GalleryItemPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel"] = Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel;