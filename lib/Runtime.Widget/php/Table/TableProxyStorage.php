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
namespace Runtime\Widget\Table;
class TableProxyStorage extends \Runtime\BaseObject implements \Runtime\Widget\Table\TableStorageInterface
{
	public $container;
	public $path;
	public $table;
	function __construct($params=null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	/**
	 * Set table
	 */
	function setTable($table)
	{
		$this->table = $table;
	}
	/**
	 * Returns items
	 */
	function getItems()
	{
		return \Runtime\rtl::attr($this->container, $this->path);
	}
	/**
	 * Load form
	 */
	function load()
	{
		/* Success result */
		$res = new \Runtime\Web\ApiResult();
		$res->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["items"=>$this->getItems(),"page"=>0,"pages"=>1])]));
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->container = null;
		$this->path = null;
		$this->table = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Table";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Table.TableProxyStorage";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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