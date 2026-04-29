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
Runtime.ORM.QueryField = class extends Runtime.BaseObject
{
	/**
	 * Returns row column name
	 */
	getRowColumnName()
	{
		if (this.alias_name != "") return this.alias_name;
		return this.field_name;
	}
	
	
	/**
	 * Create from field name
	 */
	constructor(table_name, field_name, alias_name)
	{
		if (table_name == undefined) table_name = "";
		if (field_name == undefined) field_name = "";
		if (alias_name == undefined) alias_name = "";
		super();
		table_name = Runtime.rs.trim(table_name);
		field_name = Runtime.rs.trim(field_name);
		table_name = Runtime.rs.trim(table_name);
		this.alias_name = alias_name;
		this.field_name = field_name;
		this.table_name = table_name;
	}
	
	
	/**
	 * Create from string
	 */
	static fromString(s)
	{
		let res1 = Runtime.rs.split(" as ", s);
		let res2 = Runtime.rs.split(".", res1[0]);
		let alias_name = res1.count() > 1 ? res1.get(1) : "";
		let field_name = res2.count() == 1 ? res2.get(0) : res2.get(1);
		let table_name = res2.count() > 1 ? res2.get(0) : "";
		return new Runtime.ORM.QueryField(table_name, field_name, alias_name);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.annotation = null;
		this.table_name = "";
		this.field_name = "";
		this.alias_name = "";
	}
	static getClassName(){ return "Runtime.ORM.QueryField"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.QueryField"] = Runtime.ORM.QueryField;