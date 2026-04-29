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
namespace Runtime\Widget\Api;

use Runtime\Exceptions\ApiError;
use Runtime\Exceptions\FieldException;
use Runtime\Exceptions\ItemNotFound;
use Runtime\Exceptions\RuntimeException;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\ORM\Connection;
use Runtime\ORM\Query;
use Runtime\ORM\QueryField;
use Runtime\ORM\QueryResult;
use Runtime\ORM\Record;
use Runtime\ORM\Relation;
use Runtime\Web\ApiRequest;
use Runtime\Web\ApiResult;
use Runtime\Web\BaseApi;
use Runtime\Widget\Api\Rules\BaseRule;


class SearchApi extends \Runtime\Web\BaseApi
{
	var $action;
	var $connection_name;
	var $connection;
	var $relation;
	var $items;
	var $primary_key;
	var $foreign_key;
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return ""; }
	
	
	/**
	 * Constructor
	 */
	function __construct($params = null)
	{
		parent::__construct($params);
		$this->relation = new \Runtime\ORM\Relation(static::getRecordName());
	}
	
	
	/**
	 * Returns save rules
	 */
	function rules(){ return new \Runtime\Vector(); }
	
	
	/**
	 * Returns serialize rules for pk
	 */
	function getPrimaryRules(){ return $this->relation->getPrimaryRules(); }
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action){ return new \Runtime\Vector(); }
	
	
	/**
	 * Convert item
	 */
	function convertItem($item){ return $item; }
	
	
	/**
	 * Filter primary key
	 */
	function getPrimaryKey($pk)
	{
		$errors = new \Runtime\Vector();
		/* Get primary key rule */
		$rule = $this->getPrimaryRules();
		if (!$rule)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Primary rule not found"));
		}
		/* Filter primary key */
		$pk = $rule->filter($pk, $errors, null);
		/* Check errors */
		if ($errors->count() > 0)
		{
			TypeError::addFieldErrors($errors, "pk");
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\FieldException(TypeError::getMap($errors)));
		}
		return $pk;
	}
	
	
	/**
	 * Set primary key
	 */
	function setPrimaryKey($pk)
	{
		if (!($pk instanceof \Runtime\Map))
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Primary key not found"));
		}
		$this->primary_key = $this->getPrimaryKey($pk);
	}
	
	
	/**
	 * Set foreign key
	 */
	function setForeignKey($foreign_key)
	{
		$this->foreign_key = $foreign_key ? $foreign_key : new \Runtime\Map();
	}
	
	
	/**
	 * Returns max limit
	 */
	function getMaxLimit(){ return 100; }
	
	
	/**
	 * Returns limit
	 */
	function getLimit()
	{
		$limit = \Runtime\rtl::toInt($this->data->get("limit", 10));
		if (!\Runtime\rtl::isInteger($limit) || $limit < 0) $limit = 0;
		$max_limit = $this->getMaxLimit();
		if ($limit > $max_limit && $max_limit >= 0) $limit = $max_limit;
		return $limit;
	}
	
	
	/**
	 * Returns page
	 */
	function getPage()
	{
		$page = \Runtime\rtl::toInt($this->data->get("page", 0));
		if (!\Runtime\rtl::isInteger($page)) $page = 0;
		return $page;
	}
	
	
	/**
	 * Build query
	 */
	function buildQuery($q)
	{
		if ($this->isItem())
		{
			$q->limit(1);
		}
	}
	
	
	/**
	 * Before search
	 */
	function onSearchBefore()
	{
		$rules = $this->rules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule->onSearchBefore($this);
		}
	}
	
	
	/**
	 * After search
	 */
	function onSearchAfter()
	{
		$rules = $this->rules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule->onSearchAfter($this);
		}
	}
	
	
	/**
	 * Search items
	 */
	function search()
	{
		/* Create query */
		$q = $this->relation->select();
		$q->limit($this->getLimit());
		$q->page($this->getPage());
		$q->calcFoundRows();
		/* Build fields */
		$fields = $this->getItemFields("search")->map(function ($field) use (&$q)
		{
			if (\Runtime\rtl::isString($field))
			{
				$field = \Runtime\ORM\QueryField::fromString($field);
				if ($field->table_name == "")
				{
					$field->table_name = $q->_table_name;
				}
			}
			return $field;
		});
		$q->fields($fields);
		/* Build query */
		$this->buildQuery($q);
		/* Search before */
		$this->onSearchBefore();
		/* Search */
		$this->items = $this->relation->fetchAll($q);
		/* Search after */
		$this->onSearchAfter();
	}
	
	
	/**
	 * Set result
	 */
	function setResult()
	{
		if ($this->isSearch() && $this->items)
		{
			$this->result->data->set("items", $this->items->map(function ($data)
			{
				$data = $this->convertItem($data);
				return $data->intersect($this->getItemFields("convert"));
			}));
			$this->result->data->set("count", $this->items->getCount());
			$this->result->data->set("limit", $this->items->getLimit());
			$this->result->data->set("page", $this->items->getPage());
			$this->result->data->set("pages", $this->items->getPages());
		}
		else if ($this->isItem() && $this->items)
		{
			$data = $this->items->get(0);
			if (!$data)
			{
				throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound("Item"));
			}
			$data = $this->convertItem($data);
			$data = $data->intersect($this->getItemFields("convert"));
			$this->result->data->set("item", $data);
		}
	}
	
	
	/**
	 * Returns data rules
	 */
	function getDataRules($rules)
	{
		if ($this->action == "search")
		{
			$rules->addType("page", new \Runtime\Serializer\IntegerType(new \Runtime\Map(["default" => 0])));
			$rules->addType("limit", new \Runtime\Serializer\IntegerType(new \Runtime\Map(["default" => 10])));
		}
	}
	
	
	/**
	 * Returns action
	 */
	function isItem(){ return $this->action == "item"; }
	function isSearch(){ return $this->action == "search"; }
	
	
	/**
	 * Action search
	 */
	function actionSearch()
	{
		$this->setAction("search");
		/* Filter data */
		$this->filterData();
		/* Set foreign key */
		$this->setForeignKey($this->data->get("foreign_key"));
		/* Search */
		$this->search();
		$this->setResult();
		$this->success();
	}
	
	
	/**
	 * Action item
	 */
	function actionItem()
	{
		$this->setAction("item");
		/* Filter data */
		$this->filterData();
		/* Set foreign key */
		$this->setForeignKey($this->data->get("foreign_key"));
		/* Search */
		$this->search();
		$this->setResult();
		$this->success();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->action = "";
		$this->connection_name = "";
		$this->connection = null;
		$this->relation = null;
		$this->items = null;
		$this->primary_key = null;
		$this->foreign_key = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.Widget.Api.SearchApi"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}