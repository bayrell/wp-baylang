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
if (typeof Runtime.WordPress.ORM == 'undefined') Runtime.WordPress.ORM = {};
Runtime.WordPress.ORM.WP_Cursor = function()
{
	Runtime.ORM.MySQL.CursorMySQL.apply(this, arguments);
};
Runtime.WordPress.ORM.WP_Cursor.prototype = Object.create(Runtime.ORM.MySQL.CursorMySQL.prototype);
Runtime.WordPress.ORM.WP_Cursor.prototype.constructor = Runtime.WordPress.ORM.WP_Cursor;
Object.assign(Runtime.WordPress.ORM.WP_Cursor.prototype,
{
	/**
	 * Execute sql query
	 */
	executeSQL: async function(builder)
	{
		/* Get sql */
		var sql = builder.getSQL();
		var data = builder.getData();
		return Promise.resolve(this);
	},
	/**
	 * Fetch next row
	 */
	fetchMap: async function()
	{
		return Promise.resolve(null);
	},
	/**
	 * Returns affected rows
	 */
	affectedRows: async function()
	{
		return this.rows_affected;
	},
	/**
	 * Insert id
	 */
	lastInsertId: async function()
	{
		return this.insert_id;
	},
	/**
	 * Close cursor
	 */
	close: async function()
	{
		return this;
	},
	_init: function()
	{
		Runtime.ORM.MySQL.CursorMySQL.prototype._init.call(this);
		this.num_rows = 0;
		this.rows_affected = 0;
		this.insert_id = 0;
		this.last_result = Runtime.Vector.from([]);
		this.last_result_pos = 0;
		this.last_result_sz = 0;
	},
});
Object.assign(Runtime.WordPress.ORM.WP_Cursor, Runtime.ORM.MySQL.CursorMySQL);
Object.assign(Runtime.WordPress.ORM.WP_Cursor,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.ORM";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.ORM.WP_Cursor";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.MySQL.CursorMySQL";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.ORM.WP_Cursor);
window["Runtime.WordPress.ORM.WP_Cursor"] = Runtime.WordPress.ORM.WP_Cursor;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.ORM.WP_Cursor;