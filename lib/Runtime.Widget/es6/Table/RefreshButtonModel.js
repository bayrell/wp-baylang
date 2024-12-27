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
if (typeof Runtime.Widget.Table == 'undefined') Runtime.Widget.Table = {};
Runtime.Widget.Table.RefreshButtonModel = function()
{
	Runtime.Widget.ButtonModel.apply(this, arguments);
};
Runtime.Widget.Table.RefreshButtonModel.prototype = Object.create(Runtime.Widget.ButtonModel.prototype);
Runtime.Widget.Table.RefreshButtonModel.prototype.constructor = Runtime.Widget.Table.RefreshButtonModel;
Object.assign(Runtime.Widget.Table.RefreshButtonModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Widget.ButtonModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("table"))
		{
			this.table = params.get("table");
		}
	},
	/**
	 * Refresh
	 */
	onClick: async function(data)
	{
		if (data == undefined) data = null;
		this.result.message = "Refresh";
		this.result.code = 0;
		var res = await this.table.reload();
		this.result.setApiResult(res);
	},
	_init: function()
	{
		Runtime.Widget.ButtonModel.prototype._init.call(this);
		this.widget_name = "refresh_button";
		this.component = "Runtime.Widget.Table.RefreshButton";
		this.styles = Runtime.Vector.from(["primary"]);
		this.result = new Runtime.Widget.WidgetResultModel();
		this.table = null;
	},
});
Object.assign(Runtime.Widget.Table.RefreshButtonModel, Runtime.Widget.ButtonModel);
Object.assign(Runtime.Widget.Table.RefreshButtonModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.RefreshButtonModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.ButtonModel";
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
Runtime.rtl.defClass(Runtime.Widget.Table.RefreshButtonModel);
window["Runtime.Widget.Table.RefreshButtonModel"] = Runtime.Widget.Table.RefreshButtonModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.RefreshButtonModel;