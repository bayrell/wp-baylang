<?php
/*
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
class TreeWidget extends \Runtime\Web\Component
{
	public $is_drag;
	public $drag_elem;
	public $drag_start_point;
	public $drag_dest_box;
	public $drag_dest_elem;
	public $drag_dest_item;
	public $drag_dest_kind;
	function renderBox()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->drag_dest_box != null && $this->is_drag)
		{
			/* Element 'div' */
			$this->_e($__v, "div", ["style" => $this->drag_dest_box,"class" => $this->_class_name(["tree_widget__box", "tree_widget__box--" . \Runtime\rtl::toStr($this->drag_dest_kind)])]);
		}
		
		return $__v;
	}
	function renderItemLabel($item, $path)
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'span' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($item->label));
		
		/* Element 'span' */
		$this->_e($__v, "span", ["class" => $this->_class_name(["tree_widget__item_label"])], $__v0);
		
		return $__v;
	}
	function renderItemContent($item, $path)
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderItemLabel($item, $path));
		
		return $__v;
	}
	function renderItem($item, $path)
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderItemContent($item, $path));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["data-path" => \Runtime\rs::join(".", $path),"class" => $this->_class_name(["tree_widget__item", (($item == $this->model->selected_item) ? ("selected") : (""))])], $__v0);
		
		/* Text */
		$this->_t($__v, $this->renderItems($item, $path));
		
		return $__v;
	}
	function renderItems($item, $path)
	{
		$__v = new \Runtime\Vector();
		
		if ($item != null && $item->items != null && $item->items->count() > 0)
		{
			$key = ($path->count() > 0) ? ("item." . \Runtime\rtl::toStr(\Runtime\rs::join(".", $path)) . \Runtime\rtl::toStr(".items")) : ("item");
			
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			for ($i = 0; $i < $item->items->count(); $i++)
			{
				/* Text */
				$this->_t($__v0, $this->renderItem($item->items->get($i), $path->pushIm($i)));
			}
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["tree_widget__items", ((!$item->open) ? ("hide") : (""))])], $__v0);
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderBox());
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderItems($this->model->root, \Runtime\Vector::from([])));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["tree_widget__content"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["tree_widget"])], $__v0);
		
		if ($this->model->context_menu && $this->model->render_context_menu)
		{
			/* Text */
			$this->_t($__v, $this->renderWidget($this->model->context_menu));
		}
		
		return $this->_flatten($__v);
	}
	/**
 * Returns src elem
 */
	function getSrc()
	{
		if (!$this->drag_elem)
		{
			return null;
		}
		$src_elem_path = $this->drag_elem->getAttribute("data-path");
		$src_elem = ($src_elem_path) ? (\Runtime\rs::split(".", $src_elem_path)) : (\Runtime\Vector::from([]));
		return $src_elem->map(function ($s)
		{
			return \Runtime\rtl::to($s, ["e"=>"int"]);
		});
	}
	/**
 * Returns dest elem
 */
	function getDest()
	{
		if (!$this->drag_dest_elem)
		{
			return null;
		}
		$dest_elem_path = $this->drag_dest_elem->getAttribute("data-path");
		$dest_elem = ($dest_elem_path) ? (\Runtime\rs::split(".", $dest_elem_path)) : (\Runtime\Vector::from([]));
		return $dest_elem->map(function ($s)
		{
			return \Runtime\rtl::to($s, ["e"=>"int"]);
		});
	}
	/**
 * Find drag elem
 */
	function findDragElem($elem)
	{
		if ($elem->classList->contains("tree_widget__item_label"))
		{
			return $elem->parentElement;
		}
		return $elem;
	}
	/**
 * Find elem by path
 */
	function findElemByPath($path)
	{
		$path = ".tree_widget__item[data-path='" . \Runtime\rtl::toStr($path) . \Runtime\rtl::toStr("']");
		return $document->querySelector($path);
	}
	/**
 * Returns true if elem inside drag_elem
 */
	function checkInside($elem)
	{
		if (!$this->drag_elem)
		{
			return false;
		}
		if ($elem == $this->drag_elem)
		{
			return false;
		}
		$drag_elem_path = $this->drag_elem->getAttribute("data-path");
		$elem_path = $elem->getAttribute("data-path");
		if ($drag_elem_path == $elem_path)
		{
			return true;
		}
		if (\Runtime\rs::substr($elem_path, 0, \Runtime\rs::strlen($drag_elem_path) + 1) == $drag_elem_path . \Runtime\rtl::toStr("."))
		{
			return true;
		}
		return false;
	}
	/**
 * Start Drag & Drop
 */
	function startDrag($e)
	{
		if (!$this->model->dnd)
		{
			return false;
		}
		if ($this->is_drag != false)
		{
			return false;
		}
		if ($this->drag_start_point == null)
		{
			return false;
		}
		if (\Runtime\Math::abs($e->layerY - $this->drag_start_point->get("y")) > 5)
		{
			return false;
		}
		$this->is_drag = true;
		return true;
	}
	/**
 * Stop drag & drop
 */
	function stopDrag()
	{
		/* Do drag & drop */
		if ($this->drag_dest_box && $this->drag_elem && $this->drag_dest_elem)
		{
			$this->model->dragElement($this->getSrc(), $this->getDest(), $this->drag_dest_kind);
		}
		$this->is_drag = false;
		$this->drag_dest_box = null;
		$this->drag_dest_elem = null;
		$this->drag_dest_item = null;
		$this->drag_dest_kind = null;
		$this->drag_elem = null;
		$this->drag_start_point = null;
	}
	/**
 * Set drag & drop dest element
 */
	function setDragDestElement($elem, $item, $kind)
	{
		if (!$this->is_drag)
		{
			return ;
		}
		if ($this->checkInside($elem))
		{
			return ;
		}
		if ($kind == "into" && $this->drag_elem == $elem)
		{
			$kind = "before";
		}
		if ($kind == "into" && $item != null && !$item->canDragInside())
		{
			$kind = "after";
		}
		if ($this->drag_dest_elem == $elem && $this->drag_dest_kind == $kind)
		{
			return ;
		}
		/* Setup box */
		if ($this->drag_elem == $elem)
		{
			$this->drag_dest_box = null;
			return ;
		}
		/* Setup dest element */
		$this->drag_dest_elem = $elem;
		$this->drag_dest_item = $item;
		/* Get elem path */
		$src_path = $this->getSrc();
		$dest_path = $this->getDest();
		if ($dest_path == null)
		{
			$this->drag_dest_box = null;
			return ;
		}
		/* Can drag */
		$can_drag = $this->model->canDrag($src_path, $dest_path, $kind);
		if (!$can_drag)
		{
			if ($kind == "into")
			{
				$kind = "after";
				$can_drag = $this->model->canDrag($src_path, $dest_path, $kind);
				if (!$can_drag)
				{
					$this->drag_dest_box = null;
					return ;
				}
			}
		}
		/* Setup dest values */
		$this->drag_dest_kind = $kind;
		$this->drag_dest_box = $this->getBoxStyles($elem, $kind);
	}
	/**
 * Returns box styles by element
 */
	function getBoxStyles($elem, $kind="")
	{
		$left = $elem->offsetLeft;
		$top = $elem->offsetTop;
		$width = $elem->clientWidth - 1;
		$height = $elem->clientHeight - 1;
		if ($kind == "before")
		{
			return \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top) . \Runtime\rtl::toStr("px"),"width: " . \Runtime\rtl::toStr($width) . \Runtime\rtl::toStr("px"),"height: 1px"]));
		}
		if ($kind == "after")
		{
			return \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top + $height) . \Runtime\rtl::toStr("px"),"width: " . \Runtime\rtl::toStr($width) . \Runtime\rtl::toStr("px"),"height: 1px"]));
		}
		if ($kind == "into")
		{
			return \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top) . \Runtime\rtl::toStr("px"),"width: " . \Runtime\rtl::toStr($width) . \Runtime\rtl::toStr("px"),"height: " . \Runtime\rtl::toStr($height) . \Runtime\rtl::toStr("px")]));
		}
		return null;
	}
	/**
 * Show context menu
 */
	function showContextMenu($e)
	{
		if ($this->model->render_context_menu)
		{
			$x = $e->layerX;
			$y = $e->layerY;
		}
		else
		{
			$x = $e->clientX;
			$y = $e->clientY;
		}
		$this->model->context_menu->show($x, $y);
	}
	/**
 * Mouse context menu item click
 */
	function onContextMenuItem($e, $item, $path)
	{
		/* Send message context menu */
		$this->model->emit(new \Runtime\Widget\Tree\TreeMessage(\Runtime\Map::from(["name"=>"contextMenu","path"=>$path,"item"=>$item,"event"=>$e])));
		if ($item)
		{
			$item->onContextMenu($this->model);
		}
		/* Select item */
		if ($this->model->autoselect)
		{
			$this->model->selectItem($path);
			/* Send event */
			$this->model->emit(new \Runtime\Widget\Tree\TreeMessage(\Runtime\Map::from(["kind"=>"context_menu","name"=>"selectItem","path"=>$this->model->selected_path,"item"=>$this->model->selected_item])));
		}
		/* Show context menu */
		if ($this->model->context_menu)
		{
			$this->showContextMenu($e);
		}
		$e->preventDefault();
		$e->stopPropagation();
		return false;
	}
	/**
 * Mouse down
 */
	function onMouseDownItem($e, $item, $path)
	{
		if ($e->button != 0)
		{
			return ;
		}
		/* Hide context menu */
		if ($this->model->context_menu)
		{
			$this->model->context_menu->hide();
		}
		/* Select item */
		if ($this->model->autoselect)
		{
			$this->model->selectItem($path);
		}
		/* Send event */
		$this->model->emit(new \Runtime\Widget\Tree\TreeMessage(\Runtime\Map::from(["kind"=>"click","name"=>"selectItem","path"=>$this->model->selected_path,"item"=>$this->model->selected_item,"event"=>$e])));
		if ($item)
		{
			$item->onClick($this->model);
		}
		/* Set start drag item */
		if ($this->model->dnd)
		{
			$this->drag_elem = $this->findDragElem($e->currentTarget);
			$this->drag_start_point = \Runtime\Map::from(["x"=>$e->layerX,"y"=>$e->layerY]);
		}
		$e->preventDefault();
		$e->stopPropagation();
		return false;
	}
	/**
 * Mouse down
 */
	function onMouseDown($e)
	{
		if ($this->model->context_menu)
		{
			$this->model->context_menu->hide();
		}
	}
	/**
 * Mouse tree up
 */
	function onMouseUp($e)
	{
		$this->stopDrag();
	}
	/**
 * Mouse move item
 */
	function onMouseMoveItem($e, $item)
	{
		if ($this->drag_elem == null)
		{
			return ;
		}
		/* Try to start drag & drop */
		if (!$this->is_drag)
		{
			$this->startDrag($e);
		}
		if (!$this->is_drag)
		{
			return ;
		}
		/* Drag & Drop started */
		$target = $e->currentTarget;
		$top = $target->offsetTop;
		$bottom = $target->offsetTop + $target->clientHeight;
		$center = ($top + $bottom) / 2;
		$kind = "before";
		if ($e->layerY >= $center)
		{
			$kind = "into";
		}
		$this->setDragDestElement($target, $item, $kind);
		$e->preventDefault();
	}
	/**
 * Mouse tree move
 */
	function onMouseMove($e)
	{
		if ($this->drag_elem == null)
		{
			return ;
		}
		/* Try to start drag & drop */
		if (!$this->is_drag)
		{
			$this->startDrag($e);
		}
		if (!$this->is_drag)
		{
			return ;
		}
		/* Outside of tree contents */
		$tree_content = $this->getRef("content");
		if ($e->layerY > $tree_content->clientHeight)
		{
			$this->setDragDestElement($tree_content, null, "after");
			$e->preventDefault();
			return false;
		}
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".tree_widget.h-fd26{position: relative;height: 100%}.tree_widget__items.h-fd26 > .tree_widget__items{padding-left: 10px}.tree_widget__items.hide.h-fd26{display: none}.tree_widget__item_label.h-fd26{display: inline-block;padding: 5px;cursor: pointer;user-select: none}.tree_widget__item.selected.h-fd26 > .tree_widget__item_label{background-color: var(--widget-color-primary);color: var(--widget-color-primary-text)}.tree_widget__box.h-fd26{position: absolute;border-style: solid;border-width: 0;border-color: transparent}.tree_widget__box--into.h-fd26{background-color: rgba(255, 0, 0, 0.5);pointer-events: none}.tree_widget__box--before.h-fd26,.tree_widget__box--after.h-fd26{border-top-width: 2px;border-top-color: red}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->is_drag = false;
		$this->drag_elem = null;
		$this->drag_start_point = null;
		$this->drag_dest_box = null;
		$this->drag_dest_elem = null;
		$this->drag_dest_item = null;
		$this->drag_dest_kind = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Tree";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Tree.TreeWidget";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Component";
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