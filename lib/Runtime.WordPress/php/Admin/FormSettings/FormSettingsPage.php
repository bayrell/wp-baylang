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
namespace Runtime\WordPress\Admin\FormSettings;

use Runtime\Widget\Button;
use Runtime\Widget\Input;
use Runtime\Widget\RowButtons;
use Runtime\Widget\Table\TableWrap;
use Runtime\WordPress\Admin\FormSettings\FieldSettings;


class FormSettingsPage extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("form_settings_page", $componentHash))])));
		
		/* Element Runtime.Widget.Table.TableWrap */
		$__v1 = $__v0->element("Runtime.Widget.Table.TableWrap", (new \Runtime\Map(["model" => $this->model->manager])));
		
		/* Slot top_buttons */
		$__v1->slot("top_buttons", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element Runtime.Widget.RowButtons */
			$__v0 = $__v->element("Runtime.Widget.RowButtons");
			
			/* Content */
			$__v0->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element Runtime.Widget.Button */
				$__v0 = $__v->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--success", $componentHash))])));
				
				/* Content */
				$__v0->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					$__v->push("Add");
					return $__v;
				});
				
				return $__v;
			});
			
			return $__v;
		});
		
		/* Slot row_buttons */
		$__v1->slot("row_buttons", function ($item, $field, $row_number)
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element Runtime.Widget.RowButtons */
			$__v0 = $__v->element("Runtime.Widget.RowButtons");
			
			/* Content */
			$__v0->slot("default", function () use (&$item)
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element Runtime.Widget.Button */
				$__v0 = $__v->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--small", $componentHash))])));
				
				/* Content */
				$__v0->slot("default", function () use (&$item)
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					$__v->push("Edit");
					return $__v;
				});
				
				/* Element Runtime.Widget.Button */
				$__v1 = $__v->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--small button--danger", $componentHash))])));
				
				/* Content */
				$__v1->slot("default", function () use (&$item)
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					$__v->push("Delete");
					return $__v;
				});
				
				return $__v;
			});
			
			return $__v;
		});
		
		return $__v;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.Input", "Runtime.Widget.RowButtons", "Runtime.Widget.Table.TableWrap", "Runtime.WordPress.Admin.FormSettings.FieldSettings"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormSettingsPage"; }
}