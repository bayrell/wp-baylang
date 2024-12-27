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
class TranslatorBayProgram extends \Runtime\BaseObject
{
	public $translator;
	function __construct($translator)
	{
		parent::__construct();
		$this->translator = $translator;
	}
	/**
	 * OpNamespace
	 */
	function OpNamespace($op_code, $result)
	{
		$result->push("namespace ");
		$result->push($op_code->name);
		$result->push(";");
		$result->push($this->translator->newLine());
	}
	/**
	 * OpUse
	 */
	function OpUse($op_code, $result)
	{
		$items = \Runtime\rs::split(".", $op_code->name);
		$last_name = $items->last();
		$result->push("use ");
		$result->push($op_code->name);
		if ($op_code->alias != "" && $op_code->alias != $last_name)
		{
			$result->push(" as ");
			$result->push($op_code->alias);
		}
		$result->push(";");
	}
	/**
	 * OpAnnotation
	 */
	function OpAnnotation($op_code, $result)
	{
		$result->push("@");
		$this->translator->expression->OpTypeIdentifier($op_code->name, $result);
		$this->translator->expression->OpDict($op_code->params, $result);
	}
	/**
	 * OpAssign
	 */
	function OpAssign($op_code, $result)
	{
		$this->translator->operator->OpAssign($op_code, $result);
		$result->push(";");
	}
	/**
	 * OpDeclareFunctionArg
	 */
	function OpDeclareFunctionArg($op_code, $result)
	{
		$this->translator->expression->OpTypeIdentifier($op_code->pattern, $result);
		$result->push(" ");
		$result->push($op_code->name);
		if ($op_code->expression)
		{
			$result->push(" = ");
			$this->translator->expression->translate($op_code->expression, $result);
		}
	}
	/**
	 * OpDeclareFunctionArgs
	 */
	function OpDeclareFunctionArgs($op_code, $result)
	{
		if ($op_code->args && $op_code->args->count() > 0)
		{
			$args_count = $op_code->args->count();
			for ($i = 0; $i < $args_count; $i++)
			{
				$op_code_item = $op_code->args->get($i);
				$this->OpDeclareFunctionArg($op_code_item, $result);
				if ($i < $args_count - 1)
				{
					$result->push(", ");
				}
			}
		}
	}
	/**
	 * OpDeclareFunction
	 */
	function OpDeclareFunction($op_code, $result)
	{
		if (!($op_code->result_type instanceof \BayLang\OpCodes\OpTypeIdentifier))
		{
			return ;
		}
		/* Function flags */
		$flags = \Runtime\Vector::from(["async","static","pure"]);
		$flags = $flags->filter(function ($flag_name) use (&$op_code)
		{
			return $op_code->flags->isFlag($flag_name);
		});
		$result->push(\Runtime\rs::join(" ", $flags));
		if ($flags->count() > 0)
		{
			$result->push(" ");
		}
		/* Function result type */
		$this->translator->expression->OpTypeIdentifier($op_code->result_type, $result);
		/* Function name */
		$result->push(" ");
		$result->push($op_code->name);
		/* Arguments */
		$result->push("(");
		$this->OpDeclareFunctionArgs($op_code, $result);
		$result->push(")");
		/* Expression */
		if ($op_code->expression)
		{
			$is_multiline = $op_code->expression->isMultiLine();
			if ($is_multiline)
			{
				$result->push(" =>");
				$result->push($this->translator->newLine());
			}
			else
			{
				$result->push(" => ");
			}
			$this->translator->expression->translate($op_code->expression, $result);
			$result->push(";");
		}
		else if ($op_code->items)
		{
			if ($op_code->items->items->count() > 0)
			{
				$result->push($this->translator->newLine());
			}
			$this->translator->operator->translateItems($op_code->items, $result);
		}
	}
	/**
	 * Translate class item
	 */
	function translateClassItem($op_code, $result)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpAnnotation)
		{
			$this->OpAnnotation($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpAssign)
		{
			$this->OpAssign($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpDeclareFunction)
		{
			$this->OpDeclareFunction($op_code, $result);
		}
		else
		{
			return false;
		}
		return true;
	}
	/**
	 * Translate class body
	 */
	function translateClassBody($op_code, $result)
	{
		/* Begin bracket */
		$result->push("{");
		$this->translator->levelInc();
		/* Class body items */
		$next_new_line = true;
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			if ($next_new_line)
			{
				$result->push($this->translator->newLine());
			}
			$op_code_item = $op_code->items->get($i);
			$next_new_line = $this->translateClassItem($op_code_item, $result);
		}
		/* End bracket */
		$this->translator->levelDec();
		$result->push($this->translator->newLine());
		$result->push("}");
	}
	/**
	 * Translate class
	 */
	function translateClass($op_code, $result)
	{
		if ($op_code->kind == \BayLang\OpCodes\OpDeclareClass::KIND_CLASS)
		{
			$result->push("class ");
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			$result->push("interface ");
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT)
		{
			$result->push("struct ");
		}
		/* Class name */
		$result->push($op_code->name);
		/* Template */
		if ($op_code->template)
		{
			$this->translator->expression->OpTypeTemplate($op_code->template, $result);
		}
		/* Extends */
		if ($op_code->class_extends)
		{
			$result->push(" extends ");
			$this->translator->expression->OpTypeIdentifier($op_code->class_extends, $result);
		}
		/* Implements */
		if ($op_code->class_implements)
		{
			$result->push(" implements ");
			$items_count = $op_code->class_implements->count();
			for ($i = 0; $i < $items_count; $i++)
			{
				$op_code_item = $op_code->class_implements->get($i);
				$this->translator->expression->OpTypeIdentifier($op_code_item, $result);
				if ($i < $items_count - 1)
				{
					$result->push(", ");
				}
			}
		}
		$result->push($this->translator->newLine());
		$this->translateClassBody($op_code, $result);
	}
	/**
	 * Translate item
	 */
	function translateItem($op_code, $result)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpDeclareClass)
		{
			$this->translateClass($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpNamespace)
		{
			$this->OpNamespace($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpUse)
		{
			$this->OpUse($op_code, $result);
		}
	}
	/**
	 * Translate items
	 */
	function translateItems($items, $result)
	{
		$op_code_use_count = 0;
		$prev_op_code_use = false;
		for ($i = 0; $i < $items->count(); $i++)
		{
			$op_code_item = $items->get($i);
			if ($i > 0)
			{
				$result->push($this->translator->newLine());
			}
			if ($op_code_item instanceof \BayLang\OpCodes\OpDeclareClass && $op_code_use_count > 0)
			{
				$result->push($this->translator->newLine());
				if ($op_code_use_count > 1)
				{
					$result->push($this->translator->newLine());
				}
			}
			if ($op_code_item instanceof \BayLang\OpCodes\OpUse)
			{
				$op_code_use_count++;
			}
			else
			{
				$op_code_use_count = 0;
			}
			$this->translateItem($items->get($i), $result);
		}
	}
	/**
	 * Translate
	 */
	function translate($op_code, $result)
	{
		$this->translateItems($op_code->items, $result);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->translator = null;
	}
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.TranslatorBayProgram";
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