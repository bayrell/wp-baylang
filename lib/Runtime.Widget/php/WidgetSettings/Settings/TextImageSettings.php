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
namespace Runtime\Widget\WidgetSettings\Settings;
class TextImageSettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "TextImage";
	}
	/**
	 * Returns alias name
	 */
	function getAliasName()
	{
		return "TextImage";
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		return "Runtime.Widget.TextImage";
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
		return "text_image";
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
		return \Runtime\Vector::from([new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"kind","label"=>"Kind","component"=>"Runtime.Widget.Select","default"=>"text_right","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"text_right","value"=>"Text right"]),\Runtime\Map::from(["key"=>"text_left","value"=>"Text left"]),\Runtime\Map::from(["key"=>"text_top","value"=>"Text top"]),\Runtime\Map::from(["key"=>"text_bottom","value"=>"Text bottom"])])])])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"image","label"=>"Image","component"=>"BayLang.Constructor.Frontend.Components.SelectImageButton"])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"content","label"=>"Content","component"=>"Runtime.Widget.TextEditable"]))]);
	}
	/**
	 * Returns default template
	 */
	function getDefaultTemplate()
	{
		return \Runtime\Map::from(["default"=>function ()
		{
			return \Runtime\Map::from(["content"=>\Runtime\rs::join("\n", \Runtime\Vector::from(["<use name='Runtime.Widget.Image' component='true' />","<use name='Runtime.Widget.Text' component='true' />","<style>","%(TextImage)widget_text_image{","\t&__image{","\t}","\t&__text{","\t}","}","</style>"]))]);
		}]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.TextImageSettings";
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