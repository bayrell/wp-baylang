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
class Required extends \Runtime\Widget\Crud\Rules\CrudRule
{
	public $__name;
	public $__check_create;
	public $__check_update;
	/**
	 * Validate item
	 */
	function validateItem($api, $data)
	{
		if ($api->pk == null && !$this->check_create)
		{
			return $data;
		}
		if ($api->pk != null && !$this->check_update)
		{
			return $data;
		}
		$value = \Runtime\rtl::attr($data, $this->name);
		if (!$data->has($this->name) || $value === "" || $value === null)
		{
			$api->fields->addFieldError($this->name, "Field is required");
		}
		return $data;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__name = "";
		$this->__check_create = true;
		$this->__check_update = true;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "name")return $this->__name;
		else if ($k == "check_create")return $this->__check_create;
		else if ($k == "check_update")return $this->__check_update;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Crud.Rules";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.Rules.Required";
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
		$a[]="name";
		$a[]="check_create";
		$a[]="check_update";
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