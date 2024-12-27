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
if (typeof BayLang.Constructor.Backend == 'undefined') BayLang.Constructor.Backend = {};
if (typeof BayLang.Constructor.Backend.Api == 'undefined') BayLang.Constructor.Backend.Api = {};
BayLang.Constructor.Backend.Api.ProjectSaveApi = function()
{
	Runtime.Widget.Crud.SaveApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.ProjectSaveApi.prototype = Object.create(Runtime.Widget.Crud.SaveApi.prototype);
BayLang.Constructor.Backend.Api.ProjectSaveApi.prototype.constructor = BayLang.Constructor.Backend.Api.ProjectSaveApi;
Object.assign(BayLang.Constructor.Backend.Api.ProjectSaveApi.prototype,
{
	/**
	 * Returns rules
	 */
	getRules: function()
	{
		return Runtime.Vector.from([new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"name"})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"template","check_update":false}))]);
	},
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id","name","description"]);
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["name","description"]);
	},
	/**
	 * New item
	 */
	newItem: async function()
	{
		return new BayLang.Helper.Project(null);
	},
	/**
	 * Find item
	 */
	findItem: async function(pk)
	{
		var project_id = pk.get("id");
		return Promise.resolve(await BayLang.Constructor.Backend.ApiHook.getProject(project_id));
	},
	/**
	 * Reload cache
	 */
	reloadCache: async function()
	{
		/* Load data */
		await this.loadItem(false);
		/* Project path */
		var project_path = this.item.getPath();
		var cache_path = Runtime.fs.join(Runtime.Vector.from([project_path,".cache"]));
		/* Remove cache */
		/* Load project */
		await this.item.load();
		/* Success */
		this.success();
	},
	/**
	 * Action item
	 */
	actionItem: async function()
	{
		/* Load data */
		await this.loadItem(false);
		/* Get domains */
		var domains = Runtime.Vector.from([]);
		if (this.item.info.has("domains"))
		{
			domains = this.item.info.get("domains");
		}
		/* Success */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"item":Runtime.Map.from({"id":this.item.getID(),"name":this.item.getName(),"description":this.item.getDescription(),"domains":domains})})}));
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		/* Load data */
		await this.loadItem();
		await this.loadData();
		/* Set project info */
		if (this.data.has("name"))
		{
			this.item.setName(this.data.get("name"));
		}
		if (this.data.has("description"))
		{
			this.item.setDescription(this.data.get("description"));
		}
		if (this.data.has("domains"))
		{
			this.item.info.set("domains", this.data.get("domains"));
		}
		/* Save project */
		await this.item.saveInfo();
		/* Success */
		this.success();
	},
});
Object.assign(BayLang.Constructor.Backend.Api.ProjectSaveApi, Runtime.Widget.Crud.SaveApi);
Object.assign(BayLang.Constructor.Backend.Api.ProjectSaveApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.project::save";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.ProjectSaveApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SaveApi";
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
			"reloadCache",
			"actionItem",
			"actionSave",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "reloadCache")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		if (field_name == "actionItem")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		if (field_name == "actionSave")
		{
			var Vector = Runtime.Vector;
			var Map = Runtime.Map;
			return Map.from({
				"async": true,
				"annotations": Vector.from([
					new Runtime.Web.Annotations.ApiMethod(),
				]),
			});
		}
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.ProjectSaveApi);
window["BayLang.Constructor.Backend.Api.ProjectSaveApi"] = BayLang.Constructor.Backend.Api.ProjectSaveApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.ProjectSaveApi;