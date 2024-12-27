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
namespace BayLang\LangBay;
class ParserBay extends \BayLang\CoreParser
{
	public $__vars;
	public $__uses;
	public $__current_namespace;
	public $__current_class;
	public $__current_namespace_name;
	public $__current_class_name;
	public $__current_class_kind;
	public $__current_class_abstract;
	public $__current_class_declare;
	public $__find_identifier;
	public $__skip_comments;
	public $__pipe_kind;
	public $__is_pipe;
	public $__is_html;
	public $__is_local_css;
	public $__parser_base;
	public $__parser_expression;
	public $__parser_html;
	public $__parser_operator;
	public $__parser_preprocessor;
	public $__parser_program;
	/**
	 * Reset parser
	 */
	static function reset($parser)
	{
		return $parser->copy(\Runtime\Map::from(["vars"=>new \Runtime\Dict(),"uses"=>new \Runtime\Dict(),"caret"=>new \BayLang\Caret(\Runtime\Map::from([])),"token"=>null,"parser_base"=>new \BayLang\LangBay\ParserBayBase(),"parser_expression"=>new \BayLang\LangBay\ParserBayExpression(),"parser_html"=>new \BayLang\LangBay\ParserBayHtml(),"parser_operator"=>new \BayLang\LangBay\ParserBayOperator(),"parser_preprocessor"=>new \BayLang\LangBay\ParserBayPreprocessor(),"parser_program"=>new \BayLang\LangBay\ParserBayProgram()]));
	}
	/**
	 * Parse file and convert to BaseOpCode
	 */
	static function parse($parser, $content)
	{
		$parser = static::reset($parser);
		$parser = static::setContent($parser, $content);
		return $parser->parser_program::readProgram($parser);
	}
	/**
	 * Find module name
	 */
	static function findModuleName($parser, $module_name)
	{
		if ($module_name == "Collection")
		{
			return "Runtime.Collection";
		}
		else if ($module_name == "Dict")
		{
			return "Runtime.Dict";
		}
		else if ($module_name == "Map")
		{
			return "Runtime.Map";
		}
		else if ($module_name == "Vector")
		{
			return "Runtime.Vector";
		}
		else if ($module_name == "rs")
		{
			return "Runtime.rs";
		}
		else if ($module_name == "rtl")
		{
			return "Runtime.rtl";
		}
		else if ($module_name == "ArrayInterface")
		{
			return "";
		}
		else if ($parser->uses->has($module_name))
		{
			return $parser->uses->item($module_name);
		}
		return $module_name;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__vars = null;
		$this->__uses = null;
		$this->__current_namespace = null;
		$this->__current_class = null;
		$this->__current_namespace_name = "";
		$this->__current_class_name = "";
		$this->__current_class_kind = "";
		$this->__current_class_abstract = false;
		$this->__current_class_declare = false;
		$this->__find_identifier = true;
		$this->__skip_comments = true;
		$this->__pipe_kind = "";
		$this->__is_pipe = false;
		$this->__is_html = false;
		$this->__is_local_css = false;
		$this->__parser_base = null;
		$this->__parser_expression = null;
		$this->__parser_html = null;
		$this->__parser_operator = null;
		$this->__parser_preprocessor = null;
		$this->__parser_program = null;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "vars")return $this->__vars;
		else if ($k == "uses")return $this->__uses;
		else if ($k == "current_namespace")return $this->__current_namespace;
		else if ($k == "current_class")return $this->__current_class;
		else if ($k == "current_namespace_name")return $this->__current_namespace_name;
		else if ($k == "current_class_name")return $this->__current_class_name;
		else if ($k == "current_class_kind")return $this->__current_class_kind;
		else if ($k == "current_class_abstract")return $this->__current_class_abstract;
		else if ($k == "current_class_declare")return $this->__current_class_declare;
		else if ($k == "find_identifier")return $this->__find_identifier;
		else if ($k == "skip_comments")return $this->__skip_comments;
		else if ($k == "pipe_kind")return $this->__pipe_kind;
		else if ($k == "is_pipe")return $this->__is_pipe;
		else if ($k == "is_html")return $this->__is_html;
		else if ($k == "is_local_css")return $this->__is_local_css;
		else if ($k == "parser_base")return $this->__parser_base;
		else if ($k == "parser_expression")return $this->__parser_expression;
		else if ($k == "parser_html")return $this->__parser_html;
		else if ($k == "parser_operator")return $this->__parser_operator;
		else if ($k == "parser_preprocessor")return $this->__parser_preprocessor;
		else if ($k == "parser_program")return $this->__parser_program;
	}
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.ParserBay";
	}
	static function getParentClassName()
	{
		return "BayLang.CoreParser";
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
		$a[]="vars";
		$a[]="uses";
		$a[]="current_namespace";
		$a[]="current_class";
		$a[]="current_namespace_name";
		$a[]="current_class_name";
		$a[]="current_class_kind";
		$a[]="current_class_abstract";
		$a[]="current_class_declare";
		$a[]="find_identifier";
		$a[]="skip_comments";
		$a[]="pipe_kind";
		$a[]="is_pipe";
		$a[]="is_html";
		$a[]="is_local_css";
		$a[]="parser_base";
		$a[]="parser_expression";
		$a[]="parser_html";
		$a[]="parser_operator";
		$a[]="parser_preprocessor";
		$a[]="parser_program";
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