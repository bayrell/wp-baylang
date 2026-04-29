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

use Runtime\Annotations\ApiError;
use Runtime\Exceptions\RuntimeException;
use Runtime\Serializer\TypeError;
use Runtime\ORM\Query;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\StringType;
use Runtime\Serializer\Required;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SaveApi;
use Runtime\Widget\Api\Rules\UniqueRule;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\Cabinet\Database\User;


class UserSaveApi extends \Runtime\Widget\Api\SaveApi
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
	 * Returns save rules
	 */
	function rules()
	{
		return new \Runtime\Vector(
			new \Runtime\Widget\Api\Rules\UniqueRule(new \Runtime\Map(["field_name" => "login"])),
			new \Runtime\Widget\Api\Rules\UniqueRule(new \Runtime\Map(["field_name" => "email"])),
		);
	}
	
	
	/**
	 * Returns data rules
	 */
	function getDataRules($rules){}
	
	
	/**
	 * Returns item rules
	 */
	function getItemRules($rules)
	{
		$rules->addType("id", new \Runtime\Serializer\IntegerType());
		$rules->addType("login", new \Runtime\Serializer\Required());
		$rules->addType("login", new \Runtime\Serializer\StringType());
		$rules->addType("email", new \Runtime\Serializer\Required());
		$rules->addType("email", new \Runtime\Serializer\StringType());
		$rules->addType("name", new \Runtime\Serializer\StringType());
		$rules->addType("password", new \Runtime\Serializer\StringType());
		$rules->addType("repeat_password", new \Runtime\Serializer\StringType());
		$rules->addType("is_deleted", new \Runtime\Serializer\IntegerType());
	}
	
	
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
			"gmtime_add",
			"gmtime_edit",
		);
	}
	
	
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return new \Runtime\Vector(
			"login",
			"email",
			"name",
			"is_deleted",
		);
	}
	
	
	/**
	 * Check data after setup
	 */
	function checkData($errors)
	{
		$password = $this->update_data->get("password");
		$repeat_password = $this->update_data->get("repeat_password");
		if ($password && $password != $repeat_password)
		{
			$errors->push(new \Runtime\Serializer\TypeError("Password mistmatch", "repeat_password"));
		}
	}
	
	
	/**
	 * Build query
	 */
	function buildQuery($q)
	{
		parent::buildQuery($q);
	}
	
	
	/**
	 * Save before
	 */
	function onSaveBefore()
	{
		parent::onSaveBefore();
	}
	
	
	/**
	 * Save after
	 */
	function onSaveAfter()
	{
		parent::onSaveAfter();
		$password = $this->update_data->get("password");
		$repeat_password = $this->update_data->get("repeat_password");
		if ($password != "" && $password == $repeat_password)
		{
			$this->item->setPassword($password);
			$this->item->save();
		}
	}
	
	
	/**
	 * Delete before
	 */
	function onDeleteBefore()
	{
		parent::onDeleteBefore();
	}
	
	
	/**
	 * Delete after
	 */
	function onDeleteAfter(){}
	
	
	/**
	 * Save action
	 */
	function actionSave()
	{
		parent::actionSave();
	}
	
	
	/**
	 * Delete action
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
	static function getClassName(){ return "Runtime.WordPress.Admin.Cabinet.Users.UserSaveApi"; }
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