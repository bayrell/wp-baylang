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
Runtime.Web.RouteModel = function()
{
	Runtime.Web.RouteInfo.apply(this, arguments);
};
Runtime.Web.RouteModel.prototype = Object.create(Runtime.Web.RouteInfo.prototype);
Runtime.Web.RouteModel.prototype.constructor = Runtime.Web.RouteModel;
Object.assign(Runtime.Web.RouteModel.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "model", data);
		Runtime.Web.RouteInfo.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Render route
	 */
	render: async function(container)
	{
		var page_model_name = this.model;
		if (page_model_name == "")
		{
			return Promise.resolve();
		}
		if (!Runtime.rtl.class_exists(page_model_name))
		{
			return Promise.resolve();
		}
		/* Render page model */
		await container.renderPageModel(page_model_name);
	},
	_init: function()
	{
		Runtime.Web.RouteInfo.prototype._init.call(this);
		this.model = null;
	},
});
Object.assign(Runtime.Web.RouteModel, Runtime.Web.RouteInfo);
Object.assign(Runtime.Web.RouteModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteModel";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.RouteInfo";
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
Runtime.rtl.defClass(Runtime.Web.RouteModel);
window["Runtime.Web.RouteModel"] = Runtime.Web.RouteModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteModel;