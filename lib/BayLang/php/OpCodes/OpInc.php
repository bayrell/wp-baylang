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
class OpInc extends \BayLang\OpCodes\BaseOpCode
{
	const KIND_PRE_INC="pre_inc";
	const KIND_PRE_DEC="pre_dec";
	const KIND_POST_INC="post_inc";
	const KIND_POST_DEC="post_dec";
	public $op;
	public $kind;
	public $value;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		parent::serialize($serializer, $data);
		$serializer->process($this, "kind", $data);
		$serializer->process($this, "value", $data);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op = "op_inc";
		$this->kind = "";
		$this->value = null;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpInc";
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