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

use Runtime\ORM\MySQL\CursorMySQL;
use Runtime\ORM\MySQL\SQLBuilder;


class WP_Cursor extends \Runtime\ORM\MySQL\CursorMySQL
{
	var $num_rows;
	var $rows_affected;
	var $insert_id;
	var $last_result;
	var $last_result_pos;
	var $last_result_sz;
	
	
	/**
	 * Execute sql query
	 */
	function executeSQL($builder)
	{
		/* Get sql */
		$sql = $builder->getSQL();
		$data = $builder->getData();
		global $wpdb;
		
		/* Build sql */
		$sql = $builder->formatSQL();
		
		/* Execute query */
		$return_val = $wpdb->query($sql);
		
		if ($wpdb->last_error != '')
		{
			throw new \Runtime\ORM\Exceptions\OrmException($wpdb->last_error);
		}
		
		$this->num_rows = $wpdb->num_rows;
		$this->rows_affected = $wpdb->rows_affected;
		$this->insert_id = $wpdb->insert_id;
		$this->last_result = $wpdb->last_result;
		$this->last_result_sz = count($this->last_result);
		$this->last_result_pos = 0;
		return $this;
	}
	
	
	/**
	 * Fetch next row
	 */
	function fetchMap()
	{
		if ($this->last_result_pos >= $this->last_result_sz) return null;
		
		$item = $this->last_result[ $this->last_result_pos ];
		$this->last_result_pos = $this->last_result_pos + 1;
		$item = \Runtime\Map::create($item);
		
		return $item;
		return null;
	}
	
	
	/**
	 * Returns affected rows
	 */
	function affectedRows(){ return $this->rows_affected; }
	
	
	/**
	 * Insert id
	 */
	function lastInsertId(){ return $this->insert_id; }
	
	
	/**
	 * Close cursor
	 */
	function close(){ return $this; }
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->num_rows = 0;
		$this->rows_affected = 0;
		$this->insert_id = 0;
		$this->last_result = new \Runtime\Vector();
		$this->last_result_pos = 0;
		$this->last_result_sz = 0;
	}
	static function getClassName(){ return "Runtime.WordPress.Database.ORM.WP_Cursor"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}