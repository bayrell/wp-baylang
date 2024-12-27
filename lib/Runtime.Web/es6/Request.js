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
Runtime.Web.Request = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.Request.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.Request.prototype.constructor = Runtime.Web.Request;
Object.assign(Runtime.Web.Request.prototype,
{
	/**
	 * Returns client ip
	 */
	getClientIp: function()
	{
		return this.headers.get("REMOTE_ADDR");
	},
	/**
	 * Init request
	 */
	initUri: function(full_uri)
	{
		var res = Runtime.rs.parse_url(full_uri);
		var uri = Runtime.rtl.attr(res, "uri");
		var query = Runtime.rtl.attr(res, "query_arr");
		this.full_uri = full_uri;
		this.uri = uri;
		this.query = query;
		if (this.uri == "")
		{
			this.uri = "/";
		}
		/* Route prefix */
		var route_prefix = Runtime.rtl.getContext().env("ROUTE_PREFIX");
		if (route_prefix == null)
		{
			route_prefix = "";
		}
		var route_prefix_sz = Runtime.rs.strlen(route_prefix);
		if (route_prefix_sz != 0 && Runtime.rs.substr(this.uri, 0, route_prefix_sz) == route_prefix)
		{
			this.uri = Runtime.rs.substr(this.uri, route_prefix_sz);
			this.full_uri = Runtime.rs.substr(this.full_uri, route_prefix_sz);
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.uri = "";
		this.full_uri = "";
		this.host = "";
		this.method = "GET";
		this.protocol = "";
		this.is_https = false;
		this.query = null;
		this.payload = null;
		this.cookies = null;
		this.headers = null;
		this.start_time = 0;
	},
});
Object.assign(Runtime.Web.Request, Runtime.BaseObject);
Object.assign(Runtime.Web.Request,
{
	METHOD_GET: "GET",
	METHOD_HEAD: "HEAD",
	METHOD_POST: "POST",
	METHOD_PUT: "PUT",
	METHOD_DELETE: "DELETE",
	METHOD_CONNECT: "CONNECT",
	METHOD_OPTIONS: "OPTIONS",
	METHOD_TRACE: "TRACE",
	METHOD_PATCH: "PATCH",
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Request";
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
Runtime.rtl.defClass(Runtime.Web.Request);
window["Runtime.Web.Request"] = Runtime.Web.Request;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Request;