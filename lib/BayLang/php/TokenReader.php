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
class TokenReader extends \Runtime\BaseObject
{
	public $main_caret;
	public $next_caret;
	public $next_token;
	/**
	 * Init token reader
	 */
	function init($caret)
	{
		$this->main_caret = $caret;
		$this->next_caret = $caret->copy();
		$this->readToken();
	}
	/**
	 * Returns eof
	 */
	function eof()
	{
		return $this->main_caret->eof();
	}
	/**
	 * Returns next token
	 */
	function nextToken()
	{
		return $this->next_token;
	}
	/**
	 * Read token
	 */
	function readToken()
	{
		$token = $this->next_token;
		$this->main_caret->seek($this->next_caret);
		$this->next_token = $this->next_caret->readToken();
		return $token;
	}
	/**
	 * Match next token
	 */
	function matchToken($ch)
	{
		if ($this->nextToken() != $ch)
		{
			throw new \BayLang\Exceptions\ParserExpected($ch, $this->main_caret, $this->main_caret->file_name);
		}
		$this->readToken();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->main_caret = null;
		$this->next_caret = null;
		$this->next_token = "";
	}
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.TokenReader";
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