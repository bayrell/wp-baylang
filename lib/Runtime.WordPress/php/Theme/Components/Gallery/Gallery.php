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
namespace Runtime\WordPress\Theme\Components\Gallery;
class Gallery extends \Runtime\Widget\Gallery\Gallery
{
	function renderItem($pos)
	{
		$__v = new \Runtime\Vector();
		$item = $this->model->getItem($pos);
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, $this->_escape($item->get("name")));
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_gallery__item_title"])], $__v1);
		$small_image = \Runtime\rtl::attr($item, ["image", "sizes", $this->model->small_size]);
		
		if ($small_image)
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Element 'img' */
			$this->_e($__v1, "img", ["src" => $small_image->get("file"),"alt" => $item->get("name")]);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_gallery__item_image"])], $__v1);
		}
		else
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Element 'div' */
			$__v2 = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v2, "No image");
			
			/* Element 'div' */
			$this->_e($__v1, "div", ["class" => $this->_class_name(["widget_gallery_item__no_image"])], $__v2);
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_gallery_item__image"])], $__v1);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_gallery__item"])], $__v0);
		
		return $__v;
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Gallery.Gallery"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_gallery__item.h-fc5d{display: flex;flex-direction: column;align-items: center}.widget_gallery__item_title.h-fc5d{font-weight: bold;text-align: center;margin-bottom: 10px}.widget_gallery__item_image.h-fc5d{cursor: pointer}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components.Gallery";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Gallery.Gallery";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Gallery.Gallery";
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