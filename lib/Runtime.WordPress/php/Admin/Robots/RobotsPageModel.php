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
namespace Runtime\WordPress\Admin\Robots;

use Runtime\ApiResult;
use Runtime\BaseModel;
use Runtime\Method;
use Runtime\Serializer\MapType;
use Runtime\Serializer\Multiline;
use Runtime\Serializer\ObjectType;
use Runtime\Serializer\StringType;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Form\FormModel;
use Runtime\WordPress\Admin\Robots\RobotsPage;


class RobotsPageModel extends \Runtime\BaseModel
{
	var $component;
	var $form;
	
	
	/**
	 * Serialize object
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("form", new \Runtime\Serializer\ObjectType(new \Runtime\Map([
			"class_name" => "Runtime.Widget.Form.FormModel",
			"item_type" => new \Runtime\Serializer\MapType(new \Runtime\Map([
				"content" => new \Runtime\Serializer\StringType(new \Runtime\Map()),
			])),
		])));
	}
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add form */
		$this->form = $this->createWidget("Runtime.Widget.Form.FormModel");
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => "admin.wordpress.robots",
			"method_name" => "item",
		]));
		if ($result->isSuccess())
		{
			$this->form->item = new \Runtime\Map([
				"content" => $result->data->get("content"),
			]);
		}
	}
	
	
	/**
	 * Save form
	 */
	function onSave()
	{
		$this->form->setWaitMessage();
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => "admin.wordpress.robots",
			"method_name" => "save",
			"data" => new \Runtime\Map([
				"content" => $this->form->item->get("content"),
			]),
		]));
		$this->form->setApiResult($result);
	}
	
	
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle("Robots TXT");
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.WordPress.Admin.Robots.RobotsPage";
		$this->form = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Admin.Robots.RobotsPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}