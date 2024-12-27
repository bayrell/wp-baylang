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
class CoreToken extends \Runtime\BaseStruct
{
	public $__kind;
	public $__content;
	public $__caret_start;
	public $__caret_end;
	public $__eof;
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__kind = "";
		$this->__content = "";
		$this->__caret_start = null;
		$this->__caret_end = null;
		$this->__eof = false;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "kind")return $this->__kind;
		else if ($k == "content")return $this->__content;
		else if ($k == "caret_start")return $this->__caret_start;
		else if ($k == "caret_end")return $this->__caret_end;
		else if ($k == "eof")return $this->__eof;
	}
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.CoreToken";
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
		$a[]="kind";
		$a[]="content";
		$a[]="caret_start";
		$a[]="caret_end";
		$a[]="eof";
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