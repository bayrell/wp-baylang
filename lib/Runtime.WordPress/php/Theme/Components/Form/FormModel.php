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

use Runtime\ApiResult;
use Runtime\Serializer\BooleanType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Form\FormModel as BaseFormModel;
use Runtime\WordPress\Theme\Components\Form\Form;


class FormModel extends \Runtime\Widget\Form\FormModel
{
	var $component;
	var $form_name;
	var $form_title;
	var $form_event;
	var $form_id;
	var $redirect_url;
	var $fields;
	var $item;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("form_name", new \Runtime\Serializer\StringType());
		$rules->addType("form_title", new \Runtime\Serializer\StringType());
		$rules->addType("form_event", new \Runtime\Serializer\StringType());
		$rules->addType("form_id", new \Runtime\Serializer\StringType());
		$rules->addType("redirect_url", new \Runtime\Serializer\StringType());
		$rules->addType("fields", new \Runtime\Serializer\VectorType(new \Runtime\Serializer\MapType(new \Runtime\Map([
			"name" => new \Runtime\Serializer\StringType(),
			"title" => new \Runtime\Serializer\StringType(),
			"type" => new \Runtime\Serializer\StringType(),
			"placeholder" => new \Runtime\Serializer\StringType(),
			"required" => new \Runtime\Serializer\BooleanType(),
		]))));
	}
	
	
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("form_name")) $this->form_name = $params->get("form_name");
		if ($params->has("form_title")) $this->form_title = $params->get("form_title");
		if ($params->has("form_event")) $this->form_event = $params->get("form_event");
		if ($params->has("form_id")) $this->form_id = $params->get("form_id");
		if ($params->has("redirect_url")) $this->redirect_url = $params->get("redirect_url");
	}
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
	}
	
	
	/**
	 * Returns field component
	 */
	function getFieldComponent($field_type)
	{
		if ($field_type == "textarea") return "Runtime.Widget.TextArea";
		return "Runtime.Widget.Input";
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		parent::loadData($container);
		$this->loadForm();
	}
	
	
	/**
	 * Load form
	 */
	function loadForm()
	{
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => "runtime.wordpress.form.submit",
			"method_name" => "settings",
			"data" => new \Runtime\Map([
				"form_name" => $this->form_name,
			]),
		]));
		if ($result->isSuccess())
		{
			/* Clear fields */
			$this->fields = new \Runtime\Vector();
			/* Add new fields */
			$settings = $result->data->get("settings");
			$this->fields = $settings->get("fields");
		}
	}
	
	
	/**
	 * Submit form
	 */
	function submit()
	{
		$this->setWaitMessage();
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => "runtime.wordpress.form.submit",
			"method_name" => "save",
			"data" => new \Runtime\Map([
				"form_name" => $this->form_name,
				"form_title" => $this->form_title,
				"form_id" => $this->form_id,
				"item" => $this->item,
			]),
		]));
		$this->setApiResult($result);
		/* Send event */
		\Runtime\rtl::getContext()->hook("runtime.wordpress::form_submit", new \Runtime\Map([
			"form" => $this,
			"result" => $result,
		]));
		/* Redirect */
		if ($result->isSuccess() && $this->redirect_url != "")
		{
			$document->location = $this->redirect_url;
		}
		return $result;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Theme.Components.Form.Form";
		$this->form_name = "";
		$this->form_title = "";
		$this->form_event = "";
		$this->form_id = "";
		$this->redirect_url = "";
		$this->fields = new \Runtime\Vector();
		$this->item = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.Components.Form.FormModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}