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
namespace BayLang\LangPHP;
class TranslatorPHP extends \BayLang\CoreTranslator
{
	public $__is_pipe;
	public $__pipe_var_name;
	public $__html_var_name;
	public $__is_html;
	public $__expression;
	public $__html;
	public $__operator;
	public $__program;
	public $__frontend;
	public $__backend;
	public $__enable_context;
	public $__enable_check_types;
	public $__enable_introspection;
	/**
	 * Reset translator
	 */
	static function reset($t)
	{
		return $t->copy(\Runtime\Map::from(["value"=>"","current_namespace_name"=>"","modules"=>new \Runtime\Dict(),"expression"=>new \BayLang\LangPHP\TranslatorPHPExpression(),"html"=>new \BayLang\LangPHP\TranslatorPHPHtml(),"operator"=>new \BayLang\LangPHP\TranslatorPHPOperator(),"program"=>new \BayLang\LangPHP\TranslatorPHPProgram(),"save_vars"=>new \Runtime\Collection(),"save_op_codes"=>new \Runtime\Collection(),"save_op_code_inc"=>0,"preprocessor_flags"=>\Runtime\Map::from(["PHP"=>true,"FRONTEND"=>$t->frontend,"BACKEND"=>$t->backend,"ENABLE_CONTEXT"=>$t->enable_context,"ENABLE_CHECK_TYPES"=>$t->enable_check_types])]));
	}
	/**
	 * Translate BaseOpCode
	 */
	static function translate($t, $op_code)
	{
		$t = static::reset($t);
		return $t->program::translateProgram($t, $op_code);
	}
	/**
	 * Inc save op code
	 */
	static function nextSaveOpCode($t)
	{
		return "\$__v" . \Runtime\rtl::toStr($t->save_op_code_inc);
	}
	/**
	 * Output save op code content
	 */
	static function outputSaveOpCode($t, $save_op_code_value=0)
	{
		$content = "";
		for ($i = 0; $i < $t->save_op_codes->count(); $i++)
		{
			if ($i < $save_op_code_value)
			{
				continue;
			}
			$save = $t->save_op_codes->item($i);
			$s = ($save->content == "") ? ($t->s($save->var_name . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($save->var_content) . \Runtime\rtl::toStr(";"))) : ($save->content);
			$content .= \Runtime\rtl::toStr($s);
		}
		return $content;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__is_pipe = false;
		$this->__pipe_var_name = "";
		$this->__html_var_name = "";
		$this->__is_html = false;
		$this->__expression = null;
		$this->__html = null;
		$this->__operator = null;
		$this->__program = null;
		$this->__frontend = false;
		$this->__backend = true;
		$this->__enable_context = false;
		$this->__enable_check_types = false;
		$this->__enable_introspection = true;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "is_pipe")return $this->__is_pipe;
		else if ($k == "pipe_var_name")return $this->__pipe_var_name;
		else if ($k == "html_var_name")return $this->__html_var_name;
		else if ($k == "is_html")return $this->__is_html;
		else if ($k == "expression")return $this->__expression;
		else if ($k == "html")return $this->__html;
		else if ($k == "operator")return $this->__operator;
		else if ($k == "program")return $this->__program;
		else if ($k == "frontend")return $this->__frontend;
		else if ($k == "backend")return $this->__backend;
		else if ($k == "enable_context")return $this->__enable_context;
		else if ($k == "enable_check_types")return $this->__enable_check_types;
		else if ($k == "enable_introspection")return $this->__enable_introspection;
	}
	static function getNamespace()
	{
		return "BayLang.LangPHP";
	}
	static function getClassName()
	{
		return "BayLang.LangPHP.TranslatorPHP";
	}
	static function getParentClassName()
	{
		return "BayLang.CoreTranslator";
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
		$a[]="is_pipe";
		$a[]="pipe_var_name";
		$a[]="html_var_name";
		$a[]="is_html";
		$a[]="expression";
		$a[]="html";
		$a[]="operator";
		$a[]="program";
		$a[]="frontend";
		$a[]="backend";
		$a[]="enable_context";
		$a[]="enable_check_types";
		$a[]="enable_introspection";
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