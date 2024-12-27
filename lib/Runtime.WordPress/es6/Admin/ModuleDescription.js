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
Runtime.WordPress.Admin.ModuleDescription = function()
{
};
Object.assign(Runtime.WordPress.Admin.ModuleDescription.prototype,
{
});
Object.assign(Runtime.WordPress.Admin.ModuleDescription,
{
	/**
	 * Returns module name
	 */
	getModuleName: function()
	{
		return "Runtime.WordPress.Admin";
	},
	/**
	 * Returns module version
	 */
	getModuleVersion: function()
	{
		return "0.0.1";
	},
	/**
	 * Returns required modules
	 * @return Map<string>
	 */
	requiredModules: function()
	{
		return Runtime.Map.from({"BayLang":">=0.12","BayLang.Constructor":">=0.12","Runtime.WordPress":">=0.1"});
	},
	/**
	 * Returns enities
	 */
	entities: function()
	{
		return Runtime.Vector.from([new Runtime.Entity.Hook("Runtime.WordPress.Admin.AppHook"),Runtime.Web.Hooks.SetupLayout.hook(Runtime.Map.from({"default":"Runtime.WordPress.Admin.DefaultLayoutModel"})),Runtime.Web.Hooks.Components.hook(Runtime.Vector.from(["Runtime.WordPress.Admin.CSS"]))]);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.ModuleDescription";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.ModuleDescription);
window["Runtime.WordPress.Admin.ModuleDescription"] = Runtime.WordPress.Admin.ModuleDescription;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.ModuleDescription;