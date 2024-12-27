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
Runtime.Widget.Crud.SaveApi = function()
{
	Runtime.Web.BaseApi.apply(this, arguments);
};
Runtime.Widget.Crud.SaveApi.prototype = Object.create(Runtime.Web.BaseApi.prototype);
Runtime.Widget.Crud.SaveApi.prototype.constructor = Runtime.Widget.Crud.SaveApi;
Object.assign(Runtime.Widget.Crud.SaveApi.prototype,
{
	/**
	 * Returns if item
	 */
	isActionItem: function()
	{
		return this.action == "actionItem";
	},
	/**
	 * Returns if save
	 */
	isActionSave: function()
	{
		return this.action == "actionSave";
	},
	/**
	 * Returns if delete
	 */
	isActionDelete: function()
	{
		return this.action == "actionDelete";
	},
	/**
	 * Init api
	 */
	init: function()
	{
		this.fields = new Runtime.Widget.Crud.FieldResult();
		this.rules = this.getRules();
		this.result.data.set("fields", this.fields);
	},
	/**
	 * Returns rules
	 */
	getRules: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * New item
	 */
	newItem: async function()
	{
		return null;
	},
	/**
	 * Find item
	 */
	findItem: async function(pk)
	{
		return null;
	},
	/**
	 * Set item
	 */
	setItemValue: function(key, value)
	{
	},
	/**
	 * Load item
	 */
	loadItem: async function(create_instance)
	{
		if (create_instance == undefined) create_instance = true;
		var pk = this.post_data.get("pk");
		if (pk != null && pk instanceof Runtime.Dict)
		{
			this.pk = pk;
			this.item = this.findItem(pk);
		}
		else
		{
			if (create_instance)
			{
				this.item = this.newItem();
			}
		}
		/* Check if item is exists */
		if (this.item == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound())
		}
	},
	/**
	 * Validate item
	 */
	validateItem: async function(data)
	{
		/* Call rules */
		var rules = this.getRules();
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = Runtime.rtl.attr(rules, i);
			data = await rule.validateItem(this, data);
		}
		/* Filter data */
		var new_data = data.intersect(this.getSaveFields());
		return Promise.resolve(new_data);
	},
	/**
	 * Load data
	 */
	loadData: async function()
	{
		var item = this.post_data.get("item");
		if (item == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Post data 'item' not found"))
		}
		if (!(item instanceof Runtime.Dict))
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Post data 'item' not found"))
		}
		/* Get data */
		this.data = await this.validateItem(item);
		/* Check fields error */
		this.fields.checkError();
	},
	/**
	 * Process data
	 */
	processData: async function()
	{
		var keys = this.getSaveFields();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = keys.get(i);
			if (!this.data.has(key))
			{
				continue;
			}
			var value = this.data.get(key);
			this.setItemValue(key, value);
		}
	},
	/**
	 * Before save
	 */
	onSaveBefore: async function()
	{
		var rules = this.getRules();
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = Runtime.rtl.attr(rules, i);
			await rule.onSaveBefore(this);
		}
		/* Check fields error */
		this.fields.checkError();
	},
	/**
	 * After save
	 */
	onSaveAfter: async function()
	{
		var rules = this.getRules();
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = Runtime.rtl.attr(rules, i);
			await rule.onSaveAfter(this);
		}
	},
	/**
	 * Save
	 */
	save: async function()
	{
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
		/* After save */
		await this.onSaveAfter();
	},
	/**
	 * Before delete
	 */
	onDeleteBefore: async function()
	{
		var rules = this.getRules();
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = Runtime.rtl.attr(rules, i);
			await rule.onDeleteBefore(this);
		}
		/* Check fields error */
		this.fields.checkError();
	},
	/**
	 * After delete
	 */
	onDeleteAfter: async function()
	{
		var rules = this.getRules();
		for (var i = 0; i < rules.count(); i++)
		{
			var rule = Runtime.rtl.attr(rules, i);
			await rule.onDeleteAfter(this);
		}
	},
	/**
	 * Remove
	 */
	remove: async function()
	{
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
		/* Success */
		this.success();
	},
	/**
	 * Action item
	 */
	actionItem: async function()
	{
		/* Load data */
		await this.loadItem();
		/* Build result */
		await this.buildResult();
		/* Success */
		this.success();
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		/* Load data */
		await this.loadItem();
		await this.loadData();
		/* Save item */
		await this.processData();
		await this.saveItem();
		/* Build result */
		await this.buildResult();
		/* Success */
		this.success();
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		/* Remove item */
		await this.loadItem();
		await this.removeItem();
		/* Build result */
		await this.buildResult();
	},
	_init: function()
	{
		Runtime.Web.BaseApi.prototype._init.call(this);
		this.item = null;
		this.pk = null;
		this.data = Runtime.Map.from({});
		this.fields = null;
		this.rules = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Widget.Crud.SaveApi, Runtime.Web.BaseApi);
Object.assign(Runtime.Widget.Crud.SaveApi,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.SaveApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseApi";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.SaveApi);
window["Runtime.Widget.Crud.SaveApi"] = Runtime.Widget.Crud.SaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.SaveApi;