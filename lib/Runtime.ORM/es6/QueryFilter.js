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
Runtime.ORM.QueryFilter = function(key, op, value, alias)
{
	if (key == undefined) key = "";
	if (op == undefined) op = "";
	if (value == undefined) value = "";
	if (alias == undefined) alias = "";
	Runtime.BaseObject.call(this);
	this.key = key;
	this.op = op;
	this.value = value;
	this.alias = alias;
};
Runtime.ORM.QueryFilter.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.ORM.QueryFilter.prototype.constructor = Runtime.ORM.QueryFilter;
Object.assign(Runtime.ORM.QueryFilter.prototype,
{
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.key = "";
		this.op = "";
		this.value = "";
		this.alias = "";
	},
});
Object.assign(Runtime.ORM.QueryFilter, Runtime.BaseObject);
Object.assign(Runtime.ORM.QueryFilter,
{
	/**
	 * Validate operation
	 */
	validateOp: function(op)
	{
		if (op == "=")
		{
			return true;
		}
		if (op == ">")
		{
			return true;
		}
		if (op == ">=")
		{
			return true;
		}
		if (op == "<")
		{
			return true;
		}
		if (op == "<=")
		{
			return true;
		}
		if (op == "!=")
		{
			return true;
		}
		return false;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.QueryFilter";
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
Runtime.rtl.defClass(Runtime.ORM.QueryFilter);
window["Runtime.ORM.QueryFilter"] = Runtime.ORM.QueryFilter;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.QueryFilter;