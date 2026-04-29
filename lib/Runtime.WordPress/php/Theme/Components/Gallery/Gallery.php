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
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		$item = $this->model->getItem($pos);
		
		/* Element div */
		$__v0 = $__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_gallery__item", $componentHash))])));
		
		/* Element div */
		$__v1 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_gallery__item_title", $componentHash))])));
		$__v1->push($item->get("name"));
		
		$small_image = $item["image", "sizes", $this->model->small_size];
		if ($small_image)
		{
			/* Element div */
			$__v2 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_gallery__item_image", $componentHash))])));
			
			/* Element img */
			$__v2->element("img", (new \Runtime\Map(["src" => $small_image->get("file"), "alt" => $item->get("name")])));
		}
		else
		{
			/* Element div */
			$__v3 = $__v0->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_gallery_item__image", $componentHash))])));
			
			/* Element div */
			$__v4 = $__v3->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("widget_gallery_item__no_image", $componentHash))])));
			$__v4->push("No image");
		}
		
		return $__v;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getComponentStyle(){ return ".widget_gallery__item.h-fc5c{display: flex;flex-direction: column;align-items: center}.widget_gallery__item_title.h-fc5c{font-weight: bold;text-align: center;margin-bottom: 10px}.widget_gallery__item_image.h-fc5c{cursor: pointer}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector(); }
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Gallery.Gallery"; }
}