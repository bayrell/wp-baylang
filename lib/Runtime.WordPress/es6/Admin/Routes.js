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
Runtime.WordPress.Admin.Routes = class extends Runtime.Web.BaseRoute
{
	/**
	 * Returns layout name
	 */
	static getLayoutName(){ return "admin"; }
	
	
	/**
	 * Returns routes
	 */
	static getRoutes()
	{
		return Runtime.Vector.create([
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-settings",
				"name": "admin:project:save",
				"model": "Runtime.WordPress.Admin.Settings.ProjectSaveModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-settings&action=create",
				"name": "admin:project:create",
				"model": "Runtime.WordPress.Admin.Settings.ProjectCreateModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-migrations",
				"name": "admin:database:migrations",
				"model": "Runtime.WordPress.Admin.Migrations.MigrationPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-forms",
				"name": "admin:forms:data:index",
				"model": "Runtime.WordPress.Admin.FormData.FormDataPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-forms-settings",
				"name": "admin:forms:settings:index",
				"model": "Runtime.WordPress.Admin.FormSettings.FormSettingsPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-gallery",
				"name": "admin:gallery:index",
				"model": "Runtime.WordPress.Admin.Gallery.GalleryPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-gallery&action=item",
				"name": "admin:gallery:item",
				"model": "Runtime.WordPress.Admin.GalleryItem.GalleryItemPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-mail-log",
				"name": "admin:mail:log:index",
				"model": "Runtime.WordPress.Admin.MailLog.MailLogPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-mail-settings",
				"name": "admin:mail:settings:index",
				"model": "Runtime.WordPress.Admin.MailSettings.MailSettingsPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-fonts",
				"name": "baylang:project:fonts:index",
				"model": "BayLang.Constructor.Frontend.Fonts.FontPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-fonts&action=edit",
				"name": "baylang:project:fonts:edit",
				"model": "BayLang.Constructor.Frontend.Fonts.FontSaveModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-widgets",
				"name": "baylang:project:widgets",
				"model": "BayLang.Constructor.Frontend.Widget.WidgetListModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-widgets&action=open",
				"name": "baylang:project:widget:edit",
				"model": "BayLang.Constructor.Frontend.Editor.WidgetEditPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-code-editor",
				"name": "baylang:project:code:editor",
				"model": "BayLang.Constructor.Frontend.Code.CodeEditorModel",
				"data": Runtime.Map.create({
					"back_url": "admin.php?page=baylang",
				}),
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-robots-txt",
				"name": "admin:robots:txt",
				"model": "Runtime.WordPress.Admin.Robots.RobotsPageModel",
			})),
			new Runtime.Web.RouteModel(Runtime.Map.create({
				"uri": "admin.php?page=baylang-cabinet-users",
				"name": "admin:cabinet:users",
				"model": "Runtime.WordPress.Admin.Cabinet.Users.UserModel",
			})),
		]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Admin.Routes"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Admin.Routes"] = Runtime.WordPress.Admin.Routes;