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
class MailSearchApi extends \Runtime\Widget\Crud\SearchApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "admin.wordpress.mail.settings.search";
	}
	/**
	 * Returns service
	 */
	function createService()
	{
		return new \Runtime\WordPress\Admin\MailSettings\MailCrudService();
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["id","enable","plan","host","port","login","password","ssl_enable","is_deleted"]);
	}
	/**
	 * Action search
	 */
	function actionSearch()
	{
		parent::actionSearch();
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.MailSettings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.MailSettings.MailSearchApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.SearchApi";
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
			"actionSearch",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSearch")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}