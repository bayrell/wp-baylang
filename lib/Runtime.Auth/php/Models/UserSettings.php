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
namespace Runtime\Auth\Models;

use Runtime\BaseLayout;
use Runtime\BaseObject;
use Runtime\SerializeInterface;
use Runtime\Entity\Factory;
use Runtime\Entity\Provider;
use Runtime\Auth\Api\LoginApi;
use Runtime\Auth\Api\LogoutApi;
use Runtime\Auth\Components\LoginPage\LoginPageModel;
use Runtime\Auth\Components\LogoutPage\LogoutPageModel;
use Runtime\Auth\Database\User;
use Runtime\Auth\Models\UserData;
use Runtime\Web\BaseLayoutModel;
use Runtime\Web\RouteInfo;
use Runtime\Web\RouteModel;


class UserSettings extends \Runtime\BaseObject implements \Runtime\SerializeInterface
{
	/**
	 * Returns api name
	 */
	function getApiName(){ return "app:auth"; }
	
	
	/**
	 * Returns token name
	 */
	function getTokenName(){ return "auth"; }
	
	
	/**
	 * Returns url name
	 */
	function getUrlName(){ return "auth"; }
	
	
	/**
	 * Returns token expires
	 */
	function getTokenExpires(){ return 30 * 24 * 60 * 60; }
	
	
	/**
	 * Get layout
	 */
	function getLayout(){ return "default"; }
	
	
	/**
	 * Returns main page
	 */
	function getMainPage($layout){ return ""; }
	
	
	/**
	 * Returns login page
	 */
	function getLoginPage(){ return "Runtime.Auth.Components.LoginPage.LoginPageModel"; }
	
	
	/**
	 * Returns logout page
	 */
	function getLogoutPage(){ return "Runtime.Auth.Components.LogoutPage.LogoutPageModel"; }
	
	
	/**
	 * Returns login api
	 */
	function getLoginApi(){ return "Runtime.Auth.Api.LoginApi"; }
	
	
	/**
	 * Returns logout api
	 */
	function getLogoutApi(){ return "Runtime.Auth.Api.LogoutApi"; }
	
	
	/**
	 * Returns model params
	 */
	function getModelParams()
	{
		return new \Runtime\Map([
			"user_settings" => $this,
		]);
	}
	
	
	/**
	 * Returns login route
	 */
	function getLoginRoute()
	{
		return new \Runtime\Web\RouteModel(new \Runtime\Map([
			"uri" => "/{lang}/login",
			"name" => $this->getUrlName() . ":login",
			"model" => $this->getLoginPage(),
			"model_params" => $this->getModelParams(),
		]));
	}
	
	
	/**
	 * Returns logout route
	 */
	function getLogoutRoute()
	{
		return new \Runtime\Web\RouteModel(new \Runtime\Map([
			"uri" => "/{lang}/logout",
			"name" => $this->getUrlName() . ":logout",
			"model" => $this->getLogoutPage(),
			"model_params" => $this->getModelParams(),
		]));
	}
	
	
	/**
	 * Returns user data
	 */
	function getUserData($layout){ return $layout->get($this->getTokenName()); }
	/**
	 * Returns user record name
	 */
	function getRecordName(){ return "Runtime.Auth.Database.User"; }
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.Auth.Models.UserSettings"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}