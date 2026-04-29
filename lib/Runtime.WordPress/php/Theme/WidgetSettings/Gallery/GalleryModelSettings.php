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
namespace Runtime\WordPress\Theme\WidgetSettings\Gallery;

use Runtime\lib;
use Runtime\BaseObject;
use Runtime\Web\ApiResult;
use Runtime\Web\BaseModel;
use Runtime\Web\RenderContainer;
use BayLang\Constructor\Frontend\Editor\Parameters\Parameter;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterComponent;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterDictModel;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterFactoryModel;
use BayLang\Constructor\Frontend\Editor\Parameters\ParameterModel;
use BayLang\Constructor\WidgetPage\ParameterFactory;
use BayLang\Constructor\WidgetPage\WidgetSettingsInterface;


class GalleryModelSettings extends \Runtime\BaseObject implements \BayLang\Constructor\WidgetPage\WidgetSettingsInterface
{
	var $api_names;
	var $image_sizes;
	
	
	/**
	 * Returns widget name
	 */
	function getWidgetName(){ return ""; }
	
	
	/**
	 * Returns alias name
	 */
	function getAliasName(){ return "WP_GalleryModel"; }
	
	
	/**
	 * Returns component name
	 */
	function getComponentName(){ return ""; }
	
	
	/**
	 * Returns model name
	 */
	function getModelName(){ return "Runtime.WordPress.Theme.Components.Gallery.GalleryModel"; }
	
	
	/**
	 * Returns selector name
	 */
	function getSelectorName(){ return "gallery"; }
	
	
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
		/* Change api name */
		if ($param->name == "api_name")
		{
			$model->api_name = $param->value;
			$model->loadItems();
			return true;
		}
		return false;
	}
	
	
	/**
	 * Load form name options
	 */
	function loadOptions($runtime, $widget)
	{
		if (!$this->api_names)
		{
			$data = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, new \Runtime\Map([
				"api_name" => "admin.wordpress.gallery.search",
				"method_name" => "actionSearch",
				"data" => new \Runtime\Map([
					"limit" => "1000",
				]),
			]));
			$result = $widget->page_model->layout->callApi($data);
			if ($result->isSuccess())
			{
				$result_data = \BayLang\Constructor\WidgetPage\ParameterFactory::restore($runtime, $result->data);
				$this->api_names = $result_data->get("items")->map(function ($item)
				{
					return new \Runtime\Map([
						"key" => $item->get("api_name"),
						"value" => $item->get("api_name"),
					]);
				});
			}
			else
			{
				$this->api_names = new \Runtime\Vector();
			}
		}
		if (!$this->image_sizes)
		{
			$data = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, new \Runtime\Map([
				"api_name" => "admin.wordpress.gallery.search",
				"method_name" => "actionImageSizes",
			]));
			$result = $widget->page_model->layout->callApi($data);
			if ($result->isSuccess())
			{
				$result_data = \BayLang\Constructor\WidgetPage\ParameterFactory::restore($runtime, $result->data);
				$this->image_sizes = $result_data->get("items")->map(function ($name)
				{
					return new \Runtime\Map([
						"key" => $name,
						"value" => $name,
					]);
				});
			}
			else
			{
				$this->image_sizes = new \Runtime\Vector();
			}
		}
	}
	
	
	/**
	 * Setup widget
	 */
	function setup($runtime, $widget)
	{
		/* Load options */
		$this->loadOptions($runtime, $widget);
		/* Add api_names to widget */
		if ($this->api_names)
		{
			$parameter = $widget->params->findItem(function ($param){ return $param->name == "api_name"; });
			if ($parameter)
			{
				$options = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, $this->api_names);
				$parameter->props->set("options", $options);
			}
		}
		/* Setup image sizes */
		if ($this->image_sizes)
		{
			$image_sizes = \BayLang\Constructor\WidgetPage\ParameterFactory::copy($runtime, $this->image_sizes);
			/* Set big_size */
			$parameter = $widget->params->findItem(function ($param){ return $param->name == "big_size"; });
			if ($parameter)
			{
				$parameter->props->set("options", $image_sizes);
			}
			/* Set small_size */
			$parameter = $widget->params->findItem(function ($param){ return $param->name == "small_size"; });
			if ($parameter)
			{
				$parameter->props->set("options", $image_sizes);
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
				"name" => "api_name",
				"label" => "Api name",
				"component" => "Runtime.Widget.Select",
				"default" => "",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
					),
				]),
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "dialog_image_contains",
				"label" => "Dialog image contains",
				"component" => "Runtime.Widget.Select",
				"default" => "",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
						new \Runtime\Map(["key" => "false", "value" => "No"]),
						new \Runtime\Map(["key" => "true", "value" => "Yes"]),
					),
				]),
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "small_size",
				"label" => "Small image",
				"component" => "Runtime.Widget.Select",
				"default" => "",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
					),
				]),
			])),
			new \BayLang\Constructor\WidgetPage\ParameterFactory("BayLang.Constructor.Frontend.Editor.Parameters.ParameterModel", new \Runtime\Map([
				"name" => "big_size",
				"label" => "Big image",
				"component" => "Runtime.Widget.Select",
				"default" => "",
				"props" => new \Runtime\Map([
					"options" => new \Runtime\Vector(
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
						"this.form = this.addWidget(classof WP_GalleryModel, {",
						"\t'widget_name': 'gallery',",
						"\t'apiname': 'default',",
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
		$this->api_names = null;
		$this->image_sizes = null;
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.WidgetSettings.Gallery.GalleryModelSettings"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}