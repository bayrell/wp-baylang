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
namespace Runtime\Widget\Form;
class FormSaveStorage extends \Runtime\BaseObject implements \Runtime\Widget\Form\FormStorageInterface
{
	public $api_name;
	public $form;
	function __construct($params=null)
	{
		parent::__construct();
		$this->_assign_values($params);
	}
	/**
	 * Returns api name
	 */
	function getApiName()
	{
		return $this->api_name;
	}
	/**
	 * Returns method name
	 */
	function getMethodName($name)
	{
		if ($name == "load")
		{
			return "actionItem";
		}
		if ($name == "submit")
		{
			return "actionSave";
		}
		return "";
	}
	/**
	 * Set form
	 */
	function setForm($form)
	{
		$this->form = $form;
	}
	/**
	 * Load form
	 */
	function load()
	{
		$post_data = \Runtime\Map::from(["pk"=>$this->form->pk]);
		$post_data = $this->form->mergePostData($post_data, "load");
		$res = $this->form->layout->callApi(\Runtime\Map::from(["api_name"=>$this->getApiName(),"method_name"=>$this->getMethodName("load"),"data"=>$post_data]));
		return $res;
	}
	/**
	 * Submit form
	 */
	function submit()
	{
		$post_data = \Runtime\Map::from(["pk"=>$this->form->pk,"item"=>$this->form->getPostItem()]);
		$post_data = $this->form->mergePostData($post_data, "submit");
		$res = $this->form->layout->callApi(\Runtime\Map::from(["api_name"=>$this->getApiName(),"method_name"=>$this->getMethodName("submit"),"data"=>$post_data]));
		return $res;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->api_name = "";
		$this->form = null;
	}
	static function getNamespace()
	{
		return "Runtime.Widget.Form";
	}
	static function getClassName()
	{
		return "Runtime.Widget.Form.FormSaveStorage";
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