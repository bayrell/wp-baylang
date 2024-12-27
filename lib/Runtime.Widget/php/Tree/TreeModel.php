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
namespace Runtime\Widget\Tree;
class TreeModel extends \Runtime\Web\BaseModel
{
	public $component;
	public $widget_name;
	public $autoselect;
	public $dnd;
	public $icons;
	public $is_open;
	public $render_context_menu;
	public $context_menu;
	public $selected_path;
	public $selected_item;
	public $root;
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
		if ($params->has("autoselect"))
		{
			$this->autoselect = $params->get("autoselect");
		}
		if ($params->has("dnd"))
		{
			$this->dnd = $params->get("dnd");
		}
		if ($params->has("icons"))
		{
			$this->icons = $params->get("icons");
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Setup context menu */
		if ($params->has("context_menu"))
		{
			$this->setContextMenu($params->get("context_menu"));
		}
	}
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "root", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Set context menu
	 */
	function setContextMenu($context_menu)
	{
		$this->render_context_menu = true;
		if ($context_menu instanceof \Runtime\Dict)
		{
			$this->context_menu = $this->addWidget("Runtime.Widget.ContextMenu.ContextMenuModel", $context_menu);
		}
		else
		{
			$this->context_menu = $this->createModel($context_menu);
			if ($context_menu instanceof \Runtime\Web\BaseModel)
			{
				$this->render_context_menu = false;
			}
		}
	}
	/**
	 * Select item
	 */
	function selectItem($path)
	{
		$item = ($path) ? ($this->root->get($path)) : (null);
		if ($this->selected_item == $item)
		{
			return ;
		}
		$this->selected_path = $path;
		$this->selected_item = $item;
		if ($this->selected_item)
		{
			$this->selected_item->onSelect();
		}
	}
	/**
	 * Can drag & drop
	 */
	function canDrag($src, $dest, $kind)
	{
		$message = new \Runtime\Widget\Tree\TreeMessage(\Runtime\Map::from(["name"=>"canDrag","src"=>$src,"dest"=>$dest,"src_item"=>$this->root->get($src),"dest_item"=>$this->root->get($dest),"kind"=>$kind,"result"=>true]));
		$this->emit($message);
		return $message->result;
	}
	/**
	 * Drag & Drop
	 */
	function dragElement($src, $dest, $kind)
	{
		if ($dest->count() == 0)
		{
			$dest = \Runtime\Vector::from([$this->root->items->count() - 1]);
		}
		if (!$this->canDrag($src, $dest, $kind))
		{
			return ;
		}
		/* Move item */
		$src_item = $this->root->get($src);
		$dest_item = $this->root->get($dest);
		if (!$src_item)
		{
			return ;
		}
		if (!$dest_item)
		{
			return ;
		}
		/* Get parent items */
		$src_parent_path = $src->slice(0, -1);
		$dest_parent_path = ($kind != "into") ? ($dest->slice(0, -1)) : ($dest);
		$src_parent_item = $this->root->get($src_parent_path);
		$dest_parent_item = $this->root->get($dest_parent_path);
		/* Move item */
		$src_parent_item->items->removeItem($src_item);
		if ($kind == "into")
		{
			$dest_parent_item->items->addItem($src_item, null, "before");
		}
		else
		{
			$dest_parent_item->items->addItem($src_item, $dest_item, $kind);
		}
		/* Update dest path */
		$new_dest_parent_path = $dest_parent_path->slice();
		if ($src->count() <= $new_dest_parent_path->count())
		{
			$pos = $src->count() - 1;
			if ($src->get($pos) < $new_dest_parent_path->get($pos))
			{
				$new_dest_parent_path->set($pos, $new_dest_parent_path->get($pos) - 1);
			}
		}
		/* Create src new path */
		$pos = $dest_parent_item->find($src_item);
		$new_src_path = $new_dest_parent_path->pushIm($pos);
		/* Send drag & drop event */
		$this->emit(new \Runtime\Widget\Tree\TreeMessage(\Runtime\Map::from(["name"=>"dragElement","dest_item"=>$dest_item,"dest_parent_item"=>$dest_parent_item,"kind"=>$kind,"src_item"=>$src_item,"src_parent_item"=>$src_parent_item,"new_src_path"=>$new_src_path])));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Tree.TreeWidget";
		$this->widget_name = "tree";
		$this->autoselect = true;
		$this->dnd = false;
		$this->icons = true;
		$this->is_open = false;
		$this->render_context_menu = true;
		$this->context_menu = null;
		$this->selected_path = null;
		$this->selected_item = null;
		$this->root = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Tree";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Tree.TreeModel";
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