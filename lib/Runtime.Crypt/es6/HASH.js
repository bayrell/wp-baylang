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
if (typeof Runtime.Crypt == 'undefined') Runtime.Crypt = {};
Runtime.Crypt.HASH = function()
{
};
Object.assign(Runtime.Crypt.HASH.prototype,
{
});
Object.assign(Runtime.Crypt.HASH,
{
	/**
	 * Create md5 string
	 */
	md5: function(s)
	{
		return "";
	},
	/**
	 * Create hash string
	 */
	hash: function(text, key, algo)
	{
		return "";
	},
	/**
	 * Verify hash string
	 */
	verify: function(text, sign, key, algo)
	{
		return "";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Crypt";
	},
	getClassName: function()
	{
		return "Runtime.Crypt.HASH";
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
Runtime.rtl.defClass(Runtime.Crypt.HASH);
window["Runtime.Crypt.HASH"] = Runtime.Crypt.HASH;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Crypt.HASH;