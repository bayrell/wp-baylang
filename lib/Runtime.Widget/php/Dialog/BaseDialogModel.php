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
namespace Runtime\Widget\Dialog;
class BaseDialogModel extends \Runtime\Web\BaseModel
{
	public $is_open;
	public $modal;
	public $component;
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
	}
	/**
	 * Show dialog
	 */
	function show()
	{
		$this->is_open = true;
		$this->emit(new \Runtime\Widget\Dialog\DialogMessage(\Runtime\Map::from(["name"=>"show"])));
	}
	/**
	 * Hide dialog
	 */
	function hide()
	{
		$this->is_open = false;
		$this->emit(new \Runtime\Widget\Dialog\DialogMessage(\Runtime\Map::from(["name"=>"hide"])));
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->is_open = false;
		$this->modal = true;
		$this->component = "";
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Dialog";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Dialog.BaseDialogModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseModel";
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