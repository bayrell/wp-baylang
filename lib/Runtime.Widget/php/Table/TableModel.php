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

use Runtime\BaseModel;
use Runtime\Message;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\VectorType;
use Runtime\Widget\Table\Table;


class TableModel extends \Runtime\BaseModel
{
	var $component;
	var $items;
	var $page;
	var $pages;
	var $item_rules;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("page", new \Runtime\Serializer\IntegerType());
		$rules->addType("pages", new \Runtime\Serializer\IntegerType());
		$rules->addType("items", new \Runtime\Serializer\VectorType($rules->params ? $rules->params->get("item_rules") : null));
		$rules->setup->add(function ($model, $rules)
		{
			$model->item_rules = $rules->params ? $rules->params->get("item_rules") : null;
		});
	}
	
	
	/**
	 * Assign rules
	 */
	function assignRules($rules)
	{
		parent::assignRules($rules);
		$this->item_rules = $rules->params->get("item_rules");
	}
	
	
	/**
	 * Init params
	 */
	function initParams($params)
	{
		parent::initParams($params);
	}
	
	
	/**
	 * Set items
	 */
	function setItems($items)
	{
		$vector = new \Runtime\Serializer\VectorType($this->item_rules);
		$this->items = $vector->filter($items, new \Runtime\Vector());
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Table.Table";
		$this->items = new \Runtime\Vector();
		$this->page = 0;
		$this->pages = 0;
		$this->item_rules = null;
	}
	static function getClassName(){ return "Runtime.Widget.Table.TableModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}