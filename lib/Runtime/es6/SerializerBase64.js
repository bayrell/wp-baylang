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
Runtime.SerializerBase64 = function()
{
	Runtime.SerializerJson.apply(this, arguments);
};
Runtime.SerializerBase64.prototype = Object.create(Runtime.SerializerJson.prototype);
Runtime.SerializerBase64.prototype.constructor = Runtime.SerializerBase64;
Object.assign(Runtime.SerializerBase64.prototype,
{
	/**
	 * Export object to data
	 */
	encode: function(object)
	{
		var s = Runtime.SerializerJson.prototype.encode.bind(this)(object);
		return Runtime.rs.base64_encode(s);
	},
	/**
	 * Import from string
	 */
	decode: function(s)
	{
		s = Runtime.rs.base64_decode(s);
		return Runtime.SerializerJson.prototype.decode.bind(this)(s);
	},
});
Object.assign(Runtime.SerializerBase64, Runtime.SerializerJson);
Object.assign(Runtime.SerializerBase64,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.SerializerBase64";
	},
	getParentClassName: function()
	{
		return "Runtime.SerializerJson";
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
Runtime.rtl.defClass(Runtime.SerializerBase64);
window["Runtime.SerializerBase64"] = Runtime.SerializerBase64;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.SerializerBase64;