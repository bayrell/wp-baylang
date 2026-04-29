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
namespace Runtime\WordPress\Admin\Components;

use Runtime\Web\Messages\ValueChangeMessage;
use Runtime\Widget\Button;
use Runtime\WordPress\Theme\Components\ImageType;


class Image extends \Runtime\Component
{
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_image", $this->getStyles(), $componentHash))])));
		
		if ($this->upload)
		{
			/* Element div */
			$__v1 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_image__upload_button", $componentHash))])));
			
			/* Element Runtime.Widget.Button */
			$__v2 = $__v1->element("Runtime.Widget.Button");
			
			/* Content */
			$__v2->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				$__v->push("Upload image");
				return $__v;
			});
		}
		
		$image = $this->getImage();
		if ($image)
		{
			if ($this->center)
			{
				/* Element center */
				$__v3 = $__v0->element("center");
				
				/* Element img */
				$__v3->element("img", (new \Runtime\Map(["src" => $image])));
			}
			else
			{
				/* Element img */
				$__v0->element("img", (new \Runtime\Map(["src" => $image])));
			}
		}
		
		return $__v;
	}
	var $styles;
	var $name;
	var $value;
	var $size;
	var $upload;
	var $center;
	/**
	 * Returns styles
	 */
	function getStyles()
	{
		if ($this->styles == null) return "";
		$styles = $this->styles->map(function ($name){ return "widget_image--" . $name; });
		return \Runtime\rs::join(" ", $styles);
	}
	/**
	 * Return image
	 */
	function getImage()
	{
		if (!($this->value instanceof \Runtime\WordPress\Theme\Components\ImageType)) return;
		return $this->value->getImage($this->size);
	}
	/**
	 * On upload image
	 */
	function onUploadImage()
	{
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->styles = new \Runtime\Vector();
		$this->name = "";
		$this->value = "";
		$this->size = "medium";
		$this->upload = false;
		$this->center = false;
	}
	static function getComponentStyle(){ return ".widget_image.h-c6d img{max-width: 200px;max-height: 200px}.widget_image--small.h-c6d img{max-width: 100px;max-height: 100px}.widget_image__upload_button.h-c6d{padding-bottom: 10px}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Button"); }
	static function getClassName(){ return "Runtime.WordPress.Admin.Components.Image"; }
}