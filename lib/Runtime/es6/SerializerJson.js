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
Runtime.SerializerJson = function()
{
	Runtime.SerializerNative.apply(this, arguments);
};
Runtime.SerializerJson.prototype = Object.create(Runtime.SerializerNative.prototype);
Runtime.SerializerJson.prototype.constructor = Runtime.SerializerJson;
Object.assign(Runtime.SerializerJson.prototype,
{
	/**
	 * Export object to data
	 */
	encode: function(object)
	{
		this.setFlag(this.constructor.ENCODE);
		value = this.encodeItem(object);
		return JSON.stringify(value, (key, value) => {
			return value;
		});
	},
	/**
	 * Import from string
	 */
	decode: function(s)
	{
		this.setFlag(this.constructor.DECODE);
		try{
			var res = null;
			try
			{
				res = JSON.parse(s, (key, value) => {
					if (value == null) return value;
					var object = this.decodeItem(value);
					return object;
				});
			}
			catch (e)
			{
				if (e instanceof SyntaxError)
				{
					res = null;
				}
				else
				{
					throw e;
				}
			}
			return res;
		}
		catch(e)
		{
			throw e;
		}
		return null;
	},
});
Object.assign(Runtime.SerializerJson, Runtime.SerializerNative);
Object.assign(Runtime.SerializerJson,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializerJson";
	},
	getParentClassName: function()
	{
		return "Runtime.SerializerNative";
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
Runtime.rtl.defClass(Runtime.SerializerJson);
window["Runtime.SerializerJson"] = Runtime.SerializerJson;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializerJson;