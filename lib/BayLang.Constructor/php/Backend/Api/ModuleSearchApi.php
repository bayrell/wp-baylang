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
namespace BayLang\Constructor\Backend\Api;
class ModuleSearchApi extends \Runtime\Widget\Crud\SearchApi
{
	public $project;
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "baylang.constructor.module::search";
	}
	/**
	 * Action search
	 */
	function actionSearch()
	{
		/* Get project */
		$project_id = \Runtime\rtl::attr($this->post_data, ["foreign_key", "project_id"]);
		$this->project = \BayLang\Constructor\Backend\ApiHook::getProject($project_id);
		if (!$this->project)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($project_id, "Project"));
		}
		/* Load modules */
		$this->project->load();
		/* Get modules */
		$items = $this->project->modules->transition(function ($item)
		{
			return $item;
		});
		/* Sort modules */
		$items = $items->sort(function ($a, $b)
		{
			return \Runtime\rs::compare($a->getName(), $b->getName());
		});
		/* Filter items */
		$items = $items->map(function ($module)
		{
			return \Runtime\Map::from(["id"=>$module->getName()]);
		});
		/* Set result */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["items"=>$items,"page"=>0,"pages"=>1])]));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->project = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Api";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Api.ModuleSearchApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.SearchApi";
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
			"actionSearch",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSearch")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}