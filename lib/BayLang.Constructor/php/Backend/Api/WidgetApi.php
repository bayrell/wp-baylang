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
	function getOpCode()
	{
		$service = new \BayLang\Constructor\Backend\Service\WidgetService();
		$project_id = $this->post_data->get("project_id");
		$current_widget = $this->post_data->get("current_widget");
		/* Load project */
		$service->loadProject($project_id);
		/* Load modules */
		$service->loadItem(\Runtime\Map::from(["id"=>$current_widget]));
		/* Load widget */
		$service->item->load();
		/* Get widget op code */
		$component = $service->item->getComponentOpCode();
		$model = $service->item->getModelOpCode();
		/* Get component path */
		if (!$component)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Failed to load widget '" . \Runtime\rtl::toStr($current_widget) . \Runtime\rtl::toStr("'")));
		}
		/* Success */
		$this->success(\Runtime\Map::from(["data"=>\Runtime\Map::from(["component"=>$component,"model"=>$model])]));
	}
	/**
	 * Save widget
	 */
	function save()
	{
		$service = new \BayLang\Constructor\Backend\Service\WidgetService();
		$project_id = $this->post_data->get("project_id");
		$current_widget = $this->post_data->get("current_widget");
		/* Load project */
		$service->loadProject($project_id);
		/* Load modules */
		$service->loadItem(\Runtime\Map::from(["id"=>$current_widget]));
		/* Load widget */
		$service->item->load();
		/* Get component path */
		$component_path = $service->item->getComponentPath();
		if (!$component_path)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Failed to load widget '" . \Runtime\rtl::toStr($current_widget) . \Runtime\rtl::toStr("'")));
		}
		/* Save file */
		$service->saveFile($service->item->getComponentPath(), $this->post_data->get("component"));
		$service->saveFile($service->item->getModelPath(), $this->post_data->get("model"));
		/* Update assets */
		$service->item->module->updateAssets();
		\BayLang\Constructor\Backend\ApiHook::updateAssets();
		/* Success */
		$this->success();
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