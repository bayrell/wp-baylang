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
namespace BayLang\Constructor\Frontend\Components;
class SelectImageButton extends \Runtime\Web\Component
{
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Component 'Button' */
		$this->_c($__v, "Runtime.Widget.Button", [], function (){
			$__v = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v, "Select image");
			
			return $__v;
		});
		
		return $this->_flatten($__v);
	}
	/**
 * Select image click
 */
	function onSelectImageClick($message)
	{
		$select_image_dialog = $this->layout->getPageModel()->select_image_dialog;
		$select_image_dialog->clearListener("confirm");
		$select_image_dialog->addListener("confirm", new \Runtime\Callback($this, "onSelectImage"));
		$select_image_dialog->show();
	}
	/**
 * On select image
 */
	function onSelectImage()
	{
		$select_image_dialog = $this->layout->getPageModel()->select_image_dialog;
		$selected_item = $select_image_dialog->getSelectedItem();
		$value = ($selected_item) ? ($selected_item->get("file_path")) : ("");
		/* Send value change */
		$this->emit("valueChange", new \Runtime\Web\Messages\ValueChangeMessage(\Runtime\Map::from(["value"=>$value,"data"=>$this->data])));
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button"]);
	}
	static function css($vars)
	{
		$res = "";
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Components";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Components.SelectImageButton";
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