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
if (typeof Runtime.WordPress.Admin.FormData == 'undefined') Runtime.WordPress.Admin.FormData = {};
Runtime.WordPress.Admin.FormData.FormDataSearchApi = class extends Runtime.Widget.Api.SearchApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "admin.wordpress.forms.data"; }
	
	
	/**
	 * Returns record name
	 */
	static getRecordName(){ return "Runtime.WordPress.Database.FormData"; }
	
	
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
	 * Returns item fields
	 */
	getItemFields(action)
	{
		return Runtime.Vector.create([
			"id",
			"form_name",
			"form_title",
			"metrika_id",
			"data",
			"gmtime_add",
		]);
	}
	
	
	/**
	 * Build query
	 */
	async buildQuery(q)
	{
		q.innerJoin("forms", "forms.id = forms_data.form_id").addField("forms.name as form_name").orderBy("id", "desc");
	}
	
	
	/**
	 * Action search
	 */
	async actionSearch()
	{
		await super.actionSearch();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.FormData.FormDataSearchApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionSearch");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionSearch") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "search"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.FormData.FormDataSearchApi"] = Runtime.WordPress.Admin.FormData.FormDataSearchApi;