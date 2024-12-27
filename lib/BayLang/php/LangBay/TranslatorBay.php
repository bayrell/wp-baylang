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
class TranslatorBay extends \Runtime\BaseObject
{
	public $opcode_level;
	public $indent_level;
	public $indent;
	public $crlf;
	public $preprocessor_flags;
	public $expression;
	public $operator;
	public $program;
	public $html;
	/**
	 * Reset translator
	 */
	function reset()
	{
		$this->opcode_level = 0;
		$this->indent_level = 0;
		$this->preprocessor_flags = \Runtime\Map::from([]);
	}
	/**
	 * Set flag
	 */
	function setFlag($flag_name, $value)
	{
		$this->preprocessor_flags->set($flag_name, $value);
		return $this;
	}
	/**
	 * Increment indent level
	 */
	function levelInc()
	{
		$this->indent_level = $this->indent_level + 1;
	}
	/**
	 * Decrease indent level
	 */
	function levelDec()
	{
		$this->indent_level = $this->indent_level - 1;
	}
	/**
	 * Returns new line with indent
	 */
	function newLine()
	{
		return $this->crlf . \Runtime\rtl::toStr(\Runtime\rs::str_repeat($this->indent, $this->indent_level));
	}
	/**
	 * Returns string
	 */
	function toString($s)
	{
		$s = \Runtime\re::replace("\\\\", "\\\\", $s);
		$s = \Runtime\re::replace("\"", "\\\"", $s);
		$s = \Runtime\re::replace("\n", "\\n", $s);
		$s = \Runtime\re::replace("\r", "\\r", $s);
		$s = \Runtime\re::replace("\t", "\\t", $s);
		return "\"" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr("\"");
	}
	/**
	 * Translate BaseOpCode
	 */
	static function translate($t, $op_code)
	{
		$content = \Runtime\Vector::from([]);
		if ($op_code->is_component)
		{
			$t->html->translate($op_code, $content);
		}
		else
		{
			$t->program->translate($op_code, $content);
		}
		$result = \Runtime\rs::join("", $content);
		return \Runtime\Vector::from([$t,$result]);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->opcode_level = 0;
		$this->indent_level = 0;
		$this->indent = "\t";
		$this->crlf = "\n";
		$this->preprocessor_flags = \Runtime\Map::from([]);
		$this->expression = new \BayLang\LangBay\TranslatorBayExpression($this);
		$this->operator = new \BayLang\LangBay\TranslatorBayOperator($this);
		$this->program = new \BayLang\LangBay\TranslatorBayProgram($this);
		$this->html = new \BayLang\LangBay\TranslatorBayHtml($this);
	}
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.TranslatorBay";
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