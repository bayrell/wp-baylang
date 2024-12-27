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
namespace Runtime\WordPress\Admin;
class AppHook extends \Runtime\Web\Hooks\AppHook
{
	const GET_FRAME_PAGE_URL="baylang.constructor::get_frame_page_url";
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::CALL_API_BEFORE);
		$this->register(static::GET_FRAME_PAGE_URL, "get_frame_page_url");
		$this->register(\BayLang\Constructor\Backend\ApiHook::GET_ASSETS_PATH, "get_assets_path");
		$this->register(\BayLang\Constructor\Backend\ApiHook::GET_ASSETS_URL_PATH, "get_assets_url_path");
		$this->register(\BayLang\Constructor\Backend\ApiHook::GET_PROJECT, "get_project");
		$this->register(\BayLang\Constructor\Backend\ApiHook::GET_PROJECT_LIST, "get_project_list");
		$this->register(\BayLang\Constructor\Backend\ApiHook::UPDATE_ASSETS, "update_assets");
	}
	/**
	 * Call api before
	 */
	function call_api_before($params)
	{
		$api_url = "/wp-admin/admin-ajax.php?action=admin_call_api&api_name=" . \Runtime\rtl::toStr(\Runtime\rs::url_encode($params->get("post_data")->get("api_name")));
		$params->set("api_url", $api_url);
	}
	/**
	 * Returns projects list
	 */
	function get_frame_page_url($params)
	{
		$page_url = "/open/widget?widget_name=" . \Runtime\rtl::toStr($params->get("current_widget"));
		$params->set("page_url", $page_url);
	}
	/**
	 * Returns assets path
	 */
	function get_assets_path($params)
	{
		$params->set("path", \Runtime\rs::join_path(\Runtime\Vector::from([$params->get("project")->getPath(),"assets"])));
	}
	/**
	 * Returns assets url path
	 */
	function get_assets_url_path($params)
	{
		$wp_theme_url = "";
		$wp_theme_url = parse_url(get_template_directory_uri(), PHP_URL_PATH);
		$params->set("path", \Runtime\rs::join_path(\Runtime\Vector::from([$wp_theme_url,"assets"])));
	}
	/**
	 * Returns projects list
	 */
	function get_project_list($params)
	{
		$project_folder = "";
		$project_folder = ABSPATH . "/wp-content/themes";
		$items = \BayLang\Helper\Project::readProjects($project_folder);
		$params->set("items", $items);
	}
	/**
	 * Returns projects
	 */
	function get_project($params)
	{
		$project_path = "";
		$project_path = get_template_directory();
		$project = \BayLang\Helper\Project::readProject($project_path);
		$params->set("project", $project);
	}
	/**
	 * Update assets
	 */
	function update_assets($params)
	{
		\Runtime\WordPress\WP_Helper::update_option("app_js_vesion", \Runtime\DateTime::now()->getTimestamp());
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Admin";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Admin.AppHook";
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