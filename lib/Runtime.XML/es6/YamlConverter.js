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
Runtime.XML.YamlConverter = function(xml, variables)
{
	if (variables == undefined) variables = null;
	this.xml = xml;
	this.variables = variables;
};
Object.assign(Runtime.XML.YamlConverter.prototype,
{
	/**
	 * Patch variables
	 */
	patchVariables: function(data)
	{
		if (this.variables == null)
		{
			return data;
		}
		var variables_keys = this.variables.keys();
		for (var i = 0; i < variables_keys.count(); i++)
		{
			var var_name = variables_keys.get(i);
			var var_value = this.variables.get(var_name);
			data = Runtime.rs.replace(var_name, var_value, data);
		}
		return data;
	},
	/**
	 * Convert xml to dict
	 */
	xmlToDict: function(xml)
	{
		var res = new Runtime.Map();
		var items = xml.childs();
		for (var i = 0; i < items.count(); i++)
		{
			var item = items.get(i);
			var attrs = item.attributes();
			var key = item.getName();
			var value = item.value();
			key = this.patchVariables(key);
			var type = attrs.get("type");
			var trim = attrs.get("trim");
			var is_array = attrs.get("array") == "true";
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
				var exists_value = res.get(key);
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
	},
	/**
	 * Convert xml to dict
	 */
	toDict: function()
	{
		return this.xmlToDict(this.xml);
	},
	/**
	 * Convert XML to Yaml
	 */
	convert: function(params)
	{
		if (params == undefined) params = null;
		var yaml = "";
		var data = this.toDict(this.xml);
		if (params == null)
		{
			params = Runtime.Map.from({});
		}
		var indent_spaces = params.get("indent-spaces", 2);
		return yaml;
	},
	_init: function()
	{
		this.xml = null;
		this.variables = null;
	},
});
Object.assign(Runtime.XML.YamlConverter,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.XML";
	},
	getClassName: function()
	{
		return "Runtime.XML.YamlConverter";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.XML.YamlConverter);
window["Runtime.XML.YamlConverter"] = Runtime.XML.YamlConverter;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.XML.YamlConverter;