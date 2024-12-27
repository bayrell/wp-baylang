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
class H1 extends \Runtime\Widget\WidgetSettings\Settings\Html\Header
{
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "Header 1";
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		return "h1";
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
		return "page_title";
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
		if (\Runtime\rs::lower($widget->code->tag_name) != "h1")
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
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.H1";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.Html.Header";
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