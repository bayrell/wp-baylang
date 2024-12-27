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
class WP_SQLBuilder extends \Runtime\ORM\MySQL\SQLBuilder
{
	/**
	 * Format key
	 */
	function formatKey($key)
	{
		return ":" . \Runtime\rtl::toStr($key) . \Runtime\rtl::toStr(":");
	}
	/**
	 * Escape value
	 */
	function prepare_value($value, $op)
	{
		global $wpdb;
		$op = strtolower($op);
		
		if ($op == "like") $value = $wpdb->esc_like( $value );
		else if ($op == "%like%")
		{
			$value = "%" . $wpdb->esc_like( $value ) . "%";
			$op = "like";
		}
		else if ($op == "%like")
		{
			$value = "%" . $wpdb->esc_like( $value );
			$op = "like";
		}
		else if ($op == "like%")
		{
			$value = $wpdb->esc_like( $value ) . "%";
			$op = "like";
		}
		return \Runtime\Vector::from([$value,$op]);
	}
	/**
	 * Quote
	 */
	function quote($value)
	{
		$value = "'" . esc_sql($value) . "'";
		/*$value = "'" . json_encode($value) . "'";*/
		return $value;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.ORM";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.ORM.WP_SQLBuilder";
	}
	static function getParentClassName()
	{
		return "Runtime.ORM.MySQL.SQLBuilder";
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