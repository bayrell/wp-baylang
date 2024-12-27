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
class TranslatorBayExpression extends \Runtime\BaseObject
{
	public $translator;
	function __construct($translator)
	{
		parent::__construct();
		$this->translator = $translator;
	}
	/**
	 * OpIdentifier
	 */
	function OpIdentifier($op_code, $result)
	{
		$result->push($op_code->value);
		$this->translator->opcode_level = 20;
	}
	/**
	 * OpNumber
	 */
	function OpNumber($op_code, $result)
	{
		$result->push($op_code->value);
		$this->translator->opcode_level = 20;
	}
	/**
	 * OpString
	 */
	function OpString($op_code, $result)
	{
		$result->push($this->translator->toString($op_code->value));
		$this->translator->opcode_level = 20;
	}
	/**
	 * OpTypeTemplate
	 */
	function OpTypeTemplate($items, $result)
	{
		if ($items)
		{
			$result->push("<");
			$items_count = $items->count();
			for ($i = 0; $i < $items_count; $i++)
			{
				$op_code_item = $items->get($i);
				if ($op_code_item instanceof \BayLang\OpCodes\OpIdentifier)
				{
					$this->OpIdentifier($op_code_item, $result);
				}
				else if ($op_code_item instanceof \BayLang\OpCodes\OpTypeIdentifier)
				{
					$this->OpTypeIdentifier($op_code_item, $result);
				}
				if ($i < $items_count - 1)
				{
					$result->push(", ");
				}
			}
			$result->push(">");
		}
	}
	/**
	 * OpTypeIdentifier
	 */
	function OpTypeIdentifier($op_code, $result)
	{
		$result->push($op_code->entity_name->names->last());
		$this->OpTypeTemplate($op_code->template, $result);
	}
	/**
	 * OpCollection
	 */
	function OpCollection($op_code, $result)
	{
		$is_multiline = $op_code->isMultiLine();
		$result->push("[");
		if ($is_multiline)
		{
			$this->translator->levelInc();
		}
		$i = 0;
		$values_count = $op_code->values->count();
		while ($i < $values_count)
		{
			$op_code_item = $op_code->values->get($i);
			if ($is_multiline)
			{
				$result->push($this->translator->newLine());
			}
			/* Preprocessor */
			if ($op_code_item instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
			{
				$items = \Runtime\Vector::from([]);
				$condition = $op_code_item->condition->value;
				while ($op_code_item != null && $op_code_item instanceof \BayLang\OpCodes\OpPreprocessorIfDef && $op_code_item->condition->value == $condition)
				{
					$items->push($op_code_item);
					/* Get next item */
					$i++;
					$op_code_item = $op_code->values->get($i);
				}
				$this->OpPreprocessorCollection($items, $result);
				continue;
			}
			/* Translate item */
			$this->translate($op_code_item, $result);
			if (!($op_code_item instanceof \BayLang\OpCodes\OpPreprocessorIfDef))
			{
				if ($is_multiline)
				{
					$result->push(",");
				}
				else if ($i < $values_count - 1)
				{
					$result->push(", ");
				}
			}
			$i++;
		}
		if ($is_multiline)
		{
			$this->translator->levelDec();
			$result->push($this->translator->newLine());
		}
		$result->push("]");
	}
	/**
	 * Collection preprocessor
	 */
	function OpPreprocessorCollection($items, $result)
	{
		$condition = $items->get(0)->condition->value;
		$result->push("#ifdef " . \Runtime\rtl::toStr($condition) . \Runtime\rtl::toStr(" then"));
		for ($i = 0; $i < $items->count(); $i++)
		{
			$op_code_item = $items->get($i);
			$result->push($this->translator->newLine());
			$this->translate($op_code_item->items, $result);
			$result->push(",");
		}
		$result->push($this->translator->newLine());
		$result->push("#endif");
	}
	/**
	 * OpDict
	 */
	function OpDict($op_code, $result)
	{
		$is_multiline = $op_code->isMultiLine();
		if ($op_code->values->count() == 0 && !$is_multiline)
		{
			$result->push("{");
			$result->push("}");
			return ;
		}
		/* Begin bracket */
		$result->push("{");
		if ($is_multiline)
		{
			$this->translator->levelInc();
		}
		/* Items */
		$i = 0;
		$values_count = $op_code->values->count();
		while ($i < $values_count)
		{
			$op_code_item = $op_code->values->get($i);
			if ($is_multiline)
			{
				$result->push($this->translator->newLine());
			}
			/* Preprocessor */
			if ($op_code_item->condition != null)
			{
				$items = \Runtime\Vector::from([]);
				$condition = $op_code_item->condition->value;
				while ($op_code_item != null && $op_code_item->condition != null)
				{
					$items->push($op_code_item);
					/* Get next item */
					$i++;
					$op_code_item = $op_code->values->get($i);
				}
				$this->OpPreprocessorDict($items, $result);
				continue;
			}
			/* Translate item */
			$result->push($this->translator->toString($op_code_item->key));
			$result->push(": ");
			$this->translate($op_code_item->value, $result);
			if ($is_multiline)
			{
				$result->push(",");
			}
			else if ($i < $values_count - 1)
			{
				$result->push(", ");
			}
			$i++;
		}
		/* End bracket */
		if ($is_multiline)
		{
			$this->translator->levelDec();
			$result->push($this->translator->newLine());
		}
		$result->push("}");
	}
	/**
	 * Dict preprocessor
	 */
	function OpPreprocessorDict($items, $result)
	{
		$condition = $items->get(0)->condition->value;
		$result->push("#ifdef " . \Runtime\rtl::toStr($condition) . \Runtime\rtl::toStr(" then"));
		for ($i = 0; $i < $items->count(); $i++)
		{
			$op_code_item = $items->get($i);
			$result->push($this->translator->newLine());
			$result->push($this->translator->toString($op_code_item->key));
			$result->push(": ");
			$this->translate($op_code_item->value, $result);
			$result->push(",");
		}
		$result->push($this->translator->newLine());
		$result->push("#endif");
	}
	/**
	 * OpAttr
	 */
	function OpAttr($op_code, $result)
	{
		$attrs = new \Runtime\Vector();
		$op_code_first = $op_code;
		while ($op_code_first instanceof \BayLang\OpCodes\OpAttr)
		{
			$attrs->push($op_code_first);
			$op_code_first = $op_code_first->obj;
		}
		$attrs = $attrs->reverse();
		/* first op_code */
		$this->translateItem($op_code_first, $result);
		/* Attrs */
		for ($i = 0; $i < $attrs->count(); $i++)
		{
			$item_attr = $attrs->get($i);
			if ($item_attr->kind == \BayLang\OpCodes\OpAttr::KIND_ATTR)
			{
				$result->push(".");
				$result->push($item_attr->value->value);
			}
			else if ($item_attr->kind == \BayLang\OpCodes\OpAttr::KIND_STATIC)
			{
				$result->push("::");
				$result->push($item_attr->value->value);
			}
			else if ($item_attr->kind == \BayLang\OpCodes\OpAttr::KIND_DYNAMIC)
			{
				$result->push("[");
				$this->translate($item_attr->value, $result);
				$result->push("]");
			}
			else if ($item_attr->kind == \BayLang\OpCodes\OpAttr::KIND_DYNAMIC_ATTRS)
			{
				$result->push("[");
				$item_attr_count = $item_attr->attrs->count();
				for ($j = 0; $j < $item_attr_count; $j++)
				{
					$op_code_item = $item_attr->attrs->get($j);
					$this->translate($op_code_item, $result);
					if ($j < $item_attr_count - 1)
					{
						$result->push(", ");
					}
				}
				$result->push("]");
			}
		}
		$this->translator->opcode_level = 20;
	}
	/**
	 * OpClassOf
	 */
	function OpClassOf($op_code, $result)
	{
		$result->push("classof ");
		$result->push($op_code->entity_name->names->last());
	}
	/**
	 * OpCall
	 */
	function OpCall($op_code, $result)
	{
		$this->translateItem($op_code->obj, $result);
		if ($op_code->args->count() == 1 && $op_code->args->get(0) instanceof \BayLang\OpCodes\OpDict)
		{
			$this->OpDict($op_code->args->get(0), $result);
		}
		else
		{
			$result->push("(");
			$args_count = $op_code->args->count();
			for ($i = 0; $i < $args_count; $i++)
			{
				$op_code_item = $op_code->args->get($i);
				$this->Expression($op_code_item, $result);
				if ($i < $args_count - 1)
				{
					$result->push(", ");
				}
			}
			$result->push(")");
		}
		$this->translator->opcode_level = 20;
	}
	/**
	 * OpNew
	 */
	function OpNew($op_code, $result)
	{
		$result->push("new ");
		$this->OpTypeIdentifier($op_code->value, $result);
		if ($op_code->args->count() == 1 && $op_code->args->get(0) instanceof \BayLang\OpCodes\OpDict)
		{
			$this->OpDict($op_code->args->get(0), $result);
		}
		else
		{
			$result->push("(");
			$args_count = $op_code->args->count();
			for ($i = 0; $i < $args_count; $i++)
			{
				$op_code_item = $op_code->args->get($i);
				$this->Expression($op_code_item, $result);
				if ($i < $args_count - 1)
				{
					$result->push(", ");
				}
			}
			$result->push(")");
		}
		$this->translator->opcode_level = 20;
	}
	/**
	 * OpMath
	 */
	function OpMath($op_code, $result)
	{
		$result1 = \Runtime\Vector::from([]);
		$this->Expression($op_code->value1, $result1);
		$opcode_level1 = $this->translator->opcode_level;
		$op = "";
		$opcode_level = 0;
		if ($op_code->math == "!")
		{
			$opcode_level = 16;
			$op = "!";
		}
		if ($op_code->math == ">>")
		{
			$opcode_level = 12;
			$op = ">>";
		}
		if ($op_code->math == "<<")
		{
			$opcode_level = 12;
			$op = "<<";
		}
		if ($op_code->math == "&")
		{
			$opcode_level = 9;
			$op = "&";
		}
		if ($op_code->math == "xor")
		{
			$opcode_level = 8;
			$op = "^";
		}
		if ($op_code->math == "|")
		{
			$opcode_level = 7;
			$op = "|";
		}
		if ($op_code->math == "*")
		{
			$opcode_level = 14;
			$op = "*";
		}
		if ($op_code->math == "/")
		{
			$opcode_level = 14;
			$op = "/";
		}
		if ($op_code->math == "%")
		{
			$opcode_level = 14;
			$op = "%";
		}
		if ($op_code->math == "div")
		{
			$opcode_level = 14;
			$op = "div";
		}
		if ($op_code->math == "mod")
		{
			$opcode_level = 14;
			$op = "mod";
		}
		if ($op_code->math == "+")
		{
			$opcode_level = 13;
			$op = "+";
		}
		if ($op_code->math == "-")
		{
			$opcode_level = 13;
			$op = "-";
		}
		if ($op_code->math == "~")
		{
			$opcode_level = 13;
			$op = "~";
		}
		if ($op_code->math == "===")
		{
			$opcode_level = 10;
			$op = "===";
		}
		if ($op_code->math == "!==")
		{
			$opcode_level = 10;
			$op = "!==";
		}
		if ($op_code->math == "==")
		{
			$opcode_level = 10;
			$op = "==";
		}
		if ($op_code->math == "!=")
		{
			$opcode_level = 10;
			$op = "!=";
		}
		if ($op_code->math == ">=")
		{
			$opcode_level = 10;
			$op = ">=";
		}
		if ($op_code->math == "<=")
		{
			$opcode_level = 10;
			$op = "<=";
		}
		if ($op_code->math == ">")
		{
			$opcode_level = 10;
			$op = ">";
		}
		if ($op_code->math == "<")
		{
			$opcode_level = 10;
			$op = "<";
		}
		if ($op_code->math == "is")
		{
			$opcode_level = 10;
			$op = "instanceof";
		}
		if ($op_code->math == "instanceof")
		{
			$opcode_level = 10;
			$op = "instanceof";
		}
		if ($op_code->math == "implements")
		{
			$opcode_level = 10;
			$op = "implements";
		}
		if ($op_code->math == "not")
		{
			$opcode_level = 16;
			$op = "not";
		}
		if ($op_code->math == "and")
		{
			$opcode_level = 6;
			$op = "and";
		}
		if ($op_code->math == "&&")
		{
			$opcode_level = 6;
			$op = "and";
		}
		if ($op_code->math == "or")
		{
			$opcode_level = 5;
			$op = "or";
		}
		if ($op_code->math == "||")
		{
			$opcode_level = 5;
			$op = "or";
		}
		if ($op_code->math == "not" || $op_code->math == "!")
		{
			$result->push("not ");
			if ($opcode_level1 < $opcode_level)
			{
				$result->push("(");
				$result->appendItems($result1);
				$result->push(")");
			}
			else
			{
				$result->appendItems($result1);
			}
		}
		else
		{
			if ($opcode_level1 < $opcode_level)
			{
				$result->push("(");
				$result->appendItems($result1);
				$result->push(")");
			}
			else
			{
				$result->appendItems($result1);
			}
			$result->push(" " . \Runtime\rtl::toStr($op) . \Runtime\rtl::toStr(" "));
			$result2 = \Runtime\Vector::from([]);
			$this->Expression($op_code->value2, $result2);
			$opcode_level2 = $this->translator->opcode_level;
			if ($opcode_level2 < $opcode_level)
			{
				$result->push("(");
				$result->appendItems($result2);
				$result->push(")");
			}
			else
			{
				$result->appendItems($result2);
			}
		}
		$this->translator->opcode_level = $opcode_level;
	}
	/**
	 * Translate item
	 */
	function translateItem($op_code, $result)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpNumber)
		{
			$this->OpNumber($op_code, $result);
		}
		if ($op_code instanceof \BayLang\OpCodes\OpString)
		{
			$this->OpString($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpIdentifier)
		{
			$this->OpIdentifier($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpAttr)
		{
			$this->OpAttr($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpClassOf)
		{
			$this->OpClassOf($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCollection)
		{
			$this->OpCollection($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpDict)
		{
			$this->OpDict($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCall)
		{
			$this->OpCall($op_code, $result);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpNew)
		{
			$this->OpNew($op_code, $result);
		}
	}
	/**
	 * Expression
	 */
	function Expression($op_code, $result)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpMath)
		{
			$this->OpMath($op_code, $result);
		}
		else
		{
			$this->translateItem($op_code, $result);
		}
	}
	/**
	 * Translate expression
	 */
	function translate($op_code, $result)
	{
		$this->Expression($op_code, $result);
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
		return "BayLang.LangBay.TranslatorBayExpression";
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