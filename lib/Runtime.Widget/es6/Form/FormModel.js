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
if (typeof Runtime.Widget.Form == 'undefined') Runtime.Widget.Form = {};
Runtime.Widget.Form.FormModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("pk", rules.params ? rules.params.get("primary_rules") : null);
		rules.addType("item", rules.params ? rules.params.get("item_rules") : null);
		rules.addType("result", new Runtime.Serializer.ObjectType(Runtime.Map.create({"class_name": "Runtime.Widget.ResultModel"})));
		rules.setup.add((model, rules) =>
		{
			model.primary_rules = rules.params ? rules.params.get("primary_rules") : null;
			model.item_rules = rules.params ? rules.params.get("item_rules") : null;
		});
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params.has("data_object")) this.data_object = params.get("data_object");
		if (params.has("fields")) this.fields = params.get("fields");
	}
	
	
	/**
	 * Init widget
	 */
	initWidget(params)
	{
		super.initWidget(params);
		this.field_errors = this.createWidget("Runtime.Widget.Form.FieldErrors", Runtime.Map.create({
			"error_name": "fields",
		}));
		this.result = this.createWidget("Runtime.Widget.ResultModel");
	}
	
	
	/**
	 * Set wait message
	 */
	setWaitMessage()
	{
		this.result.setWaitMessage();
	}
	
	
	/**
	 * Set api result
	 */
	setApiResult(result)
	{
		this.result.setApiResult(result);
		this.field_errors.setApiResult(result);
	}
	
	
	/**
	 * Returns result
	 */
	getResult(name)
	{
		return this.field_errors.get(name);
	}
	
	
	/**
	 * Set item value
	 */
	setValue(name, value)
	{
		this.item.set(name, value);
		this.listener.emit(new Runtime.Widget.Form.FormMessage(Runtime.Map.create({
			"name": "setValue",
			"key": name,
			"value": value,
		})));
	}
	
	
	/**
	 * Set primary key
	 */
	setPrimaryKey(item)
	{
		if (this.primary_rules)
		{
			let primary_key = this.primary_rules.keys();
			this.pk = this.primary_rules.filter(item.intersect(primary_key), Runtime.Vector.create([]));
		}
		else
		{
			this.pk = null;
		}
	}
	
	
	/**
	 * Set item
	 */
	setItem(item)
	{
		this.item = this.item_rules ? this.item_rules.filter(item, Runtime.Vector.create([])) : item;
	}
	
	
	/**
	 * Clear form
	 */
	clear()
	{
		this.pk = null;
		this.item = this.data_object ? Runtime.rtl.newInstance(this.data_object) : new Runtime.Map();
		this.field_errors.clear();
		this.result.clear();
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.Form.Form";
		this.data_object = "";
		this.pk = null;
		this.item = new Runtime.Map();
		this.fields = Runtime.Vector.create([]);
		this.field_errors = null;
		this.result = null;
		this.primary_rules = null;
		this.item_rules = null;
	}
	static getClassName(){ return "Runtime.Widget.Form.FormModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Form.FormModel"] = Runtime.Widget.Form.FormModel;