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
namespace Runtime\WordPress\Theme\Components;

use Runtime\DateTime;
use Runtime\Core\Message;
use Runtime\Web\Messages\ValueChangeMessage;
use Runtime\Widget\Button;
use Runtime\Widget\Input;


class Captcha extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("captcha", $componentHash))])));
		
		/* Element div */
		$__v1 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("captcha__label", $componentHash))])));
		$__v1->push("Введите код, указанный на картинке");
		
		/* Element div */
		$__v2 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("captcha__wrap", $componentHash))])));
		
		/* Element div */
		$__v3 = $__v2->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("captcha__image", $componentHash))])));
		
		/* Element img */
		$__v3->element("img");
		
		/* Element button */
		$__v4 = $__v3->element("button", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("reload", $componentHash))])));
		$__v4->push("Reload image");
		
		/* Element div */
		$__v5 = $__v2->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("captcha__input", $componentHash))])));
		
		/* Element Runtime.Widget.Input */
		$__v5->element("Runtime.Widget.Input");
		
		return $__v;
	}
	/**
	 * Reload image
	 */
	function reloadImage()
	{
		$image = $this->getRef("image");
		$image->src = static::getImageHref();
	}
	/**
	 * Change event
	 */
	function onChange($e)
	{
		$input = $this->getRef("input");
		/* Send value change */
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(new \Runtime\Map([
			"value" => $input->value,
			"old_value" => $this->value,
			"data" => $this->data,
		])));
	}
	/**
	 * Returns image href
	 */
	static function getImageHref()
	{
		return "/generate_captcha/?_" . \Runtime\DateTime::now()->timestamp() . \Runtime\rtl::urandom();
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ".captcha__label.h-6ea1{font-weight: bold;margin-bottom: 5px}.captcha__wrap.h-6ea1{display: flex;align-items: center;justify-content: space-between}.captcha__image.h-6ea1{width: 225px;padding-right: 10px}.captcha__input.h-6ea1{width: 50%;padding-left: 10px}.captcha__image.h-6ea1 img{height: 86px}.captcha__image.h-6ea1 img, .captcha__image.h-6ea1 .reload{width: 100%}.captcha__image.h-6ea1 .reload{cursor: pointer;background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea1 .reload:hover{background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea1 .reload:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25)}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button", "Runtime.Widget.Input"); }
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Captcha"; }
}