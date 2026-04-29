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
if (typeof Runtime.XML == 'undefined') Runtime.XML = {};
Runtime.XML.YamlConverter = class
{
	/**
	 * Constructor
	 */
	constructor(xml, variables)
	{
		if (variables == undefined) variables = null;
		this.xml = xml;
		this.variables = variables;
	}
	
	
	/**
	 * Patch variables
	 */
	patchVariables(data)
	{
		if (this.variables == null) return data;
		let variables_keys = this.variables.keys();
		for (let i = 0; i < variables_keys.count(); i++)
		{
			let var_name = variables_keys.get(i);
			let var_value = this.variables.get(var_name);
			data = Runtime.rs.replace(var_name, var_value, data);
		}
		return data;
	}
	
	
	/**
	 * Convert xml to dict
	 */
	xmlToDict(xml)
	{
		let res = new Runtime.Map();
		let items = xml.childs();
		for (let i = 0; i < items.count(); i++)
		{
			let item = items.get(i);
			let attrs = item.attributes();
			let key = item.getName();
			let value = item.value();
			key = this.patchVariables(key);
			let type = attrs.get("type");
			let trim = attrs.get("trim");
			let is_array = attrs.get("array") == "true";
			if (type == "int" || type == "integer")
			{
				value = Runtime.rtl.toInt(value);
			}
			else if (type == "bool" || type == "boolean")
			{
				value = Runtime.rtl.toBool(value);
			}
			else if (type == "map")
			{
				value = new Runtime.Map();
			}
			else
			{
				value = this.patchVariables(value);
			}
			if (item.childs().count() > 0)
			{
				value = this.xmlToDict(item);
			}
			if (res.has(key) || is_array)
			{
				let exists_value = res.get(key);
				if (!(exists_value instanceof Runtime.Vector))
				{
					exists_value = new Runtime.Vector();
					if (res.has(key))
					{
						exists_value = exists_value.concat(res.get(key));
					}
				}
				exists_value.push(value);
				value = exists_value;
			}
			if (value instanceof Runtime.Dict)
			{
				value = value.toDict();
			}
			else if (value instanceof Runtime.Vector)
			{
				value = value.toCollection();
			}
			res.set(key, value);
		}
		return res;
	}
	
	
	/**
	 * Convert xml to dict
	 */
	toDict()
	{
		return this.xmlToDict(this.xml);
	}
	
	
	/**
	 * Convert XML to Yaml
	 */
	convert(params)
	{
		if (params == undefined) params = null;
		let yaml = "";
		let data = this.toDict(this.xml);
		if (params == null) params = new Runtime.Map();
		let indent_spaces = params.get("indent-spaces", 2);
		return yaml;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		this.xml = null;
		this.variables = null;
	}
	static getClassName(){ return "Runtime.XML.YamlConverter"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.XML.YamlConverter"] = Runtime.XML.YamlConverter;