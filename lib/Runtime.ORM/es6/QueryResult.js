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
Runtime.ORM.QueryResult = class extends Runtime.Vector
{
	/**
	 * Returns pages
	 */
	getPages(){ return this.q ? this.q.getPages(this.rows) : 0; }
	
	
	/**
	 * Returns page
	 */
	getPage(){ return this.q ? this.q.getPage() : 0; }
	
	
	/**
	 * Returns count
	 */
	getCount(){ return this.rows; }
	
	
	/**
	 * Returns limit
	 */
	getLimit(){ return this.q ? this.q._limit : 1; }
	
	
	/**
	 * Intersect
	 */
	intersect(fields){ return this.map((item) => { return item.intersect(fields); }); }
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.q = null;
		this.rows = 0;
	}
	static getClassName(){ return "Runtime.ORM.QueryResult"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.QueryResult"] = Runtime.ORM.QueryResult;