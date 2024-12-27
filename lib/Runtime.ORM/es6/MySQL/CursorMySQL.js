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
Runtime.ORM.MySQL.CursorMySQL = function()
{
	Runtime.ORM.Cursor.apply(this, arguments);
};
Runtime.ORM.MySQL.CursorMySQL.prototype = Object.create(Runtime.ORM.Cursor.prototype);
Runtime.ORM.MySQL.CursorMySQL.prototype.constructor = Runtime.ORM.MySQL.CursorMySQL;
Object.assign(Runtime.ORM.MySQL.CursorMySQL.prototype,
{
	/**
	 * Returns found rows
	 */
	foundRows: async function()
	{
		if (this.found_rows >= 0)
		{
			return Promise.resolve(this.found_rows);
		}
		if (!this.q)
		{
			return Promise.resolve(0);
		}
		if (!this.q._calc_found_rows)
		{
			return Promise.resolve(0);
		}
		var q = this.q.copy().clearFields().addRawField("count(1) as c").limit(-1).start(-1).clearOrder();
		var cursor = await this.conn.executeQuery(q);
		var res = await cursor.fetchVar("c");
		await cursor.close();
		this.found_rows = res;
		return Promise.resolve(res);
	},
	/**
	 * Returns affected rows
	 */
	affectedRows: async function()
	{
		return Promise.resolve(0);
	},
	/**
	 * Insert id
	 */
	lastInsertId: async function()
	{
		return Promise.resolve(0);
	},
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
	 * Close cursor
	 */
	close: async function()
	{
		return Promise.resolve(this);
	},
	/**
	 * Fetch next row
	 */
	fetchMap: async function()
	{
		return Promise.resolve(null);
	},
	_init: function()
	{
		Runtime.ORM.Cursor.prototype._init.call(this);
		this.st = null;
		this.q = null;
		this.found_rows = -1;
	},
});
Object.assign(Runtime.ORM.MySQL.CursorMySQL, Runtime.ORM.Cursor);
Object.assign(Runtime.ORM.MySQL.CursorMySQL,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.MySQL";
	},
	getClassName: function()
	{
		return "Runtime.ORM.MySQL.CursorMySQL";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.Cursor";
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
Runtime.rtl.defClass(Runtime.ORM.MySQL.CursorMySQL);
window["Runtime.ORM.MySQL.CursorMySQL"] = Runtime.ORM.MySQL.CursorMySQL;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.MySQL.CursorMySQL;