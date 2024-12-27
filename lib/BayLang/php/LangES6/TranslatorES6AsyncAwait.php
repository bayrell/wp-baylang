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
class TranslatorES6AsyncAwait extends \Runtime\BaseStruct
{
	public $__async_stack;
	public $__pos;
	public $__async_t;
	public $__async_var;
	/**
	 * Returns current pos
	 */
	static function currentPos($t)
	{
		return $t->expression::toString(\Runtime\rs::join(".", $t->async_await->pos));
	}
	/**
	 * Returns current pos
	 */
	static function nextPos($t)
	{
		$pos = $t->async_await->pos;
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $pos->setIm($pos->count() - 1, $pos->last() + 1));
		$res = $t->expression::toString(\Runtime\rs::join(".", $t->async_await->pos));
		return \Runtime\Vector::from([$t,$res]);
	}
	/**
	 * Returns push pos
	 */
	static function pushPos($t)
	{
		$pos = $t->async_await->pos;
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $pos->setIm($pos->count() - 1, $pos->last() + 1)->pushIm(0));
		$res = $t->expression::toString(\Runtime\rs::join(".", $t->async_await->pos));
		return \Runtime\Vector::from([$t,$res]);
	}
	/**
	 * Returns inc pos
	 */
	static function levelIncPos($t)
	{
		$pos = $t->async_await->pos;
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $pos->setIm($pos->count() - 1, $pos->last())->pushIm(0));
		$res = $t->expression::toString(\Runtime\rs::join(".", $t->async_await->pos));
		return \Runtime\Vector::from([$t,$res]);
	}
	/**
	 * Returns pop pos
	 */
	static function popPos($t)
	{
		$pos = $t->async_await->pos->removeLastIm();
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $pos->setIm($pos->count() - 1, $pos->last() + 1));
		$res = $t->expression::toString(\Runtime\rs::join(".", $t->async_await->pos));
		return \Runtime\Vector::from([$t,$res]);
	}
	/**
	 * OpCall
	 */
	static function OpCall($t, $op_code, $is_expression=true)
	{
		$s = "";
		$flag = false;
		if ($s == "")
		{
			$res = $t->expression::Dynamic($t, $op_code->obj);
			$t = \Runtime\rtl::attr($res, 0);
			$s = \Runtime\rtl::attr($res, 1);
			if ($s == "parent")
			{
				$s = $t->expression::useModuleName($t, $t->current_class_extends_name);
				if ($t->current_function->name != "constructor")
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
				$s .= \Runtime\rtl::toStr(".call(this");
				$flag = true;
			}
			else
			{
				$s .= \Runtime\rtl::toStr("(");
			}
		}
		$content = $s;
		if ($t->current_function->is_context && $op_code->is_context)
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
		$res = $t::incSaveOpCode($t);
		$t = \Runtime\rtl::attr($res, 0);
		$var_name = \Runtime\rtl::attr($res, 1);
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$next_pos = \Runtime\rtl::attr($res, 1);
		$async_t = $t->async_await->async_t;
		$content = $t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($next_pos) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr(".call(ctx, ") . \Runtime\rtl::toStr($content) . \Runtime\rtl::toStr(",") . \Runtime\rtl::toStr($t->expression::toString($var_name)) . \Runtime\rtl::toStr(");"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($next_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = $t::addSaveOpCode($t, \Runtime\Map::from(["op_code"=>$op_code,"var_name"=>$var_name,"content"=>$content]));
		$t = \Runtime\rtl::attr($res, 0);
		if ($is_expression)
		{
			return \Runtime\Vector::from([$t,$async_t . \Runtime\rtl::toStr(".getVar(ctx, ") . \Runtime\rtl::toStr($t->expression::toString($var_name)) . \Runtime\rtl::toStr(")")]);
		}
		return \Runtime\Vector::from([$t,""]);
	}
	/**
	 * OpPipe
	 */
	static function OpPipe($t, $op_code, $is_expression=true)
	{
		$content = "";
		$var_name = "";
		$flag = false;
		$res = $t->expression::Expression($t, $op_code->obj);
		$t = \Runtime\rtl::attr($res, 0);
		$var_name = \Runtime\rtl::attr($res, 1);
		if ($op_code->kind == \BayLang\OpCodes\OpPipe::KIND_METHOD)
		{
			$content = $var_name . \Runtime\rtl::toStr(".constructor.") . \Runtime\rtl::toStr($op_code->method_name->value);
		}
		else
		{
			$res = $t->expression::OpTypeIdentifier($t, $op_code->class_name);
			$t = \Runtime\rtl::attr($res, 0);
			$content = \Runtime\rtl::attr($res, 1) . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($op_code->method_name->value);
		}
		$flag = false;
		$content .= \Runtime\rtl::toStr("(");
		if ($t->current_function->is_context && $op_code->is_context)
		{
			$content .= \Runtime\rtl::toStr("ctx");
			$flag = true;
		}
		$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr($var_name));
		$flag = true;
		for ($i = 0; $i < $op_code->args->count(); $i++)
		{
			$item = $op_code->args->item($i);
			$res = $t->expression::Expression($t, $item);
			$t = \Runtime\rtl::attr($res, 0);
			$s1 = \Runtime\rtl::attr($res, 1);
			$content .= \Runtime\rtl::toStr((($flag) ? (", ") : ("")) . \Runtime\rtl::toStr($s1));
			$flag = true;
		}
		$content .= \Runtime\rtl::toStr(")");
		$res = $t::incSaveOpCode($t);
		$t = \Runtime\rtl::attr($res, 0);
		$var_name = \Runtime\rtl::attr($res, 1);
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$next_pos = \Runtime\rtl::attr($res, 1);
		$async_t = $t->async_await->async_t;
		$content = $t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($next_pos) . \Runtime\rtl::toStr(")") . \Runtime\rtl::toStr(".call(ctx, ") . \Runtime\rtl::toStr($content) . \Runtime\rtl::toStr(",") . \Runtime\rtl::toStr($t->expression::toString($var_name)) . \Runtime\rtl::toStr(");"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($next_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = $t::addSaveOpCode($t, \Runtime\Map::from(["op_code"=>$op_code,"var_name"=>$var_name,"content"=>$content]));
		$t = \Runtime\rtl::attr($res, 0);
		if ($is_expression)
		{
			return \Runtime\Vector::from([$t,$async_t . \Runtime\rtl::toStr(".getVar(ctx, ") . \Runtime\rtl::toStr($t->expression::toString($var_name)) . \Runtime\rtl::toStr(")")]);
		}
		return \Runtime\Vector::from([$t,""]);
	}
	/**
	 * OpFor
	 */
	static function OpFor($t, $op_code)
	{
		$save_t = null;
		$async_t = $t->async_await->async_t;
		$async_var = $t->async_await->async_var;
		$content = "";
		$res = static::pushPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_pos = \Runtime\rtl::attr($res, 1);
		$res = static::popPos($t);
		$save_t = \Runtime\rtl::attr($res, 0);
		$end_pos = \Runtime\rtl::attr($res, 1);
		$t = \Runtime\rtl::setAttr($t, ["async_await", "async_stack"], $t->async_await->async_stack->pushIm(new \BayLang\LangES6\AsyncAwait(\Runtime\Map::from(["start_pos"=>$start_pos,"end_pos"=>$end_pos]))));
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Start Loop */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* Loop Assign */
		if ($op_code->expr1 instanceof \BayLang\OpCodes\OpAssign)
		{
			$res = $t::saveOpCodeCall($t, \Runtime\rtl::method($t->operator->getClassName(), "OpAssign"), \Runtime\Vector::from([$op_code->expr1]));
			$t = \Runtime\rtl::attr($res, 0);
			$save = \Runtime\rtl::attr($res, 1);
			$value = \Runtime\rtl::attr($res, 2);
			if ($save != "")
			{
				$content .= \Runtime\rtl::toStr($save);
			}
			$content .= \Runtime\rtl::toStr($value);
		}
		else
		{
			$res = $t::saveOpCodeCall($t, \Runtime\rtl::method($t->expression->getClassName(), "Expression"), \Runtime\Vector::from([$op_code->expr1]));
			$t = \Runtime\rtl::attr($res, 0);
			$save = \Runtime\rtl::attr($res, 1);
			$value = \Runtime\rtl::attr($res, 2);
			if ($save != "")
			{
				$content .= \Runtime\rtl::toStr($save);
			}
			$content .= \Runtime\rtl::toStr($value);
		}
		/* Loop Expression */
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$loop_expression = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($loop_expression) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Loop Expression */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($loop_expression) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* Call condition expression */
		$res = $t::saveOpCodeCall($t, \Runtime\rtl::method($t->expression->getClassName(), "Expression"), \Runtime\Vector::from([$op_code->expr2]));
		$t = \Runtime\rtl::attr($res, 0);
		$save = \Runtime\rtl::attr($res, 1);
		$value = \Runtime\rtl::attr($res, 2);
		if ($save != "")
		{
			$content .= \Runtime\rtl::toStr($save);
		}
		/* Loop condition */
		$content .= \Runtime\rtl::toStr($t->s("var " . \Runtime\rtl::toStr($async_var) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(";")));
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_loop = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr($t->s("if (" . \Runtime\rtl::toStr($async_var) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_loop) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(");")));
		/* Start Loop */
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Loop */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_loop) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = $t->expression::Expression($t, $op_code->expr3);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr($t->s(\Runtime\rtl::attr($res, 1) . \Runtime\rtl::toStr(";")));
		$res = $t->operator::Operators($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* End Loop */
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($loop_expression) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* End Loop */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$t = \Runtime\rtl::setAttr($t, ["async_await", "async_stack"], $t->async_await->async_stack->removeLastIm());
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $save_t->async_await->pos);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpIfBlock
	 */
	static function OpIfBlock($t, $condition, $op_code, $end_pos)
	{
		$content = "";
		$async_t = $t->async_await->async_t;
		$async_var = $t->async_await->async_var;
		/* Call condition expression */
		$res = $t::saveOpCodeCall($t, \Runtime\rtl::method($t->expression->getClassName(), "Expression"), \Runtime\Vector::from([$condition]));
		$t = \Runtime\rtl::attr($res, 0);
		$save = \Runtime\rtl::attr($res, 1);
		$value = \Runtime\rtl::attr($res, 2);
		if ($save != "")
		{
			$content .= \Runtime\rtl::toStr($save);
		}
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_if = \Runtime\rtl::attr($res, 1);
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$next_if = \Runtime\rtl::attr($res, 1);
		/* If condition */
		$content .= \Runtime\rtl::toStr($t->s("var " . \Runtime\rtl::toStr($async_var) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(";")));
		$content .= \Runtime\rtl::toStr($t->s("if (" . \Runtime\rtl::toStr($async_var) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_if) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($next_if) . \Runtime\rtl::toStr(");")));
		/* Start Loop */
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* If true */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_if) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = $t->operator::Operators($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* End if */
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Next If */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($next_if) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpIf
	 */
	static function OpIf($t, $op_code)
	{
		$save_t = null;
		$async_t = $t->async_await->async_t;
		$async_var = $t->async_await->async_var;
		$content = "";
		$if_true_pos = "";
		$if_false_pos = "";
		$res = static::pushPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_pos = \Runtime\rtl::attr($res, 1);
		$res = static::popPos($t);
		$save_t = \Runtime\rtl::attr($res, 0);
		$end_pos = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Start if */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* If true */
		$res = static::OpIfBlock($t, $op_code->condition, $op_code->if_true, $end_pos);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* If else */
		for ($i = 0; $i < $op_code->if_else->count(); $i++)
		{
			$if_else = $op_code->if_else->item($i);
			$res = static::OpIfBlock($t, $if_else->condition, $if_else->if_true, $end_pos);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		/* Else */
		if ($op_code->if_false)
		{
			$content .= \Runtime\rtl::toStr($t->s("/* If false */"));
			$res = $t->operator::Operators($t, $op_code->if_false);
			$t = \Runtime\rtl::attr($res, 0);
			$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		/* End if */
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* End if */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $save_t->async_await->pos);
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
		else
		{
			$s1 = "null";
		}
		$async_t = $t->async_await->async_t;
		$content = $t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".ret(ctx, ") . \Runtime\rtl::toStr($s1) . \Runtime\rtl::toStr(");"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpTryCatch
	 */
	static function OpTryCatch($t, $op_code)
	{
		$save_t = null;
		$content = "";
		$async_t = $t->async_await->async_t;
		$async_var = $t->async_await->async_var;
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_pos = \Runtime\rtl::attr($res, 1);
		$res = static::nextPos($t);
		$save_t = \Runtime\rtl::attr($res, 0);
		$end_pos = \Runtime\rtl::attr($res, 1);
		$t = \Runtime\rtl::setAttr($t, ["async_await", "async_stack"], $t->async_await->async_stack->pushIm(new \BayLang\LangES6\AsyncAwait(\Runtime\Map::from(["start_pos"=>$start_pos,"end_pos"=>$end_pos]))));
		/* Start Try Catch */
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Start Try */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = static::levelIncPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_catch = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr($t->s($async_t . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".catch_push(ctx, ") . \Runtime\rtl::toStr($start_catch) . \Runtime\rtl::toStr(");")));
		$res = $t->operator::Operators($t, $op_code->op_try);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* Start Catch */
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".catch_pop(ctx).jump(ctx, ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Start Catch */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_catch) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("var _ex = " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".getErr(ctx);")));
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			$s = "";
			$pattern = "";
			$item = $op_code->items->item($i);
			$res = $t->expression::OpTypeIdentifier($t, $item->pattern);
			$t = \Runtime\rtl::attr($res, 0);
			$pattern .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			if ($pattern != "var")
			{
				$s = "if (_ex instanceof " . \Runtime\rtl::toStr($pattern) . \Runtime\rtl::toStr(")");
			}
			else
			{
				$s = "if (true)";
			}
			$s .= \Runtime\rtl::toStr($t->s("{"));
			$t = $t->levelInc();
			$s .= \Runtime\rtl::toStr(($s != "") ? ($t->s("var " . \Runtime\rtl::toStr($item->name) . \Runtime\rtl::toStr(" = _ex;"))) : ("var " . \Runtime\rtl::toStr($item->name) . \Runtime\rtl::toStr(" = _ex;")));
			$res = $t->operator::Operators($t, $item->value);
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
		$content .= \Runtime\rtl::toStr($t->s("throw _ex;"));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		/* End Try Catch */
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* End Catch */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$t = \Runtime\rtl::setAttr($t, ["async_await", "async_stack"], $t->async_await->async_stack->removeLastIm());
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $save_t->async_await->pos);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpWhile
	 */
	static function OpWhile($t, $op_code)
	{
		$save_t = null;
		$async_t = $t->async_await->async_t;
		$async_var = $t->async_await->async_var;
		$content = "";
		$res = static::pushPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_pos = \Runtime\rtl::attr($res, 1);
		$res = static::popPos($t);
		$save_t = \Runtime\rtl::attr($res, 0);
		$end_pos = \Runtime\rtl::attr($res, 1);
		$t = \Runtime\rtl::setAttr($t, ["async_await", "async_stack"], $t->async_await->async_stack->pushIm(new \BayLang\LangES6\AsyncAwait(\Runtime\Map::from(["start_pos"=>$start_pos,"end_pos"=>$end_pos]))));
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Start while */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		/* Call condition expression */
		$res = $t::saveOpCodeCall($t, \Runtime\rtl::method($t->expression->getClassName(), "Expression"), \Runtime\Vector::from([$op_code->condition]));
		$t = \Runtime\rtl::attr($res, 0);
		$save = \Runtime\rtl::attr($res, 1);
		$value = \Runtime\rtl::attr($res, 2);
		if ($save != "")
		{
			$content .= \Runtime\rtl::toStr($save);
		}
		/* Loop condition */
		$content .= \Runtime\rtl::toStr($t->s("var " . \Runtime\rtl::toStr($async_var) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(";")));
		$res = static::nextPos($t);
		$t = \Runtime\rtl::attr($res, 0);
		$start_loop = \Runtime\rtl::attr($res, 1);
		$content .= \Runtime\rtl::toStr($t->s("if (" . \Runtime\rtl::toStr($async_var) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_loop) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(");")));
		/* Start Loop */
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* Loop while */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($start_loop) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$res = $t->operator::Operators($t, $op_code->value);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		/* End Loop */
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".jump(ctx, ") . \Runtime\rtl::toStr($start_pos) . \Runtime\rtl::toStr(");")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		$content .= \Runtime\rtl::toStr($t->s("/* End while */"));
		$content .= \Runtime\rtl::toStr($t->s("else if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr($end_pos) . \Runtime\rtl::toStr(")")));
		$content .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$t = \Runtime\rtl::setAttr($t, ["async_await", "async_stack"], $t->async_await->async_stack->removeLastIm());
		$t = \Runtime\rtl::setAttr($t, ["async_await", "pos"], $save_t->async_await->pos);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareFunction Body
	 */
	static function OpDeclareFunctionBody($t, $f)
	{
		$save_t = $t;
		/* Save op codes */
		$save_vars = $t->save_vars;
		$save_op_codes = $t->save_op_codes;
		$save_op_code_inc = $t->save_op_code_inc;
		$t = $t::clearSaveOpCode($t);
		$async_t = $t->async_await->async_t;
		$t = $t->levelInc();
		$s1 = $t->s("return (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(") =>"));
		$s1 .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		$s1 .= \Runtime\rtl::toStr($t->s("if (" . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".pos(ctx) == ") . \Runtime\rtl::toStr(static::currentPos($t)) . \Runtime\rtl::toStr(")")));
		$s1 .= \Runtime\rtl::toStr($t->s("{"));
		$t = $t->levelInc();
		if ($f->items)
		{
			$res = $t->operator::Operators($t, $f->items);
			$t = \Runtime\rtl::attr($res, 0);
			$s1 .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		}
		else if ($f->expression)
		{
			/* Save op codes */
			$save_op_codes = $t->save_op_codes;
			$save_op_code_inc = $t->save_op_code_inc;
			$res = $t->expression::Expression($t, $f->expression);
			$t = \Runtime\rtl::attr($res, 0);
			$expr = \Runtime\rtl::attr($res, 1);
			/* Output save op code */
			$save = $t::outputSaveOpCode($t, $save_op_codes->count());
			if ($save != "")
			{
				$s1 .= \Runtime\rtl::toStr($save);
			}
			/* Restore save op codes */
			$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
			$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
			$s1 .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".ret(ctx, ") . \Runtime\rtl::toStr($expr) . \Runtime\rtl::toStr(");")));
		}
		$t = $t->levelDec();
		$s1 .= \Runtime\rtl::toStr($t->s("}"));
		$s1 .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr($async_t) . \Runtime\rtl::toStr(".ret_void(ctx);")));
		$t = $t->levelDec();
		$s1 .= \Runtime\rtl::toStr($t->s("};"));
		$t = $t->levelDec();
		/* Content */
		$content = "";
		$content = $t->s("{");
		$t = $t->levelInc();
		if ($t->save_vars->count() > 0)
		{
			$content .= \Runtime\rtl::toStr($t->s("var " . \Runtime\rtl::toStr(\Runtime\rs::join(",", $t->save_vars)) . \Runtime\rtl::toStr(";")));
		}
		$content .= \Runtime\rtl::toStr($s1);
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		/* Restore save op codes */
		$t = \Runtime\rtl::setAttr($t, ["save_vars"], $save_vars);
		$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
		$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
		return \Runtime\Vector::from([$save_t,$content]);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__async_stack = new \Runtime\Collection();
		$this->__pos = \Runtime\Vector::from([0]);
		$this->__async_t = "__async_t";
		$this->__async_var = "__async_var";
	}
	function takeValue($k,$d=null)
	{
		if ($k == "async_stack")return $this->__async_stack;
		else if ($k == "pos")return $this->__pos;
		else if ($k == "async_t")return $this->__async_t;
		else if ($k == "async_var")return $this->__async_var;
	}
	static function getNamespace()
	{
		return "BayLang.LangES6";
	}
	static function getClassName()
	{
		return "BayLang.LangES6.TranslatorES6AsyncAwait";
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
		$a[]="async_stack";
		$a[]="pos";
		$a[]="async_t";
		$a[]="async_var";
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