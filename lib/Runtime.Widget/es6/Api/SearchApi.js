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
Runtime.Widget.Api.SearchApi = class extends Runtime.Web.BaseApi
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
		this.relation = new Runtime.ORM.Relation(this.constructor.getRecordName());
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
	 * Returns item fields
	 */
	getItemFields(action){ return Runtime.Vector.create([]); }
	
	
	/**
	 * Convert item
	 */
	convertItem(item){ return item; }
	
	
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
			TypeError.addFieldErrors(errors, "pk");
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.FieldException(TypeError.getMap(errors)));
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
	setForeignKey(foreign_key)
	{
		this.foreign_key = foreign_key ? foreign_key : new Runtime.Map();
	}
	
	
	/**
	 * Returns max limit
	 */
	getMaxLimit(){ return 100; }
	
	
	/**
	 * Returns limit
	 */
	getLimit()
	{
		let limit = Runtime.rtl.toInt(this.data.get("limit", 10));
		if (!Runtime.rtl.isInteger(limit) || limit < 0) limit = 0;
		let max_limit = this.getMaxLimit();
		if (limit > max_limit && max_limit >= 0) limit = max_limit;
		return limit;
	}
	
	
	/**
	 * Returns page
	 */
	getPage()
	{
		let page = Runtime.rtl.toInt(this.data.get("page", 0));
		if (!Runtime.rtl.isInteger(page)) page = 0;
		return page;
	}
	
	
	/**
	 * Build query
	 */
	async buildQuery(q)
	{
		if (this.isItem())
		{
			q.limit(1);
		}
	}
	
	
	/**
	 * Before search
	 */
	async onSearchBefore()
	{
		let rules = this.rules();
		for (let i = 0; i < rules.count(); i++)
		{
			let rule = rules.get(i);
			await rule.onSearchBefore(this);
		}
	}
	
	
	/**
	 * After search
	 */
	async onSearchAfter()
	{
		let rules = this.rules();
		for (let i = 0; i < rules.count(); i++)
		{
			let rule = rules.get(i);
			await rule.onSearchAfter(this);
		}
	}
	
	
	/**
	 * Search items
	 */
	async search()
	{
		/* Create query */
		let q = this.relation.select();
		q.limit(this.getLimit());
		q.page(this.getPage());
		q.calcFoundRows();
		/* Build fields */
		let fields = this.getItemFields("search").map((field) =>
		{
			if (Runtime.rtl.isString(field))
			{
				field = Runtime.ORM.QueryField.fromString(field);
				if (field.table_name == "")
				{
					field.table_name = q._table_name;
				}
			}
			return field;
		});
		q.fields(fields);
		/* Build query */
		await this.buildQuery(q);
		/* Search before */
		await this.onSearchBefore();
		/* Search */
		this.items = await this.relation.fetchAll(q);
		/* Search after */
		await this.onSearchAfter();
	}
	
	
	/**
	 * Set result
	 */
	setResult()
	{
		if (this.isSearch() && this.items)
		{
			this.result.data.set("items", this.items.map((data) =>
			{
				data = this.convertItem(data);
				return data.intersect(this.getItemFields("convert"));
			}));
			this.result.data.set("count", this.items.getCount());
			this.result.data.set("limit", this.items.getLimit());
			this.result.data.set("page", this.items.getPage());
			this.result.data.set("pages", this.items.getPages());
		}
		else if (this.isItem() && this.items)
		{
			let data = this.items.get(0);
			if (!data)
			{
				throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound("Item"));
			}
			data = this.convertItem(data);
			data = data.intersect(this.getItemFields("convert"));
			this.result.data.set("item", data);
		}
	}
	
	
	/**
	 * Returns data rules
	 */
	getDataRules(rules)
	{
		if (this.action == "search")
		{
			rules.addType("page", new Runtime.Serializer.IntegerType(Runtime.Map.create({"default": 0})));
			rules.addType("limit", new Runtime.Serializer.IntegerType(Runtime.Map.create({"default": 10})));
		}
	}
	
	
	/**
	 * Returns action
	 */
	isItem(){ return this.action == "item"; }
	
	
	isSearch(){ return this.action == "search"; }
	
	
	/**
	 * Action search
	 */
	async actionSearch()
	{
		this.setAction("search");
		/* Filter data */
		this.filterData();
		/* Set foreign key */
		this.setForeignKey(this.data.get("foreign_key"));
		/* Search */
		await this.search();
		this.setResult();
		this.success();
	}
	
	
	/**
	 * Action item
	 */
	async actionItem()
	{
		this.setAction("item");
		/* Filter data */
		this.filterData();
		/* Set foreign key */
		this.setForeignKey(this.data.get("foreign_key"));
		/* Search */
		await this.search();
		this.setResult();
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
		this.items = null;
		this.primary_key = null;
		this.foreign_key = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Widget.Api.SearchApi"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Api.SearchApi"] = Runtime.Widget.Api.SearchApi;