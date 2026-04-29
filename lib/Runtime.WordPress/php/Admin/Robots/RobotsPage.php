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
namespace Runtime\WordPress\Admin\Robots;

use Runtime\Widget\Button;
use Runtime\Widget\RowButtons;
use Runtime\Widget\TextArea;
use Runtime\Widget\Form\Form;
use Runtime\Widget\Form\FormRow;


class RobotsPage extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("form_settings_page", $componentHash))])));
		
		/* Element Runtime.Widget.Form.Form */
		$__v1 = $__v0->element("Runtime.Widget.Form.Form", (new \Runtime\Map(["model" => $this->model->form])));
		
		/* Content */
		$__v1->slot("default", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			/* Element Runtime.Widget.Form.FormRow */
			$__v0 = $__v->element("Runtime.Widget.Form.FormRow", (new \Runtime\Map(["label" => "Robots"])));
			
			/* Content */
			$__v0->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element Runtime.Widget.TextArea */
				$__v->element("Runtime.Widget.TextArea", (new \Runtime\Map(["value" => $this->model->form->item->get("content")])));
				
				return $__v;
			});
			$__v->push($this->renderWidget($this->model->form->result, new \Runtime\Map([
				"class" => "result--form",
			])));
			
			/* Element Runtime.Widget.RowButtons */
			$__v1 = $__v->element("Runtime.Widget.RowButtons");
			
			/* Content */
			$__v1->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element Runtime.Widget.Button */
				$__v0 = $__v->element("Runtime.Widget.Button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("button--primary button--large", $componentHash))])));
				
				/* Content */
				$__v0->slot("default", function ()
				{
					$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
					$__v = new \Runtime\VirtualDom($this);
					$__v->push("Save");
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
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.TextArea", "Runtime.Widget.Form.Form", "Runtime.Widget.Form.FormRow"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.Robots.RobotsPage"; }
}