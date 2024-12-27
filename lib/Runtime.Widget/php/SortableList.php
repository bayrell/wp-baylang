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
namespace Runtime\Widget;
class SortableList extends \Runtime\Web\Component
{
	public $show_buttons;
	public $name;
	public $value;
	public $old_value;
	public $is_drag;
	public $is_transition;
	public $drag_elem;
	public $drag_item;
	public $drag_item_pos;
	public $shadow_elem;
	public $drag_elem_css;
	public $drag_start_point;
	public $duration;
	function renderValue($pos, $item)
	{
		$__v = new \Runtime\Vector();
		
		/* Component 'Input' */
		$this->_c($__v, "Runtime.Widget.Input", ["value" => $item]);
		
		return $__v;
	}
	function renderItem($pos)
	{
		$__v = new \Runtime\Vector();
		$item = $this->value->get($pos);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Raw */
		$this->_t($__v1, new \Runtime\RawString("&#9776;"));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_drag"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderValue($pos, $item));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_value"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Raw */
		$this->_t($__v1, new \Runtime\RawString("&#10005;"));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__item_remove"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["data-pos" => $pos,"class" => $this->_class_name(["widget_sortable_list__item"])], $__v0);
		
		return $__v;
	}
	function renderItems()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->value)
		{
			for ($i = 0; $i < $this->value->count(); $i++)
			{
				/* Text */
				$this->_t($__v0, $this->renderItem($i));
			}
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_sortable_list__items"])], $__v0);
		
		return $__v;
	}
	function renderButtons()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->show_buttons == "true")
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Component 'Button' */
			$this->_c($__v0, "Runtime.Widget.Button", ["styles" => \Runtime\Vector::from(["small"])], function (){
				$__v = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v, "Add");
				
				return $__v;
			});
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_sortable_list__buttons"])], $__v0);
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderItems());
		
		/* Text */
		$this->_t($__v0, $this->renderButtons());
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_sortable_list__shadow"])]);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_sortable_list"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Swap items
 */
	function swapItems($a, $b)
	{
		if ($a > $b)
		{
			$c = $a;
			$a = $b;
			$b = $c;
		}
		$obj_a = $this->value->get($a);
		$obj_b = $this->value->get($b);
		$this->value->remove($b);
		$this->value->insert($b, $obj_a);
		$this->value->remove($a);
		$this->value->insert($a, $obj_b);
	}
	/**
 * Remove item
 */
	function removeItem($pos)
	{
		$this->old_value = $this->value->slice();
		$this->value->remove($pos);
		$this->onValueChange();
	}
	/**
 * Returns drag & drop element from point
 */
	function getDragElementFromPoint($x, $y)
	{
		$items = $document->elementsFromPoint($x, $y);
		for ($i = 0; $i < $items->length; $i++)
		{
			$elem = \Runtime\rtl::attr($items, $i);
			if ($elem->parentElement == $this->shadow_elem)
			{
				continue;
			}
			if ($elem->classList->contains("widget_sortable_list__item"))
			{
				return $elem;
			}
		}
		return null;
	}
	/**
 * Returns drag & drop element
 */
	function getDragElement($elem)
	{
		if ($elem->classList->contains("widget_sortable_list__item"))
		{
			return $elem;
		}
		if ($elem->parentElement->classList->contains("widget_sortable_list__item"))
		{
			return $elem->parentElement;
		}
		return null;
	}
	/**
 * Create shadow elem
 */
	function createShadow()
	{
		if (!$this->drag_elem)
		{
			return ;
		}
		$this->shadow_elem = $document->createElement("div");
		$this->shadow_elem->innerHTML = $this->drag_elem->outerHTML;
		$this->shadow_elem->classList->add("widget_sortable_list__shadow_elem");
		$arr = \Runtime\rs::split(" ", static::getCssHash(static::getClassName()));
		$arr = $arr->filter(\Runtime\lib::equalNot(""));
		for ($i = 0; $i < $arr->count(); $i++)
		{
			$this->shadow_elem->classList->add($arr->get($i));
		}
		$this->shadow_elem->style->height = $this->drag_elem->offsetHeight . \Runtime\rtl::toStr("px");
		$this->shadow_elem->style->width = $this->drag_elem->offsetWidth . \Runtime\rtl::toStr("px");
		$this->getRef("shadow")->appendChild($this->shadow_elem);
	}
	/**
 * Move shadow element
 */
	function moveShadow($x, $y)
	{
		if (!$this->shadow_elem)
		{
			return ;
		}
		$left = $x - $this->drag_start_point->get("shift_x");
		$top = $y - $this->drag_start_point->get("shift_y");
		$this->shadow_elem->style->left = $left . \Runtime\rtl::toStr("px");
		$this->shadow_elem->style->top = $top . \Runtime\rtl::toStr("px");
	}
	/**
 * Start Drag & Drop
 */
	function startDrag($e)
	{
		if ($this->is_drag != false)
		{
			return false;
		}
		if ($this->drag_start_point == null)
		{
			return false;
		}
		/* Check move */
		$move_x = \Runtime\Math::abs($e->pageX - $this->drag_start_point->get("x"));
		$move_y = \Runtime\Math::abs($e->pageY - $this->drag_start_point->get("y"));
		if ($move_x < 10 && $move_y < 10)
		{
			return false;
		}
		/* Start drag */
		$this->is_drag = true;
		$this->createShadow();
		return true;
	}
	/**
 * Stop drag & drop
 */
	function stopDrag()
	{
		if (!$this->is_drag)
		{
			return ;
		}
		$this->is_drag = false;
		$this->is_transition = false;
		$this->drag_elem = null;
		$this->drag_start_point = null;
		$this->shadow_elem->remove();
		$this->shadow_elem = null;
	}
	/**
 * Move drag & drop
 */
	function moveDrag($e)
	{
		if (!$this->is_drag)
		{
			return ;
		}
		$this->moveShadow($e->pageX, $e->pageY);
		if ($this->is_transition)
		{
			return ;
		}
		$elem = $this->getDragElementFromPoint($e->pageX, $e->pageY);
		if (!$elem)
		{
			return ;
		}
		$pos = $elem->getAttribute("data-pos");
		if ($pos == $this->drag_item_pos)
		{
			return ;
		}
		/* Swap items with animation */
		$this->is_transition = true;
		$this->old_value = $this->value->slice();
		$this->swapItems($this->drag_item_pos, $pos);
		$this->drag_item_pos = $pos;
		/* Stop animation */
		$window->setTimeout(function ()
		{
			$this->is_transition = false;
		}, $this->duration);
		/* Send value change */
		$this->onValueChange();
	}
	/**
 * On value change
 */
	function onValueChange()
	{
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$this->value,"old_value"=>$this->old_value,"data"=>$this->data])));
	}
	/**
 * Add item click
 */
	function onAddItemClick()
	{
		$this->old_value = $this->value->slice();
		$this->value->push("");
		$this->onValueChange();
	}
	/**
 * Mouse down
 */
	function onMouseDown($e, $item)
	{
		if ($e->button != 0)
		{
			return ;
		}
		if ($this->is_drag)
		{
			return ;
		}
		/* Set start drag item */
		$this->drag_elem = $this->getDragElement($e->target);
		$this->drag_item = $item;
		$this->drag_item_pos = $this->drag_elem->getAttribute("data-pos");
		$this->drag_start_point = \Runtime\Map::from(["x"=>$e->pageX,"y"=>$e->pageY,"shift_x"=>$e->pageX - $e->target->offsetLeft,"shift_y"=>$e->pageY - $e->target->offsetTop]);
		/* Add event listener */
		$document->addEventListener("mouseup", $this->onMouseUp);
		$document->addEventListener("mousemove", $this->onMouseMove);
		$e->preventDefault();
		return false;
	}
	/**
 * Mouse tree up
 */
	function onMouseUp($e)
	{
		/* Remove event listener */
		$document->removeEventListener("mouseup", $this->onMouseUp);
		$document->removeEventListener("mousemove", $this->onMouseMove);
		/* Stop drag & drop */
		$this->stopDrag();
	}
	/**
 * Mouse move
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
		/* Move Drag & Drop */
		$this->moveDrag($e);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.Input","Runtime.Widget.Select"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_sortable_list.h-2647{position: relative}.widget_sortable_list__item.h-2647{display: flex;align-items: center;justify-content: flex-start;border-width: var(--widget-border-width);border-color: var(--widget-color-border);border-style: solid;border-radius: 4px;margin: 5px}.widget_sortable_list__item_drag.h-2647,.widget_sortable_list__item_remove.h-2647{cursor: pointer;padding: 0px 5px}.widget_sortable_list__item_value.h-2647{flex: 1}.widget_sortable_list__item_value.h-2647 .widget_input.h-f2df{padding: 0px 10px;border-color: transparent;border-radius: 0;border-width: 0}.widget_sortable_list__buttons.h-2647{text-align: center;margin-top: var(--widget-space)}.widget_sortable_list__shadow_elem.h-2647{position: absolute;opacity: 0.5;user-select: none;z-index: 9999999}.widget_sortable_list__shadow_elem.h-2647 .widget_sortable_list__item.h-2647{margin: 0}.widget_sortable_list__animation-move.h-2647,.widget_sortable_list__animation-enter-active.h-2647,.widget_sortable_list__animation-leave-active.h-2647{transition: all 0.3s ease}.widget_sortable_list__animation-enter-from.h-2647,.widget_sortable_list__animation-leave-to.h-2647{opacity: 0}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->show_buttons = "true";
		$this->name = "";
		$this->value = \Runtime\Vector::from([]);
		$this->old_value = \Runtime\Vector::from([]);
		$this->is_drag = false;
		$this->is_transition = false;
		$this->drag_elem = null;
		$this->drag_item = null;
		$this->drag_item_pos = -1;
		$this->shadow_elem = null;
		$this->drag_elem_css = null;
		$this->drag_start_point = null;
		$this->duration = 300;
	}
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.SortableList";
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