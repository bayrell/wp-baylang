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
class Watch extends \Runtime\Console\BaseCommand
{
	public $settings;
	/**
	 * Returns name
	 */
	static function getName()
	{
		return "watch";
	}
	/**
	 * Returns description
	 */
	static function getDescription()
	{
		return "Watch changes";
	}
	/**
	 * On change file
	 */
	function onChangeFile($changed_file_path)
	{
		try
		{
			
			if ($changed_file_path == $this->settings->project_json_path)
			{
				\Runtime\io::print("Reload project.json");
				$this->settings->reload();
				return ;
			}
			$file_info = $this->settings->compileFile($changed_file_path, "", 3);
			if (!$file_info)
			{
				return ;
			}
			$module = $file_info->get("module");
			$assets = $module->config->get("assets");
			$src_file_name = $file_info->get("src_file_name");
			if ($file_info->get("file_name") == "/module.json")
			{
				\Runtime\io::print("Reload module.json");
				$this->settings->reload();
			}
			else if ($assets->indexOf($src_file_name) >= 0)
			{
				$this->settings->updateModule($module->name);
			}
		}
		catch (\Exception $_ex)
		{
			if ($_ex instanceof \BayLang\Exceptions\ParserUnknownError)
			{
				$e = $_ex;
				\Runtime\io::print_error("Error: " + $e->toString());
			}
			else if (true)
			{
				$e = $_ex;
				\Runtime\io::print_error($e);
			}
			else
			{
				throw $_ex;
			}
		}
	}
	/**
	 * Run task
	 */
	function run()
	{
		$this->settings = \Runtime\rtl::getContext()->provider("BayLang.Compiler.SettingsProvider");
		return static::SUCCESS;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->settings = null;
	}
	static function getNamespace()
	{
		return "BayLang.Compiler.Commands";
	}
	static function getClassName()
	{
		return "BayLang.Compiler.Commands.Watch";
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