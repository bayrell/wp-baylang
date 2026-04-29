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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
Runtime.WordPress.Admin.ModuleDescription = class
{
	/**
	 * Returns module name
	 */
	static getModuleName(){ return "Runtime.WordPress.Admin"; }
	
	
	/**
	 * Returns module version
	 */
	static getModuleVersion(){ return "0.0.1"; }
	
	
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	static requiredModules()
	{
		return Runtime.Map.create({
			"Runtime.Widget": ">1.0",
			"Runtime.WordPress": ">=1.0",
		});
	}
	
	
	/**
	 * Returns enities
	 */
	static entities()
	{
		return Runtime.Vector.create([
			new Runtime.Entity.Hook("Runtime.WordPress.Admin.AppHook"),
			Runtime.Web.Hooks.SetupLayout.hook(Runtime.Map.create({
				"admin": "Runtime.WordPress.Admin.AdminLayoutModel",
			})),
			Runtime.Web.Hooks.Components.prependItems(Runtime.Vector.create(["Runtime.WordPress.Admin.CSS"])),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.WordPress.Admin.ModuleDescription"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.ModuleDescription"] = Runtime.WordPress.Admin.ModuleDescription;