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
class Map extends \Runtime\Dict
{
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static function Instance($val=null)
	{
		return new \Runtime\Map($val);
	}
	/**
	 * Set value size_to position
	 * @param string key - position
	 * @param T value 
	 * @return self
	 */
	function set($key, $value)
	{
		$key = rtl::toStr($key);
		$this->_map[$key] = $value;
		return $this;
	}
	/**
	 * Remove value from position
	 * @param string key
	 * @return self
	 */
	function remove($key)
	{
		$key = rtl::toStr($key);
		if (isset($this->_map[$key]))
			unset($this->_map[$key]);
		return $this;
	}
	/**
	 * Clear all values from vector
	 * @return self
	 */
	function clear()
	{
		$this->_map = [];
		return $this;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Map";
	}
	static function getParentClassName()
	{
		return "Runtime.Dict";
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