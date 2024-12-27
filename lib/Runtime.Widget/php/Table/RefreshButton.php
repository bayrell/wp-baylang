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
class RefreshButton extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		$props = $this->model->getProps($this->data);
		
		/* Component 'Button' */
		$this->_c($__v0, "Runtime.Widget.Button", $this->_merge_attrs(["render_list" => $this->render_list,"class" => $this->_class_name([$this->class])], $props), function (){
			$__v = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v, "Refresh");
			
			return $__v;
		});
		
		/* Component 'WidgetResult' */
		$this->_c($__v0, "Runtime.Widget.WidgetResult", ["model" => $this->_model($this->model->result)]);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["refresh_button"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Refresh item
 */
	function onClick($e)
	{
		$this->model->onClick($this->data);
		$e->stopPropagation();
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.WidgetResult"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".refresh_button.h-6727{display: flex;align-items: center;gap: 5px}.refresh_button.h-6727 .widget_result.h-e870{margin-top: 0}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Table";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Table.RefreshButton";
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