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
class CoreParser extends \Runtime\BaseStruct
{
	public $__tab_size;
	public $__file_name;
	public $__content;
	public $__content_sz;
	public $__caret;
	public $__find_ident;
	/**
	 * Returns true if eof
	 */
	function isEof()
	{
		return $this->caret->pos >= $this->content_sz;
	}
	/**
	 * Returns caret
	 */
	function getCaret()
	{
		return $this->caret->clone(\Runtime\Map::from(["file_name"=>$this->file_name,"content"=>$this->content,"content_sz"=>$this->content_sz]));
	}
	/**
	 * Reset parser
	 */
	static function reset($parser)
	{
		return $parser->copy(\Runtime\Map::from(["caret"=>new \BayLang\Caret(\Runtime\Map::from([])),"token"=>null]));
	}
	/**
	 * Set content
	 */
	static function setContent($parser, $content)
	{
		return $parser->copy(\Runtime\Map::from(["content"=>new \Runtime\Reference($content),"content_sz"=>\Runtime\rs::strlen($content)]));
	}
	/**
	 * Parse file and convert to BaseOpCode
	 */
	static function parse($parser, $content)
	{
		$parser = static::reset($parser);
		$parser = static::setContent($parser, $content);
		while ($parser->caret->pos < $parser->content_sz)
		{
			$parser = $parser::nextToken($parser);
		}
		return $parser;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->__tab_size = 4;
		$this->__file_name = "";
		$this->__content = null;
		$this->__content_sz = 0;
		$this->__caret = null;
		$this->__find_ident = true;
	}
	function takeValue($k,$d=null)
	{
		if ($k == "tab_size")return $this->__tab_size;
		else if ($k == "file_name")return $this->__file_name;
		else if ($k == "content")return $this->__content;
		else if ($k == "content_sz")return $this->__content_sz;
		else if ($k == "caret")return $this->__caret;
		else if ($k == "find_ident")return $this->__find_ident;
	}
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.CoreParser";
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
		$a[]="tab_size";
		$a[]="file_name";
		$a[]="content";
		$a[]="content_sz";
		$a[]="caret";
		$a[]="find_ident";
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