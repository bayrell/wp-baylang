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
if (typeof Runtime.ORM == 'undefined') Runtime.ORM = {};
if (typeof Runtime.ORM.MySQL == 'undefined') Runtime.ORM.MySQL = {};
Runtime.ORM.MySQL.CursorMySQL = class extends Runtime.ORM.Cursor
{
	/**
	 * Execute sql query
	 */
	async executeSQL(builder)
	{
		await this.adapter.executeSQL(builder);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.st = null;
		this.q = null;
		this.found_rows = -1;
		this.adapter = null;
	}
	static getClassName(){ return "Runtime.ORM.MySQL.CursorMySQL"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.MySQL.CursorMySQL"] = Runtime.ORM.MySQL.CursorMySQL;