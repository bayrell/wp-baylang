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
Runtime.Widget.Crud.Rules.ReadOnlyRule = function()
{
	Runtime.Widget.Crud.Rules.BaseRule.apply(this, arguments);
};
Runtime.Widget.Crud.Rules.ReadOnlyRule.prototype = Object.create(Runtime.Widget.Crud.Rules.BaseRule.prototype);
Runtime.Widget.Crud.Rules.ReadOnlyRule.prototype.constructor = Runtime.Widget.Crud.Rules.ReadOnlyRule;
Object.assign(Runtime.Widget.Crud.Rules.ReadOnlyRule.prototype,
{
	/**
	 * Validate item
	 */
	validate: async function(rules, data)
	{
		if (rules.isCreate() && this.can_create)
		{
			return Promise.resolve(true);
		}
		if (rules.isUpdate() && this.can_update)
		{
			return Promise.resolve(true);
		}
		data.remove(this.name);
		return Promise.resolve(true);
	},
	_init: function()
	{
		Runtime.Widget.Crud.Rules.BaseRule.prototype._init.call(this);
		this.name = "";
		this.can_create = false;
		this.can_update = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "can_create")return this.can_create;
		else if (k == "can_update")return this.can_update;
		return Runtime.Widget.Crud.Rules.BaseRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Widget.Crud.Rules.ReadOnlyRule, Runtime.Widget.Crud.Rules.BaseRule);
Object.assign(Runtime.Widget.Crud.Rules.ReadOnlyRule,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.ReadOnlyRule";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.BaseRule";
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
		a.push("name");
		a.push("can_create");
		a.push("can_update");
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
Runtime.rtl.defClass(Runtime.Widget.Crud.Rules.ReadOnlyRule);
window["Runtime.Widget.Crud.Rules.ReadOnlyRule"] = Runtime.Widget.Crud.Rules.ReadOnlyRule;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.Rules.ReadOnlyRule;