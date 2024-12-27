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
namespace Runtime\ORM\Annotations;
class DateType extends \Runtime\ORM\Annotations\BaseType
{
	public $__tz;
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__tz = "UTC";
	}
	function takeValue($k,$d=null)
	{
		if ($k == "tz")return $this->__tz;
	}
	static function getNamespace()
	{
		return "Runtime.ORM.Annotations";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Annotations.DateType";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.Annotations.BaseType";
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
		$a[]="tz";
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