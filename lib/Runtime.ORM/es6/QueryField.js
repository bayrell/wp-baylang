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
Runtime.ORM.QueryField = function(table_name, field_name, alias_name)
{
	if (table_name == undefined) table_name = "";
	if (field_name == undefined) field_name = "";
	if (alias_name == undefined) alias_name = "";
	table_name = Runtime.rs.trim(table_name);
	field_name = Runtime.rs.trim(field_name);
	table_name = Runtime.rs.trim(table_name);
	if (table_name && field_name)
	{
		var provider = Runtime.rtl.getContext().provider("Runtime.ORM.Provider");
		this.annotation = provider.getFieldType(table_name, field_name);
	}
	this.alias_name = alias_name;
	this.field_name = field_name;
	this.table_name = table_name;
};
Runtime.ORM.QueryField.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.QueryField.prototype.constructor = Runtime.ORM.QueryField;
Object.assign(Runtime.ORM.QueryField.prototype,
{
	/**
	 * Returns row column name
	 */
	getRowColumnName: function()
	{
		if (this.alias_name != "")
		{
			return this.alias_name;
		}
		return this.field_name;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.annotation = null;
		this.table_name = "";
		this.field_name = "";
		this.alias_name = "";
	},
});
Object.assign(Runtime.ORM.QueryField, Runtime.BaseObject);
Object.assign(Runtime.ORM.QueryField,
{
	/**
	 * Create from string
	 */
	fromString: function(s)
	{
		var res1 = Runtime.rs.split(" as ", s);
		var res2 = Runtime.rs.split(".", Runtime.rtl.attr(res1, 0));
		var alias_name = (res1.count() > 1) ? (res1.get(1)) : ("");
		var field_name = (res2.count() == 0) ? (res2.get(0)) : (res2.get(1));
		var table_name = (res2.count() > 1) ? (res2.get(0)) : ("");
		return new Runtime.ORM.QueryField(table_name, field_name, alias_name);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.QueryField";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.ORM.QueryField);
window["Runtime.ORM.QueryField"] = Runtime.ORM.QueryField;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.QueryField;