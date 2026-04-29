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
Runtime.BaseModel = class extends Runtime.BaseObject
{
	/**
	 * Create model
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super();
		/* Setup widget params */
		this.initParams(params);
		/* Init widget settings */
		this.initWidget(params);
		/* Add component */
		if (this.layout != null && this.component != "")
		{
			this.layout.addComponent(this.component);
		}
	}
	
	
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		if (!params) return;
		this.parent_widget = params.get("parent_widget");
		if (params.has("layout")) this.layout = params.get("layout");
		else this.layout = this.parent_widget ? this.parent_widget.layout : null;
		/* Autoload */
		if (params.has("autoload")) this.autoload = params.get("autoload");
		/* Register events */
		if (params.has("events"))
		{
			let events = params.get("events");
			for (let name of events.keys())
			{
				this.listener.add(name, events.get(name));
			}
		}
		/* Setup params */
		this.component = params.has("component") ? params.get("component") : this.component;
	}
	
	
	/**
	 * Init widget settings
	 */
	initWidget(params)
	{
	}
	
	
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("component", new Runtime.Serializer.StringType());
	}
	
	
	/**
	 * Load widget data
	 */
	async loadData(container)
	{
		let rules = new Runtime.Serializer.ObjectType();
		this.constructor.serialize(rules);
		for (let key of rules.items.keys())
		{
			let item = rules.items.get(key).find((item) => { return item instanceof Runtime.Serializer.ObjectType; });
			if (!(item instanceof Runtime.Serializer.ObjectType)) continue;
			let obj = Runtime.rtl.attr(this, key);
			if (!(obj instanceof Runtime.BaseModel)) continue;
			if (!obj.autoload) continue;
			await obj.loadData(container);
		}
	}
	
	
	/**
	 * Build page title
	 */
	buildTitle(container)
	{
	}
	
	
	/**
	 * Create widget
	 */
	createWidget(class_name, params)
	{
		if (params == undefined) params = null;
		if (params == null) params = new Runtime.Map();
		if (!params.has("parent_widget")) params.set("parent_widget", this);
		let widget = Runtime.rtl.newInstance(class_name, Runtime.Vector.create([params]));
		return widget;
	}
	
	
	/**
	 * Set field
	 */
	filter(field_name, item)
	{
		let rules = new Runtime.Serializer.ObjectType();
		this.constructor.serialize(rules);
		let field_rule = rules.items.get(field_name).get(0);
		if (!field_rule) return;
		let errors = Runtime.Vector.create([]);
		return field_rule.filter(item, errors);
	}
	
	
	/**
	 * Add event listener
	 */
	addEventListener(event_name, f, priority)
	{
		if (priority == undefined) priority = 100;
		this.listener.add(event_name, f, priority);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.autoload = false;
		this.layout = null;
		this.parent_widget = null;
		this.listener = new Runtime.Listener(this);
		this.component = "";
	}
	static getClassName(){ return "Runtime.BaseModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.BaseModel"] = Runtime.BaseModel;