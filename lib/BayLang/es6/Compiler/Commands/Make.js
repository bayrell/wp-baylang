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
BayLang.Compiler.Commands.Make = function()
{
	Runtime.Console.BaseCommand.apply(this, arguments);
};
BayLang.Compiler.Commands.Make.prototype = Object.create(Runtime.Console.BaseCommand.prototype);
BayLang.Compiler.Commands.Make.prototype.constructor = BayLang.Compiler.Commands.Make;
Object.assign(BayLang.Compiler.Commands.Make.prototype,
{
	/**
	 * Run task
	 */
	run: async function()
	{
		var module_name = Runtime.rtl.attr(Runtime.rtl.getContext().cli_args, 2);
		var lang = Runtime.rtl.attr(Runtime.rtl.getContext().cli_args, 3);
		if (Runtime.rtl.isEmpty(module_name))
		{
			BayLang.Compiler.Commands.Modules.showModules();
			return Promise.resolve(0);
		}
		/* Compile module */
		var settings = Runtime.rtl.getContext().provider("BayLang.Compiler.SettingsProvider");
		var result = await settings.compileModule(module_name, lang);
		if (!result)
		{
			return Promise.resolve(this.constructor.FAIL);
		}
		return Promise.resolve(this.constructor.SUCCESS);
	},
});
Object.assign(BayLang.Compiler.Commands.Make, Runtime.Console.BaseCommand);
Object.assign(BayLang.Compiler.Commands.Make,
{
	/**
	 * Returns name
	 */
	getName: function()
	{
		return "make";
	},
	/**
	 * Returns description
	 */
	getDescription: function()
	{
		return "Make module";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Compiler.Commands";
	},
	getClassName: function()
	{
		return "BayLang.Compiler.Commands.Make";
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
Runtime.rtl.defClass(BayLang.Compiler.Commands.Make);
window["BayLang.Compiler.Commands.Make"] = BayLang.Compiler.Commands.Make;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Compiler.Commands.Make;