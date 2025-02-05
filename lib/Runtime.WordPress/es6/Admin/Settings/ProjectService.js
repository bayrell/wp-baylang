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
if (typeof Runtime.WordPress.Admin.Settings == 'undefined') Runtime.WordPress.Admin.Settings = {};
Runtime.WordPress.Admin.Settings.ProjectService = function()
{
	BayLang.Constructor.Backend.Service.ProjectService.apply(this, arguments);
};
Runtime.WordPress.Admin.Settings.ProjectService.prototype = Object.create(BayLang.Constructor.Backend.Service.ProjectService.prototype);
Runtime.WordPress.Admin.Settings.ProjectService.prototype.constructor = Runtime.WordPress.Admin.Settings.ProjectService;
Object.assign(Runtime.WordPress.Admin.Settings.ProjectService.prototype,
{
	/**
	 * Validate data
	 */
	validate: async function()
	{
		await BayLang.Constructor.Backend.Service.ProjectService.prototype.validate.call(this);
		/* Check if project is exist */
		if (this.isCreate())
		{
			var theme_root_path = "";
			var api_name = this.data.get("id");
			/* Check theme is exists */
			var theme_path = Runtime.fs.join(Runtime.Vector.from([theme_root_path,api_name]));
			if (await Runtime.fs.exists(theme_path))
			{
				this.rules.addFieldError("api_name", "Api name is exists");
			}
		}
	},
	/**
	 * Before save
	 */
	onSaveBefore: async function()
	{
		await BayLang.Constructor.Backend.Service.ProjectService.prototype.onSaveBefore.call(this);
		if (!this.rules.correct())
		{
			return Promise.resolve();
		}
		/* Create project */
		if (this.isCreate())
		{
			await this.createProject();
		}
	},
	/**
	 * Create project
	 */
	createProject: async function()
	{
		var api_name = this.data.get("id");
		var file_archive = "";
		var theme_root_path = "";
		/* Create theme path */
		var theme_path = Runtime.fs.join(Runtime.Vector.from([theme_root_path,api_name]));
		if (!await Runtime.fs.exists(theme_path))
		{
			await Runtime.fs.mkdir(theme_path);
		}
		/* Copy project */
		/* Reload project */
		this.item = BayLang.Helper.Project.readProject(theme_path);
		await this.item.load();
	},
	/**
	 * Save item
	 */
	saveItem: async function()
	{
		await BayLang.Constructor.Backend.Service.ProjectService.prototype.saveItem.call(this);
		/* If project exists */
		if (!this.item.path)
		{
			return Promise.resolve();
		}
		/* Theme settings */
		var theme_name = this.item.getName();
		var theme_description = this.item.getDescription();
		/* Trim name and description */
		theme_name = Runtime.rs.trim(theme_name);
		theme_description = Runtime.rs.trim(theme_description);
		theme_description = Runtime.re.replace("[\n\r]", " ", theme_description);
		theme_description = Runtime.re.replace(" +", " ", theme_description);
		/* Save wordpress */
		var style_css_path = Runtime.fs.join(Runtime.Vector.from([this.item.path,"style.css"]));
		var style_css_content = Runtime.rs.join("\n", Runtime.Vector.from(["/*"," * Theme Name: " + Runtime.rtl.toStr(theme_name)," * Description: " + Runtime.rtl.toStr(theme_description)," */"]));
		await Runtime.fs.saveFile(style_css_path, style_css_content);
	},
});
Object.assign(Runtime.WordPress.Admin.Settings.ProjectService, BayLang.Constructor.Backend.Service.ProjectService);
Object.assign(Runtime.WordPress.Admin.Settings.ProjectService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Settings";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Settings.ProjectService";
	},
	getParentClassName: function()
	{
		return "BayLang.Constructor.Backend.Service.ProjectService";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Settings.ProjectService);
window["Runtime.WordPress.Admin.Settings.ProjectService"] = Runtime.WordPress.Admin.Settings.ProjectService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Settings.ProjectService;