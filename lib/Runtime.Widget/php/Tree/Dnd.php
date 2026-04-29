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
namespace Runtime\Widget\Tree;

use Runtime\BaseObject;
use Runtime\Widget\Tree\TreeItem;
use Runtime\Widget\Tree\TreeModel;


class Dnd extends \Runtime\BaseObject
{
	const DRAG_BEFORE = "before";
	const DRAG_INTO = "into";
	const DRAG_AFTER = "after";
	
	var $is_drag;
	var $component;
	var $drag_elem;
	var $drag_elem_path;
	var $drag_start_point;
	var $drag_dest_box;
	var $drag_dest_kind;
	var $drag_dest_path;
	var $drag_dest_elem;
	var $model;
	
	
	/**
	 * Find drag elem
	 */
	function findDragElem($elem)
	{
		if ($elem->classList->contains("tree_widget__item_label")) return $elem->parentElement;
		return $elem;
	}
	
	
	/**
	 * Find elem by path
	 */
	function findElemByPath($path)
	{
		$path = ".tree_widget__item[data-path='" . $path . "']";
		return $document->querySelector($path);
	}
	
	
	/**
	 * Returns true if elem inside drag_elem
	 */
	function checkInside($path)
	{
		if (!$this->drag_elem_path) return false;
		$drag_elem_path = \Runtime\rs::join(".", $this->drag_elem_path);
		$elem_path = $path ? \Runtime\rs::join(".", $path) : "";
		if ($drag_elem_path == $elem_path) return false;
		if (\Runtime\rs::substr($elem_path, 0, \Runtime\rs::strlen($drag_elem_path) + 1) == $drag_elem_path . ".")
		{
			return true;
		}
		return false;
	}
	
	
	/**
	 * Returns true if path is equal
	 */
	static function equalPath($src_path, $dest_path)
	{
		$src_elem = $src_path ? \Runtime\rs::join(".", $src_path) : "";
		$dest_elem = $dest_path ? \Runtime\rs::join(".", $dest_path) : "";
		return $src_elem == $dest_elem;
	}
	
	
	/**
	 * Returns true if can drag
	 */
	function canDrag($src_path, $dest_path, $kind)
	{
		return true;
	}
	
	
	/**
	 * Drag element
	 */
	function dragElement($src_path, $dest_path, $kind){}
	
	
	/**
	 * Set start drag item
	 */
	function onMouseDownItem($e, $path)
	{
		$this->drag_elem = $this->findDragElem($e->currentTarget);
		$this->drag_elem_path = $path->slice();
		$this->drag_start_point = new \Runtime\Map([
			"x" => $e->layerX,
			"y" => $e->layerY,
		]);
	}
	
	
	/**
	 * Mouse move item
	 */
	function onMouseMoveItem($e, $path)
	{
		if ($this->drag_elem == null) return;
		/* Try to start drag & drop */
		if (!$this->is_drag) $this->startDrag($e);
		if (!$this->is_drag) return;
		/* Drag & Drop started */
		$target = $this->findDragElem($e->currentTarget);
		$top = $target->offsetTop;
		$bottom = $target->offsetTop + $target->clientHeight;
		$center = ($top + $bottom) / 2;
		/* Get kind */
		$kind = static::DRAG_BEFORE;
		if ($e->layerY >= $center)
		{
			$kind = static::DRAG_INTO;
		}
		/* Set drag target */
		$this->setTarget($target, $path, $kind);
		$e->preventDefault();
	}
	
	
	/**
	 * On mouse move
	 */
	function onMouseMove($e)
	{
		if ($this->drag_elem == null) return;
		/* Try to start drag & drop */
		if (!$this->is_drag) $this->startDrag($e);
		if (!$this->is_drag) return;
		/* Outside of tree contents */
		$tree_content = $this->component->getRef("content");
		if ($e->layerY > $tree_content->clientHeight)
		{
			$this->setTarget($tree_content, null, static::DRAG_AFTER);
			$e->preventDefault();
			return false;
		}
	}
	
	
	/**
	 * Start Drag & Drop
	 */
	function startDrag($e)
	{
		if ($this->is_drag != false) return false;
		if ($this->drag_start_point == null) return false;
		if (Math::abs($e->layerY - $this->drag_start_point->get("y")) > 5) return false;
		$this->is_drag = true;
		return true;
	}
	
	
	/**
	 * Stop drag & drop
	 */
	function stopDrag()
	{
		/* Do drag & drop */
		if ($this->drag_dest_box)
		{
			$this->dragElement($this->drag_elem_path, $this->drag_dest_path, $this->drag_dest_kind);
		}
		$this->is_drag = false;
		$this->drag_dest_box = null;
		$this->drag_dest_elem = null;
		$this->drag_dest_path = null;
		$this->drag_dest_kind = null;
		$this->drag_elem = null;
		$this->drag_elem_path = null;
		$this->drag_start_point = null;
	}
	
	
	/**
	 * Set drag & drop dest element
	 */
	function setTarget($elem, $path, $kind)
	{
		if (!$this->is_drag) return;
		$src_path = \Runtime\rs::join(".", $this->drag_elem_path);
		$dest_path = $path ? \Runtime\rs::join(".", $path) : "";
		$item = $this->model->root->get($path);
		if ($this->checkInside($path)) return;
		if ($kind == "into" && $src_path == $dest_path) $kind = "before";
		if ($kind == "into" && $item != null && !$item->canDragInside()) $kind = "after";
		if (static::equalPath($this->drag_dest_path, $path) && $this->drag_dest_kind == $kind) return;
		/* Setup dest element */
		$this->drag_dest_elem = $elem;
		$this->drag_dest_path = $path;
		/* Can drag */
		$can_drag = $this->canDrag($this->drag_elem_path, $this->drag_dest_path, $kind);
		/* Set dest kind */
		$this->drag_dest_kind = $kind;
		/* Setup dest box */
		if ($src_path != $dest_path && $can_drag) $this->drag_dest_box = $this->getBoxStyles($elem, $kind);
		else $this->drag_dest_box = null;
	}
	
	
	/**
	 * Returns box styles by element
	 */
	function getBoxStyles($elem, $kind = "")
	{
		$left = $elem->offsetLeft;
		$top = $elem->offsetTop;
		$width = $elem->clientWidth - 1;
		$height = $elem->clientHeight - 1;
		if ($kind == static::DRAG_BEFORE) return \Runtime\rs::join(";", new \Runtime\Vector(
			"left: " . $left . "px",
			"top: " . $top . "px",
			"width: " . $width . "px",
			"height: 1px",
		));
		if ($kind == static::DRAG_AFTER) return \Runtime\rs::join(";", new \Runtime\Vector(
			"left: " . $left . "px",
			"top: " . $top + $height . "px",
			"width: " . $width . "px",
			"height: 1px",
		));
		if ($kind == static::DRAG_INTO) return \Runtime\rs::join(";", new \Runtime\Vector(
			"left: " . $left . "px",
			"top: " . $top . "px",
			"width: " . $width . "px",
			"height: " . $height . "px",
		));
		return null;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->is_drag = false;
		$this->component = null;
		$this->drag_elem = null;
		$this->drag_elem_path = null;
		$this->drag_start_point = null;
		$this->drag_dest_box = null;
		$this->drag_dest_kind = "";
		$this->drag_dest_path = null;
		$this->drag_dest_elem = null;
		$this->model = null;
	}
	static function getClassName(){ return "Runtime.Widget.Tree.Dnd"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}