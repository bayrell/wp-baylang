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
namespace BayLang;
class Caret extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	public $file_name;
	public $content;
	public $content_sz;
	public $pos;
	public $x;
	public $y;
	public $tab_size;
	function __construct($items=null)
	{
		parent::__construct();
		if ($items)
		{
			if ($items->has("file_name"))
			{
				$this->file_name = $items->get("file_name");
			}
			if ($items->has("content"))
			{
				$this->content = $items->get("content");
			}
			if ($items->has("content_sz"))
			{
				$this->content_sz = $items->get("content_sz");
			}
			if ($items->has("content") && !$items->has("content_sz"))
			{
				$this->content_sz = \Runtime\rs::strlen($this->content->ref);
			}
			if ($items->has("tab_size"))
			{
				$this->tab_size = $items->get("tab_size");
			}
			if ($items->has("pos"))
			{
				$this->pos = $items->get("pos");
			}
			if ($items->has("x"))
			{
				$this->x = $items->get("x");
			}
			if ($items->has("y"))
			{
				$this->y = $items->get("y");
			}
		}
	}
	/**
	 * Clone
	 */
	function clone($items=null)
	{
		return new \BayLang\Caret(\Runtime\Map::from(["file_name"=>($items) ? ($items->get("file_name", $this->file_name)) : ($this->file_name),"content"=>($items) ? ($items->get("content", $this->content)) : ($this->content),"content_sz"=>($items) ? ($items->get("content_sz", $this->content_sz)) : ($this->content_sz),"tab_size"=>($items) ? ($items->get("tab_size", $this->tab_size)) : ($this->tab_size),"pos"=>($items) ? ($items->get("pos", $this->pos)) : ($this->pos),"x"=>($items) ? ($items->get("x", $this->x)) : ($this->x),"y"=>($items) ? ($items->get("y", $this->y)) : ($this->y)]));
	}
	/**
	 * Copy caret
	 */
	function copy($items=null)
	{
		return $this->clone($items);
	}
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "pos", $data);
		$serializer->process($this, "x", $data);
		$serializer->process($this, "y", $data);
	}
	/**
	 * Seek caret
	 */
	function seek($caret)
	{
		$this->pos = $caret->pos;
		$this->x = $caret->x;
		$this->y = $caret->y;
	}
	/**
	 * Returns true if eof
	 */
	function eof()
	{
		return $this->pos >= $this->content_sz;
	}
	/**
	 * Returns next X
	 */
	function nextX($ch, $direction=1)
	{
		if ($ch == "\t")
		{
			return $this->x + $this->tab_size * $direction;
		}
		if ($ch == "\n")
		{
			return 0;
		}
		return $this->x + $direction;
	}
	/**
	 * Returns next Y
	 */
	function nextY($ch, $direction=1)
	{
		if ($ch == "\n")
		{
			return $this->y + $direction;
		}
		return $this->y;
	}
	/**
	 * Returns next char
	 */
	function nextChar()
	{
		return \Runtime\rs::charAt($this->content->ref, $this->pos, 1);
	}
	/**
	 * Returns string
	 */
	function getString($start_pos, $count)
	{
		return \Runtime\rs::substr($this->content->ref, $start_pos, $count);
	}
	/**
	 * Returns next string
	 */
	function nextString($count)
	{
		return \Runtime\rs::substr($this->content->ref, $this->pos, $count);
	}
	/**
	 * Returns true if next char
	 */
	function isNextChar($ch)
	{
		return $this->nextChar() == $ch;
	}
	/**
	 * Returns true if next string
	 */
	function isNextString($s)
	{
		return $this->nextString(\Runtime\rs::strlen($s)) == $s;
	}
	/**
	 * Shift by char
	 */
	function shift($ch)
	{
		$this->x = $this->nextX($ch);
		$this->y = $this->nextY($ch);
		$this->pos = $this->pos + 1;
	}
	/**
	 * Read char
	 */
	function readChar()
	{
		$ch = \Runtime\rs::charAt($this->content->ref, $this->pos);
		$this->shift($ch);
		return $ch;
	}
	/**
	 * Read char
	 */
	function readString($count)
	{
		$s = $this->nextString($count);
		$count = \Runtime\rs::strlen($s);
		for ($i = 0; $i < $count; $i++)
		{
			$ch = \Runtime\rs::charAt($s, $i);
			$this->shift($ch);
		}
		return $s;
	}
	/**
	 * Match char
	 */
	function matchChar($ch)
	{
		$next = $this->nextChar();
		if ($next != $ch)
		{
			throw new \BayLang\Exceptions\ParserExpected($ch, $this, $this->file_name);
		}
		$this->readChar();
	}
	/**
	 * Match string
	 */
	function matchString($s)
	{
		$count = \Runtime\rs::strlen($s);
		$next_string = $this->nextString($count);
		if ($next_string != $s)
		{
			throw new \BayLang\Exceptions\ParserExpected($s, $this, $this->file_name);
		}
		$this->readString($count);
	}
	/**
	 * Return true if is char
	 * @param char ch
	 * @return boolean
	 */
	static function isChar($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.Caret.isChar", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\rs::indexOf("qazwsxedcrfvtgbyhnujmikolp", \Runtime\rs::lower($ch)) !== -1;
		\Runtime\rtl::_memorizeSave("BayLang.Caret.isChar", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if is number
	 * @param char ch
	 * @return boolean
	 */
	static function isNumber($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.Caret.isNumber", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\rs::indexOf("0123456789", $ch) !== -1;
		\Runtime\rtl::_memorizeSave("BayLang.Caret.isNumber", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	static function isHexChar($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.Caret.isHexChar", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;$__memorize_value = \Runtime\rs::indexOf("0123456789abcdef", \Runtime\rs::lower($ch)) !== -1;
		\Runtime\rtl::_memorizeSave("BayLang.Caret.isHexChar", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if is string of numbers
	 * @param string s
	 * @return boolean
	 */
	static function isStringOfNumbers($s)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.Caret.isStringOfNumbers", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		$sz = \Runtime\rs::strlen($s);
		for ($i = 0; $i < $sz; $i++)
		{
			if (!static::isNumber(\Runtime\rs::charAt($s, $i)))
			{
				$__memorize_value = false;
				\Runtime\rtl::_memorizeSave("BayLang.Caret.isStringOfNumbers", func_get_args(), $__memorize_value);
				return $__memorize_value;
			}
		}
		$__memorize_value = true;
		\Runtime\rtl::_memorizeSave("BayLang.Caret.isStringOfNumbers", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Return true if char is system or space. ASCII code <= 32.
	 * @param char ch
	 * @return boolean
	 */
	static function isSkipChar($ch)
	{
		$__memorize_value = \Runtime\rtl::_memorizeValue("BayLang.Caret.isSkipChar", func_get_args());
		if ($__memorize_value != \Runtime\rtl::$_memorize_not_found) return $__memorize_value;
		if (\Runtime\rs::ord($ch) <= 32)
		{
			$__memorize_value = true;
			\Runtime\rtl::_memorizeSave("BayLang.Caret.isSkipChar", func_get_args(), $__memorize_value);
			return $__memorize_value;
		}
		$__memorize_value = false;
		\Runtime\rtl::_memorizeSave("BayLang.Caret.isSkipChar", func_get_args(), $__memorize_value);
		return $__memorize_value;
	}
	/**
	 * Skip chars
	 */
	function skipChar($ch)
	{
		if ($this->nextChar() == $ch)
		{
			$this->readChar();
			return true;
		}
		return false;
	}
	/**
	 * Skip space
	 */
	function skipSpace()
	{
		while (!$this->eof() && static::isSkipChar($this->nextChar()))
		{
			$this->readChar();
		}
	}
	/**
	 * Returns true if token char
	 */
	function isTokenChar($ch)
	{
		return \Runtime\rs::indexOf("qazwsxedcrfvtgbyhnujmikolp0123456789_", \Runtime\rs::lower($ch)) !== -1;
	}
	/**
	 * Read next token
	 */
	function readToken()
	{
		$items = \Runtime\Vector::from([]);
		$this->skipSpace();
		if ($this->eof())
		{
			return "";
		}
		if (!$this->isTokenChar($this->nextChar()))
		{
			return $this->readChar();
		}
		while (!$this->eof() && $this->isTokenChar($this->nextChar()))
		{
			$items->push($this->readChar());
		}
		return \Runtime\rs::join("", $items);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->file_name = null;
		$this->content = null;
		$this->content_sz = 0;
		$this->pos = 0;
		$this->x = 0;
		$this->y = 0;
		$this->tab_size = 4;
	}
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.Caret";
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