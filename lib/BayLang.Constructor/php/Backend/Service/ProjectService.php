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
namespace BayLang\Constructor\Backend\Service;
class ProjectService extends \Runtime\Widget\Crud\CrudService
{
	/**
	 * Init rules
	 */
	function initRules()
	{
		$this->rules->addRules(\Runtime\Vector::from([new \Runtime\Widget\Crud\Rules\MatchRule(\Runtime\Map::from(["name"=>"id","regular"=>\Runtime\Widget\Crud\Rules\MatchRule::ALPHA_NUMERIC_DASH])),new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"id","check_update"=>false])),new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"name"]))]));
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from(["id","name","description"]);
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
	 * Convert item
	 */
	function convertItem($item, $fields)
	{
		/* Get domains */
		$domains = \Runtime\Vector::from([]);
		if ($this->item->info && $this->item->info->has("domains"))
		{
			$domains = $this->item->info->get("domains");
		}
		/* Get data */
		$data = \Runtime\Map::from(["id"=>$item->getID(),"name"=>$item->getName(),"description"=>$item->getDescription(),"domains"=>$domains]);
		return $data->intersect($fields);
	}
	/**
	 * Set item
	 */
	function setItemValue($item, $key, $value)
	{
		if ($key == "name")
		{
			$item->setName($value);
		}
		else if ($key == "description")
		{
			$item->setDescription($value);
		}
	}
	/**
	 * Save item
	 */
	function saveItem()
	{
		/* Save project */
		$this->item->saveInfo();
	}
	/**
	 * Returns modules
	 */
	function getModules()
	{
		/* Load project */
		$this->item->load();
		/* Get modules */
		$items = $this->item->modules->transition(function ($item)
		{
			return $item;
		});
		/* Sort modules */
		$items = $items->sort(function ($a, $b)
		{
			return \Runtime\rs::compare($a->getName(), $b->getName());
		});
		/* Filter items */
		return $items->map(function ($module)
		{
			return \Runtime\Map::from(["id"=>$module->getName()]);
		});
	}
	/**
	 * Reload
	 */
	function reload()
	{
		/* Project path */
		$project_path = $this->item->getPath();
		$cache_path = \Runtime\fs::join(\Runtime\Vector::from([$project_path,".cache"]));
		/* Remove cache */
		shell_exec("rm -rf $cache_path");
		/* Load project */
		$this->item->load();
		return true;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Service";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Service.ProjectService";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.CrudService";
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