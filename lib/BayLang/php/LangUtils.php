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
class LangUtils
{
	/**
	 * Parse file and convert to BaseOpCode
	 */
	static function parse($parser, $text)
	{
		$res = $parser::parse($parser, $text);
		return \Runtime\rtl::attr($res, 1);
	}
	/**
	 * Translate BaseOpCode to string
	 */
	static function translate($translator, $op_code)
	{
		$res = $translator::translate($translator, $op_code);
		return \Runtime\rtl::attr($res, 1);
	}
	/**
	 * Create translator
	 */
	static function createTranslator($lang="")
	{
		$t = null;
		if ($lang == "bay")
		{
			$t = new \BayLang\LangBay\TranslatorBay();
			$t->reset();
		}
		else if ($lang == "es6")
		{
			$t = new \BayLang\LangES6\TranslatorES6();
			$t = $t::reset($t);
		}
		else if ($lang == "nodejs")
		{
			$t = new \BayLang\LangNode\TranslatorNode();
			$t = $t::reset($t);
		}
		else if ($lang == "php")
		{
			$t = new \BayLang\LangPHP\TranslatorPHP();
			$t = $t::reset($t);
		}
		return $t;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang";
	}
	static function getClassName()
	{
		return "BayLang.LangUtils";
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