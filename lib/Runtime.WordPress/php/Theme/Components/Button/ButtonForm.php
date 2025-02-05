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
namespace Runtime\WordPress\Theme\Components\Button;
class ButtonForm extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Component 'Button' */
		$this->_c($__v0, "Runtime.Widget.Button", ["styles" => $this->model->styles], function (){
			$__v = new \Runtime\Vector();
			
			if ($this->model->content)
			{
				/* Text */
				$this->_t($__v, $this->_escape($this->model->content));
			}
			else
			{
				/* Text */
				$this->_t($__v, $this->renderSlot("default"));
			}
			
			return $__v;
		});
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_button__wrap", $this->class, $this->renderListClass()])], $__v0);
		
		/* Text */
		$this->_t($__v, $this->renderWidget($this->model->dialog));
		
		return $this->_flatten($__v);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.Dialog.Dialog"]);
	}
	static function css($vars)
	{
		$res = "";
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components.Button";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Button.ButtonForm";
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