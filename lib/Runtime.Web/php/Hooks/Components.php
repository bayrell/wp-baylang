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
class Components extends \Runtime\Web\Hooks\AppHook
{
	public $items;
	/**
	 * Hook factory
	 */
	static function hook($items)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), \Runtime\Map::from(["components"=>$items]));
	}
	/**
	 * Hook factory
	 */
	static function header($items)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), \Runtime\Map::from(["header"=>$items]));
	}
	/**
	 * Hook factory
	 */
	static function footer($items)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), \Runtime\Map::from(["footer"=>$items]));
	}
	/**
	 * Setup
	 */
	function setup($params)
	{
		parent::setup($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("components"))
		{
			$this->items->set("components", $params->get("components"));
		}
		if ($params->has("footer"))
		{
			$this->items->set("footer", $params->get("footer"));
		}
		if ($params->has("header"))
		{
			$this->items->set("header", $params->get("header"));
		}
	}
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::COMPONENTS);
		$this->register(static::RENDER_HEAD);
		$this->register(static::RENDER_FOOTER);
	}
	/**
	 * Components
	 */
	function components($params)
	{
		$params->get("components")->appendItems($this->items->get("components"));
	}
	/**
	 * Render head
	 */
	function render_head($params)
	{
		$params->get("components")->appendItems($this->items->get("header"));
	}
	/**
	 * Render footer
	 */
	function render_footer($params)
	{
		$params->get("components")->appendItems($this->items->get("footer"));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->items = \Runtime\Map::from(["components"=>\Runtime\Vector::from([]),"footer"=>\Runtime\Vector::from([]),"header"=>\Runtime\Vector::from([])]);
	}
	static function getNamespace()
	{
		return "Runtime.Web.Hooks";
	}
	static function getClassName()
	{
		return "Runtime.Web.Hooks.Components";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Hooks.AppHook";
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