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
namespace Runtime\Widget\WidgetSettings;
class WidgetManager extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetManagerInterface
{
	/**
	 * Init widgets
	 */
	function init($provider)
	{
	}
	/**
	 * Returns group settings
	 */
	function getGroupSettings()
	{
		return \Runtime\Map::from(["basic"=>\Runtime\Map::from(["label"=>"Basic","priority"=>0]),"widget"=>\Runtime\Map::from(["label"=>"Widget","priority"=>100]),"other"=>\Runtime\Map::from(["label"=>"Basic","priority"=>9999])]);
	}
	/**
	 * Returns list of widget settings
	 */
	function getWidgetSettings()
	{
		return \Runtime\Vector::from([new \Runtime\Widget\WidgetSettings\Settings\Html\Div(),new \Runtime\Widget\WidgetSettings\Settings\Html\H1(),new \Runtime\Widget\WidgetSettings\Settings\Html\H2(),new \Runtime\Widget\WidgetSettings\Settings\Html\H3(),new \Runtime\Widget\WidgetSettings\Settings\Html\H4(),new \Runtime\Widget\WidgetSettings\Settings\Html\H5(),new \Runtime\Widget\WidgetSettings\Settings\Html\Link(),new \Runtime\Widget\WidgetSettings\Settings\Html\Paragraph(),new \Runtime\Widget\WidgetSettings\Settings\Html\Span(),new \Runtime\Widget\WidgetSettings\Settings\ButtonSettings(),new \Runtime\Widget\WidgetSettings\Settings\ContainerSettings(),new \Runtime\Widget\WidgetSettings\Settings\FormSubmitSettings(),new \Runtime\Widget\WidgetSettings\Settings\FormSubmitModelSettings(),new \Runtime\Widget\WidgetSettings\Settings\ImageSettings(),new \Runtime\Widget\WidgetSettings\Settings\SectionSettings(),new \Runtime\Widget\WidgetSettings\Settings\TemplateSettings(),new \Runtime\Widget\WidgetSettings\Settings\TextImageSettings()]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.WidgetSettings";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetSettings.WidgetManager";
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