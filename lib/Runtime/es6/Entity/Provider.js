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
if (typeof Runtime.Entity == 'undefined') Runtime.Entity = {};
Runtime.Entity.Provider = function(name, value, params)
{
	if (value == undefined) value = null;
	if (params == undefined) params = null;
	if (value instanceof Runtime.Dict)
	{
		params = value;
		value = null;
	}
	if (value == null)
	{
		value = name;
	}
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":name,"value":value,"params":params}));
};
Runtime.Entity.Provider.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Entity.Provider.prototype.constructor = Runtime.Entity.Provider;
Object.assign(Runtime.Entity.Provider.prototype,
{
	/**
	 * Create provider
	 */
	createProvider: function()
	{
		var provider = null;
		var class_name = this.value;
		if (class_name == null)
		{
			class_name = this.name;
		}
		if (class_name instanceof Runtime.BaseProvider)
		{
			provider = class_name;
		}
		else if (Runtime.rtl.isString(class_name))
		{
			provider = Runtime.rtl.newInstance(class_name, Runtime.Vector.from([this.params]));
		}
		return provider;
	},
	_init: function()
	{
		Runtime.Entity.Entity.prototype._init.call(this);
		this.value = null;
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "value")return this.value;
		else if (k == "params")return this.params;
		return Runtime.Entity.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Provider, Runtime.Entity.Entity);
Object.assign(Runtime.Entity.Provider,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Provider";
	},
	getParentClassName: function()
	{
		return "Runtime.Entity.Entity";
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
		a.push("value");
		a.push("params");
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
Runtime.rtl.defClass(Runtime.Entity.Provider);
window["Runtime.Entity.Provider"] = Runtime.Entity.Provider;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Provider;