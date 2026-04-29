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
Runtime.Serializer.ObjectType = class extends Runtime.Serializer.MapType
{
	/**
	 * Create object
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super();
		this.params = params ? params : new Runtime.Map();
		if (!params) return;
		if (params.has("autocreate")) this.autocreate();
		if (params.has("create")) this.fn_create = params.get("create");
		if (params.has("class_name")) this.class_name = params.get("class_name");
		if (params.has("class_extends")) this.class_extends = params.get("class_extends");
		if (params.has("class_implements")) this.class_implements = params.get("implements");
		if (params.has("rules")) this.fn_rules = params.get("rules");
		if (params.has("serialize")) this.fn_serialize = params.get("serialize");
	}
	
	
	/**
	 * Set class name
	 */
	setClassName(class_name)
	{
		this.class_name = class_name;
	}
	
	
	/**
	 * Copy object
	 */
	copy()
	{
		let rules = this.constructor.newInstance();
		rules.fn_create = this.fn_create;
		rules.fn_rules = this.fn_rules;
		rules.fn_serialize = this.fn_serialize;
		rules.setup = this.setup;
		rules.items = this.items.map((items) => { return items.slice(); });
		rules.class_name = this.class_name;
		rules.class_extends = this.class_extends;
		rules.class_implements = this.class_implements;
		return rules;
	}
	
	
	/**
	 * Autocreate
	 */
	autocreate()
	{
		this.fn_rules = (rules, value) =>
		{
			rules.class_name = value.get("__class_name__");
		};
		this.fn_serialize = (item, value) =>
		{
			value.set("__class_name__", item.constructor.getClassName());
		};
	}
	
	
	/**
	 * Create object
	 */
	createObject(value, errors, prev)
	{
		if (this.class_name == "") return null;
		if (!Runtime.rtl.classExists(this.class_name))
		{
			errors.push("Class '" + String(this.class_name) + String("' does not exists"));
			return null;
		}
		if (this.class_extends != "" && !Runtime.rtl.isInstanceOf(this.class_name, this.class_extends))
		{
			errors.push("Class '" + String(this.class_name) + String("' does not extends '") + String(this.class_extends) + String("'"));
			return null;
		}
		if (this.class_implements != "" && !Runtime.rtl.isImplements(this.class_name, this.class_implements))
		{
			errors.push("Class '" + String(this.class_name) + String("' does not implements '") + String(this.class_implements) + String("'"));
			return null;
		}
		if (this.fn_create)
		{
			let fn_create = this.fn_create;
			return fn_create(prev, this, value);
		}
		return Runtime.rtl.newInstance(this.class_name, Runtime.Vector.create([value]));
	}
	
	
	/**
	 * Init rules
	 */
	initRules(value)
	{
		if (this.fn_rules)
		{
			let rules = this.fn_rules;
			rules(this, value);
		}
		return this;
	}
	
	
	/**
	 * Filter value
	 */
	filter(value, errors, old_value, prev)
	{
		if (old_value == undefined) old_value = null;
		if (prev == undefined) prev = null;
		if (value == null) return null;
		if (Runtime.rtl.isImplements(value, "Runtime.SerializeInterface")) return value;
		let new_value = old_value;
		if (!new_value || !(Runtime.rtl.isImplements(new_value, "Runtime.SerializeInterface")))
		{
			let rules = this.copy().initRules(value);
			new_value = rules.createObject(value, errors, prev);
		}
		if (!new_value) return null;
		let rules = this.constructor.newInstance(Runtime.Vector.create([this.params]));
		new_value.constructor.serialize(rules);
		rules.setup.apply(Runtime.Vector.create([new_value, rules]));
		rules.walk(value, errors, (field, new_item, item_errors, key) =>
		{
			if (!value.has(key)) return;
			let old_item = new_value ? Runtime.rtl.attr(new_value, key) : null;
			new_item = field.filter(new_item, item_errors, old_item, new_value);
			if (key != "__class_name__")
			{
				Runtime.rtl.setAttr(new_value, key, new_item);
			}
		});
		return new_value;
	}
	
	
	/**
	 * Returns data
	 */
	encode(value)
	{
		if (value === null) return null;
		if (!(Runtime.rtl.isImplements(value, "Runtime.SerializeInterface"))) return null;
		let rules = new Runtime.Serializer.ObjectType(this.params);
		value.constructor.serialize(rules);
		rules.setup.apply(Runtime.Vector.create([value, rules]));
		let errors = Runtime.Vector.create([]);
		let new_value = rules.walk(value, errors, (field, new_item, item_errors) =>
		{
			return field.encode(new_item);
		});
		let serialize = this.fn_serialize;
		if (serialize) serialize(value, new_value);
		return new_value;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.fn_create = null;
		this.fn_rules = null;
		this.fn_serialize = null;
		this.setup = new Runtime.Chain();
		this.class_name = "";
		this.class_extends = "";
		this.class_implements = "";
		this.params = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Serializer.ObjectType"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Serializer.ObjectType"] = Runtime.Serializer.ObjectType;