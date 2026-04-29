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
use Runtime\ORM\Query;
use Runtime\ORM\Record;
use Runtime\Widget\Api\SaveApi;
use Runtime\Widget\Api\Rules\BaseRule;


class UniqueRule extends \Runtime\Widget\Api\Rules\BaseRule
{
	var $field_name;
	var $key;
	
	
	/**
	 * On save before
	 */
	function onSaveBefore($api)
	{
		$field_name = $this->field_name;
		$key = $this->key;
		if (!$key)
		{
			$key = new \Runtime\Vector($field_name);
		}
		$keys = $api->relation->getPrimaryKeys();
		$q = $api->relation->select($keys);
		foreach ($key as $name)
		{
			$q->where($name, "=", $api->item->get($name));
		}
		if ($api->item->isUpdate())
		{
			$pk = $api->relation->getPrimaryKey($api->item->old());
			foreach ($pk->keys() as $key)
			{
				$q->where($key, "!=", $api->item->get($key));
			}
		}
		$row = $api->relation->fetch($q);
		if ($row)
		{
			$error = new \Runtime\Map();
			$error->set($this->field_name, new \Runtime\Vector("Must be unique"));
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
		$this->key = null;
	}
	static function getClassName(){ return "Runtime.Widget.Api.Rules.UniqueRule"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}