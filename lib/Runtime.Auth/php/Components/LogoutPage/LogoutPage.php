<?php
/*
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Auth\Components\LogoutPage;

use Runtime\Widget\Button;

class LogoutPage extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("logout_page", $componentHash))])));
		
		/* Element h1 */
		$__v1 = $__v0->element("h1", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("page_title", $componentHash))])));
		$__v1->push("Click to logout");
		
		/* Element div */
		$__v2 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("logout_page_button", $componentHash))])));
		
		/* Element Runtime.Widget.Button */
		$__v3 = $__v2->element("Runtime.Widget.Button", (new \Runtime\Map(["styles" => new \Runtime\Vector("danger")])));
		
		/* Content */
		$__v3->slot("default", function ()
		{
			$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
			$__v = new \Runtime\VirtualDom($this);
			$__v->push("Logout");
			return $__v;
		});
		$__v2->push($this->renderWidget($this->model->result));
		
		return $__v;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ".logout_page.h-8786{max-width: 600px;margin-left: auto;margin-right: auto;margin-top: 100px;margin-bottom: 100px}.logout_page_button.h-8786{text-align: center}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button"); }
	static function getClassName(){ return "Runtime.Auth.Components.LogoutPage.LogoutPage"; }
}