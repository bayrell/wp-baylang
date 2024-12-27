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
namespace Runtime\Widget\Table;
class TableModel extends \Runtime\Web\BaseModel
{
	public $component;
	public $widget_name;
	public $pagination_class_name;
	public $pagination_props;
	public $storage;
	public $limit;
	public $page;
	public $pages;
	public $row_selected;
	public $foreign_key;
	public $post_data;
	public $fields;
	public $items;
	public $styles;
	public $render_list;
	public $result;
	/**
	 * Create data storage
	 */
	function createDataStorage()
	{
		return null;
	}
	/**
	 * Set data storage
	 */
	function setDataStorage($storage)
	{
		$this->storage = $storage;
	}
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
		if ($params->has("foreign_key"))
		{
			$this->foreign_key = $params->get("foreign_key");
		}
		if ($params->has("post_data"))
		{
			$this->post_data = $params->get("post_data");
		}
		if ($params->has("limit"))
		{
			$this->limit = $params->get("limit");
		}
		if ($params->has("page"))
		{
			$this->page = $params->get("page");
		}
		if ($params->has("styles"))
		{
			$this->styles = $params->get("styles");
		}
		/* Setup pagination */
		if ($params->has("pagination_class_name"))
		{
			$this->pagination_class_name = $params->get("pagination_class_name");
		}
		if ($params->has("pagination_props"))
		{
			$this->pagination_props = $params->get("pagination_props");
		}
		/* Setup fields */
		if ($params->has("fields"))
		{
			$this->fields = \Runtime\Vector::from([]);
			$this->addFields($params->get("fields"));
		}
		/* Setup storage */
		if ($params->has("storage"))
		{
			$this->storage = $this->createModel($params->get("storage"));
		}
		if ($this->storage == null)
		{
			$this->storage = $this->createDataStorage($params);
		}
		/* Setup storage table */
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
		/* Render list */
		$this->render_list = $this->addWidget("Runtime.Widget.RenderListModel", \Runtime\Map::from(["widget_name"=>"render_list"]));
		/* Result */
		$this->result = $this->addWidget("Runtime.Widget.WidgetResultModel", \Runtime\Map::from(["widget_name"=>"result"]));
		/* Add layout */
		$this->layout->addComponent($this->pagination_class_name);
	}
	/**
	 * Add field
	 */
	function addField($field)
	{
		/* Create model */
		if ($field->has("model"))
		{
			$field->set("model", $this->createModel($field->get("model")));
		}
		/* Add field */
		$this->fields->append($field);
		/* Add component */
		if ($field->has("component"))
		{
			$this->layout->addComponent($field->get("component"));
		}
	}
	/**
	 * Add fields
	 */
	function addFields($fields)
	{
		for ($i = 0; $i < $fields->count(); $i++)
		{
			$this->addField($fields->get($i));
		}
	}
	/**
	 * Remove field
	 */
	function removeField($field_name)
	{
		$this->fields = $this->fields->filter(function ($field) use (&$field_name)
		{
			return $field->get("name") != $field_name;
		});
	}
	/**
	 * Returns items
	 */
	function getItems()
	{
		return $this->items;
	}
	/**
	 * Returns item by row number
	 */
	function getItemByRowNumber($row_number)
	{
		return $this->items->get($row_number);
	}
	/**
	 * Returns item value
	 */
	function getItemValue($item, $field_name)
	{
		return $item->get($field_name);
	}
	/**
	 * Returns selected item
	 */
	function getSelectedItem()
	{
		return $this->getItemByRowNumber($this->row_selected);
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "limit", $data);
		$serializer->process($this, "page", $data);
		$serializer->process($this, "pages", $data);
		$serializer->process($this, "items", $data);
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
		/* Load */
		if ($action == "search" || $action == "load" || $action == "reload")
		{
			if ($res->data->has("items"))
			{
				$this->items = $res->data->get("items");
			}
			if ($res->data->has("page"))
			{
				$this->page = $res->data->get("page");
			}
			if ($res->data->has("pages"))
			{
				$this->pages = $res->data->get("pages");
			}
			$this->result->setApiResult($res);
		}
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
		if ($this->post_data)
		{
			$post_data = $post_data->concat($this->post_data);
		}
		return $post_data;
	}
	/**
	 * Change page
	 */
	function changePage($page)
	{
		$this->page = $page;
		$this->refresh();
	}
	/**
	 * Load table data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$this->reload();
	}
	/**
	 * Reload table data
	 */
	function reload()
	{
		if (!$this->storage)
		{
			return null;
		}
		$res = $this->storage->load();
		$this->setApiResult($res, "reload");
		return $res;
	}
	/**
	 * Row click
	 */
	function onRowClick($row_number)
	{
		$this->emit(new \Runtime\Widget\Table\TableMessage(\Runtime\Map::from(["name"=>"row_click","data"=>\Runtime\Map::from(["row_number"=>$row_number])])));
	}
	/**
	 * Row button click
	 */
	function onRowButtonClick($message)
	{
		$this->emit(new \Runtime\Widget\Table\TableMessage(\Runtime\Map::from(["name"=>"row_button_click","message"=>$message])));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Table.Table";
		$this->widget_name = "table";
		$this->pagination_class_name = "Runtime.Widget.Pagination";
		$this->pagination_props = \Runtime\Map::from(["name"=>"page"]);
		$this->storage = null;
		$this->limit = 10;
		$this->page = 0;
		$this->pages = 0;
		$this->row_selected = -1;
		$this->foreign_key = null;
		$this->post_data = null;
		$this->fields = \Runtime\Vector::from([]);
		$this->items = \Runtime\Vector::from([]);
		$this->styles = \Runtime\Vector::from([]);
		$this->render_list = null;
		$this->result = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Table";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Table.TableModel";
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