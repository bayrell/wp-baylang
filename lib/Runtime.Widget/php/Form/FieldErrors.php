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
use Runtime\Widget\ResultModel;


class FieldErrors extends \Runtime\BaseModel
{
	var $errors;
	var $error_name;
	
	
	/**
	 * Init widget params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params->has("error_name")) $this->error_name = $params->get("error_name");
	}
	
	
	/**
	 * Set api result
	 */
	function setApiResult($result)
	{
		$this->setFieldErrors($result->data->get($this->error_name));
	}
	
	
	/**
	 * Set field errors
	 */
	function setFieldErrors($field_errors)
	{
		if (!$field_errors)
		{
			$this->errors = new \Runtime\Map();
			return;
		}
		$this->errors = new \Runtime\Map();
		$keys = \Runtime\rtl::list($field_errors->keys());
		for ($i = 0; $i < $keys->count(); $i++)
		{
			$field_name = $keys->get($i);
			$messages = $field_errors->get($field_name);
			$message = \Runtime\rs::join(", ", $messages);
			$result = new \Runtime\Widget\ResultModel();
			$result->setError($message);
			$this->errors->set($field_name, $result);
		}
	}
	
	
	/**
	 * Returns result
	 */
	function get($field_name){ return $this->errors->get($field_name); }
	
	
	/**
	 * Clear
	 */
	function clear()
	{
		$this->errors = new \Runtime\Map();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->errors = new \Runtime\Map();
		$this->error_name = "fields";
	}
	static function getClassName(){ return "Runtime.Widget.Form.FieldErrors"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}