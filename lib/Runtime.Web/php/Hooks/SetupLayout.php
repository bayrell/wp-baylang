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
class SetupLayout extends \Runtime\Web\Hooks\AppHook
{
	public $names;
	/**
	 * Hook factory
	 */
	static function hook($params)
	{
		return new \Runtime\Entity\Hook(static::getClassName(), \Runtime\Map::from(["names"=>$params]));
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
		if ($params->has("names"))
		{
			$this->names = $params->get("names");
		}
	}
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::LAYOUT_MODEL_NAME);
	}
	/**
	 * Layout model name
	 */
	function layout_model_name($params)
	{
		/* Setup custom model */
		$layout_name = $params->get("layout_name");
		if ($this->names && $this->names->has($layout_name))
		{
			$params->set("class_name", $this->names->get($layout_name));
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->names = null;
	}
	static function getNamespace()
	{
		return "Runtime.Web.Hooks";
	}
	static function getClassName()
	{
		return "Runtime.Web.Hooks.SetupLayout";
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