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
Runtime.ORM.QueryResult = function()
{
	Runtime.Vector.call(this);
};
Runtime.ORM.QueryResult.prototype = Object.create(Runtime.Vector.prototype);
Runtime.ORM.QueryResult.prototype.constructor = Runtime.ORM.QueryResult;
Object.assign(Runtime.ORM.QueryResult.prototype,
{
	/**
	 * Returns pages
	 */
	getPages: async function()
	{
		return (this.q) ? (this.q.getPages(this.rows)) : (0);
	},
	/**
	 * Returns page
	 */
	getPage: async function()
	{
		return (this.q) ? (this.q.getPage()) : (0);
	},
	/**
	 * Returns relation by index
	 */
	getRelation: function(index)
	{
		var table_name = this.q._table_name;
		var item = this.get(index);
		return Runtime.ORM.Relation.newInstance(table_name, item);
	},
	/**
	 * Convert to Vector
	 */
	toDict: function(fields)
	{
		if (fields == undefined) fields = null;
		return this.map((item) =>
		{
			return (fields == null) ? (item.toDict()) : (item.intersect(fields));
		}).toVector();
	},
	/**
	 * Transform item to Relation
	 */
	toRelation: function()
	{
		var table_name = this.q._table_name;
		return this.map((item) =>
		{
			return Runtime.ORM.Relation.newInstance(table_name, item);
		}).toVector();
	},
	_init: function()
	{
		Runtime.Vector.prototype._init.call(this);
		this.q = null;
		this.conn = null;
		this.rows = 0;
	},
});
Object.assign(Runtime.ORM.QueryResult, Runtime.Vector);
Object.assign(Runtime.ORM.QueryResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.QueryResult";
	},
	getParentClassName: function()
	{
		return "Runtime.Vector";
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
Runtime.rtl.defClass(Runtime.ORM.QueryResult);
window["Runtime.ORM.QueryResult"] = Runtime.ORM.QueryResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.QueryResult;