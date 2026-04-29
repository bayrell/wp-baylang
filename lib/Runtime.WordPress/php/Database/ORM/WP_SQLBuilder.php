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
namespace Runtime\WordPress\Database\ORM;

use Runtime\ORM\MySQL\SQLBuilder;

class WP_SQLBuilder extends \Runtime\ORM\MySQL\SQLBuilder
{
	/**
	 * Format key
	 */
	function formatKey($key){ return ":" . $key . ":"; }
	
	
	/**
	 * Escape value
	 */
	function prepareValue($value, $op)
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
		return new \Runtime\Vector($value, $op);
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
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Database.ORM.WP_SQLBuilder"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}