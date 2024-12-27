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
class ProjectSaveApi extends \Runtime\Widget\Crud\SaveApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "baylang.constructor.project::save";
	}
	/**
	 * Returns rules
	 */
	function getRules()
	{
		return \Runtime\Vector::from([new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"name"])),new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"template","check_update"=>false]))]);
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["id","name","description"]);
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from(["name","description"]);
	}
	/**
	 * New item
	 */
	function newItem()
	{
		return new \BayLang\Helper\Project(null);
	}
	/**
	 * Find item
	 */
	function findItem($pk)
	{
		$project_id = $pk->get("id");
		return \BayLang\Constructor\Backend\ApiHook::getProject($project_id);
	}
	/**
	 * Reload cache
	 */
	function reloadCache()
	{
		/* Load data */
		$this->loadItem(false);
		/* Project path */
		$project_path = $this->item->getPath();
		$cache_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,".cache"]));
		/* Remove cache */
		shell_exec("rm -rf $cache_path");
		/* Load project */
		$this->item->load();
		/* Success */
		$this->success();
	}
	/**
	 * Action item
	 */
	function actionItem()
	{
		/* Load data */
		$this->loadItem(false);
		/* Get domains */
		$domains = \Runtime\Vector::from([]);
		if ($this->item->info->has("domains"))
		{
			$domains = $this->item->info->get("domains");
		}
		/* Success */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["item"=>\Runtime\Map::from(["id"=>$this->item->getID(),"name"=>$this->item->getName(),"description"=>$this->item->getDescription(),"domains"=>$domains])])]));
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		/* Load data */
		$this->loadItem();
		$this->loadData();
		/* Set project info */
		if ($this->data->has("name"))
		{
			$this->item->setName($this->data->get("name"));
		}
		if ($this->data->has("description"))
		{
			$this->item->setDescription($this->data->get("description"));
		}
		if ($this->data->has("domains"))
		{
			$this->item->info->set("domains", $this->data->get("domains"));
		}
		/* Save project */
		$this->item->saveInfo();
		/* Success */
		$this->success();
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Api";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Api.ProjectSaveApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.SaveApi";
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
			"reloadCache",
			"actionItem",
			"actionSave",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "reloadCache")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "actionItem")
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
		return null;
	}
}