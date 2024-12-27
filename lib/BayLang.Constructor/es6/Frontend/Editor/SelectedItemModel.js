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
BayLang.Constructor.Frontend.Editor.SelectedItemModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Editor.SelectedItemModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
BayLang.Constructor.Frontend.Editor.SelectedItemModel.prototype.constructor = BayLang.Constructor.Frontend.Editor.SelectedItemModel;
Object.assign(BayLang.Constructor.Frontend.Editor.SelectedItemModel.prototype,
{
	/**
	 * Select item
	 */
	selectItem: function(path)
	{
		/* Change path */
		this.path = (path) ? (path.slice()) : (null);
		/* Get item */
		var widget = this.parent_widget.widget_manager.getWidget(path);
		if (widget == this.widget)
		{
			return ;
		}
		/* Set widget */
		this.widget = widget;
		if (!this.widget)
		{
			return ;
		}
		/* Setup widget */
		this.widget.setup();
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Editor.SelectedItem";
		this.widget_name = "selected";
		this.path = null;
		this.widget = null;
	},
});
Object.assign(BayLang.Constructor.Frontend.Editor.SelectedItemModel, Runtime.Web.BaseModel);
Object.assign(BayLang.Constructor.Frontend.Editor.SelectedItemModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Editor";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Editor.SelectedItemModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Editor.SelectedItemModel);
window["BayLang.Constructor.Frontend.Editor.SelectedItemModel"] = BayLang.Constructor.Frontend.Editor.SelectedItemModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Editor.SelectedItemModel;