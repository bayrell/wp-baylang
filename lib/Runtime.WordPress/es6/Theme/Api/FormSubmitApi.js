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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Api == 'undefined') Runtime.WordPress.Theme.Api = {};
Runtime.WordPress.Theme.Api.FormSubmitApi = class extends Runtime.Web.BaseApi
{
	/**
	 * Returns api name
	 */
	static getApiName(){ return "runtime.wordpress.form.submit"; }
	
	
	/**
	 * Set request
	 */
	setRequest(request)
	{
		super.setRequest(request);
		this.client_ip = request.storage.get("client_ip");
	}
	
	
	/**
	 * Returns form settings
	 */
	async actionSettings()
	{
		/* Validate data */
		let update_data = this.filter(this.request.data, new Runtime.Serializer.MapType(Runtime.Map.create({
			"form_name": new Runtime.Serializer.StringType(),
		})));
		/* Find form */
		let form_name = update_data.get("form_name");
		let form = await this.form_service.findForm(form_name);
		if (!form)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(form_name, "Form"));
		}
		/* Get form settings */
		let form_settings = form.settings;
		if (!form_settings)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(form_name, "Form settings"));
		}
		/* Set result */
		return this.result.success(Runtime.Map.create({
			"message": "Ok",
			"data": Runtime.Map.create({
				"name": form_name,
				"settings": form_settings,
			}),
		}));
	}
	
	
	/**
	 * Action save
	 */
	async actionSave()
	{
		let errors = Runtime.Vector.create([]);
		/* Validate data */
		let update_data = this.filter(this.request.data, new Runtime.Serializer.MapType(Runtime.Map.create({
			"form_name": new Runtime.Serializer.StringType(),
			"form_title": new Runtime.Serializer.StringType(),
			"form_id": new Runtime.Serializer.StringType(),
			"item": new Runtime.Serializer.Required(),
		})));
		/* Get data */
		let site_name = "";
		let form_name = update_data.get("form_name");
		let form_title = update_data.get("form_title");
		let form_id = update_data.get("form_id");
		/* Site name */
		/* Find form */
		let form = await this.form_service.findForm(form_name);
		if (!form)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(form_name, "Form"));
		}
		/* Validate item */
		let rules = form.getRules();
		let item_data = rules.filter(update_data.get("item"), errors);
		if (!item_data || errors.count() > 0)
		{
			return this.result.fail(new Runtime.Exceptions.FieldException(Runtime.Map.create({
				"fields": Runtime.Serializer.TypeError.getMap(errors),
			})));
		}
		/* Spam check */
		let spam_check = await this.form_service.checkSpam(this.client_ip);
		if (spam_check)
		{
			return this.result.success(Runtime.Map.create({
				"message": "Ok",
			}));
		}
		/* Save form */
		let form_data = this.relation_form_data.createRecord();
		form_data.form_id = form.id;
		form_data.form_title = form_title ? form_title : form.name;
		form_data.metrika_id = form_id ? form_id : "form";
		form_data.data = update_data.get("item");
		form_data.spam = spam_check;
		await this.relation_form_data.save(form_data);
		/* Send email */
		if (!spam_check)
		{
			await this.form_service.sendEmail(form, form_data, this.email, site_name);
		}
		/* Set result */
		return this.result.success(Runtime.Map.create({
			"message": "Ok",
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.form = null;
		this.relation_form = new Runtime.ORM.Relation("Runtime.WordPress.Database.Form");
		this.relation_form_data = new Runtime.ORM.Relation("Runtime.WordPress.Database.FormData");
		this.relation_form_ip = new Runtime.ORM.Relation("Runtime.WordPress.Database.FormIP");
		this.form_service = new Runtime.WordPress.Service.FormService();
		this.email = Runtime.rtl.getContext().provider("email");
		this.client_ip = "";
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Api.FormSubmitApi"; }
	static getMethodsList()
	{
		const Vector = use("Runtime.Vector");
		return new Vector("actionSettings", "actionSave");
	}
	static getMethodInfoByName(field_name)
	{
		const Vector = use("Runtime.Vector");
		if (field_name == "actionSettings") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "settings"}))
		);
		if (field_name == "actionSave") return new Vector(
			new Runtime.Web.Annotations.ApiMethod(Runtime.Map.create({"name": "save"}))
		);
		return null;
	}
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Api.FormSubmitApi"] = Runtime.WordPress.Theme.Api.FormSubmitApi;