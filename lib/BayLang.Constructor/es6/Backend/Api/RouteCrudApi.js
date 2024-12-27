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
BayLang.Constructor.Backend.Api.RouteCrudApi = function()
{
	Runtime.Widget.Crud.CrudApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.RouteCrudApi.prototype = Object.create(Runtime.Widget.Crud.CrudApi.prototype);
BayLang.Constructor.Backend.Api.RouteCrudApi.prototype.constructor = BayLang.Constructor.Backend.Api.RouteCrudApi;
Object.assign(BayLang.Constructor.Backend.Api.RouteCrudApi.prototype,
{
	/**
	 * Returns item fields
	 */
	getItemFields: function()
	{
		return Runtime.Vector.from(["id"]);
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Returns rules
	 */
	getRules: function()
	{
		return Runtime.Vector.from([new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"name"})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"url"}))]);
	},
	/**
	 * Convert item
	 */
	convertItem: function(fields, item)
	{
		return Runtime.Map.from({"name":item.get("name"),"url":item.get("uri"),"model":item.get("model")});
	},
	/**
	 * Returns item primary key
	 */
	getItemPrimaryKey: function(item)
	{
		return Runtime.Map.from({"name":item.get("name")});
	},
	/**
	 * Search items
	 */
	searchItems: async function()
	{
		this.page = 1;
		this.items = Runtime.Vector.from([]);
		var module_path = Runtime.rtl.getContext().env("module_path");
		var project_path = Runtime.rtl.getContext().env("project_path");
		this.project = await BayLang.Helper.Project.readProject(project_path);
		if (!this.project)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.ItemNotFound(project_path, "Project"))
		}
		/* Load project */
		await this.project.load();
		/* Add routes */
		if (this.project.modules != null)
		{
			var modules = this.project.modules.keys();
			for (var i = 0; i < modules.count(); i++)
			{
				var module_name = modules.get(i);
				var module = this.project.modules.get(module_name);
				if (module.path != module_path)
				{
					continue;
				}
				if (!module.routes)
				{
					continue;
				}
				this.items.appendItems(module.routes);
			}
			this.items = this.items.sort();
		}
	},
	/**
	 * Find item by primary key
	 */
	findItem: async function(pk)
	{
		if (pk == null)
		{
			return Promise.resolve();
		}
		var module_id = pk.get("id");
		var project_id = this.post_data.get("project_id");
		this.project = await BayLang.Helper.Project.readProject(Runtime.fs.join(Runtime.Vector.from(["/data/constructor/projects",project_id])));
		if (!this.project)
		{
			return Promise.resolve();
		}
	},
	/**
	 * Create new relation
	 */
	newRelation: async function()
	{
		throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Method not allowed"))
	},
	/**
	 * Update item
	 */
	updateItem: async function(update_data)
	{
		throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Method not allowed"))
	},
	/**
	 * Action search
	 */
	actionSearch: async function()
	{
		await Runtime.Widget.Crud.CrudApi.prototype.actionSearch.call(this);
	},
	/**
	 * Action save
	 */
	actionSave: async function()
	{
		await Runtime.Widget.Crud.CrudApi.prototype.actionSave.call(this);
	},
	/**
	 * Action delete
	 */
	actionDelete: async function()
	{
		throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.RuntimeException("Method not allowed"))
	},
});
Object.assign(BayLang.Constructor.Backend.Api.RouteCrudApi, Runtime.Widget.Crud.CrudApi);
Object.assign(BayLang.Constructor.Backend.Api.RouteCrudApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "admin.constructor.route::crud";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.RouteCrudApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.CrudApi";
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
			"actionSearch",
			"actionSave",
			"actionDelete",
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		if (field_name == "actionSearch")
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
		if (field_name == "actionDelete")
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.RouteCrudApi);
window["BayLang.Constructor.Backend.Api.RouteCrudApi"] = BayLang.Constructor.Backend.Api.RouteCrudApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.RouteCrudApi;