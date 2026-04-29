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

use Runtime\Widget\Button;
use Runtime\Widget\Dialog\Dialog;


class ButtonForm extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_button__wrap", $this->class, $this->renderListClass(), $componentHash))])));
		
		/* Element Runtime.Widget.Button */
		$__v1 = $__v0->element("Runtime.Widget.Button", (new \Runtime\Map(["styles" => $this->model->styles])));
		
		/* Content */
		$__v1->slot("default", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			
			if ($this->model->content)
			{
				$__v->push($this->model->content);
			}
			else
			{
				$__v->push($this->renderSlot("default"));
			}
			
			return $__v;
		});
		$__v->push($this->renderWidget($this->model->dialog));
		
		return $__v;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ""; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.Dialog.Dialog"); }
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Button.ButtonForm"; }
}