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
namespace Runtime\WordPress\Admin\MailLog;

use Runtime\ORM\Query;
use Runtime\Web\ApiResult;
use Runtime\Web\ApiRequest;
use Runtime\Web\Annotations\ApiMethod;
use Runtime\Widget\Api\SearchApi;
use Runtime\WordPress\Admin\AdminMiddleware;
use Runtime\WordPress\Database\MailDelivery;


class MailLogSearchApi extends \Runtime\Widget\Api\SearchApi
{
	/**
	 * Returns api name
	 */
	static function getApiName(){ return "admin.wordpress.mail.log.search"; }
	
	
	/**
	 * Returns record name
	 */
	static function getRecordName(){ return "Runtime.WordPress.Database.MailDelivery"; }
	
	
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
	 * Returns item fields
	 */
	function getItemFields($action)
	{
		return new \Runtime\Vector(
			"id",
			"worker",
			"plan",
			"status",
			"dest",
			"uuid",
			"title",
			"message",
			"gmtime_plan",
			"gmtime_send",
			"send_email_error",
			"send_email_code",
			"gmtime_add",
			"is_deleted",
		);
	}
	
	
	/**
	 * Build query
	 */
	function buildQuery($q)
	{
		$q->orderBy("gmtime_add", "desc");
	}
	
	
	/**
	 * Action search
	 */
	function actionSearch()
	{
		parent::actionSearch();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.MailLog.MailLogSearchApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionSearch");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSearch") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "search"]))
		);
		return null;
	}
}