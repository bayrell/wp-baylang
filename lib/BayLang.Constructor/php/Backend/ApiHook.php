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
namespace BayLang\Constructor\Backend;
class ApiHook extends \Runtime\BaseHook
{
	const GET_ASSETS_PATH="baylang.constructor::get_assets_path";
	const GET_ASSETS_URL_PATH="baylang.constructor::get_assets_url_path";
	const GET_PROJECT_LIST="baylang.constructor::get_project_list";
	const GET_PROJECT="baylang.constructor::get_project";
	const UPDATE_ASSETS="baylang.constructor::update_assets";
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::GET_ASSETS_PATH);
		$this->register(static::GET_ASSETS_URL_PATH);
		$this->register(static::GET_PROJECT);
		$this->register(static::GET_PROJECT_LIST);
	}
	/**
	 * Returns method name by hook name
	 */
	function getMethodName($hook_name)
	{
		if ($hook_name == static::GET_ASSETS_PATH)
		{
			return "get_assets_path";
		}
		if ($hook_name == static::GET_ASSETS_URL_PATH)
		{
			return "get_assets_url_path";
		}
		if ($hook_name == static::GET_PROJECT_LIST)
		{
			return "get_project_list";
		}
		if ($hook_name == static::GET_PROJECT)
		{
			return "get_project";
		}
		if ($hook_name == static::UPDATE_ASSETS)
		{
			return "update_assets";
		}
		return "";
	}
	/**
	 * Returns projects list
	 */
	static function getProjectList()
	{
		$result = \Runtime\rtl::getContext()->callHookAsync(static::GET_PROJECT_LIST);
		return $result->get("items");
	}
	/**
	 * Returns projects list
	 */
	static function getProject($project_id)
	{
		$result = \Runtime\rtl::getContext()->callHookAsync(static::GET_PROJECT, \Runtime\Map::from(["project"=>$project_id]));
		return $result->get("project");
	}
	/**
	 * Returns assets path
	 */
	static function getAssetsPath($project)
	{
		$result = \Runtime\rtl::getContext()->callHookAsync(static::GET_ASSETS_PATH, \Runtime\Map::from(["project"=>$project,"path"=>\Runtime\fs::join(\Runtime\Vector::from([$project->getPath(),"assets"]))]));
		return $result->get("path");
	}
	/**
	 * Returns project assets url path
	 */
	static function getAssetsUrlPath($project)
	{
		$result = \Runtime\rtl::getContext()->callHookAsync(static::GET_ASSETS_URL_PATH, \Runtime\Map::from(["project"=>$project,"path"=>"/assets"]));
		return $result->get("path");
	}
	/**
	 * Update assets
	 */
	static function updateAssets()
	{
		\Runtime\rtl::getContext()->callHookAsync(static::UPDATE_ASSETS);
	}
	/**
	 * Returns assets path
	 */
	function get_assets_path($params)
	{
	}
	/**
	 * Returns assets url path
	 */
	function get_assets_url_path($params)
	{
	}
	/**
	 * Returns projects list
	 */
	function get_project_list($params)
	{
		$project_folder = \Runtime\fs::join(\Runtime\Vector::from([\Runtime\rtl::getContext()->env("constructor_path"),"projects"]));
		$items = \BayLang\Helper\Project::readProjects($project_folder);
		$params->set("items", $items);
	}
	/**
	 * Returns projects
	 */
	function get_project($params)
	{
		$project_id = $params->get("project");
		$project_path = \Runtime\fs::join(\Runtime\Vector::from([\Runtime\rtl::getContext()->env("constructor_path"),"projects",$project_id]));
		$project = \BayLang\Helper\Project::readProject($project_path);
		$params->set("project", $project);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.ApiHook";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseHook";
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