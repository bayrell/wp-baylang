<?php
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
namespace Runtime\Widget;

use Runtime\BaseLayout;
use Runtime\Hooks\RuntimeHook;
use Runtime\Web\RenderContainer;
use Runtime\Web\Hooks\AppHook as WebHook;
use Runtime\Widget\Assets;
use Runtime\Widget\CSS;
use Runtime\Widget\Translate\Translator;


class AppHook extends \Runtime\Hooks\RuntimeHook
{
	const ASSETS = "runtime.widget::assets";
	const INIT_WIDGET = "baylang::init_widget";
	
	
	/**
	 * Register hooks
	 */
	function register_hooks()
	{
		$this->register(\Runtime\Hooks\RuntimeHook::COMPONENTS, "components", 50);
		$this->register(static::INIT_WIDGET, "initWidget");
	}
	
	
	/**
	 * Components
	 */
	function components($params)
	{
		$components = new \Runtime\Vector(
			"Runtime.Widget.CSS",
		);
		$components->appendItems($params->get("components"));
		$params->set("components", $components);
	}
	
	
	/**
	 * Init widget
	 */
	function initWidget($params)
	{
		$widget_class = "BayLang.Constructor.Frontend.Editor.Widget.WidgetComponent";
		$provider = $params->get("provider");
		/* Image */
		$provider->registerWidget(new \Runtime\Map([
			"name" => "image",
			"label" => "Image",
			"component" => "Runtime.Widget.Image",
			"widget" => $widget_class,
			"props" => new \Runtime\Map(),
		]));
		/* Section */
		$provider->registerWidget(new \Runtime\Map([
			"name" => "section",
			"label" => "Section",
			"component" => "Runtime.Widget.Section",
			"widget" => $widget_class,
			"props" => new \Runtime\Map(),
		]));
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.Widget.AppHook"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}