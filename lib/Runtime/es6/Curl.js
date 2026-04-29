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
Runtime.Curl = class extends Runtime.BaseObject
{
	/**
	 * Constructor
	 */
	constructor(url, params)
	{
		if (params == undefined) params = null;
		super();
		this.url = url;
		/* Setup params */
		if (params == null) return;
		if (params.has("post"))
		{
			this.method = "POST";
			this.post = params.get("post");
		}
		if (params.has("headers")) this.headers = params.get("headers");
	}
	
	
	/**
	 * Returns true if curl is success
	 */
	isSuccess(){ return this.code == 200; }
	
	
	/**
	 * Send
	 */
	async send()
	{
		this.code = 0;
		this.response = "";
		await this.sendPost();
		return this.response;
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.url = "";
		this.post = null;
		this.headers = null;
		this.code = 0;
		this.response = "";
		this.response_headers = null;
	}
	static getClassName(){ return "Runtime.Curl"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Curl"] = Runtime.Curl;
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
		if (Runtime.rtl.isObject(value) &&
			Runtime.rtl.isImplements(value, "Runtime.SerializeInterface")
		)
		{
			value = Runtime.rtl.serialize(value);
		}
		if (value instanceof Array)
		{
			for (var i=0; i<value.length; i++)
			{
				this.buildPostData(result, this.getKey(key, i), value[i]);
			}
		}
		else if (value instanceof Runtime.Map)
		{
			var keys = Runtime.rtl.list(value.keys());
			for (var i=0; i<keys.length; i++)
			{
				var name = keys.get(i);
				this.buildPostData(result, this.getKey(key, name), value.get(name));
			}
		}
		else if (value !== null)
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
				xhr.open(this.method, this.url, true);
				
				/* Set headers */
				if (this.headers instanceof Runtime.Map)
				{
					var keys = this.headers.keys();
					for (var i = 0; i < keys.length; i++) {
						var key = keys.get(i);
						xhr.setRequestHeader(key, this.headers.get(key));
					}
				}
				
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