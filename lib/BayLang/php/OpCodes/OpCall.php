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
class OpCall extends \BayLang\OpCodes\BaseOpCode
{
	public $op;
	public $obj;
	public $args;
	public $is_await;
	public $is_context;
	public $is_html;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		parent::serialize($serializer, $data);
		$serializer->process($this, "args", $data);
		$serializer->process($this, "is_await", $data);
		$serializer->process($this, "is_context", $data);
		$serializer->process($this, "is_html", $data);
		$serializer->process($this, "obj", $data);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op = "op_call";
		$this->obj = null;
		$this->args = null;
		$this->is_await = false;
		$this->is_context = true;
		$this->is_html = false;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpCall";
	}
	static function getParentClassName()
	{
		return "BayLang.OpCodes.BaseOpCode";
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