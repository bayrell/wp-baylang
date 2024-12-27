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
if (typeof Runtime.ORM.Annotations == 'undefined') Runtime.ORM.Annotations = {};
Runtime.ORM.Annotations.ForeignKey = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.ORM.Annotations.ForeignKey.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.ORM.Annotations.ForeignKey.prototype.constructor = Runtime.ORM.Annotations.ForeignKey;
Object.assign(Runtime.ORM.Annotations.ForeignKey.prototype,
{
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(kind, conn, q)
	{
		return q;
	},
	/**
	 * Build query for resolve foreign key
	 */
	resolveQuery: async function(conn, items)
	{
		var ids = items.map((item) =>
		{
			return item.get(this.foreign_key);
		}).removeDuplicates();
		var __v0 = new Runtime.Monad(new Runtime.ORM.Query());
		__v0 = __v0.callMethod("select", [this.table_name]);
		__v0 = __v0.callMethod("where", [this.table_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(this.primary_key), "=", ids]);
		var q = __v0.value();
		/* Filter */
		q = await this.buildSearchQuery("resolve", conn, q);
		return Promise.resolve(q);
	},
	/**
	 * Resolve foreign key
	 */
	resolve: async function(conn, items)
	{
		var q = await this.constructor.resolveQuery(conn, items);
		var result = await conn.fetchAll(q);
		return Promise.resolve(result);
	},
	/**
	 * Build query for reverse resolve foreign key
	 */
	resolveReverseQuery: async function(conn, items)
	{
		var ids = items.map((item) =>
		{
			return item.get(this.primary_key);
		}).removeDuplicates();
		var __v0 = new Runtime.Monad(new Runtime.ORM.Query());
		__v0 = __v0.callMethod("select", [this.table_name_source]);
		__v0 = __v0.callMethod("where", [this.table_name_source + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(this.foreign_key), "=", ids]);
		var q = __v0.value();
		/* Filter */
		q = await this.buildSearchQuery("resolveReverse", conn, q);
		return Promise.resolve(q);
	},
	/**
	 * Reverse resolve foreign key
	 */
	resolveReverse: async function(conn, items)
	{
		var q = await this.constructor.resolveReverseQuery(conn, items);
		var result = await conn.fetchAll(q);
		return Promise.resolve(result);
	},
	/**
	 * Resolve all
	 */
	resolveAll: async function(conn)
	{
		var __v0 = new Runtime.Monad(new Runtime.ORM.Query());
		__v0 = __v0.callMethod("select", [this.table_name]);
		var q = __v0.value();
		/* Filter */
		q = await this.buildSearchQuery("resolveAll", conn, q);
		var result = await conn.fetchAll(q);
		return Promise.resolve(result);
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.table_name = "";
		this.table_name_source = "";
		this.primary_key = null;
		this.foreign_key = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "table_name")return this.table_name;
		else if (k == "table_name_source")return this.table_name_source;
		else if (k == "primary_key")return this.primary_key;
		else if (k == "foreign_key")return this.foreign_key;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.ORM.Annotations.ForeignKey, Runtime.BaseStruct);
Object.assign(Runtime.ORM.Annotations.ForeignKey,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Annotations";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Annotations.ForeignKey";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
		a.push("name");
		a.push("table_name");
		a.push("table_name_source");
		a.push("primary_key");
		a.push("foreign_key");
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
Runtime.rtl.defClass(Runtime.ORM.Annotations.ForeignKey);
window["Runtime.ORM.Annotations.ForeignKey"] = Runtime.ORM.Annotations.ForeignKey;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Annotations.ForeignKey;