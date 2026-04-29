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
Runtime.WordPress.Admin.FormSettings.FormSaveApi = class extends Runtime.Widget.Api.SaveApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "admin.wordpress.forms.settings"; }
	
	
	/**
	 * Returns record name
	 */
	static getRecordName(){ return "Runtime.WordPress.Database.Form"; }
	
	
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
		rules.addType("id", new Runtime.Serializer.IntegerType());
		rules.addType("name", new Runtime.Serializer.Required());
		rules.addType("name", new Runtime.Serializer.StringType());
		rules.addType("api_name", new Runtime.Serializer.Required());
		rules.addType("api_name", new Runtime.Serializer.StringType());
		rules.addType("email_to", new Runtime.Serializer.StringType());
		rules.addType("settings", new Runtime.Serializer.MapType(Runtime.Map.create({
			"fields": new Runtime.Serializer.VectorType(new Runtime.Serializer.MapType(Runtime.Map.create({
				"name": new Runtime.Serializer.StringType(),
				"type": new Runtime.Serializer.StringType(),
				"title": new Runtime.Serializer.StringType(),
				"placeholder": new Runtime.Serializer.StringType(),
				"required": new Runtime.Serializer.StringType(),
			}))),
		})));
	}
	
	
	/**
	 * Returns item fields
	 */
	getItemFields(action)
	{
		return Runtime.Vector.create([
			"id",
			"name",
			"api_name",
			"settings",
			"email_to",
		]);
	}
	
	
	/**
	 * Build query
	 */
	async buildQuery(q)
	{
	}
	
	
	/**
	 * Before save
	 */
	async onSaveBefore()
	{
		/* Set settings */
		let settings = this.item.get("settings");
		if (settings == null) this.item.set("settings", new Runtime.Map());
	}
	
	
	/**
	 * Save form
	 */
	async actionSave()
	{
		await super.actionSave();
	}
	
	
	/**
	 * Delete form
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
	static getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormSaveApi"; }
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
window["Runtime.WordPress.Admin.FormSettings.FormSaveApi"] = Runtime.WordPress.Admin.FormSettings.FormSaveApi;