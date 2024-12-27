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
namespace Runtime\WordPress\Components;
class Image extends \Runtime\Web\Component
{
	public $styles;
	public $name;
	public $value;
	public $size;
	public $upload;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		if ($this->upload)
		{
			/* Element 'div' */
			$__v1 = new \Runtime\Vector();
			
			/* Component 'Button' */
			$this->_c($__v1, "Runtime.Widget.Button", ["type" => "small"], function (){
				$__v = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v, "Upload image");
				
				return $__v;
			});
			
			/* Element 'div' */
			$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_image__upload_button"])], $__v1);
		}
		$image = $this->getImage();
		
		if ($image)
		{
			/* Element 'img' */
			$this->_e($__v0, "img", ["src" => $image]);
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_image", $this->getStyles()])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Returns styles
 */
	function getStyles()
	{
		if ($this->styles == null)
		{
			return "";
		}
		$styles = $this->styles->map(function ($name)
		{
			return "widget_image--" . \Runtime\rtl::toStr($name);
		});
		return \Runtime\rs::join(" ", $styles);
	}
	/**
 * Return image
 */
	function getImage()
	{
		if ($this->value == null)
		{
			return null;
		}
		$image = $this->value->get("file");
		/* Resolve size */
		$sizes = $this->value->get("sizes");
		if ($sizes && $sizes->has($this->size))
		{
			$image = $sizes->get($this->size)->get("file");
		}
		return $image;
	}
	/**
 * On upload image
 */
	function onUploadImage()
	{
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_image.h-1867 img{max-width: 200px;max-height: 200px}.widget_image--small.h-1867 img{max-width: 100px;max-height: 100px}.widget_image__upload_button.h-1867{padding-bottom: 10px}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->styles = \Runtime\Vector::from([]);
		$this->name = "";
		$this->value = "";
		$this->size = "default";
		$this->upload = false;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Components";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Components.Image";
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