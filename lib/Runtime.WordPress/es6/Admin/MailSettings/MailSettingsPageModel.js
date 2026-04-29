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
if (typeof Runtime.WordPress.Admin.MailSettings == 'undefined') Runtime.WordPress.Admin.MailSettings = {};
Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel = class extends Runtime.BaseModel
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
			"api_name": "admin.wordpress.mail.settings",
			"page_name": "p",
			"title": new Runtime.Method(this, "getItemTitle"),
			"primary_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			})),
			"item_rules": new Runtime.Serializer.MapType(Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"enable": new Runtime.Serializer.IntegerType(),
				"plan": new Runtime.Serializer.StringType(),
				"host": new Runtime.Serializer.StringType(),
				"port": new Runtime.Serializer.StringType(),
				"login": new Runtime.Serializer.StringType(),
				"password": new Runtime.Serializer.StringType(),
				"ssl_enable": new Runtime.Serializer.IntegerType(),
			})),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "enable",
					"label": "Enable",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Widget.BoolEnum.options(),
					}),
				}),
				Runtime.Map.create({
					"name": "plan",
					"label": "Plan",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "host",
					"label": "Host",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "port",
					"label": "Port",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "password",
					"label": "Password",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "ssl_enable",
					"label": "SSL",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Widget.BoolEnum.options(),
					}),
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "enable",
					"label": "Enable",
					"value": (item) => { return Runtime.Widget.BoolEnum.label(item.get("enable")); },
				}),
				Runtime.Map.create({
					"name": "plan",
					"label": "Plan",
				}),
				Runtime.Map.create({
					"name": "host",
					"label": "Host",
				}),
				Runtime.Map.create({
					"name": "port",
					"label": "Port",
				}),
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
				}),
				Runtime.Map.create({
					"name": "ssl_enable",
					"label": "SSL",
					"value": (item) => { return Runtime.Widget.BoolEnum.label(item.get("enable")); },
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
		this.layout.setPageTitle("Mail settings");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.MailSettings.MailSettingsPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel"] = Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel;