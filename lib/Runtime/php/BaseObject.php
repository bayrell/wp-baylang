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
class BaseObject
{
	function __construct()
	{
		/* Init object */
		$this->_init();
	}
	/**
	 * Init function
	 */
	function _init()
	{
	}
	/**
	 * Init struct data
	 */
	function _changes($changes)
	{
	}
	/**
	 * Assign new values
	 */
	function _assign_values($changes=null)
	{
		if (gettype($changes) == "array")
		{
			$changes = new \Runtime\Map($changes);
		}
		if ($changes == null)
		{
			return ;
		}
		if ($changes->keys()->count() == 0)
		{
			return ;
		}
		if (!($changes instanceof \Runtime\Map))
		{
			$changes = $changes->toMap();
		}
		$this->_changes($changes);
		if ($changes instanceof \Runtime\Dict) $changes = $changes->_map;
		if (gettype($changes) == "array")
		{
			foreach ($changes as $key => $value)
			{
				$k = $this->__getKey($key);
				if (property_exists($this, $k))
				{
					$this->$k = $value;
				}
			}
		}
	}
	function __getKey($k){return $k;}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.BaseObject";
	}
	static function getParentClassName()
	{
		return "";
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