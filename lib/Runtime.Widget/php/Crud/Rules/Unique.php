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
namespace Runtime\Widget\Crud\Rules;
class Unique extends \Runtime\Widget\Crud\Rules\CrudRule
{
	public $__keys;
	/**
	 * Before save item
	 */
	function onSaveBefore($api)
	{
		$q = (new \Runtime\ORM\Query())->select()->from($api->getTableName())->addRawField("count(1) as c");
		/* Add filter */
		if ($this->keys)
		{
			for ($i = 0; $i < $this->keys->count(); $i++)
			{
				$field_name = $this->keys->get($i);
				$value = $api->item->get($field_name);
				$q->where($field_name, "=", $value);
			}
		}
		/* Add primary key */
		if ($api->item != null && !$api->item->isNew())
		{
			$filter = \Runtime\ORM\Relation::getPrimaryFilter($api->getTableName(), $api->item->toMap(), true);
			for ($i = 0; $i < $filter->count(); $i++)
			{
				$item = \Runtime\rtl::attr($filter, $i);
				$item->op = "!=";
				$q->addFilter($item);
			}
		}
		/* Execute query */
		$connection = $api->getConnection();
		$res = $connection->fetchVar($q, "c");
		if ($res > 0)
		{
			for ($i = 0; $i < $this->keys->count(); $i++)
			{
				$name = $this->keys->get($i);
				$api->fields->addFieldError($name, "Field must be unique");
			}
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__keys = null;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "keys")return $this->__keys;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Crud.Rules";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.Rules.Unique";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.Rules.CrudRule";
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
		$a[]="keys";
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