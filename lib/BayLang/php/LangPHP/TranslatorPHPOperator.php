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
class TranslatorPHPOperator
{
	/**
	 * OpAssign
	 */
	static function OpAssignStruct($t, $op_code, $pos=0)
	{
		$content = "";
		$var_name = $op_code->var_name;
		$res = $t->expression::Expression($t, $op_code->expression);
		$t = \Runtime\rtl::attr($res, 0);
		$expr = \Runtime\rtl::attr($res, 1);
		$names = $op_code->names->map(function ($item) use (&$t)
		{
			if ($item instanceof \BayLang\OpCodes\BaseOpCode)
			{
				$res = $t->expression::Expression($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				return \Runtime\rtl::attr($res, 1);
			}
			return $t->expression::toString($item);
		});
		$content = "\\Runtime\\rtl::setAttr(\$ctx, \$" . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", [") . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $names)) . \Runtime\rtl::toStr("], ") . \Runtime\rtl::toStr($expr) . \Runtime\rtl::toStr(")");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpAssign
	 */
	static function OpAssign($t, $op_code, $flag_indent=true)
	{
		$content = "";
		if ($op_code->kind == \BayLang\OpCodes\OpAssign::KIND_ASSIGN || $op_code->kind == \BayLang\OpCodes\OpAssign::KIND_DECLARE)
		{
			for ($i = 0; $i < $op_code->values->count(); $i++)
			{
				$item = $op_code->values->item($i);
				$index_s = "";
				$s = "";
				$op = $item->op;
				if ($op == "")
				{
					$op = "=";
				}
				if ($item->expression == null)
				{
					continue;
				}
				/* Expression */
				$item_expression = "";
				$res = $t->expression::Expression($t, $item->expression);
				$t = \Runtime\rtl::attr($res, 0);
				if ($op == "~=")
				{
					$item_expression = $t->expression::rtlToStr($t, \Runtime\rtl::attr($res, 1));
				}
				else
				{
					$item_expression = \Runtime\rtl::attr($res, 1);
				}
				if ($item->op_code instanceof \BayLang\OpCodes\OpAttr)
				{
					$items = new \Runtime\Vector();
					$items2 = new \Runtime\Vector();
					$op_code_next = $item->op_code;
					while ($op_code_next instanceof \BayLang\OpCodes\OpAttr)
					{
						$items->push($op_code_next);
						$op_code_next = $op_code_next->obj;
					}
					$items = $items->reverse();
					$res = $t->expression::OpIdentifier($t, $op_code_next);
					$t = \Runtime\rtl::attr($res, 0);
					$obj_s = \Runtime\rtl::attr($res, 1);
					for ($j = 0; $j < $items->count(); $j++)
					{
						$item_attr = \Runtime\rtl::attr($items, $j);
						if ($item_attr->kind == \BayLang\OpCodes\OpAttr::KIND_ATTR)
						{
							$obj_s .= \Runtime\rtl::toStr("->" . \Runtime\rtl::toStr($item_attr->value->value));
							$items2->push($t->expression::toString($item_attr->value->value));
						}
						else if ($item_attr->kind == \BayLang\OpCodes\OpAttr::KIND_DYNAMIC)
						{
							$res = $t->expression::Expression($t, $item_attr->value);
							$t = \Runtime\rtl::attr($res, 0);
							$obj_s .= \Runtime\rtl::toStr("[" . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr("]"));
							$items2->push(\Runtime\rtl::attr($res, 1));
						}
						else if ($item_attr->kind == \BayLang\OpCodes\OpAttr::KIND_DYNAMIC_ATTRS)
						{
							if ($item_attr->attrs != null)
							{
								for ($j = $item_attr->attrs->count() - 1; $j >= 0; $j--)
								{
									$res = $t->expression::Expression($t, \Runtime\rtl::attr($item_attr->attrs, $j));
									$t = \Runtime\rtl::attr($res, 0);
									$obj_s .= \Runtime\rtl::toStr("[" . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr("]"));
									$items2->push(\Runtime\rtl::attr($res, 1));
								}
							}
						}
					}
					if ($op == "~=" || $op == "+=" || $op == "-=")
					{
						$op2 = "+";
						if ($op == "~=" || $op == "+=")
						{
							$op2 = "+";
						}
						else if ($op == "-=")
						{
							$op2 = "-";
						}
						$item_expression = "\\Runtime\\rtl\\attr(\$ctx, " . \Runtime\rtl::toStr($obj_s) . \Runtime\rtl::toStr(", [") . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $items2)) . \Runtime\rtl::toStr("]) ") . \Runtime\rtl::toStr($op2) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($item_expression);
					}
					$index_s = $obj_s . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($item_expression) . \Runtime\rtl::toStr(";");
				}
				else
				{
					if ($item->op_code != null && $item->op_code->value == "@" && $t->enable_context == false)
					{
						$index_s = "\\Runtime\\rtl::setContext(" . \Runtime\rtl::toStr($item_expression) . \Runtime\rtl::toStr(");");
					}
					else
					{
						if ($op_code->kind == \BayLang\OpCodes\OpAssign::KIND_DECLARE)
						{
							$s = "\$" . \Runtime\rtl::toStr($item->var_name);
						}
						else
						{
							$res = $t->expression::OpIdentifier($t, $item->op_code);
							$t = \Runtime\rtl::attr($res, 0);
							$s = \Runtime\rtl::attr($res, 1);
						}
						if ($item_expression != "")
						{
							if ($op == "~=")
							{
								$s .= \Runtime\rtl::toStr(" .= " . \Runtime\rtl::toStr($item_expression));
							}
							else
							{
								$s .= \Runtime\rtl::toStr(" " . \Runtime\rtl::toStr($op) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($item_expression));
							}
							$index_s = $s . \Runtime\rtl::toStr(";");
						}
					}
				}
				if ($item->var_name != "" && $t->save_vars->indexOf($item->var_name) == -1)
				{
					$t = \Runtime\rtl::setAttr($t, ["save_vars"], $t->save_vars->pushIm($item->var_name));
				}
				if ($index_s != "")
				{
					$content .= \Runtime\rtl::toStr(($flag_indent) ? ($t->s($index_s)) : ($index_s));
				}
			}
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpAssign::KIND_STRUCT)
		{
			$s = "\$" . \Runtime\rtl::toStr($op_code->var_name) . \Runtime\rtl::toStr(" = ");
			$res = static::OpAssignStruct($t, $op_code, 0);
			$t = \Runtime\rtl::attr($res, 0);
			$content = $t->s($s . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(";"));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDelete
	 */
	static function OpDelete($t, $op_code)
	{
		$content = "";
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpFor
	 */
	static function OpFor($t, $op_code)
	{
		$content = "";
		$s1 = "";
		$s2 = "";
		$s3 = "";
		if ($op_code->expr1 instanceof \BayLang\OpCodes\OpAssign)
		{
			$res = static::OpAssign($t, $op_code->expr1, false);
			$t = \Runtime\rtl::attr($res, 0);
			$s1 = \Runtime\rtl::attr($res, 1);
		}
		else
		{
			$res = $t->expression::Expression($t, $op_code->expr1);
			$t = \Runtime\rtl::attr($res, 0);
			$s1 = \Runtime\rtl::attr($res, 1);
		}
		$res = $t->expression::Expression($t, $op_code->expr2);
		$t = \Runtime\rtl::attr($res, 0);
		$s2 = \Runtime\rtl::attr($res, 1);
		$res = $t->expression::Expression($t, $op_code->expr3);
		$t = \Runtime\rtl::attr($res, 0);
		$s3 = \Runtime\rtl::attr($res, 1);
		$content = $t->s("for (" . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($s2) . \Runtime\rtl::toStr("; ") . \Runtime\rtl::toStr($s3) . \Runtime\rtl::toStr(")"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = static::Operators($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpIf
	 */
	static function OpIf($t, $op_code)
	{
		$content = "";
		$res = $t->expression::Expression($t, $op_code->condition);
		$t = \Runtime\rtl::attr($res, 0);
		$s1 = \Runtime\rtl::attr($res, 1);
		$content = $t->s("if (" . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(")"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = static::Operators($t, $op_code->if_true);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		for ($i = 0; $i < $op_code->if_else->count(); $i++)
		{
			$if_else = $op_code->if_else->item($i);
			$res = $t->expression::Expression($t, $if_else->condition);
			$t = \Runtime\rtl::attr($res, 0);
			$s2 = \Runtime\rtl::attr($res, 1);
			$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($s2) . \Runtime\rtl::toStr(")")));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$res = static::Operators($t, $if_else->if_true);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
		}
		if ($op_code->if_false != null)
		{
			$content .= \Runtime\rtl::toStr($t->s("else"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$res = static::Operators($t, $op_code->if_false);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpReturn
	 */
	static function OpReturn($t, $op_code)
	{
		$content = "";
		$s1 = "";
		if ($op_code->expression)
		{
			$res = $t->expression::Expression($t, $op_code->expression);
			$t = \Runtime\rtl::attr($res, 0);
			$s1 = \Runtime\rtl::attr($res, 1);
		}
		if ($t->current_function->flags != null && $t->current_function->flags->isFlag("memorize"))
		{
			$content = $t->s("\$__memorize_value = " . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(";"));
			$content .= \Runtime\rtl::toStr($t->s($t->expression::getModuleName($t, "Runtime.rtl") . \Runtime\rtl::toStr("::_memorizeSave(\"") . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($t->current_function->name) . \Runtime\rtl::toStr("\", func_get_args(), \$__memorize_value);")));
			$content .= \Runtime\rtl::toStr($t->s("return \$__memorize_value;"));
			return \Runtime\Vector::from([$t,$content]);
		}
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(";")));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpThrow
	 */
	static function OpThrow($t, $op_code)
	{
		$res = $t->expression::Expression($t, $op_code->expression);
		$t = \Runtime\rtl::attr($res, 0);
		$content = $t->s("throw " . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(";"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpTryCatch
	 */
	static function OpTryCatch($t, $op_code)
	{
		$content = "";
		$content .= \Runtime\rtl::toStr($t->s("try"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = static::Operators($t, $op_code->op_try);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr($t->s(\Runtime\rtl::attr($res, 1)));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("catch (\\Exception \$_ex)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			$s = "";
			$pattern = "";
			$item = $op_code->items->item($i);
			$res = $t->expression::OpTypeIdentifier($t, $item->pattern);
			$t = \Runtime\rtl::attr($res, 0);
			$pattern .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			if ($pattern != "\\var")
			{
				$s = "if (\$_ex instanceof " . \Runtime\rtl::toStr($pattern) . \Runtime\rtl::toStr(")");
			}
			else
			{
				$s = "if (true)";
			}
			$s .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$s .= \Runtime\rtl::toStr(($s != "") ? ($t->s("\$" . \Runtime\rtl::toStr($item->name) . \Runtime\rtl::toStr(" = \$_ex;"))) : ("\$" . \Runtime\rtl::toStr($item->name) . \Runtime\rtl::toStr(" = \$_ex;")));
			$res = static::Operators($t, $item->value);
			$t = \Runtime\rtl::attr($res, 0);
			$s .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			$t = $t->levelDec();
			$s .= \Runtime\rtl::toStr($t->s("}"));
			if ($i != 0)
			{
				$s = "else " . \Runtime\rtl::toStr($s);
			}
			$content .= \Runtime\rtl::toStr($t->s($s));
		}
		$content .= \Runtime\rtl::toStr($t->s("else"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("throw \$_ex;"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpWhile
	 */
	static function OpWhile($t, $op_code)
	{
		$content = "";
		$res = $t->expression::Expression($t, $op_code->condition);
		$t = \Runtime\rtl::attr($res, 0);
		$s1 = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr($t->s("while (" . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = static::Operators($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpPreprocessorIfCode
	 */
	static function OpPreprocessorIfCode($t, $op_code)
	{
		$content = "";
		if (\Runtime\rtl::attr($t->preprocessor_flags, $op_code->condition->value) == true)
		{
			$content = \Runtime\rs::trim($op_code->content);
		}
		return \Runtime\Vector::from([$t,$t->s($content)]);
	}
	/**
	 * OpPreprocessorIfDef
	 */
	static function OpPreprocessorIfDef($t, $op_code, $kind)
	{
		if (!(\Runtime\rtl::attr($t->preprocessor_flags, $op_code->condition->value) == true))
		{
			return \Runtime\Vector::from([$t,""]);
		}
		if ($kind == \BayLang\OpCodes\OpPreprocessorIfDef::KIND_OPERATOR)
		{
			return static::Operators($t, $op_code->items);
		}
		else if ($kind == \BayLang\OpCodes\OpPreprocessorIfDef::KIND_EXPRESSION)
		{
			return $t->expression::Expression($t, $op_code->items);
		}
		$content = "";
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			$item = $op_code->items->item($i);
			if ($item instanceof \BayLang\OpCodes\OpComment)
			{
				$res = $t->operator::OpComment($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else if ($item instanceof \BayLang\OpCodes\OpDeclareFunction)
			{
				$res = $t->program::OpDeclareFunction($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpComment
	 */
	static function OpComment($t, $op_code)
	{
		$content = $t->s("/*" . \Runtime\rtl::toStr($op_code->value) . \Runtime\rtl::toStr("*/"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpComments
	 */
	static function OpComments($t, $comments)
	{
		$content = "";
		for ($i = 0; $i < $comments->count(); $i++)
		{
			$res = static::OpComment($t, $comments->item($i));
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpComments
	 */
	static function AddComments($t, $comments, $content)
	{
		if ($comments && $comments->count() > 0)
		{
			$res = static::OpComments($t, $comments);
			$s = \Runtime\rtl::attr($res, 1);
			if ($s != "")
			{
				$content = $s . \Runtime\rtl::toStr($content);
			}
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Operator
	 */
	static function Operator($t, $op_code)
	{
		$content = "";
		/* Save op codes */
		$save_op_codes = $t->save_op_codes;
		$save_op_code_inc = $t->save_op_code_inc;
		if ($op_code instanceof \BayLang\OpCodes\OpAssign)
		{
			$res = static::OpAssign($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
			/* Output save op code */
			$save = $t::outputSaveOpCode($t, $save_op_codes->count());
			if ($save != "")
			{
				$content = $save . \Runtime\rtl::toStr($content);
			}
			$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
			$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
			return \Runtime\Vector::from([$t,$content]);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpAssignStruct)
		{
			$res = static::OpAssignStruct($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$s1 = \Runtime\rtl::attr($res, 1);
			/* Output save op code */
			$save = $t::outputSaveOpCode($t, $save_op_codes->count());
			if ($save != "")
			{
				$content = $save;
			}
			$content .= \Runtime\rtl::toStr($t->s("\$" . \Runtime\rtl::toStr($op_code->var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(";")));
			$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
			$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
			return \Runtime\Vector::from([$t,$content]);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpBreak)
		{
			$content = $t->s("break;");
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCall)
		{
			$res = $t->expression::OpCall($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = $t->s(\Runtime\rtl::attr($res, 1) . \Runtime\rtl::toStr(";"));
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpContinue)
		{
			$content = $t->s("continue;");
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpDelete)
		{
			$res = static::OpDelete($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpFor)
		{
			$res = static::OpFor($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpIf)
		{
			$res = static::OpIf($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPipe)
		{
			$res = $t->expression::OpPipe($t, $op_code, false);
			$t = \Runtime\rtl::attr($res, 0);
			$content = $t->s(\Runtime\rtl::attr($res, 1) . \Runtime\rtl::toStr(";"));
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpReturn)
		{
			$res = static::OpReturn($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpThrow)
		{
			$res = static::OpThrow($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpTryCatch)
		{
			$res = static::OpTryCatch($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpWhile)
		{
			$res = static::OpWhile($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpInc)
		{
			$res = $t->expression::OpInc($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = $t->s(\Runtime\rtl::attr($res, 1) . \Runtime\rtl::toStr(";"));
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPreprocessorIfCode)
		{
			$res = static::OpPreprocessorIfCode($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
		{
			$res = static::OpPreprocessorIfDef($t, $op_code, \BayLang\OpCodes\OpPreprocessorIfDef::KIND_OPERATOR);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPreprocessorSwitch)
		{
			for ($i = 0; $i < $op_code->items->count(); $i++)
			{
				$res = static::OpPreprocessorIfCode($t, $op_code->items->item($i));
				$s = \Runtime\rtl::attr($res, 1);
				if ($s == "")
				{
					continue;
				}
				$content .= \Runtime\rtl::toStr($s);
			}
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpComment)
		{
			$res = static::OpComment($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpSafe)
		{
			$res = static::Operators($t, $op_code->items);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		/* Output save op code */
		$save = $t::outputSaveOpCode($t, $save_op_codes->count());
		if ($save != "")
		{
			$content = $save . \Runtime\rtl::toStr($content);
		}
		/* Restore save op codes */
		$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
		$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Operators
	 */
	static function Operators($t, $op_code)
	{
		$content = "";
		$f1 = function ($op_code)
		{
			return $op_code instanceof \BayLang\OpCodes\OpBreak || $op_code instanceof \BayLang\OpCodes\OpCall || $op_code instanceof \BayLang\OpCodes\OpContinue || $op_code instanceof \BayLang\OpCodes\OpReturn || $op_code instanceof \BayLang\OpCodes\OpThrow;
		};
		if ($op_code instanceof \BayLang\OpCodes\OpItems)
		{
			for ($i = 0; $i < $op_code->items->count(); $i++)
			{
				$item = $op_code->items->item($i);
				$res = static::Operator($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpHtmlItems)
		{
			$save_html_var_name = $t->html_var_name;
			$save_is_html = $t->is_html;
			$t = \Runtime\rtl::setAttr($t, ["is_html"], true);
			$res = $t->html::OpHtmlItems($t, $op_code, $save_html_var_name, false);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
			$t = \Runtime\rtl::setAttr($t, ["is_html"], $save_is_html);
		}
		else
		{
			$res = static::Operator($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareFunction Arguments
	 */
	static function OpDeclareFunctionArgs($t, $f)
	{
		$content = "";
		if ($f->args != null)
		{
			$flag = false;
			if ($f->is_context)
			{
				$content .= \Runtime\rtl::toStr("\$ctx");
				$flag = true;
			}
			/*
			if (f.is_html)
			{
				flag = true;
				content ~= (flag ? ", " : "") ~
					"$layout, $model_path, $render_params, $render_content";
			}
			*/
			for ($i = 0; $i < $f->args->count($i); $i++)
			{
				$arg = $f->args->item($i);
				$name = $arg->name;
				$expr = "";
				if ($arg->expression != null)
				{
					$res = $t->expression::Expression($t, $arg->expression);
					$t = \Runtime\rtl::attr($res, 0);
					$expr = \Runtime\rtl::attr($res, 1);
				}
				$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr("\$") . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr((($expr != "") ? ("=" . \Runtime\rtl::toStr($expr)) : (""))));
				$flag = true;
			}
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareFunction Body
	 */
	static function OpDeclareFunctionBody($t, $f)
	{
		$save_t = $t;
		$t = \Runtime\rtl::setAttr($t, ["is_pipe"], false);
		$t = \Runtime\rtl::setAttr($t, ["is_html"], false);
		$content = "";
		$t = $t->levelInc();
		/*
		if (f.is_html)
		{
			content ~= t.s("$model = \\Runtime\\rtl::attr($layout, $model_path);");
		}
		*/
		if ($f->items)
		{
			$res = $t->operator::Operators($t, $f->items);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		else if ($f->expression)
		{
			/* Clear save op codes */
			$t = $t::clearSaveOpCode($t);
			$res = $t->expression::Expression($t, $f->expression);
			$t = \Runtime\rtl::attr($res, 0);
			$expr = \Runtime\rtl::attr($res, 1);
			$s = "";
			if ($f->flags != null && $f->flags->isFlag("memorize"))
			{
				$s = "\$__memorize_value = " . \Runtime\rtl::toStr($expr) . \Runtime\rtl::toStr(";");
				$s .= \Runtime\rtl::toStr($t->s($t->expression::getModuleName($t, "Runtime.rtl") . \Runtime\rtl::toStr("::_memorizeSave(\"") . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($f->name) . \Runtime\rtl::toStr("\", func_get_args(), \$__memorize_value);")));
				$s .= \Runtime\rtl::toStr($t->s("return \$__memorize_value;"));
			}
			else
			{
				$s = $t->s("return " . \Runtime\rtl::toStr($expr) . \Runtime\rtl::toStr(";"));
			}
			/* Output save op code */
			$save = $t::outputSaveOpCode($t);
			if ($save != "")
			{
				$content .= \Runtime\rtl::toStr($save);
			}
			$content .= \Runtime\rtl::toStr($s);
		}
		if ($f->flags != null && $f->flags->isFlag("memorize"))
		{
			$s = "";
			$s .= \Runtime\rtl::toStr($t->s("\$__memorize_value = " . \Runtime\rtl::toStr($t->expression::getModuleName($t, "Runtime.rtl")) . \Runtime\rtl::toStr("::_memorizeValue(\"") . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($f->name) . \Runtime\rtl::toStr("\", func_get_args());")));
			$s .= \Runtime\rtl::toStr($t->s("if (\$__memorize_value != " . \Runtime\rtl::toStr($t->expression::getModuleName($t, "Runtime.rtl")) . \Runtime\rtl::toStr("::\$_memorize_not_found) return \$__memorize_value;")));
			$content = $s . \Runtime\rtl::toStr($content);
		}
		$t = $t->levelDec();
		$content = $t->s("{") . \Runtime\rtl::toStr($content);
		$content .= \Runtime\rtl::toStr($t->s("}"));
		return \Runtime\Vector::from([$save_t,$content]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangPHP";
	}
	static function getClassName()
	{
		return "BayLang.LangPHP.TranslatorPHPOperator";
	}
	static function getParentClassName()
	{
		return "";
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