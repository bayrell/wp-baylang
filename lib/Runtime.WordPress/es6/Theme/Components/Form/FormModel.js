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
if (typeof Runtime.WordPress.Theme.Components == 'undefined') Runtime.WordPress.Theme.Components = {};
if (typeof Runtime.WordPress.Theme.Components.Form == 'undefined') Runtime.WordPress.Theme.Components.Form = {};
Runtime.WordPress.Theme.Components.Form.FormModel = class extends Runtime.Widget.Form.FormModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("form_name", new Runtime.Serializer.StringType());
		rules.addType("form_title", new Runtime.Serializer.StringType());
		rules.addType("form_event", new Runtime.Serializer.StringType());
		rules.addType("form_id", new Runtime.Serializer.StringType());
		rules.addType("redirect_url", new Runtime.Serializer.StringType());
		rules.addType("fields", new Runtime.Serializer.VectorType(new Runtime.Serializer.MapType(Runtime.Map.create({
			"name": new Runtime.Serializer.StringType(),
			"title": new Runtime.Serializer.StringType(),
			"type": new Runtime.Serializer.StringType(),
			"placeholder": new Runtime.Serializer.StringType(),
			"required": new Runtime.Serializer.BooleanType(),
		}))));
	}
	
	
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
		if (params.has("form_name")) this.form_name = params.get("form_name");
		if (params.has("form_title")) this.form_title = params.get("form_title");
		if (params.has("form_event")) this.form_event = params.get("form_event");
		if (params.has("form_id")) this.form_id = params.get("form_id");
		if (params.has("redirect_url")) this.redirect_url = params.get("redirect_url");
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
		super.initWidget(params);
	}
	
	
	/**
	 * Returns field component
	 */
	getFieldComponent(field_type)
	{
		if (field_type == "textarea") return "Runtime.Widget.TextArea";
		return "Runtime.Widget.Input";
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await super.loadData(container);
		await this.loadForm();
	}
	
	
	/**
	 * Load form
	 */
	async loadForm()
	{
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "runtime.wordpress.form.submit",
			"method_name": "settings",
			"data": Runtime.Map.create({
				"form_name": this.form_name,
			}),
		}));
		if (result.isSuccess())
		{
			/* Clear fields */
			this.fields = Runtime.Vector.create([]);
			/* Add new fields */
			let settings = result.data.get("settings");
			this.fields = settings.get("fields");
		}
	}
	
	
	/**
	 * Submit form
	 */
	async submit()
	{
		this.setWaitMessage();
		let result = await this.layout.sendApi(Runtime.Map.create({
			"api_name": "runtime.wordpress.form.submit",
			"method_name": "save",
			"data": Runtime.Map.create({
				"form_name": this.form_name,
				"form_title": this.form_title,
				"form_id": this.form_id,
				"item": this.item,
			}),
		}));
		this.setApiResult(result);
		/* Send event */
		Runtime.rtl.getContext().hook("runtime.wordpress::form_submit", Runtime.Map.create({
			"form": this,
			"result": result,
		}));
		/* Redirect */
		if (result.isSuccess() && this.redirect_url != "")
		{
			document.location = this.redirect_url;
		}
		return result;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.WordPress.Theme.Components.Form.Form";
		this.form_name = "";
		this.form_title = "";
		this.form_event = "";
		this.form_id = "";
		this.redirect_url = "";
		this.fields = Runtime.Vector.create([]);
		this.item = null;
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Components.Form.FormModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Components.Form.FormModel"] = Runtime.WordPress.Theme.Components.Form.FormModel;