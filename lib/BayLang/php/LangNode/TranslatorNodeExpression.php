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
class TranslatorNodeExpression extends \BayLang\LangES6\TranslatorES6Expression
{
	/**
	 * OpIdentifier
	 */
	static function OpIdentifier($t, $op_code)
	{
		if ($op_code->value == "@")
		{
			return \Runtime\Vector::from([$t,"ctx"]);
		}
		if ($op_code->value == "_")
		{
			return \Runtime\Vector::from([$t,"ctx.constructor.translate"]);
		}
		if ($op_code->value == "log")
		{
			return \Runtime\Vector::from([$t,"console.log"]);
		}
		if ($t->modules->has($op_code->value) || $op_code->kind == \BayLang\OpCodes\OpIdentifier::KIND_SYS_TYPE)
		{
			$module_name = $op_code->value;
			$new_module_name = static::findModuleName($t, $module_name);
			if ($module_name != $new_module_name)
			{
				$res = $t::addSaveOpCode($t, \Runtime\Map::from(["op_code"=>$op_code,"var_content"=>static::useModuleName($t, $module_name)]));
				$t = \Runtime\rtl::attr($res, 0);
				$var_name = \Runtime\rtl::attr($res, 1);
				return \Runtime\Vector::from([$t,$var_name]);
			}
		}
		return \Runtime\Vector::from([$t,$op_code->value]);
	}
	/**
	 * OpTypeIdentifier
	 */
	static function OpTypeIdentifier($t, $op_code)
	{
		$var_name = "";
		if ($op_code->entity_name->names->count() > 0)
		{
			$module_name = $op_code->entity_name->names->first();
			$new_module_name = static::findModuleName($t, $module_name);
			if ($module_name != $new_module_name)
			{
				$res = $t::addSaveOpCode($t, \Runtime\Map::from(["var_content"=>static::useModuleName($t, $module_name)]));
				$t = \Runtime\rtl::attr($res, 0);
				$var_name = \Runtime\rtl::attr($res, 1);
			}
		}
		if ($var_name == "")
		{
			$var_name = \Runtime\rs::join(".", $op_code->entity_name->names);
		}
		return \Runtime\Vector::from([$t,$var_name]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.LangNode";
	}
	static function getClassName()
	{
		return "BayLang.LangNode.TranslatorNodeExpression";
	}
	static function getParentClassName()
	{
		return "BayLang.LangES6.TranslatorES6Expression";
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