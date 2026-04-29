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
namespace Runtime\WordPress\Theme\WidgetSettings\Form;

use Runtime\lib;
use Runtime\BaseObject;
use Runtime\Web\ApiResult;
use Runtime\Web\BaseModel;
use Runtime\Web\RenderContainer;
use Runtime\Widget\ButtonModel;
use BayLang\Constructor\Frontend\Editor\Parameters\Parameter;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterComponent;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterDictModel;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterFactoryModel;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterModel;
use BayLang\Constructor\WidgetPage\ParameterFactory;
use BayLang\Constructor\WidgetPage\WidgetSettingsInterface;


class FormModelSettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	var $options;
	
	
	/**
	 * Returns widget name
	 */
	function getWidgetName(){ return ""; }
	
	
	/**
	 * Returns alias name
	 */
	function getAliasName(){ return "WP_FormModel"; }
	
	
	/**
	 * Returns component name
	 */
	function getComponentName(){ return ""; }
	
	
	/**
	 * Returns model name
	 */
	function getModelName(){ return "Runtime.WordPress.Theme.Components.Form.FormModel"; }
	
	
	/**
	 * Returns selector name
	 */
	function getSelectorName(){ return "form"; }
	
	
	/**
	 * Returns group name
	 */
	function getGroupName(){ return "widget"; }
	
	
	/**
	 * Returns true if model
	 */
	function isModel(){ return true; }
	
	
	/**
	 * Returns true if is widget settings
	 */
	function checkWidget($widget)
	{
		if (!$widget->isComponent()) return false;
		if ($widget->model_class_name != $this->getModelName()) return false;
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
	 * On change
	 */
	function onChange($runtime, $model, $param)
	{
		/* Change form name */
		if ($param->name == "form_name")
		{
			$model->form_name = $param->value;
			$model->loadForm();
			return true;
		}
		/* Change form title */
		if ($param->name == "form_title")
		{
			$model->form_title = $param->value;
			return true;
		}
		/* Change form content */
		if ($param->name == "form_content")
		{
			$model->form_content = $param->value;
			return true;
		}
		/* Change form ID */
		if ($param->name == "form_id")
		{
			$model->form_id = $param->value;
			return true;
		}
		/* Change form styles */
		if ($param->name == "form_styles")
		{
			$model->styles = \BayLang\Constructor\WidgetPage\ParameterFactory::restore($runtime, $param->value);
			return true;
		}
		/* Form button text */
		if ($param->name == "form_button_text")
		{
			$button = $model->bottom_buttons->getWidget("submit");
			$button->content = \BayLang\Constructor\WidgetPage\ParameterFactory::restore($runtime, $param->value);
			return true;
		}
		/* Form button styles */
		if ($param->name == "form_button_styles")
		{
			$button = $model->bottom_buttons->getWidget("submit");
			$button->styles = \BayLang\Constructor\WidgetPage\ParameterFactory::restore($runtime, $param->value);
			return true;
		}
		/* Form show label */
		if ($param->name == "form_show_label")
		{
			$model->field_settings->set("show_label", $param->value);
			return true;
		}
		return false;
	}
	
	
	/**
	 * Load form name options
	 */
	function loadOptions($runtime, $widget)
	{
		if ($this->options) return;
		$data = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, new \Runtime\Map([
			"api_name" => "admin.wordpress.forms.settings.search",
			"method_name" => "actionSearch",
			"data" => new \Runtime\Map([
				"limit" => "1000",
			]),
		]));
		$result = $widget->page_model->layout->callApi($data);
		if ($result->isSuccess())
		{
			$result_data = \BayLang\Constructor\WidgetPage\ParameterFactory::restore($runtime, $result->data);
			$this->options = $result_data->get("items")->map(function ($item)
			{
				return new \Runtime\Map([
					"key" => $item->get("api_name"),
					"value" => $item->get("name"),
				]);
			});
		}
		else
		{
			$this->options = new \Runtime\Vector();
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
			$form_name_param = $widget->params->findItem(function ($param){ return $param->name == "form_name"; });
			if ($form_name_param)
			{
				$options = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, $this->options);
				$form_name_param->props->set("options", $options);
			}
		}
	}
	
	
	/**
	 * Returns params
	 */
	function getParams()
	{
		return new \Runtime\Vector(
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "form_name",
				"label" => "Form name",
				"component" => "Runtime.Widget.Select",
				"default" => "",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
					),
				]),
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "styles",
				"label" => "Form styles",
				"component" => "Runtime.Widget.Tag",
				"default" => new \Runtime\Vector(),
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "form_title",
				"label" => "Email title",
				"component" => "Runtime.Widget.Input",
				"default" => "",
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "form_content",
				"label" => "Form content",
				"component" => "Runtime.Widget.TextEditable",
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "metrika_form_id",
				"label" => "Form id",
				"component" => "Runtime.Widget.Input",
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "metrika_event",
				"label" => "Metrika event",
				"component" => "Runtime.Widget.Input",
				"default" => "",
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "redirect_url",
				"label" => "Redirect URL",
				"component" => "Runtime.Widget.Input",
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterDictModel", new \Runtime\Map([
				"name" => "form_show_label",
				"path" => new \Runtime\Vector("field_settings", "show_label"),
				"label" => "Form show label",
				"component" => "Runtime.Widget.Select",
				"default" => "true",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "false", "value" => "False"]),
						new \Runtime\Map(["key" => "true", "value" => "True"]),
					),
				]),
			])),
		);
	}
	
	
	/**
	 * Returns default template
	 */
	function getDefaultTemplate()
	{
		return new \Runtime\Map([
			"default" => function ()
			{
				return new \Runtime\Map([
					"modules" => new \Runtime\Vector(
						"Runtime.Entity.Factory",
					),
					"model" => \Runtime\rs::join("\n", new \Runtime\Vector(
						"this.form = this.addWidget(classof WP_FormModel, {",
						"\t'widget_name': 'form',",
						"\t'form_name': 'default',",
						"\t'submit_button':",
						"\t{",
						"\t\t'text': 'Отправить заявку',",
						"\t},",
						"});",
					)),
				]);
			},
		]);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->options = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Form.FormModelSettings"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}