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
Runtime.Widget.ResultModel = class extends Runtime.BaseModel
{
	/**
	 * Serialize object
	 */
	static serialize(rules)
	{
		super.serialize(rules);
		rules.addType("code", new Runtime.Serializer.IntegerType());
		rules.addType("message", new Runtime.Serializer.StringType());
	}
	
	
	/**
	 * Init widget params
	 */
	initParams(params)
	{
		super.initParams(params);
	}
	
	
	/**
	 * Message
	 */
	setMessage(message)
	{
		this.message = message;
	}
	
	
	/**
	 * Success
	 */
	setSuccess(message, code)
	{
		if (code == undefined) code = 1;
		this.code = code;
		this.message = message;
	}
	
	
	/**
	 * Error
	 */
	setError(message, code)
	{
		if (code == undefined) code = -1;
		this.code = code;
		this.message = message;
	}
	
	
	/**
	 * Set exception
	 */
	setException(e)
	{
		this.code = e.getErrorCode();
		this.message = e.getErrorMessage();
	}
	
	
	/**
	 * Set api result
	 */
	setApiResult(res)
	{
		this.code = res.code;
		this.message = res.message;
	}
	
	
	/**
	 * Set wait message
	 */
	setWaitMessage(message)
	{
		if (message == undefined) message = "";
		this.code = 0;
		this.message = message != "" ? message : "Wait please ...";
	}
	
	
	/**
	 * Clear error
	 */
	clear()
	{
		this.code = 0;
		this.message = "";
	}
	
	
	/**
	 * Returns true if error
	 */
	isError(){ return this.code < 0; }
	
	
	/**
	 * Returns true if success
	 */
	isSuccess(){ return this.code > 0; }
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.code = 0;
		this.message = "";
		this.component = "Runtime.Widget.Result";
	}
	static getClassName(){ return "Runtime.Widget.ResultModel"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Widget.ResultModel"] = Runtime.Widget.ResultModel;