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
namespace BayLang\Constructor\Frontend\Code;
class CodeEditorModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $project_id;
	public $copy_past_kind;
	public $copy_past_path;
	public $confirm_dialog;
	public $prompt_dialog;
	public $tree;
	public $selected_item;
	public $selected_tab;
	public $selected_path;
	public $tabs;
	public $save_result;
	public $context_menu;
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Setup settings */
		$this->project_id = $this->layout->route->matches->get("project_id");
		/* Save result */
		$this->save_result = $this->addWidget("Runtime.Widget.WidgetResultModel", \Runtime\Map::from(["widget_name"=>"save_result"]));
		/* Confirm dialog */
		$this->confirm_dialog = $this->addWidget("Runtime.Widget.Dialog.ConfirmDialogModel", \Runtime\Map::from(["widget_name"=>"confirm_dialog","events"=>\Runtime\Map::from(["confirm"=>new \Runtime\Callback($this, "onDialogConfirm")])]));
		/* Prompt dialog */
		$this->prompt_dialog = $this->addWidget("Runtime.Widget.Dialog.PromptDialogModel", \Runtime\Map::from(["widget_name"=>"prompt_dialog","events"=>\Runtime\Map::from(["confirm"=>new \Runtime\Callback($this, "onDialogConfirm")])]));
		/* Create Tree */
		$this->tree = $this->addWidget("Runtime.Widget.Tree.TreeModel", \Runtime\Map::from(["component"=>"BayLang.Constructor.Frontend.Code.TreeWidget","dnd"=>false,"icons"=>true,"events"=>\Runtime\Map::from(["selectItem"=>new \Runtime\Callback($this, "onTreeSelectItem"),"contextMenu"=>new \Runtime\Callback($this, "onTreeContextMenu")]),"context_menu"=>\Runtime\Map::from(["items"=>\Runtime\Vector::from([\Runtime\Map::from(["label"=>"Create file","key"=>"create_file"]),\Runtime\Map::from(["label"=>"Create folder","key"=>"create_folder"]),\Runtime\Map::from(["label"=>"Rename","key"=>"rename"]),\Runtime\Map::from(["label"=>"Cut","key"=>"cut"]),\Runtime\Map::from(["label"=>"Copy","key"=>"copy"]),\Runtime\Map::from(["label"=>"Paste","key"=>"paste"]),\Runtime\Map::from(["label"=>"Delete","key"=>"delete"])]),"events"=>\Runtime\Map::from(["clickItem"=>new \Runtime\Callback($this, "onContextMenuItemClick")])])]));
		$this->tree->root = new \BayLang\Constructor\Frontend\Code\TreeItem(\Runtime\Map::from(["project_id"=>$this->project_id,"open"=>true]));
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Code editor");
	}
	/**
	 * Load data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		/* Load root */
		$this->loadItems($this->tree->root);
	}
	/**
	 * Remove tab
	 */
	function selectTab($item)
	{
		$this->selected_tab = $item;
	}
	/**
	 * Add tab
	 */
	function addTab($item)
	{
		$this->tabs->push($this->selected_item);
	}
	/**
	 * Remove tab
	 */
	function removeTab($item)
	{
		$this->tabs->removeItem($item);
		$this->save_result->clear();
		if ($this->selected_tab == $item)
		{
			$this->selected_tab = null;
		}
	}
	/**
	 * Tree context menu
	 */
	function onTreeContextMenu($message)
	{
		$item = $message->item;
		$this->tree->context_menu->items->each(function ($params) use (&$item)
		{
			$key = $params->get("key");
			/* Copy */
			if ($key == "copy" || $key == "cut" || $key == "rename" || $key == "delete")
			{
				if ($item == null)
				{
					$params->set("hidden", true);
				}
				else
				{
					$params->set("hidden", false);
				}
			}
			/* Paste */
			if ($key == "paste")
			{
				if ($this->copy_past_path == "" || $item != null && \Runtime\rs::dirname($this->copy_past_path) == $item->file_path || $item == null && \Runtime\rs::dirname($this->copy_past_path) == "")
				{
					$params->set("hidden", true);
				}
				else
				{
					$params->set("hidden", false);
				}
			}
		});
	}
	/**
	 * Context menu item click
	 */
	function onContextMenuItemClick($message)
	{
		$item_key = $message->item->get("key");
		/* Hide context menu */
		$message->widget->hide();
		/* Create file */
		if ($item_key == "create_file")
		{
			$confirm_button = $this->prompt_dialog->buttons->getWidget("confirm_button");
			$confirm_button->content = "Create";
			$this->prompt_dialog->action = "create_file";
			$this->prompt_dialog->title = "Create file";
			$this->prompt_dialog->value = "";
			$this->prompt_dialog->show();
		}
		else if ($item_key == "create_folder")
		{
			$confirm_button = $this->prompt_dialog->buttons->getWidget("confirm_button");
			$confirm_button->content = "Create";
			$this->prompt_dialog->action = "create_folder";
			$this->prompt_dialog->title = "Create folder";
			$this->prompt_dialog->value = "";
			$this->prompt_dialog->show();
		}
		else if ($item_key == "rename")
		{
			$confirm_button = $this->prompt_dialog->buttons->getWidget("confirm_button");
			$confirm_button->content = "Rename";
			$this->prompt_dialog->action = "rename";
			$this->prompt_dialog->title = "Rename item " . \Runtime\rtl::toStr($this->selected_item->label);
			$this->prompt_dialog->value = $this->selected_item->label;
			$this->prompt_dialog->show();
		}
		else if ($item_key == "remove" || $item_key == "delete")
		{
			$confirm_button = $this->confirm_dialog->buttons->getWidget("confirm_button");
			$confirm_button->content = "Remove";
			$confirm_button->styles = \Runtime\Vector::from(["danger"]);
			$this->confirm_dialog->action = "remove";
			$this->confirm_dialog->title = "Remove item " . \Runtime\rtl::toStr($this->selected_item->label);
			$this->confirm_dialog->show();
		}
		else if ($item_key == "copy" || $item_key == "cut")
		{
			$this->copy_past_path = $this->selected_item->file_path;
			$this->copy_past_kind = $item_key;
		}
		else if ($item_key == "paste")
		{
			if ($this->copy_past_path == "")
			{
				return ;
			}
			$parent_path = ($this->selected_path) ? ($this->selected_path->slice()) : (\Runtime\Vector::from([]));
			$parent_item = $this->tree->root->get($parent_path);
			/* Paste item */
			$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.code","method_name"=>"move","data"=>\Runtime\Map::from(["project_id"=>$this->project_id,"file_path"=>$this->copy_past_path,"dest_path"=>$parent_item->file_path,"kind"=>($this->copy_past_kind == "copy") ? ("copy") : ("")])]));
			/* Success */
			if ($res->isSuccess())
			{
				/* Clear path */
				$this->copy_past_path = "";
				/* Reload items */
				$parent_item->is_loaded = false;
				$this->loadItems($parent_item);
			}
		}
	}
	/**
	 * Confirm dialog
	 */
	function onDialogConfirm($message)
	{
		/* Create file */
		if ($message->widget->action == "create_file" || $message->widget->action == "create_folder")
		{
			$parent_path = ($this->selected_path) ? ($this->selected_path->slice()) : (\Runtime\Vector::from([]));
			$parent_item = $this->tree->root->get($parent_path);
			/* Create item */
			$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.code","method_name"=>"create","data"=>\Runtime\Map::from(["project_id"=>$this->project_id,"file_path"=>($this->selected_item) ? ($this->selected_item->file_path) : (""),"file_name"=>$message->value,"kind"=>($message->widget->action == "create_file") ? ("file") : ("folder")])]));
			/* Reload items */
			if ($res->isSuccess())
			{
				$parent_item->is_loaded = false;
				$this->loadItems($parent_item);
			}
		}
		else if ($message->widget->action == "rename")
		{
			$parent_path = $this->selected_path->slice(0, -1);
			$parent_item = $this->tree->root->get($parent_path);
			$this->selected_item->label = $message->value;
			/* Rename item */
			$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.code","method_name"=>"rename","data"=>\Runtime\Map::from(["project_id"=>$this->project_id,"file_path"=>$this->selected_item->file_path,"file_new_name"=>$message->value])]));
			/* Reload items */
			if ($res->isSuccess())
			{
				$parent_item->is_loaded = false;
				$this->loadItems($parent_item);
			}
		}
		else if ($message->widget->action == "remove")
		{
			$parent_path = $this->selected_path->slice(0, -1);
			$parent_item = $this->tree->root->get($parent_path);
			/* Rename item */
			$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.code","method_name"=>"remove","data"=>\Runtime\Map::from(["project_id"=>$this->project_id,"file_path"=>$this->selected_item->file_path])]));
			/* Reload items */
			if ($res->isSuccess())
			{
				$parent_item->is_loaded = false;
				$this->loadItems($parent_item);
			}
		}
	}
	/**
	 * Select item
	 */
	function onTreeSelectItem($message)
	{
		$this->selected_item = $message->item;
		$this->selected_path = ($message->path) ? ($message->path->slice()) : (null);
		if (!$this->selected_item)
		{
			return ;
		}
		if ($message->kind != "click")
		{
			return ;
		}
		if ($this->selected_item->kind == "dir")
		{
			$this->loadItems($this->selected_item);
		}
		else if ($this->selected_item->kind == "file")
		{
			if ($this->tabs->indexOf($this->selected_item) == -1)
			{
				$this->addTab($this->selected_item);
				$this->selectTab($this->selected_item);
				$this->loadFileContent($this->selected_item);
			}
			else
			{
				$this->selectTab($this->selected_item);
			}
		}
	}
	/**
	 * Save file
	 */
	function save()
	{
		if (!$this->selected_tab)
		{
			return ;
		}
		$this->save_result->setWaitMessage();
		$content = $this->selected_tab->code_editor->value()->getValue();
		$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.code","method_name"=>"saveContent","data"=>\Runtime\Map::from(["project_id"=>$this->project_id,"file_path"=>$this->selected_tab->file_path,"content"=>$content])]));
		$this->save_result->setApiResult($res);
	}
	/**
	 * Load file content
	 */
	function loadFileContent($item)
	{
		/* Clear content */
		$item->content = "";
		$item->is_loaded = true;
		/* Send request */
		$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.code","method_name"=>"getContent","data"=>\Runtime\Map::from(["project_id"=>$item->project_id,"module_id"=>$item->module_id,"file_path"=>$item->file_path])]));
		/* Check is response is success */
		if (!$res->isSuccess())
		{
			return ;
		}
		/* Set file content */
		$item->content = $res->data->get("content");
	}
	/**
	 * Load items
	 */
	function loadItems($item)
	{
		if ($item->isLoaded())
		{
			return ;
		}
		$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.code","method_name"=>"getFiles","data"=>\Runtime\Map::from(["project_id"=>$item->project_id,"module_id"=>$item->module_id,"file_path"=>$item->file_path])]));
		$item->is_loaded = true;
		if (!$res->isSuccess())
		{
			return ;
		}
		$items = $res->data->get("items");
		/* Add items */
		for ($i = 0; $i < $items->count(); $i++)
		{
			$file = $items->get($i);
			$label = $file->get("file_name");
			$pos = $item->items->find(\Runtime\lib::equalAttr("label", $label));
			/* Change item */
			if ($pos >= 0)
			{
				$find_item = $item->items->get($pos);
				$find_item->label = $file->get("file_name");
				$find_item->file_path = $file->get("file_path");
			}
			else
			{
				$item->items->push(new \BayLang\Constructor\Frontend\Code\TreeItem(\Runtime\Map::from(["kind"=>$file->get("kind"),"label"=>$file->get("file_name"),"file_path"=>$file->get("file_path"),"module_id"=>$item->module_id,"project_id"=>$item->project_id])));
			}
		}
		/* Remove items */
		for ($i = $item->items->count() - 1; $i >= 0; $i--)
		{
			$find_item = $item->items->get($i);
			$pos = $items->find(\Runtime\lib::equalAttr("file_name", $find_item->label));
			if ($pos == -1)
			{
				$item->items->remove($i);
			}
		}
		/* Sort items */
		$item->items = $item->items->sort(function ($a, $b)
		{
			if ($a->kind == "dir" && $b->kind == "file")
			{
				return -1;
			}
			if ($a->kind == "file" && $b->kind == "dir")
			{
				return 1;
			}
			return \Runtime\rs::compare($a->label, $b->label);
		});
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Code.CodeEditor";
		$this->project_id = "";
		$this->copy_past_kind = "";
		$this->copy_past_path = "";
		$this->confirm_dialog = null;
		$this->prompt_dialog = null;
		$this->tree = null;
		$this->selected_item = null;
		$this->selected_tab = null;
		$this->selected_path = null;
		$this->tabs = \Runtime\Vector::from([]);
		$this->save_result = null;
		$this->context_menu = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Code";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Code.CodeEditorModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BasePageModel";
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