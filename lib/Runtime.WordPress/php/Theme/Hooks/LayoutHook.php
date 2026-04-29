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
namespace Runtime\WordPress\Theme\Hooks;

use Runtime\BaseLayoutModel;
use Runtime\RawString;
use Runtime\RenderContainer;
use Runtime\VirtualDom;
use Runtime\Hooks\RuntimeHook;
use Runtime\Web\Hooks\AppHook;
use Runtime\WordPress\WP_Helper;


class LayoutHook extends \Runtime\Hooks\RuntimeHook
{
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(\Runtime\Web\Hooks\AppHook::ROUTE_BEFORE, "initAdminBar");
		$this->register(static::LAYOUT_HEADER, "header");
		$this->register(static::LAYOUT_FOOTER, "footer");
	}
	
	
	/**
	 * Init admin bar
	 */
	function initAdminBar($params)
	{
		$container = $params->get("container");
		$layout = $container->layout;
		if (!$layout) return;
		if (!is_admin() and !current_user_can("edit_pages")) return;
		$layout->body_class->push("admin-bar");
	}
	
	
	/**
	 * Header
	 */
	function header($params)
	{
		$components = $params->get("components");
		$header = \Runtime\WordPress\WP_Helper::wp_apply("wp_head");
		$vdom = new \Runtime\VirtualDom();
		$vdom->is_raw = true;
		$vdom->push($header);
		$components->push($vdom);
	}
	
	
	/**
	 * Footer
	 */
	function footer($params)
	{
		$components = $params->get("components");
		$footer = \Runtime\WordPress\WP_Helper::wp_apply("wp_footer");
		$vdom = new \Runtime\VirtualDom();
		$vdom->is_raw = true;
		$vdom->push($footer);
		$components->push($vdom);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Hooks.LayoutHook"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}