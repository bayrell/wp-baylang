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
class OpDeclareClass extends \BayLang\OpCodes\BaseOpCode
{
	const KIND_CLASS="class";
	const KIND_STRUCT="struct";
	const KIND_INTERFACE="interface";
	public $op;
	public $kind;
	public $name;
	public $extend_name;
	public $annotations;
	public $comments;
	public $template;
	public $flags;
	public $fn_create;
	public $fn_destroy;
	public $class_extends;
	public $class_implements;
	public $vars;
	public $functions;
	public $items;
	public $is_abstract;
	public $is_static;
	public $is_declare;
	public $is_component;
	public $is_model;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		parent::serialize($serializer, $data);
		$serializer->process($this, "annotations", $data);
		$serializer->process($this, "class_extends", $data);
		$serializer->process($this, "class_implements", $data);
		$serializer->process($this, "comments", $data);
		$serializer->process($this, "extend_name", $data);
		$serializer->process($this, "flags", $data);
		$serializer->process($this, "fn_create", $data);
		$serializer->process($this, "fn_destroy", $data);
		$serializer->process($this, "functions", $data);
		$serializer->process($this, "is_abstract", $data);
		$serializer->process($this, "is_component", $data);
		$serializer->process($this, "is_declare", $data);
		$serializer->process($this, "is_model", $data);
		$serializer->process($this, "items", $data);
		$serializer->process($this, "kind", $data);
		$serializer->process($this, "name", $data);
		$serializer->process($this, "template", $data);
		$serializer->process($this, "vars", $data);
	}
	/**
	 * Find function
	 */
	function findFunction($name)
	{
		return $this->items->findItem(function ($op_code) use (&$name)
		{
			return $op_code instanceof \BayLang\OpCodes\OpDeclareFunction && $op_code->name == $name;
		});
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->op = "op_class";
		$this->kind = "";
		$this->name = "";
		$this->extend_name = "";
		$this->annotations = null;
		$this->comments = null;
		$this->template = null;
		$this->flags = null;
		$this->fn_create = null;
		$this->fn_destroy = null;
		$this->class_extends = null;
		$this->class_implements = null;
		$this->vars = null;
		$this->functions = null;
		$this->items = null;
		$this->is_abstract = false;
		$this->is_static = false;
		$this->is_declare = false;
		$this->is_component = false;
		$this->is_model = false;
	}
	static function getNamespace()
	{
		return "BayLang.OpCodes";
	}
	static function getClassName()
	{
		return "BayLang.OpCodes.OpDeclareClass";
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