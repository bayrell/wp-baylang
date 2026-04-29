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

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Serializer\DateTimeType;
use Runtime\Serializer\IntegerType;
use Runtime\Serializer\MapType;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Table\TableModel;
use Runtime\Widget\Table\TableLoader;
use Runtime\WordPress\Admin\MailLog\MailLogPage;


class MailLogPageModel extends \Runtime\BaseModel
{
	var $component;
	var $table;
	var $loader;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("table", new \Runtime\Serializer\ObjectType(new \Runtime\Map([
			"class_name" => "Runtime.Widget.Table.TableModel",
			"item_rules" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"id" => new \Runtime\Serializer\IntegerType(),
				"worker" => new \Runtime\Serializer\StringType(),
				"plan" => new \Runtime\Serializer\StringType(),
				"status" => new \Runtime\Serializer\IntegerType(),
				"dest" => new \Runtime\Serializer\StringType(),
				"title" => new \Runtime\Serializer\StringType(),
				"message" => new \Runtime\Serializer\StringType(),
				"send_email_error" => new \Runtime\Serializer\StringType(),
				"gmtime_send" => new \Runtime\Serializer\DateTimeType(),
			])),
		])));
	}
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$this->table = $this->createWidget("Runtime.Widget.Table.TableModel");
		$this->loader = $this->createWidget("Runtime.Widget.Table.TableLoader", new \Runtime\Map([
			"table" => $this->table,
			"api_name" => "admin.wordpress.mail.log.search",
			"method_name" => "search",
			"page_name" => "p",
		]));
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		$this->loader->loadData($container);
	}
	
	
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Mail log");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.MailLog.MailLogPage";
		$this->table = null;
		$this->loader = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.MailLog.MailLogPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}