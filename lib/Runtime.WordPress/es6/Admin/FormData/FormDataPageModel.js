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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.FormData == 'undefined') Runtime.WordPress.Admin.FormData = {};
Runtime.WordPress.Admin.FormData.FormDataPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
Runtime.WordPress.Admin.FormData.FormDataPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
Runtime.WordPress.Admin.FormData.FormDataPageModel.prototype.constructor = Runtime.WordPress.Admin.FormData.FormDataPageModel;
Object.assign(Runtime.WordPress.Admin.FormData.FormDataPageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Calculate data */
		var calculateData = (data) =>
		{
			var item = data.get("item");
			if (item.get("data") == null)
			{
				return "";
			}
			var items = item.get("data").transition((value, key) =>
			{
				return key + Runtime.rtl.toStr(": ") + Runtime.rtl.toStr(value);
			});
			if (data.has("table"))
			{
				return items;
			}
			return Runtime.rs.join("\n", items);
		};
		/* Add form */
		this.form = this.addWidget("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"form","primary_key":Runtime.Vector.from(["id"]),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"form_title","label":"Title","component":"Runtime.Widget.Input","props":Runtime.Map.from({"readonly":true})}),Runtime.Map.from({"name":"data","label":"Data","component":"Runtime.Widget.TextArea","calculate":calculateData,"props":Runtime.Map.from({"readonly":true})}),Runtime.Map.from({"name":"gmtime_add","label":"Data","component":"Runtime.Widget.Input","calculate":Runtime.lib.pipe().add(Runtime.lib.attr(Runtime.Vector.from(["item","gmtime_add"]))).add(Runtime.lib.normalizeDateTime()),"props":Runtime.Map.from({"readonly":true})})])}));
		/* Add table */
		this.table = this.addWidget("Runtime.Widget.Table.TableDialogModel", Runtime.Map.from({"widget_name":"table","styles":Runtime.Vector.from(["border"]),"storage":new Runtime.Entity.Factory("Runtime.Widget.Table.TableStorage", Runtime.Map.from({"api_name":"admin.wordpress.forms.data::search"})),"page":this.layout.request_query.get("p", 1) - 1,"pagination_props":Runtime.Map.from({"name":"p"}),"edit_form":this.form,"fields":Runtime.Vector.from([Runtime.Map.from({"name":"row_number"}),Runtime.Map.from({"name":"form_title","label":"Title","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"data","label":"Data","calculate":calculateData,"component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"send_email_error","label":"Mail error","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"gmtime_add","label":"Date","calculate":Runtime.lib.pipe().add(Runtime.lib.attr(Runtime.Vector.from(["item","gmtime_add"]))).add(Runtime.lib.normalizeDateTime()),"component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"row_buttons","model":new Runtime.Web.ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", Runtime.Map.from({"delete":false}))})])}));
		/* Remove save button */
		var save_dialog = this.table.getWidget("save_dialog");
		save_dialog.buttons.removeItemByName("confirm_button");
		/* Change cancel button text */
		var cancel_button = save_dialog.buttons.findItemByName("cancel_button");
		cancel_button.content = "Close";
		/* Table row buttons */
		var row_buttons = this.table.getWidget("row_buttons");
		var edit_button = row_buttons.findItemByName("edit_button");
		edit_button.content = "View";
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Forms data");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Admin.FormData.FormDataPage";
		this.form = null;
		this.table = null;
	},
});
Object.assign(Runtime.WordPress.Admin.FormData.FormDataPageModel, Runtime.Web.BasePageModel);
Object.assign(Runtime.WordPress.Admin.FormData.FormDataPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.FormData";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.FormData.FormDataPageModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.FormData.FormDataPageModel);
window["Runtime.WordPress.Admin.FormData.FormDataPageModel"] = Runtime.WordPress.Admin.FormData.FormDataPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.FormData.FormDataPageModel;