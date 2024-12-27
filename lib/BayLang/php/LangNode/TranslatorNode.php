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
namespace BayLang\LangNode;
class TranslatorNode extends \BayLang\LangES6\TranslatorES6
{
	public $__async_await;
	public $__expression;
	public $__html;
	public $__operator;
	public $__program;
	public $__use_module_name;
	public $__enable_async_await;
	public $__emulate_async_await;
	public $__enable_introspection;
	public $__enable_context;
	/**
	 * Reset translator
	 */
	static function reset($t)
	{
		$t = parent::reset($t);
		$t = \Runtime\rtl::setAttr($t, ["expression"], new \BayLang\LangNode\TranslatorNodeExpression());
		$t = \Runtime\rtl::setAttr($t, ["program"], new \BayLang\LangNode\TranslatorNodeProgram());
		$t = \Runtime\rtl::setAttr($t, ["preprocessor_flags"], $t->preprocessor_flags->concat(\Runtime\Map::from(["BACKEND"=>true,"NODEJS"=>true,"ES6"=>false])));
		return $t;
	}
	/**
	 * Translate BaseOpCode
	 */
	static function translate($t, $op_code)
	{
		return $t->program::translateProgram($t, $op_code);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__async_await = null;
		$this->__expression = null;
		$this->__html = null;
		$this->__operator = null;
		$this->__program = null;
		$this->__use_module_name = true;
		$this->__enable_async_await = true;
		$this->__emulate_async_await = false;
		$this->__enable_introspection = false;
		$this->__enable_context = true;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "async_await")return $this->__async_await;
		else if ($k == "expression")return $this->__expression;
		else if ($k == "html")return $this->__html;
		else if ($k == "operator")return $this->__operator;
		else if ($k == "program")return $this->__program;
		else if ($k == "use_module_name")return $this->__use_module_name;
		else if ($k == "enable_async_await")return $this->__enable_async_await;
		else if ($k == "emulate_async_await")return $this->__emulate_async_await;
		else if ($k == "enable_introspection")return $this->__enable_introspection;
		else if ($k == "enable_context")return $this->__enable_context;
	}
	static function getNamespace()
	{
		return "BayLang.LangNode";
	}
	static function getClassName()
	{
		return "BayLang.LangNode.TranslatorNode";
	}
	static function getParentClassName()
	{
		return "BayLang.LangES6.TranslatorES6";
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
		$a[]="async_await";
		$a[]="expression";
		$a[]="html";
		$a[]="operator";
		$a[]="program";
		$a[]="use_module_name";
		$a[]="enable_async_await";
		$a[]="emulate_async_await";
		$a[]="enable_introspection";
		$a[]="enable_context";
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