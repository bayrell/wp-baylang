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
if (typeof Runtime.Serializer == 'undefined') Runtime.Serializer = {};
Runtime.Serializer.TypeError = class extends Runtime.BaseObject
{
	/**
	 * Create type error
	 */
	constructor(message, key)
	{
		if (key == undefined) key = "";
		super();
		this.message = message;
		if (key) this.path = Runtime.Vector.create([key]);
	}
	
	
	/**
	 * Returns error message
	 */
	getMessage()
	{
		let path = this.path.slice().reverse();
		let field_name = path.first();
		if (path.count() > 1) field_name += "[" + String(Runtime.rs.join("][", path)) + String("]");
		return field_name + String(": ") + String(this.message);
	}
	
	
	/**
	 * Returns messages;
	 */
	static getMessages(errors){ return errors.map((error) => { return error.getMessage(); }); }
	
	
	/**
	 * Returns field name
	 */
	getFieldName(){ return Runtime.rs.join(".", this.path.slice().reverse()); }
	
	
	/**
	 * Add key to field name
	 */
	addKey(key)
	{
		this.path.push(key);
		return this;
	}
	
	
	/**
	 * Set message
	 */
	setMessage(message)
	{
		this.message = message;
		return this;
	}
	
	
	/**
	 * Convert errors to Map
	 */
	static getMap(errors)
	{
		let result = new Runtime.Map();
		for (let i = 0; i < errors.count(); i++)
		{
			let item = errors.get(i);
			let key = item.getFieldName();
			if (!result.has(key)) result.set(key, Runtime.Vector.create([]));
			let arr = result.get(key);
			arr.push(item.message);
		}
		return result;
	}
	
	
	/**
	 * Add field to errors
	 */
	static addFieldErrors(errors, key)
	{
		for (let i = 0; i < errors.count(); i++)
		{
			let item = errors.get(i);
			if (Runtime.rtl.isString(item))
			{
				item = new Runtime.Serializer.TypeError(item);
				errors.set(i, item);
			}
			item.addKey(key);
		}
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.path = Runtime.Vector.create([]);
		this.message = "";
	}
	static getClassName(){ return "Runtime.Serializer.TypeError"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Serializer.TypeError"] = Runtime.Serializer.TypeError;