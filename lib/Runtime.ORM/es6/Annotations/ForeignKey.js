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
Runtime.ORM.Annotations.ForeignKey = class extends Runtime.BaseObject
{
	/**
	 * Build search query
	 */
	async buildSearchQuery(kind, conn, q){ return q; }
	
	
	/**
	 * Build query for resolve foreign key
	 */
	async resolveQuery(conn, items)
	{
		let ids = items.map((item) => { return item.get(this.foreign_key); }).removeDuplicates();
		let q = new select(this.table_name).where(this.table_name + String(".") + String(this.primary_key), "=", ids);
		/* Filter */
		q = await this.buildSearchQuery("resolve", conn, q);
		return q;
	}
	
	
	/**
	 * Resolve foreign key
	 */
	async resolve(conn, items)
	{
		let q = await this.constructor.resolveQuery(conn, items);
		let result = await conn.fetchAll(q);
		return result;
	}
	
	
	/**
	 * Build query for reverse resolve foreign key
	 */
	async resolveReverseQuery(conn, items)
	{
		let ids = items.map((item) => { return item.get(this.primary_key); }).removeDuplicates();
		let q = new select(this.table_name_source).where(this.table_name_source + String(".") + String(this.foreign_key), "=", ids);
		/* Filter */
		q = await this.buildSearchQuery("resolveReverse", conn, q);
		return q;
	}
	
	
	/**
	 * Reverse resolve foreign key
	 */
	async resolveReverse(conn, items)
	{
		let q = await this.constructor.resolveReverseQuery(conn, items);
		let result = await conn.fetchAll(q);
		return result;
	}
	
	
	/**
	 * Resolve all
	 */
	async resolveAll(conn)
	{
		let q = new select(this.table_name);
		/* Filter */
		q = await this.buildSearchQuery("resolveAll", conn, q);
		let result = await conn.fetchAll(q);
		return result;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.name = "";
		this.table_name = "";
		this.table_name_source = "";
		this.primary_key = null;
		this.foreign_key = null;
	}
	static getClassName(){ return "Runtime.ORM.Annotations.ForeignKey"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Annotations.ForeignKey"] = Runtime.ORM.Annotations.ForeignKey;