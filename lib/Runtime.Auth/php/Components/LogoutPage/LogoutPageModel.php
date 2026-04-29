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
namespace Runtime\Auth\Components\LogoutPage;

use Runtime\BaseModel;
use Runtime\Serializer\ObjectType;
use Runtime\Auth\Components\LogoutPage\LogoutPage;
use Runtime\Auth\Models\UserSettings;
use Runtime\Web\ApiResult;
use Runtime\Widget\ResultModel;


class LogoutPageModel extends \Runtime\BaseModel
{
	var $component;
	var $user_settings;
	var $result;
	
	
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
		$this->result = $this->createWidget("Runtime.Widget.ResultModel", new \Runtime\Map([
			"widget_name" => "result",
			"styles" => new \Runtime\Vector("margin_top"),
		]));
	}
	
	
	/**
	 * Logout
	 */
	function logout()
	{
		$this->result->setWaitMessage();
		$result = $this->layout->sendApi(new \Runtime\Map([
			"api_name" => $this->user_settings->getApiName(),
			"method_name" => "logout",
		]));
		$this->result->setApiResult($result);
		/* If success */
		if ($result->isSuccess())
		{
			$redirect_url = $this->user_settings->getMainPage($this->layout);
			if ($redirect_url == "") $redirect_url = "/";
			$document->location = $redirect_url;
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->component = "Runtime.Auth.Components.LogoutPage.LogoutPage";
		$this->user_settings = null;
		$this->result = null;
	}
	static function getClassName(){ return "Runtime.Auth.Components.LogoutPage.LogoutPageModel"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}