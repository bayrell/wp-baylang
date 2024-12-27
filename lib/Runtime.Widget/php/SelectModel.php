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
namespace Runtime\Widget;
class SelectModel extends \Runtime\Web\BaseModel
{
	public $component;
	public $items;
	public $foreign_key;
	public $storage;
	public $result;
	public $filter;
	public $transform;
	public $page;
	public $limit;
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("filter"))
		{
			$this->filter = $params->get("filter");
		}
		if ($params->has("foreign_key"))
		{
			$this->foreign_key = $params->get("foreign_key");
		}
		if ($params->has("transform"))
		{
			$this->transform = $params->get("transform");
		}
		/* Setup storage */
		if ($params->has("storage"))
		{
			$this->storage = $this->createModel($params->get("storage"));
		}
		if ($this->storage != null)
		{
			$this->storage->setTable($this);
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Result */
		$this->result = $this->addWidget("Runtime.Widget.WidgetResultModel", \Runtime\Map::from(["widget_name"=>"result"]));
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "items", $data);
		$serializer->process($this, "result", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Set api result
	 */
	function setApiResult($res, $action)
	{
		if ($res == null)
		{
			return ;
		}
		/* Set items */
		if ($res->data->has("items"))
		{
			$this->items = $res->data->get("items");
			if ($this->transform)
			{
				$this->items = $this->items->map($this->transform);
			}
		}
		/* Set result */
		$this->result->setApiResult($res);
	}
	/**
	 * Merge post data
	 */
	function mergePostData($post_data, $action)
	{
		if ($this->foreign_key)
		{
			$post_data->set("foreign_key", $this->foreign_key);
		}
		return $post_data;
	}
	/**
	 * Load table data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$res = $this->storage->load();
		$this->setApiResult($res, "load");
	}
	/**
	 * Returns options
	 */
	function getOptions()
	{
		return ($this->filter) ? ($this->items->filter($this->filter)) : ($this->items);
	}
	/**
	 * Returns props
	 */
	function getProps($data)
	{
		$result = \Runtime\Map::from(["options"=>$this->getOptions()]);
		return $result;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.SelectWrap";
		$this->items = \Runtime\Vector::from([]);
		$this->foreign_key = null;
		$this->storage = null;
		$this->result = null;
		$this->filter = null;
		$this->transform = null;
		$this->page = 0;
		$this->limit = -1;
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.SelectModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseModel";
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