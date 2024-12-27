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
if (typeof BayLang.Test == 'undefined') BayLang.Test = {};
BayLang.Test.ModuleDescription = function()
{
};
Object.assign(BayLang.Test.ModuleDescription.prototype,
{
});
Object.assign(BayLang.Test.ModuleDescription,
{
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleName: function()
	{
		return "BayLang.Test";
	},
	/**
	 * Returns module name
	 * @return string
	 */
	getModuleVersion: function()
	{
		return BayLang.ModuleDescription.getModuleVersion();
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({"BayLang":">=0.12"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Base"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Expression"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Html"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Operator"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Program"),new Runtime.Unit.UnitTest("BayLang.Test.LangBay.Style")]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Test";
	},
	getClassName: function()
	{
		return "BayLang.Test.ModuleDescription";
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
Runtime.rtl.defClass(BayLang.Test.ModuleDescription);
window["BayLang.Test.ModuleDescription"] = BayLang.Test.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Test.ModuleDescription;