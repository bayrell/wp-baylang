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
class RouteCrudApi extends \Runtime\Widget\Crud\CrudApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "admin.constructor.route::crud";
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["id"]);
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Returns rules
	 */
	function getRules()
	{
		return \Runtime\Vector::from([new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"name"])),new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"url"]))]);
	}
	/**
	 * Convert item
	 */
	function convertItem($fields, $item)
	{
		return \Runtime\Map::from(["name"=>$item->get("name"),"url"=>$item->get("uri"),"model"=>$item->get("model")]);
	}
	/**
	 * Returns item primary key
	 */
	function getItemPrimaryKey($item)
	{
		return \Runtime\Map::from(["name"=>$item->get("name")]);
	}
	/**
	 * Search items
	 */
	function searchItems()
	{
		$this->page = 1;
		$this->items = \Runtime\Vector::from([]);
		$module_path = \Runtime\rtl::getContext()->env("module_path");
		$project_path = \Runtime\rtl::getContext()->env("project_path");
		$this->project = \BayLang\Helper\Project::readProject($project_path);
		if (!$this->project)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($project_path, "Project"));
		}
		/* Load project */
		$this->project->load();
		/* Add routes */
		if ($this->project->modules != null)
		{
			$modules = $this->project->modules->keys();
			for ($i = 0; $i < $modules->count(); $i++)
			{
				$module_name = $modules->get($i);
				$module = $this->project->modules->get($module_name);
				if ($module->path != $module_path)
				{
					continue;
				}
				if (!$module->routes)
				{
					continue;
				}
				$this->items->appendItems($module->routes);
			}
			$this->items = $this->items->sort();
		}
	}
	/**
	 * Find item by primary key
	 */
	function findItem($pk)
	{
		if ($pk == null)
		{
			return ;
		}
		$module_id = $pk->get("id");
		$project_id = $this->post_data->get("project_id");
		$this->project = \BayLang\Helper\Project::readProject(\Runtime\fs::join(\Runtime\Vector::from(["/data/constructor/projects",$project_id])));
		if (!$this->project)
		{
			return ;
		}
	}
	/**
	 * Create new relation
	 */
	function newRelation()
	{
		throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Method not allowed"));
	}
	/**
	 * Update item
	 */
	function updateItem($update_data)
	{
		throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Method not allowed"));
	}
	/**
	 * Action search
	 */
	function actionSearch()
	{
		parent::actionSearch();
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		parent::actionSave();
	}
	/**
	 * Action delete
	 */
	function actionDelete()
	{
		throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Method not allowed"));
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Api";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Api.RouteCrudApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.CrudApi";
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
			"actionSave",
			"actionDelete",
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
		if ($field_name == "actionSave")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "actionDelete")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}