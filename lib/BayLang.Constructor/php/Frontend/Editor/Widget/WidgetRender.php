<?php
/*!
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
namespace BayLang\Constructor\Frontend\Editor\Widget;
class WidgetRender extends \BayLang\Constructor\Frontend\Editor\Widget\Widget
{
	public $model_class_name;
	public $primary_model_code;
	public $model_codes;
	/**
	 * Returns true if component
	 */
	function isComponent()
	{
		return true;
	}
	/**
	 * Returns true if component has model
	 */
	function isModel()
	{
		return true;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->model_class_name = null;
		$this->primary_model_code = null;
		$this->model_codes = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.WidgetRender";
	}
	static function getParentClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.Widget.Widget";
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