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
class AssetHook extends \Runtime\Web\Hooks\AppHook
{
	public $assets_path;
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::ASSETS);
		$this->register(static::CREATE_LAYOUT);
		$this->register(static::IMPORT_CONTAINER_DATA_AFTER);
	}
	/**
	 * Create layout
	 */
	function create_layout($params)
	{
		$template_path = parse_url(get_template_directory_uri(), PHP_URL_PATH);
		$this->assets_path = \Runtime\rs::join_path(
			new \Runtime\Collection($template_path, "assets")
		);
		$params->get("container")->layout->widgets->set("assets_path", $this->assets_path);
	}
	/**
	 * Import data after
	 */
	function import_container_data_after($params)
	{
		$this->assets_path = $params->get("container")->layout->widgets->get("assets_path");
	}
	/**
	 * Assets
	 */
	function assets($params)
	{
		$params->set("assets_path", $this->assets_path);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->assets_path = "";
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.AssetHook";
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