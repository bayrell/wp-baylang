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
if (typeof BayLang.Constructor.Frontend == 'undefined') BayLang.Constructor.Frontend = {};
if (typeof BayLang.Constructor.Frontend.Layout == 'undefined') BayLang.Constructor.Frontend.Layout = {};
BayLang.Constructor.Frontend.Layout.ProjectLayoutModel = function()
{
	Runtime.Web.BaseLayoutModel.apply(this, arguments);
};
BayLang.Constructor.Frontend.Layout.ProjectLayoutModel.prototype = Object.create(Runtime.Web.BaseLayoutModel.prototype);
BayLang.Constructor.Frontend.Layout.ProjectLayoutModel.prototype.constructor = BayLang.Constructor.Frontend.Layout.ProjectLayoutModel;
Object.assign(BayLang.Constructor.Frontend.Layout.ProjectLayoutModel.prototype,
{
	/**
	 * Load data
	 */
	loadData: async function(container)
	{
		Runtime.Web.BaseLayoutModel.prototype.loadData.call(this, container);
		this.project_id = this.layout.route.matches.get("project_id");
		this.module_id = this.layout.route.matches.get("module_id");
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "module_id", data);
		serializer.process(this, "page_title", data);
		serializer.process(this, "project_id", data);
		Runtime.Web.BaseLayoutModel.prototype.serialize.call(this, serializer, data);
	},
	_init: function()
	{
		Runtime.Web.BaseLayoutModel.prototype._init.call(this);
		this.component = "BayLang.Constructor.Frontend.Layout.ProjectLayout";
		this.page_title = "";
		this.project_id = "";
		this.module_id = "";
	},
});
Object.assign(BayLang.Constructor.Frontend.Layout.ProjectLayoutModel, Runtime.Web.BaseLayoutModel);
Object.assign(BayLang.Constructor.Frontend.Layout.ProjectLayoutModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "BayLang.Constructor.Frontend.Layout";
	},
	getClassName: function()
	{
		return "BayLang.Constructor.Frontend.Layout.ProjectLayoutModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseLayoutModel";
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
Runtime.rtl.defClass(BayLang.Constructor.Frontend.Layout.ProjectLayoutModel);
window["BayLang.Constructor.Frontend.Layout.ProjectLayoutModel"] = BayLang.Constructor.Frontend.Layout.ProjectLayoutModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = BayLang.Constructor.Frontend.Layout.ProjectLayoutModel;