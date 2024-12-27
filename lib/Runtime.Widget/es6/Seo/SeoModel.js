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
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.SeoModel = function()
{
	Runtime.Web.BaseModel.apply(this, arguments);
};
Runtime.Widget.Seo.SeoModel.prototype = Object.create(Runtime.Web.BaseModel.prototype);
Runtime.Widget.Seo.SeoModel.prototype.constructor = Runtime.Widget.Seo.SeoModel;
Object.assign(Runtime.Widget.Seo.SeoModel.prototype,
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
	},
	/**
	 * Process frontend data
	 */
	serialize: function(serializer, data)
	{
		serializer.process(this, "article_modified_time", data);
		serializer.process(this, "article_published_time", data);
		serializer.process(this, "canonical_url", data);
		serializer.process(this, "description", data);
		serializer.process(this, "favicon", data);
		serializer.process(this, "robots", data);
		serializer.process(this, "tags", data);
		Runtime.Web.BaseModel.prototype.serialize.call(this, serializer, data);
	},
	/**
	 * Set canonical url
	 */
	setCanonicalUrl: function(canonical_url)
	{
		/* Add domain */
		if (this.layout.request_host)
		{
			canonical_url = "//" + Runtime.rtl.toStr(this.layout.request_host) + Runtime.rtl.toStr(canonical_url);
			if (this.layout.request_https)
			{
				canonical_url = "https:" + Runtime.rtl.toStr(canonical_url);
			}
			else
			{
				canonical_url = "http:" + Runtime.rtl.toStr(canonical_url);
			}
		}
		this.canonical_url = canonical_url;
	},
	_init: function()
	{
		Runtime.Web.BaseModel.prototype._init.call(this);
		this.component = "Runtime.Widget.Seo.SeoWidget";
		this.widget_name = "seo";
		this.canonical_url = "";
		this.description = "";
		this.favicon = "";
		this.article_published_time = "";
		this.article_modified_time = "";
		this.robots = Runtime.Vector.from(["follow","index"]);
		this.tags = null;
	},
});
Object.assign(Runtime.Widget.Seo.SeoModel, Runtime.Web.BaseModel);
Object.assign(Runtime.Widget.Seo.SeoModel,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Widget.Seo";
	},
	getClassName: function()
	{
		return "Runtime.Widget.Seo.SeoModel";
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
Runtime.rtl.defClass(Runtime.Widget.Seo.SeoModel);
window["Runtime.Widget.Seo.SeoModel"] = Runtime.Widget.Seo.SeoModel;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Widget.Seo.SeoModel;