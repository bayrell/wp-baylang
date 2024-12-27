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
namespace Runtime\Widget\Table;
class SaveDialog extends \Runtime\Widget\Dialog\Dialog
{
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model->action == "add")
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderWidget($this->model->add_form));
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_dialog__content"])], $__v0);
		}
		
		if ($this->model->action == "edit")
		{
			/* Element 'div' */
			$__v0 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v0, $this->renderWidget($this->model->edit_form));
			
			/* Element 'div' */
			$this->_e($__v, "div", ["class" => $this->_class_name(["widget_dialog__content"])], $__v0);
		}
		
		return $__v;
	}
	function renderResult()
	{
		$__v = new \Runtime\Vector();
		
		if ($this->model->action == "add")
		{
			/* Text */
			$this->_t($__v, $this->renderWidget($this->model->add_form->result));
		}
		
		if ($this->model->action == "edit")
		{
			/* Text */
			$this->_t($__v, $this->renderWidget($this->model->edit_form->result));
		}
		
		return $__v;
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Dialog.Dialog"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_dialog.h-65a0 .widget_result{margin-top: var(--widget-space)}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Table";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Table.SaveDialog";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.Dialog";
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