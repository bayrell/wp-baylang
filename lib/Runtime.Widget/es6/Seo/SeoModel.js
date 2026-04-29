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
if (typeof Runtime.Widget == 'undefined') Runtime.Widget = {};
if (typeof Runtime.Widget.Seo == 'undefined') Runtime.Widget.Seo = {};
Runtime.Widget.Seo.SeoModel = class extends Runtime.BaseModel
{
	/**
	 * Process frontend data
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("article_modified_time", new Runtime.Serializer.StringType());
		rules.addType("article_published_time", new Runtime.Serializer.StringType());
		rules.addType("canonical_url", new Runtime.Serializer.StringType());
		rules.addType("favicon", new Runtime.Serializer.StringType());
		rules.addType("robots", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
		rules.addType("tags", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
	}
	
	
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
		if (params == null) return;
	}
	
	
	/**
	 * Set canonical url
	 */
	setCanonicalUrl(canonical_url)
	{
		/* Add domain */
		let request = this.layout.get("request");
		if (request.host)
		{
			canonical_url = "//" + String(request.host) + String(canonical_url);
			if (request.is_https) canonical_url = "https:" + String(canonical_url);
			else canonical_url = "http:" + String(canonical_url);
		}
		this.canonical_url = canonical_url;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.component = "Runtime.Widget.Seo.SeoWidget";
		this.widget_name = "seo";
		this.canonical_url = "";
		this.favicon = "";
		this.article_published_time = "";
		this.article_modified_time = "";
		this.robots = Runtime.Vector.create(["follow", "index"]);
		this.tags = null;
	}
	static getClassName(){ return "Runtime.Widget.Seo.SeoModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.Seo.SeoModel"] = Runtime.Widget.Seo.SeoModel;