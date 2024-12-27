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
namespace Runtime\Widget;
class RenderListModel extends \Runtime\Web\BaseModel
{
	public $widget_name;
	public $component;
	public $items;
	/**
	 * Find widget position
	 */
	function find($widget)
	{
		return ($widget) ? ($this->items->find(\Runtime\lib::equal($widget))) : (-1);
	}
	/**
	 * Find widget position by name
	 */
	function findByName($widget_name)
	{
		return $this->items->find(\Runtime\lib::equalAttr("widget_name", $widget_name));
	}
	/**
	 * Find widget position by name
	 */
	function findItemByName($widget_name)
	{
		return $this->items->findItem(\Runtime\lib::equalAttr("widget_name", $widget_name));
	}
	/**
	 * Add item
	 */
	function addItem($widget, $dest="", $kind="after")
	{
		$pos = -1;
		if ($dest != "")
		{
			$pos = $this->findByName($dest);
		}
		if ($pos >= 0)
		{
			if ($kind == "before")
			{
				$this->items->insert($pos, $widget);
			}
			else
			{
				$this->items->insert($pos + 1, $widget);
			}
		}
		else
		{
			if ($kind == "before")
			{
				$this->items->prepend($widget);
			}
			else
			{
				$this->items->push($widget);
			}
		}
		return $widget;
	}
	/**
	 * Remove item
	 */
	function removeItem($widget)
	{
		$pos = $this->find($widget);
		$this->items->remove($pos);
	}
	/**
	 * Remove item
	 */
	function removeItemByName($widget_name)
	{
		$pos = $this->findByName($widget_name);
		$this->items->remove($pos);
	}
	/**
	 * Returns button by index
	 */
	function get($index)
	{
		return $this->items->get($index);
	}
	/**
	 * Returns items count
	 */
	function count()
	{
		return $this->items->count();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->widget_name = "render_list";
		$this->component = "Runtime.Widget.RenderList";
		$this->items = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.RenderListModel";
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