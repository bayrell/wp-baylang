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
namespace Runtime\Widget\Gallery;
class Gallery extends \Runtime\Web\Component
{
	function renderItem($pos)
	{
		$__v = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v, $this->renderSlot("default", \Runtime\Map::from(["pos"=>$pos,"item"=>$this->model->items->get($pos),"onClick"=>function () use (&$pos)
		{
			$this->onClick($pos);
		}])));
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v1 = new \Runtime\Vector();
		
		for ($i = 0; $i < $this->model->items->count(); $i++)
		{
			/* Text */
			$this->_t($__v1, $this->renderItem($i));
		}
		
		/* Element 'div' */
		$this->_e($__v0, "div", ["class" => $this->_class_name(["widget_gallery__items"])], $__v1);
		
		/* Text */
		$this->_t($__v0, $this->renderWidget($this->model->dialog));
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_gallery", $this->class])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * On click
 */
	function onClick($pos)
	{
		$this->model->dialog->select($pos);
		$this->model->dialog->show();
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".widget_gallery__items.h-9a68{display: flex;align-items: center;justify-content: space-around;flex-wrap: wrap}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.Gallery";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Gallery.Gallery";
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