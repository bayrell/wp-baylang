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
Runtime.WordPress.Database.ORM.WP_Cursor = class extends Runtime.ORM.MySQL.CursorMySQL
{
	/**
	 * Execute sql query
	 */
	async executeSQL(builder)
	{
		/* Get sql */
		let sql = builder.getSQL();
		let data = builder.getData();
		return this;
	}
	
	
	/**
	 * Fetch next row
	 */
	async fetchMap()
	{
		return null;
	}
	
	
	/**
	 * Returns affected rows
	 */
	async affectedRows(){ return this.rows_affected; }
	
	
	/**
	 * Insert id
	 */
	async lastInsertId(){ return this.insert_id; }
	
	
	/**
	 * Close cursor
	 */
	async close(){ return this; }
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.num_rows = 0;
		this.rows_affected = 0;
		this.insert_id = 0;
		this.last_result = Runtime.Vector.create([]);
		this.last_result_pos = 0;
		this.last_result_sz = 0;
	}
	static getClassName(){ return "Runtime.WordPress.Database.ORM.WP_Cursor"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Database.ORM.WP_Cursor"] = Runtime.WordPress.Database.ORM.WP_Cursor;