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
Runtime.Curl = function(url, params)
{
	if (params == undefined) params = null;
	Runtime.BaseObject.call(this);
	this.url = url;
	/* Setup params */
	if (params == null)
	{
		return ;
	}
	if (params.has("post"))
	{
		this.post = params.get("post");
	}
};
Runtime.Curl.prototype = Object.create(Runtime.BaseObject.prototype);
Runtime.Curl.prototype.constructor = Runtime.Curl;
Object.assign(Runtime.Curl.prototype,
{
	/**
	 * Send
	 */
	send: async function()
	{
		this.code = 0;
		this.response = "";
		await this.sendPost();
		return Promise.resolve(this.response);
	},
	_init: function()
	{
		Runtime.BaseObject.prototype._init.call(this);
		this.url = "";
		this.post = null;
		this.code = 0;
		this.response = "";
	},
});
Object.assign(Runtime.Curl, Runtime.BaseObject);
Object.assign(Runtime.Curl,
{
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime";
	},
	getClassName: function()
	{
		return "Runtime.Curl";
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
Runtime.rtl.defClass(Runtime.Curl);
window["Runtime.Curl"] = Runtime.Curl;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Curl;
Object.assign(Runtime.Curl.prototype,
{
	/**
	 * Returns FormData get
	 */
	getKey: function(key, index)
	{
		if (key == "") return index;
		return key + "[" + index + "]";
	},
	
	
	/**
	 * Returns FormData
	 * @params data - json object
	 * @return FormData
	 */
	buildPostData: function(result, key, value)
	{
		if (value instanceof Array)
		{
			for (var i=0; i<value.length; i++)
			{
				this.buildPostData(result, this.getKey(key, i), value[i]);
			}
		}
		else if (value instanceof Runtime.Dict)
		{
			var keys = value.keys();
			for (var i=0; i<keys.length; i++)
			{
				var name = keys.get(i);
				this.buildPostData(result, this.getKey(key, name), value.get(name));
			}
		}
		else
		{
			result.append(key, value);
		}
	},
	
	
	/**
	 * Send api request
	 * @param string class_name
	 * @param string method_name
	 * @param Map<string, mixed> data
	 * @param callback f
	 */ 
	sendPost: async function()
	{
		return await new Promise((resolve, reject) =>{
			try
			{
				var data = new FormData();
				this.buildPostData(data, "", this.post);
				let xhr = new XMLHttpRequest();
				xhr.open('POST', this.url, true);
				xhr.send(data);
				xhr.onreadystatechange = (function(curl, xhr, resolve, reject) {
					return function()
					{
						if (xhr.readyState != 4) return;
						curl.code = xhr.status;
						curl.response = xhr.responseText;
						if (xhr.status == 200)
						{
							resolve();
						}
						else
						{
							reject( new Runtime.Exceptions.CurlException(
								xhr.status, xhr.responseText
							) );
						}
					}
				})(this, xhr, resolve, reject);
			}
			catch (e)
			{
				reject(e);
			}
		});
	},
	
});