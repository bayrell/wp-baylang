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
Runtime.Web.BaseApi = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.BaseApi.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.BaseApi.prototype.constructor = Runtime.Web.BaseApi;
Object.assign(Runtime.Web.BaseApi.prototype,
{
	/**
	 * Init api
	 */
	init: function()
	{
	},
	/**
	 * Before route
	 */
	onActionBefore: async function()
	{
	},
	/**
	 * After route
	 */
	onActionAfter: async function()
	{
	},
	/**
	 * Set success
	 */
	success: function(data)
	{
		if (data == undefined) data = null;
		this.result.success(data);
	},
	/**
	 * Setup exception
	 */
	exception: function(e)
	{
		this.result.exception(e);
	},
	/**
	 * Setup fail
	 */
	fail: function(data)
	{
		if (data == undefined) data = null;
		this.result.fail(data);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.action = "";
		this.post_data = null;
		this.result = null;
		this.backend_storage = null;
	},
});
Object.assign(Runtime.Web.BaseApi, Runtime.BaseObject);
Object.assign(Runtime.Web.BaseApi,
{
	/**
	 * Returns api name
	 */
	getApiName: function()
	{
		return "";
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.BaseApi";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseObject";
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
Runtime.rtl.defClass(Runtime.Web.BaseApi);
window["Runtime.Web.BaseApi"] = Runtime.Web.BaseApi;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.BaseApi;