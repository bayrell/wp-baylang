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
Runtime.WordPress.Admin.Cabinet.Users.UserSaveApi = class extends Runtime.Widget.Api.SaveApi
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
	 * Returns save rules
	 */
	rules()
	{
		return Runtime.Vector.create([
			new Runtime.Widget.Api.Rules.UniqueRule(Runtime.Map.create({"field_name": "login"})),
			new Runtime.Widget.Api.Rules.UniqueRule(Runtime.Map.create({"field_name": "email"})),
		]);
	}
	
	
	/**
	 * Returns data rules
	 */
	getDataRules(rules)
	{
	}
	
	
	/**
	 * Returns item rules
	 */
	getItemRules(rules)
	{
		rules.addType("id", new Runtime.Serializer.IntegerType());
		rules.addType("login", new Runtime.Serializer.Required());
		rules.addType("login", new Runtime.Serializer.StringType());
		rules.addType("email", new Runtime.Serializer.Required());
		rules.addType("email", new Runtime.Serializer.StringType());
		rules.addType("name", new Runtime.Serializer.StringType());
		rules.addType("password", new Runtime.Serializer.StringType());
		rules.addType("repeat_password", new Runtime.Serializer.StringType());
		rules.addType("is_deleted", new Runtime.Serializer.IntegerType());
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
			"gmtime_add",
			"gmtime_edit",
		]);
	}
	
	
	/**
	 * Returns save fields
	 */
	getSaveFields()
	{
		return Runtime.Vector.create([
			"login",
			"email",
			"name",
			"is_deleted",
		]);
	}
	
	
	/**
	 * Check data after setup
	 */
	checkData(errors)
	{
		let password = this.update_data.get("password");
		let repeat_password = this.update_data.get("repeat_password");
		if (password && password != repeat_password)
		{
			errors.push(new Runtime.Serializer.TypeError("Password mistmatch", "repeat_password"));
		}
	}
	
	
	/**
	 * Build query
	 */
	async buildQuery(q)
	{
		await super.buildQuery(q);
	}
	
	
	/**
	 * Save before
	 */
	async onSaveBefore()
	{
		await super.onSaveBefore();
	}
	
	
	/**
	 * Save after
	 */
	async onSaveAfter()
	{
		await super.onSaveAfter();
		let password = this.update_data.get("password");
		let repeat_password = this.update_data.get("repeat_password");
		if (password != "" && password == repeat_password)
		{
			this.item.setPassword(password);
			await this.item.save();
		}
	}
	
	
	/**
	 * Delete before
	 */
	async onDeleteBefore()
	{
		await super.onDeleteBefore();
	}
	
	
	/**
	 * Delete after
	 */
	async onDeleteAfter()
	{
	}
	
	
	/**
	 * Save action
	 */
	async actionSave()
	{
		await super.actionSave();
	}
	
	
	/**
	 * Delete action
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
	static getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserSaveApi"; }
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
window["Runtime.WordPress.Admin.Cabinet.Users.UserSaveApi"] = Runtime.WordPress.Admin.Cabinet.Users.UserSaveApi;