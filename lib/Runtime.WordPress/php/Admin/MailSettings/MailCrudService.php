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
class MailCrudService extends \Runtime\Widget\Crud\RelationService
{
	/**
	 * Returns relation name
	 */
	function getRelationName()
	{
		return "Runtime.WordPress.Database.MailSettings";
	}
	/**
	 * Init rules
	 */
	function initRules()
	{
		$this->rules->addRules(\Runtime\Vector::from([new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"plan"])),new \Runtime\Widget\Crud\Rules\Unique(\Runtime\Map::from(["keys"=>\Runtime\Vector::from(["plan"])]))]));
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from(["enable","plan","host","port","login","password","ssl_enable"]);
	}
	/**
	 * Build search query
	 */
	function buildSearchQuery($q)
	{
		$q->orderBy("plan", "asc");
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.MailSettings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.MailSettings.MailCrudService";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.RelationService";
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
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}