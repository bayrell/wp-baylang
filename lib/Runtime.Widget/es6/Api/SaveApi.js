"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Widget.Api == 'undefined') Runtime.Widget.Api = {};
Runtime.Widget.Api.SaveApi = class extends Runtime.Web.BaseApi
{
	/**
	 * Returns record name
	 */
	static getRecordName(){ return ""; }
	
	
	/**
	 * Constructor
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super(params);
		/* Create relation */
		this.relation = new Runtime.ORM.Relation(this.constructor.getRecordName());
	}
	
	
	/**
	 * Returns true if create
	 */
	isCreate()
	{
		if (this.action != "save") return false;
		let pk = this.request.get("pk");
		return pk == null;
	}
	
	
	/**
	 * Returns true if update
	 */
	isUpdate()
	{
		return !this.isCreate() && this.action == "save";
	}
	
	
	/**
	 * Returns save rules
	 */
	rules(){ return Runtime.Vector.create([]); }
	
	
	/**
	 * Returns serialize rules for pk
	 */
	getPrimaryRules(){ return this.relation.getPrimaryRules(); }
	
	
	/**
	 * Returns serialize rules
	 */
	getItemRules(rules)
	{
	}
	
	
	/**
	 * Returns item fields
	 */
	getItemFields(action){ return Runtime.Vector.create([]); }
	
	
	/**
	 * Convert item
	 */
	convertItem(item){ return item; }
	
	
	/**
	 * Returns save fields
	 */
	getSaveFields(){ return null; }
	
	
	/**
	 * Filter primary key
	 */
	getPrimaryKey(pk)
	{
		let errors = Runtime.Vector.create([]);
		/* Get primary key rule */
		let rule = this.getPrimaryRules();
		if (!rule)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Primary rule not found"));
		}
		/* Filter primary key */
		pk = rule.filter(pk, errors, null);
		/* Check errors */
		if (errors.count() > 0)
		{
			Runtime.Serializer.TypeError.addFieldErrors(errors, "pk");
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.FieldException(Runtime.Map.create({
				"error": Runtime.Serializer.TypeError.getMap(errors),
			})));
		}
		/* Pk is null */
		if (!pk)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Primary key not found"));
		}
		return pk;
	}
	
	
	/**
	 * Set primary key
	 */
	setPrimaryKey(pk)
	{
		if (!(pk instanceof Runtime.Map))
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Primary key not found"));
		}
		this.primary_key = this.getPrimaryKey(pk);
	}
	
	
	/**
	 * Set foreign key
	 */
	setForeignKey(data)
	{
		this.foreign_key = data ? data : new Runtime.Map();
	}
	
	
	/**
	 * After setup data
	 */
	checkData(errors)
	{
	}
	
	
	/**
	 * Set data
	 */
	setData(data)
	{
		if (!(data instanceof Runtime.Map)) data = new Runtime.Map();
		this.original_data = data;
		this.update_data = new Runtime.Map();
		/* Get base type rule */
		let rule = new Runtime.Serializer.MapType();
		this.getItemRules(rule);
		if (!rule)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Base type not found"));
		}
		/* Filter */
		let errors = Runtime.Vector.create([]);
		this.update_data = rule.filter(data, errors, null);
		/* Rules */
		let rules = this.rules();
		for (let i = 0; i < rules.count(); i++)
		{
			let item = rules.get(i);
			this.update_data = item.filter(this.update_data, errors);
		}
		/* Check data */
		this.checkData(errors);
		/* Check error */
		if (errors.count() > 0)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.FieldException(Runtime.Map.create({
				"fields": Runtime.Serializer.TypeError.getMap(errors),
			})));
		}
	}
	
	
	/**
	 * Build query
	 */
	async buildQuery(q)
	{
	}
	
	
	/**
	 * Find item
	 */
	async findItem(pk)
	{
		if (pk == null) return;
		let filter = this.relation.getPrimaryFilter(pk);
		let q = this.relation.select().fields(this.getItemFields("search")).setFilter(filter).limit(1);
		await this.buildQuery(q);
		this.item = await this.relation.fetchRecord(q);
	}
	
	
	/**
	 * Create item
	 */
	createItem()
	{
		if (!this.relation)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(this.getRelationName(), "Relation"));
		}
		this.item = this.relation.createRecord();
	}
	
	
	/**
	 * Find or create item
	 */
	async findOrCreate()
	{
		await this.findItem(this.primary_key);
		if (!this.item && this.primary_key == null) this.createItem();
		if (!this.item) throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound());
	}
	
	
	/**
	 * Before save
	 */
	async onSaveBefore()
	{
		let rules = this.rules();
		for (let i = 0; i < rules.count(); i++)
		{
			let rule = rules.get(i);
			await rule.onSaveBefore(this);
		}
	}
	
	
	/**
	 * After save
	 */
	async onSaveAfter()
	{
		let rules = this.rules();
		for (let i = 0; i < rules.count(); i++)
		{
			let rule = rules.get(i);
			await rule.onSaveAfter(this);
		}
	}
	
	
	/**
	 * Before delete
	 */
	async onDeleteBefore()
	{
		let rules = this.rules();
		for (let i = 0; i < rules.count(); i++)
		{
			let rule = rules.get(i);
			await rule.onDeleteBefore(this);
		}
	}
	
	
	/**
	 * After delete
	 */
	async onDeleteAfter()
	{
		let rules = this.rules();
		for (let i = 0; i < rules.count(); i++)
		{
			let rule = rules.get(i);
			await rule.onDeleteAfter(this);
		}
	}
	
	
	/**
	 * Save item
	 */
	async save()
	{
		/* Set items */
		let save_fields = this.getSaveFields();
		let save_data = !save_fields ? this.update_data.copy() : this.update_data.intersect(save_fields);
		this.item.assign(save_data);
		/* Save before */
		await this.onSaveBefore();
		/* Save item */
		await this.item.save();
		/* Save after */
		await this.onSaveAfter();
	}
	
	
	/**
	 * Delete item
	 */
	async delete()
	{
		await this.onDeleteBefore();
		/* Delete item */
		await this.item.delete();
		await this.onDeleteAfter();
	}
	
	
	/**
	 * Set result
	 */
	setResult()
	{
		if (this.action == "save")
		{
			let item = this.item.getData();
			item = this.convertItem(item);
			this.result.data.set("item", item.intersect(this.getItemFields("convert")));
		}
	}
	
	
	/**
	 * Save form
	 */
	async actionSave()
	{
		this.setAction("save");
		/* Filter data */
		this.filterData();
		/* Set primary key */
		let pk = this.request.get("pk");
		if (pk) this.setPrimaryKey(pk);
		/* Set foreign key */
		this.setForeignKey(this.data.get("foreign_key"));
		/* Set data */
		let item = this.request.get("item");
		this.setData(item);
		/* Find item */
		await this.findOrCreate();
		/* Save item */
		await this.save();
		this.setResult();
		this.success();
	}
	
	
	/**
	 * Delete form
	 */
	async actionDelete()
	{
		this.setAction("delete");
		/* Filter data */
		this.filterData();
		/* Set primary key */
		let pk = this.request.get("pk");
		this.setPrimaryKey(pk);
		/* Set foreign key */
		this.setForeignKey(this.data.get("foreign_key"));
		/* Find item */
		await this.findOrCreate();
		/* Delete item */
		await this.delete();
		this.success();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.action = "";
		this.connection_name = "";
		this.connection = null;
		this.relation = null;
		this.item = null;
		this.original_data = new Runtime.Map();
		this.update_data = new Runtime.Map();
		this.primary_key = null;
		this.foreign_key = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Widget.Api.SaveApi"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Api.SaveApi"] = Runtime.Widget.Api.SaveApi;