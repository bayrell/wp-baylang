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
Runtime.Callback = function(obj, name, tag)
{
	if (tag == undefined) tag = null;
	/* Init object */
	this._init();
	/* Set variables */
	this.obj = obj;
	this.name = name;
	this.tag = tag;
};
Object.assign(Runtime.Callback.prototype,
{
	/**
	 * Check if method exists
	 */
	exists: function()
	{
		if (!Runtime.rtl.method_exists(this.obj, this.name))
		{
			return false;
		}
		return true;
	},
	/**
	 * Check callback
	 */
	check: function()
	{
		if (!this.exists())
		{
			throw new Runtime.Exceptions.RuntimeException("Method '" + Runtime.rtl.toStr(this.name) + Runtime.rtl.toStr("' not found in ") + Runtime.rtl.toStr(Runtime.rtl.get_class_name(this.obj)))
		}
	},
	/**
	 * Apply
	 */
	apply: function(args)
	{
		if (args == undefined) args = null;
		this.check();
		if (args == null) args = [];
		else args = Array.prototype.slice.call(args);
		
		var obj = this.obj;
		if (typeof obj == "string") obj = Runtime.rtl.find_class(obj);
		return obj[this.name].bind(obj).apply(null, args);
	},
	_init: function()
	{
		this.obj = null;
		this.name = null;
		this.tag = null;
	},
});
Object.assign(Runtime.Callback,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Callback";
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
Runtime.rtl.defClass(Runtime.Callback);
window["Runtime.Callback"] = Runtime.Callback;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Callback;