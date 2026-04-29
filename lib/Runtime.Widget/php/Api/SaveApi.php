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

use Runtime\Serializer\MapType;
use Runtime\Exceptions\ApiError;
use Runtime\Exceptions\AssertException;
use Runtime\Exceptions\FieldException;
use Runtime\Exceptions\ItemNotFound;
use Runtime\Exceptions\RuntimeException;
use Runtime\ORM\Connection;
use Runtime\ORM\Query;
use Runtime\ORM\QueryFilter;
use Runtime\ORM\Record;
use Runtime\ORM\Relation;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\TypeError;
use Runtime\Web\ApiRequest;
use Runtime\Web\ApiResult;
use Runtime\Web\BaseApi;
use Runtime\Widget\Api\Rules\BaseRule;
use Runtime\Widget\Api\FieldErrors;


class SaveApi extends \Runtime\Web\BaseApi
{
	var $action;
	var $connection_name;
	var $connection;
	var $relation;
	var $item;
	var $original_data;
	var $update_data;
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
		/* Create relation */
		$this->relation = new \Runtime\ORM\Relation(static::getRecordName());
	}
	
	
	/**
	 * Returns true if create
	 */
	function isCreate()
	{
		if ($this->action != "save") return false;
		$pk = $this->request->get("pk");
		return $pk == null;
	}
	
	
	/**
	 * Returns true if update
	 */
	function isUpdate()
	{
		return !$this->isCreate() && $this->action == "save";
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
	 * Returns serialize rules
	 */
	function getItemRules($rules){}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action){ return new \Runtime\Vector(); }
	
	
	/**
	 * Convert item
	 */
	function convertItem($item){ return $item; }
	
	
	/**
	 * Returns save fields
	 */
	function getSaveFields(){ return null; }
	
	
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
			\Runtime\Serializer\TypeError::addFieldErrors($errors, "pk");
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\FieldException(new \Runtime\Map([
				"error" => \Runtime\Serializer\TypeError::getMap($errors),
			])));
		}
		/* Pk is null */
		if (!$pk)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Primary key not found"));
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
	function setForeignKey($data)
	{
		$this->foreign_key = $data ? $data : new \Runtime\Map();
	}
	
	
	/**
	 * After setup data
	 */
	function checkData($errors){}
	
	
	/**
	 * Set data
	 */
	function setData($data)
	{
		if (!($data instanceof \Runtime\Map)) $data = new \Runtime\Map();
		$this->original_data = $data;
		$this->update_data = new \Runtime\Map();
		/* Get base type rule */
		$rule = new \Runtime\Serializer\MapType();
		$this->getItemRules($rule);
		if (!$rule)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Base type not found"));
		}
		/* Filter */
		$errors = new \Runtime\Vector();
		$this->update_data = $rule->filter($data, $errors, null);
		/* Rules */
		$rules = $this->rules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$item = $rules->get($i);
			$this->update_data = $item->filter($this->update_data, $errors);
		}
		/* Check data */
		$this->checkData($errors);
		/* Check error */
		if ($errors->count() > 0)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\FieldException(new \Runtime\Map([
				"fields" => \Runtime\Serializer\TypeError::getMap($errors),
			])));
		}
	}
	
	
	/**
	 * Build query
	 */
	function buildQuery($q){}
	
	
	/**
	 * Find item
	 */
	function findItem($pk)
	{
		if ($pk == null) return;
		$filter = $this->relation->getPrimaryFilter($pk);
		$q = $this->relation->select()->fields($this->getItemFields("search"))->setFilter($filter)->limit(1);
		$this->buildQuery($q);
		$this->item = $this->relation->fetchRecord($q);
	}
	
	
	/**
	 * Create item
	 */
	function createItem()
	{
		if (!$this->relation)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($this->getRelationName(), "Relation"));
		}
		$this->item = $this->relation->createRecord();
	}
	
	
	/**
	 * Find or create item
	 */
	function findOrCreate()
	{
		$this->findItem($this->primary_key);
		if (!$this->item && $this->primary_key == null) $this->createItem();
		if (!$this->item) throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound());
	}
	
	
	/**
	 * Before save
	 */
	function onSaveBefore()
	{
		$rules = $this->rules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule->onSaveBefore($this);
		}
	}
	
	
	/**
	 * After save
	 */
	function onSaveAfter()
	{
		$rules = $this->rules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule->onSaveAfter($this);
		}
	}
	
	
	/**
	 * Before delete
	 */
	function onDeleteBefore()
	{
		$rules = $this->rules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule->onDeleteBefore($this);
		}
	}
	
	
	/**
	 * After delete
	 */
	function onDeleteAfter()
	{
		$rules = $this->rules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = $rules->get($i);
			$rule->onDeleteAfter($this);
		}
	}
	
	
	/**
	 * Save item
	 */
	function save()
	{
		/* Set items */
		$save_fields = $this->getSaveFields();
		$save_data = !$save_fields ? $this->update_data->copy() : $this->update_data->intersect($save_fields);
		$this->item->assign($save_data);
		/* Save before */
		$this->onSaveBefore();
		/* Save item */
		$this->item->save();
		/* Save after */
		$this->onSaveAfter();
	}
	
	
	/**
	 * Delete item
	 */
	function delete()
	{
		$this->onDeleteBefore();
		/* Delete item */
		$this->item->delete();
		$this->onDeleteAfter();
	}
	
	
	/**
	 * Set result
	 */
	function setResult()
	{
		if ($this->action == "save")
		{
			$item = $this->item->getData();
			$item = $this->convertItem($item);
			$this->result->data->set("item", $item->intersect($this->getItemFields("convert")));
		}
	}
	
	
	/**
	 * Save form
	 */
	function actionSave()
	{
		$this->setAction("save");
		/* Filter data */
		$this->filterData();
		/* Set primary key */
		$pk = $this->request->get("pk");
		if ($pk) $this->setPrimaryKey($pk);
		/* Set foreign key */
		$this->setForeignKey($this->data->get("foreign_key"));
		/* Set data */
		$item = $this->request->get("item");
		$this->setData($item);
		/* Find item */
		$this->findOrCreate();
		/* Save item */
		$this->save();
		$this->setResult();
		$this->success();
	}
	
	
	/**
	 * Delete form
	 */
	function actionDelete()
	{
		$this->setAction("delete");
		/* Filter data */
		$this->filterData();
		/* Set primary key */
		$pk = $this->request->get("pk");
		$this->setPrimaryKey($pk);
		/* Set foreign key */
		$this->setForeignKey($this->data->get("foreign_key"));
		/* Find item */
		$this->findOrCreate();
		/* Delete item */
		$this->delete();
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
		$this->item = null;
		$this->original_data = new \Runtime\Map();
		$this->update_data = new \Runtime\Map();
		$this->primary_key = null;
		$this->foreign_key = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.Widget.Api.SaveApi"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}