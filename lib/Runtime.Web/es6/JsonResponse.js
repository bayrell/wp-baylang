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
Runtime.Web.JsonResponse = class extends Runtime.Web.Response
{
	/**
	 * Constructor
	 */
	constructor(data)
	{
		super();
		this.data = data;
	}
	
	
	/**
	 * Returns content
	 */
	getContent()
	{
		return Runtime.rtl.jsonEncode(Runtime.rtl.toNative(this.data));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.data = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Web.JsonResponse"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.JsonResponse"] = Runtime.Web.JsonResponse;