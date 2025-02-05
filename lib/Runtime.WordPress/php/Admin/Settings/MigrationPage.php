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
namespace Runtime\WordPress\Admin\Settings;
class MigrationPage extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->tabs));
		
		if ($this->model->items->count() > 0)
		{
			/* Component 'TextEditable' */
			$this->_c($__v0, "Runtime.Widget.TextEditable", ["value" => \Runtime\rs::join("\n", $this->model->items)]);
			
			/* Component 'RowButtons' */
			$this->_c($__v0, "Runtime.Widget.RowButtons", ["styles" => \Runtime\Vector::from(["center","bottom_buttons"])], function (){
				$__v = new \Runtime\Vector();
				
				/* Component 'Button' */
				$this->_c($__v, "Runtime.Widget.Button", ["styles" => \Runtime\Vector::from(["primary"])], function (){
					$__v = new \Runtime\Vector();
					
					/* Text */
					$this->_t($__v, "Update");
					
					return $__v;
				});
				
				return $__v;
			});
			
			/* Component 'WidgetResult' */
			$this->_c($__v0, "Runtime.Widget.WidgetResult", ["model" => $this->_model($this->model->result)]);
		}
		else
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v1, "Database is up to date");
			
			/* Element 'div' */
			$this->_e($__v0, "div", [], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["database_migration_page"])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.RowButtons","Runtime.Widget.TextEditable","Runtime.Widget.WidgetResult"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".database_migration_page.h-3a65 .widget_text.h-86cd{height: 500px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Settings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Settings.MigrationPage";
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