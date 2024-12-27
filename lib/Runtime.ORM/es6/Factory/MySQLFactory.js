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
Runtime.ORM.Factory.MySQLFactory = function()
{
	Runtime.ORM.Factory.ConnectionFactory.apply(this, arguments);
};
Runtime.ORM.Factory.MySQLFactory.prototype = Object.create(Runtime.ORM.Factory.ConnectionFactory.prototype);
Runtime.ORM.Factory.MySQLFactory.prototype.constructor = Runtime.ORM.Factory.MySQLFactory;
Object.assign(Runtime.ORM.Factory.MySQLFactory.prototype,
{
	/**
	 * Create connection
	 */
	createConnection: function()
	{
		var conn = new Runtime.ORM.MySQL.ConnectionMySQL(this.name);
		conn.host = this.host;
		conn.login = this.login;
		conn.password = this.password;
		conn.database = this.database;
		conn.prefix = this.prefix;
		conn.connect();
		return conn;
	},
	_init: function()
	{
		Runtime.ORM.Factory.ConnectionFactory.prototype._init.call(this);
		this.host = "";
		this.login = "";
		this.password = "";
		this.database = "";
		this.prefix = "";
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "host")return this.host;
		else if (k == "login")return this.login;
		else if (k == "password")return this.password;
		else if (k == "database")return this.database;
		else if (k == "prefix")return this.prefix;
		return Runtime.ORM.Factory.ConnectionFactory.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Factory.MySQLFactory, Runtime.ORM.Factory.ConnectionFactory);
Object.assign(Runtime.ORM.Factory.MySQLFactory,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Factory";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Factory.MySQLFactory";
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
		a.push("host");
		a.push("login");
		a.push("password");
		a.push("database");
		a.push("prefix");
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
Runtime.rtl.defClass(Runtime.ORM.Factory.MySQLFactory);
window["Runtime.ORM.Factory.MySQLFactory"] = Runtime.ORM.Factory.MySQLFactory;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Factory.MySQLFactory;