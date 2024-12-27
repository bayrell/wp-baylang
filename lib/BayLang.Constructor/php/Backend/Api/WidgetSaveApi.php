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
class WidgetSaveApi extends \Runtime\Widget\Crud\SaveApi
{
	public $project;
	public $module;
	/**
	 * Returns api name
	 */
	static function getApiName()
	{
		return "baylang.constructor.widget::save";
	}
	/**
	 * Returns rules
	 */
	function getRules()
	{
		return \Runtime\Vector::from([new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"id"])),new \Runtime\Widget\Crud\Rules\Required(\Runtime\Map::from(["name"=>"module_id"]))]);
	}
	/**
	 * Returns item fields
	 */
	function getItemFields()
	{
		return \Runtime\Vector::from(["id","module_id"]);
	}
	/**
	 * Returns save fields
	 */
	function getSaveFields()
	{
		return \Runtime\Vector::from(["id","module_id"]);
	}
	/**
	 * New item
	 */
	function newItem()
	{
		return new \BayLang\Helper\Widget($this->module);
	}
	/**
	 * Find item
	 */
	function findItem($pk)
	{
		$widget_name = $pk->get("id");
		return $this->module->getWidget($widget_name);
	}
	/**
	 * Action before
	 */
	function onActionBefore()
	{
		/* Get project */
		$project_id = \Runtime\rtl::attr($this->post_data, ["foreign_key", "project_id"]);
		$this->project = \BayLang\Constructor\Backend\ApiHook::getProject($project_id);
		if (!$this->project)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($project_id, "Project"));
		}
		/* Load project */
		$this->project->load();
		/* Get module */
		$module_id = \Runtime\rtl::attr($this->post_data, ["foreign_key", "module_id"]);
		$this->module = $this->project->getModule($module_id);
		if (!$this->module)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\ItemNotFound($module_id, "Module"));
		}
	}
	/**
	 * Create widget
	 */
	function createWidget()
	{
		$widget_name = $this->data->get("id");
		/* Check widget is exists */
		$widget = $this->findItem(\Runtime\Map::from(["id"=>$widget_name]));
		if ($widget)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Widget already exists"));
		}
		/* Check widget prefix */
		$module_name = $this->module->getName();
		$widget_prefix = \Runtime\rs::substr($widget_name, 0, \Runtime\rs::strlen($module_name));
		if ($widget_prefix != $module_name)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Widget prefix error. Must be " . \Runtime\rtl::toStr($module_name)));
		}
		/* Check widget is model */
		$is_model_based = \Runtime\rs::substr($widget_name, -5) == "Model";
		if (!$is_model_based)
		{
			throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Widget must be model"));
		}
		/* Set widget name */
		$this->item->kind = "widget";
		$this->item->name = $widget_name;
		$this->item->component_name = \Runtime\rs::substr($widget_name, 0, -5);
		/* Set model path */
		$model_path = $this->item->getModelPath();
		$component_path = $this->item->getComponentPath();
		$widget_dir = \Runtime\rs::dirname($model_path);
		/* Create directory if not exists */
		if (!\Runtime\fs::exists($widget_dir))
		{
			\Runtime\fs::mkDir($widget_dir);
		}
		/* Create file */
		$this->createModel($model_path, $this->item->name, $this->item->component_name);
		$this->createComponent($component_path, $this->item->component_name);
		/* Add widget */
		$this->module->addWidget($this->item);
		/* Compile model */
		$this->module->compile($this->module->getRelativeSourcePath($model_path));
		/* Compile component */
		$this->module->compile($this->module->getRelativeSourcePath($component_path));
		/* Update assets */
		$this->module->updateAssets();
		/* Save cache */
		$this->project->saveCache();
		/* Result */
		$this->success();
	}
	/**
	 * Create model
	 */
	function createModel($file_path, $model_name, $component_name)
	{
		$arr = \Runtime\rs::split(".", $model_name);
		$namespace_name = \Runtime\rs::join(".", $arr->slice(0, -1));
		$model_short_name = $arr->last();
		/* Get content */
		$content = \Runtime\Vector::from([]);
		$content->push("namespace " . \Runtime\rtl::toStr($namespace_name) . \Runtime\rtl::toStr(";"));
		$content->push("");
		$content->push("use Runtime.Web.BasePageModel;");
		$content->push("use Runtime.Web.RenderContainer;");
		$content->push("");
		$content->push("");
		$content->push("class " . \Runtime\rtl::toStr($model_short_name) . \Runtime\rtl::toStr(" extends BasePageModel"));
		$content->push("{");
		$content->push("\tstring component = \"" . \Runtime\rtl::toStr($component_name) . \Runtime\rtl::toStr("\";"));
		$content->push("\t");
		$content->push("\t");
		$content->push("\t/**");
		$content->push("\t * Init widget settings");
		$content->push("\t */");
		$content->push("\tvoid initWidget(Dict params)");
		$content->push("\t{");
		$content->push("\t\tparent(params);");
		$content->push("\t}");
		$content->push("\t");
		$content->push("\t");
		$content->push("\t/**");
		$content->push("\t * Build title");
		$content->push("\t */");
		$content->push("\tvoid buildTitle(RenderContainer container)");
		$content->push("\t{");
		$content->push("\t\tthis.layout.setPageTitle(\"Widget page\");");
		$content->push("\t}");
		$content->push("}");
		/* Save file */
		$file_content = \Runtime\rs::join("\n", $content);
		\Runtime\fs::saveFile($file_path, $file_content);
	}
	/**
	 * Create component
	 */
	function createComponent($file_path, $component_name)
	{
		/* Get content */
		$content = \Runtime\Vector::from([]);
		$content->push("<class name=\"" . \Runtime\rtl::toStr($component_name) . \Runtime\rtl::toStr("\">"));
		$content->push("");
		$content->push("<use name=\"Runtime.Widget.Section\" component=\"true\" />");
		$content->push("");
		$content->push("<style>");
		$content->push(".main_section{");
		$content->push("\tpadding-top: 20px;");
		$content->push("\tpadding-bottom: 20px;");
		$content->push("\tbackground-position: center top;");
		$content->push("\tbackground-repeat: no-repeat;");
		$content->push("\tbackground-size: cover;");
		$content->push("}");
		$content->push("</style>");
		$content->push("");
		$content->push("<template>");
		$content->push("\t<div class=\"page\">");
		$content->push("\t\t<Section class=\"main_section\">");
		$content->push("\t\t\t<div class=\"page_text\" >Content</div>");
		$content->push("\t\t</Section>");
		$content->push("\t</div>");
		$content->push("</template>");
		$content->push("");
		$content->push("</class>");
		/* Save file */
		$file_content = \Runtime\rs::join("\n", $content);
		\Runtime\fs::saveFile($file_path, $file_content);
	}
	/**
	 * Action save
	 */
	function actionSave()
	{
		/* Load data */
		$this->loadItem();
		$this->loadData();
		/* Create widget */
		if ($this->pk == null)
		{
			$this->createWidget();
			return ;
		}
		throw new \Runtime\Exceptions\ApiError(new \Runtime\Exceptions\RuntimeException("Method are not allowed"));
	}
	/**
	 * Action delete
	 */
	function actionDelete()
	{
		/* Load data */
		$this->loadItem();
		/* Load widget */
		$this->item->load(true);
		/* Remove files */
		$model_path = $this->item->getModelPath();
		$component_path = $this->item->getComponentPath();
		if (\Runtime\fs::isFile($model_path))
		{
			\Runtime\fs::unlink($model_path);
		}
		if (\Runtime\fs::isFile($component_path))
		{
			\Runtime\fs::unlink($component_path);
		}
		/* Remove widget */
		$this->module->removeWidget($this->item);
		/* Update assets */
		$this->module->updateAssets();
		/* Save cache */
		$this->project->saveCache();
		/* Result */
		$this->success();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->project = null;
		$this->module = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Backend.Api";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Backend.Api.WidgetSaveApi";
	}
	static function getParentClassName()
	{
		return "Runtime.Widget.Crud.SaveApi";
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
			"actionSave",
			"actionDelete",
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		if ($field_name == "actionSave")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		if ($field_name == "actionDelete")
			return \Runtime\Dict::from([
				"async"=>true,
				"annotations"=>\Runtime\Collection::from([
					new \Runtime\Web\Annotations\ApiMethod(),
				]),
			]);
		return null;
	}
}