"use strict;"
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
if (typeof BayLang == 'undefined') BayLang = {};
if (typeof BayLang.Constructor == 'undefined') BayLang.Constructor = {};
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Editor == 'undefined') BayLang.Constructor.Frontend.Editor = {};
BayLang.Constructor.Frontend.Editor.WidgetEditPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.WidgetEditPageModel;
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetEditPageModel.prototype,
{
	/**
	 * Returns iframe window
	 */
	getFrameWindow: function()
	{
		if (!this.isLoaded())
		{
			return null;
		}
		if (!this.iframe)
		{
			return null;
		}
		if (!this.iframe.contentWindow)
		{
			return null;
		}
		return this.iframe.contentWindow;
	},
	/**
	 * Returns iframe layout
	 */
	getFrameLayout: function()
	{
		if (!this.isLoaded())
		{
			return null;
		}
		if (!this.iframe)
		{
			return null;
		}
		if (!this.iframe.contentWindow)
		{
			return null;
		}
		if (!this.iframe.contentWindow.app_layout)
		{
			return null;
		}
		return this.iframe.contentWindow.app_layout;
	},
	/**
	 * Returns page model
	 */
	getFramePageModel: function()
	{
		var app_layout = this.getFrameLayout();
		if (!app_layout)
		{
			return null;
		}
		return app_layout.getPageModel();
	},
	/**
	 * Returns frame editor
	 */
	getFrameEditor: function()
	{
		var app_window = this.getFrameWindow();
		if (!app_window)
		{
			return null;
		}
		return app_window.global_context.provider("BayLang.Constructor.WidgetPage.EditorProvider");
	},
	/**
	 * Returns widget frame page
	 */
	getFramePageUrl: function()
	{
		var page_url = BayLang.Constructor.Frontend.ConstructorHook.getFramePageUrl(this.project_id, this.current_widget);
		return page_url;
	},
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		this.layout.setLayoutName("default");
		this.project_id = this.layout.route.matches.get("project_id");
		this.module_id = this.layout.request_query.get("module_id");
		this.current_widget = this.layout.route.matches.get("widget_name");
		/* Create widgets */
		this.selected = this.addWidget("BayLang.Constructor.Frontend.Editor.SelectedItemModel");
		this.styles = this.addWidget("BayLang.Constructor.Frontend.Editor.Styles.StylesModel");
		/* Create Tree */
		this.tree = this.addWidget("Runtime.Widget.Tree.TreeModel", Runtime.Map.from({"dnd":true,"icons":false}));
		this.tree.addListener("canDrag", new Runtime.Callback(this, "onCanTreeDrop"));
		this.tree.addListener("dragElement", new Runtime.Callback(this, "onTreeDragElement"));
		this.tree.addListener("selectItem", new Runtime.Callback(this, "onTreeSelectItem"));
		/* Add item dialog model */
		this.add_item_dialog = this.addWidget("BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel", Runtime.Map.from({"widget_name":"add_item_dialog"}));
		/* Remove item dialog model */
		this.remove_item_dialog = this.addWidget("BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel", Runtime.Map.from({"widget_name":"remove_item_dialog"}));
		/* Rename item dialog model */
		this.rename_item_dialog = this.addWidget("Runtime.Widget.Dialog.PromptDialogModel", Runtime.Map.from({"widget_name":"rename_item_dialog","confirm_button":"Rename","title":"Rename name","events":Runtime.Map.from({"confirm":new Runtime.Callback(this, "onRename")})}));
		/* Select image dialog */
		this.select_image_dialog = this.addWidget("BayLang.Constructor.Frontend.Editor.Dialog.SelectImageDialogModel", Runtime.Map.from({"widget_name":"select_image_dialog"}));
		/* Create ContextMenu */
		this.context_menu = this.addWidget("Runtime.Widget.ContextMenu.ContextMenuModel");
		/*
		this.context_menu.addItem({
			"label": "Append item",
			"key": "append"
		});
		*/
		this.context_menu.addItem(Runtime.Map.from({"label":"Insert item","key":"insert"}));
		this.context_menu.addItem(Runtime.Map.from({"label":"Rename item","key":"rename"}));
		this.context_menu.addItem(Runtime.Map.from({"label":"Duplicate item","key":"duplicate"}));
		this.context_menu.addItem(Runtime.Map.from({"label":"Remove item","key":"remove"}));
		this.context_menu.addListener("clickItem", new Runtime.Callback(this, "onContextClickItem"));
		this.tree.setContextMenu(this.context_menu);
		window.addEventListener("message", (event) => { Vue.reactive(this).onPostMessage(event); });
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle(this.current_widget);
	},
	/**
	 * Load widget
	 */
	loadWidget: async function()
	{
		var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.widget","method_name":"getOpCode","data":Runtime.Map.from({"project_id":this.project_id,"current_widget":this.current_widget})}));
		if (res.isSuccess())
		{
			/* Setup op code */
			this.component_processor.setupOpCode(res.data.get("component"));
			this.model_processor.setupOpCode(res.data.get("model"));
			/* Setup CSS styles */
			this.styles.setupStyles(this.component_processor.code);
			/* Load iframe page */
			this.iframe.src = this.getFramePageUrl();
		}
		else
		{
			this.app_status = this.constructor.STATUS_LOAD_ERROR;
			this.load_error_message = res.message;
		}
	},
	/**
	 * Save widget
	 */
	saveWidget: async function()
	{
		/*if (not this.isLoaded()) return;*/
		if (!this.component_processor.code)
		{
			return Promise.resolve();
		}
		var op_code_class = this.component_processor.code.findClass();
		if (!op_code_class)
		{
			return Promise.resolve();
		}
		/* Update widget html styles op_code */
		for (var i = 0; i < op_code_class.items.count(); i++)
		{
			var op_code = op_code_class.items.get(i);
			if (op_code instanceof BayLang.OpCodes.OpHtmlStyle)
			{
				this.styles.updateHtmlStyle(op_code);
			}
		}
		/* Serialize component */
		var serializer = new Runtime.SerializerBase64();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		var component = serializer.encode(this.component_processor.code);
		/* Serialize model */
		var serializer = new Runtime.SerializerBase64();
		serializer.setFlag(Runtime.Serializer.ALLOW_OBJECTS);
		var model = serializer.encode(this.model_processor.code);
		/* Save content */
		this.app_status = this.constructor.STATUS_SAVE_PROCESS;
		var res = await this.layout.callApi(Runtime.Map.from({"api_name":"baylang.constructor.widget","method_name":"save","data":Runtime.Map.from({"project_id":this.project_id,"current_widget":this.current_widget,"component":component,"model":model})}));
		/* Set result */
		if (res.isSuccess())
		{
			this.app_status = this.constructor.STATUS_SAVE_SUCCESS;
		}
		else
		{
			this.app_status = this.constructor.STATUS_SAVE_ERROR;
		}
	},
	/**
	 * Iframe loaded
	 */
	onAppLoaded: function()
	{
		this.app_status = this.constructor.STATUS_LOAD_SUCCESS;
		/* Setup main widget */
		this.main_widget.setup();
		/* Setup tree root */
		this.tree.root = this.main_widget.tree_item;
	},
	/**
	 * App is changed
	 */
	onAppChanged: function()
	{
		this.app_status = this.constructor.STATUS_CHANGED;
	},
	/**
	 * Post message event
	 */
	onPostMessage: function(event)
	{
		if (event.data.name == "app_loaded")
		{
			this.onAppLoaded();
		}
		else if (event.data.name == "add_widget")
		{
			this.showAddWidgetDialog(this.constructor.convertWidgetPath(event.data.path), event.data.kind);
		}
		else if (event.data.name == "move_widget")
		{
			this.moveWidget(this.constructor.convertWidgetPath(event.data.path), event.data.kind);
		}
		else if (event.data.name == "remove_widget")
		{
			this.showRemoveWidgetDialog();
		}
		else if (event.data.name == "select_item")
		{
			this.selectItem(this.constructor.convertWidgetPath(event.data.path));
		}
		else if (event.data.name == "context_menu")
		{
			this.onEditorContextMenuClick(event.data.x, event.data.y);
		}
	},
	/**
	 * Send message
	 */
	sendMessage: function(data)
	{
		var app_window = this.getFrameWindow();
		if (!app_window)
		{
			return ;
		}
		app_window.postMessage(data.toObject());
	},
	/**
	 * Returns true if app is loaded
	 */
	isLoaded: function()
	{
		return this.app_status > 0;
	},
	/**
	 * Context menu item click
	 */
	onContextClickItem: function(message)
	{
		var item = message.item;
		var item_key = item.get("key");
		this.context_menu.hide();
		/* Add item */
		if (item_key == "append")
		{
			this.add_item_dialog.show(this.selected.path, "after");
		}
		/* Insert item */
		if (item_key == "insert")
		{
			this.add_item_dialog.show(this.selected.path, "last");
		}
		/* Rename item */
		if (item_key == "rename")
		{
			this.renameSelectedItem();
		}
		/* Duplicate item */
		if (item_key == "duplicate")
		{
			this.duplicateWidget(this.selected.path);
		}
		/* Remove item */
		if (item_key == "remove")
		{
			this.showRemoveWidgetDialog();
		}
	},
	/**
	 * Show add widget dialog
	 */
	showAddWidgetDialog: function(selected_path, kind)
	{
		this.add_item_dialog.show(selected_path, kind);
	},
	/**
	 * Show remove widget dialog
	 */
	showRemoveWidgetDialog: function()
	{
		this.remove_item_dialog.title = "Remove item";
		this.remove_item_dialog.content = "Do you want to remove this item?";
		this.remove_item_dialog.show();
	},
	/**
	 * Select Frame size
	 */
	selectIFrameSize: function(size)
	{
		if (!this.isLoaded())
		{
			return ;
		}
		/* Select item */
		this.iframe_current_size = size.get("label");
		/* Set iframe width */
		var width = size.get("width");
		if (width > 1000)
		{
			this.iframe.style.width = "";
			this.iframe_current_size = "";
		}
		else
		{
			this.iframe.style.width = width + Runtime.rtl.toStr("px");
		}
		/* Update selected box */
		this.sendMessage(Runtime.Map.from({"name":"update_selected_box"}));
	},
	/**
	 * Update render
	 */
	updateFrameRender: function(render_name)
	{
		if (render_name == undefined) render_name = "render";
		/* Set app is changed */
		this.onAppChanged();
		/* Build render */
		this.sendMessage(Runtime.Map.from({"name":"update_render","render":render_name}));
	},
	/**
	 * Update global css
	 */
	updateFrameGlobalCSS: function()
	{
		/* Set app is changed */
		this.onAppChanged();
		/* Build global css */
		this.sendMessage(Runtime.Map.from({"name":"update_global_css"}));
	},
	/**
	 * Update css
	 */
	updateFrameCSS: function()
	{
		/* Set app is changed */
		this.onAppChanged();
		/* Build CSS */
		this.sendMessage(Runtime.Map.from({"name":"update_css"}));
	},
	/**
	 * Select item
	 */
	onTreeSelectItem: function(message)
	{
		if (!this.isLoaded())
		{
			return null;
		}
		if (this.selected.widget != null && message.item == this.selected.widget.tree_item)
		{
			return ;
		}
		this.selectItem(message.path);
	},
	/**
	 * Select item
	 */
	selectItem: function(path)
	{
		this.breadcrumbs_selected = -1;
		this.context_menu.hide();
		/* Select item */
		this.selected.selectItem(path);
		/* Select tree */
		this.tree.selectItem(path);
		/* Select item in frame */
		this.sendMessage(Runtime.Map.from({"name":"select_item","path":Runtime.rs.join(".", path)}));
	},
	/**
	 * Breadcrumbs
	 */
	selectBreadcrumbs: function(pos)
	{
		if (this.breadcrumbs_selected != pos)
		{
			this.breadcrumbs_selected = pos;
		}
		else
		{
			this.breadcrumbs_selected = -1;
		}
	},
	/**
	 * Context menu click
	 */
	onEditorContextMenuClick: function(x, y)
	{
		var rect = this.iframe.getBoundingClientRect();
		x = x + rect.x;
		y = y + rect.y;
		this.context_menu.show(x, y);
	},
	/**
	 * Can Tree drop
	 */
	onCanTreeDrop: function(message)
	{
		var src_widget = this.widget_manager.getWidget(message.src);
		var dest_widget = this.widget_manager.getWidget(message.dest);
		if (message.dest == null)
		{
			return ;
		}
		if (dest_widget == null)
		{
			return ;
		}
		/* Setup widget */
		if (dest_widget.is_initialized)
		{
			dest_widget.setup();
		}
		/* Check into drag */
		if (message.kind == "into" && !dest_widget.canInsert(src_widget.settings))
		{
			message.result = false;
			return ;
		}
	},
	/**
	 * Rename item
	 */
	renameSelectedItem: function()
	{
		this.rename_item_dialog.old_value = this.selected.widget.param_widget_name.value;
		this.rename_item_dialog.setTitle("Rename " + Runtime.rtl.toStr(this.rename_item_dialog.old_value));
		this.rename_item_dialog.setValue(this.rename_item_dialog.old_value);
		this.rename_item_dialog.show();
	},
	/**
	 * On rename item
	 */
	onRename: function(message)
	{
		var old_widget_name = this.rename_item_dialog.old_value;
		var new_widget_name = message.value;
		if (old_widget_name == new_widget_name)
		{
			return ;
		}
		var new_selector_name = new_widget_name;
		if (Runtime.rs.charAt(new_selector_name, 0) != ".")
		{
			new_selector_name = "." + Runtime.rtl.toStr(new_selector_name);
		}
		/* Rename widget */
		this.selected.widget.param_widget_name.changeValue(new_widget_name);
		/* Rename model name */
		if (this.selected.widget.is_model)
		{
			this.model_processor.setWidgetName(this.selected.widget, new_widget_name);
			/* Rename model */
			var iframe_page_model = this.getFramePageModel().widget_model;
			iframe_page_model.widgets.set(new_widget_name, iframe_page_model.widgets.get(old_widget_name));
			iframe_page_model.widgets.remove(old_widget_name);
			iframe_page_model[new_widget_name] = iframe_page_model[old_widget_name];
			iframe_page_model[old_widget_name] = null;
		}
		/* Create new style */
		if (!this.styles.selectors.has(new_selector_name))
		{
			var old_selector_name = "." + Runtime.rtl.toStr(old_widget_name);
			var css_content = this.styles.getSelectorContent(old_selector_name);
			this.styles.setSelectorContent(new_selector_name, css_content);
		}
		/* Update render */
		this.updateFrameCSS();
		this.updateFrameRender();
	},
	/**
	 * Move widget
	 */
	moveWidget: function(path, kind)
	{
		var dest_path_item = 0;
		var dest_path_kind = "";
		if (kind == "down")
		{
			dest_path_kind = "after";
			dest_path_item = path.last() + 1;
		}
		else if (kind == "up")
		{
			dest_path_kind = "before";
			dest_path_item = path.last() - 1;
		}
		var dest_path = path.setIm(path.count() - 1, dest_path_item);
		var src_op_code = this.widget_manager.getOpCode(path);
		var dest_op_code = this.widget_manager.getOpCode(dest_path);
		if (!dest_op_code)
		{
			return ;
		}
		/* Move op code */
		this.widget_manager.moveOpCode(src_op_code, dest_op_code, dest_path_kind);
		this.selectItem(dest_path);
		/* Update frame render */
		this.updateFrameRender();
	},
	/**
	 * Add widget op_code
	 */
	addOpCode: function(op_code, path, kind)
	{
		var dest_op_code = this.widget_manager.getOpCode(path);
		/* Root insert */
		if (dest_op_code == null)
		{
			dest_op_code = this.tree.root.code;
			kind = "last";
			path = Runtime.Vector.from([]);
		}
		/* Add op code */
		var pos = this.widget_manager.addOpCode(op_code, dest_op_code, kind);
		if (pos < 0)
		{
			return ;
		}
		/* Build new path */
		var new_src_path = (kind == "first" || kind == "last") ? (path.slice()) : (path.slice(0, -1));
		new_src_path.push(pos);
		/* Add model */
		var widget = this.widget_manager.getWidget(new_src_path);
		if (widget)
		{
			/* Setup widget */
			widget.setup();
			/* Create model op_code */
			this.model_processor.createModel(widget);
			/* Setup widget model */
			this.model_processor.setupWidget(widget);
			/* Add model widget */
			var content = this.model_processor.buildPrimaryContent(widget);
			if (content)
			{
				this.sendMessage(Runtime.Map.from({"name":"add_widget_model","widget":widget.getName(),"content":content}));
			}
		}
		/* Select new item */
		this.selectItem(new_src_path);
		/* Update frame render */
		this.updateFrameRender();
		/* Update CSS */
		this.updateFrameCSS();
		/* Update Global CSS */
		this.updateFrameGlobalCSS();
		return new_src_path;
	},
	/**
	 * Duplicate selected widget
	 */
	duplicateWidget: function(path)
	{
		/* Get op_code */
		var dest_op_code = this.widget_manager.getOpCode(path);
		if (!dest_op_code)
		{
			return ;
		}
		/* Duplicate */
		this.widget_manager.duplicateOpCode(dest_op_code);
		/* Update frame render */
		this.updateFrameRender();
	},
	/**
	 * Remove widget
	 */
	removeWidget: function(path, model)
	{
		if (model == undefined) model = true;
		if (path == null)
		{
			return ;
		}
		/* Get op_code */
		var dest_op_code = this.widget_manager.getOpCode(this.selected.path);
		if (!dest_op_code)
		{
			return ;
		}
		/* Remove model */
		if (model)
		{
			var widget = this.widget_manager.get(dest_op_code);
			if (widget)
			{
				this.model_processor.removeModel(widget);
			}
		}
		/* Remove */
		this.widget_manager.removeOpCode(dest_op_code);
		/* Set selected is null */
		this.selectItem(null);
		/* Update frame render */
		this.updateFrameRender();
	},
	/**
	 * Drag & Drop
	 */
	onTreeDragElement: function(message)
	{
		var kind = message.kind;
		var dest_item = message.dest_item;
		var dest_parent_item = message.dest_parent_item;
		var src_item = message.src_item;
		var src_parent_item = message.src_parent_item;
		/* Move item */
		this.widget_manager.moveOpCode(src_item.code, dest_item.code, kind);
		/* Select new item */
		this.selectItem(message.new_src_path);
		/* Update frame render */
		this.updateFrameRender();
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Editor.WidgetEditPage";
		this.project_id = "";
		this.module_id = "";
		this.current_widget = "";
		this.component_class_name = "";
		this.menu_selected = "params";
		this.iframe_current_size = "";
		this.load_error_message = "";
		this.app_status = this.constructor.STATUS_LOAD_PROCESS;
		this.breadcrumbs_selected = -1;
		this.iframe = null;
		this.tree = null;
		this.main_widget = null;
		this.attribute_processor = new BayLang.Constructor.Frontend.Editor.Processor.AttributeProcessor(this);
		this.component_processor = new BayLang.Constructor.Frontend.Editor.Processor.ComponentProcessor(this);
		this.model_processor = new BayLang.Constructor.Frontend.Editor.Processor.ModelProcessor(this);
		this.widget_manager = new BayLang.Constructor.Frontend.Editor.Widget.WidgetManager(this);
		this.selected = null;
		this.styles = null;
		this.context_menu = null;
		this.add_item_dialog = null;
		this.remove_item_dialog = null;
		this.rename_item_dialog = null;
		this.select_image_dialog = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetEditPageModel, Runtime.Web.BasePageModel);
Object.assign(BayLang.Constructor.Frontend.Editor.WidgetEditPageModel,
{
	STATUS_LOAD_PROCESS: 0,
	STATUS_LOAD_SUCCESS: 1,
	STATUS_LOAD_ERROR: 2,
	STATUS_CHANGED: 3,
	STATUS_SAVE_PROCESS: 4,
	STATUS_SAVE_SUCCESS: 5,
	STATUS_SAVE_ERROR: 6,
	/**
	 * Convert widget_path to tree_path
	 */
	convertWidgetPath: function(path)
	{
		if (!path)
		{
			return null;
		}
		return Runtime.rs.split(".", path).map((s) =>
		{
			return Runtime.rtl.toInt(s);
		});
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.WidgetEditPageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BasePageModel";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.WidgetEditPageModel);
window["BayLang.Constructor.Frontend.Editor.WidgetEditPageModel"] = BayLang.Constructor.Frontend.Editor.WidgetEditPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.WidgetEditPageModel;