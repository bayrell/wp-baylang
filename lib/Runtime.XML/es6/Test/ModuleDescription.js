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
if (typeof Runtime.XML == 'undefined') Runtime.XML = {};
if (typeof Runtime.XML.Test == 'undefined') Runtime.XML.Test = {};
Runtime.XML.Test.ModuleDescription = class
{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){ return "Runtime.XML.Test"; }
	
	
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){ return "0.11.0"; }
	
	
	/**
	 * Returns required modules
	 * @return Dict<string>
	 */
	static requiredModules()
	{
		return Runtime.Map.create({
			"Runtime": ">=0.11",
			"Runtime.Unit": ">=0.11",
		});
	}
	
	
	/**
	 * Returns enities
	 */
	static entities()
	{
		return Runtime.Vector.create([
			new Runtime.Unit.UnitTest("Runtime.XML.Test.XmlTest"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.XmlAppend"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.PatcherAddAttribute"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.PatcherAppend"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.PatcherModify"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.PatcherModifyAttribute"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.PatcherRemove"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.PatcherRemoveAttribute"),
			new Runtime.Unit.UnitTest("Runtime.XML.Test.YamlTest"),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.XML.Test.ModuleDescription"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.XML.Test.ModuleDescription"] = Runtime.XML.Test.ModuleDescription;