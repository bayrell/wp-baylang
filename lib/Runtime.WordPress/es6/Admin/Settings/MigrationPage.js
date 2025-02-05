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
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Admin == 'undefined') Runtime.WordPress.Admin = {};
if (typeof Runtime.WordPress.Admin.Settings == 'undefined') Runtime.WordPress.Admin.Settings = {};
Runtime.WordPress.Admin.Settings.MigrationPage = {
	name: "Runtime.WordPress.Admin.Settings.MigrationPage",
	extends: Runtime.Web.Component,
	methods:
	{
		render: function()
		{
			let __v = [];
			
			/* Element 'div' */
			let __v0 = this._e(__v, "div", {"class":this._class_name(["database_migration_page"])});
			
			/* Render */
			this._t(__v0, this.renderWidget(this.model.tabs));
			
			if (this.model.items.count() > 0)
			{
				/* Component 'TextEditable' */
				let __v1 = this._c(__v0, "Runtime.Widget.TextEditable", {"value":Runtime.rs.join("\n", this.model.items)});
				
				/* Component 'RowButtons' */
				let __v2 = this._c(__v0, "Runtime.Widget.RowButtons", {"styles":Runtime.Vector.from(["center","bottom_buttons"])}, () => {
					let __v = [];
					
					/* Component 'Button' */
					let __v0 = this._c(__v, "Runtime.Widget.Button", {"styles":Runtime.Vector.from(["primary"]),"onClick":() =>
					{
						this.model.updateDatabase();
					}}, () => {
						let __v = [];
						
						/* Text */
						this._t(__v, "Update");
						
						return this._flatten(__v);
					});
					
					return this._flatten(__v);
				});
				
				/* Component 'WidgetResult' */
				let __v3 = this._c(__v0, "Runtime.Widget.WidgetResult", {"model":this._model(this.model.result)});
			}
			else
			{
				/* Element 'div' */
				let __v4 = this._e(__v0, "div", {});
				
				/* Text */
				this._t(__v4, "Database is up to date");
			}
			
			return this._flatten(__v);
		},
	},
};
Object.assign(Runtime.WordPress.Admin.Settings.MigrationPage,
{
	components: function()
	{
		return Runtime.Vector.from(["Runtime.Widget.Button","Runtime.Widget.RowButtons","Runtime.Widget.TextEditable","Runtime.Widget.WidgetResult"]);
	},
	css: function(vars)
	{
		var res = "";
		res += Runtime.rtl.toStr(".database_migration_page.h-3a65 .widget_text.h-86cd{height: 500px}");
		return res;
	},
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Settings.MigrationPage";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.Component";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Settings.MigrationPage);
window["Runtime.WordPress.Admin.Settings.MigrationPage"] = Runtime.WordPress.Admin.Settings.MigrationPage;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Settings.MigrationPage;