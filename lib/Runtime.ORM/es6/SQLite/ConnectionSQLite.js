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
if (typeof Runtime.ORM.SQLite == 'undefined') Runtime.ORM.SQLite = {};
Runtime.ORM.SQLite.ConnectionSQLite = function()
{
	Runtime.ORM.MySQL.ConnectionMySQL.apply(this, arguments);
};
Runtime.ORM.SQLite.ConnectionSQLite.prototype = Object.create(Runtime.ORM.MySQL.ConnectionMySQL.prototype);
Runtime.ORM.SQLite.ConnectionSQLite.prototype.constructor = Runtime.ORM.SQLite.ConnectionSQLite;
Object.assign(Runtime.ORM.SQLite.ConnectionSQLite.prototype,
{
	/**
	 * Connect
	 */
	connect: async function()
	{
		this.connect_error = "";
		return Promise.resolve(this);
	},
	_init: function()
	{
		Runtime.ORM.MySQL.ConnectionMySQL.prototype._init.call(this);
		this.path = "";
	},
});
Object.assign(Runtime.ORM.SQLite.ConnectionSQLite, Runtime.ORM.MySQL.ConnectionMySQL);
Object.assign(Runtime.ORM.SQLite.ConnectionSQLite,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.SQLite";
	},
	getClassName: function()
	{
		return "Runtime.ORM.SQLite.ConnectionSQLite";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.MySQL.ConnectionMySQL";
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
Runtime.rtl.defClass(Runtime.ORM.SQLite.ConnectionSQLite);
window["Runtime.ORM.SQLite.ConnectionSQLite"] = Runtime.ORM.SQLite.ConnectionSQLite;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.SQLite.ConnectionSQLite;