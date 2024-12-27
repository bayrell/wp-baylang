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
namespace BayLang\OpCodes;
class OpFlags extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	public $p_async;
	public $p_export;
	public $p_static;
	public $p_const;
	public $p_public;
	public $p_private;
	public $p_protected;
	public $p_declare;
	public $p_serializable;
	public $p_cloneable;
	public $p_assignable;
	public $p_memorize;
	public $p_multiblock;
	public $p_lambda;
	public $p_pure;
	public $p_props;
	function __construct($params=null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "p_assignable", $data);
		$serializer->process($this, "p_async", $data);
		$serializer->process($this, "p_cloneable", $data);
		$serializer->process($this, "p_const", $data);
		$serializer->process($this, "p_declare", $data);
		$serializer->process($this, "p_export", $data);
		$serializer->process($this, "p_lambda", $data);
		$serializer->process($this, "p_memorize", $data);
		$serializer->process($this, "p_multiblock", $data);
		$serializer->process($this, "p_private", $data);
		$serializer->process($this, "p_props", $data);
		$serializer->process($this, "p_protected", $data);
		$serializer->process($this, "p_public", $data);
		$serializer->process($this, "p_pure", $data);
		$serializer->process($this, "p_serializable", $data);
		$serializer->process($this, "p_static", $data);
	}
	/**
	 * Read is Flag
	 */
	function isFlag($name)
	{
		if (!\BayLang\OpCodes\OpFlags::hasFlag($name))
		{
			return false;
		}
		return \Runtime\rtl::attr($this, "p_" . \Runtime\rtl::toStr($name));
	}
	/**
	 * Get flags
	 */
	static function getFlags()
	{
		return \Runtime\Vector::from(["async","export","static","const","public","private","declare","protected","serializable","cloneable","assignable","memorize","multiblock","pure","props"]);
	}
	/**
	 * Get flags
	 */
	static function hasFlag($flag_name)
	{
		if ($flag_name == "async" || $flag_name == "export" || $flag_name == "static" || $flag_name == "const" || $flag_name == "public" || $flag_name == "private" || $flag_name == "declare" || $flag_name == "protected" || $flag_name == "serializable" || $flag_name == "cloneable" || $flag_name == "assignable" || $flag_name == "memorize" || $flag_name == "multiblock" || $flag_name == "lambda" || $flag_name == "pure" || $flag_name == "props")
		{
			return true;
		}
		return false;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->p_async = false;
		$this->p_export = false;
		$this->p_static = false;
		$this->p_const = false;
		$this->p_public = false;
		$this->p_private = false;
		$this->p_protected = false;
		$this->p_declare = false;
		$this->p_serializable = false;
		$this->p_cloneable = false;
		$this->p_assignable = false;
		$this->p_memorize = false;
		$this->p_multiblock = false;
		$this->p_lambda = false;
		$this->p_pure = false;
		$this->p_props = false;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpFlags";
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