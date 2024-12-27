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
class Parameter extends \Runtime\BaseObject
{
	public $name;
	public $label;
	public $component;
	public $tab;
	public $display;
	public $value;
	public $default;
	public $props;
	public $op_code;
	public $widget;
	function __construct($params=null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	/**
	 * Init parameter
	 */
	function init()
	{
		if ($this->default == null)
		{
			return ;
		}
		if ($this->value != null)
		{
			return ;
		}
		$this->setValue($this->default);
	}
	/**
	 * Is op_code
	 */
	function isOpCode($op_code)
	{
		return false;
	}
	/**
	 * Set op_code
	 */
	function setOpCode($op_code)
	{
		$this->op_code = $op_code;
	}
	/**
	 * Set value
	 */
	function setValue($value)
	{
		$this->value = $value;
	}
	/**
	 * Change param
	 */
	function changeValue($value)
	{
		$this->setValue($value);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->name = "";
		$this->label = "";
		$this->component = "";
		$this->tab = "params";
		$this->display = true;
		$this->value = null;
		$this->default = null;
		$this->props = null;
		$this->op_code = null;
		$this->widget = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Parameters.Parameter";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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