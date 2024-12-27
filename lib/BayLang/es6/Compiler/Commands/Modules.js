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
if (typeof BayLang.Compiler == 'undefined') BayLang.Compiler = {};
if (typeof BayLang.Compiler.Commands == 'undefined') BayLang.Compiler.Commands = {};
BayLang.Compiler.Commands.Modules = function()
{
	Runtime.Console.BaseCommand.apply(this, arguments);
};
BayLang.Compiler.Commands.Modules.prototype = Object.create(Runtime.Console.BaseCommand.prototype);
BayLang.Compiler.Commands.Modules.prototype.constructor = BayLang.Compiler.Commands.Modules;
Object.assign(BayLang.Compiler.Commands.Modules.prototype,
{
});
Object.assign(BayLang.Compiler.Commands.Modules, Runtime.Console.BaseCommand);
Object.assign(BayLang.Compiler.Commands.Modules,
{
	/**
	 * Returns name
	 */
	getName: function()
	{
		return "modules";
	},
	/**
	 * Returns description
	 */
	getDescription: function()
	{
		return "Show modules";
	},
	/**
	 * Run task
	 */
	run: async function()
	{
		this.showModules(true);
		return Promise.resolve(this.SUCCESS);
	},
	/**
	 * Returns modules
	 */
	getModules: function()
	{
		var settings = Runtime.rtl.getContext().provider("BayLang.Compiler.SettingsProvider");
		return settings.modules;
	},
	/**
	 * Show modules
	 */
	showModules: function(verbose)
	{
		var modules = this.getModules();
		var modules_names = modules.keys().sort();
		for (var i = 0; i < modules_names.count(); i++)
		{
			var module_name = Runtime.rtl.attr(modules_names, i);
			var module = Runtime.rtl.attr(modules, module_name);
			if (verbose)
			{
				Runtime.io.print(i + 1 + Runtime.rtl.toStr(") ") + Runtime.rtl.toStr(Runtime.io.color("yellow", module_name)) + Runtime.rtl.toStr(" - ") + Runtime.rtl.toStr(module.path));
			}
			else
			{
				Runtime.io.print(module_name);
			}
		}
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Compiler.Commands";
	},
	getClassName: function()
	{
		return "BayLang.Compiler.Commands.Modules";
	},
	getParentClassName: function()
	{
		return "Runtime.Console.BaseCommand";
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
Runtime.rtl.defClass(BayLang.Compiler.Commands.Modules);
window["BayLang.Compiler.Commands.Modules"] = BayLang.Compiler.Commands.Modules;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Compiler.Commands.Modules;