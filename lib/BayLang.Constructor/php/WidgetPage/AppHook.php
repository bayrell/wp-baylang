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
namespace BayLang\Constructor\WidgetPage;
class AppHook extends \Runtime\Web\Hooks\AppHook
{
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::CALL_API_BEFORE);
		$this->register(static::VUE_MODULES);
	}
	/**
	 * Call api before
	 */
	function call_api_before($params)
	{
		$post_data = $params->get("post_data");
		$service = $post_data->get("service");
		$api_name = $post_data->get("api_name");
		$method_name = $post_data->get("method_name");
		if ($service != "constructor")
		{
			return ;
		}
		$api_url_arr = \Runtime\Vector::from(["api","app",$api_name,$method_name]);
		$api_url_arr = $api_url_arr->filter(function ($s)
		{
			return $s != "";
		});
		$api_url = "/" . \Runtime\rtl::toStr($api_url_arr->join("/")) . \Runtime\rtl::toStr("/");
		$params->set("api_url", $api_url);
	}
	/**
	 * Init vue app
	 */
	function vue_modules($params)
	{
		$registerComponent = null;
		$vue_app = $params->get("vue");
		$vue_app->use($registerComponent());
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.WidgetPage";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.WidgetPage.AppHook";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.Hooks.AppHook";
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