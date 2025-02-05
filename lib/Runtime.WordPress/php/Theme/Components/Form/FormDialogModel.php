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
namespace Runtime\WordPress\Theme\Components\Form;
class FormDialogModel extends \Runtime\Widget\Dialog\DialogModel
{
	public $component;
	public $widget_name;
	public $form;
	public $form_settings;
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null)
		{
			return ;
		}
		if ($params->has("form"))
		{
			$this->form = $params->get("form");
		}
		if ($params->has("form_settings"))
		{
			$this->form_settings = $params->get("form_settings");
		}
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add form */
		if (!$this->form)
		{
			$this->form = $this->addWidget("Runtime.WordPress.Theme.Components.Form.FormModel", $this->form_settings->concat(\Runtime\Map::from(["widget_name"=>"form"])));
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Theme.Components.Form.FormDialog";
		$this->widget_name = "form_dialog";
		$this->form = null;
		$this->form_settings = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.Components.Form";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Components.Form.FormDialogModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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