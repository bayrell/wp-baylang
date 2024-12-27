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
class OpDeclareFunction extends \BayLang\OpCodes\BaseOpCode
{
	public $op;
	public $name;
	public $annotations;
	public $comments;
	public $args;
	public $vars;
	public $result_type;
	public $expression;
	public $items;
	public $flags;
	public $is_context;
	public $is_html;
	public $is_html_default_args;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		parent::serialize($serializer, $data);
		$serializer->process($this, "annotations", $data);
		$serializer->process($this, "args", $data);
		$serializer->process($this, "comments", $data);
		$serializer->process($this, "expression", $data);
		$serializer->process($this, "flags", $data);
		$serializer->process($this, "is_context", $data);
		$serializer->process($this, "is_html", $data);
		$serializer->process($this, "is_html_default_args", $data);
		$serializer->process($this, "items", $data);
		$serializer->process($this, "name", $data);
		$serializer->process($this, "result_type", $data);
		$serializer->process($this, "vars", $data);
	}
	/**
	 * Returns true if static function
	 */
	function isStatic()
	{
		return $this->flags != null && ($this->flags->isFlag("static") || $this->flags->isFlag("lambda") || $this->flags->isFlag("pure"));
	}
	/**
	 * Returns true if is flag
	 */
	function isFlag($flag_name)
	{
		return $this->flags != null && $this->flags->isFlag($flag_name);
	}
	/**
	 * Returns function expression
	 */
	function getExpression()
	{
		if ($this->expression != null)
		{
			return $this->expression;
		}
		if (!($this->items instanceof \BayLang\OpCodes\OpItems))
		{
			return null;
		}
		$op_code_item = $this->items->items->get(0);
		if (!($op_code_item instanceof \BayLang\OpCodes\OpReturn))
		{
			return null;
		}
		return $op_code_item->expression;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op = "op_function";
		$this->name = "";
		$this->annotations = null;
		$this->comments = null;
		$this->args = null;
		$this->vars = null;
		$this->result_type = null;
		$this->expression = null;
		$this->items = null;
		$this->flags = null;
		$this->is_context = true;
		$this->is_html = false;
		$this->is_html_default_args = false;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpDeclareFunction";
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