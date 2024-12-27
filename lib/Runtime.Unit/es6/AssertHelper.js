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
if (typeof Runtime.Unit == 'undefined') Runtime.Unit = {};
Runtime.Unit.AssertHelper = function()
{
};
Object.assign(Runtime.Unit.AssertHelper.prototype,
{
});
Object.assign(Runtime.Unit.AssertHelper,
{
	/**
	 * Check equals of types
	 */
	equalValueType: function(value1, value2, message)
	{
		var type1 = Runtime.rtl.getType(value1);
		var type2 = Runtime.rtl.getType(value2);
		Runtime.rtl.assert(type1 == type2, message);
	},
	/**
	 * Check equals of values
	 */
	equalValue: function(value1, value2, message)
	{
		this.equalValueType(value1, value2, message);
		var value_type1 = Runtime.rtl.getType(value1);
		var value_type2 = Runtime.rtl.getType(value2);
		Runtime.rtl.assert(value_type1 == value_type2, message);
		if (Runtime.rtl.isScalarValue(value1))
		{
			Runtime.rtl.assert(value1 === value2, message);
			return ;
		}
		if (value_type1 == "collection")
		{
			this.equalCollection(value1, value2, message);
			return ;
		}
		if (value_type1 == "dict")
		{
			this.equalDict(value1, value2, message);
			return ;
		}
		Runtime.rtl.assert(false, message);
	},
	/**
	 * Check equals of two collections
	 */
	equalCollection: function(c1, c2, message)
	{
		if (c1.count() != c2.count())
		{
			Runtime.rtl.assert(false, message);
		}
		for (var i = 0; i < c1.count(); i++)
		{
			var value1 = c1.get(i);
			var value2 = c2.get(i);
			this.equalValue(value1, value2, message);
		}
	},
	/**
	 * Check equals of two dicts
	 */
	equalDict: function(d1, d2, message)
	{
		var d1_keys = d1.keys();
		var d2_keys = d2.keys();
		for (var i = 0; i < d1_keys.count(); i++)
		{
			var key1 = d1_keys.get(i);
			if (!d2.has(key1))
			{
				Runtime.rtl.assert(false, message);
			}
			var value1 = d1.get(key1);
			var value2 = d2.get(key1);
			this.equalValue(value1, value2, message);
		}
		for (var i = 0; i < d2_keys.count(); i++)
		{
			var key2 = d2_keys.get(i);
			if (!d1.has(key2))
			{
				Runtime.rtl.assert(false, message);
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Unit";
	},
	getClassName: function()
	{
		return "Runtime.Unit.AssertHelper";
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
Runtime.rtl.defClass(Runtime.Unit.AssertHelper);
window["Runtime.Unit.AssertHelper"] = Runtime.Unit.AssertHelper;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Unit.AssertHelper;