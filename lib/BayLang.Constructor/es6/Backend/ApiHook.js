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
if (typeof BayLang.Constructor.Backend == 'undefined') BayLang.Constructor.Backend = {};
BayLang.Constructor.Backend.ApiHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
BayLang.Constructor.Backend.ApiHook.prototype = Object.create(Runtime.BaseHook.prototype);
BayLang.Constructor.Backend.ApiHook.prototype.constructor = BayLang.Constructor.Backend.ApiHook;
Object.assign(BayLang.Constructor.Backend.ApiHook.prototype,
{
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
		this.register(this.constructor.GET_ASSETS_PATH);
		this.register(this.constructor.GET_ASSETS_URL_PATH);
		this.register(this.constructor.GET_PROJECT);
		this.register(this.constructor.GET_PROJECT_LIST);
	},
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.GET_ASSETS_PATH)
		{
			return "get_assets_path";
		}
		if (hook_name == this.constructor.GET_ASSETS_URL_PATH)
		{
			return "get_assets_url_path";
		}
		if (hook_name == this.constructor.GET_PROJECT_LIST)
		{
			return "get_project_list";
		}
		if (hook_name == this.constructor.GET_PROJECT)
		{
			return "get_project";
		}
		if (hook_name == this.constructor.UPDATE_ASSETS)
		{
			return "update_assets";
		}
		return "";
	},
	/**
	 * Returns assets path
	 */
	get_assets_path: async function(params)
	{
	},
	/**
	 * Returns assets url path
	 */
	get_assets_url_path: async function(params)
	{
	},
	/**
	 * Returns projects list
	 */
	get_project_list: async function(params)
	{
		var project_folder = Runtime.fs.join(Runtime.Vector.from([Runtime.rtl.getContext().env("constructor_path"),"projects"]));
		var items = await BayLang.Helper.Project.readProjects(project_folder);
		params.set("items", items);
	},
	/**
	 * Returns projects
	 */
	get_project: async function(params)
	{
		var project_id = params.get("project");
		var project_path = Runtime.fs.join(Runtime.Vector.from([Runtime.rtl.getContext().env("constructor_path"),"projects",project_id]));
		var project = await BayLang.Helper.Project.readProject(project_path);
		params.set("project", project);
	},
});
Object.assign(BayLang.Constructor.Backend.ApiHook, Runtime.BaseHook);
Object.assign(BayLang.Constructor.Backend.ApiHook,
{
	GET_ASSETS_PATH: "baylang.constructor::get_assets_path",
	GET_ASSETS_URL_PATH: "baylang.constructor::get_assets_url_path",
	GET_PROJECT_LIST: "baylang.constructor::get_project_list",
	GET_PROJECT: "baylang.constructor::get_project",
	UPDATE_ASSETS: "baylang.constructor::update_assets",
	/**
	 * Returns projects list
	 */
	getProjectList: async function()
	{
		var result = await Runtime.rtl.getContext().callHookAsync(this.GET_PROJECT_LIST);
		return Promise.resolve(result.get("items"));
	},
	/**
	 * Returns projects list
	 */
	getProject: async function(project_id)
	{
		var result = await Runtime.rtl.getContext().callHookAsync(this.GET_PROJECT, Runtime.Map.from({"project":project_id}));
		return Promise.resolve(result.get("project"));
	},
	/**
	 * Returns assets path
	 */
	getAssetsPath: async function(project)
	{
		var result = await Runtime.rtl.getContext().callHookAsync(this.GET_ASSETS_PATH, Runtime.Map.from({"project":project,"path":Runtime.fs.join(Runtime.Vector.from([project.getPath(),"assets"]))}));
		return Promise.resolve(result.get("path"));
	},
	/**
	 * Returns project assets url path
	 */
	getAssetsUrlPath: async function(project)
	{
		var result = await Runtime.rtl.getContext().callHookAsync(this.GET_ASSETS_URL_PATH, Runtime.Map.from({"project":project,"path":"/assets"}));
		return Promise.resolve(result.get("path"));
	},
	/**
	 * Update assets
	 */
	updateAssets: async function()
	{
		await Runtime.rtl.getContext().callHookAsync(this.UPDATE_ASSETS);
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.ApiHook";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseHook";
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.ApiHook);
window["BayLang.Constructor.Backend.ApiHook"] = BayLang.Constructor.Backend.ApiHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.ApiHook;