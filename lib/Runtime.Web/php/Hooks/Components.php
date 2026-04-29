<?php
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
namespace Runtime\Web\Hooks;

use Runtime\Entity\Hook;
use Runtime\Hooks\RuntimeHook;


class Components extends \Runtime\Hooks\RuntimeHook
{
	var $items;
	var $priority;
	var $strategy;
	
	
	/**
	 * Hook factory
	 */
	static function hook($items, $priority = 100)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), new \Runtime\Map(["components" => $items, "priority" => $priority]));
	}
	
	
	/**
	 * Prepend item
	 */
	static function prependItems($items, $priority = 100)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), new \Runtime\Map([
			"components" => $items,
			"priority" => $priority,
			"strategy" => "prependItems",
		]));
	}
	
	
	/**
	 * Hook factory
	 */
	static function header($items, $priority = 100)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), new \Runtime\Map(["header" => $items, "priority" => $priority]));
	}
	
	
	/**
	 * Hook factory
	 */
	static function footer($items, $priority = 100)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), new \Runtime\Map(["footer" => $items, "priority" => $priority]));
	}
	
	
	/**
	 * Init params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("priority")) $this->priority = $params->get("priority");
		if ($params->has("strategy")) $this->strategy = $params->get("strategy");
		if ($params->has("components")) $this->items->set("components", $params->get("components"));
		if ($params->has("footer")) $this->items->set("footer", $params->get("footer"));
		if ($params->has("header")) $this->items->set("header", $params->get("header"));
	}
	
	
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(\Runtime\Hooks\RuntimeHook::COMPONENTS, "components", $this->priority);
		$this->register(\Runtime\Hooks\RuntimeHook::LAYOUT_HEADER, "render_head", $this->priority);
		$this->register(\Runtime\Hooks\RuntimeHook::LAYOUT_FOOTER, "render_footer", $this->priority);
	}
	
	
	/**
	 * Add action
	 */
	function action($arr, $items)
	{
		if ($this->strategy == "appendItems") $arr->appendItems($items);
		else $arr->prependItems($items);
	}
	
	
	/**
	 * Components
	 */
	function components($params)
	{
		$this->action($params->get("components"), $this->items->get("components"));
	}
	
	
	/**
	 * Render head
	 */
	function render_head($params)
	{
		$this->action($params->get("components"), $this->items->get("header"));
	}
	
	
	/**
	 * Render footer
	 */
	function render_footer($params)
	{
		$this->action($params->get("components"), $this->items->get("footer"));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->items = new \Runtime\Map([
			"components" => new \Runtime\Vector(),
			"footer" => new \Runtime\Vector(),
			"header" => new \Runtime\Vector(),
		]);
		$this->priority = 100;
		$this->strategy = "appendItems";
	}
	static function getClassName(){ return "Runtime.Web.Hooks.Components"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}