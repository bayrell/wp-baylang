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
Runtime.Widget.Crud.SaveRelationApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
Runtime.Widget.Crud.SaveRelationApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
Runtime.Widget.Crud.SaveRelationApi.prototype.constructor = Runtime.Widget.Crud.SaveRelationApi;
Object.assign(Runtime.Widget.Crud.SaveRelationApi.prototype,
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
	 * New item
	 */
	newItem: async function()
	{
		return new Runtime.ORM.Relation(this.getTableName());
	},
	/**
	 * Find item
	 */
	findItem: async function(pk)
	{
		var table_name = this.getTableName();
		/* Get query */
		var q = (new Runtime.ORM.Query()).select().from(table_name).limit(1);
		/* Get provider */
		this.provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		/* Add fields */
		var fields = Runtime.ORM.Relation.getPrimaryKeys(table_name);
		if (!this.isActionDelete())
		{
			fields = fields.concat(this.getItemFields());
		}
		fields = fields.removeDuplicates();
		for (var i = 0; i < fields.count(); i++)
		{
			var field_name = fields.get(i);
			var field = this.getQueryField(table_name, field_name);
			if (field)
			{
				q.addField(field);
			}
		}
		/* Get primary key */
		var filter = Runtime.ORM.Relation.getPrimaryFilter(table_name, pk);
		q.setFilter(filter);
		/* Build query */
		this.buildSearchQuery(q);
		/* Find relation */
		var connection = this.getConnection();
		var item = await connection.findRelation(q);
		return Promise.resolve(item);
	},
	/**
	 * Convert item
	 */
	convertItem: function(fields, item)
	{
		return item.intersect(fields);
	},
	/**
	 * Set item
	 */
	setItemValue: function(key, value)
	{
		this.item.set(key, value);
	},
	/**
	 * Save
	 */
	save: async function()
	{
		var connection = this.getConnection();
		await this.item.save(connection);
	},
	/**
	 * Save item
	 */
	saveItem: async function()
	{
		/* Before save */
		await this.onSaveBefore();
		/* Save item */
		await this.save();
		/* Refresh item */
		this.item = await this.findItem(this.item.getPrimaryKey());
		/* After save */
		await this.onSaveAfter();
	},
	/**
	 * Remove
	 */
	remove: async function()
	{
		var connection = this.getConnection();
		await this.item.delete(connection);
	},
	/**
	 * Remove item
	 */
	removeItem: async function()
	{
		/* Before delete */
		await this.onDeleteBefore();
		/* Remove */
		await this.remove();
		/* Before delete */
		await this.onDeleteAfter();
	},
	/**
	 * Build result
	 */
	buildResult: async function()
	{
		if (!this.item)
		{
			return Promise.resolve();
		}
		/* Convert item */
		var fields = this.getItemFields();
		var item = this.convertItem(fields, this.item);
		var pk = this.item.getPrimaryKey();
		/* Setup result */
		this.result.data.set("pk", pk);
		this.result.data.set("item", item);
		/* Success */
		this.success();
	},
});
Object.assign(Runtime.Widget.Crud.SaveRelationApi, Runtime.Widget.Crud.SaveApi);
Object.assign(Runtime.Widget.Crud.SaveRelationApi,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.SaveRelationApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SaveApi";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.SaveRelationApi);
window["Runtime.Widget.Crud.SaveRelationApi"] = Runtime.Widget.Crud.SaveRelationApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.SaveRelationApi;