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
namespace BayLang\Constructor\Console\Commands;
class BuildCache extends \Runtime\Console\BaseCommand
{
	/**
	 * Returns name
	 */
	static function getName()
	{
		return "build_cache";
	}
	/**
	 * Returns description
	 */
	static function getDescription()
	{
		return "Build cache";
	}
	/**
	 * Run task
	 */
	static function run()
	{
		$project_id = \Runtime\rtl::getContext()->cli_args->get(2);
		/* Projects list */
		if (\Runtime\rtl::getContext()->cli_args->count() <= 2)
		{
			$projects = \BayLang\Helper\Project::readProjects(\Runtime\fs::join(\Runtime\Vector::from([\Runtime\rtl::getContext()->env("constructor_path"),"projects"])));
			\Runtime\io::print("Projects:");
			for ($i = 0; $i < $projects->count(); $i++)
			{
				$project = $projects->get($i);
				\Runtime\io::print(\Runtime\io::color("yellow", $project->getID()) . \Runtime\rtl::toStr(" - ") . \Runtime\rtl::toStr($project->getName()));
			}
		}
		else
		{
			$project = \BayLang\Helper\Project::readProject(\Runtime\fs::join(\Runtime\Vector::from([\Runtime\rtl::getContext()->env("constructor_path"),"projects",$project_id])));
			if (!$project)
			{
				\Runtime\io::print_error("Project " . \Runtime\rtl::toStr($project_id) . \Runtime\rtl::toStr(" not found"));
				return static::UNKNOWN_ERROR;
			}
			\Runtime\io::print("Build project cache");
			\Runtime\io::print("Project: " . \Runtime\rtl::toStr($project->getID()));
			$project->readModules();
			$project->loadModules();
			$project->saveCache();
			\Runtime\io::print("OK");
		}
		return static::SUCCESS;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Console.Commands";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Console.Commands.BuildCache";
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