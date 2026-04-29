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
namespace Runtime\WordPress\Admin\Gallery;

use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\Required;
use Runtime\Serializer\StringType;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SaveApi;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\WordPress\Database\Gallery;


class GallerySaveApi extends \Runtime\Widget\Api\SaveApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.wordpress.gallery"; }
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return "Runtime.WordPress.Database.Gallery"; }
	
	
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
	 * Returns item rules
	 */
	function getItemRules($rules)
	{
		$rules->addType("api_name", new \Runtime\Serializer\StringType());
		$rules->addType("api_name", new \Runtime\Serializer\Required());
	}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"id",
			"api_name",
		);
	}
	
	
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
	static function getClassName(){ return "Runtime.WordPress.Admin.Gallery.GallerySaveApi"; }
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