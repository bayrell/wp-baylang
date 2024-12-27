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
namespace BayLang\Constructor\Frontend\Editor;
class Breadcrumbs extends \Runtime\Web\Component
{
	function renderRow($item, $pos, $is_menu)
	{
		$__v = new \Runtime\Vector();
		$selected_path = $this->model->selected->path;
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'span' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape(($item != null) ? ($item->label) : ("Select value")));
		
		/* Element 'span' */
		$this->_e($__v0, "span", ["class" => $this->_class_name(["breadcrumbs__item_name"])], $__v1);
		
		if ($is_menu)
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Raw */
			$this->_t($__v1, new \Runtime\RawString("&#9661;"));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["breadcrumbs__item_arrow"])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["breadcrumbs__item_row"])], $__v0);
		
		return $__v;
	}
	function renderMenu($parent_item, $pos, $is_last)
	{
		$__v = new \Runtime\Vector();
		$selected_path = $this->model->selected->path;
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($parent_item && $parent_item->items)
		{
			for ($j = 0; $j < $parent_item->items->count(); $j++)
			{
				$menu_item = $parent_item->items->get(\Runtime\Vector::from([$j]));
				
				/* Element 'div' */
				$__v1 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v1, $this->_escape($menu_item->label));
				
				/* Element 'div' */
				$this->_e($__v0, "div", ["class" => $this->_class_name(["breadcrumbs__item_menu_name"])], $__v1);
			}
		}
		
		if ($is_last)
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, "+ Add Widget");
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["breadcrumbs__item_menu_name"])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["breadcrumbs__item_menu", (($this->model->breadcrumbs_selected == $pos) ? ("breadcrumbs__item_menu--open") : (""))])], $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		$item = $this->model->tree->root;
		$selected_path = $this->model->selected->path;
		
		if ($selected_path)
		{
			for ($i = 0; $i < $selected_path->count(); $i++)
			{
				if ($item != null)
				{
					$parent_item = $item;
					$item = $item->get(\Runtime\Vector::from([$selected_path->get($i)]));
					
					/* Element 'div' */
					$__v1 = new \Runtime\Vector();
					
					/* Render row */
					if ($i < $selected_path->count() - 1)
					{
						/* Text */
						$this->_t($__v1, $this->renderRow($item, $i, false));
					}
					else
					{
						/* Text */
						$this->_t($__v1, $this->renderRow($item, $i, true));
						
						/* Text */
						$this->_t($__v1, $this->renderMenu($parent_item, $i, false));
					}
					
					/* Element 'div' */
					$this->_e($__v0, "div", ["class" => $this->_class_name(["breadcrumbs__item breadcrumbs__item--value"])], $__v1);
					
					/* Element 'div' */
					$__v1 = new \Runtime\Vector();
					
					/* Raw */
					$this->_t($__v1, new \Runtime\RawString("->"));
					
					/* Element 'div' */
					$this->_e($__v0, "div", ["class" => $this->_class_name(["breadcrumbs__item breadcrumbs__item--next"])], $__v1);
				}
			}
			
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Render row */
			/* Text */
			$this->_t($__v1, $this->renderRow(null, $selected_path->count(), true));
			
			/* Text */
			$this->_t($__v1, $this->renderMenu($item, $selected_path->count(), true));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["breadcrumbs__item breadcrumbs__item--last"])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["breadcrumbs"])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".breadcrumbs.h-f2af{display: flex;border-bottom: 1px var(--widget-color-border) solid;height: 32px;padding-left: 5px;overflow-x: auto;scrollbar-width: none}.breadcrumbs__item_row.h-f2af{display: flex}.breadcrumbs__item_name.h-f2af,.breadcrumbs__item_arrow.h-f2af,.breadcrumbs__item--next.h-f2af,.breadcrumbs__item_menu_name.h-f2af{display: flex;align-items: center;justify-content: center;min-height: 31px}.breadcrumbs__item_name.h-f2af{cursor: pointer;padding-left: 5px}.breadcrumbs__item_name.h-f2af span{flex: 1}.breadcrumbs__item_arrow.h-f2af{cursor: pointer;width: 20px}.breadcrumbs__item_menu.h-f2af{display: none;position: absolute;background-color: white;border: 1px var(--widget-color-border) solid}.breadcrumbs__item_menu--open.h-f2af{display: block}.breadcrumbs__item_menu_name.h-f2af{justify-content: flex-start;padding-left: 5px;padding-right: 5px;border-bottom: 1px var(--widget-color-border) solid;cursor: pointer}.breadcrumbs__item_menu_name.h-f2af:hover{background-color: var(--widget-color-hover)}.breadcrumbs__item_menu_name.h-f2af:last-child{border-bottom-width: 0px}.breadcrumbs__item--next.h-f2af{text-wrap: nowrap;padding: 0px 5px;width: 20px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Breadcrumbs";
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