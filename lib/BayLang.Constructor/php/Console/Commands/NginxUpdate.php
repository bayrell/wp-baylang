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
class NginxUpdate extends \Runtime\Console\BaseCommand
{
	/**
	 * Returns name
	 */
	static function getName()
	{
		return "nginx_update";
	}
	/**
	 * Returns description
	 */
	static function getDescription()
	{
		return "Update nginx";
	}
	/**
	 * Run task
	 */
	static function run()
	{
		$projects = \BayLang\Helper\Project::readProjects(\Runtime\fs::join(\Runtime\Vector::from([\Runtime\rtl::getContext()->env("constructor_path"),"projects"])));
		$result = \Runtime\Vector::from([]);
		for ($i = 0; $i < $projects->count(); $i++)
		{
			static::addProject($result, $projects->get($i));
		}
		/* Update nginx file */
		$content = \Runtime\rs::join("\n", $result);
		$nginx_path = \Runtime\fs::join(\Runtime\Vector::from([\Runtime\rtl::getContext()->env("constructor_path"),"nginx.conf"]));
		$is_update = static::updateLocalFile($nginx_path, $content);
		/* Restart nginx */
		if ($is_update)
		{
			static::nginxReload();
		}
		return static::SUCCESS;
	}
	/**
	 * Add project
	 */
	static function addProject($result, $project)
	{
		$project_name = $project->getID();
		$result->push("# Project " . \Runtime\rtl::toStr($project_name));
		$result->push("location /project/" . \Runtime\rtl::toStr($project_name) . \Runtime\rtl::toStr("/open/assets/ {"));
		$result->push("\talias /data/constructor/projects/" . \Runtime\rtl::toStr($project_name) . \Runtime\rtl::toStr("/src/public/assets/;"));
		$result->push("\tbreak;");
		$result->push("}");
		/* Entry points */
		$entry_points = $project->getEntryPoints();
		if ($entry_points)
		{
			for ($i = 0; $i < $entry_points->count(); $i++)
			{
				$entry_point = $entry_points->get($i);
				$url = $entry_point->get("url");
				$file = $entry_point->get("file");
				$location = "/project/" . \Runtime\rtl::toStr($project_name) . \Runtime\rtl::toStr("/open") . \Runtime\rtl::toStr($url);
				$location = \Runtime\rs::removeLastSlash($location);
				$result->push("location " . \Runtime\rtl::toStr($location) . \Runtime\rtl::toStr("/ {"));
				$result->push("\tinclude fastcgi_params;");
				$result->push("\troot /data/constructor/projects/" . \Runtime\rtl::toStr($project_name) . \Runtime\rtl::toStr("/src/public;"));
				$result->push("\tfastcgi_param SCRIPT_FILENAME \$document_root/" . \Runtime\rtl::toStr($file) . \Runtime\rtl::toStr(";"));
				$result->push("\tfastcgi_param HTTP_X_FORWARDED_PREFIX \$http_x_forwarded_prefix" . \Runtime\rtl::toStr($location) . \Runtime\rtl::toStr(";"));
				$result->push("\tbreak;");
				$result->push("}");
			}
		}
	}
	/**
	 * Update local file
	 */
	static function updateLocalFile($file_name, $new_content)
	{
		$old_content = "";
		$file_exists = \Runtime\fs::isFile($file_name);
		if ($file_exists)
		{
			$old_content = \Runtime\fs::readFile($file_name);
		}
		if ($old_content != $new_content || !$file_exists)
		{
			\Runtime\fs::saveFile($file_name, $new_content);
			return true;
		}
		return false;
	}
	/**
	 * Reload nginx
	 */
	static function nginxReload()
	{
		\Runtime\io::print("Reload nginx");
		shell_exec("sudo /usr/sbin/nginx -s reload");
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Console.Commands";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Console.Commands.NginxUpdate";
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