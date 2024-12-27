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
class Modules extends \Runtime\Console\BaseCommand
{
	/**
	 * Returns name
	 */
	static function getName()
	{
		return "modules";
	}
	/**
	 * Returns description
	 */
	static function getDescription()
	{
		return "Show modules";
	}
	/**
	 * Run task
	 */
	static function run()
	{
		$this->showModules(true);
		return static::SUCCESS;
	}
	/**
	 * Returns modules
	 */
	static function getModules()
	{
		$settings = \Runtime\rtl::getContext()->provider("BayLang.Compiler.SettingsProvider");
		return $settings->modules;
	}
	/**
	 * Show modules
	 */
	static function showModules($verbose)
	{
		$modules = $this->getModules();
		$modules_names = $modules->keys()->sort();
		for ($i = 0; $i < $modules_names->count(); $i++)
		{
			$module_name = \Runtime\rtl::attr($modules_names, $i);
			$module = \Runtime\rtl::attr($modules, $module_name);
			if ($verbose)
			{
				\Runtime\io::print($i + 1 . \Runtime\rtl::toStr(") ") . \Runtime\rtl::toStr(\Runtime\io::color("yellow", $module_name)) . \Runtime\rtl::toStr(" - ") . \Runtime\rtl::toStr($module->path));
			}
			else
			{
				\Runtime\io::print($module_name);
			}
		}
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Compiler.Commands";
	}
	static function getClassName()
	{
		return "BayLang.Compiler.Commands.Modules";
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