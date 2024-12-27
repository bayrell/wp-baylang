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
namespace BayLang\Constructor\Frontend\Editor\Parameters;
class ParameterFactoryModel extends \BayLang\Constructor\Frontend\Editor\Parameters\ParameterModel
{
	public $path;
	/**
	 * Find OpDictPair by path
	 */
	function getCode()
	{
		$op_code = $this->op_code->value;
		if (!($op_code instanceof \BayLang\OpCodes\OpNew))
		{
			return ;
		}
		if ($op_code->args->count() != 2)
		{
			return ;
		}
		$op_code_params = $op_code->args->get(1);
		if (!($op_code_params instanceof \BayLang\OpCodes\OpDict))
		{
			return ;
		}
		$op_code_api_name = $op_code_params->values->findItem(\Runtime\lib::equalAttr("api_name"));
		if (!$op_code_api_name)
		{
			return ;
		}
		return $op_code_api_name;
	}
	/**
	 * Set op_code
	 */
	function setOpCode($op_dict_pair)
	{
		$this->op_code = $op_dict_pair;
		$code = $this->getCode();
		if ($code)
		{
			$this->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getValueFromOpCode($code->value);
		}
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		$this->value = $value;
		$code = $this->getCode();
		if ($code)
		{
			$code->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getOpCodeByValue($value);
		}
	}
	/**
	 * Update model value
	 */
	function updateModelValue($model)
	{
		$name = $this->name;
		$path = $this->path;
		$value = $this->value;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->path = "";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel";
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