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
BayLang.Compiler.Commands.Version = function()
{
	Runtime.Console.BaseCommand.apply(this, arguments);
};
BayLang.Compiler.Commands.Version.prototype = Object.create(Runtime.Console.BaseCommand.prototype);
BayLang.Compiler.Commands.Version.prototype.constructor = BayLang.Compiler.Commands.Version;
Object.assign(BayLang.Compiler.Commands.Version.prototype,
{
});
Object.assign(BayLang.Compiler.Commands.Version, Runtime.Console.BaseCommand);
Object.assign(BayLang.Compiler.Commands.Version,
{
	/**
	 * Returns name
	 */
	getName: function()
	{
		return "version";
	},
	/**
	 * Returns description
	 */
	getDescription: function()
	{
		return "Show version";
	},
	/**
	 * Run task
	 */
	run: async function()
	{
		var runtime_version = new Runtime.Callback("Runtime.ModuleDescription", "getModuleVersion");
		var lang_version = new Runtime.Callback("BayLang.ModuleDescription", "getModuleVersion");
		Runtime.io.print("Lang version: " + Runtime.rtl.toStr(lang_version.apply()));
		Runtime.io.print("Runtime version: " + Runtime.rtl.toStr(runtime_version.apply()));
		return Promise.resolve(this.SUCCESS);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Compiler.Commands";
	},
	getClassName: function()
	{
		return "BayLang.Compiler.Commands.Version";
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
Runtime.rtl.defClass(BayLang.Compiler.Commands.Version);
window["BayLang.Compiler.Commands.Version"] = BayLang.Compiler.Commands.Version;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Compiler.Commands.Version;