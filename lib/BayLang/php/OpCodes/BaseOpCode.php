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
namespace BayLang\OpCodes;
class BaseOpCode extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	const op="";
	public $caret_start;
	public $caret_end;
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
		$serializer->process($this, "caret_start", $data);
		$serializer->process($this, "caret_end", $data);
	}
	/**
	 * Is multiline
	 */
	function isMultiLine()
	{
		if (!$this->caret_start)
		{
			return true;
		}
		if (!$this->caret_end)
		{
			return true;
		}
		return $this->caret_start->y != $this->caret_end->y;
	}
	/**
	 * Clone this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	function clone($obj=null)
	{
		if ($obj == null)
		{
			return $this;
		}
		$item = clone $this;
		$item->_assign_values($obj);
		return $item;
		return $this;
	}
	/**
	 * Copy this struct with new values
	 * @param Map obj = null
	 * @return BaseStruct
	 */
	function copy($obj=null)
	{
		return $this->clone($obj);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->caret_start = null;
		$this->caret_end = null;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.BaseOpCode";
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