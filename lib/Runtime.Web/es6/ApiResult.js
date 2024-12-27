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
Runtime.Web.ApiResult = function()
{
	Runtime.BaseObject.apply(this, arguments);
};
Runtime.Web.ApiResult.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Web.ApiResult.prototype.constructor = Runtime.Web.ApiResult;
Object.assign(Runtime.Web.ApiResult.prototype,
{
	/**
	 * Returns true if error
	 */
	isError: function()
	{
		return this.code < 0;
	},
	/**
	 * Returns true if is exception
	 */
	isException: function()
	{
		return this.is_exception;
	},
	/**
	 * Returns true if success
	 */
	isSuccess: function()
	{
		return this.code > 0;
	},
	/**
	 * Get error message
	 */
	getErrorMessage: function()
	{
		return this.message;
	},
	/**
	 * Get error code
	 */
	getErrorCode: function()
	{
		return this.code;
	},
	/**
	 * Returns content
	 */
	getContent: function()
	{
		var res = Runtime.Map.from({"api_name":this.api_name,"method_name":this.method_name,"code":this.code,"message":this.message,"data":this.data});
		if (this.error_name != "")
		{
			res.set("error_name", this.error_name);
		}
		if (this.error_file != "")
		{
			res.set("error_file", this.error_file);
		}
		if (this.error_line != "")
		{
			res.set("error_line", this.error_line);
		}
		if (this.error_pos != "")
		{
			res.set("error_pos", this.error_pos);
		}
		if (this.error_trace != "")
		{
			res.set("error_trace", this.error_trace);
		}
		return res;
	},
	/**
	 * Import content
	 */
	importContent: function(content)
	{
		this.api_name = content.get("api_name", "");
		this.method_name = content.get("method_name", "");
		this.data = content.get("data", null);
		this.code = content.get("code", -1);
		this.message = content.get("message", "Unknown error");
		this.ob_content = content.get("ob_content", "");
		this.error_name = content.get("error_name", "");
		this.error_file = content.get("error_file", "");
		this.error_line = content.get("error_line", "");
		this.error_pos = content.get("error_pos", "");
	},
	/**
	 * Set data
	 */
	setData: function(data)
	{
		if (data == null)
		{
			return ;
		}
		if (data instanceof Runtime.Dict)
		{
			var keys = data.keys();
			for (var i = 0; i < keys.count(); i++)
			{
				var key = keys.get(i);
				this.data.set(key, data.get(key));
			}
		}
		else
		{
			this.data = data;
		}
	},
	/**
	 * Setup success
	 */
	success: function(data)
	{
		if (data == undefined) data = null;
		this.code = Runtime.rtl.ERROR_OK;
		this.message = "Ok";
		if (!data)
		{
			return ;
		}
		/* Set code */
		if (data.has("code"))
		{
			this.code = Runtime.rtl.attr(data, "code");
		}
		else
		{
			this.code = Runtime.rtl.ERROR_OK;
		}
		/* Set message */
		if (data.has("message"))
		{
			this.message = Runtime.rtl.attr(data, "message");
		}
		else
		{
			this.message = "Ok";
		}
		/* Set data */
		if (data.has("data"))
		{
			this.setData(Runtime.rtl.attr(data, "data"));
		}
	},
	/**
	 * Setup exception
	 */
	exception: function(e)
	{
		this.code = e.getErrorCode();
		this.message = e.getErrorMessage();
		this.error_name = e.constructor.getClassName();
		this.error_file = e.getFileName();
		this.error_line = e.getErrorLine();
		this.error_pos = e.getErrorPos();
		if (Runtime.rtl.getContext().env("DEBUG"))
		{
			this.error_trace = e.getTraceCollection();
		}
		this.is_exception = true;
	},
	/**
	 * Setup fail
	 */
	fail: function(data)
	{
		if (data == undefined) data = null;
		this.code = Runtime.rtl.ERROR_UNKNOWN;
		this.message = "Unknown error";
		if (data instanceof Runtime.Exceptions.AbstractException)
		{
			this.code = data.getErrorCode();
			this.message = data.getErrorMessage();
			this.error_name = data.constructor.getClassName();
		}
		else if (data instanceof Runtime.Dict)
		{
			/* Set code */
			if (data.has("code"))
			{
				this.code = Runtime.rtl.attr(data, "code");
			}
			else
			{
				this.code = Runtime.rtl.ERROR_UNKNOWN;
			}
			/* Set message */
			if (data.has("message"))
			{
				this.message = Runtime.rtl.attr(data, "message");
			}
			else
			{
				this.message = "Error";
			}
			/* Set data */
			if (data.has("data"))
			{
				this.setData(Runtime.rtl.attr(data, "data"));
			}
		}
		else
		{
			this.code = Runtime.rtl.ERROR_UNKNOWN;
			this.message = "Error";
		}
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.code = 0;
		this.message = "";
		this.data = Runtime.Map.from({});
		this.api_name = "";
		this.method_name = "";
		this.ob_content = "";
		this.error_name = null;
		this.error_file = "";
		this.error_line = "";
		this.error_pos = 0;
		this.error_trace = null;
		this.is_exception = false;
	},
});
Object.assign(Runtime.Web.ApiResult, Runtime.BaseObject);
Object.assign(Runtime.Web.ApiResult,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Web";
	},
	getClassName: function()
	{
		return "Runtime.Web.ApiResult";
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
Runtime.rtl.defClass(Runtime.Web.ApiResult);
window["Runtime.Web.ApiResult"] = Runtime.Web.ApiResult;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Web.ApiResult;