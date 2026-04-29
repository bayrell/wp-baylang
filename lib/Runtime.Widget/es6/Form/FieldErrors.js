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
Runtime.Widget.Form.FieldErrors = class extends Runtime.BaseModel
{
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params.has("error_name")) this.error_name = params.get("error_name");
	}
	
	
	/**
	 * Set api result
	 */
	setApiResult(result)
	{
		this.setFieldErrors(result.data.get(this.error_name));
	}
	
	
	/**
	 * Set field errors
	 */
	setFieldErrors(field_errors)
	{
		if (!field_errors)
		{
			this.errors = new Runtime.Map();
			return;
		}
		this.errors = new Runtime.Map();
		let keys = Runtime.rtl.list(field_errors.keys());
		for (let i = 0; i < keys.count(); i++)
		{
			let field_name = keys.get(i);
			let messages = field_errors.get(field_name);
			let message = Runtime.rs.join(", ", messages);
			let result = new Runtime.Widget.ResultModel();
			result.setError(message);
			this.errors.set(field_name, result);
		}
	}
	
	
	/**
	 * Returns result
	 */
	get(field_name){ return this.errors.get(field_name); }
	
	
	/**
	 * Clear
	 */
	clear()
	{
		this.errors = new Runtime.Map();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.errors = new Runtime.Map();
		this.error_name = "fields";
	}
	static getClassName(){ return "Runtime.Widget.Form.FieldErrors"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Form.FieldErrors"] = Runtime.Widget.Form.FieldErrors;