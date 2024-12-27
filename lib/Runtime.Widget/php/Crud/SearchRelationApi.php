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
class SearchRelationApi extends \Runtime\Widget\Crud\SearchApi
{
	public $provider;
	public $items;
	public $page;
	public $pages;
	public $limit;
	/**
	 * Returns table name
	 */
	function getTableName()
	{
		return "";
	}
	/**
	 * Returns connection
	 */
	function getConnection()
	{
		return \Runtime\ORM\Connection::get();
	}
	/**
	 * Returns query field
	 */
	function getQueryField($table_name, $field_name)
	{
		$field = $this->provider->getFieldType($table_name, $field_name);
		if (!$field)
		{
			return null;
		}
		return new \Runtime\ORM\QueryField($table_name, $field_name);
	}
	/**
	 * Build search query
	 */
	function buildSearchQuery($q)
	{
	}
	/**
	 * Convert item
	 */
	function convertItem($fields, $item)
	{
		return $item->intersect($fields);
	}
	/**
	 * Search items
	 */
	function searchItems()
	{
		$page = $this->post_data->get("page", 0);
		$limit = $this->post_data->get("limit", 10);
		$table_name = $this->getTableName();
		/* Build query */
		$q = (new \Runtime\ORM\Query())->select()->from($table_name)->limit($limit)->page($page);
		/* Get provider */
		$this->provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		/* Add fields */
		$fields = $this->getItemFields();
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$field_name = $fields->get($i);
			$field = $this->getQueryField($table_name, $field_name);
			if ($field)
			{
				$q->addField($field);
			}
		}
		/* Set found_rows */
		$q->calcFoundRows(true);
		$found_rows = $this->post_data->get("found_rows", true);
		if ($q->_calc_found_rows && !$found_rows)
		{
			$q->calcFoundRows(false);
		}
		/* Build search query */
		$this->buildSearchQuery($q);
		/* Get query result */
		$conn = \Runtime\ORM\Connection::get();
		$this->items = $conn->fetchAll($q);
		/* Set pages */
		$this->page = $this->items->getPage();
		$this->pages = $this->items->getPages();
		$this->limit = $this->items->q->_limit;
	}
	/**
	 * Build result
	 */
	function buildResult()
	{
		if (!$this->items)
		{
			return ;
		}
		/* Convert item */
		$fields = $this->getItemFields();
		$items = $this->items->map(function ($item) use (&$fields)
		{
			return $this->convertItem($fields, $item);
		});
		/* Setup result */
		$this->result->data->set("items", $items);
		$this->result->data->set("page", $this->page);
		$this->result->data->set("pages", $this->pages);
		$this->result->data->set("limit", $this->limit);
		/* Success */
		$this->success();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->provider = null;
		$this->items = null;
		$this->page = 0;
		$this->pages = 0;
		$this->limit = 0;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Crud";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.SearchRelationApi";
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
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}