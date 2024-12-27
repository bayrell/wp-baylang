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
class ParserBayHtml extends \Runtime\BaseObject
{
	/**
	 * Hash function
	 * @param string
	 * @return int hash
	 */
	static function hash($s, $last=true, $x=257, $p=1000000007)
	{
		$h = 0;
		$sz = \Runtime\rs::strlen($s);
		for ($i = 0; $i < $sz; $i++)
		{
			$ch = \Runtime\rs::ord(\Runtime\rs::substr($s, $i, 1));
			$h = ($h * $x + $ch) % $p;
		}
		if ($last)
		{
			$h = $h * $x % $p;
		}
		return $h;
	}
	/**
	 * Convert int to hex
	 * @param int
	 * @return string
	 */
	static function toHex($h)
	{
		$r = "";
		$a = "0123456789abcdef";
		while ($h >= 0)
		{
			$c = $h & 15;
			$h = $h >> 4;
			$r = \Runtime\rs::substr($a, $c, 1) . \Runtime\rtl::toStr($r);
			if ($h == 0)
			{
				break;
			}
		}
		return $r;
	}
	/**
	 * Retuns css hash
	 * @param string component class name
	 * @return string hash
	 */
	static function getCssHash($s)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayHtml.getCssHash", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$h = static::hash($s, true, 337, 65537) + 65537;
		$res = static::toHex($h);
		$__memorize_value = \Runtime\rs::substr($res, -4);
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayHtml.getCssHash", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Read css component name
	 */
	static function readCssComponentName($parser)
	{
		$flag = false;
		$class_name = "";
		/* Get caret */
		$caret = $parser->getCaret();
		/* Read char */
		$ch = $caret->nextChar();
		if ($ch == "(")
		{
			$flag = true;
			/* Read ( */
			$caret->readChar();
			/* Next char */
			$ch = $caret->nextChar();
			/* Read class name */
			$start_pos = $caret->pos;
			while (!$caret->eof() && $ch != ")")
			{
				$caret->readChar();
				$ch = $caret->nextChar();
			}
			$class_name = $caret->getString($start_pos, $caret->pos - $start_pos);
			/* Recognize class name */
			if ($parser->uses->has($class_name))
			{
				$class_name = $parser->uses->item($class_name);
			}
			/* Read ) */
			$caret->matchChar(")");
		}
		$parser = $parser->copy(\Runtime\Map::from(["caret"=>$caret]));
		return \Runtime\Vector::from([$parser,$class_name,$flag]);
	}
	/**
	 * Read css class name
	 */
	static function readCssClassName($parser, $default_component_name=true)
	{
		/* Get caret */
		$caret = $parser->getCaret();
		/* Component name */
		$use_component_name = $default_component_name;
		$component_name = $parser->current_namespace_name . \Runtime\rtl::toStr(".") . \Runtime\rtl::toStr($parser->current_class_name);
		/* Read start selector */
		$start_ch = $caret->nextChar();
		if ($start_ch == "." || $start_ch == "%")
		{
			$caret->readChar();
		}
		else if ($start_ch == "&")
		{
			$caret->readChar();
			$use_component_name = false;
		}
		else if ($start_ch == "#" || $start_ch == ":")
		{
			$caret->readChar();
			if ($start_ch == ":")
			{
				$use_component_name = false;
			}
		}
		else if ($start_ch == "*")
		{
			$caret->readChar();
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			return \Runtime\Vector::from([$parser,"*"]);
		}
		else
		{
			$start_ch = "";
			$use_component_name = false;
		}
		/* Save caret */
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		/* Read class name */
		if ($start_ch == "%")
		{
			$start_ch = ".";
			$res = static::readCssComponentName($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			if (\Runtime\rtl::attr($res, 2) != "")
			{
				$component_name = \Runtime\rtl::attr($res, 1);
				$use_component_name = true;
			}
		}
		/* Start position */
		$caret = $parser->getCaret();
		$start_pos = $caret->pos;
		/* Read selector */
		$ch = $caret->nextChar();
		while (!$caret->eof() && $ch != " " && $ch != "," && $ch != ":" && $ch != "[" && $ch != "{")
		{
			$caret->readChar();
			$ch = $caret->nextChar();
		}
		$postfix = $caret->getString($start_pos, $caret->pos - $start_pos);
		$postfix = \Runtime\rs::trim($postfix);
		/* Read suffix */
		$start_pos = $caret->pos;
		while (!$caret->eof() && $ch != " " && $ch != "," && $ch != "." && $ch != "{")
		{
			$caret->readChar();
			$ch = $caret->nextChar();
		}
		$suffix = $caret->getString($start_pos, $caret->pos - $start_pos);
		$suffix = \Runtime\rs::trim($suffix);
		$class_name = $start_ch . \Runtime\rtl::toStr($postfix) . \Runtime\rtl::toStr((($use_component_name) ? (".h-" . \Runtime\rtl::toStr(static::getCssHash($component_name))) : (""))) . \Runtime\rtl::toStr($suffix);
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		return \Runtime\Vector::from([$parser,$class_name]);
	}
	/**
	 * Read css selector
	 */
	static function readCssSelector($parser, $default_component_name=true)
	{
		/* Get caret */
		$caret = $parser->getCaret();
		$selectors = new \Runtime\Vector();
		while (!$caret->eof())
		{
			$res = static::readCssClassName($parser, $default_component_name);
			$parser = \Runtime\rtl::attr($res, 0);
			$selector = \Runtime\rtl::attr($res, 1);
			$default_component_name = false;
			$selectors->push($selector);
			/* Skip empty chars */
			$caret = $parser->parser_base::skipChar($parser, $parser->content, $parser->caret);
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			/* Get caret */
			$caret = $parser->caret->clone(\Runtime\Map::from(["file_name"=>$parser->file_name,"content"=>$parser->content,"content_sz"=>$parser->content_sz]));
			$ch = $caret->nextChar();
			if ($ch == "{" || $ch == "}" || $ch == "<" || $ch == ",")
			{
				break;
			}
		}
		$selector = \Runtime\rs::join(" ", $selectors);
		return \Runtime\Vector::from([$parser,$selector]);
	}
	/**
	 * Concat op_code_item with selector
	 */
	static function readCssBodyConcatItem($caret_start, $caret_end, $selector, $op_code_item)
	{
		if ($op_code_item instanceof \BayLang\OpCodes\OpString)
		{
			$op_code_item = new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$caret_end,"value"=>$op_code_item->value . \Runtime\rtl::toStr("}")]));
		}
		else
		{
			$op_code_item = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$caret_end,"value1"=>$op_code_item,"value2"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>"}"])),"math"=>"~"]));
		}
		if ($op_code_item instanceof \BayLang\OpCodes\OpString)
		{
			$op_code_item = new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$caret_end,"value"=>$selector . \Runtime\rtl::toStr("{") . \Runtime\rtl::toStr($op_code_item->value)]));
		}
		else
		{
			$op_code_item = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$caret_end,"value1"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$caret_end,"value"=>$selector . \Runtime\rtl::toStr("{")])),"value2"=>$op_code_item,"math"=>"~"]));
		}
		return $op_code_item;
	}
	/**
	 * Returns true if next string is css selector
	 */
	static function isNextSelector($caret)
	{
		$caret = $caret->clone();
		$ch = $caret->nextChar();
		if ($ch == "@" || $ch == "%" || $ch == "&" || $ch == "." || $ch == ":" || $ch == "#" || $ch == "*")
		{
			return true;
		}
		if (!$caret::isChar($ch))
		{
			return false;
		}
		while (!$caret->eof() && $ch != "{" && $ch != "}" && $ch != "<")
		{
			if ($ch == ";" || $ch == "(" || $ch == ")" || $ch == "\$")
			{
				return false;
			}
			$caret->nextChar();
			$ch = $caret->readChar();
		}
		if ($ch == "{")
		{
			return true;
		}
		return false;
	}
	/**
	 * Split selector by dot
	 */
	static function splitSelector($selector)
	{
		$arr1 = \Runtime\rs::split(" ", $selector);
		$prefix = \Runtime\rs::join(" ", $arr1->slice(0, -1));
		if ($prefix != "")
		{
			$prefix = $prefix . \Runtime\rtl::toStr(" ");
		}
		$arr2 = \Runtime\rs::split(".", $arr1->last());
		$first = "";
		$second = "";
		if ($arr2->get(0) == "")
		{
			$first = "." . \Runtime\rtl::toStr($arr2->get(1));
			$second = \Runtime\rs::join(".", $arr2->slice(2));
		}
		else
		{
			$first = $arr2->get(0);
			$second = \Runtime\rs::join(".", $arr2->slice(1));
		}
		if ($second != "")
		{
			$second = "." . \Runtime\rtl::toStr($second);
		}
		return \Runtime\Vector::from([$prefix . \Runtime\rtl::toStr($first),$second]);
	}
	/**
	 * Concat selectors
	 */
	static function concatSelectors($prev_selector, $selector)
	{
		if ($prev_selector == "")
		{
			return $selector;
		}
		/* If first symbol is & */
		if (\Runtime\rs::charAt($selector, 0) == "&")
		{
			$res = static::splitSelector($prev_selector);
			return $res->get(0) . \Runtime\rtl::toStr(\Runtime\rs::substr($selector, 1)) . \Runtime\rtl::toStr($res->get(1));
		}
		return $prev_selector . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($selector);
	}
	/**
	 * Get selectors from collection
	 */
	static function getSelectors($start_selectors)
	{
		$result = \Runtime\Vector::from([""]);
		for ($i = 0; $i < $start_selectors->count(); $i++)
		{
			$prev_result = $result;
			$result = \Runtime\Vector::from([]);
			$items = $start_selectors->get($i);
			for ($j = 0; $j < $prev_result->count(); $j++)
			{
				$prev_selector = $prev_result->get($j);
				for ($k = 0; $k < $items->count(); $k++)
				{
					$selector = $items->get($k);
					$result->push(static::concatSelectors($prev_selector, $selector));
				}
			}
		}
		return $result;
	}
	/**
	 * Read css body
	 */
	static function readCssBodyItems($parser, $items, $start_selectors, $end_tag, $default_component_name)
	{
		$css_content = \Runtime\Vector::from([]);
		$sub_items = \Runtime\Vector::from([]);
		/* Get caret */
		$caret_start = $parser->getCaret();
		/* Skip empty chars */
		$caret = $parser->parser_base::skipChar($parser, $parser->content, $parser->caret);
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		$caret = $parser->getCaret();
		$op_code = null;
		while (!$caret->eof() && $caret->nextChar() != $end_tag && $caret->nextChar() != "}")
		{
			$op_code_item = null;
			/* Read media css */
			if ($caret->isNextString("@media"))
			{
				/* Read selector */
				$arr = new \Runtime\Vector();
				$ch = $caret->nextChar();
				while (!$caret->eof() && $ch != "{")
				{
					if ($ch != "\t" && $ch != "\n")
					{
						$arr->push($ch);
					}
					$caret->readChar();
					$ch = $caret->nextChar();
				}
				$media_selector = \Runtime\rs::trim(\Runtime\rs::join("", $arr));
				/* Setup caret */
				$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
				$caret_start_item2 = $parser->getCaret();
				/* Read body */
				$new_items = new \Runtime\Vector();
				$res = $parser->parser_base::matchToken($parser, "{");
				$parser = \Runtime\rtl::attr($res, 0);
				$parser = static::readCssBodyItems($parser, $new_items, $start_selectors, "}", $default_component_name);
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
				/* Items */
				for ($i = 0; $i < $new_items->count(); $i++)
				{
					$item = $new_items->get($i);
					$item = static::readCssBodyConcatItem($item->caret_start, $item->caret_end, $media_selector, $item);
					$items->push($item);
				}
				/* Get caret */
				$caret = $parser->getCaret();
			}
			else if (static::isNextSelector($caret))
			{
				$selectors = \Runtime\Vector::from([]);
				/* Read css selector */
				while (static::isNextSelector($caret))
				{
					$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
					$res = static::readCssSelector($parser, $default_component_name);
					$parser = \Runtime\rtl::attr($res, 0);
					$selectors->push(\Runtime\rtl::attr($res, 1));
					$caret = $parser->getCaret();
					if ($caret->isNextChar(","))
					{
						$caret->readChar();
						$caret->skipSpace();
					}
				}
				/* Setup caret */
				$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
				$caret_start_item2 = $parser->getCaret();
				/* Read body */
				$res = $parser->parser_base::matchToken($parser, "{");
				$parser = \Runtime\rtl::attr($res, 0);
				$parser = static::readCssBodyItems($parser, $sub_items, $start_selectors->pushIm($selectors), "}", $default_component_name);
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
				/* Get caret */
				$caret = $parser->getCaret();
			}
			else
			{
				$arr = new \Runtime\Vector();
				$ch = $caret->nextChar();
				$ch2 = $caret->nextString(2);
				while (!$caret->eof() && $ch != "}" && $ch != ";")
				{
					if ($ch2 == "\${")
					{
						/* Save caret */
						$caret->matchString("\${");
						$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
						/* Read expression */
						$res = $parser->parser_expression::readExpression($parser);
						$parser = \Runtime\rtl::attr($res, 0);
						/* Append to css content */
						if ($arr->count() != 0)
						{
							$css_content->push(\Runtime\rs::join("", $arr));
						}
						$css_content->push(\Runtime\rtl::attr($res, 1));
						$arr = \Runtime\Vector::from([]);
						/* Restore caret */
						$caret = $parser->getCaret();
						$caret->skipSpace();
						$caret->matchChar("}");
					}
					else
					{
						if ($ch != "\t" && $ch != "\n")
						{
							$arr->push($ch);
						}
						$caret->readChar();
					}
					$ch = $caret->nextChar();
					$ch2 = $caret->nextString(2);
				}
				/* Skip semicolon */
				if ($caret->skipChar(";"))
				{
					$arr->push(";");
				}
				$s = \Runtime\rs::trim(\Runtime\rs::join("", $arr));
				$css_content->push($s);
				/* Setup caret */
				$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			}
			/* Skip empty chars */
			$caret = $parser->parser_base::skipChar($parser, $parser->content, $caret);
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			$caret = $parser->getCaret();
		}
		/* Add CSS content to items */
		if ($css_content->count() > 0)
		{
			/* Filter css content */
			$css_content = $css_content->filter(function ($item)
			{
				return $item != "";
			});
			/* Remove last semicolon */
			if ($css_content->count() > 0 && \Runtime\rtl::isString($css_content->last()))
			{
				$item = $css_content->last();
				if (\Runtime\rs::substr($item, -1) == ";")
				{
					$item = \Runtime\rs::substr($item, 0, -1);
				}
				$css_content->set($css_content->count() - 1, $item);
			}
			/* Extend op code */
			$extendItem = function ($op_code_item, $arr) use (&$parser,&$caret_start)
			{
				if ($arr->count() > 0)
				{
					$css_str_op_code = new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->getCaret(),"value"=>\Runtime\rs::join("", $arr)]));
					if ($op_code_item != null)
					{
						$op_code_item = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->getCaret(),"value1"=>$op_code_item,"value2"=>$css_str_op_code,"math"=>"~"]));
					}
					else
					{
						$op_code_item = $css_str_op_code;
					}
				}
				return $op_code_item;
			};
			/* Init arr */
			$arr = new \Runtime\Vector();
			$selectors = static::getSelectors($start_selectors);
			$arr->push(\Runtime\rs::join(",", $selectors) . \Runtime\rtl::toStr("{"));
			/* Build op_code_item */
			$op_code_item = null;
			for ($i = 0; $i < $css_content->count(); $i++)
			{
				$item = $css_content->get($i);
				if (\Runtime\rtl::isString($item))
				{
					$arr->push($item);
				}
				else
				{
					$op_code_item = $extendItem($op_code_item, $arr);
					if ($op_code_item != null)
					{
						$op_code_item = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->getCaret(),"value1"=>$op_code_item,"value2"=>$item,"math"=>"~"]));
					}
					else
					{
						$op_code_item = $item;
					}
					$arr = \Runtime\Vector::from([]);
				}
			}
			/* Add close bracket */
			$arr->push("}");
			/* Extend op_code */
			$op_code_item = $extendItem($op_code_item, $arr);
			/* Append op_code */
			$items->push($op_code_item);
		}
		/* Add sub items */
		$items->appendItems($sub_items);
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		return $parser;
	}
	/**
	 * Read css body
	 */
	static function readCssBody($parser, $end_tag="}", $default_component_name=true)
	{
		/* Get caret */
		$caret_start = $parser->getCaret();
		$op_code = null;
		$items = new \Runtime\Vector();
		/* Read items */
		$parser = static::readCssBodyItems($parser, $items, \Runtime\Vector::from([]), $end_tag, $default_component_name);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$op_code_item = $items->get($i);
			if ($op_code == null)
			{
				$op_code = $op_code_item;
			}
			else
			{
				if ($op_code instanceof \BayLang\OpCodes\OpString && $op_code_item instanceof \BayLang\OpCodes\OpString)
				{
					$op_code = new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$op_code->caret_start,"caret_end"=>$op_code_item->caret_end,"value"=>$op_code->value . \Runtime\rtl::toStr($op_code_item->value)]));
				}
				else
				{
					$op_code = new \BayLang\OpCodes\OpMath(\Runtime\Map::from(["caret_start"=>$op_code->caret_start,"caret_end"=>$op_code_item->caret_end,"value1"=>$op_code,"value2"=>$op_code_item,"math"=>"~"]));
				}
			}
		}
		if ($op_code == null)
		{
			$op_code = new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"value"=>""]));
		}
		$op_code = \Runtime\rtl::setAttr($op_code, ["caret_start"], $caret_start);
		$op_code = \Runtime\rtl::setAttr($op_code, ["caret_end"], $parser->caret);
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read css
	 */
	static function readCss($parser)
	{
		$caret_start = $parser->caret;
		$res = $parser->parser_base::matchToken($parser, "@css");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "{");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = static::readCssBody($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$res = $parser->parser_base::matchToken($parser, "}");
		$parser = \Runtime\rtl::attr($res, 0);
		if ($op_code == null)
		{
			$op_code = new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"value"=>""]));
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read style
	 */
	static function readStyle($parser, $item_attrs, $items, $caret_start)
	{
		/* Save vars */
		$save_vars = $parser->vars;
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->setIm("vars", true));
		$parser = \Runtime\rtl::setAttr($parser, ["is_local_css"], true);
		/* Check if local css */
		$is_global = $item_attrs->get("global", "");
		if ($is_global == "true")
		{
			$parser = \Runtime\rtl::setAttr($parser, ["is_local_css"], false);
		}
		/* Read css */
		$res = static::readCssBody($parser, "<", $parser->is_local_css);
		$parser = \Runtime\rtl::attr($res, 0);
		$css_op_code = \Runtime\rtl::attr($res, 1);
		/* Restore vars */
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		/* Read style footer */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "/");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "style");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		/* Get style content */
		$start_pos = $css_op_code->caret_start->pos;
		$end_pos = $css_op_code->caret_end->pos;
		$style_content = \Runtime\rs::trim(\Runtime\rs::substr($parser->content->ref, $start_pos, $end_pos - $start_pos));
		/* Create op code */
		$op_code = new \BayLang\OpCodes\OpHtmlStyle(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"content"=>$style_content,"is_global"=>$is_global,"value"=>$css_op_code]));
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read html comment
	 */
	static function readHTMLComment($parser)
	{
		$start = $parser;
		$token = null;
		$look = null;
		$caret_start = $parser->caret;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "!--");
		$parser = \Runtime\rtl::attr($res, 0);
		$content = $parser->content;
		$content_sz = $parser->content_sz;
		$pos = $parser->caret->pos;
		$x = $parser->caret->x;
		$y = $parser->caret->y;
		$pos_start = $pos;
		$ch = \Runtime\rs::charAt($content->ref, $pos);
		$ch3 = \Runtime\rs::substr($content->ref, $pos, 3);
		while ($ch3 != "-->" && $pos < $content_sz)
		{
			$x = $parser->parser_base::nextX($parser, $ch, $x);
			$y = $parser->parser_base::nextY($parser, $ch, $y);
			$pos = $pos + 1;
			if ($pos >= $parser->content_sz)
			{
				break;
			}
			$ch = \Runtime\rs::charAt($content->ref, $pos);
			$ch3 = \Runtime\rs::substr($content->ref, $pos, 3);
		}
		$pos_end = $pos;
		if ($ch3 == "-->")
		{
			$x = $x + 3;
			$pos = $pos + 3;
		}
		else
		{
			throw new \BayLang\Exceptions\ParserExpected("End of comment", new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos])), $start->file_name);
		}
		/* Return result */
		$value_str = \Runtime\rs::substr($content->ref, $pos_start, $pos_end - $pos_start);
		$caret_end = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		return \Runtime\Vector::from([$start->copy(\Runtime\Map::from(["caret"=>$caret_end])),new \BayLang\OpCodes\OpComment(\Runtime\Map::from(["value"=>$value_str,"caret_start"=>$caret_start,"caret_end"=>$caret_end]))]);
		return \Runtime\Vector::from([$parser,null]);
	}
	/**
	 * Read html value
	 */
	static function readHTMLValue($parser)
	{
		$item = null;
		$caret = $parser->caret;
		$content = $parser->content;
		$pos = $parser->caret->pos;
		$x = $parser->caret->x;
		$y = $parser->caret->y;
		$ch = \Runtime\rs::substr($content->ref, $pos, 1);
		$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
		if ($ch == "<")
		{
			$res = static::readHTMLTag($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$item = \Runtime\rtl::attr($res, 1);
		}
		else if ($ch == "{")
		{
			$res = $parser->parser_base::matchToken($parser, "{");
			$parser = \Runtime\rtl::attr($res, 0);
			/* Look token */
			$flag = false;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "{")
			{
				$flag = true;
				$parser = $look;
			}
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$item = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "}");
			$parser = \Runtime\rtl::attr($res, 0);
			if ($flag)
			{
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
			}
		}
		else if ($ch == "@")
		{
			$x = $parser->parser_base::nextX($parser, $ch, $x);
			$y = $parser->parser_base::nextY($parser, $ch, $y);
			$pos = $pos + 1;
			$ch3 = \Runtime\rs::substr($content->ref, $pos, 3);
			$ch4 = \Runtime\rs::substr($content->ref, $pos, 4);
			if ($ch3 == "raw" || $ch4 == "json" || $ch4 == "html")
			{
				if ($ch3 == "raw")
				{
					$res = $parser->parser_base::next($parser, $ch3, $x, $y, $pos);
				}
				if ($ch4 == "json")
				{
					$res = $parser->parser_base::next($parser, $ch4, $x, $y, $pos);
				}
				if ($ch4 == "html")
				{
					$res = $parser->parser_base::next($parser, $ch4, $x, $y, $pos);
				}
				$x = \Runtime\rtl::attr($res, 0);
				$y = \Runtime\rtl::attr($res, 1);
				$pos = \Runtime\rtl::attr($res, 2);
			}
			$caret = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			$res = $parser->parser_base::matchToken($parser, "{");
			$parser = \Runtime\rtl::attr($res, 0);
			/* Look bracket */
			$res = $parser->parser_base::lookToken($parser, "{");
			$look = \Runtime\rtl::attr($res, 0);
			$find_bracket = \Runtime\rtl::attr($res, 2);
			if ($find_bracket)
			{
				$parser = $look;
			}
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$item = \Runtime\rtl::attr($res, 1);
			if ($ch3 == "raw")
			{
				$item = new \BayLang\OpCodes\OpHtmlValue(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpHtmlValue::KIND_RAW,"value"=>$item,"caret_start"=>$caret,"caret_end"=>$parser->caret]));
			}
			else if ($ch4 == "json")
			{
				$item = new \BayLang\OpCodes\OpHtmlValue(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpHtmlValue::KIND_JSON,"value"=>$item,"caret_start"=>$caret,"caret_end"=>$parser->caret]));
			}
			else if ($ch4 == "html")
			{
				$item = new \BayLang\OpCodes\OpHtmlValue(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpHtmlValue::KIND_HTML,"value"=>$item,"caret_start"=>$caret,"caret_end"=>$parser->caret]));
			}
			$res = $parser->parser_base::matchToken($parser, "}");
			$parser = \Runtime\rtl::attr($res, 0);
			if ($find_bracket)
			{
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
			}
		}
		return \Runtime\Vector::from([$parser,$item]);
	}
	/**
	 * Read html attribute key
	 */
	static function readHTMLAttrKey($parser)
	{
		$token = null;
		$look = null;
		$ident = null;
		$key = "";
		/* Look token */
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "@")
		{
			$parser = $look;
			$key = "@";
		}
		$res = $parser->parser_base::readIdentifier($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$ident = \Runtime\rtl::attr($res, 1);
		$key .= \Runtime\rtl::toStr($ident->value);
		/* Read attr */
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while ($token->content == "-")
		{
			$res = $parser->parser_base::readIdentifier($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$ident = \Runtime\rtl::attr($res, 1);
			$key .= \Runtime\rtl::toStr("-" . \Runtime\rtl::toStr($ident->value));
			/* Look next token */
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		/* Look token */
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == ":")
		{
			$parser = $look;
			$key .= \Runtime\rtl::toStr(":");
			$res = $parser->parser_base::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$ident = \Runtime\rtl::attr($res, 1);
			$key .= \Runtime\rtl::toStr($ident->value);
		}
		return \Runtime\Vector::from([$parser,$key]);
	}
	/**
	 * Read html attribute value
	 */
	static function readHTMLAttrValue($parser, $attr_key)
	{
		$token = null;
		$look = null;
		$op_code = null;
		$ident = null;
		$pos = $parser->caret->pos;
		$content = $parser->content;
		$ch = \Runtime\rs::substr($content->ref, $pos, 1);
		$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
		/* Look token */
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if (\Runtime\rs::substr($attr_key, 0, 7) == "@event:")
		{
			/* Look token */
			$res = $parser->parser_base::lookToken($parser, "{");
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$is_fn = \Runtime\rtl::attr($res, 2);
			if ($is_fn)
			{
				$res = $parser->parser_base::matchToken($parser, "{");
				$parser = \Runtime\rtl::attr($res, 0);
				/* Look token */
				$res = $parser->parser_base::lookToken($parser, "{");
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				$find = \Runtime\rtl::attr($res, 2);
				if ($find)
				{
					$parser = $look;
				}
				/* Add msg to vars */
				$parser_vars = $parser->vars;
				$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->concat(\Runtime\Map::from(["component"=>true,"msg"=>true])));
				/* Read expression */
				$res = $parser->parser_expression::readExpression($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				/* Restore vars */
				$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser_vars);
				/* Parse brackets */
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
				if ($find)
				{
					$res = $parser->parser_base::matchToken($parser, "}");
					$parser = \Runtime\rtl::attr($res, 0);
				}
			}
			else
			{
				$res = $parser->parser_base::readString($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
			}
		}
		else if ($ch == "{")
		{
			$res = $parser->parser_base::matchToken($parser, "{");
			$parser = \Runtime\rtl::attr($res, 0);
			/* Look token */
			$res = $parser->parser_base::lookToken($parser, "{");
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$find = \Runtime\rtl::attr($res, 2);
			if ($find)
			{
				$parser = $look;
			}
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "}");
			$parser = \Runtime\rtl::attr($res, 0);
			if ($find)
			{
				$res = $parser->parser_base::matchToken($parser, "}");
				$parser = \Runtime\rtl::attr($res, 0);
			}
		}
		else if ($token->content == "@")
		{
			$res = static::readHTMLValue($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		else if ($token->content == "[")
		{
			$res = $parser->parser_base::readCollection($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		else
		{
			$res = $parser->parser_base::readString($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read html attributes
	 */
	static function readHTMLAttrs($parser)
	{
		$items = new \Runtime\Vector();
		$token = null;
		$look = null;
		$content = $parser->content;
		$content_sz = $parser->content_sz;
		$caret = $parser->parser_base::skipChar($parser, $content, $parser->caret);
		$ch = \Runtime\rs::substr($content->ref, $caret->pos, 1);
		while ($ch != "/" && $ch != ">" && $caret->pos < $content_sz)
		{
			$caret_start = $caret;
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "...")
			{
				$ident = null;
				$res = $parser->parser_base::matchToken($parser, "...");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = $parser->parser_base::readIdentifier($look);
				$parser = \Runtime\rtl::attr($res, 0);
				$ident = \Runtime\rtl::attr($res, 1);
				$items->push(new \BayLang\OpCodes\OpHtmlAttribute(\Runtime\Map::from(["value"=>$ident,"is_spread"=>true,"caret_start"=>$caret_start,"caret_end"=>$parser->caret])));
			}
			else
			{
				$res = static::readHTMLAttrKey($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$key = \Runtime\rtl::attr($res, 1);
				$res = $parser->parser_base::matchToken($parser, "=");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = static::readHTMLAttrValue($parser, $key);
				$parser = \Runtime\rtl::attr($res, 0);
				$value = \Runtime\rtl::attr($res, 1);
				$items->push(new \BayLang\OpCodes\OpHtmlAttribute(\Runtime\Map::from(["key"=>$key,"value"=>$value,"caret_start"=>$caret_start,"caret_end"=>$parser->caret])));
			}
			$caret = $parser->parser_base::skipChar($parser, $content, $parser->caret);
			$ch = \Runtime\rs::substr($content->ref, $caret->pos, 1);
			$ch2 = \Runtime\rs::substr($content->ref, $caret->pos, 2);
			if ($ch2 == "/>")
			{
				break;
			}
		}
		return \Runtime\Vector::from([$parser,$items]);
	}
	/**
	 * Read html template
	 */
	static function readHTMLContent($parser, $end_tag)
	{
		$items = new \Runtime\Vector();
		$item = null;
		$token = null;
		$look = null;
		$caret = null;
		$caret_start = $parser->caret;
		$content = $parser->content;
		$content_sz = $parser->content_sz;
		$pos = $parser->caret->pos;
		$x = $parser->caret->x;
		$y = $parser->caret->y;
		$start_pos = $pos;
		$end_tag_sz = \Runtime\rs::strlen($end_tag);
		$ch_pos = \Runtime\rs::substr($content->ref, $pos, $end_tag_sz);
		$flag_first = true;
		$first_html_tag = false;
		if ($end_tag == "")
		{
			$first_html_tag = true;
		}
		while (($end_tag == "" || $end_tag != "" && $ch_pos != $end_tag) && $pos < $content_sz)
		{
			$ch = \Runtime\rs::substr($content->ref, $pos, 1);
			$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
			$ch3 = \Runtime\rs::substr($content->ref, $pos, 3);
			$ch4 = \Runtime\rs::substr($content->ref, $pos, 4);
			$ch6 = \Runtime\rs::substr($content->ref, $pos, 6);
			$ch7 = \Runtime\rs::substr($content->ref, $pos, 7);
			/* Html comment */
			if ($ch4 == "<!--")
			{
				$value = \Runtime\rs::substr($content->ref, $start_pos, $pos - $start_pos);
				$caret = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
				$value = \Runtime\rs::trim($value, "\t\r\n");
				$value = \Runtime\rs::trim($value, " ");
				if ($value != "")
				{
					$item = new \BayLang\OpCodes\OpHtmlContent(\Runtime\Map::from(["value"=>$value,"caret_start"=>$caret_start,"caret_end"=>$caret]));
					$items->push($item);
				}
				/* Read HTML Comment */
				$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
				$res = static::readHTMLComment($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$items->push(\Runtime\rtl::attr($res, 1));
				/* Set pos, x, y */
				$caret_start = $parser->caret;
				$pos = $parser->caret->pos;
				$x = $parser->caret->x;
				$y = $parser->caret->y;
				$start_pos = $pos;
			}
			else if ($ch == "<" || $ch2 == "{{" || $ch == "@")
			{
				$value = \Runtime\rs::substr($content->ref, $start_pos, $pos - $start_pos);
				$caret = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
				$value = \Runtime\rs::trim($value, "\t\r\n");
				if ($flag_first && $first_html_tag)
				{
					$value = \Runtime\rs::trim($value, " ");
				}
				if ($value != "")
				{
					$item = new \BayLang\OpCodes\OpHtmlContent(\Runtime\Map::from(["value"=>$value,"caret_start"=>$caret_start,"caret_end"=>$caret]));
					$items->push($item);
				}
				/* Read HTML Value */
				$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
				$res = static::readHTMLValue($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$item = \Runtime\rtl::attr($res, 1);
				$items->push($item);
				/* Set pos, x, y */
				$caret_start = $parser->caret;
				$pos = $parser->caret->pos;
				$x = $parser->caret->x;
				$y = $parser->caret->y;
				$start_pos = $pos;
			}
			else if ($ch3 == "%if" || $ch4 == "%for" || $ch4 == "%var" || $ch4 == "%set" || $ch6 == "%while" || $ch7 == "%render")
			{
				$value = \Runtime\rs::substr($content->ref, $start_pos, $pos - $start_pos);
				$caret = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
				$value = \Runtime\rs::trim($value, "\t\r\n");
				$value = \Runtime\rs::trim($value, " ");
				if ($value != "")
				{
					$item = new \BayLang\OpCodes\OpHtmlContent(\Runtime\Map::from(["value"=>$value,"caret_start"=>$caret_start,"caret_end"=>$caret]));
					$items->push($item);
				}
				/* Read HTML Operator */
				$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
				$res = static::readHTMLOperator($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$item = \Runtime\rtl::attr($res, 1);
				$items->push($item);
				/* Set pos, x, y */
				$caret_start = $parser->caret;
				$pos = $parser->caret->pos;
				$x = $parser->caret->x;
				$y = $parser->caret->y;
				$start_pos = $pos;
			}
			else
			{
				if ($first_html_tag && $ch != " " && $ch != "\t" && $ch != "\r" && $ch != "\n")
				{
					break;
				}
				$x = $parser->parser_base::nextX($parser, $ch, $x);
				$y = $parser->parser_base::nextY($parser, $ch, $y);
				$pos = $pos + 1;
			}
			$ch_pos = \Runtime\rs::substr($content->ref, $pos, $end_tag_sz);
		}
		/* Push item */
		$value = \Runtime\rs::substr($content->ref, $start_pos, $pos - $start_pos);
		$value = \Runtime\rs::trim($value, "\t\r\n");
		$caret = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
		if ($first_html_tag)
		{
			$value = \Runtime\rs::trim($value, " ");
		}
		if ($value != "")
		{
			$item = new \BayLang\OpCodes\OpHtmlContent(\Runtime\Map::from(["value"=>$value,"caret_start"=>$caret_start,"caret_end"=>$caret]));
			$items->push($item);
		}
		return \Runtime\Vector::from([$parser->copy(\Runtime\Map::from(["caret"=>$caret])),$items]);
	}
	/**
	 * Read html tag
	 */
	static function readHTMLTag($parser)
	{
		$token = null;
		$look = null;
		$ident = null;
		$caret_items_start = null;
		$caret_items_end = null;
		$caret_start = $parser->caret;
		$items = null;
		$op_code_name = null;
		$is_single_flag = false;
		$op_code_flag = false;
		$tag_name = "";
		/* Tag start */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		/* Look token */
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "{")
		{
			$op_code_flag = true;
			$caret1 = $parser->caret;
			$res = $parser->parser_base::matchToken($parser, "{");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code_name = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "}");
			$parser = \Runtime\rtl::attr($res, 0);
			$caret2 = $parser->caret;
			$tag_name = \Runtime\rs::substr($parser->content->ref, $caret1->pos, $caret2->pos - $caret1->pos);
		}
		else if ($token->content == ">")
		{
			$op_code_flag = true;
			$tag_name = "";
		}
		else
		{
			$res = $parser->parser_base::readIdentifier($parser, false);
			$parser = \Runtime\rtl::attr($res, 0);
			$ident = \Runtime\rtl::attr($res, 1);
			$tag_name = $ident->value;
		}
		$res = static::readHTMLAttrs($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$attrs = \Runtime\rtl::attr($res, 1);
		/* Save vars */
		$save_vars = $parser->vars;
		$slot_args = null;
		$slot_use = null;
		/* Read slot args */
		if ($tag_name == "slot")
		{
			/* Slot args */
			$args_item = $attrs->findItem(\Runtime\lib::equalAttr("key", "args"));
			if ($args_item)
			{
				$args_str = $args_item->value->value;
				/* Create parser */
				$parser2 = new \BayLang\LangBay\ParserBay();
				$parser2 = $parser2::reset($parser2);
				$parser2 = $parser2::setContent($parser2, $args_str);
				$parser2 = \Runtime\rtl::setAttr($parser2, ["caret"], new \BayLang\Caret(\Runtime\Map::from([])));
				/* Parse args */
				$res = $parser2->parser_operator::readDeclareFunctionArgs($parser2, false, false);
				$parser2 = \Runtime\rtl::attr($res, 0);
				$slot_args = \Runtime\rtl::attr($res, 1);
				$parser2_vars = $parser2->vars;
				/* Add slot args */
				$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser2_vars);
			}
			/* Slot use */
			$args_item = $attrs->findItem(\Runtime\lib::equalAttr("key", "use"));
			if ($args_item)
			{
				$args_str = $args_item->value->value;
				$slot_use = new \Runtime\Vector();
				/* Each items */
				$parser2_vars = \Runtime\Map::from([]);
				$items = \Runtime\rs::split(",", $args_str);
				for ($i = 0; $i < $items->count(); $i++)
				{
					$slot_use->push(new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["value"=>$items->get($i),"kind"=>\BayLang\OpCodes\OpIdentifier::KIND_VARIABLE])));
					$parser2_vars->set($items->get($i), true);
				}
				/* Add slot args */
				$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->concat($parser2_vars));
			}
		}
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "/")
		{
			$parser = $look;
			$is_single_flag = true;
		}
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		if (!$is_single_flag)
		{
			if ($tag_name == "svg")
			{
				$res = $parser->parser_base::readUntilStringArr($parser, \Runtime\Vector::from(["</svg>"]), false);
				$parser = \Runtime\rtl::attr($res, 0);
				$content = \Runtime\rtl::attr($res, 1);
				$content = \Runtime\re::replace("[\t\n]", "", $content);
				$items = \Runtime\Vector::from([new \BayLang\OpCodes\OpHtmlValue(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpHtmlValue::KIND_RAW,"value"=>new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$parser->caret,"caret_end"=>$parser->caret,"value"=>$content])),"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
			}
			else
			{
				/* Read items */
				$caret_items_start = $parser->caret;
				$res = static::readHTMLContent($parser, "</" . \Runtime\rtl::toStr($tag_name));
				$parser = \Runtime\rtl::attr($res, 0);
				$items = \Runtime\rtl::attr($res, 1);
				$caret_items_end = $parser->caret;
			}
			/* Tag end */
			if ($op_code_flag)
			{
				$res = $parser->parser_base::matchToken($parser, "<");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = $parser->parser_base::matchToken($parser, "/");
				$parser = \Runtime\rtl::attr($res, 0);
				if ($tag_name)
				{
					$res = $parser->parser_base::matchString($parser, $tag_name);
					$parser = \Runtime\rtl::attr($res, 0);
				}
				$res = $parser->parser_base::matchToken($parser, ">");
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else
			{
				$res = $parser->parser_base::matchToken($parser, "<");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = $parser->parser_base::matchToken($parser, "/");
				$parser = \Runtime\rtl::attr($res, 0);
				if ($ident != null)
				{
					$res = $parser->parser_base::matchToken($parser, $tag_name);
					$parser = \Runtime\rtl::attr($res, 0);
				}
				$res = $parser->parser_base::matchToken($parser, ">");
				$parser = \Runtime\rtl::attr($res, 0);
			}
		}
		/* Restore vars */
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		/* Create op_code */
		$op_code = null;
		if ($tag_name == "slot")
		{
			$op_attr_name = $attrs->findItem(\Runtime\lib::equalAttr("key", "name"));
			/* Filter attrs */
			$attrs = $attrs->filter(\Runtime\lib::equalAttrNot("key", "args"));
			$attrs = $attrs->filter(\Runtime\lib::equalAttrNot("key", "name"));
			$attrs = $attrs->filter(\Runtime\lib::equalAttrNot("key", "use"));
			$name = "";
			if ($op_attr_name && $op_attr_name->value instanceof \BayLang\OpCodes\OpString)
			{
				$name = $op_attr_name->value->value;
			}
			$op_code = new \BayLang\OpCodes\OpHtmlSlot(\Runtime\Map::from(["args"=>$slot_args,"attrs"=>$attrs,"name"=>$name,"vars"=>$slot_use,"caret_start"=>$caret_start,"caret_end"=>$parser->caret,"items"=>($items != null) ? (new \BayLang\OpCodes\OpHtmlItems(\Runtime\Map::from(["caret_start"=>$caret_items_start,"caret_end"=>$caret_items_end,"items"=>$items]))) : (null)]));
		}
		else
		{
			$op_code = new \BayLang\OpCodes\OpHtmlTag(\Runtime\Map::from(["attrs"=>$attrs,"tag_name"=>$tag_name,"op_code_name"=>$op_code_name,"caret_start"=>$caret_start,"caret_end"=>$parser->caret,"items"=>($items != null) ? (new \BayLang\OpCodes\OpHtmlItems(\Runtime\Map::from(["caret_start"=>$caret_items_start,"caret_end"=>$caret_items_end,"items"=>$items]))) : (null)]));
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read html operator
	 */
	static function readHTMLOperator($parser)
	{
		$look = null;
		$token = null;
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "%if")
		{
			return $parser->parser_operator::readIf($parser);
		}
		else if ($token->content == "%for")
		{
			return $parser->parser_operator::readFor($parser);
		}
		else if ($token->content == "%while")
		{
			return $parser->parser_operator::readWhile($parser);
		}
		else if ($token->content == "%var")
		{
			$op_code = null;
			$res = $parser->parser_base::matchToken($parser, "%var");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_operator::readAssign($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, ";");
			$parser = \Runtime\rtl::attr($res, 0);
			return \Runtime\Vector::from([$parser,$op_code]);
		}
		else if ($token->content == "%set")
		{
			$op_code = null;
			$res = $parser->parser_base::matchToken($parser, "%set");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_operator::readAssign($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, ";");
			$parser = \Runtime\rtl::attr($res, 0);
			return \Runtime\Vector::from([$parser,$op_code]);
		}
		else if ($token->content == "%render")
		{
			$op_code = null;
			$res = $parser->parser_base::matchToken($parser, "%render");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readDynamic($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			if ($op_code instanceof \BayLang\OpCodes\OpCall)
			{
				$op_code = \Runtime\rtl::setAttr($op_code, ["is_html"], true);
			}
			$res = $parser->parser_base::matchToken($parser, ";");
			$parser = \Runtime\rtl::attr($res, 0);
			return \Runtime\Vector::from([$parser,$op_code]);
		}
		return \Runtime\Vector::from([$parser,null]);
	}
	/**
	 * Read html operator
	 */
	static function readHTML($parser, $end_tag="")
	{
		$caret_start = $parser->caret;
		/* Enable html flag */
		$save_is_html = $parser->is_html;
		$parser = \Runtime\rtl::setAttr($parser, ["is_html"], true);
		$res = static::readHTMLContent($parser, $end_tag);
		$parser = \Runtime\rtl::attr($res, 0);
		$items = \Runtime\rtl::attr($res, 1);
		$op_code = new \BayLang\OpCodes\OpHtmlItems(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"items"=>$items]));
		/* Disable html flag */
		$parser = \Runtime\rtl::setAttr($parser, ["is_html"], $save_is_html);
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read html operator
	 */
	static function readHTMLTemplate($parser, $item_attrs, $caret_start)
	{
		$fn_name = $item_attrs->get("name", "render");
		$fn_args_str = $item_attrs->get("args", "");
		$parser2_vars = \Runtime\Map::from([]);
		/*
		Collection<OpDeclareFunctionArg> fn_args =
		[
			new OpDeclareFunctionArg
			{
				"name": "component",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "layout",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "model_path",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "render_params",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
			new OpDeclareFunctionArg
			{
				"name": "render_content",
				"caret_start": caret_start,
				"caret_end": parser.caret,
			},
		];
		*/
		$fn_args = \Runtime\Vector::from([]);
		if ($item_attrs->has("args"))
		{
			$parser2 = $parser::setContent($parser, $fn_args_str);
			$parser2 = \Runtime\rtl::setAttr($parser2, ["caret"], new \BayLang\Caret(\Runtime\Map::from([])));
			/* Parse args */
			$res = $parser->parser_operator::readDeclareFunctionArgs($parser2, false, false);
			$parser2 = \Runtime\rtl::attr($res, 0);
			$fn_args2 = \Runtime\rtl::attr($res, 1);
			$parser2_vars = $parser2->vars;
			$fn_args = $fn_args->concat($fn_args2);
		}
		/* If multiblock */
		$is_multiblock = false;
		if ($item_attrs->has("multiblock"))
		{
			if ($item_attrs->get("multiblock") == "true")
			{
				$is_multiblock = true;
			}
			else if ($item_attrs->get("multiblock") == "false")
			{
				$is_multiblock = false;
			}
		}
		/* Register variable in parser */
		/*parser2_vars = parser2_vars
			.setIm("layout", true)
			.setIm("model", true)
			.setIm("model_path", true)
			.setIm("render_params", true)
			.setIm("render_content", true)
		;*/
		/* Read template content */
		$save_vars = $parser->vars;
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $parser->vars->concat($parser2_vars));
		$res = static::readHTML($parser, "</template");
		$parser = \Runtime\rtl::attr($res, 0);
		$expression = \Runtime\rtl::attr($res, 1);
		$parser = \Runtime\rtl::setAttr($parser, ["vars"], $save_vars);
		/* Read template footer */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "/");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "template");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		$f = new \BayLang\OpCodes\OpDeclareFunction(\Runtime\Map::from(["args"=>$fn_args,"vars"=>\Runtime\Vector::from([]),"flags"=>new \BayLang\OpCodes\OpFlags(\Runtime\Map::from(["p_static"=>false,"p_pure"=>false,"p_multiblock"=>$is_multiblock])),"name"=>$fn_name,"result_type"=>"html","is_html"=>true,"expression"=>$expression,"items"=>null,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
		return \Runtime\Vector::from([$parser,$f]);
	}
	/**
	 * Read html attributes
	 */
	static function readAttrs($parser)
	{
		$look = null;
		$op_code = null;
		$token = null;
		$look_token = null;
		$items = new \Runtime\Map();
		$content = $parser->content;
		$content_sz = $parser->content_sz;
		$caret = $parser->parser_base::skipChar($parser, $content, $parser->caret);
		$ch = \Runtime\rs::substr($content->ref, $caret->pos, 1);
		while ($ch != "/" && $ch != ">" && $caret->pos < $content_sz)
		{
			$res = $parser->parser_base::readToken($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$res = $parser->parser_base::matchToken($parser, "=");
			$parser = \Runtime\rtl::attr($res, 0);
			$attr_name = $token->content;
			/* Look token */
			$res = $parser->parser_base::readToken($parser);
			$look_token = \Runtime\rtl::attr($res, 1);
			if ($look_token->content == "{")
			{
				$res = $parser->parser_base::readDict($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$caret = $parser->caret;
				$items->set($attr_name, $op_code);
			}
			else
			{
				$res = $parser->parser_base::readString($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$items->set($attr_name, $op_code->value);
			}
			$caret = $parser->parser_base::skipChar($parser, $content, $parser->caret);
			$ch = \Runtime\rs::substr($content->ref, $caret->pos, 1);
			$ch2 = \Runtime\rs::substr($content->ref, $caret->pos, 2);
			if ($ch2 == "/>")
			{
				break;
			}
		}
		return \Runtime\Vector::from([$parser,$items]);
	}
	/**
	 * Read item
	 */
	static function readWidget($parser)
	{
		$settings = new \Runtime\Map();
		$items = new \Runtime\Vector();
		/* Read item */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "widget");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = null;
		$look = null;
		$caret = $parser->getCaret();
		$caret_start = $parser->getCaret();
		$end_tag = "</widget>";
		$end_tag_sz = \Runtime\rs::strlen($end_tag);
		/* Skip empty chars */
		$caret = $parser->parser_base::skipChar($parser, $parser->content, $caret);
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		/* Read next string */
		$caret = $parser->getCaret();
		$next_tag = $caret->nextString($end_tag_sz);
		while ($next_tag != $end_tag && !$caret->eof())
		{
			/* Save caret */
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			$parser_item = $parser;
			$res = $parser->parser_base::matchToken($parser, "<");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readToken($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			/* HTML Comment */
			if ($token->content == "!--")
			{
				$res = static::readHTMLComment($parser_item);
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else
			{
				$res = $parser->parser_base::matchToken($parser, ">");
				$parser = \Runtime\rtl::attr($res, 0);
				$props_name = $token->content;
				$props_value = "";
				/* Read widget */
				if ($props_name == "widget")
				{
					$res = static::readWidget($parser_item);
					$parser = \Runtime\rtl::attr($res, 0);
					$item = \Runtime\rtl::attr($res, 1);
					$items->push($item);
				}
				else if ($props_name == "style")
				{
					$res = static::readWidgetStyle($parser_item);
					$parser = \Runtime\rtl::attr($res, 0);
					$item = \Runtime\rtl::attr($res, 1);
					$items->push($item);
				}
				else
				{
					/* Get caret */
					$caret = $parser->getCaret();
					/* Read content */
					$item_ch = $caret->nextChar();
					while ($item_ch != "<" && !$caret->eof())
					{
						$props_value += $item_ch;
						$caret->readChar();
						$item_ch = $caret->nextChar();
					}
					/* Save caret */
					$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
					$settings->set($props_name, new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$caret,"caret_end"=>$parser->caret,"value"=>$props_value])));
					/* Read end tag */
					$res = $parser->parser_base::matchToken($parser, "<");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_base::matchToken($parser, "/");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_base::matchToken($parser, $props_name);
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_base::matchToken($parser, ">");
					$parser = \Runtime\rtl::attr($res, 0);
				}
			}
			/* Skip empty chars */
			$caret = $parser->parser_base::skipChar($parser, $parser->content, $parser->caret);
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			/* Read next string */
			$caret = $parser->getCaret();
			$next_tag = $caret->nextString($end_tag_sz);
		}
		/* Read item */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "/");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "widget");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		/* Create widget data */
		$op_code = new \BayLang\OpCodes\OpWidget(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"items"=>$items,"settings"=>$settings]));
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read widget data
	 */
	static function readWidgetData($parser)
	{
		$token = null;
		$items = new \Runtime\Vector();
		/* Read data */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "data");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		$caret = $parser->getCaret();
		$caret_start = $parser->getCaret();
		$end_tag = "</data>";
		$end_tag_sz = \Runtime\rs::strlen($end_tag);
		/* Skip empty chars */
		$caret = $parser->parser_base::skipChar($parser, $parser->content, $caret);
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		/* Read next string */
		$caret = $parser->getCaret();
		$next_tag = $caret->nextString($end_tag_sz);
		while ($next_tag != $end_tag && !$caret->eof())
		{
			/* Save caret */
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			$parser_item = $parser;
			$res = $parser->parser_base::matchToken($parser, "<");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readToken($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			/* HTML Comment */
			if ($token->content == "!--")
			{
				$res = static::readHTMLComment($parser_item);
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else
			{
				$res = $parser->parser_base::matchToken($parser, ">");
				$parser = \Runtime\rtl::attr($res, 0);
				$item_name = $token->content;
				/* Read widget */
				if ($item_name == "widget")
				{
					$res = static::readWidget($parser_item);
					$parser = \Runtime\rtl::attr($res, 0);
					$item = \Runtime\rtl::attr($res, 1);
					$items->push($item);
				}
				else if ($item_name == "class")
				{
					$res = static::readWidgetClass($parser_item);
					$parser = \Runtime\rtl::attr($res, 0);
					$item = \Runtime\rtl::attr($res, 1);
					$items->push($item);
				}
				else
				{
					throw new \BayLang\Exceptions\ParserError("Unknown identifier '" . \Runtime\rtl::toStr($item_name) . \Runtime\rtl::toStr("'"), $parser_item->caret, $parser->file_name);
				}
			}
			/* Skip empty chars */
			$caret = $parser->parser_base::skipChar($parser, $parser->content, $parser->caret);
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			/* Read next string */
			$caret = $parser->getCaret();
			$next_tag = $caret->nextString($end_tag_sz);
		}
		/* Read data */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "/");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "data");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		/* Create widget data */
		$op_code = new \BayLang\OpCodes\OpWidgetData(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"widget"=>$items]));
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read UI
	 */
	static function readUIClass($parser)
	{
		$module_items = new \Runtime\Vector();
		$items = new \Runtime\Vector();
		$components = new \Runtime\Vector();
		$class_caret_start = $parser->caret;
		$token = null;
		$class_name = "";
		$class_extends = "";
		$class_version = "";
		$class_model = "";
		$item_name = "";
		$namespace_name = "";
		$short_name = "";
		$full_name = "";
		$is_component = "";
		$class_name_last = "";
		$class_annotations = new \Runtime\Vector();
		/* Content */
		$content = $parser->content;
		$content_sz = $parser->content_sz;
		/* Read class header */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "class");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = static::readAttrs($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$attrs = \Runtime\rtl::attr($res, 1);
		$class_name = $attrs->get("name", "");
		$class_extends = $attrs->get("extends", null);
		$class_version = $attrs->get("version", "1.0");
		$class_model = $attrs->get("model", "Runtime.Dict");
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		$flag_is_component = true;
		$flag_is_model = false;
		if ($attrs->get("type") == "model")
		{
			$flag_is_component = false;
			$flag_is_model = true;
		}
		/* Default class extends */
		if ($class_extends == null)
		{
			if ($flag_is_component)
			{
				$class_extends = "Runtime.Web.Component";
			}
			else
			{
				$class_extends = "Runtime.Web.BaseModel";
			}
		}
		$getClassShortName = function ($class_name)
		{
			$__v0 = new \Runtime\Monad($class_name);
			$__v1 = function ($__varg0){return (new \Runtime\Callback(\Runtime\rs::class, "split"))(".", $__varg0);};
			$__v0 = $__v0->call($__v1);
			$__v0 = $__v0->callMethod("last", []);
			return $__v0->value();
		};
		if ($class_name == "Runtime.Web.Component")
		{
			$class_extends = "Runtime.BaseObject";
		}
		else
		{
			$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm($getClassShortName($class_name), $class_name));
		}
		if ($class_extends != "" && $class_extends != null)
		{
			$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm($getClassShortName($class_extends), $class_extends));
			if ($class_extends != "Runtime.BaseObject" && $class_extends != "Runtime.Web.Component" && $class_extends != "Runtime.Web.BaseModel")
			{
				$components->push($class_extends);
			}
		}
		if ($class_model != "" && $class_model != "Runtime.Dict")
		{
			$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm($getClassShortName($class_model), $class_model));
		}
		$class_name_arr = \Runtime\rs::split(".", $class_name);
		$class_name_last = $class_name_arr->last();
		$class_name_arr = $class_name_arr->slice(0, -1);
		$namespace_name = \Runtime\rs::join(".", $class_name_arr);
		$parser = \Runtime\rtl::setAttr($parser, ["current_class_name"], $class_name_last);
		$parser = \Runtime\rtl::setAttr($parser, ["current_namespace_name"], $namespace_name);
		$class_extend_op_code = null;
		if ($class_extends != null)
		{
			$class_extend_op_code = new \BayLang\OpCodes\OpTypeIdentifier(\Runtime\Map::from(["entity_name"=>new \BayLang\OpCodes\OpEntityName(\Runtime\Map::from(["caret_start"=>$class_caret_start,"caret_end"=>$parser->caret,"names"=>\Runtime\rs::split(".", $class_extends)])),"template"=>null,"caret_start"=>$class_caret_start,"caret_end"=>$parser->caret]));
		}
		/* Add namespace */
		$module_items->push(new \BayLang\OpCodes\OpNamespace(\Runtime\Map::from(["name"=>$namespace_name])));
		/* Read class body */
		$caret = $parser->parser_base::skipChar($parser, $content, $parser->caret);
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		$ch2 = \Runtime\rs::substr($content->ref, $caret->pos, 2);
		while ($ch2 != "</" && $caret->pos < $content_sz)
		{
			$parser_start = $parser;
			$caret_start = $parser->caret;
			$res = $parser->parser_base::matchToken($parser, "<");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readToken($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$item_token = \Runtime\rtl::attr($res, 1);
			$item_name = $item_token->content;
			/* Html comment */
			if ($item_name == "!--")
			{
				$res = static::readHTMLComment($parser_start);
				$parser = \Runtime\rtl::attr($res, 0);
				$items->push(\Runtime\rtl::attr($res, 1));
				$caret = $parser->parser_base::skipChar($parser, $content, $parser->caret);
				$ch2 = \Runtime\rs::substr($content->ref, $caret->pos, 2);
				continue;
			}
			$res = static::readAttrs($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$item_attrs = \Runtime\rtl::attr($res, 1);
			if ($item_name == "annotation")
			{
				$annotation_name = $item_attrs->get("name", "");
				$annotation_op_code = $item_attrs->get("value", null);
				$class_annotations->push(new \BayLang\OpCodes\OpAnnotation(\Runtime\Map::from(["name"=>new \BayLang\OpCodes\OpTypeIdentifier(\Runtime\Map::from(["entity_name"=>new \BayLang\OpCodes\OpEntityName(\Runtime\Map::from(["names"=>\Runtime\rs::split(".", $annotation_name)]))])),"params"=>$annotation_op_code])));
			}
			else if ($item_name == "use")
			{
				$full_name = $item_attrs->get("name", "");
				$short_name = $item_attrs->get("as", "");
				$is_component = $item_attrs->get("component", "false");
				$is_component = $is_component == "true" || $is_component == "1";
				if ($short_name == "")
				{
					$short_name = \Runtime\rs::split(".", $full_name)->last();
				}
				$parser = \Runtime\rtl::setAttr($parser, ["uses"], $parser->uses->setIm($short_name, $full_name));
				if ($is_component)
				{
					$components->push($full_name);
				}
				$module_items->push(new \BayLang\OpCodes\OpUse(\Runtime\Map::from(["name"=>$full_name,"alias"=>$short_name,"is_component"=>$is_component])));
			}
			/* Read body */
			$res = $parser->parser_base::readToken($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == ">")
			{
				if ($item_name == "template")
				{
					$res = static::readHTMLTemplate($parser, $item_attrs, $caret_start);
					$parser = \Runtime\rtl::attr($res, 0);
					$op_code = \Runtime\rtl::attr($res, 1);
					$items->push($op_code);
				}
				else if ($item_name == "style")
				{
					$res = static::readStyle($parser, $item_attrs, $items, $caret_start);
					$parser = \Runtime\rtl::attr($res, 0);
					$op_code = \Runtime\rtl::attr($res, 1);
					$items->push($op_code);
				}
				else if ($item_name == "script")
				{
					$res = $parser->parser_program::readClassBody($parser, "</");
					$parser = \Runtime\rtl::attr($res, 0);
					$arr = \Runtime\rtl::attr($res, 1);
					$items->appendItems($arr);
					/* Read script footer */
					$res = $parser->parser_base::matchToken($parser, "<");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_base::matchToken($parser, "/");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_base::matchToken($parser, "script");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = $parser->parser_base::matchToken($parser, ">");
					$parser = \Runtime\rtl::attr($res, 0);
				}
				else
				{
					throw new \BayLang\Exceptions\ParserError("Unknown identifier '" . \Runtime\rtl::toStr($item_name) . \Runtime\rtl::toStr("'"), $item_token->caret_start, $parser->file_name);
				}
			}
			else if ($token->content == "/")
			{
				$res = $parser->parser_base::matchToken($parser, ">");
				$parser = \Runtime\rtl::attr($res, 0);
			}
			else
			{
				throw new \BayLang\Exceptions\ParserError("Unknown identifier '" . \Runtime\rtl::toStr($token->content) . \Runtime\rtl::toStr("'"), $token->caret_start, $parser->file_name);
			}
			$caret = $parser->parser_base::skipChar($parser, $content, $parser->caret);
			$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
			$ch2 = \Runtime\rs::substr($content->ref, $caret->pos, 2);
		}
		/* Add components function */
		if ($components->count() > 0)
		{
			$f = new \BayLang\OpCodes\OpDeclareFunction(\Runtime\Map::from(["args"=>\Runtime\Vector::from([]),"vars"=>\Runtime\Vector::from([]),"flags"=>new \BayLang\OpCodes\OpFlags(\Runtime\Map::from(["p_static"=>true,"p_pure"=>true])),"name"=>"components","result_type"=>"var","expression"=>new \BayLang\OpCodes\OpCollection(\Runtime\Map::from(["caret_start"=>$parser->caret,"caret_end"=>$parser->caret,"values"=>$components->map(function ($class_name) use (&$parser)
			{
				return new \BayLang\OpCodes\OpString(\Runtime\Map::from(["caret_start"=>$parser->caret,"caret_end"=>$parser->caret,"value"=>$class_name]));
			})])),"items"=>null,"caret_start"=>$parser->caret,"caret_end"=>$parser->caret]));
			$items->push($f);
		}
		/* Read class footer */
		$res = $parser->parser_base::matchToken($parser, "<");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "/");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, "class");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = $parser->parser_base::matchToken($parser, ">");
		$parser = \Runtime\rtl::attr($res, 0);
		/* Analyze class body */
		$class_body = $parser->parser_program::classBodyAnalyze($parser, $items);
		/* Add class */
		$module_items->push(new \BayLang\OpCodes\OpDeclareClass(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpDeclareClass::KIND_CLASS,"name"=>$class_name_last,"is_static"=>true,"is_component"=>$flag_is_component,"is_model"=>$flag_is_model,"is_declare"=>false,"class_extends"=>$class_extend_op_code,"class_implements"=>null,"annotations"=>\Runtime\Vector::from([]),"template"=>null,"vars"=>$class_body->item("vars"),"annotations"=>$class_annotations,"functions"=>$class_body->item("functions"),"fn_create"=>$class_body->item("fn_create"),"fn_destroy"=>$class_body->item("fn_destroy"),"items"=>$items,"caret_start"=>$class_caret_start,"caret_end"=>$parser->caret])));
		return \Runtime\Vector::from([$parser,$module_items]);
	}
	/**
	 * Read UI
	 */
	static function readUI($parser)
	{
		$look = null;
		$token = null;
		$items = new \Runtime\Vector();
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		while ($token->content == "<")
		{
			$parser_start = $parser;
			$parser = $look;
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "class")
			{
				$res = static::readUIClass($parser_start);
				$parser = \Runtime\rtl::attr($res, 0);
				$items->appendItems(\Runtime\rtl::attr($res, 1));
			}
			else if ($token->content == "!--")
			{
				$res = static::readHTMLComment($parser_start);
				$parser = \Runtime\rtl::attr($res, 0);
				$items->push(\Runtime\rtl::attr($res, 1));
			}
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpModule(\Runtime\Map::from(["is_component"=>true,"uses"=>$parser->uses,"items"=>$items,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.ParserBayHtml";
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