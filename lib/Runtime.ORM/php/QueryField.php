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
namespace Runtime\ORM;
class QueryField extends \Runtime\BaseObject
{
	public $annotation;
	public $table_name;
	public $field_name;
	public $alias_name;
	function __construct($table_name="", $field_name="", $alias_name="")
	{
		$table_name = \Runtime\rs::trim($table_name);
		$field_name = \Runtime\rs::trim($field_name);
		$table_name = \Runtime\rs::trim($table_name);
		if ($table_name && $field_name)
		{
			$provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
			$this->annotation = $provider->getFieldType($table_name, $field_name);
		}
		$this->alias_name = $alias_name;
		$this->field_name = $field_name;
		$this->table_name = $table_name;
	}
	/**
	 * Returns row column name
	 */
	function getRowColumnName()
	{
		if ($this->alias_name != "")
		{
			return $this->alias_name;
		}
		return $this->field_name;
	}
	/**
	 * Create from string
	 */
	static function fromString($s)
	{
		$res1 = \Runtime\rs::split(" as ", $s);
		$res2 = \Runtime\rs::split(".", \Runtime\rtl::attr($res1, 0));
		$alias_name = ($res1->count() > 1) ? ($res1->get(1)) : ("");
		$field_name = ($res2->count() == 0) ? ($res2->get(0)) : ($res2->get(1));
		$table_name = ($res2->count() > 1) ? ($res2->get(0)) : ("");
		return new \Runtime\ORM\QueryField($table_name, $field_name, $alias_name);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->annotation = null;
		$this->table_name = "";
		$this->field_name = "";
		$this->alias_name = "";
	}
	static function getNamespace()
	{
		return "Runtime.ORM";
	}
	static function getClassName()
	{
		return "Runtime.ORM.QueryField";
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