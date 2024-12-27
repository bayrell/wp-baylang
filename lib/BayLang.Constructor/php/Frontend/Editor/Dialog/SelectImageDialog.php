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
namespace BayLang\Constructor\Frontend\Editor\Dialog;
class SelectImageDialog extends \Runtime\Widget\Dialog\Dialog
{
	function renderUploadImage()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'input' */
		$this->_e($__v0, "input", ["type" => "file"]);
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v1, "Upload image");
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["item_image_wrap"])], $__v1);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["item item_upload"])], $__v0);
		
		return $__v;
	}
	function renderContent()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->context_menu));
		
		/* Text */
		$this->_t($__v0, $this->renderUploadImage());
		
		for ($i = 0; $i < $this->model->items->count(); $i++)
		{
			$item = $this->model->items->get($i);
			
			if ($this->isImage($item))
			{
				/* Element 'div' */
				$__v1 = new \Runtime\Vector();
				
				/* Element 'div' */
				$__v2 = new \Runtime\Vector();
				
				/* Element 'img' */
				$this->_e($__v2, "img", ["src" => $item->get("url"),"class" => $this->_class_name(["item_image"])]);
				
				/* Element 'div' */
				$this->_e($__v1, "div", ["class" => $this->_class_name(["item_image_wrap"])], $__v2);
				
				/* Element 'div' */
				$__v2 = new \Runtime\Vector();
				
				/* Element 'span' */
				$__v3 = new \Runtime\Vector();
				
				/* Text */
				$this->_t($__v3, $this->_escape($item->get("file_name")));
				
				/* Element 'span' */
				$this->_e($__v2, "span", [], $__v3);
				
				/* Element 'div' */
				$this->_e($__v1, "div", ["class" => $this->_class_name(["item_label"])], $__v2);
				
				/* Element 'div' */
				$this->_e($__v0, "div", ["class" => $this->_class_name(["item", (($this->model->selected == $i) ? ("active") : (""))])], $__v1);
			}
		}
		
		/* Element 'div' */
		$this->_e($__v, "div", ["ref" => "items","class" => $this->_class_name(["select_image_items"])], $__v0);
		
		return $__v;
	}
	/**
 * File upload click event
 */
	function onFileUploadClick()
	{
		$upload_file = $this->getRef("upload_file");
		$upload_file->click();
	}
	/**
 * File upload change
 */
	function onFileUploadChange()
	{
		$upload_file = $this->getRef("upload_file");
		$file = \Runtime\rtl::attr($upload_file->files, 0);
		if ($file)
		{
			$this->model->uploadFile($file);
		}
	}
	/**
 * Returns true if item is image
 */
	function isImage($item)
	{
		$file_name = $item->get("file_name");
		$file_extension = \Runtime\rs::extname($file_name);
		$arr = \Runtime\Vector::from(["jpg","jpeg","png","svg"]);
		if ($arr->indexOf($file_extension) == -1)
		{
			return false;
		}
		return true;
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Dialog.Dialog"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".select_image_items.h-1804{position: relative;display: flex;flex-wrap: wrap}.select_image_items.h-1804 .item.h-1804{margin: 5px;text-align: center;cursor: pointer}.select_image_items.h-1804 .item_image_wrap.h-1804{display: flex;position: relative;align-items: center;justify-content: center;width: 100px;height: 100px;padding: 2px;border: 2px transparent solid}.select_image_items.h-1804 .item_upload.h-1804 input{display: none}.select_image_items.h-1804 .item_upload.h-1804 .item_image_wrap.h-1804{border: 1px var(--widget-color-border) solid;border-radius: 4px}.select_image_items.h-1804 .item_image.h-1804{max-width: 100%;max-height: 100%}.select_image_items.h-1804 .item_label.h-1804{margin-top: 5px;overflow-wrap: anywhere;width: 100px;text-align: center}.select_image_items.h-1804 .item_label.h-1804 span{display: inline-block;padding: 5px}.select_image_items.h-1804 .item.active.h-1804 .item_image_wrap.h-1804{border-color: var(--widget-color-primary);user-select: none}.select_image_items.h-1804 .item.active.h-1804 .item_label.h-1804 span{background-color: var(--widget-color-primary);color: white}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialog";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.Dialog";
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