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
if (typeof Runtime.WordPress.Admin.GalleryItem == 'undefined') Runtime.WordPress.Admin.GalleryItem = {};
Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel = function()
{
	Runtime.Web.BasePageModel.apply(this, arguments);
};
Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel.prototype = Object.create(Runtime.Web.BasePageModel.prototype);
Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel.prototype.constructor = Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel;
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel.prototype,
{
	/**
	 * Init widget settings
	 */
	initWidget: function(params)
	{
		Runtime.Web.BasePageModel.prototype.initWidget.call(this, params);
		/* Add form */
		this.form = this.addWidget("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"form","primary_key":Runtime.Vector.from(["id"]),"foreign_key":Runtime.Map.from({"gallery_id":this.layout.request_query.get("id")}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormSaveStorage", Runtime.Map.from({"api_name":"admin.wordpress.gallery.item.save"})),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Input"}),Runtime.Map.from({"name":"image","label":"Image","component":"Runtime.WordPress.Admin.Components.Image","props":Runtime.Map.from({"upload":true})}),Runtime.Map.from({"name":"pos","label":"Position","default":"100","component":"Runtime.Widget.Input"})])}));
		/* Add table */
		this.table = this.addWidget("Runtime.Widget.Table.TableDialogModel", Runtime.Map.from({"widget_name":"table","styles":Runtime.Vector.from(["border"]),"get_title":(params) =>
		{
			var action = params.get("action");
			var item = params.get("item");
			if (action == "add")
			{
				return "Add item";
			}
			if (action == "edit")
			{
				return "Edit item";
			}
			if (action == "delete")
			{
				return "Delete item";
			}
			return "";
		},"storage":new Runtime.Entity.Factory("Runtime.Widget.Table.TableStorage", Runtime.Map.from({"api_name":"admin.wordpress.gallery.item.search"})),"foreign_key":Runtime.Map.from({"gallery_id":this.layout.request_query.get("id")}),"page":this.layout.request_query.get("p", 1) - 1,"pagination_props":Runtime.Map.from({"name":"p"}),"add_form":this.form,"edit_form":this.form,"delete_form":new Runtime.Web.ModelFactory("Runtime.Widget.Form.FormModel", Runtime.Map.from({"widget_name":"delete_form","primary_key":Runtime.Vector.from(["id"]),"foreign_key":Runtime.Map.from({"gallery_id":this.layout.request_query.get("id")}),"storage":new Runtime.Entity.Factory("Runtime.Widget.Form.FormDeleteStorage", Runtime.Map.from({"api_name":"admin.wordpress.gallery.item.save"}))})),"fields":Runtime.Vector.from([Runtime.Map.from({"name":"row_number"}),Runtime.Map.from({"name":"name","label":"Name","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"image","label":"Image","component":"Runtime.WordPress.Admin.Components.Image","props":Runtime.Map.from({"center":true})}),Runtime.Map.from({"name":"pos","label":"Position","component":"Runtime.Widget.Label"}),Runtime.Map.from({"name":"row_buttons","model":new Runtime.Web.ModelFactory("Runtime.Widget.Table.TableRowButtonsModel")})])}));
		/* Add top buttons */
		this.top_buttons = this.addWidget("Runtime.Widget.RowButtonsModel", Runtime.Map.from({"widget_name":"top_buttons","styles":Runtime.Vector.from(["top_buttons","no_gap"]),"buttons":Runtime.Vector.from([new Runtime.Web.ModelFactory("Runtime.Widget.BackButtonModel", Runtime.Map.from({"href":this.layout.url("admin:gallery:index")})),new Runtime.Web.ModelFactory("Runtime.Widget.Table.AddButtonModel", Runtime.Map.from({"table":this.table}))])}));
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
		this.layout.setPageTitle("Gallery items");
	},
	_init: function()
	{
		Runtime.Web.BasePageModel.prototype._init.call(this);
		this.component = "Runtime.WordPress.Admin.GalleryItem.GalleryItemPage";
		this.form = null;
		this.table = null;
		this.top_buttons = null;
	},
});
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel, Runtime.Web.BasePageModel);
Object.assign(Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.GalleryItem";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel);
window["Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel"] = Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel;