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
namespace BayLang\Compiler\Commands;
class Make extends \Runtime\Console\BaseCommand
{
	/**
	 * Returns name
	 */
	static function getName()
	{
		return "make";
	}
	/**
	 * Returns description
	 */
	static function getDescription()
	{
		return "Make module";
	}
	/**
	 * Run task
	 */
	function run()
	{
		$module_name = \Runtime\rtl::attr(\Runtime\rtl::getContext()->cli_args, 2);
		$lang = \Runtime\rtl::attr(\Runtime\rtl::getContext()->cli_args, 3);
		if (\Runtime\rtl::isEmpty($module_name))
		{
			\BayLang\Compiler\Commands\Modules::showModules();
			return 0;
		}
		/* Compile module */
		$settings = \Runtime\rtl::getContext()->provider("BayLang.Compiler.SettingsProvider");
		$result = $settings->compileModule($module_name, $lang);
		if (!$result)
		{
			return static::FAIL;
		}
		return static::SUCCESS;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Compiler.Commands";
	}
	static function getClassName()
	{
		return "BayLang.Compiler.Commands.Make";
	}
	static function getParentClassName()
	{
		return "Runtime.Console.BaseCommand";
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