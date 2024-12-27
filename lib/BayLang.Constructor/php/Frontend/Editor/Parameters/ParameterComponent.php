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
class ParameterComponent extends \BayLang\Constructor\Frontend\Editor\Parameters\Parameter
{
	public $op_code;
	/**
	 * Is op_code
	 */
	function isOpCode($op_code)
	{
		return $op_code instanceof \BayLang\OpCodes\OpHtmlAttribute && $this->name == $op_code->key;
	}
	/**
	 * Set op_code
	 */
	function setOpCode($op_code)
	{
		$this->op_code = $op_code;
		$this->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getValueFromOpCode($op_code->value);
	}
	/**
	 * Find code
	 */
	function findOpCode()
	{
		if ($this->op_code != null)
		{
			return ;
		}
		/* Find code */
		$this->op_code = $this->widget->code->attrs->findItem(\Runtime\lib::equalAttr("key", $this->name));
	}
	/**
	 * Create attribute
	 */
	function createHtmlAttribute()
	{
		if ($this->op_code != null)
		{
			return ;
		}
		$this->op_code = new \BayLang\OpCodes\OpHtmlAttribute(\Runtime\Map::from(["key"=>$this->name]));
		$this->widget->code->attrs->prepend($this->op_code);
	}
	/**
	 * Remove attribute
	 */
	function removeHtmlAttribute()
	{
		if ($this->op_code == null)
		{
			return ;
		}
		/* Clear code */
		$this->op_code = null;
		/* Remove attribute */
		$pos = $this->widget->code->attrs->find(\Runtime\lib::equalAttr("key", $this->name));
		if ($pos >= 0)
		{
			$this->widget->code->attrs->remove($pos);
		}
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		if ($value === "")
		{
			$this->removeHtmlAttribute();
			$this->value = "";
			return ;
		}
		/* Find item */
		$this->findOpCode();
		/* Create html attribute */
		if ($this->op_code == null)
		{
			$this->createHtmlAttribute();
		}
		/* Set value */
		$this->value = $value;
		$this->op_code->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getOpCodeByValue($value);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op_code = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.Parameter";
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