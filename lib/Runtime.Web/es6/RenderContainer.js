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
Runtime.Web.RenderContainer = class extends Runtime.RenderContainer
{
	/**
	 * Resolve container
	 */
	async resolve()
	{
		/* Find route */
		await this.findRoute();
		/* Resolve route */
		await this.resolveRoute();
		/* Create response */
		this.createResponse();
	}
	
	
	/**
	 * Find route
	 */
	async findRoute()
	{
		/* Call hook find route */
		await Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.FIND_ROUTE_BEFORE, Runtime.Map.create({
			"container": this,
		}));
		/* Exit if route find */
		if (this.route != null) return;
		if (this.response != null) return;
		/* Find route */
		let routes = Runtime.rtl.getContext().provider("Runtime.Web.RouteProvider");
		this.route = routes.findRoute(this.request);
		/* Call hook found route */
		await Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.FIND_ROUTE_AFTER, Runtime.Map.create({
			"container": this,
		}));
	}
	
	
	/**
	 * Resolve route
	 */
	async resolveRoute()
	{
		if (!this.route) return;
		if (this.response) return;
		/* Create layout */
		let layout_name = this.route.getLayoutName();
		this.createLayout(layout_name);
		/* Call route before */
		await Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.ROUTE_BEFORE, Runtime.Map.create({
			"container": this,
		}));
		/* Call middleware */
		await this.callRouteMiddleware(this);
		if (this.response) return;
		/* Load layout data */
		await this.layout.loadData(this);
		/* Render route */
		if (this.route != null && this.response == null)
		{
			await this.route.render(this);
		}
		/* Call route after */
		await Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.ROUTE_AFTER, Runtime.Map.create({
			"container": this,
		}));
	}
	
	
	/**
	 * Call route middleware
	 */
	async callRouteMiddleware()
	{
		if (this.route)
		{
			await this.route.callMiddleware(this);
		}
		/* Call hook middleware */
		await Runtime.rtl.getContext().hook(Runtime.Web.Hooks.AppHook.ROUTE_MIDDLEWARE, Runtime.Map.create({
			"container": this,
		}));
	}
	
	
	/**
	 * Create response
	 */
	createResponse()
	{
		if (this.response) return;
		if (!this.layout) return;
		/* Create response */
		this.response = new Runtime.Web.Response();
		this.response.http_code = this.http_code;
		this.response.content = "<!DOCTYPE html>" + String(this.renderApp());
	}
	
	
	/**
	 * Set response
	 */
	setResponse(response)
	{
		this.response = response;
	}
	
	
	/**
	 * Add cookie
	 */
	addCookie(cookie)
	{
		this.cookies.set(cookie.name, cookie);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.request = null;
		this.response = null;
		this.route = null;
		this.layout = null;
		this.cookies = new Runtime.Map();
		this.http_code = 200;
	}
	static getClassName(){ return "Runtime.Web.RenderContainer"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.RenderContainer"] = Runtime.Web.RenderContainer;