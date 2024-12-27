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
namespace Runtime\Entity;
class Provider extends \Runtime\Entity\Entity
{
	public $__value;
	public $__params;
	function __construct($name, $value=null, $params=null)
	{
		if ($value instanceof \Runtime\Dict)
		{
			$params = $value;
			$value = null;
		}
		if ($value == null)
		{
			$value = $name;
		}
		parent::__construct(\Runtime\Map::from(["name"=>$name,"value"=>$value,"params"=>$params]));
	}
	/**
	 * Create provider
	 */
	function createProvider()
	{
		$provider = null;
		$class_name = $this->value;
		if ($class_name == null)
		{
			$class_name = $this->name;
		}
		if ($class_name instanceof \Runtime\BaseProvider)
		{
			$provider = $class_name;
		}
		else if (\Runtime\rtl::isString($class_name))
		{
			$provider = \Runtime\rtl::newInstance($class_name, \Runtime\Vector::from([$this->params]));
		}
		return $provider;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__value = null;
		$this->__params = null;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "value")return $this->__value;
		else if ($k == "params")return $this->__params;
	}
	static function getNamespace()
	{
		return "Runtime.Entity";
	}
	static function getClassName()
	{
		return "Runtime.Entity.Provider";
	}
	static function getParentClassName()
	{
		return "Runtime.Entity.Entity";
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
		$a[]="value";
		$a[]="params";
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