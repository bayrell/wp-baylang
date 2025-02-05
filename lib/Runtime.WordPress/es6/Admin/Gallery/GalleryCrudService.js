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
if (typeof Runtime.WordPress.Admin.Gallery == 'undefined') Runtime.WordPress.Admin.Gallery = {};
Runtime.WordPress.Admin.Gallery.GalleryCrudService = function()
{
	Runtime.Widget.Crud.RelationService.apply(this, arguments);
};
Runtime.WordPress.Admin.Gallery.GalleryCrudService.prototype = Object.create(Runtime.Widget.Crud.RelationService.prototype);
Runtime.WordPress.Admin.Gallery.GalleryCrudService.prototype.constructor = Runtime.WordPress.Admin.Gallery.GalleryCrudService;
Object.assign(Runtime.WordPress.Admin.Gallery.GalleryCrudService.prototype,
{
	/**
	 * Returns relation name
	 */
	getRelationName: function()
	{
		return "Runtime.WordPress.Database.Gallery";
	},
	/**
	 * Init rules
	 */
	initRules: function()
	{
		this.rules.addRules(Runtime.Vector.from([new Runtime.Widget.Crud.Rules.LowerCase(Runtime.Map.from({"name":"api_name"})),new Runtime.Widget.Crud.Rules.Required(Runtime.Map.from({"name":"api_name"})),new Runtime.Widget.Crud.Rules.MatchRule(Runtime.Map.from({"name":"api_name","regular":Runtime.Widget.Crud.Rules.MatchRule.ALPHA_NUMERIC_DASH})),new Runtime.Widget.Crud.Rules.Unique(Runtime.Map.from({"keys":Runtime.Vector.from(["api_name"])}))]));
	},
	/**
	 * Returns save fields
	 */
	getSaveFields: function()
	{
		return Runtime.Vector.from(["api_name"]);
	},
	/**
	 * Build search query
	 */
	buildSearchQuery: async function(q)
	{
		q.orderBy("api_name", "asc");
	},
});
Object.assign(Runtime.WordPress.Admin.Gallery.GalleryCrudService, Runtime.Widget.Crud.RelationService);
Object.assign(Runtime.WordPress.Admin.Gallery.GalleryCrudService,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Admin.Gallery";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Admin.Gallery.GalleryCrudService";
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
Runtime.rtl.defClass(Runtime.WordPress.Admin.Gallery.GalleryCrudService);
window["Runtime.WordPress.Admin.Gallery.GalleryCrudService"] = Runtime.WordPress.Admin.Gallery.GalleryCrudService;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Admin.Gallery.GalleryCrudService;