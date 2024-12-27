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
namespace BayLang\Constructor\WidgetPage;
class WidgetPageModel extends \Runtime\Web\BasePageModel
{
	public $component;
	public $current_widget_name;
	public $selected_box;
	public $selected_elem;
	public $selected_path;
	public $widget_component;
	public $widget_model;
	public $widget_css;
	public $components;
	/**
	 * Is model based widget
	 */
	static function isModelBased($widget_name)
	{
		return \Runtime\rs::substr($widget_name, -5) == "Model";
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		/* Get current widget name */
		$this->current_widget_name = $this->layout->request_query->get("widget_name");
		/* Create model based widget */
		if (static::isModelBased($this->current_widget_name))
		{
			$this->widget_model = $this->addWidget($this->current_widget_name, \Runtime\Map::from(["widget_name"=>"widget_model"]));
		}
		else
		{
			$this->widget_model = $this->addWidget("Runtime.Web.BaseModel", \Runtime\Map::from(["component"=>$this->current_widget_name,"widget_name"=>"current_widget"]));
		}
		/* Add event listeners */
		$provider = \Runtime\rtl::getContext()->provider("Runtime.Web.RenderProvider");
		$provider->events->add("onBeforeUpdate", new \Runtime\Callback($this, "updateComponent"));
		$provider->events->add("onMounted", new \Runtime\Callback($this, "addComponent"));
		$provider->events->add("onUnmount", new \Runtime\Callback($this, "removeComponent"));
	}
	/**
	 * Returns EditPageModel
	 */
	function getEditPageModel()
	{
		return null;
		$page_model = $window->parent->app_layout->getPageModel();
		$page_model_class_name = $page_model::getClassName();
		if ($page_model_class_name != "BayLang.Constructor.Frontend.Editor.WidgetEditPageModel")
		{
			return null;
		}
		return $page_model;
	}
	/**
	 * Convert tree_path to widget_path
	 */
	function convertTreeToWidgetPath($path)
	{
		return $path->insertIm(0, 0);
	}
	/**
	 * Convert widget_path to tree_path
	 */
	function convertWidgetToTreePath($path)
	{
		return $path->map(function ($s)
		{
			return \Runtime\rtl::toInt($s);
		})->slice(1);
	}
	/**
	 * Select item
	 */
	function selectItem($path)
	{
		$this->selected_path = $path;
		if ($path == null)
		{
			return ;
		}
		$widget_path_str = \Runtime\rs::join(".", $this->convertTreeToWidgetPath($path));
		$component = $this->components->get($widget_path_str);
		/* Setup component */
		if ($component)
		{
		}
		else
		{
			$selector = ".debug_component[data-widget-path=\"" . \Runtime\rtl::toStr($widget_path_str) . \Runtime\rtl::toStr("\"]");
			$elem = $document->querySelector($selector);
		}
		/* Setup element */
		$this->selected_elem = $elem;
		$this->updateSelectedBox();
	}
	/**
	 * Returns components
	 */
	function getComponents()
	{
		if (!$this->widget_model)
		{
			return "";
		}
		if (!$this->widget_model->component)
		{
			return "";
		}
		$res = \Runtime\Vector::from([]);
		$cache = \Runtime\Map::from([]);
		$component = $this->widget_model->component;
		$components = \Runtime\Web\BaseLayoutModel::_getRequiredComponents($res, $cache, \Runtime\Vector::from([$component]));
		return $components;
	}
	/**
	 * Add widget model
	 */
	function addWidgetModel($widget_name, $content)
	{
		$content = \Runtime\rs::substr($content, 5);
		$content = "fn_new = function (){ return this.widget_model." + $content + "; };";
	}
	/**
	 * Build render function
	 */
	function buildRender($render_name="render")
	{
		$page_model = $this->getEditPageModel();
		if (!$page_model)
		{
			return ;
		}
		/* Get content */
		$content = $page_model->component_processor->buildRenderContent("render");
		/* log(content); */
		$this->widget_component->render = $window->eval("fn_new = " + $content + ";");
		$this->widget_component->reload();
		/* Update selected box */
		\Runtime\Web\RenderProvider::nextTick(function ()
		{
			$this->selectItem($this->selected_path);
			$this->updateSelectedBox();
		});
		/* Update selected box */
		$window->setTimeout(function ()
		{
			$this->updateSelectedBox();
		}, 10);
	}
	/**
	 * Build CSS
	 */
	function buildCSS()
	{
		$page_model = $this->getEditPageModel();
		if (!$page_model)
		{
			return ;
		}
		/* Get css content */
		$items = \Runtime\Vector::from([]);
		$items->push("var content = \"\";");
		$items->appendItems($page_model->styles->getCSS()->map(function ($s)
		{
			return "content += Runtime.rtl.toStr(" . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr(");");
		}));
		$items->push("return content;");
		$content = "fn_new = function (){" . \Runtime\rtl::toStr(\Runtime\rs::join("\n", $items)) . \Runtime\rtl::toStr("};");
		/* Update selected box */
		\Runtime\Web\RenderProvider::nextTick(function ()
		{
			$this->updateSelectedBox();
		});
	}
	/**
	 * Build global CSS
	 */
	function buildGlobalCSS()
	{
		$page_model = $this->getEditPageModel();
		if (!$page_model)
		{
			return ;
		}
		/* Get components */
		$components = $page_model->component_processor->getComponents();
		$components = $this->layout->getComponents($components);
		$components->removeValue($this->widget_model->component);
		$css = $this->layout::getCss($components);
		/* Update style CSS */
		$style_element = $document->querySelector("style.components");
		$style_element->innerText = $css;
	}
	/**
	 * Post message event
	 */
	function onPostMessage($event)
	{
		if (!$event->data)
		{
			return ;
		}
		$name = $event->data->name;
		if ($name == "add_widget_model")
		{
			$this->addWidgetModel($event->data->widget, $event->data->content);
		}
		else if ($name == "update_css")
		{
			$this->buildCSS();
		}
		else if ($name == "update_global_css")
		{
			$this->buildGlobalCSS();
		}
		else if ($name == "update_render")
		{
			$this->buildRender($event->data->render);
		}
		else if ($name == "update_selected_box")
		{
			$this->updateSelectedBox();
		}
		else if ($name == "select_item")
		{
			$path = \Runtime\rs::split(".", $event->data->path);
			$path = $path->map(function ($item)
			{
				return \Runtime\rtl::to($item, ["e"=>"int"]);
			});
			$this->selectItem($path);
		}
	}
	/**
	 * Send message
	 */
	function sendMessage($data)
	{
		$window->parent->postMessage($data->toObject());
	}
	/**
	 * Send loaded
	 */
	function sendAppLoaded()
	{
		$this->sendMessage(\Runtime\Map::from(["name"=>"app_loaded"]));
	}
	/**
	 * Send add widget
	 */
	function sendAddWidget($path, $kind)
	{
		$this->sendMessage(\Runtime\Map::from(["name"=>"add_widget","path"=>($path) ? (\Runtime\rs::join(".", $path)) : (null),"kind"=>$kind]));
	}
	/**
	 * Send move widget
	 */
	function sendMoveWidget($path, $kind)
	{
		$this->sendMessage(\Runtime\Map::from(["name"=>"move_widget","path"=>($path) ? (\Runtime\rs::join(".", $path)) : (null),"kind"=>$kind]));
	}
	/**
	 * Send remove widget
	 */
	function sendRemoveWidget($path)
	{
		$this->sendMessage(\Runtime\Map::from(["name"=>"remove_widget","path"=>($path) ? (\Runtime\rs::join(".", $path)) : (null)]));
	}
	/**
	 * Send select item
	 */
	function sendSelectItem($path)
	{
		$this->sendMessage(\Runtime\Map::from(["name"=>"select_item","path"=>($path) ? (\Runtime\rs::join(".", $path)) : (null)]));
	}
	/**
	 * Send context menu
	 */
	function sendContextMenu($x, $y)
	{
		$this->sendMessage(\Runtime\Map::from(["name"=>"context_menu","x"=>$x,"y"=>$y]));
	}
	/**
	 * Add component
	 */
	function addComponent($component)
	{
		if (!$component->data_widget_path)
		{
			return ;
		}
		$component->_old_data_widget_path = $component->data_widget_path;
		$this->components->set($component->data_widget_path, $component);
	}
	/**
	 * Remove component
	 */
	function removeComponent($component)
	{
		if (!$component->_old_data_widget_path)
		{
			return ;
		}
		$this->components->remove($component->_old_data_widget_path);
		$component->_old_data_widget_path = null;
	}
	/**
	 * Update component
	 */
	function updateComponent($component)
	{
		$old_component = null;
		$old_data_widget_path = $component->_old_data_widget_path;
		$new_data_widget_path = $component->data_widget_path;
		if ($old_data_widget_path == $new_data_widget_path)
		{
			return ;
		}
		/* Remove old component */
		$old_component = ($old_data_widget_path) ? ($this->components->get($old_data_widget_path)) : (null);
		if ($old_component)
		{
			$this->removeComponent($old_component);
		}
		/* Remove new component */
		$old_component = ($new_data_widget_path) ? ($this->components->get($new_data_widget_path)) : (null);
		if ($old_component)
		{
			$this->removeComponent($old_component);
		}
		/* Add new component */
		$this->addComponent($component);
	}
	/**
	 * Update box styles
	 */
	function updateSelectedBox()
	{
		if ($this->selected_elem)
		{
			$this->selected_box = static::getBoxStyles($this->selected_elem);
		}
		else
		{
			$this->selected_box = null;
		}
	}
	/**
	 * Returns box styles by element
	 */
	static function getBoxStyles($elem)
	{
		$left = $elem->offsetLeft;
		$top = $elem->offsetTop;
		$width = $elem->clientWidth - 2;
		$height = $elem->clientHeight - 2;
		$box = \Runtime\Map::from([]);
		$box->set("left", \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top) . \Runtime\rtl::toStr("px"),"width: 1px","height: " . \Runtime\rtl::toStr($height) . \Runtime\rtl::toStr("px")])));
		$box->set("top", \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top) . \Runtime\rtl::toStr("px"),"width: " . \Runtime\rtl::toStr($width) . \Runtime\rtl::toStr("px"),"height: 1px"])));
		$box->set("right", \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left + $width) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top) . \Runtime\rtl::toStr("px"),"width: 1px","height: " . \Runtime\rtl::toStr($height) . \Runtime\rtl::toStr("px")])));
		$box->set("bottom", \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top + $height) . \Runtime\rtl::toStr("px"),"width: " . \Runtime\rtl::toStr($width) . \Runtime\rtl::toStr("px"),"height: 1px"])));
		$box->set("box", \Runtime\rs::join(";", \Runtime\Vector::from(["left: " . \Runtime\rtl::toStr($left) . \Runtime\rtl::toStr("px"),"top: " . \Runtime\rtl::toStr($top) . \Runtime\rtl::toStr("px"),"width: " . \Runtime\rtl::toStr($width) . \Runtime\rtl::toStr("px"),"height: " . \Runtime\rtl::toStr($height) . \Runtime\rtl::toStr("px")])));
		return $box;
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.WidgetPage.WidgetPage";
		$this->current_widget_name = "";
		$this->selected_box = null;
		$this->selected_elem = null;
		$this->selected_path = null;
		$this->widget_component = null;
		$this->widget_model = null;
		$this->widget_css = "";
		$this->components = \Runtime\Map::from([]);
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.WidgetPage";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.WidgetPage.WidgetPageModel";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BasePageModel";
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