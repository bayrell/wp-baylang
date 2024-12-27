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
class OpHtmlTag extends \BayLang\OpCodes\BaseOpCode
{
	public $op;
	public $tag_name;
	public $op_code_name;
	public $attrs;
	public $spreads;
	public $items;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		parent::serialize($serializer, $data);
		$serializer->process($this, "attrs", $data);
		$serializer->process($this, "items", $data);
		$serializer->process($this, "op_code_name", $data);
		$serializer->process($this, "spreads", $data);
		$serializer->process($this, "tag_name", $data);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op = "op_html_tag";
		$this->tag_name = "";
		$this->op_code_name = null;
		$this->attrs = null;
		$this->spreads = null;
		$this->items = null;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpHtmlTag";
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