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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
if (typeof Runtime.Web.Hooks == 'undefined') Runtime.Web.Hooks = {};
Runtime.Web.Hooks.AppHook = function()
{
	Runtime.BaseHook.apply(this, arguments);
};
Runtime.Web.Hooks.AppHook.prototype = Object.create(Runtime.BaseHook.prototype);
Runtime.Web.Hooks.AppHook.prototype.constructor = Runtime.Web.Hooks.AppHook;
Object.assign(Runtime.Web.Hooks.AppHook.prototype,
{
	/**
	 * Returns method name by hook name
	 */
	getMethodName: function(hook_name)
	{
		if (hook_name == this.constructor.ASSETS)
		{
			return "assets";
		}
		if (hook_name == this.constructor.CALL_API_BEFORE)
		{
			return "call_api_before";
		}
		if (hook_name == this.constructor.COMPONENTS)
		{
			return "components";
		}
		if (hook_name == this.constructor.CORE_UI)
		{
			return "core_ui";
		}
		if (hook_name == this.constructor.CREATE_CONTAINER)
		{
			return "create_container";
		}
		if (hook_name == this.constructor.CREATE_LAYOUT)
		{
			return "create_layout";
		}
		if (hook_name == this.constructor.CSS_VARS)
		{
			return "css_vars";
		}
		if (hook_name == this.constructor.ENVIRONMENTS)
		{
			return "environments";
		}
		if (hook_name == this.constructor.EXPORT_CONTAINER_DATA)
		{
			return "export_container_data";
		}
		if (hook_name == this.constructor.FIND_ROUTE_BEFORE)
		{
			return "find_route_before";
		}
		if (hook_name == this.constructor.FIND_ROUTE_AFTER)
		{
			return "find_route_after";
		}
		if (hook_name == this.constructor.IMPORT_CONTAINER_DATA_BEFORE)
		{
			return "import_container_data_before";
		}
		if (hook_name == this.constructor.IMPORT_CONTAINER_DATA_AFTER)
		{
			return "import_container_data_after";
		}
		if (hook_name == this.constructor.LAYOUT_MODEL_NAME)
		{
			return "layout_model_name";
		}
		if (hook_name == this.constructor.LAYOUT_COMPONENT_NAME)
		{
			return "layout_component_name";
		}
		if (hook_name == this.constructor.MAKE_URL)
		{
			return "make_url";
		}
		if (hook_name == this.constructor.MATCH_ROUTE)
		{
			return "match_route";
		}
		if (hook_name == this.constructor.RENDER_BODY)
		{
			return "render_body";
		}
		if (hook_name == this.constructor.RENDER_FOOTER)
		{
			return "render_footer";
		}
		if (hook_name == this.constructor.RENDER_HEAD)
		{
			return "render_head";
		}
		if (hook_name == this.constructor.RENDER_PROVIDER_SETTINGS)
		{
			return "render_provider_settings";
		}
		if (hook_name == this.constructor.RESPONSE)
		{
			return "response";
		}
		if (hook_name == this.constructor.ROUTES_INIT)
		{
			return "routes_init";
		}
		if (hook_name == this.constructor.ROUTE_AFTER)
		{
			return "route_after";
		}
		if (hook_name == this.constructor.ROUTE_MIDDLEWARE)
		{
			return "route_middleware";
		}
		if (hook_name == this.constructor.ROUTE_BEFORE)
		{
			return "route_before";
		}
		if (hook_name == this.constructor.VUE_MODULES)
		{
			return "vue_modules";
		}
		return "";
	},
	/**
	 * Register hooks
	 */
	register_hooks: function()
	{
	},
	/**
	 * Call api before
	 */
	call_api_before: function(d)
	{
	},
	/**
	 * Assets
	 */
	assets: function(params)
	{
	},
	/**
	 * Components
	 */
	components: function(params)
	{
	},
	/**
	 * Core ui
	 */
	core_ui: function(params)
	{
	},
	/**
	 * Create container
	 */
	create_container: function(params)
	{
	},
	/**
	 * Create layout
	 */
	create_layout: function(params)
	{
	},
	/**
	 * CSS Vars
	 */
	css_vars: function(params)
	{
	},
	/**
	 * Environments
	 */
	environments: function(params)
	{
	},
	/**
	 * Export data
	 */
	export_container_data: function(params)
	{
	},
	/**
	 * Import data
	 */
	import_container_data_before: function(params)
	{
	},
	/**
	 * Import data after
	 */
	import_container_data_after: function(params)
	{
	},
	/**
	 * Find route before
	 */
	find_route_before: function(params)
	{
	},
	/**
	 * Find route after
	 */
	find_route_after: function(params)
	{
	},
	/**
	 * Layout model name
	 */
	layout_model_name: function(params)
	{
	},
	/**
	 * Layout component name
	 */
	layout_component_name: function(params)
	{
	},
	/**
	 * Make url
	 */
	make_url: function(params)
	{
	},
	/**
	 * Match route
	 */
	match_route: function(params)
	{
	},
	/**
	 * Render body
	 */
	render_body: function(params)
	{
	},
	/**
	 * Render footer
	 */
	render_footer: function(params)
	{
	},
	/**
	 * Render head
	 */
	render_head: function(params)
	{
	},
	/**
	 * Render settings
	 */
	render_provider_settings: function(params)
	{
	},
	/**
	 * Routes init
	 */
	routes_init: async function(params)
	{
	},
	/**
	 * Route after
	 */
	route_after: async function(params)
	{
	},
	/**
	 * Route before
	 */
	route_before: async function(params)
	{
	},
	/**
	 * Route middleware
	 */
	route_middleware: async function(params)
	{
	},
	/**
	 * Response
	 */
	response: async function(params)
	{
	},
	/**
	 * Vue modules
	 */
	vue_modules: async function(params)
	{
	},
});
Object.assign(Runtime.Web.Hooks.AppHook, Runtime.BaseHook);
Object.assign(Runtime.Web.Hooks.AppHook,
{
	ASSETS: "runtime.web.app::assets",
	CALL_API_BEFORE: "runtime.web.app::call_api_before",
	COMPONENTS: "runtime.web.app::components",
	CORE_UI: "runtime.web.app::core_ui",
	CREATE_CONTAINER: "runtime.web.app::create_container",
	CREATE_LAYOUT: "runtime.web.app::create_layout",
	CSS_VARS: "runtime.web.app::css_vars",
	ENVIRONMENTS: "runtime.web.app::environments",
	EXPORT_CONTAINER_DATA: "runtime.web.app::export_container_data",
	FIND_ROUTE_BEFORE: "runtime.web.app::find_route_before",
	FIND_ROUTE_AFTER: "runtime.web.app::find_route_after",
	IMPORT_CONTAINER_DATA_AFTER: "runtime.web.app::import_container_data_after",
	IMPORT_CONTAINER_DATA_BEFORE: "runtime.web.app::import_container_data_before",
	LAYOUT_MODEL_NAME: "runtime.web.app::layout_model_name",
	LAYOUT_COMPONENT_NAME: "runtime.web.app::layout_component_name",
	MAKE_URL: "runtime.web.app::make_url",
	MATCH_ROUTE: "runtime.web.app::match_route",
	RENDER_BODY: "runtime.web.app::render_body",
	RENDER_FOOTER: "runtime.web.app::render_footer",
	RENDER_HEAD: "runtime.web.app::render_head",
	RENDER_PROVIDER_SETTINGS: "runtime.web.app::render_provider_settings",
	RESPONSE: "runtime.web.app::response",
	ROUTES_INIT: "runtime.web.app::routes_init",
	ROUTE_AFTER: "runtime.web.app::route_after",
	ROUTE_MIDDLEWARE: "runtime.web.app::route_middleware",
	ROUTE_BEFORE: "runtime.web.app::route_before",
	VUE_MODULES: "runtime.web.app::vue_modules",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web.Hooks";
	},
	getClassName: function()
	{
		return "Runtime.Web.Hooks.AppHook";
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
Runtime.rtl.defClass(Runtime.Web.Hooks.AppHook);
window["Runtime.Web.Hooks.AppHook"] = Runtime.Web.Hooks.AppHook;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Hooks.AppHook;