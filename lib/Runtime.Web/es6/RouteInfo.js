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
Runtime.Web.RouteInfo = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super();
		this._assign_values(params);
	}
	
	
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("data", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
		rules.addType("domain", new Runtime.Serializer.StringType());
		rules.addType("label", new Runtime.Serializer.StringType());
		rules.addType("layout", new Runtime.Serializer.StringType());
		rules.addType("name", new Runtime.Serializer.StringType());
		rules.addType("matches", new Runtime.Serializer.MapType(new Runtime.Serializer.StringType()));
		rules.addType("params", new Runtime.Serializer.VectorType(new Runtime.Serializer.StringType()));
		rules.addType("pos", new Runtime.Serializer.IntegerType());
		rules.addType("route_class", new Runtime.Serializer.StringType());
		rules.addType("uri", new Runtime.Serializer.StringType());
		rules.addType("uri_match", new Runtime.Serializer.StringType());
	}
	
	
	/**
	 * Copy route
	 */
	copy()
	{
		return Runtime.rtl.copy(this);
	}
	
	
	/**
	 * Returns layout name
	 */
	getLayoutName()
	{
		if (this.layout != "") return this.layout;
		if (this.route_class != "")
		{
			let f = new Runtime.Method(this.route_class, "getLayoutName");
			return f.exists() ? f.apply() : "";
		}
		return "";
	}
	
	
	/**
	 * Compile route
	 */
	compile()
	{
		if (this.uri_match == "" || this.uri_match == null)
		{
			this.uri_match = "^" + String(Runtime.re.replace("\\/", "\\/", this.uri)) + String("$");
		}
		let matches = Runtime.re.matchAll("{(.*?)}", this.uri);
		if (matches)
		{
			let params = new Runtime.Vector();
			for (let i = 0; i < matches.count(); i++)
			{
				let arr = matches[i];
				let name = arr[1];
				this.uri_match = Runtime.re.replace("{" + String(name) + String("}"), "([^\\/]*?)", this.uri_match);
				this.params.push(name);
			}
		}
		else
		{
			this.params = Runtime.Vector.create([]);
		}
	}
	
	
	/**
	 * Add matches
	 */
	addMatches(matches)
	{
		for (let i = 0; i < this.params.count(); i++)
		{
			let param_name = this.params.get(i);
			let match_value = matches.get(i);
			this.matches.set(param_name, match_value);
		}
	}
	
	
	/**
	 * Call middleware
	 */
	async callMiddleware(container)
	{
		if (this.middleware)
		{
			for (let i = 0; i < this.middleware.count(); i++)
			{
				let middleware = null;
				let item = this.middleware.get(i);
				/* Create middleware */
				if (Runtime.rtl.isString(item))
				{
					middleware = Runtime.rtl.newInstance(item);
				}
				else if (item instanceof Runtime.Entity.Factory)
				{
					middleware = item.factory();
				}
				/* Apply middleware */
				await middleware.route(container);
			}
		}
		/* Call route class middleware */
		if (this.route_class)
		{
			let class_name = this.route_class;
			let getMiddleware = new Runtime.Method(class_name, "getMiddleware");
			if (getMiddleware.exists())
			{
				let items = getMiddleware.apply();
				for (let i = 0; i < items.count(); i++)
				{
					let middleware = items.get(i);
					await middleware.route(container);
				}
			}
		}
	}
	
	
	/**
	 * Render route
	 */
	async render(container)
	{
		throw new Runtime.Exceptions.RuntimeException("RouteInfo is abstract class");
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.name = null;
		this.uri = null;
		this.uri_match = null;
		this.domain = null;
		this.label = null;
		this.layout = null;
		this.route_class = null;
		this.method = "GET";
		this.data = null;
		this.middleware = null;
		this.params = Runtime.Vector.create([]);
		this.matches = new Runtime.Map();
		this.is_backend = false;
		this.pos = 100;
	}
	static getClassName(){ return "Runtime.Web.RouteInfo"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return ["Runtime.SerializeInterface"]; }
};
window["Runtime.Web.RouteInfo"] = Runtime.Web.RouteInfo;