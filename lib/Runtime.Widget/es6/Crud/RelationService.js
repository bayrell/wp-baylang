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
Runtime.Widget.Crud.RelationService = function()
{
	Runtime.Widget.Crud.CrudService.apply(this, arguments);
};
Runtime.Widget.Crud.RelationService.prototype = Object.create(Runtime.Widget.Crud.CrudService.prototype);
Runtime.Widget.Crud.RelationService.prototype.constructor = Runtime.Widget.Crud.RelationService;
Object.assign(Runtime.Widget.Crud.RelationService.prototype,
{
	/**
	 * Returns relation name
	 */
	getRelationName: function()
	{
		return "";
	},
	/**
	 * Returns table name
	 */
	getTableName: function()
	{
		var class_name = this.getRelationName();
		var table_name = (new Runtime.Callback(class_name, "getTableName")).apply();
		return table_name;
	},
	/**
	 * Returns connection
	 */
	getConnection: function()
	{
		return Runtime.ORM.Connection.get();
	},
	/**
	 * Create search query
	 */
	createSearchQuery: function()
	{
		return (new Runtime.ORM.Query()).select().relation(this.getRelationName()).addField(new Runtime.ORM.QueryField(this.getTableName(), "*"));
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
	},
	/**
	 * New item
	 */
	newItem: async function()
	{
		return Runtime.ORM.Relation.newInstance(this.getRelationName());
	},
	/**
	 * Find item
	 */
	findItem: async function(pk)
	{
		if (pk == null)
		{
			return Promise.resolve(null);
		}
		var class_name = this.getRelationName();
		/* Create query */
		var q = this.createSearchQuery().limit(1);
		/* Get primary key */
		var filter = this.provider.getPrimaryFilter(q._table_name, pk);
		q.setFilter(filter);
		/* Extend query */
		await this.buildSearchQuery(q);
		/* Find relation */
		var item = await this.connection.findRelation(q);
		return Promise.resolve(item);
	},
	/**
	 * Load items
	 */
	loadItems: async function()
	{
		this.page = this.search_params.get("page", 0);
		this.limit = this.search_params.get("limit", 10);
		/* Create query */
		var q = this.createSearchQuery();
		/* Set page */
		q.limit(this.limit).page(this.page);
		/* Set found_rows */
		q.calcFoundRows(true);
		var found_rows = this.search_params.get("found_rows", true);
		if (q._calc_found_rows && !found_rows)
		{
			q.calcFoundRows(false);
		}
		/* Extend query */
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
	 * Returns primary key
	 */
	getPrimaryKey: function(item)
	{
		return item.getPrimaryKey();
	},
	/**
	 * Save item
	 */
	saveItem: async function()
	{
		await this.item.save(this.connection);
		/* Refresh item */
		this.item = await this.findItem(this.getPrimaryKey(this.item));
	},
	/**
	 * Delete item
	 */
	deleteItem: async function()
	{
		await this.item.delete(this.connection);
	},
	_init: function()
	{
		Runtime.Widget.Crud.CrudService.prototype._init.call(this);
		this.connection = this.getConnection();
		this.provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		this.item = null;
	},
});
Object.assign(Runtime.Widget.Crud.RelationService, Runtime.Widget.Crud.CrudService);
Object.assign(Runtime.Widget.Crud.RelationService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.RelationService";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.CrudService";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.RelationService);
window["Runtime.Widget.Crud.RelationService"] = Runtime.Widget.Crud.RelationService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.RelationService;