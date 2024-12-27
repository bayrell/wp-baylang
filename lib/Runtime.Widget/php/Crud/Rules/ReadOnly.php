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
class ReadOnly extends \Runtime\Widget\Crud\Rules\CrudRule
{
	public $__name;
	public $__can_create;
	public $__can_update;
	/**
	 * Validate item
	 */
	function validateItem($api, $data)
	{
		$pk = $api->pk;
		if ($api->pk == null && $this->can_create)
		{
			return $data;
		}
		if ($api->pk != null && $this->can_update)
		{
			return $data;
		}
		$data = $data->removeIm($this->name);
		return $data;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__name = "";
		$this->__can_create = false;
		$this->__can_update = false;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "name")return $this->__name;
		else if ($k == "can_create")return $this->__can_create;
		else if ($k == "can_update")return $this->__can_update;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Crud.Rules";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.Rules.ReadOnly";
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
		$a[]="can_create";
		$a[]="can_update";
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