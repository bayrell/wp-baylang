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
Runtime.Entity.Hook = function(name, params)
{
	if (params == undefined) params = null;
	Runtime.Entity.Entity.call(this, Runtime.Map.from({"name":name,"params":params}));
};
Runtime.Entity.Hook.prototype = Object.create(Runtime.Entity.Entity.prototype);
Runtime.Entity.Hook.prototype.constructor = Runtime.Entity.Hook;
Object.assign(Runtime.Entity.Hook.prototype,
{
	/**
	 * Create hook instance
	 */
	createHook: function()
	{
		return Runtime.rtl.newInstance(this.name, Runtime.Vector.from([this.params]));
	},
	_init: function()
	{
		Runtime.Entity.Entity.prototype._init.call(this);
		this.params = null;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "params")return this.params;
		return Runtime.Entity.Entity.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Entity.Hook, Runtime.Entity.Entity);
Object.assign(Runtime.Entity.Hook,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Entity";
	},
	getClassName: function()
	{
		return "Runtime.Entity.Hook";
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
Runtime.rtl.defClass(Runtime.Entity.Hook);
window["Runtime.Entity.Hook"] = Runtime.Entity.Hook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Entity.Hook;