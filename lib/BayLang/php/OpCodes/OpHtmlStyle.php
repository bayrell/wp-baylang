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
namespace BayLang\OpCodes;
class OpHtmlStyle extends \BayLang\OpCodes\BaseOpCode
{
	public $op;
	public $content;
	public $is_global;
	public $value;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		parent::serialize($serializer, $data);
		$serializer->process($this, "content", $data);
		$serializer->process($this, "is_global", $data);
		$serializer->process($this, "value", $data);
	}
	/**
	 * Read styles from content
	 */
	function readStyles()
	{
		$reader = new \BayLang\TokenReader();
		$reader->init(new \BayLang\Caret(\Runtime\Map::from(["content"=>new \Runtime\Reference($this->content)])));
		$styles = \Runtime\Map::from([]);
		while (!$reader->eof() && $reader->nextToken() == ".")
		{
			$selector = $this->readSelector($reader);
			$code = $this->readCssBlock($reader);
			$styles->set($selector, $code);
		}
		return $styles;
	}
	/**
	 * Read selector
	 */
	function readSelector($reader)
	{
		$items = \Runtime\Vector::from([]);
		while (!$reader->eof() && $reader->nextToken() != "{")
		{
			$items->push($reader->readToken());
		}
		return \Runtime\rs::join("", $items);
	}
	/**
	 * Read css block
	 */
	function readCssBlock($reader)
	{
		$reader->matchToken("{");
		$caret = $reader->main_caret;
		$caret->skipSpace();
		$level = 0;
		$items = \Runtime\Vector::from([]);
		while (!$caret->eof() && ($caret->nextChar() != "}" && $level == 0 || $level > 0))
		{
			$ch = $caret->readChar();
			if ($ch != "\t")
			{
				$items->push($ch);
			}
			if ($ch == "{")
			{
				$level = $level + 1;
			}
			if ($ch == "}")
			{
				$level = $level - 1;
			}
		}
		$reader->init($caret);
		$reader->matchToken("}");
		return \Runtime\rs::trim(\Runtime\rs::join("", $items));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op = "op_html_style";
		$this->content = "";
		$this->is_global = false;
		$this->value = null;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpHtmlStyle";
	}
	static function getParentClassName()
	{
		return "BayLang.OpCodes.BaseOpCode";
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