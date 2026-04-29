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
if (typeof Runtime.WordPress.Admin.Migrations == 'undefined') Runtime.WordPress.Admin.Migrations = {};
Runtime.WordPress.Admin.Migrations.MigrationPageModel = class extends Runtime.BaseModel
{
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
		/* Add result */
		this.result = this.createWidget("Runtime.Widget.ResultModel", Runtime.Map.create({
			"styles": Runtime.Vector.create(["margin_top"]),
		}));
	}
	
	
	/**
	 * Process frontend data
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("items", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Update database
	 */
	async updateDatabase()
	{
		this.result.setWaitMessage();
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.migration",
			"method_name": "update",
		}));
		this.result.setApiResult(result);
	}
	
	
	/**
	 * Load table data
	 */
	async loadData(container)
	{
		await super.loadData(container);
		let result = this.layout.sendApi(Runtime.Map.create({
			"api_name": "admin.wordpress.migration",
			"method_name": "item",
		}));
		if (result.isSuccess())
		{
			this.items = result.data.get("items");
		}
	}
	
	
	/**
	 * Build title
	 */
	buildTitle(container)
	{
		this.layout.setPageTitle("Database migrations");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Admin.Migrations.MigrationPage";
		this.items = Runtime.Vector.create([]);
		this.result = null;
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Migrations.MigrationPageModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Migrations.MigrationPageModel"] = Runtime.WordPress.Admin.Migrations.MigrationPageModel;