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
if (typeof Runtime.Cabinet == 'undefined') Runtime.Cabinet = {};
if (typeof Runtime.Cabinet.Database == 'undefined') Runtime.Cabinet.Database = {};
Runtime.Cabinet.Database.ModuleDescription = class
{
	/**
	 * Returns module name
	 */
	static getModuleName(){ return "Runtime.Cabinet.Database"; }
	
	
	/**
	 * Returns module version
	 */
	static getModuleVersion(){ return "1.0"; }
	
	
	/**
	 * Returns required modules
	 */
	static requiredModules()
	{
		return Runtime.Map.create({
			"Runtime": "*",
		});
	}
	
	
	/**
	 * Returns entities
	 */
	static entities()
	{
		return Runtime.Vector.create([
			new Runtime.ORM.Annotations.Migration("Runtime.Cabinet.Database.Migrations.CabinetMigration"),
			new Runtime.ORM.Annotations.Table("Runtime.Cabinet.Database.User"),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
	}
	static getClassName(){ return "Runtime.Cabinet.Database.ModuleDescription"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Cabinet.Database.ModuleDescription"] = Runtime.Cabinet.Database.ModuleDescription;