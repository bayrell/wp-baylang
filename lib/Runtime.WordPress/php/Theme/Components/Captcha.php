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
class Captcha extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Введите код, указанный на картинке");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["captcha__label"])], $__v1);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Element 'img' */
		$this->_e($__v2, "img", []);
		
		/* Element 'button' */
		$__v3 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v3, "Reload image");
		
		/* Element 'button' */
		$this->_e($__v2, "button", ["class" => $this->_class_name(["reload"])], $__v3);
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["captcha__image"])], $__v2);
		
		/* Element 'div' */
		$__v2 = new \Runtime\Vector();
		
		/* Component 'Input' */
		$this->_c($__v2, "Runtime.Widget.Input", []);
		
		/* Element 'div' */
		$this->_e($__v1, "div", ["class" => $this->_class_name(["captcha__input"])], $__v2);
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["captcha__wrap"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["captcha"])], $__v0);
		
		return $this->_flatten($__v);
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
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$input->value,"old_value"=>$this->value,"data"=>$this->data])));
	}
	/**
 * Returns image href
 */
	static function getImageHref()
	{
		return "/generate_captcha/?_" . \Runtime\rtl::toStr(\Runtime\DateTime::now()->timestamp()) . \Runtime\rtl::toStr(\Runtime\rtl::urandom());
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button","Runtime.Widget.Input"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".captcha__label.h-6ea2{font-weight: bold;margin-bottom: 5px}.captcha__wrap.h-6ea2{display: flex;align-items: center;justify-content: space-between}.captcha__image.h-6ea2{width: 225px;padding-right: 10px}.captcha__input.h-6ea2{width: 50%;padding-left: 10px}.captcha__image.h-6ea2 img{height: 86px}.captcha__image.h-6ea2 img,.captcha__image.h-6ea2 .reload{width: 100%}.captcha__image.h-6ea2 .reload{cursor: pointer;background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea2 .reload:hover{background-color: white;border: 1px #ccc solid;color: black}.captcha__image.h-6ea2 .reload:active{box-shadow: inset 0px 2px 5px 0px rgba(0,0,0,0.25)}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Captcha";
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