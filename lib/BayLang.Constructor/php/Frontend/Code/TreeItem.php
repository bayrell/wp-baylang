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
namespace BayLang\Constructor\Frontend\Code;
class TreeItem extends \Runtime\Widget\Tree\TreeItem
{
	public $kind;
	public $file_path;
	public $module_id;
	public $project_id;
	public $content;
	public $code_editor;
	public $is_loaded;
	/**
	 * Serialize object
	 */
	function serialize($serializer, $data)
	{
		$serializer->process($this, "kind", $data);
		$serializer->process($this, "file_path", $data);
		$serializer->process($this, "module_id", $data);
		$serializer->process($this, "project_id", $data);
		$serializer->process($this, "is_loaded", $data);
		parent::serialize($serializer, $data);
	}
	/**
	 * Returns true if loaded
	 */
	function isLoaded()
	{
		return $this->is_loaded;
	}
	/**
	 * Click
	 */
	function onClick($model)
	{
		if ($this->kind != "dir")
		{
			return ;
		}
		if ($this->is_loaded)
		{
			$this->open = !$this->open;
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->kind = "";
		$this->file_path = "";
		$this->module_id = "";
		$this->project_id = "";
		$this->content = "";
		$this->code_editor = new \Runtime\Reference();
		$this->is_loaded = false;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Code";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Code.TreeItem";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Tree.TreeItem";
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