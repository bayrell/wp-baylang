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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormSubmitModel = class extends Runtime.Widget.Form.FormModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (!params) return;
		if (params.has("fields"))
		{
			this.fields = params.get("fields");
		}
		if (params.has("submit_button"))
		{
			this.submit_button = params.get("submit_button");
		}
		if (params.has("api_name"))
		{
			this.api_name = params.get("api_name");
		}
		if (params.has("method_name"))
		{
			this.method_name = params.get("method_name");
		}
	}
	
	
	/**
	 * Init widget
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.field_errors.error_name = "error";
		for (let field of this.fields)
		{
			let component = field.get("component");
			this.layout.addComponent(component);
		}
	}
	
	
	/**
	 * Submit form
	 */
	async submit()
	{
		/* Prepare data from fields */
		let data = new Runtime.Map();
		for (let field of this.fields.values())
		{
			let field_name = field.get("name");
			data.set(field_name, this.item.get(field_name));
		}
		/* Send API request */
		if (this.api_name)
		{
			this.result.setWaitMessage();
			/* Send api */
			let result = await this.layout.sendApi(Runtime.Map.create({
				"api_name": this.api_name,
				"method_name": this.method_name,
				"data": data,
			}));
			/* Set api result */
			this.setApiResult(result);
			if (result.isSuccess())
			{
				await this.onSubmitSuccess(result);
			}
			else
			{
				await this.onSubmitError(result);
			}
		}
	}
	
	
	/**
	 * Handle successful submission
	 */
	async onSubmitSuccess(result)
	{
		this.listener.emit(new Runtime.Widget.Form.FormMessage(Runtime.Map.create({
			"name": "submit",
			"result": result,
		})));
	}
	
	
	/**
	 * Handle submission error
	 */
	async onSubmitError(result)
	{
		this.listener.emit(new Runtime.Widget.Form.FormMessage(Runtime.Map.create({
			"name": "submit",
			"result": result,
		})));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.Form.FormSubmit";
		this.fields = Runtime.Vector.create([]);
		this.submit_button = new Runtime.Map();
		this.api_name = "";
		this.method_name = "submit";
	}
	static getClassName(){ return "Runtime.Widget.Form.FormSubmitModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Form.FormSubmitModel"] = Runtime.Widget.Form.FormSubmitModel;