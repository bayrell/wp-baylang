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
use Runtime\DateRange;
use Runtime\DateTime;
use Runtime\Serializer\DateTimeType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Table\Filter;
use Runtime\Widget\Table\TableLoader;


class FilterModel extends \Runtime\BaseModel
{
	var $component;
	var $loader;
	var $fields;
	var $item;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->setup->add(function ($model, $rules)
		{
			$params = new \Runtime\Map();
			foreach ($model->fields as $field)
			{
				$key = $field->get("name");
				$field_type = $field->get("type");
				if ($field_type == "date") $params->set($key, new \Runtime\Serializer\DateTimeType());
				else if ($field_type == "date_range") $params->set($key, new \Runtime\Serializer\ObjectType(new \Runtime\Map(["class_name" => "Runtime.DateRange"])));
				else $params->set($key, new \Runtime\Serializer\StringType());
			}
			$rules->addType("item", new \Runtime\Serializer\MapType($params));
		});
	}
	
	
	/**
	 * Init params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		/* Init loader */
		if ($params->has("loader"))
		{
			$this->loader = $params->get("loader");
		}
		/* Init fields from params */
		if ($params->has("fields"))
		{
			$this->fields = $params->get("fields");
		}
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$this->item = $this->convert($container->layout->get("request")->query, "item");
		$this->loader->setApiParams($this->item);
	}
	
	
	/**
	 * Convert item
	 */
	function convert($data, $format)
	{
		$result = new \Runtime\Map();
		foreach ($this->fields as $field)
		{
			$key = $field->get("name");
			if (!$data->has($key)) continue;
			$value = $data->get($key);
			$field_type = $field->get("type");
			if ($field_type == "date")
			{
				if ($format == "item") $value = \Runtime\DateTime::create($value);
				else $value = $value ? $value->getDate() : "";
			}
			else if ($field_type == "date_range")
			{
				if ($format == "item")
				{
					$arr = \Runtime\rs::split(",", $value);
					$value = new \Runtime\DateRange();
					if ($arr->get(0)) $value->start_date = \Runtime\DateTime::create($arr->get(0));
					if ($arr->count() > 1 && $arr->get(1)) $value->end_date = \Runtime\DateTime::create($arr->get(1));
				}
				else
				{
					$arr = $value ? new \Runtime\Vector($value->start_date, $value->end_date) : new \Runtime\Vector();
					$value = \Runtime\rs::join(",", $arr->map(function ($value){ return $value ? $value->getDate() : ""; }));
				}
			}
			$result->set($key, $value);
		}
		return $result;
	}
	
	
	/**
	 * Get value by field name
	 */
	function getValue($name)
	{
		return $this->item->has($name) ? $this->item->get($name) : "";
	}
	
	
	/**
	 * Set value by field name
	 */
	function setValue($name, $value)
	{
		$this->item->set($name, $value);
	}
	
	
	/**
	 * Apply filter
	 */
	function applyFilter()
	{
		$document->location = \Runtime\rs::urlGetAdd($document->location, $this->convert($this->item, "query"));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Table.Filter";
		$this->loader = null;
		$this->fields = new \Runtime\Vector();
		$this->item = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.Widget.Table.FilterModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}