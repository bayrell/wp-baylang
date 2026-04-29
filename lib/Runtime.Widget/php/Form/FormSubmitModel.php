<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Widget\Form;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Form\FormMessage;
use Runtime\Widget\Form\FormModel;
use Runtime\Widget\Form\FormSubmit;


class FormSubmitModel extends \Runtime\Widget\Form\FormModel
{
	var $component;
	var $fields;
	var $submit_button;
	var $api_name;
	var $method_name;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
	}
	
	
	/**
	 * Init params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if (!$params) return;
		if ($params->has("fields"))
		{
			$this->fields = $params->get("fields");
		}
		if ($params->has("submit_button"))
		{
			$this->submit_button = $params->get("submit_button");
		}
		if ($params->has("api_name"))
		{
			$this->api_name = $params->get("api_name");
		}
		if ($params->has("method_name"))
		{
			$this->method_name = $params->get("method_name");
		}
	}
	
	
	/**
	 * Init widget
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$this->field_errors->error_name = "error";
		foreach ($this->fields as $field)
		{
			$component = $field->get("component");
			$this->layout->addComponent($component);
		}
	}
	
	
	/**
	 * Submit form
	 */
	function submit()
	{
		/* Prepare data from fields */
		$data = new \Runtime\Map();
		foreach ($this->fields->values() as $field)
		{
			$field_name = $field->get("name");
			$data->set($field_name, $this->item->get($field_name));
		}
		/* Send API request */
		if ($this->api_name)
		{
			$this->result->setWaitMessage();
			/* Send api */
			$result = $this->layout->sendApi(new \Runtime\Map([
				"api_name" => $this->api_name,
				"method_name" => $this->method_name,
				"data" => $data,
			]));
			/* Set api result */
			$this->setApiResult($result);
			if ($result->isSuccess())
			{
				$this->onSubmitSuccess($result);
			}
			else
			{
				$this->onSubmitError($result);
			}
		}
	}
	
	
	/**
	 * Handle successful submission
	 */
	function onSubmitSuccess($result)
	{
		$this->listener->emit(new \Runtime\Widget\Form\FormMessage(new \Runtime\Map([
			"name" => "submit",
			"result" => $result,
		])));
	}
	
	
	/**
	 * Handle submission error
	 */
	function onSubmitError($result)
	{
		$this->listener->emit(new \Runtime\Widget\Form\FormMessage(new \Runtime\Map([
			"name" => "submit",
			"result" => $result,
		])));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Widget.Form.FormSubmit";
		$this->fields = new \Runtime\Vector();
		$this->submit_button = new \Runtime\Map();
		$this->api_name = "";
		$this->method_name = "submit";
	}
	static function getClassName(){ return "Runtime.Widget.Form.FormSubmitModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}