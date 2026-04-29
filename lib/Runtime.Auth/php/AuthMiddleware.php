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
namespace Runtime\Auth;

use Runtime\Exceptions\ApiError;
use Runtime\Exceptions\RuntimeException;
use Runtime\Auth\UserSettings;
use Runtime\Auth\Components\LoginPage\LoginPageModel;
use Runtime\Auth\Providers\AuthProvider;
use Runtime\Web\BaseApi;
use Runtime\Web\Middleware;
use Runtime\Web\RenderContainer;


class AuthMiddleware extends \Runtime\Web\Middleware
{
	/**
	 * Returns provider name
	 */
	function getProviderName(){ return "Runtime.Auth.Providers.AuthProvider"; }
	
	
	/**
	 * Returns user settings
	 */
	function getUserSettings()
	{
		$provider = \Runtime\rtl::getContext()->provider($this->getProviderName());
		return $provider->settings;
	}
	
	
	/**
	 * Run api
	 */
	function api($api)
	{
		/* Get JWT */
		$settings = $this->getUserSettings();
		$jwt = $api->storage->get($settings->getTokenName());
		if ($jwt == null)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Action not allowed"));
		}
	}
	
	
	/**
	 * Run route
	 */
	function route($container)
	{
		/* Get JWT */
		$settings = $this->getUserSettings();
		$jwt = $container->layout->storage->backend->get($settings->getTokenName());
		if ($jwt == null)
		{
			/* Render page */
			$container->changeLayout($settings->getLayout());
			$container->renderPageModel($settings->getLoginPage(), $settings->getModelParams());
			/* Create response */
			$container->createResponse();
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.Auth.AuthMiddleware"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}