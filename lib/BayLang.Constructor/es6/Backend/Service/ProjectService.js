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
if (typeof BayLang.Constructor.Backend.Service == 'undefined') BayLang.Constructor.Backend.Service = {};
BayLang.Constructor.Backend.Service.ProjectService = function()
{
	Runtime.Widget.Crud.CrudService.apply(this, arguments);
};
BayLang.Constructor.Backend.Service.ProjectService.prototype = Object.create(Runtime.Widget.Crud.CrudService.prototype);
BayLang.Constructor.Backend.Service.ProjectService.prototype.constructor = BayLang.Constructor.Backend.Service.ProjectService;
Object.assign(BayLang.Constructor.Backend.Service.ProjectService.prototype,
{
	/**
	 * Init rules
	 */
	initRules: function()
	{
		this.rules.addRules(Runtime.Vector.from([new Runtime.Widget.Crud.Rules.MatchRule(Runtime.Map.from({"name":"id","regular":Runtime.Widget.Crud.Rules.MatchRule.ALPHA_NUMERIC_DASH})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"id","check_update":false})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"name"}))]));
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["id","name","description"]);
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
	 * Convert item
	 */
	convertItem: function(item, fields)
	{
		/* Get domains */
		var domains = Runtime.Vector.from([]);
		if (this.item.info && this.item.info.has("domains"))
		{
			domains = this.item.info.get("domains");
		}
		/* Get data */
		var data = Runtime.Map.from({"id":item.getID(),"name":item.getName(),"description":item.getDescription(),"domains":domains});
		return data.intersect(fields);
	},
	/**
	 * Set item
	 */
	setItemValue: function(item, key, value)
	{
		if (key == "name")
		{
			item.setName(value);
		}
		else if (key == "description")
		{
			item.setDescription(value);
		}
	},
	/**
	 * Save item
	 */
	saveItem: async function()
	{
		/* Save project */
		await this.item.saveInfo();
	},
	/**
	 * Returns modules
	 */
	getModules: async function()
	{
		/* Load project */
		await this.item.load();
		/* Get modules */
		var items = this.item.modules.transition((item) =>
		{
			return item;
		});
		/* Sort modules */
		items = items.sort((a, b) =>
		{
			return Runtime.rs.compare(a.getName(), b.getName());
		});
		/* Filter items */
		return Promise.resolve(items.map((module) =>
		{
			return Runtime.Map.from({"id":module.getName()});
		}));
	},
	/**
	 * Reload
	 */
	reload: async function()
	{
		/* Project path */
		var project_path = this.item.getPath();
		var cache_path = Runtime.fs.join(Runtime.Vector.from([project_path,".cache"]));
		/* Remove cache */
		/* Load project */
		await this.item.load();
		return Promise.resolve(true);
	},
});
Object.assign(BayLang.Constructor.Backend.Service.ProjectService, Runtime.Widget.Crud.CrudService);
Object.assign(BayLang.Constructor.Backend.Service.ProjectService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Service";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Service.ProjectService";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.CrudService";
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
Runtime.rtl.defClass(BayLang.Constructor.Backend.Service.ProjectService);
window["BayLang.Constructor.Backend.Service.ProjectService"] = BayLang.Constructor.Backend.Service.ProjectService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Service.ProjectService;