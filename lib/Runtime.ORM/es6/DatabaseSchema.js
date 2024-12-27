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
Runtime.ORM.DatabaseSchema = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.ORM.DatabaseSchema.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.ORM.DatabaseSchema.prototype.constructor = Runtime.ORM.DatabaseSchema;
Object.assign(Runtime.ORM.DatabaseSchema.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.SAVE_AFTER)
		{
			return "onAfterSave";
		}
		if (hook_name == this.constructor.SAVE_BEFORE)
		{
			return "onBeforeSave";
		}
		return "";
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	/**
	 * Save before item
	 */
	onBeforeSave: function(d)
	{
		return d;
	},
	/**
	 * Save after item
	 */
	onAfterSave: function(d)
	{
		return d;
	},
});
Object.assign(Runtime.ORM.DatabaseSchema, Runtime.BaseHook);
Object.assign(Runtime.ORM.DatabaseSchema,
{
	SAVE_AFTER: "runtime.orm.database::save_after",
	SAVE_BEFORE: "runtime.orm.database::save_before",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.ORM";
	},
	getClassName: function()
	{
		return "Runtime.ORM.DatabaseSchema";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
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
Runtime.rtl.defClass(Runtime.ORM.DatabaseSchema);
window["Runtime.ORM.DatabaseSchema"] = Runtime.ORM.DatabaseSchema;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.ORM.DatabaseSchema;