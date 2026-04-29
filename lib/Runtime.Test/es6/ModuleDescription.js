"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Runtime.Test == 'undefined') Runtime.Test = {};
Runtime.Test.ModuleDescription = class
{
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleName(){ return "Runtime.Test"; }
	
	
	/**
	 * Returns module name
	 * @return string
	 */
	static getModuleVersion(){ return "1.0"; }
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static requiredModules()
	{
		return Runtime.Map.create({
			"Runtime": ">=1.0",
			"Runtime.Unit": ">=1.0",
		});
	}
	
	
	/**
	 * Returns entities
	 */
	static entities()
	{
		return Runtime.Vector.create([
			new Runtime.Unit.UnitTest("Runtime.Test.DateTest"),
			new Runtime.Unit.UnitTest("Runtime.Test.Serialize.Basic"),
			new Runtime.Unit.UnitTest("Runtime.Test.Serialize.Object"),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.Test.ModuleDescription"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Test.ModuleDescription"] = Runtime.Test.ModuleDescription;