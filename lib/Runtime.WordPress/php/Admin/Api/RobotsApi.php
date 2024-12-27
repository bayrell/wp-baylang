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
namespace Runtime\WordPress\Admin\Api;
class RobotsApi extends \Runtime\Web\BaseApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "admin.wordpress.robots::save";
	}
	/**
	 * Action item
	 */
	function actionItem()
	{
		$content = \Runtime\WordPress\WP_Helper::get_option("robots.txt");
		$this->result->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["pk"=>true,"item"=>\Runtime\Map::from(["content"=>$content])])]));
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		$__v0 = new \Runtime\Monad($this->post_data);
		$__v0 = $__v0->attr("item");
		$__v0 = $__v0->attr("content");
		$__v0 = $__v0->monad(\Runtime\rtl::m_to("string", ""));
		$content = $__v0->value();
		\Runtime\WordPress\WP_Helper::update_option("robots.txt", $content);
		$this->result->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["pk"=>true,"item"=>\Runtime\Map::from(["content"=>$content])])]));
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin.Api";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.Api.RobotsApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseApi";
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
			"actionItem",
			"actionSave",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionItem")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "actionSave")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}