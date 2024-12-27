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
namespace Runtime\WordPress\ORM;
class WP_Factory extends \Runtime\ORM\Factory\ConnectionFactory
{
	function __construct()
	{
		parent::__construct();
	}
	/**
	 * Register connections
	 */
	function registerConnections($provider)
	{
		global $wpdb;
		
		/* Add default connection */
		$conn = new \Runtime\WordPress\ORM\WP_Connection("prefix");
		$conn->prefix = $wpdb->prefix;
		$provider->addConnection($conn);
		
		/* Add base connection */
		$conn = new \Runtime\WordPress\ORM\WP_Connection("default");
		$conn->prefix = $wpdb->base_prefix;
		$provider->addConnection($conn);
		
		/* Add no prefix connection */
		$conn = new \Runtime\WordPress\ORM\WP_Connection("no_prefix");
		$provider->addConnection($conn);
	}
	/* ======================= Class Init Functions ======================= */
	function takeValue($k,$d=null)
	{
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.ORM";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.ORM.WP_Factory";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.Factory.ConnectionFactory";
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