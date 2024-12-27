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
class SaveRelationApi extends \Runtime\Widget\Crud\SaveApi
{
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
	 * New item
	 */
	function newItem()
	{
		return new \Runtime\ORM\Relation($this->getTableName());
	}
	/**
	 * Find item
	 */
	function findItem($pk)
	{
		$table_name = $this->getTableName();
		/* Get query */
		$q = (new \Runtime\ORM\Query())->select()->from($table_name)->limit(1);
		/* Get provider */
		$this->provider = \Runtime\rtl::getContext()->provider("Runtime.ORM.Provider");
		/* Add fields */
		$fields = \Runtime\ORM\Relation::getPrimaryKeys($table_name);
		if (!$this->isActionDelete())
		{
			$fields = $fields->concat($this->getItemFields());
		}
		$fields = $fields->removeDuplicates();
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$field_name = $fields->get($i);
			$field = $this->getQueryField($table_name, $field_name);
			if ($field)
			{
				$q->addField($field);
			}
		}
		/* Get primary key */
		$filter = \Runtime\ORM\Relation::getPrimaryFilter($table_name, $pk);
		$q->setFilter($filter);
		/* Build query */
		$this->buildSearchQuery($q);
		/* Find relation */
		$connection = $this->getConnection();
		$item = $connection->findRelation($q);
		return $item;
	}
	/**
	 * Convert item
	 */
	function convertItem($fields, $item)
	{
		return $item->intersect($fields);
	}
	/**
	 * Set item
	 */
	function setItemValue($key, $value)
	{
		$this->item->set($key, $value);
	}
	/**
	 * Save
	 */
	function save()
	{
		$connection = $this->getConnection();
		$this->item->save($connection);
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
		/* Refresh item */
		$this->item = $this->findItem($this->item->getPrimaryKey());
		/* After save */
		$this->onSaveAfter();
	}
	/**
	 * Remove
	 */
	function remove()
	{
		$connection = $this->getConnection();
		$this->item->delete($connection);
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
		/* Convert item */
		$fields = $this->getItemFields();
		$item = $this->convertItem($fields, $this->item);
		$pk = $this->item->getPrimaryKey();
		/* Setup result */
		$this->result->data->set("pk", $pk);
		$this->result->data->set("item", $item);
		/* Success */
		$this->success();
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Crud";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Crud.SaveRelationApi";
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
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}