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
Runtime.BaseDTO = class extends Runtime.BaseObject
{
	/**
	 * Create object
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super();
		this._assign_values(params);
	}
	
	
	/**
	 * Returns field by name
	 */
	get(field_name){ return Runtime.rtl.attr(this, field_name); }
	
	
	/**
	 * Set field value
	 */
	set(field_name, value)
	{
		Runtime.rtl.setAttr(this, field_name, value);
	}
	
	
	/**
	 * Copy object
	 */
	copy(){ return Runtime.rtl.copy(this); }
	
	
	/**
	 * Returns object data
	 */
	all(){ return Runtime.rtl.serialize(this); }
	
	
	/**
	 * Intersect data
	 */
	intersect(items){ return this.all().intersect(items); }
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.BaseDTO"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.BaseDTO"] = Runtime.BaseDTO;