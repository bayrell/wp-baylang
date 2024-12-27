"use strict;"
/*
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
Runtime.Widget.Table.DeleteDialog = {
	name: "Runtime.Widget.Table.DeleteDialog",
	extends: Runtime.Widget.Dialog.Dialog,
	methods:
	{
		renderContent: function()
		{
			let __v = [];
			
			return this._flatten(__v);
		},
		renderResult: function()
		{
			let __v = [];
			
			/* Render */
			this._t(__v, this.renderWidget(this.model.form.result));
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.Widget.Table.DeleteDialog,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Dialog.Dialog"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".widget_dialog.h-38e6 .widget_result{margin-top: var(--widget-space)}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.Widget.Table";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Table.DeleteDialog";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Dialog.Dialog";
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
Runtime.rtl.defClass(Runtime.Widget.Table.DeleteDialog);
window["Runtime.Widget.Table.DeleteDialog"] = Runtime.Widget.Table.DeleteDialog;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Table.DeleteDialog;