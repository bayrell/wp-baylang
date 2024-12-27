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
if (typeof Runtime.ORM == 'undefined') Runtime.ORM = {};
if (typeof Runtime.ORM.Exceptions == 'undefined') Runtime.ORM.Exceptions = {};
Runtime.ORM.Exceptions.DuplicateException = function(message, prev)
{
	if (message == undefined) message = "";
	if (prev == undefined) prev = null;
	Runtime.ORM.Exceptions.OrmException.call(this, message, Runtime.rtl.ERROR_DUPLICATE, prev);
};
Runtime.ORM.Exceptions.DuplicateException.prototype = Object.create(Runtime.ORM.Exceptions.OrmException.prototype);
Runtime.ORM.Exceptions.DuplicateException.prototype.constructor = Runtime.ORM.Exceptions.DuplicateException;
Object.assign(Runtime.ORM.Exceptions.DuplicateException.prototype,
{
});
Object.assign(Runtime.ORM.Exceptions.DuplicateException, Runtime.ORM.Exceptions.OrmException);
Object.assign(Runtime.ORM.Exceptions.DuplicateException,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM.Exceptions";
	},
	getClassName: function()
	{
		return "Runtime.ORM.Exceptions.DuplicateException";
	},
	getParentClassName: function()
	{
		return "Runtime.ORM.Exceptions.OrmException";
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
Runtime.rtl.defClass(Runtime.ORM.Exceptions.DuplicateException);
window["Runtime.ORM.Exceptions.DuplicateException"] = Runtime.ORM.Exceptions.DuplicateException;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.Exceptions.DuplicateException;