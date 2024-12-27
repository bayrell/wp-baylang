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
class TranslatorPHPExpression
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
		$s = \Runtime\re::replace("\\\$", "\\\$", $s);
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
		return "[\"e\"=>" . \Runtime\rtl::toStr(static::toString($e)) . \Runtime\rtl::toStr($b) . \Runtime\rtl::toStr("]");
	}
	/**
	 * Returns string
	 */
	static function rtlToStr($t, $s)
	{
		$module_name = static::getModuleName($t, "rtl");
		return $module_name . \Runtime\rtl::toStr("::toStr(") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(")");
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
			return "ArrayAccess";
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
				$names = \Runtime\rs::split(".", $module_name)->concat($names->slice(1));
			}
		}
		return $names;
	}
	/**
	 * Return module name
	 */
	static function getModuleName($t, $module_name)
	{
		$module_name = static::findModuleName($t, $module_name);
		$module_name = \Runtime\re::replace("\\.", "\\", $module_name);
		return "\\" . \Runtime\rtl::toStr($module_name);
	}
	/**
	 * Return module name
	 */
	static function getModuleNames($t, $names)
	{
		return "\\" . \Runtime\rtl::toStr(\Runtime\rs::join("\\", static::findModuleNames($t, $names)));
	}
	/**
	 * OpTypeIdentifier
	 */
	static function OpTypeIdentifier($t, $op_code)
	{
		$names = static::findModuleNames($t, $op_code->entity_name->names);
		$s = "\\" . \Runtime\rtl::toStr(\Runtime\rs::join("\\", $names));
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
				return \Runtime\Vector::from([$t,"\\Runtime\\rtl::getContext()"]);
			}
			else
			{
				return \Runtime\Vector::from([$t,"\$ctx"]);
			}
		}
		if ($op_code->value == "_")
		{
			if ($t->enable_context == false)
			{
				return \Runtime\Vector::from([$t,"\\Runtime\\rtl::getContext()->translate"]);
			}
			else
			{
				return \Runtime\Vector::from([$t,"\$ctx->translate"]);
			}
		}
		if ($op_code->value == "@")
		{
			return \Runtime\Vector::from([$t,"\$ctx"]);
		}
		if ($op_code->value == "_")
		{
			return \Runtime\Vector::from([$t,"\$ctx->translate"]);
		}
		if ($op_code->value == "log")
		{
			return \Runtime\Vector::from([$t,"var_dump"]);
		}
		if ($t->modules->has($op_code->value) || $op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE)
		{
			$module_name = $op_code->value;
			$new_module_name = static::getModuleName($t, $module_name);
			return \Runtime\Vector::from([$t,$new_module_name]);
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_VARIABLE)
		{
			$content = $op_code->value;
			return \Runtime\Vector::from([$t,"\$" . \Runtime\rtl::toStr($content)]);
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_CLASSREF)
		{
			$content = $op_code->value;
			if ($content == "this")
			{
				$content = "\$this";
			}
			return \Runtime\Vector::from([$t,$content]);
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
		$module_name = static::getModuleName($t, "Vector");
		$content = $module_name . \Runtime\rtl::toStr("::from([") . \Runtime\rtl::toStr(\Runtime\rs::join(",", $values)) . \Runtime\rtl::toStr("])");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDict
	 */
	static function OpDict($t, $op_code, $flag_array=false)
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
			return static::toString($pair->key) . \Runtime\rtl::toStr("=>") . \Runtime\rtl::toStr($s);
		});
		$values = $values->filter(function ($s)
		{
			return $s != "";
		});
		$module_name = static::getModuleName($t, "Map");
		if (!$flag_array)
		{
			$content = $module_name . \Runtime\rtl::toStr("::from([") . \Runtime\rtl::toStr(\Runtime\rs::join(",", $values)) . \Runtime\rtl::toStr("])");
		}
		else
		{
			$content = "[" . \Runtime\rtl::toStr(\Runtime\rs::join(",", $values)) . \Runtime\rtl::toStr("]");
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Dynamic
	 */
	static function Dynamic($t, $op_code, $next_op_code=null)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpIdentifier)
		{
			return static::OpIdentifier($t, $op_code);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpAttr)
		{
			$attrs = new \Runtime\Vector();
			$op_code_item = $op_code;
			$op_code_next = $op_code;
			$prev_kind = "";
			$s = "";
			$first_item_complex = false;
			while ($op_code_next instanceof \BayLang\OpCodes\OpAttr)
			{
				$attrs->push($op_code_next);
				$op_code_item = $op_code_next;
				$op_code_next = $op_code_next->obj;
			}
			$attrs = $attrs->reverse();
			if ($op_code_next instanceof \BayLang\OpCodes\OpCall)
			{
				$prev_kind = "var";
				$res = static::OpCall($t, $op_code_next);
				$t = \Runtime\rtl::attr($res, 0);
				$s = \Runtime\rtl::attr($res, 1);
				$first_item_complex = true;
			}
			else if ($op_code_next instanceof \BayLang\OpCodes\OpNew)
			{
				$prev_kind = "var";
				$res = static::OpNew($t, $op_code_next);
				$t = \Runtime\rtl::attr($res, 0);
				$s = "(" . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(")");
				$first_item_complex = true;
			}
			else if ($op_code_next instanceof \BayLang\OpCodes\OpCollection)
			{
				$prev_kind = "var";
				$res = static::OpCollection($t, $op_code_next);
				$t = \Runtime\rtl::attr($res, 0);
				$s = "(" . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(")");
				$first_item_complex = true;
			}
			else if ($op_code_next instanceof \BayLang\OpCodes\OpDict)
			{
				$prev_kind = "var";
				$res = static::OpDict($t, $op_code_next);
				$t = \Runtime\rtl::attr($res, 0);
				$s = "(" . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(")");
				$first_item_complex = true;
			}
			else if ($op_code_next instanceof \BayLang\OpCodes\OpIdentifier)
			{
				if ($op_code_next->kind == \BayLang\OpCodes\OpIdentifier::KIND_CLASSREF)
				{
					if ($op_code_next->value == "static")
					{
						$s = "static";
						$prev_kind = "static";
					}
					else if ($op_code_next->value == "parent")
					{
						$s = "parent";
						$prev_kind = "static";
					}
					else if ($op_code_next->value == "self")
					{
						$prev_kind = "static";
						$s = static::getModuleName($t, $t->current_class_full_name);
					}
					else if ($op_code_next->value == "this")
					{
						$prev_kind = "var";
						$s = "\$this";
					}
				}
				else if ($op_code_next->kind == \BayLang\OpCodes\OpIdentifier::KIND_PIPE)
				{
					$prev_kind = "var";
					$res = $t::addSaveOpCode($t, \Runtime\Map::from(["var_content"=>$t->pipe_var_name . \Runtime\rtl::toStr("->val")]));
					$t = \Runtime\rtl::attr($res, 0);
					$s = \Runtime\rtl::attr($res, 1);
					$prev_kind = "static";
				}
				else
				{
					$res = static::OpIdentifier($t, $op_code_next);
					$t = \Runtime\rtl::attr($res, 0);
					$s = \Runtime\rtl::attr($res, 1);
					$prev_kind = "var";
					if ($t->modules->has($op_code_next->value) || $op_code_next->kind == \BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE)
					{
						$prev_kind = "static";
					}
				}
			}
			if ($first_item_complex && $t->is_pipe)
			{
				$res = $t::addSaveOpCode($t, \Runtime\Map::from(["var_content"=>$s]));
				$t = \Runtime\rtl::attr($res, 0);
				$s = \Runtime\rtl::attr($res, 1);
			}
			$attrs_sz = $attrs->count();
			for ($i = 0; $i < $attrs->count(); $i++)
			{
				$attr = $attrs->item($i);
				$next_attr = $attrs->get($i + 1, null);
				if ($attr->kind == \BayLang\OpCodes\OpAttr::KIND_ATTR)
				{
					/* Pipe */
					if ($t->is_pipe && !($next_op_code instanceof \BayLang\OpCodes\OpCall))
					{
						if ($i == $attrs_sz - 1)
						{
							$val2 = static::toString($attr->value->value);
							$s = "new \\Runtime\\Callback(" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($val2) . \Runtime\rtl::toStr(")");
						}
						else
						{
							$s .= \Runtime\rtl::toStr("->" . \Runtime\rtl::toStr($attr->value->value));
						}
					}
					else
					{
						$s .= \Runtime\rtl::toStr("->" . \Runtime\rtl::toStr($attr->value->value));
					}
				}
				else if ($attr->kind == \BayLang\OpCodes\OpAttr::KIND_STATIC)
				{
					if ($prev_kind == "static")
					{
						$attr_val = $attr->value->value;
						if ($i == $attrs_sz - 1 && $next_op_code instanceof \BayLang\OpCodes\OpCall)
						{
							$s .= \Runtime\rtl::toStr("::" . \Runtime\rtl::toStr($attr_val));
						}
						else if (\Runtime\rs::upper($attr_val) == $attr_val)
						{
							$s .= \Runtime\rtl::toStr("::" . \Runtime\rtl::toStr($attr_val));
						}
						else
						{
							if ($s == "static")
							{
								$val1 = "static::class";
							}
							else
							{
								$val1 = $s . \Runtime\rtl::toStr("::class");
							}
							$val2 = static::toString($attr_val);
							$s = "new \\Runtime\\Callback(" . \Runtime\rtl::toStr($val1) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($val2) . \Runtime\rtl::toStr(")");
						}
					}
					else
					{
						$s = $s . \Runtime\rtl::toStr("::") . \Runtime\rtl::toStr($attr->value->value);
					}
					$prev_kind = "static";
				}
				else if ($attr->kind == \BayLang\OpCodes\OpAttr::KIND_DYNAMIC)
				{
					$res = static::Expression($t, $attr->value);
					$t = \Runtime\rtl::attr($res, 0);
					/* s ~= "[" ~ res[1] ~ "]"; */
					$s = "\\Runtime\\rtl::attr(\$ctx, " . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(")");
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
					$s = "\\Runtime\\rtl::attr(\$ctx, " . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(", [") . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $items)) . \Runtime\rtl::toStr("])");
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
			$content = "++\$" . \Runtime\rtl::toStr($s);
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_PRE_DEC)
		{
			$content = "--\$" . \Runtime\rtl::toStr($s);
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_POST_INC)
		{
			$content = "\$" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr("++");
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpInc::KIND_POST_DEC)
		{
			$content = "\$" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr("--");
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
				$content = $op1 . \Runtime\rtl::toStr(" . ") . \Runtime\rtl::toStr(static::rtlToStr($t, $op2));
			}
			else if ($op_math == "implements")
			{
				$content = $op1 . \Runtime\rtl::toStr(" instanceof ") . \Runtime\rtl::toStr($op2);
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
		$res = static::OpIdentifier($t, $op_code->value1);
		$t = \Runtime\rtl::attr($res, 0);
		$val1 = \Runtime\rtl::attr($res, 1);
		$val2 = $op_code->value2;
		if ($op_code->kind == \BayLang\OpCodes\OpMethod::KIND_STATIC)
		{
			$val1 = $val1 . \Runtime\rtl::toStr("->getClassName()");
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpMethod::KIND_CLASS)
		{
			$val1 = $val1 . \Runtime\rtl::toStr("::class");
		}
		$content = "new \\Runtime\\Callback(" . \Runtime\rtl::toStr($val1) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr(static::toString($val2)) . \Runtime\rtl::toStr(")");
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
			$content .= \Runtime\rtl::toStr("\$ctx");
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
		$args_use = new \Runtime\Vector();
		$args = $op_code->args->filter(function ($arg)
		{
			return $arg instanceof \BayLang\OpCodes\OpCurryArg;
		})->sort(function ($arg1, $arg2)
		{
			return ($arg1->pos > $arg2->pos) ? (1) : (($arg1->pos < $arg2->pos) ? (-1) : (0));
		});
		$use_obj_item = "";
		if ($op_code->obj instanceof \BayLang\OpCodes\OpIdentifier)
		{
			if ($op_code->obj->kind == \BayLang\OpCodes\OpIdentifier::KIND_VARIABLE)
			{
				$use_obj_item = "\$" . \Runtime\rtl::toStr($op_code->obj->value);
			}
		}
		$args_sz = $op_code->args->count();
		for ($i = 0; $i < $args_sz; $i++)
		{
			$arg = $op_code->args->item($i);
			if ($arg instanceof \BayLang\OpCodes\OpCurryArg)
			{
				continue;
			}
			if ($arg instanceof \BayLang\OpCodes\OpIdentifier)
			{
				$args_use->push("\$" . \Runtime\rtl::toStr($arg->value));
			}
		}
		$args_sz = $args->count();
		for ($i = 0; $i < $args_sz; $i++)
		{
			$arg = $args->item($i);
			$s_use = "";
			$arr_use = new \Runtime\Vector();
			$arr_use->appendItems($args_use);
			for ($j = 0; $j < $i; $j++)
			{
				$arg_use = $args->item($j);
				$arr_use->push("\$__varg" . \Runtime\rtl::toStr($arg_use->pos));
			}
			if ($use_obj_item != "")
			{
				$arr_use->push($use_obj_item);
			}
			if ($arr_use->count() > 0)
			{
				$s_use = " use (" . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $arr_use)) . \Runtime\rtl::toStr(")");
			}
			if ($args_sz - 1 == $i)
			{
				$content .= \Runtime\rtl::toStr("function (\$ctx, \$__varg" . \Runtime\rtl::toStr($arg->pos) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr($s_use) . \Runtime\rtl::toStr("{return "));
			}
			else
			{
				$content .= \Runtime\rtl::toStr("function (\$__ctx" . \Runtime\rtl::toStr($arg->pos) . \Runtime\rtl::toStr(", \$__varg") . \Runtime\rtl::toStr($arg->pos) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr($s_use) . \Runtime\rtl::toStr("{return "));
			}
		}
		$flag = false;
		$res = static::Dynamic($t, $op_code->obj, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$s = \Runtime\rtl::attr($res, 1);
		if ($s == "parent")
		{
			$f_name = $t->current_function->name;
			if ($f_name == "constructor")
			{
				$f_name = "__construct";
			}
			$s = "parent::" . \Runtime\rtl::toStr($f_name);
			$content .= \Runtime\rtl::toStr($s);
		}
		else
		{
			$content .= \Runtime\rtl::toStr("(" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(")"));
		}
		$content .= \Runtime\rtl::toStr("(\$ctx");
		$flag = true;
		for ($i = 0; $i < $op_code->args->count(); $i++)
		{
			$s = "";
			$item = $op_code->args->item($i);
			if ($item instanceof \BayLang\OpCodes\OpCurryArg)
			{
				$s .= \Runtime\rtl::toStr("\$__varg" . \Runtime\rtl::toStr($item->pos));
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
		for ($i = 0; $i < $args_sz; $i++)
		{
			$content .= \Runtime\rtl::toStr(";}");
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpCall
	 */
	static function OpCall($t, $op_code)
	{
		$s = "";
		$flag = false;
		$res = static::Dynamic($t, $op_code->obj, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$s = \Runtime\rtl::attr($res, 1);
		if ($s == "parent")
		{
			$f_name = $t->current_function->name;
			if ($f_name == "constructor")
			{
				$f_name = "__construct";
			}
			$s = "parent::" . \Runtime\rtl::toStr($f_name) . \Runtime\rtl::toStr("(");
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
				$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr("\$ctx"));
				$flag = true;
			}
			else if (($t->current_function == null || $t->current_function->is_context) && $op_code->is_context)
			{
				$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr("\$ctx"));
				$flag = true;
			}
		}
		/*
		if (op_code.is_html)
		{
			content ~= (flag ? ", " : "") ~
				"$layout, $model_path, $render_params, $render_content";
			flag = true;
		}
		*/
		for ($i = 0; $i < $op_code->args->count(); $i++)
		{
			$item = $op_code->args->item($i);
			$res = static::Expression($t, $item);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr($s));
			$flag = true;
		}
		$content .= \Runtime\rtl::toStr(")");
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
		$res = static::Expression($t, $op_code->condition);
		$t = \Runtime\rtl::attr($res, 0);
		$condition = \Runtime\rtl::attr($res, 1);
		$res = static::Expression($t, $op_code->if_true);
		$t = \Runtime\rtl::attr($res, 0);
		$if_true = \Runtime\rtl::attr($res, 1);
		$res = static::Expression($t, $op_code->if_false);
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
		$res = $t::addSaveOpCode($t, \Runtime\Map::from(["content"=>$t->s($var_name . \Runtime\rtl::toStr(" = new \\Runtime\\Monad(") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(");"))]));
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
				$s1 = $var_name . \Runtime\rtl::toStr("->attr(") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
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
				$s1 = $var_name . \Runtime\rtl::toStr("->callMethod(\"") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr("\", [") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr("])");
			}
			else if ($op_item->kind == \BayLang\OpCodes\OpPipe::KIND_CALL)
			{
				$t = \Runtime\rtl::setAttr($t, ["is_pipe"], true);
				$res = static::Dynamic($t, $op_item->value);
				$t = \Runtime\rtl::attr($res, 0);
				$value = \Runtime\rtl::attr($res, 1);
				if ($op_item->is_monad)
				{
					$s1 = $var_name . \Runtime\rtl::toStr("->monad(") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
				}
				else
				{
					$s1 = $var_name . \Runtime\rtl::toStr("->call(") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
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
		return \Runtime\Vector::from([$t,$var_name . \Runtime\rtl::toStr("->value()")]);
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
		$content = "\\Runtime\\rtl::to(" . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr(static::toPattern($t, $op_code->pattern)) . \Runtime\rtl::toStr(")");
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareFunction
	 */
	static function OpDeclareFunction($t, $op_code)
	{
		$content = "";
		/* Set function name */
		$save_f = $t->current_function;
		$t = \Runtime\rtl::setAttr($t, ["current_function"], $op_code);
		$res = $t->operator::OpDeclareFunctionArgs($t, $op_code);
		$args = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr("function (" . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr(")"));
		if ($op_code->vars != null && $op_code->vars->count() > 0)
		{
			$vars = $op_code->vars->map(function ($s)
			{
				return "&\$" . \Runtime\rtl::toStr($s);
			});
			$content .= \Runtime\rtl::toStr(" use (" . \Runtime\rtl::toStr(\Runtime\rs::join(",", $vars)) . \Runtime\rtl::toStr(")"));
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
			return static::OpPipe($t, $op_code);
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
	static function getNamespace()
	{
		return "BayLang.LangPHP";
	}
	static function getClassName()
	{
		return "BayLang.LangPHP.TranslatorPHPExpression";
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