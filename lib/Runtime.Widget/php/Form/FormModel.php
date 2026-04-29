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
namespace Runtime\Widget\Form;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Method;
use Runtime\Message;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\ObjectType;
use Runtime\Widget\ResultModel;
use Runtime\Widget\Form\FieldErrors;
use Runtime\Widget\Form\Form;
use Runtime\Widget\Form\FormMessage;


class FormModel extends \Runtime\BaseModel
{
	var $component;
	var $data_object;
	var $pk;
	var $item;
	var $fields;
	var $field_errors;
	var $result;
	var $primary_rules;
	var $item_rules;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("pk", $rules->params ? $rules->params->get("primary_rules") : null);
		$rules->addType("item", $rules->params ? $rules->params->get("item_rules") : null);
		$rules->addType("result", new \Runtime\Serializer\ObjectType(new \Runtime\Map(["class_name" => "Runtime.Widget.ResultModel"])));
		$rules->setup->add(function ($model, $rules)
		{
			$model->primary_rules = $rules->params ? $rules->params->get("primary_rules") : null;
			$model->item_rules = $rules->params ? $rules->params->get("item_rules") : null;
		});
	}
	
	
	/**
	 * Init params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params->has("data_object")) $this->data_object = $params->get("data_object");
		if ($params->has("fields")) $this->fields = $params->get("fields");
	}
	
	
	/**
	 * Init widget
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$this->field_errors = $this->createWidget("Runtime.Widget.Form.FieldErrors", new \Runtime\Map([
			"error_name" => "fields",
		]));
		$this->result = $this->createWidget("Runtime.Widget.ResultModel");
	}
	
	
	/**
	 * Set wait message
	 */
	function setWaitMessage()
	{
		$this->result->setWaitMessage();
	}
	
	
	/**
	 * Set api result
	 */
	function setApiResult($result)
	{
		$this->result->setApiResult($result);
		$this->field_errors->setApiResult($result);
	}
	
	
	/**
	 * Returns result
	 */
	function getResult($name)
	{
		return $this->field_errors->get($name);
	}
	
	
	/**
	 * Set item value
	 */
	function setValue($name, $value)
	{
		$this->item->set($name, $value);
		$this->listener->emit(new \Runtime\Widget\Form\FormMessage(new \Runtime\Map([
			"name" => "setValue",
			"key" => $name,
			"value" => $value,
		])));
	}
	
	
	/**
	 * Set primary key
	 */
	function setPrimaryKey($item)
	{
		if ($this->primary_rules)
		{
			$primary_key = $this->primary_rules->keys();
			$this->pk = $this->primary_rules->filter($item->intersect($primary_key), new \Runtime\Vector());
		}
		else
		{
			$this->pk = null;
		}
	}
	
	
	/**
	 * Set item
	 */
	function setItem($item)
	{
		$this->item = $this->item_rules ? $this->item_rules->filter($item, new \Runtime\Vector()) : $item;
	}
	
	
	/**
	 * Clear form
	 */
	function clear()
	{
		$this->pk = null;
		$this->item = $this->data_object ? \Runtime\rtl::newInstance($this->data_object) : new \Runtime\Map();
		$this->field_errors->clear();
		$this->result->clear();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Form.Form";
		$this->data_object = "";
		$this->pk = null;
		$this->item = new \Runtime\Map();
		$this->fields = new \Runtime\Vector();
		$this->field_errors = null;
		$this->result = null;
		$this->primary_rules = null;
		$this->item_rules = null;
	}
	static function getClassName(){ return "Runtime.Widget.Form.FormModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}