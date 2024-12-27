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
namespace BayLang;
class SaveOpCode extends \Runtime\BaseStruct
{
	public $__var_name;
	public $__var_content;
	public $__content;
	public $__op_code;
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__var_name = "";
		$this->__var_content = "";
		$this->__content = "";
		$this->__op_code = null;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "var_name")return $this->__var_name;
		else if ($k == "var_content")return $this->__var_content;
		else if ($k == "content")return $this->__content;
		else if ($k == "op_code")return $this->__op_code;
	}
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.SaveOpCode";
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
		$a[]="var_name";
		$a[]="var_content";
		$a[]="content";
		$a[]="op_code";
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