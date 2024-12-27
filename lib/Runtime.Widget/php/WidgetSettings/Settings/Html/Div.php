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
namespace Runtime\Widget\WidgetSettings\Settings\Html;
class Div extends \Runtime\Widget\WidgetSettings\Settings\ContainerSettings
{
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "Text";
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		return "div";
	}
	/**
	 * Returns model name
	 */
	function getModelName()
	{
		return "";
	}
	/**
	 * Returns selector name
	 */
	function getSelectorName()
	{
		return "container";
	}
	/**
	 * Returns group name
	 */
	function getGroupName()
	{
		return "basic";
	}
	/**
	 * Returns true if is widget settings
	 */
	function checkWidget($widget)
	{
		if ($widget->code::getClassName() != "BayLang.OpCodes.OpHtmlTag")
		{
			return false;
		}
		if (\Runtime\rs::lower($widget->code->tag_name) != "div")
		{
			return false;
		}
		if ($widget->code->items == null)
		{
			return false;
		}
		if ($widget->code->items->items->count() == 0)
		{
			return false;
		}
		$item = $widget->code->items->items->get(0);
		if ($item::getClassName() == "BayLang.OpCodes.OpHtmlContent")
		{
			return true;
		}
		if ($item::getClassName() == "BayLang.OpCodes.OpHtmlValue")
		{
			return true;
		}
		return false;
	}
	/**
	 * Can insert widget
	 */
	function canInsert($widget)
	{
		return true;
	}
	/**
	 * Returns params
	 */
	function getParams()
	{
		return \Runtime\Vector::from([new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterTagName", \Runtime\Map::from(["props"=>\Runtime\Map::from(["show_select_value"=>false,"options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"","value"=>"Text"]),\Runtime\Map::from(["key"=>"h1","value"=>"H1"]),\Runtime\Map::from(["key"=>"h2","value"=>"H2"]),\Runtime\Map::from(["key"=>"h3","value"=>"H3"]),\Runtime\Map::from(["key"=>"h4","value"=>"H4"]),\Runtime\Map::from(["key"=>"h5","value"=>"H5"]),\Runtime\Map::from(["key"=>"p","value"=>"Paragraph"]),\Runtime\Map::from(["key"=>"span","value"=>"Span"])])])])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterRawHtml"),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterContent")]);
	}
	/**
	 * Returns default template
	 */
	function getDefaultTemplate()
	{
		return \Runtime\Map::from(["default"=>function ()
		{
			return \Runtime\Map::from(["content"=>\Runtime\rs::join("\n", \Runtime\Vector::from(["<template>Content</template>"]))]);
		}]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Div";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.ContainerSettings";
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