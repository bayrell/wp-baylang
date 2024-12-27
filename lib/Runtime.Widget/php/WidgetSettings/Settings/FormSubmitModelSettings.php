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
class FormSubmitModelSettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "Form Model";
	}
	/**
	 * Returns alias name
	 */
	function getAliasName()
	{
		return "FormSubmitModel";
	}
	/**
	 * Returns component name
	 */
	function getComponentName()
	{
		return "";
	}
	/**
	 * Returns model name
	 */
	function getModelName()
	{
		return "Runtime.Widget.Form.FormSubmitModel";
	}
	/**
	 * Returns selector name
	 */
	function getSelectorName()
	{
		return "";
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
		return true;
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
		if ($widget->model_class_name != $this->getModelName())
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
		return \Runtime\Vector::from([new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterFactoryModel", \Runtime\Map::from(["name"=>"storage","path"=>"api_name","label"=>"API name","component"=>"Runtime.Widget.Input"])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", \Runtime\Map::from(["name"=>"submit_button_text","path"=>\Runtime\Vector::from(["submit_button","text"]),"label"=>"Button text","component"=>"Runtime.Widget.Input"])),new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", \Runtime\Map::from(["name"=>"fields","label"=>"Fields","component"=>"BayLang.Constructor.Frontend.Components.SortableParams","default"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"name","label"=>"Username","component"=>"Runtime.Widget.Input"])]),"props"=>\Runtime\Map::from(["fields"=>\Runtime\Vector::from([\Runtime\Map::from(["name"=>"name","label"=>"Field name","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"label","label"=>"Label","component"=>"Runtime.Widget.Input"]),\Runtime\Map::from(["name"=>"component","label"=>"Component","component"=>"Runtime.Widget.Input","default"=>"Runtime.Widget.Input"])])])]))]);
	}
	/**
	 * On change
	 */
	function onChange($iframeWindow, $widget, $param)
	{
		if ($param->name == "submit_button_text")
		{
			$value = $param->value;
			$submit_button = $widget->bottom_buttons->getWidget("submit");
			$submit_button->content = $value;
			return true;
		}
		return false;
	}
	/**
	 * Returns default template
	 */
	function getDefaultTemplate()
	{
		return \Runtime\Map::from(["default"=>function ()
		{
			return \Runtime\Map::from(["modules"=>\Runtime\Vector::from(["Runtime.Entity.Factory"]),"model"=>\Runtime\rs::join("\n", \Runtime\Vector::from(["this.form = this.addWidget('Runtime.Widget.Form.FormSubmitModel', {","\t'widget_name': 'form',","\t'storage': new Factory(","\t\t'Runtime.Widget.Form.FormSubmitStorage',","\t\t{","\t\t\t'api_name': 'test'","\t\t}","\t),","\t'submit_button':","\t{","\t\t'text': 'Отправить заявку',","\t},","\t'fields': [","\t\t{","\t\t\t'name': 'name',","\t\t\t'label': 'Name',","\t\t\t'component': 'Runtime.Widget.Input',","\t\t},","\t\t{","\t\t\t'name': 'email',","\t\t\t'label': 'E-mail',","\t\t\t'component': 'Runtime.Widget.Input',","\t\t},","\t],","});"]))]);
		}]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.Widget.WidgetSettings.Settings";
	}
	static function getClassName()
	{
		return "Runtime.Widget.WidgetSettings.Settings.FormSubmitModelSettings";
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