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
Runtime.Web.Headers = class extends Runtime.BaseObject
{
	/**
	 * Create object
	 */
	constructor(data)
	{
		super();
		/* Set data */
		for (let key of data.keys())
		{
			this.data.set(Runtime.rs.upper(key), data.get(key));
		}
	}
	
	
	/**
	 * Returns true if has header
	 */
	has(name)
	{
		return this.data.has(Runtime.rs.upper(name));
	}
	
	
	/**
	 * Returns header by name
	 */
	get(name)
	{
		return this.data.get(Runtime.rs.upper(name));
	}
	
	
	/**
	 * Set value
	 */
	set(name, value)
	{
		this.data.set(Runtime.rs.upper(name), value);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.data = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Web.Headers"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.Headers"] = Runtime.Web.Headers;