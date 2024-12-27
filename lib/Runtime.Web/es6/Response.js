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
Runtime.Web.Response = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.Response.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.Response.prototype.constructor = Runtime.Web.Response;
Object.assign(Runtime.Web.Response.prototype,
{
	/**
	 * Returns content
	 */
	getContent: function()
	{
		return this.content;
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.http_code = 200;
		this.ob_content = "";
		this.content = "";
		this.headers = Runtime.Map.from({});
	},
});
Object.assign(Runtime.Web.Response, Runtime.BaseObject);
Object.assign(Runtime.Web.Response,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Response";
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
Runtime.rtl.defClass(Runtime.Web.Response);
window["Runtime.Web.Response"] = Runtime.Web.Response;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Response;