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
if (typeof Runtime.WordPress.Admin.FormData == 'undefined') Runtime.WordPress.Admin.FormData = {};
Runtime.WordPress.Admin.FormData.FormDataCrudService = function()
{
	Runtime.Widget.Crud.RelationService.apply(this, arguments);
};
Runtime.WordPress.Admin.FormData.FormDataCrudService.prototype = Object.create(Runtime.Widget.Crud.RelationService.prototype);
Runtime.WordPress.Admin.FormData.FormDataCrudService.prototype.constructor = Runtime.WordPress.Admin.FormData.FormDataCrudService;
Object.assign(Runtime.WordPress.Admin.FormData.FormDataCrudService.prototype,
{
	/**
	 * Returns relation name
	 */
	getRelationName: function()
	{
		return "Runtime.WordPress.Database.FormData";
	},
	/**
	 * Init rules
	 */
	initRules: function()
	{
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from([]);
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
		if (this.isSearch())
		{
			q.orderBy("gmtime_add", "desc");
		}
	},
});
Object.assign(Runtime.WordPress.Admin.FormData.FormDataCrudService, Runtime.Widget.Crud.RelationService);
Object.assign(Runtime.WordPress.Admin.FormData.FormDataCrudService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.FormData";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.FormData.FormDataCrudService";
	},
	getParentClassName: function()
	{
		return "Runtime.Widget.Crud.RelationService";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.FormData.FormDataCrudService);
window["Runtime.WordPress.Admin.FormData.FormDataCrudService"] = Runtime.WordPress.Admin.FormData.FormDataCrudService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.FormData.FormDataCrudService;