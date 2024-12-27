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
class TranslatorES6Expression extends \Runtime\BaseStruct
{
	/**
	 * Returns string
	 */
	static function toString($s)
	{
		$s = \Runtime\re::replace("\\\\", "\\\\", $s);
		$s = \Runtime\re::replace("\"", "\\\"", $s);
		$s = \Runtime\re::replace("\n", "\\n", $s);
		$s = \Runtime\re::replace("\r", "\\r", $s);
		$s = \Runtime\re::replace("\t", "\\t", $s);
		return "\"" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr("\"");
	}
	/**
	 * To pattern
	 */
	static function toPattern($t, $pattern)
	{
		$names = static::findModuleNames($t, $pattern->entity_name->names);
		$e = \Runtime\rs::join(".", $names);
		$a = ($pattern->template != null) ? ($pattern->template->map(function ($pattern) use (&$t)
		{
			return static::toPattern($t, $pattern);
		})) : (null);
		$b = ($a != null) ? (",\"t\":[" . \Runtime\rtl::toStr(\Runtime\rs::join(",", $a)) . \Runtime\rtl::toStr("]")) : ("");
		return "{\"e\":" . \Runtime\rtl::toStr(static::toString($e)) . \Runtime\rtl::toStr($b) . \Runtime\rtl::toStr("}");
	}
	/**
	 * Returns string
	 */
	static function rtlToStr($t, $s)
	{
		if ($t->use_module_name)
		{
			return "use(\"Runtime.rtl\").toStr(" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(")");
		}
		$module_name = static::findModuleName($t, "rtl");
		return $module_name . \Runtime\rtl::toStr(".toStr(") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(")");
	}
	/**
	 * Find module name
	 */
	static function findModuleName($t, $module_name)
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
		else if ($t->modules->has($module_name))
		{
			return $t->modules->item($module_name);
		}
		return $module_name;
	}
	/**
	 * Returns module name
	 */
	static function findModuleNames($t, $names)
	{
		if ($names->count() > 0)
		{
			$module_name = $names->first();
			$module_name = static::findModuleName($t, $module_name);
			if ($module_name != "")
			{
				$names = $names->setIm(0, $module_name);
			}
		}
		return $names;
	}
	/**
	 * Use module name
	 */
	static function useModuleName($t, $module_name)
	{
		$module_name = static::findModuleName($t, $module_name);
		if ($t->use_module_name)
		{
			return "use(" . \Runtime\rtl::toStr(static::toString($module_name)) . \Runtime\rtl::toStr(")");
		}
		return $module_name;
	}
	/**
	 * OpTypeIdentifier
	 */
	static function OpTypeIdentifier($t, $op_code)
	{
		$names = static::findModuleNames($t, $op_code->entity_name->names);
		$s = \Runtime\rs::join(".", $names);
		return \Runtime\Vector::from([$t,$s]);
	}
	/**
	 * OpIdentifier
	 */
	static function OpIdentifier($t, $op_code)
	{
		if ($op_code->value == "@")
		{
			if ($t->enable_context == false)
			{
				return \Runtime\Vector::from([$t,static::useModuleName($t, "rtl") . \Runtime\rtl::toStr(".getContext()")]);
			}
			else
			{
				return \Runtime\Vector::from([$t,"ctx"]);
			}
		}
		if ($op_code->value == "_")
		{
			if ($t->enable_context == false)
			{
				return \Runtime\Vector::from([$t,static::useModuleName($t, "rtl") . \Runtime\rtl::toStr(".getContext().translate")]);
			}
			else
			{
				return \Runtime\Vector::from([$t,"ctx.translate"]);
			}
		}
		if ($op_code->value == "log")
		{
			return \Runtime\Vector::from([$t,"console.log"]);
		}
		if ($t->modules->has($op_code->value) || $op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE)
		{
			$module_name = $op_code->value;
			$new_module_name = static::useModuleName($t, $module_name);
			return \Runtime\Vector::from([$t,$new_module_name]);
		}
		$content = $op_code->value;
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpNumber
	 */
	static function OpNumber($t, $op_code)
	{
		$content = $op_code->value;
		/*if (op_code.negative)
		{
			content = "-" ~ content;
			t <= opcode_level <= 15;
		}*/
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpNegative
	 */
	static function OpNegative($t, $op_code)
	{
		$res = static::Expression($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$content = \Runtime\rtl::attr($res, 1);
		$content = "-" . \Runtime\rtl::toStr($content);
		$t = \Runtime\rtl::setAttr($t, ["opcode_level"], 15);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpString
	 */
	static function OpString($t, $op_code)
	{
		return \Runtime\Vector::from([$t,static::toString($op_code->value)]);
	}
	/**
	 * OpCollection
	 */
	static function OpCollection($t, $op_code)
	{
		$content = "";
		$values = $op_code->values->map(function ($op_code) use (&$t)
		{
			$res = static::Expression($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			return $s;
		});
		$values = $values->filter(function ($s)
		{
			return $s != "";
		});
		$module_name = static::useModuleName($t, "Vector");
		$content = $module_name . \Runtime\rtl::toStr(".from([") . \Runtime\rtl::toStr(\Runtime\rs::join(",", $values)) . \Runtime\rtl::toStr("])");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDict
	 */
	static function OpDict($t, $op_code)
	{
		$content = "";
		$values = $op_code->values->map(function ($pair, $key) use (&$t)
		{
			if ($pair->condition != null && \Runtime\rtl::attr($t->preprocessor_flags, $pair->condition->value) != true)
			{
				return "";
			}
			$res = static::Expression($t, $pair->value);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			return static::toString($pair->key) . \Runtime\rtl::toStr(":") . \Runtime\rtl::toStr($s);
		});
		$values = $values->filter(function ($s)
		{
			return $s != "";
		});
		$module_name = static::useModuleName($t, "Map");
		$content = $module_name . \Runtime\rtl::toStr(".from({") . \Runtime\rtl::toStr(\Runtime\rs::join(",", $values)) . \Runtime\rtl::toStr("})");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Dynamic
	 */
	static function Dynamic($t, $op_code, $is_call=false)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpIdentifier)
		{
			return static::OpIdentifier($t, $op_code);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpAttr)
		{
			$attrs = new \Runtime\Vector();
			$op_code_item = $op_code;
			$op_code_first = $op_code;
			$first_item = "";
			$prev_kind = "";
			$s = "";
			$first_item_complex = false;
			while ($op_code_first instanceof \BayLang\OpCodes\OpAttr)
			{
				$attrs->push($op_code_first);
				$op_code_item = $op_code_first;
				$op_code_first = $op_code_first->obj;
			}
			$attrs = $attrs->reverse();
			if ($op_code_first instanceof \BayLang\OpCodes\OpCall)
			{
				$prev_kind = "var";
				$res = static::OpCall($t, $op_code_first);
				$t = \Runtime\rtl::attr($res, 0);
				$s = \Runtime\rtl::attr($res, 1);
				$first_item_complex = true;
			}
			else if ($op_code_first instanceof \BayLang\OpCodes\OpNew)
			{
				$prev_kind = "var";
				$res = static::OpNew($t, $op_code_first);
				$t = \Runtime\rtl::attr($res, 0);
				$s = "(" . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(")");
				$first_item_complex = true;
			}
			else if ($op_code_first instanceof \BayLang\OpCodes\OpCollection)
			{
				$prev_kind = "var";
				$res = static::OpCollection($t, $op_code_first);
				$t = \Runtime\rtl::attr($res, 0);
				$s = \Runtime\rtl::attr($res, 1);
				$first_item_complex = true;
			}
			else if ($op_code_first instanceof \BayLang\OpCodes\OpDict)
			{
				$prev_kind = "var";
				$res = static::OpDict($t, $op_code_first);
				$t = \Runtime\rtl::attr($res, 0);
				$s = \Runtime\rtl::attr($res, 1);
				$first_item_complex = true;
			}
			else if ($op_code_first instanceof \BayLang\OpCodes\OpIdentifier)
			{
				if ($op_code_first->kind == \BayLang\OpCodes\OpIdentifier::KIND_CLASSREF)
				{
					if ($op_code_first->value == "static")
					{
						if (!$t->is_static_function)
						{
							if (!$t->current_class->is_component)
							{
								$s = "this.constructor";
							}
							else
							{
								$s = "this.\$options";
							}
						}
						else
						{
							$s = "this";
						}
						$prev_kind = "static";
					}
					else if ($op_code_first->value == "parent")
					{
						$s = static::useModuleName($t, $t->current_class_extends_name);
						$prev_kind = "parent";
					}
					else if ($op_code_first->value == "self")
					{
						$prev_kind = "static";
						$s = $t->current_class_full_name;
					}
					else if ($op_code_first->value == "this")
					{
						$prev_kind = "var";
						$s = "this";
					}
				}
				else if ($op_code_first->kind == \BayLang\OpCodes\OpIdentifier::KIND_PIPE)
				{
					$prev_kind = "var";
					$s = $t->pipe_var_name . \Runtime\rtl::toStr(".val");
				}
				else
				{
					$res = static::OpIdentifier($t, $op_code_first);
					$t = \Runtime\rtl::attr($res, 0);
					$s = \Runtime\rtl::attr($res, 1);
					$prev_kind = "var";
					if ($t->modules->has($op_code_first->value) || $op_code_first->kind == \BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE)
					{
						$prev_kind = "static";
					}
				}
			}
			$first_item = $s;
			if ($first_item_complex && $t->is_pipe)
			{
				$res = $t::addSaveOpCode($t, \Runtime\Map::from(["var_content"=>$first_item]));
				$t = \Runtime\rtl::attr($res, 0);
				$first_item = \Runtime\rtl::attr($res, 1);
				$s = $first_item;
			}
			$attrs_sz = $attrs->count();
			for ($i = 0; $i < $attrs_sz; $i++)
			{
				$attr = $attrs->item($i);
				if ($attr->kind == \BayLang\OpCodes\OpAttr::KIND_ATTR)
				{
					$s .= \Runtime\rtl::toStr("." . \Runtime\rtl::toStr($attr->value->value));
					/* Pipe */
					if ($t->is_pipe && !$is_call)
					{
						if ($i == $attrs_sz - 1)
						{
							$s .= \Runtime\rtl::toStr(".bind(" . \Runtime\rtl::toStr($first_item) . \Runtime\rtl::toStr(")"));
						}
						else
						{
							$first_item = $s;
						}
					}
				}
				else if ($attr->kind == \BayLang\OpCodes\OpAttr::KIND_STATIC)
				{
					if ($prev_kind == "var")
					{
						$s .= \Runtime\rtl::toStr(".constructor." . \Runtime\rtl::toStr($attr->value->value));
						$first_item .= \Runtime\rtl::toStr(".constructor");
					}
					else if ($prev_kind == "parent")
					{
						if ($t->current_function->isStatic())
						{
							$s .= \Runtime\rtl::toStr("." . \Runtime\rtl::toStr($attr->value->value) . \Runtime\rtl::toStr(".bind(this)"));
						}
						else
						{
							$s .= \Runtime\rtl::toStr(".prototype." . \Runtime\rtl::toStr($attr->value->value) . \Runtime\rtl::toStr(".bind(this)"));
						}
					}
					else
					{
						$s .= \Runtime\rtl::toStr("." . \Runtime\rtl::toStr($attr->value->value));
					}
					/* Pipe */
					if ($t->is_pipe && $prev_kind != "parent" && !$is_call)
					{
						if ($i == $attrs_sz - 1)
						{
							$s .= \Runtime\rtl::toStr(".bind(" . \Runtime\rtl::toStr($first_item) . \Runtime\rtl::toStr(")"));
						}
						else
						{
							$first_item = $s;
						}
					}
					$prev_kind = "static";
				}
				else if ($attr->kind == \BayLang\OpCodes\OpAttr::KIND_DYNAMIC)
				{
					$res = static::Expression($t, $attr->value);
					$t = \Runtime\rtl::attr($res, 0);
					/* s ~= "[" ~ res[1] ~ "]"; */
					$s = "Runtime.rtl.attr(ctx, " . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(")");
				}
				else if ($attr->kind == \BayLang\OpCodes\OpAttr::KIND_DYNAMIC_ATTRS)
				{
					$items = new \Runtime\Vector();
					if ($attr->attrs != null)
					{
						for ($j = 0; $j < $attr->attrs->count(); $j++)
						{
							$res = static::Expression($t, \Runtime\rtl::attr($attr->attrs, $j));
							$t = \Runtime\rtl::attr($res, 0);
							$items->push(\Runtime\rtl::attr($res, 1));
						}
					}
					$s = "Runtime.rtl.attr(ctx, " . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(", [") . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $items)) . \Runtime\rtl::toStr("])");
				}
			}
			return \Runtime\Vector::from([$t,$s]);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCurry)
		{
			$res = static::OpCurry($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
			$res = $t::addSaveOpCode($t, \Runtime\Map::from(["var_content"=>$content]));
			$t = \Runtime\rtl::attr($res, 0);
			$var_name = \Runtime\rtl::attr($res, 1);
			return \Runtime\Vector::from([$t,$var_name]);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCall)
		{
			return static::OpCall($t, $op_code);
		}
		return \Runtime\Vector::from([$t,""]);
	}
	/**
	 * OpInc
	 */
	static function OpInc($t, $op_code)
	{
		$content = "";
		$res = static::Expression($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$s = \Runtime\rtl::attr($res, 1);
		if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_PRE_INC)
		{
			$content = "++" . \Runtime\rtl::toStr($s);
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_PRE_DEC)
		{
			$content = "--" . \Runtime\rtl::toStr($s);
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_POST_INC)
		{
			$content = $s . \Runtime\rtl::toStr("++");
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_POST_DEC)
		{
			$content = $s . \Runtime\rtl::toStr("--");
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpMath
	 */
	static function OpMath($t, $op_code)
	{
		$res = static::Expression($t, $op_code->value1);
		$t = \Runtime\rtl::attr($res, 0);
		$opcode_level1 = \Runtime\rtl::attr($res, 0)->opcode_level;
		$s1 = \Runtime\rtl::attr($res, 1);
		$op = "";
		$op_math = $op_code->math;
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
			$op = "+";
		}
		if ($op_code->math == "!")
		{
			$opcode_level = 13;
			$op = "!";
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
			$op = "!";
		}
		if ($op_code->math == "and")
		{
			$opcode_level = 6;
			$op = "&&";
		}
		if ($op_code->math == "&&")
		{
			$opcode_level = 6;
			$op = "&&";
		}
		if ($op_code->math == "or")
		{
			$opcode_level = 5;
			$op = "||";
		}
		if ($op_code->math == "||")
		{
			$opcode_level = 5;
			$op = "||";
		}
		$content = "";
		if ($op_code->math == "!" || $op_code->math == "not")
		{
			$content = $op . \Runtime\rtl::toStr($t->o($s1, $opcode_level1, $opcode_level));
		}
		else
		{
			$res = static::Expression($t, $op_code->value2);
			$t = \Runtime\rtl::attr($res, 0);
			$opcode_level2 = \Runtime\rtl::attr($res, 0)->opcode_level;
			$s2 = \Runtime\rtl::attr($res, 1);
			$op1 = $t->o($s1, $opcode_level1, $opcode_level);
			$op2 = $t->o($s2, $opcode_level2, $opcode_level);
			if ($op_math == "~")
			{
				$content = $op1 . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($op) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr(static::rtlToStr($t, $op2));
			}
			else if ($op_math == "implements")
			{
				$rtl_name = static::findModuleName($t, "rtl");
				$content = $rtl_name . \Runtime\rtl::toStr(".is_implements(") . \Runtime\rtl::toStr($op1) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($op2) . \Runtime\rtl::toStr(")");
			}
			else
			{
				$content = $op1 . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($op) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($op2);
			}
		}
		$t = \Runtime\rtl::setAttr($t, ["opcode_level"], $opcode_level);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpMethod
	 */
	static function OpMethod($t, $op_code)
	{
		$content = "";
		$val1 = "";
		$val2 = $op_code->value2;
		$prev_kind = "";
		if ($op_code->value1->kind == \BayLang\OpCodes\OpIdentifier::KIND_CLASSREF)
		{
			if ($op_code->value1->value == "static")
			{
				$val1 = "this" . \Runtime\rtl::toStr(((!$t->is_static_function) ? (".constructor") : ("")));
				$prev_kind = "static";
			}
			else if ($op_code->value1->value == "parent")
			{
				$val1 = static::useModuleName($t, $t->current_class_extends_name);
				$prev_kind = "parent";
			}
			else if ($op_code->value1->value == "self")
			{
				$prev_kind = "static";
				$val1 = $t->current_class_full_name;
			}
			else if ($op_code->value1->value == "this")
			{
				$prev_kind = "var";
				$val1 = "this";
			}
		}
		else
		{
			$res = static::OpIdentifier($t, $op_code->value1);
			$t = \Runtime\rtl::attr($res, 0);
			$val1 = \Runtime\rtl::attr($res, 1);
			if ($op_code->kind == \BayLang\OpCodes\OpMethod::KIND_STATIC)
			{
				$val1 .= \Runtime\rtl::toStr(".constructor");
			}
		}
		$content = $val1 . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($val2) . \Runtime\rtl::toStr(".bind(") . \Runtime\rtl::toStr($val1) . \Runtime\rtl::toStr(")");
		$t = \Runtime\rtl::setAttr($t, ["opcode_level"], 0);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpNew
	 */
	static function OpNew($t, $op_code)
	{
		$content = "new ";
		$res = static::OpTypeIdentifier($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$flag = false;
		$content .= \Runtime\rtl::toStr("(");
		if ($t->current_function == null || $t->current_function->is_context)
		{
			$content .= \Runtime\rtl::toStr("ctx");
			$flag = true;
		}
		for ($i = 0; $i < $op_code->args->count(); $i++)
		{
			$item = $op_code->args->item($i);
			$res = $t->expression::Expression($t, $item);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr($s));
			$flag = true;
		}
		$content .= \Runtime\rtl::toStr(")");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpCurry
	 */
	static function OpCurry($t, $op_code)
	{
		$content = "";
		$s = "";
		$args = $op_code->args->filter(function ($arg)
		{
			return $arg instanceof \BayLang\OpCodes\OpCurryArg;
		})->sort(function ($arg1, $arg2)
		{
			return ($arg1->pos > $arg2->pos) ? (1) : (($arg1->pos < $arg2->pos) ? (-1) : (0));
		});
		$args_sz = $args->count();
		for ($i = 0; $i < $args_sz; $i++)
		{
			$arg = $args->item($i);
			if ($args_sz - 1 == $i)
			{
				$content .= \Runtime\rtl::toStr("(ctx, __varg" . \Runtime\rtl::toStr($arg->pos) . \Runtime\rtl::toStr(") => "));
			}
			else
			{
				$content .= \Runtime\rtl::toStr("(__ctx" . \Runtime\rtl::toStr($arg->pos) . \Runtime\rtl::toStr(", __varg") . \Runtime\rtl::toStr($arg->pos) . \Runtime\rtl::toStr(") => "));
			}
		}
		$flag = false;
		$res = $t->expression::Dynamic($t, $op_code->obj, true);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		if ($s == "parent")
		{
			$content = static::useModuleName($t, $t->current_class_extends_name);
			if ($t->current_function->name != "constructor")
			{
				if ($t->current_function->isStatic())
				{
					$content .= \Runtime\rtl::toStr("." . \Runtime\rtl::toStr($t->current_function->name));
				}
				else
				{
					$content .= \Runtime\rtl::toStr(".prototype." . \Runtime\rtl::toStr($t->current_function->name));
				}
			}
			$content .= \Runtime\rtl::toStr(".call(this, ctx");
			$flag = true;
		}
		else
		{
			$content .= \Runtime\rtl::toStr("(ctx");
			$flag = true;
		}
		for ($i = 0; $i < $op_code->args->count(); $i++)
		{
			$s = "";
			$item = $op_code->args->item($i);
			if ($item instanceof \BayLang\OpCodes\OpCurryArg)
			{
				$s .= \Runtime\rtl::toStr("__varg" . \Runtime\rtl::toStr($item->pos));
			}
			else
			{
				$res = static::Expression($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$s = \Runtime\rtl::attr($res, 1);
			}
			$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr($s));
			$flag = true;
		}
		$content .= \Runtime\rtl::toStr(")");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpCall
	 */
	static function OpCall($t, $op_code)
	{
		$s = "";
		$flag = false;
		$res = $t->expression::Dynamic($t, $op_code->obj, true);
		$t = \Runtime\rtl::attr($res, 0);
		$s = \Runtime\rtl::attr($res, 1);
		if ($s == "parent")
		{
			$s = static::useModuleName($t, $t->current_class_extends_name);
			if ($t->current_function->name != "constructor")
			{
				if (!$t->current_class->is_component)
				{
					if ($t->current_function->isStatic())
					{
						$s .= \Runtime\rtl::toStr("." . \Runtime\rtl::toStr($t->current_function->name));
					}
					else
					{
						$s .= \Runtime\rtl::toStr(".prototype." . \Runtime\rtl::toStr($t->current_function->name));
					}
				}
				else
				{
					if ($t->current_function->isStatic())
					{
						$s .= \Runtime\rtl::toStr("." . \Runtime\rtl::toStr($t->current_function->name));
					}
					else
					{
						$s .= \Runtime\rtl::toStr(".methods." . \Runtime\rtl::toStr($t->current_function->name));
					}
				}
			}
			$s .= \Runtime\rtl::toStr(".call(this");
			$flag = true;
		}
		else
		{
			$s .= \Runtime\rtl::toStr("(");
		}
		$content = $s;
		if ($t->enable_context)
		{
			if ($op_code->obj instanceof \BayLang\OpCodes\OpIdentifier && $op_code->obj->value == "_")
			{
				$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr("ctx"));
				$flag = true;
			}
			else if (($t->current_function == null || $t->current_function->is_context) && $op_code->is_context)
			{
				$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr("ctx"));
				$flag = true;
			}
		}
		/*
		if (op_code.is_html)
		{
			content ~= (flag ? ", " : "") ~
				"component, render_params, render_content";
			flag = true;
		}
		*/
		for ($i = 0; $i < $op_code->args->count(); $i++)
		{
			$item = $op_code->args->item($i);
			$res = $t->expression::Expression($t, $item);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr($s));
			$flag = true;
		}
		$content .= \Runtime\rtl::toStr(")");
		if ($t->current_function != null && $t->current_function->isFlag("async") && $op_code->is_await && $t->isAsyncAwait())
		{
			$content = "await " . \Runtime\rtl::toStr($content);
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpClassOf
	 */
	static function OpClassOf($t, $op_code)
	{
		$names = static::findModuleNames($t, $op_code->entity_name->names);
		$s = \Runtime\rs::join(".", $names);
		return \Runtime\Vector::from([$t,static::toString($s)]);
	}
	/**
	 * OpTernary
	 */
	static function OpTernary($t, $op_code)
	{
		$content = "";
		$t = \Runtime\rtl::setAttr($t, ["opcode_level"], 100);
		$res = $t->expression::Expression($t, $op_code->condition);
		$t = \Runtime\rtl::attr($res, 0);
		$condition = \Runtime\rtl::attr($res, 1);
		$res = $t->expression::Expression($t, $op_code->if_true);
		$t = \Runtime\rtl::attr($res, 0);
		$if_true = \Runtime\rtl::attr($res, 1);
		$res = $t->expression::Expression($t, $op_code->if_false);
		$t = \Runtime\rtl::attr($res, 0);
		$if_false = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr("(" . \Runtime\rtl::toStr($condition) . \Runtime\rtl::toStr(") ? (") . \Runtime\rtl::toStr($if_true) . \Runtime\rtl::toStr(") : (") . \Runtime\rtl::toStr($if_false) . \Runtime\rtl::toStr(")"));
		$t = \Runtime\rtl::setAttr($t, ["opcode_level"], 0);
		/* OpTernary */
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpPipe
	 */
	static function OpPipe($t, $op_code, $is_expression=true)
	{
		$content = "";
		$var_name = "";
		$value = "";
		/* use Runtime.Monad */
		$monad_name = "Runtime.Monad";
		if ($t->use_module_name)
		{
			$res = $t::addSaveOpCode($t, \Runtime\Map::from(["var_content"=>static::useModuleName($t, "Runtime.Monad")]));
			$t = \Runtime\rtl::attr($res, 0);
			$monad_name = \Runtime\rtl::attr($res, 1);
		}
		$res = $t::incSaveOpCode($t);
		$t = \Runtime\rtl::attr($res, 0);
		$var_name = \Runtime\rtl::attr($res, 1);
		$t = \Runtime\rtl::setAttr($t, ["pipe_var_name"], $var_name);
		$items = new \Runtime\Vector();
		$op_code_item = $op_code;
		while ($op_code_item instanceof \BayLang\OpCodes\OpPipe)
		{
			$items->push($op_code_item);
			$op_code_item = $op_code_item->obj;
		}
		$items = $items->reverse();
		/* First item */
		$res = $t->expression::Expression($t, $op_code_item);
		$t = \Runtime\rtl::attr($res, 0);
		$value = \Runtime\rtl::attr($res, 1);
		$res = $t::addSaveOpCode($t, \Runtime\Map::from(["content"=>$t->s("var " . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(" = new ") . \Runtime\rtl::toStr($monad_name) . \Runtime\rtl::toStr("(ctx, ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(");"))]));
		$t = \Runtime\rtl::attr($res, 0);
		/* Output items */
		for ($i = 0; $i < $items->count(); $i++)
		{
			$s1 = "";
			$s2 = "";
			$op_item = $items->item($i);
			if ($op_item->kind == \BayLang\OpCodes\OpPipe::KIND_ATTR)
			{
				$res = static::Expression($t, $op_item->value);
				$t = \Runtime\rtl::attr($res, 0);
				$value = \Runtime\rtl::attr($res, 1);
				$s1 = $var_name . \Runtime\rtl::toStr(".attr(ctx, ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
			}
			else if ($op_item->kind == \BayLang\OpCodes\OpPipe::KIND_METHOD)
			{
				$value = $op_item->value->obj->value->value;
				$args = "";
				$flag = false;
				for ($j = 0; $j < $op_item->value->args->count(); $j++)
				{
					$item = $op_item->value->args->item($j);
					$res = $t->expression::Expression($t, $item);
					$t = \Runtime\rtl::attr($res, 0);
					$s = \Runtime\rtl::attr($res, 1);
					$args .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr($s));
					$flag = true;
				}
				if (!$op_item->is_async || !$t->enable_async_await || !$t->current_function->isFlag("async"))
				{
					$s1 = $var_name . \Runtime\rtl::toStr(".callMethod(ctx, \"") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr("\", [") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr("])");
				}
				else
				{
					$s1 = "await " . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(".callMethodAsync(ctx, \"") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr("\", [") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr("])");
				}
			}
			else if ($op_item->kind == \BayLang\OpCodes\OpPipe::KIND_CALL)
			{
				$t = \Runtime\rtl::setAttr($t, ["is_pipe"], true);
				$res = static::Dynamic($t, $op_item->value);
				$t = \Runtime\rtl::attr($res, 0);
				$value = \Runtime\rtl::attr($res, 1);
				if (!$op_item->is_async || !$t->enable_async_await || !$t->current_function->isFlag("async"))
				{
					if ($op_item->is_monad)
					{
						$s1 = $var_name . \Runtime\rtl::toStr(".monad(ctx, ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
					}
					else
					{
						$s1 = $var_name . \Runtime\rtl::toStr(".call(ctx, ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
					}
				}
				else
				{
					if ($op_item->is_monad)
					{
						$s1 = "await " . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(".monadAsync(ctx, ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
					}
					else
					{
						$s1 = "await " . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(".callAsync(ctx, ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
					}
				}
				$t = \Runtime\rtl::setAttr($t, ["is_pipe"], false);
			}
			if ($s1 != "")
			{
				$res = $t::addSaveOpCode($t, \Runtime\Map::from(["content"=>$t->s($var_name . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(";"))]));
				$t = \Runtime\rtl::attr($res, 0);
			}
			if ($s2 != "")
			{
				$res = $t::addSaveOpCode($t, \Runtime\Map::from(["content"=>$t->s($s2)]));
				$t = \Runtime\rtl::attr($res, 0);
			}
		}
		return \Runtime\Vector::from([$t,$var_name . \Runtime\rtl::toStr(".value(ctx)")]);
	}
	/**
	 * OpTypeConvert
	 */
	static function OpTypeConvert($t, $op_code)
	{
		$content = "";
		$res = static::Expression($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$value = \Runtime\rtl::attr($res, 1);
		$content = static::useModuleName($t, "rtl") . \Runtime\rtl::toStr(".to(") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr(static::toPattern($t, $op_code->pattern)) . \Runtime\rtl::toStr(")");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareFunction
	 */
	static function OpDeclareFunction($t, $op_code, $is_arrow=true)
	{
		$content = "";
		$is_async = "";
		if ($op_code->isFlag("async") && $t->isAsyncAwait())
		{
			$is_async = "async ";
		}
		/* Set function name */
		$save_f = $t->current_function;
		$t = \Runtime\rtl::setAttr($t, ["current_function"], $op_code);
		$res = $t->operator::OpDeclareFunctionArgs($t, $op_code);
		$args = \Runtime\rtl::attr($res, 1);
		if ($is_arrow)
		{
			$content .= \Runtime\rtl::toStr($is_async . \Runtime\rtl::toStr("(") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr(") =>"));
		}
		else
		{
			$content .= \Runtime\rtl::toStr($is_async . \Runtime\rtl::toStr("function (") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr(")"));
		}
		$res = $t->operator::OpDeclareFunctionBody($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Restore function */
		$t = \Runtime\rtl::setAttr($t, ["current_function"], $save_f);
		/* OpTernary */
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Expression
	 */
	static function Expression($t, $op_code)
	{
		$content = "";
		$save_is_pipe = $t->is_pipe;
		$t = \Runtime\rtl::setAttr($t, ["opcode_level"], 100);
		$t = \Runtime\rtl::setAttr($t, ["is_pipe"], false);
		if ($op_code instanceof \BayLang\OpCodes\OpIdentifier)
		{
			$res = static::OpIdentifier($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpTypeIdentifier)
		{
			$res = static::OpTypeIdentifier($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpNegative)
		{
			$res = static::OpNegative($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpNumber)
		{
			$res = static::OpNumber($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpString)
		{
			$res = static::OpString($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCollection)
		{
			$res = static::OpCollection($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpDict)
		{
			$res = static::OpDict($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpInc)
		{
			$t = \Runtime\rtl::setAttr($t, ["opcode_level"], 16);
			$res = static::OpInc($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpMath)
		{
			$res = static::OpMath($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpMethod)
		{
			$res = static::OpMethod($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpNew)
		{
			$res = static::OpNew($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpAttr)
		{
			$res = static::Dynamic($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCall)
		{
			$res = static::OpCall($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpClassOf)
		{
			$res = static::OpClassOf($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpCurry)
		{
			$res = static::OpCurry($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPipe)
		{
			$res = static::OpPipe($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpTernary)
		{
			$res = static::OpTernary($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpTypeConvert)
		{
			$res = static::OpTypeConvert($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpDeclareFunction)
		{
			$res = static::OpDeclareFunction($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpHtmlItems)
		{
			$t = \Runtime\rtl::setAttr($t, ["debug_component"], \Runtime\Vector::from([]));
			$t = \Runtime\rtl::setAttr($t, ["is_html"], true);
			$res = $t->html::OpHtmlExpression($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
			$t = \Runtime\rtl::setAttr($t, ["is_html"], false);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
		{
			$res = $t->operator::OpPreprocessorIfDef($t, $op_code, \BayLang\OpCodes\OpPreprocessorIfDef::KIND_EXPRESSION);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1);
		}
		$t = \Runtime\rtl::setAttr($t, ["is_pipe"], $save_is_pipe);
		return \Runtime\Vector::from([$t,$content]);
	}
	/* ======================= Class Init Functions ======================= */
	function takeValue($k,$d=null)
	{
	}
	static function getNamespace()
	{
		return "BayLang.LangES6";
	}
	static function getClassName()
	{
		return "BayLang.LangES6.TranslatorES6Expression";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseStruct";
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