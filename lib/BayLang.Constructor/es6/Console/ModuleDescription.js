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
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Console == 'undefined') BayLang.Constructor.Console = {};
BayLang.Constructor.Console.ModuleDescription = function()
{
};
Object.assign(BayLang.Constructor.Console.ModuleDescription.prototype,
{
});
Object.assign(BayLang.Constructor.Console.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "BayLang.Constructor.Console";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return "0.0.1";
	},
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({"Runtime.Console":">=0.12"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Console.Annotations.ConsoleCommand("BayLang.Constructor.Console.Commands.BuildCache"),new Runtime.Console.Annotations.ConsoleCommand("BayLang.Constructor.Console.Commands.NginxUpdate")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Console";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Console.ModuleDescription";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(BayLang.Constructor.Console.ModuleDescription);
window["BayLang.Constructor.Console.ModuleDescription"] = BayLang.Constructor.Console.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Console.ModuleDescription;