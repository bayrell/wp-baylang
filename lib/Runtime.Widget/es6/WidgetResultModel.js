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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
Runtime.Widget.WidgetResultModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.WidgetResultModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.WidgetResultModel.prototype.constructor = Runtime.Widget.WidgetResultModel;
Object.assign(Runtime.Widget.WidgetResultModel.prototype,
{
	/**
	 * Init widget params
	 */
	initParams: function(params)
	{
		Runtime.Web.BaseModel.prototype.initParams.call(this, params);
		if (params == null)
		{
			return ;
		}
		if (params.has("styles"))
		{
			this.styles = params.get("styles");
		}
	},
	/**
	 * Message
	 */
	setMessage: function(message)
	{
		this.message = message;
	},
	/**
	 * Success
	 */
	setSuccess: function(message, code)
	{
		if (code == undefined) code = 1;
		this.code = code;
		this.message = message;
	},
	/**
	 * Error
	 */
	setError: function(message, code)
	{
		if (code == undefined) code = -1;
		this.code = code;
		this.message = message;
	},
	/**
	 * Set exception
	 */
	setException: function(e)
	{
		this.code = e.getErrorCode();
		this.message = e.getErrorMessage();
	},
	/**
	 * Set api result
	 */
	setApiResult: function(res)
	{
		this.code = res.code;
		this.message = res.message;
	},
	/**
	 * Set wait message
	 */
	setWaitMessage: function(message)
	{
		if (message == undefined) message = "";
		this.code = 0;
		this.message = (message != "") ? (message) : ("Wait please ...");
	},
	/**
	 * Clear error
	 */
	clear: function()
	{
		this.code = 0;
		this.message = "";
	},
	/**
	 * Returns true if error
	 */
	isError: function()
	{
		return this.code < 0;
	},
	/**
	 * Returns true if success
	 */
	isSuccess: function()
	{
		return this.code > 0;
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "code", data);
		serializer.process(this, "message", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.code = 0;
		this.message = "";
		this.widget_name = "result";
		this.component = "Runtime.Widget.WidgetResult";
		this.styles = Runtime.Vector.from([]);
	},
});
Object.assign(Runtime.Widget.WidgetResultModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.WidgetResultModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget";
	},
	getClassName: function()
	{
		return "Runtime.Widget.WidgetResultModel";
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
Runtime.rtl.defClass(Runtime.Widget.WidgetResultModel);
window["Runtime.Widget.WidgetResultModel"] = Runtime.Widget.WidgetResultModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.WidgetResultModel;