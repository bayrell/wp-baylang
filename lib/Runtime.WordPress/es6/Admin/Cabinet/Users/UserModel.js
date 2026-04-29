"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.WordPress.Admin.Cabinet == 'undefined') Runtime.WordPress.Admin.Cabinet = {};
if (typeof Runtime.WordPress.Admin.Cabinet.Users == 'undefined') Runtime.WordPress.Admin.Cabinet.Users = {};
Runtime.WordPress.Admin.Cabinet.Users.UserModel = class extends Runtime.BaseModel
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
	 * Init widget
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.manager = this.createWidget("Runtime.Widget.Table.TableManager", Runtime.Map.create({
			"autoload": true,
			"api_name": "admin.cabinet.users",
			"page_name": "p",
			"title": new Runtime.Method(this, "getTableTitle"),
			"primary_rules": Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
			}),
			"item_rules": Runtime.Map.create({
				"id": new Runtime.Serializer.IntegerType(),
				"login": new Runtime.Serializer.StringType(),
				"email": new Runtime.Serializer.StringType(),
				"name": new Runtime.Serializer.StringType(),
				"is_deleted": new Runtime.Serializer.IntegerType(),
			}),
			"form_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "email",
					"label": "Email",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
					"component": "Runtime.Widget.Input",
				}),
				Runtime.Map.create({
					"name": "is_deleted",
					"label": "Status",
					"component": "Runtime.Widget.Select",
					"props": Runtime.Map.create({
						"options": Runtime.Vector.create([
							Runtime.Map.create({"key": 0, "value": "Active"}),
							Runtime.Map.create({"key": 1, "value": "Inactive"}),
						]),
					}),
				}),
				Runtime.Map.create({
					"name": "password",
					"label": "Password",
					"component": "Runtime.Widget.Input",
					"props": Runtime.Map.create({
						"type": "password",
					}),
				}),
				Runtime.Map.create({
					"name": "repeat_password",
					"label": "Repeat password",
					"component": "Runtime.Widget.Input",
					"props": Runtime.Map.create({
						"type": "password",
					}),
				}),
			]),
			"table_fields": Runtime.Vector.create([
				Runtime.Map.create({
					"name": "row_number",
				}),
				Runtime.Map.create({
					"name": "login",
					"label": "Login",
				}),
				Runtime.Map.create({
					"name": "email",
					"label": "Email",
				}),
				Runtime.Map.create({
					"name": "name",
					"label": "Name",
				}),
				Runtime.Map.create({
					"name": "is_deleted",
					"label": "Status",
					"value": (item) =>
					{
						let is_deleted = item.get("is_deleted");
						if (is_deleted == 0) return "Active";
						return "Inactive";
					},
				}),
				Runtime.Map.create({
					"name": "buttons",
					"slot": "row_buttons",
				}),
			]),
		}));
	}
	
	
	/**
	 * Returns table title
	 */
	getTableTitle(action, item)
	{
		if (action == "add") return "Add User";
		else if (action == "edit") return "Edit User";
		else if (action == "delete") return "Delete User";
		else if (action == "delete_message") return "Delete User";
		return "Users";
	}
	
	
	/**
	 * Build page title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Cabinet Users");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.Cabinet.Users.UserPage";
		this.manager = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Cabinet.Users.UserModel"] = Runtime.WordPress.Admin.Cabinet.Users.UserModel;