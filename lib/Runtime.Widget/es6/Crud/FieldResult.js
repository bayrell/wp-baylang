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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Crud == 'undefined') Runtime.Widget.Crud = {};
Runtime.Widget.Crud.FieldResult = function()
{
	Runtime.Map.apply(this, arguments);
};
Runtime.Widget.Crud.FieldResult.prototype = Object.create(Runtime.Map.prototype);
Runtime.Widget.Crud.FieldResult.prototype.constructor = Runtime.Widget.Crud.FieldResult;
Object.assign(Runtime.Widget.Crud.FieldResult.prototype,
{
	/**
	 * Returns true if is success
	 */
	isSuccess: function()
	{
		return this.keys().count() == 0;
	},
	/**
	 * Add field error
	 */
	addFieldError: function(field_name, error_message)
	{
		if (!this.has(field_name))
		{
			this.set(field_name, new Runtime.Vector());
		}
		var messages = this.get(field_name);
		messages.push(error_message);
	},
	/**
	 * Check error
	 */
	checkError: function()
	{
		if (!this.isSuccess())
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Widget.Crud.FieldException())
		}
	},
});
Object.assign(Runtime.Widget.Crud.FieldResult, Runtime.Map);
Object.assign(Runtime.Widget.Crud.FieldResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.FieldResult";
	},
	getParentClassName: function()
	{
		return "Runtime.Map";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.FieldResult);
window["Runtime.Widget.Crud.FieldResult"] = Runtime.Widget.Crud.FieldResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.FieldResult;