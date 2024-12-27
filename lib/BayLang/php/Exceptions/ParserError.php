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
namespace BayLang\Exceptions;
class ParserError extends \BayLang\Exceptions\ParserUnknownError
{
	function __construct($s, $caret, $file="", $code=-1, $prev=null)
	{
		parent::__construct($s, $code, $prev);
		$this->error_line = $caret->y + 1;
		$this->error_pos = $caret->x + 1;
		$this->error_file = $file;
	}
	function buildErrorMessage()
	{
		$error_str = $this->getErrorMessage();
		$file = $this->getFileName();
		$line = $this->getErrorLine();
		$pos = $this->getErrorPos();
		if ($line != -1)
		{
			$error_str .= \Runtime\rtl::toStr(" at Ln:" . \Runtime\rtl::toStr($line) . \Runtime\rtl::toStr((($pos != "") ? (", Pos:" . \Runtime\rtl::toStr($pos)) : (""))));
		}
		if ($file != "")
		{
			$error_str .= \Runtime\rtl::toStr(" in file:'" . \Runtime\rtl::toStr($file) . \Runtime\rtl::toStr("'"));
		}
		return $error_str;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Exceptions";
	}
	static function getClassName()
	{
		return "BayLang.Exceptions.ParserError";
	}
	static function getParentClassName()
	{
		return "BayLang.Exceptions.ParserUnknownError";
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