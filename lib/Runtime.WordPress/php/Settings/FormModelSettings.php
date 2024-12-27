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
namespace Runtime\WordPress\Settings;
class FormModelSettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	public $options;
	/**
	 * Returns widget name
	 */
	function getWidgetName()
	{
		return "";
	}
	/**
	 * Returns alias name
	 */
	function getAliasName()
	{
		return "WP_FormModel";
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
		return "Runtime.WordPress.Components.FormModel";
	}
	/**
	 * Returns selector name
	 */
	function getSelectorName()
	{
		return "form";
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
		return \Runtime\Vector::from([new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", \Runtime\Map::from(["name"=>"form_name","label"=>"Form name","component"=>"Runtime.Widget.Select","default"=>"","props"=>\Runtime\Map::from(["options"=>\Runtime\Vector::from([])])]))]);
	}
	/**
	 * On change
	 */
	function onChange($model, $param)
	{
		/* Change form name */
		if ($param->name == "form_name")
		{
			$model->form_name = $param->value;
			$model->loadForm();
			return true;
		}
		return false;
	}
	/**
	 * Load form name options
	 */
	function loadOptions($runtime, $widget)
	{
		if ($this->options)
		{
			return ;
		}
		$data = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, \Runtime\Map::from(["api_name"=>"admin.wordpress.forms.settings::search","method_name"=>"actionSearch","data"=>\Runtime\Map::from(["limit"=>"1000"])]));
		$result = $widget->page_model->layout->callApi($data);
		if ($result->isSuccess())
		{
			$result_data = \BayLang\Constructor\WidgetPage\ParameterFactory::restore($runtime, $result->data);
			$this->options = $result_data->get("items")->map(function ($item)
			{
				return \Runtime\Map::from(["key"=>$item->get("api_name"),"value"=>$item->get("name")]);
			});
		}
		else
		{
			$this->options = \Runtime\Vector::from([]);
		}
	}
	/**
	 * Setup widget
	 */
	function setup($runtime, $widget)
	{
		/* Load options */
		$this->loadOptions($runtime, $widget);
		/* Add options to widget */
		if ($this->options)
		{
			$options = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, $this->options);
			$form_name_param = $widget->params->findItem(function ($param)
			{
				return $param->name == "form_name";
			});
			if ($form_name_param)
			{
				$form_name_param->props->set("options", $options);
			}
		}
	}
	/**
	 * Returns default template
	 */
	function getDefaultTemplate()
	{
		return \Runtime\Map::from(["default"=>function ()
		{
			return \Runtime\Map::from(["modules"=>\Runtime\Vector::from(["Runtime.Entity.Factory"]),"model"=>\Runtime\rs::join("\n", \Runtime\Vector::from(["this.form = this.addWidget(classof WP_FormModel, {","\t'widget_name': 'form',","\t'form_name': 'default',","\t'submit_button':","\t{","\t\t'text': 'Отправить заявку',","\t},","});"]))]);
		}]);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->options = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress.Settings";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Settings.FormModelSettings";
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