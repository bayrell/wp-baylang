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
class TranslatorES6Html
{
	/**
	 * Is component
	 */
	static function isComponent($tag_name)
	{
		if ($tag_name == "")
		{
			return false;
		}
		if ($tag_name == "Teleport")
		{
			return false;
		}
		$ch1 = \Runtime\rs::substr($tag_name, 0, 1);
		$ch2 = \Runtime\rs::upper($ch1);
		return $ch1 == "{" || $ch1 == $ch2;
	}
	/**
	 * Translator html value
	 */
	static function OpHtmlAttr($t, $attr)
	{
		$op_code = $attr->value;
		if ($op_code instanceof \BayLang\OpCodes\OpString)
		{
			return \Runtime\Vector::from([$t,$t->expression::toString($op_code->value)]);
		}
		if ($op_code instanceof \BayLang\OpCodes\OpHtmlValue)
		{
			if ($op_code->kind == \BayLang\OpCodes\OpHtmlValue::KIND_RAW)
			{
				$res = $t->expression::Expression($t, $op_code->value);
				$t = \Runtime\rtl::attr($res, 0);
				$value = \Runtime\rtl::attr($res, 1);
				return \Runtime\Vector::from([$t,$value]);
			}
			else if ($op_code->kind == \BayLang\OpCodes\OpHtmlValue::KIND_JSON)
			{
				$res = $t->expression::Expression($t, $op_code->value);
				$t = \Runtime\rtl::attr($res, 0);
				$value = \Runtime\rtl::attr($res, 1);
				$value = "Runtime.rtl.json_encode(" . \Runtime\rtl::toStr($value) . \Runtime\rtl::toStr(")");
				return \Runtime\Vector::from([$t,$value]);
			}
		}
		$res = $t->expression::Expression($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		$value = \Runtime\rtl::attr($res, 1);
		$value = $t->o($value, \Runtime\rtl::attr($res, 0)->opcode_level, 13);
		return \Runtime\Vector::from([$t,$value]);
	}
	/**
	 * Translator html template
	 */
	static function OpHtmlAttrs($t, $attrs, $is_component=false)
	{
		$attr_class = new \Runtime\Vector();
		$attr_s = "null";
		$attr_key_value = "";
		$attr_elem_name = "";
		$has_attr_key = false;
		$res_attrs = new \Runtime\Vector();
		for ($attrs_i = 0; $attrs_i < $attrs->count(); $attrs_i++)
		{
			$attr = \Runtime\rtl::attr($attrs, $attrs_i);
			if ($attr->is_spread)
			{
				continue;
			}
			$res = static::OpHtmlAttr($t, $attr);
			$t = \Runtime\rtl::attr($res, 0);
			$attr_value = \Runtime\rtl::attr($res, 1);
			$attr_key = $attr->key;
			$ch = \Runtime\rs::substr($attr_key, 0, 1);
			$is_event = \Runtime\rs::substr($attr_key, 0, 7) == "@event:";
			if ($attr_key == "class")
			{
				$attr_class->push($attr_value);
				if ($attr_elem_name == "" && $attr->value instanceof \BayLang\OpCodes\OpString)
				{
					$arr = \Runtime\rs::split(" ", $attr->value->value);
					$attr_elem_name = $t->expression::toString(\Runtime\rtl::attr($arr, 0));
				}
				continue;
			}
			else if ($attr_key == "@key")
			{
				$res = static::OpHtmlAttr($t, $attr);
				$t = \Runtime\rtl::attr($res, 0);
				$attr_value = \Runtime\rtl::attr($res, 1);
				$attr_key_value = $attr_value;
				continue;
			}
			else if ($is_event)
			{
				$event_name = \Runtime\rs::substr($attr_key, 7);
				$attr_key = \Runtime\rs::substr($attr_key, 7);
				if (\Runtime\rs::substr($attr_key, 0, 2) != "on")
				{
					$first = \Runtime\rs::upper(\Runtime\rs::substr($attr_key, 0, 1));
					$second = \Runtime\rs::substr($attr_key, 1);
					$attr_key = "on" . \Runtime\rtl::toStr($first) . \Runtime\rtl::toStr($second);
				}
			}
			else if ($attr_key == "@global")
			{
				$attr_key = "model";
				$attr_value = "this._model(" . \Runtime\rtl::toStr($attr_value) . \Runtime\rtl::toStr(", true)");
			}
			else if ($attr_key == "@model")
			{
				$attr_key = "model";
				$attr_value = "this._model(" . \Runtime\rtl::toStr($attr_value) . \Runtime\rtl::toStr(")");
			}
			else if ($attr_key == "@ref")
			{
				$attr_key = "ref";
			}
			/*
			else if (attr_key == "@ref" or attr_key == "@bind" or attr_key == "@model" or
				attr_key == "@name" or attr_key == "@watch")
			{
				attr_value = "[component," ~ attr_value ~ "]";
			}
			else if (attr_key == "@global")
			{
				attr_key = "@model";
				attr_value = "[null," ~ attr_value ~ "]";
			}
			*/
			$res_attrs->push($t->expression::toString($attr_key) . \Runtime\rtl::toStr(":") . \Runtime\rtl::toStr($attr_value));
		}
		$res_attrs = $res_attrs->filter(function ($s)
		{
			return $s != "";
		});
		/* Add debug component */
		if ($t->preprocessor_flags->get("DEBUG_COMPONENT") && !$is_component)
		{
			$attr_class->push("\"debug_component\"");
		}
		/* Attrs */
		if ($attr_class->count() > 0)
		{
			$res_attrs->push("\"class\":" . \Runtime\rtl::toStr("this._class_name([") . \Runtime\rtl::toStr(\Runtime\rs::join(", ", $attr_class)) . \Runtime\rtl::toStr("])"));
		}
		if ($attr_key_value != "")
		{
			$res_attrs->push("\"key\":" . \Runtime\rtl::toStr($attr_key_value));
		}
		/*
		else if (attr_elem_name != "")
		{
			res_attrs.push
			(
				"\"key\":" ~ attr_elem_name
			);
		}
		*/
		/* Add debug component */
		if ($t->preprocessor_flags->get("DEBUG_COMPONENT"))
		{
			if ($is_component)
			{
				$res_attrs->push("\"data_widget_path\": \"" . \Runtime\rtl::toStr(\Runtime\rs::join(".", $t->debug_component)) . \Runtime\rtl::toStr("\""));
			}
			else
			{
				$res_attrs->push("\"data-widget-path\": \"" . \Runtime\rtl::toStr(\Runtime\rs::join(".", $t->debug_component)) . \Runtime\rtl::toStr("\""));
			}
		}
		if ($res_attrs->count() > 0)
		{
			$attr_s = "{" . \Runtime\rtl::toStr(\Runtime\rs::join(",", $res_attrs)) . \Runtime\rtl::toStr("}");
		}
		else
		{
			$attr_s = "{}";
		}
		/* Add spreads */
		for ($i = 0; $i < $attrs->count(); $i++)
		{
			$attr = \Runtime\rtl::attr($attrs, $i);
			if (!$attr->is_spread)
			{
				continue;
			}
			$attr_s = "this._merge_attrs(" . \Runtime\rtl::toStr($attr_s) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($attr->value->value) . \Runtime\rtl::toStr(")");
		}
		return \Runtime\Vector::from([$t,$attr_s]);
	}
	/**
	 * Translator html template
	 */
	static function OpHtmlTag($t, $op_code, $var_name)
	{
		$content = "";
		$content2 = "";
		$str_var_name = $t->expression::toString($var_name);
		if ($op_code instanceof \BayLang\OpCodes\OpHtmlContent)
		{
			$item_value = $t->expression::toString($op_code->value);
			$content .= \Runtime\rtl::toStr($t->s("/* Text */"));
			$content .= \Runtime\rtl::toStr($t->s("this._t(" . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($item_value) . \Runtime\rtl::toStr(");")));
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpHtmlValue)
		{
			/* Save op codes */
			$save_op_codes = $t->save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			$res = $t->expression::Expression($t, $op_code->value);
			$t = \Runtime\rtl::attr($res, 0);
			$item_value = \Runtime\rtl::attr($res, 1);
			/* Output save op code */
			$save = $t::outputSaveOpCode($t, $save_op_codes->count());
			if ($save != "")
			{
				$content .= \Runtime\rtl::toStr($save);
			}
			/* Restore op codes */
			$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			if ($op_code->kind == \BayLang\OpCodes\OpHtmlValue::KIND_RAW)
			{
				$content .= \Runtime\rtl::toStr($t->s("/* Raw */"));
				$content .= \Runtime\rtl::toStr($t->s("this._t(" . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr("new Runtime.RawString(") . \Runtime\rtl::toStr($item_value) . \Runtime\rtl::toStr("));")));
			}
			else if ($op_code->kind == \BayLang\OpCodes\OpHtmlValue::KIND_JSON)
			{
				$content .= \Runtime\rtl::toStr($t->s("/* Text */"));
				$item_value = "Runtime.rtl.json_encode(" . \Runtime\rtl::toStr($item_value) . \Runtime\rtl::toStr(")");
				$content .= \Runtime\rtl::toStr($t->s("this._t(" . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($item_value) . \Runtime\rtl::toStr(");")));
			}
		}
		else if ($op_code instanceof \BayLang\OpCodes\OpHtmlTag)
		{
			$new_var_name = "";
			$res = $t::incSaveOpCode($t);
			$t = \Runtime\rtl::attr($res, 0);
			$new_var_name = \Runtime\rtl::attr($res, 1);
			$has_childs = $op_code->items != null && $op_code->items->items != null && $op_code->items->items->count() > 0;
			$is_component = static::isComponent($op_code->tag_name);
			$op_code_attrs = $op_code->attrs->filter(function ($attr)
			{
				return $attr->key != "@render";
			});
			$res = static::OpHtmlAttrs($t, $op_code_attrs, $is_component);
			$t = \Runtime\rtl::attr($res, 0);
			$attrs = \Runtime\rtl::attr($res, 1);
			if ($op_code->tag_name == "")
			{
			}
			else if ($is_component)
			{
				$tag_name = "";
				if ($op_code->op_code_name)
				{
					$res = $t->expression::Expression($t, $op_code->op_code_name);
					$t = \Runtime\rtl::attr($res, 0);
					$tag_name = \Runtime\rtl::attr($res, 1);
				}
				else
				{
					$tag_name = $t->expression::toString($t->expression::findModuleName($t, $op_code->tag_name));
				}
				if ($has_childs)
				{
					$res = static::OpHtmlItemsAsFunction($t, $op_code->items);
					$t = \Runtime\rtl::attr($res, 0);
					$f = \Runtime\rtl::attr($res, 1);
					$content .= \Runtime\rtl::toStr($t->s("/* Component '" . \Runtime\rtl::toStr($op_code->tag_name) . \Runtime\rtl::toStr("' */")));
					$content .= \Runtime\rtl::toStr($t->s("let " . \Runtime\rtl::toStr($new_var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr("this._c(") . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($tag_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($attrs) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($f) . \Runtime\rtl::toStr(");")));
					$has_childs = false;
				}
				else
				{
					$content .= \Runtime\rtl::toStr($t->s("/* Component '" . \Runtime\rtl::toStr($op_code->tag_name) . \Runtime\rtl::toStr("' */")));
					$content .= \Runtime\rtl::toStr($t->s("let " . \Runtime\rtl::toStr($new_var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr("this._c(") . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($tag_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($attrs) . \Runtime\rtl::toStr(");")));
				}
			}
			else
			{
				if ($op_code->tag_name == "Teleport")
				{
					$content .= \Runtime\rtl::toStr($t->s("/* Teleport */"));
					$content .= \Runtime\rtl::toStr($t->s("let " . \Runtime\rtl::toStr($new_var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr("this._teleport(") . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($attrs) . \Runtime\rtl::toStr(");")));
				}
				else
				{
					$content .= \Runtime\rtl::toStr($t->s("/* Element '" . \Runtime\rtl::toStr($op_code->tag_name) . \Runtime\rtl::toStr("' */")));
					$tag_name = $t->expression::toString($op_code->tag_name);
					$content .= \Runtime\rtl::toStr($t->s("let " . \Runtime\rtl::toStr($new_var_name) . \Runtime\rtl::toStr(" = ") . \Runtime\rtl::toStr("this._e(") . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($tag_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($attrs) . \Runtime\rtl::toStr(");")));
				}
			}
			if ($has_childs)
			{
				$res = static::OpHtmlItems($t, $op_code->items, $new_var_name, true);
				$t = \Runtime\rtl::attr($res, 0);
				$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
		}
		else
		{
			/* Save op codes */
			$save_op_codes = $t->save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			$item_value = "";
			if ($op_code instanceof \BayLang\OpCodes\OpCall)
			{
				$res = $t->expression::OpCall($t, $op_code);
				$t = \Runtime\rtl::attr($res, 0);
				$item_value .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else
			{
				$res = $t->expression::Expression($t, $op_code);
				$t = \Runtime\rtl::attr($res, 0);
				$item_value = \Runtime\rtl::attr($res, 1);
			}
			/* Output save op code */
			$save = $t::outputSaveOpCode($t, $save_op_codes->count());
			if ($save != "")
			{
				$content .= \Runtime\rtl::toStr($save);
			}
			/* Restore op codes */
			$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
			$content .= \Runtime\rtl::toStr($t->s("/* Render */"));
			$content .= \Runtime\rtl::toStr($t->s("this._t(" . \Runtime\rtl::toStr($var_name) . \Runtime\rtl::toStr(", ") . \Runtime\rtl::toStr($item_value) . \Runtime\rtl::toStr(");")));
		}
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Translator html items
	 */
	static function OpHtmlExpression($t, $op_code)
	{
		$content = "";
		$content .= \Runtime\rtl::toStr($t->s("let __v = [];"));
		$res = static::OpHtmlItems($t, $op_code, "__v", true);
		$t = \Runtime\rtl::attr($res, 0);
		$content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
		$content .= \Runtime\rtl::toStr($t->s2(""));
		$res = $t::addSaveOpCode($t, \Runtime\Map::from(["content"=>$content]));
		$t = \Runtime\rtl::attr($res, 0);
		return \Runtime\Vector::from([$t,"this._flatten(__v)"]);
	}
	/**
	 * Translator html slot
	 */
	static function OpHtmlSlot($t, $op_code)
	{
		$content = "{";
		$t = $t->levelInc();
		$debug_component = $t->debug_component->slice();
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			$item = $op_code->items->item($i);
			if (!($item instanceof \BayLang\OpCodes\OpHtmlSlot))
			{
				continue;
			}
			$t = \Runtime\rtl::setAttr($t, ["debug_component"], $debug_component->pushIm($i));
			$content .= \Runtime\rtl::toStr($t->s($t->expression::toString($item->name) . \Runtime\rtl::toStr(": ")));
			$res = static::OpHtmlItemsAsFunction($t, $item->items, $item->args);
			$t = $res->get(0);
			$content .= \Runtime\rtl::toStr($res->get(1) . \Runtime\rtl::toStr(","));
		}
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Translator html items as function
	 */
	static function OpHtmlItemsAsFunction($t, $op_code, $args=null)
	{
		/* If slot */
		if ($op_code->items->get(0) instanceof \BayLang\OpCodes\OpHtmlSlot)
		{
			return static::OpHtmlSlot($t, $op_code);
		}
		$save_op_codes = $t->save_op_codes;
		$save_op_code_inc = $t->save_op_code_inc;
		$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], 0);
		$content = "() => {";
		if ($args != null)
		{
			$res = $t->operator::OpDeclareFunctionArgs($t, new \BayLang\OpCodes\OpDeclareFunction(\Runtime\Map::from(["args"=>$args,"is_context"=>false])));
			$content = "(" . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(") => {");
		}
		$t = $t->levelInc();
		$res = static::OpHtmlExpression($t, $op_code);
		$t = \Runtime\rtl::attr($res, 0);
		/* Output save op code */
		$save = $t::outputSaveOpCode($t, $save_op_codes->count());
		if ($save != "")
		{
			$content .= \Runtime\rtl::toStr($save);
		}
		$content .= \Runtime\rtl::toStr($t->s("return " . \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1)) . \Runtime\rtl::toStr(";")));
		$t = $t->levelDec();
		$content .= \Runtime\rtl::toStr($t->s("}"));
		/* Restore save op codes */
		$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
		$t = \Runtime\rtl::setAttr($t, ["save_op_code_inc"], $save_op_code_inc);
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * Translator html items
	 */
	static function OpHtmlItems($t, $op_code, $var_name="", $first_space=false)
	{
		if ($op_code == null || $op_code->items->count() == 0)
		{
			return \Runtime\Vector::from([$t,""]);
		}
		$debug_component = $t->debug_component->slice();
		$save_var_name = $t->html_var_name;
		$t = \Runtime\rtl::setAttr($t, ["html_var_name"], $var_name);
		$content = "";
		$next_space = true;
		$add_space = function ($i) use (&$t,&$content,&$next_space,&$first_space)
		{
			if ($i > 0 && $next_space)
			{
				$content .= \Runtime\rtl::toStr($t->s2(""));
			}
			if ($i == 0 && $first_space)
			{
				$content .= \Runtime\rtl::toStr($t->s2(""));
			}
			if (!$next_space)
			{
				$next_space = true;
			}
		};
		for ($i = 0; $i < $op_code->items->count(); $i++)
		{
			$item = $op_code->items->item($i);
			/* Save op codes */
			$save_op_codes = $t->save_op_codes;
			/*int save_op_code_inc = t.save_op_code_inc;*/
			$op_content = "";
			if ($item instanceof \BayLang\OpCodes\OpAssign)
			{
				$res = $t->operator::OpAssign($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$op_content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else if ($item instanceof \BayLang\OpCodes\OpComment)
			{
				$add_space($i);
				$res = $t->operator::OpComment($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$op_content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
				$next_space = false;
			}
			else if ($item instanceof \BayLang\OpCodes\OpFor)
			{
				$add_space($i);
				$res = $t->operator::OpFor($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$op_content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else if ($item instanceof \BayLang\OpCodes\OpIf)
			{
				$add_space($i);
				$res = $t->operator::OpIf($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$op_content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else if ($item instanceof \BayLang\OpCodes\OpWhile)
			{
				$add_space($i);
				$res = $t->operator::OpWhile($t, $item);
				$t = \Runtime\rtl::attr($res, 0);
				$op_content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			else if ($item instanceof \BayLang\OpCodes\OpHtmlSlot)
			{
				continue;
			}
			else
			{
				$add_space($i);
				$t = \Runtime\rtl::setAttr($t, ["debug_component"], $debug_component->pushIm($i));
				$res = static::OpHtmlTag($t, $item, $var_name);
				$t = \Runtime\rtl::attr($res, 0);
				$op_content .= \Runtime\rtl::toStr(\Runtime\rtl::attr($res, 1));
			}
			/* Output save op code */
			$save = $t::outputSaveOpCode($t, $save_op_codes->count());
			if ($save != "")
			{
				$content .= \Runtime\rtl::toStr($save);
			}
			if ($op_content != "")
			{
				$content .= \Runtime\rtl::toStr($op_content);
			}
			/* Restore save op codes */
			$t = \Runtime\rtl::setAttr($t, ["save_op_codes"], $save_op_codes);
			/*t <= save_op_code_inc <= save_op_code_inc;*/
		}
		/*
		if (var_name != "control" and patch_flag)
		{
			content ~= t.s("RenderDriver.p(" ~ var_name ~ ", " ~ var_name ~ "_childs);");
		}
		*/
		$t = \Runtime\rtl::setAttr($t, ["html_var_name"], $save_var_name);
		return \Runtime\Vector::from([$t,$content]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangES6";
	}
	static function getClassName()
	{
		return "BayLang.LangES6.TranslatorES6Html";
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