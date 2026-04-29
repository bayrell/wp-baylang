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
Runtime.ORM.Annotations.DateTimeType = class extends Runtime.ORM.Annotations.BaseType
{
	/**
	 * Returns rule
	 */
	getRule(){ return new Runtime.Serializer.DateTimeType(); }
	
	
	/**
	 * Prepare data before save
	 */
	prepare(item, is_update)
	{
		if (!is_update && this.autocreate)
		{
			if (!item.has(this.name)) item.set(this.name, Runtime.DateTime.now());
		}
		if (this.autoupdate)
		{
			item.set(this.name, Runtime.DateTime.now());
		}
		return item;
	}
	
	
	/**
	 * Process item from database
	 */
	async fromDatabase(conn, item)
	{
		if (!item.has(this.name)) return item;
		item = await conn.fromDatabase(this, item, this.name);
		let value = item.get(this.name);
		item.set(this.name, this.constructor.convertFromDatabase(value));
		return item;
	}
	
	
	/**
	 * Process item to database
	 */
	async toDatabase(conn, item)
	{
		let value = item.get(this.name);
		if (value == null) return item;
		item.set(this.name, this.constructor.convertToDatabase(value));
		item = await conn.toDatabase(this, item, this.name);
		return item;
	}
	
	
	/**
	 * Convert from db time
	 */
	static convertFromDatabase(value)
	{
		if (value == null) return null;
		return Runtime.DateTime.fromString(value);
	}
	
	
	/**
	 * Convert to db time
	 */
	static convertToDatabase(value)
	{
		if (!(value instanceof Runtime.DateTime)) return null;
		return value.setOffset(0).format();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.tz = "UTC";
		this.autocreate = false;
		this.autoupdate = false;
	}
	static getClassName(){ return "Runtime.ORM.Annotations.DateTimeType"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.ORM.Annotations.DateTimeType"] = Runtime.ORM.Annotations.DateTimeType;