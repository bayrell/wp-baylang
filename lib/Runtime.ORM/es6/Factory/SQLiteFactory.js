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
if (typeof Runtime.ORM.Factory == 'undefined') Runtime.ORM.Factory = {};
Runtime.ORM.Factory.SQLiteFactory = function()
{
	Runtime.ORM.Factory.ConnectionFactory.apply(this, arguments);
};
Runtime.ORM.Factory.SQLiteFactory.prototype = Object.create(Runtime.ORM.Factory.ConnectionFactory.prototype);
Runtime.ORM.Factory.SQLiteFactory.prototype.constructor = Runtime.ORM.Factory.SQLiteFactory;
Object.assign(Runtime.ORM.Factory.SQLiteFactory.prototype,
{
	/**
	 * Create connection
	 */
	createConnection: function()
	{
		var conn = new Runtime.ORM.SQLite.ConnectionSQLite(this.name);
		conn.database = this.path;
		conn.connect();
		conn.executeSQL("PRAGMA journal_mode = WAL;");
		return conn;
	},
	_init: function()
	{
		Runtime.ORM.Factory.ConnectionFactory.prototype._init.call(this);
		this.path = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "path")return this.path;
		return Runtime.ORM.Factory.ConnectionFactory.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Factory.SQLiteFactory, Runtime.ORM.Factory.ConnectionFactory);
Object.assign(Runtime.ORM.Factory.SQLiteFactory,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Factory";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Factory.SQLiteFactory";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.Factory.ConnectionFactory";
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
		a.push("path");
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
Runtime.rtl.defClass(Runtime.ORM.Factory.SQLiteFactory);
window["Runtime.ORM.Factory.SQLiteFactory"] = Runtime.ORM.Factory.SQLiteFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Factory.SQLiteFactory;