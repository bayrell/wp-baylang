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
class ParserBayBase
{
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	static function isChar($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isChar", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\rs::indexOf("qazwsxedcrfvtgbyhnujmikolp", \Runtime\rs::lower($ch)) !== -1;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isChar", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	static function isNumber($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isNumber", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\rs::indexOf("0123456789", $ch) !== -1;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isNumber", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	static function isHexChar($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isHexChar", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\rs::indexOf("0123456789abcdef", \Runtime\rs::lower($ch)) !== -1;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isHexChar", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	static function isStringOfNumbers($s)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isStringOfNumbers", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$sz = \Runtime\rs::strlen($s);
		for ($i = 0; $i < $sz; $i++)
		{
			if (!static::isNumber(\Runtime\rs::charAt($s, $i)))
			{
				$__memorize_value = false;
				\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isStringOfNumbers", func_get_args(), $__memorize_value);
				return $__memorize_value;
			}
		}
		$__memorize_value = true;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isStringOfNumbers", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Is system type
	 */
	static function isSystemType($name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		if ($name == "var")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "void")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "bool")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "byte")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "int")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "double")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "float")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "char")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "string")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "list")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "scalar")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "primitive")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "html")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "Error")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "Object")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "DateTime")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "Collection")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "Dict")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "Vector")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "Map")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "rs")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "rtl")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "ArrayInterface")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		$__memorize_value = false;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSystemType", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Returns true if name is identifier
	 */
	static function isIdentifier($name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isIdentifier", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		if ($name == "")
		{
			$__memorize_value = false;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "@")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if (static::isNumber(\Runtime\rs::charAt($name, 0)))
		{
			$__memorize_value = false;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		$sz = \Runtime\rs::strlen($name);
		for ($i = 0; $i < $sz; $i++)
		{
			$ch = \Runtime\rs::charAt($name, $i);
			if (static::isChar($ch) || static::isNumber($ch) || $ch == "_")
			{
				continue;
			}
			$__memorize_value = false;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		$__memorize_value = true;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isIdentifier", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Returns true if reserved words
	 */
	static function isReserved($name)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isReserved", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		if ($name == "__async_t")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		if ($name == "__async_var")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		/*if (name == "__ctx") return true;*/
		/*if (name == "ctx") return true;*/
		if (\Runtime\rs::substr($name, 0, 3) == "__v")
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		$__memorize_value = false;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isReserved", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Returns kind of identifier or thrown Error
	 */
	static function findIdentifier($parser, $name, $caret)
	{
		$kind = "";
		if ($parser->vars->has($name))
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_VARIABLE;
		}
		else if ($parser->uses->has($name))
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_CLASS;
		}
		else if (static::isSystemType($name))
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE;
		}
		else if ($name == "log")
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_SYS_FUNCTION;
		}
		else if ($name == "window" || $name == "document")
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_VARIABLE;
		}
		else if ($name == "null" || $name == "true" || $name == "false")
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_CONSTANT;
		}
		else if ($name == "fn")
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_FUNCTION;
		}
		else if ($name == "@" || $name == "_")
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_CONTEXT;
		}
		else if ($name == "static" || $name == "self" || $name == "this" || $name == "parent")
		{
			$kind = \BayLang\OpCodes\OpIdentifier::KIND_CLASSREF;
		}
		return $kind;
	}
	/**
	 * Return true if char is token char
	 * @param {char} ch
	 * @return {boolean}
	 */
	static function isTokenChar($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isTokenChar", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$__memorize_value = \Runtime\rs::indexOf("qazwsxedcrfvtgbyhnujmikolp0123456789_", \Runtime\rs::lower($ch)) !== -1;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isTokenChar", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	static function isSkipChar($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.LangBay.ParserBayBase.isSkipChar", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		if (\Runtime\rs::ord($ch) <= 32)
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSkipChar", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		$__memorize_value = false;
		\Runtime\rtl::_memorizeSave("BayLang.LangBay.ParserBayBase.isSkipChar", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Returns next X
	 */
	static function nextX($parser, $ch, $x, $direction=1)
	{
		if ($ch == "\t")
		{
			return $x + $parser->tab_size * $direction;
		}
		if ($ch == "\n")
		{
			return 0;
		}
		return $x + $direction;
	}
	/**
	 * Returns next Y
	 */
	static function nextY($parser, $ch, $y, $direction=1)
	{
		if ($ch == "\n")
		{
			return $y + $direction;
		}
		return $y;
	}
	/**
	 * Returns next
	 */
	static function next($parser, $s, $x, $y, $pos)
	{
		$sz = \Runtime\rs::strlen($s);
		for ($i = 0; $i < $sz; $i++)
		{
			$ch = \Runtime\rs::substr($s, $i, 1);
			$x = static::nextX($parser, $ch, $x);
			$y = static::nextY($parser, $ch, $y);
			$pos = $pos + 1;
		}
		return \Runtime\Vector::from([$x,$y,$pos]);
	}
	/**
	 * Open comment
	 */
	static function isCommentOpen($parser, $str)
	{
		return $parser->skip_comments && (($parser->is_html) ? ($str == "<!--") : ($str == "/*"));
	}
	/**
	 * Close comment
	 */
	static function isCommentClose($parser, $str)
	{
		return ($parser->is_html) ? ($str == "-->") : ($str == "*/");
	}
	/**
	 * Skip char
	 */
	static function skipChar($parser, $content, $start_pos)
	{
		$x = $start_pos->x;
		$y = $start_pos->y;
		$pos = $start_pos->pos;
		$skip_comments = $parser->skip_comments;
		/* Check boundaries */
		if ($pos >= $parser->content_sz)
		{
			throw new \BayLang\Exceptions\ParserEOF();
		}
		$ch = \Runtime\rs::charAt($content->ref, $pos);
		$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
		$ch4 = \Runtime\rs::substr($content->ref, $pos, 4);
		while ((static::isSkipChar($ch) || static::isCommentOpen($parser, $ch2) || static::isCommentOpen($parser, $ch4)) && $pos < $parser->content_sz)
		{
			if (static::isCommentOpen($parser, $ch2))
			{
				$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
				while (!static::isCommentClose($parser, $ch2) && $pos < $parser->content_sz)
				{
					$x = static::nextX($parser, $ch, $x);
					$y = static::nextY($parser, $ch, $y);
					$pos = $pos + 1;
					if ($pos >= $parser->content_sz)
					{
						break;
					}
					$ch = \Runtime\rs::charAt($content->ref, $pos);
					$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
				}
				if (static::isCommentClose($parser, $ch2))
				{
					$x = $x + 2;
					$pos = $pos + 2;
				}
			}
			else if (static::isCommentOpen($parser, $ch4))
			{
				$ch3 = \Runtime\rs::substr($content->ref, $pos, 3);
				while (!static::isCommentClose($parser, $ch3) && $pos < $parser->content_sz)
				{
					$x = static::nextX($parser, $ch, $x);
					$y = static::nextY($parser, $ch, $y);
					$pos = $pos + 1;
					if ($pos >= $parser->content_sz)
					{
						break;
					}
					$ch = \Runtime\rs::charAt($content->ref, $pos);
					$ch3 = \Runtime\rs::substr($content->ref, $pos, 3);
				}
				if (static::isCommentClose($parser, $ch3))
				{
					$x = $x + 3;
					$pos = $pos + 3;
				}
			}
			else
			{
				$x = static::nextX($parser, $ch, $x);
				$y = static::nextY($parser, $ch, $y);
				$pos = $pos + 1;
			}
			if ($pos >= $parser->content_sz)
			{
				break;
			}
			$ch = \Runtime\rs::charAt($content->ref, $pos);
			$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
			$ch4 = \Runtime\rs::substr($content->ref, $pos, 4);
		}
		return new \BayLang\Caret(\Runtime\Map::from(["pos"=>$pos,"x"=>$x,"y"=>$y]));
	}
	/**
	 * Read special token
	 */
	static function readSpecialToken($parser, $content, $start_pos)
	{
		$pos = $start_pos->pos;
		$s = "";
		$s = \Runtime\rs::substr($content->ref, $pos, 10);
		if ($s == "#endswitch")
		{
			return $s;
		}
		$s = \Runtime\rs::substr($content->ref, $pos, 7);
		if ($s == "#ifcode" || $s == "#switch" || $s == "#elseif" || $s == "%render")
		{
			return $s;
		}
		$s = \Runtime\rs::substr($content->ref, $pos, 6);
		if ($s == "#endif" || $s == "#ifdef" || $s == "%while")
		{
			return $s;
		}
		$s = \Runtime\rs::substr($content->ref, $pos, 5);
		if ($s == "#case" || $s == "%else")
		{
			return $s;
		}
		$s = \Runtime\rs::substr($content->ref, $pos, 4);
		if ($s == "@css" || $s == "%for" || $s == "%var" || $s == "%set")
		{
			return $s;
		}
		$s = \Runtime\rs::substr($content->ref, $pos, 3);
		if ($s == "!--" || $s == "!==" || $s == "===" || $s == "..." || $s == "#if" || $s == "%if")
		{
			return $s;
		}
		$s = \Runtime\rs::substr($content->ref, $pos, 2);
		if ($s == "==" || $s == "!=" || $s == "<=" || $s == ">=" || $s == "=>" || $s == "->" || $s == "|>" || $s == "::" || $s == "+=" || $s == "-=" || $s == "~=" || $s == "**" || $s == "<<" || $s == ">>" || $s == "++" || $s == "--")
		{
			return $s;
		}
		return "";
	}
	/**
	 * Read next token and return caret end
	 */
	static function nextToken($parser, $content, $start_pos)
	{
		$is_first = true;
		$x = $start_pos->x;
		$y = $start_pos->y;
		$pos = $start_pos->pos;
		/* Check boundaries */
		if ($pos >= $parser->content_sz)
		{
			throw new \BayLang\Exceptions\ParserEOF();
		}
		$s = static::readSpecialToken($parser, $content, $start_pos);
		if ($s != "")
		{
			$sz = \Runtime\rs::strlen($s);
			for ($i = 0; $i < $sz; $i++)
			{
				$ch = \Runtime\rs::charAt($s, $i);
				$x = static::nextX($parser, $ch, $x);
				$y = static::nextY($parser, $ch, $y);
				$pos = $pos + 1;
			}
			return new \BayLang\Caret(\Runtime\Map::from(["pos"=>$pos,"x"=>$x,"y"=>$y]));
		}
		$ch = \Runtime\rs::charAt($content->ref, $pos);
		if (!static::isTokenChar($ch))
		{
			$x = static::nextX($parser, $ch, $x);
			$y = static::nextY($parser, $ch, $y);
			$pos = $pos + 1;
		}
		else
		{
			while (static::isTokenChar($ch))
			{
				$x = static::nextX($parser, $ch, $x);
				$y = static::nextY($parser, $ch, $y);
				$pos = $pos + 1;
				if ($pos >= $parser->content_sz)
				{
					break;
				}
				$ch = \Runtime\rs::charAt($content->ref, $pos);
			}
		}
		return new \BayLang\Caret(\Runtime\Map::from(["pos"=>$pos,"x"=>$x,"y"=>$y]));
	}
	/**
	 * Read back
	 */
	static function readBack($parser, $search="")
	{
		$content = $parser->content;
		$caret = $parser->caret;
		$x = $caret->x;
		$y = $caret->y;
		$pos = $caret->pos;
		$search_sz = \Runtime\rs::strlen($search);
		$s = "";
		while ($pos >= 0)
		{
			$ch = \Runtime\rs::charAt($content->ref, $pos);
			$x = static::nextX($parser, $ch, $x, -1);
			$y = static::nextY($parser, $ch, $y, -1);
			$pos--;
			$s = \Runtime\rs::substr($content->ref, $pos, $search_sz);
			if ($s == $search)
			{
				break;
			}
		}
		return $parser->copy(\Runtime\Map::from(["caret"=>new \BayLang\Caret(\Runtime\Map::from(["pos"=>$pos,"x"=>$x,"y"=>$y]))]));
	}
	/**
	 * Read next token
	 */
	static function readToken($parser)
	{
		$caret_start = null;
		$caret_end = null;
		$eof = false;
		try
		{
			
			$caret_start = static::skipChar($parser, $parser->content, $parser->caret);
			$caret_end = static::nextToken($parser, $parser->content, $caret_start);
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserEOF)
			{
				$e = $_ex;
				if ($caret_start == null)
				{
					$caret_start = $parser->caret;
				}
				if ($caret_end == null)
				{
					$caret_end = $caret_start;
				}
				$eof = true;
			}
			else if (true)
			{
				$e = $_ex;
				throw $e;
			}
			else
			{
				throw $_ex;
			}
		}
		return \Runtime\Vector::from([$parser->copy(\Runtime\Map::from(["caret"=>$caret_end])),new \BayLang\CoreToken(\Runtime\Map::from(["content"=>\Runtime\rs::substr($parser->content->ref, $caret_start->pos, $caret_end->pos - $caret_start->pos),"caret_start"=>$caret_start,"caret_end"=>$caret_end,"eof"=>$eof]))]);
	}
	/**
	 * Look next token
	 */
	static function lookToken($parser, $token)
	{
		$token_content = "";
		$content = $parser->content;
		$caret_start = null;
		$caret_end = null;
		$sz = \Runtime\rs::strlen($token);
		$eof = false;
		$find = false;
		try
		{
			
			$caret_start = static::skipChar($parser, $content, $parser->caret);
			$pos = $caret_start->pos;
			$x = $caret_start->x;
			$y = $caret_start->y;
			$token_content = \Runtime\rs::substr($content->ref, $pos, $sz);
			if ($token_content == $token)
			{
				$find = true;
			}
			$res = static::next($parser, $token_content, $x, $y, $pos);
			$x = \Runtime\rtl::attr($res, 0);
			$y = \Runtime\rtl::attr($res, 1);
			$pos = \Runtime\rtl::attr($res, 2);
			$caret_end = new \BayLang\Caret(\Runtime\Map::from(["pos"=>$pos,"x"=>$x,"y"=>$y]));
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserEOF)
			{
				$e = $_ex;
				if ($caret_start == null)
				{
					$caret_start = $parser->caret;
				}
				if ($caret_end == null)
				{
					$caret_end = $caret_start;
				}
				$eof = true;
			}
			else if (true)
			{
				$e = $_ex;
				throw $e;
			}
			else
			{
				throw $_ex;
			}
		}
		return \Runtime\Vector::from([$parser->copy(\Runtime\Map::from(["caret"=>$caret_end])),new \BayLang\CoreToken(\Runtime\Map::from(["content"=>$token_content,"caret_start"=>$caret_start,"caret_end"=>$caret_end,"eof"=>$eof])),$find]);
	}
	/**
	 * Match next token
	 */
	static function matchToken($parser, $next_token)
	{
		$token = null;
		/* Look token */
		$res = static::lookToken($parser, $next_token);
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$find = \Runtime\rtl::attr($res, 2);
		if (!$find)
		{
			throw new \BayLang\Exceptions\ParserExpected($next_token, $token->caret_start, $parser->file_name);
		}
		return \Runtime\Vector::from([$parser,$token]);
	}
	/**
	 * Match next string
	 */
	static function matchString($parser, $str1)
	{
		$caret = $parser->caret;
		$sz = \Runtime\rs::strlen($str1);
		$str2 = \Runtime\rs::substr($parser->content->ref, $caret->pos, $sz);
		if ($str1 != $str2)
		{
			throw new \BayLang\Exceptions\ParserExpected($str1, $caret, $parser->file_name);
		}
		$res = static::next($parser, $str1, $caret->x, $caret->y, $caret->pos);
		$caret = new \BayLang\Caret(\Runtime\Map::from(["x"=>\Runtime\rtl::attr($res, 0),"y"=>\Runtime\rtl::attr($res, 1),"pos"=>\Runtime\rtl::attr($res, 2)]));
		$parser = \Runtime\rtl::setAttr($parser, ["caret"], $caret);
		return \Runtime\Vector::from([$parser,null]);
	}
	/**
	 * Read number
	 */
	static function readNumber($parser, $flag_negative=false)
	{
		$token = null;
		$start = $parser;
		/* Read token */
		$res = static::readToken($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		if ($token->content == "")
		{
			throw new \BayLang\Exceptions\ParserExpected("Number", $caret_start, $parser->file_name);
		}
		if (!static::isStringOfNumbers($token->content))
		{
			throw new \BayLang\Exceptions\ParserExpected("Number", $caret_start, $parser->file_name);
		}
		$value = $token->content;
		/* Look dot */
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == ".")
		{
			$value .= \Runtime\rtl::toStr(".");
			$res = static::readToken($look);
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$value .= \Runtime\rtl::toStr($token->content);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpNumber(\Runtime\Map::from(["value"=>$value,"caret_start"=>$caret_start,"caret_end"=>$parser->caret,"negative"=>$flag_negative]))]);
	}
	/**
	 * Read string
	 */
	static function readUntilStringArr($parser, $arr, $flag_include=true)
	{
		$token = null;
		$look = null;
		$content = $parser->content;
		$content_sz = $parser->content_sz;
		$pos = $parser->caret->pos;
		$x = $parser->caret->x;
		$y = $parser->caret->y;
		/* Search next string in arr */
		$search = function ($pos) use (&$content,&$arr)
		{
			for ($i = 0; $i < $arr->count(); $i++)
			{
				$item = $arr->item($i);
				$sz = \Runtime\rs::strlen($item);
				$str = \Runtime\rs::substr($content->ref, $pos, $sz);
				if ($str == $item)
				{
					return $i;
				}
			}
			return -1;
		};
		/* Start and end positionss */
		$start_pos = $pos;
		$end_pos = $pos;
		/* Read string value */
		$ch = "";
		$arr_pos = $search($pos);
		while ($pos < $content_sz && $arr_pos == -1)
		{
			$ch = \Runtime\rs::charAt($content->ref, $pos);
			$x = static::nextX($parser, $ch, $x);
			$y = static::nextY($parser, $ch, $y);
			$pos = $pos + 1;
			if ($pos >= $content_sz)
			{
				throw new \BayLang\Exceptions\ParserExpected(\Runtime\rs::join(",", $arr), new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos])), $parser->file_name);
			}
			$arr_pos = $search($pos);
		}
		if ($arr_pos == -1)
		{
			throw new \BayLang\Exceptions\ParserExpected("End of string", new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos])), $parser->file_name);
		}
		if (!$flag_include)
		{
			$end_pos = $pos;
		}
		else
		{
			$item = $arr->item($arr_pos);
			$sz = \Runtime\rs::strlen($item);
			for ($i = 0; $i < $sz; $i++)
			{
				$ch = \Runtime\rs::charAt($content->ref, $pos);
				$x = static::nextX($parser, $ch, $x);
				$y = static::nextY($parser, $ch, $y);
				$pos = $pos + 1;
			}
			$end_pos = $pos;
		}
		/* Return result */
		$caret_end = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$end_pos]));
		return \Runtime\Vector::from([$parser->copy(\Runtime\Map::from(["caret"=>$caret_end])),\Runtime\rs::substr($content->ref, $start_pos, $end_pos - $start_pos)]);
	}
	/**
	 * Read string
	 */
	static function readString($parser)
	{
		$token = null;
		$look = null;
		/* Read token */
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$str_char = $token->content;
		/* Read begin string char */
		if ($str_char != "'" && $str_char != "\"")
		{
			throw new \BayLang\Exceptions\ParserExpected("String", $caret_start, $parser->file_name);
		}
		$content = $look->content;
		$content_sz = $look->content_sz;
		$pos = $look->caret->pos;
		$x = $look->caret->x;
		$y = $look->caret->y;
		/* Read string value */
		$value_str = "";
		$ch = \Runtime\rs::charAt($content->ref, $pos);
		while ($pos < $content_sz && $ch != $str_char)
		{
			if ($ch == "\\")
			{
				$x = static::nextX($parser, $ch, $x);
				$y = static::nextY($parser, $ch, $y);
				$pos = $pos + 1;
				if ($pos >= $content_sz)
				{
					throw new \BayLang\Exceptions\ParserExpected("End of string", new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos])), $parser->file_name);
				}
				$ch2 = \Runtime\rs::charAt($content->ref, $pos);
				if ($ch2 == "n")
				{
					$value_str .= \Runtime\rtl::toStr("\n");
				}
				else if ($ch2 == "r")
				{
					$value_str .= \Runtime\rtl::toStr("\r");
				}
				else if ($ch2 == "t")
				{
					$value_str .= \Runtime\rtl::toStr("\t");
				}
				else if ($ch2 == "s")
				{
					$value_str .= \Runtime\rtl::toStr(" ");
				}
				else if ($ch2 == "\\")
				{
					$value_str .= \Runtime\rtl::toStr("\\");
				}
				else if ($ch2 == "'")
				{
					$value_str .= \Runtime\rtl::toStr("'");
				}
				else if ($ch2 == "\"")
				{
					$value_str .= \Runtime\rtl::toStr("\"");
				}
				else
				{
					$value_str .= \Runtime\rtl::toStr($ch . \Runtime\rtl::toStr($ch2));
				}
				$x = static::nextX($parser, $ch2, $x);
				$y = static::nextY($parser, $ch2, $y);
				$pos = $pos + 1;
			}
			else
			{
				$value_str .= \Runtime\rtl::toStr($ch);
				$x = static::nextX($parser, $ch, $x);
				$y = static::nextY($parser, $ch, $y);
				$pos = $pos + 1;
			}
			if ($pos >= $content_sz)
			{
				throw new \BayLang\Exceptions\ParserExpected("End of string", new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos])), $parser->file_name);
			}
			$ch = \Runtime\rs::charAt($content->ref, $pos);
		}
		/* Read end string char */
		if ($ch != "'" && $ch != "\"")
		{
			throw new \BayLang\Exceptions\ParserExpected("End of string", new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos])), $parser->file_name);
		}
		$x = static::nextX($parser, $ch, $x);
		$y = static::nextY($parser, $ch, $y);
		$pos = $pos + 1;
		/* Return result */
		$caret_end = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
		return \Runtime\Vector::from([$parser->copy(\Runtime\Map::from(["caret"=>$caret_end])),new \BayLang\OpCodes\OpString(\Runtime\Map::from(["value"=>$value_str,"caret_start"=>$caret_start,"caret_end"=>$caret_end]))]);
	}
	/**
	 * Read comment
	 */
	static function readComment($parser)
	{
		$start = $parser;
		$token = null;
		$look = null;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], false);
		$res = \BayLang\LangBay\ParserBayBase::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$parser = \Runtime\rtl::setAttr($parser, ["skip_comments"], true);
		if ($token->content == "/")
		{
			$parser = $look;
			$content = $look->content;
			$content_sz = $look->content_sz;
			$pos = $look->caret->pos;
			$x = $look->caret->x;
			$y = $look->caret->y;
			$pos_start = $pos;
			$ch = \Runtime\rs::charAt($content->ref, $pos);
			$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
			while (!static::isCommentClose($parser, $ch2) && $pos < $content_sz)
			{
				$x = static::nextX($parser, $ch, $x);
				$y = static::nextY($parser, $ch, $y);
				$pos = $pos + 1;
				if ($pos >= $parser->content_sz)
				{
					break;
				}
				$ch = \Runtime\rs::charAt($content->ref, $pos);
				$ch2 = \Runtime\rs::substr($content->ref, $pos, 2);
			}
			$pos_end = $pos;
			if (static::isCommentClose($parser, $ch2))
			{
				$x = $x + 2;
				$pos = $pos + 2;
			}
			else
			{
				throw new \BayLang\Exceptions\ParserExpected("End of comment", new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos])), $start->file_name);
			}
			/* Return result */
			$value_str = \Runtime\rs::substr($content->ref, $pos_start + 1, $pos_end - $pos_start - 1);
			$caret_end = new \BayLang\Caret(\Runtime\Map::from(["x"=>$x,"y"=>$y,"pos"=>$pos]));
			return \Runtime\Vector::from([$start->copy(\Runtime\Map::from(["caret"=>$caret_end])),new \BayLang\OpCodes\OpComment(\Runtime\Map::from(["value"=>$value_str,"caret_start"=>$caret_start,"caret_end"=>$caret_end]))]);
		}
		return \Runtime\Vector::from([$parser,null]);
	}
	/**
	 * Read identifier
	 */
	static function readIdentifier($parser, $find_ident=false)
	{
		$start = $parser;
		$token = null;
		$look = null;
		$name = "";
		$res = \BayLang\LangBay\ParserBayBase::readToken($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "")
		{
			throw new \BayLang\Exceptions\ParserExpected("Identifier", $token->caret_start, $parser->file_name);
		}
		if (!static::isIdentifier($token->content))
		{
			throw new \BayLang\Exceptions\ParserExpected("Identifier", $token->caret_start, $parser->file_name);
		}
		if (static::isReserved($token->content))
		{
			throw new \BayLang\Exceptions\ParserExpected("Identifier " . \Runtime\rtl::toStr($token->content) . \Runtime\rtl::toStr(" is reserverd"), $token->caret_start, $parser->file_name);
		}
		$name = $token->content;
		$kind = static::findIdentifier($parser, $name, $token->caret_start);
		if ($parser->find_ident && $find_ident && $kind == "")
		{
			throw new \BayLang\Exceptions\ParserError("Unknown identifier '" . \Runtime\rtl::toStr($name) . \Runtime\rtl::toStr("'"), $token->caret_start, $parser->file_name);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["kind"=>$kind,"value"=>$name,"caret_start"=>$token->caret_start,"caret_end"=>$token->caret_end]))]);
	}
	/**
	 * Read entity name
	 */
	static function readEntityName($parser, $find_ident=true)
	{
		$look = null;
		$token = null;
		$ident = null;
		$names = new \Runtime\Vector();
		$res = $parser->parser_base::readIdentifier($parser, $find_ident);
		$parser = \Runtime\rtl::attr($res, 0);
		$ident = \Runtime\rtl::attr($res, 1);
		$caret_start = $ident->caret_start;
		$name = $ident->value;
		$names->push($name);
		$res = $parser->parser_base::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content == ".")
		{
			$res = $parser->parser_base::matchToken($parser, ".");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_base::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$ident = \Runtime\rtl::attr($res, 1);
			$name = $ident->value;
			$names->push($name);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpEntityName(\Runtime\Map::from(["caret_start"=>$caret_start,"caret_end"=>$parser->caret,"names"=>$names]))]);
	}
	/**
	 * Read type identifier
	 */
	static function readTypeIdentifier($parser, $find_ident=true)
	{
		$start = $parser;
		$look = null;
		$token = null;
		$op_code = null;
		$entity_name = null;
		$template = null;
		$res = static::readEntityName($parser, $find_ident);
		$parser = \Runtime\rtl::attr($res, 0);
		$entity_name = \Runtime\rtl::attr($res, 1);
		$caret_start = $entity_name->caret_start;
		$flag_open_caret = false;
		$flag_end_caret = false;
		$res = static::lookToken($parser, "<");
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$flag_open_caret = \Runtime\rtl::attr($res, 2);
		if ($flag_open_caret)
		{
			$template = new \Runtime\Vector();
			$res = static::matchToken($parser, "<");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = static::lookToken($parser, ">");
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$flag_end_caret = \Runtime\rtl::attr($res, 2);
			while (!$token->eof && !$flag_end_caret)
			{
				$parser_value = null;
				$res = static::readTypeIdentifier($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$parser_value = \Runtime\rtl::attr($res, 1);
				$template->push($parser_value);
				$res = static::lookToken($parser, ">");
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				$flag_end_caret = \Runtime\rtl::attr($res, 2);
				if (!$flag_end_caret)
				{
					$res = static::matchToken($parser, ",");
					$parser = \Runtime\rtl::attr($res, 0);
					$res = static::lookToken($parser, ">");
					$look = \Runtime\rtl::attr($res, 0);
					$token = \Runtime\rtl::attr($res, 1);
					$flag_end_caret = \Runtime\rtl::attr($res, 2);
				}
			}
			$res = static::matchToken($parser, ">");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpTypeIdentifier(\Runtime\Map::from(["entity_name"=>$entity_name,"template"=>$template,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read collection
	 */
	static function readCollection($parser)
	{
		$start = $parser;
		$look = null;
		$token = null;
		$values = new \Runtime\Vector();
		$ifdef_condition = null;
		$flag_ifdef = false;
		$res = static::matchToken($parser, "[");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content != "]")
		{
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "#ifdef")
			{
				$parser = $look;
				$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], false);
				$res = $parser->parser_expression::readExpression($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$ifdef_condition = \Runtime\rtl::attr($res, 1);
				$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], true);
				$res = $parser->parser_base::matchToken($parser, "then");
				$parser = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				$flag_ifdef = true;
			}
			$parser_value = null;
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$parser_value = \Runtime\rtl::attr($res, 1);
			$res = static::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == ",")
			{
				$parser = $look;
				$res = static::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
			}
			if ($flag_ifdef)
			{
				$parser_value = new \BayLang\OpCodes\OpPreprocessorIfDef(\Runtime\Map::from(["items"=>$parser_value,"condition"=>$ifdef_condition]));
			}
			$values->push($parser_value);
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "#endif")
			{
				$parser = $look;
				$flag_ifdef = false;
				$ifdef_condition = null;
			}
			$res = static::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		$res = static::matchToken($parser, "]");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpCollection(\Runtime\Map::from(["values"=>$values,"caret_start"=>$caret_start,"caret_end"=>$token->caret_end]))]);
	}
	/**
	 * Read collection
	 */
	static function readDict($parser)
	{
		$look = null;
		$token = null;
		$values = new \Runtime\Vector();
		$ifdef_condition = null;
		$flag_ifdef = false;
		$res = static::matchToken($parser, "{");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content != "}")
		{
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "#ifdef")
			{
				$parser = $look;
				$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], false);
				$res = $parser->parser_expression::readExpression($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$ifdef_condition = \Runtime\rtl::attr($res, 1);
				$parser = \Runtime\rtl::setAttr($parser, ["find_ident"], true);
				$res = $parser->parser_base::matchToken($parser, "then");
				$parser = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				$flag_ifdef = true;
			}
			$parser_value = null;
			$res = static::readString($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$parser_value = \Runtime\rtl::attr($res, 1);
			$key = $parser_value->value;
			$res = static::matchToken($parser, ":");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$parser_value = \Runtime\rtl::attr($res, 1);
			$res = static::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == ",")
			{
				$parser = $look;
			}
			$values->push(new \BayLang\OpCodes\OpDictPair(\Runtime\Map::from(["key"=>$key,"value"=>$parser_value,"condition"=>$ifdef_condition])));
			$res = $parser->parser_base::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == "#endif")
			{
				$parser = $look;
				$flag_ifdef = false;
				$ifdef_condition = null;
			}
			$res = static::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		$res = static::matchToken($parser, "}");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpDict(\Runtime\Map::from(["values"=>$values,"caret_start"=>$caret_start,"caret_end"=>$token->caret_end]))]);
	}
	/**
	 * Read fixed
	 */
	static function readFixed($parser)
	{
		$look = null;
		$token = null;
		$start = $parser;
		$caret_start = $parser->caret;
		$flag_negative = false;
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "")
		{
			throw new \BayLang\Exceptions\ParserExpected("Identifier", $token->caret_start, $look->file_name);
		}
		/* Read string */
		if ($token->content == "'" || $token->content == "\"")
		{
			return static::readString($parser);
		}
		/* Read Collection */
		if ($token->content == "[")
		{
			return static::readCollection($parser);
		}
		/* Read Dict */
		if ($token->content == "{")
		{
			return static::readDict($parser);
		}
		/* Negative number */
		if ($token->content == "-")
		{
			$flag_negative = true;
			$parser = $look;
			$res = static::readToken($look);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		/* Read Number */
		if (static::isStringOfNumbers($token->content))
		{
			return static::readNumber($parser, $flag_negative);
		}
		return static::readIdentifier($parser, true);
	}
	/**
	 * Read call args
	 */
	static function readCallArgs($parser)
	{
		$look = null;
		$token = null;
		$items = new \Runtime\Vector();
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "{")
		{
			$res = static::readDict($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$d = \Runtime\rtl::attr($res, 1);
			$items = \Runtime\Vector::from([$d]);
		}
		else if ($token->content == "(")
		{
			$res = static::matchToken($parser, "(");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = static::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			while (!$token->eof && $token->content != ")")
			{
				$parser_value = null;
				$res = $parser->parser_expression::readExpression($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$parser_value = \Runtime\rtl::attr($res, 1);
				$items->push($parser_value);
				$res = static::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if ($token->content == ",")
				{
					$parser = $look;
					$res = static::readToken($parser);
					$look = \Runtime\rtl::attr($res, 0);
					$token = \Runtime\rtl::attr($res, 1);
				}
			}
			$res = static::matchToken($parser, ")");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		return \Runtime\Vector::from([$parser,$items]);
	}
	/**
	 * Read new instance
	 */
	static function readNew($parser, $match_new=true)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$caret_start = $parser->caret;
		$args = \Runtime\Vector::from([]);
		if ($match_new)
		{
			$res = static::matchToken($parser, "new");
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			$caret_start = $token->caret_start;
		}
		$res = static::readTypeIdentifier($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$res = static::readToken($parser);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "(" || $token->content == "{")
		{
			$res = static::readCallArgs($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$args = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpNew(\Runtime\Map::from(["args"=>$args,"value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read method
	 */
	static function readMethod($parser, $match=true)
	{
		$look = null;
		$token = null;
		$parser_value = null;
		$op_code = null;
		$value1 = "";
		$value2 = "";
		$kind = "";
		$caret_start = $parser->caret;
		if ($match)
		{
			$res = static::matchToken($parser, "method");
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
		}
		$save = $parser;
		/* Read static method */
		try
		{
			
			$res = static::readIdentifier($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			$res = static::matchToken($parser, "::");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = static::readToken($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_VARIABLE)
			{
				$kind = \BayLang\OpCodes\OpMethod::KIND_STATIC;
			}
			else
			{
				$kind = \BayLang\OpCodes\OpMethod::KIND_CLASS;
			}
			$value1 = $op_code;
			$value2 = $token->content;
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserError)
			{
				$e = $_ex;
			}
			else
			{
				throw $_ex;
			}
		}
		/* Read instance method */
		if ($kind == "")
		{
			$parser = $save;
			try
			{
				
				$res = static::readIdentifier($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_code = \Runtime\rtl::attr($res, 1);
				$res = static::matchToken($parser, ".");
				$parser = \Runtime\rtl::attr($res, 0);
				$res = static::readToken($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				$kind = \BayLang\OpCodes\OpMethod::KIND_ATTR;
				$value1 = $op_code;
				$value2 = $token->content;
			}
			catch (\Exception $_ex)
			{
				if ($_ex instanceof \BayLang\Exceptions\ParserError)
				{
					$e = $_ex;
				}
				else
				{
					throw $_ex;
				}
			}
		}
		/* Error */
		if ($kind == "")
		{
			throw new \BayLang\Exceptions\ParserExpected("'.' or '::'", $parser->caret, $parser->file_name);
		}
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpMethod(\Runtime\Map::from(["value1"=>$value1,"value2"=>$value2,"kind"=>$kind,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read curry
	 */
	static function readCurry($parser)
	{
		$look = null;
		$token = null;
		$obj = null;
		$args = new \Runtime\Vector();
		$res = static::matchToken($parser, "curry");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$res = static::readDynamic($parser, 14);
		$parser = \Runtime\rtl::attr($res, 0);
		$obj = \Runtime\rtl::attr($res, 1);
		$res = static::matchToken($parser, "(");
		$parser = \Runtime\rtl::attr($res, 0);
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		while (!$token->eof && $token->content != ")")
		{
			$arg = null;
			if ($token->content == "?")
			{
				$pos = 0;
				$parser = $look;
				$res = static::readToken($look);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if (static::isStringOfNumbers($token->content))
				{
					$pos = \Runtime\rtl::to($token->content, ["e"=>"int"]);
					$parser = $look;
				}
				$arg = new \BayLang\OpCodes\OpCurryArg(\Runtime\Map::from(["pos"=>$pos]));
				$args->push($arg);
			}
			else
			{
				$res = $parser->parser_expression::readExpression($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$arg = \Runtime\rtl::attr($res, 1);
				$args->push($arg);
			}
			$res = static::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($token->content == ",")
			{
				$parser = $look;
				$res = static::readToken($parser);
				$look = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
			}
		}
		$res = static::matchToken($parser, ")");
		$parser = \Runtime\rtl::attr($res, 0);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpCurry(\Runtime\Map::from(["obj"=>$obj,"args"=>$args]))]);
	}
	/**
	 * Read base item
	 */
	static function readBaseItem($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $look->caret;
		if ($token->content == "new")
		{
			$res = static::readNew($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		else if ($token->content == "method")
		{
			$res = static::readMethod($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		else if ($token->content == "classof")
		{
			$res = static::readClassOf($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		else if ($token->content == "classref")
		{
			$res = static::readClassRef($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		else if ($token->content == "(")
		{
			$save_parser = $parser;
			$parser = $look;
			/* Try to read OpTypeConvert */
			try
			{
				
				$res = static::readTypeIdentifier($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$op_type = \Runtime\rtl::attr($res, 1);
				$res = static::readToken($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$token = \Runtime\rtl::attr($res, 1);
				if ($token->content == ")")
				{
					$res = static::readDynamic($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$op_code = \Runtime\rtl::attr($res, 1);
					return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpTypeConvert(\Runtime\Map::from(["pattern"=>$op_type,"value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
				}
			}
			catch (\Exception $_ex)
			{
				if ($_ex instanceof \BayLang\Exceptions\ParserError)
				{
					$e = $_ex;
				}
				else
				{
					throw $_ex;
				}
			}
			/* Read Expression */
			$res = static::matchToken($save_parser, "(");
			$parser = \Runtime\rtl::attr($res, 0);
			$res = $parser->parser_expression::readExpression($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
			$res = static::matchToken($parser, ")");
			$parser = \Runtime\rtl::attr($res, 0);
		}
		else
		{
			$res = static::readFixed($parser);
			$parser = \Runtime\rtl::attr($res, 0);
			$op_code = \Runtime\rtl::attr($res, 1);
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/**
	 * Read classof
	 */
	static function readClassOf($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$res = static::matchToken($parser, "classof");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = static::readEntityName($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpClassOf(\Runtime\Map::from(["entity_name"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read classref
	 */
	static function readClassRef($parser)
	{
		$look = null;
		$token = null;
		$op_code = null;
		$res = static::matchToken($parser, "classref");
		$parser = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		$caret_start = $token->caret_start;
		$res = $parser->parser_expression::readExpression($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		return \Runtime\Vector::from([$parser,new \BayLang\OpCodes\OpClassRef(\Runtime\Map::from(["value"=>$op_code,"caret_start"=>$caret_start,"caret_end"=>$parser->caret]))]);
	}
	/**
	 * Read dynamic
	 */
	static function readDynamic($parser, $dynamic_flags=-1)
	{
		$look = null;
		$token = null;
		$parser_items = null;
		$op_code = null;
		$op_code_first = null;
		$is_await = false;
		$is_context_call = true;
		$caret_start = null;
		/* Dynamic flags */
		$flag_call = 1;
		$flag_attr = 2;
		$flag_static = 4;
		$flag_dynamic = 8;
		$f_next = function ($s) use (&$dynamic_flags)
		{
			if (($dynamic_flags & 1) == 1)
			{
				if ($s == "{" || $s == "(" || $s == "@")
				{
					return true;
				}
			}
			if (($dynamic_flags & 2) == 2)
			{
				if ($s == ".")
				{
					return true;
				}
			}
			if (($dynamic_flags & 4) == 4)
			{
				if ($s == "::")
				{
					return true;
				}
			}
			if (($dynamic_flags & 8) == 8)
			{
				if ($s == "[")
				{
					return true;
				}
			}
			return false;
		};
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "await")
		{
			$caret_start = $token->caret_start;
			$is_await = true;
			$parser = $look;
		}
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($token->content == "@")
		{
			$res = static::readToken($look);
			$look2 = \Runtime\rtl::attr($res, 0);
			$token2 = \Runtime\rtl::attr($res, 1);
			if (!$f_next($token2->content))
			{
				if (static::isIdentifier($token2->content))
				{
					$parser = $look;
					$is_context_call = false;
				}
			}
		}
		$res = static::readBaseItem($parser);
		$parser = \Runtime\rtl::attr($res, 0);
		$op_code = \Runtime\rtl::attr($res, 1);
		$op_code_first = $op_code;
		if ($caret_start == null)
		{
			$caret_start = $op_code->caret_start;
		}
		if ($op_code instanceof \BayLang\OpCodes\OpIdentifier && ($op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_CONTEXT || $op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_SYS_FUNCTION))
		{
			$is_context_call = false;
		}
		$res = static::readToken($parser);
		$look = \Runtime\rtl::attr($res, 0);
		$token = \Runtime\rtl::attr($res, 1);
		if ($f_next($token->content))
		{
			if ($op_code instanceof \BayLang\OpCodes\OpIdentifier)
			{
				if ($parser->find_ident && $op_code->kind != \BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE && $op_code->kind != \BayLang\OpCodes\OpIdentifier::KIND_SYS_FUNCTION && $op_code->kind != \BayLang\OpCodes\OpIdentifier::KIND_VARIABLE && $op_code->kind != \BayLang\OpCodes\OpIdentifier::KIND_CLASS && $op_code->kind != \BayLang\OpCodes\OpIdentifier::KIND_CLASSREF && $op_code->kind != \BayLang\OpCodes\OpIdentifier::KIND_CONTEXT)
				{
					throw new \BayLang\Exceptions\ParserExpected("Module or variable '" . \Runtime\rtl::toStr($op_code->value) . \Runtime\rtl::toStr("'"), $op_code->caret_start, $parser->file_name);
				}
			}
			else if ($op_code instanceof \BayLang\OpCodes\OpNew || $op_code instanceof \BayLang\OpCodes\OpCollection || $op_code instanceof \BayLang\OpCodes\OpDict)
			{
			}
			else
			{
				throw new \BayLang\Exceptions\ParserExpected("Module or variable", $op_code->caret_start, $parser->file_name);
			}
		}
		/* If is pipe */
		if ($parser->is_pipe && $op_code instanceof \BayLang\OpCodes\OpIdentifier)
		{
			$op_code = new \BayLang\OpCodes\OpAttr(\Runtime\Map::from(["kind"=>$parser->pipe_kind,"obj"=>new \BayLang\OpCodes\OpIdentifier(\Runtime\Map::from(["kind"=>\BayLang\OpCodes\OpIdentifier::KIND_PIPE,"caret_start"=>$op_code->caret_start,"caret_end"=>$op_code->caret_end])),"value"=>$op_code,"caret_start"=>$op_code->caret_start,"caret_end"=>$op_code->caret_end]));
		}
		while (!$token->eof && $f_next($token->content))
		{
			$token_content = $token->content;
			/* Static call */
			if ($token_content == "(" || $token_content == "{" || $token_content == "@")
			{
				if (($dynamic_flags & $flag_call) != $flag_call)
				{
					throw new \BayLang\Exceptions\ParserError("Call are not allowed", $token->caret_start, $parser->file_name);
				}
				if ($token_content == "@")
				{
					$parser = $look;
					$is_context_call = false;
				}
				$res = static::readCallArgs($parser);
				$parser = \Runtime\rtl::attr($res, 0);
				$parser_items = \Runtime\rtl::attr($res, 1);
				$op_code = new \BayLang\OpCodes\OpCall(\Runtime\Map::from(["obj"=>$op_code,"args"=>$parser_items,"caret_start"=>$caret_start,"caret_end"=>$parser->caret,"is_await"=>$is_await,"is_context"=>$is_context_call]));
				$is_context_call = true;
			}
			else if ($token_content == "." || $token_content == "::" || $token_content == "[")
			{
				$kind = "";
				$look_values = null;
				$look_value = null;
				$parser = $look;
				$is_context_call = true;
				if ($token_content == ".")
				{
					$kind = \BayLang\OpCodes\OpAttr::KIND_ATTR;
					if (($dynamic_flags & $flag_attr) != $flag_attr)
					{
						throw new \BayLang\Exceptions\ParserError("Attr are not allowed", $token->caret_start, $parser->file_name);
					}
				}
				else if ($token_content == "::")
				{
					$kind = \BayLang\OpCodes\OpAttr::KIND_STATIC;
					if (($dynamic_flags & $flag_static) != $flag_static)
					{
						throw new \BayLang\Exceptions\ParserError("Static attr are not allowed", $token->caret_start, $parser->file_name);
					}
				}
				else if ($token_content == "[")
				{
					$kind = \BayLang\OpCodes\OpAttr::KIND_DYNAMIC;
					if (($dynamic_flags & $flag_dynamic) != $flag_dynamic)
					{
						throw new \BayLang\Exceptions\ParserError("Dynamic attr are not allowed", $token->caret_start, $parser->file_name);
					}
				}
				if ($token_content == "[")
				{
					$res = $parser->parser_expression::readExpression($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$look_value = \Runtime\rtl::attr($res, 1);
					$res = static::readToken($parser);
					$look = \Runtime\rtl::attr($res, 0);
					$token = \Runtime\rtl::attr($res, 1);
					if ($token->content == ",")
					{
						$look_values = new \Runtime\Vector();
						$look_values->push($look_value);
					}
					while ($token->content == ",")
					{
						$parser = $look;
						$res = $parser->parser_expression::readExpression($parser);
						$parser = \Runtime\rtl::attr($res, 0);
						$look_value = \Runtime\rtl::attr($res, 1);
						$look_values->push($look_value);
						$res = static::readToken($parser);
						$look = \Runtime\rtl::attr($res, 0);
						$token = \Runtime\rtl::attr($res, 1);
					}
					$res = static::matchToken($parser, "]");
					$parser = \Runtime\rtl::attr($res, 0);
					if ($look_values != null)
					{
						$kind = \BayLang\OpCodes\OpAttr::KIND_DYNAMIC_ATTRS;
					}
				}
				else
				{
					$res = static::readToken($parser);
					$look = \Runtime\rtl::attr($res, 0);
					$token = \Runtime\rtl::attr($res, 1);
					if ($token->content == "@")
					{
						$parser = $look;
						$is_context_call = false;
					}
					$res = static::readIdentifier($parser);
					$parser = \Runtime\rtl::attr($res, 0);
					$look_value = \Runtime\rtl::attr($res, 1);
				}
				$op_code = new \BayLang\OpCodes\OpAttr(\Runtime\Map::from(["kind"=>$kind,"obj"=>$op_code,"attrs"=>($look_values != null) ? ($look_values) : (null),"value"=>($look_values == null) ? ($look_value) : (null),"caret_start"=>$caret_start,"caret_end"=>$parser->caret]));
			}
			else
			{
				throw new \BayLang\Exceptions\ParserExpected("Next attr", $token->caret_start, $parser->file_name);
			}
			$res = static::readToken($parser);
			$look = \Runtime\rtl::attr($res, 0);
			$token = \Runtime\rtl::attr($res, 1);
			if ($op_code instanceof \BayLang\OpCodes\OpAttr && $op_code->kind == \BayLang\OpCodes\OpAttr::KIND_PIPE && $token->content != "(" && $token->content != "{")
			{
				throw new \BayLang\Exceptions\ParserExpected("Call", $token->caret_start, $parser->file_name);
			}
		}
		return \Runtime\Vector::from([$parser,$op_code]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangBay";
	}
	static function getClassName()
	{
		return "BayLang.LangBay.ParserBayBase";
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