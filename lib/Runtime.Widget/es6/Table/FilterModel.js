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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.FilterModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.setup.add((model, rules) =>
		{
			let params = new Runtime.Map();
			for (let field of model.fields)
			{
				let key = field.get("name");
				let field_type = field.get("type");
				if (field_type == "date") params.set(key, new Runtime.Serializer.DateTimeType());
				else if (field_type == "date_range") params.set(key, new Runtime.Serializer.ObjectType(Runtime.Map.create({"class_name": "Runtime.DateRange"})));
				else params.set(key, new Runtime.Serializer.StringType());
			}
			rules.addType("item", new Runtime.Serializer.MapType(params));
		});
	}
	
	
	/**
	 * Init params
	 */
	initParams(params)
	{
		super.initParams(params);
		/* Init loader */
		if (params.has("loader"))
		{
			this.loader = params.get("loader");
		}
		/* Init fields from params */
		if (params.has("fields"))
		{
			this.fields = params.get("fields");
		}
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		super.loadData(container);
		this.item = this.convert(container.layout.get("request").query, "item");
		this.loader.setApiParams(this.item);
	}
	
	
	/**
	 * Convert item
	 */
	convert(data, format)
	{
		let result = new Runtime.Map();
		for (let field of this.fields)
		{
			let key = field.get("name");
			if (!data.has(key)) continue;
			let value = data.get(key);
			let field_type = field.get("type");
			if (field_type == "date")
			{
				if (format == "item") value = Runtime.DateTime.create(value);
				else value = value ? value.getDate() : "";
			}
			else if (field_type == "date_range")
			{
				if (format == "item")
				{
					let arr = Runtime.rs.split(",", value);
					value = new Runtime.DateRange();
					if (arr.get(0)) value.start_date = Runtime.DateTime.create(arr.get(0));
					if (arr.count() > 1 && arr.get(1)) value.end_date = Runtime.DateTime.create(arr.get(1));
				}
				else
				{
					let arr = value ? Runtime.Vector.create([value.start_date, value.end_date]) : Runtime.Vector.create([]);
					value = Runtime.rs.join(",", arr.map((value) => { return value ? value.getDate() : ""; }));
				}
			}
			result.set(key, value);
		}
		return result;
	}
	
	
	/**
	 * Get value by field name
	 */
	getValue(name)
	{
		return this.item.has(name) ? this.item.get(name) : "";
	}
	
	
	/**
	 * Set value by field name
	 */
	setValue(name, value)
	{
		this.item.set(name, value);
	}
	
	
	/**
	 * Apply filter
	 */
	async applyFilter()
	{
		document.location = Runtime.rs.urlGetAdd(document.location, this.convert(this.item, "query"));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.Table.Filter";
		this.loader = null;
		this.fields = Runtime.Vector.create([]);
		this.item = new Runtime.Map();
	}
	static getClassName(){ return "Runtime.Widget.Table.FilterModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Table.FilterModel"] = Runtime.Widget.Table.FilterModel;