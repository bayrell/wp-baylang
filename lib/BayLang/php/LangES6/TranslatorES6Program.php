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
class TranslatorES6Program extends \Runtime\BaseStruct
{
	/**
	 * To pattern
	 */
	static function toPattern($t, $pattern)
	{
		$names = $t->expression::findModuleNames($t, $pattern->entity_name->names);
		$e = \Runtime\rs::join(".", $names);
		$a = ($pattern->template != null) ? ($pattern->template->map(function ($pattern) use (&$t)
		{
			return static::toPattern($t, $pattern);
		})) : (null);
		$b = ($a != null) ? (",\"t\":[" . \Runtime\rtl::toStr(\Runtime\rs::join(",", $a)) . \Runtime\rtl::toStr("]")) : ("");
		return "{\"e\":" . \Runtime\rtl::toStr($t->expression::toString($e)) . \Runtime\rtl::toStr($b) . \Runtime\rtl::toStr("}");
	}
	/**
	 * OpNamespace
	 */
	static function OpNamespace($t, $op_code)
	{
		$content = "";
		$name = "";
		$s = "";
		$arr = \Runtime\rs::split(".", $op_code->name);
		for ($i = 0; $i < $arr->count(); $i++)
		{
			$name = $name . \Runtime\rtl::toStr((($i == 0) ? ("") : ("."))) . \Runtime\rtl::toStr($arr->item($i));
			$s = "if (typeof " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr(" == 'undefined') ") . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr(" = {};");
			$content .= \Runtime\rtl::toStr($t->s($s));
		}
		$t = \Runtime\rtl::setAttr($t, ["current_namespace_name"], $op_code->name);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareFunction
	 */
	static function OpDeclareFunction($t, $op_code)
	{
		$is_static_function = $t->is_static_function;
		$is_static = $op_code->isStatic();
		$content = "";
		if ($op_code->isFlag("declare"))
		{
			return \Runtime\Vector::from([$t,""]);
		}
		if (!$is_static && $is_static_function || $is_static && !$is_static_function)
		{
			return \Runtime\Vector::from([$t,""]);
		}
		/* Set current function */
		$t = \Runtime\rtl::setAttr($t, ["current_function"], $op_code);
		$is_async = "";
		if ($op_code->isFlag("async") && $t->isAsyncAwait())
		{
			$is_async = "async ";
		}
		$s = "";
		$res = $t->operator::OpDeclareFunctionArgs($t, $op_code);
		$args = \Runtime\rtl::attr($res, 1);
		$s .= \Runtime\rtl::toStr($op_code->name . \Runtime\rtl::toStr(": ") . \Runtime\rtl::toStr($is_async) . \Runtime\rtl::toStr("function(") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr(")"));
		$res = $t->operator::OpDeclareFunctionBody($t, $op_code);
		$s .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$s .= \Runtime\rtl::toStr(",");
		/* Function comments */
		$res = $t->operator::AddComments($t, $op_code->comments, $t->s($s));
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClass
	 */
	static function OpDeclareClassConstructor($t, $op_code)
	{
		$open = "";
		$content = "";
		$save_t = $t;
		/* Set function name */
		$t = \Runtime\rtl::setAttr($t, ["current_function"], $op_code->fn_create);
		/* Clear save op codes */
		$t = $t::clearSaveOpCode($t);
		if ($op_code->fn_create == null)
		{
			$open .= \Runtime\rtl::toStr($t->current_class_full_name . \Runtime\rtl::toStr(" = "));
			$open .= \Runtime\rtl::toStr("function(ctx)");
			$open = $t->s($open) . \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			/* Call parent */
			if ($t->current_class_extends_name != "")
			{
				$content .= \Runtime\rtl::toStr($t->s($t->expression::useModuleName($t, $t->current_class_extends_name) . \Runtime\rtl::toStr(".apply(this, arguments);")));
			}
		}
		else
		{
			$open .= \Runtime\rtl::toStr($t->current_class_full_name . \Runtime\rtl::toStr(" = function("));
			$res = $t->operator::OpDeclareFunctionArgs($t, $op_code->fn_create);
			$t = \Runtime\rtl::attr($res, 0);
			$open .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			$open .= \Runtime\rtl::toStr(")");
			$open = $t->s($open) . \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
		}
		/* Function body */
		if ($op_code->fn_create != null)
		{
			if ($op_code->fn_create->args)
			{
				for ($i = 0; $i < $op_code->fn_create->args->count(); $i++)
				{
					$arg = $op_code->fn_create->args->item($i);
					if ($arg->expression == null)
					{
						continue;
					}
					$res = $t->expression::Expression($t, $arg->expression);
					$t = \Runtime\rtl::attr($res, 0);
					$s = \Runtime\rtl::attr($res, 1);
					$s = "if (" . \Runtime\rtl::toStr($arg->name) . \Runtime\rtl::toStr(" == undefined) ") . \Runtime\rtl::toStr($arg->name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(";");
					$content .= \Runtime\rtl::toStr($t->s($s));
				}
			}
			$res = $t->operator::Operators($t, ($op_code->fn_create->expression) ? ($op_code->fn_create->expression) : ($op_code->fn_create->items));
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		/* Constructor end */
		$content = $open . \Runtime\rtl::toStr($content);
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("};"));
		return \Runtime\Vector::from([$save_t,$content]);
	}
	/**
	 * OpDeclareClassBodyItem
	 */
	static function OpDeclareClassBodyItem($t, $item)
	{
		$content = "";
		if ($item instanceof \BayLang\OpCodes\OpPreprocessorIfDef)
		{
			$res = $t->operator::OpPreprocessorIfDef($t, $item, \BayLang\OpCodes\OpPreprocessorIfDef::KIND_CLASS_BODY);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
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
		$content .= \Runtime\rtl::toStr($t->s("if (field_name == " . \Runtime\rtl::toStr($t->expression::toString($f->name)) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$s1 = "";
		$t = $t->levelInc();
		$s1 .= \Runtime\rtl::toStr($t->s("var Vector = " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Vector")) . \Runtime\rtl::toStr(";")));
		$s1 .= \Runtime\rtl::toStr($t->s("var Map = " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Map")) . \Runtime\rtl::toStr(";")));
		$s1 .= \Runtime\rtl::toStr($t->s("return Map.from({"));
		$t = $t->levelInc();
		if ($f->flags->isFlag("async"))
		{
			$s1 .= \Runtime\rtl::toStr($t->s("\"async\": true,"));
		}
		$s1 .= \Runtime\rtl::toStr($t->s("\"annotations\": Vector.from(["));
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
			$s1 .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(ctx, ") . \Runtime\rtl::toStr($params) . \Runtime\rtl::toStr("),")));
		}
		$t = $t->levelDec();
		$s1 .= \Runtime\rtl::toStr($t->s("]),"));
		$t = $t->levelDec();
		$s1 .= \Runtime\rtl::toStr($t->s("});"));
		$save = $t::outputSaveOpCode($t);
		if ($save != "")
		{
			$content .= \Runtime\rtl::toStr($t->s($save));
		}
		$content .= \Runtime\rtl::toStr($s1);
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
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
	 * Static variables
	 */
	static function OpDeclareClassStaticVariables($t, $op_code)
	{
		$content = "";
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
				$is_static = $variable->flags->isFlag("static");
				if (!$is_static)
				{
					continue;
				}
				for ($j = 0; $j < $variable->values->count(); $j++)
				{
					$value = $variable->values->item($j);
					$res = $t->expression::Expression($t, $value->expression);
					$s = ($value->expression != null) ? (\Runtime\rtl::attr($res, 1)) : ("null");
					$content .= \Runtime\rtl::toStr($t->s($value->var_name . \Runtime\rtl::toStr(": ") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(",")));
				}
			}
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Static functions
	 */
	static function OpDeclareClassStaticFunctions($t, $op_code)
	{
		$content = "";
		/* Static Functions */
		if ($op_code->functions != null)
		{
			$t = \Runtime\rtl::setAttr($t, ["is_static_function"], true);
			for ($i = 0; $i < $op_code->functions->count(); $i++)
			{
				$f = $op_code->functions->item($i);
				if ($f->flags->isFlag("declare"))
				{
					continue;
				}
				if (!$f->isStatic())
				{
					continue;
				}
				/* Set function name */
				$t = \Runtime\rtl::setAttr($t, ["current_function"], $f);
				$is_async = "";
				if ($f->isFlag("async") && $t->isAsyncAwait())
				{
					$is_async = "async ";
				}
				$s = "";
				$res = $t->operator::OpDeclareFunctionArgs($t, $f);
				$args = \Runtime\rtl::attr($res, 1);
				$s .= \Runtime\rtl::toStr($f->name . \Runtime\rtl::toStr(": ") . \Runtime\rtl::toStr($is_async) . \Runtime\rtl::toStr("function(") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr(")"));
				$res = $t->operator::OpDeclareFunctionBody($t, $f);
				$s .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				$s .= \Runtime\rtl::toStr(",");
				/* Function comments */
				$res = $t->operator::AddComments($t, $f->comments, $t->s($s));
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		/* Items */
		if ($op_code->items != null)
		{
			$t = \Runtime\rtl::setAttr($t, ["is_static_function"], true);
			for ($i = 0; $i < $op_code->items->count(); $i++)
			{
				$item = $op_code->items->item($i);
				$res = static::OpDeclareClassBodyItem($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClass
	 */
	static function OpDeclareClassBodyStatic($t, $op_code)
	{
		$content = "";
		$class_kind = $op_code->kind;
		$current_class_extends_name = $t->expression::findModuleName($t, $t->current_class_extends_name);
		$save_op_codes = $t->save_op_codes;
		$save_op_code_inc = $t->save_op_code_inc;
		$t = $t::clearSaveOpCode($t);
		/* Returns parent class name */
		$parent_class_name = "";
		if ($op_code->class_extends != null)
		{
			$res = $t->expression::OpTypeIdentifier($t, $op_code->class_extends);
			$parent_class_name = \Runtime\rtl::attr($res, 1);
		}
		/* Extends */
		if ($current_class_extends_name != "" && !$op_code->is_component)
		{
			$content .= \Runtime\rtl::toStr($t->s("Object.assign(" . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($t->expression::useModuleName($t, $current_class_extends_name)) . \Runtime\rtl::toStr(");")));
		}
		$content .= \Runtime\rtl::toStr($t->s("Object.assign(" . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(",")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* Static variables */
		$res = static::OpDeclareClassStaticVariables($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Static Functions */
		if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			$res = static::OpDeclareClassStaticFunctions($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		/* Declare component functions */
		if ($op_code->is_model || $op_code->is_component)
		{
			$res = static::OpDeclareComponentFunctions($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		/* Static init Functions */
		$res = static::OpDeclareClassStaticInitFunctions($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("});"));
		/* Restore save op codes */
		$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
		$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Static init functions
	 */
	static function OpDeclareClassStaticInitFunctions($t, $op_code)
	{
		$content = "";
		$class_kind = $op_code->kind;
		$current_class_extends_name = $t->expression::findModuleName($t, $t->current_class_extends_name);
		if ($class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE)
		{
			/* Get current namespace function */
			$content .= \Runtime\rtl::toStr($t->s("getNamespace: function()"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($t->current_namespace_name)) . \Runtime\rtl::toStr(";")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("},"));
			/* Get current class name function */
			$content .= \Runtime\rtl::toStr($t->s("getClassName: function()"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($t->current_class_full_name)) . \Runtime\rtl::toStr(";")));
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("},"));
			return \Runtime\Vector::from([$t,$content]);
		}
		if ($op_code->is_component == false)
		{
			$content .= \Runtime\rtl::toStr($t->s("/* ======================= Class Init Functions ======================= */"));
		}
		/* Get current namespace function */
		$content .= \Runtime\rtl::toStr($t->s("getNamespace: function()"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($t->current_namespace_name)) . \Runtime\rtl::toStr(";")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Get current class name function */
		$content .= \Runtime\rtl::toStr($t->s("getClassName: function()"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($t->current_class_full_name)) . \Runtime\rtl::toStr(";")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Get parent class name function */
		$content .= \Runtime\rtl::toStr($t->s("getParentClassName: function()"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::toString($current_class_extends_name)) . \Runtime\rtl::toStr(";")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Class info */
		$content .= \Runtime\rtl::toStr($t->s("getClassInfo: function(ctx)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$t = $t::clearSaveOpCode($t);
		$s1 = "";
		$s1 .= \Runtime\rtl::toStr($t->s("var Vector = " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Vector")) . \Runtime\rtl::toStr(";")));
		$s1 .= \Runtime\rtl::toStr($t->s("var Map = " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Map")) . \Runtime\rtl::toStr(";")));
		$s1 .= \Runtime\rtl::toStr($t->s("return Map.from({"));
		$t = $t->levelInc();
		$s1 .= \Runtime\rtl::toStr($t->s("\"annotations\": Vector.from(["));
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
				$s1 .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(ctx, ") . \Runtime\rtl::toStr($params) . \Runtime\rtl::toStr("),")));
			}
			else
			{
				$s1 .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(ctx),")));
			}
		}
		$t = $t->levelDec();
		$s1 .= \Runtime\rtl::toStr($t->s("]),"));
		$t = $t->levelDec();
		$s1 .= \Runtime\rtl::toStr($t->s("});"));
		$save = $t::outputSaveOpCode($t);
		if ($save != "")
		{
			$content .= \Runtime\rtl::toStr($save);
		}
		$content .= \Runtime\rtl::toStr($s1);
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Get fields list of the function */
		$t = $t::clearSaveOpCode($t);
		$content .= \Runtime\rtl::toStr($t->s("getFieldsList: function(ctx)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("var a = [];"));
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
				$is_serializable = $variable->flags->isFlag("serializable");
				$is_assignable = true;
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
					$content .= \Runtime\rtl::toStr($t->s("a.push(" . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(");")));
				}
			}
		}
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Vector")) . \Runtime\rtl::toStr(".from(a);")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Get field info by name */
		$content .= \Runtime\rtl::toStr($t->s("getFieldInfoByName: function(ctx,field_name)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		if ($op_code->vars != null)
		{
			$content .= \Runtime\rtl::toStr($t->s("var Vector = " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Vector")) . \Runtime\rtl::toStr(";")));
			$content .= \Runtime\rtl::toStr($t->s("var Map = " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Map")) . \Runtime\rtl::toStr(";")));
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
					return "field_name == " . \Runtime\rtl::toStr($t->expression::toString($var_name));
				});
				$var_type = \Runtime\rs::join(".", $t->expression::findModuleNames($t, $variable->pattern->entity_name->names));
				$var_sub_types = ($variable->pattern->template != null) ? ($variable->pattern->template->map(function ($op_code) use (&$t)
				{
					return \Runtime\rs::join(".", $t->expression::findModuleNames($t, $op_code->entity_name->names));
				})) : (\Runtime\Vector::from([]));
				$var_sub_types = $var_sub_types->map($t->expression::toString);
				$t = $t::clearSaveOpCode($t);
				$s1 = "";
				$s1 .= \Runtime\rtl::toStr($t->s("if (" . \Runtime\rtl::toStr(\Runtime\rs::join(" or ", $v)) . \Runtime\rtl::toStr(") return Map.from({")));
				$t = $t->levelInc();
				$s1 .= \Runtime\rtl::toStr($t->s("\"t\": " . \Runtime\rtl::toStr($t->expression::toString($var_type)) . \Runtime\rtl::toStr(",")));
				if ($var_sub_types->count() > 0)
				{
					$s1 .= \Runtime\rtl::toStr($t->s("\"s\": [" . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $var_sub_types)) . \Runtime\rtl::toStr("],")));
				}
				$s1 .= \Runtime\rtl::toStr($t->s("\"annotations\": Vector.from(["));
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
					$s1 .= \Runtime\rtl::toStr($t->s("new " . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("(ctx, ") . \Runtime\rtl::toStr($params) . \Runtime\rtl::toStr("),")));
				}
				$t = $t->levelDec();
				$s1 .= \Runtime\rtl::toStr($t->s("]),"));
				$t = $t->levelDec();
				$s1 .= \Runtime\rtl::toStr($t->s("});"));
				$save = $t::outputSaveOpCode($t);
				if ($save != "")
				{
					$content .= \Runtime\rtl::toStr($save);
				}
				$content .= \Runtime\rtl::toStr($s1);
			}
		}
		$content .= \Runtime\rtl::toStr($t->s("return null;"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Get methods list of the function */
		$t = $t::clearSaveOpCode($t);
		$content .= \Runtime\rtl::toStr($t->s("getMethodsList: function(ctx)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("var a=["));
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
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::useModuleName($t, "Runtime.Vector")) . \Runtime\rtl::toStr(".from(a);")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Get method info by name */
		$t = $t::clearSaveOpCode($t);
		$content .= \Runtime\rtl::toStr($t->s("getMethodInfoByName: function(ctx,field_name)"));
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
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Add implements */
		if ($op_code->class_implements != null && $op_code->class_implements->count() > 0)
		{
			$content .= \Runtime\rtl::toStr($t->s("__implements__:"));
			$content .= \Runtime\rtl::toStr($t->s("["));
			$t = $t->levelInc();
			for ($i = 0; $i < $op_code->class_implements->count(); $i++)
			{
				$item = $op_code->class_implements->item($i);
				$module_name = $item->entity_name->names->first();
				$s = $t->expression::useModuleName($t, $module_name);
				if ($s == "")
				{
					continue;
				}
				$content .= \Runtime\rtl::toStr($t->s($s . \Runtime\rtl::toStr(",")));
			}
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("],"));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Class variables
	 */
	static function OpDeclareClassInitVariables($t, $op_code)
	{
		$content = "";
		$class_kind = $op_code->kind;
		$vars = $op_code->vars->filter(function ($variable)
		{
			return !$variable->flags->isFlag("static");
		});
		if ($t->current_class_full_name != "Runtime.BaseObject" && $vars->count() > 0)
		{
			$content .= \Runtime\rtl::toStr($t->s("_init: function(ctx)"));
			$content .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			/* Clear save op codes */
			$save_op_codes = $t->save_op_codes;
			$save_op_code_inc = $t->save_op_code_inc;
			if ($t->current_class_extends_name != "")
			{
				$content .= \Runtime\rtl::toStr($t->s($t->expression::useModuleName($t, $t->current_class_extends_name) . \Runtime\rtl::toStr(".prototype._init.call(this,ctx);")));
			}
			$s1 = "";
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
					/* prefix = "__"; */
					$prefix = "";
				}
				else if ($class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_CLASS)
				{
					$prefix = "";
				}
				for ($j = 0; $j < $variable->values->count(); $j++)
				{
					$value = $variable->values->item($j);
					$res = $t->expression::Expression($t, $value->expression);
					$t = \Runtime\rtl::attr($res, 0);
					$s = ($value->expression != null) ? (\Runtime\rtl::attr($res, 1)) : ("null");
					$s1 .= \Runtime\rtl::toStr($t->s("this." . \Runtime\rtl::toStr($prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(";")));
				}
			}
			/* Output save op code */
			$save = $t::outputSaveOpCode($t, $save_op_codes->count());
			if ($save != "")
			{
				$content .= \Runtime\rtl::toStr($save);
			}
			/* Restore save op codes */
			$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
			$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
			/* Add content */
			$content .= \Runtime\rtl::toStr($s1);
			$t = $t->levelDec();
			$content .= \Runtime\rtl::toStr($t->s("},"));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Component props
	 */
	static function OpDeclareComponentProps($t, $op_code)
	{
		$vars = $op_code->vars->filter(function ($variable)
		{
			return $variable->flags->isFlag("props");
		});
		if ($vars->count() == 0)
		{
			return \Runtime\Vector::from([$t,""]);
		}
		$content = "";
		$content .= \Runtime\rtl::toStr($t->s("props: {"));
		$t = $t->levelInc();
		for ($i = 0; $i < $vars->count(); $i++)
		{
			$variable = $vars->item($i);
			if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
			{
				continue;
			}
			if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
			{
				continue;
			}
			for ($j = 0; $j < $variable->values->count(); $j++)
			{
				$value = $variable->values->item($j);
				$res = $t->expression::Expression($t, $value->expression);
				$t = \Runtime\rtl::attr($res, 0);
				$s = ($value->expression != null) ? (\Runtime\rtl::attr($res, 1)) : ("null");
				$content .= \Runtime\rtl::toStr($t->s($t->expression::toString($value->var_name) . \Runtime\rtl::toStr(": {")));
				$t = $t->levelInc();
				$content .= \Runtime\rtl::toStr($t->s("default: " . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(",")));
				$t = $t->levelDec();
				$content .= \Runtime\rtl::toStr($t->s("},"));
			}
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Component variables
	 */
	static function OpDeclareComponentVariables($t, $op_code)
	{
		$vars = $op_code->vars->filter(function ($variable)
		{
			return !$variable->flags->isFlag("static") && !$variable->flags->isFlag("props");
		});
		if ($vars->count() == 0)
		{
			return \Runtime\Vector::from([$t,""]);
		}
		$content = "";
		$content .= \Runtime\rtl::toStr($t->s("data: function ()"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return {"));
		$t = $t->levelInc();
		for ($i = 0; $i < $vars->count(); $i++)
		{
			$variable = $vars->item($i);
			if ($variable->kind != \BayLang\OpCodes\OpAssign::KIND_DECLARE)
			{
				continue;
			}
			if ($variable->condition && \Runtime\rtl::attr($t->preprocessor_flags, $variable->condition->value) != true)
			{
				continue;
			}
			for ($j = 0; $j < $variable->values->count(); $j++)
			{
				$value = $variable->values->item($j);
				$res = $t->expression::Expression($t, $value->expression);
				$t = \Runtime\rtl::attr($res, 0);
				$s = ($value->expression != null) ? (\Runtime\rtl::attr($res, 1)) : ("null");
				$content .= \Runtime\rtl::toStr($t->s($value->var_name . \Runtime\rtl::toStr(": ") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(",")));
			}
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("};"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Declare component functions
	 */
	static function OpDeclareComponentFunctions($t, $op_code)
	{
		$content = "";
		/* CSS */
		$content .= \Runtime\rtl::toStr($t->s("css: function(vars)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("var res = \"\";"));
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
			$content .= \Runtime\rtl::toStr($t->s("res += Runtime.rtl.toStr(" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(");")));
		}
		$content .= \Runtime\rtl::toStr($t->s("return res;"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		/* Widget data */
		/*
		OpWidget op_code_widget = op_code.items.findItem(lib::isInstance(classof OpWidget));
		OpHtmlMeta op_code_meta = op_code.items.findItem(lib::isInstance(classof OpHtmlMeta));
		if (op_code_widget)
		{
			content ~= t.s("getWidgetData: function()");
			content ~= t.s("{");
			t = t.levelInc();
			content ~= t.s("return {");
			t = t.levelInc();
			content ~= t.s("\"data\": null,");
			content ~= t.s("\"info\": null,");
			t = t.levelDec();
			content ~= t.s("};");
			t = t.levelDec();
			content ~= t.s("}");
		}
		*/
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Class functions
	 */
	static function OpDeclareClassFunctions($t, $op_code)
	{
		$content = "";
		/* Functions */
		if ($op_code->functions != null)
		{
			$t = \Runtime\rtl::setAttr($t, ["is_static_function"], false);
			for ($i = 0; $i < $op_code->functions->count(); $i++)
			{
				$f = $op_code->functions->item($i);
				if ($f->flags->isFlag("declare"))
				{
					continue;
				}
				if ($f->isStatic())
				{
					continue;
				}
				/* Set function name */
				$t = \Runtime\rtl::setAttr($t, ["current_function"], $f);
				$is_async = "";
				if ($f->isFlag("async") && $t->isAsyncAwait())
				{
					$is_async = "async ";
				}
				$s = "";
				$res = $t->operator::OpDeclareFunctionArgs($t, $f);
				$args = \Runtime\rtl::attr($res, 1);
				$s .= \Runtime\rtl::toStr($f->name . \Runtime\rtl::toStr(": ") . \Runtime\rtl::toStr($is_async) . \Runtime\rtl::toStr("function(") . \Runtime\rtl::toStr($args) . \Runtime\rtl::toStr(")"));
				$res = $t->operator::OpDeclareFunctionBody($t, $f);
				$s .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				$s .= \Runtime\rtl::toStr(",");
				/* Function comments */
				$res = $t->operator::AddComments($t, $f->comments, $t->s($s));
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		/* Items */
		if ($op_code->items != null)
		{
			$t = \Runtime\rtl::setAttr($t, ["is_static_function"], false);
			for ($i = 0; $i < $op_code->items->count(); $i++)
			{
				$item = $op_code->items->item($i);
				$res = static::OpDeclareClassBodyItem($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Class assignObject function
	 */
	static function OpDeclareClassAssignObject($t, $op_code)
	{
		$content = "";
		$var_prefix = "";
		/* Assign Object */
		$content .= \Runtime\rtl::toStr($t->s("assignObject: function(ctx,o)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("if (o instanceof " . \Runtime\rtl::toStr($t->expression::useModuleName($t, $t->current_class_full_name)) . \Runtime\rtl::toStr(")")));
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
				$content .= \Runtime\rtl::toStr($t->s("this." . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = o.") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(";")));
			}
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		if ($t->current_class_extends_name != "")
		{
			$content .= \Runtime\rtl::toStr($t->s($t->expression::useModuleName($t, $t->current_class_extends_name) . \Runtime\rtl::toStr(".prototype.assignObject.call(this,ctx,o);")));
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Class assignValue function
	 */
	static function OpDeclareClassAssignValue($t, $op_code)
	{
		$content = "";
		$var_prefix = "";
		/* Assign Value */
		$content .= \Runtime\rtl::toStr($t->s("assignValue: function(ctx,k,v)"));
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
					$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr("if (k == ") . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr("this.") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = Runtime.rtl.to(v, null, ") . \Runtime\rtl::toStr(static::toPattern($t, $variable->pattern)) . \Runtime\rtl::toStr(");")));
				}
				else
				{
					$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr("if (k == ") . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr("this.") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(" = v;")));
				}
				$flag = true;
			}
		}
		if ($t->current_class_extends_name != "")
		{
			$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr($t->expression::useModuleName($t, $t->current_class_extends_name)) . \Runtime\rtl::toStr(".prototype.assignValue.call(this,ctx,k,v);")));
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Class takeValue function
	 */
	static function OpDeclareClassTakeValue($t, $op_code)
	{
		$content = "";
		$var_prefix = "";
		/* Take Value */
		$content .= \Runtime\rtl::toStr($t->s("takeValue: function(ctx,k,d)"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("if (d == undefined) d = null;"));
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
				$content .= \Runtime\rtl::toStr($t->s((($flag) ? ("else ") : ("")) . \Runtime\rtl::toStr("if (k == ") . \Runtime\rtl::toStr($t->expression::toString($value->var_name)) . \Runtime\rtl::toStr(")return this.") . \Runtime\rtl::toStr($var_prefix) . \Runtime\rtl::toStr($value->var_name) . \Runtime\rtl::toStr(";")));
				$flag = true;
			}
		}
		if ($t->current_class_extends_name != "")
		{
			$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($t->expression::useModuleName($t, $t->current_class_extends_name)) . \Runtime\rtl::toStr(".prototype.takeValue.call(this,ctx,k,d);")));
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClass
	 */
	static function OpDeclareClassBody($t, $op_code)
	{
		$content = "";
		$class_kind = $op_code->kind;
		$content .= \Runtime\rtl::toStr($t->s("Object.assign(" . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(".prototype,")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* Functions */
		$res = static::OpDeclareClassFunctions($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Init variables */
		if ($class_kind != \BayLang\OpCodes\OpDeclareClass::KIND_INTERFACE && $op_code->vars != null)
		{
			$res = static::OpDeclareClassInitVariables($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		/* Init struct */
		if ($class_kind == \BayLang\OpCodes\OpDeclareClass::KIND_STRUCT && $op_code->vars != null)
		{
			/* Assign object */
			/*
			list res = static::OpDeclareClassAssignObject(t, op_code);
			t = res[0];
			content ~= res[1];
			*/
			/* Assign value */
			/*
			list res = static::OpDeclareClassAssignValue(t, op_code);
			t = res[0];
			content ~= res[1];
			*/
			/* Take Value */
			$res = static::OpDeclareClassTakeValue($t, $op_code);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("});"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClassFooter
	 */
	static function OpDeclareClassFooter($t, $op_code)
	{
		$content = "";
		$rtl_module_name = $t->expression::useModuleName($t, "Runtime.rtl");
		if (!$t->use_module_name)
		{
			$content .= \Runtime\rtl::toStr($t->s($rtl_module_name . \Runtime\rtl::toStr(".defClass(") . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(");")));
			$content .= \Runtime\rtl::toStr($t->s("window[\"" . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr("\"] = ") . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(";")));
		}
		$content .= \Runtime\rtl::toStr($t->s("if (typeof module != \"undefined\" && typeof module.exports != \"undefined\") " . \Runtime\rtl::toStr("module.exports = ") . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(";")));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareComponent
	 */
	static function OpDeclareComponent($t, $op_code)
	{
		$content = "";
		$content .= \Runtime\rtl::toStr($t->s($t->current_class_full_name . \Runtime\rtl::toStr(" = {")));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("name: " . \Runtime\rtl::toStr($t->expression::toString($t->current_class_full_name)) . \Runtime\rtl::toStr(",")));
		if ($t->current_class_extends_name && $t->current_class_extends_name != "Runtime.BaseObject")
		{
			$content .= \Runtime\rtl::toStr($t->s("extends: " . \Runtime\rtl::toStr($t->expression::useModuleName($t, $t->current_class_extends_name)) . \Runtime\rtl::toStr(",")));
		}
		/* Props */
		$res = static::OpDeclareComponentProps($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Variables */
		$res = static::OpDeclareComponentVariables($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Methods */
		$content .= \Runtime\rtl::toStr($t->s("methods:"));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = static::OpDeclareClassFunctions($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("},"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("};"));
		/* Class static functions */
		$res = static::OpDeclareClassBodyStatic($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Class footer */
		$res = static::OpDeclareClassFooter($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
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
		if ($op_code->is_component)
		{
			return static::OpDeclareComponent($t, $op_code);
		}
		/* Constructor */
		$res = static::OpDeclareClassConstructor($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Extends */
		if ($op_code->class_extends != null)
		{
			$content .= \Runtime\rtl::toStr($t->s($t->current_class_full_name . \Runtime\rtl::toStr(".prototype = Object.create(") . \Runtime\rtl::toStr($t->expression::useModuleName($t, $t->current_class_extends_name)) . \Runtime\rtl::toStr(".prototype);")));
			$content .= \Runtime\rtl::toStr($t->s($t->current_class_full_name . \Runtime\rtl::toStr(".prototype.constructor = ") . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(";")));
		}
		/* Class body */
		$res = static::OpDeclareClassBody($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Class static functions */
		$res = static::OpDeclareClassBodyStatic($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Class comments */
		$res = $t->operator::AddComments($t, $op_code->comments, $content);
		$content = \Runtime\rtl::attr($res, 1);
		/* Class footer */
		$res = static::OpDeclareClassFooter($t, $op_code);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		return \Runtime\Vector::from([$t,$content]);
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
		$content = "";
		if ($t->use_strict)
		{
			$content = $t->s("\"use strict;\"");
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Remove ctx
	 */
	static function removeContext($content)
	{
		$content = \Runtime\rs::replace("(" . \Runtime\rtl::toStr("ctx)"), "()", $content);
		$content = \Runtime\rs::replace("(" . \Runtime\rtl::toStr("ctx, "), "(", $content);
		$content = \Runtime\rs::replace("(" . \Runtime\rtl::toStr("ctx,"), "(", $content);
		$content = \Runtime\rs::replace("," . \Runtime\rtl::toStr("ctx,"), ",", $content);
		$content = \Runtime\rs::replace("this," . \Runtime\rtl::toStr("ctx"), "this", $content);
		$content = \Runtime\rs::replace("this," . \Runtime\rtl::toStr(" ctx"), "this", $content);
		return $content;
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
			$content = static::removeContext($content);
		}
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
		return "BayLang.LangES6.TranslatorES6Program";
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