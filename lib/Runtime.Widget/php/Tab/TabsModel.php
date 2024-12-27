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
namespace Runtime\Widget\Tab;
class TabsModel extends \Runtime\Web\BaseModel
{
	public $active;
	public $items;
	public $render;
	public $component;
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("active"))
		{
			$this->active = $params->get("active");
		}
		if ($params->has("items"))
		{
			$this->items = $params->get("items");
		}
		if ($params->has("render"))
		{
			$this->render = $params->get("render");
		}
	}
	/**
	 * Returns true if active
	 */
	function isActive($tab_key)
	{
		return $this->active == $tab_key;
	}
	/**
	 * Set active
	 */
	function setActive($active)
	{
		$this->active = $active;
	}
	/**
	 * Can show
	 */
	function canShow($tab_key)
	{
		$tab = $this->items->findItem(\Runtime\lib::equalAttr("key", $tab_key));
		if ($tab == null)
		{
			return false;
		}
		if ($tab->has("href") && $tab->get("key") != $tab_key)
		{
			return false;
		}
		return true;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->active = "";
		$this->items = \Runtime\Vector::from([]);
		$this->render = true;
		$this->component = "Runtime.Widget.Tab.Tabs";
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Tab";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Tab.TabsModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseModel";
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