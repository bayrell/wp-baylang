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
Runtime.RawString = function(s)
{
	this.s = "";
	if (Runtime.rtl.isString(s))
	{
		this.s = s;
	}
};
Object.assign(Runtime.RawString.prototype,
{
	/**
	 * To string
	 */
	toString: function()
	{
		return this.s;
	},
	_init: function()
	{
		this.s = null;
	},
});
Object.assign(Runtime.RawString,
{
	/**
	 * Normalize array
	 */
	normalize: function(item)
	{
		if (Runtime.rtl.isString(item))
		{
			return item;
		}
		else if (item instanceof Runtime.RawString)
		{
			return item.s;
		}
		else if (item instanceof Runtime.Collection)
		{
			item = item.map((item) =>
			{
				return this.normalize(item);
			});
			return Runtime.rs.join("", item);
		}
		return "";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.RawString";
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
	__implements__:
	[
		Runtime.StringInterface,
	],
});
Runtime.rtl.defClass(Runtime.RawString);
window["Runtime.RawString"] = Runtime.RawString;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.RawString;