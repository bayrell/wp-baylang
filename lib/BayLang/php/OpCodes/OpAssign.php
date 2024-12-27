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
class OpAssign extends \BayLang\OpCodes\BaseOpCode
{
	const KIND_ASSIGN="assign";
	const KIND_DECLARE="declare";
	const KIND_STRUCT="struct";
	public $kind;
	public $var_name;
	public $flags;
	public $pattern;
	public $annotations;
	public $comments;
	public $values;
	public $names;
	public $expression;
	public $condition;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		parent::serialize($serializer, $data);
		$serializer->process($this, "annotations", $data);
		$serializer->process($this, "comments", $data);
		$serializer->process($this, "condition", $data);
		$serializer->process($this, "expression", $data);
		$serializer->process($this, "flags", $data);
		$serializer->process($this, "kind", $data);
		$serializer->process($this, "names", $data);
		$serializer->process($this, "pattern", $data);
		$serializer->process($this, "values", $data);
		$serializer->process($this, "var_name", $data);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->kind = "";
		$this->var_name = "";
		$this->flags = null;
		$this->pattern = null;
		$this->annotations = null;
		$this->comments = null;
		$this->values = null;
		$this->names = null;
		$this->expression = null;
		$this->condition = null;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpAssign";
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