<?php
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
namespace Runtime\Web\Hooks;
class AppHook extends \Runtime\BaseHook
{
	const ASSETS="runtime.web.app::assets";
	const CALL_API_BEFORE="runtime.web.app::call_api_before";
	const COMPONENTS="runtime.web.app::components";
	const CORE_UI="runtime.web.app::core_ui";
	const CREATE_CONTAINER="runtime.web.app::create_container";
	const CREATE_LAYOUT="runtime.web.app::create_layout";
	const CSS_VARS="runtime.web.app::css_vars";
	const ENVIRONMENTS="runtime.web.app::environments";
	const EXPORT_CONTAINER_DATA="runtime.web.app::export_container_data";
	const FIND_ROUTE_BEFORE="runtime.web.app::find_route_before";
	const FIND_ROUTE_AFTER="runtime.web.app::find_route_after";
	const IMPORT_CONTAINER_DATA_AFTER="runtime.web.app::import_container_data_after";
	const IMPORT_CONTAINER_DATA_BEFORE="runtime.web.app::import_container_data_before";
	const LAYOUT_MODEL_NAME="runtime.web.app::layout_model_name";
	const LAYOUT_COMPONENT_NAME="runtime.web.app::layout_component_name";
	const MAKE_URL="runtime.web.app::make_url";
	const MATCH_ROUTE="runtime.web.app::match_route";
	const RENDER_BODY="runtime.web.app::render_body";
	const RENDER_FOOTER="runtime.web.app::render_footer";
	const RENDER_HEAD="runtime.web.app::render_head";
	const RENDER_PROVIDER_SETTINGS="runtime.web.app::render_provider_settings";
	const RESPONSE="runtime.web.app::response";
	const ROUTES_INIT="runtime.web.app::routes_init";
	const ROUTE_AFTER="runtime.web.app::route_after";
	const ROUTE_MIDDLEWARE="runtime.web.app::route_middleware";
	const ROUTE_BEFORE="runtime.web.app::route_before";
	const VUE_MODULES="runtime.web.app::vue_modules";
	/**
	 * Returns method name by hook name
	 */
	function getMethodName($hook_name)
	{
		if ($hook_name == static::ASSETS)
		{
			return "assets";
		}
		if ($hook_name == static::CALL_API_BEFORE)
		{
			return "call_api_before";
		}
		if ($hook_name == static::COMPONENTS)
		{
			return "components";
		}
		if ($hook_name == static::CORE_UI)
		{
			return "core_ui";
		}
		if ($hook_name == static::CREATE_CONTAINER)
		{
			return "create_container";
		}
		if ($hook_name == static::CREATE_LAYOUT)
		{
			return "create_layout";
		}
		if ($hook_name == static::CSS_VARS)
		{
			return "css_vars";
		}
		if ($hook_name == static::ENVIRONMENTS)
		{
			return "environments";
		}
		if ($hook_name == static::EXPORT_CONTAINER_DATA)
		{
			return "export_container_data";
		}
		if ($hook_name == static::FIND_ROUTE_BEFORE)
		{
			return "find_route_before";
		}
		if ($hook_name == static::FIND_ROUTE_AFTER)
		{
			return "find_route_after";
		}
		if ($hook_name == static::IMPORT_CONTAINER_DATA_BEFORE)
		{
			return "import_container_data_before";
		}
		if ($hook_name == static::IMPORT_CONTAINER_DATA_AFTER)
		{
			return "import_container_data_after";
		}
		if ($hook_name == static::LAYOUT_MODEL_NAME)
		{
			return "layout_model_name";
		}
		if ($hook_name == static::LAYOUT_COMPONENT_NAME)
		{
			return "layout_component_name";
		}
		if ($hook_name == static::MAKE_URL)
		{
			return "make_url";
		}
		if ($hook_name == static::MATCH_ROUTE)
		{
			return "match_route";
		}
		if ($hook_name == static::RENDER_BODY)
		{
			return "render_body";
		}
		if ($hook_name == static::RENDER_FOOTER)
		{
			return "render_footer";
		}
		if ($hook_name == static::RENDER_HEAD)
		{
			return "render_head";
		}
		if ($hook_name == static::RENDER_PROVIDER_SETTINGS)
		{
			return "render_provider_settings";
		}
		if ($hook_name == static::RESPONSE)
		{
			return "response";
		}
		if ($hook_name == static::ROUTES_INIT)
		{
			return "routes_init";
		}
		if ($hook_name == static::ROUTE_AFTER)
		{
			return "route_after";
		}
		if ($hook_name == static::ROUTE_MIDDLEWARE)
		{
			return "route_middleware";
		}
		if ($hook_name == static::ROUTE_BEFORE)
		{
			return "route_before";
		}
		if ($hook_name == static::VUE_MODULES)
		{
			return "vue_modules";
		}
		return "";
	}
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
	}
	/**
	 * Call api before
	 */
	function call_api_before($d)
	{
	}
	/**
	 * Assets
	 */
	function assets($params)
	{
	}
	/**
	 * Components
	 */
	function components($params)
	{
	}
	/**
	 * Core ui
	 */
	function core_ui($params)
	{
	}
	/**
	 * Create container
	 */
	function create_container($params)
	{
	}
	/**
	 * Create layout
	 */
	function create_layout($params)
	{
	}
	/**
	 * CSS Vars
	 */
	function css_vars($params)
	{
	}
	/**
	 * Environments
	 */
	function environments($params)
	{
	}
	/**
	 * Export data
	 */
	function export_container_data($params)
	{
	}
	/**
	 * Import data
	 */
	function import_container_data_before($params)
	{
	}
	/**
	 * Import data after
	 */
	function import_container_data_after($params)
	{
	}
	/**
	 * Find route before
	 */
	function find_route_before($params)
	{
	}
	/**
	 * Find route after
	 */
	function find_route_after($params)
	{
	}
	/**
	 * Layout model name
	 */
	function layout_model_name($params)
	{
	}
	/**
	 * Layout component name
	 */
	function layout_component_name($params)
	{
	}
	/**
	 * Make url
	 */
	function make_url($params)
	{
	}
	/**
	 * Match route
	 */
	function match_route($params)
	{
	}
	/**
	 * Render body
	 */
	function render_body($params)
	{
	}
	/**
	 * Render footer
	 */
	function render_footer($params)
	{
	}
	/**
	 * Render head
	 */
	function render_head($params)
	{
	}
	/**
	 * Render settings
	 */
	function render_provider_settings($params)
	{
	}
	/**
	 * Routes init
	 */
	function routes_init($params)
	{
	}
	/**
	 * Route after
	 */
	function route_after($params)
	{
	}
	/**
	 * Route before
	 */
	function route_before($params)
	{
	}
	/**
	 * Route middleware
	 */
	function route_middleware($params)
	{
	}
	/**
	 * Response
	 */
	function response($params)
	{
	}
	/**
	 * Vue modules
	 */
	function vue_modules($params)
	{
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Web.Hooks";
	}
	static function getClassName()
	{
		return "Runtime.Web.Hooks.AppHook";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseHook";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}