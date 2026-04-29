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
namespace Runtime\WordPress\Theme\WidgetSettings;

use Runtime\BaseObject;
use Runtime\Web\BaseLayoutModel;
use Runtime\WordPress\Theme\WidgetSettings\Button\ButtonFormModelSettings;
use Runtime\WordPress\Theme\WidgetSettings\Button\ButtonFormSettings;
use Runtime\WordPress\Theme\WidgetSettings\Form\FormModelSettings;
use Runtime\WordPress\Theme\WidgetSettings\Form\FormSettings;
use Runtime\WordPress\Theme\WidgetSettings\Gallery\GalleryModelSettings;
use Runtime\WordPress\Theme\WidgetSettings\Gallery\GallerySettings;
use BayLang\Constructor\WidgetPage\EditorProvider;
use BayLang\Constructor\WidgetPage\WidgetManagerInterface;
use BayLang\Constructor\WidgetPage\WidgetSettingsInterface;


class WidgetManager extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetManagerInterface
{
	/**
	 * Init widgets
	 */
	function init($provider)
	{
		$provider->remove("Runtime.Widget.WidgetSettings.Settings.FormSubmitSettings");
		$provider->remove("Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings");
	}
	
	
	/**
	 * Returns group settings
	 */
	function getGroupSettings()
	{
		return new \Runtime\Map([
		]);
	}
	
	
	/**
	 * Returns list of widget settings
	 */
	function getWidgetSettings()
	{
		return new \Runtime\Vector(
			new \Runtime\WordPress\Theme\WidgetSettings\Button\ButtonFormModelSettings(),
			new \Runtime\WordPress\Theme\WidgetSettings\Button\ButtonFormSettings(),
			new \Runtime\WordPress\Theme\WidgetSettings\Form\FormModelSettings(),
			new \Runtime\WordPress\Theme\WidgetSettings\Form\FormSettings(),
			new \Runtime\WordPress\Theme\WidgetSettings\Gallery\GalleryModelSettings(),
			new \Runtime\WordPress\Theme\WidgetSettings\Gallery\GallerySettings(),
		);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.WidgetManager"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}