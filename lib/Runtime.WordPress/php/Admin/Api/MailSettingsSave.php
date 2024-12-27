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
namespace Runtime\WordPress\Admin\Api;
class MailSettingsSave extends \Runtime\Widget\Crud\SaveRelationApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "admin.wordpress.mail.settings::save";
	}
	/**
	 * Returns table name
	 */
	function getTableName()
	{
		return "mail_settings";
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["id","enable","plan","host","port","login","password","ssl_enable","is_deleted"]);
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from(["enable","plan","host","port","login","password","ssl_enable"]);
	}
	/**
	 * Returns rules
	 */
	function getRules()
	{
		return \Runtime\Vector::from([new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"plan"])),new \Runtime\Widget\Crud\Rules\Unique(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["plan"])]))]);
	}
	/**
	 * Build search query
	 */
	function buildSearchQuery($q)
	{
		$q->orderBy("plan", "asc");
		return $q;
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
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Api";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Api.MailSettingsSave";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.SaveRelationApi";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
			"actionSave",
			"actionDelete",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSave")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "actionDelete")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}