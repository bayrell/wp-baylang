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
namespace BayLang\Constructor\Frontend\Editor\Dialog;
class SelectImageDialogModel extends \Runtime\Widget\Dialog\ConfirmDialogModel
{
	public $component;
	public $title;
	public $width;
	public $path;
	public $selected;
	public $items;
	public $context_menu;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Clear button */
		$this->buttons->addButton(\Runtime\Map::from(["content"=>"Clear","widget_name"=>"clear_button","dest"=>"cancel_button","kind"=>"before","styles"=>\Runtime\Vector::from(["danger"]),"events"=>\Runtime\Map::from(["click"=>new \Runtime\Callback($this, "onConfirmButtonClick")])]));
		/* Create ContextMenu */
		$this->context_menu = $this->addWidget("Runtime.Widget.ContextMenu.ContextMenuModel");
		$this->context_menu->addItem(\Runtime\Map::from(["label"=>"Delete","key"=>"delete"]));
		$this->context_menu->addListener("clickItem", new \Runtime\Callback($this, "onContextClickItem"));
		/* Select button */
		$confirm_button = $this->buttons->getWidget("confirm_button");
		$confirm_button->content = "Select";
	}
	/**
	 * Upload file
	 */
	function uploadFile($file)
	{
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.assets","method_name"=>"uploadFile","data"=>\Runtime\Map::from(["project_id"=>$this->parent_widget->project_id,"path"=>"images","file"=>$file])]));
		if ($result->isSuccess())
		{
			$this->loadItems();
		}
	}
	/**
	 * Load items
	 */
	function loadItems()
	{
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.assets","method_name"=>"getFiles","data"=>\Runtime\Map::from(["project_id"=>$this->parent_widget->project_id,"path"=>"images"])]));
		if ($result->isSuccess())
		{
			$this->items = $result->data->get("items");
			$this->path = $result->data->get("path");
		}
	}
	/**
	 * Load data
	 */
	function loadData($container)
	{
		$this->loadItems();
		parent::loadData($container);
	}
	/**
	 * Process frontend data
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "items", $data);
		$serializer->process($this, "path", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Context menu click
	 */
	function onContextClickItem($message)
	{
		$item = $message->item;
		$item_key = $item->get("key");
		$this->context_menu->hide();
		/* Delete item */
		if ($item_key == "delete")
		{
			$this->removeSelectedItem();
		}
	}
	/**
	 * Clear button click
	 */
	function onConfirmButtonClick($message)
	{
		if ($message->widget->widget_name == "confirm_button")
		{
			if ($this->selected == -1)
			{
				return ;
			}
		}
		else if ($message->widget->widget_name == "clear_button")
		{
			$this->value = "";
			$this->selected = -1;
		}
		parent::onConfirmButtonClick($message);
	}
	/**
	 * Select item
	 */
	function selectItem($i)
	{
		$this->selected = $i;
	}
	/**
	 * Context menu
	 */
	function contextMenu($x, $y)
	{
		$this->context_menu->show($x, $y);
	}
	/**
	 * Returns selected item
	 */
	function getSelectedItem()
	{
		return $this->items->get($this->selected);
	}
	/**
	 * Remove selected item
	 */
	function removeSelectedItem()
	{
		$item = $this->getSelectedItem();
		$result = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.assets","method_name"=>"removeFile","data"=>\Runtime\Map::from(["project_id"=>$this->parent_widget->project_id,"path"=>"images","file_name"=>$item->get("file_name")])]));
		if ($result->isSuccess())
		{
			$this->items->remove($this->selected);
			$this->selectItem(-1);
		}
	}
	/**
	 * Show dialog
	 */
	function show()
	{
		$this->selected = -1;
		$this->loadItems();
		parent::show();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog";
		$this->title = "Select image";
		$this->width = "90%";
		$this->path = "";
		$this->selected = -1;
		$this->items = \Runtime\Vector::from([]);
		$this->context_menu = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.ConfirmDialogModel";
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