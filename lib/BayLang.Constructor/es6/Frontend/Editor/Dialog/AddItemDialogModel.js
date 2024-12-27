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
if (typeof BayLang.Constructor.Frontend.Editor.Dialog == 'undefined') BayLang.Constructor.Frontend.Editor.Dialog = {};
BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel = function()
{
	Runtime.Widget.Dialog.DialogModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel.prototype = Object.create(Runtime.Widget.Dialog.DialogModel.prototype);
BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel;
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.DialogModel.prototype.initWidget.call(this, params);
		/* Setup close buttons */
		this.buttons.addButton(Runtime.Map.from({"content":"Cancel","widget_name":"cancel_button","styles":Runtime.Vector.from(["gray"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onCloseButtonClick")})}));
	},
	/**
	 * Select item
	 */
	selectItem: function(widget_settings)
	{
		var editor = this.parent_widget.getFrameEditor();
		/* Create widget name */
		var default_widget_name = widget_settings.getSelectorName();
		var widget_name_value = this.parent_widget.attribute_processor.createWidgetName(default_widget_name);
		/* Create widget */
		var op_code = this.parent_widget.component_processor.createWidget(widget_settings, widget_name_value);
		this.parent_widget.addOpCode(op_code, this.selected_widget_path, this.kind);
		this.hide();
	},
	/**
	 * Add close button click
	 */
	onCloseButtonClick: function(message)
	{
		this.hide();
	},
	/**
	 * Returns widget label
	 */
	getTagWidgetInfo: function(op_code)
	{
		var class_name_attr = op_code.attrs.findItem(Runtime.lib.equalAttr("key", "class"));
		if (!class_name_attr)
		{
			return Runtime.Map.from({"label":op_code.tag_name,"tag_name":op_code.tag_name,"class_name":"","widget_name":""});
		}
		var class_name = class_name_attr.value.value;
		var attrs = Runtime.rs.split(" ", class_name);
		attrs = attrs.filter(Runtime.lib.equalNot(""));
		return Runtime.Map.from({"label":op_code.tag_name + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(attrs.first()),"tag_name":op_code.tag_name,"class_name":class_name,"widget_name":attrs.first()});
	},
	/**
	 * Update frame widgets
	 */
	updateFrameWidgets: function()
	{
		/* Update selected widget */
		var selected_widget = this.selected_widget;
		if (this.kind == "before" || this.kind == "after")
		{
			var selected_widget_path = this.selected_widget_path.slice(0, -1);
			selected_widget = this.parent_widget.widget_manager.getWidget(selected_widget_path);
		}
		/* Setup widget */
		selected_widget.setup();
		/* Get editor provider */
		var editor = this.parent_widget.getFrameEditor();
		/* Update widgets */
		var widgets = editor.getWidgets();
		this.current_widgets = widgets.filter((widget_settings) =>
		{
			if (!widget_settings.getComponentName())
			{
				return false;
			}
			if (!selected_widget.canInsert(widget_settings))
			{
				return false;
			}
			return true;
		});
		/* Get groups used */
		var groups = Runtime.Map.from({});
		this.selected_group_name = "";
		for (var i = 0; i < this.current_widgets.count(); i++)
		{
			var group_name = this.current_widgets.get(i).getGroupName();
			groups.set(group_name, 1);
			if (this.selected_group_name == "")
			{
				this.selected_group_name = group_name;
			}
		}
		/* Update groups */
		this.current_groups = Runtime.Vector.from([]);
		var group_settings = editor.getGroups();
		for (var i = 0; i < group_settings.count(); i++)
		{
			var group = group_settings.get(i);
			var group_name = group.get("name");
			if (groups.has(group_name))
			{
				this.current_groups.push(group);
			}
		}
	},
	/**
	 * Show dialog
	 */
	show: function(selected_path, kind)
	{
		if (selected_path == undefined) selected_path = null;
		if (kind == undefined) kind = "after";
		this.step = 1;
		this.kind = kind;
		this.title = "Add item";
		/* If selected_path is main widget */
		if (!selected_path)
		{
			this.kind = "last";
		}
		/* Setup selected widget */
		this.selected_widget_path = (selected_path) ? (selected_path.slice()) : (Runtime.Vector.from([]));
		this.selected_widget = this.parent_widget.widget_manager.getWidget(this.selected_widget_path);
		/* Update widgets list */
		this.updateFrameWidgets();
		Runtime.Widget.Dialog.DialogModel.prototype.show.call(this);
	},
	_init: function()
	{
		Runtime.Widget.Dialog.DialogModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialog";
		this.widget_name = "add_item_dialog";
		this.kind = "after";
		this.width = "700px";
		this.selected_group_name = "basic";
		this.current_groups = Runtime.Vector.from([]);
		this.current_widgets = Runtime.Vector.from([]);
		this.selected_widget = null;
		this.selected_widget_path = null;
		this.selected_widget_info = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel, Runtime.Widget.Dialog.DialogModel);
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.DialogModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel);
window["BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel"] = BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Dialog.AddItemDialogModel;