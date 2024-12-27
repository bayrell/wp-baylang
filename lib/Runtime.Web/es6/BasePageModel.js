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
if (typeof Runtime.Web == 'undefined') Runtime.Web = {};
Runtime.Web.BasePageModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Web.BasePageModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Web.BasePageModel.prototype.constructor = Runtime.Web.BasePageModel;
Object.assign(Runtime.Web.BasePageModel.prototype,
{
	/**
	 * Action index
	 */
	actionIndex: async function(container)
	{
		/* Load page data */
		await this.loadData(container);
		/* Create response */
		container.renderPage(this.component);
		/* Build title */
		this.buildTitle(container);
	},
	/**
	 * Build title
	 */
	buildTitle: function(container)
	{
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Web.BasePage";
	},
});
Object.assign(Runtime.Web.BasePageModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Web.BasePageModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BasePageModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseModel";
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
Runtime.rtl.defClass(Runtime.Web.BasePageModel);
window["Runtime.Web.BasePageModel"] = Runtime.Web.BasePageModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BasePageModel;