"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2025 "Ildar Bikmamatov" <support@bayrell.org>
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
Runtime.Web.Request = class extends Runtime.BaseObject
{
	static METHOD_GET = "GET";
	static METHOD_HEAD = "HEAD";
	static METHOD_POST = "POST";
	static METHOD_PUT = "PUT";
	static METHOD_DELETE = "DELETE";
	static METHOD_CONNECT = "CONNECT";
	static METHOD_OPTIONS = "OPTIONS";
	static METHOD_TRACE = "TRACE";
	static METHOD_PATCH = "PATCH";
	
	
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("uri", new Runtime.Serializer.StringType());
		rules.addType("full_uri", new Runtime.Serializer.StringType());
		rules.addType("host", new Runtime.Serializer.StringType());
		rules.addType("method", new Runtime.Serializer.StringType());
		rules.addType("protocol", new Runtime.Serializer.StringType());
		rules.addType("is_https", new Runtime.Serializer.BooleanType());
		rules.addType("query", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Assign rules
	 */
	assignRules(rules)
	{
	}
	
	
	/**
	 * Returns client ip
	 */
	getClientIP()
	{
		let params = Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.CLIENT_IP, Runtime.Map.create({
			"headers": this.headers,
			"client_ip": this.headers.get("REMOTE_ADDR"),
		}));
		return params.get("client_ip");
	}
	
	
	/**
	 * Init request
	 */
	initUri(full_uri)
	{
		let res = Runtime.rs.parse_url(full_uri);
		let uri = res.get("uri");
		let query = res.get("query_arr");
		this.full_uri = full_uri;
		this.uri = uri;
		this.query = query;
		if (this.uri == "") this.uri = "/";
	}
	
	
	/**
	 * Split prefix
	 */
	static splitPrefix(uri, route_prefix)
	{
		if (route_prefix == undefined) route_prefix = "";
		/* Route prefix */
		if (route_prefix == null) route_prefix = "";
		let route_prefix_sz = Runtime.rs.strlen(route_prefix);
		if (route_prefix_sz != 0 && Runtime.rs.substr(uri, 0, route_prefix_sz) == route_prefix)
		{
			uri = Runtime.rs.substr(uri, route_prefix_sz);
		}
		return uri;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.uri = "";
		this.full_uri = "";
		this.host = "";
		this.method = "GET";
		this.protocol = "";
		this.is_https = false;
		this.query = null;
	}
	static getClassName(){ return "Runtime.Web.Request"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.Web.Request"] = Runtime.Web.Request;