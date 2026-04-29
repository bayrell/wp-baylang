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

use Runtime\DateTime;
use Runtime\Method;
use Runtime\Exceptions\ApiError;
use Runtime\Exceptions\RuntimeException;
use Runtime\Auth\Database\User;
use Runtime\Auth\Models\UserSettings;
use Runtime\Crypt\JWT;
use Runtime\Serializer\MapType;
use Runtime\Serializer\Required;
use Runtime\Serializer\StringType;
use Runtime\Web\BaseApi;
use Runtime\Web\Cookie;
use Runtime\Web\Annotations\ApiMethod;


class LoginApi extends \Runtime\Web\BaseApi
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
	 * Returns data rules
	 */
	function getDataRules($rules)
	{
		$rules->addType("login", new \Runtime\Serializer\Required());
		$rules->addType("login", new \Runtime\Serializer\StringType());
		$rules->addType("password", new \Runtime\Serializer\Required());
		$rules->addType("password", new \Runtime\Serializer\StringType());
	}
	
	
	/**
	 * Action login
	 */
	function actionLogin()
	{
		$this->filterData();
		/* Get credentials */
		$login = $this->data->get("login");
		$password = $this->data->get("password");
		/* Login user */
		$jwt = $this->login($login, $password);
		/* Add cookie */
		$cookie = new \Runtime\Web\Cookie(new \Runtime\Map([
			"name" => $this->settings->getTokenName(),
			"expires" => $jwt->data->get("expires"),
			"value" => $jwt->token,
		]));
		$this->result->addCookie($cookie);
		/* Set result */
		$this->success();
	}
	
	
	/**
	 * Login error
	 */
	function loginError()
	{
		throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Unknown login or password"));
	}
	
	
	/**
	 * Login user
	 */
	function login($login, $password)
	{
		/* Find user */
		$class_name = $this->settings->getRecordName();
		$findUser = new \Runtime\Method($class_name, "findUser");
		$user = $findUser->apply(new \Runtime\Vector($login));
		if (!$user)
		{
			$this->loginError();
		}
		/* Check password */
		if (!$user->checkPassword($password))
		{
			$this->loginError();
		}
		/* Get JWT settings */
		$token_name = $this->settings->getTokenName();
		$jwt_algo = \Runtime\rtl::getContext()->env($token_name . "_jwt_algo");
		$jwt_secret_key = \Runtime\rtl::getContext()->env($token_name . "_jwt_secret_key");
		/* Create JWT */
		$data = $this->getUserData($user);
		$jwt = \Runtime\Crypt\JWT::encode($data, $jwt_secret_key, $jwt_algo ? $jwt_algo : "HS256");
		/* Check token */
		if (!$jwt->isCorrect())
		{
			$this->loginError();
		}
		/* Returns token */
		return $jwt;
	}
	
	
	/**
	 * Returns user data
	 */
	function getUserData($user)
	{
		$data = $user->getTokenData();
		$data->set("expires", \Runtime\DateTime::now()->timestamp() + $this->settings->getTokenExpires());
		return $data;
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->settings = null;
	}
	static function getClassName(){ return "Runtime.Auth.Api.LoginApi"; }
	static function getMethodsList()
	{
		return new \Runtime\Vector("actionLogin");
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionLogin") return new \Runtime\Vector(
			new \Runtime\Web\Annotations\ApiMethod(new \Runtime\Map(["name" => "login"]))
		);
		return null;
	}
}