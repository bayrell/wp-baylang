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
class TemplateSettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "Template";
	}
	/**
	 * Returns alias name
	 */
	function getAliasName()
	{
		return null;
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		return null;
	}
	/**
	 * Returns model name
	 */
	function getModelName()
	{
		return null;
	}
	/**
	 * Returns selector name
	 */
	function getSelectorName()
	{
		return "template";
	}
	/**
	 * Returns group name
	 */
	function getGroupName()
	{
		return "";
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
		return false;
	}
	/**
	 * Can insert widget
	 */
	function canInsert($widget)
	{
		if ($widget instanceof \Runtime\Widget\WidgetSettings\Settings\SectionSettings)
		{
			return true;
		}
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
			return \Runtime\Map::from([]);
		}]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.TemplateSettings";
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