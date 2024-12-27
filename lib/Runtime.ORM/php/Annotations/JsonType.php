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
class JsonType extends \Runtime\ORM\Annotations\BaseType
{
	/**
	 * Process item from database
	 */
	function fromDatabase($conn, $item)
	{
		if ($item->has($this->name))
		{
			$value = \Runtime\rtl::attr($item, $this->name);
			$obj = \Runtime\rtl::json_decode($value);
			$item = \Runtime\rtl::setAttr($item, [$this->name], $obj);
			$item = $conn->fromDatabase($this, $item, $this->name);
		}
		return $item;
	}
	/**
	 * Process item to database
	 */
	function toDatabase($conn, $item, $is_update)
	{
		$value = \Runtime\rtl::attr($item, $this->name);
		if ($value)
		{
			$item = \Runtime\rtl::setAttr($item, [$this->name], \Runtime\rtl::json_encode($value, false));
		}
		$item = $conn->toDatabase($this, $item, $this->name);
		return $item;
	}
	/* ======================= Class Init Functions ======================= */
	function takeValue($k,$d=null)
	{
	}
	static function getNamespace()
	{
		return "Runtime.ORM.Annotations";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Annotations.JsonType";
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