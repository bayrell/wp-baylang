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
namespace Runtime;
class Callback
{
	public $obj;
	public $name;
	public $tag;
	function __construct($obj, $name, $tag=null)
	{
		/* Init object */
		$this->_init();
		/* Set variables */
		$this->obj = $obj;
		$this->name = $name;
		$this->tag = $tag;
	}
	/**
	 * Check if method exists
	 */
	function exists()
	{
		if (!\Runtime\rtl::method_exists($this->obj, $this->name))
		{
			return false;
		}
		return true;
	}
	/**
	 * Check callback
	 */
	function check()
	{
		if (!$this->exists())
		{
			throw new \Runtime\Exceptions\RuntimeException("Method '" . \Runtime\rtl::toStr($this->name) . \Runtime\rtl::toStr("' not found in ") . \Runtime\rtl::toStr(\Runtime\rtl::get_class_name($this->obj)));
		}
	}
	/**
	 * Apply
	 */
	function apply($args=null)
	{
		$this->check();
		if ($args == null) $args = [];
		else if ($args instanceof \Runtime\Collection) $args = $args->_arr;
		
		$obj = $this->obj;
		if (gettype($obj) == "string") $obj = rtl::find_class($obj);
		return call_user_func_array([$obj, $this->name], $args);
	}
	function __invoke()
	{
		return $this->apply(func_get_args());
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		$this->obj = null;
		$this->name = null;
		$this->tag = null;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.Callback";
	}
	static function getParentClassName()
	{
		return "";
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