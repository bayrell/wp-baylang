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
namespace Runtime\Widget\Tab;
class Tabs extends \Runtime\Web\Component
{
	function renderHeader()
	{
		$__v = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->items->count(); $i++)
		{
			$tab = $this->model->items->get($i);
			$tab_key = \Runtime\rtl::attr($tab, "key");
			$tab_label = \Runtime\rtl::attr($tab, "label");
			$tab_href = \Runtime\rtl::attr($tab, "href");
			$is_active = $this->model->isActive($tab_key);
			
			if ($tab_href == null)
			{
				/* Element 'div' */
				$__v0 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v0, $this->_escape($tab_label));
				
				/* Element 'div' */
				$this->_e($__v, "div", ["data-tab" => $tab_key,"class" => $this->_class_name(["tabs__header_item", (($is_active) ? ("tabs__header_item--active") : (""))])], $__v0);
			}
			else
			{
				/* Element 'a' */
				$__v0 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v0, $this->_escape($tab_label));
				
				/* Element 'a' */
				$this->_e($__v, "a", ["data-tab" => $tab_key,"href" => $tab_href,"class" => $this->_class_name(["tabs__header_item", (($is_active) ? ("tabs__header_item--active") : (""))])], $__v0);
			}
		}
		
		return $__v;
	}
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model->render)
		{
			for ($i = 0; $i < $this->model->items->count(); $i++)
			{
				$tab = $this->model->items->get($i);
				$tab_key = $tab->get("key");
				
				if ($this->model->canShow($tab_key))
				{
					/* Element 'div' */
					$__v0 = new \Runtime\Vector();
					
					/* Text */
					$this->_t($__v0, $this->renderSlot($tab_key));
					
					/* Element 'div' */
					$this->_e($__v, "div", ["data-tab" => $tab_key,"class" => $this->_class_name(["tabs__item", (($this->model->isActive($tab_key)) ? ("tabs__item--active") : (""))])], $__v0);
				}
			}
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderHeader());
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["tabs__header"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->renderSlot("default"));
		
		/* Text */
		$this->_t($__v1, $this->renderContent());
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["tabs__content"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["tabs", $this->class])], $__v0);
		
		return $this->_flatten($__v);
	}
	function onClick($e)
	{
		$tab_key = $e->target->getAttribute("data-tab");
		$this->model->setActive($tab_key);
		$this->emit("select", $tab_key);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Tab.Tab"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".tabs.h-020a{position: relative}.tabs__header.h-020a{display: flex;position: relative;border-bottom-width: var(--widget-border-width);border-bottom-color: var(--widget-color-border);border-bottom-style: solid}.tabs__header_item.h-020a{position: relative;padding: calc(1.5 * var(--widget-space));border-color: transparent;border-width: var(--widget-border-width);border-style: solid;border-bottom-width: 0px;text-decoration: none;color: inherit;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-khtml-user-select: none;-ms-user-select: none;top: var(--widget-border-width)}.tabs__header_item.h-020a:hover,.tabs__header_item.h-020a:visited,.tabs__header_item.h-020a:visited:hover,.tabs__header_item.h-020a:focus{text-decoration: none;color: inherit;box-shadow: none;outline: transparent}.tabs__header_item--active.h-020a{background-color: var(--widget-color-table-background);border-color: var(--widget-color-border)}.tabs__content.h-020a{margin-top: calc(2 * var(--widget-space))}.tabs__item.h-020a{position: relative;display: none}.tabs__item--active.h-020a{display: block}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Tab";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Tab.Tabs";
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