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
Runtime.Serializer.VectorType = class extends Runtime.BaseObject
{
	/**
	 * Create object
	 */
	constructor(fields)
	{
		super();
		if (Runtime.rtl.isImplements(fields, "Runtime.Serializer.BaseType")) this.fields = Runtime.Vector.create([fields]);
		else if (fields instanceof Runtime.Vector) this.fields = fields;
	}
	
	
	/**
	 * Walk item
	 */
	walk(value, errors, f)
	{
		let new_value = Runtime.Vector.create([]);
		for (let i = 0; i < value.count(); i++)
		{
			let item_errors = Runtime.Vector.create([]);
			let new_item = value.get(i);
			for (let j = 0; j < this.fields.count(); j++)
			{
				let field = this.fields.get(j);
				if (Runtime.rtl.isImplements(field, "Runtime.Serializer.BaseType"))
				{
					new_item = f(field, new_item, item_errors, i);
				}
			}
			new_value.push(new_item);
			Runtime.Serializer.TypeError.addFieldErrors(item_errors, i);
			errors.appendItems(item_errors);
		}
		return new_value;
	}
	
	
	/**
	 * Filter value
	 */
	filter(value, errors, old_value, prev)
	{
		if (old_value == undefined) old_value = null;
		if (prev == undefined) prev = null;
		if (value === null) return null;
		if (!(value instanceof Runtime.Vector)) return null;
		let new_value = this.walk(value, errors, (field, new_item, item_errors, i) =>
		{
			return field.filter(new_item, item_errors, old_value ? old_value.get(i) : null, prev);
		});
		return new_value;
	}
	
	
	/**
	 * Returns data
	 */
	encode(value)
	{
		if (value === null) return null;
		if (!(value instanceof Runtime.Vector)) return null;
		let errors = Runtime.Vector.create([]);
		let new_value = this.walk(value, errors, (field, new_item, item_errors, i) =>
		{
			return field.encode(new_item);
		});
		return new_value;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.fields = Runtime.Vector.create([]);
	}
	static getClassName(){ return "Runtime.Serializer.VectorType"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.Serializer.BaseType"]; }
};
window["Runtime.Serializer.VectorType"] = Runtime.Serializer.VectorType;