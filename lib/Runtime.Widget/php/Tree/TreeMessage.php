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
namespace Runtime\Widget\Tree;
class TreeMessage extends \Runtime\Web\Messages\Message
{
	public $kind;
	public $dest;
	public $new_src_path;
	public $path;
	public $src;
	public $result;
	public $dest_item;
	public $dest_parent_item;
	public $item;
	public $src_item;
	public $src_parent_item;
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->kind = null;
		$this->dest = null;
		$this->new_src_path = null;
		$this->path = null;
		$this->src = null;
		$this->result = null;
		$this->dest_item = null;
		$this->dest_parent_item = null;
		$this->item = null;
		$this->src_item = null;
		$this->src_parent_item = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Tree";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Tree.TreeMessage";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Messages.Message";
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