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
class TranslatorBayOperator extends \Runtime\BaseObject
{
	public $translator;
	function __construct($translator)
	{
		parent::__construct();
		$this->translator = $translator;
	}
	/**
	 * OpAssign
	 */
	function OpAssign($op_code, $result)
	{
		if ($op_code->pattern)
		{
			$this->translator->expression->OpTypeIdentifier($op_code->pattern, $result);
		}
		$values_count = $op_code->values->count();
		for ($i = 0; $i < $values_count; $i++)
		{
			$op_code_value = $op_code->values->get($i);
			if ($op_code->pattern || $i > 0)
			{
				$result->push(" ");
			}
			if ($op_code_value->op_code)
			{
				$this->translator->expression->translate($op_code_value->op_code, $result);
			}
			else
			{
				$result->push($op_code_value->var_name);
			}
			if ($op_code_value->expression)
			{
				$result->push(" = ");
				$this->translator->expression->translate($op_code_value->expression, $result);
			}
			if ($i < $values_count - 1)
			{
				$result->push(",");
			}
		}
	}
	/**
	 * OpBreak
	 */
	function OpBreak($op_code, $result)
	{
		$result->push("break");
	}
	/**
	 * OpContinue
	 */
	function OpContinue($op_code, $result)
	{
		$result->push("continue");
	}
	/**
	 * OpReturn
	 */
	function OpReturn($op_code, $result)
	{
		$result->push("return");
		if ($op_code->expression)
		{
			$result->push(" ");
			$this->translator->expression->translate($op_code->expression, $result);
		}
	}
	/**
	 * OpInc
	 */
	function OpInc($op_code, $result)
	{
		if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_PRE_INC)
		{
			$result->push("++");
			$this->translator->expression->translate($op_code->value, $result);
		}
		if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_PRE_DEC)
		{
			$result->push("--");
			$this->translator->expression->translate($op_code->value, $result);
		}
		if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_POST_INC)
		{
			$this->translator->expression->translate($op_code->value, $result);
			$result->push("++");
		}
		if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_POST_DEC)
		{
			$this->translator->expression->translate($op_code->value, $result);
			$result->push("--");
		}
	}
	/**
	 * OpFor
	 */
	function OpFor($op_code, $result)
	{
		$result->push("for (");
		$this->translateItem($op_code->expr1, $result);
		$result->push("; ");
		$this->translator->expression->translate($op_code->expr2, $result);
		$result->push("; ");
		$this->translateItem($op_code->expr3, $result);
		$result->push(")");
		$result->push($this->translator->newLine());
		$this->translateItems($op_code->value, $result);
	}
	/**
	 * OpIf
	 */
	function OpIf($op_code, $result)
	{
		$result->push("if (");
		$this->translator->expression->translate($op_code->condition, $result);
		$result->push(")");
		$result->push($this->translator->newLine());
		$this->translateItems($op_code->if_true, $result);
		if ($op_code->if_else && $op_code->if_else->count() > 0)
		{
			for ($i = 0; $i < $op_code->if_else->count(); $i++)
			{
				$op_code_item = $op_code->if_else->get($i);
				$result->push($this->translator->newLine());
				$result->push("else if (");
				$this->translator->expression->translate($op_code_item->condition, $result);
				$result->push(")");
				$result->push($this->translator->newLine());
				$this->translateItems($op_code_item->if_true, $result);
			}
		}
		if ($op_code->if_false)
		{
			$result->push($this->translator->newLine());
			$result->push("else");
			$result->push($this->translator->newLine());
			$this->translateItems($op_code->if_false, $result);
		}
	}
	/**
	 * OpThrow
	 */
	function OpThrow($op_code, $result)
	{
		$result->push("throw ");
		$this->translator->expression->translate($op_code->expression, $result);
	}
	/**
	 * OpTryCatch
	 */
	function OpTryCatch($op_code, $result)
	{
		$result->push("try");
		$result->push($this->translator->newLine());
		$this->translateItems($op_code->op_try, $result);
		if ($op_code->items && $op_code->items->count() > 0)
		{
			$items_count = $op_code->items->count();
			for ($i = 0; $i < $items_count; $i++)
			{
				$op_code_item = $op_code->items->get($i);
				$result->push($this->translator->newLine());
				$result->push("catch (");
				$this->translator->expression->OpTypeIdentifier($op_code_item->pattern, $result);
				$result->push(" ");
				$result->push($op_code_item->name);
				$result->push(")");
				$result->push($this->translator->newLine());
				$this->translateItems($op_code_item->value, $result);
			}
		}
	}
	/**
	 * OpWhile
	 */
	function OpWhile($op_code, $result)
	{
		$result->push("while (");
		$this->translator->expression->translate($op_code->condition, $result);
		$result->push(")");
		$result->push($this->translator->newLine());
		$this->translateItems($op_code->value, $result);
	}
	/**
	 * OpComment
	 */
	function OpComment($op_code, $result)
	{
		$result->push("/*");
		$result->push($op_code->value);
		$result->push("*/");
	}
	/**
	 * Translate item
	 */
	function translateItem($op_code, $result)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpAssign)
		{
			$this->OpAssign($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpBreak)
		{
			$this->OpBreak($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCall)
		{
			$this->translator->expression->OpCall($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpContinue)
		{
			$this->OpContinue($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpReturn)
		{
			$this->OpReturn($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpInc)
		{
			$this->OpInc($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpFor)
		{
			$this->OpFor($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpIf)
		{
			$this->OpIf($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpThrow)
		{
			$this->OpThrow($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpTryCatch)
		{
			$this->OpTryCatch($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpWhile)
		{
			$this->OpWhile($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpComment)
		{
			$this->OpComment($op_code, $result);
		}
		else
		{
			return false;
		}
		return true;
	}
	/**
	 * Translate OpItems
	 */
	function translateItems($op_code, $result)
	{
		if ($op_code->items->count() == 0)
		{
			$result->push("{");
			$result->push("}");
			return ;
		}
		/* Begin bracket */
		$result->push("{");
		$this->translator->levelInc();
		/* Items */
		$items_count = $op_code->items->count();
		for ($i = 0; $i < $items_count; $i++)
		{
			$op_code_item = $op_code->items->get($i);
			$result_items = \Runtime\Vector::from([]);
			$flag = $this->translateItem($op_code_item, $result_items);
			if ($flag)
			{
				$result->push($this->translator->newLine());
				$result->appendItems($result_items);
				if ($op_code_item instanceof \BayLang\OpCodes\OpAssign || $op_code_item instanceof \BayLang\OpCodes\OpBreak || $op_code_item instanceof \BayLang\OpCodes\OpCall || $op_code_item instanceof \BayLang\OpCodes\OpContinue || $op_code_item instanceof \BayLang\OpCodes\OpInc || $op_code_item instanceof \BayLang\OpCodes\OpReturn || $op_code_item instanceof \BayLang\OpCodes\OpThrow)
				{
					$result->push(";");
				}
			}
		}
		/* End bracket */
		$this->translator->levelDec();
		$result->push($this->translator->newLine());
		$result->push("}");
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
		return "BayLang.LangBay.TranslatorBayOperator";
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