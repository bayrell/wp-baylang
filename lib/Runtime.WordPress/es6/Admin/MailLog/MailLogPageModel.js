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
if (typeof Runtime.WordPress.Admin.MailLog == 'undefined') Runtime.WordPress.Admin.MailLog = {};
Runtime.WordPress.Admin.MailLog.MailLogPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
Runtime.WordPress.Admin.MailLog.MailLogPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
Runtime.WordPress.Admin.MailLog.MailLogPageModel.prototype.constructor = Runtime.WordPress.Admin.MailLog.MailLogPageModel;
Object.assign(Runtime.WordPress.Admin.MailLog.MailLogPageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Normalize DateTime */
		var normalizeDateTime = (field_name) =>
		{
			return (data) =>
			{
				var item = data.get("item");
				var date_time = item.get(field_name);
				if (!date_time)
				{
					return "";
				}
				return date_time.normalize().getDateTimeString();
			};
		};
		/* Add form */
		this.form = this.addWidget("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"form","primary_key":Runtime.Vector.from(["id"]),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"gmtime_send","label":"Send time","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"status","label":"Status","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"send_email_error","label":"Error","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"dest","label":"Dest","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"title","label":"Title","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"message","label":"Message","component":"Runtime.Widget.TextArea","props":Runtime.Map.from({"readonly":true})}),Runtime.Map.from({"name":"worker","label":"Worker","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"plan","label":"Plan","component":"Runtime.Widget.Label"})])}));
		/* Add table */
		this.table = this.addWidget("Runtime.Widget.Table.TableDialogModel", Runtime.Map.from({"widget_name":"table","styles":Runtime.Vector.from(["border"]),"get_title":(params) =>
		{
			var action = params.get("action");
			var item = params.get("item");
			if (action == "edit")
			{
				return item.get("title");
			}
			return "";
		},"storage":new Runtime.Entity.Factory("Runtime.Widget.Table.TableStorage", Runtime.Map.from({"api_name":"admin.wordpress.mail.log::search"})),"page":this.layout.request_query.get("p", 1) - 1,"pagination_props":Runtime.Map.from({"name":"p"}),"add_form":this.form,"edit_form":this.form,"fields":Runtime.Vector.from([Runtime.Map.from({"name":"row_number"}),Runtime.Map.from({"name":"worker","label":"Worker","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"plan","label":"Plan","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"status","label":"Status","component":"Runtime.Widget.SelectLabel","props":Runtime.Map.from({"options":Runtime.Vector.from([Runtime.Map.from({"key":-1,"value":"Cancel"})])})}),Runtime.Map.from({"name":"dest","label":"Dest","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"title","label":"Title","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"send_email_error","label":"Error","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"gmtime_send","label":"Send time","calculate":Runtime.lib.pipe().add(Runtime.lib.attr(Runtime.Vector.from(["item","gmtime_send"]))).add(Runtime.lib.normalizeDateTime()),"component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"row_buttons","model":new Runtime.Web.ModelFactory("Runtime.Widget.Table.TableRowButtonsModel", Runtime.Map.from({"delete":false}))})])}));
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
		this.layout.setPageTitle("Mail log");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Admin.MailLog.MailLogPage";
		this.form = null;
		this.table = null;
		this.top_buttons = null;
	},
});
Object.assign(Runtime.WordPress.Admin.MailLog.MailLogPageModel, Runtime.Web.BasePageModel);
Object.assign(Runtime.WordPress.Admin.MailLog.MailLogPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.MailLog";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.MailLog.MailLogPageModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.MailLog.MailLogPageModel);
window["Runtime.WordPress.Admin.MailLog.MailLogPageModel"] = Runtime.WordPress.Admin.MailLog.MailLogPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.MailLog.MailLogPageModel;