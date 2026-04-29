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

use Runtime\Widget\Dialog\DialogModel;
use Runtime\Widget\Dialog\DialogModelException;
use Runtime\WordPress\Theme\Components\Form\FormDialog;
use Runtime\WordPress\Theme\Components\Form\FormModel;


class FormDialogModel extends \Runtime\Widget\Dialog\DialogModel
{
	var $component;
	var $widget_name;
	var $form;
	var $form_settings;
	
	
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("form")) $this->form = $params->get("form");
		if ($params->has("form_settings")) $this->form_settings = $params->get("form_settings");
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
			$this->form = $this->addWidget("Runtime.WordPress.Theme.Components.Form.FormModel", $this->form_settings->concat(new \Runtime\Map([
				"widget_name" => "form",
			])));
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Theme.Components.Form.FormDialog";
		$this->widget_name = "form_dialog";
		$this->form = null;
		$this->form_settings = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Form.FormDialogModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}