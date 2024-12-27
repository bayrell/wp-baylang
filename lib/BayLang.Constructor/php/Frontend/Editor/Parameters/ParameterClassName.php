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
class ParameterClassName extends \BayLang\Constructor\Frontend\Editor\Parameters\ParameterComponent
{
	public $display;
	public $name;
	public $value;
	public $param_widget_name;
	/**
	 * Is op_code
	 */
	function isOpCode($op_attr)
	{
		return $op_attr->key == "class";
	}
	/**
	 * Set op_code
	 */
	function setOpCode($op_attr)
	{
		$class_name = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getValueFromOpCode($op_attr->value);
		$value = \Runtime\rs::split(" ", $class_name);
		$value = $value->filter(function ($s)
		{
			return $s != "";
		});
		$this->value = $value->slice(1);
		$this->op_attr = $op_attr;
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		/* Create html attribute */
		if ($this->op_attr == null)
		{
			$this->createHtmlAttribute();
		}
		/* Set value */
		$arr = \Runtime\Vector::from([$this->param_widget_name->value]);
		$arr->appendItems($value);
		$this->value = $arr->slice(1);
		$this->op_attr->value = \BayLang\Constructor\Frontend\Editor\Processor\CodeProcessor::getOpCodeByValue(\Runtime\rs::join(" ", $arr));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->display = false;
		$this->name = "class_name";
		$this->value = \Runtime\Vector::from([]);
		$this->param_widget_name = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterClassName";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent";
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