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
Runtime.Web.BaseApi = class extends Runtime.BaseObject
{
	/**
	 * Create object
	 */
	constructor(params)
	{
		if (params == undefined) params = null;
		super();
		this.initParams(params);
	}
	
	
	/**
	 * Setup api
	 */
	initParams(params)
	{
	}
	
	
	/**
	 * Returns api name
	 */
	static getApiName(){ return ""; }
	
	
	/**
	 * Returns data rules
	 */
	getDataRules(rules)
	{
	}
	
	
	/**
	 * Returns middleware
	 */
	getMiddleware(){ return Runtime.Vector.create([]); }
	
	
	/**
	 * Set action
	 */
	setAction(action)
	{
		this.action = action;
	}
	
	
	/**
	 * Set request
	 */
	setRequest(request)
	{
		this.request = request;
		this.storage = request.storage;
	}
	
	
	/**
	 * Filter rules
	 */
	filter(data, rules, error)
	{
		if (error == undefined) error = Runtime.Vector.create([]);
		data = rules.filter(data, error);
		if (error.count() > 0)
		{
			throw new Runtime.Exceptions.ApiError(new Runtime.Exceptions.FieldException(Runtime.Map.create({
				"error": Runtime.Serializer.TypeError.getMap(error),
			})));
		}
		return data;
	}
	
	
	/**
	 * Filter data
	 */
	filterData()
	{
		let errors = Runtime.Vector.create([]);
		let rules = new Runtime.Serializer.MapType();
		this.getDataRules(rules);
		this.data = this.filter(this.request.data, rules, errors);
	}
	
	
	/**
	 * Set success
	 */
	success(data)
	{
		if (data == undefined) data = null;
		return this.result.success(data);
	}
	
	
	/**
	 * Setup exception
	 */
	exception(e)
	{
		return this.result.exception(e);
	}
	
	
	/**
	 * Setup fail
	 */
	fail(data)
	{
		if (data == undefined) data = null;
		return this.result.fail(data);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.action = "";
		this.request = null;
		this.result = new Runtime.Web.ApiResult();
		this.data = null;
		this.storage = null;
	}
	static getClassName(){ return "Runtime.Web.BaseApi"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Web.BaseApi"] = Runtime.Web.BaseApi;