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
class SectionSettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "Section";
	}
	/**
	 * Returns alias name
	 */
	function getAliasName()
	{
		return "Section";
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		return "Runtime.Widget.Section";
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
		return "section";
	}
	/**
	 * Returns group name
	 */
	function getGroupName()
	{
		return "basic";
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
		if ($widget->getComponentName() == $this->getComponentName())
		{
			return false;
		}
		return true;
	}
	/**
	 * Returns params
	 */
	function getParams()
	{
		return \Runtime\Vector::from([new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"wrap","label"=>"Wrap","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["show_select_value"=>false,"options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"false","value"=>"No"]),\Runtime\Map::from(["key"=>"","value"=>"Yes"])])])])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"flex","label"=>"Flex","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["show_select_value"=>false,"options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"","value"=>"No"]),\Runtime\Map::from(["key"=>"true","value"=>"Yes"])])])])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"align_items","label"=>"Align items","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"baseline","value"=>"baseline"]),\Runtime\Map::from(["key"=>"center","value"=>"center"]),\Runtime\Map::from(["key"=>"end","value"=>"end"]),\Runtime\Map::from(["key"=>"flex-end","value"=>"flex-end"]),\Runtime\Map::from(["key"=>"flex-start","value"=>"flex-start"]),\Runtime\Map::from(["key"=>"start","value"=>"start"]),\Runtime\Map::from(["key"=>"stretch","value"=>"stretch"]),\Runtime\Map::from(["key"=>"revert","value"=>"revert"])])])])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"justify_content","label"=>"Justify content","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"left","value"=>"left"]),\Runtime\Map::from(["key"=>"center","value"=>"center"]),\Runtime\Map::from(["key"=>"right","value"=>"right"]),\Runtime\Map::from(["key"=>"space-around","value"=>"space-around"]),\Runtime\Map::from(["key"=>"space-between","value"=>"space-between"]),\Runtime\Map::from(["key"=>"start","value"=>"start"]),\Runtime\Map::from(["key"=>"stretch","value"=>"stretch"]),\Runtime\Map::from(["key"=>"end","value"=>"end"])])])])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"flex_wrap","label"=>"Flex wrap","component"=>"Runtime.Widget.Select","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([\Runtime\Map::from(["key"=>"nowrap","value"=>"nowrap"]),\Runtime\Map::from(["key"=>"wrap","value"=>"wrap"])])])])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"min_height","label"=>"min_height","component"=>"Runtime.Widget.Input"])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterComponent", \Runtime\Map::from(["name"=>"height","label"=>"height","component"=>"Runtime.Widget.Input"]))]);
	}
	/**
	 * Returns default template
	 */
	function getDefaultTemplate()
	{
		return \Runtime\Map::from(["default"=>function ()
		{
			return \Runtime\Map::from(["content"=>\Runtime\rs::join("\n", \Runtime\Vector::from(["<style>","padding-top: 20px;","padding-bottom: 20px;","background-position: center top;","background-repeat: no-repeat;","background-size: cover;","</style>"]))]);
		}]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.SectionSettings";
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