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
Runtime.WordPress.ORM.WP_Connection = function()
{
	Runtime.ORM.MySQL.ConnectionMySQL.apply(this, arguments);
};
Runtime.WordPress.ORM.WP_Connection.prototype = Object.create(Runtime.ORM.MySQL.ConnectionMySQL.prototype);
Runtime.WordPress.ORM.WP_Connection.prototype.constructor = Runtime.WordPress.ORM.WP_Connection;
Object.assign(Runtime.WordPress.ORM.WP_Connection.prototype,
{
	/**
	 * Connect
	 */
	connect: function()
	{
	},
	/**
	 * Connect
	 */
	isConnected: function()
	{
		return true;
	},
	/**
	 * Create new cursor
	 */
	createCursor: function()
	{
		return new Runtime.WordPress.ORM.WP_Cursor(this);
	},
	/**
	 * Create SQLBuilder
	 */
	createBuilder: function(q)
	{
		return new Runtime.WordPress.ORM.WP_SQLBuilder(this, q);
	},
});
Object.assign(Runtime.WordPress.ORM.WP_Connection, Runtime.ORM.MySQL.ConnectionMySQL);
Object.assign(Runtime.WordPress.ORM.WP_Connection,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.ORM";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.ORM.WP_Connection";
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
Runtime.rtl.defClass(Runtime.WordPress.ORM.WP_Connection);
window["Runtime.WordPress.ORM.WP_Connection"] = Runtime.WordPress.ORM.WP_Connection;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.ORM.WP_Connection;