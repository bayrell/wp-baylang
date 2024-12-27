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
namespace BayLang\Constructor\Backend\Api;
class WidgetApi extends \Runtime\Web\BaseApi
{
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "baylang.constructor.widget";
	}
	/**
	 * Load widget
	 */
	static function getOpCode($api)
	{
		$project_id = $api->post_data->get("project_id");
		$current_widget = $api->post_data->get("current_widget");
		/* Find project */
		$project = \BayLang\Constructor\Backend\ApiHook::getProject($project_id);
		if (!$project)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($project_id, "Project"));
		}
		/* Load project */
		$project->load();
		/* Find widget */
		$widget = $project->getWidget($current_widget);
		if (!$widget)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($current_widget, "Widget"));
		}
		/* Load widget */
		$widget->load();
		/* Get widget op code */
		$component = $widget->getComponentOpCode();
		$model = $widget->getModelOpCode();
		/* Get component path */
		if (!$component)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Failed to load widget '" . \Runtime\rtl::toStr($current_widget) . \Runtime\rtl::toStr("'")));
		}
		/* Success */
		$api->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["component"=>$component,"model"=>$model])]));
	}
	/**
	 * Save widget
	 */
	static function save($api)
	{
		$project_id = $api->post_data->get("project_id");
		$current_widget = $api->post_data->get("current_widget");
		/* Find project */
		$project = \BayLang\Constructor\Backend\ApiHook::getProject($project_id);
		if (!$project)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($project_id, "Project"));
		}
		/* Load project */
		$project->load();
		/* Find widget */
		$widget = $project->getWidget($current_widget);
		if (!$widget)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($current_widget, "Widget"));
		}
		/* Load widget */
		$widget->load();
		/* Get component path */
		$component_path = $widget->getComponentPath();
		if (!$component_path)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Failed to load widget '" . \Runtime\rtl::toStr($current_widget) . \Runtime\rtl::toStr("'")));
		}
		/* Save file */
		static::saveFile($widget, $widget->getComponentPath(), $api->post_data->get("component"));
		static::saveFile($widget, $widget->getModelPath(), $api->post_data->get("model"));
		/* Update assets */
		$widget->module->updateAssets();
		\BayLang\Constructor\Backend\ApiHook::updateAssets();
		/* Success */
		$api->success();
	}
	/**
	 * Save file
	 */
	static function saveFile($widget, $file_path, $content)
	{
		/* Get op_code */
		$serializer = new \Runtime\SerializerBase64();
		$serializer->setFlag(\Runtime\Serializer::ALLOW_OBJECTS);
		$op_code = $serializer->decode($content);
		/* Translate */
		$translator = new \BayLang\LangBay\TranslatorBay();
		$res = $translator::translate($translator, $op_code);
		$content = $res->get(1);
		/* Save content */
		\Runtime\fs::saveFile($file_path, $content);
		/* Compile file */
		$relative_src_file_path = $widget->module->getRelativeSourcePath($file_path);
		$widget->module->compile($relative_src_file_path);
		/* widget.module.translateLanguages(relative_src_file_path, op_code); */
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Api";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Api.WidgetApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseApi";
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
			"getOpCode",
			"save",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "getOpCode")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "save")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}