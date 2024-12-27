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
class ForeignKey extends \Runtime\BaseStruct
{
	public $__name;
	public $__table_name;
	public $__table_name_source;
	public $__primary_key;
	public $__foreign_key;
	/**
	 * Build search query
	 */
	function buildSearchQuery($kind, $conn, $q)
	{
		return $q;
	}
	/**
	 * Build query for resolve foreign key
	 */
	function resolveQuery($conn, $items)
	{
		$ids = $items->map(function ($item)
		{
			return $item->get($this->foreign_key);
		})->removeDuplicates();
		$__v0 = new \Runtime\Monad(new \Runtime\ORM\Query());
		$__v0 = $__v0->callMethod("select", [$this->table_name]);
		$__v0 = $__v0->callMethod("where", [$this->table_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($this->primary_key), "=", $ids]);
		$q = $__v0->value();
		/* Filter */
		$q = $this->buildSearchQuery("resolve", $conn, $q);
		return $q;
	}
	/**
	 * Resolve foreign key
	 */
	function resolve($conn, $items)
	{
		$q = static::resolveQuery($conn, $items);
		$result = $conn->fetchAll($q);
		return $result;
	}
	/**
	 * Build query for reverse resolve foreign key
	 */
	function resolveReverseQuery($conn, $items)
	{
		$ids = $items->map(function ($item)
		{
			return $item->get($this->primary_key);
		})->removeDuplicates();
		$__v0 = new \Runtime\Monad(new \Runtime\ORM\Query());
		$__v0 = $__v0->callMethod("select", [$this->table_name_source]);
		$__v0 = $__v0->callMethod("where", [$this->table_name_source . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($this->foreign_key), "=", $ids]);
		$q = $__v0->value();
		/* Filter */
		$q = $this->buildSearchQuery("resolveReverse", $conn, $q);
		return $q;
	}
	/**
	 * Reverse resolve foreign key
	 */
	function resolveReverse($conn, $items)
	{
		$q = static::resolveReverseQuery($conn, $items);
		$result = $conn->fetchAll($q);
		return $result;
	}
	/**
	 * Resolve all
	 */
	function resolveAll($conn)
	{
		$__v0 = new \Runtime\Monad(new \Runtime\ORM\Query());
		$__v0 = $__v0->callMethod("select", [$this->table_name]);
		$q = $__v0->value();
		/* Filter */
		$q = $this->buildSearchQuery("resolveAll", $conn, $q);
		$result = $conn->fetchAll($q);
		return $result;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__name = "";
		$this->__table_name = "";
		$this->__table_name_source = "";
		$this->__primary_key = null;
		$this->__foreign_key = null;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "name")return $this->__name;
		else if ($k == "table_name")return $this->__table_name;
		else if ($k == "table_name_source")return $this->__table_name_source;
		else if ($k == "primary_key")return $this->__primary_key;
		else if ($k == "foreign_key")return $this->__foreign_key;
	}
	static function getNamespace()
	{
		return "Runtime.ORM.Annotations";
	}
	static function getClassName()
	{
		return "Runtime.ORM.Annotations.ForeignKey";
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
		$a[]="name";
		$a[]="table_name";
		$a[]="table_name_source";
		$a[]="primary_key";
		$a[]="foreign_key";
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