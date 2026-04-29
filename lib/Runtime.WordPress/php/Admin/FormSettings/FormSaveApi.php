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
namespace Runtime\WordPress\Admin\FormSettings;

use Runtime\Exceptions\ApiError;
use Runtime\Exceptions\ItemNotFound;
use Runtime\Serializer;
use Runtime\Serializer\BaseType;
use Runtime\Serializer\BooleanType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\Required;
use Runtime\Serializer\StringType;
use Runtime\Serializer\VectorType;
use Runtime\ORM\Query;
use Runtime\Web\ApiRequest;
use Runtime\Web\ApiResult;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SaveApi;
use Runtime\Widget\Api\Rules\ReadOnlyRule;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\WordPress\Admin\FormSettings\FormItem;
use Runtime\WordPress\Database\Form;


class FormSaveApi extends \Runtime\Widget\Api\SaveApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.wordpress.forms.settings"; }
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return "Runtime.WordPress.Database.Form"; }
	
	
	/**
	 * Returns middleware
	 */
	function getMiddleware()
	{
		return new \Runtime\Vector(
			new \Runtime\WordPress\Admin\AdminMiddleware(),
		);
	}
	
	
	/**
	 * Returns save rules
	 */
	function rules(){ return new \Runtime\Vector(); }
	
	
	/**
	 * Returns serialize rules
	 */
	function getItemRules($rules)
	{
		$rules->addType("id", new \Runtime\Serializer\IntegerType());
		$rules->addType("name", new \Runtime\Serializer\Required());
		$rules->addType("name", new \Runtime\Serializer\StringType());
		$rules->addType("api_name", new \Runtime\Serializer\Required());
		$rules->addType("api_name", new \Runtime\Serializer\StringType());
		$rules->addType("email_to", new \Runtime\Serializer\StringType());
		$rules->addType("settings", new \Runtime\Serializer\MapType(new \Runtime\Map([
			"fields" => new \Runtime\Serializer\VectorType(new \Runtime\Serializer\MapType(new \Runtime\Map([
				"name" => new \Runtime\Serializer\StringType(),
				"type" => new \Runtime\Serializer\StringType(),
				"title" => new \Runtime\Serializer\StringType(),
				"placeholder" => new \Runtime\Serializer\StringType(),
				"required" => new \Runtime\Serializer\StringType(),
			]))),
		])));
	}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"id",
			"name",
			"api_name",
			"settings",
			"email_to",
		);
	}
	
	
	/**
	 * Build query
	 */
	function buildQuery($q){}
	
	
	/**
	 * Before save
	 */
	function onSaveBefore()
	{
		/* Set settings */
		$settings = $this->item->get("settings");
		if ($settings == null) $this->item->set("settings", new \Runtime\Map());
	}
	
	
	/**
	 * Save form
	 */
	function actionSave()
	{
		parent::actionSave();
	}
	
	
	/**
	 * Delete form
	 */
	function actionDelete()
	{
		parent::actionDelete();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.FormSettings.FormSaveApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionSave", "actionDelete");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSave") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "save"]))
		);
		if ($field_name == "actionDelete") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "delete"]))
		);
		return null;
	}
}