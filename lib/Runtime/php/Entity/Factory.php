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
class Factory extends \Runtime\Entity\Entity
{
	public $__params;
	function __construct($name, $params=null)
	{
		parent::__construct(\Runtime\Map::from(["name"=>$name,"params"=>$params]));
	}
	/**
	 * Factory
	 */
	function factory()
	{
		return \Runtime\rtl::newInstance($this->name, \Runtime\Vector::from([$this->params]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__params = null;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "params")return $this->__params;
	}
	static function getNamespace()
	{
		return "Runtime.Entity";
	}
	static function getClassName()
	{
		return "Runtime.Entity.Factory";
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