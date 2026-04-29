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
namespace Runtime\Auth\Api;

use Runtime\Auth\Components\UserSettings;
use Runtime\Auth\Service\UserService;
use Runtime\Web\BaseApi;
use Runtime\Web\Cookie;
use Runtime\Web\Annotations\ApiMethod;


class LogoutApi extends \Runtime\Web\BaseApi
{
	var $settings;
	
	
	/**
	 * Returns api name
	 */
	static function getApiName(){ return ""; }
	
	
	/**
	 * Setup params
	 */
	function initParams($params)
	{
		parent::initParams($params);
		if ($params == null) return;
		if ($params->has("settings")) $this->settings = $params->get("settings");
	}
	
	
	/**
	 * Action logout
	 */
	function actionLogout()
	{
		/* Clear cookie */
		$cookie = new \Runtime\Web\Cookie(new \Runtime\Map([
			"name" => $this->settings->getTokenName(),
			"expires" => 0,
			"value" => "",
		]));
		$this->result->addCookie($cookie);
		/* Set result */
		$this->success();
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->settings = null;
	}
	static function getClassName(){ return "Runtime.Auth.Api.LogoutApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionLogout");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionLogout") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "logout"]))
		);
		return null;
	}
}