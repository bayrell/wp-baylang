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
Runtime.Widget.Crud.Rules.Required = function()
{
	Runtime.Widget.Crud.Rules.CrudRule.apply(this, arguments);
};
Runtime.Widget.Crud.Rules.Required.prototype = Object.create(Runtime.Widget.Crud.Rules.CrudRule.prototype);
Runtime.Widget.Crud.Rules.Required.prototype.constructor = Runtime.Widget.Crud.Rules.Required;
Object.assign(Runtime.Widget.Crud.Rules.Required.prototype,
{
	/**
	 * Validate item
	 */
	validateItem: async function(api, data)
	{
		if (api.pk == null && !this.check_create)
		{
			return Promise.resolve(data);
		}
		if (api.pk != null && !this.check_update)
		{
			return Promise.resolve(data);
		}
		var value = Runtime.rtl.attr(data, this.name);
		if (!data.has(this.name) || value === "" || value === null)
		{
			api.fields.addFieldError(this.name, "Field is required");
		}
		return Promise.resolve(data);
	},
	_init: function()
	{
		Runtime.Widget.Crud.Rules.CrudRule.prototype._init.call(this);
		this.name = "";
		this.check_create = true;
		this.check_update = true;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "check_create")return this.check_create;
		else if (k == "check_update")return this.check_update;
		return Runtime.Widget.Crud.Rules.CrudRule.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Widget.Crud.Rules.Required, Runtime.Widget.Crud.Rules.CrudRule);
Object.assign(Runtime.Widget.Crud.Rules.Required,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud.Rules";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.Required";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
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
		a.push("check_create");
		a.push("check_update");
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
Runtime.rtl.defClass(Runtime.Widget.Crud.Rules.Required);
window["Runtime.Widget.Crud.Rules.Required"] = Runtime.Widget.Crud.Rules.Required;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.Rules.Required;