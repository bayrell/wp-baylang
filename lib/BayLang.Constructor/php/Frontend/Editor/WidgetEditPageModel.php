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
namespace BayLang\Constructor\Frontend\Editor;
class WidgetEditPageModel extends \Runtime\Web\BasePageModel
{
	const STATUS_LOAD_PROCESS=0;
	const STATUS_LOAD_SUCCESS=1;
	const STATUS_LOAD_ERROR=2;
	const STATUS_CHANGED=3;
	const STATUS_SAVE_PROCESS=4;
	const STATUS_SAVE_SUCCESS=5;
	const STATUS_SAVE_ERROR=6;
	public $component;
	public $project_id;
	public $module_id;
	public $current_widget;
	public $component_class_name;
	public $menu_selected;
	public $iframe_current_size;
	public $load_error_message;
	public $app_status;
	public $breadcrumbs_selected;
	public $iframe;
	public $tree;
	public $main_widget;
	public $attribute_processor;
	public $component_processor;
	public $model_processor;
	public $widget_manager;
	public $selected;
	public $styles;
	public $context_menu;
	public $add_item_dialog;
	public $remove_item_dialog;
	public $rename_item_dialog;
	public $select_image_dialog;
	/**
	 * Returns iframe window
	 */
	function getFrameWindow()
	{
		if (!$this->isLoaded())
		{
			return null;
		}
		if (!$this->iframe)
		{
			return null;
		}
		if (!$this->iframe->contentWindow)
		{
			return null;
		}
		return $this->iframe->contentWindow;
	}
	/**
	 * Returns iframe layout
	 */
	function getFrameLayout()
	{
		if (!$this->isLoaded())
		{
			return null;
		}
		if (!$this->iframe)
		{
			return null;
		}
		if (!$this->iframe->contentWindow)
		{
			return null;
		}
		if (!$this->iframe->contentWindow->app_layout)
		{
			return null;
		}
		return $this->iframe->contentWindow->app_layout;
	}
	/**
	 * Returns page model
	 */
	function getFramePageModel()
	{
		$app_layout = $this->getFrameLayout();
		if (!$app_layout)
		{
			return null;
		}
		return $app_layout->getPageModel();
	}
	/**
	 * Returns frame editor
	 */
	function getFrameEditor()
	{
		$app_window = $this->getFrameWindow();
		if (!$app_window)
		{
			return null;
		}
		return $app_window->global_context->provider("BayLang.Constructor.WidgetPage.EditorProvider");
	}
	/**
	 * Returns widget frame page
	 */
	function getFramePageUrl()
	{
		$page_url = \BayLang\Constructor\Frontend\ConstructorHook::getFramePageUrl($this->project_id, $this->current_widget);
		return $page_url;
	}
	/**
	 * Init widget settings
	 */
	function initWidget($params)
	{
		parent::initWidget($params);
		$this->layout->setLayoutName("default");
		$this->project_id = $this->layout->route->matches->get("project_id");
		$this->module_id = $this->layout->request_query->get("module_id");
		$this->current_widget = $this->layout->route->matches->get("widget_name");
		/* Create widgets */
		$this->selected = $this->addWidget("BayLang.Constructor.Frontend.Editor.SelectedItemModel");
		$this->styles = $this->addWidget("BayLang.Constructor.Frontend.Editor.Styles.StylesModel");
		/* Create Tree */
		$this->tree = $this->addWidget("Runtime.Widget.Tree.TreeModel", \Runtime\Map::from(["dnd"=>true,"icons"=>false]));
		$this->tree->addListener("canDrag", new \Runtime\Callback($this, "onCanTreeDrop"));
		$this->tree->addListener("dragElement", new \Runtime\Callback($this, "onTreeDragElement"));
		$this->tree->addListener("selectItem", new \Runtime\Callback($this, "onTreeSelectItem"));
		/* Add item dialog model */
		$this->add_item_dialog = $this->addWidget("BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel", \Runtime\Map::from(["widget_name"=>"add_item_dialog"]));
		/* Remove item dialog model */
		$this->remove_item_dialog = $this->addWidget("BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel", \Runtime\Map::from(["widget_name"=>"remove_item_dialog"]));
		/* Rename item dialog model */
		$this->rename_item_dialog = $this->addWidget("Runtime.Widget.Dialog.PromptDialogModel", \Runtime\Map::from(["widget_name"=>"rename_item_dialog","confirm_button"=>"Rename","title"=>"Rename name","events"=>\Runtime\Map::from(["confirm"=>new \Runtime\Callback($this, "onRename")])]));
		/* Select image dialog */
		$this->select_image_dialog = $this->addWidget("BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel", \Runtime\Map::from(["widget_name"=>"select_image_dialog"]));
		/* Create ContextMenu */
		$this->context_menu = $this->addWidget("Runtime.Widget.ContextMenu.ContextMenuModel");
		/*
		this.context_menu.addItem({
			"label": "Append item",
			"key": "append"
		});
		*/
		$this->context_menu->addItem(\Runtime\Map::from(["label"=>"Insert item","key"=>"insert"]));
		$this->context_menu->addItem(\Runtime\Map::from(["label"=>"Rename item","key"=>"rename"]));
		$this->context_menu->addItem(\Runtime\Map::from(["label"=>"Duplicate item","key"=>"duplicate"]));
		$this->context_menu->addItem(\Runtime\Map::from(["label"=>"Remove item","key"=>"remove"]));
		$this->context_menu->addListener("clickItem", new \Runtime\Callback($this, "onContextClickItem"));
		$this->tree->setContextMenu($this->context_menu);
	}
	/**
	 * Build title
	 */
	function buildTitle($container)
	{
		$this->layout->setPageTitle($this->current_widget);
	}
	/**
	 * Load widget
	 */
	function loadWidget()
	{
		$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.widget","method_name"=>"getOpCode","data"=>\Runtime\Map::from(["project_id"=>$this->project_id,"current_widget"=>$this->current_widget])]));
		if ($res->isSuccess())
		{
			/* Setup op code */
			$this->component_processor->setupOpCode($res->data->get("component"));
			$this->model_processor->setupOpCode($res->data->get("model"));
			/* Setup CSS styles */
			$this->styles->setupStyles($this->component_processor->code);
			/* Load iframe page */
			$this->iframe->src = $this->getFramePageUrl();
		}
		else
		{
			$this->app_status = static::STATUS_LOAD_ERROR;
			$this->load_error_message = $res->message;
		}
	}
	/**
	 * Save widget
	 */
	function saveWidget()
	{
		/*if (not this.isLoaded()) return;*/
		if (!$this->component_processor->code)
		{
			return ;
		}
		$op_code_class = $this->component_processor->code->findClass();
		if (!$op_code_class)
		{
			return ;
		}
		/* Update widget html styles op_code */
		for ($i = 0; $i < $op_code_class->items->count(); $i++)
		{
			$op_code = $op_code_class->items->get($i);
			if ($op_code instanceof \BayLang\OpCodes\OpHtmlStyle)
			{
				$this->styles->updateHtmlStyle($op_code);
			}
		}
		/* Serialize component */
		$serializer = new \Runtime\SerializerBase64();
		$serializer->setFlag(\Runtime\Serializer::ALLOW_OBJECTS);
		$component = $serializer->encode($this->component_processor->code);
		/* Serialize model */
		$serializer = new \Runtime\SerializerBase64();
		$serializer->setFlag(\Runtime\Serializer::ALLOW_OBJECTS);
		$model = $serializer->encode($this->model_processor->code);
		/* Save content */
		$this->app_status = static::STATUS_SAVE_PROCESS;
		$res = $this->layout->callApi(\Runtime\Map::from(["api_name"=>"baylang.constructor.widget","method_name"=>"save","data"=>\Runtime\Map::from(["project_id"=>$this->project_id,"current_widget"=>$this->current_widget,"component"=>$component,"model"=>$model])]));
		/* Set result */
		if ($res->isSuccess())
		{
			$this->app_status = static::STATUS_SAVE_SUCCESS;
		}
		else
		{
			$this->app_status = static::STATUS_SAVE_ERROR;
		}
	}
	/**
	 * Iframe loaded
	 */
	function onAppLoaded()
	{
		$this->app_status = static::STATUS_LOAD_SUCCESS;
		/* Setup main widget */
		$this->main_widget->setup();
		/* Setup tree root */
		$this->tree->root = $this->main_widget->tree_item;
	}
	/**
	 * App is changed
	 */
	function onAppChanged()
	{
		$this->app_status = static::STATUS_CHANGED;
	}
	/**
	 * Convert widget_path to tree_path
	 */
	static function convertWidgetPath($path)
	{
		if (!$path)
		{
			return null;
		}
		return \Runtime\rs::split(".", $path)->map(function ($s)
		{
			return \Runtime\rtl::toInt($s);
		});
	}
	/**
	 * Post message event
	 */
	function onPostMessage($event)
	{
		if ($event->data->name == "app_loaded")
		{
			$this->onAppLoaded();
		}
		else if ($event->data->name == "add_widget")
		{
			$this->showAddWidgetDialog(static::convertWidgetPath($event->data->path), $event->data->kind);
		}
		else if ($event->data->name == "move_widget")
		{
			$this->moveWidget(static::convertWidgetPath($event->data->path), $event->data->kind);
		}
		else if ($event->data->name == "remove_widget")
		{
			$this->showRemoveWidgetDialog();
		}
		else if ($event->data->name == "select_item")
		{
			$this->selectItem(static::convertWidgetPath($event->data->path));
		}
		else if ($event->data->name == "context_menu")
		{
			$this->onEditorContextMenuClick($event->data->x, $event->data->y);
		}
	}
	/**
	 * Send message
	 */
	function sendMessage($data)
	{
		$app_window = $this->getFrameWindow();
		if (!$app_window)
		{
			return ;
		}
		$app_window->postMessage($data->toObject());
	}
	/**
	 * Returns true if app is loaded
	 */
	function isLoaded()
	{
		return $this->app_status > 0;
	}
	/**
	 * Context menu item click
	 */
	function onContextClickItem($message)
	{
		$item = $message->item;
		$item_key = $item->get("key");
		$this->context_menu->hide();
		/* Add item */
		if ($item_key == "append")
		{
			$this->add_item_dialog->show($this->selected->path, "after");
		}
		/* Insert item */
		if ($item_key == "insert")
		{
			$this->add_item_dialog->show($this->selected->path, "last");
		}
		/* Rename item */
		if ($item_key == "rename")
		{
			$this->renameSelectedItem();
		}
		/* Duplicate item */
		if ($item_key == "duplicate")
		{
			$this->duplicateWidget($this->selected->path);
		}
		/* Remove item */
		if ($item_key == "remove")
		{
			$this->showRemoveWidgetDialog();
		}
	}
	/**
	 * Show add widget dialog
	 */
	function showAddWidgetDialog($selected_path, $kind)
	{
		$this->add_item_dialog->show($selected_path, $kind);
	}
	/**
	 * Show remove widget dialog
	 */
	function showRemoveWidgetDialog()
	{
		$this->remove_item_dialog->title = "Remove item";
		$this->remove_item_dialog->content = "Do you want to remove this item?";
		$this->remove_item_dialog->show();
	}
	/**
	 * Select Frame size
	 */
	function selectIFrameSize($size)
	{
		if (!$this->isLoaded())
		{
			return ;
		}
		/* Select item */
		$this->iframe_current_size = $size->get("label");
		/* Set iframe width */
		$width = $size->get("width");
		if ($width > 1000)
		{
			$this->iframe->style->width = "";
			$this->iframe_current_size = "";
		}
		else
		{
			$this->iframe->style->width = $width . \Runtime\rtl::toStr("px");
		}
		/* Update selected box */
		$this->sendMessage(\Runtime\Map::from(["name"=>"update_selected_box"]));
	}
	/**
	 * Update render
	 */
	function updateFrameRender($render_name="render")
	{
		/* Set app is changed */
		$this->onAppChanged();
		/* Build render */
		$this->sendMessage(\Runtime\Map::from(["name"=>"update_render","render"=>$render_name]));
	}
	/**
	 * Update global css
	 */
	function updateFrameGlobalCSS()
	{
		/* Set app is changed */
		$this->onAppChanged();
		/* Build global css */
		$this->sendMessage(\Runtime\Map::from(["name"=>"update_global_css"]));
	}
	/**
	 * Update css
	 */
	function updateFrameCSS()
	{
		/* Set app is changed */
		$this->onAppChanged();
		/* Build CSS */
		$this->sendMessage(\Runtime\Map::from(["name"=>"update_css"]));
	}
	/**
	 * Select item
	 */
	function onTreeSelectItem($message)
	{
		if (!$this->isLoaded())
		{
			return null;
		}
		if ($this->selected->widget != null && $message->item == $this->selected->widget->tree_item)
		{
			return ;
		}
		$this->selectItem($message->path);
	}
	/**
	 * Select item
	 */
	function selectItem($path)
	{
		$this->breadcrumbs_selected = -1;
		$this->context_menu->hide();
		/* Select item */
		$this->selected->selectItem($path);
		/* Select tree */
		$this->tree->selectItem($path);
		/* Select item in frame */
		$this->sendMessage(\Runtime\Map::from(["name"=>"select_item","path"=>\Runtime\rs::join(".", $path)]));
	}
	/**
	 * Breadcrumbs
	 */
	function selectBreadcrumbs($pos)
	{
		if ($this->breadcrumbs_selected != $pos)
		{
			$this->breadcrumbs_selected = $pos;
		}
		else
		{
			$this->breadcrumbs_selected = -1;
		}
	}
	/**
	 * Context menu click
	 */
	function onEditorContextMenuClick($x, $y)
	{
		$rect = $this->iframe->getBoundingClientRect();
		$x = $x + $rect->x;
		$y = $y + $rect->y;
		$this->context_menu->show($x, $y);
	}
	/**
	 * Can Tree drop
	 */
	function onCanTreeDrop($message)
	{
		$src_widget = $this->widget_manager->getWidget($message->src);
		$dest_widget = $this->widget_manager->getWidget($message->dest);
		if ($message->dest == null)
		{
			return ;
		}
		if ($dest_widget == null)
		{
			return ;
		}
		/* Setup widget */
		if ($dest_widget->is_initialized)
		{
			$dest_widget->setup();
		}
		/* Check into drag */
		if ($message->kind == "into" && !$dest_widget->canInsert($src_widget->settings))
		{
			$message->result = false;
			return ;
		}
	}
	/**
	 * Rename item
	 */
	function renameSelectedItem()
	{
		$this->rename_item_dialog->old_value = $this->selected->widget->param_widget_name->value;
		$this->rename_item_dialog->setTitle("Rename " . \Runtime\rtl::toStr($this->rename_item_dialog->old_value));
		$this->rename_item_dialog->setValue($this->rename_item_dialog->old_value);
		$this->rename_item_dialog->show();
	}
	/**
	 * On rename item
	 */
	function onRename($message)
	{
		$old_widget_name = $this->rename_item_dialog->old_value;
		$new_widget_name = $message->value;
		if ($old_widget_name == $new_widget_name)
		{
			return ;
		}
		$new_selector_name = $new_widget_name;
		if (\Runtime\rs::charAt($new_selector_name, 0) != ".")
		{
			$new_selector_name = "." . \Runtime\rtl::toStr($new_selector_name);
		}
		/* Rename widget */
		$this->selected->widget->param_widget_name->changeValue($new_widget_name);
		/* Rename model name */
		if ($this->selected->widget->is_model)
		{
			$this->model_processor->setWidgetName($this->selected->widget, $new_widget_name);
			/* Rename model */
			$iframe_page_model = $this->getFramePageModel()->widget_model;
			$iframe_page_model->widgets->set($new_widget_name, $iframe_page_model->widgets->get($old_widget_name));
			$iframe_page_model->widgets->remove($old_widget_name);
		}
		/* Create new style */
		if (!$this->styles->selectors->has($new_selector_name))
		{
			$old_selector_name = "." . \Runtime\rtl::toStr($old_widget_name);
			$css_content = $this->styles->getSelectorContent($old_selector_name);
			$this->styles->setSelectorContent($new_selector_name, $css_content);
		}
		/* Update render */
		$this->updateFrameCSS();
		$this->updateFrameRender();
	}
	/**
	 * Move widget
	 */
	function moveWidget($path, $kind)
	{
		$dest_path_item = 0;
		$dest_path_kind = "";
		if ($kind == "down")
		{
			$dest_path_kind = "after";
			$dest_path_item = $path->last() + 1;
		}
		else if ($kind == "up")
		{
			$dest_path_kind = "before";
			$dest_path_item = $path->last() - 1;
		}
		$dest_path = $path->setIm($path->count() - 1, $dest_path_item);
		$src_op_code = $this->widget_manager->getOpCode($path);
		$dest_op_code = $this->widget_manager->getOpCode($dest_path);
		if (!$dest_op_code)
		{
			return ;
		}
		/* Move op code */
		$this->widget_manager->moveOpCode($src_op_code, $dest_op_code, $dest_path_kind);
		$this->selectItem($dest_path);
		/* Update frame render */
		$this->updateFrameRender();
	}
	/**
	 * Add widget op_code
	 */
	function addOpCode($op_code, $path, $kind)
	{
		$dest_op_code = $this->widget_manager->getOpCode($path);
		/* Root insert */
		if ($dest_op_code == null)
		{
			$dest_op_code = $this->tree->root->code;
			$kind = "last";
			$path = \Runtime\Vector::from([]);
		}
		/* Add op code */
		$pos = $this->widget_manager->addOpCode($op_code, $dest_op_code, $kind);
		if ($pos < 0)
		{
			return ;
		}
		/* Build new path */
		$new_src_path = ($kind == "first" || $kind == "last") ? ($path->slice()) : ($path->slice(0, -1));
		$new_src_path->push($pos);
		/* Add model */
		$widget = $this->widget_manager->getWidget($new_src_path);
		if ($widget)
		{
			/* Setup widget */
			$widget->setup();
			/* Create model op_code */
			$this->model_processor->createModel($widget);
			/* Setup widget model */
			$this->model_processor->setupWidget($widget);
			/* Add model widget */
			$content = $this->model_processor->buildPrimaryContent($widget);
			if ($content)
			{
				$this->sendMessage(\Runtime\Map::from(["name"=>"add_widget_model","widget"=>$widget->getName(),"content"=>$content]));
			}
		}
		/* Select new item */
		$this->selectItem($new_src_path);
		/* Update frame render */
		$this->updateFrameRender();
		/* Update CSS */
		$this->updateFrameCSS();
		/* Update Global CSS */
		$this->updateFrameGlobalCSS();
		return $new_src_path;
	}
	/**
	 * Duplicate selected widget
	 */
	function duplicateWidget($path)
	{
		/* Get op_code */
		$dest_op_code = $this->widget_manager->getOpCode($path);
		if (!$dest_op_code)
		{
			return ;
		}
		/* Duplicate */
		$this->widget_manager->duplicateOpCode($dest_op_code);
		/* Update frame render */
		$this->updateFrameRender();
	}
	/**
	 * Remove widget
	 */
	function removeWidget($path, $model=true)
	{
		if ($path == null)
		{
			return ;
		}
		/* Get op_code */
		$dest_op_code = $this->widget_manager->getOpCode($this->selected->path);
		if (!$dest_op_code)
		{
			return ;
		}
		/* Remove model */
		if ($model)
		{
			$widget = $this->widget_manager->get($dest_op_code);
			if ($widget)
			{
				$this->model_processor->removeModel($widget);
			}
		}
		/* Remove */
		$this->widget_manager->removeOpCode($dest_op_code);
		/* Set selected is null */
		$this->selectItem(null);
		/* Update frame render */
		$this->updateFrameRender();
	}
	/**
	 * Drag & Drop
	 */
	function onTreeDragElement($message)
	{
		$kind = $message->kind;
		$dest_item = $message->dest_item;
		$dest_parent_item = $message->dest_parent_item;
		$src_item = $message->src_item;
		$src_parent_item = $message->src_parent_item;
		/* Move item */
		$this->widget_manager->moveOpCode($src_item->code, $dest_item->code, $kind);
		/* Select new item */
		$this->selectItem($message->new_src_path);
		/* Update frame render */
		$this->updateFrameRender();
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->component = "BayLang.Constructor.Frontend.Editor.WidgetEditPage";
		$this->project_id = "";
		$this->module_id = "";
		$this->current_widget = "";
		$this->component_class_name = "";
		$this->menu_selected = "params";
		$this->iframe_current_size = "";
		$this->load_error_message = "";
		$this->app_status = static::STATUS_LOAD_PROCESS;
		$this->breadcrumbs_selected = -1;
		$this->iframe = null;
		$this->tree = null;
		$this->main_widget = null;
		$this->attribute_processor = new \BayLang\Constructor\Frontend\Editor\Processor\AttributeProcessor($this);
		$this->component_processor = new \BayLang\Constructor\Frontend\Editor\Processor\ComponentProcessor($this);
		$this->model_processor = new \BayLang\Constructor\Frontend\Editor\Processor\ModelProcessor($this);
		$this->widget_manager = new \BayLang\Constructor\Frontend\Editor\Widget\WidgetManager($this);
		$this->selected = null;
		$this->styles = null;
		$this->context_menu = null;
		$this->add_item_dialog = null;
		$this->remove_item_dialog = null;
		$this->rename_item_dialog = null;
		$this->select_image_dialog = null;
	}
	static function getNamespace()
	{
		return "BayLang.Constructor.Frontend.Editor";
	}
	static function getClassName()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetEditPageModel";
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