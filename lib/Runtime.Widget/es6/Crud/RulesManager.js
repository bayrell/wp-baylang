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
Runtime.Widget.Crud.RulesManager = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Widget.Crud.RulesManager.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Widget.Crud.RulesManager.prototype.constructor = Runtime.Widget.Crud.RulesManager;
Object.assign(Runtime.Widget.Crud.RulesManager.prototype,
{
	/**
	 * Returns true if create
	 */
	isCreate: function()
	{
		return this.is_create;
	},
	/**
	 * Returns true if update
	 */
	isUpdate: function()
	{
		return !this.is_create;
	},
	/**
	 * Set create
	 */
	setCreate: function(value)
	{
		this.is_create = value;
	},
	/**
	 * Returns fields
	 */
	getFields: function()
	{
		return this.fields;
	},
	/**
	 * Returns true if all rules pass
	 */
	correct: function()
	{
		return this.fields.keys().count() == 0;
	},
	/**
	 * Add rules
	 */
	addRules: function(rules)
	{
		this.rules.appendItems(rules);
	},
	/**
	 * Add field error
	 */
	addFieldError: function(field_name, error_message)
	{
		if (!this.fields.has(field_name))
		{
			this.fields.set(field_name, new Runtime.Vector());
		}
		var messages = this.fields.get(field_name);
		messages.push(error_message);
	},
	/**
	 * Validate data
	 */
	validate: async function(data)
	{
		for (var i = 0; i < this.rules.count(); i++)
		{
			var rule = this.rules.get(i);
			if (rule instanceof Runtime.Widget.Crud.Rules.BaseRule)
			{
				await rule.validate(this, data);
			}
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.action = "";
		this.is_create = false;
		this.rules = Runtime.Vector.from([]);
		this.fields = Runtime.Map.from({});
	},
});
Object.assign(Runtime.Widget.Crud.RulesManager, Runtime.BaseObject);
Object.assign(Runtime.Widget.Crud.RulesManager,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Crud";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Crud.RulesManager";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.Widget.Crud.RulesManager);
window["Runtime.Widget.Crud.RulesManager"] = Runtime.Widget.Crud.RulesManager;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Crud.RulesManager;