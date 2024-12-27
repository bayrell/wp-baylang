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
namespace Runtime\Widget\Tree;
class TreeItem extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	public $key;
	public $label;
	public $open;
	public $items;
	function __construct($params=null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "key", $data);
		$serializer->process($this, "label", $data);
		$serializer->process($this, "items", $data);
	}
	/**
	 * Returns true if can insert inside
	 */
	function canDragInside()
	{
		return true;
	}
	/**
	 * Get item
	 */
	function get($path)
	{
		if ($path == null)
		{
			return null;
		}
		if ($path->count() == 0)
		{
			return $this;
		}
		$pos = $path->first();
		$new_item = $this->items->get($pos);
		if ($new_item == null)
		{
			return null;
		}
		return $new_item->get($path->slice(1));
	}
	/**
	 * Find item position
	 */
	function find($item)
	{
		return ($item) ? ($this->items->find(\Runtime\lib::equal($item))) : (-1);
	}
	/**
	 * Context menu click
	 */
	function onContextMenu($model)
	{
	}
	/**
	 * Click
	 */
	function onClick($model)
	{
	}
	/**
	 * Select item
	 */
	function onSelect($model)
	{
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->key = "";
		$this->label = "";
		$this->open = true;
		$this->items = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Tree";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Tree.TreeItem";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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