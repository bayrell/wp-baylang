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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.Translator = class extends Runtime.BaseModel
{
	/**
	 * Create object
	 */
	constructor(layout)
	{
		super();
		this.layout = layout;
	}
	
	
	/**
	 * Translate
	 */
	translate(domain, key, default_value)
	{
		if (default_value == undefined) default_value = "";
		return default_value ? default_value : key;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.layout = null;
	}
	static getClassName(){ return "Runtime.Web.Translator"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Translator"] = Runtime.Web.Translator;