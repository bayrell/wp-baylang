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
namespace BayLang\Constructor\Frontend\Project;
class ProjectList extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'h1' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Projects");
		
		/* Element 'h1' */
		$this->_e($__v0, "h1", [], $__v1);
		
		/* Component 'RowButtons' */
		$this->_c($__v0, "Runtime.Widget.RowButtons", ["model" => $this->_model($this->model->top_buttons),"class" => $this->_class_name(["top_buttons"])]);
		
		/* Component 'Table' */
		$this->_c($__v0, "Runtime.Widget.Table.Table", ["model" => $this->_model($this->model->table),"class" => $this->_class_name(["projects_table"])]);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["project_list"])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.RowButtons","Runtime.Widget.Table.Table"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".top_buttons.h-c43e{margin-bottom: 10px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Project";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Project.ProjectList";
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