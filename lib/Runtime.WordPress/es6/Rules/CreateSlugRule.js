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
if (typeof Runtime.WordPress.Rules == 'undefined') Runtime.WordPress.Rules = {};
Runtime.WordPress.Rules.CreateSlugRule = class extends Runtime.Widget.Api.Rules.BaseRule
{
	/**
	 * Convert name to slug
	 */
	convert(name)
	{
		return "";
	}
	
	
	/**
	 * On save before
	 */
	async onSaveBefore(api)
	{
		let value = api.item.get(this.field_name);
		if (value == "" || value == null)
		{
			value = this.convert(api.item.get(this.from));
			api.item.set(this.field_name, value);
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.field_name = "";
		this.from = "";
	}
	static getClassName(){ return "Runtime.WordPress.Rules.CreateSlugRule"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Rules.CreateSlugRule"] = Runtime.WordPress.Rules.CreateSlugRule;