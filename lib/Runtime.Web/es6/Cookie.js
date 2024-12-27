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
Runtime.Web.Cookie = function()
{
	Runtime.BaseStruct.apply(this, arguments);
};
Runtime.Web.Cookie.prototype = Object.create(Runtime.BaseStruct.prototype);
Runtime.Web.Cookie.prototype.constructor = Runtime.Web.Cookie;
Object.assign(Runtime.Web.Cookie.prototype,
{
	getOptions: function()
	{
		var res = new Runtime.Map();
		if (this.expires)
		{
			res.set("expires", this.expires);
		}
		if (this.domain)
		{
			res.set("domain", this.domain);
		}
		if (this.path)
		{
			res.set("path", this.path);
		}
		if (this.secure)
		{
			res.set("secure", this.secure);
		}
		if (this.httponly)
		{
			res.set("httponly", this.httponly);
		}
		if (this.samesite)
		{
			res.set("samesite", this.samesite);
		}
		return res.toDict();
	},
	_init: function()
	{
		Runtime.BaseStruct.prototype._init.call(this);
		this.name = "";
		this.value = "";
		this.expires = null;
		this.domain = "";
		this.path = "/";
		this.samesite = "Lax";
		this.secure = false;
		this.httponly = false;
		this.changed = false;
	},
	takeValue: function(k,d)
	{
		if (d == undefined) d = null;
		if (k == "name")return this.name;
		else if (k == "value")return this.value;
		else if (k == "expires")return this.expires;
		else if (k == "domain")return this.domain;
		else if (k == "path")return this.path;
		else if (k == "samesite")return this.samesite;
		else if (k == "secure")return this.secure;
		else if (k == "httponly")return this.httponly;
		else if (k == "changed")return this.changed;
		return Runtime.BaseStruct.prototype.takeValue.call(this,k,d);
	},
});
Object.assign(Runtime.Web.Cookie, Runtime.BaseStruct);
Object.assign(Runtime.Web.Cookie,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.Cookie";
	},
	getParentClassName: function()
	{
		return "Runtime.BaseStruct";
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
		a.push("name");
		a.push("value");
		a.push("expires");
		a.push("domain");
		a.push("path");
		a.push("samesite");
		a.push("secure");
		a.push("httponly");
		a.push("changed");
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
Runtime.rtl.defClass(Runtime.Web.Cookie);
window["Runtime.Web.Cookie"] = Runtime.Web.Cookie;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.Cookie;