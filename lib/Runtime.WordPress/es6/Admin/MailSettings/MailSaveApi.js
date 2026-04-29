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
Runtime.WordPress.Admin.MailSettings.MailSaveApi = class extends Runtime.Widget.Api.SaveApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "admin.wordpress.mail.settings"; }
	
	
	/**
	 * Returns record name
	 */
	static getRecordName(){ return "Runtime.WordPress.Database.MailSettings"; }
	
	
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
	rules(){ return Runtime.Vector.create([]); }
	
	
	/**
	 * Returns serialize rules
	 */
	getItemRules(rules)
	{
		super.getItemRules(rules);
		rules.addType("enable", new Runtime.Serializer.IntegerType());
		rules.addType("plan", new Runtime.Serializer.Required());
		rules.addType("plan", new Runtime.Serializer.StringType());
		rules.addType("host", new Runtime.Serializer.StringType());
		rules.addType("port", new Runtime.Serializer.StringType());
		rules.addType("login", new Runtime.Serializer.StringType());
		rules.addType("password", new Runtime.Serializer.StringType());
		rules.addType("ssl_enable", new Runtime.Serializer.IntegerType());
	}
	
	
	/**
	 * Returns item fields
	 */
	getItemFields(action)
	{
		return Runtime.Vector.create([
			"id",
			"enable",
			"plan",
			"host",
			"port",
			"login",
			"password",
			"ssl_enable",
		]);
	}
	
	
	/**
	 * Build query
	 */
	async buildQuery(q)
	{
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
	static getClassName(){ return "Runtime.WordPress.Admin.MailSettings.MailSaveApi"; }
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
window["Runtime.WordPress.Admin.MailSettings.MailSaveApi"] = Runtime.WordPress.Admin.MailSettings.MailSaveApi;