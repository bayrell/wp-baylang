<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Auth\Components\LoginPage;

use Runtime\BaseModel;
use Runtime\Serializer\ObjectType;
use Runtime\Auth\Components\LoginPage\LoginPage;
use Runtime\Auth\Models\UserSettings;
use Runtime\Web\RedirectResponse;
use Runtime\Web\RenderContainer;
use Runtime\Widget\Input;
use Runtime\Widget\Form\FormMessage;
use Runtime\Widget\Form\FormSubmitModel;


class LoginPageModel extends \Runtime\BaseModel
{
	var $component;
	var $user_settings;
	var $login_form;
	
	
	/**
	 * Process frontend data
	 */
	static function serialize($rules)
	{
		parent::serialize($rules);
		$rules->addType("user_settings", new \Runtime\Serializer\ObjectType(new \Runtime\Map([
			"autocreate" => true,
			"class_extends" => "Runtime.Auth.Models.UserSettings",
		])));
	}
	
	
	/**
	 * Init widget settings
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("user_settings"))
		{
			$this->user_settings = $params->get("user_settings");
			if ($this->user_settings instanceof \Runtime\Map)
			{
				$this->user_settings = $this->filter("user_settings", $this->user_settings);
			}
		}
	}
	
	
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Add login form */
		$this->login_form = $this->createWidget("Runtime.Widget.Form.FormSubmitModel", new \Runtime\Map([
			"api_name" => $this->user_settings->getApiName(),
			"method_name" => "login",
			"fields" => new \Runtime\Vector(
				new \Runtime\Map([
					"name" => "login",
					"label" => "Login",
					"component" => "Runtime.Widget.Input",
				]),
				new \Runtime\Map([
					"name" => "password",
					"label" => "Password",
					"component" => "Runtime.Widget.Input",
					"props" => new \Runtime\Map([
						"type" => "password",
					]),
				]),
			),
			"submit_button" => new \Runtime\Map([
				"text" => "Login",
				"styles" => new \Runtime\Vector("primary", "stretch"),
			]),
			"events" => new \Runtime\Map([
				"submit" => new \Runtime\Method($this, "onSubmit"),
			]),
		]));
	}
	
	
	/**
	 * Submit
	 */
	function onSubmit($message)
	{
		if ($message->result->isSuccess())
		{
			$redirect_url = $this->user_settings->getMainPage($this->layout);
			$document->location = $redirect_url;
		}
	}
	
	
	/**
	 * Load data
	 */
	function loadData($container)
	{
		$jwt = $this->layout->storage->backend->get($this->user_settings->getTokenName());
		if ($jwt == null) return;
		/* Redirect to main page if user is login */
		$redirect_code = 302;
		$redirect_url = $this->user_settings->getMainPage($this->layout);
		if ($redirect_url == "") $redirect_url = "/";
		$container->setResponse(new \Runtime\Web\RedirectResponse($redirect_url, $redirect_code));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Auth.Components.LoginPage.LoginPage";
		$this->user_settings = null;
		$this->login_form = null;
	}
	static function getClassName(){ return "Runtime.Auth.Components.LoginPage.LoginPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}