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
namespace Runtime\WordPress\Theme\WidgetSettings\Gallery;
class GallerySettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "Gallery";
	}
	/**
	 * Returns alias name
	 */
	function getAliasName()
	{
		return "WP_Gallery";
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		return "Runtime.WordPress.Theme.Components.Gallery.Gallery";
	}
	/**
	 * Returns model name
	 */
	function getModelName()
	{
		return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel";
	}
	/**
	 * Returns selector name
	 */
	function getSelectorName()
	{
		return "gallery";
	}
	/**
	 * Returns group name
	 */
	function getGroupName()
	{
		return "widget";
	}
	/**
	 * Returns true if model
	 */
	function isModel()
	{
		return false;
	}
	/**
	 * Returns true if is widget settings
	 */
	function checkWidget($widget)
	{
		if (!$widget->isComponent())
		{
			return false;
		}
		if ($widget->component_class_name != $this->getComponentName())
		{
			return false;
		}
		return true;
	}
	/**
	 * Can insert widget
	 */
	function canInsert($widget)
	{
		return false;
	}
	/**
	 * Returns params
	 */
	function getParams()
	{
		return \Runtime\Vector::from([]);
	}
	/**
	 * Returns default template
	 */
	function getDefaultTemplate()
	{
		return \Runtime\Map::from(["default"=>function ()
		{
			return \Runtime\Map::from(["content"=>\Runtime\rs::join("\n", \Runtime\Vector::from(["<style>","%(WP_Gallery)widget_gallery{","\t&__item{","\t\tmargin: 35px;","\t}","\t&__item_title{","\t}","\t&__item_image{","\t\timg{","\t\t\tmax-width: 300px;","\t\t\tmax-height: 300px","\t\t}","\t}","}","</style>"]))]);
		}]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Gallery";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.WidgetSettings.Gallery.GallerySettings";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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