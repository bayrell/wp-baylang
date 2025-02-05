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
class FontSaveApi extends \Runtime\Widget\Crud\SaveApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "baylang.constructor.fonts.save";
	}
	/**
	 * Returns service
	 */
	function createService()
	{
		return new \BayLang\Constructor\Backend\Service\FontService();
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["name","css","files"]);
	}
	/**
	 * Action item
	 */
	function actionItem()
	{
		/* Create service */
		$service = $this->createService();
		/* Load project */
		$service->loadProject($this->post_data->get("project_id"));
		/* Load item */
		$pk = $this->post_data->get("pk");
		$service->searchItem($pk);
		/* Build result */
		$this->buildResult($service);
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		/* Create service */
		$service = $this->createService();
		/* Load project */
		$service->loadProject($this->post_data->get("project_id"));
		/* Load item */
		$service->loadItem($this->post_data->get("pk"));
		/* Save item */
		$service->save($this->post_data->get("item"));
		/* Build result */
		$this->buildResult($service);
	}
	/**
	 * Upload file
	 */
	function uploadFile()
	{
		/* Create service */
		$service = $this->createService();
		/* Load project */
		$service->loadProject($this->post_data->get("project_id"));
		/* Load item */
		$service->loadItem($this->post_data->get("foreign_key"));
		/* Upload file */
		$service->uploadFile($this->post_data->get("file"));
		/* Build result */
		$this->success();
	}
	/**
	 * Delete file
	 */
	function deleteFile()
	{
		/* Create service */
		$service = $this->createService();
		/* Load project */
		$service->loadProject($this->post_data->get("project_id"));
		/* Load item */
		$service->loadItem($this->post_data->get("foreign_key"));
		/* Check item */
		$pk = $this->post_data->get("pk");
		if ($pk == null || !($pk instanceof \Runtime\Dict))
		{
			return $this->fail(\Runtime\Map::from(["message"=>"Item not found"]));
		}
		/* Delete file */
		$file_name = $this->post_data->get("pk")->get("name");
		$service->deleteFile($file_name);
		/* Build result */
		$this->success();
	}
	/**
	 * Action delete
	 */
	function actionDelete()
	{
		/* Create service */
		$service = $this->createService();
		/* Load project */
		$service->loadProject($this->post_data->get("project_id"));
		/* Load item */
		$service->loadItem($this->post_data->get("pk"));
		/* Delete item */
		$service->delete();
		/* Build result */
		$this->buildResult($service);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Api";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Api.FontSaveApi";
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
			"actionItem",
			"actionSave",
			"uploadFile",
			"deleteFile",
			"actionDelete",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
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
		if ($field_name == "uploadFile")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "deleteFile")
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