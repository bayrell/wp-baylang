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
if (typeof Runtime.Widget.Api == 'undefined') Runtime.Widget.Api = {};
Runtime.Widget.Api.FieldErrors = class extends Runtime.BaseObject
{
	/**
	 * Add field errors
	 */
	addFieldErrors(errors)
	{
		for (let i = 0; i < errors.count(); i++)
		{
			let error = errors.get(i);
			let field_name = error.getFieldName();
			if (!this.errors.has(field_name))
			{
				this.errors.set(field_name, Runtime.Vector.create([]));
			}
			let item = this.errors.get(field_name);
			item.push(error.message);
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.errors = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Widget.Api.FieldErrors"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Api.FieldErrors"] = Runtime.Widget.Api.FieldErrors;