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
Runtime.Widget.Crud.CrudService = function()
{
	Runtime.BaseObject.call(this);
	this.initRules();
};
Runtime.Widget.Crud.CrudService.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Crud.CrudService.prototype.constructor = Runtime.Widget.Crud.CrudService;
Object.assign(Runtime.Widget.Crud.CrudService.prototype,
{
	/**
	 * Returns true if create
	 */
	isCreate: function()
	{
		return this.is_create;
	},
	/**
	 * Returns true if update
	 */
	isUpdate: function()
	{
		return !this.is_create;
	},
	/**
	 * Returns true if search
	 */
	isSearch: function()
	{
		return this.search_params != null;
	},
	/**
	 * Set create
	 */
	setCreate: function(value)
	{
		this.is_create = value;
		this.rules.setCreate(value);
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
	 * Init rules
	 */
	initRules: function()
	{
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns primary key
	 */
	getPrimaryKey: function(item)
	{
		return null;
	},
	/**
	 * Set new item
	 */
	setItem: function(item, is_new)
	{
		if (is_new == undefined) is_new = false;
		this.item = item;
		this.pk = (item) ? (this.getPrimaryKey(this.item)) : (null);
		this.setCreate(is_new);
	},
	/**
	 * Set item
	 */
	setItemValue: function(item, key, value)
	{
		item.set(key, value);
	},
	/**
	 * Set item data
	 */
	setItemData: function(item, data)
	{
		if (!data)
		{
			return ;
		}
		var keys = this.getSaveFields();
		for (var i = 0; i < keys.count(); i++)
		{
			var key = keys.get(i);
			if (!data.has(key))
			{
				continue;
			}
			var value = data.get(key);
			this.setItemValue(item, key, value);
		}
	},
	/**
	 * Convert item
	 */
	convertItem: function(item, fields)
	{
		return item.intersect(fields);
	},
	/**
	 * Load item
	 */
	loadItem: async function(pk, create_instance)
	{
		if (create_instance == undefined) create_instance = false;
		if (pk != null && pk instanceof Runtime.Dict)
		{
			var item = await this.findItem(pk);
			this.setItem(item, false);
		}
		else
		{
			if (create_instance)
			{
				this.setItem(this.newItem(), true);
			}
		}
		/* Item not found */
		if (this.item == null)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound())
		}
	},
	/**
	 * Validate data
	 */
	validate: async function()
	{
		await this.rules.validate(this.data);
	},
	/**
	 * Before search
	 */
	onSearchBefore: async function()
	{
		await this.rules.onSearchBefore(this);
	},
	/**
	 * After search
	 */
	onSearchAfter: async function()
	{
		await this.rules.onSearchAfter(this);
	},
	/**
	 * Load items
	 */
	loadItems: async function()
	{
		this.items = Runtime.Vector.from([]);
		this.page = 0;
		this.pages = 0;
		this.limit = 0;
	},
	/**
	 * Search items
	 */
	search: async function(params)
	{
		/* Set search params */
		this.search_params = params;
		/* Before search */
		await this.onSearchBefore();
		/* Load items */
		await this.loadItems();
		/* After search */
		await this.onSearchAfter();
	},
	/**
	 * Search item
	 */
	searchItem: async function(pk)
	{
		/* Before search */
		await this.onSearchBefore();
		/* Load item */
		await this.loadItem(pk, false);
		/* After search */
		await this.onSearchAfter();
	},
	/**
	 * Before save
	 */
	onSaveBefore: async function()
	{
		await this.rules.onSaveBefore(this);
	},
	/**
	 * After save
	 */
	onSaveAfter: async function()
	{
		await this.rules.onSaveAfter(this);
	},
	/**
	 * Save item
	 */
	saveItem: async function()
	{
	},
	/**
	 * Save
	 */
	save: async function(data)
	{
		if (data == null || !(data instanceof Runtime.Dict))
		{
			data = Runtime.Map.from({});
		}
		/* Validate item */
		this.data = data.copy();
		await this.validate();
		if (!this.rules.correct())
		{
			return Promise.resolve(false);
		}
		/* Before save */
		await this.onSaveBefore();
		if (!this.rules.correct())
		{
			return Promise.resolve();
		}
		/* Set item data */
		this.setItemData(this.item, this.data);
		/* Save item */
		await this.saveItem();
		/* After save */
		await this.onSaveAfter();
		return Promise.resolve(true);
	},
	/**
	 * Before delete
	 */
	onDeleteBefore: async function()
	{
		await this.rules.onDeleteBefore(this);
	},
	/**
	 * After delete
	 */
	onDeleteAfter: async function()
	{
		await this.rules.onDeleteAfter(this);
	},
	/**
	 * Delete item
	 */
	deleteItem: async function()
	{
	},
	/**
	 * Delete
	 */
	delete: async function()
	{
		/* Before delete */
		await this.onDeleteBefore();
		/* Delete item */
		await this.deleteItem();
		/* After delete */
		await this.onDeleteAfter();
		return Promise.resolve(true);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.rules = new Runtime.Widget.Crud.RulesManager();
		this.pk = null;
		this.item = null;
		this.is_create = false;
		this.search_params = null;
		this.items = null;
		this.page = 0;
		this.pages = 0;
		this.limit = 0;
	},
});
Object.assign(Runtime.Widget.Crud.CrudService, Runtime.BaseObject);
Object.assign(Runtime.Widget.Crud.CrudService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.CrudService";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.CrudService);
window["Runtime.Widget.Crud.CrudService"] = Runtime.Widget.Crud.CrudService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.CrudService;