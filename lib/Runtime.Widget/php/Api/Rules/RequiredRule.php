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
namespace Runtime\Widget\Api\Rules;

use Runtime\Exceptions\ApiError;
use Runtime\Exceptions\FieldException;
use Runtime\Widget\Api\SaveApi;
use Runtime\Widget\Api\Rules\BaseRule;


class RequiredRule extends \Runtime\Widget\Api\Rules\BaseRule
{
	var $field_name;
	
	
	/**
	 * On save before
	 */
	function onSaveBefore($api)
	{
		$value = $api->item->get($this->field_name);
		if ($value === "" || $value === null)
		{
			$error = new \Runtime\Map();
			$error->set($this->field_name, new \Runtime\Vector("Required"));
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\FieldException(new \Runtime\Map([
				"fields" => $error,
			])));
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->field_name = "";
	}
	static function getClassName(){ return "Runtime.Widget.Api.Rules.RequiredRule"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}