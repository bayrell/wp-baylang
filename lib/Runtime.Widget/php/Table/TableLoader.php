<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Widget\Table;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Table\TableModel;


class TableLoader extends \Runtime\BaseModel
{
	var $table;
	var $foreign_key;
	var $api_name;
	var $method_name;
	var $save_method_name;
	var $delete_method_name;
	var $page_name;
	var $page;
	var $limit;
	var $api_params;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("foreign_key", $rules->params ? $rules->params->get("foreign_key") : null);
		$rules->addType("page", new \Runtime\Serializer\IntegerType());
		$rules->addType("limit", new \Runtime\Serializer\IntegerType());
		$rules->addType("api_params", new \Runtime\Serializer\MapType(new \Runtime\Serializer\StringType()));
	}
	
	
	/**
	 * Init params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params->has("table")) $this->table = $params->get("table");
		if ($params->has("foreign_key")) $this->foreign_key = $params->get("foreign_key");
		if ($params->has("api_name")) $this->api_name = $params->get("api_name");
		if ($params->has("method_name")) $this->method_name = $params->get("method_name");
		if ($params->has("save_method_name")) $this->save_method_name = $params->get("save_method_name");
		if ($params->has("delete_method_name")) $this->delete_method_name = $params->get("delete_method_name");
		if ($params->has("page_name")) $this->page_name = $params->get("page_name");
		if ($params->has("page")) $this->page = $params->get("page");
		if ($params->has("limit")) $this->limit = $params->get("limit");
	}
	
	
	/**
	 * Set api params
	 */
	function setApiParams($params)
	{
		$this->api_params = $this->api_params ? $this->api_params->concat($params) : $params->copy();
	}
	
	
	/**
	 * Merge api params
	 */
	function mergeParams($data)
	{
		if (!$this->api_params) return $data;
		return $this->api_params->concat($data);
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		$page = $container->request->query->get($this->page_name, 1);
		$this->page = $page - 1;
		return $this->reload();
	}
	
	
	/**
	 * Reload
	 */
	function reload()
	{
		$api_result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => $this->api_name,
			"method_name" => $this->method_name,
			"data" => $this->mergeParams(new \Runtime\Map([
				"page" => $this->page,
				"limit" => $this->limit,
				"foreign_key" => $this->foreign_key,
			])),
		]));
		if ($api_result->isSuccess() && $api_result->data->has("items"))
		{
			$this->table->page = $api_result->data->get("page");
			$this->table->pages = $api_result->data->get("pages");
			$this->table->setItems($api_result->data->get("items"));
		}
		return $api_result;
	}
	
	
	/**
	 * Save
	 */
	function save($pk, $item)
	{
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => $this->api_name,
			"method_name" => $this->save_method_name,
			"data" => new \Runtime\Map([
				"pk" => $pk,
				"item" => $item,
				"foreign_key" => $this->foreign_key,
			]),
		]));
		return $result;
	}
	
	
	/**
	 * Delete
	 */
	function delete($pk)
	{
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => $this->api_name,
			"method_name" => $this->delete_method_name,
			"data" => new \Runtime\Map([
				"pk" => $pk,
				"foreign_key" => $this->foreign_key,
			]),
		]));
		return $result;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->table = null;
		$this->foreign_key = null;
		$this->api_name = "";
		$this->method_name = "search";
		$this->save_method_name = "save";
		$this->delete_method_name = "delete";
		$this->page_name = "page";
		$this->page = 0;
		$this->limit = 10;
		$this->api_params = null;
	}
	static function getClassName(){ return "Runtime.Widget.Table.TableLoader"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}