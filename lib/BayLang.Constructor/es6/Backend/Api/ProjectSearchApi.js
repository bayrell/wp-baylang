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
BayLang.Constructor.Backend.Api.ProjectSearchApi = function()
{
	Runtime.Widget.Crud.SearchApi.apply(this, arguments);
};
BayLang.Constructor.Backend.Api.ProjectSearchApi.prototype = Object.create(Runtime.Widget.Crud.SearchApi.prototype);
BayLang.Constructor.Backend.Api.ProjectSearchApi.prototype.constructor = BayLang.Constructor.Backend.Api.ProjectSearchApi;
Object.assign(BayLang.Constructor.Backend.Api.ProjectSearchApi.prototype,
{
	/**
	 * Action search
	 */
	actionSearch: async function()
	{
		/* Get projects */
		var items = await BayLang.Constructor.Backend.ApiHook.getProjectList();
		/* Filter items */
		items = items.map((project) =>
		{
			return Runtime.Map.from({"id":project.getID(),"name":project.getName(),"description":project.getDescription()});
		});
		/* Set result */
		this.success(Runtime.Map.from({"data":Runtime.Map.from({"items":items,"page":0,"pages":1})}));
	},
});
Object.assign(BayLang.Constructor.Backend.Api.ProjectSearchApi, Runtime.Widget.Crud.SearchApi);
Object.assign(BayLang.Constructor.Backend.Api.ProjectSearchApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "baylang.constructor.project::search";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Backend.Api";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Backend.Api.ProjectSearchApi";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.SearchApi";
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
		return null;
	},
});
Runtime.rtl.defClass(BayLang.Constructor.Backend.Api.ProjectSearchApi);
window["BayLang.Constructor.Backend.Api.ProjectSearchApi"] = BayLang.Constructor.Backend.Api.ProjectSearchApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Backend.Api.ProjectSearchApi;