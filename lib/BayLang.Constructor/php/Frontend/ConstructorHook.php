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
namespace BayLang\Constructor\Frontend;
class ConstructorHook extends \Runtime\BaseHook
{
	const GET_FRAME_PAGE_URL="baylang.constructor::get_frame_page_url";
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(static::GET_FRAME_PAGE_URL);
	}
	/**
	 * Returns method name by hook name
	 */
	function getMethodName($hook_name)
	{
		if ($hook_name == static::GET_FRAME_PAGE_URL)
		{
			return "get_frame_page_url";
		}
		return "";
	}
	/**
	 * Returns projects list
	 */
	static function getFramePageUrl($project_id, $current_widget)
	{
		$result = \Runtime\rtl::getContext()->callHook(static::GET_FRAME_PAGE_URL, \Runtime\Map::from(["page_url"=>"","project_id"=>$project_id,"current_widget"=>$current_widget]));
		return $result->get("page_url");
	}
	/**
	 * Returns projects list
	 */
	function get_frame_page_url($params)
	{
		$page_url = "/project/" . \Runtime\rtl::toStr($params->get("project_id")) . \Runtime\rtl::toStr("/iframe/open/widget?widget_name=") . \Runtime\rtl::toStr($params->get("current_widget"));
		$params->set("page_url", $page_url);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.ConstructorHook";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseHook";
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