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
namespace Runtime\Widget\Dialog;
class Dialog extends \Runtime\Web\Component
{
	function renderTitle()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model->title != "")
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->_escape($this->model->title));
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_dialog__title"])], $__v0);
		}
		
		return $__v;
	}
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->_escape($this->model->content));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_dialog__content"])], $__v0);
		
		return $__v;
	}
	function renderButtons()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderWidget($this->model->buttons));
		
		return $__v;
	}
	function renderResult()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderWidget($this->model->result));
		
		return $__v;
	}
	function renderDialog()
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderTitle());
		
		/* Text */
		$this->_t($__v, $this->renderContent());
		
		/* Text */
		$this->_t($__v, $this->renderButtons());
		
		/* Text */
		$this->_t($__v, $this->renderResult());
		
		return $__v;
	}
	function renderDialogContainer()
	{
		$__v = new \Runtime\Vector();
		$props = $this->getProps();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderDialog());
		
		/* Element 'div' */
		$this->_e($__v, "div", $this->_merge_attrs(["class" => $this->_class_name(["widget_dialog__container"])], $props), $__v0);
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_dialog__shadow"])]);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'table' */
		$__v2 = new \Runtime\Vector();
		
		/* Element 'tbody' */
		$__v3 = new \Runtime\Vector();
		
		/* Element 'tr' */
		$__v4 = new \Runtime\Vector();
		
		/* Element 'td' */
		$__v5 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v5, $this->renderDialogContainer());
		
		/* Element 'td' */
		$this->_e($__v4, "td", ["class" => $this->_class_name(["widget_dialog__td"])], $__v5);
		
		/* Element 'tr' */
		$this->_e($__v3, "tr", [], $__v4);
		
		/* Element 'tbody' */
		$this->_e($__v2, "tbody", [], $__v3);
		
		/* Element 'table' */
		$this->_e($__v1, "table", ["class" => $this->_class_name(["widget_dialog__wrap"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_dialog__box"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_dialog", (($this->model->is_open) ? ("widget_dialog--open") : ("widget_dialog--hide")), static::getStyles("widget_dialog", $this->model->styles)])], $__v0);
		
		return $this->_flatten($__v);
	}
	function getProps()
	{
		$styles = \Runtime\Vector::from([]);
		if ($this->model->width != "")
		{
			$styles->push("max-width: " . \Runtime\rtl::toStr($this->model->width));
		}
		return \Runtime\Map::from(["style"=>$styles->join(";")]);
	}
	/**
 * On shadow click
 */
	function onShadowClick()
	{
		if (!$this->model->modal)
		{
			$this->model->hide();
		}
	}
	/**
 * On dialog click
 */
	function onDialogClick($e)
	{
		if ($e->target->classList->contains("widget_dialog__td"))
		{
			$this->onShadowClick();
		}
	}
	/**
 * Updated
 */
	function onUpdated()
	{
		$elem = $document->documentElement;
		$is_scroll_lock = $elem->classList->contains("scroll-lock");
		if ($this->model->is_open)
		{
			if (!$is_scroll_lock)
			{
				$elem->classList->add("scroll-lock");
				$this->nextTick(function ()
				{
					$dialog_box = $this->getRef("dialog_box");
					$dialog_box->scrollTop = 0;
				});
			}
		}
		else
		{
			if ($is_scroll_lock)
			{
				$elem->classList->remove("scroll-lock");
			}
		}
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.RowButtons","Runtime.Widget.WidgetResult"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_dialog__box.h-a5bc,.widget_dialog__shadow.h-a5bc{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 1001}.widget_dialog__box.h-a5bc{overflow: auto;overflow-y: scroll;display: none}.widget_dialog--open.h-a5bc .widget_dialog__box{display: block}.widget_dialog__shadow.h-a5bc{background-color: #000;opacity: 0.2;overflow: hidden;display: none}.widget_dialog--open.h-a5bc .widget_dialog__shadow{display: block}.widget_dialog__wrap.h-a5bc{width: 100%;min-height: 100%}.widget_dialog__wrap.h-a5bc > tr > td{padding: 20px}.widget_dialog__container.h-a5bc{position: relative;padding: calc(var(--widget-space) * 3);background-color: white;border-radius: 4px;max-width: 600px;margin: calc(var(--widget-space) * 5) auto;width: auto;z-index: 1002;box-shadow: 2px 4px 10px 0px rgba(0,0,0,0.5);font-size: var(--widget-font-size)}.widget_dialog__title.h-a5bc{font-weight: bold;font-size: var(--widget-font-size-h2);text-align: left;margin: var(--widget-margin-h2);margin-top: 0}.widget_dialog__buttons.h-a598{margin: var(--widget-margin-h2);margin-bottom: 0}.widget_dialog__buttons.h-a598 .widget_button.h-8dd7{min-width: 70px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Dialog";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Dialog.Dialog";
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