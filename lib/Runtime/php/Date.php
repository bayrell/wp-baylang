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
namespace Runtime;
class Date extends \Runtime\BaseObject implements \Runtime\StringInterface
{
	public $y;
	public $m;
	public $d;
	function __construct($data=null)
	{
		parent::__construct();
		if ($data != null)
		{
			if ($data->has("y"))
			{
				$this->y = $data->get("y");
			}
			if ($data->has("m"))
			{
				$this->m = $data->get("m");
			}
			if ($data->has("d"))
			{
				$this->d = $data->get("d");
			}
		}
	}
	/**
	 * toMap
	 */
	function toMap()
	{
		return \Runtime\Map::from(["y"=>$this->y,"m"=>$this->m,"d"=>$this->d]);
	}
	/**
	 * Return date
	 * @return string
	 */
	function getDate()
	{
		return $this->y . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($this->m) . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($this->d);
	}
	/**
	 * Normalize date time
	 */
	function normalize()
	{
		return $this;
	}
	/**
	 * Return db datetime
	 * @return string
	 */
	function toString()
	{
		return $this->y . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($this->m) . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($this->d);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->y = 0;
		$this->m = 0;
		$this->d = 0;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Date";
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