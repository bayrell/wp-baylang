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
namespace Runtime\Widget\Form;
class FormRow extends \Runtime\Web\Component
{
	public $styles;
	public $error;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->checkSlot("label"))
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderSlot("label"));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["form_row__label"])], $__v1);
		}
		
		if ($this->checkSlot("content"))
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderSlot("content"));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["form_row__content"])], $__v1);
		}
		
		if ($this->checkSlot("result"))
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, $this->renderSlot("result"));
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["form_row__result"])], $__v1);
		}
		
		if ($this->error->count() > 0)
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			for ($i = 0; $i < $this->error->count(); $i++)
			{
				/* Element 'div' */
				$__v2 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v2, $this->_escape($this->error->get($i)));
				
				/* Element 'div' */
				$this->_e($__v1, "div", [], $__v2);
			}
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["form_row__error"])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["form_row", $this->class, static::getStyles("form_row", $this->styles)])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".form_row.h-df7b{margin-bottom: 10px}.form_row:last-child.h-df7b{margin-bottom: 0px}.form_row__label.h-df7b{margin-bottom: 5px}.form_row--flex.h-df7b{display: flex;align-items: center}.form_row--flex__label.h-df7b,.form_row--flex__content.h-df7b{width: 50%}.form_row__error.h-df7b{color: var(--widget-color-danger);margin-top: var(--widget-space)}.form_row__error--hide.h-df7b{display: none}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->styles = \Runtime\Vector::from([]);
		$this->error = \Runtime\Vector::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Form";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Form.FormRow";
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