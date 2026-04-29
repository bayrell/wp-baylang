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
if (typeof Runtime.WordPress.Database == 'undefined') Runtime.WordPress.Database = {};
if (typeof Runtime.WordPress.Database.ORM == 'undefined') Runtime.WordPress.Database.ORM = {};
Runtime.WordPress.Database.ORM.WP_SQLBuilder = class extends Runtime.ORM.MySQL.SQLBuilder
{
	/**
	 * Format key
	 */
	formatKey(key){ return ":" + String(key) + String(":"); }
	
	
	/**
	 * Escape value
	 */
	prepareValue(value, op)
	{
		return Runtime.Vector.create([value, op]);
	}
	
	
	/**
	 * Quote
	 */
	quote(value)
	{
		return value;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Database.ORM.WP_SQLBuilder"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Database.ORM.WP_SQLBuilder"] = Runtime.WordPress.Database.ORM.WP_SQLBuilder;