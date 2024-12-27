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
Runtime.HashMap = function()
{
	this._map = new Map();
};
Object.assign(Runtime.HashMap.prototype,
{
	/**
	 * Set value size_to position
	 * @param Key key - position
	 * @param Value value 
	 * @return self
	 */
	set: function(key, value)
	{
		this._map.set(key, value);
		return this;
	},
	/**
	 * Returns value from position
	 * @param string key
	 * @return Value
	 */
	get: function(key)
	{
		return this._map.get(key);
		return this;
	},
	/**
	 * Return true if key exists
	 * @param string key
	 * @return bool var
	 */
	has: function(key)
	{
		return this._map.has(key);
	},
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	remove: function(key)
	{
		this._map.delete(key);
		return this;
	},
	_init: function()
	{
		this._map = null;
	},
});
Object.assign(Runtime.HashMap,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.HashMap";
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
Runtime.rtl.defClass(Runtime.HashMap);
window["Runtime.HashMap"] = Runtime.HashMap;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.HashMap;