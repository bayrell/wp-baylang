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
namespace Runtime\WordPress\Theme;
class Robots extends \Runtime\Web\BaseRoute
{
	/**
	 * Returns routes
	 */
	static function getRoutes()
	{
		return \Runtime\Vector::from([new \Runtime\Web\RouteAction(\Runtime\Map::from(["uri"=>"/robots.txt","name"=>"site:robots","action"=>"actionIndex"]))]);
	}
	/**
	 * Action index
	 */
	function actionIndex($container)
	{
		$content = \Runtime\WordPress\WP_Helper::get_option("robots.txt");
		/* Create response */
		$response = new \Runtime\Web\Response();
		$response->content = $content;
		$response->headers->set("Content-Type", "text/plain; charset=UTF-8");
		/* Set response */
		$container->setResponse($response);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.Robots";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseRoute";
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