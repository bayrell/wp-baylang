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
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
if (typeof Runtime.WordPress.Theme.Hooks == 'undefined') Runtime.WordPress.Theme.Hooks = {};
Runtime.WordPress.Theme.Hooks.AssetHook = class extends Runtime.Web.Hooks.AppHook
{
	/**
	 * Register hooks
	 */
	register_hooks()
	{
		this.register(this.constructor.ASSETS);
		this.register(this.constructor.CREATE_LAYOUT);
		this.register(this.constructor.IMPORT_CONTAINER_DATA_AFTER);
	}
	
	
	/**
	 * Create layout
	 */
	create_layout(params)
	{
	}
	
	
	/**
	 * Import data after
	 */
	import_container_data_after(params)
	{
		this.assets_path = params.get("container").layout.storage.params.get("assets_path");
	}
	
	
	/**
	 * Assets
	 */
	assets(params)
	{
		params.set("assets_path", this.assets_path);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.assets_path = "";
	}
	static getClassName(){ return "Runtime.WordPress.Theme.Hooks.AssetHook"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.Hooks.AssetHook"] = Runtime.WordPress.Theme.Hooks.AssetHook;