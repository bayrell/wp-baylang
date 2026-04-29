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
if (typeof Runtime.Widget.Api.Rules == 'undefined') Runtime.Widget.Api.Rules = {};
Runtime.Widget.Api.Rules.ReadOnlyRule = class extends Runtime.Widget.Api.Rules.BaseRule
{
	/**
	 * Create object
	 */
	constructor(field_name)
	{
		super();
		this.field_name = field_name;
	}
	
	
	/**
	 * Filter data
	 */
	filter(data, errors)
	{
		if (!data.has(this.field_name)) return;
		data.remove(this.field_name);
		return data;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.field_name = "";
	}
	static getClassName(){ return "Runtime.Widget.Api.Rules.ReadOnlyRule"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Api.Rules.ReadOnlyRule"] = Runtime.Widget.Api.Rules.ReadOnlyRule;