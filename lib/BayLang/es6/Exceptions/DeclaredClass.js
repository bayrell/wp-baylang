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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Exceptions == 'undefined') BayLang.Exceptions = {};
BayLang.Exceptions.DeclaredClass = function(prev)
{
	if (prev == undefined) prev = null;
	Runtime.Exceptions.AbstractException.call(this, "Declared class", -1, prev);
};
BayLang.Exceptions.DeclaredClass.prototype = Object.create(Runtime.Exceptions.AbstractException.prototype);
BayLang.Exceptions.DeclaredClass.prototype.constructor = BayLang.Exceptions.DeclaredClass;
Object.assign(BayLang.Exceptions.DeclaredClass.prototype,
{
});
Object.assign(BayLang.Exceptions.DeclaredClass, Runtime.Exceptions.AbstractException);
Object.assign(BayLang.Exceptions.DeclaredClass,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Exceptions";
	},
	getClassName: function()
	{
		return "BayLang.Exceptions.DeclaredClass";
	},
	getParentClassName: function()
	{
		return "Runtime.Exceptions.AbstractException";
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
Runtime.rtl.defClass(BayLang.Exceptions.DeclaredClass);
window["BayLang.Exceptions.DeclaredClass"] = BayLang.Exceptions.DeclaredClass;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Exceptions.DeclaredClass;