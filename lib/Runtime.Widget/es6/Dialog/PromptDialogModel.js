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
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Dialog == 'undefined') Runtime.Widget.Dialog = {};
Runtime.Widget.Dialog.PromptDialogModel = function()
{
	Runtime.Widget.Dialog.DialogModel.apply(this, arguments);
};
Runtime.Widget.Dialog.PromptDialogModel.prototype = Object.create(Runtime.Widget.Dialog.DialogModel.prototype);
Runtime.Widget.Dialog.PromptDialogModel.prototype.constructor = Runtime.Widget.Dialog.PromptDialogModel;
Object.assign(Runtime.Widget.Dialog.PromptDialogModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Widget.Dialog.DialogModel.prototype.initWidget.call(this, params);
		/* Setup close buttons */
		this.buttons.addButton(Runtime.Map.from({"content":"Cancel","widget_name":"cancel_button","styles":Runtime.Vector.from(["gray"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onCloseButtonClick")})}));
		/* Setup confirm button */
		this.buttons.addButton(Runtime.Map.from({"content":"Ok","widget_name":"confirm_button","styles":Runtime.Vector.from(["success"]),"events":Runtime.Map.from({"click":new Runtime.Callback(this, "onConfirmButtonClick")})}));
		/* Buttons style */
		this.buttons.styles.add("align-end");
	},
	/**
	 * Set value
	 */
	setValue: function(value)
	{
		this.value = value;
	},
	/**
	 * Add close button click
	 */
	onCloseButtonClick: function(message)
	{
		this.hide();
	},
	/**
	 * Add confirm button click
	 */
	onConfirmButtonClick: function(message)
	{
		try
		{
			this.emit(new Runtime.Widget.Dialog.DialogMessage(Runtime.Map.from({"name":"confirm","value":this.value})));
		}
		catch (_ex)
		{
			if (_ex instanceof Runtime.Widget.Dialog.DialogModelException)
			{
				var e = _ex;
				
				this.result.setException(e);
				return ;
			}
			else
			{
				throw _ex;
			}
		}
		this.hide();
	},
	_init: function()
	{
		Runtime.Widget.Dialog.DialogModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Dialog.PromptDialog";
		this.value = "";
		this.old_value = "";
	},
});
Object.assign(Runtime.Widget.Dialog.PromptDialogModel, Runtime.Widget.Dialog.DialogModel);
Object.assign(Runtime.Widget.Dialog.PromptDialogModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Dialog";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Dialog.PromptDialogModel";
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
Runtime.rtl.defClass(Runtime.Widget.Dialog.PromptDialogModel);
window["Runtime.Widget.Dialog.PromptDialogModel"] = Runtime.Widget.Dialog.PromptDialogModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Dialog.PromptDialogModel;