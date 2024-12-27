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
namespace Runtime\WordPress;
class WP_App extends \Runtime\Web\BaseApp
{
	/**
	 * Read POST
	 */
	function readPost()
	{
		$content_type = isset($_SERVER['HTTP_CONTENT_TYPE']) ?
			$_SERVER['HTTP_CONTENT_TYPE'] : "";
		if (substr($content_type, 0, strlen('application/json')) == 'application/json')
		{
			$json = file_get_contents("php://input");
			$json = @json_decode($json, true);
			return $json;
		}
		
		$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : "";
		if ($method == "POST")
		{
			return stripslashes_deep($_POST);
		}
		
		return null;
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.WP_App";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseApp";
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