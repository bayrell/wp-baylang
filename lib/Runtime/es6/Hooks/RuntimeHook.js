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
if (typeof Runtime.Hooks == 'undefined') Runtime.Hooks = {};
Runtime.Hooks.RuntimeHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.Hooks.RuntimeHook.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.Hooks.RuntimeHook.prototype.constructor = Runtime.Hooks.RuntimeHook;
Object.assign(Runtime.Hooks.RuntimeHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.INIT)
		{
			return "init";
		}
		if (hook_name == this.constructor.START)
		{
			return "start";
		}
		if (hook_name == this.constructor.LAUNCHED)
		{
			return "launched";
		}
		if (hook_name == this.constructor.RUN)
		{
			return "run";
		}
		if (hook_name == this.constructor.ENV)
		{
			return "env";
		}
		return "";
	},
	/**
	 * Init context
	 */
	init: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Start context
	 */
	start: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Launched context
	 */
	launched: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Run entry point
	 */
	run: async function(d)
	{
		return Promise.resolve(d);
	},
	/**
	 * Init context
	 */
	env: function(d)
	{
		return d;
	},
});
Object.assign(Runtime.Hooks.RuntimeHook, Runtime.BaseHook);
Object.assign(Runtime.Hooks.RuntimeHook,
{
	INIT: "runtime::init",
	START: "runtime::start",
	LAUNCHED: "runtime::launched",
	RUN: "runtime::run",
	ENV: "runtime::env",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Hooks.RuntimeHook";
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
Runtime.rtl.defClass(Runtime.Hooks.RuntimeHook);
window["Runtime.Hooks.RuntimeHook"] = Runtime.Hooks.RuntimeHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Hooks.RuntimeHook;