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
class TranslatorPHPProgram
{
	/**
	 * OpNamespace
	 */
	static function OpNamespace($t, $op_code)
	{
		$arr = \Runtime\rs::split(".", $op_code->name);
		$t = \Runtime\rtl::setAttr($t, ["current_namespace_name"], $op_code->name);
		return \Runtime\Vector::from([$t,$t->s("namespace " . \Runtime\rtl::toStr(\Runtime\rs::join("\\", $arr)) . \Runtime\rtl::toStr(";"))]);
	}
	/**
	 * OpDeclareFunction
	 */
	static function OpDeclareFunction($t, $op_code)
	{
		if ($op_code->isFlag("declare"))
		{
			return \Runtime\Vector::from([$t,""]);
		}
		$content = "";
		/* Set current function */
		$t = \Runtime\rtl::setAttr($t, ["current_function"], $op_code);
		$s1 = "";
		$s2 = "";
		if ($op_code->isStatic())
		{
			$s1 .= \Runtime\rtl::toStr("static ");
			$t = \Runtime\rtl::setAttr($t, ["is_static_function"], true);
		}
		else
		{
			$t = \Runtime\rtl::setAttr($t, ["is_static_function"], false);
		}
		$res = $t->operator::OpDeclareFunctionArgs($t, $op_code);
		$args = \Runtime\rtl::attr($res, 1);
		$s1 .= \Runtime\rtl::toStr("function " . \Runtime\rtl::toStr($op_code->name) . \Runtime\rtl::toStr("(") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr(")"));
		if ($t->current_class->kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			$res = $t->operator::OpDeclareFunctionBody($t, $op_code);
			$s2 .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		else
		{
			$s2 .= \Runtime\rtl::toStr(";");
		}
		$s1 = $t->s($s1);
		/* Function comments */
		$res = $t->operator::AddComments($t, $op_code->comments, $s1 . \Runtime\rtl::toStr($s2));
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpFunctionAnnotations
	 */
	static function OpFunctionAnnotations($t, $f)
	{
		$content = "";
		if ($f->flags->isFlag("declare"))
		{
			return \Runtime\Vector::from([$t,$content]);
		}
		if (!$f->annotations)
		{
			return \Runtime\Vector::from([$t,$content]);
		}
		if ($f->annotations->count() == 0)
		{
			return \Runtime\Vector::from([$t,$content]);
		}
		$content .= \Runtime\rtl::toStr($t->s("if (\$field_name == " . \Runtime\rtl::toStr($t->expression::toString($f->name)) . \Runtime\rtl::toStr(")")));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return \\Runtime\\Dict::from(["));
		$t = $t->levelInc();
		if ($f->flags->isFlag("async"))
		{
			$content .= \Runtime\rtl::toStr($t->s("\"async\"=>true,"));
		}
		$content .= \Runtime\rtl::toStr($t->s("\"annotations\"=>\\Runtime\\Collection::from(["));
		$t = $t->levelInc();
		for ($j = 0; $j < $f->annotations->count(); $j++)
		{
			$annotation = $f->annotations->item($j);
			$res = $t->expression::OpTypeIdentifier($t, $annotation->name);
			$t = \Runtime\rtl::attr($res, 0);
			$name = \Runtime\rtl::attr($res, 1);
			$params = "";
			if ($annotation->params != null)
			{
				$res = $t->expression::OpDict($t, $annotation->params, true);
				$t = \Runtime\rtl::attr($res, 0);
				$params = \Runtime\rtl::attr($res, 1);
			}
			$content .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(\$ctx, ") . \Runtime\rtl::toStr($params) . \Runtime\rtl::toStr("),")));
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("]),"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("]);"));
		$t = $t->levelDec();
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpClassBodyItemMethodsList
	 */
	static function OpClassBodyItemMethodsList($t, $item)
	{
		$content = "";
		if ($item instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
		{
			if (\Runtime\rtl::attr($t->preprocessor_flags, $item->condition->value) == true)
			{
				for ($i = 0; $i < $item->items->count(); $i++)
				{
					$op_code = $item->items->item($i);
					$res = static::OpClassBodyItemMethodsList($t, $op_code);
					$t = \Runtime\rtl::attr($res, 0);
					$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				}
			}
		}
		else if ($item instanceof \BayLang\OpCodes\OpDeclareFunction)
		{
			if (!$item->flags->isFlag("declare") && !$item->flags->isFlag("protected") && !$item->flags->isFlag("private") && !($item->annotations == null) && !($item->annotations->count() == 0))
			{
				$content .= \Runtime\rtl::toStr($t->s($t->expression::toString($item->name) . \Runtime\rtl::toStr(",")));
			}
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpClassBodyItemAnnotations
	 */
	static function OpClassBodyItemAnnotations($t, $item)
	{
		$content = "";
		if ($item instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
		{
			if (\Runtime\rtl::attr($t->preprocessor_flags, $item->condition->value) == true)
			{
				for ($i = 0; $i < $item->items->count(); $i++)
				{
					$op_code = $item->items->item($i);
					$res = static::OpClassBodyItemAnnotations($t, $op_code);
					$t = \Runtime\rtl::attr($res, 0);
					$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				}
			}
		}
		else if ($item instanceof \BayLang\OpCodes\OpDeclareFunction)
		{
			$res = static::OpFunctionAnnotations($t, $item);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClass
	 */
	static function OpDeclareClassConstructor($t, $op_code)
	{
		if ($op_code->fn_create == null)
		{
			return \Runtime\Vector::from([$t,""]);
		}
		$open = "";
		$content = "";
		$save_t = $t;
		/* Set function name */
		$t = \Runtime\rtl::setAttr($t, ["current_function"], $op_code->fn_create);
		/* Clear save op codes */
		$t = $t::clearSaveOpCode($t);
		$open .= \Runtime\rtl::toStr($t->s("function __construct("));
		$res = $t->operator::OpDeclareFunctionArgs($t, $op_code->fn_create);
		$t = \Runtime\rtl::attr($res, 0);
		$open .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$open .= \Runtime\rtl::toStr(")");
		$open .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* Function body */
		$res = $t->operator::Operators($t, ($op_code->fn_create->expression) ? ($op_code->fn_create->expression) : ($op_code->fn_create->items));
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Constructor end */
		$save = $t::outputSaveOpCode($t);
		if ($save != "")
		{
			$content = $open . \Runtime\rtl::toStr($t->s($save . \Runtime\rtl::toStr($content)));
		}
		else
		{
			$content = $open . \Runtime\rtl::toStr($content);
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		return \Runtime\Vector::from([$save_t,$content]);
	}
	/**
	 * Declare component functions
	 */
	static function OpDeclareComponentFunctions($t, $op_code)
	{
		$content = "";
		/* CSS */
		$content .= \Runtime\rtl::toStr($t->s("static function css(\$vars)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("\$res = \"\";"));
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			$item = $op_code->items->get($i);
			if (!($item instanceof \BayLang\OpCodes\OpHtmlStyle))
			{
				continue;
			}
			$res = $t->expression::Expression($t, $item->value);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			$content .= \Runtime\rtl::toStr($t->s("\$res .= \\Runtime\\rtl::toStr(" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(");")));
		}
		$content .= \Runtime\rtl::toStr($t->s("return \$res;"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		/* Meta data */
		$op_code_meta = $op_code->items->findItem(\Runtime\lib::isInstance("BayLang.OpCodes.OpHtmlMeta"));
		if ($op_code_meta)
		{
			$content .= \Runtime\rtl::toStr($t->s("static function getMetaData()"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$res = $t->expression::Expression($t, $op_code_meta->value);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(";")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClass
	 */
	static function OpDeclareClassBody($t, $op_code)
	{
		$content = "";
		$class_kind = $op_code->kind;
		$save_op_codes = $t->save_op_codes;
		$save_op_code_inc = $t->save_op_code_inc;
		$t = $t::clearSaveOpCode($t);
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* Static variables */
		if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE && $op_code->vars != null)
		{
			for ($i = 0; $i < $op_code->vars->count(); $i++)
			{
				$variable = $op_code->vars->item($i);
				if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
				{
					continue;
				}
				if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
				{
					continue;
				}
				$is_static = $variable->flags->isFlag("static");
				$is_const = $variable->flags->isFlag("const");
				for ($j = 0; $j < $variable->values->count(); $j++)
				{
					$value = $variable->values->item($j);
					$res = $t->expression::Expression($t, $value->expression);
					$s = ($value->expression != null) ? (\Runtime\rtl::attr($res, 1)) : ("null");
					if ($is_static && $is_const)
					{
						$content .= \Runtime\rtl::toStr($t->s("const " . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr("=") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(";")));
					}
					else if ($is_static)
					{
						$content .= \Runtime\rtl::toStr($t->s("static \$" . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr("=") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(";")));
					}
					else if ($class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT)
					{
						$content .= \Runtime\rtl::toStr($t->s("public \$__" . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(";")));
					}
					else
					{
						$content .= \Runtime\rtl::toStr($t->s("public \$" . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(";")));
					}
				}
			}
		}
		/* Constructor */
		if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			$res = static::OpDeclareClassConstructor($t, $op_code);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		/* Functions */
		if ($op_code->functions != null)
		{
			for ($i = 0; $i < $op_code->functions->count(); $i++)
			{
				$f = $op_code->functions->item($i);
				$res = static::OpDeclareFunction($t, $f);
				$t = \Runtime\rtl::attr($res, 0);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		/* Class items */
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			$item = $op_code->items->item($i);
			if ($item instanceof \BayLang\OpCodes\OpPreprocessorIfCode)
			{
				$res = $t->operator::OpPreprocessorIfCode($t, $item);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else if ($item instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
			{
				$res = $t->operator::OpPreprocessorIfDef($t, $item, \BayLang\OpCodes\OpPreprocessorIfDef::KIND_CLASS_BODY);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else if ($item instanceof \BayLang\OpCodes\OpPreprocessorSwitch)
			{
				for ($j = 0; $j < $item->items->count(); $j++)
				{
					$res = $t->operator::OpPreprocessorIfCode($t, $item->items->item($j));
					$s = \Runtime\rtl::attr($res, 1);
					if ($s == "")
					{
						continue;
					}
					$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				}
			}
		}
		/* Declare component functions */
		if ($op_code->is_model || $op_code->is_component)
		{
			$res = static::OpDeclareComponentFunctions($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			$content .= \Runtime\rtl::toStr($t->s("/* ======================= Class Init Functions ======================= */"));
		}
		/* Init variables */
		if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE && $op_code->vars != null)
		{
			$vars = $op_code->vars->filter(function ($variable)
			{
				return !$variable->flags->isFlag("static");
			});
			if ($t->current_class_full_name != "Runtime.BaseObject" && $vars->count() > 0)
			{
				$content .= \Runtime\rtl::toStr($t->s("function _init(\$ctx)"));
				$content .= \Runtime\rtl::toStr($t->s("{"));
				$t = $t->levelInc();
				if ($t->current_class_extends_name != "")
				{
					$content .= \Runtime\rtl::toStr($t->s("parent::_init(\$ctx);"));
				}
				for ($i = 0; $i < $op_code->vars->count(); $i++)
				{
					$variable = $op_code->vars->item($i);
					$is_static = $variable->flags->isFlag("static");
					if ($is_static)
					{
						continue;
					}
					if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
					{
						continue;
					}
					if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
					{
						continue;
					}
					$prefix = "";
					if ($class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT)
					{
						$prefix = "__";
					}
					else if ($class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_CLASS)
					{
						$prefix = "";
					}
					for ($j = 0; $j < $variable->values->count(); $j++)
					{
						$value = $variable->values->item($j);
						$res = $t->expression::Expression($t, $value->expression);
						$s = ($value->expression != null) ? (\Runtime\rtl::attr($res, 1)) : ("null");
						$content .= \Runtime\rtl::toStr($t->s("\$this->" . \Runtime\rtl::toStr($prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(";")));
					}
				}
				$t = $t->levelDec();
				$content .= \Runtime\rtl::toStr($t->s("}"));
			}
			/* Struct */
			if ($op_code->is_component == false && $class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT)
			{
				$is_struct = $class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT;
				$var_prefix = ($is_struct) ? ("__") : ("");
				if (!$is_struct && false)
				{
					/* Assign Object */
					$content .= \Runtime\rtl::toStr($t->s("function assignObject(\$ctx,\$o)"));
					$content .= \Runtime\rtl::toStr($t->s("{"));
					$t = $t->levelInc();
					$content .= \Runtime\rtl::toStr($t->s("if (\$o instanceof \\" . \Runtime\rtl::toStr(\Runtime\rs::replace("\\.", "\\", $t->current_class_full_name)) . \Runtime\rtl::toStr(")")));
					$content .= \Runtime\rtl::toStr($t->s("{"));
					$t = $t->levelInc();
					for ($i = 0; $i < $op_code->vars->count(); $i++)
					{
						$variable = $op_code->vars->item($i);
						if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
						{
							continue;
						}
						if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
						{
							continue;
						}
						$is_const = $variable->flags->isFlag("const");
						$is_static = $variable->flags->isFlag("static");
						$is_protected = $variable->flags->isFlag("protected");
						$is_private = $variable->flags->isFlag("private");
						if ($is_const || $is_static)
						{
							continue;
						}
						if ($is_protected || $is_private)
						{
							continue;
						}
						for ($j = 0; $j < $variable->values->count(); $j++)
						{
							$value = $variable->values->item($j);
							$content .= \Runtime\rtl::toStr($t->s("\$this->" . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = \$o->") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(";")));
						}
					}
					$t = $t->levelDec();
					$content .= \Runtime\rtl::toStr($t->s("}"));
					if ($t->current_class->extend_name)
					{
						$content .= \Runtime\rtl::toStr($t->s("parent::assignObject(\$ctx,\$o);"));
					}
					$t = $t->levelDec();
					$content .= \Runtime\rtl::toStr($t->s("}"));
					/* Assign Value */
					$content .= \Runtime\rtl::toStr($t->s("function assignValue(\$ctx,\$k,\$v)"));
					$content .= \Runtime\rtl::toStr($t->s("{"));
					$t = $t->levelInc();
					$flag = false;
					for ($i = 0; $i < $op_code->vars->count(); $i++)
					{
						$variable = $op_code->vars->item($i);
						if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
						{
							continue;
						}
						if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
						{
							continue;
						}
						$is_const = $variable->flags->isFlag("const");
						$is_static = $variable->flags->isFlag("static");
						$is_protected = $variable->flags->isFlag("protected");
						$is_private = $variable->flags->isFlag("private");
						if ($is_const || $is_static)
						{
							continue;
						}
						if ($is_protected || $is_private)
						{
							continue;
						}
						for ($j = 0; $j < $variable->values->count(); $j++)
						{
							$value = $variable->values->item($j);
							if ($t->flag_struct_check_types)
							{
								$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr("if (\$k == ") . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr("\$this->") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = Runtime.rtl.to(\$v, null, ") . \Runtime\rtl::toStr(static::toPattern($t, $variable->pattern)) . \Runtime\rtl::toStr(");")));
							}
							else
							{
								$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr("if (\$k == ") . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr("\$this->") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = \$v;")));
							}
							$flag = true;
						}
					}
					if ($t->current_class->extend_name)
					{
						$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr("parent::assignValue(\$ctx,\$k,\$v);")));
					}
					$t = $t->levelDec();
					$content .= \Runtime\rtl::toStr($t->s("}"));
				}
				/* Take Value */
				$content .= \Runtime\rtl::toStr($t->s("function takeValue(\$ctx,\$k,\$d=null)"));
				$content .= \Runtime\rtl::toStr($t->s("{"));
				$t = $t->levelInc();
				$flag = false;
				for ($i = 0; $i < $op_code->vars->count(); $i++)
				{
					$variable = $op_code->vars->item($i);
					if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
					{
						continue;
					}
					if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
					{
						continue;
					}
					$is_const = $variable->flags->isFlag("const");
					$is_static = $variable->flags->isFlag("static");
					$is_protected = $variable->flags->isFlag("protected");
					$is_private = $variable->flags->isFlag("private");
					if ($is_const || $is_static)
					{
						continue;
					}
					if ($is_protected || $is_private)
					{
						continue;
					}
					for ($j = 0; $j < $variable->values->count(); $j++)
					{
						$value = $variable->values->item($j);
						$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr("if (\$k == ") . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(")return \$this->") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(";")));
						$flag = true;
					}
				}
				if ($t->current_class->extend_name)
				{
					$content .= \Runtime\rtl::toStr($t->s("return parent::takeValue(\$ctx,\$k,\$d);"));
				}
				$t = $t->levelDec();
				$content .= \Runtime\rtl::toStr($t->s("}"));
			}
		}
		if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			/* Get current namespace function */
			$content .= \Runtime\rtl::toStr($t->s("static function getNamespace()"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($t->current_namespace_name)) . \Runtime\rtl::toStr(";")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
			/* Get current class name function */
			$content .= \Runtime\rtl::toStr($t->s("static function getClassName()"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($t->current_class_full_name)) . \Runtime\rtl::toStr(";")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
			/* Get parent class name function */
			$content .= \Runtime\rtl::toStr($t->s("static function getParentClassName()"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($t->expression::findModuleName($t, $t->current_class_extends_name))) . \Runtime\rtl::toStr(";")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
			/* Class info */
			$content .= \Runtime\rtl::toStr($t->s("static function getClassInfo(\$ctx)"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$t = $t::clearSaveOpCode($t);
			$content .= \Runtime\rtl::toStr($t->s("return \\Runtime\\Dict::from(["));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("\"annotations\"=>\\Runtime\\Collection::from(["));
			$t = $t->levelInc();
			for ($j = 0; $j < $op_code->annotations->count(); $j++)
			{
				$annotation = $op_code->annotations->item($j);
				$res = $t->expression::OpTypeIdentifier($t, $annotation->name);
				$t = \Runtime\rtl::attr($res, 0);
				$name = \Runtime\rtl::attr($res, 1);
				if ($annotation->params != null)
				{
					$res = $t->expression::OpDict($t, $annotation->params, true);
					$t = \Runtime\rtl::attr($res, 0);
					$params = \Runtime\rtl::attr($res, 1);
					$content .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(\$ctx, ") . \Runtime\rtl::toStr($params) . \Runtime\rtl::toStr("),")));
				}
				else
				{
					$content .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(\$ctx),")));
				}
			}
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("]),"));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("]);"));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
			/* Get fields list of the function */
			$content .= \Runtime\rtl::toStr($t->s("static function getFieldsList(\$ctx)"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("\$a = [];"));
			if ($op_code->vars != null)
			{
				$vars = new \Runtime\Map();
				for ($i = 0; $i < $op_code->vars->count(); $i++)
				{
					$variable = $op_code->vars->item($i);
					$is_const = $variable->flags->isFlag("const");
					$is_static = $variable->flags->isFlag("static");
					$is_protected = $variable->flags->isFlag("protected");
					$is_private = $variable->flags->isFlag("private");
					$has_annotation = $variable->annotations != null && $variable->annotations->count() > 0;
					if ($is_const || $is_static)
					{
						continue;
					}
					if ($is_protected || $is_private)
					{
						continue;
					}
					if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
					{
						continue;
					}
					if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT)
					{
						if ($variable->annotations == null)
						{
							continue;
						}
						if ($variable->annotations->count() == 0)
						{
							continue;
						}
					}
					if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
					{
						continue;
					}
					for ($j = 0; $j < $variable->values->count(); $j++)
					{
						$value = $variable->values->item($j);
						$content .= \Runtime\rtl::toStr($t->s("\$a[]=" . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(";")));
					}
				}
			}
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::getModuleName($t, "Runtime.Collection")) . \Runtime\rtl::toStr("::from(\$a);")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
			/* Get field info by name */
			$content .= \Runtime\rtl::toStr($t->s("static function getFieldInfoByName(\$ctx,\$field_name)"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			if ($op_code->vars != null)
			{
				for ($i = 0; $i < $op_code->vars->count(); $i++)
				{
					$variable = $op_code->vars->item($i);
					if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
					{
						continue;
					}
					if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
					{
						continue;
					}
					$is_const = $variable->flags->isFlag("const");
					$is_static = $variable->flags->isFlag("static");
					$is_protected = $variable->flags->isFlag("protected");
					$is_private = $variable->flags->isFlag("private");
					if ($is_const || $is_static)
					{
						continue;
					}
					if ($is_protected || $is_private)
					{
						continue;
					}
					if ($variable->annotations == null)
					{
						continue;
					}
					if ($variable->annotations->count() == 0)
					{
						continue;
					}
					$v = $variable->values->map(function ($value)
					{
						return $value->var_name;
					});
					$v = $v->map(function ($var_name) use (&$t)
					{
						return "\$field_name == " . \Runtime\rtl::toStr($t->expression::toString($var_name));
					});
					$var_type = \Runtime\rs::join(".", $t->expression::findModuleNames($t, $variable->pattern->entity_name->names));
					$var_sub_types = ($variable->pattern->template != null) ? ($variable->pattern->template->map(function ($op_code) use (&$t)
					{
						return \Runtime\rs::join(".", $t->expression::findModuleNames($t, $op_code->entity_name->names));
					})) : (\Runtime\Vector::from([]));
					$var_sub_types = $var_sub_types->map($t->expression::toString);
					$t = $t::clearSaveOpCode($t);
					$content .= \Runtime\rtl::toStr($t->s("if (" . \Runtime\rtl::toStr(\Runtime\rs::join(" or ", $v)) . \Runtime\rtl::toStr(") ") . \Runtime\rtl::toStr("return \\Runtime\\Dict::from([")));
					$t = $t->levelInc();
					$content .= \Runtime\rtl::toStr($t->s("\"t\"=>" . \Runtime\rtl::toStr($t->expression::toString($var_type)) . \Runtime\rtl::toStr(",")));
					if ($var_sub_types->count() > 0)
					{
						$content .= \Runtime\rtl::toStr($t->s("\"s\"=> [" . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $var_sub_types)) . \Runtime\rtl::toStr("],")));
					}
					$content .= \Runtime\rtl::toStr($t->s("\"annotations\"=>\\Runtime\\Collection::from(["));
					$t = $t->levelInc();
					for ($j = 0; $j < $variable->annotations->count(); $j++)
					{
						$annotation = $variable->annotations->item($j);
						$res = $t->expression::OpTypeIdentifier($t, $annotation->name);
						$t = \Runtime\rtl::attr($res, 0);
						$name = \Runtime\rtl::attr($res, 1);
						$res = $t->expression::OpDict($t, $annotation->params, true);
						$t = \Runtime\rtl::attr($res, 0);
						$params = \Runtime\rtl::attr($res, 1);
						$content .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(\$ctx, ") . \Runtime\rtl::toStr($params) . \Runtime\rtl::toStr("),")));
					}
					$t = $t->levelDec();
					$content .= \Runtime\rtl::toStr($t->s("]),"));
					$t = $t->levelDec();
					$content .= \Runtime\rtl::toStr($t->s("]);"));
				}
			}
			$content .= \Runtime\rtl::toStr($t->s("return null;"));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
			/* Get methods list of the function */
			$content .= \Runtime\rtl::toStr($t->s("static function getMethodsList(\$ctx)"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("\$a=["));
			$t = $t->levelInc();
			if ($op_code->functions != null)
			{
				for ($i = 0; $i < $op_code->functions->count(); $i++)
				{
					$f = $op_code->functions->item($i);
					if ($f->flags->isFlag("declare"))
					{
						continue;
					}
					if ($f->flags->isFlag("protected"))
					{
						continue;
					}
					if ($f->flags->isFlag("private"))
					{
						continue;
					}
					if ($f->annotations->count() == 0)
					{
						continue;
					}
					$content .= \Runtime\rtl::toStr($t->s($t->expression::toString($f->name) . \Runtime\rtl::toStr(",")));
				}
			}
			if ($op_code->items != null)
			{
				for ($i = 0; $i < $op_code->items->count(); $i++)
				{
					$item = $op_code->items->item($i);
					$res = static::OpClassBodyItemMethodsList($t, $item);
					$t = \Runtime\rtl::attr($res, 0);
					$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				}
			}
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("];"));
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::getModuleName($t, "Runtime.Collection")) . \Runtime\rtl::toStr("::from(\$a);")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
			/* Get method info by name */
			$content .= \Runtime\rtl::toStr($t->s("static function getMethodInfoByName(\$ctx,\$field_name)"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			if ($op_code->functions != null)
			{
				for ($i = 0; $i < $op_code->functions->count(); $i++)
				{
					$f = $op_code->functions->item($i);
					$res = static::OpFunctionAnnotations($t, $f);
					$t = \Runtime\rtl::attr($res, 0);
					$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				}
			}
			if ($op_code->items != null)
			{
				for ($i = 0; $i < $op_code->items->count(); $i++)
				{
					$item = $op_code->items->item($i);
					$res = static::OpClassBodyItemAnnotations($t, $item);
					$t = \Runtime\rtl::attr($res, 0);
					$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				}
			}
			$content .= \Runtime\rtl::toStr($t->s("return null;"));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("}"));
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClassFooter
	 */
	static function OpDeclareClassFooter($t, $op_code)
	{
		$content = "";
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClass
	 */
	static function OpDeclareClass($t, $op_code)
	{
		if ($op_code->is_abstract)
		{
			return \Runtime\Vector::from([$t,""]);
		}
		if ($op_code->is_declare)
		{
			throw new \BayLang\Exceptions\DeclaredClass();
			return \Runtime\Vector::from([$t,""]);
		}
		$content = "";
		$t = \Runtime\rtl::setAttr($t, ["current_class"], $op_code);
		$t = \Runtime\rtl::setAttr($t, ["current_class_name"], $op_code->name);
		$t = \Runtime\rtl::setAttr($t, ["current_class_full_name"], $t->current_namespace_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($t->current_class_name));
		if ($op_code->class_extends != null)
		{
			$extends_name = \Runtime\rs::join(".", $op_code->class_extends->entity_name->names);
			$t = \Runtime\rtl::setAttr($t, ["current_class_extends_name"], $extends_name);
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT)
		{
			$t = \Runtime\rtl::setAttr($t, ["current_class_extends_name"], "Runtime.BaseStruct");
		}
		else if ($op_code->kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT)
		{
			$t = \Runtime\rtl::setAttr($t, ["current_class_extends_name"], "");
		}
		if ($op_code->kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			if ($op_code->class_extends != null)
			{
				$content = "class " . \Runtime\rtl::toStr($t->current_class_name) . \Runtime\rtl::toStr(" extends ") . \Runtime\rtl::toStr($t->expression::getModuleName($t, $t->current_class_extends_name));
			}
			else
			{
				$content = "class " . \Runtime\rtl::toStr($t->current_class_name);
			}
		}
		else
		{
			$content = "interface " . \Runtime\rtl::toStr($t->current_class_name);
		}
		/* Add implements */
		if ($op_code->class_implements != null && $op_code->class_implements->count() > 0)
		{
			$arr = $op_code->class_implements->map(function ($item) use (&$t)
			{
				return $t->expression::getModuleNames($t, $item->entity_name->names);
			});
			$s1 = \Runtime\rs::join(", ", $arr);
			$content .= \Runtime\rtl::toStr(" implements " . \Runtime\rtl::toStr($s1));
		}
		/* Class body */
		$res = static::OpDeclareClassBody($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Class comments */
		$res = $t->operator::AddComments($t, $op_code->comments, $content);
		$content = \Runtime\rtl::attr($res, 1);
		/* Class footer */
		$res = static::OpDeclareClassFooter($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		return \Runtime\Vector::from([$t,$t->s($content)]);
	}
	/**
	 * Translate item
	 */
	static function translateItem($t, $op_code)
	{
		if ($op_code instanceof \BayLang\OpCodes\OpNamespace)
		{
			return static::OpNamespace($t, $op_code);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpDeclareClass)
		{
			return static::OpDeclareClass($t, $op_code);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpComment)
		{
			return $t->operator::OpComment($t, $op_code);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPreprocessorIfCode)
		{
			return $t->operator::OpPreprocessorIfCode($t, $op_code);
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpPreprocessorSwitch)
		{
			$content = "";
			for ($i = 0; $i < $op_code->items->count(); $i++)
			{
				$res = $t->operator::OpPreprocessorIfCode($t, $op_code->items->item($i));
				$s = \Runtime\rtl::attr($res, 1);
				if ($s == "")
				{
					continue;
				}
				$content .= \Runtime\rtl::toStr($s);
			}
			return \Runtime\Vector::from([$t,$content]);
		}
		return \Runtime\Vector::from([$t,""]);
	}
	/**
	 * Translate program
	 */
	static function translateProgramHeader($t, $op_code)
	{
		$content = "<?php";
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Translate program
	 */
	static function translateProgram($t, $op_code)
	{
		$content = "";
		if ($op_code == null)
		{
			return \Runtime\Vector::from([$t,$content]);
		}
		if ($op_code->uses != null)
		{
			$t = \Runtime\rtl::setAttr($t, ["modules"], $op_code->uses);
		}
		if ($op_code->items != null)
		{
			$res = static::translateProgramHeader($t, $op_code);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			for ($i = 0; $i < $op_code->items->count(); $i++)
			{
				$item = $op_code->items->item($i);
				$res = static::translateItem($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$s = \Runtime\rtl::attr($res, 1);
				if ($s == "")
				{
					continue;
				}
				$content .= \Runtime\rtl::toStr($s);
			}
		}
		$content = \Runtime\rs::trim($content);
		/* Disable context */
		if ($t->enable_context == false)
		{
			$content = \Runtime\rs::replace("(\$ctx)", "()", $content);
			$content = \Runtime\rs::replace("(\$ctx, ", "(", $content);
			$content = \Runtime\rs::replace("(\$ctx,", "(", $content);
			$content = \Runtime\rs::replace(",\$ctx,", ",", $content);
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangPHP";
	}
	static function getClassName()
	{
		return "BayLang.LangPHP.TranslatorPHPProgram";
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