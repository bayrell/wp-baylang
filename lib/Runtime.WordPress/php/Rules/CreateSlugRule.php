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
namespace Runtime\WordPress\Rules;

use Runtime\Widget\Api\SaveApi;
use Runtime\Widget\Api\Rules\BaseRule;


class CreateSlugRule extends \Runtime\Widget\Api\Rules\BaseRule
{
	var $field_name;
	var $from;
	
	
	/**
	 * Convert name to slug
	 */
	function convert($name)
	{
		return sanitize_title($name);
		return "";
	}
	
	
	/**
	 * On save before
	 */
	function onSaveBefore($api)
	{
		$value = $api->item->get($this->field_name);
		if ($value == "" || $value == null)
		{
			$value = $this->convert($api->item->get($this->from));
			$api->item->set($this->field_name, $value);
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->field_name = "";
		$this->from = "";
	}
	static function getClassName(){ return "Runtime.WordPress.Rules.CreateSlugRule"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}