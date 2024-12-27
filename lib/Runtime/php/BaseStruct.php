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
class BaseStruct extends \Runtime\BaseObject
{
	function __construct($obj=null)
	{
		parent::__construct();
		$this->_assign_values($obj);
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
	/**
	 * Returns new instance
	 */
	static function newInstance($items)
	{
		$class_name = static::class;
		return new $class_name($items);
	}
	/**
	 * Returns struct as Map
	 * @return Map
	 */
	function toMap()
	{
		$values = new \Runtime\Map();
		$names = \Runtime\rtl::getFields(static::getClassName());
		for ($i = 0; $i < $names->count(); $i++)
		{
			$variable_name = $names->item($i);
			$value = $this->get($variable_name, null);
			$values->set($variable_name, $value);
		}
		return $values;
	}
	function assignError($k){throw new \Runtime\Exceptions\RuntimeException("Assign key '" . $k . "' failed");}
	function get($k,$v = null){$k="__".$k;return isset($this->$k)?$this->$k:$v;}
	function __get($k){$k="__".$k;return isset($this->$k)?$this->$k:null;}
	function __getKey($k){return "__".$k;}
	function __set($k,$v){$this->assignError($k);}
	function offsetExists($k){$k="__".$k;return isset($this->$k);}
	function offsetGet($k){$k="__".$k;return isset($this->$k)?$this->$k:null;}
	function offsetSet($k,$v){$this->assignError($k);}
	function offsetUnset($k){$this->assignError($k);}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.BaseStruct";
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