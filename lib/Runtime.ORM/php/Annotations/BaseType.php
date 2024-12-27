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
class BaseType extends \Runtime\BaseStruct
{
	public $__default;
	public $__table_name_source;
	public $__name;
	public $__comment;
	public $__nullable;
	/**
	 * Process item from database
	 */
	function fromDatabase($conn, $item)
	{
		if ($item->has($this->name))
		{
			$item = $conn->fromDatabase($this, $item, $this->name);
		}
		return $item;
	}
	/**
	 * Process item to database
	 */
	function toDatabase($conn, $item, $is_update)
	{
		if (!$is_update && $this->name != "" && $this->default !== null && !$item->has($this->name))
		{
			$item = \Runtime\rtl::setAttr($item, [$this->name], $this->default);
		}
		$item = $conn->toDatabase($this, $item, $this->name);
		return $item;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__default = null;
		$this->__table_name_source = "";
		$this->__name = "";
		$this->__comment = "";
		$this->__nullable = false;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "default")return $this->__default;
		else if ($k == "table_name_source")return $this->__table_name_source;
		else if ($k == "name")return $this->__name;
		else if ($k == "comment")return $this->__comment;
		else if ($k == "nullable")return $this->__nullable;
	}
	static function getNamespace()
	{
		return "Runtime.ORM.Annotations";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Annotations.BaseType";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseStruct";
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
		$a[]="default";
		$a[]="table_name_source";
		$a[]="name";
		$a[]="comment";
		$a[]="nullable";
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