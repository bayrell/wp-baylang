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
class SearchApi extends \Runtime\Web\BaseApi
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
	 * Build result
	 */
	function buildResult($service)
	{
		if (!$service->items)
		{
			return ;
		}
		/* Convert item */
		$fields = $this->getItemFields();
		$items = $service->items->map(function ($item) use (&$service,&$fields)
		{
			return $service->convertItem($item, $fields);
		});
		/* Setup result */
		$this->result->data->set("items", $items);
		$this->result->data->set("page", $service->page);
		$this->result->data->set("pages", $service->pages);
		$this->result->data->set("limit", $service->limit);
		/* Success */
		$this->success();
	}
	/**
	 * Build item result
	 */
	function buildItemResult($service)
	{
		if (!$service->item)
		{
			return ;
		}
		/* Convert item */
		$fields = $this->getItemFields();
		$item = $service->convertItem($service->item, $fields);
		$pk = $service->getPrimaryKey($service->item);
		/* Setup result */
		$this->result->data->set("pk", $pk);
		$this->result->data->set("item", $item);
		$this->result->data->set("fields", $service->rules->getFields());
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
		$this->buildError($service);
		$this->buildItemResult($service);
	}
	/**
	 * Action search
	 */
	function actionSearch()
	{
		/* Create service */
		$service = $this->createService();
		/* Search items */
		$service->search($this->post_data);
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
		return "Runtime.Widget.Crud.SearchApi";
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