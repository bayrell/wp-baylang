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
namespace Runtime\WordPress\Admin\MailSettings;

use Runtime\Serializer\BaseType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\Required;
use Runtime\Serializer\StringType;
use Runtime\ORM\Query;
use Runtime\Web\ApiResult;
use Runtime\Web\ApiRequest;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SaveApi;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\WordPress\Database\MailSettings;


class MailSaveApi extends \Runtime\Widget\Api\SaveApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.wordpress.mail.settings"; }
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return "Runtime.WordPress.Database.MailSettings"; }
	
	
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
		parent::getItemRules($rules);
		$rules->addType("enable", new \Runtime\Serializer\IntegerType());
		$rules->addType("plan", new \Runtime\Serializer\Required());
		$rules->addType("plan", new \Runtime\Serializer\StringType());
		$rules->addType("host", new \Runtime\Serializer\StringType());
		$rules->addType("port", new \Runtime\Serializer\StringType());
		$rules->addType("login", new \Runtime\Serializer\StringType());
		$rules->addType("password", new \Runtime\Serializer\StringType());
		$rules->addType("ssl_enable", new \Runtime\Serializer\IntegerType());
	}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"id",
			"enable",
			"plan",
			"host",
			"port",
			"login",
			"password",
			"ssl_enable",
		);
	}
	
	
	/**
	 * Build query
	 */
	function buildQuery($q){}
	
	
	/**
	 * Action save
	 */
	function actionSave()
	{
		parent::actionSave();
	}
	
	
	/**
	 * Action delete
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
	static function getClassName(){ return "Runtime.WordPress.Admin.MailSettings.MailSaveApi"; }
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