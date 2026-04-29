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
Runtime.WordPress.Admin.Migrations.MigrationApi = class extends Runtime.Web.BaseApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "admin.wordpress.migration"; }
	
	
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
	 * Execute
	 */
	async up(execute)
	{
		if (execute == undefined) execute = false;
		/* Get migrations */
		let builder = new Runtime.ORM.MigrationBuilder();
		/* Init builder */
		await builder.init();
		/* Up migrations */
		await builder.up(execute);
		/* Returns builder */
		return builder;
	}
	
	
	/**
	 * Action item
	 */
	async actionItem()
	{
		let builder = await this.up();
		this.success(Runtime.Map.create({
			"data": Runtime.Map.create({
				"items": builder.getSQL(),
			}),
		}));
	}
	
	
	/**
	 * Update database
	 */
	async actionUpdate()
	{
		let builder = await this.up(true);
		this.success();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Migrations.MigrationApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionItem", "actionUpdate");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionItem") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "item"}))
		);
		if (field_name == "actionUpdate") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "update"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Migrations.MigrationApi"] = Runtime.WordPress.Admin.Migrations.MigrationApi;