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
Runtime.Web.RouteInfo = function(params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this._assign_values(params);
};
Runtime.Web.RouteInfo.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.RouteInfo.prototype.constructor = Runtime.Web.RouteInfo;
Object.assign(Runtime.Web.RouteInfo.prototype,
{
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "data", data);
		serializer.process(this, "domain", data);
		serializer.process(this, "label", data);
		serializer.process(this, "layout", data);
		serializer.process(this, "matches", data);
		serializer.process(this, "middleware", data);
		serializer.process(this, "name", data);
		serializer.process(this, "params", data);
		serializer.process(this, "pos", data);
		serializer.process(this, "route_class", data);
		serializer.process(this, "uri", data);
		serializer.process(this, "uri_match", data);
	},
	/**
	 * Copy route
	 */
	copy: function()
	{
		return Runtime.Serializer.copy(this);
	},
	/**
	 * Compile route
	 */
	compile: function()
	{
		if (this.uri_match == "")
		{
			this.uri_match = "^" + Runtime.rtl.toStr(Runtime.re.replace("\\/", "\\/", this.uri)) + Runtime.rtl.toStr("$");
		}
		var matches = Runtime.re.matchAll("{(.*?)}", this.uri);
		if (matches)
		{
			var params = new Runtime.Vector();
			for (var i = 0; i < matches.count(); i++)
			{
				var arr = Runtime.rtl.attr(matches, i);
				var name = Runtime.rtl.attr(arr, 1);
				this.uri_match = Runtime.re.replace("{" + Runtime.rtl.toStr(name) + Runtime.rtl.toStr("}"), "([^\\/]*?)", this.uri_match);
				this.params.push(name);
			}
		}
		else
		{
			this.params = Runtime.Vector.from([]);
		}
	},
	/**
	 * Add matches
	 */
	addMatches: function(matches)
	{
		for (var i = 0; i < this.params.count(); i++)
		{
			var param_name = this.params.get(i);
			var match_value = matches.get(i);
			this.matches.set(param_name, match_value);
		}
	},
	/**
	 * Render route
	 */
	render: async function(container)
	{
		throw new Runtime.Exceptions.RuntimeException("RouteInfo is abstract class")
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.name = null;
		this.uri = null;
		this.uri_match = null;
		this.domain = null;
		this.label = null;
		this.layout = null;
		this.route_class = null;
		this.data = null;
		this.middleware = null;
		this.params = Runtime.Vector.from([]);
		this.matches = Runtime.Map.from({});
		this.is_backend = false;
		this.pos = 100;
	},
});
Object.assign(Runtime.Web.RouteInfo, Runtime.BaseObject);
Object.assign(Runtime.Web.RouteInfo,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.RouteInfo";
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
	__implements__:
	[
		Runtime.SerializeInterface,
	],
});
Runtime.rtl.defClass(Runtime.Web.RouteInfo);
window["Runtime.Web.RouteInfo"] = Runtime.Web.RouteInfo;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.RouteInfo;