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
namespace Runtime\Widget\Crud;
class SaveApi extends \Runtime\Web\BaseApi
{
	/**
	 * Returns service
	 */
	function createService()
	{
		return null;
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Build error
	 */
	function buildError($service)
	{
		/* Check if item is exists */
		if (!$service->item)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound());
		}
		/* Validate error */
		if (!$service->rules->correct())
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Widget\Crud\FieldException());
		}
	}
	/**
	 * Build result
	 */
	function buildResult($service)
	{
		$this->result->data->set("fields", $service->rules->getFields());
		/* Check error */
		$this->buildError($service);
		/* Convert item */
		$fields = $this->getItemFields();
		$item = $service->convertItem($service->item, $fields);
		$pk = $service->getPrimaryKey($service->item);
		/* Setup result */
		$this->result->data->set("pk", $pk);
		$this->result->data->set("item", $item);
		/* Success */
		$this->success();
	}
	/**
	 * Action item
	 */
	function actionItem()
	{
		/* Create service */
		$service = $this->createService();
		/* Load item */
		$service->searchItem($this->post_data->get("pk"));
		/* Build result */
		$this->buildResult($service);
	}
	/**
	 * Action create
	 */
	function actionCreate()
	{
		$this->actionSave();
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		/* Create service */
		$service = $this->createService();
		/* Load item */
		$service->loadItem($this->post_data->get("pk"), true);
		/* Save item */
		$service->save($this->post_data->get("item"));
		/* Build result */
		$this->buildResult($service);
	}
	/**
	 * Action delete
	 */
	function actionDelete()
	{
		/* Create service */
		$service = $this->createService();
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
		return "Runtime.Widget.Crud";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.SaveApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseApi";
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