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
namespace BayLang\Constructor\Frontend\Editor\Styles;
class BackgroundImage extends \BayLang\Constructor\Frontend\Editor\Styles\StyleItem
{
	public $original_value;
	/**
	 * Build value
	 */
	function buildValue()
	{
		return "url(\${ static::assets(\"" . \Runtime\rtl::toStr($this->value) . \Runtime\rtl::toStr("\")})");
	}
	/**
	 * Init value
	 */
	function initValue($original_value)
	{
		$value = "";
		try
		{
			
			$reader = new \BayLang\TokenReader();
			$reader->init(new \BayLang\Caret(\Runtime\Map::from(["content"=>new \Runtime\Reference($original_value)])));
			/* Match url expression */
			$reader->matchToken("url");
			$reader->matchToken("(");
			$reader->matchToken("\$");
			$reader->matchToken("{");
			$reader->matchToken("static");
			$reader->matchToken(":");
			$reader->matchToken(":");
			$reader->matchToken("assets");
			$reader->matchToken("(");
			/* Read begin of string */
			$open_string = $reader->readToken();
			if ($open_string != "'" && $open_string != "\"")
			{
				throw new \BayLang\Exceptions\ParserUnknownError("String expected", $reader->main_caret);
			}
			/* Init caret */
			$caret = $reader->main_caret;
			/* Read string value */
			while (!$caret->eof() && !$caret->isNextString($open_string))
			{
				$ch = $caret->readChar();
				if ($ch == "\\")
				{
					$ch2 = $caret->readChar();
					if ($ch2 == "n")
					{
						$value .= \Runtime\rtl::toStr("\n");
					}
					else if ($ch2 == "r")
					{
						$value .= \Runtime\rtl::toStr("\r");
					}
					else if ($ch2 == "t")
					{
						$value .= \Runtime\rtl::toStr("\t");
					}
					else if ($ch2 == "s")
					{
						$value .= \Runtime\rtl::toStr(" ");
					}
					else if ($ch2 == "\\")
					{
						$value .= \Runtime\rtl::toStr("\\");
					}
					else if ($ch2 == "'")
					{
						$value .= \Runtime\rtl::toStr("'");
					}
					else if ($ch2 == "\"")
					{
						$value .= \Runtime\rtl::toStr("\"");
					}
					else
					{
						$value .= \Runtime\rtl::toStr($ch . \Runtime\rtl::toStr($ch2));
					}
				}
				else
				{
					$value .= \Runtime\rtl::toStr($ch);
				}
			}
			/* Restore caret */
			$reader->init($caret);
			/* Match end of expression */
			$reader->matchToken($open_string);
			$reader->matchToken(")");
			$reader->matchToken("}");
			$reader->matchToken(")");
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
			{
				$e = $_ex;
			}
			else
			{
				throw $_ex;
			}
		}
		$this->original_value = $original_value;
		$this->value = $value;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->original_value = "";
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.BackgroundImage";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Styles.StyleItem";
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