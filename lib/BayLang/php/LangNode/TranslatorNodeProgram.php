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
namespace BayLang\LangNode;
class TranslatorNodeProgram extends \BayLang\LangES6\TranslatorES6Program
{
	/**
	 * Translate program
	 */
	static function translateProgramHeader($t, $op_code)
	{
		$content = "\"use strict;\"";
		$content .= \Runtime\rtl::toStr($t->s("var use = require('bay-lang').use;"));
		return \Runtime\Vector::from([$t,$content]);
	}
	/**
	 * OpDeclareClassFooter
	 */
	static function OpDeclareClassFooter($t, $op_code)
	{
		$content = "";
		$name = "";
		$content .= \Runtime\rtl::toStr("use.add(" . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(");"));
		/*
		content ~= t.s("if (module.exports == undefined) module.exports = {};");
		Collection<string> arr = rs::split(".", t.current_namespace_name);
		for (int i=0; i<arr.count(); i++)
		{
			name = name ~ ((i == 0) ? "" : ".") ~ arr.item(i);
			string s = "if (module.exports." ~ name ~ " == undefined) module.exports." ~ name ~ " = {};";
			content ~= (content == 0) ? s : t.s(s);
		}
		
		content ~= t.s("module.exports." ~
			t.current_class_full_name ~ " = " ~ t.current_class_full_name ~ ";");
		*/
		$content .= \Runtime\rtl::toStr($t->s("module.exports = " . \Runtime\rtl::toStr($t->current_class_full_name) . \Runtime\rtl::toStr(";")));
		return \Runtime\Vector::from([$t,$content]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangNode";
	}
	static function getClassName()
	{
		return "BayLang.LangNode.TranslatorNodeProgram";
	}
	static function getParentClassName()
	{
		return "BayLang.LangES6.TranslatorES6Program";
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