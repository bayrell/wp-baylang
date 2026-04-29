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
Runtime.ORM.Record = class extends Runtime.BaseObject
{
	/**
	 * Create new Record
	 */
	constructor(data, relation)
	{
		if (data == undefined) data = null;
		if (relation == undefined) relation = null;
		super();
		/* Setup relation */
		this.setRelation(relation);
		/* Init data */
		this._initData(data);
	}
	
	
	/**
	 * Returns relation
	 */
	relation(){ return this._relation; }
	
	
	/**
	 * Set new relation
	 */
	setRelation(relation)
	{
		this._relation = relation;
		if (this._relation == null)
		{
			this._relation = new Runtime.ORM.Relation(this.constructor.getClassName());
		}
	}
	
	
	/**
	 * Convert to Dict
	 */
	all(){ return this._new_data.copy(); }
	
	
	old(){ return this._old_data.copy(); }
	
	
	getData(){ return this._new_data.copy(); }
	
	
	intersect(fields){ if (fields == undefined) fields = null;return this._new_data.intersect(fields); }
	
	
	/**
	 * Returns primary key
	 */
	getPrimaryKey()
	{
		return this.relation.getPrimaryKey(this._new_data);
	}
	
	
	/**
	 * Returns true if name is exists
	 */
	has(name){ return this._new_data.has(name); }
	
	
	/**
	 * Returns value
	 */
	get(name, def_value){ if (def_value == undefined) def_value = null;return this._new_data.get(name, def_value); }
	
	
	/**
	 * Set new value
	 */
	set(name, value)
	{
		this._new_data.set(name, value);
	}
	
	
	/**
	 * Assign data
	 */
	assign(data)
	{
		let keys = Runtime.rtl.list(data.keys());
		for (let i = 0; i < keys.count(); i++)
		{
			let key = keys.get(i);
			this.set(key, data.get(key));
		}
	}
	
	
	setData(item){ return this.assign(item); }
	
	
	/**
	 * Get updated data
	 */
	getUpdatedData()
	{
		if (this._new_data == null) return new Runtime.Map();
		let res = new Runtime.Map();
		let new_data_keys = Runtime.rtl.list(this._new_data.keys());
		for (let i = 0; i < new_data_keys.count(); i++)
		{
			let field_name = new_data_keys[i];
			let new_value = this._new_data.get(field_name);
			if (this._old_data == null)
			{
				res.set(field_name, new_value);
			}
			else
			{
				if (!this._old_data.has(field_name))
				{
					res.set(field_name, new_value);
				}
				else
				{
					let old_value = this._old_data.get(field_name);
					if (new_value != old_value)
					{
						res.set(field_name, new_value);
					}
				}
			}
		}
		return res;
	}
	
	
	/**
	 * Init data
	 */
	_initData(data)
	{
		if (data == undefined) data = null;
		this._old_data = data != null ? data.copy() : null;
		this._new_data = data != null ? data.copy() : new Runtime.Map();
	}
	
	
	/**
	 * Returns true if object is new
	 */
	isNew()
	{
		return this._old_data ? false : true;
	}
	
	
	/**
	 * Returns true if data has loaded from database
	 */
	isUpdate()
	{
		return this._old_data ? true : false;
	}
	
	
	/**
	 * Returns true if model is changed
	 */
	isChanged()
	{
		let d1 = this._old_data;
		let d2 = this._new_data;
		if (d1 == null) return true;
		if (d2 == null) return true;
		let d1_keys = d1.keys();
		let d2_keys = d2.keys();
		for (let i = 0; i < d1_keys.count(); i++)
		{
			let key1 = d1_keys.get(i);
			if (!d2.has(key1))
			{
				return true;
			}
			let value1 = d1.get(key1);
			let value2 = d2.get(key1);
			if (value1 != value2)
			{
				return true;
			}
		}
		for (let i = 0; i < d2_keys.count(); i++)
		{
			let key2 = d2_keys.get(i);
			if (!d1.has(key2))
			{
				return true;
			}
		}
		return false;
	}
	
	
	/**
	 * Save object
	 */
	async save(params)
	{
		if (params == undefined) params = null;
		await this._relation.save(this, params);
	}
	
	
	/**
	 * Delete object
	 */
	async delete(params)
	{
		if (params == undefined) params = null;
		await this._relation.delete(this, params);
	}
	
	
	/**
	 * Refresh object
	 */
	async refresh(params)
	{
		if (params == undefined) params = null;
		await this._relation.refresh(this, params);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this._old_data = null;
		this._new_data = new Runtime.Map();
		this._relation = null;
	}
	static getClassName(){ return "Runtime.ORM.Record"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Record"] = Runtime.ORM.Record;