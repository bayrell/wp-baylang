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
class TranslatorES6 extends \BayLang\CoreTranslator
{
	public $__is_pipe;
	public $__is_call;
	public $__pipe_var_name;
	public $__html_var_name;
	public $__is_html;
	public $__async_await;
	public $__expression;
	public $__html;
	public $__operator;
	public $__program;
	public $__debug_component;
	public $__frontend;
	public $__backend;
	public $__use_module_name;
	public $__use_strict;
	public $__enable_async_await;
	public $__emulate_async_await;
	public $__enable_context;
	public $__enable_check_types;
	public $__enable_introspection;
	/**
	 * Returns true if emulate async await
	 */
	function isEmulateAsyncAwait()
	{
		return $this->enable_async_await && $this->emulate_async_await;
	}
	/**
	 * Returns true if async await
	 */
	function isAsyncAwait()
	{
		return $this->enable_async_await && !$this->emulate_async_await;
	}
	/**
	 * Reset translator
	 */
	static function reset($t)
	{
		return $t->copy(\Runtime\Map::from(["value"=>"","current_namespace_name"=>"","debug_component"=>\Runtime\Vector::from([]),"modules"=>new \Runtime\Dict(),"async_await"=>new \BayLang\LangES6\TranslatorES6AsyncAwait(),"expression"=>new \BayLang\LangES6\TranslatorES6Expression(),"html"=>new \BayLang\LangES6\TranslatorES6Html(),"operator"=>new \BayLang\LangES6\TranslatorES6Operator(),"program"=>new \BayLang\LangES6\TranslatorES6Program(),"save_vars"=>new \Runtime\Collection(),"save_op_codes"=>new \Runtime\Collection(),"save_op_code_inc"=>0,"preprocessor_flags"=>\Runtime\Map::from(["ES6"=>true,"JAVASCRIPT"=>true,"FRONTEND"=>$t->frontend,"BACKEND"=>$t->backend,"USE_MODULE_NAME"=>$t->use_module_name,"USE_STRICT"=>$t->use_strict,"ENABLE_ASYNC_AWAIT"=>$t->enable_async_await,"EMULATE_ASYNC_AWAIT"=>$t->emulate_async_await,"ENABLE_CONTEXT"=>$t->enable_context,"ENABLE_CHECK_TYPES"=>$t->enable_check_types])]));
	}
	/**
	 * Translate BaseOpCode
	 */
	static function translate($t, $op_code)
	{
		return $t->program::translateProgram($t, $op_code);
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
			$s = "";
			if ($t->is_html)
			{
				$s = ($save->content == "") ? ($t->s("let " . \Runtime\rtl::toStr($save->var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($save->var_content) . \Runtime\rtl::toStr(";"))) : ($save->content);
			}
			else
			{
				$s = ($save->content == "") ? ($t->s("var " . \Runtime\rtl::toStr($save->var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($save->var_content) . \Runtime\rtl::toStr(";"))) : ($save->content);
			}
			$content .= \Runtime\rtl::toStr($s);
		}
		return $content;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__is_pipe = false;
		$this->__is_call = false;
		$this->__pipe_var_name = "";
		$this->__html_var_name = "";
		$this->__is_html = false;
		$this->__async_await = null;
		$this->__expression = null;
		$this->__html = null;
		$this->__operator = null;
		$this->__program = null;
		$this->__debug_component = null;
		$this->__frontend = true;
		$this->__backend = false;
		$this->__use_module_name = false;
		$this->__use_strict = true;
		$this->__enable_async_await = true;
		$this->__emulate_async_await = false;
		$this->__enable_context = false;
		$this->__enable_check_types = false;
		$this->__enable_introspection = true;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "is_pipe")return $this->__is_pipe;
		else if ($k == "is_call")return $this->__is_call;
		else if ($k == "pipe_var_name")return $this->__pipe_var_name;
		else if ($k == "html_var_name")return $this->__html_var_name;
		else if ($k == "is_html")return $this->__is_html;
		else if ($k == "async_await")return $this->__async_await;
		else if ($k == "expression")return $this->__expression;
		else if ($k == "html")return $this->__html;
		else if ($k == "operator")return $this->__operator;
		else if ($k == "program")return $this->__program;
		else if ($k == "debug_component")return $this->__debug_component;
		else if ($k == "frontend")return $this->__frontend;
		else if ($k == "backend")return $this->__backend;
		else if ($k == "use_module_name")return $this->__use_module_name;
		else if ($k == "use_strict")return $this->__use_strict;
		else if ($k == "enable_async_await")return $this->__enable_async_await;
		else if ($k == "emulate_async_await")return $this->__emulate_async_await;
		else if ($k == "enable_context")return $this->__enable_context;
		else if ($k == "enable_check_types")return $this->__enable_check_types;
		else if ($k == "enable_introspection")return $this->__enable_introspection;
	}
	static function getNamespace()
	{
		return "BayLang.LangES6";
	}
	static function getClassName()
	{
		return "BayLang.LangES6.TranslatorES6";
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
		$a[]="is_call";
		$a[]="pipe_var_name";
		$a[]="html_var_name";
		$a[]="is_html";
		$a[]="async_await";
		$a[]="expression";
		$a[]="html";
		$a[]="operator";
		$a[]="program";
		$a[]="debug_component";
		$a[]="frontend";
		$a[]="backend";
		$a[]="use_module_name";
		$a[]="use_strict";
		$a[]="enable_async_await";
		$a[]="emulate_async_await";
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