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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Crud == 'undefined') Runtime.Widget.Crud = {};
Runtime.Widget.Crud.SearchRelationApi = function()
{
	Runtime.Widget.Crud.SearchApi.apply(this, arguments);
};
Runtime.Widget.Crud.SearchRelationApi.prototype = Object.create(Runtime.Widget.Crud.SearchApi.prototype);
Runtime.Widget.Crud.SearchRelationApi.prototype.constructor = Runtime.Widget.Crud.SearchRelationApi;
Object.assign(Runtime.Widget.Crud.SearchRelationApi.prototype,
{
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		return "";
	},
	/**
	 * Returns connection
	 */
	getConnection: function()
	{
		return Runtime.ORM.Connection.get();
	},
	/**
	 * Returns query field
	 */
	getQueryField: function(table_name, field_name)
	{
		var field = this.provider.getFieldType(table_name, field_name);
		if (!field)
		{
			return null;
		}
		return new Runtime.ORM.QueryField(table_name, field_name);
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
	},
	/**
	 * Convert item
	 */
	convertItem: function(fields, item)
	{
		return item.intersect(fields);
	},
	/**
	 * Search items
	 */
	searchItems: async function()
	{
		var page = this.post_data.get("page", 0);
		var limit = this.post_data.get("limit", 10);
		var table_name = this.getTableName();
		/* Build query */
		var q = (new Runtime.ORM.Query()).select().from(table_name).limit(limit).page(page);
		/* Get provider */
		this.provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		/* Add fields */
		var fields = this.getItemFields();
		for (var i = 0; i < fields.count(); i++)
		{
			var field_name = fields.get(i);
			var field = this.getQueryField(table_name, field_name);
			if (field)
			{
				q.addField(field);
			}
		}
		/* Set found_rows */
		q.calcFoundRows(true);
		var found_rows = this.post_data.get("found_rows", true);
		if (q._calc_found_rows && !found_rows)
		{
			q.calcFoundRows(false);
		}
		/* Build search query */
		await this.buildSearchQuery(q);
		/* Get query result */
		var conn = Runtime.ORM.Connection.get();
		this.items = await conn.fetchAll(q);
		/* Set pages */
		this.page = this.items.getPage();
		this.pages = this.items.getPages();
		this.limit = this.items.q._limit;
	},
	/**
	 * Build result
	 */
	buildResult: async function()
	{
		if (!this.items)
		{
			return Promise.resolve();
		}
		/* Convert item */
		var fields = this.getItemFields();
		var items = this.items.map((item) =>
		{
			return this.convertItem(fields, item);
		});
		/* Setup result */
		this.result.data.set("items", items);
		this.result.data.set("page", this.page);
		this.result.data.set("pages", this.pages);
		this.result.data.set("limit", this.limit);
		/* Success */
		this.success();
	},
	_init: function()
	{
		Runtime.Widget.Crud.SearchApi.prototype._init.call(this);
		this.provider = null;
		this.items = null;
		this.page = 0;
		this.pages = 0;
		this.limit = 0;
	},
});
Object.assign(Runtime.Widget.Crud.SearchRelationApi, Runtime.Widget.Crud.SearchApi);
Object.assign(Runtime.Widget.Crud.SearchRelationApi,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.SearchRelationApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SearchApi";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.SearchRelationApi);
window["Runtime.Widget.Crud.SearchRelationApi"] = Runtime.Widget.Crud.SearchRelationApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.SearchRelationApi;