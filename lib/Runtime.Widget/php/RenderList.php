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
namespace Runtime\Widget;
class RenderList extends \Runtime\Web\Component
{
	function renderItems()
	{
		$__v = new \Runtime\Vector();
		$items_count = $this->model->items->count();
		
		for ($i = 0; $i < $items_count; $i++)
		{
			$widget = $this->model->items->get($i);
			
			/* Text */
			$this->_t($__v, $this->renderWidget($widget, \Runtime\Map::from(["data"=>$this->data,"render_list"=>\Runtime\Map::from(["position"=>$i,"count"=>$items_count,"first"=>$i == 0,"last"=>$i == $items_count - 1])])));
		}
		
		return $__v;
	}
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Text */
		$this->_t($__v0, $this->renderItems());
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["widget_render_list"])], $__v0);
		
		return $this->_flatten($__v);
	}
	static function css($vars)
	{
		$res = "";
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget";
	}
	static function getClassName()
	{
		return "Runtime.Widget.RenderList";
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