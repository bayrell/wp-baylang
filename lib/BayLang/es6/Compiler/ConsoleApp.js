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
BayLang.Compiler.ConsoleApp = function()
{
	Runtime.Console.App.apply(this, arguments);
};
BayLang.Compiler.ConsoleApp.prototype = Object.create(Runtime.Console.App.prototype);
BayLang.Compiler.ConsoleApp.prototype.constructor = BayLang.Compiler.ConsoleApp;
Object.assign(BayLang.Compiler.ConsoleApp.prototype,
{
	/**
	 * Init
	 */
	init: async function()
	{
		/*new SettingsProvider();*/
	},
});
Object.assign(BayLang.Compiler.ConsoleApp, Runtime.Console.App);
Object.assign(BayLang.Compiler.ConsoleApp,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Compiler";
	},
	getClassName: function()
	{
		return "BayLang.Compiler.ConsoleApp";
	},
	getParentClassName: function()
	{
		return "Runtime.Console.App";
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
Runtime.rtl.defClass(BayLang.Compiler.ConsoleApp);
window["BayLang.Compiler.ConsoleApp"] = BayLang.Compiler.ConsoleApp;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Compiler.ConsoleApp;