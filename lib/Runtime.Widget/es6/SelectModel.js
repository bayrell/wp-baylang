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
Runtime.Widget.SelectModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("options", new Runtime.Serializer.VectorType(new Runtime.Serializer.MapType(Runtime.Map.create({
			"key": new Runtime.Serializer.StringType(),
			"value": new Runtime.Serializer.StringType(),
		}))));
	}
	
	
	/**
	 * Set options
	 */
	setOptions(options)
	{
		this.options = options;
	}
	
	
	/**
	 * Add option
	 */
	addOption(option)
	{
		this.options.push(option);
	}
	
	
	/**
	 * Returns options
	 */
	getOptions(){ return this.options; }
	
	
	/**
	 * Returns value
	 */
	getValue(id)
	{
		let option = this.options.find((item) => { return item.get("key") == id; });
		return option ? option.get("value") : "";
	}
	
	
	/**
	 * Load data
	 */
	async loadData(container)
	{
		await super.loadData(container);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.options = Runtime.Vector.create([]);
	}
	static getClassName(){ return "Runtime.Widget.SelectModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.SelectModel"] = Runtime.Widget.SelectModel;