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
if (typeof Runtime.WordPress.Admin.Migrations == 'undefined') Runtime.WordPress.Admin.Migrations = {};
Runtime.WordPress.Admin.Migrations.MigrationPage = {
	name: "Runtime.WordPress.Admin.Migrations.MigrationPage",
	extends: Runtime.Component,
	methods:
	{
		render: function()
		{
			const rs = use("Runtime.rs");
			const componentHash = rs.getComponentHash(this.getClassName());
			let __v = new Runtime.VirtualDom(this);
			
			/* Element div */
			let __v0 = __v.element("div", new Runtime.Map({"class": rs.className(["database_migration_page", componentHash])}));
			
			if (this.model.items.count() > 0)
			{
				/* Element Runtime.Widget.TextEditable */
				__v0.element("Runtime.Widget.TextEditable", new Runtime.Map({"value": Runtime.rs.join("\n", this.model.items)}));
				
				/* Element div */
				let __v1 = __v0.element("div", new Runtime.Map({"class": rs.className(["buttons", componentHash])}));
				
				/* Element Runtime.Widget.Button */
				let __v2 = __v1.element("Runtime.Widget.Button", new Runtime.Map({"styles": Runtime.Vector.create(["primary"]), "onClick": this.hash(0) ? this.hash(0) : this.hash(0, () =>
				{
					this.model.updateDatabase();
				})}));
				
				/* Content */
				__v2.slot("default", () =>
				{
					const rs = use("Runtime.rs");
					const componentHash = rs.getComponentHash(this.getClassName());
					let __v = new Runtime.VirtualDom(this);
					__v.push("Update");
					return __v;
				});
				__v0.push(this.renderWidget(this.model.result));
			}
			else
			{
				/* Element div */
				let __v3 = __v0.element("div");
				__v3.push("Database is up to date");
			}
			
			return __v;
		},
		getClassName: function(){ return "Runtime.WordPress.Admin.Migrations.MigrationPage"; },
	},
	getComponentStyle: function(){ return ".database_migration_page.h-fb32 .text_editable{height: 350px}.database_migration_page.h-fb32 .buttons{margin-top: calc(var(--space) * 2);text-align: center}"; },
	getRequiredComponents: function(){ return new Runtime.Vector("Runtime.Widget.Button", "Runtime.Widget.RowButtons", "Runtime.Widget.TextEditable"); },
};
window["Runtime.WordPress.Admin.Migrations.MigrationPage"] = Runtime.WordPress.Admin.Migrations.MigrationPage;