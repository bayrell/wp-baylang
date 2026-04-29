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
namespace Runtime\WordPress\Theme\Components\Button;

use Runtime\Widget\ButtonModel;
use Runtime\WordPress\Theme\Components\Form\FormDialogModel;
use Runtime\WordPress\Theme\Components\Form\FormModel;


class ButtonFormModel extends \Runtime\Widget\ButtonModel
{
	var $dialog;
	var $form;
	var $dialog_settings;
	var $form_settings;
	
	
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("dialog_settings")) $this->dialog_settings = $params->get("dialog_settings");
		if ($params->has("form_settings")) $this->form_settings = $params->get("form_settings");
	}
	
	
	/**
	 * Init widget params
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add form */
		$this->form = $this->addWidget("Runtime.WordPress.Theme.Components.Form.FormModel", $this->form_settings->concat(new \Runtime\Map([
			"widget_name" => "form",
		])));
		/* Add dialog */
		$this->dialog = $this->addWidget("Runtime.WordPress.Theme.Components.Form.FormDialogModel", $this->dialog_settings->concat(new \Runtime\Map([
			"widget_name" => "dialog",
			"form" => $this->form,
		])));
		/* Set form title */
		$this->form->form_title = $this->dialog->title;
	}
	
	
	/**
	 * Set title
	 */
	function setTitle($title)
	{
		$this->dialog->title = $title;
		$this->form->form_title = $title;
	}
	
	
	/**
	 * On click
	 */
	function onClick($data = null)
	{
		$this->dialog->show();
		parent::onClick($data);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->dialog = null;
		$this->form = null;
		$this->dialog_settings = new \Runtime\Map();
		$this->form_settings = new \Runtime\Map();
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Button.ButtonFormModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}