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
if (typeof Runtime.WordPress.Admin.FormSettings == 'undefined') Runtime.WordPress.Admin.FormSettings = {};
Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel = class extends Runtime.BaseModel
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
			"api_name": "admin.wordpress.forms.settings",
			"page_name": "p",
			"title": new Runtime.Method(this, "getItemTitle"),
			"primary_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			})),
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"name": new Runtime.Serializer.StringType(),
				"api_name": new Runtime.Serializer.StringType(),
				"email_to": new Runtime.Serializer.StringType(),
				"settings": new Runtime.Serializer.MapType(Runtime.Map.create({
					"fields": new Runtime.Serializer.VectorType(new Runtime.Serializer.MapType(Runtime.Map.create({
						"name": new Runtime.Serializer.StringType(),
						"type": new Runtime.Serializer.StringType(),
						"title": new Runtime.Serializer.StringType(),
						"placeholder": new Runtime.Serializer.StringType(),
						"required": new Runtime.Serializer.StringType(),
					}))),
				})),
			})),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "api_name",
					"label": "Api name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "email_to",
					"label": "Email to",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "fields",
					"label": "Fields",
					"component": "Runtime.WordPress.Admin.FormSettings.FieldSettings",
					"value": (item) =>
					{
						let settings = item.get("settings");
						if (!settings) return Runtime.Vector.create([]);
						let fields = settings.get("fields");
						return fields ? fields : Runtime.Vector.create([]);
					},
					"setValue": (item, value) =>
					{
						let settings = item.get("settings");
						if (!settings)
						{
							settings = new Runtime.Map();
							item.set("settings", settings);
						}
						settings.set("fields", value);
					},
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
					"name": "api_name",
					"label": "Api name",
				}),
				Runtime.Map.create({
					"name": "email_to",
					"label": "Email to",
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
		await super.loadData(container);
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Forms settings");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.FormSettings.FormSettingsPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel"] = Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel;