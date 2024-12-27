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
if (typeof Runtime.Widget.Crud.Rules == 'undefined') Runtime.Widget.Crud.Rules = {};
Runtime.Widget.Crud.Rules.CrudRule = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Widget.Crud.Rules.CrudRule.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Widget.Crud.Rules.CrudRule.prototype.constructor = Runtime.Widget.Crud.Rules.CrudRule;
Object.assign(Runtime.Widget.Crud.Rules.CrudRule.prototype,
{
	/**
	 * Validate item
	 */
	validateItem: async function(api, data)
	{
		return data;
	},
	/**
	 * Before save item
	 */
	onSaveBefore: async function(api)
	{
	},
	/**
	 * After save item
	 */
	onSaveAfter: async function(api)
	{
	},
	/**
	 * Before delete item
	 */
	onDeleteBefore: async function(api)
	{
	},
	/**
	 * After delete item
	 */
	onDeleteAfter: async function(api)
	{
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Widget.Crud.Rules.CrudRule, Runtime.BaseStruct);
Object.assign(Runtime.Widget.Crud.Rules.CrudRule,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.Rules.CrudRule);
window["Runtime.Widget.Crud.Rules.CrudRule"] = Runtime.Widget.Crud.Rules.CrudRule;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.Rules.CrudRule;