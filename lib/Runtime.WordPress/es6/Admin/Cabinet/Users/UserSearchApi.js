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
Runtime.WordPress.Admin.Cabinet.Users.UserSearchApi = class extends Runtime.Widget.Api.SearchApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "admin.cabinet.users"; }
	
	
	/**
	 * Returns record name
	 */
	static getRecordName(){ return "Runtime.Cabinet.Database.User"; }
	
	
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
	}
	
	
	/**
	 * Returns item fields
	 */
	getItemFields(action)
	{
		return Runtime.Vector.create([
			"id",
			"login",
			"email",
			"name",
			"is_deleted",
		]);
	}
	
	
	/**
	 * Build Query
	 */
	async buildQuery(q)
	{
		/* Default sort by id desc */
		q.orderBy("id", "desc");
	}
	
	
	/**
	 * Action search
	 */
	async actionSearch()
	{
		await super.actionSearch();
	}
	
	
	/**
	 * Action item
	 */
	async actionItem()
	{
		await super.actionItem();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserSearchApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionSearch", "actionItem");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionSearch") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "search"}))
		);
		if (field_name == "actionItem") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "item"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Cabinet.Users.UserSearchApi"] = Runtime.WordPress.Admin.Cabinet.Users.UserSearchApi;