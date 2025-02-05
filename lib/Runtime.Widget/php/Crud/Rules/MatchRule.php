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
class MatchRule extends \Runtime\Widget\Crud\Rules\BaseRule
{
	const ALPHA_NUMERIC="^[0-9a-zA-Z]*\$";
	const ALPHA_NUMERIC_DASH="^[0-9a-zA-Z\\_\\-]*\$";
	public $__name;
	public $__regular;
	public $__pattern;
	/**
	 * Validate item
	 */
	function validate($rules, $data)
	{
		$value = \Runtime\rtl::attr($data, $this->name);
		if ($value == "")
		{
			return true;
		}
		/* Match string */
		$check = \Runtime\re::match($this->regular, $value, $this->pattern);
		if (!$check)
		{
			$rules->addFieldError($this->name, "The field contains invalid characters");
			return false;
		}
		return true;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__name = "";
		$this->__regular = "^\$";
		$this->__pattern = "";
	}
	function takeValue($k,$d=null)
	{
		if ($k == "name")return $this->__name;
		else if ($k == "regular")return $this->__regular;
		else if ($k == "pattern")return $this->__pattern;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Crud.Rules";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.Rules.MatchRule";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.Rules.BaseRule";
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
		$a[]="regular";
		$a[]="pattern";
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