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
BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel = function()
{
	Runtime.Widget.Dialog.ConfirmDialogModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel.prototype = Object.create(Runtime.Widget.Dialog.ConfirmDialogModel.prototype);
BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel;
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype.initWidget.call(this, params);
		/* Remove button */
		var confirm_button = this.buttons.getWidget("confirm_button");
		confirm_button.content = "Remove";
		confirm_button.styles.add("danger");
		confirm_button.styles.removeItem("primary");
	},
	/**
	 * On value change
	 */
	onValueChange: function(message)
	{
		this.remove_value = message.value;
	},
	/**
	 * Confirm button click
	 */
	onConfirmButtonClick: function(message)
	{
		var path = this.parent_widget.selected.path.slice();
		if (path)
		{
			this.parent_widget.removeWidget(path, true);
		}
		this.hide();
	},
	_init: function()
	{
		Runtime.Widget.Dialog.ConfirmDialogModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialog";
		this.widget_name = "remove_item_dialog";
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel, Runtime.Widget.Dialog.ConfirmDialogModel);
Object.assign(BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.ConfirmDialogModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel);
window["BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel"] = BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.Dialog.RemoveItemDialogModel;