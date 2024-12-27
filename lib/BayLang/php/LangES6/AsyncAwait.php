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
namespace BayLang\LangES6;
class AsyncAwait extends \Runtime\BaseStruct
{
	public $__start_pos;
	public $__end_pos;
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__start_pos = "";
		$this->__end_pos = "";
	}
	function takeValue($k,$d=null)
	{
		if ($k == "start_pos")return $this->__start_pos;
		else if ($k == "end_pos")return $this->__end_pos;
	}
	static function getNamespace()
	{
		return "BayLang.LangES6";
	}
	static function getClassName()
	{
		return "BayLang.LangES6.AsyncAwait";
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
		$a[]="start_pos";
		$a[]="end_pos";
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