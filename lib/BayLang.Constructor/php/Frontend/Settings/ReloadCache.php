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
namespace BayLang\Constructor\Frontend\Settings;
class ReloadCache extends \Runtime\Web\Component
{
	public $result;
	function render()
	{
		$__v = new \Runtime\Vector();
		
		/* Element 'div' */
		$__v0 = new \Runtime\Vector();
		
		/* Component 'Button' */
		$this->_c($__v0, "Runtime.Widget.Button", [], function (){
			$__v = new \Runtime\Vector();
			
			/* Text */
			$this->_t($__v, "Reload");
			
			return $__v;
		});
		
		/* Component 'WidgetResult' */
		$this->_c($__v0, "Runtime.Widget.WidgetResult", ["model" => $this->_model($this->result)]);
		
		/* Element 'div' */
		$this->_e($__v, "div", ["class" => $this->_class_name(["reload_cache"])], $__v0);
		
		return $this->_flatten($__v);
	}
	/**
 * Refresh item
 */
	function onRefresh()
	{
		$this->result->clear();
		$this->result->setWaitMessage();
		/* Get primary key */
		$form = $this->data->get("form");
		$pk = $form->getPrimaryKey($form->item);
		/* Reload cache */
		$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.project::save","method_name"=>"reloadCache","data"=>\Runtime\Map::from(["pk"=>$pk])]));
		$this->result->setApiResult($res);
	}
	static function components()
	{
		return \Runtime\Vector::from(["Runtime.Widget.Button"]);
	}
	static function css($vars)
	{
		$res = "";
		$res .= \Runtime\rtl::toStr(".reload_cache.h-5951{display: flex;align-items: center;gap: 5px}.reload_cache.h-5951 .widget_result.h-e870{margin-top: 0}");
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->result = new \Runtime\Widget\WidgetResultModel();
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Settings";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Settings.ReloadCache";
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