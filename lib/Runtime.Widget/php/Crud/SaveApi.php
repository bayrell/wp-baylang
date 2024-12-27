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
	public $item;
	public $pk;
	public $data;
	public $fields;
	public $rules;
	/**
	 * Returns if item
	 */
	function isActionItem()
	{
		return $this->action == "actionItem";
	}
	/**
	 * Returns if save
	 */
	function isActionSave()
	{
		return $this->action == "actionSave";
	}
	/**
	 * Returns if delete
	 */
	function isActionDelete()
	{
		return $this->action == "actionDelete";
	}
	/**
	 * Init api
	 */
	function init()
	{
		$this->fields = new \Runtime\Widget\Crud\FieldResult();
		$this->rules = $this->getRules();
		$this->result->data->set("fields", $this->fields);
	}
	/**
	 * Returns rules
	 */
	function getRules()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * New item
	 */
	function newItem()
	{
		return null;
	}
	/**
	 * Find item
	 */
	function findItem($pk)
	{
		return null;
	}
	/**
	 * Set item
	 */
	function setItemValue($key, $value)
	{
	}
	/**
	 * Load item
	 */
	function loadItem($create_instance=true)
	{
		$pk = $this->post_data->get("pk");
		if ($pk != null && $pk instanceof \Runtime\Dict)
		{
			$this->pk = $pk;
			$this->item = $this->findItem($pk);
		}
		else
		{
			if ($create_instance)
			{
				$this->item = $this->newItem();
			}
		}
		/* Check if item is exists */
		if ($this->item == null)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound());
		}
	}
	/**
	 * Validate item
	 */
	function validateItem($data)
	{
		/* Call rules */
		$rules = $this->getRules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = \Runtime\rtl::attr($rules, $i);
			$data = $rule->validateItem($this, $data);
		}
		/* Filter data */
		$new_data = $data->intersect($this->getSaveFields());
		return $new_data;
	}
	/**
	 * Load data
	 */
	function loadData()
	{
		$item = $this->post_data->get("item");
		if ($item == null)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Post data 'item' not found"));
		}
		if (!($item instanceof \Runtime\Dict))
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Post data 'item' not found"));
		}
		/* Get data */
		$this->data = $this->validateItem($item);
		/* Check fields error */
		$this->fields->checkError();
	}
	/**
	 * Process data
	 */
	function processData()
	{
		$keys = $this->getSaveFields();
		for ($i = 0; $i < $keys->count(); $i++)
		{
			$key = $keys->get($i);
			if (!$this->data->has($key))
			{
				continue;
			}
			$value = $this->data->get($key);
			$this->setItemValue($key, $value);
		}
	}
	/**
	 * Before save
	 */
	function onSaveBefore()
	{
		$rules = $this->getRules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = \Runtime\rtl::attr($rules, $i);
			$rule->onSaveBefore($this);
		}
		/* Check fields error */
		$this->fields->checkError();
	}
	/**
	 * After save
	 */
	function onSaveAfter()
	{
		$rules = $this->getRules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = \Runtime\rtl::attr($rules, $i);
			$rule->onSaveAfter($this);
		}
	}
	/**
	 * Save
	 */
	function save()
	{
	}
	/**
	 * Save item
	 */
	function saveItem()
	{
		/* Before save */
		$this->onSaveBefore();
		/* Save item */
		$this->save();
		/* After save */
		$this->onSaveAfter();
	}
	/**
	 * Before delete
	 */
	function onDeleteBefore()
	{
		$rules = $this->getRules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = \Runtime\rtl::attr($rules, $i);
			$rule->onDeleteBefore($this);
		}
		/* Check fields error */
		$this->fields->checkError();
	}
	/**
	 * After delete
	 */
	function onDeleteAfter()
	{
		$rules = $this->getRules();
		for ($i = 0; $i < $rules->count(); $i++)
		{
			$rule = \Runtime\rtl::attr($rules, $i);
			$rule->onDeleteAfter($this);
		}
	}
	/**
	 * Remove
	 */
	function remove()
	{
	}
	/**
	 * Remove item
	 */
	function removeItem()
	{
		/* Before delete */
		$this->onDeleteBefore();
		/* Remove */
		$this->remove();
		/* Before delete */
		$this->onDeleteAfter();
	}
	/**
	 * Build result
	 */
	function buildResult()
	{
		if (!$this->item)
		{
			return ;
		}
		/* Success */
		$this->success();
	}
	/**
	 * Action item
	 */
	function actionItem()
	{
		/* Load data */
		$this->loadItem();
		/* Build result */
		$this->buildResult();
		/* Success */
		$this->success();
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		/* Load data */
		$this->loadItem();
		$this->loadData();
		/* Save item */
		$this->processData();
		$this->saveItem();
		/* Build result */
		$this->buildResult();
		/* Success */
		$this->success();
	}
	/**
	 * Action delete
	 */
	function actionDelete()
	{
		/* Remove item */
		$this->loadItem();
		$this->removeItem();
		/* Build result */
		$this->buildResult();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->item = null;
		$this->pk = null;
		$this->data = \Runtime\Map::from([]);
		$this->fields = null;
		$this->rules = \Runtime\Vector::from([]);
	}
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