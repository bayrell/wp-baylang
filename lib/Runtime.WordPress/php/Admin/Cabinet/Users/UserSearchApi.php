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
namespace Runtime\WordPress\Admin\Cabinet\Users;

use Runtime\Serializer\MapType;
use Runtime\ORM\Query;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SearchApi;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\Cabinet\Database\User;


class UserSearchApi extends \Runtime\Widget\Api\SearchApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.cabinet.users"; }
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return "Runtime.Cabinet.Database.User"; }
	
	
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
	 * Returns data rules
	 */
	function getDataRules($rules){}
	
	
	/**
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"id",
			"login",
			"email",
			"name",
			"is_deleted",
		);
	}
	
	
	/**
	 * Build Query
	 */
	function buildQuery($q)
	{
		/* Default sort by id desc */
		$q->orderBy("id", "desc");
	}
	
	
	/**
	 * Action search
	 */
	function actionSearch()
	{
		parent::actionSearch();
	}
	
	
	/**
	 * Action item
	 */
	function actionItem()
	{
		parent::actionItem();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserSearchApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionSearch", "actionItem");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSearch") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "search"]))
		);
		if ($field_name == "actionItem") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "item"]))
		);
		return null;
	}
}